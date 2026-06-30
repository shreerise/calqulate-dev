/**
 * Dose "sweet spot" analysis — the founder-vision differentiator.
 *
 * Segments the user's history by the dose level they were on, then attributes
 * the fat-/weight-loss they achieved AND the side-effect burden they carried to
 * each level. The "sweet spot" is the dose that delivered the most loss for the
 * least side effects — i.e. maximum fat loss with minimal side effects.
 *
 * ⚠️ EDUCATIONAL ONLY. This describes what already happened in the user's own
 * logged data; it is NOT a dosing recommendation. Every dose change is the
 * prescriber's call. Pure & deterministic so it is fully unit-testable and
 * reusable by future mobile clients.
 */

const WEEK_MS = 7 * 24 * 3_600_000;

export interface SweetSpotDose {
  takenAt: string; // ISO datetime
  amountMg: number;
}
export interface SweetSpotWeight {
  takenAt: string; // ISO datetime
  weightKg: number;
}
export interface SweetSpotBodyComp {
  takenAt: string; // ISO datetime
  weightKg: number;
  bodyFatPct: number; // 0–100
}
export interface SweetSpotSideEffect {
  loggedAt: string; // ISO datetime
  /** When true, this is an explicit "no symptoms" log → counts as severity 0. */
  noSymptoms: boolean;
  severity: number | null; // 0–5
}

export interface DoseLevelStat {
  amountMg: number;
  /** Weeks of coverage that overlapped logged weight data (drives the rates). */
  weeks: number;
  weightLossKgPerWeek: number | null;
  fatLossKgPerWeek: number | null;
  /** Mean logged side-effect severity at this level (0–5); null if none logged. */
  sideEffectBurden: number | null;
  sideEffectsPerWeek: number | null;
  /** Loss-per-week ÷ (1 + side-effect burden). Higher = better balance. null if no positive loss. */
  efficiency: number | null;
}

export type SweetSpotConfidence = "insufficient" | "low" | "medium" | "high";

export interface SweetSpotResult {
  /** Per-dose-level breakdown, ascending by dose. */
  levels: DoseLevelStat[];
  /** The best-balanced dose level, or null when there isn't enough data. */
  sweetSpot: DoseLevelStat | null;
  /** Which metric drove the ranking — fat loss when body-comp data exists, else weight. */
  basis: "fat" | "weight";
  confidence: SweetSpotConfidence;
  message: string;
}

/** Minimum weeks of coverage for a dose level to qualify for ranking. */
export const MIN_LEVEL_WEEKS = 2;

// ─── helpers ────────────────────────────────────────────────────────────────

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
function round1(n: number) {
  return Math.round(n * 10) / 10;
}
function fmtMg(mg: number) {
  return `${round2(mg)} mg`;
}

interface Sample {
  ms: number;
  value: number;
}

/** Linear interpolation of a value series at `ms`. Returns null outside its range. */
function valueAt(series: Sample[], ms: number): number | null {
  if (series.length === 0) return null;
  if (ms < series[0].ms || ms > series[series.length - 1].ms) return null;
  for (let i = 1; i < series.length; i++) {
    if (ms <= series[i].ms) {
      const a = series[i - 1];
      const b = series[i];
      if (b.ms === a.ms) return b.value;
      const f = (ms - a.ms) / (b.ms - a.ms);
      return a.value + f * (b.value - a.value);
    }
  }
  return series[series.length - 1].value;
}

function rangeOf(series: Sample[]): [number, number] | null {
  if (series.length === 0) return null;
  return [series[0].ms, series[series.length - 1].ms];
}

interface Interval {
  amountMg: number;
  startMs: number;
  endMs: number;
}

/** Build the time intervals during which each dose was the most-recent (active) dose. */
function doseIntervals(doses: SweetSpotDose[], nowMs: number): Interval[] {
  const sorted = [...doses]
    .map((d) => ({ amountMg: d.amountMg, ms: Date.parse(d.takenAt) }))
    .filter((d) => Number.isFinite(d.ms) && d.amountMg > 0)
    .sort((a, b) => a.ms - b.ms);
  const out: Interval[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const startMs = sorted[i].ms;
    const endMs = i < sorted.length - 1 ? sorted[i + 1].ms : nowMs;
    if (endMs > startMs) out.push({ amountMg: sorted[i].amountMg, startMs, endMs });
  }
  return out;
}

// ─── core ─────────────────────────────────────────────────────────────────────

