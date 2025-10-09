// app/components/calculators/lean-body-mass-calculator.tsx

"use client"

import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calculator, RefreshCw, Loader2, Percent, BrainCircuit } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// --- Zod Validation Schema ---
const formSchema = z.object({
  sex: z.enum(["male", "female"], { required_error: "Sex is required." }),
  unitSystem: z.enum(["metric", "imperial"]),
  weight: z.string().min(1, "Weight is required."),
  height: z.string().optional(), // For metric, this holds cm
  heightFeet: z.string().optional(), // For imperial
  heightInches: z.string().optional(), // For imperial
  age: z.string().min(1, "Age is required.").refine(val => Number(val) >= 1, { message: "Age must be at least 1." }),
}).superRefine((data, ctx) => {
  // Custom validation for height
  if (data.unitSystem === "metric") {
    const heightCm = parseFloat(data.height || "")
    if (isNaN(heightCm) || heightCm <= 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please enter a valid height in cm.", path: ["height"] });
    }
  } else { // imperial
    const heightFt = parseFloat(data.heightFeet || "0")
    const heightIn = parseFloat(data.heightInches || "0")
    if ((heightFt <= 0 && heightIn <= 0) || heightIn >= 12 || heightIn < 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Enter a valid height (inches 0-11).", path: ["heightFeet"] });
    }
  }
  // Common validation for weight
  if (isNaN(parseFloat(data.weight)) || parseFloat(data.weight) <= 0) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please enter a valid weight.", path: ["weight"] });
  }
});

type FormInputs = z.infer<typeof formSchema>

// --- LBM Result Interface ---
interface LBMFormulaResults {
  boer: number | null
  hume: number | null
  james: number | null
  totalBodyWeightKg: number
  lbmPercentageBoer: number | null
  interpretation: string
}

