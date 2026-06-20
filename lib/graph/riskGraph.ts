import type { MeasurementInput } from "@/types/vitals";

/**
 * Weighted directed graph linking modifiable risk FACTORS to health OUTCOMES.
 * Implemented as an adjacency list; impact is computed with a weighted DFS that
 * accumulates path-weight products (supports multi-hop chains, e.g.
 * waist -> insulin-resistance -> diabetes). This drives the "next lever" engine
 * so recommendations are ranked by graph-derived impact rather than guesses.
 */
export interface Edge {
  to: string;
  weight: number; // 0-1 influence strength
}

const GRAPH: Record<string, Edge[]> = {
  smoking: [{ to: "ascvd", weight: 0.9 }, { to: "heartAge", weight: 0.7 }],
  bloodPressure: [{ to: "ascvd", weight: 0.8 }, { to: "heartAge", weight: 0.6 }, { to: "insulinResistance", weight: 0.2 }],
  waist: [{ to: "insulinResistance", weight: 0.8 }, { to: "ascvd", weight: 0.4 }],
  hdl: [{ to: "ascvd", weight: 0.6 }, { to: "heartAge", weight: 0.4 }],
  activity: [{ to: "insulinResistance", weight: 0.5 }, { to: "ascvd", weight: 0.3 }, { to: "hdl", weight: 0.3 }],
  glucose: [{ to: "diabetes", weight: 0.9 }],
  insulinResistance: [{ to: "diabetes", weight: 0.8 }],
};

const OUTCOMES = new Set(["ascvd", "diabetes", "heartAge"]);

/** Total weighted influence a factor exerts on terminal outcomes (weighted DFS). */
function reachOutcomeWeight(factor: string, visited = new Set<string>()): number {
  if (visited.has(factor)) return 0;
  visited.add(factor);
  const edges = GRAPH[factor] ?? [];
  let total = 0;
  for (const e of edges) {
    if (OUTCOMES.has(e.to)) total += e.weight;
    else total += e.weight * reachOutcomeWeight(e.to, visited); // multiply along the path
  }
  return total;
}

export interface FactorImpact {
  factor: string;
  severity: number; // 0-1, how far from optimal for THIS user
  reach: number; // graph influence on outcomes
  impact: number; // severity * reach -> ranking key
}

/** How abnormal each factor is for this user (0 = optimal, 1 = severe). */
function severities(m: MeasurementInput): Record<string, number> {
  const heightM = m.heightCm / 100;
  const bmi = m.weightKg / (heightM * heightM);
  const w2h = m.waistCm ? m.waistCm / m.heightCm : (bmi - 22) / 20 + 0.5;

  return {
    smoking: m.smoker ? 1 : 0,
    bloodPressure: m.systolicBp ? clamp01((m.systolicBp - 115) / 50) : 0,
    waist: clamp01((w2h - 0.5) / 0.2),
    hdl: m.hdl ? clamp01((50 - m.hdl) / 30) : 0,
    activity: m.physicallyActive ? 0 : 0.6,
    glucose: m.highGlucoseHistory || (m.a1c && m.a1c >= 5.7) ? 0.8 : (m.familyDiabetes ? 0.4 : 0),
  };
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function computeFactorImpacts(m: MeasurementInput): FactorImpact[] {
  const sev = severities(m);
  return Object.keys(sev)
    .map((factor) => {
      const reach = reachOutcomeWeight(factor);
      const severity = sev[factor];
      return { factor, severity, reach, impact: severity * reach };
    })
    .sort((a, b) => b.impact - a.impact);
}
