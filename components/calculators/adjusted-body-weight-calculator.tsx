"use client"

import { useState, useRef, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Calculator, RefreshCw, Loader2, Weight, Target, Save, History, 
  ChevronRight, AlertCircle, Award, BarChart3, Heart, Brain, 
  ArrowRight, CheckCircle2, TrendingDown, TrendingUp, Info 
} from "lucide-react"

// ─── VALIDATION SCHEMA ────────────────────────────────────────────────────────
const formSchema = z.object({
  weight: z.string().min(1, "Actual weight is required"),
  height: z.string().min(1, "Height is required"),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  units: z.enum(["metric", "imperial"]),
})

type UnitSystem = "metric" | "imperial"

// ─── INTERFACES ───────────────────────────────────────────────────────────────
interface CalculationResult {
  idealBodyWeight: number
  adjustedBodyWeight: number
  actualWeight: number
  excessWeightPct: number
  interpretation: string
  headline: string
  nextSteps: string[];
}

interface SavedEntry {
  date: string
  actualWeight: number
  idealBodyWeight: number
  adjustedBodyWeight: number
  units: string
  gender: string
  height: string
}

// ─── CONSTANTS & STORAGE KEY ──────────────────────────────────────────────────
const STORAGE_KEY = "calqulate_ajbw_history"

const brand = {
  primary: "#15803d", // emerald-700
  primaryBg: "#f0fdf4", // emerald-50
  primaryBorder: "#bbf7d0", // emerald-200
}

// ─── LOCAL STORAGE HELPERS ────────────────────────────────────────────────────
function getAjbwStorage(): SavedEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveAjbwEntry(entry: SavedEntry) {
  try {
    const existing = getAjbwStorage()
    existing.unshift(entry)
    const trimmed = existing.slice(0, 10) // Keep last 10 records
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  } catch {
    /* ignore */
  }
}

function getWeightDeltaLabel(delta: number, unit: string): { label: string; improving: boolean } {
  if (Math.abs(delta) < 0.1) {
    return { label: "No significant change in actual weight since your last check.", improving: true }
  }
  if (delta < 0) {
    return { label: `Your actual body weight decreased by ${Math.abs(delta).toFixed(1)} ${unit} since your last calculation.`, improving: true }
  }
  return { label: `Your actual body weight increased by ${delta.toFixed(1)} ${unit} since your last calculation.`, improving: false }
}

// Determines the true prior entry for active comparisons (prevents matching the currently saved state)
function getPreviousEntry(current: CalculationResult, history: SavedEntry[]): SavedEntry | null {
  if (history.length === 0) return null
  const latestSaved = history[0]
  // If latest entry matches current active output, compare to the one before it
  const isDuplicateOfCurrent = Math.abs(latestSaved.actualWeight - current.actualWeight) < 1e-2 && 
                              Math.abs(latestSaved.adjustedBodyWeight - current.adjustedBodyWeight) < 1e-2
  if (isDuplicateOfCurrent) {
    return history[1] || null
  }
  return latestSaved
}

