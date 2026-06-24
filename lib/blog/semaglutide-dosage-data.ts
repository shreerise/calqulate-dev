// lib/blog/semaglutide-dosage-data.ts
// All titration steps, Wegovy-vs-Ozempic comparison, compounding math,
// click chart, storage rules, FAQ, and verified references for the
// "Semaglutide Dosage Chart & Titration Schedule" blog.
// Used by SemaglutideDosageBlog and SemaglutideDosageChart.
//
// Every clinical figure below is verified against the FDA prescribing
// information and peer-reviewed trials — see the `references` array at the
// bottom of this file for sources.

export interface TitrationStep {
  id: string;
  phase: string; // "Initiation", "Step 2", ...
  weeks: string; // "Weeks 1-4"
  weekStart: number; // numeric start week, used by the chart X axis
  doseMg: number; // 0.25, 0.5, 1.0, 1.7, 2.4
  purpose: string;
  brandColor: string;
}

export interface CompareRow {
  feature: string;
  wegovy: string;
  ozempic: string;
}

export interface CompoundingDose {
  doseMg: number; // target weekly dose
  volumeMl: number; // volume to draw from a 5 mg/mL vial
  units: number; // insulin-syringe units (1 unit = 0.01 mL)
}

export interface ClickDose {
  doseMg: number;
  clicks: number; // approx clicks on a 1 mg Ozempic pen (74 clicks = full 1 mg)
}

export interface StorageRule {
  id: string;
  product: string;
  state: string; // "Unopened" / "In-use"
  rule: string;
  brandColor: string;
}

export interface SemaglutideFaq {
  q: string;
  a: string;
}

export interface Reference {
  label: string;
  publisher: string;
  url: string;
}

/* ─────────────────── OFFICIAL TITRATION SCHEDULE (WEGOVY) ─────────────────── */
// Source: FDA Wegovy prescribing information. Standard 16-week escalation to the
// 2.4 mg weight-management maintenance dose.

export const titrationSchedule: TitrationStep[] = [
  {
    id: "init",
    phase: "Initiation",
    weeks: "Weeks 1-4",
    weekStart: 1,
    doseMg: 0.25,
    purpose: "Build gastrointestinal tolerance (not a therapeutic weight-loss dose).",
    brandColor: "#10b981", // emerald-500
  },
  {
    id: "step2",
    phase: "Step 2",
    weeks: "Weeks 5-8",
    weekStart: 5,
    doseMg: 0.5,
    purpose: "Continued acclimation; mild appetite suppression may begin.",
    brandColor: "#14b8a6", // teal-500
  },
  {
    id: "step3",
    phase: "Step 3",
    weeks: "Weeks 9-12",
    weekStart: 9,
    doseMg: 1.0,
    purpose: "Moderate therapeutic effect; appetite suppression noticeable.",
    brandColor: "#22c55e", // green-500
  },
  {
    id: "step4",
    phase: "Step 4",
    weeks: "Weeks 13-16",
    weekStart: 13,
    doseMg: 1.7,
    purpose: "High therapeutic effect; significant weight reduction.",
    brandColor: "#84cc16", // lime-500
  },
  {
    id: "maint",
    phase: "Maintenance",
    weeks: "Week 17 & beyond",
    weekStart: 17,
    doseMg: 2.4,
    purpose: "Sustain maximum weight loss and long-term management.",
    brandColor: "#65a30d", // lime-600
  },
];

/* ─────────────────── WEGOVY vs OZEMPIC COMPARISON ─────────────────── */

export const wegovyVsOzempic: CompareRow[] = [
  {
    feature: "Active ingredient",
    wegovy: "Semaglutide (identical molecule)",
    ozempic: "Semaglutide (identical molecule)",
  },
  {
    feature: "FDA-approved use",
    wegovy: "Chronic weight management",
    ozempic: "Type 2 diabetes (weight loss is off-label)",
  },
  {
    feature: "Maximum / maintenance dose",
    wegovy: "2.4 mg once weekly",
    ozempic: "2.0 mg once weekly",
  },
  {
    feature: "Dose strengths",
    wegovy: "0.25, 0.5, 1.0, 1.7, 2.4 mg",
    ozempic: "0.25, 0.5, 1.0, 2.0 mg",
  },
  {
    feature: "Pen type",
    wegovy: "Single-dose auto-injector",
    ozempic: "Multi-dose dial pen",
  },
  {
    feature: "In-use storage (after first use)",
    wegovy: "Use the single-dose pen immediately once uncapped",
    ozempic: "Up to 56 days (room temp or fridge)",
  },
  {
    feature: "Eligibility (label)",
    wegovy: "BMI >= 30, or >= 27 with a weight-related condition",
    ozempic: "Adults with type 2 diabetes",
  },
];

/* ─────────────────── COMPOUNDING MATH (5 mg/mL VIAL) ─────────────────── */
// For compounded vials concentrated at 5 mg/mL. 1 insulin-syringe unit = 0.01 mL.
// Always verify with the prescribing pharmacy — compounded products are not
// FDA-regulated to the same standard as branded pens.

export const compoundingDoses: CompoundingDose[] = [
  { doseMg: 0.25, volumeMl: 0.05, units: 5 },
  { doseMg: 0.5, volumeMl: 0.1, units: 10 },
  { doseMg: 1.0, volumeMl: 0.2, units: 20 },
  { doseMg: 1.7, volumeMl: 0.34, units: 34 },
  { doseMg: 2.4, volumeMl: 0.48, units: 48 },
];

