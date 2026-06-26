"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Heart, Flame, Zap, Timer, Info, Dumbbell, Target } from "lucide-react"

// Define validation schema
const formSchema = z.object({
  age: z.string().min(1, "Age is required").refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 120, "Enter a valid age"),
  restingHeartRate: z.string().optional(),
  formula: z.enum(["standard", "tanaka"]), // Standard (220-age) or Tanaka (208 - 0.7*age)
})

// Define interface for zone data
interface ZoneResult {
  zone: number;
  name: string;
  range: string;
  description: string;
  color: string;
  icon: React.ElementType;
  // ── Additive: intensity bracket (% of HRmax / HRR) for this zone ──
  intensity: string;
  // ── Additive: concrete example workouts for training in this zone ──
  workouts: string;
  // ── Additive: flags the Zone 2 fat-burning range ──
  fatBurn?: boolean;
}

// Define interface for results state
interface ResultsState {
  maxHeartRate: number;
  heartRateReserve: number | null;
  methodUsed: "Basic (MHR %)" | "Karvonen (HRR)";
  zones: ZoneResult[];
}

export default function HeartRateCalculator() {
  const [results, setResults] = useState<ResultsState | null>(null)
  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      restingHeartRate: "",
      formula: "standard",
    },
  })

  const calculateHeartRate = (values: z.infer<typeof formSchema>) => {
    setError("")
    setResults(null)

    const age = parseFloat(values.age)
    const rhr = values.restingHeartRate ? parseFloat(values.restingHeartRate) : NaN
    
    // 1. Calculate Max Heart Rate (MHR)
    let mhr = 0
    if (values.formula === "tanaka") {
      mhr = 208 - (0.7 * age)
    } else {
      mhr = 220 - age
    }
    mhr = Math.round(mhr)

    // Validation
    if (rhr >= mhr) {
      setError("Resting heart rate cannot be higher than maximum heart rate.")
      return
    }

    // 2. Determine Method (Karvonen if RHR exists, otherwise Standard)
    const useKarvonen = !isNaN(rhr) && rhr > 0
    const hrr = useKarvonen ? mhr - rhr : null

    // 3. Helper to calculate BPM for a specific percentage
    const getBpm = (percent: number) => {
      if (useKarvonen && hrr !== null) {
        // Karvonen Formula: ((MHR - RHR) * %Intensity) + RHR
        return Math.round((hrr * percent) + rhr)
      } else {
        // Standard Formula: MHR * %Intensity
        return Math.round(mhr * percent)
      }
    }

    // 4. Generate Zones
    const zones: ZoneResult[] = [
      {
        zone: 1,
        name: "Warm Up / Recovery",
        range: `${getBpm(0.50)} - ${getBpm(0.60)} bpm`,
        description: "Very light effort. Improves overall health and helps recovery.",
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: Activity,
        intensity: "50-60%",
        workouts: "Easy walking, gentle stretching, foam rolling, light yoga, cool-downs.",
      },
      {
        zone: 2,
        name: "Fat Burn / Endurance",
        range: `${getBpm(0.60) + 1} - ${getBpm(0.70)} bpm`,
        description: "Light effort. Best for burning fat and building basic endurance.",
        color: "bg-blue-50 text-blue-700 border-blue-200",
        icon: Flame,
        intensity: "60-70%",
        workouts: "Easy jog, brisk walk, steady cycling, long conversational runs, hiking.",
        fatBurn: true,
      },
      {
        zone: 3,
        name: "Aerobic / Cardio",
        range: `${getBpm(0.70) + 1} - ${getBpm(0.80)} bpm`,
        description: "Moderate effort. Improves aerobic fitness and blood circulation.",
        color: "bg-green-50 text-green-700 border-green-200",
        icon: Heart,
        intensity: "70-80%",
        workouts: "Steady-state runs, group cardio classes, moderate cycling, swimming laps.",
      },
      {
        zone: 4,
        name: "Anaerobic / Hard",
        range: `${getBpm(0.80) + 1} - ${getBpm(0.90)} bpm`,
        description: "Hard effort. Increases speed and lactate tolerance.",
        color: "bg-orange-50 text-orange-700 border-orange-200",
        icon: Timer,
        intensity: "80-90%",
        workouts: "Tempo intervals, threshold runs, hill repeats, hard spin intervals.",
      },
      {
        zone: 5,
        name: "VO2 Max / Peak",
        range: `${getBpm(0.90) + 1} - ${mhr} bpm`,
        description: "Maximum effort. Develops peak performance and speed.",
        color: "bg-red-50 text-red-700 border-red-200",
        icon: Zap,
        intensity: "90-100%",
        workouts: "All-out sprints, short HIIT bursts, max-effort hill sprints, race finishes.",
      }
    ]

    setResults({
      maxHeartRate: mhr,
      heartRateReserve: hrr,
      methodUsed: useKarvonen ? "Karvonen (HRR)" : "Basic (MHR %)",
      zones: zones
    })
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-red-500" />
          Target Heart Rate Calculator
        </CardTitle>
        <CardDescription>
          Find your optimal training zones for fat loss, endurance, and cardiovascular health.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calculateHeartRate)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 35" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="restingHeartRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resting Heart Rate (Optional)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 60 bpm" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Enter this for the advanced <strong>Karvonen Formula</strong> calculation.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="formula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Heart Rate Formula</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Formula" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="standard">Standard (220 - Age)</SelectItem>
                          <SelectItem value="tanaka">Tanaka (208 - 0.7 × Age)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-xs">
                        Tanaka is generally considered more accurate for adults over 40.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Calculate Zones
                </Button>
              </form>
            </Form>

            {error && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 space-y-2">
              <p className="font-semibold flex items-center gap-2">
                <Info className="h-4 w-4" /> Why add Resting Heart Rate?
              </p>
              <p>
                Without it, we guess your zones based solely on age. Adding your RHR unlocks the 
                <strong> Karvonen Method</strong>, which tailors zones to your specific fitness level.
              </p>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7">
            {results ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Header Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900 text-white rounded-xl text-center shadow-md">
                    <p className="text-xs uppercase tracking-wider opacity-70">Max Heart Rate</p>
                    <p className="text-3xl font-bold">{results.maxHeartRate} <span className="text-sm font-normal">bpm</span></p>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 text-slate-800 rounded-xl text-center shadow-sm">
                    <p className="text-xs uppercase tracking-wider opacity-70">Calculation Method</p>
                    <p className="text-lg font-semibold mt-1">{results.methodUsed}</p>
                  </div>
                </div>

                {/* Zones Visualization */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-slate-800">Your Training Zones</h3>
                  {results.zones.map((zone) => (
                    <div 
                      key={zone.zone} 
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border-l-4 shadow-sm transition-all hover:shadow-md ${zone.color}`}
                    >
                      <div className="flex items-center gap-4 mb-2 sm:mb-0">
                        <div className="p-2 bg-white bg-opacity-60 rounded-full">
                          <zone.icon className="h-5 w-5 opacity-80" />
                        </div>
                        <div>
                          <p className="font-bold text-base flex items-center gap-2">
                            Zone {zone.zone}: {zone.name}
                          </p>
                          <p className="text-xs opacity-90">{zone.description}</p>
                        </div>
                      </div>
                      <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
                        <span className="inline-block px-3 py-1 bg-white bg-opacity-80 rounded-full font-bold text-lg shadow-sm">
                          {zone.range}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── FEATURE 1: Personalised Karvonen Training Zones ────────────── */}
                <Card className="border-emerald-100 bg-emerald-50/40 rounded-xl shadow-sm">
                  <CardContent className="p-5 md:p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-emerald-700" />
                      <h3 className="text-base font-bold text-slate-800">Your Personalised Training Zones</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {results.methodUsed === "Karvonen (HRR)" ? (
                        <>
                          These brackets use the <strong className="text-emerald-700">Karvonen method</strong>, blending your
                          maximum heart rate with your resting rate (Heart Rate Reserve ={" "}
                          <strong>{results.heartRateReserve} bpm</strong>) for zones tailored to your fitness level.
                        </>
                      ) : (
                        <>
                          These brackets use standard <strong className="text-emerald-700">% of max heart rate</strong>. Add
                          your <strong>resting heart rate</strong> above to unlock the more precise Karvonen method.
                        </>
                      )}
                    </p>

                    <div className="space-y-2">
                      {results.zones.map((zone) => (
                        <div
                          key={zone.zone}
                          className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 ${
                            zone.fatBurn
                              ? "border-emerald-300 bg-emerald-100/70 ring-1 ring-emerald-200"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5 flex-wrap">
                              Zone {zone.zone}
                              <span className="text-xs font-normal text-slate-500">· {zone.intensity} intensity</span>
                              {zone.fatBurn && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                                  <Flame className="h-3 w-3" /> Fat-Burning Zone
                                </span>
                              )}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-md bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
                            {zone.range}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Spend most of your easy training in <strong className="text-emerald-700">Zone 2 (~60-70% HRR)</strong> —
                      this is the fat-burning, aerobic-base range where your body uses fat most efficiently as fuel.
                    </p>
                  </CardContent>
                </Card>

                {/* ── FEATURE 2: Example Workouts For Each Zone ──────────────────── */}
                <Card className="border-slate-200 rounded-xl shadow-sm">
                  <CardContent className="p-5 md:p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-5 w-5 text-emerald-700" />
                      <h3 className="text-base font-bold text-slate-800">How To Train In Each Zone</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Concrete workout ideas so you know exactly how to hit each heart-rate bracket.
                    </p>
                    <div className="space-y-2">
                      {results.zones.map((zone) => (
                        <div
                          key={zone.zone}
                          className={`flex items-start gap-3 rounded-lg border p-3 ${zone.color}`}
                        >
                          <div className="p-1.5 bg-white bg-opacity-60 rounded-full shrink-0">
                            <zone.icon className="h-4 w-4 opacity-80" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold">
                              Zone {zone.zone}: {zone.name}{" "}
                              <span className="text-xs font-normal opacity-80">({zone.range})</span>
                            </p>
                            <p className="text-xs opacity-90 mt-0.5">
                              <strong>Try:</strong> {zone.workouts}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[300px] border-2 border-dashed border-slate-200 rounded-xl">
                <Activity className="h-16 w-16 mb-4 opacity-20" />
                <p>Enter your details to see your zones</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}