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
import { Loader2, RefreshCw, Sparkles, Calendar as CalendarIcon, ChevronRight, Info } from "lucide-react";

// --- FORM SCHEMA ---
const formSchema = z.object({
  lastPeriodDate: z.string().refine((val) => val !== "", {
    message: "Required",
  }),
  cycleLength: z.number().min(20).max(45),
  periodDuration: z.number().min(2).max(10),
});

// --- TYPES ---
interface CycleForecast {
  periodStart: Date;
  periodEnd: Date;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
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
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    setTimeout(() => {
      const lastPeriodDate = parseISO(values.lastPeriodDate);
      const { cycleLength, periodDuration } = values;
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

      setResult({
        currentPhase: { ...phaseInfo, dayOfCycle },
        nextPeriodDays: Math.max(0, nextPeriodDays),
        forecasts,
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
            
            <p className="text-center text-xs text-gray-400 mt-4">
              * Estimations based on entered cycle length.
            </p>

          </div>
        )}
      </div>
    </>
  );
}