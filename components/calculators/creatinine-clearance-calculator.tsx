// components/calculator/creatinine-clearence-calcualtor.tsx
"use client"

import { useEffect, useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, RefreshCw, Activity, AlertCircle, Loader2, Info } from "lucide-react"

// --- helpers & constants ---
const MGDL_TO_UMOL = 88.4
const KG_TO_LBS = 2.20462
const PRECISION_WEIGHT = 1   // 1 decimal for weight
const PRECISION_SCR_MGDL = 2 // 2 decimals for mg/dL
const PRECISION_SCR_UMOL = 0 // integer for µmol/L
const PRECISION_BSA = 2
const PRECISION_BMI = 1

function parseNumberSafe(value?: string | null, fallback = NaN) {
  if (value === undefined || value === null) return fallback
  const v = Number(String(value).trim())
  return Number.isFinite(v) ? v : fallback
}

function kgToLbs(kg: number) {
  return kg * KG_TO_LBS
}
function lbsToKg(lbs: number) {
  return lbs / KG_TO_LBS
}
function mgdlToUmol(val: number) {
  return val * MGDL_TO_UMOL
}
function umolToMgdl(val: number) {
  return val / MGDL_TO_UMOL
}
function round(v: number, p = 2) {
  if (!isFinite(v)) return NaN
  const f = Math.pow(10, p)
  return Math.round(v * f) / f
}

// --- schema (height optional) ---
const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  age: z.string()
    .min(1, "Age is required")
    .refine(val => {
      const n = Number(val)
      return Number.isFinite(n) && n >= 18 && n <= 120
    }, { message: "Age must be between 18 and 120" }),
  weight: z.string().min(1, "Weight is required").refine(v => Number(v) > 0, { message: "Weight must be valid" }),
  creatinine: z.string().min(1, "Creatinine is required").refine(v => Number(v) > 0, { message: "Creatinine must be valid" }),
  weightUnit: z.enum(["kg", "lbs"]),
  creatinineUnit: z.enum(["mgdl", "umol"]),
  // NEW optional height fields
  height: z.string().optional(),
  heightUnit: z.enum(["cm", "in"]).optional(),
})

interface CalculationResult {
  crCl: number;
  bmi?: number;
  bsa?: number;
  stage: string;
  description: string;
  color: string;
}

