"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";


import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RefreshCw, Loader2, Info, Activity, HeartPulse, ArrowRight, CheckCircle2, History, ChevronRight, TrendingUp, AlertCircle, Heart, Sparkles, TrendingDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// --- FORM SCHEMA ---
const formSchema = z.object({
  gender: z.enum(["male", "female"]),
  age: z.string().refine((val) => {
    const n = Number(val);
    return n >= 20 && n <= 79;
  }, "Age must be between 20 and 79 for accurate estimation."),
  race: z.enum(["white", "african_american", "other"]),
  totalCholesterol: z.string().min(2, "Required"),
  hdlCholesterol: z.string().min(2, "Required"),
  systolicBP: z.string().min(2, "Required"),
  diastolicBP: z.string().min(2, "Required"),
  treatmentHyp: z.enum(["yes", "no"]),
  diabetes: z.enum(["yes", "no"]),
  smoker: z.enum(["yes", "no"]),
});

type FormData = z.infer<typeof formSchema>;

// --- RESULT INTERFACE ---
interface ResultData {
  score: number;
  optimalScore: number;
  riskCategory: string;
  riskColor: string;
  recommendation: string;
  drivers: string[]; // What is driving the risk up?
  // FEATURE 1 — heart-age equivalent
  heartAge: number; // age of an "ideal" person carrying the same 10-year risk
  chronoAge: number; // the user's actual age, for comparison
  // FEATURE 2 — single biggest modifiable change
  topChange: {
    label: string; // e.g. "Stop smoking"
    projectedScore: number; // new 10-year risk after that one change
    reduction: number; // percentage points removed
  } | null;
}

interface SavedEntry {
  date: string;
  score: number;
  optimalScore: number;
  riskCategory: string;
  recommendation: string;
  drivers: string[];
  age: string;
  gender: string;
  race: string;
  treatmentHyp: string;
  diabetes: string;
  smoker: string;
}

const STORAGE_KEY = "calqulate_ascvd_history";

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

function getScoreDeltaLabel(delta: number) {
  if (Math.abs(delta) < 0.1) return { label: "No meaningful change since last saved result", color: "#4B5563", icon: "same" as const };
  if (delta < 0) return { label: `Risk improved by ${Math.abs(delta)} points since your last saved result`, color: "#1D4ED8", icon: "down" as const };
  return { label: `Risk rose by ${delta} points since your last saved result`, color: "#B91C1C", icon: "up" as const };
}

