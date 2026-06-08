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
import { Badge } from "@/components/ui/badge";
import {
  Calculator, RefreshCw, Loader2, Sparkles, Scale, Activity,
  Zap, Target, Save, History, ChevronRight, Award, AlertCircle,
  Brain, ArrowRight, CheckCircle2, BarChart3, TrendingDown, TrendingUp, Info
} from "lucide-react";

// ─── VALIDATION SCHEMA ────────────────────────────────────────────────────────
const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
  weight: z.string().min(1, "Weight is required."),
  height: z.string().min(1, "Height is required."),
  neck: z.string().min(1, "Neck measurement is required."),
  waist: z.string().min(1, "Waist measurement is required."),
  hips: z.string().optional(),
  units: z.enum(["metric", "imperial"]),
});

type UnitSystem = "metric" | "imperial";

// ─── INTERFACES ───────────────────────────────────────────────────────────────
interface BodyFatResult {
  bfp: number;
  fatMass: number;
  leanMass: number;
  bmr: number;
  category: { label: string; color: string; bg: string };
  idealWeight: number;
  headline: string;
  nextSteps: string[];
  bfpFact: string;
}

interface SavedEntry {
  date: string;
  bfp: number;
  fatMass: number;
  leanMass: number;
  weight: number;
  units: string;
  gender: string;
  categoryLabel: string;
}

// ─── CONSTANTS & LOCAL STORAGE KEY ────────────────────────────────────────────
const STORAGE_KEY = "calqulate_bodyfat_history";

const brand = {
  primary: "#15803d", // emerald-700
  primaryBg: "#f0fdf4", // emerald-50
  primaryBorder: "#bbf7d0", // emerald-200
};

// ─── LOCAL STORAGE HELPERS ────────────────────────────────────────────────────
function getBodyFatStorage(): SavedEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveBodyFatEntry(entry: SavedEntry) {
  try {
    const existing = getBodyFatStorage();
    existing.unshift(entry);
    const trimmed = existing.slice(0, 10); // keep last 10 runs
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    /* ignore */
  }
}

function getBfpDeltaLabel(delta: number): { label: string; improving: boolean } {
  if (Math.abs(delta) < 0.1) {
    return { label: "Your body fat percentage remains stable since your last calculation.", improving: true };
  }
  if (delta < 0) {
    return { label: `Your body fat dropped by ${Math.abs(delta).toFixed(1)}% — showing progressive fat loss.`, improving: true };
  }
  return { label: `Your body fat increased by ${delta.toFixed(1)}% since your last evaluation.`, improving: false };
}

// Determines the true prior entry for active comparisons (prevents self-comparison right after save)
function getPreviousEntry(currentBfp: number, history: SavedEntry[]): SavedEntry | null {
  if (history.length === 0) return null;
  const latestSaved = history[0];
  const isDuplicate = Math.abs(latestSaved.bfp - currentBfp) < 0.05;
  if (isDuplicate) {
    return history[1] || null;
  }
  return latestSaved;
}

