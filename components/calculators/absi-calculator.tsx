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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, RefreshCw, BarChart2, Loader2, ArrowDown } from "lucide-react"

// Define validation schema
const formSchema = z.object({
  waist: z.string().min(1, "Waist circumference is required"),
  weight: z.string().min(1, "Weight is required"),
  height: z.string().min(1, "Height is required"),
  age: z.string().min(1, "Age is required").refine(val => Number(val) >= 18, { message: "Age must be 18 or older" }),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  units: z.enum(["metric", "imperial"]),
})

type UnitSystem = "metric" | "imperial"

interface CalculationResult {
  bmi: number
  absi: number
  whtr: number // NEW: Waist-to-Height Ratio
  absiZScore: number
  riskCategory: string
  interpretation: string
  riskColor: string
}

// --- NEW: More accurate, gender/age-specific ABSI reference data (approximated from studies) ---
const getAbsiReference = (age: number, gender: 'male' | 'female'): { mean: number; sd: number } => {
  if (gender === 'female') {
    if (age < 30) return { mean: 0.076, sd: 0.0045 };
    if (age < 50) return { mean: 0.079, sd: 0.0048 };
    return { mean: 0.083, sd: 0.0051 };
  } else { // male
    if (age < 30) return { mean: 0.077, sd: 0.0042 };
    if (age < 50) return { mean: 0.080, sd: 0.0046 };
    return { mean: 0.084, sd: 0.0050 };
  }
};

