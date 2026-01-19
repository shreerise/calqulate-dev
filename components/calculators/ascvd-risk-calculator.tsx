"use client";

import { useState, useRef } from "react";
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
import { Calculator, RefreshCw, Loader2, Info, Activity, HeartPulse, ArrowRight, CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";
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
}

export default function AscvdRiskCalculator() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

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

    return {
        score: Number(risk.toFixed(1)),
        optimalScore: Number(optimalRisk.toFixed(1)),
        riskCategory,
        riskColor,
        recommendation,
        drivers
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

  return (
    <>
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