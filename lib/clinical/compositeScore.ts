import type {
  AscvdResult, HeartAgeResult, DiabetesRiskResult,
  BodyCompositionResult, CompositeScoreResult,
} from "@/types/vitals";

/**
 * Calqulate Metabolic Health Score (0-100, higher = healthier).
 *
 * This is a TRANSPARENT, EDUCATIONAL composite — not a validated clinical
 * index. It linearly maps each underlying (validated) result onto a 0-100
 * "good" subscore, then takes a confidence-weighted average. Documented so
 * users and clinicians can see exactly how it is derived.
 */

const clamp = (n: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, n));

// Map a 10-year ASCVD risk % to a 0-100 subscore (0% risk -> 100).
function ascvdSub(a: AscvdResult): number | null {
  if (!a.available || a.tenYearRiskPercent == null) return null;
  return clamp(100 - a.tenYearRiskPercent * 4); // 25% risk -> 0
}

function heartAgeSub(h: HeartAgeResult): number | null {
  if (!h.available || h.delta == null) return null;
  // delta of 0 -> 80; younger heart adds, older subtracts (3 pts/yr).
  return clamp(80 - h.delta * 3);
}

function diabetesSub(d: DiabetesRiskResult): number | null {
  if (!d.available || d.tenYearRiskPercent == null) return null;
  return clamp(100 - d.tenYearRiskPercent * 1.8); // 50% -> 10
}

function bodySub(b: BodyCompositionResult): number {
  // Waist-to-height is the strongest single anthropometric risk marker.
  let score = 100;
  if (b.waistToHeight != null) {
    // Optimal <= 0.5; penalise above.
    const over = Math.max(0, b.waistToHeight - 0.5);
    score -= over * 250; // 0.6 -> -25, 0.7 -> -50
  } else {
    // Fall back to BMI distance from 22.
    score -= Math.abs(b.bmi - 22) * 4;
  }
  return clamp(score);
}

function grade(score: number): CompositeScoreResult["grade"] {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export function calculateCompositeScore(parts: {
  ascvd: AscvdResult;
  heartAge: HeartAgeResult;
  diabetes: DiabetesRiskResult;
  body: BodyCompositionResult;
}): CompositeScoreResult {
  const subScores: Record<string, number> = {};
  const weighted: { v: number; w: number }[] = [];

  const a = ascvdSub(parts.ascvd);
  if (a != null) { subScores.cardiovascular = Math.round(a); weighted.push({ v: a, w: 0.35 }); }

  const h = heartAgeSub(parts.heartAge);
  if (h != null) { subScores.heartAge = Math.round(h); weighted.push({ v: h, w: 0.2 }); }

  const d = diabetesSub(parts.diabetes);
  if (d != null) { subScores.metabolic = Math.round(d); weighted.push({ v: d, w: 0.25 }); }

  const b = bodySub(parts.body);
  subScores.bodyComposition = Math.round(b);
  weighted.push({ v: b, w: 0.2 });

  const totalW = weighted.reduce((s, x) => s + x.w, 0);
  const score = Math.round(weighted.reduce((s, x) => s + x.v * x.w, 0) / totalW);

  const labCount = [parts.ascvd.available, parts.heartAge.available, parts.diabetes.available].filter(Boolean).length;
  const confidence: CompositeScoreResult["confidence"] = labCount >= 2 ? "high" : labCount === 1 ? "medium" : "low";

  return { score, grade: grade(score), subScores, confidence };
}
