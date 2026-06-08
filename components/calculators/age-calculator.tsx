"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, 
  addYears, isValid, differenceInHours, differenceInMinutes, differenceInSeconds 
} from "date-fns";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, RefreshCw, Loader2, CalendarDays, Clock, PartyPopper, 
  Star, Hourglass, Save, History, ChevronRight, Award, AlertCircle, 
  Brain, ArrowRight, CheckCircle2, BarChart3, HelpCircle 
} from "lucide-react";

// ─── FORM SCHEMA ──────────────────────────────────────────────────────────────
const formSchema = z.object({
  dob: z.string().refine((val) => isValid(new Date(val)), {
    message: "Please enter a valid date of birth.",
  }),
  targetDate: z.string().refine((val) => isValid(new Date(val)), {
    message: "Please enter a valid target date.",
  }),
});

// ─── LOCAL STORAGE KEYS & TYPES ────────────────────────────────────────────────
const STORAGE_KEY = "calqulate_age_history";

interface SavedEntry {
  date: string;
  dob: string;
  targetDate: string;
  years: number;
  months: number;
  days: number;
  totalDays: number;
  zodiac: string;
  birthstone: string;
}

// Result shape for calculated age
interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthday: {
    days: number;
    months: number;
    weekday: string;
    date: string;
  };
  zodiac: string;
  birthstone: string;
  dayBorn: string;
}

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────
const getZodiacSign = (day: number, month: number) => {
  const signs = [
    "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
    "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"
  ];
  const lastDay = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
  return day > lastDay[month] ? signs[(month + 1) % 12] : signs[month % 12];
};

const getBirthstone = (month: number) => {
  const stones = [
    "Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Pearl",
    "Ruby", "Peridot", "Sapphire", "Opal", "Topaz", "Turquoise"
  ];
  return stones[month];
};

// ─── STORAGE OPERATIONS ───────────────────────────────────────────────────────
function getAgeStorage(): SavedEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAgeEntry(entry: SavedEntry) {
  try {
    const existing = getAgeStorage();
    existing.unshift(entry);
    const trimmed = existing.slice(0, 10); // retain last 10 records
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    /* ignore */
  }
}

function getPreviousEntry(currentDays: number, history: SavedEntry[]): SavedEntry | null {
  if (history.length === 0) return null;
  const latestSaved = history[0];
  // Verify if duplicate (checks if matches current calculation to prevent self-comparison right after save)
  const isDuplicate = Math.abs(latestSaved.totalDays - currentDays) < 1;
  if (isDuplicate) {
    return history[1] || null;
  }
  return latestSaved;
}

// ─── PERSONALIZATION & LONGEVITY ENGINE ───────────────────────────────────────
function generateAgeInsights(years: number): { headline: string; nextSteps: string[] } {
  if (years < 20) {
    return {
      headline: "Unlocking structural skill compounding — your runway is wide open",
      nextSteps: [
        "Invest in skill acquisition: Your early brain plasticity is at an optimal peak. Learn complex analytical habits, software tools, or a structural foreign language.",
        "Construct restorative sleeping habits: Quality sleep at this developmental tier accelerates memory retention and supports hormone stabilization.",
        "Embrace calculated experimentation: Engage in varied athletic or creative processes to discover raw intrinsic motivators before lifestyle paths narrow."
      ]
    };
  } else if (years < 35) {
    return {
      headline: "Maximizing early physical and vocational compounding assets",
      nextSteps: [
        "Optimize physiological durability: Incorporate consistent resistance training to cultivate skeletal bone density and maintain muscle tissue mass before natural age shifts.",
        "Establish structural life behaviors: Nutritional, financial, and relational patterns initiated in this decade compound with powerful downstream effects over the subsequent 25 years.",
        "Develop proactive stress recovery: Establish physical transition routines (e.g., active walks, breathwork) to cleanly buffer focus in high-demand environments."
      ]
    };
  } else if (years < 50) {
    return {
      headline: "Stabilizing metabolic efficiency and compound knowledge reserves",
      nextSteps: [
        "Defend metabolic flexibility: Emphasize dense, anti-inflammatory whole-food profiles to support ongoing joint integrity and systemic tissue upkeep.",
        "Monitor biological indicators annually: Maintain reliable baselines of key safety parameters including resting heart rate, blood pressure, fasting glucose, and blood lipids.",
        "Cultivate intentional intellectual transitions: Dedicate regular, isolated windows to reading, mental framing, or quiet unplugging to preserve focused creative stamina."
      ]
    };
  } else {
    return {
      headline: "Preserving lean mass reserves and functional neural complexity",
      nextSteps: [
        "Prioritize lean tissue preservation: Continue progressive resistance load exercises to actively counteract natural age-related muscle mass deceleration.",
        "Provide cognitive novelty: Introduce highly challenging, unfamiliar activities (e.g., learning a novel strategic instrument or skill) to maintain neuroplastic path health.",
        "Optimize structural stability: Work systematically on balance patterns, core mechanics, and joint flexibility to maintain movement safety and overall physical freedom."
      ]
    };
  }
}

