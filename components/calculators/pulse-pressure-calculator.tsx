"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calculator, RefreshCw, Loader2, Activity, HeartPulse, Info, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// --- FORM SCHEMA ---
const formSchema = z.object({
  systolic: z.string().min(1, "Systolic pressure is required."),
  diastolic: z.string().min(1, "Diastolic pressure is required."),
}).refine((data) => {
  const sys = parseFloat(data.systolic);
  const dia = parseFloat(data.diastolic);
  return !isNaN(sys) && !isNaN(dia) && sys > dia;
}, {
  message: "Systolic must be higher than Diastolic.",
  path: ["systolic"], 
});

// --- RESULT TYPE INTERFACE ---
interface CalculationResult {
  pulsePressure: number;
  map: number; // Mean Arterial Pressure
  category: "Narrow" | "Normal" | "Wide" | "High Risk";
  description: string;
  recommendation: string;
  color: string;
}

// --- VISUAL COMPONENTS ---

const PulseGauge = ({ value }: { value: number }) => {
  // Scale: 0 to 100+ (Clamped at 120 for visual)
  // Ranges: <30 (Low/Blue), 30-40 (Low Normal), 40-60 (Ideal/Green), 60-80 (Elevated/Yellow), >80 (High/Red)
  
  const minScale = 10;
  const maxScale = 110;
  const range = maxScale - minScale;
  const position = Math.max(0, Math.min(100, ((value - minScale) / range) * 100));

  let labelColor = "text-green-600";
  if (value < 30) labelColor = "text-blue-600";
  else if (value > 60) labelColor = "text-orange-500";
  else if (value > 80) labelColor = "text-red-600";

  return (
    <div className="text-center mt-4">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>Narrow (&lt;30)</span>
        <span>Normal (40-60)</span>
        <span>Wide (&gt;60)</span>
      </div>
      <div className="relative w-full h-3 bg-gradient-to-r from-blue-300 via-green-400 to-red-500 rounded-full mb-2">
        {/* Markers for ideal range 40-60 */}
        <div className="absolute top-0 bottom-0 border-l border-white/50" style={{ left: '30%' }}></div>
        <div className="absolute top-0 bottom-0 border-l border-white/50" style={{ left: '50%' }}></div>
        
        {/* The Indicator Dot */}
        <div 
          className="absolute top-1/2 h-5 w-5 rounded-full bg-white border-4 border-primary shadow-lg -translate-y-1/2 -translate-x-1/2 transition-all duration-700 ease-out" 
          style={{ left: `${position}%` }}
        ></div>
      </div>
      <p className={`font-bold ${labelColor} mt-2`}>
        {value} mmHg
      </p>
    </div>
  )
}

// --- LOGIC ---

const calculatePulsePressure = (sys: number, dia: number): CalculationResult => {
  const pp = sys - dia;
  const map = dia + (pp / 3); // Standard MAP formula

  let category: CalculationResult['category'] = "Normal";
  let description = "";
  let recommendation = "";
  let color = "text-green-600";

  if (pp < 30) {
    category = "Narrow";
    color = "text-blue-600";
    description = "Your pulse pressure is considered low (narrow). This can sometimes indicate that the heart isn't pumping enough blood (low stroke volume).";
    recommendation = "Narrow pulse pressure can be seen in heart failure or significant blood loss. If this is persistent, consult a cardiologist.";
  } else if (pp >= 30 && pp <= 60) {
    category = "Normal";
    color = "text-green-600";
    description = "Your pulse pressure is within the healthy physiological range. This suggests good arterial elasticity and heart function.";
    recommendation = "Keep up with a heart-healthy lifestyle, including regular exercise and a balanced diet.";
  } else if (pp > 60 && pp <= 80) {
    category = "Wide";
    color = "text-orange-500";
    description = "Your pulse pressure is elevated. This is often an early sign of arterial stiffening (loss of elasticity in blood vessels).";
    recommendation = "Monitor your blood pressure regularly. Reducing sodium intake and regular cardio exercise may help.";
  } else {
    category = "High Risk";
    color = "text-red-600";
    description = "A significantly wide pulse pressure (>80 mmHg) is a strong predictor of heart events and suggests stiffening of the aorta.";
    recommendation = "This reading warrants medical attention. Please consult a healthcare professional to assess your cardiovascular risk factors.";
  }

  return { pulsePressure: pp, map, category, description, recommendation, color };
};

