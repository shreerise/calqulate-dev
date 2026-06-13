// lib/blog/rmr-data.ts
// All formulas, activity multipliers, RMR factors, and FAQ data for the
// "How to Calculate Your Resting Metabolic Rate (RMR)" blog.
// Used by CalculateRmrBlog and RmrFactorsChart.

export type ActivityId =
  | "sedentary"
  | "light"
  | "moderate"
  | "very"
  | "extra";

export interface RmrEquation {
  id: string;
  name: string;
  accuracy: number;            // 0–100 — manual-equation accuracy score
  yearPublished: number;
  formulaMale: string;
  formulaFemale: string;
  bestFor: string;
  brandColor: string;
}

export interface ActivityLevel {
  id: ActivityId;
  label: string;
  emoji: string;
  multiplier: number;
  description: string;
}

export interface RmrFactor {
  name: string;
  impact: "high" | "medium" | "low";
  detail: string;
}

/* ─────────────────────────── EQUATIONS ─────────────────────────── */

export const rmrEquations: RmrEquation[] = [
  {
    id: "mifflin",
    name: "Mifflin-St. Jeor",
    accuracy: 95,
    yearPublished: 1990,
    formulaMale: "(10 × weight kg) + (6.25 × height cm) − (5 × age) + 5",
    formulaFemale: "(10 × weight kg) + (6.25 × height cm) − (5 × age) − 161",
    bestFor:
      "Most adults today — recommended by the American Dietetic Association as the most accurate predictive equation.",
    brandColor: "#10b981", // emerald-500
  },
  {
    id: "harris-benedict",
    name: "Harris-Benedict (Revised 1984)",
    accuracy: 88,
    yearPublished: 1984,
    formulaMale:
      "88.362 + (13.397 × weight kg) + (4.799 × height cm) − (5.677 × age)",
    formulaFemale:
      "447.593 + (9.247 × weight kg) + (3.098 × height cm) − (4.330 × age)",
    bestFor:
      "Classic equation, slightly overestimates for sedentary or overweight individuals.",
    brandColor: "#14b8a6", // teal-500
  },
  {
    id: "katch-mcardle",
    name: "Katch-McArdle",
    accuracy: 92,
    yearPublished: 1996,
    formulaMale: "370 + (21.6 × lean body mass kg)",
    formulaFemale: "370 + (21.6 × lean body mass kg)",
    bestFor:
      "Athletes and lean individuals — needs your body-fat percentage, but the most accurate for muscular bodies.",
    brandColor: "#22c55e", // green-500
  },
  {
    id: "cunningham",
    name: "Cunningham",
    accuracy: 90,
    yearPublished: 1991,
    formulaMale: "500 + (22 × lean body mass kg)",
    formulaFemale: "500 + (22 × lean body mass kg)",
    bestFor:
      "Highly trained athletes — produces the highest RMR estimates of any predictive equation.",
    brandColor: "#84cc16", // lime-500
  },
];

/* ──────────────────────── ACTIVITY MULTIPLIERS ──────────────────── */

export const activityLevels: ActivityLevel[] = [
  {
    id: "sedentary",
    label: "Sedentary",
    emoji: "🪑",
    multiplier: 1.2,
    description: "Desk job, little or no exercise.",
  },
  {
    id: "light",
    label: "Lightly Active",
    emoji: "🚶",
    multiplier: 1.375,
    description: "Light exercise or sport 1–3 days a week.",
  },
  {
    id: "moderate",
    label: "Moderately Active",
    emoji: "🏃",
    multiplier: 1.55,
    description: "Moderate exercise 3–5 days a week.",
  },
  {
    id: "very",
    label: "Very Active",
    emoji: "🏋️",
    multiplier: 1.725,
    description: "Hard exercise 6–7 days a week.",
  },
  {
    id: "extra",
    label: "Extra Active",
    emoji: "⚡",
    multiplier: 1.9,
    description: "Very hard exercise plus a physical job or training twice a day.",
  },
];

