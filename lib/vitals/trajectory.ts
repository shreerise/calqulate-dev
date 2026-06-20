/**
 * Calqulate Vitals — Longitudinal Trajectory Engine
 * ==================================================
 *
 * WHY THIS EXISTS (the moat):
 * A 10-year ASCVD score or heart age is a PUBLISHED formula — anyone, including
 * an LLM, can reproduce it. What cannot be reproduced without a user's own
 * accumulated history is *their personal trajectory*: the underlying signal
 * hidden inside noisy day-to-day measurements (weight swings, BP variability,
 * glucose spikes). This engine estimates that hidden state.
 *
 * It is a LOCAL LINEAR TREND state-space model (a 2-state Kalman filter):
 *   state  = [ level, slope ]                 // true value + true rate of change
 *   obs    = level + measurement_noise        // what the scale/cuff actually shows
 *   level' = level + slope * dt               // the underlying value drifts
 *   slope' = slope                            // trend persists (random walk)
 *
 * It does three things a calculator cannot:
 *   1. Separates SIGNAL from NOISE — so a user isn't spooked by a 2-point wiggle
 *      and isn't falsely reassured by a lucky reading.
 *   2. Estimates the TRUE RATE OF CHANGE (slope) with a confidence interval, so
 *      "is this actually working?" gets a statistical answer.
 *   3. FORECASTS where the user lands if the current trend holds.
 *
 * Defensibility: the estimate is a function of the *entire personal series* and
 * a recursively-updated covariance. A competitor starting today has no series,
 * so they cannot reconstruct the user's state — switching cost compounds with
 * every measurement. This is a data-network-effect moat, not a formula.
 */

export interface SeriesPoint {
  /** Days since the first measurement (can be fractional). */
  t: number;
  /** Observed value (composite score, weight kg, A1c, systolic BP, …). */
  value: number;
}

export interface TrajectoryState {
  t: number;
  /** Smoothed underlying value (noise removed). */
  level: number;
  /** Underlying rate of change, in value-units per day. */
  slopePerDay: number;
  /** 1-sigma uncertainty of the level estimate. */
  levelSd: number;
  /** 1-sigma uncertainty of the slope estimate. */
  slopeSd: number;
  /** The raw observation at this step (for plotting actual vs. smoothed). */
  observed: number;
}

export interface TrajectoryResult {
  states: TrajectoryState[];
  /** Most recent smoothed state. */
  current: TrajectoryState | null;
  /** Trend per week (slope * 7), with a 95% CI. */
  weeklyChange: number;
  weeklyChange95: [number, number];
  /** |slope| / slope-sd — how many sigma the trend is from flat. */
  trendZ: number;
  /**
   * Direction the engine considers PROBABLE (trend ≳ 1σ from flat); otherwise
   * "holding" (noise dominates — don't alarm or falsely reassure). The stronger
   * "statistically real" claim (≥95%) is exposed via isRealChange().
   */
  direction: "improving" | "worsening" | "holding";
  /** True change since first measurement = current.level - first.level. */
  netSignalChange: number;
  /** How much of the raw swing was noise vs. signal (0–1; higher = noisier). */
  noiseShare: number;
}

export interface TrajectoryOptions {
  /**
   * Whether a HIGHER value is better (e.g. Metabolic Health Score) or worse
   * (e.g. weight, A1c, BP, risk %). Drives the improving/worsening label.
   */
  higherIsBetter: boolean;
  /**
   * Expected measurement noise (1-sigma) in value units. Sensible defaults are
   * provided per-metric via METRIC_NOISE; override when known.
   */
  measurementNoiseSd?: number;
  /**
   * How quickly the underlying trend is allowed to change. Larger = the model
   * adapts faster to genuine regime changes (e.g. starting a GLP-1) at the cost
   * of tracking more noise.
   */
  trendAgility?: number;
}

/** Empirically reasonable day-to-day measurement noise (1-sigma) per metric. */
export const METRIC_NOISE: Record<string, number> = {
  compositeScore: 2.5, // 0–100 score
  weightKg: 0.9, // daily water/food swing
  systolicBp: 6, // cuff + circadian variability
  a1c: 0.15, // assay + biological
  fastingGlucose: 8, // mg/dL
  waistCm: 1.2,
  ascvdPercent: 0.8,
};

