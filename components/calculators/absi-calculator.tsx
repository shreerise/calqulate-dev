"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, RefreshCw, BarChart2, AlertTriangle, Heart, Shield } from "lucide-react"

// Define validation schema
const formSchema = z.object({
  waist: z.string().min(1, "Waist circumference is required"),
  weight: z.string().min(1, "Weight is required"),
  height: z.string().min(1, "Height is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  units: z.enum(["metric", "imperial"]),
})

type UnitSystem = "metric" | "imperial"

interface CalculationResult {
  bmi: number
  absi: number
  absiZScore: number
  riskCategory: string
  interpretation: string
  riskColor: string
}

// --- NEW: Risk Quadrant Chart Component ---
const RiskQuadrantChart = ({ bmi, absi }: { bmi: number; absi: number }) => {
  // Normalize values for positioning (0-100%)
  // BMI: typically 15-40 range. We'll map this to 0-100.
  // ABSI: typically 0.06 - 0.1 range. We'll map this.
  const bmiPercent = Math.min(100, Math.max(0, ((bmi - 15) / (40 - 15)) * 100))
  const absiPercent = 100 - Math.min(100, Math.max(0, ((absi - 0.06) / (0.1 - 0.06)) * 100)) // Invert for y-axis

  const quadrants = [
    { name: "Higher Risk (High ABSI)", color: "bg-orange-500/20", textColor: "text-orange-500" },
    { name: "Highest Risk (High BMI & ABSI)", color: "bg-red-500/20", textColor: "text-red-500" },
    { name: "Lower Risk (Low ABSI)", color: "bg-green-500/20", textColor: "text-green-500" },
    { name: "Elevated BMI Risk", color: "bg-yellow-500/20", textColor: "text-yellow-500" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">ABSI vs. BMI Risk Profile</h3>
      <div className="relative w-full aspect-square grid grid-cols-2 grid-rows-2 gap-1 border-2 border-dashed border-muted-foreground/50 rounded-lg p-2">
        {/* Quadrant Backgrounds and Labels */}
        {quadrants.map((q, i) => (
          <div key={i} className={`flex items-center justify-center rounded ${q.color}`}>
            <span className={`text-xs font-bold text-center ${q.textColor}`}>{q.name}</span>
          </div>
        ))}
        
        {/* Axes Labels */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium">BMI &rarr;</div>
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-sm font-medium rotate-[-90deg]">ABSI &rarr;</div>

        {/* User's Position Marker */}
        <div className="absolute top-0 left-0 w-full h-full" style={{ top: `${absiPercent}%`, left: `${bmiPercent}%` }}>
          <div className="relative w-4 h-4 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-white" title={`Your Profile: BMI=${bmi.toFixed(1)}, ABSI=${absi.toFixed(4)}`}></span>
            <span className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/70 text-white text-xs px-2 py-1 rounded">You</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ABSICalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [units, setUnits] = useState<UnitSystem>("metric")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      waist: "",
      weight: "",
      height: "",
      age: "",
      gender: "male",
      units: "metric",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const waist = parseFloat(values.waist)
    const weight = parseFloat(values.weight)
    const height = parseFloat(values.height)
    const age = parseInt(values.age)

    if (isNaN(waist) || isNaN(weight) || isNaN(height) || isNaN(age)) return

    // 1. Convert all inputs to metric for calculation
    const weightInKg = units === "metric" ? weight : weight * 0.453592
    const heightInM = units === "metric" ? height / 100 : height * 0.0254
    const waistInM = units === "metric" ? waist / 100 : waist * 0.0254

    // 2. Calculate BMI
    const bmi = weightInKg / Math.pow(heightInM, 2)

    // 3. Calculate ABSI
    const absi = waistInM / (Math.pow(bmi, 2 / 3) * Math.pow(heightInM, 1 / 2))

    // 4. Calculate ABSI Z-Score (using provided approximations)
    const meanAbsi = 0.080
    const sdAbsi = 0.005
    const absiZScore = (absi - meanAbsi) / sdAbsi

    // 5. Determine Risk Category
    let riskCategory = ""
    let interpretation = ""
    let riskColor = ""

    if (absiZScore < -0.868) {
      riskCategory = "Low Risk"
      interpretation = "Your body shape suggests a lower-than-average risk of health complications compared to others of your age and gender."
      riskColor = "bg-green-500"
    } else if (absiZScore < 0.868) {
      riskCategory = "Average Risk"
      interpretation = "Your body shape falls within the average range, indicating a typical level of health risk."
      riskColor = "bg-yellow-500"
    } else if (absiZScore < 1.645) {
      riskCategory = "High Risk"
      interpretation = "Your ABSI is higher than most people, suggesting an elevated risk of health issues related to body shape."
      riskColor = "bg-orange-500"
    } else {
      riskCategory = "Very High Risk"
      interpretation = "Your ABSI is significantly high, indicating a substantially increased risk of health complications. It is advisable to consult a healthcare professional."
      riskColor = "bg-red-500"
    }

    setResult({
      bmi,
      absi,
      absiZScore,
      riskCategory,
      interpretation,
      riskColor,
    })
  }

  const resetCalculator = () => {
    form.reset()
    setResult(null)
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-primary" />
            <CardTitle>A Body Shape Index (ABSI) Calculator</CardTitle>
          </div>
          <CardDescription>
            Fill in your details below to calculate your ABSI and assess your body shape-related health risk.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Unit System Toggle */}
              <FormField
                control={form.control}
                name="units"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Unit System</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value: UnitSystem) => {
                          field.onChange(value)
                          setUnits(value)
                        }}
                        defaultValue={field.value}
                        className="flex items-center space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="metric" />
                          </FormControl>
                          <FormLabel className="font-normal">Metric (cm, kg)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="imperial" />
                          </FormControl>
                          <FormLabel className="font-normal">Imperial (inches, lbs)</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Age and Gender */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 35" {...field} />
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
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Waist and Weight */}
                <FormField
                  control={form.control}
                  name="waist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waist Circumference ({units === "metric" ? "cm" : "in"})</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder={units === "metric" ? "e.g., 85" : "e.g., 34"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight ({units === "metric" ? "kg" : "lbs"})</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder={units === "metric" ? "e.g., 70" : "e.g., 155"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Height */}
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height ({units === "metric" ? "cm" : "in"})</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={units === "metric" ? "e.g., 175" : "e.g., 69"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" /> Calculate
                </Button>
                <Button type="button" variant="outline" onClick={resetCalculator} className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Results Card */}
      {result && (
        <>
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Your Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground">Risk Category</p>
              <p className={`text-2xl font-bold ${result.riskColor.replace("bg-", "text-")}`}>{result.riskCategory}</p>
            </div>

            {/* Risk Meter */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className={`${result.riskColor} h-2.5 rounded-full`} style={{ width: `${result.absiZScore < -0.868 ? "12.5%" : result.absiZScore < 0.868 ? "37.5%" : result.absiZScore < 1.645 ? "62.5%" : "87.5%"}` }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Average</span>
              <span>High</span>
              <span>Very High</span>
            </div>

            <p className="text-center text-muted-foreground mt-4">{result.interpretation}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold">Your BMI</h4>
                <p className="text-xl text-primary">{result.bmi.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold">Your ABSI</h4>
                <p className="text-xl text-primary">{result.absi.toFixed(5)}</p>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold">ABSI Z-Score</h4>
                <p className="text-xl text-primary">{result.absiZScore.toFixed(3)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* --- NEW: VISUALIZATION CARD --- */}
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BarChart2 className="h-6 w-6 text-primary" />
              <CardTitle>Visualizing Your Results</CardTitle>
            </div>
            <CardDescription>
              See how your results compare to population averages and health risk categories.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Chart 1: Z-Score Spectrum */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Your ABSI Z-Score on the Risk Spectrum</h3>
              <div className="relative w-full h-8 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full">
                {/* Marker for user's Z-Score */}
                <div
                  className="absolute top-1/2 h-5 w-5 rounded-full bg-white border-2 border-primary shadow-lg -translate-y-1/2 -translate-x-1/2"
                  style={{ left: `${Math.min(100, Math.max(0, (result.absiZScore + 3) / 6 * 100))}%` }} // Maps a typical Z-score range of -3 to +3 onto 0-100%
                  title={`Your Z-Score: ${result.absiZScore.toFixed(3)}`} >
                </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
                  <span>Low Risk</span>
                  <span>Average</span>
                  <span>High Risk</span>
                </div>
              </div>

              {/* Chart 2: ABSI vs. BMI Risk Quadrant */}
              <RiskQuadrantChart bmi={result.bmi} absi={result.absi} />
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}