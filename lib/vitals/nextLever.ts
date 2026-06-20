import type { MeasurementInput } from "@/types/vitals";
import { calculateAscvd } from "@/lib/clinical/ascvd";
import { calculateHeartAge } from "@/lib/clinical/framingham";
import { calculateDiabetesRisk } from "@/lib/clinical/diabetesRisk";
import { calculateBodyComposition } from "@/lib/clinical/bodyComposition";
import { calculateCompositeScore } from "@/lib/clinical/compositeScore";

/**
 * Calqulate Vitals — Counterfactual "Next Lever" Simulator
 * ========================================================
 *
 * WHY THIS EXISTS (the moat, part 2):
 * Generic advice ("eat healthy, exercise") is the #1 reason these products get
 * cancelled. The published risk formulas, on the other hand, are deterministic
 * forward models. So instead of *guessing* which change matters most, we run a
 * personalised COUNTERFACTUAL: for each modifiable factor we mutate ONLY that
 * factor toward a realistic, individualised target, re-run every validated
 * engine, and measure how far THIS user's 10-year risk and Metabolic Health
 * Score actually move. We then rank levers by impact-per-unit-of-effort.
 *
 * The output is the user's own numbers ("quit smoking → -6.2% 10-yr heart
 * risk", "lose 5 cm at the waist → +7 score points"), not platitudes. An LLM
 * can describe the formula; it cannot run YOUR personalised what-if against
 * YOUR full input vector and rank it by YOUR achievable deltas without being
 * this system.
 */

export interface LeverResult {
  factor: string;
  label: string;
  /** What we changed and to what target, in plain English. */
  change: string;
  /** Δ in the 0–100 Metabolic Health Score (positive = better). */
  scoreGain: number;
  /** Δ in 10-year ASCVD risk in percentage points (negative = risk falls). */
  ascvdDelta: number | null;
  /** Δ in 10-year diabetes risk in percentage points. */
  diabetesDelta: number | null;
  /** Δ in heart age in years (negative = younger heart). */
  heartAgeDelta: number | null;
  /** Effort 1 (easy) – 5 (hard); used to rank impact-per-effort. */
  effort: number;
  /** Final ranking key: benefit scaled by inverse effort. */
  priority: number;
  /** The single action to take. */
  action: string;
}

function buildSnapshot(m: MeasurementInput) {
  const ascvd = calculateAscvd(m);
  const heartAge = calculateHeartAge(m);
  const diabetes = calculateDiabetesRisk(m);
  const body = calculateBodyComposition(m);
  const composite = calculateCompositeScore({ ascvd, heartAge, diabetes, body });
  return { ascvd, heartAge, diabetes, body, composite };
}

/** A modifiable lever: how to mutate the input toward a realistic target. */
interface LeverDef {
  factor: string;
  label: string;
  effort: number;
  action: string;
  /** Returns a mutated input + a human description, or null if not applicable. */
  apply: (m: MeasurementInput) => { next: MeasurementInput; change: string } | null;
}

