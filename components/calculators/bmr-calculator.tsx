"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, RefreshCw, Loader2, Flame, Activity, TrendingDown, Target, TrendingUp, Info, CheckCircle2, History } from "lucide-react";

// --- FORM SCHEMA ---
const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
  age: z.string().min(1, "Age is required."),
  weight: z.string().min(1, "Weight is required."),
  height: z.string().min(1, "Height is required."),
  units: z.enum(["metric", "imperial"]),
  formula: z.enum(["mifflin", "harris", "katch"]),
  bodyFat: z.string().optional(),
  activityLevel: z.string({ required_error: "Please select an activity level." }),
}).superRefine((data, ctx) => {
  if (data.formula === "katch" && (!data.bodyFat || parseFloat(data.bodyFat) <= 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Body Fat % is required for Katch-McArdle formula.",
      path: ["bodyFat"],
    });
  }
});

type UnitSystem = "metric" | "imperial";

// --- RESULT TYPE INTERFACE ---
interface CalculationResult {
  bmr: number;
  tdee: number;
  activityLevel: string;
  tdeeBreakdown: { label: string; value: number; multiplier: number }[];
}

interface SavedEntry {
  date: string;
  bmr: number;
  tdee: number;
  activityLevel: string;
  formula: string;
  gender: string;
  age: string;
  weight: string;
  height: string;
  units: UnitSystem;
  bodyFat?: string;
}

const STORAGE_KEY = "calqulate_bmr_history"

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

function getBmrDeltaLabel(current: { tdee: number; activityLevel: string }, previous: SavedEntry) {
  const delta = Number((current.tdee - previous.tdee).toFixed(0));
  if (delta === 0) {
    return { label: "Your TDEE is unchanged compared to the last saved result.", positive: true };
  }
  if (delta > 0) {
    return { label: `Your calorie target increased by ${delta} kcal compared to the last saved result.`, positive: false };
  }
  return { label: `Your calorie target decreased by ${Math.abs(delta)} kcal compared to the last saved result.`, positive: true };
}

// Activity Multipliers
const ACTIVITY_LEVELS = [
  { value: "sedentary", label: "Sedentary (Little or no exercise)", multiplier: 1.2 },
  { value: "light", label: "Lightly active (Exercise 1-3 days/week)", multiplier: 1.375 },
  { value: "moderate", label: "Moderately active (Exercise 3-5 days/week)", multiplier: 1.55 },
  { value: "active", label: "Very active (Hard exercise 6-7 days/week)", multiplier: 1.725 },
  { value: "extreme", label: "Extra active (Very hard exercise & physical job)", multiplier: 1.9 },
];

