/**
 * Calqulate v2 — GLP-1 "Autopilot" protocol generator (pure TS).
 *
 * Generates an adaptive 12–24 week titration schedule + weekly missions +
 * protein/meal timing + training plan, from standard published dose ladders.
 * Side-effect severity makes the schedule HOLD the current dose instead of
 * escalating — so the plan adapts to how the user is actually tolerating it.
 *
 * Educational decision-support ONLY. Dosing decisions must be made with a
 * licensed prescriber; this organizes information, it does not prescribe.
 */

export type GlpMed = "semaglutide-wegovy" | "semaglutide-ozempic" | "tirzepatide";
export type SideEffect = "none" | "mild" | "moderate" | "severe";

export const MED_LABEL: Record<GlpMed, string> = {
  "semaglutide-wegovy": "Semaglutide (Wegovy)",
  "semaglutide-ozempic": "Semaglutide (Ozempic)",
  tirzepatide: "Tirzepatide (Mounjaro / Zepbound)",
};

/** Standard dose ladders (mg). Escalation is typically every 4 weeks if tolerated. */
const LADDER: Record<GlpMed, number[]> = {
  "semaglutide-wegovy": [0.25, 0.5, 1.0, 1.7, 2.4],
  "semaglutide-ozempic": [0.25, 0.5, 1.0, 2.0],
  tirzepatide: [2.5, 5, 7.5, 10, 12.5, 15],
};

const WEEKS_PER_STEP = 4;

export interface ProtocolInput {
  medication: GlpMed;
  currentDoseMg: number;
  weeksOnCurrentDose: number;
  sideEffect: SideEffect;
  startDateISO?: string;
  targetWeightKg?: number;
  currentWeightKg?: number;
  totalWeeks?: number; // 12–24, default 16
}

export interface ProtocolWeek {
  week: number;
  dateISO: string;
  doseMg: number;
  phase: "titration" | "maintenance" | "hold";
  escalates: boolean;
  proteinG: number;
  missions: string[];
  training: string;
  note?: string;
}

export interface GeneratedProtocol {
  medication: GlpMed;
  medicationLabel: string;
  proteinDailyG: number;
  startDoseMg: number;
  targetDoseMg: number;
  totalWeeks: number;
  weeks: ProtocolWeek[];
  alerts: string[];
  mealTiming: string[];
  trainingPlan: string[];
  generatedAtISO: string;
}

const TRAINING_ROTATION = [
  "Full-body resistance (push) + 8k steps",
  "Zone-2 cardio 30 min + 8k steps",
  "Full-body resistance (pull/legs) + 8k steps",
  "Active recovery walk + mobility",
];

const MEAL_TIMING = [
  "Protein first: 30–40 g within 1 hour of waking (appetite is highest early on the drug).",
  "Anchor every meal around 30–40 g protein before carbs or fats.",
  "Front-load calories earlier in the day when appetite allows — dinners get small on dose days.",
  "Hydrate: 2.5–3 L water/day to blunt nausea and constipation.",
  "Fiber 25–35 g/day (veg, legumes, berries) to protect gut comfort and satiety.",
];

const TRAINING_PLAN = [
  "2–3 resistance sessions per week — this is non-negotiable for protecting muscle on a GLP-1.",
  "Progressive overload: add reps or load weekly so your body keeps the muscle it has.",
  "8,000–10,000 steps/day (NEAT) — the biggest lever for fat loss the drug doesn't do for you.",
  "1–2 zone-2 cardio sessions for cardiovascular and metabolic benefit.",
];

function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function baseMissions(proteinG: number, doseDay = false): string[] {
  const m = [
    `Hit ${proteinG} g protein`,
    "Resistance train (if a lifting day)",
    "8k+ steps",
    "2.5–3 L water",
    "Log weight + how you feel",
  ];
  if (doseDay) m.unshift("Inject your scheduled dose (same day each week)");
  return m;
}

/** Generate the adaptive protocol forward from the user's current state. */
export function generateProtocol(input: ProtocolInput): GeneratedProtocol {
  const ladder = LADDER[input.medication];
  const totalWeeks = Math.min(24, Math.max(12, input.totalWeeks ?? 16));
  const startISO = (input.startDateISO ?? new Date().toISOString()).slice(0, 10);
  const goalWeight = input.targetWeightKg ?? input.currentWeightKg ?? 80;
  const proteinDailyG = Math.round(1.6 * goalWeight);

  // Locate the current rung (nearest ladder dose ≤ current, else first).
  let idx = 0;
  for (let i = 0; i < ladder.length; i++) if (input.currentDoseMg >= ladder[i] - 1e-6) idx = i;

  const alerts: string[] = [];
  // Side-effects → hold. Severe holds longer and flags a clinician check-in.
  let holdWeeks = 0;
  if (input.sideEffect === "moderate") { holdWeeks = WEEKS_PER_STEP; alerts.push("Moderate side-effects logged — the schedule holds your current dose for ~4 weeks before escalating."); }
  if (input.sideEffect === "severe") { holdWeeks = WEEKS_PER_STEP * 2; alerts.push("Severe side-effects logged — holding your dose and flagging a clinician check-in before any increase."); }

  let weeksAtDose = Math.max(0, input.weeksOnCurrentDose);
  const weeks: ProtocolWeek[] = [];

  for (let w = 1; w <= totalWeeks; w++) {
    const atMax = idx >= ladder.length - 1;
    const dose = ladder[idx];

    // Decide escalation for NEXT week.
    let escalates = false;
    let phase: ProtocolWeek["phase"] = atMax ? "maintenance" : "titration";
    let note: string | undefined;

    if (holdWeeks > 0) {
      phase = "hold";
      note = "Holding dose to let side-effects settle.";
      holdWeeks--;
    } else if (!atMax && weeksAtDose + 1 >= WEEKS_PER_STEP) {
      escalates = true;
      note = `Tolerating well → step up to ${ladder[idx + 1]} mg next week.`;
    }

    const doseDay = true; // weekly injection
    weeks.push({
      week: w,
      dateISO: addDays(startISO, (w - 1) * 7),
      doseMg: dose,
      phase,
      escalates,
      proteinG: proteinDailyG,
      missions: baseMissions(proteinDailyG, doseDay && w === 1),
      training: TRAINING_ROTATION[(w - 1) % TRAINING_ROTATION.length],
      note,
    });

    // Advance state.
    if (escalates) { idx = Math.min(idx + 1, ladder.length - 1); weeksAtDose = 0; }
    else weeksAtDose++;
  }

  if (proteinDailyG < 100) alerts.push("Protein target looks low — confirm your goal weight; under-eating protein is the #1 cause of muscle loss on a GLP-1.");

  return {
    medication: input.medication,
    medicationLabel: MED_LABEL[input.medication],
    proteinDailyG,
    startDoseMg: ladder[Math.max(0, (() => { let i0 = 0; for (let i = 0; i < ladder.length; i++) if (input.currentDoseMg >= ladder[i] - 1e-6) i0 = i; return i0; })())],
    targetDoseMg: weeks.length ? weeks[weeks.length - 1].doseMg : ladder[idx],
    totalWeeks,
    weeks,
    alerts,
    mealTiming: MEAL_TIMING,
    trainingPlan: TRAINING_PLAN,
    generatedAtISO: new Date().toISOString(),
  };
}
