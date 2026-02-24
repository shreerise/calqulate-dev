"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Brain, RefreshCw, Loader2, Activity, ShieldAlert, Heart, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

// --- PSS-10 QUESTIONS & DATA ---
const pssQuestions = [
  { id: "q1", text: "In the last month, how often have you been upset because of something that happened unexpectedly?", reverse: false },
  { id: "q2", text: "In the last month, how often have you felt that you were unable to control the important things in your life?", reverse: false },
  { id: "q3", text: "In the last month, how often have you felt nervous and 'stressed'?", reverse: false },
  { id: "q4", text: "In the last month, how often have you felt confident about your ability to handle your personal problems?", reverse: true },
  { id: "q5", text: "In the last month, how often have you felt that things were going your way?", reverse: true },
  { id: "q6", text: "In the last month, how often have you found that you could not cope with all the things that you had to do?", reverse: false },
  { id: "q7", text: "In the last month, how often have you been able to control irritations in your life?", reverse: true },
  { id: "q8", text: "In the last month, how often have you felt that you were on top of things?", reverse: true },
  { id: "q9", text: "In the last month, how often have you been angered because of things that were outside of your control?", reverse: false },
  { id: "q10", text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?", reverse: false },
];

const likertOptions = [
  { value: "0", label: "Never", icon: "🌿", color: "hover:border-green-400 hover:bg-green-50 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-100 data-[state=checked]:text-green-800" },
  { value: "1", label: "Almost Never", icon: "🌤️", color: "hover:border-emerald-400 hover:bg-emerald-50 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-100 data-[state=checked]:text-emerald-800" },
  { value: "2", label: "Sometimes", icon: "☁️", color: "hover:border-yellow-400 hover:bg-yellow-50 data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-100 data-[state=checked]:text-yellow-800" },
  { value: "3", label: "Fairly Often", icon: "🌧️", color: "hover:border-orange-400 hover:bg-orange-50 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-100 data-[state=checked]:text-orange-800" },
  { value: "4", label: "Very Often", icon: "⛈️", color: "hover:border-red-400 hover:bg-red-50 data-[state=checked]:border-red-500 data-[state=checked]:bg-red-100 data-[state=checked]:text-red-800" },
];

// --- FORM SCHEMA ---
const schemaShape: Record<string, z.ZodString> = {};
pssQuestions.forEach((q) => {
  schemaShape[q.id] = z.string({ required_error: "Please select an answer." });
});
const formSchema = z.object(schemaShape);

// --- RESULT TYPE INTERFACE ---
interface StressResult {
  totalScore: number;
  category: string;
  description: string;
  colorClass: string;
  helplessnessScore: number;
  efficacyScore: number;
  insights: string[];
}

// --- VISUAL COMPONENTS ---
const ScoreGauge = ({ score, colorClass }: { score: number, colorClass: string }) => {
  const percentage = (score / 40) * 100;
  return (
    <div className="flex flex-col items-center justify-center my-4">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
          <circle 
            cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
            strokeDasharray="283" 
            strokeDashoffset={283 - (283 * percentage) / 100} 
            className={`transition-all duration-1000 ease-out ${colorClass.replace('text-', 'stroke-')}`} 
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold tracking-tighter">{score}</span>
          <span className="text-xs text-muted-foreground mt-0.5">out of 40</span>
        </div>
      </div>
    </div>
  );
}

const SubFactorBar = ({ label, score, max, description, invertColor = false }: { label: string, score: number, max: number, description: string, invertColor?: boolean }) => {
  const percentage = (score / max) * 100;
  let color = "bg-primary";
  if (invertColor) {
    color = percentage > 66 ? "bg-green-500" : percentage > 33 ? "bg-yellow-500" : "bg-red-500";
  } else {
    color = percentage > 66 ? "bg-red-500" : percentage > 33 ? "bg-yellow-500" : "bg-green-500";
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-1">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-sm font-bold">{score} <span className="text-xs text-muted-foreground font-normal">/ {max}</span></span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-1.5">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-[11px] text-muted-foreground leading-tight">{description}</p>
    </div>
  );
}

// --- CALCULATION LOGIC ---
const calculateStressLevel = (answers: Record<string, string>): StressResult => {
  let totalScore = 0;
  let helplessnessRaw = 0; 
  let efficacyRaw = 0;     

  pssQuestions.forEach((q) => {
    const rawVal = parseInt(answers[q.id] || "0");
    if (q.reverse) {
        efficacyRaw += rawVal;
    } else {
        helplessnessRaw += rawVal;
    }
    const scoreVal = q.reverse ? (4 - rawVal) : rawVal;
    totalScore += scoreVal;
  });

  let category = "";
  let description = "";
  let colorClass = "";
  let insights: string[] = [];

  if (totalScore <= 13) {
    category = "Low Perceived Stress";
    colorClass = "text-green-500";
    description = "Your stress levels are currently low. You seem to be managing life's challenges well and feeling in control.";
    insights = [
      "Keep up your current healthy routines and boundaries.",
      "Use this period of mental clarity to plan for future goals.",
      "Take this assessment again in 30 days to track your mental baseline."
    ];
  } else if (totalScore <= 26) {
    category = "Moderate Stress";
    colorClass = "text-yellow-500";
    description = "You are experiencing a moderate amount of stress. While common, ensure it doesn't build up over time.";
    insights = [
      "Identify the specific triggers causing your stress recently and see if any can be minimized.",
      "Incorporate 10-15 minutes of mindfulness or light walking into your daily routine.",
      "Watch for physical symptoms like tight shoulders or poor sleep."
    ];
  } else {
    category = "High Perceived Stress";
    colorClass = "text-red-500";
    description = "Your score indicates a high level of stress. You may be feeling overwhelmed or nearing burnout. It is highly recommended to take action.";
    insights = [
      "Prioritize ruthless self-care: reduce non-essential obligations immediately.",
      "Consider speaking to a professional to develop strong coping mechanisms.",
      "High stress elevates cortisol, which can disrupt sleep, digestion, and cause stubborn weight retention."
    ];
  }

  return { totalScore, category, description, colorClass, helplessnessScore: helplessnessRaw, efficacyScore: efficacyRaw, insights };
};

// --- MAIN COMPONENT ---
export default function StressLevelCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<StressResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: pssQuestions.reduce((acc, q) => ({ ...acc, [q.id]: "" }), {}),
  });

  const currentQuestionId = pssQuestions[currentStep].id;
  const currentAnswer = form.watch(currentQuestionId);

  // Auto-advance logic
  const handleOptionSelect = (value: string) => {
    form.setValue(currentQuestionId, value, { shouldValidate: true });
    
    // Faster delay for a snappier, more compact feel
    setTimeout(() => {
      if (currentStep < pssQuestions.length - 1) {
        handleNext();
      }
    }, 250); 
  };

  const handleNext = () => {
    if (currentStep < pssQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      const calculatedResult = calculateStressLevel(values);
      setResult(calculatedResult);
      setIsLoading(false);
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
    }, 600); 
  }

  const resetCalculator = () => {
    form.reset();
    setCurrentStep(0);
    setResult(null);
    setTimeout(() => { formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
  }

  const progressPercentage = ((currentStep) / pssQuestions.length) * 100;

  return (
    <div ref={formRef}>
      {!result ? (
        // Reduced max-width to max-w-2xl for a tighter fit
        <Card className="max-w-2xl mx-auto shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden" id="calculator">
          {/* Progress Bar Header - Reduced Padding */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-2">
               <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                 Question {currentStep + 1} of {pssQuestions.length}
               </span>
               <span className="text-xs text-slate-500 font-medium">
                 {Math.round(progressPercentage)}% Completed
               </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Reduced min-height and padding */}
          <CardContent className="p-5 md:p-6 min-h-[300px] flex flex-col justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 h-full flex flex-col">
                
                <div key={currentStep} className="animate-in fade-in slide-in-from-right-4 duration-300 ease-out flex-1">
                  <FormField
                    control={form.control}
                    name={currentQuestionId}
                    render={({ field }) => (
                      <FormItem className="space-y-5">
                        {/* Smaller Question Text */}
                        <FormLabel className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 leading-snug block text-center mb-4">
                          {pssQuestions[currentStep].text}
                        </FormLabel>
                        
                        <FormControl>
                          {/* Tighter spacing between options */}
                          <RadioGroup 
                            onValueChange={handleOptionSelect} 
                            value={field.value} 
                            className="flex flex-col space-y-2 max-w-md mx-auto w-full"
                          >
                            {likertOptions.map((opt) => (
                              <FormItem key={opt.value} className="relative">
                                <FormControl>
                                  <RadioGroupItem value={opt.value} className="peer sr-only" />
                                </FormControl>
                                {/* Slimmer buttons: Reduced padding, border, and text sizes */}
                                <FormLabel 
                                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out
                                  bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 
                                  peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-1
                                  ${opt.color} hover:shadow-sm`}
                                >
                                  <span className="text-xl mr-3">{opt.icon}</span>
                                  <span className="text-sm font-medium flex-1">{opt.label}</span>
                                  
                                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 peer-data-[state=checked]:border-transparent peer-data-[state=checked]:bg-current flex items-center justify-center opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  </div>
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-center text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Tighter Navigation Bar */}
                <div className="flex items-center justify-between pt-5 mt-auto border-t border-slate-100 dark:border-slate-800">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={handlePrev} 
                    disabled={currentStep === 0 || isLoading}
                    className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                  </Button>

                  {currentStep === pssQuestions.length - 1 ? (
                    <Button 
                      type="submit" 
                      size="sm" 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[140px]" 
                      disabled={isLoading || !currentAnswer}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Activity className="h-4 w-4 mr-2" />}
                      {isLoading ? 'Analyzing...' : 'View Results'}
                    </Button>
                  ) : (
                    <Button 
                      type="button" 
                      onClick={handleNext} 
                      size="sm" 
                      variant="secondary"
                      disabled={!currentAnswer}
                      className="min-w-[100px]"
                    >
                      Next <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  )}
                </div>

              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        /* --- RESULTS VIEW --- */
        <div ref={resultsRef} className="animate-in fade-in zoom-in-95 duration-400">
          <Card className="max-w-4xl mx-auto shadow-md border-t-4" style={{ borderTopColor: result.colorClass.includes('green') ? '#22c55e' : result.colorClass.includes('yellow') ? '#eab308' : '#ef4444' }}>
            <CardContent className="p-6 md:p-8 space-y-8">
              
              <div className="text-center space-y-2 relative">
                  <Button type="button" variant="ghost" size="sm" onClick={resetCalculator} className="absolute right-0 top-0 hidden md:flex text-slate-400 hover:text-slate-700">
                    <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Retake
                  </Button>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Your Assessment Result</p>
                  <h2 className={`text-3xl md:text-4xl font-extrabold ${result.colorClass}`}>{result.category}</h2>
                  <p className="max-w-xl mx-auto text-base text-slate-600 dark:text-slate-300 mt-2">{result.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center border-y border-slate-100 dark:border-slate-800 py-6 my-6">
                <div>
                  <ScoreGauge score={result.totalScore} colorClass={result.colorClass} />
                  <p className="text-center text-xs text-muted-foreground max-w-[200px] mx-auto">
                    A higher score indicates a higher level of perceived stress over the last 30 days.
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-indigo-500" /> Psychological Breakdown
                  </h3>
                  
                  <SubFactorBar 
                    label="Perceived Helplessness" 
                    score={result.helplessnessScore} 
                    max={24} 
                    description="How unpredictable and uncontrollable your life feels. Lower is better."
                    invertColor={false}
                  />
                  
                  <SubFactorBar 
                    label="Perceived Self-Efficacy" 
                    score={result.efficacyScore} 
                    max={16} 
                    description="Your confidence in handling problems. Higher is better."
                    invertColor={true}
                  />
                  
                  <div className="mt-4 p-3 bg-white dark:bg-slate-950 rounded-lg border border-indigo-100 dark:border-indigo-900 text-xs text-slate-700 dark:text-slate-300 flex gap-2">
                    <Activity className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Insight:</strong> {result.efficacyScore < 8 
                        ? "Self-confidence in coping is low. Focus on small, achievable daily wins." 
                        : result.helplessnessScore > 14 
                        ? "Stress is coming from external factors. Focus on strict boundary setting." 
                        : "You have a balanced view of your capabilities vs. external chaos."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-bold flex items-center gap-2 mb-3 text-slate-800 dark:text-slate-200">
                    <ShieldAlert className="w-4 h-4 text-indigo-500" /> Actionable Strategies
                  </h3>
                  <ul className="space-y-2.5">
                    {result.insights.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                        <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 font-bold text-[10px] mt-0.5">{index + 1}</div>
                        <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-center md:text-left">
                     <Button type="button" variant="outline" size="sm" onClick={resetCalculator} className="md:hidden">
                      <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Retake Test
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900 relative overflow-hidden flex flex-col justify-center">
                  <Activity className="absolute -right-4 -bottom-4 w-32 h-32 text-indigo-500/10" />
                  <h3 className="text-base font-bold flex items-center gap-2 mb-2 text-indigo-900 dark:text-indigo-300">
                    <Heart className="w-4 h-4 text-rose-500" /> Stress Alters Body Shape
                  </h3>
                  <p className="text-xs text-indigo-800/80 dark:text-indigo-400/80 mb-4 relative z-10 leading-relaxed">
                    Chronic stress creates excess cortisol, which directly signals your body to store stubborn belly fat, altering your natural proportions over time.
                  </p>
                  <Link href="/health/body-shape-calculator" className="inline-flex items-center justify-center rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-white text-indigo-700 hover:bg-slate-50 border border-indigo-200 shadow-sm h-9 px-4 relative z-10 w-fit group">
                    Check Body Shape <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}