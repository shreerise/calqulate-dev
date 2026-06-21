/**
 * Calqulate v2 — "Future You" Monte-Carlo trajectory engine (pure TS).
 *
 * Given a user's recent history and a goal, it projects weight, metabolic score
 * and heart age forward under three adherence scenarios, running N stochastic
 * iterations per scenario to produce confidence bands (p10 / p50 / p90).
 *
 * No external APIs. Runs in the browser (or a Web Worker / Edge Function).
 */

export interface HistoryPoint {
  /** ISO date or ms timestamp. */
  date: string | number;
  weightKg?: number | null;
  metabolicScore?: number | null;
  heartAge?: number | null;
}

export interface SimGoals {
  targetWeightKg?: number;
  targetMetabolicScore?: number;
  monthsAhead: number; // 6–60
}

export type ScenarioName = "optimistic" | "realistic" | "pessimistic";

export interface MonthBand {
  month: number;
  weight: { p10: number; p50: number; p90: number };
  score: { p10: number; p50: number; p90: number };
  heartAge: { p10: number; p50: number; p90: number };
}

export interface ScenarioResult {
  scenario: ScenarioName;
  adherence: number; // 0–1
  points: MonthBand[];
}

export interface SimulationOutput {
  iterations: number;
  start: { weight: number; score: number; heartAge: number };
  scenarios: ScenarioResult[];
}

// ── helpers ────────────────────────────────────────────────────────────────
function toMs(d: string | number) {
  return typeof d === "number" ? d : new Date(d).getTime();
}

/** OLS slope (per month) + residual sd of a series. */
function trend(points: { t: number; v: number }[]): { slope: number; sd: number; last: number } {
  const valid = points.filter((p) => Number.isFinite(p.v));
  if (valid.length === 0) return { slope: 0, sd: 1, last: 0 };
  if (valid.length === 1) return { slope: 0, sd: Math.max(1, Math.abs(valid[0].v) * 0.02), last: valid[0].v };
  const n = valid.length;
  const mt = valid.reduce((s, p) => s + p.t, 0) / n;
  const mv = valid.reduce((s, p) => s + p.v, 0) / n;
  let sxx = 0, sxy = 0;
  for (const p of valid) { sxx += (p.t - mt) ** 2; sxy += (p.t - mt) * (p.v - mv); }
  const slope = sxx > 1e-9 ? sxy / sxx : 0;
  const intercept = mv - slope * mt;
  let sse = 0;
  for (const p of valid) sse += (p.v - (intercept + slope * p.t)) ** 2;
  const sd = Math.sqrt(sse / Math.max(1, n - 2)) || Math.max(1, Math.abs(mv) * 0.02);
  return { slope, sd, last: valid[valid.length - 1].v };
}

// Box-Muller gaussian
function gauss() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function percentile(sorted: number[], p: number) {
  if (sorted.length === 0) return 0;
  const idx = clamp(Math.floor((p / 100) * (sorted.length - 1)), 0, sorted.length - 1);
  return sorted[idx];
}
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

const SCENARIOS: { name: ScenarioName; adherence: number; drift: number; vol: number }[] = [
  { name: "optimistic", adherence: 0.9, drift: 1.0, vol: 0.7 },
  { name: "realistic", adherence: 0.6, drift: 0.6, vol: 1.0 },
  { name: "pessimistic", adherence: 0.25, drift: 0.2, vol: 1.4 },
];

/**
 * Run the simulation. Defaults to 500 iterations per scenario.
 */
export function runSimulation(history: HistoryPoint[], goals: SimGoals, iterations = 500): SimulationOutput {
  const sorted = [...history].sort((a, b) => toMs(a.date) - toMs(b.date));
  const t0 = sorted.length ? toMs(sorted[0].date) : Date.now();
  const months = (ms: number) => (ms - t0) / (30 * 86_400_000);

  const wTrend = trend(sorted.map((p) => ({ t: months(toMs(p.date)), v: p.weightKg ?? NaN })));
  const sTrend = trend(sorted.map((p) => ({ t: months(toMs(p.date)), v: p.metabolicScore ?? NaN })));
  const hTrend = trend(sorted.map((p) => ({ t: months(toMs(p.date)), v: p.heartAge ?? NaN })));

  const startWeight = wTrend.last || goals.targetWeightKg || 85;
  const startScore = sTrend.last || 60;
  const startHeart = hTrend.last || 0;

  const N = goals.monthsAhead;
  const out: ScenarioResult[] = [];

  for (const sc of SCENARIOS) {
    // Goal-seeking monthly deltas: blend the user's own trend with a pull
    // toward the goal, scaled by scenario adherence.
    const wGoalPull = goals.targetWeightKg != null ? (goals.targetWeightKg - startWeight) / N : wTrend.slope;
    const sGoalPull = goals.targetMetabolicScore != null ? (goals.targetMetabolicScore - startScore) / N : Math.abs(sTrend.slope) || 1.2;

    const wMonthly = (wTrend.slope * (1 - sc.adherence) + wGoalPull * sc.adherence) * sc.drift;
    const sMonthly = (Math.abs(sTrend.slope || 1) * 0.5 + sGoalPull) * sc.drift * sc.adherence + 0.2;
    const hMonthly = -Math.abs(sMonthly) * 0.12; // score up → heart age down

    const wSeries: number[][] = Array.from({ length: N + 1 }, () => []);
    const sSeries: number[][] = Array.from({ length: N + 1 }, () => []);
    const hSeries: number[][] = Array.from({ length: N + 1 }, () => []);

    for (let it = 0; it < iterations; it++) {
      let w = startWeight, s = startScore, h = startHeart;
      wSeries[0].push(w); sSeries[0].push(s); hSeries[0].push(h);
      for (let mo = 1; mo <= N; mo++) {
        w += wMonthly + gauss() * wTrend.sd * 0.35 * sc.vol;
        s += sMonthly + gauss() * (sTrend.sd || 2) * 0.35 * sc.vol;
        h += hMonthly + gauss() * 0.25 * sc.vol;
        w = clamp(w, 35, 250);
        s = clamp(s, 0, 100);
        wSeries[mo].push(w); sSeries[mo].push(s); hSeries[mo].push(h);
      }
    }

    const points: MonthBand[] = [];
    for (let mo = 0; mo <= N; mo++) {
      const w = wSeries[mo].slice().sort((a, b) => a - b);
      const s = sSeries[mo].slice().sort((a, b) => a - b);
      const h = hSeries[mo].slice().sort((a, b) => a - b);
      const r1 = (x: number) => Math.round(x * 10) / 10;
      points.push({
        month: mo,
        weight: { p10: r1(percentile(w, 10)), p50: r1(percentile(w, 50)), p90: r1(percentile(w, 90)) },
        score: { p10: Math.round(percentile(s, 10)), p50: Math.round(percentile(s, 50)), p90: Math.round(percentile(s, 90)) },
        heartAge: { p10: r1(percentile(h, 10)), p50: r1(percentile(h, 50)), p90: r1(percentile(h, 90)) },
      });
    }
    out.push({ scenario: sc.name, adherence: sc.adherence, points });
  }

  return {
    iterations,
    start: { weight: Math.round(startWeight * 10) / 10, score: Math.round(startScore), heartAge: Math.round(startHeart * 10) / 10 },
    scenarios: out,
  };
}
