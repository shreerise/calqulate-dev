// lib/blog/ideal-weight-data.ts
// Height vs weight tables, IBW formulas, age-band notes, BMI categories,
// frame-size logic, and FAQ data for the
// "Ideal Weight by Height & Age (Chart)" blog.
//
// Used by IdealWeightByHeightAgeBlog and IdealWeightChart.
//
// Numbers verified June 2026:
//  • Devine IBW (1974): men 50 kg + 2.3 kg/in over 5 ft; women 45.5 kg + 2.3 kg/in.
//  • BMI healthy range 18.5–24.9 (CDC, adults 20–64). Older adults (65+) trend
//    healthier slightly higher (BMI ~23–30), noted in the age section.
//  • lbs rounded to the nearest whole pound; kg to one decimal.

/* ───────────────────────────── TYPES ───────────────────────────── */

export interface HeightWeightRow {
  inches: number;          // total height in inches (sort key + chart x)
  ftIn: string;            // "5'6\""
  cm: number;              // rounded centimetres
  womenIdealKg: number;    // Devine female target
  womenIdealLb: number;
  menIdealKg: number;      // Devine male target
  menIdealLb: number;
  healthyKg: string;       // BMI 18.5–24.9 range, kg  e.g. "52–70"
  healthyLb: string;       // BMI 18.5–24.9 range, lbs e.g. "115–154"
}

export interface IbwFormula {
  id: string;
  name: string;
  year: number;
  men: string;             // human-readable rule
  women: string;
  context: string;         // where it is used / how it differs
  brandColor: string;
}

export interface AgeBand {
  id: string;
  range: string;           // "18–39"
  title: string;
  detail: string;
  bmiTarget: string;       // healthy BMI guidance for the band
  impactScore: number;     // 0–100, how much age context shifts the read
  brandColor: string;
}

export interface BmiCategory {
  label: string;
  range: string;
  meaning: string;
  tone: "low" | "ok" | "warn" | "high";
}

