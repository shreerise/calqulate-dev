import type { MeasurementInput, BodyCompositionResult } from "@/types/vitals";

/**
 * Body composition metrics from anthropometric inputs.
 *  - BMI (WHO categories)
 *  - Waist-to-height ratio (Ashwell)
 *  - Relative Fat Mass (Woolcott & Bergman, 2018)
 *  - U.S. Navy body-fat method (requires waist/neck, and hip for women)
 *  - Lean body mass (Boer formula)
 */

function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  if (bmi < 35) return "Obese (Class I)";
  if (bmi < 40) return "Obese (Class II)";
  return "Obese (Class III)";
}

function navyBodyFat(m: MeasurementInput): number | null {
  const { sex, heightCm, waistCm, neckCm, hipCm } = m;
  if (waistCm == null || neckCm == null) return null;
  if (sex === "male") {
    if (waistCm - neckCm <= 0) return null;
    const bf =
      495 /
        (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) -
      450;
    return Math.round(bf * 10) / 10;
  }
  if (hipCm == null) return null;
  if (waistCm + hipCm - neckCm <= 0) return null;
  const bf =
    495 /
      (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.221 * Math.log10(heightCm)) -
    450;
  return Math.round(bf * 10) / 10;
}

export function calculateBodyComposition(m: MeasurementInput): BodyCompositionResult {
  const heightM = m.heightCm / 100;
  const bmi = m.weightKg / (heightM * heightM);

  const waistToHeight = m.waistCm != null ? Math.round((m.waistCm / m.heightCm) * 100) / 100 : null;

  let rfm: number | null = null;
  if (m.waistCm != null && m.waistCm > 0) {
    const base = m.sex === "male" ? 64 : 76;
    rfm = Math.round((base - 20 * (m.heightCm / m.waistCm)) * 10) / 10;
  }

  // Lean body mass — Boer formula (kg).
  const lbm =
    m.sex === "male"
      ? 0.407 * m.weightKg + 0.267 * m.heightCm - 19.2
      : 0.252 * m.weightKg + 0.473 * m.heightCm - 48.3;

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory: bmiCategory(bmi),
    waistToHeight,
    rfmPercent: rfm,
    navyBodyFatPercent: navyBodyFat(m),
    leanBodyMassKg: Math.round(lbm * 10) / 10,
  };
}
