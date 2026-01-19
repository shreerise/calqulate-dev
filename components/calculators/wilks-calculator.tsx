"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, RefreshCw, Loader2, Dumbbell, Trophy, Scale, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- FORM SCHEMA ---
const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
  bodyWeight: z.string().min(1, "Body weight is required."),
  totalWeight: z.string().optional(), // Used for Simple Mode
  squat: z.string().optional(),       // Used for Detailed Mode
  bench: z.string().optional(),       // Used for Detailed Mode
  deadlift: z.string().optional(),    // Used for Detailed Mode
  units: z.enum(["metric", "imperial"]),
  mode: z.enum(["simple", "detailed"]),
}).refine((data) => {
  if (data.mode === "simple") {
    return !!data.totalWeight && data.totalWeight.length > 0;
  }
  return (!!data.squat && !!data.bench && !!data.deadlift);
}, {
  message: "Please enter your lift numbers.",
  path: ["totalWeight"], // Attach error to totalWeight for simplicity
});

type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";

interface CalculationResult {
  wilksScore: number;
  totalLifted: number;
  category: string;
  percentileText: string;
  categoryColor: string;
}

// --- VISUAL COMPONENTS ---

const StrengthGauge = ({ score }: { score: number }) => {
  // Scale: 0 to 600 (World class is usually 500-600)
  const maxScore = 600;
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));

  let label = "Beginner";
  if (score > 500) label = "World Class";
  else if (score > 450) label = "Elite";
  else if (score > 400) label = "Advanced";
  else if (score > 350) label = "Intermediate";
  else if (score > 300) label = "Novice";
  else if (score > 200) label = "Untrained";

  return (
    <div className="mt-6 space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span>Untrained</span>
        <span>Elite</span>
      </div>
      <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-amber-500 transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-center mt-2">
        <span className="text-sm text-muted-foreground">Strength Standard: </span>
        <span className="font-bold text-primary">{label}</span>
      </div>
    </div>
  );
};

// --- LOGIC ---

// Original Wilks Coefficients (Metric)
const MALE_COEFFS = [
  -216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863E-06, -1.291E-08
];
const FEMALE_COEFFS = [
  594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582E-05, -9.054E-08
];

const calculateWilks = (bw: number, total: number, gender: Gender): number => {
  const x = bw;
  const coeffs = gender === "male" ? MALE_COEFFS : FEMALE_COEFFS;
  
  const denominator = coeffs[0] + 
                      (coeffs[1] * x) + 
                      (coeffs[2] * Math.pow(x, 2)) + 
                      (coeffs[3] * Math.pow(x, 3)) + 
                      (coeffs[4] * Math.pow(x, 4)) + 
                      (coeffs[5] * Math.pow(x, 5));
                      
  const coeff = 500 / denominator;
  return total * coeff;
};

const getCategory = (score: number) => {
  if (score >= 500) return { label: "World Class", color: "text-amber-500", text: "You are among the strongest lifters on the planet." };
  if (score >= 400) return { label: "Elite", color: "text-purple-600", text: "Competitive at a national level." };
  if (score >= 350) return { label: "Advanced", color: "text-blue-600", text: "Stronger than most gym-goers." };
  if (score >= 300) return { label: "Intermediate", color: "text-green-600", text: "Solid foundation, better than average." };
  if (score >= 200) return { label: "Novice", color: "text-yellow-600", text: "Good start, keep training!" };
  return { label: "Beginner", color: "text-gray-500", text: "Everyone starts somewhere." };
};

