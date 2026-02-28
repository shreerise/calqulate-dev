"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, RefreshCw, Loader2, Sparkles, Scale, Activity, Zap, Target } from "lucide-react";

const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
  weight: z.string().min(1, "Weight is required."),
  height: z.string().min(1, "Height is required."),
  neck: z.string().min(1, "Neck measurement is required."),
  waist: z.string().min(1, "Waist measurement is required."),
  hips: z.string().optional(),
  units: z.enum(["metric", "imperial"]),
});

type UnitSystem = "metric" | "imperial";

interface BodyFatResult {
  bfp: number;
  fatMass: number;
  leanMass: number;
  bmr: number;
  category: { label: string; color: string; bg: string };
  idealWeight: number;
}

export default function BodyFatCalculator() {
  const [result, setResult] = useState<BodyFatResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { gender: "male", weight: "", height: "", neck: "", waist: "", hips: "", units: "metric" },
  });

  const { getValues, setValue, watch } = form;
  const units = watch("units");
  const gender = watch("gender");

  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;

    const convertValue = (val: string, type: 'length' | 'weight') => {
      if (!val) return "";
      const num = parseFloat(val);
      if (isNaN(num)) return "";
      if (type === 'length') {
        return newUnit === 'metric' ? (num * 2.54).toFixed(1) : (num / 2.54).toFixed(1);
      } else {
        return newUnit === 'metric' ? (num / 2.20462).toFixed(1) : (num * 2.20462).toFixed(1);
      }
    };

    setValue("weight", convertValue(getValues("weight"), 'weight'));
    setValue("height", convertValue(getValues("height"), 'length'));
    setValue("neck", convertValue(getValues("neck"), 'length'));
    setValue("waist", convertValue(getValues("waist"), 'length'));
    if (getValues("hips")) setValue("hips", convertValue(getValues("hips")!, 'length'));
    setValue("units", newUnit);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      const isMetric = values.units === "metric";
      const w = isMetric ? parseFloat(values.weight) : parseFloat(values.weight) / 2.20462;
      const h = isMetric ? parseFloat(values.height) : parseFloat(values.height) * 2.54;
      const n = isMetric ? parseFloat(values.neck) : parseFloat(values.neck) * 2.54;
      const wa = isMetric ? parseFloat(values.waist) : parseFloat(values.waist) * 2.54;
      const hi = values.hips ? (isMetric ? parseFloat(values.hips) : parseFloat(values.hips) * 2.54) : 0;

      let bfp = 0;
      if (values.gender === "male") {
        bfp = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450;
      } else {
        bfp = 495 / (1.29579 - 0.35004 * Math.log10(wa + hi - n) + 0.221 * Math.log10(h)) - 450;
      }

      const fatMass = (bfp / 100) * w;
      const leanMass = w - fatMass;
      const bmr = 370 + (21.6 * leanMass);
      const targetBFP = values.gender === "male" ? 15 : 22;
      const idealW = leanMass / (1 - targetBFP / 100);

      setResult({
        bfp,
        fatMass: isMetric ? fatMass : fatMass * 2.20462,
        leanMass: isMetric ? leanMass : leanMass * 2.20462,
        bmr: Math.round(bmr),
        category: getCategory(bfp, values.gender),
        idealWeight: isMetric ? idealW : idealW * 2.20462
      });

      setIsLoading(false);
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }, 600);
  }

  const getCategory = (bfp: number, gender: string) => {
    if (gender === "male") {
      if (bfp < 14) return { label: "Athlete", color: "text-blue-600", bg: "bg-blue-600" };
      if (bfp < 18) return { label: "Fitness", color: "text-green-600", bg: "bg-green-600" };
      if (bfp < 25) return { label: "Average", color: "text-yellow-600", bg: "bg-yellow-600" };
      return { label: "Obese", color: "text-red-600", bg: "bg-red-600" };
    } else {
      if (bfp < 21) return { label: "Athlete", color: "text-blue-600", bg: "bg-blue-600" };
      if (bfp < 25) return { label: "Fitness", color: "text-green-600", bg: "bg-green-600" };
      if (bfp < 32) return { label: "Average", color: "text-yellow-600", bg: "bg-yellow-600" };
      return { label: "Obese", color: "text-red-600", bg: "bg-red-600" };
    }
  };

  return (
    <>
      <Card className="max-w-4xl mx-auto border-gray-200 shadow-sm" id="calculator">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Body Fat Percentage Calculator
          </CardTitle>
          <CardDescription>
            Enter your measurements below to calculate body fat via the U.S. Navy Method.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Gender & Units Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-semibold">Gender</FormLabel>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="male" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="female" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )} />

                <FormField control={form.control} name="units" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-semibold">Units</FormLabel>
                    <RadioGroup onValueChange={(value) => handleUnitChange(value as UnitSystem)} value={field.value} className="flex gap-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="metric" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Metric (cm/kg)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="imperial" /></FormControl>
                        <FormLabel className="font-normal cursor-pointer">Imperial (in/lb)</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )} />
              </div>

              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Weight ({units === 'metric' ? 'kg' : 'lb'})</FormLabel>
                    <FormControl><Input type="number" step="0.1" placeholder="70" {...field} className="h-11" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Height ({units === 'metric' ? 'cm' : 'in'})</FormLabel>
                    <FormControl><Input type="number" step="0.1" placeholder="175" {...field} className="h-11" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="neck" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Neck Circumference</FormLabel>
                    <FormControl><Input type="number" step="0.1" placeholder="38" {...field} className="h-11" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="waist" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Waist (at Navel)</FormLabel>
                    <FormControl><Input type="number" step="0.1" placeholder="85" {...field} className="h-11" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                {gender === "female" && (
                  <FormField control={form.control} name="hips" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Hips (Widest Point)</FormLabel>
                      <FormControl><Input type="number" step="0.1" placeholder="95" {...field} className="h-11" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" className="flex-1 h-12 text-lg font-semibold bg-emerald-700 hover:bg-emerald-800" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Calculator className="h-5 w-5 mr-2" />} 
                  Calculate Body Fat
                </Button>
                <Button type="button" variant="outline" className="h-12 px-8" onClick={() => { form.reset(); setResult(null); }} disabled={isLoading}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* --- RESULTS SECTION --- */}
      <div ref={resultsRef}>
        {result && (
          <Card className="max-w-4xl mx-auto mt-10 border-emerald-100 shadow-lg overflow-hidden">
            <div className={`h-2 w-full ${result.category.bg}`} />
            <CardContent className="p-8 space-y-10">
              
              {/* Main Score */}
              <div className="text-center space-y-2">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Calculated Body Fat</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-7xl font-black text-gray-900">{result.bfp.toFixed(1)}</span>
                  <span className="text-4xl font-bold text-gray-400">%</span>
                </div>
                <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border ${result.category.color} border-current`}>
                  {result.category.label}
                </div>
              </div>

              {/* Detailed Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-gray-100 pt-10">
                {/* Left Side: Mass Breakdown */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <Scale className="w-5 h-5 text-emerald-600" /> Weight Breakdown
                  </h3>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>
                          <Link
                            href="/health/lean-body-mass-calculator"
                            className="text-gray-600 hover:underline hover:text-green-700 transition-colors"
                          >
                            Lean Body Mass
                          </Link>
                        </span>

                        <span className="text-gray-900">
                          {result.leanMass.toFixed(1)} {units === 'metric' ? 'kg' : 'lb'}
                        </span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${100 - result.bfp}%` }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-600">Total Fat Mass</span>
                        <span className="text-gray-900">{result.fatMass.toFixed(1)} {units === 'metric' ? 'kg' : 'lb'}</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 rounded-full" style={{ width: `${result.bfp}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Goals & BMR */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                    <Zap className="w-5 h-5 text-yellow-500" /> Fitness Insights
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-blue-600 uppercase">Ideal Fitness Weight</p>
                          <p className="text-3xl font-black text-blue-900 mt-1">{result.idealWeight.toFixed(1)} <span className="text-sm font-medium">{units === 'metric' ? 'kg' : 'lb'}</span></p>
                        </div>
                        <Target className="w-6 h-6 text-blue-400" />
                      </div>
                      <p className="text-[11px] text-blue-700 mt-2 leading-tight">
                        Estimated weight to reach {gender === 'male' ? '15%' : '22%'} body fat while maintaining muscle.
                      </p>
                    </div>
                    
                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-xs font-bold text-gray-500 uppercase">
                        <Link
                          href="/health/bmr-calculator"
                          className="hover:underline hover:text-green-700 transition-colors"
                        >
                          Basal Metabolic Rate (BMR)
                        </Link>
                      </p>
                      <p className="text-3xl font-black text-gray-900 mt-1">{result.bmr} <span className="text-sm font-medium">kcal/day</span></p>
                      <p className="text-[11px] text-gray-500 mt-2 leading-tight">
                        Calories burned at rest using the Katch-McArdle formula (muscle-adjusted).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}