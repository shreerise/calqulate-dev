"use client"

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Calculator, 
  RefreshCw, 
  Loader2, 
  Target, 
  TrendingDown, 
  AlertTriangle, 
  Info,
  Heart
} from "lucide-react"

const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
  height: z.string().min(1, "Height is required."),
  waist: z.string().min(1, "Waist measurement is required."),
  units: z.enum(["metric", "imperial"]),
})

type UnitSystem = "metric" | "imperial"

export default function WHtRCalculator() {
  const [result, setResult] = useState<{
    ratio: number;
    category: string;
    description: string;
    targetWaist: number;
    color: string;
    stringTest: string;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { gender: "female", height: "", waist: "", units: "metric" },
  })

  const units = form.watch("units")

  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = form.getValues("units")
    if (newUnit === currentUnit) return

    const height = parseFloat(form.getValues("height"))
    const waist = parseFloat(form.getValues("waist"))

    if (height) {
      const newHeight = newUnit === "imperial" ? height / 2.54 : height * 2.54
      form.setValue("height", newHeight.toFixed(1))
    }
    if (waist) {
      const newWaist = newUnit === "imperial" ? waist / 2.54 : waist * 2.54
      form.setValue("waist", newWaist.toFixed(1))
    }
    form.setValue("units", newUnit)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setTimeout(() => {
      const h = parseFloat(values.height)
      const w = parseFloat(values.waist)
      const ratio = w / h

      let category = ""
      let description = ""
      let color = ""
      let stringTest = ""

      if (ratio < 0.35) {
        category = "Abnormally Slim"
        description = "Your waist is significantly less than half your height. This may indicate being underweight."
        color = "text-blue-600"
        stringTest = "Pass (Plenty of room left)"
      } else if (ratio < 0.5) {
        category = "Healthy"
        description = "Perfect! Your waist is less than half your height. This is the optimal range for heart health."
        color = "text-green-600"
        stringTest = "Pass (The string fits easily)"
      } else if (ratio < 0.6) {
        category = "Increased Risk"
        description = "Your waist is slightly over half your height. This indicates some carry of visceral fat."
        color = "text-orange-500"
        stringTest = "Fail (The string doesn't quite meet)"
      } else {
        category = "High Risk"
        description = "Your ratio indicates a high level of abdominal obesity. Consider consulting a doctor."
        color = "text-red-600"
        stringTest = "Fail (Significant gap in string test)"
      }

      const targetWaist = h * 0.45 // Mid-range of healthy

      setResult({ ratio, category, description, targetWaist, color, stringTest })
      setIsLoading(false)
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
    }, 600)
  }

  return (
    <div className="space-y-8">
      <Card className="border-green-100 shadow-lg">
        <CardHeader className="bg-green-50/50">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600" /> Professional WHtR Tool
          </CardTitle>
          <CardDescription>Enter your height and waist to see your health score.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="units"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-gray-500">Unit System</FormLabel>
                      <RadioGroup
                        onValueChange={(v) => handleUnitChange(v as UnitSystem)}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="metric" id="metric" />
                          <label htmlFor="metric" className="text-sm font-medium">Metric (cm)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="imperial" id="imperial" />
                          <label htmlFor="imperial" className="text-sm font-medium">Imperial (in)</label>
                        </div>
                      </RadioGroup>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-gray-500">Gender</FormLabel>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <label htmlFor="female" className="text-sm font-medium">Female</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <label htmlFor="male" className="text-sm font-medium">Male</label>
                        </div>
                      </RadioGroup>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Height ({units === "metric" ? "cm" : "inches"})</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g. 175" {...field} className="h-12 text-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="waist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waist Circumference ({units === "metric" ? "cm" : "inches"})</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g. 85" {...field} className="h-12 text-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 h-12 text-lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Calculator className="mr-2 h-5 w-5" />}
                  {isLoading ? "Analyzing..." : "Calculate My Risk"}
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
          <div className="grid gap-6">
            <Card className="border-2 border-green-500 overflow-hidden">
              <div className="bg-green-600 p-4 text-white text-center">
                <p className="text-sm uppercase font-bold tracking-widest opacity-80">Your WHtR Score</p>
                <p className="text-6xl font-black">{result.ratio.toFixed(2)}</p>
              </div>
              <CardContent className="p-8 space-y-8">
                <div className="text-center space-y-2">
                  <h3 className={`text-3xl font-bold ${result.color}`}>{result.category}</h3>
                  <p className="text-gray-600 max-w-md mx-auto">{result.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <Target className="w-5 h-5 mx-auto text-green-600 mb-2" />
                    <p className="text-xs font-bold text-gray-400 uppercase">Target Waist</p>
                    <p className="text-lg font-bold text-gray-800">{result.targetWaist.toFixed(1)} {units === "metric" ? "cm" : "in"}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <TrendingDown className="w-5 h-5 mx-auto text-blue-600 mb-2" />
                    <p className="text-xs font-bold text-gray-400 uppercase">String Test</p>
                    <p className="text-lg font-bold text-gray-800">{result.stringTest}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <Heart className="w-5 h-5 mx-auto text-red-500 mb-2" />
                    <p className="text-xs font-bold text-gray-400 uppercase">Heart Stress</p>
                    <p className="text-lg font-bold text-gray-800">{result.ratio > 0.5 ? "Elevated" : "Optimal"}</p>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <h4 className="flex items-center gap-2 font-bold mb-2">
                        <Info className="w-4 h-4 text-green-400" /> Pro Insight
                      </h4>
                      <p className="text-sm text-slate-300">
                        Studies indicate that for every 0.1 increase in WHtR above 0.5, your lifespan can potentially decrease by several years due to metabolic stress. Keeping this number low is the best insurance for your 60s and 70s.
                      </p>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}