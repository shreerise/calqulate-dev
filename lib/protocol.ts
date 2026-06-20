import type { VitalsReport } from "@/types/vitals";
import { computeFactorImpacts } from "@/lib/graph/riskGraph";

export interface ProtocolItem {
  lever: string;
  why: string;
  action: string;
  impact: "high" | "medium" | "low";
  score: number; // graph-derived impact (0-1), for transparency/sorting
}

const COPY: Record<string, { lever: string; why: (r: VitalsReport) => string; action: string }> = {
  smoking: {
    lever: "Stop smoking",
    why: () => "Smoking is the single largest modifiable driver of your cardiovascular risk.",
    action: "Ask your clinician about cessation support; risk begins falling within weeks.",
  },
  bloodPressure: {
    lever: "Lower blood pressure",
    why: (r) => `Systolic BP of ${r.input.systolicBp} mmHg is above the 120 target and compounds heart and stroke risk.`,
    action: "Reduce sodium, move daily, and review BP management with your clinician.",
  },
  waist: {
    lever: "Reduce waist circumference",
    why: (r) => `Your waist-to-height ratio is ${r.body.waistToHeight ?? "elevated"} (target < 0.5). Central fat drives metabolic and heart risk.`,
    action: "Target a gradual 5-10% body-weight reduction while keeping protein high to protect muscle.",
  },
  hdl: {
    lever: "Raise HDL cholesterol",
    why: (r) => `HDL of ${r.input.hdl} mg/dL is low; HDL is protective in the ASCVD equation.`,
    action: "Regular aerobic activity and fewer refined carbs both raise HDL over time.",
  },
  activity: {
    lever: "Add daily movement",
    why: () => "Inactivity independently raises both diabetes and cardiovascular risk.",
    action: "Target 30 minutes of moderate activity most days; walking counts.",
  },
  glucose: {
    lever: "Address blood-sugar risk",
    why: () => "Elevated glucose or strong diabetes risk markers are present.",
    action: "Prioritize fiber, protein and movement; ask about an A1c test.",
  },
};

function label(score: number): ProtocolItem["impact"] {
  if (score >= 0.5) return "high";
  if (score >= 0.2) return "medium";
  return "low";
}

/**
 * Rule + graph engine: ranks modifiable levers by graph-derived impact for THIS
 * user and returns the top recommendations. Educational guidance only.
 */
export function generateProtocol(r: VitalsReport): ProtocolItem[] {
  const impacts = computeFactorImpacts(r.input).filter((f) => f.impact > 0.05);

  const items: ProtocolItem[] = impacts.slice(0, 4).map((f) => {
    const c = COPY[f.factor];
    return {
      lever: c.lever,
      why: c.why(r),
      action: c.action,
      impact: label(f.impact),
      score: Math.round(f.impact * 100) / 100,
    };
  });

  if (items.length === 0) {
    items.push({
      lever: "Maintain your trajectory",
      why: "Your modifiable risk factors are already in good ranges.",
      action: "Keep measuring monthly and re-test labs to confirm the trend holds.",
      impact: "low",
      score: 0,
    });
  }

  return items;
}
