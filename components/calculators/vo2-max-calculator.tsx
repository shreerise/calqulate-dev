"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils"; // Assuming you have this standard shadcn util

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  RefreshCw, 
  Loader2, 
  Activity, 
  Heart, 
  Timer, 
  Footprints, 
  Trophy, 
  TrendingUp, 
  Zap,
  Info
} from "lucide-react";

// --- FORM SCHEMA & TYPES ---

const formSchema = z.object({
  method: z.enum(["rest_hr", "cooper_run", "rockport_walk"]),
  gender: z.enum(["male", "female"]),
  age: z.string().min(1, "Age is required").refine(val => Number(val) > 5 && Number(val) < 110, "Invalid age"),
  weight: z.string().min(1, "Weight is required"),
  units: z.enum(["metric", "imperial"]),
  // Optional fields based on method
  restingHR: z.string().optional(),
  cooperTimeMin: z.string().optional(),
  cooperTimeSec: z.string().optional(),
  walkTimeMin: z.string().optional(),
  walkTimeSec: z.string().optional(),
  endHeartRate: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.method === "rest_hr" && !data.restingHR) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["restingHR"] });
  }
  if (data.method === "cooper_run" && (!data.cooperTimeMin)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["cooperTimeMin"] });
  }
  if (data.method === "rockport_walk") {
    if (!data.walkTimeMin) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["walkTimeMin"] });
    if (!data.endHeartRate) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Required", path: ["endHeartRate"] });
  }
});

type FitnessLevel = "Poor" | "Fair" | "Good" | "Excellent" | "Superior";

interface ResultData {
  vo2Max: number;
  fitnessLevel: FitnessLevel;
  fitnessAge: number;
  maxHR: number;
  trainingZones: { zone: number; name: string; range: string; desc: string; color: string }[];
  percentile: number;
}

// --- LOGIC HELPERS ---

// A heuristic to estimate fitness age based on VO2 max vs average norms
const calculateFitnessAge = (chronologicalAge: number, vo2: number, gender: "male" | "female") => {
  // Average decline is roughly 0.5ml/kg/min per year after 25.
  // This is a simplified estimation for engagement purposes.
  const baselineVO2 = gender === 'male' ? 45 : 35; // Approx average for young adult
  const diff = baselineVO2 - vo2;
  let fitAge = 25 + (diff * 2); 
  
  // Clamping and smoothing
  if (fitAge < 18) fitAge = 18;
  if (fitAge > 80) fitAge = 80;
  
  // If their VO2 is amazing, ensure fitness age is lower than chronological
  if (vo2 > baselineVO2 && fitAge > chronologicalAge) {
    fitAge = chronologicalAge - 5;
  }
  
  return Math.round(fitAge);
};

const getFitnessData = (vo2: number, age: number, gender: "male" | "female") => {
  const isMale = gender === "male";
  // Dynamic baseline shifting based on age
  let base = isMale ? 52 : 44; 
  const deduction = Math.min(40, Math.max(0, (age - 20) * 0.4));
  base -= deduction;

  let level: FitnessLevel = "Poor";
  let percentile = 20;

  if (vo2 >= base + 6) { level = "Superior"; percentile = 95; }
  else if (vo2 >= base + 1) { level = "Excellent"; percentile = 80; }
  else if (vo2 >= base - 4) { level = "Good"; percentile = 60; }
  else if (vo2 >= base - 10) { level = "Fair"; percentile = 40; }
  else { level = "Poor"; percentile = 15; }

  return { level, percentile };
};

// --- VISUAL COMPONENTS ---

