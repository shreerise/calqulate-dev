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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RefreshCw, Loader2, Flame, AlertTriangle, Calendar, Apple } from "lucide-react";

// --- FORM SCHEMA ---
const formSchema = z.object({
  units: z.enum(["metric", "imperial"]),
  gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
  age: z.string().min(1, "Age is required."),
  weight: z.string().min(1, "Weight is required."),
  height: z.string().min(1, "Height is required."),
  activity: z.string({ required_error: "Please select activity level" }),
  goal: z.string({ required_error: "Please select a weight loss goal" }),
  macroSplit: z.string({ required_error: "Please select a macro preference" }),
});

type UnitSystem = "metric" | "imperial";

interface MacroSplit {
  protein: number;
  fat: number;
  carbs: number;
  proteinPercent: number;
  fatPercent: number;
  carbsPercent: number;
}

interface CalculationResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  weeklyDeficit: number;
  warning: string | null;
  macros: MacroSplit;
  zigZag: { day: string; calories: number }[];
}

// --- VISUAL COMPONENTS ---

const CalorieBar = ({ target, tdee }: { target: number, tdee: number }) => {
  const percentage = Math.min(100, Math.max(0, (target / tdee) * 100));
  
  return (
    <div className="space-y-2 mt-4">
      <div className="flex justify-between text-sm font-medium">
        <span className="text-primary font-bold">Deficit: {target} kcal</span>
        <span className="text-muted-foreground">Maintenance: {tdee} kcal</span>
      </div>
      <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
        <div 
          className="absolute top-0 right-0 h-full bg-amber-400 opacity-50"
          style={{ width: `${100 - percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        You are cutting <span className="font-bold text-amber-500">{tdee - target}</span> calories per day.
      </p>
    </div>
  );
};

const MacroChart = ({ macros }: { macros: MacroSplit }) => {
  return (
    <div className="w-full">
      <div className="flex h-4 w-full rounded-full overflow-hidden mb-3">
        <div style={{ width: `${macros.proteinPercent}%` }} className="bg-blue-500" title="Protein" />
        <div style={{ width: `${macros.fatPercent}%` }} className="bg-amber-400" title="Fat" />
        <div style={{ width: `${macros.carbsPercent}%` }} className="bg-green-500" title="Carbs" />
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded-lg border border-blue-100 dark:border-blue-900">
          <p className="font-semibold text-blue-700 dark:text-blue-400">{macros.proteinPercent}%</p>
          <p className="text-xs text-muted-foreground">Protein</p>
          <p className="font-bold">{macros.protein}g</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950 p-2 rounded-lg border border-amber-100 dark:border-amber-900">
          <p className="font-semibold text-amber-700 dark:text-amber-400">{macros.fatPercent}%</p>
          <p className="text-xs text-muted-foreground">Fats</p>
          <p className="font-bold">{macros.fat}g</p>
        </div>
        <div className="bg-green-50 dark:bg-green-950 p-2 rounded-lg border border-green-100 dark:border-green-900">
          <p className="font-semibold text-green-700 dark:text-green-400">{macros.carbsPercent}%</p>
          <p className="text-xs text-muted-foreground">Carbs</p>
          <p className="font-bold">{macros.carbs}g</p>
        </div>
      </div>
    </div>
  );
}

// --- CALCULATION LOGIC ---
const activityMultipliers: Record<string, number> = {
  "sedentary": 1.2,       // Little or no exercise
  "light": 1.375,         // Light exercise/sports 1-3 days/week
  "moderate": 1.55,       // Moderate exercise/sports 3-5 days/week
  "active": 1.725,        // Hard exercise/sports 6-7 days a week
  "very_active": 1.9,     // Very hard exercise/physical job
};

const deficitAmounts: Record<string, number> = {
  "maintain": 0,
  "mild": 250,      // ~0.5 lb / week
  "normal": 500,    // ~1.0 lb / week
  "aggressive": 750,// ~1.5 lb / week
  "extreme": 1000,  // ~2.0 lb / week
};

const getMacros = (calories: number, splitType: string): MacroSplit => {
  let pPercent, fPercent, cPercent;

  switch(splitType) {
    case "low_carb":
      pPercent = 40; fPercent = 40; cPercent = 20;
      break;
    case "high_protein":
      pPercent = 40; fPercent = 30; cPercent = 30;
      break;
    case "balanced":
    default:
      pPercent = 30; fPercent = 30; cPercent = 40;
      break;
  }

  return {
    proteinPercent: pPercent,
    fatPercent: fPercent,
    carbsPercent: cPercent,
    protein: Math.round((calories * (pPercent / 100)) / 4), // 4 calories per gram of protein
    fat: Math.round((calories * (fPercent / 100)) / 9),     // 9 calories per gram of fat
    carbs: Math.round((calories * (cPercent / 100)) / 4),   // 4 calories per gram of carbs
  };
};

const generateZigZag = (targetDaily: number): { day: string, calories: number }[] => {
  // Simple Zig-Zag logic: 2 High days, 2 Low days, 3 Normal days to average out to targetDaily
  // High = Target + 15%, Low = Target - 15%
  const high = Math.round(targetDaily * 1.15);
  const low = Math.round(targetDaily * 0.85);
  
  // To ensure the weekly average is exact:
  // Weekly total = 7 * targetDaily
  // Current total = (2 * high) + (2 * low) + (3 * normal)
  // We solve for normal to make it precise.
  const requiredWeekly = targetDaily * 7;
  const normal = Math.round((requiredWeekly - (2 * high) - (2 * low)) / 3);

  return [
    { day: "Monday", calories: low },
    { day: "Tuesday", calories: normal },
    { day: "Wednesday", calories: high },
    { day: "Thursday", calories: low },
    { day: "Friday", calories: normal },
    { day: "Saturday", calories: high },
    { day: "Sunday", calories: normal },
  ];
};

// --- MAIN CALCULATOR COMPONENT ---

export default function CalorieDeficitCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      units: "metric", 
      gender: "female", 
      age: "", 
      weight: "", 
      height: "",
      activity: "moderate",
      goal: "normal",
      macroSplit: "balanced"
    },
  });

  const { getValues, setValue } = form;
  const units = form.watch("units");

  // Handle unit conversion to keep inputs intact but translated
  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;
    
    const weightVal = getValues("weight");
    const heightVal = getValues("height");

    if (weightVal && !isNaN(parseFloat(weightVal))) {
      const weight = parseFloat(weightVal);
      const newWeight = newUnit === 'imperial' ? weight * 2.20462 : weight / 2.20462;
      setValue("weight", newWeight.toFixed(1));
    }

    if (heightVal && !isNaN(parseFloat(heightVal))) {
      const height = parseFloat(heightVal);
      const newHeight = newUnit === 'imperial' ? height / 2.54 : height * 2.54;
      setValue("height", newHeight.toFixed(1));
    }

    setValue("units", newUnit);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    setTimeout(() => {
      // 1. Convert everything to Metric for Mifflin-St Jeor formula
      const age = parseInt(values.age);
      const weightKg = values.units === 'metric' ? parseFloat(values.weight) : parseFloat(values.weight) / 2.20462;
      const heightCm = values.units === 'metric' ? parseFloat(values.height) : parseFloat(values.height) * 2.54;

      // 2. Calculate BMR (Mifflin-St Jeor)
      let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
      bmr += values.gender === "male" ? 5 : -161;
      bmr = Math.round(bmr);

      // 3. Calculate TDEE
      const tdee = Math.round(bmr * activityMultipliers[values.activity]);

      // 4. Calculate Target Deficit
      const dailyDeficit = deficitAmounts[values.goal];
      let targetCalories = tdee - dailyDeficit;

      // 5. Safety Checks
      let warning = null;
      const safeFloor = values.gender === "male" ? 1500 : 1200;
      
      if (targetCalories < safeFloor && values.goal !== "maintain") {
        warning = `Your target dropped below the safe minimum of ${safeFloor} kcal/day for ${values.gender}s. We have adjusted your goal to ${safeFloor} kcal. Consider increasing your physical activity instead of eating less.`;
        targetCalories = safeFloor;
      } else if (targetCalories < bmr && values.goal !== "maintain") {
        // Warning if eating below BMR (optional but good practice)
        warning = "Your calorie target is below your Basal Metabolic Rate (BMR). While acceptable for short periods, extended time below BMR may cause fatigue. Monitor your energy levels.";
      }

      // 6. Macros & ZigZag
      const macros = getMacros(targetCalories, values.macroSplit);
      const zigZag = generateZigZag(targetCalories);

      setResult({
        bmr,
        tdee,
        targetCalories,
        weeklyDeficit: (tdee - targetCalories) * 7,
        warning,
        macros,
        zigZag
      });
      
      setIsLoading(false);
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }, 600);
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto shadow-sm" id="calculator">
        <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b rounded-t-xl">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Flame className="w-6 h-6 text-orange-500" /> 
            Find Your Deficit
          </CardTitle>
          <CardDescription>
            Enter your details below to calculate your ideal weight-loss calories and macronutrient breakdown.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Unit Toggle & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border">
                <FormField control={form.control} name="units" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Unit System</FormLabel>
                    <RadioGroup onValueChange={(value) => handleUnitChange(value as UnitSystem)} value={field.value} className="flex items-center space-x-4 mt-2">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="metric" /></FormControl>
                        <FormLabel className="font-medium cursor-pointer">Metric (kg, cm)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="imperial" /></FormControl>
                        <FormLabel className="font-medium cursor-pointer">Imperial (lbs, in)</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )} />
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Biological Sex</FormLabel>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4 mt-2">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="female" /></FormControl>
                        <FormLabel className="font-medium cursor-pointer">Female</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="male" /></FormControl>
                        <FormLabel className="font-medium cursor-pointer">Male</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )} />
              </div>

              {/* Core Measurements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age (years)</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g. 28" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight ({units === 'metric' ? 'kg' : 'lbs'})</FormLabel>
                    <FormControl><Input type="number" step="0.1" placeholder={units === 'metric' ? "70" : "154"} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height ({units === 'metric' ? 'cm' : 'inches'})</FormLabel>
                    <FormControl><Input type="number" step="0.1" placeholder={units === 'metric' ? "170" : "67"} {...field} /></FormControl>
                    <p className="text-[10px] text-muted-foreground">{units === 'imperial' ? 'Enter total inches (e.g. 5\'10" = 70)' : ''}</p>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Lifestyle & Goals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="activity" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Activity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select activity" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (Desk job, little exercise)</SelectItem>
                        <SelectItem value="light">Lightly Active (1-3 days/week)</SelectItem>
                        <SelectItem value="moderate">Moderately Active (3-5 days/week)</SelectItem>
                        <SelectItem value="active">Very Active (6-7 days/week)</SelectItem>
                        <SelectItem value="very_active">Extra Active (Physical job + training)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="goal" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight Goal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select goal" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="maintain">Maintain Current Weight</SelectItem>
                        <SelectItem value="mild">Mild Weight Loss (0.5 lb / week)</SelectItem>
                        <SelectItem value="normal">Normal Weight Loss (1 lb / week)</SelectItem>
                        <SelectItem value="aggressive">Aggressive Loss (1.5 lb / week)</SelectItem>
                        <SelectItem value="extreme">Extreme Loss (2 lb / week)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="macroSplit" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diet Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select diet" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="balanced">Balanced (30% P / 30% F / 40% C)</SelectItem>
                        <SelectItem value="high_protein">High Protein (40% P / 30% F / 30% C)</SelectItem>
                        <SelectItem value="low_carb">Low Carb (40% P / 40% F / 20% C)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button type="submit" className="flex-1 text-lg py-6" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Flame className="h-5 w-5 mr-2" />}
                  {isLoading ? 'Crunching Numbers...' : 'Calculate My Deficit'}
                </Button>
                <Button type="button" variant="outline" className="py-6 px-8" onClick={() => { form.reset(); setResult(null); }} disabled={isLoading}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div ref={resultsRef}>
        {result && (
          <Card className="max-w-4xl mx-auto mt-8 border-primary/20 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-primary/5 p-8 text-center border-b border-primary/10">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Your Daily Target</p>
              <div className="flex items-end justify-center gap-1">
                <p className="text-6xl font-extrabold text-primary tracking-tight">{result.targetCalories}</p>
                <p className="text-xl font-medium text-muted-foreground pb-2">kcal</p>
              </div>
              <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                Consuming this amount consistently will put you in a weekly deficit of <span className="font-semibold text-foreground">{result.weeklyDeficit}</span> calories.
              </p>
              
              <div className="max-w-md mx-auto mt-6">
                <CalorieBar target={result.targetCalories} tdee={result.tdee} />
              </div>
            </div>

            {result.warning && (
              <div className="bg-amber-50 border-y border-amber-200 p-4 flex gap-3 text-amber-800">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">{result.warning}</p>
              </div>
            )}

            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-b">
                
                {/* Macros Section */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg"><Apple className="w-5 h-5 text-primary" /></div>
                    <h3 className="text-lg font-bold">Macronutrient Split</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Hit these targets daily to optimize fat loss while maintaining lean muscle.</p>
                  <MacroChart macros={result.macros} />
                  
                  <div className="pt-4 border-t border-dashed mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Basal Metabolic Rate (BMR):</span>
                      <span className="font-medium text-foreground">{result.bmr} kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maintenance (TDEE):</span>
                      <span className="font-medium text-foreground">{result.tdee} kcal</span>
                    </div>
                  </div>
                </div>

                {/* Zig Zag Section */}
                <div className="p-6 md:p-8 space-y-6 bg-slate-50 dark:bg-slate-900/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg"><Calendar className="w-5 h-5 text-primary" /></div>
                      <h3 className="text-lg font-bold">Zig-Zag Schedule</h3>
                    </div>
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">Pro Feature</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">Vary your daily intake to prevent metabolism slowdown while keeping the exact same weekly deficit.</p>
                  
                  <div className="space-y-2 mt-4">
                    {result.zigZag.map((dayObj, i) => {
                      const isHigh = dayObj.calories > result.targetCalories;
                      const isLow = dayObj.calories < result.targetCalories;
                      return (
                        <div key={i} className="flex items-center justify-between p-2.5 rounded-md bg-white dark:bg-slate-800 border shadow-sm text-sm">
                          <span className="font-medium w-24">{dayObj.day}</span>
                          <span className="font-bold flex-1 text-right">{dayObj.calories} kcal</span>
                          <div className="w-20 text-right">
                            {isHigh ? (
                              <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded">High Day</span>
                            ) : isLow ? (
                              <span className="text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">Low Day</span>
                            ) : (
                              <span className="text-xs font-semibold text-gray-600 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Normal</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
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