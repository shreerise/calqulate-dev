import type { MeasurementInput, AscvdResult } from "@/types/vitals";

/**
 * ASCVD 10-year risk — 2013 ACC/AHA Pooled Cohort Equations
 * (Goff DC et al., Circulation 2014). Validated for adults 40-79.
 *
 * Risk = 1 - S0^exp( sum(coef*ln(x)) - meanSum )
 *
 * Coefficients per race/sex group are published constants below.
 */

type Group = "whiteWomen" | "blackWomen" | "whiteMen" | "blackMen";

interface Coef {
  lnAge: number;
  lnAgeSq?: number;
  lnTotChol: number;
  lnAgeLnTotChol?: number;
  lnHdl: number;
  lnAgeLnHdl?: number;
  lnTreatedSbp: number;
  lnAgeLnTreatedSbp?: number;
  lnUntreatedSbp: number;
  lnAgeLnUntreatedSbp?: number;
  smoker: number;
  lnAgeSmoker?: number;
  diabetes: number;
  baselineSurvival: number; // S0 at 10 years
  meanSum: number;
}

const COEF: Record<Group, Coef> = {
  whiteWomen: {
    lnAge: -29.799, lnAgeSq: 4.884,
    lnTotChol: 13.54, lnAgeLnTotChol: -3.114,
    lnHdl: -13.578, lnAgeLnHdl: 3.149,
    lnTreatedSbp: 2.019, lnUntreatedSbp: 1.957,
    smoker: 7.574, lnAgeSmoker: -1.665,
    diabetes: 0.661, baselineSurvival: 0.9665, meanSum: -29.18,
  },
  blackWomen: {
    lnAge: 17.114,
    lnTotChol: 0.94,
    lnHdl: -18.92, lnAgeLnHdl: 4.475,
    lnTreatedSbp: 29.291, lnAgeLnTreatedSbp: -6.432,
    lnUntreatedSbp: 27.82, lnAgeLnUntreatedSbp: -6.087,
    smoker: 0.691,
    diabetes: 0.874, baselineSurvival: 0.9533, meanSum: 86.61,
  },
  whiteMen: {
    lnAge: 12.344,
    lnTotChol: 11.853, lnAgeLnTotChol: -2.664,
    lnHdl: -7.99, lnAgeLnHdl: 1.769,
    lnTreatedSbp: 1.797, lnUntreatedSbp: 1.764,
    smoker: 7.837, lnAgeSmoker: -1.795,
    diabetes: 0.658, baselineSurvival: 0.9144, meanSum: 61.18,
  },
  blackMen: {
    lnAge: 2.469,
    lnTotChol: 0.302,
    lnHdl: -0.307,
    lnTreatedSbp: 1.916, lnUntreatedSbp: 1.809,
    smoker: 0.549,
    diabetes: 0.645, baselineSurvival: 0.8954, meanSum: 19.54,
  },
};

function pickGroup(sex: string, race?: string): Group {
  const black = race === "black";
  if (sex === "female") return black ? "blackWomen" : "whiteWomen";
  return black ? "blackMen" : "whiteMen";
}

function categorize(pct: number): AscvdResult["category"] {
  if (pct < 5) return "low";
  if (pct < 7.5) return "borderline";
  if (pct < 20) return "intermediate";
  return "high";
}

export function calculateAscvd(m: MeasurementInput): AscvdResult {
  const { age, sex, race, totalCholesterol, hdl, systolicBp } = m;

  if (
    totalCholesterol == null || hdl == null || systolicBp == null ||
    age < 40 || age > 79
  ) {
    return {
      available: false,
      tenYearRiskPercent: null,
      category: "unknown",
      note:
        age < 40 || age > 79
          ? "Validated for ages 40-79 only."
          : "Needs total cholesterol, HDL and systolic BP.",
    };
  }

  const c = COEF[pickGroup(sex, race)];
  const lnAge = Math.log(age);
  const lnTC = Math.log(totalCholesterol);
  const lnHDL = Math.log(hdl);
  const lnSBP = Math.log(systolicBp);
  const treated = !!m.onBpMeds;
  const smoker = m.smoker ? 1 : 0;
  const diabetes = m.diabetes ? 1 : 0;

  let sum = 0;
  sum += c.lnAge * lnAge;
  if (c.lnAgeSq) sum += c.lnAgeSq * lnAge * lnAge;
  sum += c.lnTotChol * lnTC;
  if (c.lnAgeLnTotChol) sum += c.lnAgeLnTotChol * lnAge * lnTC;
  sum += c.lnHdl * lnHDL;
  if (c.lnAgeLnHdl) sum += c.lnAgeLnHdl * lnAge * lnHDL;

  if (treated) {
    sum += c.lnTreatedSbp * lnSBP;
    if (c.lnAgeLnTreatedSbp) sum += c.lnAgeLnTreatedSbp * lnAge * lnSBP;
  } else {
    sum += c.lnUntreatedSbp * lnSBP;
    if (c.lnAgeLnUntreatedSbp) sum += c.lnAgeLnUntreatedSbp * lnAge * lnSBP;
  }

  sum += c.smoker * smoker;
  if (c.lnAgeSmoker) sum += c.lnAgeSmoker * lnAge * smoker;
  sum += c.diabetes * diabetes;

  const risk = 1 - Math.pow(c.baselineSurvival, Math.exp(sum - c.meanSum));
  const pct = Math.min(Math.max(risk * 100, 0), 99);

  return {
    available: true,
    tenYearRiskPercent: Math.round(pct * 10) / 10,
    category: categorize(pct),
  };
}