function getAgeFact(years: number): string {
  if (years < 30) {
    return "Cognitive Science: During your 20s, your brain's prefrontal cortex completes its baseline structural consolidation, enhancing logic modeling and long-term planning.";
  }
  return "Longevity Insight: Research indicates that life contentment and emotional resilience consistently grow over time, typically peaking during later mature decades.";
}

// ─── PROGRESS CARD COMPONENT ──────────────────────────────────────────────────
const ProgressCard = ({ currentDays, history }: { currentDays: number; history: SavedEntry[] }) => {
  const previous = getPreviousEntry(currentDays, history);
  if (!previous) return null;

  const deltaDays = currentDays - previous.totalDays;
  const daysDiff = Math.abs(deltaDays);

  return (
    <div
      className="rounded-xl p-5 border flex items-start gap-4 max-w-4xl mx-auto shadow-sm"
      style={{
        background: deltaDays >= 0 ? "#f0fdf4" : "#fefce8",
        borderColor: deltaDays >= 0 ? "#bbf7d0" : "#fef08a",
      }}
    >
      <div
        className="p-2 rounded-lg flex-shrink-0"
        style={{ background: deltaDays >= 0 ? "#bbf7d0" : "#fef08a" }}
      >
        {deltaDays >= 0 ? (
          <Award className="w-5 h-5 text-emerald-700" />
        ) : (
          <AlertCircle className="w-5 h-5 text-yellow-700" />
        )}
      </div>
      <div className="space-y-1 w-full text-left">
        <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
          {deltaDays >= 0 ? "Chronological Progress Tracking" : "Date Target Comparison Update"}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          {deltaDays >= 0 ? (
            <>
              Since your saved calculation from{" "}
              <strong>{new Date(previous.date).toLocaleDateString()}</strong>, you have lived an additional{" "}
              <span className="font-bold text-emerald-700">{daysDiff.toLocaleString()} days</span> of experiences, growth, and memories.
            </>
          ) : (
            <>
              Compared to your previous saved entry, this calculated target point is{" "}
              <strong>{daysDiff.toLocaleString()} days earlier</strong> in time.
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
    <Card className="max-w-4xl mx-auto border shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="w-4 h-4 text-emerald-700" />
          Your Age Calculation History
        </CardTitle>
        <CardDescription className="text-xs">
          Saved locally in your browser session. Complete personal data confidentiality.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {history.map((entry, i) => {
            const nextEntry = history[i + 1];
            const delta = nextEntry ? entry.totalDays - nextEntry.totalDays : null;
            return (
              <div key={entry.date} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border-b last:border-0 border-gray-100 dark:border-gray-800 gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                  >
                    #{history.length - i}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold">
                      Age: {entry.years}y {entry.months}m {entry.days}d
                    </p>
                    <p className="text-xs text-gray-400">
                      DOB: {new Date(entry.dob).toLocaleDateString()} · Target: {new Date(entry.targetDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-right text-xs">
                    <span className="text-gray-500">Zodiac: </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.zodiac}</span>
                    <span className="mx-1 text-gray-300">|</span>
                    <span className="text-gray-500">Total Days Lived: </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.totalDays.toLocaleString()}</span>
                  </div>

                  {delta !== null && (
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                    >
                      {delta >= 0 ? "+" : ""}{delta.toLocaleString()} days
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={onClear}
          className="mt-4 text-xs text-gray-400 hover:text-red-500 transition-colors block text-left"
        >
          Clear historical history entries
        </button>
      </CardContent>
    </Card>
  );
};

// ─── MAIN EXPORT COMPONENT ────────────────────────────────────────────────────
export default function AgeCalculator() {
  const [result, setResult] = useState<AgeResult | null>(null);
  const [history, setHistory] = useState<SavedEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setHistory(getAgeStorage());
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: "",
      targetDate: todayStr,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setSaved(false);

    setTimeout(() => {
      const birthDate = new Date(values.dob);
      const targetDate = new Date(values.targetDate);

      // Core Age Calculation
      let years = differenceInYears(targetDate, birthDate);
      let months = differenceInMonths(targetDate, birthDate) % 12;
      
      // Calculate remaining days accurately
      const tempDate = new Date(birthDate);
      tempDate.setFullYear(tempDate.getFullYear() + years);
      tempDate.setMonth(tempDate.getMonth() + months);
      let days = differenceInDays(targetDate, tempDate);

      // Negative handling if target is before temp (edge cases)
      if (days < 0) {
        months -= 1;
        const previousMonthDate = new Date(birthDate);
        previousMonthDate.setFullYear(previousMonthDate.getFullYear() + years);
        previousMonthDate.setMonth(previousMonthDate.getMonth() + months);
        days = differenceInDays(targetDate, previousMonthDate);
      }
      
      // Total stats
      const totalMonths = differenceInMonths(targetDate, birthDate);
      const totalWeeks = differenceInWeeks(targetDate, birthDate);
      const totalDays = differenceInDays(targetDate, birthDate);
      const totalHours = differenceInHours(targetDate, birthDate);
      const totalMinutes = differenceInMinutes(targetDate, birthDate);

      // Next Birthday Logic
      const currentYear = targetDate.getFullYear();
      let nextBday = new Date(birthDate);
      nextBday.setFullYear(currentYear);
      if (nextBday < targetDate) {
        nextBday.setFullYear(currentYear + 1);
      }
      
      const nextBdayMonths = differenceInMonths(nextBday, targetDate);
      // Adjust next bday days
      const tempNextDate = new Date(targetDate);
      tempNextDate.setMonth(tempNextDate.getMonth() + nextBdayMonths);
      const nextBdayDays = differenceInDays(nextBday, tempNextDate);

      const weekdayBorn = birthDate.toLocaleDateString("en-US", { weekday: "long" });
      const nextBirthdayWeekday = nextBday.toLocaleDateString("en-US", { weekday: "long" });
      const nextBirthdayDateStr = nextBday.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

      // Zodiac & Birthstone
      const zodiac = getZodiacSign(birthDate.getDate(), birthDate.getMonth());
      const birthstone = getBirthstone(birthDate.getMonth());

      setResult({
        years,
        months,
        days,
        totalMonths,
        totalWeeks,
        totalDays,
        totalHours,
        totalMinutes,
        nextBirthday: {
          days: nextBdayDays,
          months: nextBdayMonths,
          weekday: nextBirthdayWeekday,
          date: nextBirthdayDateStr,
        },
        zodiac,
        birthstone,
        dayBorn: weekdayBorn,
      });

      setIsLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }, 600);
  }

  const handleSave = () => {
    if (!result) return;
    const values = form.getValues();
    const entry: SavedEntry = {
      date: new Date().toISOString(),
      dob: values.dob,
      targetDate: values.targetDate,
      years: result.years,
      months: result.months,
      days: result.days,
      totalDays: result.totalDays,
      zodiac: result.zodiac,
      birthstone: result.birthstone,
    };
    saveAgeEntry(entry);
    setHistory(getAgeStorage());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
    setShowHistory(false);
  };

  const customInsights = result ? generateAgeInsights(result.years) : null;
  const customFact = result ? getAgeFact(result.years) : "";

  return (
    <div className="space-y-8 text-left">
      {/* ── HISTORICAL PROGRESS TRIGGER ────────────────────────────────────────── */}
      {history.length > 0 && (
        <div className="max-w-4xl mx-auto flex justify-between items-center bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-700" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Found {history.length} saved age {history.length === 1 ? "record" : "records"}
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
          <HistoryPanel history={history} onClear={clearHistory} />
        </div>
      )}

      {/* ── CALCULATOR COMPONENT ───────────────────────────────────────────────── */}
      <Card className="max-w-4xl mx-auto shadow-lg border-t-4 border-t-primary" id="calculator">
        <CardHeader className="bg-muted/20 pb-6 border-b">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Hourglass className="w-6 h-6 text-emerald-700" /> 
                Age Calculator
              </CardTitle>
              <CardDescription className="mt-1">
                Calculate your exact age in years, months, and days, plus explore relative timeline behaviors [1].
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" className="h-12 text-lg" max={todayStr} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Calculate Age At (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" className="h-12 text-lg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" size="lg" className="flex-1 text-lg h-14 font-bold bg-emerald-700 text-white hover:bg-emerald-800" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Calculator className="mr-2 h-5 w-5" />}
                  {isLoading ? "Calculating..." : "Calculate Exact Age"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="sm:w-44 text-lg h-14"
                  onClick={() => {
                    form.reset();
                    setResult(null);
                    setSaved(false);
                  }}
                  disabled={isLoading}
                >
                  <RefreshCw className="mr-2 h-5 w-5" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* ── UNIFIED RESULTS SECTION ────────────────────────────────────────────── */}
      <div ref={resultsRef} className="scroll-mt-16">
        {result && (
          <div className="max-w-4xl mx-auto mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* COMPARATIVE PROGRESS COMPONENT */}
            <ProgressCard currentDays={result.totalDays} history={history} />

            {/* Main Age Card */}
            <Card className="overflow-hidden border-primary/20 shadow-xl">
              <div className="bg-primary/5 p-8 md:p-10 text-center">
                {/* Visual Fact Strip */}
                <div
                  className="text-xs font-semibold px-4 py-2.5 rounded-lg mb-6 flex items-start text-left gap-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  <Brain className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-700" />
                  <span>{customFact}</span>
                </div>

                <p className="text-lg text-muted-foreground font-medium mb-2">You are exactly</p>
                <div className="flex flex-wrap justify-center items-baseline gap-2 md:gap-4 text-emerald-700">
                  <span className="text-5xl md:text-7xl font-bold tabular-nums tracking-tight">{result.years}</span>
                  <span className="text-lg md:text-2xl font-medium text-muted-foreground">years,</span>
                  <span className="text-5xl md:text-7xl font-bold tabular-nums tracking-tight">{result.months}</span>
                  <span className="text-lg md:text-2xl font-medium text-muted-foreground">months, and</span>
                  <span className="text-5xl md:text-7xl font-bold tabular-nums tracking-tight">{result.days}</span>
                  <span className="text-lg md:text-2xl font-medium text-muted-foreground">days old</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border shadow-sm text-sm font-medium text-muted-foreground">
                  <CalendarDays className="w-4 h-4 text-emerald-700" /> Born on {result.dayBorn}
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Next Birthday Card */}
              <Card className="flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PartyPopper className="w-5 h-5 text-orange-500" /> Next Birthday Countdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center">
                   <div className="text-center space-y-2 mb-6">
                      <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                        {result.nextBirthday.months} <span className="text-lg font-normal text-muted-foreground">months</span> {result.nextBirthday.days} <span className="text-lg font-normal text-muted-foreground">days</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        until your special day on <b>{result.nextBirthday.date}</b> ({result.nextBirthday.weekday})
                      </p>
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Last Birthday</span>
                        <span>Next Birthday</span>
                      </div>
                      <Progress value={Math.max(5, 100 - ((result.nextBirthday.months * 30 + result.nextBirthday.days) / 3.65))} className="h-3" />
                   </div>
                </CardContent>
              </Card>

              {/* Fun Facts Card */}
              <Card>
                <CardHeader className="pb-2">
                   <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="w-5 h-5 text-purple-500" /> Astrological & Natural Markers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                    <span className="text-sm font-medium">Zodiac Sign</span>
                    <span className="font-bold text-emerald-700">{result.zodiac}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                    <span className="text-sm font-medium">Birthstone</span>
                    <span className="font-bold text-emerald-700">{result.birthstone}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                     <span className="text-sm font-medium">Day of Birth</span>
                     <span className="font-bold text-emerald-700">{result.dayBorn}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Time Alive Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" /> Lifetime Duration Breakdown
                </CardTitle>
                <CardDescription>A granular perspective on your elapsed temporal baseline.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                    <p className="text-xs uppercase text-muted-foreground font-semibold mb-1">Total Months</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200">{result.totalMonths.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                    <p className="text-xs uppercase text-muted-foreground font-semibold mb-1">Total Weeks</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200">{result.totalWeeks.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                    <p className="text-xs uppercase text-muted-foreground font-semibold mb-1">Total Days</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200">{result.totalDays.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
                    <p className="text-xs uppercase text-muted-foreground font-semibold mb-1">Total Hours</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-200">{result.totalHours.toLocaleString()}</p>
                  </div>
                </div>
                <Separator className="my-6" />
                <p className="text-center text-sm text-muted-foreground">
                  You have lived for approximately <span className="font-mono font-medium text-foreground">{result.totalMinutes.toLocaleString()}</span> minutes.
                  <br/>That's a massive span of active structural capability!
                </p>
              </CardContent>
            </Card>

            {/* 4. HIGH-CTR PERSONALIZED LIFE ACTION STEPS */}
            {customInsights && (
              <Card className="border-0 shadow-lg" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-2.5 mb-5">
                    <ArrowRight className="w-5 h-5 text-emerald-700" />
                    <h3 className="text-lg font-black text-emerald-700">
                      Longevity & Lifestyle Action Framework
                    </h3>
                  </div>
                  <p className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">
                    {customInsights.headline}
                  </p>
                  <div className="space-y-3">
                    {customInsights.nextSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white/80 dark:bg-slate-950/70 rounded-lg p-3.5 border border-emerald-100/50">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 bg-emerald-700 text-white"
                        >
                          {i + 1}
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-left">{step}</p>
                      </div>
                    ))}
                  </div>

                  {/* Core Cross-Links */}
                  <div className="mt-8 pt-4 border-t border-emerald-200">
                    <p className="text-xs font-bold mb-3 text-emerald-700">Explore core physiological parameters &rarr;</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "TDEE / Calories Calculator", href: "/health/tdee-calculator" },
                        { label: "Ideal Weight Calculator", href: "/health/ideal-body-weight-calculator" },
                        { label: "Body Shape Index (ABSI)", href: "/health/absi-calculator" },
                        { label: "Heart Rate Zones", href: "/health/heart-rate-calculator" },
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
            )}

            {/* 5. STORAGE SAVE & CONSOLE REDIRECT */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-6">
              <Button
                onClick={handleSave}
                disabled={saved}
                className="font-bold px-8 w-full sm:w-auto h-12 bg-emerald-700 text-white hover:bg-emerald-800"
                style={saved ? { background: "#f0fdf4", color: "#047857", border: "1px solid #bbf7d0" } : {}}
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