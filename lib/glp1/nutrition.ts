/**
 * Nutrition core — protein & fiber FIRST (calories secondary), the angle that
 * beats Glapp (no nutrition at all) and reframes Shotsy/MeAgain's calorie focus
 * toward muscle preservation on a GLP-1.
 *
 * Pure & deterministic — unit-testable, reusable by future mobile clients.
 */

export interface ProteinTarget {
  /** Recommended daily protein range, grams. */
  minG: number;
  maxG: number;
  basisKg: number; // the body weight used (actual, unless very high BF% → lean-based)
}

/**
 * Protein target for muscle preservation in a calorie deficit: 1.2–1.6 g/kg of
 * reference weight. Uses lean-adjusted weight when body-fat % is high so targets
 * aren't inflated by fat mass.
 */
export function proteinTarget(weightKg: number, bodyFatPct?: number): ProteinTarget {
  let basisKg = weightKg;
  if (typeof bodyFatPct === "number" && bodyFatPct > 30) {
    const leanKg = weightKg * (1 - bodyFatPct / 100);
    // protein scaled to lean mass + a margin, capped at actual weight
    basisKg = Math.min(weightKg, leanKg * 1.2);
  }
  return {
    minG: Math.round(basisKg * 1.2),
    maxG: Math.round(basisKg * 1.6),
    basisKg: Math.round(basisKg * 10) / 10,
  };
}

/** Daily fiber target: ~14 g per 1000 kcal, floored to the general 25–38 g guidance. */
export function fiberTargetG(calories?: number, sex?: "male" | "female"): { minG: number; maxG: number } {
  if (typeof calories === "number" && calories > 0) {
    const g = Math.round((calories / 1000) * 14);
    return { minG: Math.max(25, g - 3), maxG: Math.max(28, g + 3) };
  }
  return sex === "male" ? { minG: 30, maxG: 38 } : { minG: 25, maxG: 30 };
}

export interface MacroSplit {
  proteinG: number;
  carbsG: number;
  fatG: number;
  calories: number;
}

/** Calories implied by macros (4/4/9). Used to sanity-check / fill a missing field. */
export function caloriesFromMacros(proteinG: number, carbsG: number, fatG: number): number {
  return Math.round(proteinG * 4 + carbsG * 4 + fatG * 9);
}

export interface DailyNutritionTotals {
  proteinG: number;
  fiberG: number;
  calories: number;
  carbsG: number;
  fatG: number;
}

/** Sum a day's food logs into totals, treating missing optional fields as 0. */
export function sumDailyNutrition(
  logs: { proteinG: number; fiberG: number; calories?: number | null; carbsG?: number | null; fatG?: number | null }[],
): DailyNutritionTotals {
  return logs.reduce<DailyNutritionTotals>(
    (acc, l) => ({
      proteinG: round1(acc.proteinG + (l.proteinG || 0)),
      fiberG: round1(acc.fiberG + (l.fiberG || 0)),
      calories: acc.calories + (l.calories ?? 0),
      carbsG: round1(acc.carbsG + (l.carbsG ?? 0)),
      fatG: round1(acc.fatG + (l.fatG ?? 0)),
    }),
    { proteinG: 0, fiberG: 0, calories: 0, carbsG: 0, fatG: 0 },
  );
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}