// ─── PERSONALIZATION ENGINE ───────────────────────────────────────────────────
function generateBodyFatInsights(bfp: number, gender: string): { headline: string; nextSteps: string[]; bfpFact: string } {
  const isMale = gender === "male";
  
  if ((isMale && bfp < 14) || (!isMale && bfp < 21)) {
    return {
      headline: "Optimizing athletic performance and high metabolic baseline preservation",
      nextSteps: [
        "Monitor cellular recovery parameters: Trace hormone health metrics regularly. Maintaining low body fat bands requires structured dietary essential fatty acid intakes.",
        "Prioritize lean mass protection: Ensure high protein distribution (1.6 - 2.2g/kg) and engage in heavy progressive resistance routines to prevent lean mass loss.",
        "Manage athletic fatigue: Watch nervous system markers and integrate periodic rest or recovery periods to offset metabolic load stresses."
      ],
      bfpFact: "Athletic Profile: At lower body fat boundaries, physiological focus shifts from energy expenditure to hormonal maintenance and lean structural resilience."
    };
  } else if ((isMale && bfp < 18) || (!isMale && bfp < 25)) {
    return {
      headline: "Maintaining sustainable fitness composition and performance markers",
      nextSteps: [
        "Embrace lean mass recomposition: Utilize slight caloric deficits (10-15%) paired with consistent strength conditioning to systematically refine tissue distribution.",
        "Synthesize macronutrient splits: Distribute dietary protein evenly across the day to optimize muscle protein synthesis pathways.",
        "Enhance insulin sensitivity: Leverage strength workouts and consistent daily cardiovascular activity (Zone 2 conditioning) to preserve cardiovascular safety."
      ],
      bfpFact: "Fitness Profile: This range correlates with excellent cellular performance, structural health, and highly versatile energy management."
    };
  } else if ((isMale && bfp < 25) || (!isMale && bfp < 32)) {
    return {
      headline: "Formulating systematic body recomposition and energy thresholds",
      nextSteps: [
        "Incorporate progressive caloric deficits: Target a moderate deficit of 300-500 kcal daily to safely preserve muscle mass while burning fatty tissue.",
        "Integrate consistent resistance training: Perform structured full-body resistance sessions 3x a week to signal your body to retain muscle as weight reduces.",
        "Audit systemic lifestyle parameters: Ensure robust hydration patterns and sleep durations (7-9 hours), as chronic stress pathways promote visceral fat accumulation."
      ],
      bfpFact: "Health Profile: Moderate shifts in body fat metrics can significantly reduce systemic inflammation markers and enhance energy efficiency."
    };
  } else {
    return {
      headline: "Structural strategies for metabolic conditioning and safe fat reduction",
      nextSteps: [
        "Initiate a sustainable deficit pathway: Focus on moderate calorie adjustments. Sudden crash diets cause loss of critical calorie-burning muscle tissue.",
        "Emphasize joint-friendly conditioning: Incorporate low-impact cardiovascular routines (swimming, rowing, brisk walking) to protect your joint structures.",
        "Consult medical markers systematically: Partner with a physician to evaluate fasting glucose, lipid parameters, and baseline liver function profiles."
      ],
      bfpFact: "Clinical Metric: Adopting persistent lifestyle-driven weight management changes yields better long-term cellular outcomes than drastic short-term diets."
    };
  }
}

