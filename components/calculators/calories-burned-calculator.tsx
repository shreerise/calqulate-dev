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
import { Calculator, RefreshCw, Loader2, Flame, HeartPulse, Timer, Utensils, TrendingDown, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

// --- MET VALUES DATABASE ---
const activities = [
  { name: "Sitting / Office Work", met: 1.5 },
  { name: "Yoga (Hatha)", met: 2.5 },
  { name: "Walking (3.0 mph / 4.8 km/h)", met: 3.3 },
  { name: "Weightlifting (General)", met: 3.5 },
  { name: "Walking (Brise, 4.0 mph)", met: 5.0 },
  { name: "Swimming (Light/Moderate)", met: 5.8 },
  { name: "Cycling (10-12 mph / 16-19 km/h)", met: 6.8 },
  { name: "Aerobics / HIIT", met: 8.0 },
  { name: "Running (6.0 mph / 9.7 km/h)", met: 9.8 },
  { name: "Jumping Rope", met: 12.3 },
];

// --- FORM SCHEMA ---
const formSchema = z.object({
  calcMethod: z.enum(["activity", "heartRate"]),
  units: z.enum(["metric", "imperial"]),
  weight: z.string().min(1, "Weight is required."),
  duration: z.string().min(1, "Duration is required."),
  // Activity method specific
  activityMet: z.string().optional(),
  // Heart Rate method specific
  age: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  heartRate: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.calcMethod === "activity" && !data.activityMet) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please select an activity.", path: ["activityMet"] });
  }
  if (data.calcMethod === "heartRate") {
    if (!data.age) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Age is required.", path: ["age"] });
    if (!data.heartRate) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Heart rate is required.", path: ["heartRate"] });
    if (!data.gender) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Gender is required.", path: ["gender"] });
  }
});

type UnitSystem = "metric" | "imperial";

interface CalculationResult {
  totalCalories: number;
  fatBurnedGrams: number;
  foodEquivalent: { name: string; emoji: string; amount: number };
  weeklyProjection: number;
  weightLossProjection: number;
}

