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
import { Calculator, RefreshCw, HeartPulse, Zap, TrendingUp, Award, Flame, Loader2 } from "lucide-react"

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

interface CalculationResult {
  maxHeartRate: number;
  heartRateReserve: number;
  zones: HeartRateZone[];
}

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

        setResult({
            maxHeartRate: mhr,
            heartRateReserve: hrr,
            zones: calculatedZones
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
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}