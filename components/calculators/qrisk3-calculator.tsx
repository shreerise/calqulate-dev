"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Activity, Calculator, RefreshCw, Loader2, Heart, AlertCircle, Info, TrendingUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// --- FORM SCHEMA ---
const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return num >= 25 && num <= 84;
  }, { message: "Age must be between 25 and 84 for Qrisk3." }),
  ethnicity: z.string({ required_error: "Ethnicity is required" }),
  smokingStatus: z.enum(["0", "1", "2", "3", "4"], { required_error: "Smoking status is required" }),
  diabetes: z.enum(["no", "type1", "type2"], { required_error: "Diabetes status is required" }),
  familyHistory: z.boolean().default(false),
  ckd: z.boolean().default(false),
  atrialFibrillation: z.boolean().default(false),
  bpTreatment: z.boolean().default(false),
  rheumatoidArthritis: z.boolean().default(false),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  systolicBP: z.string().min(1, "Systolic BP is required (e.g. 120)"),
  cholesterolRatio: z.string().min(1, "Cholesterol/HDL ratio is required (e.g. 4.0)"),
});

// --- TYPES ---
interface QriskResult {
  score: number;
  heartAge: number;
  bmi: number;
  riskLevel: "Low" | "Moderate" | "High";
  riskColor: string;
  recommendations: string[];
}

// --- CALCULATION LOGIC (SIMULATION) ---
// Note: The actual Qrisk3 algorithm uses a proprietary coefficient table with thousands of data points.
// This function SIMULATES the weighting logic for educational purposes.
const calculateRisk = (values: z.infer<typeof formSchema>): QriskResult => {
  const age = parseFloat(values.age);
  const height = parseFloat(values.height) / 100; // convert to m
  const weight = parseFloat(values.weight);
  const bmi = weight / (height * height);
  const sbp = parseFloat(values.systolicBP);
  const ratio = parseFloat(values.cholesterolRatio);

  // 1. Base Risk (Exponential age curve)
  // Male starts higher, Female catches up post-menopause
  let risk = values.gender === 'male' 
    ? 0.05 * Math.exp(0.06 * (age - 25))
    : 0.03 * Math.exp(0.065 * (age - 25));

  // 2. Ethnicity Multipliers (Specific for UK/UAE populations)
  // South Asians have higher CVD risk
  switch (values.ethnicity) {
    case "indian":
    case "pakistani":
    case "bangladeshi":
      risk *= 1.5;
      break;
    case "black_african":
    case "black_caribbean":
      risk *= 0.85; // Often lower CHD risk but higher Stroke risk - averaged here
      break;
    case "chinese":
      risk *= 0.7;
      break;
    default:
      break; // White/Other stays baseline
  }

  // 3. Clinical Factors
  // Smoking is massive
  const smokingMultipliers = [1.0, 1.2, 1.5, 2.0, 2.5]; // Non, Ex, Light, Mod, Heavy
  risk *= smokingMultipliers[parseInt(values.smokingStatus)];

  // Diabetes
  if (values.diabetes === 'type1') risk *= 2.5;
  if (values.diabetes === 'type2') risk *= 1.8;

  // Family History
  if (values.familyHistory) risk *= 1.5;

  // Comorbidities
  if (values.ckd) risk *= 1.4;
  if (values.atrialFibrillation) risk *= 1.6;
  if (values.rheumatoidArthritis) risk *= 1.3;

  // 4. Measurements
  // BMI Impact (Risk increases significantly over 30)
  if (bmi > 25) {
    risk *= (1 + ((bmi - 25) * 0.02)); 
  }

  // Blood Pressure (Standard ~120)
  if (sbp > 120) {
    // If on treatment, risk is higher because underlying pathology exists
    const treatmentFactor = values.bpTreatment ? 1.2 : 1.0;
    risk *= (1 + ((sbp - 120) * 0.015)) * treatmentFactor;
  }

  // Cholesterol Ratio (Standard ~4.0)
  if (ratio > 4) {
    risk *= (1 + ((ratio - 4) * 0.1));
  } else {
    risk *= (1 - ((4 - ratio) * 0.05));
  }

  // Cap risk at 99% and Floor at 0.1%
  let finalScore = Math.min(99, Math.max(0.1, risk));
  
  // Calculate Heart Age (Heuristic)
  // If score matches average for age, heart age = age. If higher, heart age > age.
  const expectedRisk = values.gender === 'male' 
    ? 0.05 * Math.exp(0.06 * (age - 25))
    : 0.03 * Math.exp(0.065 * (age - 25));
  
  const ageDiff = (Math.log(finalScore / expectedRisk) / 0.06); 
  // Clamp heart age between Age and Age + 20
  let heartAge = Math.round(age + Math.max(0, ageDiff));
  if (heartAge > 95) heartAge = 95;

  // Recommendations
  let level: "Low" | "Moderate" | "High" = "Low";
  let color = "text-green-600";
  const recs = [];

  if (finalScore >= 20) {
    level = "High";
    color = "text-red-600";
    recs.push("Consult your GP immediately regarding Statin therapy.");
    recs.push("Strict blood pressure control is required.");
  } else if (finalScore >= 10) {
    level = "Moderate";
    color = "text-yellow-600";
    recs.push("Consider lifestyle changes to lower cholesterol.");
    recs.push("Monitor blood pressure regularly.");
  } else {
    recs.push("Maintain your current healthy lifestyle.");
  }

  if (parseInt(values.smokingStatus) > 0) recs.push("Stopping smoking is the single best thing you can do to lower this score.");
  if (bmi > 30) recs.push("Weight reduction will significantly improve your heart age.");
  if (ratio > 5) recs.push("Your cholesterol ratio is high - consider dietary changes.");

  return {
    score: parseFloat(finalScore.toFixed(1)),
    heartAge,
    bmi: parseFloat(bmi.toFixed(1)),
    riskLevel: level,
    riskColor: color,
    recommendations: recs
  };
};