// --- COMPONENT ---

export default function PulsePressureCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { systolic: "", diastolic: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate calculation delay for UX
    setTimeout(() => {
      const sys = parseFloat(values.systolic);
      const dia = parseFloat(values.diastolic);
      
      const calcResult = calculatePulsePressure(sys, dia);
      setResult(calcResult);
      
      setIsLoading(false);
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }, 600);
  }

  return (
    <>
      <Card className="max-w-3xl mx-auto border-t-4 border-t-primary shadow-lg" id="calculator">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Activity className="w-6 h-6 text-red-500" /> Pulse Pressure Calculator
          </CardTitle>
          <CardDescription>
            Enter your blood pressure readings to calculate Pulse Pressure (PP).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                  {/* Systolic Input */}
                  <FormField 
                    control={form.control} 
                    name="systolic" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Systolic Pressure (Top Number)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="120" className="pl-9" {...field} />
                            <HeartPulse className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                            <span className="absolute right-3 top-3 text-xs text-muted-foreground">mmHg</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                  
                  {/* Diastolic Input */}
                  <FormField 
                    control={form.control} 
                    name="diastolic" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                           Diastolic Pressure (Bottom Number)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" placeholder="80" className="pl-9" {...field} />
                            <Activity className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                            <span className="absolute right-3 top-3 text-xs text-muted-foreground">mmHg</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" className="flex-1 text-lg h-12" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Calculator className="h-5 w-5 mr-2" />}
                  {isLoading ? 'Analyzing...' : 'Calculate Pulse Pressure'}
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => { form.reset(); setResult(null); }} disabled={isLoading}>
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div ref={resultsRef}>
        {result && (
          <Card className="max-w-3xl mx-auto mt-8 border-t-4 border-t-blue-500 shadow-xl bg-slate-50 dark:bg-slate-900/50">
            <CardContent className="p-6 md:p-8 space-y-6">
              
              {/* Header Result */}
              <div className="text-center space-y-2">
                  <p className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">Your Pulse Pressure</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-6xl font-extrabold text-primary">{result.pulsePressure}</span>
                    <span className="text-xl text-muted-foreground">mmHg</span>
                  </div>
                  <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold bg-white dark:bg-slate-800 border shadow-sm ${result.color}`}>
                    {result.category} Range
                  </div>
              </div>

              {/* Visual Gauge */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-sm">
                <h3 className="text-sm font-medium mb-4 text-center">Visual Indicator</h3>
                <PulseGauge value={result.pulsePressure} />
              </div>

              {/* MAP Result (Bonus) */}
              <div className="grid md:grid-cols-2 gap-4">
                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                       <Info className="w-4 h-4 text-blue-600" />
                       <h4 className="font-semibold text-blue-800 dark:text-blue-300">Interpretation</h4>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-200 leading-relaxed">
                      {result.description}
                    </p>
                 </div>

                 <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground mb-1 uppercase font-bold">Additional Metric</p>
                    <div className="flex items-center justify-between">
                       <span className="font-medium">Mean Arterial Pressure (MAP)</span>
                       <span className="font-bold text-xl">{result.map.toFixed(0)} mmHg</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                       This represents the average pressure in your arteries during one cardiac cycle. Normal range is typically 70-100 mmHg.
                    </p>
                 </div>
              </div>
              
              {/* Recommendation */}
              <Alert className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
                <HeartPulse className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800 dark:text-green-400">Health Tip</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-300">
                  {result.recommendation}
                </AlertDescription>
              </Alert>

              <div className="text-center">
                 <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                   <AlertTriangle className="w-3 h-3" />
                   Result is for informational purposes only. Consult a doctor for diagnosis.
                 </p>
              </div>

            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}