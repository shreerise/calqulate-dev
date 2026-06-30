// lib/blog/ozempic-muscle-loss-data.ts
// All body-composition stats, muscle-loss-by-study data, protein targets,
// warning signs, the "scale is lying" breakdown, FAQ, and verified
// references for the "Ozempic Muscle Loss & Skinny Fat" blog.
// Used by OzempicMuscleLossBlog and MuscleLossChart.
//
// Every clinical figure below is verified against the FDA prescribing
// information and peer-reviewed trials (STEP 1, SEMALEAN, Endocrine
// Society) — see the `references` array at the bottom for sources.

export interface WeightLossSplit {
  id: string;
  label: string; // "Fat lost" / "Muscle & lean lost"
  percent: number; // share of total weight lost
  brandColor: string;
}

export interface MuscleLossStudy {
  id: string;
  study: string; // "STEP 1 (Wegovy)"
  leanShare: string; // "~40% of weight lost"
  detail: string;
  brandColor: string;
}

export interface ProteinTarget {
  id: string;
  bodyWeightLbs: number;
  gramsLow: number; // ~0.7 g/lb
  gramsHigh: number; // ~1.0 g/lb
}

export interface WarningSign {
  id: string;
  fear: string; // the thing people are scared of
  cause: string; // what actually causes it
  fix: string; // the simple solution
  brandColor: string;
}

export interface ScaleVsTruthRow {
  metric: string;
  scale: string; // what the bathroom scale tells you
  truth: string; // what body composition tells you
}

export interface MuscleLossFaq {
  q: string;
  a: string;
}

export interface Reference {
  label: string;
  publisher: string;
  url: string;
}

/* ─────────────────── THE 30% RULE: WHERE YOUR WEIGHT GOES ─────────────────── */
// In the STEP 1 trial of semaglutide, roughly 40% of the total weight lost
// came from lean mass (muscle, organ, bone-supporting tissue). Across GLP-1
// trials the lean-mass share ranges from about 25% to 40%. We use a
// conservative, widely-cited "up to ~1/3 is muscle" split here.

export const weightLossSplit: WeightLossSplit[] = [
  {
    id: "fat",
    label: "Fat lost (the goal)",
    percent: 70,
    brandColor: "#10b981", // emerald-500
  },
  {
    id: "lean",
    label: "Muscle & lean mass lost",
    percent: 30,
    brandColor: "#f43f5e", // rose-500
  },
];

/* ─────────────────── MUSCLE LOSS BY STUDY ─────────────────── */

export const muscleLossStudies: MuscleLossStudy[] = [
  {
    id: "step1",
    study: "STEP 1 — Semaglutide 2.4 mg",
    leanShare: "~40% of weight lost was lean mass",
    detail:
      "Participants lost ~15% of body weight; a DXA sub-analysis found about 40% of that loss came from fat-free (lean) mass.",
    brandColor: "#10b981",
  },
  {
    id: "semalean",
    study: "SEMALEAN — real-world obesity cohort",
    leanShare: "Significant lean + fat mass drop",
    detail:
      "Semaglutide reduced fat mass and lean mass together; muscle function had to be tracked separately from weight to see the full picture.",
    brandColor: "#14b8a6",
  },
  {
    id: "general",
    study: "GLP-1 / GLP-1-GIP trials (pooled)",
    leanShare: "25%–40% of weight lost was lean tissue",
    detail:
      "Across recent agonist trials, lean soft tissue made up roughly a quarter to two-fifths of total weight lost — normal for fast weight loss, but worth protecting.",
    brandColor: "#84cc16",
  },
  {
    id: "rt",
    study: "Resistance training + protein (2025)",
    leanShare: "Muscle loss cut from ~40% to ~3%",
    detail:
      "When weight loss was paired with lifting and adequate protein, the share of loss coming from muscle dropped dramatically — proof that muscle loss is preventable, not inevitable.",
    brandColor: "#65a30d",
  },
];

/* ─────────────────── PROTEIN TARGETS ─────────────────── */
// Practical "protect your muscle" target: ~0.7-1.0 g of protein per pound of
// body weight per day while in a calorie deficit, split across meals. Lower
// bound aligns with ~1.6 g/kg; upper bound with aggressive-deficit guidance.

