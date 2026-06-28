/**
 * GLP-1 coaching derivations — pure, presentation-only (no backend, no persistence).
 *
 * Turns data the dashboard already has (weights, doses, food, check-ins, body comp)
 * into coaching insights: pace, projection, a weekly health score and contextual
 * nudges. Everything here is an ESTIMATE for guidance, clearly labelled as such in
 * the UI — never a guarantee or medical advice.
 */

import { proteinTarget } from "./nutrition";

const WEEK_MS = 7 * 24 * 3_600_000;
const LB = 2.2046226218;

export interface WeightPoint { takenAt: string; weightKg: number }

/** Average kg lost per week across the logged window (positive = losing). */
export function weeklyPaceKg(weights: WeightPoint[]): number | null {
  if (weights.length < 2) return null;
  const sorted = [...weights].sort((a, b) => Date.parse(a.takenAt) - Date.parse(b.takenAt));
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const spanWeeks = (Date.parse(last.takenAt) - Date.parse(first.takenAt)) / WEEK_MS;
  if (spanWeeks <= 0) return null;
  return Math.round(((first.weightKg - last.weightKg) / spanWeeks) * 100) / 100;
}

/** Naive next-week projection from current weight and pace. */
export function projectedNextWeekKg(currentKg: number, paceKg: number | null): number | null {
  if (paceKg == null) return null;
  return Math.round((currentKg - paceKg) * 10) / 10;
}

export interface JourneyMetrics {
  currentKg: number;
  baselineKg: number;
  lostKg: number;
  lostLb: number;
  paceKgPerWeek: number | null;
  projectedNextKg: number | null;
  weeksOnMed: number | null;
}

export function journeyMetrics(weights: WeightPoint[], medStartDate?: string): JourneyMetrics | null {
  if (weights.length === 0) return null;
  const sorted = [...weights].sort((a, b) => Date.parse(a.takenAt) - Date.parse(b.takenAt));
  const baselineKg = sorted[0].weightKg;
  const currentKg = sorted[sorted.length - 1].weightKg;
  const lostKg = Math.round((baselineKg - currentKg) * 10) / 10;
  const paceKgPerWeek = weeklyPaceKg(weights);
  return {
    currentKg,
    baselineKg,
    lostKg,
    lostLb: Math.round(lostKg * LB * 10) / 10,
    paceKgPerWeek,
    projectedNextKg: projectedNextWeekKg(currentKg, paceKgPerWeek),
    weeksOnMed: medStartDate ? Math.max(0, Math.floor((Date.now() - Date.parse(medStartDate)) / WEEK_MS)) : null,
  };
}

/** Goal-dependent projection (goal stored client-side; never persisted server-side). */
export function goalProjection(currentKg: number, goalKg: number, paceKg: number | null) {
  const remainingKg = Math.round((currentKg - goalKg) * 10) / 10;
  if (remainingKg <= 0) return { remainingKg: 0, etaWeeks: null as number | null, reached: true };
  if (!paceKg || paceKg <= 0) return { remainingKg, etaWeeks: null as number | null, reached: false };
  const etaWeeks = Math.ceil(remainingKg / paceKg);
  return { remainingKg, etaWeeks, reached: false };
}

// ─── Weekly health score (last 7 days) ────────────────────────────────────────

export interface WeeklyScoreInputs {
  currentKg: number;
  bodyFatPct?: number;
  foods: { loggedAt: string; proteinG: number }[];
  water: { loggedAt: string; volumeMl: number }[];
  exercises: { loggedAt: string }[];
  checkins: { loggedAt: string; sleepHours: number | null }[];
}

export interface WeeklyScore {
  nutrition: number;
  hydration: number;
  exercise: number;
  sleep: number;
  overall: number;
  proteinTargetG: number;
  tip: string;
}

const clampPct = (n: number) => Math.max(0, Math.min(100, Math.round(n)));
const inLast7 = (iso: string, nowMs: number) => nowMs - Date.parse(iso) <= WEEK_MS;

