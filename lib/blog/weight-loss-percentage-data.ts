// lib/blog/weight-loss-percentage-data.ts
// All milestones, tracking tips, non-scale victories, habits, and FAQ data
// for the "How to Calculate Your Weight Loss Percentage" blog.
// Used by CalculateWeightLossPercentageBlog and WeightLossMilestoneChart.

export interface WeightLossMilestone {
  id: string;
  percent: number;             // e.g. 5 for "5%"
  label: string;               // "5% Lost"
  impactScore: number;         // 0–100, cumulative health-impact score
  headline: string;            // short tagline
  benefits: string[];          // bullet list shown in cards
  brandColor: string;
}

export interface TrackingTip {
  id: string;
  title: string;
  detail: string;
}

export interface NonScaleVictory {
  category: string;
  emoji: string;
  examples: string[];
}

export interface PlateauChallenge {
  name: string;
  impact: "high" | "medium" | "low";
  detail: string;
}

/* ─────────────────────── HEALTH MILESTONES ─────────────────────── */

export const weightLossMilestones: WeightLossMilestone[] = [
  {
    id: "five",
    percent: 5,
    label: "5% Lost",
    impactScore: 60,
    headline: "The clinically meaningful first step",
    benefits: [
      "Lower blood pressure and resting heart rate",
      "Improved insulin sensitivity",
      "Reduced fasting blood sugar",
      "Better sleep quality and energy levels",
    ],
    brandColor: "#10b981", // emerald-500
  },
  {
    id: "seven",
    percent: 7,
    label: "7% Lost",
    impactScore: 72,
    headline: "Cuts type-2 diabetes risk by up to 58%",
    benefits: [
      "Major drop in type-2 diabetes risk (Diabetes Prevention Program)",
      "Visible reduction in waist circumference",
      "Lower triglyceride levels",
      "Reduced joint pain in knees and lower back",
    ],
    brandColor: "#14b8a6", // teal-500
  },
  {
    id: "ten",
    percent: 10,
    label: "10% Lost",
    impactScore: 85,
    headline: "The sweet spot — major health & confidence wins",
    benefits: [
      "Significantly improved cholesterol profile",
      "Better mobility and daily energy",
      "Lower risk of fatty liver disease",
      "Most clothing fits a full size or two smaller",
    ],
    brandColor: "#22c55e", // green-500
  },
  {
    id: "fifteen",
    percent: 15,
    label: "15% Lost",
    impactScore: 92,
    headline: "Reversal of many obesity-related conditions",
    benefits: [
      "Many can stop or reduce blood-pressure medication",
      "Sleep apnea symptoms often improve dramatically",
      "Sustained metabolic health improvements",
      "Stronger long-term weight maintenance odds",
    ],
    brandColor: "#84cc16", // lime-500
  },
  {
    id: "twenty",
    percent: 20,
    label: "20%+ Lost",
    impactScore: 96,
    headline: "Major transformation — but harder to maintain",
    benefits: [
      "Comparable benefits to some bariatric surgery outcomes",
      "Possible reversal of type-2 diabetes in many cases",
      "Requires careful muscle and nutrition protection",
      "Maintenance plan becomes the priority",
    ],
    brandColor: "#65a30d", // lime-600
  },
];

/* ─────────────────────── TRACKING BEST PRACTICES ──────────────── */

export const trackingTips: TrackingTip[] = [
  {
    id: "same-scale",
    title: "Use the same scale every time",
    detail:
      "Different scales can vary by 2–4 pounds. Pick one scale at home and stick with it for the whole journey.",
  },
  {
    id: "same-time",
    title: "Weigh in the morning, after the bathroom, before eating",
    detail:
      "This is when your body weight is at its most consistent baseline — minimal food, water, or clothing variance.",
  },
  {
    id: "weekly-avg",
    title: "Track a weekly average, not daily numbers",
    detail:
      "Daily weight swings by 2–5 lbs from water, hormones, and sodium. Average the week and watch the trend.",
  },
  {
    id: "measurements",
    title: "Add tape measurements every 2 weeks",
    detail:
      "Measure waist, hips, chest, thigh, and upper arm. Fat loss often shows up here before the scale moves.",
  },
  {
    id: "progress-photos",
    title: "Take monthly progress photos",
    detail:
      "Same outfit, same lighting, same poses. Photos catch changes that 0.5 lb shifts on the scale can't show.",
  },
  {
    id: "app",
    title: "Log it in an app, not your head",
    detail:
      "MyFitnessPal, Happy Scale, Lose It, or a simple spreadsheet — any consistent log beats memory.",
  },
];