const clampPos = (n: number, min = 1e-6) => Math.max(min, n);

/**
 * Fit the local-linear-trend Kalman filter to a personal series.
 * Series must be sorted by t ascending. Returns per-step smoothed states.
 */
export function fitTrajectory(series: SeriesPoint[], opts: TrajectoryOptions): TrajectoryResult {
  const sorted = [...series].sort((a, b) => a.t - b.t);
  const R = clampPos((opts.measurementNoiseSd ?? 3) ** 2); // observation variance
  const agility = opts.trendAgility ?? 0.02; // process-noise scale on the slope

  const states: TrajectoryState[] = [];

  if (sorted.length === 0) {
    return emptyResult();
  }

  // ── Initialise state from the first observation ──────────────────────────
  // x = [level, slope]; P = covariance.
  let level = sorted[0].value;
  let slope = 0;
  // Large initial uncertainty so early data dominates the prior.
  let p00 = R * 4; // var(level)
  let p01 = 0; // cov(level, slope)
  let p11 = (agility * 10) ** 2; // var(slope)

  states.push({
    t: sorted[0].t,
    level,
    slopePerDay: slope,
    levelSd: Math.sqrt(p00),
    slopeSd: Math.sqrt(p11),
    observed: sorted[0].value,
  });

  for (let i = 1; i < sorted.length; i++) {
    const dt = clampPos(sorted[i].t - sorted[i - 1].t, 1e-3);

    // ── PREDICT ──
    // x' = F x, with F = [[1, dt],[0,1]]
    const predLevel = level + slope * dt;
    const predSlope = slope;

    // P' = F P Fᵀ + Q
    // F P Fᵀ:
    const fp00 = p00 + dt * (p01 + p01) + dt * dt * p11;
    const fp01 = p01 + dt * p11;
    const fp11 = p11;

    // Process noise Q grows with dt (continuous-time white-noise-acceleration).
    const q = (agility * agility);
    const Q00 = q * (dt * dt * dt) / 3;
    const Q01 = q * (dt * dt) / 2;
    const Q11 = q * dt;

    let pp00 = fp00 + Q00;
    let pp01 = fp01 + Q01;
    let pp11 = fp11 + Q11;

    // ── UPDATE with observation z ──
    const z = sorted[i].value;
    const y = z - predLevel; // innovation (H = [1, 0])
    const S = pp00 + R; // innovation variance
    const k0 = pp00 / S; // Kalman gain (level)
    const k1 = pp01 / S; // Kalman gain (slope)

    level = predLevel + k0 * y;
    slope = predSlope + k1 * y;

    // P = (I - K H) P'
    const np00 = (1 - k0) * pp00;
    const np01 = (1 - k0) * pp01;
    const np11 = pp11 - k1 * pp01;
    p00 = np00;
    p01 = np01;
    p11 = np11;

    states.push({
      t: sorted[i].t,
      level,
      slopePerDay: slope,
      levelSd: Math.sqrt(clampPos(p00, 0)),
      slopeSd: Math.sqrt(clampPos(p11, 0)),
      observed: z,
    });
  }

  const current = states[states.length - 1];

  // The Kalman *instantaneous* slope is deliberately local and therefore noisy
  // for trend-detection. To decide "is this actually trending", pool ALL points
  // with an ordinary-least-squares fit (far more statistical power), and report
  // that as the trend. The Kalman is kept for level smoothing and forecasting.
  const ols = olsTrend(sorted);
  const weeklyChange = ols.slopePerDay * 7;
  const weeklySd = clampPos(ols.slopeSd * 7, 1e-9);
  const weeklyChange95: [number, number] = [
    weeklyChange - 1.96 * weeklySd,
    weeklyChange + 1.96 * weeklySd,
  ];

  // How many sigma the trend sits from flat.
  const trendZ = Math.abs(weeklyChange) / weeklySd;

  // Direction is called "probable" at ≳1σ (so a clear multi-week move isn't
  // hidden); the strict ≥95% claim lives in isRealChange().
  let direction: TrajectoryResult["direction"] = "holding";
  if (trendZ >= 1.0) {
    const losing = weeklyChange < 0;
    direction = (opts.higherIsBetter ? !losing : losing) ? "improving" : "worsening";
  }

  const netSignalChange = current.level - states[0].level;

  // Noise share: how much of the raw point-to-point movement was discarded as
  // noise vs. retained as signal. 1 = almost all noise; 0 = almost all signal.
  let rawAbs = 0;
  for (let i = 1; i < sorted.length; i++) rawAbs += Math.abs(sorted[i].value - sorted[i - 1].value);
  let signalAbs = 0;
  for (let i = 1; i < states.length; i++) signalAbs += Math.abs(states[i].level - states[i - 1].level);
  const noiseShare = rawAbs > 0 ? clamp01(1 - signalAbs / rawAbs) : 0;

  return { states, current, weeklyChange, weeklyChange95, trendZ, direction, netSignalChange, noiseShare };
}

