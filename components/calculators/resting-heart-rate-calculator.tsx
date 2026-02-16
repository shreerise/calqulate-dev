"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Activity, Timer, RefreshCw, Zap, ShieldCheck, Info } from "lucide-react";

// --- HELPERS ---
const calculateZones = (age: number, rhr: number) => {
  const maxHR = 220 - age;
  const hrr = maxHR - rhr; // Heart Rate Reserve

  const zones = [
    { label: "Very Light", range: "50-60%", color: "bg-yellow-100 border-yellow-400", text: "text-yellow-700" },
    { label: "Light", range: "60-70%", color: "bg-orange-100 border-orange-400", text: "text-orange-700" },
    { label: "Moderate", range: "70-80%", color: "bg-orange-200 border-orange-500", text: "text-orange-800" },
    { label: "Hard", range: "80-90%", color: "bg-red-100 border-red-400", text: "text-red-700" },
    { label: "VO2 Max (Maximum)", range: "90-100%", color: "bg-red-600 border-red-700", text: "text-white" },
  ];

  return zones.map((z) => {
    const lowPerc = parseInt(z.range.split("-")[0]) / 100;
    const highPerc = parseInt(z.range.split("-")[1]) / 100;
    const lowBpm = Math.round(hrr * lowPerc + rhr);
    const highBpm = Math.round(hrr * highPerc + rhr);
    return { ...z, bpmRange: `${lowBpm} - ${highBpm}` };
  });
};

const HeartRateGauge = ({ bpm }: { bpm: number }) => {
  const getPosition = (val: number) => {
    const min = 40;
    const max = 110;
    const percent = ((val - min) / (max - min)) * 100;
    return Math.max(0, Math.min(100, percent));
  };

  const getStatus = (val: number) => {
    if (val < 60) return { label: "Athletic / Excellent", color: "text-blue-600" };
    if (val <= 75) return { label: "Good / Healthy", color: "text-green-600" };
    if (val <= 85) return { label: "Average", color: "text-yellow-600" };
    return { label: "Above Average / High", color: "text-red-600" };
  };

  const status = getStatus(bpm);

  return (
    <div className="w-full py-4">
      <div className="relative w-full h-3 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 rounded-full">
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-primary rounded-full shadow-md transition-all duration-500"
          style={{ left: `${getPosition(bpm)}%` }}
        />
      </div>
      <p className={`text-center mt-3 font-bold ${status.color}`}>{status.label}</p>
    </div>
  );
};

