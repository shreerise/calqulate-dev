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
import { Calculator, RefreshCw, Loader2, Activity, TrendingUp, TrendingDown, Clock, AlertTriangle } from "lucide-react";

// --- FORM SCHEMA ---
const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
  age: z.string().min(1, "Age is required").refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 120, "Enter a valid age"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  activityLevel: z.string().min(1, "Please select an activity level"),
  units: z.enum(["metric", "imperial"]),
});

type UnitSystem = "metric" | "imperial";

interface CalculationResult {
  bmr: number;
  tdee: number;
  metabolicAge: number;
  chronologicalAge: number;
  difference: number; // positive = older (bad), negative = younger (good)
  rating: string;
  ratingColor: string;
  advice: string;
}

// Activity Multipliers
const activityMultipliers = {
  "sedentary": 1.2,      // Little or no exercise
  "light": 1.375,        // Light exercise 1-3 days/week
  "moderate": 1.55,      // Moderate exercise 3-5 days/week
  "active": 1.725,       // Hard exercise 6-7 days/week
  "very_active": 1.9,    // Very hard exercise & physical job
};

export default function MetabolicAgeCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      gender: "female", 
      age: "", 
      height: "", 
      weight: "", 
      activityLevel: "sedentary",
      units: "metric" 
    },
  });

  const { getValues, setValue, watch } = form;
  const units = watch("units");

  // Unit Conversion Handler
  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;
    
    // Convert Height
    const currentHeight = getValues("height");
    if (currentHeight && !isNaN(parseFloat(currentHeight))) {
       // cm <-> ft/in (simplified to inches for input)
       // Metric to Imperial: cm / 2.54
       // Imperial to Metric: in * 2.54
       const val = parseFloat(currentHeight);
       const newVal = newUnit === 'imperial' ? (val / 2.54) : (val * 2.54);
       setValue("height", newVal.toFixed(1));
    }

    // Convert Weight
    const currentWeight = getValues("weight");
    if (currentWeight && !isNaN(parseFloat(currentWeight))) {
        // kg <-> lbs
        // Metric to Imperial: kg * 2.20462
        // Imperial to Metric: lbs / 2.20462
        const val = parseFloat(currentWeight);
        const newVal = newUnit === 'imperial' ? (val * 2.20462) : (val / 2.20462);
        setValue("weight", newVal.toFixed(1));
    }

    setValue("units", newUnit);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    // Simulate calculation delay for UX "Analysis" feel
    setTimeout(() => {
      // 1. Normalize inputs to Metric
      const age = parseFloat(values.age);
      let weight = parseFloat(values.weight); // kg
      let height = parseFloat(values.height); // cm

      if (values.units === "imperial") {
        weight = weight / 2.20462;
        height = height * 2.54;
      }

      // 2. Calculate BMR (Mifflin-St Jeor)
      // Men: (10 × weight) + (6.25 × height) - (5 × age) + 5
      // Women: (10 × weight) + (6.25 × height) - (5 × age) - 161
      let bmr = (10 * weight) + (6.25 * height) - (5 * age);
      bmr += values.gender === "male" ? 5 : -161;

      // 3. Calculate TDEE
      const multiplier = activityMultipliers[values.activityLevel as keyof typeof activityMultipliers] || 1.2;
      const tdee = bmr * multiplier;

      // 4. Calculate Metabolic Age (Algorithm logic)
      // Logic: Compare User's Adjusted BMR (TDEE basically) vs Population Norms.
      // If TDEE is high relative to age/size, Metabolic Age is lower.
      
      // Standard BMR factor decline per year is approx 0.5% to 1% after age 30.
      // We calculate an "Ideal BMR" for the chronological age (based on height/weight).
      // Then we solve for the Age that matches the user's ACTUAL BMR.
      
      // Simplified formula for engagement:
      // Score = (User BMR * ActivityFactor) / (Standard BMR for that Weight/Height at Age 30)
      
      // Reference BMR (Age 30)
      let refBmr = (10 * weight) + (6.25 * height) - (5 * 30);
      refBmr += values.gender === "male" ? 5 : -161;
      
      // Impact of Activity:
      // High activity mimics a younger metabolism.
      // We assume Age 30 has a multiplier of 1.55 (Moderate) as "Ideal".
      const userMetabolicPower = bmr * multiplier;
      const idealMetabolicPower = refBmr * 1.45; // slightly lower benchmark

      const ratio = idealMetabolicPower / userMetabolicPower;
      
      // Calculated Metabolic Age
      // If user is powerful (ratio < 1), age < 30.
      // If user is weak (ratio > 1), age > 30.
      // We anchor it to their actual age to prevent wild swings (e.g., saying a 60yo is 20).
      
      let calculatedAge = age * ratio;

      // Smoothing: Metabolic age shouldn't drift MORE than +/- 15 years usually unless extreme.
      const maxDiff = 15;
      if (calculatedAge > age + maxDiff) calculatedAge = age + maxDiff;
      if (calculatedAge < age - maxDiff) calculatedAge = age - maxDiff;
      
      // Hard cap
      if (calculatedAge < 18) calculatedAge = 18;
      
      const metAge = Math.round(calculatedAge);
      const diff = metAge - age;

      // 5. Determine Rating & Advice
      let rating = "";
      let ratingColor = "";
      let advice = "";

      if (diff <= -5) {
        rating = "Athletic";
        ratingColor = "text-emerald-600";
        advice = "Fantastic! Your metabolic rate is significantly higher than average for your age. Keep up your strength training and protein intake to maintain this advantage.";
      } else if (diff < 0) {
        rating = "Healthy";
        ratingColor = "text-green-600";
        advice = "Great job. Your body is functioning younger than your calendar age. Continue your active lifestyle to preserve muscle mass.";
      } else if (diff === 0) {
        rating = "Average";
        ratingColor = "text-yellow-600";
        advice = "Your metabolic age matches your chronological age. This is normal, but adding 2 days of resistance training per week could help you get younger!";
      } else if (diff <= 5) {
        rating = "Below Average";
        ratingColor = "text-orange-600";
        advice = "Your metabolism is slightly slower than ideal. This often happens due to muscle loss or sedentary work. Try increasing your daily step count.";
      } else {
        rating = "Needs Improvement";
        ratingColor = "text-red-600";
        advice = "Your metabolic age is notably higher than your actual age. This suggests a slow metabolism. Focus on building lean muscle mass and prioritizing sleep to reverse this.";
      }

      setResult({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        metabolicAge: metAge,
        chronologicalAge: age,
        difference: diff,
        rating,
        ratingColor,
        advice
      });

      setIsLoading(false);
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);

    }, 800);
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto border-t-4 border-t-primary shadow-lg" id="calculator">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-900">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Activity className="w-6 h-6 text-primary" /> Metabolic Age Calculator
          </CardTitle>
          <CardDescription>
            Enter your details below. We use the Mifflin-St Jeor equation combined with activity factors to estimate your biological age.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Gender & Units */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Gender</FormLabel>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="female" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Female</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="male" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Male</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )} />

                <FormField control={form.control} name="units" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Units</FormLabel>
                    <RadioGroup onValueChange={(val) => handleUnitChange(val as UnitSystem)} value={field.value} className="flex space-x-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="metric" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Metric (kg/cm)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="imperial" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Imperial (lbs/in)</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )} />
              </div>

              {/* Measurements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g. 30" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height ({units === 'metric' ? 'cm' : 'inches'})</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={units === 'metric' ? "170" : "67"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight ({units === 'metric' ? 'kg' : 'lbs'})</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={units === 'metric' ? "70" : "154"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Activity Level */}
              <FormField control={form.control} name="activityLevel" render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (Office job, little exercise)</SelectItem>
                      <SelectItem value="light">Lightly Active (1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderately Active (3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                      <SelectItem value="very_active">Very Active (Physical job or heavy training)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="flex gap-4 pt-2">
                <Button type="submit" className="flex-1 text-lg h-12" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Calculator className="mr-2 h-5 w-5" />}
                  {isLoading ? "Analyzing..." : "Calculate Metabolic Age"}
                </Button>
                <Button type="button" variant="outline" className="h-12 px-6" onClick={() => { form.reset(); setResult(null); }} disabled={isLoading}>
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* --- RESULTS SECTION --- */}
      <div ref={resultsRef} className="scroll-mt-24">
        {result && (
          <div className="max-w-4xl mx-auto mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Main Result Card */}
            <Card className="overflow-hidden border-2 border-primary/10">
              <div className="bg-slate-900 text-white p-6 md:p-10 text-center relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20 z-0"></div>
                <div className="relative z-10">
                    <h3 className="text-xl font-medium text-slate-300 mb-2">Your Metabolic Age is</h3>
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-7xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-lg">
                            {result.metabolicAge}
                        </span>
                        <div className="flex flex-col text-left">
                           <span className="text-sm text-slate-400">YEARS</span>
                           {result.difference < 0 ? (
                               <span className="text-emerald-400 font-bold flex items-center gap-1 bg-emerald-400/10 px-2 py-1 rounded text-sm">
                                   <TrendingDown className="w-4 h-4" /> {Math.abs(result.difference)} Years Younger
                               </span>
                           ) : result.difference > 0 ? (
                               <span className="text-red-400 font-bold flex items-center gap-1 bg-red-400/10 px-2 py-1 rounded text-sm">
                                   <TrendingUp className="w-4 h-4" /> {result.difference} Years Older
                               </span>
                           ) : (
                               <span className="text-yellow-400 font-bold flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded text-sm">
                                   <Clock className="w-4 h-4" /> Exact Match
                               </span>
                           )}
                        </div>
                    </div>
                    <p className={`mt-4 text-lg font-medium ${result.ratingColor === 'text-emerald-600' || result.ratingColor === 'text-green-600' ? 'text-emerald-300' : 'text-slate-300'}`}>
                        Assessment: {result.rating}
                    </p>
                </div>
              </div>

              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Metrics */}
                    <div className="space-y-6">
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground font-medium">Basal Metabolic Rate (BMR)</p>
                                <p className="text-2xl font-bold text-slate-800 dark:text-white">{result.bmr} <span className="text-sm font-normal text-slate-500">kcal/day</span></p>
                            </div>
                            <Activity className="text-blue-500 w-8 h-8 opacity-80" />
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground font-medium">Daily Energy Burn (TDEE)</p>
                                <p className="text-2xl font-bold text-slate-800 dark:text-white">{result.tdee} <span className="text-sm font-normal text-slate-500">kcal/day</span></p>
                            </div>
                            <TrendingUp className="text-orange-500 w-8 h-8 opacity-80" />
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                            *BMR is calories burned at rest. TDEE includes your activity level.
                        </div>
                    </div>

                    {/* Action Plan */}
                    <div className="flex flex-col justify-center">
                         <h4 className="font-semibold text-lg flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-500" /> 
                            Action Plan
                         </h4>
                         <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                             {result.advice}
                         </p>
                         <Button variant="link" className="px-0 text-primary self-start mt-2">
                             Read full guide on lowering metabolic age &rarr;
                         </Button>
                    </div>
                </div>
              </CardContent>
            </Card>

            {/* Visual Scale */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-base">Visual Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative pt-6 pb-2">
                        {/* The Bar */}
                        <div className="h-4 bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-500 rounded-full w-full"></div>
                        
                        {/* The Markers */}
                        <div className="absolute top-0 w-full h-full pointer-events-none">
                            {/* Chronological Age Marker */}
                            <div className="absolute top-0 -ml-3 flex flex-col items-center" style={{ left: '50%' }}>
                                <div className="h-10 w-0.5 bg-slate-800 dark:bg-white mb-1"></div>
                                <span className="text-xs font-bold bg-slate-800 text-white px-2 py-1 rounded">Actual: {result.chronologicalAge}</span>
                            </div>

                            {/* Metabolic Age Marker (Clamped to create visual logic) */}
                            {(() => {
                                // Calculate visual position relative to center (50%)
                                // Max visual deviation +/- 30% from center
                                let offset = ((result.metabolicAge - result.chronologicalAge) / result.chronologicalAge) * 100;
                                // Clamp visual for UI safety
                                if(offset > 45) offset = 45;
                                if(offset < -45) offset = -45;
                                const position = 50 + offset;
                                
                                return (
                                    <div className="absolute top-4 -ml-4 flex flex-col items-center transition-all duration-1000" style={{ left: `${position}%` }}>
                                        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-t-[12px] border-t-primary border-r-[8px] border-r-transparent mb-1"></div>
                                        <span className="text-xs font-bold text-primary whitespace-nowrap">Metabolic: {result.metabolicAge}</span>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-8">
                        <span>Younger / Athletic</span>
                        <span>Average</span>
                        <span>Older / Sedentary</span>
                    </div>
                </CardContent>
            </Card>

          </div>
        )}
      </div>
    </>
  );
}