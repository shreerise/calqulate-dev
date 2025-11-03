"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, RefreshCw, Loader2, Sparkles, Shirt, HeartPulse } from "lucide-react";

// --- FORM SCHEMA ---
const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
  bust: z.string().min(1, "Bust measurement is required."),
  waist: z.string().min(1, "Waist measurement is required."),
  highHips: z.string().min(1, "High Hip measurement is required."),
  hips: z.string().min(1, "Hip measurement is required."),
  units: z.enum(["metric", "imperial"]),
});

type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";
type MeasurementField = "bust" | "waist" | "highHips" | "hips";

// --- RESULT TYPE INTERFACE ---
interface CalculationResult {
  bodyShape: string;
  description: string;
  styleTips: string[];
  healthInsights: string;
  whr: number;
  measurements: { bust: number, waist: number, hips: number };
}

// --- VISUAL COMPONENTS ---

const WHRGauge = ({ whr, gender }: { whr: number, gender: Gender }) => {
  const limits = gender === 'female' ? { low: 0.80, moderate: 0.85, scaleMin: 0.65, scaleMax: 1.0 } : { low: 0.95, moderate: 1.0, scaleMin: 0.8, scaleMax: 1.15 };
  let risk = "Low Risk";
  let color = "text-green-600";
  
  if (whr > limits.moderate) {
    risk = "High Risk";
    color = "text-red-600";
  } else if (whr > limits.low) {
    risk = "Moderate Risk";
    color = "text-yellow-600";
  }
  
  const range = limits.scaleMax - limits.scaleMin;
  const position = Math.max(0, Math.min(100, ((whr - limits.scaleMin) / range) * 100));

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground">Waist-to-Hip Ratio (WHR) Health Risk</p>
      <div className="relative w-full h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full my-2">
          <div className="absolute top-1/2 h-4 w-4 rounded-full bg-white border-2 border-primary shadow-lg -translate-y-1/2 -translate-x-1/2" style={{ left: `${position}%` }}></div>
      </div>
      <p className={`font-bold ${color}`}>{risk}</p>
      <p className="text-xs text-muted-foreground mt-1">Based on WHO guidelines for {gender}.</p>
    </div>
  )
}

const ProportionChart = ({ measurements, units }: { measurements: { bust: number, waist: number, hips: number }, units: UnitSystem }) => {
  const { bust, waist, hips } = measurements;
  const maxVal = Math.max(bust, waist, hips);

  const renderBar = (label: string, value: number) => (
    <div className="flex items-center gap-2">
      <span className="w-12 text-sm font-medium text-muted-foreground">{label}</span>
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative">
        <div className="bg-primary/90 h-full rounded-full" style={{ width: `${(value / maxVal) * 100}%` }}></div>
      </div>
      <span className="w-16 text-right text-sm font-semibold">{value.toFixed(1)} {units === 'metric' ? 'cm' : 'in'}</span>
    </div>
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-center md:text-left">Your Proportions</h3>
      <div className="space-y-3">
        {renderBar("Bust", bust)}
        {renderBar("Waist", waist)}
        {renderBar("Hips", hips)}
      </div>
    </div>
  )
}


// --- CALCULATION LOGIC ---

