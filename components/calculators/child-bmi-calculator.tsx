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
import { Calculator, RefreshCw, Loader2, Baby, Activity, AlertCircle, ArrowRight, HeartPulse } from "lucide-react";

// --- CDC APPROXIMATION DATA (Ages 2 to 20) ---
// Simplified subset of CDC Growth Chart thresholds representing 5th, 85th, and 95th percentiles.
const growthData = {
  boy: {
    2: { p5: 14.7, p85: 18.2, p95: 19.3 },
    3: { p5: 14.3, p85: 17.4, p95: 18.3 },
    4: { p5: 14.0, p85: 16.9, p95: 17.8 },
    5: { p5: 13.8, p85: 16.8, p95: 17.9 },
    6: { p5: 13.7, p85: 17.0, p95: 18.4 },
    7: { p5: 13.7, p85: 17.4, p95: 19.1 },
    8: { p5: 13.8, p85: 17.9, p95: 20.0 },
    9: { p5: 14.0, p85: 18.6, p95: 21.0 },
    10: { p5: 14.2, p85: 19.4, p95: 22.2 },
    11: { p5: 14.6, p85: 20.2, p95: 23.2 },
    12: { p5: 15.0, p85: 21.0, p95: 24.2 },
    13: { p5: 15.5, p85: 21.8, p95: 25.1 },
    14: { p5: 16.0, p85: 22.6, p95: 26.0 },
    15: { p5: 16.5, p85: 23.4, p95: 26.8 },
    16: { p5: 17.0, p85: 24.2, p95: 27.5 },
    17: { p5: 17.5, p85: 24.9, p95: 28.2 },
    18: { p5: 18.0, p85: 25.6, p95: 28.9 },
    19: { p5: 18.5, p85: 26.3, p95: 29.7 },
    20: { p5: 19.0, p85: 27.0, p95: 30.5 },
  },
  girl: {
    2: { p5: 14.4, p85: 18.0, p95: 19.1 },
    3: { p5: 14.0, p85: 17.2, p95: 18.2 },
    4: { p5: 13.7, p85: 16.8, p95: 18.0 },
    5: { p5: 13.5, p85: 16.8, p95: 18.2 },
    6: { p5: 13.4, p85: 17.1, p95: 18.8 },
    7: { p5: 13.4, p85: 17.6, p95: 19.6 },
    8: { p5: 13.5, p85: 18.3, p95: 20.6 },
    9: { p5: 13.7, p85: 19.1, p95: 21.7 },
    10: { p5: 14.0, p85: 20.0, p95: 22.9 },
    11: { p5: 14.4, p85: 20.9, p95: 24.1 },
    12: { p5: 14.8, p85: 21.7, p95: 25.2 },
    13: { p5: 15.3, p85: 22.5, p95: 26.2 },
    14: { p5: 15.8, p85: 23.3, p95: 27.2 },
    15: { p5: 16.3, p85: 24.0, p95: 28.1 },
    16: { p5: 16.8, p85: 24.6, p95: 28.9 },
    17: { p5: 17.2, p85: 25.2, p95: 29.6 },
    18: { p5: 17.5, p85: 25.7, p95: 30.3 },
    19: { p5: 17.8, p85: 26.1, p95: 31.0 },
    20: { p5: 18.1, p85: 26.5, p95: 31.8 },
  }
};

// --- FORM SCHEMA ---
const formSchema = z.object({
  units: z.enum(["metric", "imperial"]),
  gender: z.enum(["boy", "girl"], { required_error: "Please select a gender." }),
  ageYears: z.string().min(1, "Required").refine(val => {
    const num = parseInt(val);
    return num >= 2 && num <= 20;
  }, "Age must be between 2 and 20."),
  ageMonths: z.string().min(1, "Required"),
  heightCm: z.string().optional(),
  heightFt: z.string().optional(),
  heightIn: z.string().optional(),
  weightKg: z.string().optional(),
  weightLbs: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.units === 'metric') {
    if (!data.heightCm) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["heightCm"] });
    if (!data.weightKg) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["weightKg"] });
  } else {
    if (!data.heightFt) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["heightFt"] });
    if (!data.heightIn && data.heightIn !== '0') ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["heightIn"] });
    if (!data.weightLbs) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["weightLbs"] });
  }
});