// ─── PROGRESS CARD COMPONENT ──────────────────────────────────────────────────
const ProgressCard = ({ current, history, unit }: { current: BodyFatResult; history: SavedEntry[]; unit: string }) => {
  const previous = getPreviousEntry(current.bfp, history);
  if (!previous) return null;

  const bfpDelta = current.bfp - previous.bfp;
  const info = getBfpDeltaLabel(bfpDelta);

  const prevLean = previous.leanMass;
  const leanDelta = current.leanMass - prevLean;
  const fatDelta = current.fatMass - previous.fatMass;

  return (
    <div
      className="rounded-xl p-5 border flex items-start gap-4 max-w-4xl mx-auto shadow-sm text-left"
      style={{
        background: info.improving ? brand.primaryBg : "#FEF3EE",
        borderColor: info.improving ? brand.primaryBorder : "#F5C4B3",
      }}
    >
      <div
        className="p-2 rounded-lg flex-shrink-0"
        style={{ background: info.improving ? brand.primaryBorder : "#F0997B" }}
      >
        {info.improving ? (
          <Award className="w-5 h-5 text-emerald-700" />
        ) : (
          <AlertCircle className="w-5 h-5 text-orange-700" />
        )}
      </div>
      <div className="space-y-2 w-full">
        <div>
          <p className="font-bold text-sm" style={{ color: info.improving ? brand.primary : "#993C1D" }}>
            {info.improving ? "Excellent! Your body composition indicators are improving." : "Structural metrics have registered a compositional shift."}
          </p>
          <p className="text-xs mt-0.5 text-gray-600 dark:text-gray-400">
            {info.label} · Compared to your check on {new Date(previous.date).toLocaleDateString()}
          </p>
        </div>

        {/* Multi-Parameter Comparative Deltas */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-dashed border-gray-300 dark:border-gray-700 text-xs">
          <div>
            <span className="text-gray-500 block">BFP Delta</span>
            <span className={`font-bold ${bfpDelta <= 0 ? "text-emerald-700" : "text-orange-700"}`}>
              {bfpDelta <= 0 ? "" : "+"}{bfpDelta.toFixed(1)}%
            </span>
          </div>
          <div>
            <span className="text-gray-500 block">Lean Mass Delta</span>
            <span className={`font-bold ${leanDelta >= 0 ? "text-emerald-700" : "text-orange-700"}`}>
              {leanDelta >= 0 ? "+" : ""}{leanDelta.toFixed(1)} {unit}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block">Fat Mass Delta</span>
            <span className={`font-bold ${fatDelta <= 0 ? "text-emerald-700" : "text-orange-700"}`}>
              {fatDelta <= 0 ? "" : "+"}{fatDelta.toFixed(1)} {unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── HISTORY PANEL COMPONENT ──────────────────────────────────────────────────
const HistoryPanel = ({ history, onClear, unit }: { history: SavedEntry[]; onClear: () => void; unit: string }) => {
  if (history.length === 0) return null;

  return (
    <Card className="max-w-4xl mx-auto border shadow-md text-left">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="w-4 h-4 text-emerald-700" />
          Your Body Composition History
        </CardTitle>
        <CardDescription className="text-xs">
          Saved directly in your browser. Complete processing privacy without external account synching.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {history.map((entry, i) => {
            const nextEntry = history[i + 1];
            const delta = nextEntry ? entry.bfp - nextEntry.bfp : null;
            return (
              <div key={entry.date} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-b last:border-0 border-gray-100 dark:border-gray-800 gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                  >
                    #{history.length - i}
                  </div>
                  <div>
                    <p className="text-sm font-semibold capitalize">{entry.categoryLabel} ({entry.bfp.toFixed(1)}%)</p>
                    <p className="text-xs text-gray-400">
                      {new Date(entry.date).toLocaleDateString()} at {new Date(entry.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-right text-xs">
                    <span className="text-gray-500 font-medium">Weight: </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.weight.toFixed(1)} {unit}</span>
                    <span className="mx-1 text-gray-300">|</span>
                    <span className="text-gray-500 font-medium">Lean: </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.leanMass.toFixed(1)} {unit}</span>
                    <span className="mx-1 text-gray-300">|</span>
                    <span className="text-gray-500 font-medium">Fat: </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.fatMass.toFixed(1)} {unit}</span>
                  </div>

                  {delta !== null && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: delta < 0 ? brand.primaryBg : "#FEF3EE",
                        color: delta < 0 ? brand.primary : "#993C1D",
                      }}
                    >
                      {delta < 0 ? "▼" : delta > 0 ? "▲" : "─"}{" "}
                      {Math.abs(delta).toFixed(1)}% BFP
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={onClear}
          className="mt-4 text-xs text-gray-400 hover:text-red-500 transition-colors block"
        >
          Clear historical records
        </button>
      </CardContent>
    </Card>
  );
};

// ─── MAIN CALCULATOR COMPONENT ────────────────────────────────────────────────
export default function BodyFatCalculator() {
  const [result, setResult] = useState<BodyFatResult | null>(null);
  const [history, setHistory] = useState<SavedEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(getBodyFatStorage());
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { gender: "male", weight: "", height: "", neck: "", waist: "", hips: "", units: "metric" },
  });

  const { getValues, setValue, watch } = form;
  const units = watch("units");
  const gender = watch("gender");

  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;

    const convertValue = (val: string, type: 'length' | 'weight') => {
      if (!val) return "";
      const num = parseFloat(val);
      if (isNaN(num)) return "";
      if (type === 'length') {
        return newUnit === 'metric' ? (num * 2.54).toFixed(1) : (num / 2.54).toFixed(1);
      } else {
        return newUnit === 'metric' ? (num / 2.20462).toFixed(1) : (num * 2.20462).toFixed(1);
      }
    };

    setValue("weight", convertValue(getValues("weight"), 'weight'));
    setValue("height", convertValue(getValues("height"), 'length'));
    setValue("neck", convertValue(getValues("neck"), 'length'));
    setValue("waist", convertValue(getValues("waist"), 'length'));
    if (getValues("hips")) setValue("hips", convertValue(getValues("hips")!, 'length'));
    setValue("units", newUnit);
  };

  const getCategory = (bfp: number, gender: string) => {
    if (gender === "male") {
      if (bfp < 14) return { label: "Athlete", color: "text-blue-600", bg: "bg-blue-600" };
      if (bfp < 18) return { label: "Fitness", color: "text-green-600", bg: "bg-green-600" };
      if (bfp < 25) return { label: "Average", color: "text-yellow-600", bg: "bg-yellow-600" };
      return { label: "Obese", color: "text-red-600", bg: "bg-red-600" };
    } else {
      if (bfp < 21) return { label: "Athlete", color: "text-blue-600", bg: "bg-blue-600" };
      if (bfp < 25) return { label: "Fitness", color: "text-green-600", bg: "bg-green-600" };
      if (bfp < 32) return { label: "Average", color: "text-yellow-600", bg: "bg-yellow-600" };
      return { label: "Obese", color: "text-red-600", bg: "bg-red-600" };
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setSaved(false);

    setTimeout(() => {
      const isMetric = values.units === "metric";
      const w = isMetric ? parseFloat(values.weight) : parseFloat(values.weight) / 2.20462;
      const h = isMetric ? parseFloat(values.height) : parseFloat(values.height) * 2.54;
      const n = isMetric ? parseFloat(values.neck) : parseFloat(values.neck) * 2.54;
      const wa = isMetric ? parseFloat(values.waist) : parseFloat(values.waist) * 2.54;
      const hi = values.hips ? (isMetric ? parseFloat(values.hips) : parseFloat(values.hips) * 2.54) : 0;

      let bfp = 0;
      if (values.gender === "male") {
        bfp = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450;
      } else {
        bfp = 495 / (1.29579 - 0.35004 * Math.log10(wa + hi - n) + 0.221 * Math.log10(h)) - 450;
      }

      // Safeguard math against negative boundary anomalies
      bfp = Math.max(2, bfp);

      const fatMass = (bfp / 100) * w;
      const leanMass = w - fatMass;
      const bmr = 370 + (21.6 * leanMass);
      const targetBFP = values.gender === "male" ? 15 : 22;
      const idealW = leanMass / (1 - targetBFP / 100);

      const displayFatMass = isMetric ? fatMass : fatMass * 2.20462;
      const displayLeanMass = isMetric ? leanMass : leanMass * 2.20462;
      const displayIdealWeight = isMetric ? idealW : idealW * 2.20462;

      const category = getCategory(bfp, values.gender);
      const insights = generateBodyFatInsights(bfp, values.gender);

      setResult({
        bfp,
        fatMass: displayFatMass,
        leanMass: displayLeanMass,
        bmr: Math.round(bmr),
        category,
        idealWeight: displayIdealWeight,
        headline: insights.headline,
        nextSteps: insights.nextSteps,
        bfpFact: insights.bfpFact
      });

      setIsLoading(false);
      setTimeout(() => { 
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
      }, 150);
    }, 700);
  }

  const handleSave = () => {
    if (!result) return;
    const values = form.getValues();
    const entry: SavedEntry = {
      date: new Date().toISOString(),
      bfp: result.bfp,
      fatMass: result.fatMass,
      leanMass: result.leanMass,
      weight: parseFloat(values.weight),
      units: values.units,
      gender: values.gender,
      categoryLabel: result.category.label,
    };
    saveBodyFatEntry(entry);
    setHistory(getBodyFatStorage());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
    setShowHistory(false);
  };

  const resultUnit = units === 'metric' ? 'kg' : 'lb';

  return (
    <div className="space-y-8 text-left">
      {/* ── HISTORICAL PROGRESS TRIGGER ────────────────────────────────────────── */}
      {history.length > 0 && (
        <div className="max-w-4xl mx-auto flex justify-between items-center bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-700" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Found {history.length} saved body fat {history.length === 1 ? "record" : "records"}
            </span>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:underline"
          >
            {showHistory ? "Collapse Tracking" : "Show Saved Entries"}
            <ChevronRight className={`w-4 h-4 transition-transform ${showHistory ? "rotate-90" : ""}`} />
          </button>
        </div>
      )}

      {showHistory && (
        <div className="space-y-4">
          <HistoryPanel history={history} onClear={clearHistory} unit={resultUnit} />
        </div>
      )}

      {/* ── CALCULATOR COMPONENT ───────────────────────────────────────────────── */}
      <Card className="max-w-4xl mx-auto border-gray-200 shadow-sm" id="calculator">
        <CardHeader className="space-y-1 pb-6 border-b" style={{ background: `linear-gradient(to bottom, ${brand.primaryBg}, white)` }}>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-700" /> Body Fat Percentage Calculator
              </CardTitle>
              <CardDescription className="mt-1">
                Calculate overall body composition metrics using the standardized U.S. Navy Method [1].
              </CardDescription>
            </div>
            {history.length > 0 && (
              <div
                className="hidden sm:flex text-xs font-semibold px-3 py-1.5 rounded-full items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Browser Saving On
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Gender & Units Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-semibold">Biological Sex</FormLabel>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
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
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-semibold">Measurement Units</FormLabel>
                    <RadioGroup onValueChange={(value) => handleUnitChange(value as UnitSystem)} value={field.value} className="flex gap-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="metric" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Metric (cm/kg)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="imperial" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Imperial (in/lb)</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )} />
              </div>

              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Weight ({units === 'metric' ? 'kg' : 'lb'})</FormLabel>
                    <FormControl><Input type="number" step="0.1" placeholder="70" {...field} className="h-11 text-base" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Height ({units === 'metric' ? 'cm' : 'in'})</FormLabel>
                    <FormControl><Input type="number" step="0.1" placeholder="175" {...field} className="h-11 text-base" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="neck" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Neck Circumference ({units === 'metric' ? 'cm' : 'in'})</FormLabel>
                    <FormControl><Input type="number" step="0.1" placeholder="38" {...field} className="h-11 text-base" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="waist" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Waist (at Navel) ({units === 'metric' ? 'cm' : 'in'})</FormLabel>
                    <FormControl><Input type="number" step="0.1" placeholder="85" {...field} className="h-11 text-base" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                {gender === "female" && (
                  <FormField control={form.control} name="hips" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Hips (Widest Point) ({units === 'metric' ? 'cm' : 'in'})</FormLabel>
                      <FormControl><Input type="number" step="0.1" placeholder="95" {...field} className="h-11 text-base" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" size="lg" className="flex-1 h-14 text-lg font-bold bg-emerald-700 hover:bg-emerald-800" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Calculator className="h-5 w-5 mr-2" />} 
                  Calculate Body Fat
                </Button>
                <Button type="button" variant="outline" size="lg" className="sm:w-44 h-14" onClick={() => { form.reset(); setResult(null); setSaved(false); }} disabled={isLoading}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* ── UNIFIED RESULTS SECTION ────────────────────────────────────────────── */}
      <div ref={resultsRef} className="scroll-mt-16">
        {result && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-6 duration-700 fade-in">
            {/* COMPARATIVE PROGRESS COMPONENT */}
            <ProgressCard current={result} history={history} unit={resultUnit} />

            {/* 1. MAIN SCORE HERO PANEL */}
            <Card className="border shadow-lg overflow-hidden border-emerald-100">
              <div className={`h-2 w-full ${result.category.bg}`} />
              <CardContent className="p-8 md:p-10 text-center space-y-6">
                
                {/* Visual Fact Strip */}
                <div
                  className="text-xs font-semibold px-4 py-2.5 rounded-lg flex items-start text-left gap-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  <Brain className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-700" />
                  <span>{result.bfpFact}</span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Calculated Body Fat</p>
                  <div className="flex items-center justify-center gap-1 md:gap-2">
                    <span className="text-6xl md:text-7xl font-black text-gray-900">{result.bfp.toFixed(1)}</span>
                    <span className="text-3xl md:text-4xl font-bold text-gray-400">%</span>
                  </div>
                  <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border ${result.category.color} border-current bg-white`}>
                    {result.category.label}
                  </div>
                </div>

                {/* Secondary description derived from category layout */}
                <div className="max-w-xl mx-auto pt-4 border-t border-gray-100 text-sm text-gray-500 leading-relaxed">
                  Your body fat composition stands in the <strong className={result.category.color}>{result.category.label}</strong> classification for {gender}s, representing your current internal metabolic state.
                </div>
              </CardContent>
            </Card>

            {/* 2. DETAILED METRICS SPLIT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Mass Breakdown */}
              <Card className="border shadow-md">
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <Scale className="w-5 h-5 text-emerald-700" /> Weight Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span>
                          <Link
                            href="/health/lean-body-mass-calculator"
                            className="text-gray-600 hover:underline hover:text-emerald-700 transition-colors"
                          >
                            Lean Body Mass →
                          </Link>
                        </span>
                        <span className="text-gray-900">
                          {result.leanMass.toFixed(1)} {resultUnit}
                        </span>
                      </div>
                      <div className="h-3.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${100 - result.bfp}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-400 block italic">Includes skeletal muscle tissue, bones, organs, and body fluids.</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-gray-600">Total Fat Mass</span>
                        <span className="text-gray-900">{result.fatMass.toFixed(1)} {resultUnit}</span>
                      </div>
                      <div className="h-3.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 rounded-full transition-all duration-1000" style={{ width: `${result.bfp}%` }} />
                      </div>
                      <span className="text-[10px] text-gray-400 block italic">Includes essential storage fat structures and subcutaneous adipose fat tissue.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Column: Energy and Performance Indexes */}
              <Card className="border shadow-md">
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <Zap className="w-5 h-5 text-yellow-500" /> Metabolic & Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {/* Ideal Weight Indicator */}
                  <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Ideal Performance Weight</p>
                        <p className="text-2xl font-black text-blue-950 mt-1">{result.idealWeight.toFixed(1)} <span className="text-xs font-medium text-blue-600">{resultUnit}</span></p>
                      </div>
                      <Target className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-[11px] text-blue-700/80 mt-2 leading-tight">
                      Calculated target weight to achieve {gender === 'male' ? '15%' : '22%'} body fat margins while completely retaining current lean muscle tissue.
                    </p>
                  </div>

                  {/* BMR Indicator */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                          <Link
                            href="/health/bmr-calculator"
                            className="hover:underline hover:text-emerald-700 transition-colors"
                          >
                            Basal Metabolic Rate (BMR) →
                          </Link>
                        </p>
                        <p className="text-2xl font-black text-gray-900 mt-1">{result.bmr} <span className="text-xs font-medium text-gray-500">kcal/day</span></p>
                      </div>
                      <Activity className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-2 leading-tight">
                      Estimated calories burned at complete rest using the lean-muscle-adjusted Katch-McArdle formula.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 3. HIGH-CTR PERSONALIZED FITNESS ACTIONS */}
            <Card className="border-0 shadow-lg" style={{ background: brand.primaryBg, border: `1px solid ${brand.primaryBorder}` }}>
              <CardContent className="p-8">
                <div className="flex items-center gap-2.5 mb-5">
                  <ArrowRight className="w-5 h-5 text-emerald-700" />
                  <h3 className="text-lg font-black text-emerald-700">
                    Your Personalized Recomposition Action Plan
                  </h3>
                </div>
                <p className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">
                  {result.headline}
                </p>
                <div className="space-y-3">
                  {result.nextSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/80 dark:bg-slate-950/70 rounded-lg p-3.5 border border-emerald-100/50">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 bg-emerald-700 text-white"
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>

                {/* Core Cross-Links */}
                <div className="mt-8 pt-4 border-t border-emerald-200">
                  <p className="text-xs font-bold mb-3 text-emerald-700">Explore core metabolic indexes &rarr;</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "TDEE / Calories Calculator", href: "/health/tdee-calculator" },
                      { label: "Ideal Weight Calculator", href: "/health/ideal-body-weight-calculator" },
                      { label: "A Body Shape Index (ABSI)", href: "/health/absi-calculator" },
                      { label: "BMR metabolic baseline", href: "/health/bmr-calculator" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 transition-all hover:bg-white/95 border bg-white border-emerald-200 text-gray-700 hover:shadow-sm"
                      >
                        {link.label} <ChevronRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. METHODOLOGY DISCLAIMER */}
            <div className="text-[11px] text-gray-400 text-center max-w-2xl mx-auto leading-relaxed px-4">
              <strong>Methodological Context:</strong> The body fat metrics computed are derived via the standardized logarithmic U.S. Navy Method [1]. Circumference screening represents an excellent, highly validated prediction tool but remains an estimation. Individual tissue distribution margins and specific skeletal frames may vary. Always seek direct medical guidance before undergoing structural deficit or weight conditioning transitions.
            </div>

            {/* 5. HISTORY ACTION CONTROLS */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-6">
              <Button
                onClick={handleSave}
                disabled={saved}
                className="font-bold px-8 w-full sm:w-auto h-12 bg-emerald-700 text-white hover:bg-emerald-800"
                style={saved ? { background: brand.primaryBg, color: brand.primary, border: `1px solid ${brand.primaryBorder}` } : {}}
              >
                {saved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Saved to Progress
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Save to Progress History
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto h-12"
                onClick={() => {
                  form.reset();
                  setResult(null);
                  setSaved(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" /> New Evaluation
              </Button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}