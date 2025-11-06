"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HeartPulse, TestTube, Activity, ShieldCheck, Calculator as CalculatorIcon } from "lucide-react"

// Define validation schema
const formSchema = z.object({
  unit: z.enum(["mg/dL", "mmol/L"]),
  totalCholesterol: z.string().min(1, "Total Cholesterol is required"),
  hdl: z.string().min(1, "HDL is required"),
  ldl: z.string().optional(),
  triglycerides: z.string().min(1, "Triglycerides is required"),
})

// Define an interface for the shape of the results state
interface ResultsState {
  tcHdlRatio: string;
  ldlHdlRatio: string;
  tgHdlRatio: string;
  vldl: string;
  calculatedLdl: string | null;
}

export default function CholesterolRatioCalculator() {
  const [results, setResults] = useState<ResultsState | null>(null)
  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unit: "mg/dL",
      totalCholesterol: "",
      hdl: "",
      ldl: "",
      triglycerides: "",
    },
  })

  const calculateRatios = (values: z.infer<typeof formSchema>) => {
    setError("")
    setResults(null)

    const tc = parseFloat(values.totalCholesterol)
    const hdlVal = parseFloat(values.hdl)
    let ldlVal = values.ldl ? parseFloat(values.ldl) : NaN
    const tg = parseFloat(values.triglycerides)

    if (isNaN(tc) || isNaN(hdlVal) || isNaN(tg)) {
      setError("Please enter valid numbers for all required fields.")
      return
    }

    if (tc <= 0 || hdlVal <= 0 || tg <= 0) {
      setError("Cholesterol and triglyceride values must be positive numbers.")
      return
    }

    let calculatedLdl = ldlVal
    if (isNaN(ldlVal)) {
      if (values.unit === "mg/dL" && tg >= 400) {
        setError("LDL cannot be calculated accurately when triglycerides are 400 mg/dL or higher. Please enter a measured LDL value.")
        return
      }
      calculatedLdl = tc - hdlVal - tg / 5
      if (calculatedLdl <= 0) {
        setError("Calculated LDL is not a valid positive number. Please check your inputs or provide a measured LDL value.")
        return
      }
    }

    const tcHdlRatio = tc / hdlVal
    const ldlHdlRatio = calculatedLdl / hdlVal
    const tgHdlRatio = tg / hdlVal
    const vldl = tg / 5

    setResults({
      tcHdlRatio: tcHdlRatio.toFixed(2),
      ldlHdlRatio: ldlHdlRatio.toFixed(2),
      tgHdlRatio: tgHdlRatio.toFixed(2),
      vldl: vldl.toFixed(2),
      calculatedLdl: isNaN(ldlVal) ? calculatedLdl.toFixed(2) : null,
    })
  }

  // Add explicit types for the function parameters
  const getInterpretation = (ratio: 'tcHdl' | 'ldlHdl' | 'tgHdl', value: number) => {
    if (ratio === "tcHdl") {
      if (value < 3.5) return { text: "Low Risk", color: "text-green-600" }
      if (value >= 3.5 && value <= 5) return { text: "Average Risk", color: "text-yellow-600" }
      return { text: "High Risk", color: "text-red-600" }
    }
    if (ratio === "ldlHdl") {
      if (value < 2.0) return { text: "Healthy", color: "text-green-600" }
      if (value >= 2.0 && value <= 3.5) return { text: "Acceptable", color: "text-yellow-600" }
      return { text: "High Risk", color: "text-red-600" }
    }
    if (ratio === "tgHdl") {
      if (value < 2.0) return { text: "Ideal", color: "text-green-600" }
      if (value >= 2.0 && value <= 4.0) return { text: "Borderline High", color: "text-yellow-600" }
      return { text: "High Risk", color: "text-red-600" }
    }
    return { text: "", color: "" }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Cholesterol Ratio Calculator</CardTitle>
        <CardDescription>Enter your cholesterol values to assess your heart health.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calculateRatios)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mg/dL">mg/dL</SelectItem>
                          <SelectItem value="mmol/L">mmol/L</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalCholesterol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Cholesterol (TC)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder={`e.g., 180 ${form.watch("unit")}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hdl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HDL (Good Cholesterol)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder={`e.g., 65 ${form.watch("unit")}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ldl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LDL (Bad Cholesterol)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder={`e.g., 90 ${form.watch("unit")}`} {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">Leave blank to calculate automatically.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="triglycerides"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Triglycerides (TG)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder={`e.g., 120 ${form.watch("unit")}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Calculate Ratios
                </Button>
              </form>
            </Form>
          </div>

          <div className="mt-6 md:mt-0">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {results && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-center text-gray-800">Your Results</h3>
                {results.calculatedLdl && (
                  <div className="p-3 bg-blue-100 border-l-4 border-blue-500 rounded-md">
                    <p className="text-sm font-medium">
                      Estimated LDL Cholesterol: <span className="font-bold">{results.calculatedLdl} {form.watch("unit")}</span>
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Cholesterol / HDL Ratio</p>
                    <p className="text-2xl font-bold text-gray-900">{results.tcHdlRatio}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getInterpretation("tcHdl", parseFloat(results.tcHdlRatio)).color} bg-opacity-20`}>
                    {getInterpretation("tcHdl", parseFloat(results.tcHdlRatio)).text}
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <div>
                    <p className="text-sm font-medium text-gray-600">LDL / HDL Ratio</p>
                    <p className="text-2xl font-bold text-gray-900">{results.ldlHdlRatio}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getInterpretation("ldlHdl", parseFloat(results.ldlHdlRatio)).color} bg-opacity-20`}>
                    {getInterpretation("ldlHdl", parseFloat(results.ldlHdlRatio)).text}
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Triglyceride / HDL Ratio</p>
                    <p className="text-2xl font-bold text-gray-900">{results.tgHdlRatio}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getInterpretation("tgHdl", parseFloat(results.tgHdlRatio)).color} bg-opacity-20`}>
                    {getInterpretation("tgHdl", parseFloat(results.tgHdlRatio)).text}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <p className="text-sm font-medium text-gray-600">
                    Estimated VLDL: <span className="font-bold text-gray-900">{results.vldl} {form.watch("unit")}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}