export function weeklyHealthScore(inp: WeeklyScoreInputs): WeeklyScore {
  const nowMs = Date.now();
  const pt = proteinTarget(inp.currentKg, inp.bodyFatPct);

  const proteinDays = inp.foods.filter((f) => inLast7(f.loggedAt, nowMs));
  const avgProtein = proteinDays.length ? proteinDays.reduce((s, f) => s + (f.proteinG || 0), 0) / 7 : 0;
  const nutrition = clampPct((avgProtein / pt.minG) * 100);

  const waterDays = inp.water.filter((w) => inLast7(w.loggedAt, nowMs));
  const avgWater = waterDays.length ? waterDays.reduce((s, w) => s + (w.volumeMl || 0), 0) / 7 : 0;
  const hydration = clampPct((avgWater / 2500) * 100);

  const sessions = inp.exercises.filter((e) => inLast7(e.loggedAt, nowMs)).length;
  const exercise = clampPct((sessions / 4) * 100);

  const sleeps = inp.checkins.filter((c) => inLast7(c.loggedAt, nowMs) && c.sleepHours != null);
  const avgSleep = sleeps.length ? sleeps.reduce((s, c) => s + (c.sleepHours || 0), 0) / sleeps.length : 0;
  const sleep = clampPct((avgSleep / 8) * 100);

  const overall = Math.round((nutrition + hydration + exercise + sleep) / 4);

  // Lowest pillar drives the tip.
  const lowest = [
    { k: "nutrition", v: nutrition, tip: `Protein looks low — aim for ~${pt.minG}–${pt.maxG} g/day to protect muscle while you lose fat.` },
    { k: "exercise", v: exercise, tip: "Add a resistance-training session this week — it's the key lever for keeping muscle." },
    { k: "hydration", v: hydration, tip: "Sip more water through the day — GLP-1s can blunt thirst, so it's easy to fall short." },
    { k: "sleep", v: sleep, tip: "Aim for 7–8 hours — sleep supports appetite control and recovery." },
  ].sort((a, b) => a.v - b.v)[0];

  return { nutrition, hydration, exercise, sleep, overall, proteinTargetG: pt.minG, tip: lowest.tip };
}

// ─── Contextual coach messages ────────────────────────────────────────────────

export type CoachTone = "success" | "info" | "warn";
export interface CoachMessage { tone: CoachTone; title: string; body: string }

export interface CoachInputs {
  journey: JourneyMetrics | null;
  weekly: WeeklyScore | null;
  nextDoseLabel: string | null;
  nextDoseDueSoon: boolean; // due within ~36h
  muscleFlag: "ok" | "watch" | "high" | null;
  hasMedication: boolean;
  hasWeights: boolean;
}

/** Priority-ordered coaching messages; the UI shows the top one or two. */
export function coachMessages(i: CoachInputs): CoachMessage[] {
  const out: CoachMessage[] = [];

  if (!i.hasMedication) {
    out.push({ tone: "info", title: "Let's set up your journey", body: "Add your medication to unlock dose reminders, your medication-level curve and a personalised plan." });
    return out;
  }

  // Milestone celebration (every ~5 kg).
  if (i.journey && i.journey.lostKg >= 5) {
    const milestone = Math.floor(i.journey.lostKg / 5) * 5;
    out.push({
      tone: "success",
      title: `🎉 You've lost ${i.journey.lostLb} lb (${i.journey.lostKg} kg)!`,
      body: i.muscleFlag === "ok"
        ? "Crossed a milestone — and your body composition shows you're protecting muscle well. Keep going."
        : `Crossed the ${milestone} kg mark. Keep an eye on protein and resistance training to hold onto muscle.`,
    });
  }

  // Injection-day nudge.
  if (i.nextDoseDueSoon) {
    out.push({ tone: "info", title: "Dose coming up", body: `Your next dose is ${i.nextDoseLabel ?? "due soon"}. Tip: drink extra water around your shot to ease side-effects.` });
  }

  // Muscle-loss warning.
  if (i.muscleFlag === "high") {
    out.push({ tone: "warn", title: "Watch your muscle", body: "A large share of your recent loss is lean mass. Prioritise protein and resistance training, and consider a slower rate of loss." });
  }

  // Low pillar nudge.
  if (i.weekly && i.weekly.overall > 0 && (i.weekly.nutrition < 60 || i.weekly.exercise < 50)) {
    out.push({ tone: "warn", title: "One thing to fix this week", body: i.weekly.tip });
  }

  if (out.length === 0) {
    out.push({
      tone: "success",
      title: i.hasWeights ? "You're on track — keep logging" : "Welcome to your GLP-1 journey",
      body: i.hasWeights
        ? "Daily numbers bounce around; your weekly trend is what matters. Log today to keep your coach sharp."
        : "Log your weight, doses and meals and your coach will turn them into progress, projections and a weekly plan.",
    });
  }

  return out;
}