export default function WilksCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      gender: "male", 
      bodyWeight: "", 
      totalWeight: "", 
      squat: "",
      bench: "",
      deadlift: "",
      units: "metric",
      mode: "simple"
    },
  });

  const { getValues, setValue, watch } = form;
  const units = watch("units");
  const mode = watch("mode");

  // Auto-calculate total if detailed mode inputs change
  useEffect(() => {
    if (mode === "detailed") {
      const s = parseFloat(getValues("squat") || "0");
      const b = parseFloat(getValues("bench") || "0");
      const d = parseFloat(getValues("deadlift") || "0");
      if (!isNaN(s) || !isNaN(b) || !isNaN(d)) {
        setValue("totalWeight", (s + b + d).toFixed(1));
      }
    }
  }, [watch("squat"), watch("bench"), watch("deadlift"), mode, getValues, setValue]);

  // Handle Unit Conversion
  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;

    const fields = ["bodyWeight", "totalWeight", "squat", "bench", "deadlift"] as const;
    const factor = 2.20462; // 1 kg = 2.20462 lbs

    fields.forEach(field => {
      const val = getValues(field);
      if (val && !isNaN(parseFloat(val))) {
        let num = parseFloat(val);
        // Metric to Imperial (Kg -> Lbs)
        if (newUnit === "imperial") {
           num = num * factor;
        } 
        // Imperial to Metric (Lbs -> Kg)
        else {
           num = num / factor;
        }
        setValue(field, num.toFixed(1));
      }
    });
    setValue("units", newUnit);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate calculation delay for effect
    setTimeout(() => {
      let bw = parseFloat(values.bodyWeight);
      let total = parseFloat(values.totalWeight || "0");

      // Normalize to Metric (KG) for calculation
      if (values.units === "imperial") {
        bw = bw / 2.20462;
        total = total / 2.20462;
      }

      const score = calculateWilks(bw, total, values.gender);
      const cat = getCategory(score);

      // Display total in current unit
      const displayTotal = parseFloat(values.totalWeight || "0");

      setResult({
        wilksScore: score,
        totalLifted: displayTotal,
        category: cat.label,
        categoryColor: cat.color,
        percentileText: cat.text
      });

      setIsLoading(false);
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }, 600);
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto shadow-lg" id="calculator">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-t-xl border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="w-6 h-6 text-amber-500" /> Wilks Score Calculator
          </CardTitle>
          <CardDescription>
            Calculate your competitive powerlifting strength level standardized across body weights.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Top Controls: Gender & Unit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Gender</FormLabel>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                      <FormItem className="flex items-center space-x-2 space-y-0 bg-white dark:bg-slate-800 px-4 py-2 rounded-md border shadow-sm cursor-pointer">
                        <FormControl><RadioGroupItem value="male" /></FormControl>
                        <FormLabel className="cursor-pointer">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0 bg-white dark:bg-slate-800 px-4 py-2 rounded-md border shadow-sm cursor-pointer">
                        <FormControl><RadioGroupItem value="female" /></FormControl>
                        <FormLabel className="cursor-pointer">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )} />

                <FormField control={form.control} name="units" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Units</FormLabel>
                    <RadioGroup 
                      onValueChange={(val) => handleUnitChange(val as UnitSystem)} 
                      value={field.value} 
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0 bg-white dark:bg-slate-800 px-4 py-2 rounded-md border shadow-sm cursor-pointer">
                        <FormControl><RadioGroupItem value="metric" /></FormControl>
                        <FormLabel className="cursor-pointer">Metric (kg)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0 bg-white dark:bg-slate-800 px-4 py-2 rounded-md border shadow-sm cursor-pointer">
                        <FormControl><RadioGroupItem value="imperial" /></FormControl>
                        <FormLabel className="cursor-pointer">Imperial (lbs)</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )} />
              </div>

              {/* Body Weight Input */}
              <div className="grid grid-cols-1 gap-4">
                 <FormField control={form.control} name="bodyWeight" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Scale className="w-4 h-4"/> Body Weight</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="number" step="0.1" placeholder={units === "metric" ? "e.g. 80" : "e.g. 176"} {...field} className="pl-4 text-lg" />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                            {units === "metric" ? "kg" : "lbs"}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>

              {/* Lift Inputs (Tabs) */}
              <Tabs defaultValue="simple" className="w-full" onValueChange={(val) => setValue("mode", val as "simple" | "detailed")}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="simple">Total Lift Weight</TabsTrigger>
                  <TabsTrigger value="detailed">Enter S/B/D Individually</TabsTrigger>
                </TabsList>
                
                <TabsContent value="simple">
                  <FormField control={form.control} name="totalWeight" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Dumbbell className="w-4 h-4"/> Total Weight Lifted (Squat + Bench + Deadlift)</FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Input type="number" step="0.1" placeholder={units === "metric" ? "e.g. 500" : "e.g. 1100"} {...field} className="text-lg" />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                            {units === "metric" ? "kg" : "lbs"}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TabsContent>
                
                <TabsContent value="detailed" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="squat" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Squat</FormLabel>
                        <FormControl><Input type="number" step="0.1" placeholder="0" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="bench" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bench Press</FormLabel>
                        <FormControl><Input type="number" step="0.1" placeholder="0" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="deadlift" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadlift</FormLabel>
                        <FormControl><Input type="number" step="0.1" placeholder="0" {...field} /></FormControl>
                      </FormItem>
                    )} />
                  </div>
                  <div className="text-center text-sm text-muted-foreground bg-slate-50 dark:bg-slate-900 p-2 rounded">
                    Total Calculated: <span className="font-bold text-foreground">{form.watch("totalWeight") || 0} {units === "metric" ? "kg" : "lbs"}</span>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1 text-lg h-12" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Calculator className="h-5 w-5 mr-2" />}
                  {isLoading ? 'Calculating...' : 'Calculate Wilks Score'}
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => { form.reset(); setResult(null); }} className="h-12">
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* RESULTS SECTION */}
      <div ref={resultsRef}>
        {result && (
          <Card className="max-w-4xl mx-auto mt-8 border-2 border-primary/10 overflow-hidden">
            <div className="bg-primary/5 p-2"></div>
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                
                {/* Score Display */}
                <div className="text-center md:text-left space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Your Wilks Score</h3>
                  <div className="flex items-baseline justify-center md:justify-start gap-2">
                    <span className="text-6xl md:text-7xl font-extrabold text-foreground tracking-tight">
                      {result.wilksScore.toFixed(2)}
                    </span>
                  </div>
                  <p className={`text-xl font-bold ${result.categoryColor} flex items-center justify-center md:justify-start gap-2`}>
                    <TrendingUp className="w-5 h-5" /> {result.category}
                  </p>
                  <p className="text-muted-foreground pt-2">{result.percentileText}</p>
                </div>

                {/* Gauge and Stats */}
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b">
                    <span className="text-sm text-muted-foreground">Total Lifted</span>
                    <span className="font-bold text-lg">{result.totalLifted} {units === "metric" ? "kg" : "lbs"}</span>
                  </div>
                  <StrengthGauge score={result.wilksScore} />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}