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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calculator, 
  RefreshCw, 
  Loader2, 
  Heart, 
  AlertTriangle, 
  Activity, 
  Info,
  ArrowRight,
  CheckCircle2,
  History,
  ChevronRight,
  ShieldAlert
} from "lucide-react"

// Strict validations for safety and E-E-A-T guidelines
const formSchema = z.object({
  calculationMode: z.enum(["single", "average"]),
  // Single mode fields
  systolic: z.string().optional(),
  diastolic: z.string().optional(),
  // Average mode fields
  sys1: z.string().optional(),
  dia1: z.string().optional(),
  sys2: z.string().optional(),
  dia2: z.string().optional(),
  sys3: z.string().optional(),
  dia3: z.string().optional(),
  // Demographics for tailored advice
  age: z.string().optional(),
  gender: z.string().optional(),
}).refine((data) => {
  if (data.calculationMode === "single") {
    return !!data.systolic && !!data.diastolic;
  }
  // Require at least two readings for average mode
  return (!!data.sys1 && !!data.dia1) && (!!data.sys2 && !!data.dia2);
}, {
  message: "Please fill in the required blood pressure readings.",
  path: ["systolic"]
})

type BPResult = {
  category: string;
  description: string;
  map: number;
  pulsePressure: number;
  color: string;
  bgColor: string;
  advice: string[];
  isAveraged: boolean;
}

interface SavedEntry {
  date: string;
  systolic: number;
  diastolic: number;
  category: string;
  description: string;
  map: number;
  pulsePressure: number;
  advice: string[];
  isAveraged: boolean;
}

const STORAGE_KEY = "calqulate_bp_history"

function getStorage(): SavedEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(entry: SavedEntry) {
  try {
    const existing = getStorage()
    existing.unshift(entry)
    const trimmed = existing.slice(0, 10)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  } catch {
    // ignore storage errors
  }
}

function getBpDeltaLabel(current: { systolic: number; diastolic: number; category: string }, previous: SavedEntry) {
  const severityOrder = [
    "Normal",
    "Elevated",
    "Hypertension Stage 1",
    "Hypertension Stage 2",
    "Hypertensive Crisis",
    "Low (Hypotension)",
  ]

  const currentIndex = severityOrder.indexOf(current.category)
  const prevIndex = severityOrder.indexOf(previous.category)
  const currentScore = current.systolic + current.diastolic
  const prevScore = previous.systolic + previous.diastolic
  const delta = Number((currentScore - prevScore).toFixed(1))

  if (currentIndex < prevIndex) {
    return { label: `Your latest reading is improved from ${previous.category} to ${current.category}.`, color: "#166534", icon: "down" as const }
  }

  if (currentIndex > prevIndex) {
    return { label: `Your latest reading is higher on the clinical scale than your last saved result.`, color: "#991B1B", icon: "up" as const }
  }

  if (delta < 0) {
    return { label: `Your pressure is lower by ${Math.abs(delta)} mmHg compared to the last saved reading.`, color: "#166534", icon: "down" as const }
  }

  if (delta > 0) {
    return { label: `Your pressure is higher by ${delta} mmHg compared to the last saved reading.`, color: "#991B1B", icon: "up" as const }
  }

  return { label: "No meaningful change from the last saved reading.", color: "#4B5563", icon: "same" as const }
}