const getFemaleBodyShape = (bust: number, waist: number, highHips: number, hips: number): Omit<CalculationResult, 'whr' | 'measurements'> => {
  if (hips / bust >= 1.2 && highHips / hips < 0.9) {
      return {
          bodyShape: "Spoon",
          description: "Your hips are larger than your bust and you have a defined waist. You may have a 'shelf' on your high hips.",
          styleTips: ["Wear tops with details around the bust and shoulders.", "Choose A-line skirts and bootcut or flared pants.", "Accentuate your waistline."],
          healthInsights: "Similar to the Pear shape, this body type is generally associated with a lower risk of metabolic diseases. Maintaining a healthy weight is important for joint health."
      };
  } else if (hips / bust >= 1.05) {
      return {
          bodyShape: "Pear (Triangle)",
          description: "Your hips are wider than your bust, and you have a well-defined waist.",
          styleTips: ["Wear bright colors and patterns on top to draw attention upward.", "Choose A-line skirts and dresses.", "Opt for darker colors on your lower half."],
          healthInsights: "This body shape is generally associated with a lower risk of metabolic diseases compared to the apple shape. However, excess weight can put pressure on joints."
      };
  } else if (bust / hips >= 1.05) {
      return {
          bodyShape: "Apple (Inverted Triangle)",
          description: "Your shoulders and bust are larger than your hips, with a less defined waist.",
          styleTips: ["Wear V-necks to elongate your torso.", "Choose A-line skirts to create balance.", "Opt for straight-leg pants."],
          healthInsights: "Carrying more weight around the midsection can be associated with a higher risk of heart disease and type 2 diabetes. Focusing on a balanced diet and regular exercise is beneficial."
      };
  } else if (Math.abs(bust - hips) / hips < 0.05 && waist / Math.min(bust, hips) < 0.75) {
      return {
          bodyShape: "Hourglass",
          description: "You have a defined waist, and your bust and hip measurements are nearly equal.",
          styleTips: ["Wear fitted clothing that accentuates your curves.", "Choose wrap dresses and high-waisted skirts.", "Use belts to highlight your waist."],
          healthInsights: "The hourglass shape is often considered balanced. Maintaining a healthy weight is key to overall well-being."
      };
  } else {
      return {
          bodyShape: "Rectangle",
          description: "Your bust, waist, and hip measurements are fairly uniform, giving you a straighter silhouette.",
          styleTips: ["Create the illusion of curves with peplum tops and A-line skirts.", "Use belts to cinch in your waist.", "Layer your clothing to add dimension."],
          healthInsights: "Individuals with a rectangle shape may have a leaner build. It's important to focus on bone health through weight-bearing exercises."
      };
  }
};
const getMaleBodyShape = (bust: number, waist: number, hips: number): Omit<CalculationResult, 'whr' | 'measurements'> => { /* ... Add male logic here ... */ return { bodyShape: "Trapezoid", description: "...", styleTips: [], healthInsights: "" } };


// --- MAIN CALCULATOR COMPONENT ---