export default function BMRCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<SavedEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(getStorage());
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "male",
      units: "metric",
      formula: "mifflin",
      activityLevel: "moderate",
      age: "",
      weight: "",
      height: "",
      bodyFat: "",
    },
  });

  const { getValues, setValue, watch } = form;
  const units = watch("units");
  const formula = watch("formula");

  const lastSaved = history[0];
  const currentDeltaInfo = result && lastSaved ? getBmrDeltaLabel({ tdee: result.tdee, activityLevel: result.activityLevel }, lastSaved) : null;

  // Handle Unit Conversions safely
  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;

    const weightVal = parseFloat(getValues("weight"));
    const heightVal = parseFloat(getValues("height"));

    if (newUnit === "imperial") {
      // Metric to Imperial
      if (!isNaN(weightVal)) setValue("weight", (weightVal * 2.20462).toFixed(1)); // kg to lbs
      if (!isNaN(heightVal)) setValue("height", (heightVal / 2.54).toFixed(1));   // cm to inches
    } else {
      // Imperial to Metric
      if (!isNaN(weightVal)) setValue("weight", (weightVal / 2.20462).toFixed(1)); // lbs to kg
      if (!isNaN(heightVal)) setValue("height", (heightVal * 2.54).toFixed(1));   // inches to cm
    }
    setValue("units", newUnit);
  };

  const handleSave = () => {
    if (!result) return;

    const values = getValues();
    const entry: SavedEntry = {
      date: new Date().toISOString(),
      bmr: result.bmr,
      tdee: result.tdee,
      activityLevel: result.activityLevel,
      formula: values.formula,
      gender: values.gender,
      age: values.age,
      weight: values.weight,
      height: values.height,
      units: values.units,
      bodyFat: values.bodyFat || undefined,
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    setTimeout(() => {
      // Standardize to Metric for calculations
      const weightKg = values.units === "imperial" ? parseFloat(values.weight) / 2.20462 : parseFloat(values.weight);
      const heightCm = values.units === "imperial" ? parseFloat(values.height) * 2.54 : parseFloat(values.height);
      const age = parseInt(values.age);
      const bodyFat = values.bodyFat ? parseFloat(values.bodyFat) : 0;
      
      let calculatedBMR = 0;

      // 1. Mifflin-St Jeor
      if (values.formula === "mifflin") {
        if (values.gender === "male") {
          calculatedBMR = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
        } else {
          calculatedBMR = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
        }
      } 
      // 2. Harris-Benedict (Revised)
      else if (values.formula === "harris") {
        if (values.gender === "male") {
          calculatedBMR = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
        } else {
          calculatedBMR = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
        }
      } 
      // 3. Katch-McArdle
      else if (values.formula === "katch") {
        const leanBodyMass = weightKg * (1 - (bodyFat / 100));
        calculatedBMR = 370 + (21.6 * leanBodyMass);
      }

      const activeLevelData = ACTIVITY_LEVELS.find(l => l.value === values.activityLevel);
      const activeMultiplier = activeLevelData ? activeLevelData.multiplier : 1.2;

      const tdee = calculatedBMR * activeMultiplier;

      const tdeeBreakdown = ACTIVITY_LEVELS.map(level => ({
        label: level.label,
        multiplier: level.multiplier,
        value: calculatedBMR * level.multiplier
      }));

      setResult({
        bmr: Math.round(calculatedBMR),
        tdee: Math.round(tdee),
        activityLevel: activeLevelData?.label || "Sedentary",
        tdeeBreakdown
      });

      setIsLoading(false);
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }, 600); // slight delay for smooth UI feedback
  }

  // Helper component for Macros
  const MacroCard = ({ protein, fats, carbs, cals }: { protein: number, fats: number, carbs: number, cals: number }) => (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center border border-blue-100 dark:border-blue-900">
        <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Protein</p>
        <p className="text-xl font-bold">{protein}g</p>
        <p className="text-xs text-muted-foreground">{protein * 4} kcal</p>
      </div>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl text-center border border-yellow-100 dark:border-yellow-900">
        <p className="text-xs font-semibold text-yellow-600 uppercase mb-1">Fats</p>
        <p className="text-xl font-bold">{fats}g</p>
        <p className="text-xs text-muted-foreground">{fats * 9} kcal</p>
      </div>
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center border border-green-100 dark:border-green-900">
        <p className="text-xs font-semibold text-green-600 uppercase mb-1">Carbs</p>
        <p className="text-xl font-bold">{carbs}g</p>
        <p className="text-xs text-muted-foreground">{carbs * 4} kcal</p>
      </div>
    </div>
  );

  return (
    <>
      <Card className="max-w-4xl mx-auto border-gray-200 shadow-lg dark:border-gray-800" id="calculator">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/50 rounded-t-xl border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" /> 
            Calculate Your BMR & TDEE
          </CardTitle>
          <CardDescription>
            Enter your details below. We use industry-standard scientific formulas to map out your metabolic rate.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Top Controls: Gender & Units */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-950 p-4 rounded-lg border">
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biological Gender</FormLabel>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-6 pt-2">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="male" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="female" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )} />
                <FormField control={form.control} name="units" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Measurement System</FormLabel>
                    <RadioGroup onValueChange={(value) => handleUnitChange(value as UnitSystem)} value={field.value} className="flex items-center space-x-6 pt-2">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="metric" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Metric (kg, cm)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="imperial" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Imperial (lbs, in)</FormLabel>
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
                    <FormControl><Input type="number" placeholder="e.g. 30" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight {units === 'metric' ? '(kg)' : '(lbs)'}</FormLabel>
                    <FormControl><Input type="number" step="0.1" placeholder={units === 'metric' ? "75" : "165"} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height {units === 'metric' ? '(cm)' : '(inches)'}</FormLabel>
                    <FormControl><Input type="number" step="0.1" placeholder={units === 'metric' ? "175" : "69"} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Advanced Controls: Formula, Body Fat, Activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border">
                <div className="space-y-6">
                  <FormField control={form.control} name="formula" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">Calculation Formula <Info className="w-3 h-3 text-muted-foreground" /></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a formula" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mifflin">Mifflin-St Jeor (Default)</SelectItem>
                          <SelectItem value="harris">Harris-Benedict (Revised)</SelectItem>
                          <SelectItem value="katch">Katch-McArdle (Requires Body Fat)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  {formula === "katch" && (
                    <FormField control={form.control} name="bodyFat" render={({ field }) => (
                      <FormItem className="animate-in fade-in slide-in-from-top-2">
                        <FormLabel>Body Fat %</FormLabel>
                        <FormControl><Input type="number" step="0.1" placeholder="e.g. 15" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  )}
                </div>

                <FormField control={form.control} name="activityLevel" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Activity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-[auto] py-3"><SelectValue placeholder="Select activity level" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ACTIVITY_LEVELS.map(level => (
                          <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1" size="lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Calculator className="h-5 w-5 mr-2" />}
                  {isLoading ? 'Crunching Numbers...' : 'Calculate My BMR'}
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => { form.reset(); setResult(null); }} className="sm:w-[150px]" disabled={isLoading}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* RESULTS SECTION */}
      <div ref={resultsRef}>
        {result && (
          <div className="max-w-4xl mx-auto mt-8 space-y-8 animate-in slide-in-from-bottom-6 duration-500">
            <Card>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Save this result to compare with your previous daily calorie estimates.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleSave} className="flex-1 sm:flex-none">
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Save Result
                    </Button>
                    <Button variant="secondary" onClick={() => setShowHistory((value) => !value)} className="flex-1 sm:flex-none">
                      <History className="h-4 w-4 mr-2" /> {showHistory ? 'Hide History' : 'Show History'}
                    </Button>
                  </div>
                </div>

                {saved && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                    Saved successfully! Your last BMR/TDEE result is now stored locally.
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
                        <h4 className="text-base font-semibold">Saved BMR/TDEE History</h4>
                        <p className="text-sm text-muted-foreground">Review your most recently saved metabolic estimates.</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={clearHistory}>
                        Clear History
                      </Button>
                    </div>
                    {history.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No saved results yet. Save a calculation to build history.</p>
                    ) : (
                      <div className="space-y-3">
                        {history.map((entry) => (
                          <div key={entry.date} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold">{entry.activityLevel}</p>
                                <p className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleString()}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900">{entry.tdee.toLocaleString()} kcal</p>
                                <p className="text-xs text-gray-500">TDEE</p>
                              </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
                              <div>Formula: {entry.formula}</div>
                              <div>Gender: {entry.gender}</div>
                              <div>Age: {entry.age}</div>
                              <div>{entry.weight} {entry.units === 'metric' ? 'kg' : 'lbs'} / {entry.height} {entry.units === 'metric' ? 'cm' : 'in'}</div>
                              {entry.bodyFat && <div>Body Fat: {entry.bodyFat}%</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Stat Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-8 text-center flex flex-col justify-center h-full">
                  <Flame className="w-10 h-10 text-primary mx-auto mb-4 opacity-80" />
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Basal Metabolic Rate</p>
                  <div className="mt-2 flex items-baseline justify-center gap-2">
                    <span className="text-6xl font-black text-primary">{result.bmr.toLocaleString()}</span>
                    <span className="text-xl font-medium text-muted-foreground">kcal/day</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    This is the energy your body burns strictly at rest (coma-state).
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5" /> TDEE Breakdown
                  </CardTitle>
                  <CardDescription>How your activity scales your calorie burn.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.tdeeBreakdown.map((item, i) => {
                    const isCurrent = item.value === result.tdee;
                    // Calc width relative to max (extreme)
                    const maxWidth = result.tdeeBreakdown[result.tdeeBreakdown.length - 1].value;
                    const percent = (item.value / maxWidth) * 100;
                    
                    return (
                      <div key={i} className={`relative ${isCurrent ? 'p-2 -mx-2 bg-primary/5 border border-primary/20 rounded-lg' : ''}`}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className={isCurrent ? 'font-bold text-primary' : 'text-muted-foreground'}>{item.label.split('(')[0].trim()}</span>
                          <span className="font-bold">{Math.round(item.value).toLocaleString()} kcal</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${isCurrent ? 'bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]' : 'bg-gray-300 dark:bg-gray-600'}`} 
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Macro / Goal Planner */}
            <Card className="border-2 border-muted">
              <CardHeader className="text-center border-b pb-6">
                <CardTitle className="text-2xl">Daily Calorie & Macro Planner</CardTitle>
                <CardDescription>Based on your TDEE of <strong>{result.tdee.toLocaleString()} kcal</strong> ({result.activityLevel})</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="cut" className="w-full">
                  <TabsList className="w-full grid grid-cols-3 rounded-none h-16 bg-muted/30">
                    <TabsTrigger value="cut" className="data-[state=active]:bg-background rounded-none h-full flex flex-col gap-1">
                      <TrendingDown className="w-4 h-4 text-red-500" /> <span className="hidden sm:inline">Weight Loss</span><span className="sm:hidden">Loss</span>
                    </TabsTrigger>
                    <TabsTrigger value="maintain" className="data-[state=active]:bg-background rounded-none h-full flex flex-col gap-1">
                      <Target className="w-4 h-4 text-gray-500" /> <span className="hidden sm:inline">Maintenance</span><span className="sm:hidden">Maintain</span>
                    </TabsTrigger>
                    <TabsTrigger value="bulk" className="data-[state=active]:bg-background rounded-none h-full flex flex-col gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" /> <span className="hidden sm:inline">Muscle Gain</span><span className="sm:hidden">Gain</span>
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-6 md:p-8">
                    {/* Weight Loss Profile */}
                    <TabsContent value="cut" className="mt-0 space-y-6 animate-in fade-in">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-red-600 mb-1">Aggressive / Steady Fat Loss</h3>
                        <div className="text-4xl font-bold">{(result.tdee - 500).toLocaleString()} <span className="text-lg font-normal text-muted-foreground">kcal/day</span></div>
                        <p className="text-sm text-muted-foreground mt-2">A 500 kcal deficit. Expect ~1 lb (0.45kg) of weight loss per week.</p>
                      </div>
                      {/* Macro Split: 40% P / 30% F / 30% C */}
                      <MacroCard 
                        cals={result.tdee - 500} 
                        protein={Math.round(((result.tdee - 500) * 0.4) / 4)} 
                        fats={Math.round(((result.tdee - 500) * 0.3) / 9)} 
                        carbs={Math.round(((result.tdee - 500) * 0.3) / 4)} 
                      />
                    </TabsContent>

                    {/* Maintenance Profile */}
                    <TabsContent value="maintain" className="mt-0 space-y-6 animate-in fade-in">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-1">Maintain Current Weight</h3>
                        <div className="text-4xl font-bold">{result.tdee.toLocaleString()} <span className="text-lg font-normal text-muted-foreground">kcal/day</span></div>
                        <p className="text-sm text-muted-foreground mt-2">Eat exactly what you burn. Perfect for body recomposition.</p>
                      </div>
                      {/* Macro Split: 30% P / 30% F / 40% C */}
                      <MacroCard 
                        cals={result.tdee} 
                        protein={Math.round((result.tdee * 0.3) / 4)} 
                        fats={Math.round((result.tdee * 0.3) / 9)} 
                        carbs={Math.round((result.tdee * 0.4) / 4)} 
                      />
                    </TabsContent>

                    {/* Bulking Profile */}
                    <TabsContent value="bulk" className="mt-0 space-y-6 animate-in fade-in">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-green-600 mb-1">Lean Muscle Building</h3>
                        <div className="text-4xl font-bold">{(result.tdee + 300).toLocaleString()} <span className="text-lg font-normal text-muted-foreground">kcal/day</span></div>
                        <p className="text-sm text-muted-foreground mt-2">A 300 kcal surplus. Fuel heavy workouts and build lean muscle with minimal fat gain.</p>
                      </div>
                      {/* Macro Split: 30% P / 25% F / 45% C */}
                      <MacroCard 
                        cals={result.tdee + 300} 
                        protein={Math.round(((result.tdee + 300) * 0.3) / 4)} 
                        fats={Math.round(((result.tdee + 300) * 0.25) / 9)} 
                        carbs={Math.round(((result.tdee + 300) * 0.45) / 4)} 
                      />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

          </div>
        )}
      </div>
    </>
  );
}