export default function CaloriesBurnedCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      calcMethod: "activity", 
      units: "metric", 
      weight: "", 
      duration: "", 
      activityMet: "3.3", 
      age: "", 
      gender: "female", 
      heartRate: "" 
    },
  });

  const { watch, getValues, setValue } = form;
  const units = watch("units");
  const calcMethod = watch("calcMethod");

  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;
    
    const currentWeight = getValues("weight");
    if (currentWeight && !isNaN(parseFloat(currentWeight))) {
      const weightInKg = newUnit === 'imperial' ? parseFloat(currentWeight) : parseFloat(currentWeight) * 0.453592;
      const weightInLbs = newUnit === 'metric' ? parseFloat(currentWeight) : parseFloat(currentWeight) / 0.453592;
      setValue("weight", (newUnit === 'metric' ? weightInLbs : weightInKg).toFixed(1));
    }
    setValue("units", newUnit);
  };

  const getFoodEquivalent = (calories: number) => {
    const foods = [
      { name: "Apple(s)", emoji: "🍎", cal: 95 },
      { name: "Can(s) of Soda", emoji: "🥤", cal: 150 },
      { name: "Slice(s) of Pizza", emoji: "🍕", cal: 285 },
      { name: "Burger(s)", emoji: "🍔", cal: 500 },
    ];
    // Find closest match without going crazy high
    const food = foods.reverse().find(f => calories >= f.cal) || foods[foods.length - 1];
    return { name: food.name, emoji: food.emoji, amount: +(calories / food.cal).toFixed(1) };
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      const weightKg = values.units === 'metric' ? parseFloat(values.weight) : parseFloat(values.weight) * 0.453592;
      const durationMins = parseFloat(values.duration);
      let calories = 0;

      if (values.calcMethod === "activity") {
        const met = parseFloat(values.activityMet!);
        // Standard formula: Calories = Time * (MET * 3.5 * Weight in kg) / 200
        calories = durationMins * (met * 3.5 * weightKg) / 200;
      } else {
        // Standard Heart Rate Formula
        const hr = parseFloat(values.heartRate!);
        const age = parseFloat(values.age!);
        if (values.gender === "male") {
          calories = ((-55.0969 + (0.6309 * hr) + (0.1988 * weightKg) + (0.2017 * age)) / 4.184) * durationMins;
        } else {
          calories = ((-20.4022 + (0.4472 * hr) - (0.1263 * weightKg) + (0.074 * age)) / 4.184) * durationMins;
        }
        calories = Math.max(0, calories); // Prevent negative anomalies
      }

      setResult({
        totalCalories: calories,
        fatBurnedGrams: calories * 0.11, // Rough estimate: 1g fat = 9 kcal
        foodEquivalent: getFoodEquivalent(calories),
        weeklyProjection: calories * 3, // Assuming 3x a week
        weightLossProjection: (calories * 3 * 4) / 7700 // 7700 kcal = 1 kg of fat
      });
      
      setIsLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 600);
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto shadow-lg border-primary/10" id="calculator">
        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 rounded-t-xl border-b border-border/50 pb-8">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Flame className="w-6 h-6 text-orange-500" /> Advanced Calories Burned Calculator
          </CardTitle>
          <CardDescription className="text-base">
            Choose standard Activity (MET) calculation or our advanced Heart Rate formula for precise tracking.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="p-4 bg-muted/40 rounded-xl space-y-4 border border-border/50">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="calcMethod" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Calculation Method</FormLabel>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col sm:flex-row gap-4 pt-2">
                          <FormItem className="flex items-center space-x-2 space-y-0 bg-background px-4 py-3 rounded-lg border w-full">
                            <FormControl><RadioGroupItem value="activity" /></FormControl>
                            <FormLabel className="font-medium cursor-pointer flex-1">By Activity (MET)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0 bg-background px-4 py-3 rounded-lg border w-full">
                            <FormControl><RadioGroupItem value="heartRate" /></FormControl>
                            <FormLabel className="font-medium cursor-pointer flex-1">By Heart Rate</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="units" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Measurement System</FormLabel>
                        <RadioGroup onValueChange={(value) => handleUnitChange(value as UnitSystem)} value={field.value} className="flex flex-col sm:flex-row gap-4 pt-2">
                          <FormItem className="flex items-center space-x-2 space-y-0 bg-background px-4 py-3 rounded-lg border w-full">
                            <FormControl><RadioGroupItem value="metric" /></FormControl>
                            <FormLabel className="font-medium cursor-pointer flex-1">Metric (kg)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0 bg-background px-4 py-3 rounded-lg border w-full">
                            <FormControl><RadioGroupItem value="imperial" /></FormControl>
                            <FormLabel className="font-medium cursor-pointer flex-1">Imperial (lbs)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormItem>
                    )} />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Weight</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="number" step="0.1" placeholder={units === 'metric' ? "75" : "165"} className="pl-10" {...field} />
                        <Activity className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">{units === 'metric' ? 'kg' : 'lbs'}</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="duration" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration of Activity</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="number" step="1" placeholder="45" className="pl-10" {...field} />
                        <Timer className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">mins</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* ACTIVITY METHOD INPUTS */}
                {calcMethod === "activity" && (
                  <FormField control={form.control} name="activityMet" render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Select Activity</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          {activities.map(act => (
                            <option key={act.name} value={act.met}>{act.name} (MET: {act.met})</option>
                          ))}
                        </select>
                      </FormControl>
                      <p className="text-xs text-muted-foreground mt-1">MET = Metabolic Equivalent of Task. Higher MET burns more calories.</p>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}

                {/* HEART RATE METHOD INPUTS */}
                {calcMethod === "heartRate" && (
                  <>
                    <FormField control={form.control} name="age" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl><Input type="number" placeholder="30" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="heartRate" render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Link
                            href="/health/heart-rate-calculator"
                            className="hover:underline hover:text-green-700 transition-colors"
                          >
                            Average Heart Rate (BPM)
                          </Link>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="135" className="pl-10" {...field} />
                            <HeartPulse className="absolute left-3 top-2.5 h-4 w-4 text-red-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="gender" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Biological Gender (Required for formula accuracy)</FormLabel>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                          <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="female" /></FormControl><FormLabel className="font-normal">Female</FormLabel></FormItem>
                          <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="male" /></FormControl><FormLabel className="font-normal">Male</FormLabel></FormItem>
                        </RadioGroup>
                      </FormItem>
                    )} />
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700" size="lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Flame className="h-5 w-5 mr-2" />}
                  {isLoading ? 'Calculating...' : 'Calculate Calories Burned'}
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => { form.reset(); setResult(null); }} className="flex-1" disabled={isLoading}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div ref={resultsRef}>
        {result && (
          <div className="max-w-4xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="overflow-hidden border-orange-500/20 shadow-xl">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center text-white">
                <Flame className="w-12 h-12 mx-auto mb-3 opacity-90" />
                <p className="text-lg font-medium opacity-90 mb-1">Total Calories Burned</p>
                <p className="text-6xl font-bold tracking-tight">{Math.round(result.totalCalories).toLocaleString()} <span className="text-2xl font-normal opacity-80">kcal</span></p>
                <p className="mt-3 text-orange-100">Estimated Fat Burned: ~{Math.round(result.fatBurnedGrams)}g</p>
              </div>
              
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-b">
                  
                  {/* Food Equivalent Widget */}
                  <div className="p-8 flex flex-col items-center text-center justify-center bg-slate-50 dark:bg-slate-900/20">
                    <Utensils className="w-8 h-8 text-slate-400 mb-3" />
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">Food Equivalent</h3>
                    <p className="text-sm text-muted-foreground mb-4">You just burned off the equivalent of:</p>
                    <div className="text-4xl mb-2">{result.foodEquivalent.emoji}</div>
                    <p className="text-xl font-bold">{result.foodEquivalent.amount} {result.foodEquivalent.name}</p>
                  </div>

                  {/* Future Projection Widget */}
                  <div className="p-8 flex flex-col items-center text-center justify-center bg-slate-50 dark:bg-slate-900/20">
                    <TrendingDown className="w-8 h-8 text-green-500 mb-3" />
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">Consistency Projection</h3>
                    <p className="text-sm text-muted-foreground mb-4">If you do this 3 times a week:</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-500">
                      {Math.round(result.weeklyProjection).toLocaleString()} kcal / week
                    </p>
                    <p className="text-sm font-medium mt-2">
                      ≈ {(units === 'metric' ? result.weightLossProjection : result.weightLossProjection * 2.20462).toFixed(2)} {units === 'metric' ? 'kg' : 'lbs'} of fat loss per month!
                    </p>
                  </div>
                </div>

                {/* Internal Link / Call to action */}
                <div className="p-6 bg-blue-50 dark:bg-blue-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-200">Where does the fat go?</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Curious about how your body stores and loses fat based on your unique proportions?
                    </p>
                  </div>
                  <Link href="/health/body-shape-calculator">
                    <Button variant="default" className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                      Find Your Body Shape <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}