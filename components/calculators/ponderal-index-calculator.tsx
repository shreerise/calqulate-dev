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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calculator, RefreshCw, Loader2, User, Baby } from "lucide-react"

// Define validation schema
const formSchema = z.object({
  weight: z.string().min(1, "Weight is required"),
  height: z.string().min(1, "Height is required"),
  userType: z.enum(["adult", "child"], { required_error: "Please select one" }),
  units: z.enum(["metric", "imperial"]),
})

type UnitSystem = "metric" | "imperial"
type UserType = "adult" | "child"

interface CalculationResult {
  pi: number
  category: string
  interpretation: string
  categoryColor: string
  userType: UserType
  unitLabel: string
}

// Data for ADULTS using PI = Weight (kg) / Height (m)³
const adultPiData = [
  { range: "< 11", status: "Underweight", notes: "Indicates body mass is lower than the healthy range for your height." },
  { range: "11 - 15", status: "Normal Weight", notes: "Congratulations! You fall within the healthy, balanced range." },
  { range: "> 15", status: "Overweight", notes: "Indicates body mass is higher than the healthy range for your height." },
];

// Data for CHILDREN using Corpulence Index = (Weight (g) / Height (cm)³) * 100
const childPiData = [
  { range: "< 2.2", status: "Underweight", notes: "Lower body density for height — may indicate thin build or undernutrition." },
  { range: "2.2 – 3.0", status: "Normal Weight", notes: "Healthy proportionality between height and weight for age." },
  { range: "> 3.0", status: "Overweight / Obese", notes: "Indicates higher body density — possible excess fat accumulation." },
];