/* ─────────────────── "CLICK CHART" (1 mg OZEMPIC PEN) ─────────────────── */
// A 1 mg Ozempic pen delivers its full dose in ~74 clicks. Click-counting is
// NOT endorsed by the manufacturer — included only to explain the Reddit trend.

export const clickDoses: ClickDose[] = [
  { doseMg: 0.25, clicks: 18 },
  { doseMg: 0.5, clicks: 37 },
  { doseMg: 1.0, clicks: 74 },
];

/* ─────────────────── STORAGE RULES ─────────────────── */

export const storageRules: StorageRule[] = [
  {
    id: "unopened",
    product: "Unopened pens (both)",
    state: "Refrigerated",
    rule: "Store at 36°F-46°F (2°C-8°C), away from the cooling element. If a pen freezes, it is ruined — discard it.",
    brandColor: "#10b981",
  },
  {
    id: "ozempic-inuse",
    product: "Ozempic (in-use)",
    state: "Punctured",
    rule: "Keep at room temperature (up to 86°F) or in the fridge. Discard exactly 56 days after first use.",
    brandColor: "#14b8a6",
  },
  {
    id: "wegovy-inuse",
    product: "Wegovy (in-use)",
    state: "Single-dose pen",
    rule: "An unused Wegovy pen can sit at room temperature for up to 28 days. Once you remove the cap, inject immediately.",
    brandColor: "#84cc16",
  },
];

/* ─────────────────── FAQ ─────────────────── */

export const semaglutideFaqs: SemaglutideFaq[] = [
  {
    q: "Why am I not losing weight on the 0.25 mg starting dose?",
    a: "The 0.25 mg dose is a tolerance-building dose, not a therapeutic weight-loss dose. Its only job is to let your gut adjust to the slowed gastric emptying so you can climb the ladder without severe nausea. Judge your progress once you reach 1.0 mg or 1.7 mg.",
  },
  {
    q: "Can I inject every 5 days instead of 7 to boost the effect?",
    a: "No. Semaglutide has a half-life of about one week, so it accumulates in your system over time. Shortening the interval raises the steady-state concentration too fast, amplifying side effects without any proven safety or efficacy benefit. Stick to the once-weekly, 7-day schedule.",
  },
  {
    q: "What if I throw up shortly after my injection?",
    a: "If you vomit within a few hours of injecting, the medication has almost certainly already been absorbed into your subcutaneous tissue. Do not inject another dose to 'make up' for it — simply resume on your next scheduled injection day.",
  },
  {
    q: "Where is the best place to inject to reduce nausea?",
    a: "Efficacy is identical across the abdomen, thigh, and upper arm. Anecdotally some patients report fewer GI symptoms injecting into the upper thigh, but there is no strong evidence the site changes how the drug works. Rotate sites weekly to avoid lipohypertrophy (hard lumps under the skin).",
  },
  {
    q: "Can I step back down to a lower dose if a higher one feels awful?",
    a: "Yes. Wegovy's prescribing protocol explicitly allows dose reduction if you can't tolerate a titration step — for example, stepping back from 1.7 mg to 1.0 mg. Always do this with your prescriber so they can adjust the prescription correctly.",
  },
  {
    q: "What is the maximum dose of semaglutide for weight loss?",
    a: "For Wegovy, the standard maximum weight-management dose is 2.4 mg once weekly. For Ozempic, the maximum approved dose (for blood-sugar control) is 2.0 mg once weekly. Exceeding these limits does not speed up weight loss — it only raises the risk of serious side effects.",
  },
  {
    q: "Is it safe to 'click-count' or split an Ozempic pen to save money?",
    a: "The manufacturer does not endorse click-counting or dose-splitting, and getting it wrong leads to under- or over-dosing. An Ozempic pen is also only sterile for 56 days after first puncture, so stretching a pen across many weeks risks bacterial contamination. Never attempt it without explicit medical supervision.",
  },
];

/* ─────────────────── VERIFIED REFERENCES (high-authority sources) ─────────────────── */

export const references: Reference[] = [
  {
    label: "Wegovy (semaglutide) Prescribing Information",
    publisher: "U.S. Food & Drug Administration (FDA)",
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/215256s007lbl.pdf",
  },
  {
    label: "Ozempic (semaglutide) Prescribing Information",
    publisher: "U.S. Food & Drug Administration (FDA)",
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/209637s025lbl.pdf",
  },
  {
    label: "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1)",
    publisher: "New England Journal of Medicine",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183",
  },
  {
    label: "Semaglutide — pharmacology, half-life and indications",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Semaglutide",
  },
  {
    label: "Wegovy (semaglutide) medicines guide",
    publisher: "NHS (UK)",
    url: "https://www.nhs.uk/medicines/wegovy-semaglutide/",
  },
  {
    label: "National Diabetes Prevention Program (7% weight loss leads to 58% lower T2D risk)",
    publisher: "Centers for Disease Control and Prevention (CDC)",
    url: "https://www.cdc.gov/diabetes-prevention/programs/what-is-the-national-dpp.html",
  },
];

/* ─────────────────── HELPERS ─────────────────── */

export function getStepById(id: string): TitrationStep | undefined {
  return titrationSchedule.find((s) => s.id === id);
}

/**
 * Convert a compounded dose (mg) to draw volume for any vial concentration
 * (mg/mL). Exposed so a calculator or chart can reuse the exact math.
 */
export function mgToDrawVolume(doseMg: number, concentrationMgPerMl: number): {
  volumeMl: number;
  units: number;
} {
  if (concentrationMgPerMl <= 0) return { volumeMl: 0, units: 0 };
  const volumeMl = doseMg / concentrationMgPerMl;
  return { volumeMl, units: Math.round(volumeMl * 100) };
}
