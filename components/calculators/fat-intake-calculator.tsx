"use client";

import React, { useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Calculator,
  RefreshCw,
  Loader2,
  Droplets,
  Info,
  TrendingUp,
  TrendingDown,
  Minus,
  Copy,
  Share2,
} from "lucide-react";

/* ---------------------- CONSTANTS ---------------------- */

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
} as const;

const DIET_PREFERENCES = {
  standard: { label: "Standard / Balanced", fatPct: 0.30, desc: "Best for overall health" },
  low_fat: { label: "Low Fat", fatPct: 0.20, desc: "For specific medical needs" },
  moderate: { label: "Moderate Fat", fatPct: 0.25, desc: "Balanced maintenance" },
  high_fat: { label: "High Fat (Low Carb)", fatPct: 0.40, desc: "Paleo / Low Carb styles" },
  keto: { label: "Keto (Ketogenic)", fatPct: 0.75, desc: "For ketosis" },
} as const;

const GOALS = {
  cut: { label: "Weight Loss", adjustment: -500 },
  maintain: { label: "Maintain Weight", adjustment: 0 },
  bulk: { label: "Weight Gain", adjustment: 500 },
} as const;

/* ---------------------- FORM SCHEMA ---------------------- */

const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Please select gender" }),
  age: z.string().min(1, "Age is required").refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Invalid age"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  activity: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
  goal: z.enum(["cut", "maintain", "bulk"]),
  diet: z.enum(["standard", "low_fat", "moderate", "high_fat", "keto"]),
  units: z.enum(["metric", "imperial"]),
});

type FormValues = z.infer<typeof formSchema>;

/* ---------------------- SMALL UI HELPERS ---------------------- */