/* ────────────────────────── RMR FACTORS ─────────────────────────── */

export const rmrFactors: RmrFactor[] = [
  {
    name: "Lean Muscle Mass",
    impact: "high",
    detail:
      "Muscle tissue burns roughly three times more calories at rest than fat tissue. The single biggest lever you control.",
  },
  {
    name: "Age",
    impact: "high",
    detail:
      "RMR drops about 1–2% per decade after age 20, largely because of natural muscle loss (sarcopenia).",
  },
  {
    name: "Sex",
    impact: "medium",
    detail:
      "Men typically have 5–10% higher RMR than women of the same size because of greater average muscle mass.",
  },
  {
    name: "Body Size & Composition",
    impact: "high",
    detail:
      "Taller and heavier bodies have more cells to maintain, so they burn more calories at complete rest.",
  },
  {
    name: "Thyroid Hormone",
    impact: "high",
    detail:
      "An underactive thyroid (hypothyroidism) can cut RMR by 15–40%. Overactive thyroid does the opposite.",
  },
  {
    name: "Genetics",
    impact: "medium",
    detail:
      "Two people with identical age, weight, and body fat can have RMRs that differ by up to 200 kcal per day.",
  },
  {
    name: "Climate & Body Temperature",
    impact: "low",
    detail:
      "Cold environments and a slight fever both raise RMR — your body burns energy to maintain core temperature.",
  },
  {
    name: "Pregnancy & Lactation",
    impact: "medium",
    detail:
      "RMR rises 15–25% in late pregnancy and stays elevated through breastfeeding.",
  },
];

/* ──────────────────── RMR-BOOSTING HABITS (LOVE/AVOID) ───────────── */

export const rmrHabits: {
  name: string;
  verdict: "love" | "avoid";
  note: string;
}[] = [
  {
    name: "Resistance training 3×/week",
    verdict: "love",
    note: "Adds lean muscle, the most powerful long-term RMR booster.",
  },
  {
    name: "Adequate protein (1.6–2.2 g/kg)",
    verdict: "love",
    note: "Higher thermic effect than carbs or fat, preserves muscle in a deficit.",
  },
  {
    name: "Consistent sleep (7–9 hrs)",
    verdict: "love",
    note: "Poor sleep lowers RMR and increases hunger hormones the next day.",
  },
  {
    name: "Steady hydration",
    verdict: "love",
    note: "Even mild dehydration can suppress metabolic rate by 2–3%.",
  },
  {
    name: "Crash dieting (<1000 kcal)",
    verdict: "avoid",
    note: "Triggers metabolic adaptation — RMR can drop 20%+ within weeks.",
  },
  {
    name: "Chronic under-sleeping",
    verdict: "avoid",
    note: "Less than 6 hours regularly slows RMR and disrupts hunger signals.",
  },
  {
    name: "Skipping all carbs long-term",
    verdict: "avoid",
    note: "Can lower thyroid T3 levels, which directly reduces RMR.",
  },
];

/* ────────────────────────── COMMON MYTHS ────────────────────────── */

export const rmrMyths: string[] = [
  "Eating small meals every 2 hours speeds up your metabolism (it doesn't).",
  "Green tea or 'fat-burner' pills meaningfully raise RMR (effect is under 4%).",
  "Skipping breakfast permanently slows your metabolism (only crash dieting does).",
  "Cardio is the best way to boost long-term RMR (resistance training wins).",
  "Your metabolism is 'broken' if you can't lose weight (almost always wrong).",
];

/* ─────────────────────────── HELPERS ─────────────────────────── */

export function getEquationById(id: string): RmrEquation | undefined {
  return rmrEquations.find((e) => e.id === id);
}

export function getActivityById(id: ActivityId): ActivityLevel | undefined {
  return activityLevels.find((a) => a.id === id);
}
