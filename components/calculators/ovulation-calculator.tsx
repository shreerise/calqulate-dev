"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarHeart, Baby, ShieldCheck, Activity, Info, CalendarClock, Beaker,
  Save, History, ChevronRight, Award, AlertCircle, Brain, ArrowRight,
  CheckCircle2, BarChart3, TrendingDown, TrendingUp, RefreshCw
} from "lucide-react";

// ─── VALIDATION SCHEMA ────────────────────────────────────────────────────────
const formSchema = z.object({ 
  goal: z.enum(["conceive", "prevent", "track"]),
  lastPeriodDate: z.string().min(1, "Please select the first day of your last period."),
  cycleLength: z.string().refine((val) => {
    const num = parseInt(val);
    return num >= 20 && num <= 45;
  }, "Cycle length must be between 20 and 45 days."),
  lutealPhase: z.string().refine((val) => {
    const num = parseInt(val);
    return num >= 10 && num <= 16;
  }, "Luteal phase is typically between 10 and 16 days."),
});

// ─── INTERFACES ───────────────────────────────────────────────────────────────
interface ResultsState {
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  nextPeriodDate: Date;
  pregnancyTestDate: Date;
  estimatedDueDate: Date;
  goal: "conceive" | "prevent" | "track";
  headline: string;
  nextSteps: string[];
  scientificFact: string;
}

interface SavedEntry {
  date: string;
  dobLmp: string;
  cycleLength: number;
  lutealPhase: number;
  ovulationDateISO: string;
  nextPeriodDateISO: string;
  goal: "conceive" | "prevent" | "track";
}

// ─── CONSTANTS & LOCAL STORAGE KEY ────────────────────────────────────────────
const STORAGE_KEY = "calqulate_ovulation_history";

const brand = {
  primary: "#16a34a", // green-600
  primaryBg: "#f0fdf4", // green-50
  primaryBorder: "#bbf7d0", // green-200
};

// ─── UTILITY FUNCTIONS ────────────────────────────────────────────────────────
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};

// ─── LOCAL STORAGE OPERATIONS ─────────────────────────────────────────────────
function getOvulationStorage(): SavedEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOvulationEntry(entry: SavedEntry) {
  try {
    const existing = getOvulationStorage();
    existing.unshift(entry);
    const trimmed = existing.slice(0, 10); // retain last 10 records
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    /* ignore */
  }
}

function getPreviousEntry(currentOvulation: Date, history: SavedEntry[]): SavedEntry | null {
  if (history.length === 0) return null;
  const latestSaved = history[0];
  const currentISO = currentOvulation.toISOString().split("T")[0];
  const savedISO = latestSaved.ovulationDateISO.split("T")[0];
  if (currentISO === savedISO) {
    return history[1] || null;
  }
  return latestSaved;
}

// ─── PERSONALIZATION ENGINE ───────────────────────────────────────────────────
function generateCycleInsights(goal: string, cycleLength: number, luteal: number): { headline: string; nextSteps: string[]; scientificFact: string } {
  let headline = "";
  let nextSteps: string[] = [];
  let scientificFact = "";

  if (goal === "conceive") {
    headline = "Optimizing your biological conception window";
    nextSteps = [
      "Track physical indicators: Monitor cervical mucus changes. It typically transitions to a raw egg-white consistency as your estrogen peaks near ovulation.",
      "Time intercourse strategically: Focus efforts on the 2-3 days prior to your estimated ovulation, as sperm can live up to 5 days inside the reproductive tract.",
      "Consider LH strip testing: Utilize Luteinizing Hormone (LH) urine strips starting 3-4 days before your predicted ovulation date to capture the acute surge."
    ];
    scientificFact = "Fertility Science: The egg remains viable for only 12-24 hours post-ovulation, making pre-ovulatory tracking essential for successful fertilization.";
  } else if (goal === "prevent") {
    headline = "Identifying high-exposure limits during your fertility phase";
    nextSteps = [
      "Enforce barrier precautions: Strictly avoid unprotected intercourse starting at least 5 days prior to your estimated ovulation up to 2 days after.",
      "Incorporate secondary trackers: Do not rely solely on calendar averages; confirm ovulation stages with basal body temperature (BBT) parameters.",
      "Acknowledge cycle variances: Stress, physical transitions, and sleep disruptions can spontaneously delay ovulation, shifting your risk window."
    ];
    scientificFact = "Reproductive Health: Calendar methods have built-in margins of error. Combining date calculations with cervical indicators provides safer barrier management.";
  } else {
    headline = "Monitoring structural menstrual cycle biomarkers";
    nextSteps = [
      "Document systemic cycle variations: Keep records of cycle length changes. Variations over 7 days should be shared with your gynecologist.",
      "Map associated systemic indicators: Note emotional shifts, skin transitions, or premenstrual physical adjustments relative to your luteal phase.",
      "Optimize baseline micronutrient intake: Support cycle regularity with magnesium, zinc, and balanced fatty acids."
    ];
    scientificFact = "Menstrual Vitality: Your menstrual cycle functions as an active vital sign. Consistent monitoring helps track endocrine and thyroid performance.";
  }

  return {
    headline,
    nextSteps,
    scientificFact
  };
}