export default function RestingHeartRateCalculator() {
  const [age, setAge] = useState<number | "">(30);
  const [bpmInput, setBpmInput] = useState<number | "">("");
  const [result, setResult] = useState<{ rhr: number; age: number } | null>(null);
  const [taps, setTaps] = useState<number[]>([]);
  const [isTapping, setIsTapping] = useState(false);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bpmInput && age) setResult({ rhr: Number(bpmInput), age: Number(age) });
  };

  const handleTap = () => {
    const now = Date.now();
    setIsTapping(true);
    setTaps((prev) => {
      const newTaps = [...prev, now].slice(-10);
      if (newTaps.length >= 2) {
        const intervals = [];
        for (let i = 1; i < newTaps.length; i++) intervals.push(newTaps[i] - newTaps[i - 1]);
        const avg = intervals.reduce((a, b) => a + b) / intervals.length;
        setBpmInput(Math.round(60000 / avg));
      }
      return newTaps;
    });
    setTimeout(() => setIsTapping(false), 100);
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-4xl mx-auto border-t-4 border-t-red-500 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Heart className="text-red-500 animate-pulse" /> Pulse & Training Zone Expert</CardTitle>
          <CardDescription>Measure your resting pulse to generate a personalized aerobic exercise blueprint.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-slate-50 rounded-lg border flex flex-col md:flex-row gap-4 items-center">
             <div className="flex-1 w-full">
                <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Your Age</label>
                <Input type="number" value={age} onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))} className="text-lg" />
             </div>
             <p className="text-xs text-muted-foreground md:max-w-[200px]">Age is required to calculate your personalized Target Heart Rate zones.</p>
          </div>

          <Tabs defaultValue="manual">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="tap">Tap Live Pulse</TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Resting BPM</label>
                <div className="relative">
                  <Input type="number" placeholder="Enter your RHR" value={bpmInput} onChange={(e) => setBpmInput(e.target.value === "" ? "" : Number(e.target.value))} className="text-xl py-6 pr-16" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">BPM</span>
                </div>
              </div>
              <Button onClick={() => bpmInput && age && setResult({rhr: Number(bpmInput), age: Number(age)})} className="w-full h-12 text-lg bg-red-600 hover:bg-red-700">Calculate My Profile</Button>
            </TabsContent>

            <TabsContent value="tap" className="text-center space-y-4">
               <div className="py-8 border-2 border-dashed rounded-xl bg-slate-50/50">
                  <div className="text-5xl font-black text-red-600 mb-6">{bpmInput || "--"} <span className="text-lg font-normal text-muted-foreground">BPM</span></div>
                  <button 
                    onMouseDown={handleTap} 
                    className={`w-28 h-28 rounded-full shadow-xl transition-all flex items-center justify-center border-4 ${isTapping ? "scale-90 bg-red-500 border-red-200" : "bg-white border-slate-100 hover:border-red-200"}`}
                  >
                    <Zap className={`w-10 h-10 ${isTapping ? "text-white" : "text-red-500"}`} />
                  </button>
                  <p className="mt-4 text-sm text-muted-foreground italic">Tap your screen in time with your pulse</p>
               </div>
               <Button disabled={!bpmInput} onClick={() => bpmInput && age && setResult({rhr: Number(bpmInput), age: Number(age)})} className="w-full">Analyze This Pulse</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {result && (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Card className="overflow-hidden border-none shadow-xl">
            <div className="bg-slate-900 text-white p-8 text-center">
               <h3 className="text-slate-400 uppercase tracking-widest text-sm font-bold mb-2">Resting Heart Rate Analysis</h3>
               <div className="flex items-center justify-center gap-4">
                  <span className="text-7xl font-black">{result.rhr}</span>
                  <div className="text-left">
                    <div className="text-xl font-bold leading-tight">BPM</div>
                    <div className="text-red-400 text-sm">Beats Per Minute</div>
                  </div>
               </div>
               <div className="max-w-xs mx-auto mt-4">
                 <HeartRateGauge bpm={result.rhr} />
               </div>
            </div>

            <CardContent className="p-0">
               <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Activity className="text-red-500 w-5 h-5" />
                    <h3 className="text-xl font-bold">Your Personalized Target Heart Rate Zones</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Based on your age of <strong>{result.age}</strong> and RHR of <strong>{result.rhr}</strong>, here are your optimal zones for aerobic exercise calculated using the Karvonen formula:
                  </p>

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 text-sm uppercase">
                          <th className="p-4 font-bold border-b">Exercise Intensity</th>
                          <th className="p-4 font-bold border-b">Heart Rate Reserve</th>
                          <th className="p-4 font-bold border-b">Target Range (BPM)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculateZones(result.age, result.rhr).map((zone, i) => (
                          <tr key={i} className={`border-b last:border-0 hover:bg-slate-50 transition-colors`}>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${zone.color.split(' ')[0]}`} />
                                <span className="font-bold text-slate-800">{zone.label}</span>
                              </div>
                            </td>
                            <td className="p-4 text-slate-600 font-medium">{zone.range}</td>
                            <td className={`p-4 font-black text-lg ${zone.text}`}>{zone.bpmRange}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-8">
                    <div className="flex gap-4 p-4 bg-blue-50 rounded-xl">
                       <ShieldCheck className="text-blue-600 w-6 h-6 shrink-0" />
                       <div>
                          <p className="font-bold text-blue-900 text-sm">Health Insight</p>
                          <p className="text-xs text-blue-700 mt-1">Consistency is key. Aim for Zone 2-3 (Light to Moderate) for at least 150 minutes per week to strengthen your heart and lower your RHR.</p>
                       </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-amber-50 rounded-xl">
                       <Timer className="text-amber-600 w-6 h-6 shrink-0" />
                       <div>
                          <p className="font-bold text-amber-900 text-sm">Measurement Tip</p>
                          <p className="text-xs text-amber-700 mt-1">For maximum accuracy, take this measurement again tomorrow morning immediately after waking up, while still in bed.</p>
                       </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" onClick={() => setResult(null)} className="w-full mt-6 text-slate-400">
                    <RefreshCw className="w-4 h-4 mr-2" /> Recalculate
                  </Button>
               </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}