const PonderalIndexCalculator = () => {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [units, setUnits] = useState<UnitSystem>("metric")
  const [isLoading, setIsLoading] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { weight: "", height: "", userType: "adult", units: "metric" },
  })

  // --- Conversion helpers ---
  const cmToInches = (cm: number) => cm / 2.54
  const inchesToCm = (inches: number) => inches * 2.54
  const kgToLbs = (kg: number) => kg * 2.20462
  const lbsToKg = (lbs: number) => lbs / 2.20462

  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentValues = form.getValues()
    const updatedValues: Record<string, any> = { ...currentValues }

    if (currentValues.height) {
      const h = parseFloat(currentValues.height)
      updatedValues.height = newUnit === "imperial" ? cmToInches(h).toFixed(1) : inchesToCm(h).toFixed(1)
    }

    if (currentValues.weight) {
      const wt = parseFloat(currentValues.weight)
      updatedValues.weight = newUnit === "imperial" ? kgToLbs(wt).toFixed(1) : lbsToKg(wt).toFixed(1)
    }

    updatedValues.units = newUnit
    form.reset(updatedValues)
    setUnits(newUnit)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    setTimeout(() => {
      const weightInput = parseFloat(values.weight)
      const heightInput = parseFloat(values.height)
      const userType = values.userType

      let pi: number;
      let category: string = "";
      let interpretation: string = "";
      let categoryColor: string = "";
      let unitLabel: string = "";

      if (userType === 'adult') {
        const weightInKg = units === "metric" ? weightInput : lbsToKg(weightInput);
        const heightInM = units === "metric" ? heightInput / 100 : inchesToCm(heightInput) / 100;
        
        pi = weightInKg / Math.pow(heightInM, 3);
        unitLabel = "kg/m³";

        if (pi < 11) {
            category = "Underweight";
            categoryColor = "text-blue-500";
            interpretation = adultPiData[0].notes;
        } else if (pi >= 11 && pi <= 15) {
            category = "Normal Weight";
            categoryColor = "text-green-500";
            interpretation = adultPiData[1].notes;
        } else { // pi > 15
            category = "Overweight";
            categoryColor = "text-red-500";
            interpretation = adultPiData[2].notes;
        }

      } else { // Child/Infant
        const weightInGrams = units === "metric" ? weightInput * 1000 : lbsToKg(weightInput) * 1000;
        const heightInCm = units === "metric" ? heightInput : inchesToCm(heightInput);

        // CORRECTED CHILD FORMULA: (Weight (g) / Height (cm)³) * 100
        pi = (weightInGrams / Math.pow(heightInCm, 3)) * 100;
        unitLabel = "Index Value"; // A neutral label for the scaled result

        if (pi < 2.2) {
            category = "Underweight";
            categoryColor = "text-blue-500";
            interpretation = childPiData[0].notes;
        } else if (pi >= 2.2 && pi <= 3.0) {
            category = "Normal Weight";
            categoryColor = "text-green-500";
            interpretation = childPiData[1].notes;
        } else { // pi > 3.0
            category = "Overweight / Obese";
            categoryColor = "text-red-500";
            interpretation = childPiData[2].notes;
        }
      }
      
      setResult({ pi, category, interpretation, categoryColor, userType, unitLabel });
      setIsLoading(false);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 500);
  }
  
  const resetCalculator = () => {
    form.reset();
    setResult(null);
  }

  const getSpectrumPosition = () => {
    if (!result) return '0%';
    const { userType, pi } = result;
    let value;
    if (userType === 'adult') {
        // Normalize adult PI (e.g., from 8 to 18)
        value = ((pi - 8) / (18 - 8)) * 100;
    } else {
        // Normalize child PI (e.g., from 1.8 to 3.5)
        value = ((pi - 1.8) / (3.5 - 1.8)) * 100;
    }
    return `${Math.min(100, Math.max(0, value))}%`;
  };

  return (
    <>
      <Card className="max-w-4xl mx-auto" id="calculator">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-primary" /> Ponderal Index (PI) Calculator
          </CardTitle>
          <CardDescription>
            Accurately assess body composition for adults and children using scientifically distinct formulas for each.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                 <FormField
                  control={form.control} name="userType" render={({ field }) => (
                    <FormItem className="space-y-3 md:col-span-2">
                      <FormLabel>1. Who are you calculating for?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4">
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl><RadioGroupItem value="adult" /></FormControl>
                            <FormLabel className="font-normal flex items-center gap-2"><User className="w-4 h-4" /> Adult</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl><RadioGroupItem value="child" /></FormControl>
                            <FormLabel className="font-normal flex items-center gap-2"><Baby className="w-4 h-4" /> Child / Infant</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control} name="units" render={({ field }) => (
                    <FormItem className="space-y-3 md:col-span-2">
                        <FormLabel>2. Choose your unit system</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={(value: UnitSystem) => { field.onChange(value); handleUnitChange(value); }} defaultValue={field.value} className="flex items-center space-x-4">
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl><RadioGroupItem value="metric" /></FormControl>
                              <FormLabel className="font-normal">Metric (kg, cm)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl><RadioGroupItem value="imperial" /></FormControl>
                              <FormLabel className="font-normal">Imperial (lbs, in)</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                  control={form.control} name="weight" render={({ field }) => (
                    <FormItem>
                      <FormLabel>3. Enter Weight ({units === 'metric' ? 'kg' : 'lbs'})</FormLabel>
                      <FormControl><Input type="number" step="0.1" placeholder={units === 'metric' ? "e.g., 70" : "e.g., 155"} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control} name="height" render={({ field }) => (
                    <FormItem>
                      <FormLabel>4. Enter Height ({units === 'metric' ? 'cm' : 'in'})</FormLabel>
                      <FormControl><Input type="number" step="0.1" placeholder={units === 'metric' ? "e.g., 175" : "e.g., 69"} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Calculator className="h-4 w-4 mr-2" />}
                  {isLoading ? 'Calculating...' : 'Calculate PI'}
                </Button>
                <Button type="button" variant="outline" onClick={resetCalculator} className="flex-1" disabled={isLoading}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div ref={resultsRef}>
        {result && (
            <Card className="max-w-4xl mx-auto mt-8">
                <CardHeader>
                    <CardTitle className="text-2xl">Your Ponderal Index Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="text-center p-6 rounded-lg bg-muted border">
                        <p className="text-base font-semibold text-muted-foreground">Your Ponderal Index ({result.unitLabel})</p>
                        <p className="text-5xl font-bold text-primary my-2">{result.pi.toFixed(3)}</p>
                        <p className={`text-2xl font-semibold ${result.categoryColor}`}>{result.category}</p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                        <h3 className="text-lg font-semibold mb-2">Interpretation</h3>
                        <p className="text-muted-foreground">{result.interpretation}</p>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4 text-center">Ponderal Index Reference Chart ({result.userType === 'adult' ? 'Adults' : 'Children'})</h3>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ponderal Index (PI) Range</TableHead>
                                    <TableHead>Weight Status</TableHead>
                                    <TableHead className="hidden md:table-cell">Notes</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(result.userType === 'adult' ? adultPiData : childPiData).map((row) => (
                                    <TableRow key={row.status} className={result.category.includes(row.status.split(' ')[0]) ? "bg-primary/10" : ""}>
                                        <TableCell className="font-medium">{row.range}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell className="hidden md:table-cell">{row.notes}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4 text-center">Your Result on the Health Spectrum</h3>
                        <div className="relative w-full h-4 bg-gradient-to-r from-blue-400 via-green-400 to-red-500 rounded-full">
                            <div className="absolute top-1/2 h-6 w-6 rounded-full bg-white border-2 border-primary shadow-lg -translate-y-1/2 -translate-x-1/2" style={{ left: getSpectrumPosition() }} title={`Your PI: ${result.pi.toFixed(2)}`}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">You</div>
                            </div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
                            <span>Underweight</span>
                            <span>Normal</span>
                            <span>Overweight</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
      </div>
    </>
  )
}

export default PonderalIndexCalculator