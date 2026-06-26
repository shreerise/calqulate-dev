"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format, addDays, differenceInDays, subDays, parseISO } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Loader2, RefreshCw, Sparkles, Calendar as CalendarIcon, ChevronRight, Info, Waves, Activity } from "lucide-react";

// --- FORM SCHEMA ---
const formSchema = z.object({
  lastPeriodDate: z.string().refine((val) => val !== "", {
    message: "Required",
  }),
  cycleLength: z.number().min(20).max(45),
  periodDuration: z.number().min(2).max(10),
  // Optional, non-breaking: irregular-cycle variability (± days). 0 = treat as regular.
  cycleVariation: z.number().min(0).max(12).optional(),
});

// --- TYPES ---
interface CycleForecast {
  periodStart: Date;
  periodEnd: Date;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
}

interface PhaseSegment {
  name: string;
  dayLabel: string; // e.g. "Day 1–5"
  startDay: number;
  endDay: number;
  widthPct: number; // share of the cycle, for the timeline bar
  barClass: string; // background color for the bar segment
  textClass: string;
  icon: string;
  energy: string;
  expect: string;
  isCurrent: boolean;
}

interface PredictionDetails {
  isIrregular: boolean;
  variation: number; // ± days
  // Next period: a single best-guess date plus an honest window when irregular.
  nextPeriodDate: Date;
  nextPeriodEarliest: Date;
  nextPeriodLatest: Date;
  // Fertile window (widened for irregular cycles using the Ogino–Knaus range method).
  fertileStart: Date;
  fertileEnd: Date;
  ovulationDate: Date;
  // PMS days (luteal-phase symptom window leading into the next period).
  pmsStart: Date;
  pmsEnd: Date;
}

interface CalculationResult {
  currentPhase: {
    name: string;
    color: string;
    bgClass: string; // Tailored background for the card
    description: string;
    symptoms: string;
    dayOfCycle: number;
    progress: number; // 0 to 100
  };
  nextPeriodDays: number;
  forecasts: CycleForecast[];
  prediction: PredictionDetails;
  phaseTimeline: PhaseSegment[];
}

// --- HELPER FUNCTIONS ---
const getPhaseDetails = (dayOfCycle: number, length: number, periodDuration: number) => {
  const ovulationDay = length - 14;
  const progress = Math.min(100, (dayOfCycle / length) * 100);

  if (dayOfCycle <= periodDuration) {
    return {
      name: "Menstrual Phase",
      color: "text-rose-600",
      bgClass: "bg-rose-50 border-rose-200",
      description: "Shedding lining",
      symptoms: "Cramps, low energy",
      progress,
    };
  } else if (dayOfCycle < ovulationDay - 5) {
    return {
      name: "Follicular Phase",
      color: "text-blue-600",
      bgClass: "bg-blue-50 border-blue-200",
      description: "Preparing egg",
      symptoms: "Energy rising, clear skin",
      progress,
    };
  } else if (dayOfCycle >= ovulationDay - 5 && dayOfCycle <= ovulationDay + 1) {
    return {
      name: "Ovulation (Fertile)",
      color: "text-purple-600",
      bgClass: "bg-purple-50 border-purple-200",
      description: "Peak fertility",
      symptoms: "High libido, glow",
      progress,
    };
  } else {
    return {
      name: "Luteal Phase",
      color: "text-amber-600",
      bgClass: "bg-amber-50 border-amber-200",
      description: "PMS / Prep",
      symptoms: "Bloating, cravings",
      progress,
    };
  }
};

// Builds a menstrual / follicular / luteal timeline for one cycle, marking the
// segment the user is currently in. Ovulation sits at the follicular→luteal boundary.
const buildPhaseTimeline = (
  cycleLength: number,
  periodDuration: number,
  dayOfCycle: number
): PhaseSegment[] => {
  const ovulationDay = Math.max(periodDuration + 1, cycleLength - 14);

  const raw = [
    {
      name: "Menstrual",
      startDay: 1,
      endDay: periodDuration,
      barClass: "bg-rose-400",
      textClass: "text-rose-600",
      icon: "🩸",
      energy: "Low energy — rest is appropriate",
      expect: "Bleeding, cramps, fatigue. Be gentle with yourself.",
    },
    {
      name: "Follicular",
      startDay: periodDuration + 1,
      endDay: ovulationDay,
      barClass: "bg-emerald-400",
      textClass: "text-emerald-700",
      icon: "🌱",
      energy: "Energy rising — peak focus & mood",
      expect: "Clearer skin, motivation climbs, libido builds toward ovulation.",
    },
    {
      name: "Luteal",
      startDay: ovulationDay + 1,
      endDay: cycleLength,
      barClass: "bg-amber-400",
      textClass: "text-amber-600",
      icon: "🌙",
      energy: "Energy winds down — PMS in final days",
      expect: "Bloating, cravings and mood shifts may appear before your period.",
    },
  ];

  return raw
    .filter((p) => p.endDay >= p.startDay)
    .map((p) => {
      const span = p.endDay - p.startDay + 1;
      return {
        ...p,
        dayLabel: span <= 1 ? `Day ${p.startDay}` : `Day ${p.startDay}–${p.endDay}`,
        widthPct: Math.max(4, (span / cycleLength) * 100),
        isCurrent: dayOfCycle >= p.startDay && dayOfCycle <= p.endDay,
      } as PhaseSegment;
    });
};

