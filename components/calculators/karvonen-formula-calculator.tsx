"use client"

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, RefreshCw, HeartPulse, Zap, TrendingUp, Award, Flame, Loader2, GitCompareArrows, Gauge } from "lucide-react"

// Define validation schema
const formSchema = z.object({
  age: z.string().min(1, "Age is required").refine(val => Number(val) >= 10 && Number(val) <= 100, { message: "Age must be between 10 and 100" }),
  restingHeartRate: z.string().min(1, "Resting heart rate is required").refine(val => Number(val) >= 30 && Number(val) <= 120, { message: "RHR must be between 30 and 120" }),
  mhrFormula: z.enum(["fox", "tanaka", "gellish", "manual"], { required_error: "A formula is required" }),
  manualMhr: z.string().optional(),
}).refine(data => {
    // If manual formula is chosen, manualMhr must be provided.
    if (data.mhrFormula === "manual") {
        return !!data.manualMhr && data.manualMhr.length > 0;
    }
    return true;
}, {
    message: "Max Heart Rate is required for manual entry",
    path: ["manualMhr"], // Point the error to the manualMhr field
});

interface HeartRateZone {
  zone: string;
  intensity: string;
  bpmRange: string;
  description: string;
  color: string;
  icon: JSX.Element;
}

// Feature 1: contrast HRR-based zones with naive %-of-max-HR zones
interface ZoneComparison {
  zone: string;
  intensity: string;
  hrrRange: string;   // Karvonen (HRR-based, personalised)
  naiveRange: string; // naive % of MaxHR (ignores resting rate)
  color: string;
}

// Feature 2: intensity guidance per zone (RPE, feel, purpose, example session)
interface ZoneGuidance {
  zone: string;
  rpe: string;
  feel: string;
  purpose: string;
  session: string;
  color: string;
  icon: JSX.Element;
}

interface CalculationResult {
  maxHeartRate: number;
  heartRateReserve: number;
  zones: HeartRateZone[];
  // Feature 1
  zoneComparison: ZoneComparison[];
  maxDelta: number; // largest bpm gap between Karvonen and naive at the same %
  // Feature 2
  zoneGuidance: ZoneGuidance[];
}

// Static intensity guidance keyed by zone index (RPE on the 1-10 Borg CR10 scale)
const intensityGuidance = [
  { rpe: "RPE 2-3", feel: "Very easy — you can breathe through your nose and talk freely.", purpose: "Active recovery and warm-up; promotes blood flow without fatigue.", session: "10-15 min easy walk or gentle spin before/after harder work." },
  { rpe: "RPE 3-4", feel: "Comfortable — full sentences are easy; you could keep going for hours.", purpose: "Builds your aerobic base and trains the body to burn fat for fuel.", session: "45-90 min steady walk, jog or ride at a conversational pace." },
  { rpe: "RPE 5-6", feel: "Moderately hard — talking is possible but in short phrases.", purpose: "Raises aerobic capacity and stamina for longer, faster efforts.", session: "30-50 min continuous run or ride, or 4-6 min repeats with rest." },
  { rpe: "RPE 7-8", feel: "Hard — only a few words at a time; breathing is heavy and rhythmic.", purpose: "Lifts your lactate threshold so you can hold a faster pace longer.", session: "3-5 × 5-8 min at threshold with 2-3 min easy recovery between." },
  { rpe: "RPE 9-10", feel: "All-out — talking is impossible; sustainable only for seconds to ~2 min.", purpose: "Develops peak power, speed and anaerobic capacity (VO2max work).", session: "6-10 × 30-60 sec near-max sprints with full 2-3 min recovery." },
];

const zoneDetails = [
  { name: "Zone 1: Recovery", intensity: "50-60%", color: "bg-sky-500", icon: <Award className="w-5 h-5" />, desc: "Very light activity. Helps with recovery and warms up the body." },
  { name: "Zone 2: Endurance", intensity: "60-70%", color: "bg-green-500", icon: <TrendingUp className="w-5 h-5" />, desc: "The fat-burning zone. Builds aerobic fitness and cardiovascular health." },
  { name: "Zone 3: Aerobic", intensity: "70-80%", color: "bg-yellow-500", icon: <Zap className="w-5 h-5" />, desc: "Improves aerobic fitness and stamina. You'll be breathing heavily." },
  { name: "Zone 4: Lactate Threshold", intensity: "80-90%", color: "bg-orange-500", icon: <Flame className="w-5 h-5" />, desc: "Hard effort. Increases your maximum performance capacity." },
  { name: "Zone 5: Max Effort", intensity: "90-100%", color: "bg-red-500", icon: <HeartPulse className="w-5 h-5" />, desc: "All-out effort, sustainable for only short bursts. Pushes your limits." },
];

