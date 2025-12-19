"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Activity, RefreshCw, Loader2, HeartPulse, AlertTriangle, CheckCircle2 } from "lucide-react";

// --- FORM SCHEMA ---
const formSchema = z.object({
  systolic: z.string().min(1, "Systolic BP is required.")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 300, "Enter a valid systolic value (0-300)."),
  diastolic: z.string().min(1, "Diastolic BP is required.")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 200, "Enter a valid diastolic value (0-200)."),
}).refine((data) => Number(data.systolic) > Number(data.diastolic), {
  message: "Systolic must be higher than diastolic.",
  path: ["systolic"], 
});

// --- RESULT INTERFACE ---
interface CalculationResult {
  map: number;
  category: "Low" | "Low Normal" | "Normal" | "High";
  description: string;
  color: string;
}

// --- VISUAL GAUGE COMPONENT ---
const MapGauge = ({ value }: { value: number }) => {
  // Scale mapping: 40 (min) to 130 (max) for visual purposes
  const min = 40;
  const max = 130;
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div className="mt-6 mb-2">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>Low (&lt;60)</span>
        <span>Normal (70-100)</span>
        <span>High (&gt;100)</span>
      </div>
      <div className="relative w-full h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
          {/* We need a specific gradient: Red (Low) -> Yellow -> Green (Normal) -> Red (High) */}
          {/* Overriding the simple gradient above with a specific CSS style for MAP */}
          <div 
            className="absolute inset-0 rounded-full opacity-90"
            style={{
                background: "linear-gradient(90deg, #ef4444 0%, #ef4444 22%, #eab308 25%, #22c55e 33%, #22c55e 66%, #ef4444 75%, #ef4444 100%)"
            }}
          ></div>
          
          {/* Indicator Dot */}
          <div 
            className="absolute top-1/2 h-6 w-6 rounded-full bg-white border-4 border-primary shadow-xl -translate-y-1/2 -translate-x-1/2 transition-all duration-700 ease-out" 
            style={{ left: `${percentage}%` }}
          ></div>
      </div>
      <div className="text-center mt-2 text-sm font-medium">
        Current MAP: {value.toFixed(1)} mmHg
      </div>
    </div>
  );
}

// --- MAIN CALCULATOR COMPONENT ---
export default function MAPCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { systolic: "", diastolic: "" },
  });

  const getMapCategory = (map: number): Omit<CalculationResult, 'map'> => {
    if (map < 60) {
        return {
            category: "Low",
            description: "A MAP below 60 mmHg indicates that vital organs may not be receiving enough blood (hypoperfusion). This can lead to shock or organ damage if not treated.",
            color: "text-red-600"
        };
    } else if (map >= 60 && map < 70) {
        return {
            category: "Low Normal",
            description: "This is on the lower end of the spectrum. While often sufficient for survival, it may be monitored closely in clinical settings.",
            color: "text-yellow-600"
        };
    } else if (map >= 70 && map <= 100) {
        return {
            category: "Normal",
            description: "Your MAP is within the healthy range. Your major organs (brain, kidneys, heart) are likely receiving adequate oxygen and blood flow.",
            color: "text-green-600"
        };
    } else {
        return {
            category: "High",
            description: "A MAP above 100 mmHg suggests high pressure in the arteries. While sometimes necessary to push blood to the brain in specific injuries, chronic high MAP strains the heart.",
            color: "text-red-600"
        };
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate slight delay for UX feel
    setTimeout(() => {
      const sbp = parseFloat(values.systolic);
      const dbp = parseFloat(values.diastolic);
      
      // MAP Formula: (SBP + 2*DBP) / 3
      const mapValue = (sbp + (2 * dbp)) / 3;
      
      const analysis = getMapCategory(mapValue);
      
      setResult({
        map: mapValue,
        ...analysis
      });

      setIsLoading(false);
      
      // Scroll to results
      setTimeout(() => { 
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
      }, 100);
    }, 600);
  }

  return (
    <>
      <Card className="max-w-xl mx-auto border-t-4 border-t-primary shadow-lg" id="map-calculator">
        <CardHeader className="bg-muted/10">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Activity className="w-6 h-6 text-primary" /> 
            Enter Blood Pressure
          </CardTitle>
          <CardDescription>
            Input your Systolic (top number) and Diastolic (bottom number) readings.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                {/* Systolic Input */}
                <FormField
                  control={form.control}
                  name="systolic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        Systolic <span className="text-xs text-muted-foreground">(Top)</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                            <Input type="number" placeholder="120" className="pr-12 text-lg" {...field} />
                            <span className="absolute right-3 top-2.5 text-xs text-muted-foreground font-medium">mmHg</span>
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
                      <FormLabel className="flex items-center gap-1">
                        Diastolic <span className="text-xs text-muted-foreground">(Bottom)</span>
                      </FormLabel>
                      <FormControl>
                         <div className="relative">
                            <Input type="number" placeholder="80" className="pr-12 text-lg" {...field} />
                            <span className="absolute right-3 top-2.5 text-xs text-muted-foreground font-medium">mmHg</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1 text-base" size="lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Activity className="h-5 w-5 mr-2" />}
                  {isLoading ? 'Calculating...' : 'Calculate MAP'}
                </Button>
                <Button 
                    type="button" 
                    variant="outline" 
                    size="lg" 
                    onClick={() => { form.reset(); setResult(null); }} 
                    disabled={isLoading}
                >
                    <RefreshCw className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div ref={resultsRef} className="scroll-mt-24">
        {result && (
          <Card className="max-w-xl mx-auto mt-6 border-2 border-primary/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="flex justify-between items-center">
                <span>Result Analysis</span>
                <span className={`text-sm px-3 py-1 rounded-full bg-muted font-normal ${result.color}`}>
                   {result.category} Risk
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              <div className="text-center space-y-1">
                  <p className="text-sm uppercase tracking-wide text-muted-foreground font-semibold">Mean Arterial Pressure</p>
                  <div className="flex items-end justify-center gap-2">
                      <span className="text-6xl font-extrabold text-foreground">{result.map.toFixed(0)}</span>
                      <span className="text-xl text-muted-foreground mb-2">mmHg</span>
                  </div>
              </div>

              {/* Visual Gauge */}
              <MapGauge value={result.map} />

              <div className="bg-muted/40 p-4 rounded-xl flex gap-3 items-start">
                  {result.category === 'Normal' ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                      <AlertTriangle className={`w-6 h-6 shrink-0 mt-0.5 ${result.color}`} />
                  )}
                  <div>
                      <h4 className={`font-semibold mb-1 ${result.color}`}>{result.category} Range</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                          {result.description}
                      </p>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                 <div className="text-center p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
                    <p className="text-xs text-muted-foreground">Systolic Input</p>
                    <p className="font-semibold text-lg">{form.getValues("systolic")} mmHg</p>
                 </div>
                 <div className="text-center p-3 rounded-lg border bg-card text-card-foreground shadow-sm">
                    <p className="text-xs text-muted-foreground">Diastolic Input</p>
                    <p className="font-semibold text-lg">{form.getValues("diastolic")} mmHg</p>
                 </div>
              </div>

            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}