export const proteinTargets: ProteinTarget[] = [
  { id: "p150", bodyWeightLbs: 150, gramsLow: 105, gramsHigh: 150 },
  { id: "p180", bodyWeightLbs: 180, gramsLow: 126, gramsHigh: 180 },
  { id: "p210", bodyWeightLbs: 210, gramsLow: 147, gramsHigh: 210 },
  { id: "p240", bodyWeightLbs: 240, gramsLow: 168, gramsHigh: 240 },
];

/* ─────────────────── THE FEARS (and the simple fix) ─────────────────── */

export const warningSigns: WarningSign[] = [
  {
    id: "face",
    fear: '"Ozempic Face"',
    cause:
      "Rapid loss of fat (and some lean tissue) under the skin of the face, which makes it look gaunt, hollow, and older.",
    fix: "Slow your loss to 1-2 lbs/week, eat enough protein, and lift weights so you keep firm tissue under the skin — not just shrink.",
    brandColor: "#10b981",
  },
  {
    id: "skinnyfat",
    fear: '"Skinny Fat"',
    cause:
      "The scale goes down, but because you lost muscle along with fat, your body-fat percentage stays high. Smaller clothes, same softness.",
    fix: "Track fat vs. muscle separately. If the scale drops but your muscle holds, you're winning. If muscle is falling too, add protein and resistance training.",
    brandColor: "#f43f5e",
  },
  {
    id: "tired",
    fear: "Exhaustion & hair thinning",
    cause:
      "The medication crushes your appetite, so many people accidentally eat far too little protein and too few calories — the body then breaks down muscle and starves the hair.",
    fix: "Use a protein target and hit it every day, even when you're not hungry. Treat protein like medicine, not like a meal.",
    brandColor: "#14b8a6",
  },
  {
    id: "heart",
    fear: "Heart & metabolism worries",
    cause:
      "Muscle is metabolically active tissue. Lose too much of it and your resting metabolism slows, making weight easier to regain and adding strain over time.",
    fix: "Watch a simple Metabolism Score and Heart Age trend instead of guessing. If the numbers move the wrong way, you catch it early.",
    brandColor: "#65a30d",
  },
];

/* ─────────────────── WHY THE SCALE IS LYING TO YOU ─────────────────── */

export const scaleVsTruth: ScaleVsTruthRow[] = [
  {
    metric: "What it measures",
    scale: "Total body weight — fat, muscle, water, and bone all lumped together.",
    truth: "Splits your weight into fat mass vs. muscle (lean) mass.",
  },
  {
    metric: '"I lost 3 lbs this week!"',
    scale: "Celebrates the number — even if 1 of those pounds was muscle.",
    truth: "Shows you whether those 3 lbs were fat (great) or muscle (a problem).",
  },
  {
    metric: "A scary plateau",
    scale: "Shows no change and makes you panic or quit.",
    truth: "Often reveals you lost fat AND gained muscle — real progress the scale hid.",
  },
  {
    metric: "What you can act on",
    scale: "Nothing — just a single number with no story.",
    truth: "Tells you exactly when to add protein, lift more, or slow down.",
  },
];

/* ─────────────────── FAQ ─────────────────── */

