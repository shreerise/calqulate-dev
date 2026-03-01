"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, RefreshCw, Loader2, Droplet, Clock, Utensils, CupSoda, Sun, Activity } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// --- FORM SCHEMA ---
const formSchema = z.object({
  units: z.enum(["metric", "imperial"]),
  gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
  weight: z.string().min(1, "Weight is required."),
  exerciseMinutes: z.string().min(1, "Daily exercise minutes are required. Enter 0 if none."),
  isHotClimate: z.boolean().default(false),
  pregnancyStatus: z.enum(["none", "pregnant", "lactating"]).default("none"),
});

type UnitSystem = "metric" | "imperial";

// --- RESULT TYPE INTERFACE ---
interface CalculationResult {
  totalMl: number;
  totalOz: number;
  fluidMl: number;
  fluidOz: number;
  foodMl: number;
  foodOz: number;
  glasses: number;
  hourlyOz: number;
  hourlyMl: number;
}

// --- VISUAL COMPONENTS ---

const GlassesVisualizer = ({ count }: { count: number }) => {
  const roundedCount = Math.round(count);
  const maxDisplay = 16; 
  const displayCount = Math.min(roundedCount, maxDisplay);
  const hasMore = roundedCount > maxDisplay;

  return (
    <div className="mt-4">
      <p className="text-sm text-muted-foreground font-medium mb-3 text-center md:text-left">
        Equivalent to about <strong className="text-foreground text-lg">{roundedCount}</strong> standard 8oz (250ml) glasses per day:
      </p>
      <div className="flex flex-wrap justify-center md:justify-start gap-2">
        {Array.from({ length: displayCount }).map((_, i) => (
          <div key={i} className="flex flex-col items-center animate-in fade-in zoom-in duration-500" style={{ animationDelay: `${i * 50}ms` }}>
            <CupSoda className="w-8 h-8 text-blue-500 fill-blue-100 dark:fill-blue-900/30" />
          </div>
        ))}
        {hasMore && (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold">
            +{roundedCount - maxDisplay}
          </div>
        )}
      </div>
    </div>
  );
};

