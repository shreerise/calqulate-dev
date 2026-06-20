import type { MeasurementInput, HeartAgeResult } from "@/types/vitals";

/**
 * Framingham General CVD 10-year risk + "Heart Age" / vascular age.
 * Based on D'Agostino RB et al., Circulation 2008 (lipid model).
 *
 * Heart age = the chronological age of a person with all-optimal risk
 * factors whose Framingham 10-year risk equals this person's risk.
 */

interface FramCoef {
  lnAge: number;
  lnTotChol: number;
  lnHdl: number;
  lnSbpUntreated: number;
  lnSbpTreated: number;
  smoker: number;
  diabetes: number;
  baselineSurvival: number;
  meanSum: number;
}

const MEN: FramCoef = {
  lnAge: 3.06117, lnTotChol: 1.1237, lnHdl: -0.93263,
  lnSbpUntreated: 1.93303, lnSbpTreated: 1.99881,
  smoker: 0.65451, diabetes: 0.57367,
  baselineSurvival: 0.88936, meanSum: 23.9802,
};

const WOMEN: FramCoef = {
  lnAge: 2.32888, lnTotChol: 1.20904, lnHdl: -0.70833,
  lnSbpUntreated: 2.76157, lnSbpTreated: 2.82263,
  smoker: 0.52873, diabetes: 0.69154,
  baselineSurvival: 0.95012, meanSum: 26.1931,
};

function framRisk(c: FramCoef, p: {
  age: number; totChol: number; hdl: number; sbp: number;
  treated: boolean; smoker: boolean; diabetes: boolean;
}): number {
  let sum = 0;
  sum += c.lnAge * Math.log(p.age);
  sum += c.lnTotChol * Math.log(p.totChol);
  sum += c.lnHdl * Math.log(p.hdl);
  sum += (p.treated ? c.lnSbpTreated : c.lnSbpUntreated) * Math.log(p.sbp);
  sum += c.smoker * (p.smoker ? 1 : 0);
  sum += c.diabetes * (p.diabetes ? 1 : 0);
  return 1 - Math.pow(c.baselineSurvival, Math.exp(sum - c.meanSum));
}

// Optimal reference profile used for heart-age anchoring.
const OPTIMAL = { totChol: 170, hdl: 50, sbp: 110, treated: false, smoker: false, diabetes: false };

export function calculateHeartAge(m: MeasurementInput): HeartAgeResult {
  const { age, sex, totalCholesterol, hdl, systolicBp } = m;

  if (totalCholesterol == null || hdl == null || systolicBp == null || age < 30 || age > 79) {
    return { available: false, tenYearRiskPercent: null, heartAge: null, chronologicalAge: age, delta: null };
  }

  const c = sex === "female" ? WOMEN : MEN;
  const risk = framRisk(c, {
    age, totChol: totalCholesterol, hdl, sbp: systolicBp,
    treated: !!m.onBpMeds, smoker: !!m.smoker, diabetes: !!m.diabetes,
  });

  // Solve for the age (with optimal factors) that yields the same risk.
  let heartAge = age;
  let best = Infinity;
  for (let a = 30; a <= 90; a += 0.25) {
    const r = framRisk(c, { age: a, ...OPTIMAL });
    const d = Math.abs(r - risk);
    if (d < best) { best = d; heartAge = a; }
  }

  const ha = Math.round(heartAge);
  return {
    available: true,
    tenYearRiskPercent: Math.round(risk * 1000) / 10,
    heartAge: ha,
    chronologicalAge: age,
    delta: ha - age,
  };
}
