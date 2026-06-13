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
  ChevronRight
} from "lucide-react"

const formSchema = z.object({
  systolic: z.string().min(1, "Systolic is required."),
  diastolic: z.string().min(1, "Diastolic is required."),
})

type BPResult = {
  category: string;
  description: string;
  map: number;
  pulsePressure: number;
  color: string;
  bgColor: string;
  advice: string[];
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
    return { label: `Your latest reading is worse than your last saved result.`, color: "#991B1B", icon: "up" as const }
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
          {improving ? "Your latest reading is better than your last saved result." : "Your latest reading is worse than your last saved result."}
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
                    <p className="text-sm font-semibold">{entry.category}</p>
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

  useEffect(() => {
    setHistory(getStorage())
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { systolic: "", diastolic: "" },
  })

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
      const s = parseInt(values.systolic)
      const d = parseInt(values.diastolic)
      setReading({ systolic: s, diastolic: d })

      // Advanced metrics
      const map = d + (s - d) / 3
      const pulsePressure = s - d

      let category = ""
      let description = ""
      let color = ""
      let bgColor = ""
      let advice: string[] = []

      if (s >= 180 || d >= 120) {
        category = "Hypertensive Crisis"
        description = "EMERGENCY: Seek medical attention immediately."
        color = "text-red-700"
        bgColor = "bg-red-50 border-red-200"
        advice = ["Consult a doctor immediately", "Do not wait for symptoms", "Call emergency services if chest pain occurs"]
      } else if (s >= 140 || d >= 90) {
        category = "Hypertension Stage 2"
        description = "Consistently high readings. Medical intervention is likely needed."
        color = "text-red-600"
        bgColor = "bg-red-50 border-red-100"
        advice = ["Consult your doctor for a treatment plan", "Reduce sodium intake significantly", "Monitor BP twice daily"]
      } else if (s >= 130 || d >= 80) {
        category = "Hypertension Stage 1"
        description = "Early-stage hypertension. Lifestyle changes are critical here."
        color = "text-orange-600"
        bgColor = "bg-orange-50 border-orange-100"
        advice = ["Increase daily physical activity", "Review diet (DASH diet recommended)", "Reduce alcohol and smoking"]
      } else if (s >= 120 && d < 80) {
        category = "Elevated"
        description = "You are at risk of developing hypertension if changes aren't made."
        color = "text-yellow-600"
        bgColor = "bg-yellow-50 border-yellow-100"
        advice = ["Keep tracking your results", "Focus on healthy sleep habits", "Maintain a healthy weight"]
      } else if (s < 90 || d < 60) {
        category = "Low (Hypotension)"
        description = "Your blood pressure is lower than the typical range."
        color = "text-blue-600"
        bgColor = "bg-blue-50 border-blue-100"
        advice = ["Drink plenty of water", "Check for dizziness when standing", "Consult a doctor if feeling faint"]
      } else {
        category = "Normal"
        description = "Your blood pressure is in the ideal range. Keep up the good work!"
        color = "text-green-600"
        bgColor = "bg-green-50 border-green-100"
        advice = ["Maintain your healthy habits", "Check your BP once a month", "Balanced diet and exercise"]
      }

      setResult({ category, description, map, pulsePressure, color, bgColor, advice })
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
            <History className="w-4 h-4" />
            {showHistory ? "Hide" : "View"} saved blood pressure readings ({history.length} {history.length === 1 ? "entry" : "entries"})
            <ChevronRight className={`w-4 h-4 transition-transform ${showHistory ? "rotate-90" : ""}`} />
          </button>
        </div>
      )}
      {showHistory && <HistoryPanel history={history} onClear={clearHistory} />}
      <Card className="border-green-100 shadow-lg overflow-hidden">
        <CardHeader className="bg-green-50/50">
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-600" /> Heart Monitor Entry
          </CardTitle>
          <CardDescription>Enter your latest reading from a digital or manual monitor.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="systolic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-gray-700">Systolic (Top Number)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 120" {...field} className="h-14 text-2xl font-bold" />
                      </FormControl>
                      <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Pressure during heartbeat</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diastolic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-gray-700">Diastolic (Bottom Number)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g. 80" {...field} className="h-14 text-2xl font-bold" />
                      </FormControl>
                      <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Pressure during rest</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 h-12 text-lg font-bold" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Calculator className="mr-2 h-5 w-5" />}
                  {isLoading ? "Analyzing..." : "Check My Blood Pressure"}
                </Button>
                <Button type="button" variant="outline" className="h-12 px-6" onClick={() => { form.reset(); setResult(null); }}>
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
              <div className="p-8 text-center space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Your Reading Category</p>
                <h3 className={`text-4xl md:text-5xl font-black ${result.color}`}>{result.category}</h3>
                <p className="text-gray-600 max-w-md mx-auto font-medium">{result.description}</p>
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
                   <div className="mt-2 text-[11px] text-gray-500 bg-gray-50 rounded p-1 inline-block">Healthy: &lt; 60 mmHg</div>
                </div>
              </div>

              <div className="p-8 space-y-4 bg-white/50">
                <h4 className="font-bold flex items-center gap-2"><Info className="w-4 h-4 text-green-600" /> Recommended Next Steps</h4>
                <div className="grid gap-3">
                  {result.advice.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100">
                      <ArrowRight className="w-4 h-4 text-green-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 border-t bg-white">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-start">
                  <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
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
                  <p className="text-xs"><b>Note on Pulse Pressure:</b> Your pulse pressure is above 60. This can be a sign of arterial stiffness. Consider mentioning this specific metric to your doctor.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}