// ─── PERSONALIZATION ENGINE ───────────────────────────────────────────────────
function generatePersonalizedInsights(
  excessPct: number, 
  actual: number, 
  ibw: number, 
  ajbw: number, 
  unit: string
): { headline: string; interpretation: string; nextSteps: string[] } {
  
  if (excessPct > 20) {
    return {
      headline: "Clinical adjustment is recommended for your metabolic calculations",
      interpretation: `Your actual weight is ${excessPct.toFixed(0)}% above your theoretical Ideal Body Weight (IBW). In clinical settings, using actual weight for medication dosing or nutritional metrics can result in overestimating clearances or caloric requirements. Your Adjusted Body Weight of ${ajbw.toFixed(1)} ${unit} acts as an adjusted baseline that accounts for metabolically active lean tissue without over-indexing on adipose tissue mass.`,
      nextSteps: [
        `Use your Adjusted Body Weight (${ajbw.toFixed(1)} ${unit}) under medical supervision for clinical drug dosing (e.g., aminoglycosides) or nutritional planning.`,
        "Consult with a clinical dietitian to formulate a sustainable weight reduction or maintenance program using adjusted metabolic thresholds.",
        "Assess auxiliary biomarkers such as blood pressure, fasting glucose, and blood lipids to contextualize metabolic safety."
      ]
    }
  } else if (excessPct < 0) {
    return {
      headline: "Actual body weight registers below standard ideal limits",
      interpretation: `Your weight is currently below your estimated Ideal Body Weight (IBW) of ${ibw.toFixed(1)} ${unit}. In this scenario, adjusted formulas are not clinically indicated, and your Actual Weight should serve as your primary metabolic and nutritional calculation index. This helps protect against potential under-dosing in critical clinical circumstances.`,
      nextSteps: [
        `Base clinical metrics and metabolic parameters on your Actual Body Weight (${actual.toFixed(1)} ${unit}) to prevent underestimating caloric or pharmaceutical thresholds.`,
        "Aim for positive energy balances with structured nutrient-dense food tracking if the goal is lean mass accretion.",
        "Examine key systemic parameters with a physician to rule out physiological causes for persistent lower weight bounds."
      ]
    }
  } else {
    return {
      headline: "Your weight sits within stable bounds of standard ideal limits",
      interpretation: `Your actual weight is close to your Ideal Body Weight of ${ibw.toFixed(1)} ${unit} (within ${excessPct.toFixed(0)}% excess). Adjusted body weight modifications are not clinically necessary in this range. Your actual body mass provides a highly accurate reflection of your systemic tissue profile.`,
      nextSteps: [
        `Utilize your Actual Weight (${actual.toFixed(1)} ${unit}) for standard pharmacological dosing and daily energy baseline values.`,
        "Incorporate a stable balance of resistance exercise and moderate cardiovascular stimulus to sustain existing lean mass.",
        "Track weekly dietary metrics to ensure consistency in your daily structural upkeep."
      ]
    }
  }
}