// ─── PROGRESS CARD COMPONENT ──────────────────────────────────────────────────
const ProgressCard = ({ currentOvulation, history }: { currentOvulation: Date; history: SavedEntry[] }) => {
  const previous = getPreviousEntry(currentOvulation, history);
  if (!previous) return null;

  const prevOv = new Date(previous.ovulationDateISO);
  // Calculate relative day delta
  const diffTime = currentOvulation.getTime() - prevOv.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  const daysAbs = Math.abs(diffDays);

  return (
    <div
      className="rounded-xl p-5 border flex items-start gap-4 max-w-5xl mx-auto shadow-sm text-left"
      style={{
        background: brand.primaryBg,
        borderColor: brand.primaryBorder,
      }}
    >
      <div
        className="p-2 rounded-lg flex-shrink-0"
        style={{ background: brand.primaryBorder }}
      >
        <Award className="w-5 h-5" style={{ color: brand.primary }} />
      </div>
      <div className="space-y-1 w-full">
        <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
          Hormonal Cycle Progression Tracker
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          {diffDays === 0 ? (
            "Your calculated ovulation date aligns precisely with your last tracked cycle run."
          ) : (
            <>
              Your estimated ovulation date has shifted by{" "}
              <span className="font-bold text-green-700">{daysAbs} {daysAbs === 1 ? "day" : "days"}</span>{" "}
              {diffDays > 0 ? "later" : "earlier"} compared to your previously logged check on{" "}
              <strong>{new Date(previous.date).toLocaleDateString()}</strong>.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

// ─── HISTORY PANEL COMPONENT ──────────────────────────────────────────────────
const HistoryPanel = ({ history, onClear }: { history: SavedEntry[]; onClear: () => void }) => {
  if (history.length === 0) return null;

  return (
    <Card className="max-w-5xl mx-auto border shadow-md text-left">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="w-4 h-4 text-green-600" />
          Your Saved Cycle Tracking Logs
        </CardTitle>
        <CardDescription className="text-xs">
          Your details are stored directly in your browser. Complete data privacy is guaranteed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {history.map((entry, i) => {
            const nextEntry = history[i + 1];
            const prevOv = nextEntry ? new Date(nextEntry.ovulationDateISO) : null;
            const currentOv = new Date(entry.ovulationDateISO);
            const delta = prevOv ? Math.round((currentOv.getTime() - prevOv.getTime()) / (1000 * 60 * 60 * 24)) : null;

            return (
              <div key={entry.date} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-b last:border-0 border-gray-100 dark:border-gray-800 gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                  >
                    #{history.length - i}
                  </div>
                  <div>
                    <p className="text-sm font-semibold capitalize">Goal: {entry.goal} ({entry.cycleLength}-day cycle)</p>
                    <p className="text-xs text-gray-400">
                      LMP: {new Date(entry.dobLmp).toLocaleDateString()} · Luteal Phase: {entry.lutealPhase} days
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-right text-xs">
                    <span className="text-gray-500 font-medium">Predicted Ovulation: </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{new Date(entry.ovulationDateISO).toLocaleDateString()}</span>
                  </div>

                  {delta !== null && delta !== 0 && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: delta > 0 ? "#fff7ed" : brand.primaryBg,
                        color: delta > 0 ? "#c2410c" : brand.primary,
                      }}
                    >
                      {delta > 0 ? "Later by" : "Earlier by"} {Math.abs(delta)}d
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
          Clear cycle logs from this browser
        </button>
      </CardContent>
    </Card>
  );
};

// ─── MAIN ADVANCED OVULATION CALCULATOR ───────────────────────────────────────
export default function AdvancedOvulationCalculator() {
  const [results, setResults] = useState<ResultsState | null>(null);
  const [history, setHistory] = useState<SavedEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setHistory(getOvulationStorage());
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: "conceive",
      lastPeriodDate: "",
      cycleLength: "28",
      lutealPhase: "14",
    },
  });

  const calculateOvulation = (values: z.infer<typeof formSchema>) => {
    setError("");
    setResults(null);
    setSaved(false);

    try {
      const [year, month, day] = values.lastPeriodDate.split('-').map(Number);
      const lmp = new Date(year, month - 1, day);
      
      const cycle = parseInt(values.cycleLength);
      const luteal = parseInt(values.lutealPhase);

      if (isNaN(lmp.getTime())) {
        setError("Invalid date selected.");
        return;
      }

      // Calculations
      const nextPeriodDate = addDays(lmp, cycle);
      const ovulationDate = addDays(nextPeriodDate, -luteal);
      
      // Fertile window boundaries
      const fertileWindowStart = addDays(ovulationDate, -5);
      const fertileWindowEnd = addDays(ovulationDate, 1);
      
      // Best testing time (14 days past ovulation)
      const pregnancyTestDate = addDays(ovulationDate, 14);

      // Estimated due date
      const estimatedDueDate = addDays(ovulationDate, 266);

      const insights = generateCycleInsights(values.goal, cycle, luteal);

      setResults({
        ovulationDate,
        fertileWindowStart,
        fertileWindowEnd,
        nextPeriodDate,
        pregnancyTestDate,
        estimatedDueDate,
        goal: values.goal,
        headline: insights.headline,
        nextSteps: insights.nextSteps,
        scientificFact: insights.scientificFact
      });
    } catch (err) {
      setError("An error occurred while calculating. Please check your inputs.");
    }
  };

  const handleSave = () => {
    if (!results) return;
    const values = form.getValues();
    const entry: SavedEntry = {
      date: new Date().toISOString(),
      dobLmp: values.lastPeriodDate,
      cycleLength: parseInt(values.cycleLength),
      lutealPhase: parseInt(values.lutealPhase),
      ovulationDateISO: results.ovulationDate.toISOString(),
      nextPeriodDateISO: results.nextPeriodDate.toISOString(),
      goal: values.goal,
    };
    saveOvulationEntry(entry);
    setHistory(getOvulationStorage());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
    setShowHistory(false);
  };

  return (
    <div className="space-y-8 text-left">
      {/* ── HISTORICAL TRACKING TRIGGER ────────────────────────────────────────── */}
      {history.length > 0 && (
        <div className="max-w-5xl mx-auto flex justify-between items-center bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <CalendarHeart className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Found {history.length} saved cycle {history.length === 1 ? "log" : "logs"}
            </span>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-600 hover:underline"
          >
            {showHistory ? "Collapse Tracking" : "Show Saved Entries"}
            <ChevronRight className={`w-4 h-4 transition-transform ${showHistory ? "rotate-90" : ""}`} />
          </button>
        </div>
      )}

      {showHistory && (
        <div className="space-y-4">
          <HistoryPanel history={history} onClear={clearHistory} />
        </div>
      )}

      {/* ── CALCULATOR INTERFACE ──────────────────────────────────────────────── */}
      <Card className="max-w-5xl mx-auto border-green-100 shadow-lg overflow-hidden">
        <CardHeader className="bg-green-50 border-b border-green-100 rounded-t-xl pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <CalendarHeart className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <CardTitle className="text-2xl text-green-900">Advanced Ovulation Calculator</CardTitle>
                <CardDescription className="text-green-700 text-sm mt-1">
                  Personalize your cycle. Adjust your luteal phase settings for highly reliable ovulation and fertility predictions [3].
                </CardDescription>
              </div>
            </div>
            {history.length > 0 && (
              <div
                className="hidden sm:flex text-xs font-semibold px-3 py-1.5 rounded-full items-center gap-1.5 bg-green-100 text-green-800 border border-green-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Browser Saving On
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN - FORM */}
            <div className="lg:col-span-5 space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateOvulation)} className="space-y-5">
                  
                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">What is your primary goal?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-gray-300 focus:ring-green-500 h-11">
                              <SelectValue placeholder="Select your goal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="conceive">I'm trying to conceive (TTC)</SelectItem>
                            <SelectItem value="prevent">I'm avoiding pregnancy (TTA)</SelectItem>
                            <SelectItem value="track">I just want to track my health</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastPeriodDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">First day of last period (LMP)</FormLabel>
                        <FormControl>
                          <Input type="date" className="border-gray-300 focus:ring-green-500 h-11 text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cycleLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Cycle Length (Days)</FormLabel>
                          <FormControl>
                            <Input type="number" min="20" max="45" className="border-gray-300 focus:ring-green-500 h-11 text-base" {...field} />
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500">Usually 21-35 days.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lutealPhase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">Luteal Phase</FormLabel>
                          <FormControl>
                            <Input type="number" min="10" max="16" className="border-gray-300 focus:ring-green-500 h-11 text-base" {...field} />
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500">Default is 14 days.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-14 text-lg transition-colors">
                    Calculate My Cycle
                  </Button>
                </form>
              </Form>

              <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3 border border-gray-200">
                <Info className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-800">Why ask for Luteal Phase?</strong> Standard calculators assume a generic 14-day luteal phase. If yours is 12 days, standard apps will miscalculate ovulation by 2 whole days! Adjusting this ensures exact cycle personalization.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN - DYNAMIC DASHBOARD */}
            <div className="lg:col-span-7">
              {error && <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>}
              
              {!results && !error && (
                <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-green-200 rounded-xl bg-green-50/50 text-center">
                  <CalendarClock className="w-16 h-16 text-green-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-500 max-w-sm">Enter your last cycle details on the left to generate your personalized cycle dashboard and exact fertile window [3].</p>
                </div>
              )}

              {results && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* COMPARATIVE PROGRESS COMPONENT */}
                  <ProgressCard currentOvulation={results.ovulationDate} history={history} />

                  {/* Goal Based Highlight Header */}
                  <div className={`p-4 rounded-xl flex items-center gap-3 text-white ${
                    results.goal === 'conceive' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                    results.goal === 'prevent' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                    'bg-gradient-to-r from-teal-500 to-teal-600'
                  }`}>
                    {results.goal === 'conceive' && <Baby className="w-8 h-8" />}
                    {results.goal === 'prevent' && <ShieldCheck className="w-8 h-8" />}
                    {results.goal === 'track' && <Activity className="w-8 h-8" />}
                    <div>
                      <h3 className="text-lg font-bold">
                        {results.goal === 'conceive' ? "Your Conception Dashboard" :
                         results.goal === 'prevent' ? "Your Cycle Tracking (Prevention)" :
                         "Your Health & Cycle Dashboard"}
                      </h3>
                      <p className="text-sm opacity-90">Based on a {form.getValues('cycleLength')}-day cycle and {form.getValues('lutealPhase')}-day luteal phase.</p>
                    </div>
                  </div>

                  {/* Scientific Fact Strip */}
                  <div className="text-xs font-semibold px-4 py-2.5 rounded-lg flex items-start gap-2.5 bg-green-50 text-green-800 border border-green-200">
                    <Brain className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-700" />
                    <span>{results.scientificFact}</span>
                  </div>

                  {/* Primary Result - Ovulation */}
                  <div className="bg-white border-2 border-green-200 rounded-xl p-5 text-center shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 bg-green-500 h-full"></div>
                    <p className="text-sm font-bold text-green-600 uppercase tracking-wider mb-1">Estimated Ovulation Date</p>
                    <p className="text-3xl font-extrabold text-gray-900">{formatDate(results.ovulationDate)}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {results.goal === 'prevent' 
                        ? "If avoiding pregnancy, strictly avoid unprotected sex during the days leading up to and including this date." 
                        : "This is when an egg is released. Combine this prediction with Basal Body Temperature (BBT) monitoring for best results."}
                    </p>
                  </div>

                  {/* Grid Results */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-500 mb-1 flex items-center gap-2"><Activity className="w-4 h-4 text-green-500"/> Fertile Window</p>
                      <p className="text-lg font-bold text-gray-800">{formatDate(results.fertileWindowStart)}</p>
                      <p className="text-sm text-gray-400">to</p>
                      <p className="text-lg font-bold text-gray-800">{formatDate(results.fertileWindowEnd)}</p>
                      {results.goal === 'conceive' && <p className="text-xs text-green-600 mt-2 font-medium">To optimize conception, aim for intercourse every 1-2 days during this window.</p>}
                    </div>

                    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-500 mb-1 flex items-center gap-2"><Beaker className="w-4 h-4 text-purple-500"/> Pregnancy Test Date</p>
                      <p className="text-lg font-bold text-gray-800">{formatDate(results.pregnancyTestDate)}</p>
                      <p className="text-xs text-gray-500 mt-2">Testing before 14 Days Past Ovulation (DPO) significantly increases the probability of false negatives.</p>
                    </div>
                  </div>

                  {/* Secondary Results Array */}
                  <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-gray-600 font-medium">Expected Next Period</span>
                      <span className="text-gray-900 font-bold">{formatDate(results.nextPeriodDate)}</span>
                    </div>
                    
                    {results.goal === 'conceive' && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Estimated Due Date <br/><span className="text-xs font-normal text-gray-400">(If conceived this cycle)</span></span>
                        <span className="text-green-700 font-bold">{formatDate(results.estimatedDueDate)}</span>
                      </div>
                    )}
                  </div>

                  {/* 3. HIGH-CTR PERSONALIZED ACTION RECOMMENDATIONS */}
                  <Card className="border-0 shadow-lg text-left" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center gap-2.5 mb-5">
                        <ArrowRight className="w-5 h-5 text-green-700" />
                        <h3 className="text-lg font-black text-green-700">
                          Your Personalized Action Guidelines
                        </h3>
                      </div>
                      <p className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">
                        {results.headline}
                      </p>
                      <div className="space-y-3">
                        {results.nextSteps.map((step, i) => (
                          <div key={i} className="flex items-start gap-3 bg-white/80 dark:bg-slate-950/70 rounded-lg p-3.5 border border-emerald-100/50">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 bg-green-600 text-white"
                            >
                              {i + 1}
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>

                      {/* Women's Health Cross-Links */}
                      <div className="mt-8 pt-4 border-t border-green-200">
                        <p className="text-xs font-bold mb-3 text-green-700">Explore related Women's Health trackers &rarr;</p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { label: "Period Cycle Calculator", href: "/health/period-cycle-calculator" },
                            { label: "Pregnancy Weight Gain Calculator", href: "/health/pregnancy-weight-gain-calculator" },
                            { label: "IVF Pregnancy Due Date Calculator", href: "/health/ivf-pregnancy-due-date-calculator" },
                          ].map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 transition-all hover:bg-white/95 border bg-white border-green-200 text-gray-700 hover:shadow-sm"
                            >
                              {link.label} <ChevronRight className="w-3 h-3" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Clinical Disclaimer */}
                  <div className="text-[11px] text-gray-400 text-center max-w-2xl mx-auto leading-relaxed px-4">
                    <strong>Medical Disclaimer:</strong> Ovulation calculators are designed to estimate fertile windows based on statistical calculations [3]. Because ovulation can vary cycle-by-cycle due to stress, illness, or hormonal shifts, do not rely on this calculator as an absolute method of contraception. Consult a healthcare provider for complete family planning strategies.
                  </div>

                  {/* STORAGE SAVE & RESET CONSOLE */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-6">
                    <Button
                      onClick={handleSave}
                      disabled={saved}
                      className="font-bold px-8 w-full sm:w-auto h-12 bg-green-600 text-white hover:bg-green-700"
                      style={saved ? { background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" } : {}}
                    >
                      {saved ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Saved to Browser Logs
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
                        setResults(null);
                        setSaved(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" /> New Cycle Run
                    </Button>
                  </div>

                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}