const LEVERS: LeverDef[] = [
  {
    factor: "smoking",
    label: "Quit smoking",
    effort: 4,
    action: "Ask your clinician about cessation support — risk starts dropping within weeks.",
    apply: (m) => (m.smoker ? { next: { ...m, smoker: false }, change: "Quit smoking" } : null),
  },
  {
    factor: "bloodPressure",
    label: "Lower blood pressure",
    effort: 3,
    action: "Cut sodium, move daily, and review BP management with your clinician.",
    apply: (m) => {
      if (m.systolicBp == null || m.systolicBp <= 120) return null;
      const target = Math.max(120, m.systolicBp - 10);
      return { next: { ...m, systolicBp: target }, change: `Lower systolic BP ${m.systolicBp} → ${target} mmHg` };
    },
  },
  {
    factor: "waist",
    label: "Reduce waist / weight",
    effort: 4,
    action: "Aim for a gradual 5–10% weight reduction while keeping protein high to protect muscle.",
    apply: (m) => {
      // 5% body-weight reduction; approximate waist drop ~ proportional.
      if (!m.weightKg) return null;
      const newWeight = Math.round(m.weightKg * 0.95 * 10) / 10;
      const next: MeasurementInput = { ...m, weightKg: newWeight };
      let change = `Lose 5% body weight (${m.weightKg} → ${newWeight} kg)`;
      if (m.waistCm) {
        const newWaist = Math.round((m.waistCm - 4) * 10) / 10;
        next.waistCm = newWaist;
        change = `Lose 5% body weight & ~4 cm at the waist (${m.waistCm} → ${newWaist} cm)`;
      }
      return { next, change };
    },
  },
  {
    factor: "hdl",
    label: "Raise HDL cholesterol",
    effort: 3,
    action: "Regular aerobic activity and fewer refined carbs both raise HDL over time.",
    apply: (m) => {
      if (m.hdl == null || m.hdl >= 60) return null;
      const target = Math.min(60, m.hdl + 8);
      return { next: { ...m, hdl: target }, change: `Raise HDL ${m.hdl} → ${target} mg/dL` };
    },
  },
  {
    factor: "activity",
    label: "Add daily movement",
    effort: 2,
    action: "Target 30 minutes of moderate activity most days; walking counts.",
    apply: (m) => (m.physicallyActive ? null : { next: { ...m, physicallyActive: true }, change: "Become physically active most days" }),
  },
  {
    factor: "cholesterol",
    label: "Lower total cholesterol",
    effort: 3,
    action: "Discuss diet and, if indicated, statin therapy with your clinician.",
    apply: (m) => {
      if (m.totalCholesterol == null || m.totalCholesterol <= 180) return null;
      const target = Math.max(180, m.totalCholesterol - 30);
      return { next: { ...m, totalCholesterol: target }, change: `Lower total cholesterol ${m.totalCholesterol} → ${target} mg/dL` };
    },
  },
];

const round1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Rank the user's highest-impact next levers by simulating each one against the
 * validated engines. Returns levers sorted by impact-per-effort.
 */
export function computeNextLevers(m: MeasurementInput, limit = 4): LeverResult[] {
  const base = buildSnapshot(m);
  const results: LeverResult[] = [];

  for (const lever of LEVERS) {
    const applied = lever.apply(m);
    if (!applied) continue;

    const sim = buildSnapshot(applied.next);

    const scoreGain = sim.composite.score - base.composite.score;
    const ascvdDelta =
      base.ascvd.tenYearRiskPercent != null && sim.ascvd.tenYearRiskPercent != null
        ? round1(sim.ascvd.tenYearRiskPercent - base.ascvd.tenYearRiskPercent)
        : null;
    const diabetesDelta =
      base.diabetes.tenYearRiskPercent != null && sim.diabetes.tenYearRiskPercent != null
        ? round1(sim.diabetes.tenYearRiskPercent - base.diabetes.tenYearRiskPercent)
        : null;
    const heartAgeDelta =
      base.heartAge.heartAge != null && sim.heartAge.heartAge != null
        ? sim.heartAge.heartAge - base.heartAge.heartAge
        : null;

    // Benefit = score points gained + risk points removed (ASCVD weighted 2x as
    // it is mortality-tied), then scaled by inverse effort so easy wins surface.
    const riskRemoved =
      (ascvdDelta != null ? -ascvdDelta * 2 : 0) +
      (diabetesDelta != null ? -diabetesDelta : 0);
    const benefit = Math.max(0, scoreGain) + Math.max(0, riskRemoved);
    const priority = benefit / Math.sqrt(lever.effort);

    if (benefit <= 0.05) continue;

    results.push({
      factor: lever.factor,
      label: lever.label,
      change: applied.change,
      scoreGain: round1(scoreGain),
      ascvdDelta,
      diabetesDelta,
      heartAgeDelta,
      effort: lever.effort,
      priority: round1(priority),
      action: lever.action,
    });
  }

  results.sort((a, b) => b.priority - a.priority);

  if (results.length === 0) {
    return [
      {
        factor: "maintain",
        label: "Maintain your trajectory",
        change: "Your modifiable risk factors are already in good ranges.",
        scoreGain: 0,
        ascvdDelta: null,
        diabetesDelta: null,
        heartAgeDelta: null,
        effort: 1,
        priority: 0,
        action: "Keep measuring monthly and re-test labs to confirm the trend holds.",
      },
    ];
  }

  return results.slice(0, limit);
}
