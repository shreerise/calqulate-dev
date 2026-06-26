"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, RefreshCw, Loader2, Sparkles, Shirt, HeartPulse, CheckCircle2, History, Ruler, Scissors } from "lucide-react";

// --- FORM SCHEMA ---
const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
  bust: z.string().min(1, "Bust measurement is required."),
  waist: z.string().min(1, "Waist measurement is required."),
  highHips: z.string().min(1, "High Hip measurement is required."),
  hips: z.string().min(1, "Hip measurement is required."),
  units: z.enum(["metric", "imperial"]),
});

type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";
type MeasurementField = "bust" | "waist" | "highHips" | "hips";

// --- RESULT TYPE INTERFACE ---
interface CalculationResult {
  bodyShape: string;
  description: string;
  styleTips: string[];
  healthInsights: string;
  whr: number;
  measurements: { bust: number, waist: number, hips: number };
}

// FEATURE 1 — exact ratios behind the shape result
interface ShapeRatios {
  waistToHip: number;   // waist / hip
  bustToWaist: number;  // bust / waist
  hipToBust: number;    // hip / bust
  bustToHip: number;    // bust / hip
}

function getShapeRatios(bust: number, waist: number, hips: number): ShapeRatios {
  return {
    waistToHip: waist / hips,
    bustToWaist: bust / waist,
    hipToBust: hips / bust,
    bustToHip: bust / hips,
  };
}

// FEATURE 2 — flattering cuts, necklines and fits per body shape
interface StylingGuide {
  necklines: string[];
  cuts: string[];
  fits: string[];
}

function getStylingGuide(bodyShape: string): StylingGuide {
  const shape = bodyShape.toLowerCase();
  if (shape.includes("hourglass")) {
    return {
      necklines: ["V-neck", "Sweetheart", "Scoop neck"],
      cuts: ["Wrap dresses", "High-waisted skirts", "Fitted pencil skirts"],
      fits: ["Tailored, body-skimming fits", "Belted waist to define curves", "Avoid boxy or oversized layers"],
    };
  }
  if (shape.includes("pear") || shape.includes("spoon")) {
    return {
      necklines: ["Boat neck", "Off-shoulder", "Cowl neck"],
      cuts: ["A-line skirts", "Bootcut & flared trousers", "Structured, detailed tops"],
      fits: ["Volume up top to balance hips", "Darker tones below, brighter above", "Avoid skinny jeans with clingy tops"],
    };
  }
  if (shape.includes("apple") || shape.includes("inverted")) {
    return {
      necklines: ["Deep V-neck", "Scoop neck", "Open collar"],
      cuts: ["Empire-waist dresses", "A-line silhouettes", "Straight-leg trousers"],
      fits: ["Elongate the torso with vertical lines", "Flowy, untucked tops", "Avoid clingy waistbands and shoulder padding"],
    };
  }
  if (shape.includes("rectangle")) {
    return {
      necklines: ["Sweetheart", "Halter", "Scoop neck"],
      cuts: ["Peplum tops", "A-line & ruffled skirts", "Belted dresses"],
      fits: ["Create curves with cinched waists", "Layering to add dimension", "Avoid shapeless, straight-cut shifts"],
    };
  }
  // sensible default (e.g. male trapezoid / fallback)
  return {
    necklines: ["Crew neck", "V-neck", "Open collar"],
    cuts: ["Slim-fit shirts", "Tapered trousers", "Structured jackets"],
    fits: ["Highlight natural symmetry", "Avoid overly boxy or clingy cuts", "Layer to add shape where needed"],
  };
}

interface SavedEntry {
  date: string;
  bodyShape: string;
  whr: number;
  units: UnitSystem;
  gender: Gender;
  bust: string;
  waist: string;
  highHips: string;
  hips: string;
}

const STORAGE_KEY = "calqulate_body_shape_history"

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

function getBodyShapeDeltaLabel(current: { bodyShape: string; whr: number }, previous: SavedEntry) {
  if (current.bodyShape !== previous.bodyShape) {
    return {
      label: `Body shape changed from ${previous.bodyShape} to ${current.bodyShape}.`,
      positive: true,
    };
  }

  const delta = Number((current.whr - previous.whr).toFixed(2));
  if (delta < 0) {
    return { label: `Your WHR improved by ${Math.abs(delta)} compared to the last saved result.`, positive: true };
  }
  if (delta > 0) {
    return { label: `Your WHR increased by ${delta} compared to the last saved result.`, positive: false };
  }

  return { label: "No meaningful WHR change from the last saved result.", positive: true };
}