const ProgressCard = ({ current, history }: { current: ResultData; history: SavedEntry[] }) => {
  if (history.length === 0) return null;
  const last = history[0];
  const delta = Number((current.score - last.score).toFixed(1));
  const improving = delta < 0;
  const info = getScoreDeltaLabel(delta);

  return (
    <div
      className="rounded-xl p-4 border flex items-start gap-4"
      style={{
        background: improving ? "#ECFDF5" : "#FEF3EE",
        borderColor: improving ? "#86EFAC" : "#FECACA",
      }}
    >
      <div className="p-2 rounded-lg flex-shrink-0" style={{ background: improving ? "#DCFCE7" : "#FEE2E2" }}>
        {improving ? <CheckCircle2 className="w-5 h-5 text-green-700" /> : <AlertCircle className="w-5 h-5 text-red-700" />}
      </div>
      <div>
        <p className="font-bold text-sm" style={{ color: improving ? "#166534" : "#991B1B" }}>
          {improving ? "Your latest risk score is lower than your last saved entry." : "Your latest risk score is higher than your last saved entry."}
        </p>
        <p className="text-xs mt-1" style={{ color: "#4B5563" }}>
          {info.label} · Last saved: {new Date(last.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </div>
  );
};

const HistoryPanel = ({ history, onClear }: { history: SavedEntry[]; onClear: () => void }) => {
  if (history.length === 0) return null;

  return (
    <Card className="max-w-3xl mx-auto border shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <History className="w-4 h-4 text-blue-600" />
          Saved ASCVD Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((entry, index) => {
            const previous = history[index + 1];
            const delta = previous ? Number((entry.score - previous.score).toFixed(1)) : null;
            return (
              <div key={entry.date} className="rounded-2xl border p-4 bg-white shadow-sm">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <p className="text-sm font-semibold">{entry.riskCategory}</p>
                    <p className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{entry.score}%</p>
                    <p className="text-xs text-gray-500">Optimal {entry.optimalScore}%</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                  <span className="px-2 py-1 rounded-full bg-slate-100">{entry.gender}</span>
                  <span className="px-2 py-1 rounded-full bg-slate-100">{entry.race.replace("_", " ")}</span>
                  <span className="px-2 py-1 rounded-full bg-slate-100">{entry.treatmentHyp === "yes" ? "Treated BP" : "Untreated BP"}</span>
                  <span className="px-2 py-1 rounded-full bg-slate-100">{entry.diabetes === "yes" ? "Diabetes" : "No Diabetes"}</span>
                  <span className="px-2 py-1 rounded-full bg-slate-100">{entry.smoker === "yes" ? "Smoker" : "Non-smoker"}</span>
                </div>
                {delta !== null && (
                  <div className="mt-3 text-sm font-medium" style={{ color: delta < 0 ? "#166534" : "#991B1B" }}>
                    {delta < 0 ? `Improved by ${Math.abs(delta)} points from the previous saved score` : delta > 0 ? `Increased by ${delta} points from the previous saved score` : "No change from previous saved score"}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button onClick={onClear} className="mt-4 text-xs text-gray-500 hover:text-red-500 transition-colors">
          Clear history
        </button>
      </CardContent>
    </Card>
  );
};

export default function AscvdRiskCalculator() {
  const [result, setResult] = useState<ResultData | null>(null);
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
      gender: "male",
      race: "white",
      treatmentHyp: "no",
      diabetes: "no",
      smoker: "no",
      age: "",
      totalCholesterol: "",
      hdlCholesterol: "",
      systolicBP: "",
      diastolicBP: "" // Kept for user convenience/pulse pressure internal logic if needed later
    },
  });

  const handleSave = () => {
    if (!result) return;

    const values = form.getValues();
    const entry: SavedEntry = {
      date: new Date().toISOString(),
      score: result.score,
      optimalScore: result.optimalScore,
      riskCategory: result.riskCategory,
      recommendation: result.recommendation,
      drivers: result.drivers,
      gender: values.gender,
      age: values.age,
      race: values.race,
      treatmentHyp: values.treatmentHyp,
      diabetes: values.diabetes,
      smoker: values.smoker,
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

  // --- CALCULATION LOGIC ---
  const calculateRisk = (data: FormData) => {
    const age = Number(data.age);
    const totChol = Number(data.totalCholesterol);
    const hdl = Number(data.hdlCholesterol);
    const sbp = Number(data.systolicBP);
    const isSmoker = data.smoker === "yes";
    const isDiabetic = data.diabetes === "yes";
    const isTreated = data.treatmentHyp === "yes";

    // 1. Calculate Actual Risk (Simplified Simulation of PCE Equations)
    let baseRisk = 0;
    if (data.gender === 'male') baseRisk += 2;
    if (data.race === 'african_american') baseRisk += 1;
    if (isSmoker) baseRisk += 4;
    if (isDiabetic) baseRisk += 3;
    if (isTreated) baseRisk += 1;

    const ageFactor = (age - 40) * 0.25;
    const cholFactor = (totChol - 170) * 0.04;
    const hdlFactor = (50 - hdl) * 0.08;
    const bpFactor = (sbp - 110) * 0.08;

    let approximateScore = baseRisk + ageFactor + cholFactor + hdlFactor + bpFactor;
    if (approximateScore < 0.1) approximateScore = 0.5;
    let risk = Math.min(99, Math.max(0.1, approximateScore));

    // Reusable scorer (mirrors the formula above exactly) so we can re-run the
    // calculation under a single hypothetical change without altering anything.
    const scoreFor = (o: {
      smoker: boolean; diabetic: boolean; treated: boolean;
      totChol: number; hdl: number; sbp: number;
    }) => {
      let b = 0;
      if (data.gender === 'male') b += 2;
      if (data.race === 'african_american') b += 1;
      if (o.smoker) b += 4;
      if (o.diabetic) b += 3;
      if (o.treated) b += 1;
      const chol = (o.totChol - 170) * 0.04;
      const hdlF = (50 - o.hdl) * 0.08;
      const bp = (o.sbp - 110) * 0.08;
      let s = b + ageFactor + chol + hdlF + bp;
      if (s < 0.1) s = 0.5;
      return Number(Math.min(99, Math.max(0.1, s)).toFixed(1));
    };

    // 2. Calculate "Optimal" Risk (Best possible score for this Age/Gender)
    // Optimal: No smoke, no diabetes, ideal BP (110), ideal Chol (170), ideal HDL (50+)
    let optimalBase = 0;
    if (data.gender === 'male') optimalBase += 2;
    if (data.race === 'african_american') optimalBase += 1;
    const optimalScoreCalc = optimalBase + ageFactor; // Only age adds risk
    let optimalRisk = Math.min(risk, Math.max(0.1, optimalScoreCalc)); // Can't be higher than actual

    // 3. Identify Drivers (Why is the score high?)
    const drivers = [];
    if (isSmoker) drivers.push("Smoking");
    if (isDiabetic) drivers.push("Diabetes");
    if (sbp > 130) drivers.push("Elevated Blood Pressure");
    if (totChol > 200) drivers.push("Total Cholesterol");
    if (hdl < 40) drivers.push("Low HDL (Good Cholesterol)");
    if (drivers.length === 0 && risk > 2) drivers.push("Age (Non-modifiable factor)");

    // 4. Categories
    let riskCategory = "Low Risk";
    let riskColor = "text-green-600";
    let recommendation = "Your heart risk is low. Keep up the good work with diet and exercise.";

    if (risk >= 20) {
        riskCategory = "High Risk";
        riskColor = "text-red-600";
        recommendation = "You are at high risk. Please consult a cardiologist to discuss statin therapy and lifestyle interventions.";
    } else if (risk >= 7.5) {
        riskCategory = "Intermediate Risk";
        riskColor = "text-orange-600";
        recommendation = "You are at intermediate risk. Moderate-intensity statin therapy and lifestyle changes are often recommended.";
    } else if (risk >= 5) {
        riskCategory = "Borderline Risk";
        riskColor = "text-yellow-600";
        recommendation = "You are at borderline risk. Lifestyle improvements can help prevent this from rising.";
    }

    // 5. FEATURE 1 — Heart-age equivalent.
    // Find the age at which an otherwise-ideal profile (no smoke/diabetes, ideal
    // BP/chol/HDL) would carry the SAME 10-year risk as this person. Reuses the
    // same age weighting (0.25 pts/yr) used everywhere above.
    const idealBase =
      (data.gender === 'male' ? 2 : 0) + (data.race === 'african_american' ? 1 : 0);
    const risk1 = Number(risk.toFixed(1));
    let heartAge = Math.round(40 + (risk1 - idealBase) / 0.25);
    if (!Number.isFinite(heartAge) || heartAge < age) heartAge = age;

    // 6. FEATURE 2 — Single biggest modifiable change.
    // Re-run the score with one factor swapped to its ideal value and keep the
    // change that drops the 10-year risk the most.
    const baseline = { smoker: isSmoker, diabetic: isDiabetic, treated: isTreated, totChol, hdl, sbp };
    const candidates: { label: string; projectedScore: number }[] = [];
    if (isSmoker) candidates.push({ label: "Stop smoking", projectedScore: scoreFor({ ...baseline, smoker: false }) });
    if (sbp > 120) candidates.push({ label: `Lower systolic BP to 120 mmHg`, projectedScore: scoreFor({ ...baseline, sbp: 120 }) });
    if (totChol > 170) candidates.push({ label: `Lower total cholesterol to 170 mg/dL`, projectedScore: scoreFor({ ...baseline, totChol: 170 }) });
    if (hdl < 60) candidates.push({ label: `Raise HDL ("good" cholesterol) to 60 mg/dL`, projectedScore: scoreFor({ ...baseline, hdl: 60 }) });

    let topChange: ResultData["topChange"] = null;
    for (const c of candidates) {
      const reduction = Number((risk1 - c.projectedScore).toFixed(1));
      if (reduction > 0 && (!topChange || reduction > topChange.reduction)) {
        topChange = { label: c.label, projectedScore: c.projectedScore, reduction };
      }
    }

    return {
        score: Number(risk.toFixed(1)),
        optimalScore: Number(optimalRisk.toFixed(1)),
        riskCategory,
        riskColor,
        recommendation,
        drivers,
        heartAge,
        chronoAge: age,
        topChange
    };
  };

  function onSubmit(values: FormData) {
    setIsLoading(true);
    setTimeout(() => {
        const calculatedResult = calculateRisk(values);
        setResult(calculatedResult);
        setIsLoading(false);
        setTimeout(() => {
             resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }, 800);
  }

  const lastSaved = history[0];
  const scoreDelta = result && lastSaved ? Number((result.score - lastSaved.score).toFixed(1)) : null;

  return (
    <>
      {history.length > 0 && (
        <div className="max-w-4xl mx-auto mb-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: "#2563EB" }}
          >
            <History className="w-4 h-4" />
            {showHistory ? "Hide" : "View"} your saved ASCVD results ({history.length} {history.length === 1 ? "entry" : "entries"})
            <ChevronRight className={`w-4 h-4 transition-transform ${showHistory ? "rotate-90" : ""}`} />
          </button>
        </div>
      )}
      {showHistory && <HistoryPanel history={history} onClear={clearHistory} />}
      <Card className="max-w-4xl mx-auto shadow-lg border-t-4 border-t-blue-600" id="ascvd-calculator">
        <CardHeader className="bg-slate-50 dark:bg-slate-900/50">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Activity className="w-6 h-6 text-blue-600" /> 
            ASCVD Risk Estimator
          </CardTitle>
          <CardDescription>
            Enter your health numbers. We will calculate your 10-year risk of heart disease or stroke.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Demographics */}
              <div className="grid md:grid-cols-3 gap-6">
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Sex</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl><RadioGroupItem value="male" /></FormControl>
                          <FormLabel className="font-normal cursor-pointer">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl><RadioGroupItem value="female" /></FormControl>
                          <FormLabel className="font-normal cursor-pointer">Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age (Years)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="40-79" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                 <FormField control={form.control} name="race" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Race</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select race" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="white">White</SelectItem>
                          <SelectItem value="african_american">African American</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                  </FormItem>
                )} />
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-700" />

              {/* Lab Values - Clean Inputs with Helper Text */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <HeartPulse className="w-4 h-4 text-blue-600" />
                      <Link
                        href="/health/cholesterol-ratio-calculator"
                        className="no-underline hover:underline hover:text-blue-700"
                      >
                        Cholesterol
                      </Link>{" "}
                      Levels (mg/dL)
                    </h3>
                    
                    <FormField control={form.control} name="totalCholesterol" render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-between items-center">
                            <FormLabel>Total Cholesterol</FormLabel>
                            <TooltipProvider><Tooltip><TooltipTrigger><Info className="w-4 h-4 text-muted-foreground" /></TooltipTrigger><TooltipContent>Total cholesterol level found in your lipid profile.</TooltipContent></Tooltip></TooltipProvider>
                        </div>
                        <FormControl><Input type="number" placeholder="e.g., 180" {...field} /></FormControl>
                        {/* Clean Reference Text */}
                        <p className="text-xs text-muted-foreground">Normal range: &lt; 200 mg/dL</p>
                        <FormMessage />
                    </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="hdlCholesterol" render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-between items-center">
                            <FormLabel>HDL Cholesterol</FormLabel>
                            <TooltipProvider><Tooltip><TooltipTrigger><Info className="w-4 h-4 text-muted-foreground" /></TooltipTrigger><TooltipContent>High-density lipoprotein ("good" cholesterol).</TooltipContent></Tooltip></TooltipProvider>
                        </div>
                        <FormControl><Input type="number" placeholder="e.g., 50" {...field} /></FormControl>
                        <p className="text-xs text-muted-foreground">Optimal range: &gt; 60 mg/dL</p>
                        <FormMessage />
                    </FormItem>
                    )} />
                </div>

                <div className="space-y-6">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <Link
                        href="/health/mean-arterial-pressure-calculator"
                        className="no-underline hover:underline hover:text-blue-700"
                      >
                        Blood Pressure
                      </Link>{" "}
                      (mmHg)
                    </h3>
                    <FormField control={form.control} name="systolicBP" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Systolic (Top Number)</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 120" {...field} /></FormControl>
                        <p className="text-xs text-muted-foreground">Normal range: &lt; 120 mmHg</p>
                        <FormMessage />
                    </FormItem>
                    )} />

                    <FormField control={form.control} name="diastolicBP" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Diastolic (Bottom Number)</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 80" {...field} /></FormControl>
                        <p className="text-xs text-muted-foreground">Normal range: &lt; 80 mmHg</p>
                        <FormMessage />
                    </FormItem>
                    )} />
                </div>
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-700" />

              {/* History */}
              <div className="grid md:grid-cols-3 gap-6">
                 <FormField control={form.control} name="treatmentHyp" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Treatment for High BP?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="diabetes" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>History of Diabetes?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="smoker" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Current Smoker?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" size="lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Calculator className="h-4 w-4 mr-2" />}
                  {isLoading ? 'Calculating...' : 'Calculate 10-Year Risk'}
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => { form.reset(); setResult(null); }} className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>

      {/* REIMAGINED RESULTS SECTION */}
      <div ref={resultsRef} className="scroll-mt-24">
        {result && (
          <div className="max-w-4xl mx-auto mt-10 space-y-6">
            
            <div className="grid md:grid-cols-12 gap-6">
                {/* 1. Main Score Card (Takes 5 cols) */}
                <Card className="md:col-span-5 border-t-4 border-t-blue-500 shadow-md flex flex-col justify-center text-center">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-muted-foreground uppercase tracking-wider font-semibold">Your 10-Year Risk</CardTitle>
                    </CardHeader>
                    <CardContent className="py-6">
                        <div className="relative inline-flex items-center justify-center mb-4">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" 
                                    strokeDasharray={440} 
                                    strokeDashoffset={440 - (440 * result.score) / 100} 
                                    className={`${result.riskColor} transition-all duration-1000 ease-out`} 
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                                <span className={`text-4xl font-bold ${result.riskColor}`}>{result.score}%</span>
                                <span className="text-xs text-muted-foreground">Probability</span>
                            </div>
                        </div>
                        <p className={`text-xl font-bold ${result.riskColor}`}>{result.riskCategory}</p>
                    </CardContent>
                </Card>

                {/* 2. Detailed Breakdown (Takes 7 cols) */}
                <Card className="md:col-span-7 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-500" /> Comparison Analysis</CardTitle>
                        <CardDescription>See how your risk compares to the optimal healthy range.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Comparison Bars */}
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1 font-medium">
                                    <span>Your Current Risk</span>
                                    <span>{result.score}%</span>
                                </div>
                                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${result.riskColor} rounded-full`} style={{ width: `${Math.min(100, result.score)}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1 font-medium text-muted-foreground">
                                    <span>Ideal Risk (for your age)</span>
                                    <span>{result.optimalScore}%</span>
                                </div>
                                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(100, result.optimalScore)}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Driver Analysis */}
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                             <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-orange-500" /> Key Risk Factors Found:
                             </h4>
                             {result.drivers.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {result.drivers.map((driver, i) => (
                                        <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-800 shadow-sm">
                                            {driver}
                                        </span>
                                    ))}
                                </div>
                             ) : (
                                <p className="text-sm text-green-600">No major modifiable risk factors found!</p>
                             )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* FEATURE 1 — HEART AGE EQUIVALENT ─────────────────────────────── */}
            <Card className="border shadow-md">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-5 h-5 text-emerald-700" />
                  <h3 className="text-base font-bold">Your Heart Age</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A 10-year risk of{" "}
                  <span className={`font-bold ${result.riskColor}`}>{result.score}%</span> is the same risk an
                  ideal-health person would carry at age{" "}
                  <span className="font-bold text-emerald-700">{result.heartAge}</span>
                  {result.heartAge > result.chronoAge ? (
                    <>
                      {" "}— that&apos;s{" "}
                      <span className="font-bold text-red-600">
                        {result.heartAge - result.chronoAge} year{result.heartAge - result.chronoAge === 1 ? "" : "s"} older
                      </span>{" "}
                      than your actual age of {result.chronoAge}.
                    </>
                  ) : (
                    <>
                      {" "}— right in line with your actual age of {result.chronoAge}. Nicely done.
                    </>
                  )}
                </p>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="rounded-xl border bg-slate-50 dark:bg-slate-900 p-4 text-center">
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Actual age</p>
                    <p className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{result.chronoAge}</p>
                  </div>
                  <div
                    className={`rounded-xl border p-4 text-center ${
                      result.heartAge > result.chronoAge
                        ? "border-red-200 bg-red-50 dark:bg-red-950/30"
                        : "border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30"
                    }`}
                  >
                    <p className="text-[11px] uppercase tracking-wider font-bold text-gray-500">Heart age</p>
                    <p
                      className={`text-2xl font-black mt-1 ${
                        result.heartAge > result.chronoAge ? "text-red-600" : "text-emerald-700"
                      }`}
                    >
                      {result.heartAge}
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
                  Heart age translates your 10-year risk into the age of an otherwise-ideal heart. It is an
                  educational illustration, not a diagnosis.
                </p>
              </CardContent>
            </Card>

            {/* FEATURE 2 — SINGLE BIGGEST CHANGE ────────────────────────────── */}
            {result.topChange && (
              <Card className="border shadow-md">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-5 h-5 text-emerald-700" />
                    <h3 className="text-base font-bold">Your Single Biggest Win</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Of the factors you can change, the one that lowers your risk the most is{" "}
                    <span className="font-bold text-emerald-700">{result.topChange.label}</span>. On its own, that
                    would cut your 10-year risk by about{" "}
                    <span className="font-bold text-emerald-700">{result.topChange.reduction} points</span> — from{" "}
                    <span className={`font-bold ${result.riskColor}`}>{result.score}%</span> down to roughly{" "}
                    <span className="font-bold text-emerald-700">{result.topChange.projectedScore}%</span>.
                  </p>
                  <div className="grid grid-cols-3 gap-3 mt-5">
                    <div className="rounded-xl border bg-slate-50 dark:bg-slate-900 p-4 text-center">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Now</p>
                      <p className="text-lg font-black text-slate-800 dark:text-slate-100 mt-1">{result.score}%</p>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 p-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-[11px] uppercase tracking-wider text-emerald-700 font-bold">
                        <TrendingDown className="w-3.5 h-3.5" /> Cut
                      </div>
                      <p className="text-lg font-black text-emerald-700 mt-1">{result.topChange.reduction} pts</p>
                    </div>
                    <div className="rounded-xl border bg-slate-50 dark:bg-slate-900 p-4 text-center">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">After</p>
                      <p className="text-lg font-black text-emerald-700 mt-1">{result.topChange.projectedScore}%</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
                    Projection isolates a single change while holding everything else constant. Real-world results
                    vary — discuss any treatment plan with your doctor.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-start">
                <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                  {saved ? "Saved to history" : "Save this result"}
                </Button>
                {scoreDelta !== null && lastSaved && (
                  <div className="rounded-2xl border p-4 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-900">Compare with last saved score</p>
                    <p className={`mt-2 text-base font-bold ${scoreDelta < 0 ? "text-green-600" : scoreDelta > 0 ? "text-red-600" : "text-slate-700"}`}>
                      {scoreDelta < 0
                        ? `Risk improved by ${Math.abs(scoreDelta)} points`
                        : scoreDelta > 0
                        ? `Risk rose by ${scoreDelta} points`
                        : "No change from last saved score"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last saved: {new Date(lastSaved.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {lastSaved.score}%
                    </p>
                  </div>
                )}
              </div>
              {history.length > 0 && result && <ProgressCard current={result} history={history} />}
            </div>

            {/* 3. Action Plan Card */}
            <Card className="shadow-md bg-gradient-to-r from-white to-blue-50/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-600" /> Recommended Action Plan</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">Medical Guidance</h4>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            {result.recommendation}
                        </p>
                        <div className="text-sm text-gray-500 flex items-start gap-2 bg-white p-3 rounded border">
                            <Info className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>Ask your doctor: "Would I benefit from a coronary calcium scan or statin therapy based on this score?"</span>
                        </div>
                    </div>
                    <div>
                         <h4 className="font-medium text-gray-900 mb-3">Lifestyle Steps</h4>
                         <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 text-blue-400" /> Maintain a heart-healthy diet (Mediterranean or DASH).
                            </li>
                            <li className="flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 text-blue-400" /> Aim for 150 mins/week of moderate exercise.
                            </li>
                            <li className="flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 text-blue-400" /> Manage stress and get 7-8 hours of sleep.
                            </li>
                         </ul>
                    </div>
                </CardContent>
            </Card>

          </div>
        )}
      </div>
    </>
  );
}