// --- main component ---
export default function CreatinineClearanceCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const [calcError, setCalcError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "male",
      age: "",
      weight: "",
      creatinine: "",
      weightUnit: "kg",
      creatinineUnit: "mgdl",
      height: "",
      heightUnit: "cm",
    },
  })

  // watches for placeholders / UI; we'll not use direct watch for conversion logic
  const weightUnitWatched = form.watch("weightUnit")
  const creatinineUnitWatched = form.watch("creatinineUnit")
  const heightUnitWatched = form.watch("heightUnit")

  // --- conversion handlers that also update the input value live ---
  const handleWeightUnitChange = (newUnit: "kg" | "lbs") => {
    const curUnit = form.getValues("weightUnit")
    if (newUnit === curUnit) {
      form.setValue("weightUnit", newUnit)
      return
    }
    const curValStr = form.getValues("weight")
    const curVal = parseNumberSafe(curValStr)
    if (isFinite(curVal) && curVal > 0) {
      let converted = curVal
      if (newUnit === "lbs" && curUnit === "kg") converted = kgToLbs(curVal)
      else if (newUnit === "kg" && curUnit === "lbs") converted = lbsToKg(curVal)
      form.setValue("weight", round(converted, PRECISION_WEIGHT).toString(), { shouldValidate: true, shouldDirty: true })
    }
    form.setValue("weightUnit", newUnit)
  }

  const handleCreatinineUnitChange = (newUnit: "mgdl" | "umol") => {
    const curUnit = form.getValues("creatinineUnit")
    if (newUnit === curUnit) {
      form.setValue("creatinineUnit", newUnit)
      return
    }
    const curValStr = form.getValues("creatinine")
    const curVal = parseNumberSafe(curValStr)
    if (isFinite(curVal) && curVal > 0) {
      let converted = curVal
      if (newUnit === "umol" && curUnit === "mgdl") converted = mgdlToUmol(curVal)
      else if (newUnit === "mgdl" && curUnit === "umol") converted = umolToMgdl(curVal)
      const prec = newUnit === "umol" ? PRECISION_SCR_UMOL : PRECISION_SCR_MGDL
      form.setValue("creatinine", round(converted, prec).toString(), { shouldValidate: true, shouldDirty: true })
    }
    form.setValue("creatinineUnit", newUnit)
  }

  const handleHeightUnitChange = (newUnit: "cm" | "in") => {
    const curUnit = form.getValues("heightUnit")
    if (newUnit === curUnit) {
      form.setValue("heightUnit", newUnit)
      return
    }
    const curValStr = form.getValues("height")
    const curVal = parseNumberSafe(curValStr)
    if (isFinite(curVal) && curVal > 0) {
      let converted = curVal
      if (newUnit === "in" && curUnit === "cm") converted = curVal / 2.54
      else if (newUnit === "cm" && curUnit === "in") converted = curVal * 2.54
      form.setValue("height", round(converted, 1).toString(), { shouldValidate: true, shouldDirty: true })
    }
    form.setValue("heightUnit", newUnit)
  }

  // onSubmit with safe parsing and optional height handling
  function onSubmit(values: z.infer<typeof formSchema>) {
    setCalcError(null)
    setIsLoading(true)
    setResult(null)

    setTimeout(() => {
      // parse numeric inputs safely
      const age = parseNumberSafe(values.age)
      let weight = parseNumberSafe(values.weight)
      let creatinine = parseNumberSafe(values.creatinine)
      const weightUnit = values.weightUnit
      const creatUnit = values.creatinineUnit
      const heightProvided = values.height !== undefined && values.height !== ""
      const height = heightProvided ? parseNumberSafe(values.height) : NaN
      const heightUnit = values.heightUnit ?? "cm"

      // basic validation
      if (!isFinite(age) || age <= 0) {
        setCalcError("Please enter a valid age.")
        setIsLoading(false)
        return
      }
      if (!isFinite(weight) || weight <= 0) {
        setCalcError("Please enter a valid weight.")
        setIsLoading(false)
        return
      }
      if (!isFinite(creatinine) || creatinine <= 0) {
        setCalcError("Please enter a valid serum creatinine (> 0).")
        setIsLoading(false)
        return
      }

      // Convert to standard units: kg & mg/dL
      if (weightUnit === "lbs") weight = lbsToKg(weight)
      if (creatUnit === "umol") creatinine = umolToMgdl(creatinine)

      // Cockcroft-Gault (uses weight in kg and Scr in mg/dL)
      const isFemale = values.gender === "female"
      const cgBase = ((140 - age) * weight) / (72 * creatinine)
      let crCl = isFemale ? cgBase * 0.85 : cgBase

      // safety if something odd
      if (!isFinite(crCl) || crCl <= 0) {
        setCalcError("Unable to calculate with given inputs. Check values.")
        setIsLoading(false)
        return
      }

      // Optional BMI & BSA if height provided
      let bmi: number | undefined = undefined
      let bsa: number | undefined = undefined
      if (heightProvided && isFinite(height) && height > 0) {
        const heightCm = heightUnit === "in" ? height * 2.54 : height
        const heightM = heightCm / 100
        bmi = round(weight / (heightM * heightM), PRECISION_BMI)
        // DuBois BSA
        bsa = round(0.007184 * Math.pow(weight, 0.425) * Math.pow(heightCm, 0.725), PRECISION_BSA)
      }

      // round output for UI
      const crClRounded = round(crCl, 1)

      // Interpretation using KDIGO ranges but applied for CrCl here (simple rule-of-thumb)
      let stage = ""
      let description = ""
      let color = ""

      if (crClRounded >= 90) {
        stage = "Normal Kidney Function"
        description = "Your calculated clearance suggests normal or high kidney function."
        color = "text-green-600 dark:text-green-400"
      } else if (crClRounded >= 60) {
        stage = "Mild Impairment"
        description = "Slightly decreased kidney function. Monitor changes over time."
        color = "text-yellow-600 dark:text-yellow-400"
      } else if (crClRounded >= 30) {
        stage = "Moderate Impairment"
        description = "Moderately decreased kidney function. Medical consultation recommended."
        color = "text-orange-600 dark:text-orange-400"
      } else if (crClRounded >= 15) {
        stage = "Severe Impairment"
        description = "Severely decreased kidney function. Requires medical attention."
        color = "text-red-600 dark:text-red-400"
      } else {
        stage = "Kidney Failure"
        description = "Critical level. Immediate medical intervention is likely required."
        color = "text-red-700 dark:text-red-500 font-bold"
      }

      setResult({
        crCl: crClRounded,
        bmi: bmi,
        bsa: bsa,
        stage,
        description,
        color,
      })

      setIsLoading(false)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }, 350)
  }

  const resetCalculator = () => {
    form.reset()
    setResult(null)
    setCalcError(null)
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto shadow-lg" id="calculator">
        <CardHeader className="bg-muted/30 pb-8">
            <CardTitle className="flex items-center gap-2 text-2xl"><Activity className="w-6 h-6 text-primary" /> Creatinine Clearance Calculator</CardTitle>
            <CardDescription>Estimate kidney function (GFR) using the Cockcroft-Gault equation.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Gender Selection */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Biological Sex</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Age */}
                <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Age (years)</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 45" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Weight with Unit Toggle (uses conversion handler) */}
                <div className="flex gap-2">
                    <FormField control={form.control} name="weight" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Weight</FormLabel>
                            <FormControl><Input type="number" step="0.1" placeholder={weightUnitWatched === "kg" ? "e.g., 70" : "e.g., 154"} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormItem className="w-24">
                      <FormLabel>&nbsp;</FormLabel>
                      <Select onValueChange={(val) => handleWeightUnitChange(val as "kg" | "lbs")} defaultValue={form.getValues("weightUnit")}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="lbs">lbs</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                </div>

                {/* Optional Height field */}
                <div className="flex gap-2">
                  <FormField control={form.control} name="height" render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Height <span className="text-xs text-muted-foreground">(optional)</span></FormLabel>
                      <FormControl><Input type="number" step="0.1" placeholder={heightUnitWatched === "cm" ? "e.g., 175" : "e.g., 69"} {...field} /></FormControl>
                      <FormDescription className="text-xs text-muted-foreground">Provide height to view BMI and BSA (optional).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormItem className="w-24">
                    <FormLabel>&nbsp;</FormLabel>
                    <Select onValueChange={(val) => handleHeightUnitChange(val as "cm" | "in")} defaultValue={form.getValues("heightUnit") ?? "cm"}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="cm">cm</SelectItem>
                        <SelectItem value="in">in</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>

                {/* Creatinine with Unit Toggle */}
                <div className="flex gap-2 md:col-span-2">
                    <FormField control={form.control} name="creatinine" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Serum Creatinine</FormLabel>
                            <FormControl><Input type="number" step="0.01" placeholder={creatinineUnitWatched === "mgdl" ? "e.g., 1.2" : "e.g., 106"} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormItem className="w-32">
                      <FormLabel>&nbsp;</FormLabel>
                      <Select onValueChange={(val) => handleCreatinineUnitChange(val as "mgdl" | "umol")} defaultValue={form.getValues("creatinineUnit")}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                            <SelectItem value="mgdl">mg/dL</SelectItem>
                            <SelectItem value="umol">µmol/L</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                </div>
              </div>

              {calcError && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{calcError}</div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1 text-lg h-12" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Calculator className="h-5 w-5 mr-2" />}
                  {isLoading ? 'Calculating...' : 'Calculate Creatinine Clearance'}
                </Button>
                <Button type="button" variant="outline" onClick={resetCalculator} className="flex-1 h-12" disabled={isLoading}>
                    <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div ref={resultsRef}>
        {result && (
          <Card className="max-w-4xl mx-auto mt-8 border-primary/20 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl text-center">Your Estimated Creatinine Clearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                
                <div className="flex flex-col items-center justify-center py-6">
                    <div className="text-6xl font-extrabold text-primary tracking-tighter">
                        {result.crCl}
                    </div>
                    <div className="text-muted-foreground font-medium mt-1">mL/min</div>
                </div>

                {/* BMI & BSA cards: only show when present */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {typeof result.bmi !== "undefined" && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">BMI</div>
                      <div className="font-bold text-lg">{result.bmi?.toFixed(1)}</div>
                    </div>
                  )}
                  {typeof result.bsa !== "undefined" && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">BSA (m²)</div>
                      <div className="font-bold text-lg">{result.bsa?.toFixed(2)}</div>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-muted/50 rounded-xl border text-center">
                    <h4 className="text-sm uppercase tracking-wide text-muted-foreground font-semibold mb-2">Interpretation</h4>
                    <p className={`text-2xl font-bold ${result.color} mb-2`}>{result.stage}</p>
                    <p className="text-muted-foreground">{result.description}</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>
                        <strong>Note:</strong> This result is based on the Cockcroft-Gault equation. It is an estimation of Glomerular Filtration Rate (GFR). Do not use this calculator for dosing dangerous medications without consulting a medical professional.
                    </p>
                </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