// --- VISUAL COMPONENTS ---

const WHRGauge = ({ whr, gender }: { whr: number, gender: Gender }) => {
  const limits = gender === 'female' ? { low: 0.80, moderate: 0.85, scaleMin: 0.65, scaleMax: 1.0 } : { low: 0.95, moderate: 1.0, scaleMin: 0.8, scaleMax: 1.15 };
  let risk = "Low Risk";
  let color = "text-green-600";
  
  if (whr > limits.moderate) {
    risk = "High Risk";
    color = "text-red-600";
  } else if (whr > limits.low) {
    risk = "Moderate Risk";
    color = "text-yellow-600";
  }
  
  const range = limits.scaleMax - limits.scaleMin;
  const position = Math.max(0, Math.min(100, ((whr - limits.scaleMin) / range) * 100));

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground">Waist-to-Hip Ratio (WHR) Health Risk</p>
      <div className="relative w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full my-2">
          <div className="absolute top-1/2 h-4 w-4 rounded-full bg-white border-2 border-primary shadow-lg -translate-y-1/2 -translate-x-1/2" style={{ left: `${position}%` }}></div>
      </div>
      <p className={`font-bold ${color}`}>{risk}</p>
      <p className="text-xs text-muted-foreground mt-1">Based on WHO guidelines for {gender}.</p>
    </div>
  )
}

const ProportionChart = ({ measurements, units }: { measurements: { bust: number, waist: number, hips: number }, units: UnitSystem }) => {
  const { bust, waist, hips } = measurements;
  const maxVal = Math.max(bust, waist, hips);

  const renderBar = (label: string, value: number) => (
    <div className="flex items-center gap-2">
      <span className="w-12 text-sm font-medium text-muted-foreground">{label}</span>
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative">
        <div className="bg-primary/90 h-full rounded-full" style={{ width: `${(value / maxVal) * 100}%` }}></div>
      </div>
      <span className="w-16 text-right text-sm font-semibold">{value.toFixed(1)} {units === 'metric' ? 'cm' : 'in'}</span>
    </div>
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-center md:text-left">Your Proportions</h3>
      <div className="space-y-3">
        {renderBar("Bust", bust)}
        {renderBar("Waist", waist)}
        {renderBar("Hips", hips)}
      </div>
    </div>
  )
}


// --- CALCULATION LOGIC ---

const getFemaleBodyShape = (bust: number, waist: number, highHips: number, hips: number): Omit<CalculationResult, 'whr' | 'measurements'> => {
  if (hips / bust >= 1.2 && highHips / hips < 0.9) {
      return {
          bodyShape: "Spoon",
          description: "Your hips are larger than your bust and you have a defined waist. You may have a 'shelf' on your high hips.",
          styleTips: ["Wear tops with details around the bust and shoulders.", "Choose A-line skirts and bootcut or flared pants.", "Accentuate your waistline."],
          healthInsights: "Similar to the Pear shape, this body type is generally associated with a lower risk of metabolic diseases. Maintaining a healthy weight is important for joint health."
      };
  } else if (hips / bust >= 1.05) {
      return {
          bodyShape: "Pear (Triangle)",
          description: "Your hips are wider than your bust, and you have a well-defined waist.",
          styleTips: ["Wear bright colors and patterns on top to draw attention upward.", "Choose A-line skirts and dresses.", "Opt for darker colors on your lower half."],
          healthInsights: "This body shape is generally associated with a lower risk of metabolic diseases compared to the apple shape. However, excess weight can put pressure on joints."
      };
  } else if (bust / hips >= 1.05) {
      return {
          bodyShape: "Apple (Inverted Triangle)",
          description: "Your shoulders and bust are larger than your hips, with a less defined waist.",
          styleTips: ["Wear V-necks to elongate your torso.", "Choose A-line skirts to create balance.", "Opt for straight-leg pants."],
          healthInsights: "Carrying more weight around the midsection can be associated with a higher risk of heart disease and type 2 diabetes. Focusing on a balanced diet and regular exercise is beneficial."
      };
  } else if (Math.abs(bust - hips) / hips < 0.05 && waist / Math.min(bust, hips) < 0.75) {
      return {
          bodyShape: "Hourglass",
          description: "You have a defined waist, and your bust and hip measurements are nearly equal.",
          styleTips: ["Wear fitted clothing that accentuates your curves.", "Choose wrap dresses and high-waisted skirts.", "Use belts to highlight your waist."],
          healthInsights: "The hourglass shape is often considered balanced. Maintaining a healthy weight is key to overall well-being."
      };
  } else {
      return {
          bodyShape: "Rectangle",
          description: "Your bust, waist, and hip measurements are fairly uniform, giving you a straighter silhouette.",
          styleTips: ["Create the illusion of curves with peplum tops and A-line skirts.", "Use belts to cinch in your waist.", "Layer your clothing to add dimension."],
          healthInsights: "Individuals with a rectangle shape may have a leaner build. It's important to focus on bone health through weight-bearing exercises."
      };
  }
};
const getMaleBodyShape = (bust: number, waist: number, hips: number): Omit<CalculationResult, 'whr' | 'measurements'> => { /* ... Add male logic here ... */ return { bodyShape: "Trapezoid", description: "...", styleTips: [], healthInsights: "" } };