// --- COMPONENT ---

export default function Qrisk3Calculator() {
  const [result, setResult] = useState<QriskResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "female",
      age: "",
      ethnicity: "",
      smokingStatus: "0",
      diabetes: "no",
      familyHistory: false,
      ckd: false,
      atrialFibrillation: false,
      bpTreatment: false,
      rheumatoidArthritis: false,
      height: "",
      weight: "",
      systolicBP: "",
      cholesterolRatio: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const calcResult = calculateRisk(values);
      setResult(calcResult);
      setIsLoading(false);
      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 800);
  }

  return (
    <>
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b pb-6">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Activity className="w-6 h-6 text-red-500" /> 
            Qrisk3 Calculator (UK/UAE)
          </CardTitle>
          <CardDescription className="text-base">
            Complete the form below to estimate your 10-year risk of heart disease or stroke.
            <br/>
            <span className="text-xs text-muted-foreground italic">*This tool uses a simulation algorithm for educational purposes.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* SECTION 1: PERSONAL DETAILS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                   1. Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl><RadioGroupItem value="female" /></FormControl>
                              <FormLabel className="font-normal">Female</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl><RadioGroupItem value="male" /></FormControl>
                              <FormLabel className="font-normal">Male</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age (25-84)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="45" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ethnicity"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Ethnicity (UK/UAE Categories)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your ethnic background" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="white">White or not stated</SelectItem>
                            <SelectItem value="indian">Indian</SelectItem>
                            <SelectItem value="pakistani">Pakistani</SelectItem>
                            <SelectItem value="bangladeshi">Bangladeshi</SelectItem>
                            <SelectItem value="other_asian">Other Asian</SelectItem>
                            <SelectItem value="black_caribbean">Black Caribbean</SelectItem>
                            <SelectItem value="black_african">Black African</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Ethnicity significantly impacts heart risk calculations in this region.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* SECTION 2: CLINICAL MEASUREMENTS */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                   2. Clinical Measurements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl><Input type="number" placeholder="175" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl><Input type="number" placeholder="75" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="systolicBP"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Systolic BP (mmHg)</FormLabel>
                        <FormControl><Input type="number" placeholder="120" {...field} /></FormControl>
                        <FormDescription className="text-xs">Top number of reading</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cholesterolRatio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cholesterol/HDL Ratio</FormLabel>
                        <FormControl><Input type="number" placeholder="4.0" step="0.1" {...field} /></FormControl>
                        <FormDescription className="text-xs">Total Chol divided by HDL</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* SECTION 3: MEDICAL HISTORY */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                   3. Medical History & Lifestyle
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="smokingStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Smoking Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">Non-smoker</SelectItem>
                            <SelectItem value="1">Ex-smoker</SelectItem>
                            <SelectItem value="2">Light smoker (&lt;10/day)</SelectItem>
                            <SelectItem value="3">Moderate smoker (10-19/day)</SelectItem>
                            <SelectItem value="4">Heavy smoker (20+/day)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="diabetes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diabetes Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="no">No Diabetes</SelectItem>
                            <SelectItem value="type1">Type 1</SelectItem>
                            <SelectItem value="type2">Type 2</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                   {/* Checkboxes for boolean values */}
                   <FormField
                    control={form.control}
                    name="familyHistory"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Angina/Heart attack in 1st degree relative &lt; 60?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="atrialFibrillation"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Atrial Fibrillation</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bpTreatment"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>On Blood Pressure Treatment</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ckd"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Chronic Kidney Disease (Stage 3+)</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rheumatoidArthritis"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Rheumatoid Arthritis</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Calculator className="h-4 w-4 mr-2" />}
                  {isLoading ? 'Calculating Risk...' : 'Calculate QRISK3 Score'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { form.reset(); setResult(null); }}
                  className="flex-1"
                  disabled={isLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" /> Reset Form
                </Button>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>

      {/* --- RESULTS SECTION --- */}
      <div ref={resultsRef} className="scroll-mt-20">
        {result && (
          <Card className="max-w-4xl mx-auto mt-8 border-2 border-primary/10 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className={`h-3 w-full ${result.riskLevel === 'High' ? 'bg-red-500' : result.riskLevel === 'Moderate' ? 'bg-yellow-500' : 'bg-green-500'}`} />
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-bold text-gray-800">Your Results</CardTitle>
              <CardDescription>Based on the Qrisk3 (UK/UAE) estimation logic</CardDescription>
            </CardHeader>
            
            <CardContent className="p-6 md:p-8 space-y-8">
              
              {/* PRIMARY SCORES */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                
                {/* 1. Risk Score Card */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-200 shadow-inner">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">10-Year Cardiovascular Risk</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className={`text-6xl font-black ${result.riskColor}`}>
                      {result.score}%
                    </span>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold mt-4 ${result.riskLevel === 'High' ? 'bg-red-100 text-red-700' : result.riskLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {result.riskLevel} Risk
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 px-4">
                    This means there is a {result.score}% chance of having a heart attack or stroke in the next 10 years.
                  </p>
                </div>

                {/* 2. Heart Age Card */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 text-center border border-slate-200 shadow-inner">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Your Heart Age</p>
                  <div className="flex items-center justify-center gap-2">
                    <Heart className={`w-12 h-12 ${result.heartAge > parseInt(form.getValues('age')) ? 'text-red-500' : 'text-green-500'}`} fill="currentColor" />
                    <span className="text-6xl font-black text-gray-800">
                      {result.heartAge}
                    </span>
                  </div>
                  <p className="text-sm font-medium mt-4 text-gray-600">
                     Real Age: <span className="text-gray-900">{form.getValues('age')}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 px-4">
                    {result.heartAge > parseInt(form.getValues('age')) 
                      ? "Your heart age is higher than your actual age. Lifestyle changes can help reverse this."
                      : "Great! Your heart age is consistent with or better than your actual age."}
                  </p>
                </div>
              </div>

              {/* BMI INFO */}
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-blue-600 w-5 h-5" />
                  <span className="font-semibold text-blue-900 dark:text-blue-100">Your Calculated BMI:</span>
                </div>
                <span className="font-bold text-xl text-blue-700 dark:text-blue-200">{result.bmi}</span>
              </div>

              {/* RECOMMENDATIONS */}
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-gray-800 border-b pb-2">
                  <Info className="w-5 h-5 text-primary" /> Personalized Recommendations
                </h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span className="text-sm md:text-base leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* MEDICAL DISCLAIMER FOOTER */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 items-start mt-4">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-tight">
                  <strong>Disclaimer:</strong> This calculator is an educational tool based on the Qrisk3 methodology. It does not replace a professional medical consultation. In the UK and UAE, clinical decisions should be made by a doctor using official NHS/DHA approved systems.
                </p>
              </div>

            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}