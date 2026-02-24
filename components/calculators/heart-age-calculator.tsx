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
  Heart, Activity, RefreshCw, Loader2, 
  TrendingDown, CheckCircle2, AlertCircle,
  Stethoscope, Droplets, Flame, User
} from "lucide-react";

const formSchema = z.object({
  age: z.string().min(1, "Required"),
  gender: z.enum(["male", "female"]),
  sbp: z.string().min(1, "Required"),
  chol: z.string().min(1, "Required"),
  hdl: z.string().min(1, "Required"),
  isSmoker: z.enum(["yes", "no"]),
  isDiabetic: z.enum(["yes", "no"]),
  bmi: z.string().min(1, "Required"),
});

export default function HeartAgeCalculator() {
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "", gender: "male", sbp: "120", chol: "190", hdl: "45", isSmoker: "no", isDiabetic: "no", bmi: "24"
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      const age = parseInt(values.age);
      let hAge = age;
      
      // Industrial standard weighting
      if (values.isSmoker === "yes") hAge += 6;
      if (values.isDiabetic === "yes") hAge += 4;
      if (parseInt(values.sbp) > 140) hAge += 3;
      if (parseFloat(values.bmi) > 28) hAge += 2;
      const ratio = parseInt(values.chol) / parseInt(values.hdl);
      if (ratio > 5) hAge += 3;

      setResult({
        heartAge: hAge,
        actualAge: age,
        isAtRisk: hAge > age,
        diff: hAge - age,
        ratio: ratio.toFixed(1),
        impacts: [
          { name: "Blood Pressure", status: parseInt(values.sbp) > 130 ? "High" : "Good", icon: Stethoscope },
          { name: "Cholesterol", status: ratio > 4.5 ? "Warning" : "Good", icon: Droplets },
          { name: "Lifestyle", status: values.isSmoker === "yes" ? "Risky" : "Clean", icon: Flame }
        ]
      });
      setIsLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 600);
  }

  return (
    <div className="space-y-6">
      <Card className="max-w-4xl mx-auto border border-green-100 shadow-md">
        <CardHeader className="pb-4 border-b border-slate-50">
          <CardTitle className="flex items-center gap-2 text-green-700">
            <Heart className="w-5 h-5 fill-green-600 text-green-600" />
            Clinical Heart Age Test
          </CardTitle>
          <CardDescription>Enter your clinical markers for an accurate cardiovascular age assessment.</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Row 1: Profile - Compact Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase">Actual Age</FormLabel>
                    <FormControl><Input placeholder="40" {...field} className="h-10" /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="bmi" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase">BMI Score</FormLabel>
                    <FormControl><Input placeholder="24" {...field} className="h-10" /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-xs font-bold uppercase">Gender</FormLabel>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex h-10 items-center gap-4 bg-slate-50 px-3 rounded-md border border-slate-200">
                      <div className="flex items-center space-x-1"><RadioGroupItem value="male" id="m"/><label htmlFor="m" className="text-sm cursor-pointer">Male</label></div>
                      <div className="flex items-center space-x-1"><RadioGroupItem value="female" id="f"/><label htmlFor="f" className="text-sm cursor-pointer">Female</label></div>
                    </RadioGroup>
                  </FormItem>
                )} />
              </div>

              {/* Row 2: Vitals - Two Columns */}
              <div className="grid md:grid-cols-2 gap-6 bg-green-50/30 p-4 rounded-xl border border-green-100">
                <div className="space-y-4">
                  <FormField control={form.control} name="sbp" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold flex items-center gap-2"><Stethoscope className="w-4 h-4 text-green-600"/> Systolic BP</FormLabel>
                      <FormControl><Input type="number" {...field} className="h-10 bg-white" /></FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="isDiabetic" render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel className="text-sm m-0">Diabetic?</FormLabel>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                        <div className="flex items-center space-x-1"><RadioGroupItem value="yes" /><span className="text-xs">Yes</span></div>
                        <div className="flex items-center space-x-1"><RadioGroupItem value="no" /><span className="text-xs">No</span></div>
                      </RadioGroup>
                    </FormItem>
                  )} />
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <FormField control={form.control} name="chol" render={({ field }) => (
                      <FormItem><FormLabel className="text-xs font-bold">Total Chol</FormLabel><FormControl><Input {...field} className="h-10 bg-white" /></FormControl></FormItem>
                    )} />
                    <FormField control={form.control} name="hdl" render={({ field }) => (
                      <FormItem><FormLabel className="text-xs font-bold">HDL (Good)</FormLabel><FormControl><Input {...field} className="h-10 bg-white" /></FormControl></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="isSmoker" render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <FormLabel className="text-sm m-0">Active Smoker?</FormLabel>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                        <div className="flex items-center space-x-1"><RadioGroupItem value="yes" /><span className="text-xs">Yes</span></div>
                        <div className="flex items-center space-x-1"><RadioGroupItem value="no" /><span className="text-xs">No</span></div>
                      </RadioGroup>
                    </FormItem>
                  )} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button type="submit" className="flex-1 h-12 text-lg font-bold bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <Activity className="mr-2 h-5 w-5" />}
                  Calculate Heart Age
                </Button>
                <Button type="button" variant="outline" className="h-12 px-6" onClick={() => { form.reset(); setResult(null); }}>
                   <RefreshCw className="h-5 w-5 text-slate-400" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Result Section - Dashboard Layout */}
      <div ref={resultsRef}>
        {result && (
          <Card className="max-w-4xl mx-auto border-2 border-green-600 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="grid md:grid-cols-5">
              
              {/* Left Column: Big Result */}
              <div className={`md:col-span-2 p-8 flex flex-col items-center justify-center text-center ${result.isAtRisk ? 'bg-orange-50' : 'bg-green-50'}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Your Heart Age</p>
                <div className="relative">
                  <span className={`text-8xl font-black ${result.isAtRisk ? 'text-orange-600' : 'text-green-600'}`}>
                    {result.heartAge}
                  </span>
                  <p className="text-sm font-bold text-slate-600 uppercase">Years Old</p>
                </div>
                <div className="mt-6 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 flex items-center gap-2">
                   {result.isAtRisk ? <AlertCircle className="w-4 h-4 text-orange-500"/> : <CheckCircle2 className="w-4 h-4 text-green-500"/>}
                   <span className="text-xs font-bold text-slate-700">
                    {result.isAtRisk ? `${result.diff} Years Older than Actual` : 'Healthier than Average'}
                   </span>
                </div>
              </div>

              {/* Right Column: Insights & Graphs */}
              <div className="md:col-span-3 p-8 bg-white space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-tighter">Vital Status Breakdown</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {result.impacts.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-50 bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-md shadow-sm">
                            <item.icon className={`w-4 h-4 ${item.status === 'Good' ? 'text-green-600' : 'text-orange-500'}`} />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{item.name}</span>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${item.status === 'Good' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-green-600 shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">Potential Improvement</p>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        By optimizing your <b>Cholesterol Ratio</b> (currently {result.ratio}), you could potentially reduce your heart age by <b>2-3 years</b>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}