// --- MAIN CALCULATOR COMPONENT ---

export default function BodyShapeCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightPear, setHighlightPear] = useState(false);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<SavedEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(getStorage());
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { gender: "female", bust: "", waist: "", highHips: "", hips: "", units: "metric" },
  });

  const { getValues, setValue } = form;
  const units = form.watch("units");
  const gender = form.watch("gender");

  const lastSaved = history[0];
  const currentDeltaInfo = result && lastSaved ? getBodyShapeDeltaLabel({ bodyShape: result.bodyShape, whr: result.whr }, lastSaved) : null;

  // --- NEW: Unit Conversion Handler ---
  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;

    const fields: MeasurementField[] = ["bust", "waist", "highHips", "hips"];
    const conversionFactor = 2.54;

    fields.forEach(field => {
      const currentValue = getValues(field);
      if (currentValue && !isNaN(parseFloat(currentValue))) {
        const valueInCm = newUnit === 'imperial' ? parseFloat(currentValue) : parseFloat(currentValue) * conversionFactor;
        const valueInInches = newUnit === 'metric' ? parseFloat(currentValue) : parseFloat(currentValue) / conversionFactor;

        const newValue = newUnit === 'metric' ? valueInInches : valueInCm;
        const convertedValue = newUnit === 'metric' ? newValue * conversionFactor : newValue / conversionFactor;

        setValue(field, convertedValue.toFixed(1));
      }
    });
    setValue("units", newUnit);
  };

  const handleSave = () => {
    if (!result) return;

    const values = getValues();
    const entry: SavedEntry = {
      date: new Date().toISOString(),
      bodyShape: result.bodyShape,
      whr: result.whr,
      units: values.units,
      gender: values.gender,
      bust: values.bust,
      waist: values.waist,
      highHips: values.highHips,
      hips: values.hips,
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
      const toCm = (val: string) => values.units === 'metric' ? parseFloat(val) : parseFloat(val) * 2.54;
      const bustCm = toCm(values.bust);
      const waistCm = toCm(values.waist);
      const highHipsCm = toCm(values.highHips);
      const hipsCm = toCm(values.hips);

      const whr = waistCm / hipsCm;
      let shapeResult;
      if (values.gender === "female") {
        shapeResult = getFemaleBodyShape(bustCm, waistCm, highHipsCm, hipsCm);
      } else {
        shapeResult = getMaleBodyShape(bustCm, waistCm, hipsCm);
      }
      
      const displayUnits = {
        bust: parseFloat(values.bust),
        waist: parseFloat(values.waist),
        hips: parseFloat(values.hips)
      };

      setResult({ ...shapeResult, whr, measurements: displayUnits });
      setIsLoading(false);
      setHighlightPear(values.gender === 'female');
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }, 500);
  }

  useEffect(() => {
    if (!result || gender !== 'female') {
      setHighlightPear(false);
      return;
    }

    const timer = window.setTimeout(() => setHighlightPear(false), 10000);
    return () => window.clearTimeout(timer);
  }, [result, gender]);

  return (
    <>
      <Card className="max-w-4xl mx-auto" id="calculator">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" /> Body Shape & WHR Calculator</CardTitle>
          <CardDescription>Enter your measurements below to find your body shape and calculate your Waist-to-Hip ratio.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <FormField control={form.control} name="gender" render={({ field }) => (<FormItem><FormLabel className="text-sm font-semibold">Gender</FormLabel><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col sm:flex-row flex-wrap items-start gap-3 pt-2"><FormItem className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition hover:border-primary hover:bg-primary/5"><FormControl><RadioGroupItem value="female" /></FormControl><FormLabel className="font-medium text-sm">Female</FormLabel></FormItem><FormItem className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition hover:border-primary hover:bg-primary/5"><FormControl><RadioGroupItem value="male" /></FormControl><FormLabel className="font-medium text-sm">Male</FormLabel></FormItem></RadioGroup></FormItem>)} />
                  <FormField control={form.control} name="units" render={({ field }) => (<FormItem><FormLabel className="text-sm font-semibold">Units</FormLabel><RadioGroup onValueChange={(value) => handleUnitChange(value as UnitSystem)} value={field.value} className="flex flex-col sm:flex-row flex-wrap items-start gap-3 pt-2"><FormItem className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition hover:border-primary hover:bg-primary/5"><FormControl><RadioGroupItem value="metric" /></FormControl><FormLabel className="font-medium text-sm">Metric (cm)</FormLabel></FormItem><FormItem className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm transition hover:border-primary hover:bg-primary/5"><FormControl><RadioGroupItem value="imperial" /></FormControl><FormLabel className="font-medium text-sm">Imperial (in)</FormLabel></FormItem></RadioGroup></FormItem>)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <FormField control={form.control} name="bust" render={({ field }) => (<FormItem><FormLabel className="text-sm font-semibold">Bust / Chest</FormLabel><FormControl><Input className="h-12" type="number" step="0.1" placeholder={units === 'metric' ? "90" : "36"} {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="waist" render={({ field }) => (<FormItem><FormLabel className="text-sm font-semibold">Waist</FormLabel><FormControl><Input className="h-12" type="number" step="0.1" placeholder={units === 'metric' ? "70" : "28"} {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="highHips" render={({ field }) => (<FormItem><FormLabel className="text-sm font-semibold">High Hips</FormLabel><FormControl><Input className="h-12" type="number" step="0.1" placeholder={units === 'metric' ? "80" : "32"} {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="hips" render={({ field }) => (<FormItem><FormLabel className="text-sm font-semibold">Hips</FormLabel><FormControl><Input className="h-12" type="number" step="0.1" placeholder={units === 'metric' ? "95" : "38"} {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1" size="lg" disabled={isLoading}>{isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Calculator className="h-4 w-4 mr-2" />}{isLoading ? 'Calculating...' : 'Find My Body Shape'}</Button>
                <Button type="button" variant="outline" size="lg" onClick={() => { form.reset(); setResult(null); }} className="flex-1" disabled={isLoading}><RefreshCw className="h-4 w-4 mr-2" /> Reset</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div ref={resultsRef}>
        {result && (
          <Card className="max-w-4xl mx-auto mt-8">
            <CardContent className="p-6 md:p-8 space-y-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Save this body-shape result and compare it with your previous measurements.</p>
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
                  Saved successfully! Your body shape result has been stored in your browser.
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
                      <h4 className="text-base font-semibold">Saved Body Shape History</h4>
                      <p className="text-sm text-muted-foreground">Review your last saved shape and WHR results.</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={clearHistory}>
                      Clear History
                    </Button>
                  </div>
                  {history.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No saved results yet. Save a result to build history.</p>
                  ) : (
                    <div className="space-y-3">
                      {history.map((entry) => (
                        <div key={entry.date} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold">{entry.bodyShape}</p>
                              <p className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900">{entry.whr.toFixed(2)}</p>
                              <p className="text-xs text-gray-500">WHR</p>
                            </div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
                            <div>Gender: {entry.gender}</div>
                            <div>Units: {entry.units === 'metric' ? 'cm' : 'in'}</div>
                            <div>Bust: {entry.bust}</div>
                            <div>Waist: {entry.waist}</div>
                            <div>High Hips: {entry.highHips}</div>
                            <div>Hips: {entry.hips}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="text-center">
                  <p className="text-sm font-semibold text-muted-foreground">Your Body Shape is</p>
                  <p className="text-5xl font-bold text-primary">{result.bodyShape}</p>
                  <p className="max-w-md mx-auto text-muted-foreground mt-1">{result.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center border-t pt-8">
                  <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-2"><HeartPulse className="w-5 h-5" /> Your Waist-to-Hip Ratio (WHR)</h3>
                      <p className="text-7xl font-bold text-center">{result.whr.toFixed(2)}</p>
                      <WHRGauge whr={result.whr} gender={gender} />
                  </div>
                  <ProportionChart measurements={result.measurements} units={units} />
              </div>

              <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3"><Shirt className="w-5 h-5 text-primary" /> Style Recommendations</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {result.styleTips.map((tip, index) => (<li key={index}>{tip}</li>))}
                  </ul>
              </div>

              {/* FEATURE 1 — Exact ratios behind your shape */}
              {(() => {
                const ratios = getShapeRatios(result.measurements.bust, result.measurements.waist, result.measurements.hips);
                const rows = [
                  { label: "Waist-to-Hip", value: ratios.waistToHip, note: "A lower ratio means a more defined waist relative to your hips." },
                  { label: "Bust-to-Waist", value: ratios.bustToWaist, note: "How much wider your bust is than your waist." },
                  { label: "Hip-to-Bust", value: ratios.hipToBust, note: "Above 1.00 leans pear/spoon; below 1.00 leans apple/inverted." },
                  { label: "Bust-to-Hip", value: ratios.bustToHip, note: "Near 1.00 signals balanced top-to-bottom proportions." },
                ];
                return (
                  <Card className="border border-emerald-100 bg-emerald-50/40 rounded-xl">
                    <CardContent className="p-6 md:p-8">
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-1">
                        <Ruler className="w-5 h-5 text-emerald-700" /> The Ratios Behind Your {result.bodyShape} Result
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your shape is decided by the ratios between your measurements — not their absolute size. Here is exactly why you landed on {result.bodyShape}.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {rows.map((r) => (
                          <div key={r.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-baseline justify-between">
                              <span className="text-sm font-semibold text-slate-700">{r.label}</span>
                              <span className="text-xl font-bold text-emerald-700">{r.value.toFixed(2)}</span>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{r.note}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}

              {/* FEATURE 2 — Flattering cuts, necklines and fits for your shape */}
              {(() => {
                const guide = getStylingGuide(result.bodyShape);
                const columns = [
                  { title: "Flattering necklines", items: guide.necklines },
                  { title: "Best cuts & silhouettes", items: guide.cuts },
                  { title: "Fit strategy", items: guide.fits },
                ];
                return (
                  <Card className="border border-emerald-100 bg-emerald-50/40 rounded-xl">
                    <CardContent className="p-6 md:p-8">
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-1">
                        <Scissors className="w-5 h-5 text-emerald-700" /> What to Wear for a {result.bodyShape} Shape
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Turn your measurements into decisions — these cuts, necklines and fits are chosen to flatter your specific proportions.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {columns.map((col) => (
                          <div key={col.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="text-sm font-semibold text-emerald-700 mb-2">{col.title}</p>
                            <ul className="space-y-1.5">
                              {col.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}

              <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3"><HeartPulse className="w-5 h-5 text-red-500" /> Health Insights</h3>
                  <p className="text-muted-foreground">{result.healthInsights}</p>
              </div>

              {gender === 'female' && (
                <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold mb-4">Must-read style guides for women</h3>
                  <div className="grid gap-4 sm:grid-cols-2 min-w-0">
                    <div className="w-full min-w-0">
                      <Button asChild variant="outline" size="lg" className="w-full justify-center text-base sm:text-base min-w-0">
                        <Link href="/blog/female-body-shapes-explained" className="text-center whitespace-normal">
                          Learn all female body shapes
                        </Link>
                      </Button>
                    </div>

                    <div className={highlightPear ? "relative w-full min-w-0 rounded-xl overflow-hidden rainbow-highlight" : "relative w-full min-w-0 rounded-xl overflow-hidden"}>
                      <Button asChild size="lg" variant="default" className="w-full justify-center text-base sm:text-base min-w-0 bg-emerald-700 text-white hover:bg-emerald-600">
                        <Link href="/blog/best-dresses-for-pear-shape" className="text-center whitespace-normal">
                          Pear shape dress guide
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}