export interface FrameNote {
  frame: string;
  emoji: string;
  detail: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

/* ─────────────────── HEIGHT × WEIGHT MASTER TABLE ────────────────── */
// Devine ideal target + CDC healthy BMI range (18.5–24.9) for each height.
// Covers 4'10" to 6'6" — the practical adult range for a US audience.

export const heightWeightChart: HeightWeightRow[] = [
  { inches: 58, ftIn: "4'10\"", cm: 147, womenIdealKg: 40.9, womenIdealLb: 90,  menIdealKg: 45.4, menIdealLb: 100, healthyKg: "40–54", healthyLb: "89–119" },
  { inches: 59, ftIn: "4'11\"", cm: 150, womenIdealKg: 43.2, womenIdealLb: 95,  menIdealKg: 47.7, menIdealLb: 105, healthyKg: "42–56", healthyLb: "92–123" },
  { inches: 60, ftIn: "5'0\"",  cm: 152, womenIdealKg: 45.5, womenIdealLb: 100, menIdealKg: 50.0, menIdealLb: 110, healthyKg: "43–58", healthyLb: "95–127" },
  { inches: 61, ftIn: "5'1\"",  cm: 155, womenIdealKg: 47.8, womenIdealLb: 105, menIdealKg: 52.3, menIdealLb: 115, healthyKg: "44–60", healthyLb: "98–132" },
  { inches: 62, ftIn: "5'2\"",  cm: 157, womenIdealKg: 50.1, womenIdealLb: 110, menIdealKg: 54.6, menIdealLb: 120, healthyKg: "46–62", healthyLb: "101–136" },
  { inches: 63, ftIn: "5'3\"",  cm: 160, womenIdealKg: 52.4, womenIdealLb: 116, menIdealKg: 56.9, menIdealLb: 125, healthyKg: "47–64", healthyLb: "104–141" },
  { inches: 64, ftIn: "5'4\"",  cm: 163, womenIdealKg: 54.7, womenIdealLb: 121, menIdealKg: 59.2, menIdealLb: 131, healthyKg: "49–66", healthyLb: "108–145" },
  { inches: 65, ftIn: "5'5\"",  cm: 165, womenIdealKg: 57.0, womenIdealLb: 126, menIdealKg: 61.5, menIdealLb: 136, healthyKg: "50–68", healthyLb: "111–150" },
  { inches: 66, ftIn: "5'6\"",  cm: 168, womenIdealKg: 59.3, womenIdealLb: 131, menIdealKg: 63.8, menIdealLb: 141, healthyKg: "52–70", healthyLb: "115–154" },
  { inches: 67, ftIn: "5'7\"",  cm: 170, womenIdealKg: 61.6, womenIdealLb: 136, menIdealKg: 66.1, menIdealLb: 146, healthyKg: "54–72", healthyLb: "118–159" },
  { inches: 68, ftIn: "5'8\"",  cm: 173, womenIdealKg: 63.9, womenIdealLb: 141, menIdealKg: 68.4, menIdealLb: 151, healthyKg: "55–74", healthyLb: "122–164" },
  { inches: 69, ftIn: "5'9\"",  cm: 175, womenIdealKg: 66.2, womenIdealLb: 146, menIdealKg: 70.7, menIdealLb: 156, healthyKg: "57–76", healthyLb: "125–169" },
  { inches: 70, ftIn: "5'10\"", cm: 178, womenIdealKg: 68.5, womenIdealLb: 151, menIdealKg: 73.0, menIdealLb: 161, healthyKg: "58–79", healthyLb: "129–174" },
  { inches: 71, ftIn: "5'11\"", cm: 180, womenIdealKg: 70.8, womenIdealLb: 156, menIdealKg: 75.3, menIdealLb: 166, healthyKg: "60–81", healthyLb: "133–179" },
  { inches: 72, ftIn: "6'0\"",  cm: 183, womenIdealKg: 73.1, womenIdealLb: 161, menIdealKg: 77.6, menIdealLb: 171, healthyKg: "62–83", healthyLb: "136–184" },
  { inches: 73, ftIn: "6'1\"",  cm: 185, womenIdealKg: 75.4, womenIdealLb: 166, menIdealKg: 79.9, menIdealLb: 176, healthyKg: "64–86", healthyLb: "140–189" },
  { inches: 74, ftIn: "6'2\"",  cm: 188, womenIdealKg: 77.7, womenIdealLb: 171, menIdealKg: 82.2, menIdealLb: 181, healthyKg: "65–88", healthyLb: "144–194" },
  { inches: 75, ftIn: "6'3\"",  cm: 190, womenIdealKg: 80.0, womenIdealLb: 176, menIdealKg: 84.5, menIdealLb: 186, healthyKg: "67–90", healthyLb: "148–199" },
  { inches: 76, ftIn: "6'4\"",  cm: 193, womenIdealKg: 82.3, womenIdealLb: 181, menIdealKg: 86.8, menIdealLb: 191, healthyKg: "69–93", healthyLb: "152–205" },
  { inches: 77, ftIn: "6'5\"",  cm: 196, womenIdealKg: 84.6, womenIdealLb: 187, menIdealKg: 89.1, menIdealLb: 196, healthyKg: "71–95", healthyLb: "156–210" },
  { inches: 78, ftIn: "6'6\"",  cm: 198, womenIdealKg: 86.9, womenIdealLb: 192, menIdealKg: 91.4, menIdealLb: 202, healthyKg: "73–98", healthyLb: "160–215" },
];

/* ───────────────────────── IBW FORMULAS ─────────────────────────── */

export const ibwFormulas: IbwFormula[] = [
  {
    id: "devine",
    name: "Devine",
    year: 1974,
    men: "50 kg + 2.3 kg per inch over 5 ft",
    women: "45.5 kg + 2.3 kg per inch over 5 ft",
    context:
      "The most widely used formula in hospitals for drug dosing and ventilation. Calqulate's calculator uses this as its primary result.",
    brandColor: "#10b981", // emerald-500
  },
  {
    id: "robinson",
    name: "Robinson",
    year: 1983,
    men: "52 kg + 1.9 kg per inch over 5 ft",
    women: "49 kg + 1.7 kg per inch over 5 ft",
    context:
      "A refinement of Devine, common in dietetics and nutrition assessment. Lands close to Devine for most heights.",
    brandColor: "#14b8a6", // teal-500
  },
  {
    id: "miller",
    name: "Miller",
    year: 1983,
    men: "56.2 kg + 1.41 kg per inch over 5 ft",
    women: "53.1 kg + 1.36 kg per inch over 5 ft",
    context:
      "Adds less weight per inch, so it gives lower targets for tall people. Often cited in general fitness contexts.",
    brandColor: "#22c55e", // green-500
  },
  {
    id: "hamwi",
    name: "Hamwi",
    year: 1964,
    men: "48 kg + 2.7 kg per inch over 5 ft",
    women: "45.5 kg + 2.2 kg per inch over 5 ft",
    context:
      "The original 1964 method, still used as a quick bedside estimate. Adds the most weight per inch for men.",
    brandColor: "#84cc16", // lime-500
  },
];

/* ─────────────────────────── AGE BANDS ──────────────────────────── */
// The Devine formula itself does not change with age. What changes is body
// composition and the BMI band that research links to the best outcomes.

export const ageBands: AgeBand[] = [
  {
    id: "young",
    range: "18–39",
    title: "Peak muscle years",
    detail:
      "Your body builds and holds lean mass most easily here. The ideal weight target is a fair benchmark, but a lifter can sit above it and still be lean. Judge the mirror and tape, not only the scale.",
    bmiTarget: "Healthy BMI 18.5–24.9",
    impactScore: 30,
    brandColor: "#10b981",
  },
  {
    id: "midlife",
    range: "40–59",
    title: "Muscle slowly declines",
    detail:
      "Adults lose roughly 3–8% of muscle per decade after 30 (sarcopenia). The scale may hold steady while fat replaces muscle. Protecting muscle with protein and resistance training matters more than chasing a lower number.",
    bmiTarget: "Healthy BMI 18.5–24.9",
    impactScore: 55,
    brandColor: "#22c55e",
  },
  {
    id: "senior",
    range: "60+",
    title: "A little extra can help",
    detail:
      "Several large studies link a slightly higher BMI, roughly 23–30, to longer life and a buffer against illness in older adults. Being underweight carries more risk here than being mildly above the standard range. This is the one age group where the textbook IBW often needs adjusting upward.",
    bmiTarget: "Healthy BMI ~23–30",
    impactScore: 80,
    brandColor: "#65a30d",
  },
];

/* ───────────────────────── BMI CATEGORIES ───────────────────────── */

export const bmiCategories: BmiCategory[] = [
  { label: "Underweight", range: "Below 18.5", meaning: "May signal under-nutrition or muscle loss. Worth a check-in.", tone: "low" },
  { label: "Healthy weight", range: "18.5 – 24.9", meaning: "The standard target range for most adults 20–64.", tone: "ok" },
  { label: "Overweight", range: "25 – 29.9", meaning: "Raised risk for some conditions, but frame and muscle matter.", tone: "warn" },
  { label: "Obesity", range: "30 and above", meaning: "Higher risk for heart disease, diabetes, and joint strain.", tone: "high" },
];

/* ───────────────────── WHAT MOVES YOUR NUMBER ───────────────────── */

export const frameNotes: FrameNote[] = [
  {
    frame: "Frame size",
    emoji: "🦴",
    detail:
      "Wrist circumference is a quick proxy. A larger frame carries more healthy weight, a smaller frame less. Two people at the same height can sit 10–15 lbs apart and both be healthy.",
  },
  {
    frame: "Muscle mass",
    emoji: "💪",
    detail:
      "Muscle is denser than fat. A trained body can read 'overweight' on a height chart while carrying low body fat. Tape and body-fat readings tell the real story.",
  },
  {
    frame: "Sex",
    emoji: "⚖️",
    detail:
      "Women carry more essential fat (about 12–15% vs 2–5% for men) and have a lower ideal-weight baseline at every height. Gender-blind charts overestimate a woman's target.",
  },
  {
    frame: "Age",
    emoji: "📅",
    detail:
      "Composition shifts over the decades. The healthy band drifts slightly upward after 60. A single number for a 25 and a 65 year old hides that.",
  },
];

/* ─────────────────────────── FAQ ────────────────────────────────── */

export const idealWeightFaqs: FaqItem[] = [
  {
    q: "How much should I weigh for my height and age?",
    a: "Start with the healthy BMI range for your height, which is 18.5 to 24.9. For example, at 5'6\" that is about 115 to 154 lbs. The ideal-weight formulas give a single target inside that band, lower for women, higher for men. Age shifts the read mainly after 60, where a BMI up to about 30 is linked to better outcomes. The chart above gives both figures for every height from 4'10\" to 6'6\".",
  },
  {
    q: "Does ideal body weight change with age?",
    a: "The Devine formula doctors use does not change with age. What changes is body composition and the healthy band. Adults 20 to 64 share the 18.5 to 24.9 BMI target. For adults 65 and older, research links a slightly higher BMI, around 23 to 30, to longer life, so the textbook target is usually nudged upward for seniors.",
  },
  {
    q: "What is the ideal weight for a 5'6\" woman?",
    a: "Using the Devine formula, a 5'6\" woman has an ideal target near 131 lbs (59 kg). The full healthy range for that height, based on BMI, runs roughly 115 to 154 lbs. Where you sit inside that band depends on frame size, muscle, and activity.",
  },
  {
    q: "What is the ideal weight for a 6-foot man?",
    a: "A 6'0\" man has a Devine ideal weight of about 171 lbs (77.6 kg). The healthy BMI range for that height is roughly 136 to 184 lbs. A man carrying real muscle can sit at the top of that range, or just above, and still be lean.",
  },
  {
    q: "Is ideal body weight the same as BMI?",
    a: "No. Ideal body weight gives you a target number to aim for and is gender-adjusted. BMI classifies your current weight against your height into ranges and is not gender-adjusted. IBW answers 'what should I weigh,' BMI answers 'where do I stand right now.' The two work best together.",
  },
  {
    q: "Why do the formulas give different numbers?",
    a: "Each formula was built from a different population and purpose. Devine and Robinson land close together, Miller gives lower targets for tall people, and Hamwi adds the most per inch for men. The differences are usually within a few pounds, which is why clinicians look at a range rather than one figure.",
  },
  {
    q: "How accurate is an ideal weight chart?",
    a: "A chart is a screening guide, not a diagnosis. It does not see your frame size, muscle, or medical history, so athletes, pregnant women, seniors, and people with chronic conditions should treat it as a starting point and pair it with clinical advice.",
  },
];

/* ───────────────────────── HELPERS ──────────────────────────────── */

/** Devine ideal body weight in kg. male=true for the male baseline. */
export function devineIdealWeight(heightInches: number, male: boolean): number {
  const base = male ? 50 : 45.5;
  return base + 2.3 * (heightInches - 60);
}

/** Healthy weight range (kg) for a height, using BMI 18.5–24.9. */
export function healthyWeightRangeKg(heightInches: number): [number, number] {
  const m = heightInches * 0.0254;
  return [18.5 * m * m, 24.9 * m * m];
}