// --- NEW: Visual Heart Rate Zone Chart ---
const HeartRateZoneChart = ({ zones, mhr }: { zones: HeartRateZone[], mhr: number }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-center mb-4">Your Target Heart Rate Zones</h3>
            <div className="space-y-3">
                {zones.map(({ zone, intensity, bpmRange, color, icon, description }) => (
                    <div key={zone} className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: color.replace('bg-', '#') }}>
                            {icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-baseline">
                                <p className="font-bold">{zone}</p>
                                <p className="text-sm font-mono text-primary">{bpmRange} bpm</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default function KarvonenFormulaCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { age: "", restingHeartRate: "", mhrFormula: "tanaka", manualMhr: "" },
  })

  const mhrFormula = form.watch("mhrFormula");

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    setTimeout(() => {
        const age = parseInt(values.age);
        const rhr = parseInt(values.restingHeartRate);
        let mhr: number;

        if (values.mhrFormula === "manual" && values.manualMhr) {
            mhr = parseInt(values.manualMhr);
        } else {
            switch(values.mhrFormula) {
                case "fox":
                    mhr = 220 - age;
                    break;
                case "gellish":
                    mhr = 207 - (0.7 * age);
                    break;
                case "tanaka":
                default:
                    mhr = 208 - (0.7 * age);
                    break;
            }
        }
        mhr = Math.round(mhr);
        const hrr = mhr - rhr;

        const calculatedZones: HeartRateZone[] = [
            {
                zone: "Zone 1: Recovery", intensity: "50-60%",
                bpmRange: `${Math.round(hrr * 0.5 + rhr)} - ${Math.round(hrr * 0.6 + rhr)}`,
                description: "Light walk, warm-ups. Feels very easy.",
                color: "bg-sky-500", icon: <Award className="w-5 h-5 text-white" />
            },
            {
                zone: "Zone 2: Endurance", intensity: "60-70%",
                bpmRange: `${Math.round(hrr * 0.6 + rhr)} - ${Math.round(hrr * 0.7 + rhr)}`,
                description: "Brisk walk, light jog. You can hold a conversation.",
                color: "bg-green-500", icon: <TrendingUp className="w-5 h-5 text-white" />
            },
            {
                zone: "Zone 3: Aerobic", intensity: "70-80%",
                bpmRange: `${Math.round(hrr * 0.7 + rhr)} - ${Math.round(hrr * 0.8 + rhr)}`,
                description: "Running, cycling. Conversation becomes difficult.",
                color: "bg-yellow-500", icon: <Zap className="w-5 h-5 text-white" />
            },
            {
                zone: "Zone 4: Threshold", intensity: "80-90%",
                bpmRange: `${Math.round(hrr * 0.8 + rhr)} - ${Math.round(hrr * 0.9 + rhr)}`,
                description: "Sprinting, HIIT. Unsustainable for long periods.",
                color: "bg-orange-500", icon: <Flame className="w-5 h-5 text-white" />
            },
            {
                zone: "Zone 5: Max Effort", intensity: "90-100%",
                bpmRange: `${Math.round(hrr * 0.9 + rhr)} - ${mhr}`,
                description: "All-out effort. Maximum capacity.",
                color: "bg-red-500", icon: <HeartPulse className="w-5 h-5 text-white" />
            },
        ];

        // ── FEATURE 1: HRR-based (Karvonen) zones vs naive %-of-MaxHR zones ──────
        // Karvonen anchors each zone to the individual's resting rate via HRR, so
        // a fitter person (lower RHR) gets a different — and more accurate — target
        // than the generic "% of max HR" chart that ignores resting heart rate.
        const zoneBands = [
            { zone: "Zone 1: Recovery", intensity: "50-60%", lo: 0.5, hi: 0.6, color: "bg-sky-500" },
            { zone: "Zone 2: Endurance", intensity: "60-70%", lo: 0.6, hi: 0.7, color: "bg-green-500" },
            { zone: "Zone 3: Aerobic", intensity: "70-80%", lo: 0.7, hi: 0.8, color: "bg-yellow-500" },
            { zone: "Zone 4: Threshold", intensity: "80-90%", lo: 0.8, hi: 0.9, color: "bg-orange-500" },
            { zone: "Zone 5: Max Effort", intensity: "90-100%", lo: 0.9, hi: 1.0, color: "bg-red-500" },
        ];

        let maxDelta = 0;
        const zoneComparison: ZoneComparison[] = zoneBands.map(({ zone, intensity, lo, hi, color }) => {
            const hrrLo = Math.round(hrr * lo + rhr); // Karvonen: HRR × intensity + RHR
            const hrrHi = Math.round(hrr * hi + rhr);
            const naiveLo = Math.round(mhr * lo);      // naive: % of MaxHR only
            const naiveHi = Math.round(mhr * hi);
            maxDelta = Math.max(maxDelta, Math.abs(hrrLo - naiveLo), Math.abs(hrrHi - naiveHi));
            return {
                zone,
                intensity,
                hrrRange: `${hrrLo} - ${hrrHi}`,
                naiveRange: `${naiveLo} - ${naiveHi}`,
                color,
            };
        });

        // ── FEATURE 2: clear intensity guidance for each zone ───────────────────
        const zoneGuidance: ZoneGuidance[] = calculatedZones.map((z, i) => ({
            zone: z.zone,
            rpe: intensityGuidance[i].rpe,
            feel: intensityGuidance[i].feel,
            purpose: intensityGuidance[i].purpose,
            session: intensityGuidance[i].session,
            color: z.color,
            icon: z.icon,
        }));

        setResult({
            maxHeartRate: mhr,
            heartRateReserve: hrr,
            zones: calculatedZones,
            zoneComparison,
            maxDelta,
            zoneGuidance,
        })
        setIsLoading(false)

        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100)
    }, 500);
  }

  const resetCalculator = () => {
    form.reset()
    setResult(null)
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto" id="calculator">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><HeartPulse className="w-6 h-6 text-primary" /> Karvonen Formula Calculator</CardTitle>
            <CardDescription>Enter your age and resting heart rate to determine your personalized training zones for optimal fitness results.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="age" render={({ field }) => (<FormItem><FormLabel>Your Age</FormLabel><FormControl><Input type="number" placeholder="e.g., 30" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="restingHeartRate" render={({ field }) => (<FormItem><FormLabel>Resting Heart Rate (bpm)</FormLabel><FormControl><Input type="number" placeholder="e.g., 65" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
               <FormField
                  control={form.control}
                  name="mhrFormula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Heart Rate (MHR) Formula</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a formula" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tanaka">Tanaka (208 - 0.7 × age) - Most Accurate</SelectItem>
                          <SelectItem value="gellish">Gellish (207 - 0.7 × age)</SelectItem>
                          <SelectItem value="fox">Fox (220 - age) - Most Common</SelectItem>
                          <SelectItem value="manual">Enter Manually</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              {mhrFormula === "manual" && (
                <FormField control={form.control} name="manualMhr" render={({ field }) => (<FormItem><FormLabel>Your Max Heart Rate (bpm)</FormLabel><FormControl><Input type="number" placeholder="e.g., 185" {...field} /></FormControl><FormMessage /></FormItem>)} />
              )}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Calculator className="h-4 w-4 mr-2" />}
                  {isLoading ? 'Calculating...' : 'Calculate Zones'}
                </Button>
                <Button type="button" variant="outline" onClick={resetCalculator} className="flex-1" disabled={isLoading}><RefreshCw className="h-4 w-4 mr-2" /> Reset</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div ref={resultsRef}>
        {result && (
          <Card className="max-w-4xl mx-auto mt-8">
            <CardHeader>
                <CardTitle className="text-2xl">Your Personal Heart Rate Zones</CardTitle>
                <CardDescription>Use these zones to guide your workouts for different fitness goals, from fat burning to peak performance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-muted rounded-lg"><h4 className="font-semibold text-muted-foreground">Your Estimated Max Heart Rate (MHR)</h4><p className="text-3xl font-bold text-primary">{result.maxHeartRate} <span className="text-lg">bpm</span></p></div>
                    <div className="p-4 bg-muted rounded-lg"><h4 className="font-semibold text-muted-foreground">Your Heart Rate Reserve (HRR)</h4><p className="text-3xl font-bold text-primary">{result.heartRateReserve} <span className="text-lg">bpm</span></p></div>
                </div>

                <div className="border-t pt-6">
                  <HeartRateZoneChart zones={result.zones} mhr={result.maxHeartRate} />
                </div>

                {/* FEATURE 1: HRR-based zones vs naive %-of-Max-HR zones */}
                <div className="border-t pt-6">
                  <div className="flex items-center gap-2 mb-1">
                    <GitCompareArrows className="w-5 h-5 text-emerald-700" />
                    <h3 className="text-lg font-semibold text-emerald-700">Personalised vs Generic Zones</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your zones below use your <strong>Heart-Rate Reserve</strong> (HRR = {result.maxHeartRate} max −{" "}
                    {result.maxHeartRate - result.heartRateReserve} resting = {result.heartRateReserve} bpm), so each
                    target BPM is <code className="rounded bg-muted px-1 py-0.5 text-xs">HRR × intensity + resting HR</code>.
                    Because this anchors every zone to <em>your</em> resting rate, it reflects your real fitness — unlike the
                    generic &ldquo;% of max heart rate&rdquo; chart that ignores it and can be off by up to{" "}
                    <strong className="text-emerald-700">{result.maxDelta} bpm</strong> for you.
                  </p>

                  <div className="overflow-x-auto mt-4 rounded-xl border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/60 text-left">
                        <tr>
                          <th className="p-3">Zone</th>
                          <th className="p-3">Intensity</th>
                          <th className="p-3 text-emerald-700">Your Karvonen Zone (HRR)</th>
                          <th className="p-3 text-muted-foreground">Generic % of Max HR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.zoneComparison.map((c) => (
                          <tr key={c.zone} className="border-t">
                            <td className="p-3 font-semibold">
                              <span className="inline-flex items-center gap-2">
                                <span className={`inline-block h-2.5 w-2.5 rounded-full ${c.color}`} />
                                {c.zone}
                              </span>
                            </td>
                            <td className="p-3">{c.intensity}</td>
                            <td className="p-3 font-mono font-semibold text-emerald-700">{c.hrrRange} bpm</td>
                            <td className="p-3 font-mono text-muted-foreground">{c.naiveRange} bpm</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Why HRR wins: two people with the same age share a max heart rate, but the fitter one (lower resting rate)
                    needs a different target to train at the same true effort. Karvonen captures that; %-of-max does not.
                  </p>
                </div>

                {/* FEATURE 2: intensity guidance for each zone */}
                <div className="border-t pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Gauge className="w-5 h-5 text-emerald-700" />
                    <h3 className="text-lg font-semibold text-emerald-700">What Each Zone Feels Like &amp; Is For</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.zoneGuidance.map((g) => (
                      <div key={g.zone} className="rounded-xl border p-4 bg-card">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white ${g.color}`}>
                              {g.icon}
                            </span>
                            <p className="font-semibold leading-tight">{g.zone}</p>
                          </div>
                          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 whitespace-nowrap">
                            {g.rpe}
                          </span>
                        </div>
                        <dl className="mt-3 space-y-2 text-sm">
                          <div>
                            <dt className="font-semibold text-foreground">Feels like</dt>
                            <dd className="text-muted-foreground">{g.feel}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-foreground">Best for</dt>
                            <dd className="text-muted-foreground">{g.purpose}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-foreground">Try this session</dt>
                            <dd className="text-muted-foreground">{g.session}</dd>
                          </div>
                        </dl>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    RPE = Rate of Perceived Exertion on the 1–10 scale. Match how the effort feels to the BPM range above to
                    train each system on purpose — recovery, fat-burn/base, aerobic, threshold, and max.
                  </p>
                </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}