// --- Main Calculator Component ---
export default function LeanBodyMassCalculator() {
  const [lbmResults, setLbmResults] = useState<LBMFormulaResults | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sex: "male",
      unitSystem: "metric",
      weight: "",
      height: "",
      heightFeet: "",
      heightInches: "",
      age: ""
    },
  })

  const unitSystem = form.watch("unitSystem")
  const age = parseInt(form.watch("age") || "0")

  // --- Conversion Helpers ---
    const cmToFeetInches = (cm: number) => {
      const totalInches = cm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = totalInches % 12;
      return { feet, inches: parseFloat(inches.toFixed(1)) };
    };

    const feetInchesToCm = (feet: number, inches: number) => (feet * 30.48) + (inches * 2.54);
    const kgToLbs = (kg: number) => kg * 2.20462;
    const lbsToKg = (lbs: number) => lbs / 2.20462;

    // --- Auto-convert when switching units ---
    const handleUnitChange = (newUnit: "metric" | "imperial") => {
      const currentValues = form.getValues();
      const updatedValues: Record<string, any> = { ...currentValues };

      // Convert weight
      if (currentValues.weight) {
        const w = parseFloat(currentValues.weight);
        if (!isNaN(w)) {
          updatedValues.weight =
            newUnit === "imperial" ? kgToLbs(w).toFixed(1) : lbsToKg(w).toFixed(1);
        }
      }

      // Convert height
      if (newUnit === "imperial" && currentValues.height) {
        const h = parseFloat(currentValues.height);
        if (!isNaN(h)) {
          const { feet, inches } = cmToFeetInches(h);
          updatedValues.heightFeet = feet.toString();
          updatedValues.heightInches = inches.toString();
          updatedValues.height = "";
        }
      } else if (newUnit === "metric" && (currentValues.heightFeet || currentValues.heightInches)) {
        const feet = parseFloat(currentValues.heightFeet || "0");
        const inches = parseFloat(currentValues.heightInches || "0");
        const cm = feetInchesToCm(feet, inches);
        updatedValues.height = cm.toFixed(1);
        updatedValues.heightFeet = "";
        updatedValues.heightInches = "";
      }

      updatedValues.unitSystem = newUnit;
      form.reset(updatedValues);
    };


  const calculateLBMFormulas = (weightKg: number, heightCm: number, sex: "male" | "female", age: number): LBMFormulaResults => {
    let boer: number | null = null, hume: number | null = null, james: number | null = null;

    if (age >= 15) { // Adult formulas are generally more accurate for ages 15+
      if (sex === "male") {
        boer = 0.407 * weightKg + 0.267 * heightCm - 19.2
        hume = (0.32810 * weightKg) + (0.33929 * heightCm) - 29.5336
        james = 1.1 * weightKg - 128 * Math.pow((weightKg / heightCm), 2)
      } else {
        boer = 0.252 * weightKg + 0.473 * heightCm - 48.3
        hume = (0.29569 * weightKg) + (0.41813 * heightCm) - 43.2933
        james = 1.07 * weightKg - 148 * Math.pow((weightKg / heightCm), 2)
      }
    }

    const lbmPercentageBoer = (boer && weightKg > 0) ? (boer / weightKg) * 100 : null

    // Dynamic Interpretation
    let interpretation = "Your Lean Body Mass has been calculated. Consult the content below for more details on what these numbers mean for your health and fitness goals."
    if (lbmPercentageBoer) {
      if (sex === 'male') {
        if (lbmPercentageBoer < 70) interpretation = "Your LBM percentage is on the lower side for a male, suggesting there is potential to build more muscle mass through resistance training and proper nutrition."
        else if (lbmPercentageBoer <= 90) interpretation = "Your LBM percentage is within a healthy and typical range for a male, indicating a solid foundation of lean tissue."
        else interpretation = "Your LBM percentage is very high, which is commonly seen in dedicated athletes and bodybuilders with very low body fat."
      } else { // female
        if (lbmPercentageBoer < 60) interpretation = "Your LBM percentage is on the lower side for a female, suggesting there is potential to build more muscle mass through resistance training and proper nutrition."
        else if (lbmPercentageBoer <= 80) interpretation = "Your LBM percentage is within a healthy and typical range for a female, indicating a solid foundation of lean tissue."
        else interpretation = "Your LBM percentage is very high, which is commonly seen in dedicated athletes and bodybuilders with very low body fat."
      }
    }
     if (age < 18) {
      interpretation = "For individuals under 18, LBM interpretation can differ significantly due to growth. The adult formulas used provide an estimate, but a consultation with a healthcare professional is recommended for personalized advice."
    }


    return {
      boer, hume, james,
      totalBodyWeightKg: weightKg,
      lbmPercentageBoer,
      interpretation,
    }
  }

  const onSubmit = async (values: FormInputs) => {
    setIsLoading(true)
    setLbmResults(null)

    const weightKg = values.unitSystem === "metric" ? parseFloat(values.weight) : parseFloat(values.weight) * 0.453592
    const heightCm = values.unitSystem === "metric" 
      ? parseFloat(values.height || "") 
      : (parseFloat(values.heightFeet || "0") * 30.48) + (parseFloat(values.heightInches || "0") * 2.54)

    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay

    const results = calculateLBMFormulas(weightKg, heightCm, values.sex, parseInt(values.age))
    setLbmResults(results)
    setIsLoading(false)

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100)
  }
  
  const getDisplayValue = (kgValue: number | null) => {
      if (kgValue === null) return "N/A";
      const value = unitSystem === "metric" ? kgValue : kgValue * 2.20462;
      return `${value.toFixed(1)} ${unitSystem === "metric" ? "kg" : "lbs"}`;
  }


  return (
    <>
      <Card className="max-w-4xl mx-auto" id="calculator">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calculator className="w-6 h-6 text-primary" /> Lean Body Mass Calculator</CardTitle>
          <CardDescription>
            Fill in your details to estimate your lean body mass (LBM) using multiple scientific formulas for a comprehensive view of your body composition.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control} name="unitSystem" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Unit System</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value: "metric" | "imperial") => {
                          field.onChange(value);
                          handleUnitChange(value);
                        }}
                        defaultValue={field.value}
                        className="flex items-center space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="metric" /></FormControl><FormLabel className="font-normal">Metric (kg, cm)</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="imperial" /></FormControl><FormLabel className="font-normal">Imperial (lbs, ft/in)</FormLabel></FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="sex" render={({ field }) => (<FormItem><FormLabel>Sex</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select sex" /></SelectTrigger></FormControl><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="age" render={({ field }) => (<FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" placeholder="e.g., 30" {...field} min="1" /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="weight" render={({ field }) => (<FormItem><FormLabel>Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</FormLabel><FormControl><Input type="number" placeholder={unitSystem === 'metric' ? "e.g., 70" : "e.g., 155"} {...field} min="1" step="0.1" /></FormControl><FormMessage /></FormItem>)} />
                
                {unitSystem === "metric" ? (
                  <FormField control={form.control} name="height" render={({ field }) => (<FormItem><FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" placeholder="e.g., 175" {...field} min="1" step="0.1" /></FormControl><FormMessage /></FormItem>)} />
                ) : (
                  <div className="grid grid-cols-2 gap-2"><FormField control={form.control} name="heightFeet" render={({ field }) => (<FormItem><FormLabel>Height (ft)</FormLabel><FormControl><Input type="number" placeholder="e.g., 5" {...field} min="0" /></FormControl><FormMessage /></FormItem>)} /><FormField control={form.control} name="heightInches" render={({ field }) => (<FormItem><FormLabel>Height (in)</FormLabel><FormControl><Input type="number" placeholder="e.g., 10" {...field} min="0" max="11" /></FormControl><FormMessage /></FormItem>)} /></div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" className="flex-1" disabled={isLoading}>{isLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Calculating...</> : <><Calculator className="h-4 w-4 mr-2" />Calculate LBM</>}</Button>
                <Button type="button" variant="outline" onClick={() => {form.reset(); setLbmResults(null);}} className="flex-1" disabled={isLoading}><RefreshCw className="h-4 w-4 mr-2" /> Reset</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div ref={resultsRef}>
        {lbmResults && (
          <Card className="max-w-4xl mx-auto mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">Your Lean Body Mass Results</CardTitle>
              <CardDescription>A detailed breakdown of your estimated LBM using various formulas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-4 rounded-lg bg-muted border">
                <p className="text-sm font-semibold text-muted-foreground">Your Estimated LBM (Boer Formula)</p>
                <p className="text-3xl font-bold text-primary">{getDisplayValue(lbmResults.boer)}</p>
                {lbmResults.lbmPercentageBoer !== null && (
                  <p className="text-lg font-medium text-muted-foreground mt-2 flex items-center justify-center gap-1">
                    <Percent className="h-4 w-4" /> {lbmResults.lbmPercentageBoer.toFixed(1)}% of Total Body Weight
                  </p>
                )}
              </div>
              
              {age < 18 && (
                 <Alert variant="default" className="bg-blue-100 border-blue-400 text-blue-800 dark:bg-blue-950 dark:border-blue-700 dark:text-blue-200">
                    <BrainCircuit className="h-4 w-4" />
                    <AlertTitle>Note for Younger Individuals</AlertTitle>
                    <AlertDescription>LBM calculations for individuals under 18 are complex due to growth. Our adult formulas provide an estimate, but specialized pediatric formulas or a professional assessment are recommended for precise results.</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"><h4 className="font-semibold">Boer Formula</h4><p className="text-2xl text-primary">{getDisplayValue(lbmResults.boer)}</p></div>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"><h4 className="font-semibold">Hume Formula</h4><p className="text-2xl text-primary">{getDisplayValue(lbmResults.hume)}</p></div>
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"><h4 className="font-semibold">James Formula</h4><p className="text-2xl text-primary">{getDisplayValue(lbmResults.james)}</p></div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Interpretation</h3>
                <p className="text-muted-foreground mt-1">{lbmResults.interpretation}</p>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-2 text-center">Your LBM Percentage Spectrum</h3>
                <div className="relative w-full h-8 bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 rounded-full">
                    {lbmResults.lbmPercentageBoer !== null && (
                      <div className="absolute top-1/2 h-5 w-5 rounded-full bg-white border-2 border-primary shadow-lg -translate-y-1/2 -translate-x-1/2" 
                           style={{ left: `${Math.min(100, Math.max(0, (lbmResults.lbmPercentageBoer - 40) / (95 - 40) * 100))}%` }}
                           title={`Your LBM Percentage: ${lbmResults.lbmPercentageBoer.toFixed(1)}%`}></div>
                    )}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
                    <span>Lower LBM %</span><span>Average</span><span>Higher LBM %</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}