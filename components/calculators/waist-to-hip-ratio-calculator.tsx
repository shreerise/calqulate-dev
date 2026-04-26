"use client"

import { useEffect, useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, RefreshCw, AlertCircle, Loader2, Info, Share2, Copy, CheckCircle2, HeartPulse, ShieldAlert, ChevronDown } from "lucide-react"

// --- Constants & Helpers ---
const IN_TO_CM = 2.54;

function parseNumberSafe(value?: string | null, fallback = NaN) {
  if (value === undefined || value === null) return fallback
  const v = Number(String(value).trim())
  return Number.isFinite(v) ? v : fallback
}

function round(v: number, p = 2) {
  if (!isFinite(v)) return NaN
  const f = Math.pow(10, p)
  return Math.round(v * f) / f
}

// --- Schema ---
const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  waist: z.string().min(1, "Waist circumference is required").refine(v => Number(v) > 0, { message: "Must be greater than 0" }),
  hip: z.string().min(1, "Hip circumference is required").refine(v => Number(v) > 0, { message: "Must be greater than 0" }),
  unit: z.enum(["cm", "in"]),
})

interface CalculationResult {
  whr: number;
  riskLevel: string;
  colorClass: string;
  gaugePercent: number;
  bodyShape: "Apple" | "Pear" | "Healthy";
  shapeDesc: string;
  healthTip: string;
  dietTip: string;
}