/* ─────────────────────── NON-SCALE VICTORIES ──────────────────── */

export const nonScaleVictories: NonScaleVictory[] = [
  {
    category: "How Your Clothes Fit",
    emoji: "👖",
    examples: [
      "Belt notch moves in one or two",
      "Jeans button up without a struggle",
      "Old clothes from the back of the closet fit again",
    ],
  },
  {
    category: "Energy & Daily Life",
    emoji: "⚡",
    examples: [
      "Climbing stairs without getting winded",
      "Waking up rested without an alarm",
      "More natural energy in the afternoon",
    ],
  },
  {
    category: "Strength & Movement",
    emoji: "💪",
    examples: [
      "Lifting heavier in the gym week to week",
      "Walking further or faster than before",
      "Less joint pain in knees, hips, and back",
    ],
  },
  {
    category: "Behavioral Wins",
    emoji: "🎯",
    examples: [
      "Hitting your step goal 5 days a week",
      "Drinking 2+ litres of water consistently",
      "Cooking at home more often than ordering in",
    ],
  },
];

/* ─────────────────────── PLATEAUS & FLUCTUATIONS ──────────────── */

export const plateauChallenges: PlateauChallenge[] = [
  {
    name: "Water retention",
    impact: "high",
    detail:
      "High-sodium meals, intense workouts, and hormonal shifts can mask 3–5 lbs of fat loss for days.",
  },
  {
    name: "Hormonal cycles",
    impact: "high",
    detail:
      "Women can see 2–6 lbs of fluctuation across a menstrual cycle. Compare same-week to same-week, not day-to-day.",
  },
  {
    name: "Adaptive thermogenesis",
    impact: "medium",
    detail:
      "After 4–8 weeks in a deficit, your body burns slightly fewer calories. Recalculate your target.",
  },
  {
    name: "Underestimating intake",
    impact: "high",
    detail:
      "Most people underestimate calories by 20–30%. Re-log a full week honestly to find hidden calories.",
  },
  {
    name: "Sleep debt",
    impact: "medium",
    detail:
      "Under 6 hours regularly raises hunger hormones and lowers willpower — and slows weight loss visibly.",
  },
  {
    name: "Muscle gain offsetting fat loss",
    impact: "low",
    detail:
      "If you've started lifting, the scale can stall while body composition still improves. Measurements catch this.",
  },
];

/* ─────────────────── HABITS THAT HELP / HURT PROGRESS ─────────── */

export const weightLossHabits: {
  name: string;
  verdict: "love" | "avoid";
  note: string;
}[] = [
  {
    name: "Slow, sustainable rate (0.5–1% per week)",
    verdict: "love",
    note: "Protects lean muscle and your long-term metabolism.",
  },
  {
    name: "Protein at every meal (1.6–2.2 g/kg)",
    verdict: "love",
    note: "Preserves muscle in a deficit and keeps you full.",
  },
  {
    name: "Strength training 2–3×/week",
    verdict: "love",
    note: "Keeps fat-loss looking like fat-loss, not muscle-loss.",
  },
  {
    name: "Weekly trend over daily scale",
    verdict: "love",
    note: "Reduces stress and protects you from quitting during normal swings.",
  },
  {
    name: "Crash diets (under 1,000 kcal/day)",
    verdict: "avoid",
    note: "Cause muscle loss, gallstones, and almost always rebound regain.",
  },
  {
    name: "Cutting out entire food groups long-term",
    verdict: "avoid",
    note: "Hard to sustain and risks nutrient deficiencies over months.",
  },
  {
    name: "Daily scale obsession",
    verdict: "avoid",
    note: "Trains anxiety, not progress. Weekly averages are honest data.",
  },
];

/* ────────────────────────── HELPERS ─────────────────────────── */

export function getMilestoneByPercent(p: number): WeightLossMilestone | undefined {
  return weightLossMilestones.find((m) => m.percent === p);
}

/**
 * The actual weight loss percentage formula — exposed for any other
 * component that wants to use it (calculator, charts, etc.).
 */
export function calculateWeightLossPercent(
  startingWeight: number,
  currentWeight: number
): number {
  if (startingWeight <= 0) return 0;
  return ((startingWeight - currentWeight) / startingWeight) * 100;
}