const MethodCard = ({ 
  id, 
  title, 
  icon: Icon, 
  current, 
  onClick, 
  desc 
}: { id: string, title: string, icon: any, current: string, onClick: (val: string) => void, desc: string }) => (
  <div 
    onClick={() => onClick(id)}
    className={cn(
      "relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md",
      current === id 
        ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-500" 
        : "border-gray-200 bg-white hover:border-blue-300 dark:bg-gray-900 dark:border-gray-800"
    )}
  >
    <div className="flex items-start gap-4">
      <div className={cn("p-2 rounded-full", current === id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500")}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className={cn("font-bold text-sm", current === id ? "text-blue-700 dark:text-blue-400" : "text-gray-900 dark:text-gray-100")}>{title}</h3>
        <p className="text-xs text-muted-foreground mt-1 leading-snug">{desc}</p>
      </div>
    </div>
    {current === id && (
      <div className="absolute top-2 right-2">
        <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
      </div>
    )}
  </div>
);

const Speedometer = ({ score, max = 80, level }: { score: number, max?: number, level: string }) => {
  const rotation = Math.min(180, Math.max(0, (score / max) * 180));
  
  const getColor = () => {
    switch(level) {
      case "Superior": return "text-purple-600";
      case "Excellent": return "text-green-600";
      case "Good": return "text-blue-500";
      case "Fair": return "text-yellow-500";
      default: return "text-red-500";
    }
  }

  return (
    <div className="relative w-48 h-24 mx-auto overflow-hidden mb-4">
      <div className="absolute w-full h-full bg-gray-200 rounded-t-full"></div>
      <div 
        className="absolute w-full h-full rounded-t-full origin-bottom transition-all duration-1000 ease-out"
        style={{ 
          background: 'linear-gradient(90deg, #ef4444 0%, #eab308 50%, #22c55e 80%, #a855f7 100%)',
          transform: `rotate(${rotation - 180}deg)` 
        }}
      ></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-18 bg-white dark:bg-gray-900 rounded-t-full flex items-end justify-center pb-2">
        <div className="text-center">
           <span className={cn("text-4xl font-extrabold block", getColor())}>{score.toFixed(1)}</span>
           <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Score</span>
        </div>
      </div>
    </div>
  )
}

// --- MAIN COMPONENT ---

export default function VO2MaxCalculator() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: "rest_hr",
      gender: "male",
      units: "metric",
      age: "",
      weight: "",
      restingHR: "",
      cooperTimeMin: "",
      cooperTimeSec: "00",
      walkTimeMin: "",
      walkTimeSec: "00",
      endHeartRate: "",
    },
  });

  const { watch, setValue } = form;
  const currentMethod = watch("method");
  const units = watch("units");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate calculation delay for "processing" feel
    setTimeout(() => {
      const age = parseFloat(values.age);
      const weightKg = values.units === "metric" ? parseFloat(values.weight) : parseFloat(values.weight) / 2.20462;
      let vo2 = 0;

      // 1. Resting HR (Uth-Sorensen-Overgaard-Pedersen)
      if (values.method === "rest_hr" && values.restingHR) {
        const maxHR = 208 - (0.7 * age);
        const rhr = parseFloat(values.restingHR);
        vo2 = 15.3 * (maxHR / rhr);
      }
      
      // 2. Cooper 1.5 Mile Run
      else if (values.method === "cooper_run" && values.cooperTimeMin) {
        const time = parseFloat(values.cooperTimeMin) + (parseFloat(values.cooperTimeSec || "0") / 60);
        vo2 = (483 / time) + 3.5;
      }

      // 3. Rockport 1 Mile Walk
      else if (values.method === "rockport_walk" && values.walkTimeMin && values.endHeartRate) {
        const weightLbs = weightKg * 2.20462;
        const time = parseFloat(values.walkTimeMin) + (parseFloat(values.walkTimeSec || "0") / 60);
        const hr = parseFloat(values.endHeartRate);
        const genderVal = values.gender === "male" ? 1 : 0;
        vo2 = 132.853 - (0.0769 * weightLbs) - (0.3877 * age) + (6.315 * genderVal) - (3.2649 * time) - (0.1565 * hr);
      }

      // Process Results
      const { level, percentile } = getFitnessData(vo2, age, values.gender);
      const fitAge = calculateFitnessAge(age, vo2, values.gender);
      const maxHR = 220 - age; // Simplified for zones

      const trainingZones = [
        { zone: 1, name: "Recovery", range: `${Math.round(maxHR * 0.5)} - ${Math.round(maxHR * 0.6)}`, desc: "Very light, warm up", color: "bg-gray-400" },
        { zone: 2, name: "Endurance", range: `${Math.round(maxHR * 0.6)} - ${Math.round(maxHR * 0.7)}`, desc: "Fat burning, comfortable", color: "bg-blue-500" },
        { zone: 3, name: "Aerobic", range: `${Math.round(maxHR * 0.7)} - ${Math.round(maxHR * 0.8)}`, desc: "Moderate, improves fitness", color: "bg-green-500" },
        { zone: 4, name: "Threshold", range: `${Math.round(maxHR * 0.8)} - ${Math.round(maxHR * 0.9)}`, desc: "Hard, performance building", color: "bg-orange-500" },
        { zone: 5, name: "VO2 Max", range: `> ${Math.round(maxHR * 0.9)}`, desc: "Maximum effort", color: "bg-red-500" },
      ];

      setResult({
        vo2Max: vo2,
        fitnessLevel: level,
        fitnessAge: fitAge,
        maxHR,
        trainingZones,
        percentile
      });

      setIsLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 800);
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-4xl mx-auto shadow-xl border-0 ring-1 ring-gray-200 dark:ring-gray-800 bg-white dark:bg-gray-950">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900 pb-8 pt-6">
          <CardTitle className="text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <Activity className="w-6 h-6 text-blue-600" /> 
            VO2 Max Estimator
          </CardTitle>
          <CardDescription>
            Choose your test method. For most accurate results without equipment, we recommend the <strong>1.5 Mile Run</strong>.
          </CardDescription>
        </CardHeader>

        <CardContent className="-mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white dark:bg-gray-950 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              
              {/* 1. Method Selector - Visual Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MethodCard 
                  id="rest_hr" 
                  title="Resting HR" 
                  icon={Heart} 
                  current={currentMethod} 
                  onClick={(v) => setValue("method", v as any)} 
                  desc="Estimate using pulse. Easiest, least physical."
                />
                <MethodCard 
                  id="cooper_run" 
                  title="Cooper Run" 
                  icon={Timer} 
                  current={currentMethod} 
                  onClick={(v) => setValue("method", v as any)} 
                  desc="Run 1.5 miles as fast as possible. High Accuracy."
                />
                <MethodCard 
                  id="rockport_walk" 
                  title="Rockport Walk" 
                  icon={Footprints} 
                  current={currentMethod} 
                  onClick={(v) => setValue("method", v as any)} 
                  desc="Walk 1 mile fast. Good for seniors/low impact."
                />
              </div>

              {/* 2. Personal Stats - Grouped */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                      <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                    </Select>
                  </FormItem>
                )} />
                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem><FormLabel>Age (Years)</FormLabel><FormControl><Input type="number" placeholder="e.g. 30" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="weight" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <div className="flex gap-2">
                      <FormControl><Input type="number" placeholder={units === 'metric' ? "kg" : "lbs"} {...field} /></FormControl>
                      <div className="flex bg-gray-100 rounded-md p-1">
                         <button type="button" onClick={() => setValue('units', 'metric')} className={cn("px-2 text-xs rounded", units==='metric' ? "bg-white shadow text-black" : "text-gray-500")}>kg</button>
                         <button type="button" onClick={() => setValue('units', 'imperial')} className={cn("px-2 text-xs rounded", units==='imperial' ? "bg-white shadow text-black" : "text-gray-500")}>lbs</button>
                      </div>
                    </div>
                  </FormItem>
                )} />
              </div>

              {/* 3. Dynamic Test Inputs - Highlighted Section */}
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" /> Test Data Needed
                </h3>
                
                {currentMethod === "rest_hr" && (
                  <FormField control={form.control} name="restingHR" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resting Heart Rate</FormLabel>
                      <div className="relative">
                        <Heart className="absolute left-3 top-2.5 h-5 w-5 text-red-400" />
                        <FormControl><Input className="pl-10" type="number" placeholder="Beats per minute" {...field} /></FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}

                {currentMethod === "cooper_run" && (
                  <div className="grid grid-cols-2 gap-4">
                     <FormItem className="col-span-2"><FormLabel>Time to complete 1.5 Miles (2.4km)</FormLabel></FormItem>
                     <FormField control={form.control} name="cooperTimeMin" render={({ field }) => (
                       <FormItem><FormControl><Input type="number" placeholder="Minutes" {...field} /></FormControl><FormMessage /></FormItem>
                     )} />
                     <FormField control={form.control} name="cooperTimeSec" render={({ field }) => (
                       <FormItem><FormControl><Input type="number" placeholder="Seconds" {...field} /></FormControl><FormMessage /></FormItem>
                     )} />
                  </div>
                )}

                {currentMethod === "rockport_walk" && (
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <FormItem className="col-span-2"><FormLabel>Time to walk 1 Mile</FormLabel></FormItem>
                        <FormField control={form.control} name="walkTimeMin" render={({ field }) => (
                          <FormItem><FormControl><Input type="number" placeholder="Minutes" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="walkTimeSec" render={({ field }) => (
                          <FormItem><FormControl><Input type="number" placeholder="Seconds" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                     </div>
                     <FormField control={form.control} name="endHeartRate" render={({ field }) => (
                       <FormItem>
                         <FormLabel>Heart Rate at Finish Line</FormLabel>
                         <div className="relative">
                           <Activity className="absolute left-3 top-2.5 h-5 w-5 text-red-400" />
                           <FormControl><Input className="pl-10" type="number" placeholder="Beats per minute" {...field} /></FormControl>
                         </div>
                         <FormMessage />
                       </FormItem>
                     )} />
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full text-lg h-14 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Calculate My VO2 Max"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* --- OUTPUT SECTION --- */}
      <div ref={resultsRef} className="scroll-mt-24">
        {result && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* 1. Hero Result Card */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 border-2 border-blue-100 dark:border-blue-900 bg-white dark:bg-gray-950 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Trophy className="w-32 h-32 text-blue-600" />
                </div>
                <CardHeader className="text-center pb-2">
                   <CardTitle className="text-muted-foreground uppercase tracking-widest text-sm font-semibold">Your VO2 Max Score</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center pt-4">
                   <Speedometer score={result.vo2Max} level={result.fitnessLevel} />
                   
                   <div className="text-center mt-2 z-10">
                     <Badge className={cn("text-lg px-4 py-1 mb-2 pointer-events-none", 
                        result.fitnessLevel === "Superior" ? "bg-purple-100 text-purple-700 hover:bg-purple-100" : 
                        result.fitnessLevel === "Excellent" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                        result.fitnessLevel === "Good" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                        "bg-orange-100 text-orange-700 hover:bg-orange-100"
                     )}>
                       {result.fitnessLevel} Fitness
                     </Badge>
                     <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                       You scored better than <strong>{result.percentile}%</strong> of people your age.
                     </p>
                   </div>
                </CardContent>
              </Card>

              {/* 2. Fitness Age Card (The Hook) */}
              <Card className="bg-slate-900 text-white flex flex-col justify-center items-center p-6 text-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-slate-900 opacity-50"></div>
                <div className="relative z-10">
                  <h3 className="text-slate-300 font-medium text-sm uppercase tracking-wider mb-2">Fitness Age</h3>
                  <div className="text-6xl font-extrabold mb-1 tracking-tighter">{result.fitnessAge}</div>
                  <p className="text-sm text-slate-300">
                    {result.fitnessAge < parseFloat(form.getValues('age')) 
                      ? "Your heart is younger than you! 🎉" 
                      : "Room for improvement."}
                  </p>
                </div>
              </Card>
            </div>

            {/* 3. Detailed Tabs (Training Zones & Insights) */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-0">
                <Tabs defaultValue="zones" className="w-full">
                  <div className="border-b px-6 py-2 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
                    <TabsList className="grid w-full grid-cols-2 max-w-md">
                      <TabsTrigger value="zones">Training Zones</TabsTrigger>
                      <TabsTrigger value="info">What This Means</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="zones" className="p-6 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="font-bold text-lg flex items-center gap-2"><Heart className="text-red-500 w-5 h-5"/> Heart Rate Zones</h3>
                       <span className="text-sm text-muted-foreground">Max HR: {result.maxHR} bpm</span>
                    </div>
                    <div className="space-y-3">
                      {result.trainingZones.map((z) => (
                        <div key={z.zone} className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <span className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm", z.color)}>{z.zone}</span>
                            <div>
                              <p className="font-semibold text-sm">{z.name}</p>
                              <p className="text-xs text-muted-foreground">{z.desc}</p>
                            </div>
                          </div>
                          <div className="font-mono font-bold text-sm">{z.range} <span className="text-[10px] text-gray-400 font-normal">BPM</span></div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="info" className="p-6">
                    <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300">
                      <p>
                        Your estimated VO2 Max is <strong>{result.vo2Max.toFixed(1)} ml/kg/min</strong>. 
                      </p>
                      <h4 className="font-bold text-gray-900 dark:text-white mt-4">Why is this important?</h4>
                      <p>VO2 Max is the gold standard for cardiorespiratory fitness. A higher score is strongly correlated with:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Longer lifespan and reduced risk of heart disease.</li>
                        <li>Better endurance performance in sports.</li>
                        <li>Faster recovery after physical exertion.</li>
                      </ul>
                      <div className="bg-blue-50 p-4 rounded-lg mt-4 text-blue-800 text-sm flex gap-3">
                         <Info className="w-5 h-5 shrink-0" />
                         <p>To improve this score, incorporate <strong>High Intensity Interval Training (HIIT)</strong> into your routine once or twice a week (Zone 4 & 5).</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => { setResult(null); form.reset(); }} className="gap-2">
                  <RefreshCw className="w-4 h-4" /> Start Over
                </Button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}