export default function DailyWaterIntakeCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      units: "metric",
      gender: "male",
      weight: "",
      exerciseMinutes: "0",
      isHotClimate: false,
      pregnancyStatus: "none",
    },
  });

  const { getValues, setValue, watch } = form;
  const units = watch("units");
  const gender = watch("gender");

  // --- Unit Conversion Handler ---
  const handleUnitChange = (newUnit: UnitSystem) => {
    const currentUnit = getValues("units");
    if (newUnit === currentUnit) return;
    
    const weightVal = getValues("weight");
    if (weightVal && !isNaN(parseFloat(weightVal))) {
      // 1 kg = 2.20462 lbs
      if (newUnit === "imperial") {
        setValue("weight", (parseFloat(weightVal) * 2.20462).toFixed(1));
      } else {
        setValue("weight", (parseFloat(weightVal) / 2.20462).toFixed(1));
      }
    }
    setValue("units", newUnit);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    setTimeout(() => {
      // 1. Normalize weight to kg
      let weightKg = parseFloat(values.weight);
      if (values.units === "imperial") {
        weightKg = weightKg / 2.20462;
      }

      // 2. Base Calculation (Standard clinical: 35ml per kg of body weight)
      // Cap weight at 150kg for linear scaling to prevent excessive recommendations
      const effectiveWeightKg = Math.min(weightKg, 150);
      let totalRequirementMl = effectiveWeightKg * 35;

      // 3. Exercise adjustment: Add ~350ml (12oz) per 30 mins of exercise
      const exerciseMins = parseFloat(values.exerciseMinutes) || 0;
      totalRequirementMl += (exerciseMins / 30) * 350;

      // 4. Climate adjustment: Add 500ml for hot climate
      if (values.isHotClimate) {
        totalRequirementMl += 500;
      }

      // 5. Gender & Condition adjustment
      if (values.gender === "female") {
        if (values.pregnancyStatus === "pregnant") {
          totalRequirementMl += 300;
        } else if (values.pregnancyStatus === "lactating") {
          totalRequirementMl += 700;
        }
      }

      // 6. Split into Drink vs Food (80% / 20% rule)
      const fluidMl = totalRequirementMl * 0.8;
      const foodMl = totalRequirementMl * 0.2;

      // 7. Calculate conversions
      const mlToOz = 0.033814;
      
      const totalOz = totalRequirementMl * mlToOz;
      const fluidOz = fluidMl * mlToOz;
      const foodOz = foodMl * mlToOz;
      
      // Standard glass = 8 oz or ~240ml
      const glasses = fluidMl / 240;

      // Hourly calculation (assuming 16 awake hours)
      const hourlyMl = fluidMl / 16;
      const hourlyOz = fluidOz / 16;

      setResult({
        totalMl: totalRequirementMl,
        totalOz: totalOz,
        fluidMl: fluidMl,
        fluidOz: fluidOz,
        foodMl: foodMl,
        foodOz: foodOz,
        glasses: glasses,
        hourlyMl: hourlyMl,
        hourlyOz: hourlyOz
      });
      
      setIsLoading(false);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 600); // slight delay for UX
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto border-blue-100 shadow-md" id="calculator">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-background border-b rounded-t-xl">
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <Droplet className="w-6 h-6 fill-current" /> 
            Advanced Water Intake Calculator
          </CardTitle>
          <CardDescription>
            Get a medically aligned daily water requirement tailored to your body, activity, and climate.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Top Row: Units & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormField
                  control={form.control}
                  name="units"
                  render={({ field }) => (
                    <FormItem className="bg-muted/30 p-4 rounded-lg border">
                      <FormLabel className="text-base font-semibold">Measurement System</FormLabel>
                      <RadioGroup
                        onValueChange={(value) => handleUnitChange(value as UnitSystem)}
                        value={field.value}
                        className="flex items-center space-x-6 pt-3"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl><RadioGroupItem value="metric" /></FormControl>
                          <FormLabel className="font-medium cursor-pointer">Metric (kg, ml)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl><RadioGroupItem value="imperial" /></FormControl>
                          <FormLabel className="font-medium cursor-pointer">Imperial (lbs, oz)</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="bg-muted/30 p-4 rounded-lg border">
                      <FormLabel className="text-base font-semibold">Biological Sex</FormLabel>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex items-center space-x-6 pt-3"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl><RadioGroupItem value="male" /></FormControl>
                          <FormLabel className="font-medium cursor-pointer">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl><RadioGroupItem value="female" /></FormControl>
                          <FormLabel className="font-medium cursor-pointer">Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormItem>
                  )}
                />
              </div>

              {/* Middle Row: Weight & Activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Body Weight</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="number" step="0.1" placeholder={units === 'metric' ? "75" : "165"} className="pl-4 pr-12 text-lg" {...field} />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                            {units === 'metric' ? 'kg' : 'lbs'}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="exerciseMinutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        <Link
                          href="/health/calories-burned-calculator"
                          className="hover:underline hover:text-green-700 transition-colors"
                        >
                          Daily Exercise Duration
                        </Link>
                      </FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input type="number" placeholder="30" className="pl-9 pr-16 text-lg" {...field} />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                            mins
                          </span>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">Estimate average daily sweat-inducing activity.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bottom Row: Environment & Conditions */}
              <div className="bg-orange-50/50 dark:bg-orange-950/10 p-5 rounded-lg border border-orange-100 dark:border-orange-900/30 space-y-6">
                <h4 className="font-semibold text-orange-800 dark:text-orange-400 flex items-center gap-2">
                  <Sun className="w-5 h-5" /> Lifestyle Variables
                </h4>
                
                <FormField
                  control={form.control}
                  name="isHotClimate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer font-medium">I live in a hot or humid climate</FormLabel>
                        <p className="text-sm text-muted-foreground">Requires additional fluid intake to compensate for natural sweat.</p>
                      </div>
                    </FormItem>
                  )}
                />

                {gender === "female" && (
                  <FormField
                    control={form.control}
                    name="pregnancyStatus"
                    render={({ field }) => (
                      <FormItem className="pt-2 border-t border-orange-200/50 dark:border-orange-900/50">
                        <FormLabel className="font-medium mb-3 block">Pregnancy / Lactation Status</FormLabel>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col sm:flex-row gap-4">
                          <FormItem className="flex items-center space-x-2 space-y-0 bg-white dark:bg-background px-3 py-2 border rounded-md">
                            <FormControl><RadioGroupItem value="none" /></FormControl>
                            <FormLabel className="cursor-pointer font-normal">None</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0 bg-white dark:bg-background px-3 py-2 border rounded-md">
                            <FormControl><RadioGroupItem value="pregnant" /></FormControl>
                            <FormLabel className="cursor-pointer font-normal">Pregnant</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0 bg-white dark:bg-background px-3 py-2 border rounded-md">
                            <FormControl><RadioGroupItem value="lactating" /></FormControl>
                            <FormLabel className="cursor-pointer font-normal">Breastfeeding</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white" size="lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Calculator className="h-5 w-5 mr-2" />}
                  {isLoading ? 'Calculating Hydration Needs...' : 'Calculate My Water Intake'}
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={() => { form.reset(); setResult(null); }} className="sm:w-32" disabled={isLoading}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div ref={resultsRef}>
        {result && (
          <div className="max-w-4xl mx-auto mt-10 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-center mb-6">Your Personalized Hydration Profile</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Main Goal Card */}
              <Card className="md:col-span-3 bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Droplet className="w-48 h-48" />
                </div>
                <CardContent className="p-8 md:p-10 relative z-10 text-center">
                  <p className="text-blue-100 font-medium uppercase tracking-wider mb-2">Total Daily Water Requirement</p>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-4">
                    <div className="text-center">
                      <span className="text-6xl font-extrabold block">{(result.totalMl / 1000).toFixed(1)} <span className="text-3xl font-medium">L</span></span>
                      <span className="text-blue-100 text-sm mt-1 block">({Math.round(result.totalMl)} ml)</span>
                    </div>
                    <div className="h-16 w-px bg-blue-400/50 hidden md:block"></div>
                    <div className="text-center">
                      <span className="text-6xl font-extrabold block">{Math.round(result.totalOz)} <span className="text-3xl font-medium">oz</span></span>
                      <span className="text-blue-100 text-sm mt-1 block">Ounces per day</span>
                    </div>
                  </div>
                  <p className="mt-6 text-blue-50 max-w-2xl mx-auto">
                    This is your absolute total required intake, but you don't need to drink all of it. See the 80/20 breakdown below.
                  </p>
                </CardContent>
              </Card>

              {/* The 80/20 Breakdown Cards */}
              <Card className="md:col-span-2 shadow-sm border-blue-100">
                <CardHeader className="bg-blue-50/50 dark:bg-blue-950/20 pb-4 border-b">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CupSoda className="w-5 h-5 text-blue-500" />
                    Actual Drinking Goal (80%)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-end mb-2">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {(result.fluidMl / 1000).toFixed(1)} <span className="text-xl text-muted-foreground font-medium">L</span>
                    </div>
                    <div className="text-2xl font-semibold text-muted-foreground">
                      {Math.round(result.fluidOz)} <span className="text-base font-normal">oz</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-4">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This is the amount of water you should actively consume through drinking water, teas, or other fluids.
                  </p>
                  
                  <GlassesVisualizer count={result.glasses} />
                </CardContent>
              </Card>

              <Card className="shadow-sm border-emerald-100">
                <CardHeader className="bg-emerald-50/50 dark:bg-emerald-950/20 pb-4 border-b">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-emerald-500" />
                    From Food (20%)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    {Math.round(result.foodMl)} <span className="text-lg text-muted-foreground font-medium">ml</span>
                  </div>
                  <div className="text-lg font-semibold text-muted-foreground mb-4">
                    {Math.round(result.foodOz)} <span className="text-sm font-normal">oz</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-4">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Automatically absorbed through foods like fruits, vegetables, and soups in a standard diet.
                  </p>
                </CardContent>
              </Card>

              {/* Hourly Routine */}
              <Card className="md:col-span-3 border-dashed border-2 bg-muted/30">
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold mb-2">Pace Yourself: Hourly Goal</h3>
                    <p className="text-muted-foreground mb-2">
                      To prevent bloating and ensure optimal absorption, spread your fluid intake evenly over a typical 16-hour waking day.
                    </p>
                    <p className="text-lg">
                      Drink roughly <strong className="text-blue-600 dark:text-blue-400">{Math.round(result.hourlyOz)} oz</strong> ({Math.round(result.hourlyMl)} ml) every hour.
                    </p>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        )}
      </div>
    </>
  );
}