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
import { Calculator, RefreshCw, Loader2, Weight, Target } from "lucide-react"

// Define validation schema
const formSchema = z.object({
  weight: z.string().min(1, "Actual weight is required"),
  height: z.string().min(1, "Height is required"),
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  units: z.enum(["metric", "imperial"]),
})

type UnitSystem = "metric" | "imperial"

interface CalculationResult {
  idealBodyWeight: number
  adjustedBodyWeight: number
  actualWeight: number
}

export default function AdjustedBodyWeightCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [units, setUnits] = useState<UnitSystem>("metric")
  const [isLoading, setIsLoading] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { weight: "", height: "", gender: "male", units: "metric" },
  })
  
  // Conversion helpers
  const cmToInches = (cm: number) => cm / 2.54;
  const inchesToCm = (inches: number) => inches * 2.54;
  const kgToLbs = (kg: number) => kg * 2.20462;
  const lbsToKg = (lbs: number) => lbs / 2.20462;

  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentValues = form.getValues();
    const updatedValues: Record<string, any> = { ...currentValues };

    if (currentValues.height) {
      const h = parseFloat(currentValues.height);
      updatedValues.height =
        newUnit === "imperial" ? cmToInches(h).toFixed(1) : inchesToCm(h).toFixed(1);
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


  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    setTimeout(() => {
      const weight = parseFloat(values.weight)
      const height = parseFloat(values.height)
      const gender = values.gender

      const weightInKg = units === "metric" ? weight : lbsToKg(weight)
      const heightInCm = units === "metric" ? height : inchesToCm(height)
      const heightInInches = heightInCm / 2.54
      
      let idealBodyWeight = 0;
      const heightOver5FeetInches = Math.max(0, heightInInches - 60);

      if (gender === 'male') {
        idealBodyWeight = 50 + 2.3 * heightOver5FeetInches;
      } else { // female
        idealBodyWeight = 45.5 + 2.3 * heightOver5FeetInches;
      }

      let adjustedBodyWeight = idealBodyWeight;
      // AjBW formula is typically only applied if actual weight is >120% of IBW, but for a general calculator, we can show it regardless.
      if (weightInKg > idealBodyWeight) {
         adjustedBodyWeight = idealBodyWeight + 0.4 * (weightInKg - idealBodyWeight);
      } else {
        // If actual weight is less than or equal to ideal weight, AjBW is simply the actual weight.
        adjustedBodyWeight = weightInKg;
      }
      
      setResult({ 
        idealBodyWeight: units === 'metric' ? idealBodyWeight : kgToLbs(idealBodyWeight),
        adjustedBodyWeight: units === 'metric' ? adjustedBodyWeight : kgToLbs(adjustedBodyWeight),
        actualWeight: weight,
      })
      setIsLoading(false)

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100)
    }, 500)
  }

  const resetCalculator = () => {
    form.reset()
    setResult(null)
  }

  const resultUnit = units === 'metric' ? 'kg' : 'lbs';

  return (
    <>
      <Card className="max-w-4xl mx-auto" id="calculator">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Calculator className="w-6 h-6 text-primary" /> Adjusted Body Weight Calculator</CardTitle>
          <CardDescription>Enter your details to calculate your Ideal and Adjusted Body Weight using the Devine formula.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        <FormItem className="flex items-center space-x-2 space-y-0">
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
                <FormField control={form.control} name="gender" render={({ field }) => (<FormItem><FormLabel>Gender</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="height" render={({ field }) => (<FormItem><FormLabel>Height ({units === 'metric' ? 'cm' : 'in'})</FormLabel><FormControl><Input type="number" placeholder={units === 'metric' ? "e.g., 178" : "e.g., 70"} {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <FormField control={form.control} name="weight" render={({ field }) => (<FormItem><FormLabel>Actual Weight ({units === 'metric' ? 'kg' : 'lbs'})</FormLabel><FormControl><Input type="number" placeholder={units === 'metric' ? "e.g., 95" : "e.g., 210"} {...field} /></FormControl><FormMessage /></FormItem>)} />
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Calculator className="h-4 w-4 mr-2" />}
                  {isLoading ? 'Calculating...' : 'Calculate AjBW'}
                </Button>
                <Button type="button" variant="outline" onClick={resetCalculator} className="flex-1" disabled={isLoading}><RefreshCw className="h-4 w-4 mr-2" /> Reset</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div ref={resultsRef}>
        {result && (
          <Card className="max-w-4xl mx-auto mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">Your Body Weight Results</CardTitle>
              <CardDescription>Here is the breakdown of your weight metrics based on the information provided.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold text-muted-foreground">Actual Weight</h4>
                  <p className="text-3xl font-bold">{result.actualWeight} <span className="text-lg font-normal">{resultUnit}</span></p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold text-muted-foreground">Ideal Weight (IBW)</h4>
                  <p className="text-3xl font-bold">{result.idealBodyWeight.toFixed(1)} <span className="text-lg font-normal">{resultUnit}</span></p>
                </div>
                <div className="p-4 bg-primary/10 border-2 border-primary border-dashed rounded-lg">
                  <h4 className="font-semibold text-primary">Adjusted Weight (AjBW)</h4>
                  <p className="text-3xl font-bold text-primary">{result.adjustedBodyWeight.toFixed(1)} <span className="text-lg font-normal">{resultUnit}</span></p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2"><Target className="w-5 h-5" /> Interpretation</h3>
                <p className="text-muted-foreground mt-1">
                  Your <strong>Adjusted Body Weight of {result.adjustedBodyWeight.toFixed(1)} {resultUnit}</strong> is the recommended value for clinical calculations like nutritional planning or medication dosing. It provides a more accurate estimate of your metabolically active body mass compared to your actual weight. This value should be used under the guidance of a healthcare professional.
                </p>
              
                {/* Weight comparison table inserted as requested */}
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm text-left table-auto">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <th className="px-4 py-2">Weight Type</th>
                        <th className="px-4 py-2">Value</th>
                        <th className="px-4 py-2">Meaning / Insight</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-3 font-medium">Actual Body Weight (ABW)</td>
                        <td className="px-4 py-3">{result.actualWeight} {resultUnit}</td>
                        <td className="px-4 py-3">Your current total body weight, including fat, muscle, bone, and fluids. Used for general health and BMI calculations.</td>
                      </tr>
                      <tr className="border-t bg-gray-50 dark:bg-gray-900">
                        <td className="px-4 py-3 font-medium">Ideal Body Weight (IBW)</td>
                        <td className="px-4 py-3">{result.idealBodyWeight.toFixed(1)} {resultUnit}</td>
                        <td className="px-4 py-3">The theoretical healthy weight based on your height and gender — represents optimal body composition for most adults.</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-3 font-medium">Adjusted Body Weight (AjBW)</td>
                        <td className="px-4 py-3">{result.adjustedBodyWeight.toFixed(1)} {resultUnit}</td>
                        <td className="px-4 py-3">A clinically adjusted weight that blends actual and ideal weight (40% of excess added). Used for accurate drug dosing and nutritional planning in overweight cases.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}