export default function WaistToHipRatioCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Smart default based on timezone (America -> inches, Rest -> cm)
  const [defaultUnit, setDefaultUnit] = useState<"in" | "cm">("cm")

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz.includes("America")) {
      setDefaultUnit("in")
      form.setValue("unit", "in")
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "female", // Defaulting to female as WHR is highly searched by women
      waist: "",
      hip: "",
      unit: "cm", // Will be overridden by useEffect if in USA
    },
  })

  // Watch unit to show correct placeholders
  const unitWatched = form.watch("unit")

  // --- Global Unit Conversion Logic ---
  const handleUnitChange = (newUnit: "cm" | "in") => {
    const curUnit = form.getValues("unit")
    if (newUnit === curUnit) return

    const waistStr = form.getValues("waist")
    const hipStr = form.getValues("hip")
    const waistVal = parseNumberSafe(waistStr)
    const hipVal = parseNumberSafe(hipStr)

    if (isFinite(waistVal) && waistVal > 0) {
      const convertedWaist = newUnit === "in" ? waistVal / IN_TO_CM : waistVal * IN_TO_CM
      form.setValue("waist", round(convertedWaist, 1).toString(), { shouldValidate: true })
    }
    
    if (isFinite(hipVal) && hipVal > 0) {
      const convertedHip = newUnit === "in" ? hipVal / IN_TO_CM : hipVal * IN_TO_CM
      form.setValue("hip", round(convertedHip, 1).toString(), { shouldValidate: true })
    }
    
    form.setValue("unit", newUnit)
  }

  // --- Calculation Logic ---
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setResult(null)

    setTimeout(() => {
      const waist = parseNumberSafe(values.waist)
      const hip = parseNumberSafe(values.hip)
      
      // WHR is a ratio, units cancel out, so no need to convert for calculation!
      const whr = round(waist / hip, 2)
      
      let riskLevel = ""
      let colorClass = ""
      let bodyShape: "Apple" | "Pear" | "Healthy" = "Healthy"
      let shapeDesc = ""
      let healthTip = ""
      let dietTip = ""

      // Logic based on WHO guidelines
      if (values.gender === "male") {
        if (whr < 0.90) {
          riskLevel = "Low Risk (Healthy)"
          colorClass = "text-green-600 dark:text-green-400 bg-green-50 border-green-200"
          bodyShape = "Healthy"
          shapeDesc = "Balanced fat distribution. Lower risk of cardiovascular diseases."
          healthTip = "Maintain your current fitness routine to keep visceral fat low."
          dietTip = "Keep up a balanced diet with adequate protein and fiber."
        } else if (whr >= 0.90 && whr <= 0.99) {
          riskLevel = "Moderate Risk"
          colorClass = "text-yellow-600 dark:text-yellow-400 bg-yellow-50 border-yellow-200"
          bodyShape = "Pear"
          shapeDesc = "Slight accumulation of abdominal fat. Monitor your health metrics."
          healthTip = "Incorporate 150 mins of moderate aerobic exercise weekly."
          dietTip = "Reduce refined carbs and sugars to prevent further fat storage."
        } else {
          riskLevel = "High Risk"
          colorClass = "text-red-600 dark:text-red-400 bg-red-50 border-red-200"
          bodyShape = "Apple"
          shapeDesc = "High abdominal/visceral fat. Increased risk of type 2 diabetes and heart disease."
          healthTip = "Focus on core strengthening and high-intensity interval training (HIIT)."
          dietTip = "Prioritize whole foods, lean proteins, and strictly limit processed foods."
        }
      } else { // Female
        if (whr < 0.80) {
          riskLevel = "Low Risk (Healthy)"
          colorClass = "text-green-600 dark:text-green-400 bg-green-50 border-green-200"
          bodyShape = "Pear"
          shapeDesc = "Fat is stored mainly in hips/thighs (subcutaneous), which carries lower health risks."
          healthTip = "Great job! Include strength training for bone density."
          dietTip = "Maintain a nutrient-dense diet rich in healthy fats and veggies."
        } else if (whr >= 0.80 && whr <= 0.84) {
          riskLevel = "Moderate Risk"
          colorClass = "text-yellow-600 dark:text-yellow-400 bg-yellow-50 border-yellow-200"
          bodyShape = "Healthy"
          shapeDesc = "Borderline abdominal fat. Time to be proactive about your lifestyle."
          healthTip = "Increase daily step count and add cardiovascular workouts."
          dietTip = "Watch portion sizes and reduce late-night snacking."
        } else {
          riskLevel = "High Risk"
          colorClass = "text-red-600 dark:text-red-400 bg-red-50 border-red-200"
          bodyShape = "Apple"
          shapeDesc = "Central obesity pattern. Higher risk for metabolic syndrome."
          healthTip = "Consult a physician. Start with daily brisk walking."
          dietTip = "Focus on an anti-inflammatory diet (like Mediterranean diet)."
        }
      }

      // Calculate gauge position (Min 0.6, Max 1.2 for visual scale)
      const minScale = 0.6
      const maxScale = 1.2
      let percent = ((whr - minScale) / (maxScale - minScale)) * 100
      percent = Math.max(0, Math.min(100, percent)) // Clamp between 0-100

      setResult({
        whr,
        riskLevel,
        colorClass,
        gaugePercent: percent,
        bodyShape,
        shapeDesc,
        healthTip,
        dietTip
      })

      setIsLoading(false)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }, 400) // slight delay for smooth UX transition
  }

  const resetCalculator = () => {
    form.reset()
    setResult(null)
  }

  const handleCopy = () => {
    if (!result) return
    const text = `My Waist-to-Hip Ratio is ${result.whr} (${result.riskLevel}). Check your health risk using this free calculator!`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
    if (!result) return
    const text = `Hey! I just checked my Waist-to-Hip Ratio. My score is ${result.whr} (${result.riskLevel}). Check your body fat distribution and health risk here: https://yourwebsite.com/whr-calculator`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      
      {/* Input Form Card */}
      <Card className="shadow-xl border-primary/10" id="calculator">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-8 border-b">
            <CardTitle className="flex items-center gap-2 text-3xl font-bold">
              <HeartPulse className="w-8 h-8 text-primary" /> 
              Waist-to-Hip Ratio Calculator
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Discover your body fat distribution and potential health risks. Used globally by fitness professionals in the USA, India, and beyond.
            </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3 flex-1">
                      <FormLabel className="text-base font-semibold">Biological Sex</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex space-x-4 bg-muted/30 p-2 rounded-lg border"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0 flex-1 justify-center p-2 rounded hover:bg-background transition-colors">
                            <FormControl><RadioGroupItem value="male" /></FormControl>
                            <FormLabel className="font-medium cursor-pointer text-base">Male</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0 flex-1 justify-center p-2 rounded hover:bg-background transition-colors">
                            <FormControl><RadioGroupItem value="female" /></FormControl>
                            <FormLabel className="font-medium cursor-pointer text-base">Female</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Global Unit Toggle */}
                <div className="flex-1 flex flex-col space-y-3">
                    <FormLabel className="text-base font-semibold">Measurement Unit</FormLabel>
                    <Select onValueChange={(val) => handleUnitChange(val as "cm" | "in")} value={form.watch("unit")}>
                      <SelectTrigger className="w-full h-12 text-base">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cm">Centimeters (cm) - Global / India</SelectItem>
                        <SelectItem value="in">Inches (in) - USA</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Waist */}
                <FormField control={form.control} name="waist" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base font-semibold">Waist Circumference</FormLabel>
                        <FormDescription className="text-xs mb-2">Measure at the narrowest part, just above the belly button.</FormDescription>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" step="0.1" className="h-14 text-lg pl-4 pr-12" placeholder={unitWatched === "in" ? "e.g., 32" : "e.g., 81"} {...field} />
                            <span className="absolute right-4 top-4 text-muted-foreground font-medium">{unitWatched}</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Hip */}
                <FormField control={form.control} name="hip" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-base font-semibold">Hip Circumference</FormLabel>
                        <FormDescription className="text-xs mb-2">Measure at the widest part of your buttocks/hips.</FormDescription>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" step="0.1" className="h-14 text-lg pl-4 pr-12" placeholder={unitWatched === "in" ? "e.g., 40" : "e.g., 102"} {...field} />
                            <span className="absolute right-4 top-4 text-muted-foreground font-medium">{unitWatched}</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" size="lg" className="flex-1 text-lg font-bold shadow-lg hover:shadow-xl transition-all" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-6 w-6 mr-2 animate-spin" /> : <Calculator className="h-6 w-6 mr-2" />}
                  {isLoading ? 'Calculating...' : 'Check Your Health Risk'}
                </Button>
                <Button type="button" size="lg" variant="outline" onClick={resetCalculator} className="sm:w-32" disabled={isLoading}>
                    <RefreshCw className="h-5 w-5 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div ref={resultsRef} className="scroll-mt-6">
        {result && (
          <Card className="border-primary/20 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 overflow-hidden">
            <CardHeader className={`text-center py-8 border-b ${result.colorClass.split(' ')[2]}`}> {/* Background color based on risk */}
                <CardTitle className="text-3xl font-extrabold uppercase tracking-tight">Your Result</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-8 pt-10">
                
                {/* Main Score Display */}
                <div className="flex flex-col items-center justify-center">
                    <div className="text-[5rem] font-black text-foreground leading-none tracking-tighter">
                        {result.whr}
                    </div>
                    <div className={`mt-4 px-6 py-2 rounded-full text-lg font-bold border ${result.colorClass}`}>
                       {result.riskLevel}
                    </div>
                </div>

                {/* Visual Gauge */}
                <div className="max-w-2xl mx-auto pt-6">
                  <div className="flex justify-between text-xs text-muted-foreground font-medium mb-2 px-1">
                    <span>Low Risk</span>
                    <span>High Risk</span>
                  </div>
                  <div className="relative h-4 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 shadow-inner">
                    <div 
                      className="absolute top-1/2 -mt-3 -ml-2 h-6 w-4 bg-white border-2 border-slate-800 rounded-sm shadow-md transition-all duration-1000 ease-out"
                      style={{ left: `${result.gaugePercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-1">
                    <span>0.6</span>
                    <span>0.8</span>
                    <span>1.0</span>
                    <span>1.2+</span>
                  </div>
                </div>

                {/* Personalized Insights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {/* Body Shape Info */}
                  <div className="bg-muted/40 p-6 rounded-2xl border">
                    <h4 className="text-lg font-bold flex items-center gap-2 mb-3">
                      {result.bodyShape === "Apple" ? "🍎" : result.bodyShape === "Pear" ? "🍐" : "⏳"} 
                      {result.bodyShape} Shape Dominant
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {result.shapeDesc}
                    </p>
                    <div className="mt-4 text-xs bg-background p-3 rounded-lg border">
                      <strong>Note:</strong> Fat stored around the belly (Apple) surrounds vital organs, posing a higher risk than fat stored around hips/thighs (Pear).
                    </div>
                  </div>

                  {/* Actionable Tips */}
                  <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h4 className="text-lg font-bold flex items-center gap-2 mb-4">
                      <ShieldAlert className="w-5 h-5 text-primary" /> Actionable Insights
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold">Fitness Recommendation</p>
                          <p className="text-xs text-muted-foreground">{result.healthTip}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold">Diet Recommendation</p>
                          <p className="text-xs text-muted-foreground">{result.dietTip}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Geo Comparison Data */}
                <div className="py-6 px-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h4 className="text-center font-semibold text-sm uppercase tracking-wider text-slate-500 mb-4">How you compare globally</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">🇺🇸 0.88</p>
                      <p className="text-xs text-slate-500">Avg. WHR in USA</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">🇮🇳 0.86</p>
                      <p className="text-xs text-slate-500">Avg. WHR in India</p>
                    </div>
                  </div>
                </div>

            </CardContent>

            {/* Share Footer */}
            <CardFooter className="bg-muted/30 flex flex-col sm:flex-row gap-4 p-6 justify-center border-t">
              <Button variant="outline" onClick={handleCopy} className="w-full sm:w-auto font-medium">
                {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copied!" : "Copy Result"}
              </Button>
              <Button onClick={handleWhatsAppShare} className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1DA851] text-white font-medium">
                <Share2 className="w-4 h-4 mr-2" /> Share on WhatsApp
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

    </div>
  )
}