export default function PeriodCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastPeriodDate: "",
      cycleLength: 28,
      periodDuration: 5,
      cycleVariation: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    setTimeout(() => {
      const lastPeriodDate = parseISO(values.lastPeriodDate);
      const { cycleLength, periodDuration } = values;
      const variation = values.cycleVariation ?? 0;
      const isIrregular = variation > 0;
      const today = new Date();

      const daysSinceStart = differenceInDays(today, lastPeriodDate);
      let dayOfCycle = (daysSinceStart % cycleLength) + 1;
      if (daysSinceStart < 0) dayOfCycle = 1;

      const phaseInfo = getPhaseDetails(dayOfCycle, cycleLength, periodDuration);

      const forecasts: CycleForecast[] = [];
      let projectionDate = new Date(lastPeriodDate);

      while (differenceInDays(today, projectionDate) >= cycleLength) {
        projectionDate = addDays(projectionDate, cycleLength);
      }

      for (let i = 0; i < 3; i++) {
        const stableStart = addDays(lastPeriodDate, cycleLength * (Math.floor(Math.max(0, daysSinceStart) / cycleLength) + 1 + i));
        const end = addDays(stableStart, periodDuration - 1);
        const ovulation = subDays(addDays(stableStart, cycleLength), 14);
        
        forecasts.push({
          periodStart: stableStart,
          periodEnd: end,
          ovulationDate: ovulation,
          fertileWindowStart: subDays(ovulation, 5),
          fertileWindowEnd: addDays(ovulation, 1),
        });
      }

      const nextPeriodDays = differenceInDays(forecasts[0].periodStart, today);

      // ── FEATURE 1: next period + fertile window + PMS days (irregular-aware) ──
      const next = forecasts[0];
      const nextPeriodDate = next.periodStart;

      // When cycles vary, widen the next-period estimate by ± the stated variation.
      const nextPeriodEarliest = subDays(nextPeriodDate, variation);
      const nextPeriodLatest = addDays(nextPeriodDate, variation);

      // Fertile window. Regular: standard 5-days-before to ovulation+1.
      // Irregular: widen using the Ogino–Knaus principle (shortest/longest cycle).
      let fertileStart: Date;
      let fertileEnd: Date;
      if (isIrregular) {
        const shortest = cycleLength - variation;
        const longest = cycleLength + variation;
        fertileStart = addDays(lastPeriodDate, Math.max(0, shortest - 18) + (Math.floor(Math.max(0, daysSinceStart) / cycleLength)) * cycleLength);
        fertileEnd = addDays(lastPeriodDate, Math.max(0, longest - 11) + (Math.floor(Math.max(0, daysSinceStart) / cycleLength)) * cycleLength);
        // Anchor the range to the upcoming cycle for a forward-looking prediction.
        fertileStart = subDays(next.fertileWindowStart, variation);
        fertileEnd = addDays(next.fertileWindowEnd, variation);
      } else {
        fertileStart = next.fertileWindowStart;
        fertileEnd = next.fertileWindowEnd;
      }

      // PMS days: luteal-phase symptom window (typically the final ~7 days before the period).
      const pmsStart = subDays(nextPeriodDate, 7);
      const pmsEnd = subDays(nextPeriodDate, 1);

      const prediction: PredictionDetails = {
        isIrregular,
        variation,
        nextPeriodDate,
        nextPeriodEarliest,
        nextPeriodLatest,
        fertileStart,
        fertileEnd,
        ovulationDate: next.ovulationDate,
        pmsStart,
        pmsEnd,
      };

      // ── FEATURE 2: phase timeline for the current cycle ──
      const phaseTimeline = buildPhaseTimeline(cycleLength, periodDuration, dayOfCycle);

      setResult({
        currentPhase: { ...phaseInfo, dayOfCycle },
        nextPeriodDays: Math.max(0, nextPeriodDays),
        forecasts,
        prediction,
        phaseTimeline,
      });

      setIsLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 500);
  }

  return (
    <>
      <Card className="max-w-3xl mx-auto shadow-sm border border-gray-200 overflow-hidden" id="calculator">
        <div className="bg-emerald-600 p-4 text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h2 className="font-semibold text-lg">Cycle Calculator</h2>
        </div>
        
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Input */}
                <FormField
                  control={form.control}
                  name="lastPeriodDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">First Day of Last Period</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm h-10 cursor-pointer" 
                          max={new Date().toISOString().split("T")[0]} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Cycle Length Slider */}
                <FormField
                  control={form.control}
                  name="cycleLength"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center mb-2">
                        <FormLabel className="text-sm font-medium text-gray-700">Avg Cycle Length</FormLabel>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-bold">
                          {field.value} Days
                        </span>
                      </div>
                      <FormControl>
                        <Slider
                          min={20}
                          max={45}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

               {/* Period Duration Slider */}
               <FormField
                  control={form.control}
                  name="periodDuration"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center mb-2">
                        <FormLabel className="text-sm font-medium text-gray-700">Period Duration</FormLabel>
                        <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-xs font-bold">
                          {field.value} Days
                        </span>
                      </div>
                      <FormControl>
                        <Slider
                          min={2}
                          max={10}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

              {/* Optional: cycle variability for irregular-cycle accuracy (non-breaking, defaults to 0) */}
              <FormField
                control={form.control}
                name="cycleVariation"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-2">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Cycle Variation <span className="text-gray-400 font-normal">(optional)</span>
                      </FormLabel>
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-bold">
                        {(field.value ?? 0) === 0 ? "Regular" : `± ${field.value} Days`}
                      </span>
                    </div>
                    <FormControl>
                      <Slider
                        min={0}
                        max={12}
                        step={1}
                        defaultValue={[field.value ?? 0]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <p className="text-xs text-gray-400 mt-1">
                      If your periods are irregular, set how many days your cycle typically varies for a wider, more honest prediction.
                    </p>
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-2">
                <Button 
                  type="submit" 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium" 
                  disabled={isLoading}
                  size="default"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Calculate Now"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { form.reset(); setResult(null); }}
                  disabled={isLoading}
                  size="icon"
                >
                  <RefreshCw className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div ref={resultsRef} className="scroll-mt-24">
        {result && (
          <div className="max-w-3xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* COMPACT DASHBOARD RESULT */}
            <div className={`rounded-xl border shadow-md overflow-hidden bg-white ${result.currentPhase.bgClass}`}>
              
              {/* Header Status */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-white/60 px-2 py-0.5 rounded text-xs font-bold text-gray-600 border border-gray-100 uppercase tracking-wide">
                      Current Status
                    </span>
                  </div>
                  <h3 className={`text-2xl font-bold ${result.currentPhase.color}`}>
                    {result.currentPhase.name}
                  </h3>
                  <div className="mt-3 text-sm text-gray-700 space-y-1">
                    <p className="flex items-center gap-2"><Info className="w-3.5 h-3.5" /> {result.currentPhase.description}</p>
                    <p className="flex items-center gap-2 opacity-80"><Sparkles className="w-3.5 h-3.5" /> {result.currentPhase.symptoms}</p>
                  </div>
                </div>

                {/* Compact Countdown */}
                <div className="bg-white/80 rounded-lg p-4 text-center border border-white shadow-sm">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Next Period In</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-black text-slate-800">{result.nextPeriodDays}</span>
                    <span className="text-sm font-medium text-slate-500">Days</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{format(result.forecasts[0].periodStart, "MMM d")}</p>
                </div>
              </div>

              {/* Visual Timeline Progress */}
              <div className="px-6 pb-6">
                <div className="flex justify-between text-xs text-gray-500 font-medium mb-2">
                  <span>Day {result.currentPhase.dayOfCycle}</span>
                  <span>Cycle Length: {form.getValues("cycleLength")} Days</span>
                </div>
                <Progress value={result.currentPhase.progress} className="h-2 bg-gray-200" />
              </div>
            </div>

            {/* UPCOMING FORECASTS - Compact Row */}
            <h4 className="text-base font-semibold text-gray-800 mt-8 mb-4 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-emerald-600" /> Upcoming Forecast
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
               {result.forecasts.map((cycle, idx) => (
                 <div key={idx} className="bg-white border rounded-lg p-3 shadow-sm hover:border-emerald-300 transition-colors">
                    <div className="flex justify-between items-center mb-2 border-b pb-2">
                      <span className="text-sm font-bold text-gray-800">{format(cycle.periodStart, "MMMM")}</span>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                         <span className="text-rose-600 font-medium">Period</span>
                         <span className="text-gray-600">{format(cycle.periodStart, "d")} - {format(cycle.periodEnd, "d")}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                         <span className="text-purple-600 font-medium">Ovulation</span>
                         <span className="text-gray-600">{format(cycle.ovulationDate, "d")}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                         <span className="text-emerald-600 font-medium">Fertile</span>
                         <span className="text-gray-600">{format(cycle.fertileWindowStart, "d")} - {format(cycle.fertileWindowEnd, "d")}</span>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
            
            {/* ── FEATURE 1: NEXT PERIOD · FERTILE WINDOW · PMS (IRREGULAR-AWARE) ── */}
            <Card className="border border-emerald-100 shadow-sm mt-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarIcon className="w-5 h-5 text-emerald-700" />
                  <h4 className="text-base font-bold text-emerald-700">Your Next Period, Fertile Window & PMS Days</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {result.prediction.isIrregular
                    ? `Your cycle varies by about ± ${result.prediction.variation} days, so each prediction is shown as a realistic range instead of a single date.`
                    : "Based on a regular cycle. Add a cycle variation above if your periods are irregular for a wider, more honest range."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                  {/* Next period */}
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-rose-600">Next Period</p>
                    <p className="text-lg font-black text-slate-800 mt-1">
                      {format(result.prediction.nextPeriodDate, "MMM d")}
                    </p>
                    {result.prediction.isIrregular && (
                      <p className="text-xs text-rose-700 mt-1">
                        {format(result.prediction.nextPeriodEarliest, "MMM d")} – {format(result.prediction.nextPeriodLatest, "MMM d")}
                      </p>
                    )}
                  </div>

                  {/* Fertile window */}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Fertile Window</p>
                    <p className="text-lg font-black text-slate-800 mt-1">
                      {format(result.prediction.fertileStart, "MMM d")} – {format(result.prediction.fertileEnd, "MMM d")}
                    </p>
                    <p className="text-xs text-emerald-700 mt-1">
                      Ovulation ~ {format(result.prediction.ovulationDate, "MMM d")}
                    </p>
                  </div>

                  {/* PMS days */}
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-600">PMS Days</p>
                    <p className="text-lg font-black text-slate-800 mt-1">
                      {format(result.prediction.pmsStart, "MMM d")} – {format(result.prediction.pmsEnd, "MMM d")}
                    </p>
                    <p className="text-xs text-amber-700 mt-1">Final luteal-phase days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ── FEATURE 2: PHASE TIMELINE (MENSTRUAL / FOLLICULAR / LUTEAL) ── */}
            <Card className="border border-emerald-100 shadow-sm mt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <Waves className="w-5 h-5 text-emerald-700" />
                  <h4 className="text-base font-bold text-emerald-700">Your Cycle Phases Timeline</h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Where you are across the menstrual, follicular and luteal phases — with what to expect in each. Your current phase is highlighted.
                </p>

                {/* Proportional timeline bar */}
                <div className="mt-5 flex w-full overflow-hidden rounded-full border border-gray-100">
                  {result.phaseTimeline.map((p) => (
                    <div
                      key={p.name}
                      className={`${p.barClass} ${p.isCurrent ? "ring-2 ring-inset ring-slate-900/40" : ""} h-3`}
                      style={{ width: `${p.widthPct}%` }}
                      title={`${p.name} · ${p.dayLabel}`}
                    />
                  ))}
                </div>

                {/* Phase detail cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                  {result.phaseTimeline.map((p) => (
                    <div
                      key={p.name}
                      className={`rounded-xl border p-4 bg-white ${
                        p.isCurrent ? "border-emerald-300 ring-1 ring-emerald-200 shadow-sm" : "border-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-1.5">
                          <span className="text-base">{p.icon}</span>
                          <span className={`font-bold text-sm ${p.textClass}`}>{p.name}</span>
                        </span>
                        {p.isCurrent && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-gray-500">{p.dayLabel}</p>
                      <p className="text-xs text-gray-600 mt-2 leading-relaxed">{p.expect}</p>
                      <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
                        <Activity className="w-3 h-3" /> {p.energy}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-gray-400 mt-4">
              * Estimations based on entered cycle length. Not medical or contraceptive advice.
            </p>

          </div>
        )}
      </div>
    </>
  );
}