/**
 * Forecast the value `weeksAhead` into the future if the current trend holds:
 * the smoothed (Kalman) current level carried forward at the pooled (OLS) trend,
 * with a widening 95% prediction band.
 */
export function forecast(result: TrajectoryResult, weeksAhead: number): { value: number; lo: number; hi: number } | null {
  const c = result.current;
  if (!c) return null;
  const days = weeksAhead * 7;
  const slopePerDay = result.weeklyChange / 7;
  const slopeSdPerDay = (result.weeklyChange95[1] - result.weeklyChange) / 1.96 / 7;
  const value = c.level + slopePerDay * days;
  // Uncertainty grows with horizon: level sd + accumulated trend sd.
  const sd = Math.sqrt(c.levelSd ** 2 + (slopeSdPerDay * days) ** 2);
  return { value, lo: value - 1.96 * sd, hi: value + 1.96 * sd };
}

/** Ordinary least-squares trend of value on time (days). */
function olsTrend(series: SeriesPoint[]): { slopePerDay: number; slopeSd: number } {
  const n = series.length;
  if (n < 2) return { slopePerDay: 0, slopeSd: Infinity };
  const meanT = series.reduce((s, p) => s + p.t, 0) / n;
  const meanV = series.reduce((s, p) => s + p.value, 0) / n;
  let sxx = 0;
  let sxy = 0;
  for (const p of series) {
    sxx += (p.t - meanT) ** 2;
    sxy += (p.t - meanT) * (p.value - meanV);
  }
  if (sxx < 1e-9) return { slopePerDay: 0, slopeSd: Infinity };
  const slope = sxy / sxx;
  const intercept = meanV - slope * meanT;
  // Residual variance → standard error of the slope.
  let sse = 0;
  for (const p of series) {
    const fit = intercept + slope * p.t;
    sse += (p.value - fit) ** 2;
  }
  const dof = Math.max(1, n - 2);
  const resVar = sse / dof;
  const slopeSd = Math.sqrt(resVar / sxx);
  return { slopePerDay: slope, slopeSd };
}

/**
 * Is the change between the two most recent measurements REAL or just noise?
 * Returns the verdict plus a plain-English explanation for the UI.
 */
export function isRealChange(result: TrajectoryResult): { real: boolean; note: string } {
  const c = result.current;
  if (!c || result.states.length < 2) {
    return { real: false, note: "Need at least two measurements to tell signal from noise." };
  }
  // Strict claim: ≥95% one-sided confidence that the trend is non-zero.
  if (result.trendZ < 1.64 || result.direction === "holding") {
    return {
      real: false,
      note: "This looks like normal day-to-day variation, not a confirmed trend yet. Keep measuring.",
    };
  }
  const perWeek = Math.abs(result.weeklyChange).toFixed(2);
  return {
    real: true,
    note: `This is a real ${result.direction} trend of ~${perWeek}/week, beyond measurement noise.`,
  };
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function emptyResult(): TrajectoryResult {
  return {
    states: [],
    current: null,
    weeklyChange: 0,
    weeklyChange95: [0, 0],
    trendZ: 0,
    direction: "holding",
    netSignalChange: 0,
    noiseShare: 0,
  };
}
