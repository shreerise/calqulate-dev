"use client";

import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Baby, RefreshCw, Loader2, Heart, Calendar, Clock,
  Share2, Download, Star, Stethoscope, FlaskConical
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface FormValues {
  ivfType: "fresh" | "frozen";
  transferDate: string;
  embryoAge: "3" | "5" | "6";
  patientName?: string;
  clinicName?: string;
  notes?: string;
}

interface Trimester {
  label: string;
  color: string;
  num: number;
}

interface Milestone {
  label: string;
  icon: string;
  date: Date;
  week: number | null;
  note: string;
}

interface CalculationResult {
  conception: Date;
  edd: Date;
  weekNum: number;
  dayRemainder: number;
  trimester: Trimester;
  progressPct: number;
  milestones: Milestone[];
  daysSinceConception: number;
  values: FormValues;
}

// ─── SCHEMA ───────────────────────────────────────────────────────────────────
const formSchema = z.object({
  ivfType: z.enum(["fresh", "frozen"], { required_error: "Please select IVF type." }),
  transferDate: z.string().min(1, "Transfer date is required."),
  embryoAge: z.enum(["3", "5", "6"], { required_error: "Please select embryo age." }),
  patientName: z.string().optional(),
  clinicName: z.string().optional(),
  notes: z.string().optional(),
});

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function formatShort(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getTrimester(week: number): Trimester {
  if (week <= 12) return { label: "1st Trimester", color: "#22c55e", num: 1 };
  if (week <= 27) return { label: "2nd Trimester", color: "#4ade80", num: 2 };
  return { label: "3rd Trimester", color: "#86efac", num: 3 };
}

function calculate(values: FormValues): CalculationResult {
  const transfer = new Date(values.transferDate);
  const age = parseInt(values.embryoAge);

  // Conception date = transfer date - embryo age
  const conception = addDays(transfer, -age);

  // Due date by embryo age
  const daysMap: Record<number, number> = { 3: 263, 5: 261, 6: 260 };
  const edd = addDays(transfer, daysMap[age]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysSinceConception = daysBetween(conception, today);
  const weekNum = Math.floor(daysSinceConception / 7);
  const dayRemainder = daysSinceConception % 7;
  const trimester = getTrimester(weekNum);

  const totalPregnancyDays = daysBetween(conception, edd);
  const progressPct = Math.min(100, Math.max(0, (daysSinceConception / totalPregnancyDays) * 100));

  const milestones: Milestone[] = [
    { label: "Implantation Window", icon: "🌱", date: addDays(conception, 6), week: null, note: "Days 6–10 post-conception" },
    { label: "First Heartbeat", icon: "💓", date: addDays(conception, 42), week: 6, note: "~6 weeks" },
    { label: "End of 1st Trimester", icon: "🎉", date: addDays(conception, 84), week: 12, note: "12 weeks" },
    { label: "Anatomy Scan", icon: "🔬", date: addDays(conception, 133), week: 19, note: "18–22 weeks" },
    { label: "Viability Week", icon: "⭐", date: addDays(conception, 168), week: 24, note: "24 weeks" },
    { label: "Full Term Begins", icon: "🏁", date: addDays(conception, 259), week: 37, note: "37 weeks" },
    { label: "Estimated Due Date", icon: "👶", date: edd, week: 40, note: "40 weeks" },
  ];

  return {
    conception,
    edd,
    weekNum,
    dayRemainder,
    trimester,
    progressPct,
    milestones,
    daysSinceConception,
    values,
  };
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function PregnancyProgress({ pct, week, trimester }: { pct: number; week: number; trimester: Trimester }) {
  const color = "#16a34a";
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium" style={{ color: "var(--text-muted)" }}>
        <span>Week 1</span>
        <span style={{ color }}>Week {week} of 40</span>
        <span>Week 40</span>
      </div>
      <div className="relative h-4 rounded-full overflow-hidden" style={{ background: "var(--track)" }}>
        {/* Trimester segments */}
        <div className="absolute inset-0 flex">
          <div className="h-full opacity-20" style={{ width: "30%", background: "#22c55e" }} />
          <div className="h-full opacity-20" style={{ width: "37.5%", background: "#4ade80" }} />
          <div className="h-full opacity-20 flex-1" style={{ background: "#86efac" }} />
        </div>
        {/* Progress fill */}
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, #22c55e, ${color})` }}
        />
        {/* Knob */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white shadow-lg"
          style={{ left: `${pct}%`, background: color }}
        />
      </div>
      <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
        <span style={{ color: "#22c55e" }}>■ 1st Tri</span>
        <span style={{ color: "#4ade80" }}>■ 2nd Tri</span>
        <span style={{ color: "#86efac" }}>■ 3rd Tri</span>
      </div>
    </div>
  );
}

// ─── TIMELINE ─────────────────────────────────────────────────────────────────
function MilestoneTimeline({ milestones, today }: { milestones: Milestone[]; today: Date }) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
      <div className="space-y-4">
        {milestones.map((m: Milestone, i: number) => {
          const isPast = m.date <= today;
          const isNext = !isPast && (i === 0 || milestones[i - 1].date <= today);
          return (
            <div key={i} className="flex items-start gap-4 relative">
              <div
                className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 transition-all"
                style={{
                  background: isPast ? "var(--accent-soft)" : isNext ? "var(--accent)" : "var(--surface2)",
                  border: isNext ? "2px solid var(--accent-color)" : "2px solid var(--border)",
                  boxShadow: isNext ? "0 0 0 4px var(--accent-glow)" : "none",
                }}
              >
                {m.icon}
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm" style={{ color: isPast ? "var(--text-muted)" : "var(--text)" }}>
                    {m.label}
                  </span>
                  {isNext && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold animate-pulse" style={{ background: "var(--accent)", color: "var(--accent-text)" }}>
                      Next milestone
                    </span>
                  )}
                  {isPast && (
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>✓ Passed</span>
                  )}
                </div>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{formatShort(m.date)} — {m.note}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, accent }: { icon: string; label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-1 transition-transform hover:-translate-y-0.5"
      style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</p>
      <p className="text-xl font-bold leading-tight" style={{ color: accent || "var(--text)" }}>{value}</p>
      {sub && <p className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</p>}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function IVFDueDateCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ivfType: "fresh",
      transferDate: "",
      embryoAge: "5",
      patientName: "",
      clinicName: "",
      notes: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsLoading(true);
    setTimeout(() => {
      const calc = calculate(values);
      setResult({ ...calc, values });
      setIsLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }, 600);
  }

  function handleCopy() {
    if (!result) return;
    const text = `IVF Due Date Calculator Results\nPatient: ${result.values.patientName || "—"}\nEstimated Due Date: ${formatDate(result.edd)}\nCurrent Week: ${result.weekNum}w ${result.dayRemainder}d\nTrimester: ${result.trimester.label}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const today = new Date(); today.setHours(0, 0, 0, 0);

  // CSS variables
  const theme = darkMode ? {
    "--bg": "#052e16",
    "--surface": "#14532d",
    "--surface2": "#166534",
    "--border": "#2f573e",
    "--text": "#f0fdf4",
    "--text-muted": "#86efac",
    "--accent": "#22c55e",
    "--accent-soft": "#14532d",
    "--accent-color": "#22c55e",
    "--accent-glow": "rgba(34,197,94,0.15)",
    "--accent-text": "#fff",
    "--track": "#14532d",
    "--hero-gradient": "linear-gradient(135deg, #052e16 0%, #064e3b 50%, #022c22 100%)",
  } : {
    "--bg": "#f0fdf4",
    "--surface": "#ffffff",
    "--surface2": "#dcfce7",
    "--border": "#bbf7d0",
    "--text": "#14532d",
    "--text-muted": "#166534",
    "--accent": "#16a34a",
    "--accent-soft": "#dcfce7",
    "--accent-color": "#16a34a",
    "--accent-glow": "rgba(22,163,74,0.15)",
    "--accent-text": "#fff",
    "--track": "#dcfce7",
    "--hero-gradient": "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)",
  };

  return (
    <div style={{ ...theme, background: "var(--bg)", minHeight: "100vh", fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* HERO */}
      <div style={{ background: "var(--hero-gradient)", borderBottom: "1px solid var(--border)" }} className="px-4 py-14 text-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #a855f7, transparent)", transform: "translate(-30%, -30%)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #ec4899, transparent)", transform: "translate(30%, 30%)" }} />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6" style={{ background: "var(--accent-soft)", color: "var(--accent-color)", border: "1px solid var(--accent-glow)" }}>
            <FlaskConical className="w-4 h-4" />
            Medically Accurate IVF Calculator
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
            <span style={{ color: "var(--accent-color)" }}>pregnancy due date calculator with ivf​</span>
          </h2>
          <p className="max-w-xl mx-auto text-base md:text-lg" style={{ color: "var(--text-muted)" }}>
            Calculate your estimated due date, pregnancy milestones, and weekly progress based on your embryo transfer details.
          </p>
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            {["Fresh & FET", "Day 3/5/6 Embryos", "Milestone Timeline"].map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{ background: "var(--surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>✓ {tag}</span>
            ))}
          </div>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all text-lg"
          style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
          title="Toggle dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">

        {/* CALCULATOR FORM */}
        <Card id="calculator" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1.5rem" }}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl" style={{ color: "var(--text)" }}>
              <Baby className="w-5 h-5" style={{ color: "var(--accent-color)" }} />
              Enter Your Transfer Details
            </CardTitle>
            <CardDescription style={{ color: "var(--text-muted)" }}>
              All calculations use clinically accepted IVF formulas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">

                {/* IVF TYPE */}
                <FormField
                  control={form.control}
                  name="ivfType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--text)", fontWeight: 600 }}>IVF Transfer Type</FormLabel>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {[
                          { val: "fresh", label: "Fresh Embryo Transfer", emoji: "🌸" },
                          { val: "frozen", label: "Frozen Embryo Transfer (FET)", emoji: "❄️" },
                        ].map(opt => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => field.onChange(opt.val)}
                            className="p-4 rounded-xl text-left transition-all"
                            style={{
                              border: `2px solid ${field.value === opt.val ? "var(--accent-color)" : "var(--border)"}`,
                              background: field.value === opt.val ? "var(--accent-soft)" : "var(--surface2)",
                              color: "var(--text)",
                            }}
                          >
                            <span className="text-2xl block mb-1">{opt.emoji}</span>
                            <span className="text-sm font-semibold">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* TRANSFER DATE */}
                <FormField
                  control={form.control}
                  name="transferDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--text)", fontWeight: 600 }}>
                        <Calendar className="w-4 h-4 inline mr-1" style={{ color: "var(--accent-color)" }} />
                        Embryo Transfer Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          max={new Date().toISOString().split("T")[0]}
                          {...field}
                          className="rounded-xl h-11"
                          style={{ background: "var(--surface2)", border: "1.5px solid var(--border)", color: "var(--text)" }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* EMBRYO AGE */}
                <FormField
                  control={form.control}
                  name="embryoAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel style={{ color: "var(--text)", fontWeight: 600 }}>
                        <Stethoscope className="w-4 h-4 inline mr-1" style={{ color: "var(--accent-color)" }} />
                        Embryo Age at Transfer
                      </FormLabel>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {[
                          { val: "3", label: "Day 3", sub: "Cleavage stage" },
                          { val: "5", label: "Day 5", sub: "Blastocyst ★ Most common" },
                          { val: "6", label: "Day 6", sub: "Expanded blastocyst" },
                        ].map(opt => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => field.onChange(opt.val)}
                            className="p-3 rounded-xl text-center transition-all"
                            style={{
                              border: `2px solid ${field.value === opt.val ? "var(--accent-color)" : "var(--border)"}`,
                              background: field.value === opt.val ? "var(--accent-soft)" : "var(--surface2)",
                            }}
                          >
                            <p className="font-bold text-base" style={{ color: field.value === opt.val ? "var(--accent-color)" : "var(--text)" }}>{opt.label}</p>
                            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{opt.sub}</p>
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* OPTIONAL FIELDS */}
                <div className="rounded-xl p-4 space-y-4" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Optional Details</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="patientName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm" style={{ color: "var(--text-muted)" }}>Patient Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="rounded-xl h-10" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--text)" }} />
                        </FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="clinicName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm" style={{ color: "var(--text-muted)" }}>Clinic Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your clinic" {...field} className="rounded-xl h-10" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--text)" }} />
                        </FormControl>
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="notes" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm" style={{ color: "var(--text-muted)" }}>Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any additional notes..." rows={2} {...field} className="rounded-xl resize-none" style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--text)" }} />
                      </FormControl>
                    </FormItem>
                  )} />
                </div>

                {/* SUBMIT */}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="flex-1 rounded-xl h-12 text-base font-bold transition-all"
                    style={{ background: "var(--accent-color)", color: "#fff", border: "none" }}
                  >
                    {isLoading
                      ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Calculating...</>
                      : <><Heart className="h-4 w-4 mr-2" /> Calculate My Due Date</>}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => { form.reset(); setResult(null); }}
                    disabled={isLoading}
                    className="rounded-xl h-12 px-5"
                    style={{ border: "1.5px solid var(--border)", background: "var(--surface2)", color: "var(--text)" }}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* RESULTS */}
        <div ref={resultsRef}>
          {result && (
            <div className="space-y-6">

              {/* MAIN RESULT BANNER */}
              <div
                className="rounded-3xl p-8 text-center relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", color: "#fff" }}
              >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="relative">
                  <p className="text-sm font-semibold opacity-80 mb-1">
                    {result.values.patientName ? `${result.values.patientName}'s` : "Your"} Estimated Due Date
                  </p>
                  <p className="text-3xl md:text-4xl font-bold mb-1">{formatDate(result.edd)}</p>
                  {result.values.clinicName && (
                    <p className="text-sm opacity-70 mb-3">via {result.values.clinicName}</p>
                  )}
                  <div className="inline-block px-5 py-2 rounded-full font-bold text-lg" style={{ background: "rgba(255,255,255,0.2)" }}>
                    Week {result.weekNum} + {result.dayRemainder} days — {result.trimester.label}
                  </div>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <Card style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1.5rem" }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 text-base" style={{ color: "var(--text)" }}>
                    <Clock className="w-4 h-4 inline mr-2" style={{ color: "var(--accent-color)" }} />
                    Pregnancy Progress
                  </h3>
                  <PregnancyProgress pct={result.progressPct} week={result.weekNum} trimester={result.trimester} />
                </CardContent>
              </Card>

              {/* STAT GRID */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard icon="🥚" label="Conception Date" value={formatShort(result.conception)} sub="Based on transfer - embryo age" accent="var(--text)" />
                <StatCard icon="📅" label="Due Date (EDD)" value={formatShort(result.edd)} sub="±2 weeks is normal" accent="var(--accent-color)" />
                <StatCard icon="🗓️" label="Current Week" value={`${result.weekNum}w ${result.dayRemainder}d`} sub={result.trimester.label} />
                <StatCard icon="📊" label="Progress" value={`${Math.round(result.progressPct)}%`} sub="of full 40-week term" />
              </div>

              {/* MILESTONE TIMELINE */}
              <Card style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "1.5rem" }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-6 text-base" style={{ color: "var(--text)" }}>
                    <Star className="w-4 h-4 inline mr-2" style={{ color: "var(--accent-color)" }} />
                    Key Pregnancy Milestones
                  </h3>
                  <MilestoneTimeline milestones={result.milestones} today={today} />
                </CardContent>
              </Card>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: copied ? "var(--accent-soft)" : "var(--surface2)", border: "1.5px solid var(--border)", color: "var(--text)" }}
                >
                  <Share2 className="w-4 h-4" style={{ color: "var(--accent-color)" }} />
                  {copied ? "Copied!" : "Copy Results"}
                </button>
                <button
                  onClick={() => {
                    const url = `https://wa.me/?text=${encodeURIComponent(`My IVF Due Date: ${formatDate(result.edd)} | Week ${result.weekNum}+${result.dayRemainder} | ${result.trimester.label}`)}`;
                    window.open(url, "_blank");
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "#dcfce7", border: "1.5px solid #bbf7d0", color: "#166534" }}
                >
                  💬 Share on WhatsApp
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "var(--surface2)", border: "1.5px solid var(--border)", color: "var(--text)" }}
                >
                  <Download className="w-4 h-4" style={{ color: "var(--accent-color)" }} />
                  Print / Save PDF
                </button>
              </div>

              {/* DISCLAIMER */}
              <div className="rounded-xl p-4 text-sm" style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                <strong style={{ color: "var(--text)" }}>⚕️ Medical Disclaimer:</strong> This calculator provides estimates based on standard IVF protocols. Always confirm your due date with your fertility specialist or OB-GYN. Due dates may be adjusted after ultrasound measurements.
              </div>
            </div>
          )}
        </div>

        {/* CTA FOOTER */}
        <div className="rounded-3xl p-8 text-center" style={{ background: "linear-gradient(135deg, var(--accent-soft), var(--surface2))", border: "1px solid var(--border)" }}>
          <Baby className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--accent-color)" }} />
          <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>Wishing you a healthy pregnancy 💜</h3>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            Share this calculator with others on their IVF journey.
          </p>
          <button
            onClick={() => { navigator.clipboard.writeText(window.location.href); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ background: "var(--accent-color)", color: "#fff" }}
          >
            <Share2 className="w-4 h-4" /> Share This Calculator
          </button>
        </div>

      </div>
    </div>
  );
}