// ─── PROGRESS CARD COMPONENT ──────────────────────────────────────────────────
const ProgressCard = ({ current, history, unit }: { current: CalculationResult; history: SavedEntry[]; unit: string }) => {
  const previous = getPreviousEntry(current, history)
  if (!previous) return null

  const weightDeltaVal = current.actualWeight - previous.actualWeight
  const info = getWeightDeltaLabel(weightDeltaVal, unit)

  const prevIbw = previous.idealBodyWeight
  const ibwDelta = current.idealBodyWeight - prevIbw
  const ajbwDelta = current.adjustedBodyWeight - previous.adjustedBodyWeight

  return (
    <div
      className="rounded-xl p-5 border flex items-start gap-4 max-w-4xl mx-auto shadow-sm"
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
          <Award className="w-5 h-5" style={{ color: brand.primary }} />
        ) : (
          <AlertCircle className="w-5 h-5 text-orange-700" />
        )}
      </div>
      <div className="space-y-2 w-full">
        <div>
          <p className="font-bold text-sm" style={{ color: info.improving ? brand.primary : "#993C1D" }}>
            {info.improving ? "Tracking Update: Weight parameters are consolidating." : "Weight parameters have registered an upward shift."}
          </p>
          <p className="text-xs mt-0.5 text-gray-600 dark:text-gray-400">
            {info.label} · Compared to your run on {new Date(previous.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>

        {/* Dynamic Parameter Deltas */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-dashed border-gray-300 dark:border-gray-700 text-xs">
          <div>
            <span className="text-gray-500 block">Actual Wt Delta</span>
            <span className={`font-bold ${weightDeltaVal <= 0 ? "text-emerald-700" : "text-orange-700"}`}>
              {weightDeltaVal <= 0 ? "" : "+"}{weightDeltaVal.toFixed(1)} {unit}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block">AjBW Delta</span>
            <span className={`font-bold ${ajbwDelta <= 0 ? "text-emerald-700" : "text-orange-700"}`}>
              {ajbwDelta <= 0 ? "" : "+"}{ajbwDelta.toFixed(1)} {unit}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block">IBW Delta</span>
            <span className={`font-bold ${Math.abs(ibwDelta) < 0.1 ? "text-gray-600" : ibwDelta > 0 ? "text-orange-700" : "text-emerald-700"}`}>
              {Math.abs(ibwDelta) < 0.1 ? "No Change" : `${ibwDelta > 0 ? "+" : ""}${ibwDelta.toFixed(1)} ${unit}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── HISTORY PANEL COMPONENT ──────────────────────────────────────────────────
const HistoryPanel = ({ history, onClear, unit }: { history: SavedEntry[]; onClear: () => void; unit: string }) => {
  if (history.length === 0) return null

  return (
    <Card className="max-w-4xl mx-auto border shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="w-4 h-4 text-emerald-700" />
          Your Local Weight Metrics History
        </CardTitle>
        <CardDescription className="text-xs">
          Stored locally in your browser. Complete privacy without account syncs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {history.map((entry, i) => {
            const nextEntry = history[i + 1]
            const delta = nextEntry ? entry.actualWeight - nextEntry.actualWeight : null
            return (
              <div key={entry.date} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-b last:border-0 border-gray-100 dark:border-gray-800 gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: brand.primaryBg, color: brand.primary }}
                  >
                    #{history.length - i}
                  </div>
                  <div>
                    <p className="text-sm font-semibold capitalize">{entry.gender}, {entry.height} {entry.units === "metric" ? "cm" : "in"}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at{" "}
                      {new Date(entry.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-right text-xs">
                    <span className="text-gray-500 font-medium">Actual: </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.actualWeight.toFixed(1)} {unit}</span>
                    <span className="mx-1 text-gray-300">|</span>
                    <span className="text-gray-500 font-medium">AjBW: </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.adjustedBodyWeight.toFixed(1)} {unit}</span>
                    <span className="mx-1 text-gray-300">|</span>
                    <span className="text-gray-500 font-medium">IBW: </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.idealBodyWeight.toFixed(1)} {unit}</span>
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
                      {Math.abs(delta).toFixed(1)} {unit}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <button
          onClick={onClear}
          className="mt-4 text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear historical records
        </button>
      </CardContent>
    </Card>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AdjustedBodyWeightCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [units, setUnits] = useState<UnitSystem>("metric")
  const [history, setHistory] = useState<SavedEntry[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [saved, setSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHistory(getAjbwStorage())
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { weight: "", height: "", gender: "male", units: "metric" },
  })
  
  // Conversion helpers
  const cmToInches = (cm: number) => cm / 2.54;
  const inchesToCm = (inches: number) => inches * 2.54;
  const kgToLbs = (kg: number) => kg * 2.20462;
  const lbsToKg = (lbs: number) => lbs / 2.20462;

  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentValues = form.getValues();
    const updatedValues: Record<string, any> = { ...currentValues };

    if (currentValues.height) {
      const h = parseFloat(currentValues.height);
      if (!isNaN(h)) {
        updatedValues.height =
          newUnit === "imperial" ? cmToInches(h).toFixed(1) : inchesToCm(h).toFixed(1);
      }
    }
    if (currentValues.weight) {
      const wt = parseFloat(currentValues.weight);
      if (!isNaN(wt)) {
        updatedValues.weight =
          newUnit === "imperial" ? kgToLbs(wt).toFixed(1) : lbsToKg(wt).toFixed(1);
      }
    }

    updatedValues.units = newUnit;
    form.reset(updatedValues);
    setUnits(newUnit);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setResult(null)
    setSaved(false)

    setTimeout(() => {
      const weight = parseFloat(values.weight)
      const height = parseFloat(values.height)
      const gender = values.gender

      const weightInKg = units === "metric" ? weight : lbsToKg(weight)
      const heightInCm = units === "metric" ? height : inchesToCm(height)
      const heightInInches = heightInCm / 2.54
      
      let idealBodyWeight = 0;
      const heightOver5FeetInches = Math.max(0, heightInInches - 60);

      // Devine Formula
      if (gender === 'male') {
        idealBodyWeight = 50 + 2.3 * heightOver5FeetInches;
      } else { // female
        idealBodyWeight = 45.5 + 2.3 * heightOver5FeetInches;
      }

      let adjustedBodyWeight = idealBodyWeight;
      // AjBW formula is typically only applied if actual weight is >120% of IBW
      if (weightInKg > idealBodyWeight) {
         adjustedBodyWeight = idealBodyWeight + 0.4 * (weightInKg - idealBodyWeight);
      } else {
        // If actual weight is less than or equal to ideal weight, AjBW is simply actual weight
        adjustedBodyWeight = weightInKg;
      }

      // Convert metrics into display units
      const finalActualWeight = weight
      const finalIdealWeight = units === 'metric' ? idealBodyWeight : kgToLbs(idealBodyWeight)
      const finalAdjustedWeight = units === 'metric' ? adjustedBodyWeight : kgToLbs(adjustedBodyWeight)

      const excessWeightPct = ((weightInKg - idealBodyWeight) / idealBodyWeight) * 100
      const unitLabel = units === 'metric' ? 'kg' : 'lbs'

      const insights = generatePersonalizedInsights(
        excessWeightPct,
        finalActualWeight,
        finalIdealWeight,
        finalAdjustedWeight,
        unitLabel
      )
      
      setResult({ 
        idealBodyWeight: finalIdealWeight,
        adjustedBodyWeight: finalAdjustedWeight,
        actualWeight: finalActualWeight,
        excessWeightPct,
        interpretation: insights.interpretation,
        headline: insights.headline,
        nextSteps: insights.nextSteps
      })
      setIsLoading(false)

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150)
    }, 700)
  }

  const handleSave = () => {
    if (!result) return
    const values = form.getValues()
    const entry: SavedEntry = {
      date: new Date().toISOString(),
      actualWeight: result.actualWeight,
      idealBodyWeight: result.idealBodyWeight,
      adjustedBodyWeight: result.adjustedBodyWeight,
      units: values.units,
      gender: values.gender,
      height: values.height,
    }
    saveAjbwEntry(entry)
    setHistory(getAjbwStorage())
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY)
    setHistory([])
    setShowHistory(false)
  }

  const resetCalculator = () => {
    form.reset({
      weight: "",
      height: "",
      gender: "male",
      units: "metric",
    })
    setResult(null)
    setSaved(false)
  }

  const resultUnit = units === 'metric' ? 'kg' : 'lbs';

  return (
    <div className="space-y-8">
      {/* ── HISTORICAL TRACKING TRIGGER ────────────────────────────────────────── */}
      {history.length > 0 && (
        <div className="max-w-4xl mx-auto flex justify-between items-center bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-700" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Found {history.length} active baseline {history.length === 1 ? "record" : "records"}
            </span>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:underline"
            style={{ color: brand.primary }}
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

      {/* ── CALCULATOR CARD ──────────────────────────────────────────────────── */}
      <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden" style={{ borderTop: `4px solid ${brand.primary}` }}>
        <CardHeader className="pb-6 border-b" style={{ background: `linear-gradient(to bottom, ${brand.primaryBg}, white)` }}>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Calculator className="w-6 h-6 text-emerald-700" /> 
                Adjusted Body Weight Calculator
              </CardTitle>
              <CardDescription className="mt-1">
                Enter your dimensions to calculate Ideal and Adjusted Body Weight using the Devine formula.
              </CardDescription>
            </div>
            {history.length > 0 && (
              <div
                className="hidden sm:flex text-xs font-semibold px-3 py-1.5 rounded-full items-center gap-1.5"
                style={{ background: brand.primaryBg, color: brand.primary, border: `1px solid ${brand.primaryBorder}` }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Browser Saving On
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Unit Selection */}
              <FormField
                control={form.control} name="units" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-semibold text-sm">Unit System Selection</FormLabel>
                    <FormControl>
                      <RadioGroup
                          onValueChange={(value: UnitSystem) => {
                            field.onChange(value);
                            handleUnitChange(value);
                          }}
                          value={field.value}
                          className="flex items-center space-x-4"
                        >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl><RadioGroupItem value="metric" /></FormControl>
                          <FormLabel className="font-normal cursor-pointer">Metric (cm, kg)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl><RadioGroupItem value="imperial" /></FormControl>
                          <FormLabel className="font-normal cursor-pointer">Imperial (inches, lbs)</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Input Coordinates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Biological Sex</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Height ({units === 'metric' ? 'cm' : 'inches'})</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={units === 'metric' ? "e.g., 178" : "e.g., 70"} {...field} className="h-12 text-lg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="weight" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Actual Weight ({units === 'metric' ? 'kg' : 'lbs'})</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={units === 'metric' ? "e.g., 95" : "e.g., 210"} {...field} className="h-12 text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" size="lg" className="flex-1 text-lg h-14 font-bold" disabled={isLoading} style={{ background: brand.primary, color: "white" }}>
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Calculator className="mr-2 h-5 w-5" />}
                  {isLoading ? 'Calculating...' : 'Calculate AjBW'}
                </Button>
                <Button type="button" variant="outline" size="lg" className="sm:w-44 text-lg h-14" onClick={resetCalculator} disabled={isLoading}>
                  <RefreshCw className="mr-2 h-5 w-5" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* ── UNIFIED RESULTS BLOCK ─────────────────────────────────────────────── */}
      <div ref={resultsRef} className="scroll-mt-8">
        {result && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-6 duration-700 fade-in">
            {/* COMPARATIVE PROGRESS COMPONENT */}
            <ProgressCard current={result} history={history} unit={resultUnit} />

            {/* 1. HEALTH PROFILE HERO PANEL */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="h-1.5 w-full bg-emerald-700" />
              <CardContent className="p-8 md:p-10">
                {/* Visual Fact Strip */}
                <div
                  className="text-xs font-semibold px-4 py-2.5 rounded-lg mb-6 flex items-start gap-2.5"
                  style={{ background: brand.primaryBg, color: brand.primary, border: `1px solid ${brand.primaryBorder}` }}
                >
                  <Brain className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    Clinical Insight: Adjusted Body Weight accounts for the lower metabolic activity of excess adipose tissue (estimated at approximately 40%) compared to lean body mass.
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-8">
                  {/* Dynamic Weight Summary */}
                  <div className="flex-shrink-0 text-center md:text-left min-w-[200px]">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
                    >
                      <Weight className="w-3.5 h-3.5" /> Target Metric
                    </div>
                    <div className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                      {result.adjustedBodyWeight.toFixed(1)} <span className="text-xl font-normal text-muted-foreground">{resultUnit}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Adjusted Weight (AjBW)
                    </div>
                  </div>

                  {/* Dynamic Interpretation Area */}
                  <div className="flex-1 w-full space-y-4">
                    <div className="pt-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mb-2">
                        {result.headline}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {result.interpretation}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. THREE-PANE ANALYSIS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Actual weight */}
              <Card className="border shadow-md">
                <CardHeader className="pb-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Calculated Variable</span>
                  <CardTitle className="text-xl">Actual Weight</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black tracking-tight mb-1 text-gray-800 dark:text-gray-100">
                    {result.actualWeight} <span className="text-lg font-normal text-muted-foreground">{resultUnit}</span>
                  </div>
                  <Badge variant="outline" className="text-xs font-bold">
                    Measured Mass
                  </Badge>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-3">
                    Your current total physical mass. Standard metabolic metric for basic BMI limits.
                  </p>
                </CardContent>
              </Card>

              {/* Ideal Body Weight */}
              <Card className="border shadow-md">
                <CardHeader className="pb-2">
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Theoretical Baseline</span>
                  <CardTitle className="text-xl">Ideal Body Weight</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black tracking-tight mb-1 text-gray-800 dark:text-gray-100">
                    {result.idealBodyWeight.toFixed(1)} <span className="text-lg font-normal text-muted-foreground">{resultUnit}</span>
                  </div>
                  <Badge variant="outline" className="text-xs font-bold">
                    Devine Limit
                  </Badge>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-3">
                    Standard healthy reference baseline calculated from sex assigned at birth and linear height bounds.
                  </p>
                </CardContent>
              </Card>

              {/* Adjusted Body Weight */}
              <Card className="border-2 border-dashed border-emerald-500 shadow-md bg-emerald-50/10">
                <CardHeader className="pb-2">
                  <span className="text-xs text-emerald-800 dark:text-emerald-400 font-bold uppercase tracking-widest">Clinical Baseline</span>
                  <CardTitle className="text-xl text-emerald-800 dark:text-emerald-400">Adjusted Weight</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black tracking-tight mb-1 text-emerald-700 dark:text-emerald-400">
                    {result.adjustedBodyWeight.toFixed(1)} <span className="text-lg font-normal text-muted-foreground">{resultUnit}</span>
                  </div>
                  <Badge className="text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800">
                    Clinical Formula
                  </Badge>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-3">
                    Adjusted value recommended for clinical and critical pharmacological dosing bounds in overweight states.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* 3. ORIGINAL CLINICAL WEIGHT TABLE */}
            <Card className="border shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Info className="w-5 h-5 text-emerald-700" /> Metric Definition Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left table-auto">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <th className="px-4 py-2 font-semibold">Weight Type</th>
                        <th className="px-4 py-2 font-semibold">Value</th>
                        <th className="px-4 py-2 font-semibold">Meaning / Insight</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-3 font-medium">Actual Body Weight (ABW)</td>
                        <td className="px-4 py-3 font-semibold">{result.actualWeight} {resultUnit}</td>
                        <td className="px-4 py-3 text-muted-foreground">Your current total body weight, including fat, muscle, bone, and fluids. Used for general health and BMI calculations.</td>
                      </tr>
                      <tr className="border-t bg-gray-50 dark:bg-gray-900">
                        <td className="px-4 py-3 font-medium">Ideal Body Weight (IBW)</td>
                        <td className="px-4 py-3 font-semibold">{result.idealBodyWeight.toFixed(1)} {resultUnit}</td>
                        <td className="px-4 py-3 text-muted-foreground">The theoretical healthy weight based on your height and gender — represents optimal body composition for most adults.</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-3 font-medium">Adjusted Body Weight (AjBW)</td>
                        <td className="px-4 py-3 font-semibold">{result.adjustedBodyWeight.toFixed(1)} {resultUnit}</td>
                        <td className="px-4 py-3 text-muted-foreground">A clinically adjusted weight that blends actual and ideal weight (40% of excess added). Used for accurate drug dosing and nutritional planning in overweight cases.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* 4. HIGH-CTR PERSONALIZED ACTION RECOMMENDATIONS */}
            <Card className="border-0 shadow-lg" style={{ background: brand.primaryBg, border: `1px solid ${brand.primaryBorder}` }}>
              <CardContent className="p-8">
                <div className="flex items-center gap-2.5 mb-5">
                  <ArrowRight className="w-5 h-5" style={{ color: brand.primary }} />
                  <h3 className="text-lg font-black" style={{ color: brand.primary }}>
                    What to do right now — your personalized action plan
                  </h3>
                </div>
                <div className="space-y-3">
                  {result.nextSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/80 dark:bg-slate-950/70 rounded-lg p-3.5 border border-emerald-100/50">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ background: brand.primary, color: "white" }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>

                {/* Core Cross-Links */}
                <div className="mt-8 pt-4 border-t" style={{ borderColor: brand.primaryBorder }}>
                  <p className="text-xs font-bold mb-3" style={{ color: brand.primary }}>Compare other key baseline metrics &rarr;</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "TDEE / Calories Calculator", href: "/health/tdee-calculator" },
                      { label: "Ideal Weight Calculator", href: "/health/ideal-body-weight-calculator" },
                      { label: "Body Fat % Calculator", href: "/health/body-fat-calculator" },
                      { label: "Heart Rate Zones", href: "/health/heart-rate-calculator" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 transition-all hover:bg-white/95 border bg-white text-gray-700 hover:shadow-sm"
                        style={{ borderColor: brand.primaryBorder }}
                      >
                        {link.label} <ChevronRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5. CLINICAL DISCLAIMER */}
            <div className="text-[11px] text-gray-400 text-center max-w-2xl mx-auto leading-relaxed px-4">
              <strong>Clinical Notice:</strong> Adjusted body weight is primarily a mathematical model used in specific therapeutic settings (e.g., intensive nutritional support, critical care medication dosing). It is not a diagnosis of physical health or body fat distribution. All values should be confirmed with clinical pharmacy guidelines and medical professionals.
            </div>

            {/* 6. STORAGE SAVE & NEW CALCULATIONS CONSOLE */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-6">
              <Button
                onClick={handleSave}
                disabled={saved}
                className="font-bold px-8 w-full sm:w-auto h-12"
                style={saved ? { background: brand.primaryBg, color: brand.primary, border: `1px solid ${brand.primaryBorder}` } : { background: brand.primary, color: "white" }}
              >
                {saved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Saved in History
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
                  form.reset({
                    weight: "",
                    height: "",
                    gender: "male",
                    units: "metric",
                  })
                  setResult(null)
                  setSaved(false)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" /> New Evaluation
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}