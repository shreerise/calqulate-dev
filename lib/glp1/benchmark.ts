/**
 * Clinical-study benchmarking — "Am I on track?" (Phase 2 moat; only Glapp does this).
 *
 * Compares a user's actual % total-body-weight loss against the mean trajectory
 * from the pivotal published trial for their compound, and reports whether they're
 * ahead of, on track with, or behind the trial average.
 *
 * ⚠️ Trial MEANS for the highest maintenance dose — individual results vary widely
 * and depend on dose, adherence and starting point. Educational comparison only,
 * not a treatment target. Pure & deterministic (unit-testable, mobile-reusable).
 */

import type { Glp1Compound } from "./types";

export interface TrialCurve {
  /** Trial label shown to the user. */
  trial: string;
  /** Representative dose the curve reflects. */
  dose: string;
  /** Mean cumulative % total-body-weight loss control points, ascending by week. */
  points: { week: number; pct: number }[];
}

/**
 * Mean % weight-loss trajectories (approximate, from published pivotal trials):
 *   semaglutide 2.4 mg — STEP-1 (Wilding 2021), ~14.9% at wk 68
 *   tirzepatide 15 mg — SURMOUNT-1 (Jastreboff 2022), ~20.9% at wk 72
 *   liraglutide 3.0 mg — SCALE (Pi-Sunyer 2015), ~8% at wk 56
 *   dulaglutide — modest weight effect (diabetes indication)
 *   retatrutide 12 mg — Phase 2 (Jastreboff 2023), ~24% at wk 48
 */
export const TRIAL_CURVES: Record<Glp1Compound, TrialCurve> = {
  semaglutide: {
    trial: "STEP-1",
    dose: "2.4 mg weekly",
    points: [
      { week: 0, pct: 0 }, { week: 4, pct: 2 }, { week: 8, pct: 4 }, { week: 12, pct: 6 },
      { week: 20, pct: 9 }, { week: 28, pct: 11 }, { week: 40, pct: 13 }, { week: 52, pct: 14.5 },
      { week: 68, pct: 14.9 },
    ],
  },
  tirzepatide: {
    trial: "SURMOUNT-1",
    dose: "15 mg weekly",
    points: [
      { week: 0, pct: 0 }, { week: 4, pct: 3 }, { week: 12, pct: 8 }, { week: 24, pct: 13 },
      { week: 36, pct: 17 }, { week: 52, pct: 19 }, { week: 72, pct: 20.9 },
    ],
  },
  liraglutide: {
    trial: "SCALE",
    dose: "3.0 mg daily",
    points: [
      { week: 0, pct: 0 }, { week: 8, pct: 3 }, { week: 16, pct: 5 }, { week: 28, pct: 7 },
      { week: 40, pct: 7.8 }, { week: 56, pct: 8 },
    ],
  },
  dulaglutide: {
    trial: "AWARD",
    dose: "4.5 mg weekly",
    points: [
      { week: 0, pct: 0 }, { week: 12, pct: 2 }, { week: 26, pct: 3.5 }, { week: 36, pct: 4.2 },
      { week: 52, pct: 4.6 },
    ],
  },
  retatrutide: {
    trial: "Phase 2 (2023)",
    dose: "12 mg weekly",
    points: [
      { week: 0, pct: 0 }, { week: 12, pct: 8 }, { week: 24, pct: 17 }, { week: 36, pct: 22 },
      { week: 48, pct: 24 },
    ],
  },
};

/** Linearly interpolate the trial's expected % loss at an arbitrary week. */
export function expectedLossPct(compound: Glp1Compound, weeks: number): number {
  const pts = TRIAL_CURVES[compound].points;
  if (weeks <= pts[0].week) return pts[0].pct;
  const last = pts[pts.length - 1];
  if (weeks >= last.week) return last.pct;
  for (let i = 1; i < pts.length; i++) {
    if (weeks <= pts[i].week) {
      const a = pts[i - 1], b = pts[i];
      const f = (weeks - a.week) / (b.week - a.week);
      return Math.round((a.pct + f * (b.pct - a.pct)) * 10) / 10;
    }
  }
  return last.pct;
}

export type BenchmarkStatus = "early" | "ahead" | "on-track" | "behind";

export interface BenchmarkResult {
  trial: string;
  dose: string;
  weeks: number;
  actualPct: number;
  expectedPct: number;
  /** actual − expected, percentage points. Positive = more loss than the trial average. */
  deltaPct: number;
  status: BenchmarkStatus;
  message: string;
}

export interface BenchmarkArgs {
  compound: Glp1Compound;
  baselineKg: number;
  currentKg: number;
  /** Weeks since starting the medication. */
  weeks: number;
}

/** Tolerance band (percentage points) within which the user is "on track". */
export const ON_TRACK_BAND = 2;

export function benchmark({ compound, baselineKg, currentKg, weeks }: BenchmarkArgs): BenchmarkResult {
  const curve = TRIAL_CURVES[compound];
  const actualPct = baselineKg > 0 ? Math.round(((baselineKg - currentKg) / baselineKg) * 1000) / 10 : 0;
  const expectedPct = expectedLossPct(compound, weeks);
  const deltaPct = Math.round((actualPct - expectedPct) * 10) / 10;

  let status: BenchmarkStatus;
  let message: string;
  if (weeks < 4) {
    status = "early";
    message = "It's still early — give it a few weeks before comparing to the trial average.";
  } else if (deltaPct >= ON_TRACK_BAND) {
    status = "ahead";
    message = `You're ahead of the ${curve.trial} average by ${Math.abs(deltaPct)} points. Keep protecting muscle as you go.`;
  } else if (deltaPct <= -ON_TRACK_BAND) {
    status = "behind";
    message = `You're trailing the ${curve.trial} average by ${Math.abs(deltaPct)} points. Often dose titration, protein or adherence is the lever — worth a chat with your prescriber.`;
  } else {
    status = "on-track";
    message = `You're tracking right with the ${curve.trial} average for ${curve.dose}.`;
  }

  return { trial: curve.trial, dose: curve.dose, weeks, actualPct, expectedPct, deltaPct, status, message };
}