const ProgressCard = ({ current, history }: { current: { systolic: number; diastolic: number; category: string }; history: SavedEntry[] }) => {
  if (history.length === 0) return null
  const last = history[0]
  const deltaInfo = getBpDeltaLabel(current, last)
  const improving = deltaInfo.icon === "down"

  return (
    <div className="rounded-xl p-4 border flex items-start gap-4" style={{ background: improving ? "#ECFDF5" : "#FEF3EE", borderColor: improving ? "#86EFAC" : "#FECACA" }}>
      <div className="p-2 rounded-lg flex-shrink-0" style={{ background: improving ? "#DCFCE7" : "#FEE2E2" }}>
        {improving ? <CheckCircle2 className="w-5 h-5 text-green-700" /> : <AlertTriangle className="w-5 h-5 text-red-700" />}
      </div>
      <div>
        <p className="font-bold text-sm" style={{ color: improving ? "#166534" : "#991B1B" }}>
          {improving ? "Your trend is showing positive improvement." : "Your trend indicates higher readings than last time."}
        </p>
        <p className="text-xs mt-1" style={{ color: "#4B5563" }}>
          {deltaInfo.label} · Last saved: {new Date(last.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>
    </div>
  )
}

const HistoryPanel = ({ history, onClear }: { history: SavedEntry[]; onClear: () => void }) => {
  if (history.length === 0) return null

  return (
    <Card className="max-w-3xl mx-auto border shadow-md mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <History className="w-4 h-4 text-green-600" />
          Saved Blood Pressure Readings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((entry, index) => {
            const previous = history[index + 1]
            const delta = previous ? Number(((entry.systolic + entry.diastolic) - (previous.systolic + previous.diastolic)).toFixed(1)) : null
            return (
              <div key={entry.date} className="rounded-2xl border p-4 bg-white shadow-sm">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-sm font-semibold">{entry.category} {entry.isAveraged && <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded ml-1">Averaged</span>}</p>
                    <p className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{entry.systolic}/{entry.diastolic}</p>
                    <p className="text-xs text-gray-500">MAP {entry.map.toFixed(1)} mmHg</p>
                  </div>
                </div>
                {delta !== null && (
                  <div className="mt-3 text-sm font-medium" style={{ color: delta < 0 ? "#166534" : delta > 0 ? "#991B1B" : "#475569" }}>
                    {delta < 0 ? `Improved by ${Math.abs(delta)} mmHg vs previous saved reading` : delta > 0 ? `Higher by ${delta} mmHg vs previous saved reading` : "No change from previous saved reading"}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <button onClick={onClear} className="mt-4 text-xs text-gray-500 hover:text-red-500 transition-colors">
          Clear history
        </button>
      </CardContent>
    </Card>
  )
}

export default function BloodPressureCalculator() {
  const [result, setResult] = useState<BPResult | null>(null)
  const [reading, setReading] = useState<{ systolic: number; diastolic: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [history, setHistory] = useState<SavedEntry[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      calculationMode: "single",
      systolic: "", 
      diastolic: "",
      sys1: "", dia1: "",
      sys2: "", dia2: "",
      sys3: "", dia3: "",
      age: "",
      gender: "unspecified"
    },
  })

  const currentMode = form.watch("calculationMode")

  useEffect(() => {
    setHistory(getStorage())
  }, [])

  const handleSave = () => {
    if (!result || !reading) return

    const entry: SavedEntry = {
      date: new Date().toISOString(),
      systolic: reading.systolic,
      diastolic: reading.diastolic,
      category: result.category,
      description: result.description,
      map: result.map,
      pulsePressure: result.pulsePressure,
      advice: result.advice,
      isAveraged: result.isAveraged
    }

    saveToStorage(entry)
    setHistory(getStorage())
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY)
    setHistory([])
    setShowHistory(false)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setTimeout(() => {
      let s = 0
      let d = 0
      let isAveraged = false

      if (values.calculationMode === "single") {
        s = parseInt(values.systolic || "0")
        d = parseInt(values.diastolic || "0")
      } else {
        isAveraged = true
        const sysReadings = [parseInt(values.sys1 || "0"), parseInt(values.sys2 || "0"), parseInt(values.sys3 || "0")].filter(v => v > 0)
        const diaReadings = [parseInt(values.dia1 || "0"), parseInt(values.dia2 || "0"), parseInt(values.dia3 || "0")].filter(v => v > 0)
        
        s = Math.round(sysReadings.reduce((a, b) => a + b, 0) / sysReadings.length)
        d = Math.round(diaReadings.reduce((a, b) => a + b, 0) / diaReadings.length)
      }

      // Input safety limits
      if (s < 50 || s > 300 || d < 30 || d > 200) {
        form.setError("systolic", { type: "manual", message: "Please enter physiological blood pressure values." })
        setIsLoading(false)
        return
      }

      setReading({ systolic: s, diastolic: d })

      const map = d + (s - d) / 3
      const pulsePressure = s - d

      let category = ""
      let description = ""
      let color = ""
      let bgColor = ""
      let advice: string[] = []

      // Clinical Evaluation Criteria (ACC/AHA Guidelines)
      if (s >= 180 || d >= 120) {
        category = "Hypertensive Crisis"
        description = "EMERGENCY: Seek medical attention immediately. Retest in a few minutes."
        color = "text-red-700"
        bgColor = "bg-red-50 border-red-200"
        advice = [
          "Seek emergency medical services or visit an ER immediately.",
          "Do not wait for other symptoms like chest pain or shortness of breath.",
          "If you feel chest pain, back pain, or vision changes, call 911 immediately."
        ]
      } else if (s >= 140 || d >= 90) {
        category = "Hypertension Stage 2"
        description = "Consistently high clinical thresholds. Medical intervention is usually required."
        color = "text-red-600"
        bgColor = "bg-red-50 border-red-100"
        advice = [
          "Consult your physician to explore appropriate diagnostic evaluation.",
          "Restrict daily dietary sodium (aim for under 1,500 mg per day).",
          "Establish a home monitoring schedule (morning and evening readings)."
        ]
      } else if (s >= 130 || d >= 80) {
        category = "Hypertension Stage 1"
        description = "Early-stage hypertension. Targeted lifestyle adaptations are highly recommended."
        color = "text-orange-600"
        bgColor = "bg-orange-50 border-orange-100"
        advice = [
          "Incorporate 150 minutes of moderate aerobic exercise weekly.",
          "Evaluate dietary choices (the DASH eating plan is clinically proven).",
          "Minimize alcohol intake and avoid tobacco products entirely."
        ]
      } else if (s >= 120 && d < 80) {
        category = "Elevated"
        description = "Readings are starting to drift. Lifestyle interventions can prevent clinical hypertension."
        color = "text-yellow-600"
        bgColor = "bg-yellow-50 border-yellow-100"
        advice = [
          "Prioritize restorative sleep (7-9 hours nightly) to aid vascular recovery.",
          "Track blood pressure on a weekly basis to monitor trends.",
          "Focus on managing stress through mindfulness or light activity."
        ]
      } else if (s < 90 || d < 60) {
        category = "Low (Hypotension)"
        description = "Your readings are lower than standard reference thresholds."
        color = "text-blue-600"
        bgColor = "bg-blue-50 border-blue-100"
        advice = [
          "Ensure adequate hydration throughout the day.",
          "Stand up gradually to minimize postural dizziness (orthostatic response).",
          "If you experience persistent fatigue or fainting spells, consult a doctor."
        ]
      } else {
        category = "Normal"
        description = "Your cardiovascular measurements are within the healthy reference range."
        color = "text-green-600"
        bgColor = "bg-green-50 border-green-100"
        advice = [
          "Keep maintaining your dietary and workout habits.",
          "Check your blood pressure periodically to verify consistency.",
          "Stick to a healthy, balanced diet rich in fiber and lean proteins."
        ]
      }

      // 5. Tailored Demographic Insights (Demographic Adaptation)
      const ageVal = parseInt(values.age || "0")
      if (ageVal >= 60 && category === "Normal") {
        advice.push("At age 60+, standard vessels stiffen naturally. Excellent work maintaining these optimal readings.")
      } else if (ageVal >= 60 && (category === "Hypertension Stage 1" || category === "Hypertension Stage 2")) {
        advice.push("Stiffening arteries are common over age 60, raising systolic levels. Do not ignore elevated metrics due to age.")
      }

      if (values.gender === "female") {
        advice.push("Keep in mind that factors such as pregnancy, birth control, or menopause status can influence long-term blood pressure goals.")
      }

      setResult({ category, description, map, pulsePressure, color, bgColor, advice, isAveraged })
      setIsLoading(false)
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
    }, 600)
  }

  const lastSaved = history[0]
  const currentDeltaInfo = result && reading && lastSaved ? getBpDeltaLabel({ systolic: reading.systolic, diastolic: reading.diastolic, category: result.category }, lastSaved) : null

  return (
    <div className="space-y-8">
      {history.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: "#15803D" }}
          >
            <History className="w-4 h-4 shrink-0" />
            <span className="whitespace-normal">{showHistory ? "Hide" : "View"} saved blood pressure readings ({history.length} {history.length === 1 ? "entry" : "entries"})</span>
            <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${showHistory ? "rotate-90" : ""}`} />
          </button>
        </div>
      )}
      {showHistory && <HistoryPanel history={history} onClear={clearHistory} />}

      <Card className="border-green-100 shadow-lg overflow-hidden">
        <CardHeader className="bg-green-50/50">
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-600" /> Clinical Blood Pressure Calculator
          </CardTitle>
          <CardDescription>
            Use single assessment mode, or select average assessment mode to calculate the average of multiple home readings for higher accuracy.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <Tabs 
                defaultValue="single" 
                value={currentMode} 
                onValueChange={(v) => form.setValue("calculationMode", v as "single" | "average")}
                className="w-full"
              >
                <TabsList className="grid grid-cols-1 gap-2 sm:grid-cols-2 max-w-md mx-auto mb-6">
                  <TabsTrigger value="single" className="h-auto min-h-9 w-full whitespace-normal px-3 py-2 text-sm sm:text-base">Single Reading</TabsTrigger>
                  <TabsTrigger value="average" className="h-auto min-h-9 w-full whitespace-normal px-3 py-2 text-sm sm:text-base">Average Readings</TabsTrigger>
                </TabsList>

                {/* SINGLE MODE */}
                <TabsContent value="single" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="systolic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-gray-700">Systolic Pressure (Top Number)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 120" {...field} className="h-14 text-xl sm:text-2xl font-bold" />
                          </FormControl>
                          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Pressure in mmHg when heart contracts</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="diastolic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-gray-700">Diastolic Pressure (Bottom Number)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 80" {...field} className="h-14 text-xl sm:text-2xl font-bold" />
                          </FormControl>
                          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Pressure in mmHg between heartbeats</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* CLINICAL AVERAGE MODE */}
                <TabsContent value="average" className="space-y-6">
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6 text-sm text-blue-800 flex gap-3">
                    <Info className="w-5 h-5 shrink-0 text-blue-600" />
                    <div>
                      <p className="font-semibold">The Clinical Averaging Standard</p>
                      <p className="text-xs mt-1 text-blue-700">
                        Home blood pressure monitoring is most accurate when you take 2 or 3 readings, separated by 1 minute, and average them together.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-bold text-sm text-gray-600 text-center">
                      <div>Reading Set</div>
                      <div>Systolic (Top)</div>
                      <div>Diastolic (Bottom)</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center">
                      <div className="text-sm font-semibold text-gray-700 sm:pl-2">Reading #1</div>
                      <FormField
                        control={form.control}
                        name="sys1"
                        render={({ field }) => <Input type="number" placeholder="e.g. 122" {...field} className="h-11 text-center font-bold" />}
                      />
                      <FormField
                        control={form.control}
                        name="dia1"
                        render={({ field }) => <Input type="number" placeholder="e.g. 81" {...field} className="h-11 text-center font-bold" />}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center">
                      <div className="text-sm font-semibold text-gray-700 sm:pl-2">Reading #2</div>
                      <FormField
                        control={form.control}
                        name="sys2"
                        render={({ field }) => <Input type="number" placeholder="e.g. 119" {...field} className="h-11 text-center font-bold" />}
                      />
                      <FormField
                        control={form.control}
                        name="dia2"
                        render={({ field }) => <Input type="number" placeholder="e.g. 79" {...field} className="h-11 text-center font-bold" />}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center">
                      <div className="text-sm font-semibold text-gray-700 sm:pl-2">Reading #3 <span className="text-xs font-normal text-gray-400">(Optional)</span></div>
                      <FormField
                        control={form.control}
                        name="sys3"
                        render={({ field }) => <Input type="number" placeholder="e.g. 120" {...field} className="h-11 text-center font-bold" />}
                      />
                      <FormField
                        control={form.control}
                        name="dia3"
                        render={({ field }) => <Input type="number" placeholder="e.g. 80" {...field} className="h-11 text-center font-bold" />}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* DEMOGRAPHICS PORTION FOR HEALTHENGINE INSIGHTS */}
              <div className="border-t pt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Optional: Demographics (For Tailored Insights)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">Your Age</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 45" {...field} className="h-11" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 text-sm">Biological Sex</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select sex" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="unspecified">Prefer not to say</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 h-auto min-h-12 px-3 text-base sm:text-lg font-bold leading-snug text-center whitespace-normal" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Calculator className="mr-2 h-5 w-5 shrink-0" />}
                  {isLoading ? "Calculating..." : currentMode === "average" ? "Average BP" : "Check Blood Pressure"}
                </Button>
                <Button type="button" variant="outline" className="h-12 w-full sm:w-auto px-6" onClick={() => { form.reset(); setResult(null); }}>
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div ref={resultsRef}>
        {result && (
          <Card className={`border-2 ${result.bgColor} overflow-hidden`}>
            <CardContent className="p-0">
              <div className="p-4 sm:p-8 text-center space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                  Your Reading Category {result.isAveraged && <span className="text-xs bg-blue-100 text-blue-700 font-bold tracking-normal py-1 px-2.5 rounded ml-1 lowercase">(clinically averaged)</span>}
                </p>
                <h3 className={`text-3xl sm:text-4xl md:text-5xl font-black ${result.color}`}>{result.category}</h3>
                <p className="text-gray-600 max-w-md mx-auto font-medium">{result.description}</p>
                {reading && (
                  <p className="text-base sm:text-lg font-bold text-gray-700">
                    Calculated Value: <span className="text-xl sm:text-2xl font-black text-gray-900">{reading.systolic}/{reading.diastolic}</span> <span className="text-sm font-normal text-gray-400">mmHg</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 border-t border-b bg-white">
                <div className="p-6 text-center border-b md:border-b-0 md:border-r">
                   <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                      <Link
                        href="/health/mean-arterial-pressure-calculator"
                        className="hover:underline hover:text-gray-600 transition-colors"
                      >
                        Mean Arterial Pressure (MAP)
                      </Link>
                    </p>
                   <p className="text-3xl font-black text-gray-800">{result.map.toFixed(1)} <span className="text-sm font-normal text-gray-400">mmHg</span></p>
                   <div className="mt-2 text-[11px] text-gray-500 bg-gray-50 rounded p-1 inline-block">Normal range: 70 - 100 mmHg</div>
                </div>
                <div className="p-6 text-center">
                   <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                      <Link
                        href="/health/pulse-pressure-calculator"
                        className="hover:underline hover:text-gray-600 transition-colors"
                      >
                        Pulse Pressure
                      </Link>
                    </p>
                   <p className="text-3xl font-black text-gray-800">{result.pulsePressure} <span className="text-sm font-normal text-gray-400">mmHg</span></p>
                   <div className="mt-2 text-[11px] text-gray-500 bg-gray-50 rounded p-1 inline-block">Healthy limit: &lt; 60 mmHg</div>
                </div>
              </div>

              <div className="p-4 sm:p-8 space-y-4 bg-white/50">
                <h4 className="font-bold flex items-center gap-2"><Info className="w-4 h-4 text-green-600" /> Recommended Action Protocol</h4>
                <div className="grid gap-3">
                  {result.advice.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100">
                      <ArrowRight className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-8 border-t bg-white">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-start">
                  <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white h-auto min-h-10 px-3 leading-snug text-center whitespace-normal" size="lg">
                    {saved ? "Saved to history" : "Save this reading"}
                  </Button>
                  {currentDeltaInfo && (
                    <div className="rounded-2xl border p-4 bg-slate-50">
                      <p className="text-sm font-semibold text-slate-900">Comparison to last saved reading</p>
                      <p className={`mt-2 text-base font-bold ${currentDeltaInfo.icon === "down" ? "text-green-600" : currentDeltaInfo.icon === "up" ? "text-red-600" : "text-slate-700"}`}>
                        {currentDeltaInfo.label}
                      </p>
                    </div>
                  )}
                </div>
                {history.length > 0 && reading && result && (
                  <div className="mt-4">
                    <ProgressCard current={{ systolic: reading.systolic, diastolic: reading.diastolic, category: result.category }} history={history} />
                  </div>
                )}
              </div>

              {result.pulsePressure > 60 && (
                <div className="bg-orange-600 text-white p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-1" />
                  <p className="text-xs sm:text-sm"><b>Note on Pulse Pressure:</b> Your pulse pressure is above 60. This can be an early indicator of arterial stiffness. Consider mentioning this specific metric to your doctor.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 text-slate-500 text-xs flex gap-3 border border-slate-100 items-start">
        <ShieldAlert className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
        <p>
          <strong>Medical Guideline Reference:</strong> Classifications are determined in accordance with the 2017 Joint Guidelines of the American College of Cardiology (ACC) and the American Heart Association (AHA). Do not change your medical treatment based solely on this calculator.
        </p>
      </div>
    </div>
  )
}