const PieChart = ({ fatPct }: { fatPct: number }) => {
  const fatDegrees = Math.max(0, Math.min(1, fatPct)) * 360;
  return (
    <div className="relative w-28 h-28 mx-auto">
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `conic-gradient(#f59e0b 0deg ${fatDegrees}deg, #60a5fa ${fatDegrees}deg 360deg)`,
        }}
        aria-hidden
      />
      <div className="absolute inset-4 bg-white dark:bg-card rounded-full flex flex-col items-center justify-center">
        <span className="text-xs text-muted-foreground">Fat</span>
        <span className="font-bold text-yellow-600 text-lg">{(fatPct * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
};

const MacroRow = ({ name, grams, total }: { name: string; grams: number; total: number }) => {
  const pct = total > 0 ? Math.round((grams / total) * 100) : 0;
  return (
    <div className="flex items-center justify-between text-sm mb-2">
      <div className="flex items-center gap-3">
        <div className="w-2 h-6 rounded bg-gray-200" />
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{grams} g • {pct}%</div>
        </div>
      </div>
      <div className="text-sm font-semibold">{grams}g</div>
    </div>
  );
};

/* ---------------------- MAIN COMPONENT ---------------------- */

export default function FatIntakeCalculator() {
  const [result, setResult] = useState<null | {
    calories: number;
    fatGrams: number;
    fatPct: number;
    saturated: number;
    unsaturated: number;
    dietLabel: string;
    goalLabel: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showKcalFromFat, setShowKcalFromFat] = useState(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const copyTimeout = useRef<number | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "female",
      activity: "moderate",
      goal: "maintain",
      diet: "standard",
      units: "metric",
      age: "",
      height: "",
      weight: "",
    },
  });

  const { setValue, getValues, watch } = form;
  const unitSystem = watch("units");

  // safe parse helper
  const parse = (v: string) => {
    const n = Number(String(v).replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  };

  /* Unit conversion (keeps numbers readable) */
  const handleUnitChange = (newUnit: "metric" | "imperial") => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;
    const h = parse(getValues("height"));
    const w = parse(getValues("weight"));
    if (!isNaN(h) && h > 0) {
      // stored height is cm when metric, inches when imperial
      if (newUnit === "metric") setValue("height", (h * 2.54).toFixed(1));
      else setValue("height", (h / 2.54).toFixed(1));
    }
    if (!isNaN(w) && w > 0) {
      if (newUnit === "metric") setValue("weight", (w * 0.453592).toFixed(1));
      else setValue("weight", (w / 0.453592).toFixed(1));
    }
    setValue("units", newUnit);
  };

  const onSubmit = (values: FormValues) => {
    setIsLoading(true);
    setResult(null);

    // small UX delay
    setTimeout(() => {
      // convert to metric
      let weightKg = parse(values.weight);
      let heightCm = parse(values.height);
      if (values.units === "imperial") {
        weightKg = weightKg * 0.453592;
        heightCm = heightCm * 2.54;
      }
      const age = parse(values.age);

      // BMR (Mifflin-St Jeor)
      let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
      bmr += values.gender === "male" ? 5 : -161;

      // TDEE
      const multiplier = ACTIVITY_MULTIPLIERS[values.activity];
      const tdee = bmr * multiplier;

      // Goal adjustment
      const targetCalories = Math.max(0, tdee + GOALS[values.goal as keyof typeof GOALS].adjustment);

      // Diet %
      const dietInfo = DIET_PREFERENCES[values.diet as keyof typeof DIET_PREFERENCES];
      const fatCalories = targetCalories * dietInfo.fatPct;
      const fatGrams = fatCalories / 9;

      // Saturated guideline: max 10% of calories -> grams
      const saturatedMaxGrams = (targetCalories * 0.10) / 9;
      const unsaturatedGrams = Math.max(0, fatGrams - saturatedMaxGrams);

      const rounded = {
        calories: Math.round(targetCalories),
        fatGrams: Math.round(fatGrams),
        fatPct: dietInfo.fatPct,
        saturated: Math.round(saturatedMaxGrams),
        unsaturated: Math.round(unsaturatedGrams),
        dietLabel: dietInfo.label,
        goalLabel: GOALS[values.goal as keyof typeof GOALS].label,
      };

      setResult(rounded);
      setIsLoading(false);

      // smooth scroll into results for smaller screens
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
    }, 450);
  };

  const copyResultLink = async () => {
    try {
      const url = `${typeof window !== "undefined" ? window.location.href.split("#")[0] : ""}#cal-${Date.now()}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copyTimeout.current) window.clearTimeout(copyTimeout.current);
      copyTimeout.current = window.setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // fallback - no-op
      setCopied(true);
      if (copyTimeout.current) window.clearTimeout(copyTimeout.current);
      copyTimeout.current = window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Top card + form */}
      <Card className="w-full shadow-lg border-t-4 border-t-primary">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-gradient-to-tr from-yellow-50 to-blue-50 shrink-0">
              <Droplets className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                <span>Fat Intake Calculator</span>
                <span className="text-xs text-muted-foreground ml-2">(Mifflin-St Jeor · TDEE)</span>
              </CardTitle>
              <CardDescription>
                Enter your details to calculate daily fat needs (grams) and a practical breakdown for saturated vs unsaturated fats.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Gender + Units */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                        <FormItem className="flex items-center gap-2">
                          <FormControl><RadioGroupItem value="female" /></FormControl>
                          <FormLabel className="font-normal cursor-pointer">Female</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-2">
                          <FormControl><RadioGroupItem value="male" /></FormControl>
                          <FormLabel className="font-normal cursor-pointer">Male</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="units" render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Units</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(val) => handleUnitChange(val as "metric" | "imperial")}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <FormItem className="flex items-center gap-2">
                          <FormControl><RadioGroupItem value="metric" /></FormControl>
                          <FormLabel className="font-normal cursor-pointer">Metric (kg / cm)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-2">
                          <FormControl><RadioGroupItem value="imperial" /></FormControl>
                          <FormLabel className="font-normal cursor-pointer">Imperial (lbs / in)</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )} />
              </div>

              {/* Age / Weight / Height */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl><Input placeholder="25" type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight ({unitSystem === "metric" ? "kg" : "lbs"})</FormLabel>
                    <FormControl><Input placeholder={unitSystem === "metric" ? "70" : "154"} type="number" step="0.1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height ({unitSystem === "metric" ? "cm" : "in"})</FormLabel>
                    <FormControl><Input placeholder={unitSystem === "metric" ? "170" : "67"} type="number" step="0.1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="activity" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select activity" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (Office)</SelectItem>
                        <SelectItem value="light">Light (1-2 days)</SelectItem>
                        <SelectItem value="moderate">Moderate (3-5 days)</SelectItem>
                        <SelectItem value="active">Active (6-7 days)</SelectItem>
                        <SelectItem value="very_active">Very active / Athlete</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="goal" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select goal" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="cut">Lose weight</SelectItem>
                        <SelectItem value="maintain">Maintain</SelectItem>
                        <SelectItem value="bulk">Gain weight</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="diet" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diet Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Diet Type" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="standard">Standard (30% fat)</SelectItem>
                        <SelectItem value="low_fat">Low fat (20%)</SelectItem>
                        <SelectItem value="moderate">Moderate (25%)</SelectItem>
                        <SelectItem value="high_fat">High fat (40%)</SelectItem>
                        <SelectItem value="keto">Keto (75%)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-2">
                <Button type="submit" className="flex-1" size="lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Calculator className="w-4 h-4 mr-2" />}
                  {isLoading ? "Calculating..." : "Calculate Fat Intake"}
                </Button>

                <Button type="button" variant="outline" size="lg" onClick={() => { form.reset(); setResult(null); }}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Results + rich UI */}
      <div ref={resultsRef}>
        {result && (
          <div className="grid md:grid-cols-2 gap-6 mt-8 items-start">
            {/* Left: Main result (sticky on desktop) */}
            <div className="md:sticky md:top-24">
              <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span>Daily Fat Target</span>
                    {result.goalLabel === "Weight Loss" ? <TrendingDown className="text-green-500" /> :
                      result.goalLabel === "Weight Gain" ? <TrendingUp className="text-red-500" /> : <Minus className="text-blue-500" />}
                  </CardTitle>
                  <CardDescription>Personalized for your profile</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col items-center justify-center py-6">
                    <span className="text-6xl font-extrabold text-primary">{result.fatGrams}g</span>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm text-muted-foreground bg-white dark:bg-black/20 px-3 py-1 rounded-full border">
                        {result.calories} kcal/day
                      </span>
                      <span className="text-xs text-muted-foreground">• {result.dietLabel}</span>
                      <span className="text-xs text-muted-foreground">• {(result.fatPct * 100).toFixed(0)}% fat</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div>Calories from fat</div>
                      <div className="font-medium">{Math.round(result.fatGrams * 9)} kcal</div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="p-3 bg-white rounded border text-center">
                        <div className="text-xs text-muted-foreground">Saturated (max)</div>
                        <div className="font-semibold mt-1">{result.saturated}g</div>
                      </div>
                      <div className="p-3 bg-white rounded border text-center">
                        <div className="text-xs text-muted-foreground">Unsaturated (approx)</div>
                        <div className="font-semibold mt-1">{result.unsaturated}g</div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setShowKcalFromFat((s) => !s)}>
                        <Info className="w-4 h-4 mr-2" /> {showKcalFromFat ? "Show grams" : "Show kcal from fat"}
                      </Button>

                      <Button variant="outline" size="sm" onClick={copyResultLink}>
                        <Copy className="w-4 h-4 mr-2" /> {copied ? "Link copied" : "Copy result link"}
                      </Button>

                      <Button variant="ghost" size="sm" onClick={() => {
                        // simple navigator share fallback if available
                        const shareText = `My fat target: ${result.fatGrams}g/day (${result.calories} kcal) — calculated on Calqulate`;
                        if (navigator.share) {
                          navigator.share({ title: "Fat Intake", text: shareText, url: window.location.href }).catch(()=>{});
                        } else {
                          // fallback: copy text
                          navigator.clipboard?.writeText(`${shareText} ${window.location.href}`).then(()=> setCopied(true));
                          if (copyTimeout.current) window.clearTimeout(copyTimeout.current);
                          copyTimeout.current = window.setTimeout(() => setCopied(false), 2000);
                        }
                      }}>
                        <Share2 className="w-4 h-4 mr-2" /> Share
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <div className="px-6 pb-6">
                  <div className="text-xs text-muted-foreground">
                    Calculation: <code>fat grams = (calories × percent / 100) ÷ 9</code>. Saturated fats should be limited to ~10% of calories.
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Breakdown + visual guides */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fat quality & macro breakdown</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4 items-center">
                  <div>
                    <PieChart fatPct={result.fatPct} />
                  </div>

                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">Macro breakdown (approx)</div>
                    <div className="mb-3">
                      <MacroRow name="Unsaturated (healthy)" grams={result.unsaturated} total={result.fatGrams} />
                      <MacroRow name="Saturated (limit)" grams={result.saturated} total={result.fatGrams} />
                      <div className="text-xs text-muted-foreground mt-3">
                        Note: These are estimates. Aim for most fats from plant oils, nuts, seeds, and fatty fish.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Practical food equivalents</CardTitle>
                  <CardDescription className="text-xs">Approx amounts equal to <strong>10 g fat</strong> (visual guide)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl">🥑</div>
                      <div>
                        <div className="font-medium">Avocado</div>
                        <div className="text-xs text-muted-foreground">~1/3 medium ≈ 10g fat</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-2xl">🫒</div>
                      <div>
                        <div className="font-medium">Olive oil</div>
                        <div className="text-xs text-muted-foreground">~1 tbsp ≈ 10-12g fat</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-2xl">🥜</div>
                      <div>
                        <div className="font-medium">Almonds</div>
                        <div className="text-xs text-muted-foreground">~12-14 nuts ≈ 10g fat</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-2xl">🥩</div>
                      <div>
                        <div className="font-medium">Ribeye</div>
                        <div className="text-xs text-muted-foreground">~2 oz ≈ 10g fat</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Detailed numbers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-muted-foreground">
                          <th className="pb-2">Metric</th>
                          <th className="pb-2">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-1 text-muted-foreground">Calories (adjusted)</td>
                          <td className="py-1 font-medium">{result.calories} kcal</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-muted-foreground">Fat grams</td>
                          <td className="py-1 font-medium">{result.fatGrams} g</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-muted-foreground">Fat % of calories</td>
                          <td className="py-1 font-medium">{(result.fatPct * 100).toFixed(0)}%</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-muted-foreground">Saturated (max)</td>
                          <td className="py-1 font-medium">{result.saturated} g</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-muted-foreground">Unsaturated (approx)</td>
                          <td className="py-1 font-medium">{result.unsaturated} g</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-muted-foreground">Calories from fat</td>
                          <td className="py-1 font-medium">{showKcalFromFat ? Math.round(result.fatGrams * 9) + " kcal" : Math.round(result.fatGrams) + " g"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
