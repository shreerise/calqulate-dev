// lib/blog/bmr-tdee-data.ts
// BMR formulas, activity multipliers, energy-component split, calorie-goal
// zones, BMR-vs-TDEE comparison, and FAQ data for the
// "BMR vs TDEE: What's the Difference" blog.
//
// Used by BmrVsTdeeBlog and BmrTdeeChart.
//
// Numbers verified June 2026 against Calqulate's BMR calculator:
//  • Mifflin-St Jeor (1990): the formula the calculator defaults to.
//  • Harris-Benedict (revised) and Katch-McArdle included as alternatives.
//  • Activity multipliers 1.2 / 1.375 / 1.55 / 1.725 / 1.9 (peer-reviewed).
//  • Example TDEE figures use a sample BMR of 1,500 kcal.

/* ───────────────────────────── TYPES ───────────────────────────── */

export interface BmrFormula {
  id: string;
  name: string;
  year: number;
  men: string;
  women: string;
  context: string;
  brandColor: string;
}

export interface ActivityLevel {
  id: string;
  name: string;
  multiplier: number;
  fits: string;            // who it fits
  exampleTdee: number;     // TDEE if BMR = 1,500
  activityAdd: number;     // calories added on top of BMR
  brandColor: string;
}

export interface EnergyComponent {
  id: string;
  name: string;
  short: string;           // abbreviation (BMR, NEAT, etc.)
  percent: number;         // share of TDEE (representative)
  detail: string;
  brandColor: string;
}

export interface CalorieGoal {
  id: string;
  label: string;
  rule: string;            // relative to TDEE
  detail: string;
  tone: "ok" | "loss" | "gain";
}

