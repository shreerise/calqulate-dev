/**
 * GLP-1 pharmacokinetic (medication-level) model — the FREE differentiator.
 *
 * Estimates how much active drug remains in the body between doses so users can
 * see why cravings/appetite return before their next shot. This is a transparent
 * one-compartment model with first-order absorption + elimination (the Bateman
 * function), summed over the user's actual dose history and normalised to 0–100%
 * of the rolling peak.
 *
 * ⚠️ EDUCATIONAL ONLY. Population-average half-lives, not individualised
 * pharmacology. Never use this to make a dosing decision — that's the
 * prescriber's call. Pure & deterministic so it is fully unit-testable and
 * reusable by future mobile clients.
 */

import type { Glp1Compound } from "./types";

const HOUR = 1;
const DAY = 24 * HOUR;

/**
 * Population-average elimination and absorption half-lives (hours).
 * Sources: FDA labels / published PK literature. `absorptionHalfLifeH` is an
 * estimate chosen so tmax matches the label (it shapes the rise, not the AUC).
 */
export const PK_PARAMS: Record<
  Glp1Compound,
  { eliminationHalfLifeH: number; absorptionHalfLifeH: number; defaultIntervalH: number }
> = {
  semaglutide: { eliminationHalfLifeH: 7 * DAY, absorptionHalfLifeH: 1 * DAY, defaultIntervalH: 7 * DAY },
  tirzepatide: { eliminationHalfLifeH: 5 * DAY, absorptionHalfLifeH: 1 * DAY, defaultIntervalH: 7 * DAY },
  dulaglutide: { eliminationHalfLifeH: 5 * DAY, absorptionHalfLifeH: 1 * DAY, defaultIntervalH: 7 * DAY },
  liraglutide: { eliminationHalfLifeH: 13 * HOUR, absorptionHalfLifeH: 4 * HOUR, defaultIntervalH: 1 * DAY },
  retatrutide: { eliminationHalfLifeH: 6 * DAY, absorptionHalfLifeH: 1 * DAY, defaultIntervalH: 7 * DAY },
};

export interface PkDose {
  /** ISO datetime the dose was taken. */
  takenAt: string;
  amountMg: number;
}

export interface PkPoint {
  t: string; // ISO datetime
  /** Absolute active amount in arbitrary units (∝ mg). Comparable within one user/compound. */
  level: number;
  /** 0–100, relative to the rolling peak of the series — the value shown to users. */
  levelPct: number;
}

function rateFromHalfLife(halfLifeH: number): number {
  return Math.LN2 / halfLifeH;
}

/**
 * Single-dose Bateman contribution at elapsed time `dtHours` (0 before the dose).
 * Amplitude is normalised by the analytic single-dose peak so a 1 mg dose peaks
 * near 1.0 — this keeps `level` interpretable and numerically stable.
 */
function batemanUnit(dtHours: number, ka: number, ke: number): number {
  if (dtHours < 0) return 0;
  if (Math.abs(ka - ke) < 1e-9) {
    // degenerate ka≈ke: limit form t·ke·e^(-ke·t), normalised by its own peak (at t=1/ke)
    const peak = (1 / Math.E);
    return (ke * dtHours * Math.exp(-ke * dtHours)) / peak;
  }
  const shape = Math.exp(-ke * dtHours) - Math.exp(-ka * dtHours);
  // time-to-peak and peak value of the un-normalised shape
  const tPeak = Math.log(ka / ke) / (ka - ke);
  const peak = Math.exp(-ke * tPeak) - Math.exp(-ka * tPeak);
  return peak > 0 ? shape / peak : 0;
}

/** Absolute active drug level at one instant, summed over all prior doses. */
export function drugLevelAt(
  doses: PkDose[],
  atMs: number,
  compound: Glp1Compound,
): number {
  const { eliminationHalfLifeH, absorptionHalfLifeH } = PK_PARAMS[compound];
  const ke = rateFromHalfLife(eliminationHalfLifeH);
  const ka = rateFromHalfLife(absorptionHalfLifeH);
  let total = 0;
  for (const d of doses) {
    const dtHours = (atMs - Date.parse(d.takenAt)) / 3_600_000;
    if (dtHours >= 0) total += d.amountMg * batemanUnit(dtHours, ka, ke);
  }
  return total;
}

export interface DrugCurveOptions {
  fromMs: number;
  toMs: number;
  stepHours?: number; // default 6h
}

/**
 * Sampled medication-level curve over a window, normalised to 0–100% of the
 * window's peak. This is what the UI plots and correlates against logged cravings.
 */
export function drugLevelCurve(
  doses: PkDose[],
  compound: Glp1Compound,
  opts: DrugCurveOptions,
): PkPoint[] {
  const step = (opts.stepHours ?? 6) * 3_600_000;
  const raw: { ms: number; level: number }[] = [];
  for (let ms = opts.fromMs; ms <= opts.toMs; ms += step) {
    raw.push({ ms, level: drugLevelAt(doses, ms, compound) });
  }
  const peak = raw.reduce((m, p) => Math.max(m, p.level), 0);
  return raw.map((p) => ({
    t: new Date(p.ms).toISOString(),
    level: p.level,
    levelPct: peak > 0 ? Math.round((100 * p.level) / peak * 10) / 10 : 0,
  }));
}

/**
 * Convenience summary for "right now": current level as a % of the recent peak,
 * plus the projected % at the next scheduled dose — the "cravings will return"
 * signal. `nextDoseAtMs` defaults to the compound's interval after the last dose.
 */
export function currentLevelStatus(
  doses: PkDose[],
  compound: Glp1Compound,
  nowMs: number,
  nextDoseAtMs?: number,
): { currentPct: number; nextDosePct: number | null } {
  if (doses.length === 0) return { currentPct: 0, nextDosePct: null };
  const lastMs = doses.reduce((m, d) => Math.max(m, Date.parse(d.takenAt)), 0);
  const windowStart = lastMs - PK_PARAMS[compound].defaultIntervalH * 3_600_000;
  const nextMs = nextDoseAtMs ?? lastMs + PK_PARAMS[compound].defaultIntervalH * 3_600_000;
  const curve = drugLevelCurve(doses, compound, { fromMs: windowStart, toMs: Math.max(nextMs, nowMs), stepHours: 3 });
  const peak = curve.reduce((m, p) => Math.max(m, p.level), 0);
  const at = (ms: number) => (peak > 0 ? Math.round((100 * drugLevelAt(doses, ms, compound)) / peak * 10) / 10 : 0);
  return { currentPct: at(nowMs), nextDosePct: at(nextMs) };
}
