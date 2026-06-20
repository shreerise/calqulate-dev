import type { MeasurementInput, DiabetesRiskResult } from "@/types/vitals";

/**
 * Type-2 diabetes risk — FINDRISC (Finnish Diabetes Risk Score,
 * Lindstrom & Tuomilehto, Diabetes Care 2003). Validated, points-based,
 * range 0-26, mapped to 10-year risk of developing type-2 diabetes.
 */

function bmiPoints(bmi: number): number {
  if (bmi < 25) return 0;
  if (bmi <= 30) return 1;
  return 3;
}

function agePoints(age: number): number {
  if (age < 45) return 0;
  if (age <= 54) return 2;
  if (age <= 64) return 3;
  return 4;
}

function waistPoints(sex: string, waistCm?: number): number {
  if (waistCm == null) return 0;
  if (sex === "male") {
    if (waistCm < 94) return 0;
    if (waistCm <= 102) return 3;
    return 4;
  }
  if (waistCm < 80) return 0;
  if (waistCm <= 88) return 3;
  return 4;
}

function riskFromScore(score: number): { pct: number; category: DiabetesRiskResult["category"] } {
  if (score < 7) return { pct: 1, category: "low" };
  if (score <= 11) return { pct: 4, category: "slightly-elevated" };
  if (score <= 14) return { pct: 17, category: "moderate" };
  if (score <= 20) return { pct: 33, category: "high" };
  return { pct: 50, category: "very-high" };
}

export function calculateDiabetesRisk(m: MeasurementInput): DiabetesRiskResult {
  if (m.diabetes) {
    return { available: true, findriscScore: null, tenYearRiskPercent: 100, category: "very-high" };
  }

  const heightM = m.heightCm / 100;
  const bmi = m.weightKg / (heightM * heightM);

  let score = 0;
  score += agePoints(m.age);
  score += bmiPoints(bmi);
  score += waistPoints(m.sex, m.waistCm);
  score += m.physicallyActive ? 0 : 2;
  score += m.eatsVegetablesDaily ? 0 : 1;
  score += m.onBpMeds ? 2 : 0;
  score += m.highGlucoseHistory ? 5 : 0;
  score += m.familyDiabetes ? 5 : 0;

  const { pct, category } = riskFromScore(score);
  return {
    available: true,
    findriscScore: score,
    tenYearRiskPercent: pct,
    category,
  };
}