export function doseSweetSpot(args: {
  doses: SweetSpotDose[];
  weights: SweetSpotWeight[];
  bodyComps?: SweetSpotBodyComp[];
  sideEffects?: SweetSpotSideEffect[];
  nowMs: number;
}): SweetSpotResult {
  const { doses, weights, bodyComps = [], sideEffects = [], nowMs } = args;

  const weightSeries: Sample[] = [...weights]
    .map((w) => ({ ms: Date.parse(w.takenAt), value: w.weightKg }))
    .filter((s) => Number.isFinite(s.ms))
    .sort((a, b) => a.ms - b.ms);
  const fatSeries: Sample[] = [...bodyComps]
    .map((b) => ({ ms: Date.parse(b.takenAt), value: (b.weightKg * b.bodyFatPct) / 100 }))
    .filter((s) => Number.isFinite(s.ms))
    .sort((a, b) => a.ms - b.ms);

  const weightRange = rangeOf(weightSeries);
  const fatRange = rangeOf(fatSeries);
  const intervals = doseIntervals(doses, nowMs);

  // Aggregate per dose level.
  const acc = new Map<
    number,
    { weeks: number; weightLossKg: number; fatWeeks: number; fatLossKg: number; sev: number[]; seCount: number }
  >();
  const ensure = (mg: number) => {
    let a = acc.get(mg);
    if (!a) {
      a = { weeks: 0, weightLossKg: 0, fatWeeks: 0, fatLossKg: 0, sev: [], seCount: 0 };
      acc.set(mg, a);
    }
    return a;
  };

  for (const iv of intervals) {
    const a = ensure(iv.amountMg);

    // Weight loss over the part of this interval covered by logged weights.
    if (weightRange) {
      const s = Math.max(iv.startMs, weightRange[0]);
      const e = Math.min(iv.endMs, weightRange[1]);
      if (e > s) {
        const wStart = valueAt(weightSeries, s);
        const wEnd = valueAt(weightSeries, e);
        if (wStart != null && wEnd != null) {
          a.weeks += (e - s) / WEEK_MS;
          a.weightLossKg += wStart - wEnd;
        }
      }
    }

    // Fat-mass loss over the part covered by body-composition logs.
    if (fatRange) {
      const s = Math.max(iv.startMs, fatRange[0]);
      const e = Math.min(iv.endMs, fatRange[1]);
      if (e > s) {
        const fStart = valueAt(fatSeries, s);
        const fEnd = valueAt(fatSeries, e);
        if (fStart != null && fEnd != null) {
          a.fatWeeks += (e - s) / WEEK_MS;
          a.fatLossKg += fStart - fEnd;
        }
      }
    }

    // Side effects logged within the interval.
    for (const se of sideEffects) {
      const ms = Date.parse(se.loggedAt);
      if (!Number.isFinite(ms) || ms < iv.startMs || ms >= iv.endMs) continue;
      a.seCount += 1;
      if (se.noSymptoms) a.sev.push(0);
      else if (se.severity != null) a.sev.push(se.severity);
    }
  }

  const hasFat = [...acc.values()].some((a) => a.fatWeeks > 0 && a.fatLossKg !== 0);
  const basis: "fat" | "weight" = hasFat ? "fat" : "weight";

  const levels: DoseLevelStat[] = [...acc.entries()]
    .map(([amountMg, a]) => {
      const weightLossKgPerWeek = a.weeks > 0 ? round2(a.weightLossKg / a.weeks) : null;
      const fatLossKgPerWeek = a.fatWeeks > 0 ? round2(a.fatLossKg / a.fatWeeks) : null;
      const sideEffectBurden = a.sev.length > 0 ? round2(a.sev.reduce((s, v) => s + v, 0) / a.sev.length) : null;
      const sideEffectsPerWeek = a.weeks > 0 ? round2(a.seCount / a.weeks) : null;

      const lossRate = basis === "fat" ? fatLossKgPerWeek : weightLossKgPerWeek;
      const efficiency =
        lossRate != null && lossRate > 0 ? round2(lossRate / (1 + (sideEffectBurden ?? 0))) : null;

      return {
        amountMg,
        weeks: round1(a.weeks),
        weightLossKgPerWeek,
        fatLossKgPerWeek,
        sideEffectBurden,
        sideEffectsPerWeek,
        efficiency,
      };
    })
    .sort((x, y) => x.amountMg - y.amountMg);

  // A level qualifies if it has enough coverage and produced positive loss.
  const qualifying = levels.filter((l) => l.weeks >= MIN_LEVEL_WEEKS && l.efficiency != null);

  let sweetSpot: DoseLevelStat | null = null;
  for (const l of qualifying) {
    if (!sweetSpot || (l.efficiency ?? 0) > (sweetSpot.efficiency ?? 0)) sweetSpot = l;
  }

  const anySideEffectData = levels.some((l) => l.sideEffectBurden != null);
  let confidence: SweetSpotConfidence;
  if (qualifying.length === 0) confidence = "insufficient";
  else if (qualifying.length === 1 || !anySideEffectData) confidence = "low";
  else if (qualifying.length >= 3 && sweetSpot?.sideEffectBurden != null) confidence = "high";
  else confidence = "medium";

  const message = buildMessage({ basis, confidence, sweetSpot, levels });

  return { levels, sweetSpot, basis, confidence, message };
}

function buildMessage(args: {
  basis: "fat" | "weight";
  confidence: SweetSpotConfidence;
  sweetSpot: DoseLevelStat | null;
  levels: DoseLevelStat[];
}): string {
  const { basis, confidence, sweetSpot, levels } = args;
  const lossWord = basis === "fat" ? "fat loss" : "weight loss";

  if (confidence === "insufficient" || !sweetSpot) {
    return "Log your weight, side effects and doses across at least two different dose levels and your personal dosing sweet spot will appear here.";
  }

  const rate = basis === "fat" ? sweetSpot.fatLossKgPerWeek : sweetSpot.weightLossKgPerWeek;
  const rateLb = rate != null ? round1(rate * 2.2046226218) : null;
  const ratePhrase = rateLb != null ? `about ${rateLb} lb/week of ${lossWord}` : `your best ${lossWord}`;
  const burdenPhrase =
    sweetSpot.sideEffectBurden != null
      ? `with a side-effect burden of ${sweetSpot.sideEffectBurden}/5`
      : "with the side effects you logged";

  const higher = levels.filter((l) => l.amountMg > sweetSpot.amountMg && l.efficiency != null);
  const tail =
    higher.length > 0
      ? " Higher doses in your data didn't improve loss enough to outweigh their extra side effects."
      : confidence === "low"
        ? " Keep logging across more dose levels to sharpen this."
        : "";

  return `In your own data, ${fmtMg(sweetSpot.amountMg)} gave you ${ratePhrase} ${burdenPhrase} — the best balance so far.${tail} This describes your history, not a dose recommendation; any change is your prescriber's call.`;
}
