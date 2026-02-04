"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Calculator, RefreshCw, Loader2, Scale, Target, TrendingDown, TrendingUp, Activity, Info } from "lucide-react";

// --- FORM SCHEMA ---
const formSchema = z.object({
  gender: z.enum(["male", "female"]),
  age: z.string().min(1, "Age is required"),
  units: z.enum(["metric", "imperial"]),
  // Metric
  heightCm: z.string().optional(),
  weightKg: z.string().optional(),
  // Imperial
  heightFt: z.string().optional(),
  heightIn: z.string().optional(),
  weightLbs: z.string().optional(),
});

type UnitSystem = "metric" | "imperial";

// --- RESULT INTERFACE ---
interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  textColor: string;
  ponderalIndex: number;
  prime: number; // BMI Prime
  idealRange: string;
  weightDifference: {
    amount: string;
    type: "lose" | "gain" | "maintain";
  } | null;
  description: string;
}

// --- CONVERSION HELPERS ---
const KG_TO_LBS = 2.20462;
const CM_TO_IN = 0.393701;

// --- VISUAL COMPONENTS ---

// 1. The Interactive Gauge
const BMIGauge = ({ bmi, category }: { bmi: number; category: string }) => {
  // Scale visual from BMI 15 to 40
  const min = 15;
  const max = 40;
  const percent = Math.min(Math.max(((bmi - min) / (max - min)) * 100), 100);

  return (
    <div className="mt-8 mb-4">
      {/* Labels */}
      <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
        <span>Under</span>
        <span className="text-center pl-2">Healthy</span>
        <span className="text-center pl-4">Over</span>
        <span className="text-right">Obese</span>
      </div>
      
      {/* Bar */}
      <div className="relative h-4 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-visible">
        <div className="absolute inset-0 rounded-full opacity-90 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500"></div>
        
        {/* Markers for 18.5, 25, 30 */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white mix-blend-overlay" style={{ left: `${((18.5 - min) / (max - min)) * 100}%` }}></div>
        <div className="absolute top-0 bottom-0 w-0.5 bg-white mix-blend-overlay" style={{ left: `${((25 - min) / (max - min)) * 100}%` }}></div>
        <div className="absolute top-0 bottom-0 w-0.5 bg-white mix-blend-overlay" style={{ left: `${((30 - min) / (max - min)) * 100}%` }}></div>

        {/* The Indicator Pin */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-8 bg-slate-900 dark:bg-white transition-all duration-1000 z-10"
          style={{ left: `${percent}%` }}
        >
           <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded font-bold shadow-sm whitespace-nowrap">
             {bmi}
           </div>
           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 dark:bg-white rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default function BmiCalculator() {
  const [result, setResult] = useState<BMIResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "female",
      age: "30",
      units: "metric",
      heightCm: "",
      weightKg: "",
      heightFt: "",
      heightIn: "",
      weightLbs: "",
    },
  });

  const { setValue, getValues, watch } = form;
  const currentUnits = watch("units");

  // --- SMART UNIT CONVERSION HANDLER ---
  const handleUnitChange = (newUnit: UnitSystem) => {
    const oldUnit = getValues("units");
    if (newUnit === oldUnit) return;

    if (newUnit === "imperial") {
      // Metric -> Imperial
      const cm = parseFloat(getValues("heightCm") || "0");
      const kg = parseFloat(getValues("weightKg") || "0");

      if (cm > 0) {
        const totalInches = cm * CM_TO_IN;
        setValue("heightFt", Math.floor(totalInches / 12).toString());
        setValue("heightIn", Math.round(totalInches % 12).toString());
        setValue("heightCm", ""); // Clear old
      }
      if (kg > 0) {
        setValue("weightLbs", (kg * KG_TO_LBS).toFixed(1));
        setValue("weightKg", ""); // Clear old
      }
    } else {
      // Imperial -> Metric
      const ft = parseFloat(getValues("heightFt") || "0");
      const inch = parseFloat(getValues("heightIn") || "0");
      const lbs = parseFloat(getValues("weightLbs") || "0");

      if (ft > 0 || inch > 0) {
        const totalInches = (ft * 12) + inch;
        setValue("heightCm", (totalInches * 2.54).toFixed(1));
        setValue("heightFt", "");
        setValue("heightIn", "");
      }
      if (lbs > 0) {
        setValue("weightKg", (lbs / KG_TO_LBS).toFixed(1));
        setValue("weightLbs", "");
      }
    }
    setValue("units", newUnit);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      let weightKg = 0;
      let heightM = 0;

      // 1. Normalize Inputs
      if (values.units === "metric") {
        weightKg = parseFloat(values.weightKg || "0");
        heightM = parseFloat(values.heightCm || "0") / 100;
      } else {
        weightKg = parseFloat(values.weightLbs || "0") / KG_TO_LBS;
        const totalInches = (parseFloat(values.heightFt || "0") * 12) + parseFloat(values.heightIn || "0");
        heightM = totalInches * 0.0254;
      }

      if (heightM > 0 && weightKg > 0) {
        // 2. Core Calculations
        const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
        const pi = parseFloat((weightKg / Math.pow(heightM, 3)).toFixed(2)); // Ponderal Index
        const prime = parseFloat((bmi / 25).toFixed(2)); // BMI Prime (Relative to upper limit)

        // 3. Category Logic
        let category = "";
        let color = "";
        let textColor = "";
        let desc = "";

        if (bmi < 18.5) {
            category = "Underweight";
            color = "bg-blue-500";
            textColor = "text-blue-600";
            desc = "A low BMI can indicate undernutrition. Focus on nutrient-dense foods to gain weight safely.";
        } else if (bmi < 25) {
            category = "Normal Weight";
            color = "bg-green-500";
            textColor = "text-green-600";
            desc = "Your weight is healthy for your height. Maintain this with balanced nutrition and activity.";
        } else if (bmi < 30) {
            category = "Overweight";
            color = "bg-yellow-500";
            textColor = "text-yellow-600";
            desc = "You are slightly above the ideal range. Small lifestyle tweaks can help prevent future issues.";
        } else {
            category = "Obesity";
            color = "bg-red-500";
            textColor = "text-red-600";
            desc = "A high BMI is linked to higher health risks. Consulting a professional for a plan is recommended.";
        }

        // 4. "The Gap" (Weight to Lose/Gain)
        const minHealthyKg = 18.5 * (heightM * heightM);
        const maxHealthyKg = 24.9 * (heightM * heightM);
        
        let weightDifference = null;
        if (bmi < 18.5) {
            const gain = (minHealthyKg - weightKg);
            weightDifference = { 
                amount: values.units === 'metric' ? `${gain.toFixed(1)} kg` : `${(gain * KG_TO_LBS).toFixed(1)} lbs`, 
                type: "gain" as const 
            };
        } else if (bmi > 25) {
            const lose = (weightKg - maxHealthyKg);
            weightDifference = { 
                amount: values.units === 'metric' ? `${lose.toFixed(1)} kg` : `${(lose * KG_TO_LBS).toFixed(1)} lbs`, 
                type: "lose" as const 
            };
        } else {
            weightDifference = { amount: "0", type: "maintain" as const };
        }

        // 5. Ideal Range String
        let idealRange = "";
        if (values.units === "metric") {
            idealRange = `${minHealthyKg.toFixed(1)} - ${maxHealthyKg.toFixed(1)} kg`;
        } else {
            idealRange = `${(minHealthyKg * KG_TO_LBS).toFixed(1)} - ${(maxHealthyKg * KG_TO_LBS).toFixed(1)} lbs`;
        }

        setResult({
            bmi, category, color, textColor, ponderalIndex: pi, prime, idealRange, weightDifference, description: desc
        });
      }
      
      setIsLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    }, 600);
  }

  return (
    <div className="space-y-10">
      {/* --- CALCULATOR CARD --- */}
      <Card className="max-w-3xl mx-auto shadow-lg border-t-4 border-t-primary">
        <CardHeader className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background pb-8 border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Scale className="w-6 h-6 text-primary" /> 
            BMI Calculator
          </CardTitle>
          <CardDescription>
            Calculate Body Mass Index, Ponderal Index, and see actionable weight goals.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Top Controls */}
              <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold">Gender</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-2">
                          {['female', 'male'].map((g) => (
                             <FormItem key={g} className="flex-1">
                                <FormControl>
                                  <RadioGroupItem value={g} className="peer sr-only" />
                                </FormControl>
                                <FormLabel className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all capitalize">
                                  {g}
                                </FormLabel>
                             </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>

                <FormField
                  control={form.control}
                  name="units"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold">Unit System</FormLabel>
                      <FormControl>
                        <RadioGroup 
                            onValueChange={(val) => handleUnitChange(val as UnitSystem)} 
                            value={field.value} 
                            className="flex gap-2"
                        >
                          <FormItem className="flex-1">
                            <FormControl><RadioGroupItem value="metric" className="peer sr-only" /></FormControl>
                            <FormLabel className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all">Metric (kg/cm)</FormLabel>
                          </FormItem>
                          <FormItem className="flex-1">
                            <FormControl><RadioGroupItem value="imperial" className="peer sr-only" /></FormControl>
                            <FormLabel className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all">Imperial (lbs/in)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="25" {...field} className="h-12 text-lg" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {currentUnits === "metric" ? (
                  <>
                    <FormField
                      control={form.control}
                      name="heightCm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl><Input type="number" placeholder="170" {...field} className="h-12 text-lg" /></FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weightKg"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl><Input type="number" placeholder="70" {...field} className="h-12 text-lg" /></FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                ) : (
                  <>
                     <div className="space-y-2">
                        <FormLabel>Height</FormLabel>
                        <div className="flex gap-2">
                            <FormField
                            control={form.control}
                            name="heightFt"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormControl><div className="relative"><Input type="number" placeholder="5" {...field} className="h-12 text-lg pr-8" /><span className="absolute right-3 top-3 text-xs text-muted-foreground">ft</span></div></FormControl>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="heightIn"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormControl><div className="relative"><Input type="number" placeholder="8" {...field} className="h-12 text-lg pr-8" /><span className="absolute right-3 top-3 text-xs text-muted-foreground">in</span></div></FormControl>
                                </FormItem>
                            )}
                            />
                        </div>
                     </div>
                    <FormField
                      control={form.control}
                      name="weightLbs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (lbs)</FormLabel>
                          <FormControl>
                            <div className="relative">
                                <Input type="number" placeholder="160" {...field} className="h-12 text-lg" />
                                <span className="absolute right-3 top-3 text-sm text-muted-foreground">lbs</span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full text-lg h-14" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Calculator className="mr-2 h-5 w-5" />}
                Calculate My BMI
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* --- ADVANCED RESULTS DASHBOARD --- */}
      <div ref={resultsRef} className="scroll-mt-24">
        {result && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-6 duration-700 fade-in">
            
            {/* 1. Hero Card: Main Score */}
            <Card className="border-0 shadow-xl overflow-hidden">
                <div className={`h-2 w-full ${result.color}`}></div>
                <CardContent className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left space-y-2">
                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-semibold text-muted-foreground mb-2">
                                <Activity className="w-4 h-4" /> BMI Result
                             </div>
                             <h3 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                {result.bmi}
                             </h3>
                             <p className={`text-2xl font-bold ${result.textColor}`}>
                                {result.category}
                             </p>
                        </div>
                        <div className="flex-1 w-full max-w-md">
                            <BMIGauge bmi={result.bmi} category={result.category} />
                            <p className="text-center text-sm text-muted-foreground mt-2">
                                {result.description}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 2. The Data Grid (Bento Style) */}
            <div className="grid md:grid-cols-2 gap-6">
                
                {/* A. Ideal Weight & The Gap */}
                <Card className="border shadow-md hover:shadow-lg transition-all bg-white dark:bg-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Target className="w-5 h-5 text-blue-500" /> 
                            Your Weight Goals
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-4">
                        <div className="flex justify-between items-center border-b pb-4">
                            <span className="text-muted-foreground">Ideal Range</span>
                            <span className="text-xl font-bold">{result.idealRange}</span>
                        </div>
                        
                        {/* The Engagement Hook: Weight to Lose/Gain */}
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex items-center gap-4">
                            <div className={`p-3 rounded-full ${result.weightDifference?.type === 'lose' ? 'bg-red-100 text-red-600' : result.weightDifference?.type === 'gain' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                {result.weightDifference?.type === 'lose' ? <TrendingDown className="w-6 h-6" /> : result.weightDifference?.type === 'gain' ? <TrendingUp className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Action Needed</p>
                                {result.weightDifference?.type === 'maintain' ? (
                                    <p className="font-bold text-green-600">Maintain current weight</p>
                                ) : (
                                    <p className="font-bold text-slate-800 dark:text-slate-100">
                                        {result.weightDifference?.type === 'lose' ? 'Lose ' : 'Gain '} 
                                        <span className={result.weightDifference?.type === 'lose' ? 'text-red-500 text-lg' : 'text-blue-500 text-lg'}>
                                            {result.weightDifference?.amount}
                                        </span>
                                        {' '}to reach Normal
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* B. Advanced Metrics (Ponderal & Prime) */}
                <Card className="border shadow-md hover:shadow-lg transition-all bg-white dark:bg-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Info className="w-5 h-5 text-purple-500" /> 
                            Advanced Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-slate-700 dark:text-slate-200">Ponderal Index</p>
                                <p className="text-xs text-muted-foreground">Better for tall/short people</p>
                            </div>
                            <Badge variant="outline" className="text-lg px-3 py-1 border-purple-200 bg-purple-50 text-purple-700">
                                {result.ponderalIndex}
                            </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between border-t pt-4">
                             <div>
                                <p className="font-semibold text-slate-700 dark:text-slate-200">BMI Prime</p>
                                <p className="text-xs text-muted-foreground">Ratio to upper limit (25)</p>
                            </div>
                            <div className="text-right">
                                <span className={`text-lg font-bold ${result.prime > 1 ? 'text-red-500' : 'text-green-500'}`}>
                                    {result.prime}
                                </span>
                                <span className="text-xs text-muted-foreground block">
                                    {result.prime > 1 ? `(${((result.prime - 1)*100).toFixed(0)}% over limit)` : "Within limit"}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="flex justify-center mt-8">
                 <Button variant="outline" onClick={() => { form.reset(); setResult(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Calculate Again
                 </Button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}