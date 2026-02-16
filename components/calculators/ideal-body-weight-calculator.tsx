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
import { 
  Calculator, RefreshCw, Loader2, Scale, Info, 
  Target, Zap, Activity, Heart, TrendingUp 
} from "lucide-react";

const formSchema = z.object({
  gender: z.enum(["male", "female"]),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Current weight is required"),
  age: z.string().min(1, "Age is required"),
  units: z.enum(["metric", "imperial"]),
});

type UnitSystem = "metric" | "imperial";

interface IBWResults {
  mainResult: number; // This will be the Devine Formula (The Industry Standard)
  healthyRange: { min: number; max: number };
  ajBW: number;
  bmi: number;
  bmrAtIdeal: number;
  weightDiff: number;
  formulas: { name: string; value: number; description: string }[];
}

export default function IdealBodyWeightCalculator() {
  const [result, setResult] = useState<IBWResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { gender: "male", height: "", weight: "", age: "25", units: "metric" },
  });

  // --- IMPROVED UNIT CONVERSION ---
  const handleUnitChange = (newUnit: UnitSystem) => {
    const prevUnit = form.getValues("units");
    if (prevUnit === newUnit) return;

    const currentHeight = parseFloat(form.getValues("height"));
    const currentWeight = parseFloat(form.getValues("weight"));

    if (!isNaN(currentHeight)) {
      const convertedHeight = newUnit === "imperial" 
        ? (currentHeight / 2.54).toFixed(1) 
        : (currentHeight * 2.54).toFixed(1);
      form.setValue("height", convertedHeight);
    }

    if (!isNaN(currentWeight)) {
      const convertedWeight = newUnit === "imperial" 
        ? (currentWeight * 2.20462).toFixed(1) 
        : (currentWeight / 2.20462).toFixed(1);
      form.setValue("weight", convertedWeight);
    }

    form.setValue("units", newUnit);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      const h = parseFloat(values.height);
      const w = parseFloat(values.weight);
      const age = parseFloat(values.age);
      
      const hCm = values.units === 'imperial' ? h * 2.54 : h;
      const wKg = values.units === 'imperial' ? w * 0.453592 : w;
      const inchesOver5ft = (hCm / 2.54) - 60;
      const g = values.gender;

      // IBW Formulas
      const devine = g === 'male' ? 50 + (2.3 * inchesOver5ft) : 45.5 + (2.3 * inchesOver5ft);
      const robinson = g === 'male' ? 52 + (1.9 * inchesOver5ft) : 49 + (1.7 * inchesOver5ft);
      const miller = g === 'male' ? 56.2 + (1.41 * inchesOver5ft) : 53.1 + (1.36 * inchesOver5ft);
      const hamwi = g === 'male' ? 48 + (2.7 * inchesOver5ft) : 45.5 + (2.2 * inchesOver5ft);
      
      const bmi = wKg / Math.pow(hCm / 100, 2);
      
      // BMR at Ideal Weight (Mifflin-St Jeor)
      const bmrAtIdeal = g === 'male' 
        ? (10 * devine) + (6.25 * hCm) - (5 * age) + 5
        : (10 * devine) + (6.25 * hCm) - (5 * age) - 161;

      setResult({
        mainResult: devine, // Matching industry standard 73.2kg for 178cm male
        healthyRange: { min: 18.5 * Math.pow(hCm / 100, 2), max: 24.9 * Math.pow(hCm / 100, 2) },
        ajBW: devine + 0.4 * (wKg - devine),
        bmi,
        bmrAtIdeal,
        weightDiff: wKg - devine,
        formulas: [
          { name: "Devine", value: devine, description: "Clinical standard used for drug dosage." },
          { name: "Robinson", value: robinson, description: "Popular revision of Devine formula." },
          { name: "Miller", value: miller, description: "Commonly used for height/weight charts." },
          { name: "Hamwi", value: hamwi, description: "Traditional health coaching formula." },
        ]
      });

      setIsLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 500);
  }

  const formatWt = (kg: number) => {
    return form.watch("units") === 'metric' 
      ? `${kg.toFixed(1)} kg` 
      : `${(kg * 2.20462).toFixed(1)} lbs`;
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-4xl mx-auto border-none shadow-xl ring-1 ring-slate-200">
        <CardHeader className="bg-slate-50/50 border-b pb-6">
          <CardTitle className="text-2xl flex items-center gap-2 text-slate-800">
            <Scale className="w-6 h-6 text-primary" /> Precision IBW Engine
          </CardTitle>
          <CardDescription>Industry-standard medical formulas with deep health insights.</CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="units" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xs font-bold uppercase text-slate-500 tracking-wider">System</FormLabel>
                    <RadioGroup 
                      onValueChange={(val: UnitSystem) => handleUnitChange(val)} 
                      value={field.value} 
                      className="flex bg-slate-100 p-1 rounded-xl"
                    >
                      <div className="flex-1">
                        <RadioGroupItem value="metric" id="m" className="peer sr-only" />
                        <label htmlFor="m" className="flex justify-center py-2 text-sm font-semibold peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-primary peer-data-[state=checked]:shadow-sm rounded-lg cursor-pointer transition-all">Metric</label>
                      </div>
                      <div className="flex-1">
                        <RadioGroupItem value="imperial" id="i" className="peer sr-only" />
                        <label htmlFor="i" className="flex justify-center py-2 text-sm font-semibold peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-primary peer-data-[state=checked]:shadow-sm rounded-lg cursor-pointer transition-all">Imperial</label>
                      </div>
                    </RadioGroup>
                  </FormItem>
                )} />

                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xs font-bold uppercase text-slate-500 tracking-wider">Biological Sex</FormLabel>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-2">
                      <div className="flex-1">
                        <RadioGroupItem value="female" id="f" className="peer sr-only" />
                        <label htmlFor="f" className="flex justify-center py-2 border-2 rounded-xl text-sm font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer hover:bg-slate-50 transition-all">Female</label>
                      </div>
                      <div className="flex-1">
                        <RadioGroupItem value="male" id="ma" className="peer sr-only" />
                        <label htmlFor="ma" className="flex justify-center py-2 border-2 rounded-xl text-sm font-semibold peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer hover:bg-slate-50 transition-all">Male</label>
                      </div>
                    </RadioGroup>
                  </FormItem>
                )} />

                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-slate-500 tracking-wider">Age</FormLabel>
                    <FormControl><Input type="number" {...field} className="h-11 rounded-xl" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Height ({form.watch("units") === 'metric' ? 'cm' : 'inches'})</FormLabel>
                    <FormControl><Input type="number" step="0.1" {...field} className="h-12 text-lg rounded-xl bg-slate-50" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Weight ({form.watch("units") === 'metric' ? 'kg' : 'lbs'})</FormLabel>
                    <FormControl><Input type="number" step="0.1" {...field} className="h-12 text-lg rounded-xl bg-slate-50" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <Button type="submit" className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 rounded-2xl" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Calculator className="mr-2" />} 
                Analyze My Ideal Weight
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <div ref={resultsRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* MAIN CLINICAL SUMMARY */}
            <Card className="lg:col-span-2 overflow-hidden border-none shadow-2xl ring-1 ring-slate-200">
              {/* <div className="bg-primary px-6 py-2 text-primary-foreground text-[10px] font-black uppercase tracking-[0.2em]">
                Industry Standard Result (Devine Formula)
              </div> */}
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="space-y-1">
                    <p className="text-slate-500 font-bold text-sm uppercase tracking-tight">Your Ideal Weight</p>
                    <h2 className="text-8xl font-black text-slate-900 tracking-tighter leading-none">
                      {formatWt(result.mainResult)}
                    </h2>
                    <div className="flex items-center gap-2 pt-4">
                       <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-bold flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Healthy Range: {formatWt(result.healthyRange.min)} - {formatWt(result.healthyRange.max)}
                       </div>
                    </div>
                  </div>

                  <div className="w-full md:w-[240px] space-y-3">
                    <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity className="w-12 h-12" />
                      </div>
                      <p className="text-[10px] uppercase text-slate-400 font-black mb-1">Current BMI</p>
                      <p className="text-4xl font-black text-slate-800 tracking-tight">{result.bmi.toFixed(1)}</p>
                      <p className="text-xs font-bold text-primary mt-1">
                        Status: {result.bmi < 18.5 ? "Underweight" : result.bmi < 25 ? "Healthy" : "Above Range"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* VISUAL RANGE GAUGE */}
                <div className="mt-12 space-y-4">
                   <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                      <div className="h-full bg-amber-400 w-[18.5%]" />
                      <div className="h-full bg-emerald-500 w-[25%]" />
                      <div className="h-full bg-amber-500 w-[20%]" />
                      <div className="h-full bg-rose-500 flex-1" />
                      
                      {/* Marker */}
                      <div 
                        className="absolute top-0 w-1.5 h-full bg-slate-900 border border-white shadow-2xl transition-all duration-1000 ease-out"
                        style={{ left: `${Math.min(Math.max((result.bmi / 45) * 100, 2), 98)}%` }}
                      />
                   </div>
                   <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                      <span>Under</span>
                      <span>Healthy</span>
                      <span>Overweight</span>
                      <span>Obese</span>
                   </div>
                </div>
              </CardContent>
            </Card>

            {/* GOAL BLUEPRINT */}
            <Card className="bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Zap className="w-32 h-32 text-yellow-400" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 font-bold tracking-tight">
                  <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" /> Goal Blueprint
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 relative z-10">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase mb-2">Target Maintenance</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-yellow-400">{Math.round(result.bmrAtIdeal * 1.2)}</span>
                    <span className="text-lg font-bold text-slate-400">kcal</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 leading-relaxed uppercase font-bold tracking-tighter">
                    Estimated daily calories required to maintain your ideal weight.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-slate-800">
                  <p className="text-slate-400 text-xs font-bold uppercase mb-2">Weight Adjustment</p>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${result.weightDiff > 0 ? 'bg-rose-500/20' : 'bg-emerald-500/20'}`}>
                      {result.weightDiff > 0 ? <TrendingUp className="w-5 h-5 text-rose-400 rotate-180" /> : <TrendingUp className="w-5 h-5 text-emerald-400" />}
                    </div>
                    <p className="text-3xl font-black">
                      {result.weightDiff > 0 ? '-' : '+'} {formatWt(Math.abs(result.weightDiff))}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                   <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-2">
                     <Info className="w-4 h-4" /> CLINICAL TIP
                   </div>
                   <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                     The Adjusted Body Weight <strong>({formatWt(result.ajBW)})</strong> is recommended for caloric planning if your current BMI exceeds 30.
                   </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* MEDICAL FORMULA BREAKDOWN */}
          <Card className="border-none shadow-xl ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Comparison of Medical Formulas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {result.formulas.map((f) => (
                  <div key={f.name} className="p-5 rounded-2xl border bg-white hover:border-primary transition-all group shadow-sm hover:shadow-md">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{f.name}</p>
                      {f.name === "Devine" && <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-md font-black uppercase">Standard</span>}
                    </div>
                    <p className="text-2xl font-black text-slate-800 mb-1">{formatWt(f.value)}</p>
                    <p className="text-[10px] text-slate-400 font-medium leading-tight">{f.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      )}
    </div>
  );
}