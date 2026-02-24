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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calculator, RefreshCw, Loader2, HeartPulse, AlertCircle, 
  TrendingDown, Target, CheckCircle2, Calendar, Ruler, Scale, 
  Activity, ArrowRightCircle
} from "lucide-react";

// --- FORM SCHEMA ---
const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
  age: z.string().min(1, "Age is required."),
  height: z.string().min(1, "Height is required."),
  weight: z.string().min(1, "Weight is required."),
  waist: z.string().min(1, "Waist measurement is required."),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active"]),
  units: z.enum(["metric", "imperial"]),
});

type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";

// --- RESULT INTERFACE ---
interface CalculationResult {
  bmi: number;
  bmiCategory: string;
  whtr: number;
  whtrCategory: string;
  overallRisk: string;
  riskColor: string;
  idealWeightMin: number;
  idealWeightMax: number;
  actionableInsights: string[];
}

// --- VISUAL COMPONENTS ---
const LinearGauge = ({ value, min, max, breakpoints, labels, title, isRiskReverse = false }: any) => {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  
  const gradient = isRiskReverse 
    ? "from-red-500 via-yellow-400 to-green-500" 
    : "from-green-400 via-yellow-400 to-red-500";

  return (
    <div className="w-full text-center mt-2">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>{labels[0]}</span>
        <span className="font-semibold text-foreground">{title}: {value.toFixed(2)}</span>
        <span>{labels[1]}</span>
      </div>
      <div className={`relative w-full h-3 bg-gradient-to-r ${gradient} rounded-full`}>
        {breakpoints.map((bp: number, i: number) => {
          const pos = ((bp - min) / (max - min)) * 100;
          return pos > 0 && pos < 100 && (
            <div key={i} className="absolute top-0 h-full w-0.5 bg-white/50" style={{ left: `${pos}%` }} />
          );
        })}
        <div 
          className="absolute top-1/2 h-5 w-5 rounded-full bg-white border-2 border-primary shadow-lg -translate-y-1/2 -translate-x-1/2 transition-all duration-700 ease-out" 
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// --- CALCULATION LOGIC ---
const calculateRisk = (
  gender: Gender, weightKg: number, heightCm: number, waistCm: number, activityLevel: string
): CalculationResult => {
  
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const whtr = waistCm / heightCm;
  
  // 1. BMI Category
  let bmiCategory = "";
  if (bmi < 18.5) bmiCategory = "Underweight";
  else if (bmi < 25) bmiCategory = "Normal Weight";
  else if (bmi < 30) bmiCategory = "Overweight";
  else if (bmi < 35) bmiCategory = "Obese (Class I)";
  else if (bmi < 40) bmiCategory = "Obese (Class II)";
  else bmiCategory = "Severe Obesity (Class III)";

  // 2. WHtR Category
  let whtrCategory = "";
  let waistRiskHigh = false;
  if (whtr <= 0.42) whtrCategory = "Underweight (Low Risk)";
  else if (whtr <= 0.52) whtrCategory = "Healthy (Low Risk)";
  else if (whtr <= 0.57) { whtrCategory = "Overweight (Increased Risk)"; waistRiskHigh = true; }
  else { whtrCategory = "Highly Overweight (High Risk)"; waistRiskHigh = true; }

  // 3. Overall Risk Matrix
  let overallRisk = "Low Risk";
  let riskColor = "text-green-600 bg-green-50 border-green-200";

  if (bmi >= 30) {
    overallRisk = "Very High Risk";
    riskColor = "text-red-700 bg-red-50 border-red-200";
  } else if (bmi >= 25 && waistRiskHigh) {
    overallRisk = "High Risk";
    riskColor = "text-red-500 bg-red-50 border-red-200";
  } else if (bmi >= 25 || waistRiskHigh) {
    overallRisk = "Moderate Risk";
    riskColor = "text-yellow-600 bg-yellow-50 border-yellow-200";
  } else if (bmi < 18.5) {
    overallRisk = "Increased Risk (Underweight)";
    riskColor = "text-blue-600 bg-blue-50 border-blue-200";
  }

  // 4. Ideal Weight Range
  const idealWeightMin = 18.5 * (heightM * heightM);
  const idealWeightMax = 24.9 * (heightM * heightM);

  // 5. Actionable Insights Generation
  const actionableInsights: string[] = [];
  
  if (overallRisk === "Low Risk") {
    actionableInsights.push("Excellent work! Your metabolic markers are well within the healthy range.");
    actionableInsights.push("Maintain your current lifestyle. Continue monitoring your measurements every few months.");
  } else {
    if (bmi >= 25) {
      actionableInsights.push(`Losing just 5-10% of your body weight can drastically improve blood pressure and cholesterol.`);
    }
    if (waistRiskHigh) {
      actionableInsights.push("Your waist-to-height ratio indicates visceral fat. Focus on a high-protein, lower-refined-carb diet to target abdominal fat.");
    }
    if (activityLevel === "sedentary" || activityLevel === "light") {
      actionableInsights.push("Increase your daily movement. Start with 150 minutes of brisk walking per week to improve insulin sensitivity.");
    } else {
      actionableInsights.push("Since you are already active, your focus should be on nutritional adjustments (caloric deficit) to lower body fat percentage.");
    }
    if (bmi >= 30) {
      actionableInsights.push("We recommend consulting with a healthcare provider to create a safe, supervised health management plan.");
    }
  }

  return { bmi, bmiCategory, whtr, whtrCategory, overallRisk, riskColor, idealWeightMin, idealWeightMax, actionableInsights };
};

export default function ObesityRiskCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { gender: "female", age: "", height: "", weight: "", waist: "", activityLevel: "moderate", units: "metric" },
  });

  const { getValues, setValue, watch } = form;
  const units = watch("units");

  // Handle Unit Conversions smoothly
  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;
    
    const heightVal = parseFloat(getValues("height"));
    const weightVal = parseFloat(getValues("weight"));
    const waistVal = parseFloat(getValues("waist"));

    if (newUnit === "imperial") {
      if (!isNaN(heightVal)) setValue("height", (heightVal / 2.54).toFixed(1)); 
      if (!isNaN(weightVal)) setValue("weight", (weightVal * 2.20462).toFixed(1)); 
      if (!isNaN(waistVal)) setValue("waist", (waistVal / 2.54).toFixed(1)); 
    } else {
      if (!isNaN(heightVal)) setValue("height", (heightVal * 2.54).toFixed(1)); 
      if (!isNaN(weightVal)) setValue("weight", (weightVal / 2.20462).toFixed(1)); 
      if (!isNaN(waistVal)) setValue("waist", (waistVal * 2.54).toFixed(1)); 
    }
    setValue("units", newUnit);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      const heightCm = values.units === "metric" ? parseFloat(values.height) : parseFloat(values.height) * 2.54;
      const weightKg = values.units === "metric" ? parseFloat(values.weight) : parseFloat(values.weight) / 2.20462;
      const waistCm = values.units === "metric" ? parseFloat(values.waist) : parseFloat(values.waist) * 2.54;

      const riskData = calculateRisk(values.gender as Gender, weightKg, heightCm, waistCm, values.activityLevel);
      
      setResult(riskData);
      setIsLoading(false);
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 150);
    }, 600);
  }

  const formatWeight = (kg: number) => units === "metric" ? `${kg.toFixed(1)} kg` : `${(kg * 2.20462).toFixed(1)} lbs`;

  return (
    <>
      <Card className="max-w-4xl mx-auto shadow-sm border-gray-200" id="calculator">
        <CardHeader className="bg-gray-50/50 border-b pb-6">
          <CardTitle className="flex items-center gap-2 text-2xl text-gray-800">
            <HeartPulse className="w-6 h-6 text-primary" /> Comprehensive Obesity Risk Profiler
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Input your metrics below. We use WHO standards to calculate metabolic risk via BMI and Waist-to-Height ratios.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Gender - Styled as Segmented Control */}
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-gray-700 font-semibold">Biological Gender</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex p-1 bg-gray-100 rounded-xl">
                        <FormItem className="flex-1 space-y-0">
                          <FormControl><RadioGroupItem value="female" className="peer sr-only" /></FormControl>
                          <FormLabel className="flex w-full items-center justify-center py-2.5 text-sm font-medium rounded-lg cursor-pointer text-gray-600 peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-primary peer-data-[state=checked]:shadow-sm transition-all">
                            Female
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex-1 space-y-0">
                          <FormControl><RadioGroupItem value="male" className="peer sr-only" /></FormControl>
                          <FormLabel className="flex w-full items-center justify-center py-2.5 text-sm font-medium rounded-lg cursor-pointer text-gray-600 peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-primary peer-data-[state=checked]:shadow-sm transition-all">
                            Male
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )} />

                {/* Units - Styled as Segmented Control */}
                <FormField control={form.control} name="units" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-gray-700 font-semibold">Measurement System</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={(value) => handleUnitChange(value as UnitSystem)} value={field.value} className="flex p-1 bg-gray-100 rounded-xl">
                        <FormItem className="flex-1 space-y-0">
                          <FormControl><RadioGroupItem value="metric" className="peer sr-only" /></FormControl>
                          <FormLabel className="flex w-full items-center justify-center py-2.5 text-sm font-medium rounded-lg cursor-pointer text-gray-600 peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-primary peer-data-[state=checked]:shadow-sm transition-all">
                            Metric (kg, cm)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex-1 space-y-0">
                          <FormControl><RadioGroupItem value="imperial" className="peer sr-only" /></FormControl>
                          <FormLabel className="flex w-full items-center justify-center py-2.5 text-sm font-medium rounded-lg cursor-pointer text-gray-600 peer-data-[state=checked]:bg-white peer-data-[state=checked]:text-primary peer-data-[state=checked]:shadow-sm transition-all">
                            Imperial (lbs, in)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )} />

                {/* Age */}
                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" /> Age
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 35" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Height */}
                <FormField control={form.control} name="height" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-gray-700">
                      <Ruler className="w-4 h-4 text-gray-400" /> Height ({units === "metric" ? "cm" : "in"})
                    </FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder={units === 'metric' ? "170" : "67"} className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Weight */}
                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-gray-700">
                      <Scale className="w-4 h-4 text-gray-400" /> Weight ({units === "metric" ? "kg" : "lbs"})
                    </FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder={units === 'metric' ? "75" : "165"} className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {/* Waist */}
                <FormField control={form.control} name="waist" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-gray-700">
                      <ArrowRightCircle className="w-4 h-4 text-gray-400" /> Waist Circumference ({units === "metric" ? "cm" : "in"})
                    </FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder={units === 'metric' ? "85" : "33"} className="h-11" {...field} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground mt-1.5 ml-1">Measure midway between ribs and hips.</p>
                    <FormMessage />
                  </FormItem>
                )} />
                
                {/* Activity Level - Full Width */}
                <div className="md:col-span-2 mt-2">
                  <FormField control={form.control} name="activityLevel" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-gray-700">
                        <Activity className="w-4 h-4 text-gray-400" /> Current Activity Level
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 bg-gray-50/50">
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary (Little to no exercise, desk job)</SelectItem>
                          <SelectItem value="light">Lightly Active (Light exercise 1-3 days/week)</SelectItem>
                          <SelectItem value="moderate">Moderately Active (Moderate exercise 3-5 days/week)</SelectItem>
                          <SelectItem value="active">Highly Active (Hard exercise 6-7 days a week)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" className="flex-1 h-14 text-base font-semibold shadow-md hover:shadow-lg transition-all" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Calculator className="h-5 w-5 mr-2" />}
                  {isLoading ? 'Analyzing Profile...' : 'Calculate Health Risk'}
                </Button>
                <Button type="button" variant="outline" className="h-14 sm:w-1/3 text-base text-gray-600 hover:bg-gray-100" onClick={() => { form.reset(); setResult(null); }} disabled={isLoading}>
                  <RefreshCw className="h-4 w-4 mr-2 text-gray-400" /> Reset Fields
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* RESULTS SECTION */}
      <div ref={resultsRef}>
        {result && (
          <div className="max-w-4xl mx-auto mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className={`p-8 rounded-t-2xl border flex flex-col items-center justify-center text-center space-y-3 ${result.riskColor}`}>
              <AlertCircle className="w-12 h-12 mb-2 opacity-80" />
              <h2 className="text-sm font-bold uppercase tracking-widest opacity-80">Overall Health Risk Assessment</h2>
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight">{result.overallRisk}</div>
            </div>

            <Card className="rounded-t-none border-t-0 shadow-lg">
              <CardContent className="p-6 md:p-10">
                
                <div className="grid md:grid-cols-2 gap-12">
                  
                  {/* Gauges Side */}
                  <div className="space-y-8">
                    <div className="p-6 bg-white rounded-xl border shadow-sm">
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-blue-500" /> BMI Profile
                      </h3>
                      <p className="text-3xl font-bold mb-1">{result.bmi.toFixed(1)} <span className="text-xl text-muted-foreground font-medium">/ {result.bmiCategory}</span></p>
                      <LinearGauge 
                        value={result.bmi} min={15} max={40} 
                        breakpoints={[18.5, 25, 30]} 
                        labels={["Under", "Obese"]} title="BMI"
                      />
                    </div>

                    <div className="p-6 bg-white rounded-xl border shadow-sm">
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-purple-500" /> Visceral Fat Risk (WHtR)
                      </h3>
                      <p className="text-3xl font-bold mb-1">{result.whtr.toFixed(2)} <span className="text-xl text-muted-foreground font-medium">/ {result.whtrCategory.split(" ")[0]}</span></p>
                      <LinearGauge 
                        value={result.whtr} min={0.35} max={0.70} 
                        breakpoints={[0.42, 0.52, 0.57]} 
                        labels={["Low", "High"]} title="WHtR"
                      />
                    </div>
                  </div>

                  {/* Insights Side */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 border-b pb-3">
                        <TrendingDown className="w-5 h-5 text-primary" /> Target Goal
                      </h3>
                      <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                        <p className="text-sm text-gray-600 mb-1">Your Ideal Weight Range (Healthy BMI):</p>
                        <p className="text-2xl font-bold text-primary">
                          {formatWeight(result.idealWeightMin)} - {formatWeight(result.idealWeightMax)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 border-b pb-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Actionable Insights
                      </h3>
                      <ul className="space-y-4">
                        {result.actionableInsights.map((insight, idx) => (
                          <li key={idx} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2"></span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}