export const muscleLossFaqs: MuscleLossFaq[] = [
  {
    q: "Does Ozempic actually make you lose muscle?",
    a: "Yes — but not because the drug attacks muscle. Any fast weight loss takes some muscle along with fat. In the STEP 1 semaglutide trial, roughly 40% of the weight lost came from lean (fat-free) mass. The good news: with enough protein and resistance training, studies show that muscle share can drop dramatically. Muscle loss is a side effect you can manage, not a guarantee.",
  },
  {
    q: "What is \"skinny fat\" and why should I worry about it on a GLP-1?",
    a: "\"Skinny fat\" means weighing less but still carrying a high body-fat percentage because you lost muscle along with fat. You fit smaller clothes, but you feel soft, weak, and tired. The bathroom scale can't see this — it only shows total weight. That's exactly why you need to track fat vs. muscle separately while you're on Ozempic, Wegovy, Mounjaro, or Zepbound.",
  },
  {
    q: "Why is the bathroom scale \"lying\" to me?",
    a: "The scale only gives you one number: total body weight. It can't tell the difference between losing a pound of fat (the goal) and losing a pound of muscle (a problem). You can lose fat and gain muscle in the same week and the scale won't move at all — making you think you've stalled when you're actually getting healthier. Body composition tracking shows the real story.",
  },
  {
    q: "How much protein should I eat to protect my muscle on Ozempic?",
    a: "A widely used target is roughly 0.7 to 1.0 grams of protein per pound of body weight per day, spread across meals. For a 180-lb person that's about 126-180 g per day. Because GLP-1 medications crush your appetite, you'll likely need to plan protein deliberately — think eggs, Greek yogurt, chicken, fish, tofu, and shakes — rather than waiting until you feel hungry.",
  },
  {
    q: "Will lifting weights really stop the muscle loss?",
    a: "It's the single most effective thing you can do. Resistance training tells your body that the muscle is still needed, so it burns fat for fuel instead. In a 2025 analysis, pairing weight loss with resistance training and adequate protein cut the share of weight lost as muscle from around 40% down to just a few percent. You don't need a gym — two to three short sessions a week with bands or bodyweight count.",
  },
  {
    q: "What is \"Ozempic face\" and can I prevent it?",
    a: "\"Ozempic face\" is the gaunt, hollow, prematurely-aged look some people get when they lose fat (and lean tissue) very fast, including under the skin of the face. You can reduce the risk by losing weight at a steady 1-2 lbs per week, eating enough protein, and lifting weights so you keep firm tissue under the skin instead of just deflating.",
  },
  {
    q: "How do I know if my weight loss is healthy or not?",
    a: "Don't judge it by the scale alone. Track three things over time: your fat mass (should fall), your muscle/lean mass (should hold steady), and simple health markers like a Metabolism Score, Heart Age, and your lab results. If fat is dropping while muscle holds and your health markers improve, you're doing it right. That's the whole point of tracking your body composition instead of just your weight.",
  },
];

/* ─────────────────── VERIFIED REFERENCES (high-authority sources) ─────────────────── */

export const references: Reference[] = [
  {
    label:
      "Impact of Semaglutide on Body Composition — Exploratory Analysis of STEP 1",
    publisher: "Journal of the Endocrine Society (Oxford Academic)",
    url: "https://academic.oup.com/jes/article/5/Supplement_1/A16/6240360",
  },
  {
    label: "Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1)",
    publisher: "New England Journal of Medicine",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183",
  },
  {
    label:
      "Impact of Semaglutide on fat mass, lean mass and muscle function (SEMALEAN)",
    publisher: "PubMed Central (NIH)",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12673431/",
  },
  {
    label: "Wegovy (semaglutide) Prescribing Information",
    publisher: "U.S. Food & Drug Administration (FDA)",
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/215256s007lbl.pdf",
  },
  {
    label: "Increasing Protein Intake Could Help Prevent Muscle Loss on Ozempic",
    publisher: "Healthline",
    url: "https://www.healthline.com/health-news/protein-muscle-loss-weight-loss-drugs",
  },
  {
    label: "GLP-1 Muscle Loss: How to Prevent Muscle Wasting on Wegovy & GLP-1s",
    publisher: "U.S. News & World Report (Health)",
    url: "https://health.usnews.com/best-diet/medication/articles/glp-1-muscle-loss-how-to-prevent-muscle-wasting-on-wegovy-and-other-glp-1s",
  },
];

/* ─────────────────── HELPERS ─────────────────── */

export function getStudyById(id: string): MuscleLossStudy | undefined {
  return muscleLossStudies.find((s) => s.id === id);
}

/**
 * Estimate a daily protein target (grams) from body weight in pounds.
 * Uses the muscle-protective ~0.7-1.0 g/lb range. Exposed so a calculator
 * or tracker can reuse the exact math.
 */
export function lbsToProteinTarget(bodyWeightLbs: number): {
  gramsLow: number;
  gramsHigh: number;
} {
  if (bodyWeightLbs <= 0) return { gramsLow: 0, gramsHigh: 0 };
  return {
    gramsLow: Math.round(bodyWeightLbs * 0.7),
    gramsHigh: Math.round(bodyWeightLbs * 1.0),
  };
}