const RiskQuadrantChart = ({ bmi, absi }: { bmi: number; absi: number }) => {
  // ... [This component remains the same as it's already well-designed] ...
  const bmiPercent = Math.min(100, Math.max(0, ((bmi - 15) / (40 - 15)) * 100))
  const absiPercent = 100 - Math.min(100, Math.max(0, ((absi - 0.06) / (0.1 - 0.06)) * 100))

  const quadrants = [
    { name: "Higher Shape Risk (High ABSI)", color: "bg-orange-500/20", textColor: "text-orange-500" },
    { name: "Highest Risk (High BMI & ABSI)", color: "bg-red-500/20", textColor: "text-red-500" },
    { name: "Lower Overall Risk", color: "bg-green-500/20", textColor: "text-green-500" },
    { name: "Higher Mass Risk (High BMI)", color: "bg-yellow-500/20", textColor: "text-yellow-500" },
  ];
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 mt-4">ABSI vs. BMI Risk Profile</h3>
      <div className="relative w-full max-w-sm mx-auto aspect-square grid grid-cols-2 grid-rows-2 gap-1 border-2 border-dashed border-muted-foreground/50 rounded-lg p-2 mt-4">
        {quadrants.map((q, i) => (
          <div key={i} className={`flex items-center justify-center rounded ${q.color}`}>
            <span className={`text-xs font-bold text-center ${q.textColor}`}>{q.name}</span>
          </div>
        ))}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium">BMI &rarr;</div>
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-sm font-medium rotate-[-90deg]">ABSI &rarr;</div>
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
  // --- Conversion helpers ---
  const cmToInches = (cm: number) => cm / 2.54;
  const inchesToCm = (inches: number) => inches * 2.54;
  const kgToLbs = (kg: number) => kg * 2.20462;
  const lbsToKg = (lbs: number) => lbs / 2.20462;

  // --- Convert input values when switching systems ---
  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentValues = form.getValues();
    const updatedValues: Record<string, any> = { ...currentValues };

    if (currentValues.height) {
      const h = parseFloat(currentValues.height);
      updatedValues.height =
        newUnit === "imperial" ? cmToInches(h).toFixed(1) : inchesToCm(h).toFixed(1);
    }

    if (currentValues.waist) {
      const w = parseFloat(currentValues.waist);
      updatedValues.waist =
        newUnit === "imperial" ? cmToInches(w).toFixed(1) : inchesToCm(w).toFixed(1);
    }

    if (currentValues.weight) {
      const wt = parseFloat(currentValues.weight);
      updatedValues.weight =
        newUnit === "imperial" ? kgToLbs(wt).toFixed(1) : lbsToKg(wt).toFixed(1);
    }

    updatedValues.units = newUnit;
    form.reset(updatedValues);
    setUnits(newUnit);
  };

  const [isLoading, setIsLoading] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { waist: "", weight: "", height: "", age: "", gender: "male", units: "metric" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    setTimeout(() => { // Simulate calculation delay
        const waist = parseFloat(values.waist)
        const weight = parseFloat(values.weight)
        const height = parseFloat(values.height)
        const age = parseInt(values.age)
        const gender = values.gender

        const weightInKg = units === "metric" ? weight : weight * 0.453592
        const heightInCm = units === "metric" ? height : height * 2.54
        const heightInM = heightInCm / 100
        const waistInM = (units === "metric" ? waist : waist * 2.54) / 100

        const bmi = weightInKg / Math.pow(heightInM, 2)
        const absi = waistInM / (Math.pow(bmi, 2 / 3) * Math.pow(heightInM, 1 / 2))
        const whtr = waistInM / heightInM; // NEW: Calculate WHtR

        const { mean, sd } = getAbsiReference(age, gender); // NEW: Get accurate reference
        const absiZScore = (absi - mean) / sd

        let riskCategory = ""
        let interpretation = ""
        let riskColor = ""

        if (absiZScore < -0.868) {
            riskCategory = "Low Risk"
            riskColor = "bg-green-500"
        } else if (absiZScore < 0.868) {
            riskCategory = "Average Risk"
            riskColor = "bg-yellow-500"
        } else if (absiZScore < 1.645) {
            riskCategory = "High Risk"
            riskColor = "bg-orange-500"
        } else {
            riskCategory = "Very High Risk"
            riskColor = "bg-red-500"
        }
        
        // --- NEW: Dynamic, insightful interpretation ---
        const isBmiNormal = bmi >= 18.5 && bmi < 25;
        if (riskCategory.includes("High") && isBmiNormal) {
            interpretation = "Your result indicates a high central body fat concentration despite a normal BMI. This is often called 'normal weight obesity' and suggests a hidden health risk that BMI alone does not capture. Focusing on reducing waist circumference is important."
        } else if (riskCategory.includes("High") && !isBmiNormal) {
            interpretation = "Both your ABSI and BMI are in a high-risk range, indicating significant risk from both overall body mass and central fat distribution. A comprehensive lifestyle approach is strongly recommended."
        } else if (!riskCategory.includes("High") && !isBmiNormal) {
            interpretation = "While your ABSI score is in a healthier range, your BMI is elevated. This may suggest higher muscle mass, but it's still important to maintain a healthy body composition. Consult a professional for a full assessment."
        } else {
            interpretation = "Your results suggest your body shape and composition present a low to average health risk compared to the general population. Continue maintaining a healthy lifestyle."
        }


        setResult({ bmi, absi, whtr, absiZScore, riskCategory, interpretation, riskColor })
        setIsLoading(false)

        setTimeout(() => { // Scroll after state update
            resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100)
    }, 500); // 500ms delay
  }

  const resetCalculator = () => {
    form.reset()
    setResult(null)
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto" id="calculator">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calculator className="w-6 h-6 text-primary" /> A Body Shape Index (ABSI) Calculator</CardTitle>
            <CardDescription>Fill in your details below to calculate your ABSI, WHtR, and BMI to assess your body shape-related health risk.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* --- Form fields remain the same --- */}
              <FormField
                control={form.control} name="units" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Unit System</FormLabel>
                    <FormControl>
                      <RadioGroup
                          onValueChange={(value: UnitSystem) => {
                            field.onChange(value);
                            handleUnitChange(value);
                          }}
                          defaultValue={field.value}
                          className="flex items-center space-x-4"
                        >

                        <FormItem   className="flex items-center space-x-2 space-y-0">
                          <FormControl><RadioGroupItem value="metric" /></FormControl>
                          <FormLabel className="font-normal">Metric (cm, kg)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl><RadioGroupItem value="imperial" /></FormControl>
                          <FormLabel className="font-normal">Imperial (inches, lbs)</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="age" render={({ field }) => (<FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" placeholder="e.g., 35" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="gender" render={({ field }) => (<FormItem><FormLabel>Gender</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="waist" render={({ field }) => (<FormItem><FormLabel>Waist Circumference ({units === 'metric' ? 'cm' : 'in'})</FormLabel><FormControl><Input type="number" placeholder={units === 'metric' ? "e.g., 85" : "e.g., 34"} {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="weight" render={({ field }) => (<FormItem><FormLabel>Weight ({units === 'metric' ? 'kg' : 'lbs'})</FormLabel><FormControl><Input type="number" placeholder={units === 'metric' ? "e.g., 70" : "e.g., 155"} {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <FormField control={form.control} name="height" render={({ field }) => (<FormItem><FormLabel>Height ({units === 'metric' ? 'cm' : 'in'})</FormLabel><FormControl><Input type="number" placeholder={units === 'metric' ? "e.g., 175" : "e.g., 69"} {...field} /></FormControl><FormMessage /></FormItem>)} />
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Calculator className="h-4 w-4 mr-2" />}
                  {isLoading ? 'Calculating...' : 'Calculate ABSI'}
                </Button>
                <Button type="button" variant="outline" onClick={resetCalculator} className="flex-1" disabled={isLoading}><RefreshCw className="h-4 w-4 mr-2" /> Reset</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* --- NEW: Unified & Enhanced Results Block --- */}
      <div ref={resultsRef}>
        {result && (
          <Card className="max-w-4xl mx-auto mt-8">
            <CardHeader>
                <CardTitle className="text-2xl">Your Health Snapshot</CardTitle>
                <CardDescription>Here is a detailed breakdown of your results, including dynamic visualizations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center p-4 rounded-lg bg-muted border">
                  <p className="text-sm font-semibold text-muted-foreground">Your ABSI-Based Risk Category is</p>
                  <p className={`text-3xl font-bold ${result.riskColor.replace("bg-", "text-")}`}>{result.riskCategory}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"><h4 className="font-semibold">Your BMI</h4><p className="text-2xl text-primary">{result.bmi.toFixed(2)}</p></div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"><h4 className="font-semibold">Your ABSI</h4><p className="text-2xl text-primary">{result.absi.toFixed(5)}</p></div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"><h4 className="font-semibold">Your WHtR</h4><p className="text-2xl text-primary">{result.whtr.toFixed(3)}</p><p className="text-xs text-muted-foreground">{result.whtr > 0.5 ? 'High Risk' : 'Healthy'}</p></div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Interpretation</h3>
                    <p className="text-muted-foreground mt-1">{result.interpretation}</p>
                </div>
                
                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-2 text-center">Your ABSI Z-Score on the Risk Spectrum</h3>
                    <div className="relative w-full h-8 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full">
                        <div className="absolute top-1/2 h-5 w-5 rounded-full bg-white border-2 border-primary shadow-lg -translate-y-1/2 -translate-x-1/2" style={{ left: `${Math.min(100, Math.max(0, (result.absiZScore + 3) / 6 * 100))}%` }} title={`Your Z-Score: ${result.absiZScore.toFixed(3)}`}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
                        <span>Low Risk</span><span>Average</span><span>High Risk</span>
                    </div>
                </div>

                <div className="border-t pt-6">
                  <RiskQuadrantChart bmi={result.bmi} absi={result.absi} />
                </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}