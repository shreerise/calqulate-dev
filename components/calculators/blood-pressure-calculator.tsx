"use client"

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
  ArrowRight
} from "lucide-react"

const formSchema = z.object({
  systolic: z.string().min(1, "Systolic is required."),
  diastolic: z.string().min(1, "Diastolic is required."),
})

export default function BloodPressureCalculator() {
  const [result, setResult] = useState<{
    category: string;
    description: string;
    map: number;
    pulsePressure: number;
    color: string;
    bgColor: string;
    advice: string[];
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { systolic: "", diastolic: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setTimeout(() => {
      const s = parseInt(values.systolic)
      const d = parseInt(values.diastolic)

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

  return (
    <div className="space-y-8">
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
                   <p className="text-xs font-bold text-gray-400 uppercase mb-1">Mean Arterial Pressure (MAP)</p>
                   <p className="text-3xl font-black text-gray-800">{result.map.toFixed(1)} <span className="text-sm font-normal text-gray-400">mmHg</span></p>
                   <div className="mt-2 text-[11px] text-gray-500 bg-gray-50 rounded p-1 inline-block">Normal range: 70 - 100 mmHg</div>
                </div>
                <div className="p-6 text-center">
                   <p className="text-xs font-bold text-gray-400 uppercase mb-1">Pulse Pressure</p>
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