type UnitSystem = "metric" | "imperial";
type Gender = "boy" | "girl";

// --- RESULT TYPE INTERFACE ---
interface CalculationResult {
  bmi: number;
  percentile: number;
  category: "Underweight" | "Healthy Weight" | "At Risk of Overweight" | "Overweight / Obese";
  insight: string;
  advice: string;
}

// --- VISUAL GAUGE COMPONENT ---
const PercentileGauge = ({ percentile }: { percentile: number }) => {
  // Ensure visual thumb stays within bounds (3% to 97% visually for the needle)
  const visualPosition = Math.max(3, Math.min(97, percentile));
  
  let thumbColor = "bg-green-500";
  if (percentile < 5) thumbColor = "bg-blue-400";
  else if (percentile >= 85 && percentile < 95) thumbColor = "bg-yellow-500";
  else if (percentile >= 95) thumbColor = "bg-red-500";

  return (
    <div className="w-full mt-8 mb-4">
      <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-2 px-1 uppercase tracking-wider">
        <span>0%</span>
        <span>5%</span>
        <span>85%</span>
        <span>95%</span>
        <span>100%</span>
      </div>
      
      {/* Background Bars */}
      <div className="relative h-5 w-full rounded-full flex overflow-hidden shadow-inner bg-gray-100 dark:bg-gray-800">
        <div className="h-full bg-blue-300 dark:bg-blue-400/80" style={{ width: '5%' }}></div>
        <div className="h-full bg-green-400 dark:bg-green-500/80" style={{ width: '80%' }}></div>
        <div className="h-full bg-yellow-400 dark:bg-yellow-500/80" style={{ width: '10%' }}></div>
        <div className="h-full bg-red-400 dark:bg-red-500/80" style={{ width: '5%' }}></div>
      </div>
      
      {/* Needle Indicator */}
      <div className="relative w-full h-0">
        <div 
          className="absolute top-[-30px] transform -translate-x-1/2 flex flex-col items-center transition-all duration-1000 ease-out"
          style={{ left: `${visualPosition}%` }}
        >
          <div className={`text-xs font-bold px-2 py-1 rounded shadow-md text-white ${thumbColor}`}>
            {percentile > 99 ? '>99' : percentile < 1 ? '<1' : Math.round(percentile)}th
          </div>
          <div className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent mt-[2px]`} 
               style={{ borderTopColor: thumbColor === 'bg-blue-400' ? '#60a5fa' : thumbColor === 'bg-green-500' ? '#22c55e' : thumbColor === 'bg-yellow-500' ? '#eab308' : '#ef4444' }}>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChildBmiCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      units: "imperial", 
      gender: "boy", 
      ageYears: "", 
      ageMonths: "0",
      heightCm: "", heightFt: "", heightIn: "", 
      weightKg: "", weightLbs: "" 
    },
  });

  const { getValues, setValue, watch } = form;
  const units = watch("units");

  // Handle unit swapping without losing data
  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;

    if (newUnit === 'metric') {
      const ft = parseFloat(getValues("heightFt") || "0");
      const inc = parseFloat(getValues("heightIn") || "0");
      const lbs = parseFloat(getValues("weightLbs") || "0");
      
      if (ft || inc) setValue("heightCm", (((ft * 12) + inc) * 2.54).toFixed(1));
      if (lbs) setValue("weightKg", (lbs * 0.453592).toFixed(1));
    } else {
      const cm = parseFloat(getValues("heightCm") || "0");
      const kg = parseFloat(getValues("weightKg") || "0");
      
      if (cm) {
        const totalInches = cm / 2.54;
        setValue("heightFt", Math.floor(totalInches / 12).toString());
        setValue("heightIn", (totalInches % 12).toFixed(1));
      }
      if (kg) setValue("weightLbs", (kg / 0.453592).toFixed(1));
    }
    setValue("units", newUnit);
  };

  // Logic to interpolate thresholds based on exact age in years and months
  const getThresholds = (gender: Gender, years: number, months: number) => {
    const data = growthData[gender];
    const base = data[years as keyof typeof data];
    // If age is 20, we can't interpolate upward, so cap it
    const next = data[(years + 1) as keyof typeof data] || base; 

    const fraction = months / 12;
    return {
      p5: base.p5 + (next.p5 - base.p5) * fraction,
      p85: base.p85 + (next.p85 - base.p85) * fraction,
      p95: base.p95 + (next.p95 - base.p95) * fraction,
    };
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    setTimeout(() => {
      let weightKg = 0;
      let heightM = 0;

      if (values.units === "metric") {
        weightKg = parseFloat(values.weightKg!);
        heightM = parseFloat(values.heightCm!) / 100;
      } else {
        weightKg = parseFloat(values.weightLbs!) * 0.453592;
        const totalInches = (parseFloat(values.heightFt!) * 12) + parseFloat(values.heightIn! || "0");
        heightM = totalInches * 0.0254;
      }

      const bmi = weightKg / (heightM * heightM);
      const years = parseInt(values.ageYears);
      const months = parseInt(values.ageMonths);
      
      // Interpolate the exact thresholds for the child's age
      const thresholds = getThresholds(values.gender, years, months);

      // Estimate the exact percentile using a simplified curve mapping
      let percentile = 50;
      let category: CalculationResult["category"] = "Healthy Weight";
      let insight = "";
      let advice = "";

      if (bmi < thresholds.p5) {
        percentile = Math.max(1, (bmi / thresholds.p5) * 5);
        category = "Underweight";
        insight = `A BMI below the 5th percentile indicates your child weighs less than 95% of ${values.gender === 'boy' ? 'boys' : 'girls'} their exact age.`;
        advice = "Speak with your pediatrician or a registered dietitian to ensure your child is getting the necessary nutrients and calories needed for healthy development.";
      } else if (bmi < thresholds.p85) {
        const range = thresholds.p85 - thresholds.p5;
        percentile = 5 + ((bmi - thresholds.p5) / range) * 80;
        category = "Healthy Weight";
        insight = `Great! Your child's BMI falls within the healthy range. They are in the ${Math.round(percentile)}th percentile.`;
        advice = "Continue to encourage a balanced, nutrient-rich diet and ensure they get at least 60 minutes of physical activity every day to support ongoing healthy growth.";
      } else if (bmi < thresholds.p95) {
        const range = thresholds.p95 - thresholds.p85;
        percentile = 85 + ((bmi - thresholds.p85) / range) * 10;
        category = "At Risk of Overweight";
        insight = `Your child's BMI is higher than average for their age. They weigh more than ${Math.round(percentile)}% of their peers.`;
        advice = "Because kids are still growing, do NOT place them on a restrictive diet. Instead, focus on family-wide healthy eating habits, reducing sugary drinks, and increasing active playtime.";
      } else {
        percentile = Math.min(99, 95 + ((bmi - thresholds.p95) / 5) * 4);
        category = "Overweight / Obese";
        insight = `A BMI at or above the 95th percentile is categorized as obese by CDC guidelines.`;
        advice = "We highly recommend consulting a healthcare provider who can evaluate their overall health, muscle mass, and help you create a safe, supportive lifestyle plan without stigma.";
      }

      setResult({ bmi, percentile, category, insight, advice });
      setIsLoading(false);
      
      // Smooth scroll to results
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
    }, 600);
  }

  // Dynamic Styles
  const getCategoryTextColor = (cat: string) => {
    if (cat === "Underweight") return "text-blue-500 dark:text-blue-400";
    if (cat === "Healthy Weight") return "text-green-600 dark:text-green-500";
    if (cat === "At Risk of Overweight") return "text-yellow-600 dark:text-yellow-500";
    return "text-red-600 dark:text-red-500";
  };

  const getCategoryBgColor = (cat: string) => {
    if (cat === "Underweight") return "bg-blue-50 dark:bg-blue-950/20 border-blue-200";
    if (cat === "Healthy Weight") return "bg-green-50 dark:bg-green-950/20 border-green-200";
    if (cat === "At Risk of Overweight") return "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200";
    return "bg-red-50 dark:bg-red-950/20 border-red-200";
  };

  return (
    <>
      <Card className="max-w-4xl mx-auto border border-gray-200 shadow-md rounded-2xl" id="calculator">
        <CardHeader className="bg-gray-50/50 dark:bg-muted/10 border-b border-gray-100 dark:border-muted rounded-t-2xl pb-6">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Activity className="w-6 h-6 text-primary" /> 
            Calculate Child & Teen BMI
          </CardTitle>
          <CardDescription className="text-base">
            For children and teens aged 2 to 20 years.
            <span className="block mt-2 text-sm">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Over 20?</span>{" "}
              <Link href="/health/bmi-calculator" className="text-blue-600 hover:text-blue-700 underline font-medium">
                Use the Adult BMI Calculator
              </Link>
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Top Row: Units & Gender */}
              <div className="grid sm:grid-cols-2 gap-8 p-5 bg-muted/30 rounded-xl border border-muted/50">
                <FormField control={form.control} name="units" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-foreground">Measurement System</FormLabel>
                    <RadioGroup 
                      onValueChange={(value) => handleUnitChange(value as UnitSystem)} 
                      value={field.value} 
                      className="flex bg-white dark:bg-background border rounded-lg p-1 w-fit"
                    >
                      <FormItem className="flex items-center space-x-0 space-y-0">
                        <FormControl><RadioGroupItem value="imperial" className="peer sr-only" /></FormControl>
                        <FormLabel className="cursor-pointer rounded-md py-2 px-4 text-sm font-medium peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=unchecked]:hover:bg-muted transition-all">
                          Imperial (lb, ft)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-0 space-y-0">
                        <FormControl><RadioGroupItem value="metric" className="peer sr-only" /></FormControl>
                        <FormLabel className="cursor-pointer rounded-md py-2 px-4 text-sm font-medium peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-data-[state=unchecked]:hover:bg-muted transition-all">
                          Metric (kg, cm)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )} />

                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-foreground">Biological Sex</FormLabel>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      value={field.value} 
                      className="flex space-x-6 pt-1"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="boy" /></FormControl>
                        <FormLabel className="font-medium cursor-pointer text-base">Boy</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="girl" /></FormControl>
                        <FormLabel className="font-medium cursor-pointer text-base">Girl</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )} />
              </div>

              {/* Input Grid: Age, Height, Weight */}
              <div className="grid md:grid-cols-3 gap-8">
                
                {/* Age Input */}
                <div className="space-y-4">
                  <h3 className="font-semibold border-b pb-2 flex items-center gap-2">
                    <Baby className="w-4 h-4 text-muted-foreground" /> Exact Age
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField control={form.control} name="ageYears" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years (2-20)</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g. 5" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="ageMonths" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Months</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Months" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[...Array(12)].map((_, i) => (
                              <SelectItem key={i} value={i.toString()}>{i} mo.</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>

                {/* Height Input */}
                <div className="space-y-4">
                  <h3 className="font-semibold border-b pb-2">Height</h3>
                  {units === 'metric' ? (
                    <FormField control={form.control} name="heightCm" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Centimeters (cm)</FormLabel>
                        <FormControl><Input type="number" step="0.1" placeholder="e.g. 110" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <FormField control={form.control} name="heightFt" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Feet (ft)</FormLabel>
                          <FormControl><Input type="number" placeholder="e.g. 3" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="heightIn" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inches (in)</FormLabel>
                          <FormControl><Input type="number" step="0.1" placeholder="e.g. 8" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  )}
                </div>

                {/* Weight Input */}
                <div className="space-y-4">
                  <h3 className="font-semibold border-b pb-2">Weight</h3>
                  {units === 'metric' ? (
                    <FormField control={form.control} name="weightKg" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kilograms (kg)</FormLabel>
                        <FormControl><Input type="number" step="0.1" placeholder="e.g. 18.5" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  ) : (
                    <FormField control={form.control} name="weightLbs" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pounds (lbs)</FormLabel>
                        <FormControl><Input type="number" step="0.1" placeholder="e.g. 40" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button type="submit" className="flex-1 h-14 text-lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Calculator className="h-5 w-5 mr-2" />}
                  {isLoading ? 'Calculating...' : 'Calculate BMI Percentile'}
                </Button>
                <Button type="button" variant="outline" className="flex-1 h-14 text-lg" onClick={() => { form.reset(); setResult(null); }} disabled={isLoading}>
                  <RefreshCw className="h-5 w-5 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* RESULTS SECTION */}
      <div ref={resultsRef} className="scroll-mt-24">
        {result && (
          <Card className={`max-w-4xl mx-auto mt-10 border-2 shadow-xl rounded-2xl ${getCategoryBgColor(result.category)} transition-all duration-500`}>
            <CardContent className="p-0">
              
              {/* Header result visualization */}
              <div className="bg-white/60 dark:bg-background/40 backdrop-blur-sm p-8 text-center border-b border-black/5 dark:border-white/5 rounded-t-xl">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">BMI-for-Age Result</p>
                <div className="flex flex-col items-center justify-center">
                  <h3 className={`text-4xl md:text-5xl font-black mb-2 ${getCategoryTextColor(result.category)}`}>
                    {result.category}
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{Math.round(result.percentile)}</span>
                    <sup className="text-lg">
                      {result.percentile % 10 === 1 && result.percentile !== 11 ? 'st' : 
                       result.percentile % 10 === 2 && result.percentile !== 12 ? 'nd' : 
                       result.percentile % 10 === 3 && result.percentile !== 13 ? 'rd' : 'th'}
                    </sup> 
                    Percentile
                  </p>
                </div>
                
                <div className="mt-6 max-w-2xl mx-auto px-2">
                  <PercentileGauge percentile={result.percentile} />
                </div>
              </div>

              {/* Info & Advice Cards */}
              <div className="p-6 md:p-8 space-y-6">
                
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/80 dark:bg-background/80 shadow-sm border border-black/5">
                  <Activity className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">What this means</h4>
                    <p className="text-muted-foreground mt-2 leading-relaxed">
                      {result.insight} A raw BMI score of <strong>{result.bmi.toFixed(1)}</strong> placed on the CDC growth chart means they weigh more than {Math.round(result.percentile)}% of {form.getValues('gender') === 'boy' ? 'boys' : 'girls'} their exact age, and less than {100 - Math.round(result.percentile)}%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-white/80 dark:bg-background/80 shadow-sm border border-black/5">
                  <AlertCircle className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">Actionable Advice</h4>
                    <p className="text-muted-foreground mt-2 leading-relaxed">
                      {result.advice}
                    </p>
                  </div>
                </div>

                {/* Internal Cross-Link / Referral Inside Results */}
                <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md">
                    <div>
                      <h4 className="font-bold text-lg mb-1">Are you a parent checking this?</h4>
                      <p className="text-indigo-100 text-sm max-w-md">
                        Understand your own health and body proportions! Get tailored style tips and fitness insights instantly.
                      </p>
                    </div>
                    <Link href="/health/body-shape-calculator" className="shrink-0 w-full sm:w-auto">
                      <Button variant="secondary" className="w-full bg-white text-indigo-700 hover:bg-indigo-50 font-semibold shadow-sm">
                        Find Your Body Shape <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}