export default function BodyShapeCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { gender: "female", bust: "", waist: "", highHips: "", hips: "", units: "metric" },
  });

  const { getValues, setValue } = form;
  const units = form.watch("units");
  const gender = form.watch("gender");

  // --- NEW: Unit Conversion Handler ---
  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;

    const fields: MeasurementField[] = ["bust", "waist", "highHips", "hips"];
    const conversionFactor = 2.54;

    fields.forEach(field => {
      const currentValue = getValues(field);
      if (currentValue && !isNaN(parseFloat(currentValue))) {
        const valueInCm = newUnit === 'imperial' ? parseFloat(currentValue) : parseFloat(currentValue) * conversionFactor;
        const valueInInches = newUnit === 'metric' ? parseFloat(currentValue) : parseFloat(currentValue) / conversionFactor;

        const newValue = newUnit === 'metric' ? valueInInches : valueInCm;
        const convertedValue = newUnit === 'metric' ? newValue * conversionFactor : newValue / conversionFactor;

        setValue(field, convertedValue.toFixed(1));
      }
    });
    setValue("units", newUnit);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      const toCm = (val: string) => values.units === 'metric' ? parseFloat(val) : parseFloat(val) * 2.54;
      const bustCm = toCm(values.bust);
      const waistCm = toCm(values.waist);
      const highHipsCm = toCm(values.highHips);
      const hipsCm = toCm(values.hips);

      const whr = waistCm / hipsCm;
      let shapeResult;
      if (values.gender === "female") {
        shapeResult = getFemaleBodyShape(bustCm, waistCm, highHipsCm, hipsCm);
      } else {
        shapeResult = getMaleBodyShape(bustCm, waistCm, hipsCm);
      }
      
      const displayUnits = {
        bust: parseFloat(values.bust),
        waist: parseFloat(values.waist),
        hips: parseFloat(values.hips)
      };

      setResult({ ...shapeResult, whr, measurements: displayUnits });
      setIsLoading(false);
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }, 500);
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto" id="calculator">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" /> Body Shape & WHR Calculator</CardTitle>
          <CardDescription>Enter your measurements below to find your body shape and calculate your Waist-to-Hip ratio.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <FormField control={form.control} name="gender" render={({ field }) => (<FormItem><FormLabel>Gender</FormLabel><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4 pt-2"><FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="female" /></FormControl><FormLabel className="font-normal">Female</FormLabel></FormItem><FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="male" /></FormControl><FormLabel className="font-normal">Male</FormLabel></FormItem></RadioGroup></FormItem>)} />
                  <FormField control={form.control} name="units" render={({ field }) => (<FormItem><FormLabel>Units</FormLabel><RadioGroup onValueChange={(value) => handleUnitChange(value as UnitSystem)} value={field.value} className="flex items-center space-x-4 pt-2"><FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="metric" /></FormControl><FormLabel className="font-normal">Metric (cm)</FormLabel></FormItem><FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="imperial" /></FormControl><FormLabel className="font-normal">Imperial (in)</FormLabel></FormItem></RadioGroup></FormItem>)} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <FormField control={form.control} name="bust" render={({ field }) => (<FormItem><FormLabel>Bust / Chest</FormLabel><FormControl><Input type="number" step="0.1" placeholder={units === 'metric' ? "90" : "36"} {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="waist" render={({ field }) => (<FormItem><FormLabel>Waist</FormLabel><FormControl><Input type="number" step="0.1" placeholder={units === 'metric' ? "70" : "28"} {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="highHips" render={({ field }) => (<FormItem><FormLabel>High Hips</FormLabel><FormControl><Input type="number" step="0.1" placeholder={units === 'metric' ? "80" : "32"} {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="hips" render={({ field }) => (<FormItem><FormLabel>Hips</FormLabel><FormControl><Input type="number" step="0.1" placeholder={units === 'metric' ? "95" : "38"} {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1" size="lg" disabled={isLoading}>{isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Calculator className="h-4 w-4 mr-2" />}{isLoading ? 'Calculating...' : 'Find My Body Shape'}</Button>
                <Button type="button" variant="outline" size="lg" onClick={() => { form.reset(); setResult(null); }} className="flex-1" disabled={isLoading}><RefreshCw className="h-4 w-4 mr-2" /> Reset</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div ref={resultsRef}>
        {result && (
          <Card className="max-w-4xl mx-auto mt-8">
            <CardContent className="p-6 md:p-8 space-y-8">
              <div className="text-center">
                  <p className="text-sm font-semibold text-muted-foreground">Your Body Shape is</p>
                  <p className="text-5xl font-bold text-primary">{result.bodyShape}</p>
                  <p className="max-w-md mx-auto text-muted-foreground mt-1">{result.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center border-t pt-8">
                  <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-center flex items-center justify-center gap-2"><HeartPulse className="w-5 h-5" /> Your Waist-to-Hip Ratio (WHR)</h3>
                      <p className="text-7xl font-bold text-center">{result.whr.toFixed(2)}</p>
                      <WHRGauge whr={result.whr} gender={gender} />
                  </div>
                  <ProportionChart measurements={result.measurements} units={units} />
              </div>

              <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3"><Shirt className="w-5 h-5 text-primary" /> Style Recommendations</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {result.styleTips.map((tip, index) => (<li key={index}>{tip}</li>))}
                  </ul>
              </div>

              <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3"><HeartPulse className="w-5 h-5 text-red-500" /> Health Insights</h3>
                  <p className="text-muted-foreground">{result.healthInsights}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}