export interface CompareRow {
  factor: string;
  bmr: string;
  tdee: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

/* sample BMR used for every example figure in the article + chart */
export const SAMPLE_BMR = 1500;

/* ───────────────────────── BMR FORMULAS ─────────────────────────── */

export const bmrFormulas: BmrFormula[] = [
  {
    id: "mifflin",
    name: "Mifflin-St Jeor",
    year: 1990,
    men: "(10 × kg) + (6.25 × cm) − (5 × age) + 5",
    women: "(10 × kg) + (6.25 × cm) − (5 × age) − 161",
    context:
      "The current standard. The Academy of Nutrition and Dietetics rates it the most accurate for modern adults, and it is what Calqulate's BMR calculator uses by default.",
    brandColor: "#10b981", // emerald-500
  },
  {
    id: "harris",
    name: "Harris-Benedict (revised)",
    year: 1984,
    men: "(13.397 × kg) + (4.799 × cm) − (5.677 × age) + 88.362",
    women: "(9.247 × kg) + (3.098 × cm) − (4.330 × age) + 447.593",
    context:
      "The older clinical standard. Still common, but it tends to read about 5% high for today's populations.",
    brandColor: "#14b8a6", // teal-500
  },
  {
    id: "katch",
    name: "Katch-McArdle",
    year: 1996,
    men: "370 + (21.6 × lean body mass in kg)",
    women: "370 + (21.6 × lean body mass in kg)",
    context:
      "Built on lean body mass, so it needs your body-fat percentage. The most accurate option for lean, muscular people once that number is known.",
    brandColor: "#22c55e", // green-500
  },
];

/* ─────────────────── ACTIVITY MULTIPLIERS (TDEE) ────────────────── */
// TDEE = BMR × multiplier. exampleTdee assumes BMR = 1,500.

export const activityLevels: ActivityLevel[] = [
  { id: "sedentary", name: "Sedentary",         multiplier: 1.2,   fits: "Desk job, little or no exercise",          exampleTdee: 1800, activityAdd: 300,  brandColor: "#a7f3d0" },
  { id: "light",     name: "Lightly active",    multiplier: 1.375, fits: "Light exercise 1–3 days a week",           exampleTdee: 2063, activityAdd: 563,  brandColor: "#6ee7b7" },
  { id: "moderate",  name: "Moderately active", multiplier: 1.55,  fits: "Exercise 3–5 days a week",                 exampleTdee: 2325, activityAdd: 825,  brandColor: "#34d399" },
  { id: "very",      name: "Very active",       multiplier: 1.725, fits: "Hard training 6–7 days a week",            exampleTdee: 2588, activityAdd: 1088, brandColor: "#10b981" },
  { id: "extra",     name: "Extra active",      multiplier: 1.9,   fits: "Physical job plus daily intense training", exampleTdee: 2850, activityAdd: 1350, brandColor: "#059669" },
];

/* ─────────────────── WHERE TDEE ENERGY GOES ─────────────────────── */
// Representative split of total daily energy expenditure.

export const energyComponents: EnergyComponent[] = [
  {
    id: "bmr",
    name: "Basal metabolic rate",
    short: "BMR",
    percent: 65,
    detail:
      "Calories your body burns at complete rest to keep you alive. The biggest slice of TDEE and the one you cannot change quickly.",
    brandColor: "#059669",
  },
  {
    id: "neat",
    name: "Non-exercise activity",
    short: "NEAT",
    percent: 15,
    detail:
      "Walking, chores, fidgeting, standing. The most flexible piece, and the one that quietly drops when you diet or sit more.",
    brandColor: "#10b981",
  },
  {
    id: "eat",
    name: "Exercise activity",
    short: "EAT",
    percent: 10,
    detail:
      "Planned workouts. Smaller than most people assume, which is why exercise alone rarely outruns a poor diet.",
    brandColor: "#34d399",
  },
  {
    id: "tef",
    name: "Thermic effect of food",
    short: "TEF",
    percent: 10,
    detail:
      "Energy spent digesting meals. Protein costs the most to process (20–30%), which is one reason high-protein diets help.",
    brandColor: "#6ee7b7",
  },
];

/* ───────────────────── CALORIE-GOAL ZONES ──────────────────────── */
// Relative to TDEE, the number you actually plan meals around.

export const calorieGoals: CalorieGoal[] = [
  { id: "maintain", label: "Maintain weight",  rule: "TDEE ± 100", detail: "Eat at your TDEE to hold steady. Useful as a baseline before any cut or bulk.", tone: "ok" },
  { id: "slowloss", label: "Slow fat loss",    rule: "TDEE − 250", detail: "A gentle deficit, easy to sustain and kind to muscle. Around 0.25 kg a week.",   tone: "loss" },
  { id: "loss",     label: "Steady fat loss",  rule: "TDEE − 500", detail: "The classic deficit. Roughly 0.5 kg of fat a week without crashing.",            tone: "loss" },
  { id: "gain",     label: "Lean muscle gain", rule: "TDEE + 250", detail: "A small surplus paired with training adds muscle while limiting fat gain.",      tone: "gain" },
];

/* ─────────────────── BMR VS TDEE COMPARISON ─────────────────────── */

export const compareRows: CompareRow[] = [
  { factor: "What it measures",  bmr: "Calories burned at complete rest", tdee: "Total calories burned across a full day" },
  { factor: "Includes activity", bmr: "No",                               tdee: "Yes, all of it" },
  { factor: "Includes digestion", bmr: "No",                              tdee: "Yes (TEF)" },
  { factor: "Typical size",      bmr: "Your metabolic floor",             tdee: "20% to 90% higher than BMR" },
  { factor: "How to use it",     bmr: "Never eat below this",             tdee: "Base your daily calorie target on this" },
  { factor: "Changes when",      bmr: "Weight, muscle, age change",       tdee: "Activity, sleep, and stress also change it" },
];

/* ─────────────────────────── FAQ ────────────────────────────────── */

export const bmrTdeeFaqs: FaqItem[] = [
  {
    q: "What is the difference between BMR and TDEE?",
    a: "BMR is the calories your body burns at complete rest just to stay alive. TDEE is your total burn across a full day, which adds movement, exercise, and the energy spent digesting food. TDEE is always higher than BMR, usually 20% to 90% higher depending on how active you are. You plan meals around TDEE, not BMR.",
  },
  {
    q: "Should I eat my BMR or my TDEE?",
    a: "Eat around your TDEE, then adjust for your goal. Your BMR is a floor, not a target. Eating at or below BMR for long stretches triggers muscle loss and slows your metabolism, which makes fat loss harder later. Find your TDEE first, then subtract 250 to 500 calories for fat loss.",
  },
  {
    q: "How do I calculate TDEE from BMR?",
    a: "Multiply your BMR by an activity multiplier: 1.2 if sedentary, 1.375 lightly active, 1.55 moderately active, 1.725 very active, and 1.9 extra active. For example, a BMR of 1,500 at moderate activity gives a TDEE of about 2,325 calories. Calqulate's BMR calculator does both steps for you.",
  },
  {
    q: "Why is my TDEE so much higher than my BMR?",
    a: "Because TDEE counts everything BMR leaves out. Walking, workouts, chores, fidgeting, and digestion all stack on top of your resting burn. Even a sedentary day adds about 20% over BMR, and an active day can add 70% or more.",
  },
  {
    q: "Does BMR change with age?",
    a: "Yes, slowly. BMR tends to drop by roughly 50 calories per decade as muscle mass declines with age. That is one reason recalculating every few months, and protecting muscle with resistance training, matters as you get older.",
  },
  {
    q: "Which BMR formula is most accurate?",
    a: "Mifflin-St Jeor is the current standard for most adults and is about 5% more accurate than the older Harris-Benedict formula. If you know your body-fat percentage and carry a lot of muscle, Katch-McArdle is more accurate because it works from lean body mass instead of total weight.",
  },
  {
    q: "Is RMR the same as BMR?",
    a: "Close enough for planning. RMR (resting metabolic rate) is measured under slightly looser conditions than BMR and reads a little higher, but the two are used interchangeably for nutrition. Both describe the calories you burn at rest.",
  },
];

/* ───────────────────────── HELPERS ──────────────────────────────── */

/** Mifflin-St Jeor BMR in kcal. male=true for the male constant. */
export function mifflinBmr(
  kg: number,
  cm: number,
  age: number,
  male: boolean
): number {
  return 10 * kg + 6.25 * cm - 5 * age + (male ? 5 : -161);
}

/** TDEE = BMR × activity multiplier. */
export function tdeeFromBmr(bmr: number, multiplier: number): number {
  return bmr * multiplier;
}
