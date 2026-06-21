import type { MeasurementInput } from "@/types/vitals";
import { buildVitalsReport } from "@/lib/clinical";

/**
 * Calqulate v2 — Biological Age + Longevity Index (pure functions).
 *
 * TRANSPARENCY: these are EDUCATIONAL composites built from validated component
 * models, not a clinically validated single index. Every adjustment is a
 * documented constant so the methodology can be shown to the user on hover.
 */

/** Superset of a measurement with optional longevity biomarkers. */
export interface HealthInput extends MeasurementInput {
  ldl?: number;
  triglycerides?: number;
  fastingGlucose?: number;
  hba1c?: number;
  vo2Max?: number;
  sleepHours?: number;
  steps?: number;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/**
 * Biological age — a transparent biomarker-weighted estimate (Klemera-Doubal
 * inspired). Starts from chronological age and adds documented per-unit-of-
 * deviation penalties/credits for each marker that is present.
 */
export interface BioAgeResult {
  biologicalAge: number;
  chronologicalAge: number;
  delta: number; // bio - chrono (negative = younger)
  contributions: { marker: string; years: number }[]; // signed year impact
}

export function calcBiologicalAge(m: HealthInput): BioAgeResult {
  const chrono = m.age;
  const heightM = m.heightCm / 100;
  const bmi = m.weightKg / (heightM * heightM);
  const w2h = m.waistCm ? m.waistCm / m.heightCm : (bmi - 22) / 20 + 0.5;

  const contributions: { marker: string; years: number }[] = [];
  const add = (marker: string, years: number) => {
    if (Math.abs(years) > 0.05) contributions.push({ marker, years: Math.round(years * 10) / 10 });
  };

  // Each line: deviation from optimal × documented years-per-unit.
  if (m.systolicBp != null) add("Blood pressure", (m.systolicBp - 115) * 0.05);
  if (m.fastingGlucose != null) add("Fasting glucose", (m.fastingGlucose - 85) * 0.06);
  if (m.hba1c != null) add("HbA1c", (m.hba1c - 5.0) * 3.0);
  if (m.hdl != null) add("HDL cholesterol", (55 - m.hdl) * 0.08);
  if (m.ldl != null) add("LDL cholesterol", (m.ldl - 100) * 0.02);
  if (m.triglycerides != null) add("Triglycerides", (m.triglycerides - 100) * 0.012);
  add("Waist-to-height", (w2h - 0.5) * 35);
  if (m.smoker) add("Smoking", 6);
  if (m.vo2Max != null) add("Cardio fitness (VO2max)", (40 - m.vo2Max) * 0.18);
  if (m.steps != null) add("Daily steps", (7000 - m.steps) / 1000 * 0.4);
  if (m.sleepHours != null) add("Sleep", Math.abs(m.sleepHours - 7.5) * 0.7);
  if (m.physicallyActive === false) add("Inactivity", 1.5);

  const totalYears = contributions.reduce((s, c) => s + c.years, 0);
  const bio = clamp(chrono + totalYears, Math.max(18, chrono - 15), chrono + 30);
  const biologicalAge = Math.round(bio * 10) / 10;
  // Sort by absolute impact for display.
  contributions.sort((a, b) => Math.abs(b.years) - Math.abs(a.years));
  return { biologicalAge, chronologicalAge: chrono, delta: Math.round((biologicalAge - chrono) * 10) / 10, contributions };
}

/**
 * Longevity Index (0–1000) — a weighted roll-up of the validated risk engines
 * plus fitness & glucose control. Higher = better. Comes with ranked "levers":
 * the highest-impact changes, each quantified in index points.
 */
export interface LongevityLever {
  label: string;
  points: number; // index points gained
  action: string;
}
export interface LongevityResult {
  index: number; // 0–1000
  band: "Critical" | "At risk" | "Average" | "Strong" | "Elite";
  subScores: { cardiovascular: number; metabolic: number; bodyComposition: number; fitness: number; glucose: number };
  levers: LongevityLever[];
}

function rawLongevity(m: HealthInput): { index: number; sub: LongevityResult["subScores"] } {
  const report = buildVitalsReport(m);
  const heightM = m.heightCm / 100;
  const bmi = m.weightKg / (heightM * heightM);
  const w2h = m.waistCm ? m.waistCm / m.heightCm : (bmi - 22) / 20 + 0.5;

  // Cardiovascular (0–300): from 10-yr ASCVD if available, else composite cardio sub.
  const ascvd = report.ascvd.tenYearRiskPercent;
  const cardiovascular = ascvd != null
    ? 300 * (1 - clamp(ascvd, 0, 30) / 30)
    : 300 * (report.composite.subScores.cardiovascular ?? 60) / 100;

  // Metabolic (0–250): diabetes risk.
  const dia = report.diabetes.tenYearRiskPercent ?? 10;
  const metabolic = 250 * (1 - clamp(dia, 0, 50) / 50);

  // Body composition (0–200): waist-to-height anchored.
  const bodyComposition = 200 * clamp(1 - Math.max(0, w2h - 0.5) / 0.25, 0, 1);

  // Fitness (0–150): VO2max + steps + sleep.
  let fitness = 0;
  fitness += 90 * clamp((m.vo2Max ?? 35) / 50, 0, 1);
  fitness += 40 * clamp((m.steps ?? 6000) / 12000, 0, 1);
  fitness += 20 * clamp(1 - Math.abs((m.sleepHours ?? 7) - 7.5) / 3, 0, 1);
  fitness = clamp(fitness, 0, 150);

  // Glucose control (0–100): HbA1c / fasting glucose.
  let glucose = 100;
  if (m.hba1c != null) glucose = 100 * clamp(1 - Math.max(0, m.hba1c - 5.0) / 2.4, 0, 1);
  else if (m.fastingGlucose != null) glucose = 100 * clamp(1 - Math.max(0, m.fastingGlucose - 85) / 100, 0, 1);
  else glucose = 70;

  const sub = {
    cardiovascular: Math.round(cardiovascular),
    metabolic: Math.round(metabolic),
    bodyComposition: Math.round(bodyComposition),
    fitness: Math.round(fitness),
    glucose: Math.round(glucose),
  };
  const index = Math.round(clamp(cardiovascular + metabolic + bodyComposition + fitness + glucose, 0, 1000));
  return { index, sub };
}

function band(index: number): LongevityResult["band"] {
  if (index >= 850) return "Elite";
  if (index >= 700) return "Strong";
  if (index >= 500) return "Average";
  if (index >= 350) return "At risk";
  return "Critical";
}

export function calcLongevityIndex(m: HealthInput): LongevityResult {
  const base = rawLongevity(m);

  // Counterfactual levers: improve one factor toward target, re-score, rank.
  const candidates: { label: string; action: string; apply: (x: HealthInput) => HealthInput | null }[] = [
    { label: "Quit smoking", action: "Cessation support — risk drops within weeks.", apply: (x) => (x.smoker ? { ...x, smoker: false } : null) },
    { label: "Lower waist by ~8 cm", action: "Gradual 5–10% fat loss while keeping protein high.", apply: (x) => (x.waistCm ? { ...x, waistCm: x.waistCm - 8, weightKg: x.weightKg * 0.95 } : { ...x, weightKg: x.weightKg * 0.93 }) },
    { label: "Get systolic BP to 120", action: "Reduce sodium, move daily, review meds with your clinician.", apply: (x) => (x.systolicBp && x.systolicBp > 120 ? { ...x, systolicBp: 120 } : null) },
    { label: "Raise VO2max by 5", action: "Add 2 zone-2 cardio sessions per week.", apply: (x) => ({ ...x, vo2Max: (x.vo2Max ?? 35) + 5 }) },
    { label: "Hit 10,000 steps/day", action: "Daily walks — NEAT compounds.", apply: (x) => ((x.steps ?? 6000) < 10000 ? { ...x, steps: 10000 } : null) },
    { label: "Lower HbA1c by 0.4%", action: "Fiber, protein, post-meal walks.", apply: (x) => (x.hba1c && x.hba1c > 5.4 ? { ...x, hba1c: x.hba1c - 0.4 } : null) },
    { label: "Raise HDL by 8", action: "Aerobic activity and fewer refined carbs.", apply: (x) => (x.hdl != null && x.hdl < 60 ? { ...x, hdl: x.hdl + 8 } : null) },
  ];

  const levers: LongevityLever[] = [];
  for (const c of candidates) {
    const next = c.apply(m);
    if (!next) continue;
    const after = rawLongevity(next).index;
    const points = after - base.index;
    if (points > 2) levers.push({ label: c.label, action: c.action, points });
  }
  levers.sort((a, b) => b.points - a.points);

  return { index: base.index, band: band(base.index), subScores: base.sub, levers: levers.slice(0, 4) };
}
