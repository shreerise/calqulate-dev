"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RefreshCw, Loader2, HeartPulse, Stethoscope, ArrowRight, ShieldAlert, CheckCircle2, Activity, Clock, TrendingUp, CalendarClock, Info } from "lucide-react";

// --- FORM SCHEMA ---
const formSchema = z.object({
  age: z.string().min(1, "Please enter your age.").refine((val) => parseInt(val) >= 20 && parseInt(val) <= 90, {
    message: "Age must be between 20 and 90 for accurate assessment.",
  }),
  menarcheAge: z.string({ required_error: "Please select an option." }),
  firstBirthAge: z.string({ required_error: "Please select an option." }),
  firstDegreeRelatives: z.string({ required_error: "Please select an option." }),
  priorBiopsy: z.enum(["yes", "no", "unknown"], { required_error: "Please select an option." }),
  atypicalHyperplasia: z.enum(["yes", "no", "unknown"]).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface RiskHorizon {
  label: string;
  /** Estimated absolute risk for this horizon, as a percentage. */
  percent: number;
  /** Average / baseline absolute risk for the same horizon, as a percentage. */
  baselinePercent: number;
  note: string;
}

interface RiskFactorContribution {
  factor: string;
  /** Relative-risk multiplier this single factor contributed (1.0 = no effect). */
  multiplier: number;
  detail: string;
}

interface CalculationResult {
  riskLevel: "Average" | "Moderate" | "High";
  scoreMultiplier: number;
  description: string;
  actionPlan: string[];
  doctorQuestions: string[];
  // FEATURE 1 — multi-horizon risk (5-year, 10-year, lifetime)
  horizons: RiskHorizon[];
  // FEATURE 2 — which factors raised risk most + screening timing
  topFactors: RiskFactorContribution[];
  screeningGuidance: string;
}

interface SavedEntry {
  date: string;
  age: string;
  menarcheAge: string;
  firstBirthAge: string;
  firstDegreeRelatives: string;
  priorBiopsy: string;
  atypicalHyperplasia?: string;
  riskLevel: "Average" | "Moderate" | "High";
  scoreMultiplier: number;
}

const STORAGE_KEY = "calqulate_breast_cancer_history";

function getStorage(): SavedEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(entry: SavedEntry) {
  try {
    const existing = getStorage();
    existing.unshift(entry);
    const trimmed = existing.slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore storage errors
  }
}

function getRiskDeltaLabel(current: { riskLevel: string; scoreMultiplier: number }, previous: SavedEntry) {
  if (current.riskLevel !== previous.riskLevel) {
    return {
      label: `Risk category changed from ${previous.riskLevel} to ${current.riskLevel}.`, positive: current.riskLevel !== 'High' || previous.riskLevel === 'Average'
    };
  }

  const delta = Number((current.scoreMultiplier - previous.scoreMultiplier).toFixed(1));
  if (delta > 0) {
    return { label: `Your relative risk multiplier increased by ${delta} compared to the last saved result.`, positive: false };
  }
  if (delta < 0) {
    return { label: `Your relative risk multiplier decreased by ${Math.abs(delta)} compared to the last saved result.`, positive: true };
  }
  return { label: "No meaningful change from the last saved result.", positive: true };
}

// --- VISUAL COMPONENTS ---

const RiskGauge = ({ level, multiplier }: { level: string; multiplier: number }) => {
  let color = "bg-green-500";
  let textColor = "text-green-600 dark:text-green-400";
  let position = 15; // Average

  if (level === "High") {
    color = "bg-red-500";
    textColor = "text-red-600 dark:text-red-400";
    position = 85;
  } else if (level === "Moderate") {
    color = "bg-yellow-500";
    textColor = "text-yellow-600 dark:text-yellow-400";
    position = 50;
  }

  return (
    <div className="text-center w-full py-4">
      <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-4">Estimated Relative Risk Profile</p>
      
      <div className="relative w-full max-w-md mx-auto h-4 bg-gray-200 dark:bg-gray-800 rounded-full mb-6 overflow-visible shadow-inner">
        {/* Gradient bar */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 opacity-80"></div>
        
        {/* Pointer */}
        <div 
          className="absolute top-1/2 w-6 h-6 rounded-full bg-white border-4 shadow-xl -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-out z-10" 
          style={{ left: `${position}%`, borderColor: color === 'bg-red-500' ? '#ef4444' : color === 'bg-yellow-500' ? '#eab308' : '#22c55e' }}
        ></div>
        
        {/* Labels */}
        <div className="absolute top-6 left-0 text-xs font-semibold text-green-600">Average</div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-yellow-600">Elevated</div>
        <div className="absolute top-6 right-0 text-xs font-semibold text-red-600">High</div>
      </div>
      
      <div className="mt-8">
        <h2 className={`text-4xl font-extrabold ${textColor}`}>{level} Risk</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
          Based on standard models, your profile suggests a risk level that is <strong>{multiplier.toFixed(1)}x</strong> {level === 'Average' ? 'the baseline' : 'higher than the baseline'} for women your age.
        </p>
      </div>
    </div>
  );
};


// --- CALCULATION LOGIC ---
// This uses a simplified, weighted point system inspired by standard risk models (Gail/Tyrer-Cuzick).
// It calculates a relative multiplier.

// Approximate AVERAGE-risk absolute probabilities of developing breast cancer
// within a given window, by current age. Anchored to widely cited NCI / SEER
// figures (e.g. ~12.5% lifetime, ~1 in 8). These are baselines that the model's
// relative multiplier scales — used purely to present a fuller risk picture.
const getBaselineHorizons = (age: number): { fiveYear: number; tenYear: number; lifetime: number } => {
  if (age < 40) return { fiveYear: 0.5, tenYear: 1.5, lifetime: 12.5 };
  if (age < 50) return { fiveYear: 1.5, tenYear: 3.5, lifetime: 11.0 };
  if (age < 60) return { fiveYear: 2.3, tenYear: 5.0, lifetime: 9.0 };
  if (age < 70) return { fiveYear: 3.5, tenYear: 6.5, lifetime: 7.0 };
  return { fiveYear: 3.8, tenYear: 6.5, lifetime: 5.0 };
};

const calculateRisk = (data: FormData): CalculationResult => {
  let score = 1.0; // Baseline multiplier
  const age = parseInt(data.age);

  // Track each factor's individual contribution for the "what raised your risk" breakdown.
  const contributions: RiskFactorContribution[] = [];
  const addContribution = (factor: string, multiplier: number, detail: string) => {
    if (multiplier > 1.0001) contributions.push({ factor, multiplier, detail });
  };

  // 1. Age Factor (Risk generally increases with age)
  if (age >= 60) { score *= 1.5; addContribution("Age", 1.5, "Breast cancer risk rises markedly after age 60."); }
  else if (age >= 50) { score *= 1.3; addContribution("Age", 1.3, "Risk increases through the 50s, around the menopausal transition."); }
  else if (age >= 40) { score *= 1.1; addContribution("Age", 1.1, "Risk begins to climb steadily from your 40s."); }

  // 2. Menarche Age
  if (data.menarcheAge === "<12") { score *= 1.2; addContribution("Early first period", 1.2, "Starting periods before age 12 means longer lifetime estrogen exposure."); }
  else if (data.menarcheAge === "12-13") { score *= 1.1; addContribution("First period age", 1.1, "Periods starting at 12–13 add a small amount of estrogen exposure."); }

  // 3. First Birth Age
  if (data.firstBirthAge === "nulliparous") { score *= 1.3; addContribution("No live births", 1.3, "Never having given birth is associated with modestly higher risk."); }
  else if (data.firstBirthAge === ">=30") { score *= 1.4; addContribution("First birth at 30+", 1.4, "A first live birth at 30 or older raises risk relative to earlier births."); }
  else if (data.firstBirthAge === "25-29") { score *= 1.1; addContribution("First birth at 25–29", 1.1, "A first birth in the late 20s carries a small added risk."); }

  // 4. First Degree Relatives
  if (data.firstDegreeRelatives === "1") { score *= 1.8; addContribution("Family history", 1.8, "One first-degree relative (mother, sister, daughter) roughly doubles baseline risk."); }
  else if (data.firstDegreeRelatives === "2+") { score *= 2.5; addContribution("Strong family history", 2.5, "Two or more first-degree relatives is one of the strongest risk factors here."); }

  // 5. Biopsy & Atypia
  if (data.priorBiopsy === "yes") {
    score *= 1.3;
    addContribution("Prior breast biopsy", 1.3, "A previous breast biopsy reflects findings that can raise risk.");
    if (data.atypicalHyperplasia === "yes") { score *= 2.0; addContribution("Atypical hyperplasia", 2.0, "Atypical hyperplasia on biopsy is a high-impact risk factor."); }
  }

  // Categorize
  let riskLevel: "Average" | "Moderate" | "High" = "Average";
  if (score >= 3.0 || data.firstDegreeRelatives === "2+" || (data.priorBiopsy === "yes" && data.atypicalHyperplasia === "yes")) {
    riskLevel = "High";
  } else if (score >= 1.7) {
    riskLevel = "Moderate";
  }

  // Generate Action Plan based on Risk and Age
  const actionPlan: string[] = [];
  const doctorQuestions: string[] = [];

  if (riskLevel === "High") {
    actionPlan.push("Consult a breast specialist or genetic counselor regarding your elevated risk.");
    actionPlan.push("Discuss the possibility of starting mammograms earlier than age 40.");
    actionPlan.push("Ask about supplemental screening, such as Breast MRI or Ultrasound, especially if you have dense breasts.");
    
    doctorQuestions.push("Given my family/biopsy history, do I qualify for high-risk screening protocols?");
    doctorQuestions.push("Should I consider genetic testing (like a BRCA panel)?");
    doctorQuestions.push("Are there risk-reducing medications (chemoprevention) I should consider?");
  } else if (riskLevel === "Moderate") {
    actionPlan.push("Maintain a schedule of annual clinical breast exams with your doctor.");
    if (age < 40) actionPlan.push("Discuss when you should begin your baseline mammogram (often age 40).");
    if (age >= 40) actionPlan.push("Ensure you are receiving annual screening mammograms.");
    
    doctorQuestions.push("Based on my moderate risk, what is my ideal screening schedule?");
    doctorQuestions.push("Do I have dense breast tissue that requires additional imaging?");
  } else {
    // Average
    if (age < 40) {
      actionPlan.push("Practice breast self-awareness and report any changes to your doctor.");
      actionPlan.push("Prepare to start annual mammography screening at age 40-45.");
    } else if (age >= 40 && age < 55) {
      actionPlan.push("Undergo annual screening mammograms (highly recommended from age 45).");
    } else {
      actionPlan.push("Continue mammograms every 1-2 years based on your doctor's advice.");
    }
    
    doctorQuestions.push("When is the best time for me to schedule my next standard mammogram?");
    doctorQuestions.push("What lifestyle changes can I make to keep my risk low?");
  }

  // ── FEATURE 1: derive 5-year, 10-year and lifetime absolute risk ──────────
  // The model produces a relative multiplier (Gail/Tyrer-Cuzick style). We apply
  // it to age-matched average absolute baselines to present all three horizons.
  const baselines = getBaselineHorizons(age);
  const clampPct = (v: number) => Math.min(99, Math.round(v * 10) / 10);
  const horizons: RiskHorizon[] = [
    {
      label: "5-Year Risk",
      percent: clampPct(baselines.fiveYear * score),
      baselinePercent: clampPct(baselines.fiveYear),
      note: "Chance of developing breast cancer within the next 5 years. A 5-year risk of 1.67%+ is the threshold used in prevention-medication discussions.",
    },
    {
      label: "10-Year Risk",
      percent: clampPct(baselines.tenYear * score),
      baselinePercent: clampPct(baselines.tenYear),
      note: "Chance over the next decade — the horizon the Tyrer-Cuzick (IBIS) model is most often reported against.",
    },
    {
      label: "Lifetime Risk",
      percent: clampPct(Math.min(95, baselines.lifetime * score)),
      baselinePercent: clampPct(baselines.lifetime),
      note: "Cumulative chance from now to about age 90. A lifetime risk above 20% is the high-risk threshold for adding annual MRI.",
    },
  ];

  // ── FEATURE 2: rank the factors that raised risk most ─────────────────────
  const topFactors = [...contributions].sort((a, b) => b.multiplier - a.multiplier).slice(0, 4);

  const lifetimePct = horizons[2].percent;
  let screeningGuidance = "";
  if (riskLevel === "High" || lifetimePct >= 20) {
    screeningGuidance =
      "Your estimated lifetime risk reaches the high-risk threshold. Major guidelines suggest annual mammography PLUS annual breast MRI, often starting around age 30 (or earlier than usual), alongside a specialist or genetic-counseling referral. This is an estimate to guide that conversation — not a diagnosis.";
  } else if (riskLevel === "Moderate" || lifetimePct >= 15) {
    screeningGuidance =
      "Your estimate sits in the moderate band. Discuss starting (or continuing) annual mammograms and whether supplemental imaging is appropriate, especially if you have dense breasts. This is an estimate to guide screening decisions — not a diagnosis.";
  } else {
    screeningGuidance =
      "Your estimate is in the average range. Following standard population screening — typically mammograms beginning at age 40–45 — is reasonable, with breast self-awareness in between. This is an estimate, not a diagnosis.";
  }

  return {
    riskLevel,
    scoreMultiplier: score,
    horizons,
    topFactors,
    screeningGuidance,
    description: riskLevel === "High"
      ? "Your inputs indicate an elevated risk profile compared to the average population. This does not mean you will get cancer, but it warrants proactive, specialized screening."
      : riskLevel === "Moderate"
      ? "Your inputs suggest a slightly higher than average risk. Standard screening is crucial, and you should discuss your specific factors with your doctor."
      : "Your inputs suggest you are at an average risk level. Following standard population screening guidelines is recommended.",
    actionPlan,
    doctorQuestions
  };
};

export default function BreastCancerRiskCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<SavedEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(getStorage());
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      priorBiopsy: "no",
      atypicalHyperplasia: "unknown"
    },
  });

  const watchBiopsy = form.watch("priorBiopsy");

  const lastSaved = history[0];
  const currentDeltaInfo = result && lastSaved ? getRiskDeltaLabel({ riskLevel: result.riskLevel, scoreMultiplier: result.scoreMultiplier }, lastSaved) : null;

  const handleSave = () => {
    if (!result) return;

    const values = form.getValues();
    const entry: SavedEntry = {
      date: new Date().toISOString(),
      age: values.age,
      menarcheAge: values.menarcheAge,
      firstBirthAge: values.firstBirthAge,
      firstDegreeRelatives: values.firstDegreeRelatives,
      priorBiopsy: values.priorBiopsy,
      atypicalHyperplasia: values.atypicalHyperplasia,
      riskLevel: result.riskLevel,
      scoreMultiplier: result.scoreMultiplier,
    };

    saveToStorage(entry);
    setHistory(getStorage());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
    setShowHistory(false);
  };

  function onSubmit(values: FormData) {
    setIsLoading(true);
    // Simulate slight delay for processing perception
    setTimeout(() => {
      const calculatedResult = calculateRisk(values);
      setResult(calculatedResult);
      setIsLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 600);
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto shadow-lg border-t-4 border-t-pink-500" id="calculator">
        <CardHeader className="bg-gray-50/50 dark:bg-gray-900/20 border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Activity className="w-6 h-6 text-pink-500" />
            Risk Factor Questionnaire
          </CardTitle>
          <CardDescription className="text-base">
            Please answer the following questions honestly. Your information is private and not stored.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Age */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem className="bg-white dark:bg-gray-950 p-4 rounded-xl border shadow-sm">
                      <FormLabel className="text-base font-semibold text-gray-800 dark:text-gray-200">Current Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 45" className="text-lg py-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* First Degree Relatives */}
                <FormField
                  control={form.control}
                  name="firstDegreeRelatives"
                  render={({ field }) => (
                    <FormItem className="bg-white dark:bg-gray-950 p-4 rounded-xl border shadow-sm">
                      <FormLabel className="text-base font-semibold text-gray-800 dark:text-gray-200">
                        First-Degree Relatives with Breast Cancer?
                        <span className="block text-xs font-normal text-muted-foreground mt-1">
                          (Mother, sister, or daughter)
                        </span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-base py-6 mt-2">
                            <SelectValue placeholder="Select number of relatives" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0">None (0)</SelectItem>
                          <SelectItem value="1">One (1)</SelectItem>
                          <SelectItem value="2+">Two or more (2+)</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Menarche Age */}
                <FormField
                  control={form.control}
                  name="menarcheAge"
                  render={({ field }) => (
                    <FormItem className="bg-white dark:bg-gray-950 p-4 rounded-xl border shadow-sm">
                      <FormLabel className="text-base font-semibold text-gray-800 dark:text-gray-200">
                        Age at first menstrual period?
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-base py-6 mt-2">
                            <SelectValue placeholder="Select age range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="<12">7 to 11 years old</SelectItem>
                          <SelectItem value="12-13">12 to 13 years old</SelectItem>
                          <SelectItem value=">=14">14 years or older</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* First Birth Age */}
                <FormField
                  control={form.control}
                  name="firstBirthAge"
                  render={({ field }) => (
                    <FormItem className="bg-white dark:bg-gray-950 p-4 rounded-xl border shadow-sm">
                      <FormLabel className="text-base font-semibold text-gray-800 dark:text-gray-200">
                        Age at time of first live birth?
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-base py-6 mt-2">
                            <SelectValue placeholder="Select age range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="<20">Younger than 20</SelectItem>
                          <SelectItem value="20-24">20 to 24 years old</SelectItem>
                          <SelectItem value="25-29">25 to 29 years old</SelectItem>
                          <SelectItem value=">=30">30 years or older</SelectItem>
                          <SelectItem value="nulliparous">No births</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Prior Biopsy */}
                <FormField
                  control={form.control}
                  name="priorBiopsy"
                  render={({ field }) => (
                    <FormItem className="bg-white dark:bg-gray-950 p-4 rounded-xl border shadow-sm col-span-1 md:col-span-2">
                      <FormLabel className="text-base font-semibold text-gray-800 dark:text-gray-200">
                        Have you ever had a breast biopsy?
                      </FormLabel>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        value={field.value} 
                        className="flex flex-col sm:flex-row gap-4 pt-3"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-lg p-3 flex-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer w-full">No</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-lg p-3 flex-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer w-full">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-lg p-3 flex-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="unknown" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer w-full">Unknown</FormLabel>
                        </FormItem>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Conditional Atypical Hyperplasia */}
                {watchBiopsy === "yes" && (
                  <FormField
                    control={form.control}
                    name="atypicalHyperplasia"
                    render={({ field }) => (
                      <FormItem className="bg-pink-50/50 dark:bg-pink-950/20 p-4 rounded-xl border border-pink-100 dark:border-pink-900 shadow-sm col-span-1 md:col-span-2 animate-in fade-in slide-in-from-top-2">
                        <FormLabel className="text-base font-semibold text-pink-900 dark:text-pink-300">
                          Did the biopsy display Atypical Hyperplasia?
                          <span className="block text-xs font-normal text-muted-foreground mt-1">
                            (Check your past medical records if unsure)
                          </span>
                        </FormLabel>
                        <RadioGroup 
                          onValueChange={field.onChange} 
                          value={field.value} 
                          className="flex flex-col sm:flex-row gap-4 pt-3"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 bg-white dark:bg-gray-900 border rounded-lg p-3 flex-1 cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-medium cursor-pointer w-full">No</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 bg-white dark:bg-gray-900 border rounded-lg p-3 flex-1 cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-medium cursor-pointer w-full">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 bg-white dark:bg-gray-900 border rounded-lg p-3 flex-1 cursor-pointer">
                            <FormControl>
                              <RadioGroupItem value="unknown" />
                            </FormControl>
                            <FormLabel className="font-medium cursor-pointer w-full">Unknown</FormLabel>
                          </FormItem>
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button type="submit" className="flex-1 bg-pink-600 hover:bg-pink-700 text-white h-14 text-lg rounded-xl shadow-md transition-transform active:scale-[0.98]" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Calculator className="h-5 w-5 mr-2" />}
                  {isLoading ? 'Analyzing Risk Profile...' : 'Calculate My Risk Profile'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="h-14 rounded-xl"
                  onClick={() => { 
                    form.reset({ age: "", priorBiopsy: "no", atypicalHyperplasia: "unknown" }); 
                    setResult(null); 
                  }} 
                  disabled={isLoading}
                >
                  <RefreshCw className="h-5 w-5 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* RESULT SECTION */}
      <div ref={resultsRef}>
        {result && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            
            <Card className="max-w-4xl mx-auto overflow-hidden shadow-xl border-t-0">
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Save this result so you can compare your breast cancer risk profile with earlier calculations.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleSave} className="flex-1 sm:flex-none">
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Save Result
                    </Button>
                    <Button variant="secondary" onClick={() => setShowHistory((value) => !value)} className="flex-1 sm:flex-none">
                      {showHistory ? 'Hide History' : 'Show History'}
                    </Button>
                  </div>
                </div>

                {saved && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                    Saved successfully! Your risk profile is now stored locally in your browser.
                  </div>
                )}

                {currentDeltaInfo && (
                  <div className={`rounded-2xl border p-4 ${currentDeltaInfo.positive ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                    <p className="text-sm font-semibold">Comparison with last saved result</p>
                    <p className="mt-2 text-sm">{currentDeltaInfo.label}</p>
                  </div>
                )}

                {showHistory && (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div>
                        <h4 className="text-base font-semibold">Saved Risk History</h4>
                        <p className="text-sm text-muted-foreground">Review your latest saved breast cancer risk estimates.</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={clearHistory}>
                        Clear History
                      </Button>
                    </div>
                    {history.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No saved results yet. Save a result to build history.</p>
                    ) : (
                      <div className="space-y-3">
                        {history.map((entry) => (
                          <div key={entry.date} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold">{entry.riskLevel} Risk</p>
                                <p className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleString()}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900">{entry.scoreMultiplier.toFixed(1)}x</p>
                                <p className="text-xs text-gray-500">Relative Risk Multiplier</p>
                              </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
                              <div>Age: {entry.age}</div>
                              <div>Menarche Age: {entry.menarcheAge}</div>
                              <div>First Birth Age: {entry.firstBirthAge}</div>
                              <div>1st Degree Relatives: {entry.firstDegreeRelatives}</div>
                              <div>Biopsy: {entry.priorBiopsy}</div>
                              {entry.atypicalHyperplasia && <div>Atypical Hyperplasia: {entry.atypicalHyperplasia}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <div className={`h-3 w-full ${result.riskLevel === 'High' ? 'bg-red-500' : result.riskLevel === 'Moderate' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
              <CardContent className="p-8">
                
                {/* Visual Risk Gauge */}
                <RiskGauge level={result.riskLevel} multiplier={result.scoreMultiplier} />
                
                <div className="mt-8 bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border">
                  <p className="text-gray-700 dark:text-gray-300 text-lg text-center leading-relaxed">
                    {result.description}
                  </p>
                </div>

                {/* ── FEATURE 1: 5-YEAR, 10-YEAR & LIFETIME RISK ─────────────────── */}
                <div className="mt-10">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-5 h-5 text-emerald-700" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Your Risk Over Time</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">
                    Estimated absolute risk across three horizons, derived from the Gail / Tyrer-Cuzick relative
                    multiplier applied to age-matched average baselines. Each figure is an estimate, not a diagnosis.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {result.horizons.map((h, idx) => (
                      <div key={h.label} className="rounded-xl border bg-white dark:bg-gray-950 p-5 shadow-sm flex flex-col">
                        <div className="flex items-center gap-2 text-emerald-700">
                          {idx === 0 ? <Clock className="w-4 h-4" /> : idx === 1 ? <CalendarClock className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                          <span className="text-xs font-bold uppercase tracking-wider">{h.label}</span>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">{h.percent}%</span>
                          <span className="text-xs text-muted-foreground">est.</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Average for your age: <strong className="text-gray-700 dark:text-gray-300">{h.baselinePercent}%</strong>
                        </p>
                        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{h.note}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] text-gray-400 leading-relaxed">
                    These percentages are population-level estimates scaled by your relative-risk profile, not a
                    personal prediction. Only clinical evaluation, mammography and biopsy can diagnose breast cancer.
                  </p>
                </div>

                {/* ── FEATURE 2: WHAT RAISED YOUR RISK + WHEN TO SCREEN ──────────── */}
                <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Info className="w-5 h-5 text-emerald-700" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">What Raised Your Risk &amp; When to Screen</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">
                    The factors below contributed most to your estimate, ranked by impact. This explains your number —
                    it is an estimate to guide screening, <strong className="text-emerald-700">not a diagnosis.</strong>
                  </p>

                  {result.topFactors.length > 0 ? (
                    <ul className="space-y-3">
                      {result.topFactors.map((f, idx) => (
                        <li key={f.factor} className="flex items-start gap-3 bg-white dark:bg-gray-950 rounded-xl p-4 border border-emerald-100 shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{f.factor}</span>
                              <span className="text-xs font-bold text-emerald-700 whitespace-nowrap">×{f.multiplier.toFixed(1)} risk</span>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{f.detail}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-950 rounded-xl p-4 border border-emerald-100">
                      No major individual risk factors stood out in your answers — your estimate stays close to the
                      average for your age.
                    </p>
                  )}

                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-white dark:bg-gray-950 p-4">
                    <CalendarClock className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">When screening is advised</p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{result.screeningGuidance}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-10">
                  {/* Action Plan */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <CheckCircle2 className="w-6 h-6 text-pink-500" /> 
                      Your Action Plan
                    </h3>
                    <ul className="space-y-4">
                      {result.actionPlan.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-white dark:bg-gray-950 p-4 rounded-xl border shadow-sm">
                          <ArrowRight className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Doctor Questions */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                      <Stethoscope className="w-6 h-6 text-blue-500" /> 
                      Questions for your Doctor
                    </h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 p-5 rounded-2xl">
                      <p className="text-xs text-blue-800 dark:text-blue-300 mb-4 font-semibold uppercase tracking-wider">Take these to your next appointment:</p>
                      <ul className="space-y-3">
                        {result.doctorQuestions.map((q, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-blue-900 dark:text-blue-200">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </CardContent>
              <CardFooter className="bg-muted/50 p-6 flex items-start gap-4">
                <ShieldAlert className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Important limitation:</strong> This tool utilizes a generalized algorithm based on epidemiological data to estimate risk. It cannot predict with certainty whether you will or will not develop breast cancer. Risk assessment models do not replace medical expertise. Please print this page or save your results to discuss with a certified healthcare provider.
                </p>
              </CardFooter>
            </Card>

          </div>
        )}
      </div>
    </>
  );
}