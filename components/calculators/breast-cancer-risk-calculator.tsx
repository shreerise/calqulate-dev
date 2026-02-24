"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RefreshCw, Loader2, HeartPulse, Stethoscope, ArrowRight, ShieldAlert, CheckCircle2, Activity } from "lucide-react";

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

interface CalculationResult {
  riskLevel: "Average" | "Moderate" | "High";
  scoreMultiplier: number;
  description: string;
  actionPlan: string[];
  doctorQuestions: string[];
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

const calculateRisk = (data: FormData): CalculationResult => {
  let score = 1.0; // Baseline multiplier
  const age = parseInt(data.age);

  // 1. Age Factor (Risk generally increases with age)
  if (age >= 60) score *= 1.5;
  else if (age >= 50) score *= 1.3;
  else if (age >= 40) score *= 1.1;

  // 2. Menarche Age
  if (data.menarcheAge === "<12") score *= 1.2;
  else if (data.menarcheAge === "12-13") score *= 1.1;

  // 3. First Birth Age
  if (data.firstBirthAge === "nulliparous") score *= 1.3;
  else if (data.firstBirthAge === ">=30") score *= 1.4;
  else if (data.firstBirthAge === "25-29") score *= 1.1;

  // 4. First Degree Relatives
  if (data.firstDegreeRelatives === "1") score *= 1.8;
  else if (data.firstDegreeRelatives === "2+") score *= 2.5;

  // 5. Biopsy & Atypia
  if (data.priorBiopsy === "yes") {
    score *= 1.3;
    if (data.atypicalHyperplasia === "yes") score *= 2.0;
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

  return {
    riskLevel,
    scoreMultiplier: score,
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
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      priorBiopsy: "no",
      atypicalHyperplasia: "unknown"
    },
  });

  const watchBiopsy = form.watch("priorBiopsy");

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
              <div className={`h-3 w-full ${result.riskLevel === 'High' ? 'bg-red-500' : result.riskLevel === 'Moderate' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
              <CardContent className="p-8">
                
                {/* Visual Risk Gauge */}
                <RiskGauge level={result.riskLevel} multiplier={result.scoreMultiplier} />
                
                <div className="mt-8 bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border">
                  <p className="text-gray-700 dark:text-gray-300 text-lg text-center leading-relaxed">
                    {result.description}
                  </p>
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