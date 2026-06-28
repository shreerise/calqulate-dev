/**
 * Body-composition core — the #1 unmet GLP-1 user need (no competitor tracks it).
 *
 * Splits weight into fat vs. lean mass and, across two measurements, flags when
 * too much of the loss is coming from muscle. Up to ~39% of GLP-1 weight loss can
 * be lean mass, so surfacing this is the muscle-preservation safety signal.
 *
 * Pure & deterministic — unit-testable, reusable by future mobile clients.
 */

import type { Sex } from "./types";

export interface BodyCompPoint {
  weightKg: number;
  fatMassKg: number;
  leanMassKg: number;
  bodyFatPct: number; // 0–100
}

/** Derive fat/lean split from weight + body-fat %. */
export function bodyComp(weightKg: number, bodyFatPct: number): BodyCompPoint {
  const pct = clamp(bodyFatPct, 0, 100);
  const fatMassKg = round2((weightKg * pct) / 100);
  const leanMassKg = round2(weightKg - fatMassKg);
  return { weightKg: round2(weightKg), fatMassKg, leanMassKg, bodyFatPct: round1(pct) };
}

/**
 * US-Navy circumference body-fat estimate (%), used when a user has no scale/DEXA
 * reading. Matches the site's existing body-fat calculator methodology.
 * Requires neck + waist (+ hip for women), all in cm, height in cm.
 */
export function estimateBodyFatPct(args: {
  sex: Sex;
  heightCm: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number;
}): number | null {
  const { sex, heightCm, neckCm, waistCm, hipCm } = args;
  if (heightCm <= 0 || neckCm <= 0 || waistCm <= 0) return null;
  let pct: number;
  if (sex === "male") {
    if (waistCm - neckCm <= 0) return null;
    pct =
      495 /
        (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) -
      450;
  } else {
    if (!hipCm || waistCm + hipCm - neckCm <= 0) return null;
    pct =
      495 /
        (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.221 * Math.log10(heightCm)) -
      450;
  }
  return Number.isFinite(pct) ? round1(clamp(pct, 2, 75)) : null;
}

export type LeanLossLevel = "ok" | "watch" | "high";

export interface BodyCompChange {
  weightLostKg: number;
  fatLostKg: number;
  leanLostKg: number;
  /** Share of total weight loss that came from lean mass (0–1). */
  leanLossFraction: number;
  leanLossPct: number; // 0–100, display
  level: LeanLossLevel;
  message: string;
}

/** Threshold for the muscle-loss flag (fraction of weight loss that is lean). */
export const LEAN_LOSS_THRESHOLDS = { watch: 0.25, high: 0.4 } as const;

/**
 * Compare a baseline to a later measurement and classify how much of the loss is
 * muscle. Only meaningful when the user actually lost weight; gains return "ok".
 */
export function bodyCompChange(baseline: BodyCompPoint, latest: BodyCompPoint): BodyCompChange {
  const weightLostKg = round2(baseline.weightKg - latest.weightKg);
  const fatLostKg = round2(baseline.fatMassKg - latest.fatMassKg);
  const leanLostKg = round2(baseline.leanMassKg - latest.leanMassKg);

  if (weightLostKg <= 0) {
    return {
      weightLostKg, fatLostKg, leanLostKg,
      leanLossFraction: 0, leanLossPct: 0,
      level: "ok",
      message: "No net weight loss yet — keep logging to see your fat-vs-muscle split.",
    };
  }

  const leanLossFraction = clamp(leanLostKg / weightLostKg, 0, 1);
  const level: LeanLossLevel =
    leanLossFraction >= LEAN_LOSS_THRESHOLDS.high
      ? "high"
      : leanLossFraction >= LEAN_LOSS_THRESHOLDS.watch
        ? "watch"
        : "ok";

  const message =
    level === "high"
      ? "A large share of your loss is lean mass. Prioritise protein and resistance training, and consider a slower rate of loss."
      : level === "watch"
        ? "Some muscle loss is showing up. Hit your protein target and add resistance training to protect lean mass."
        : "Most of your loss is fat — you're protecting muscle well. Keep it up.";

  return {
    weightLostKg, fatLostKg, leanLostKg,
    leanLossFraction: round2(leanLossFraction),
    leanLossPct: round1(leanLossFraction * 100),
    level,
    message,
  };
}

// ─── helpers ──────────────────────────────────────────────────────────────────
function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}
function round1(n: number) {
  return Math.round(n * 10) / 10;
}
function round2(n: number) {
  return Math.round(n * 100) / 100;
}
