/**
 * Service product catalog. Each entry is a marketing/SEO landing page at
 *   calqulate.net/service/<slug>
 * Slugs are chosen around high-search-volume keywords so existing organic
 * traffic funnels straight into the paid product.
 */
export interface ServiceProduct {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroHeadline: string;
  heroSub: string;
  bullets: string[];
}

export const SERVICES: ServiceProduct[] = [
  {
    slug: "metabolic-health-tracker",
    name: "Calqulate Vitals — Metabolic Health Tracker",
    tagline: "Watch your disease risk drop, not just the scale.",
    metaTitle: "Metabolic Health Tracker | Track Heart & Diabetes Risk Over Time — Calqulate Vitals",
    metaDescription:
      "Turn your numbers into a Metabolic Health Score. Track your 10-year heart-attack risk, heart age and type-2 diabetes risk over time with validated clinical formulas. Free to start.",
    keywords: [
      "metabolic health score",
      "heart age calculator",
      "ascvd risk calculator",
      "diabetes risk test",
      "track health over time",
    ],
    heroHeadline: "See your heart-attack and diabetes risk drop over time.",
    heroSub:
      "Every weight app shows pounds. Calqulate Vitals shows the outcomes that matter — your 10-year cardiovascular risk, heart age and diabetes risk — tracked month over month with the same equations clinicians use.",
    bullets: [
      "Composite Metabolic Health Score (0-100) from validated models",
      "10-year ASCVD risk, heart age, and FINDRISC diabetes risk",
      "Personalized 'next lever' protocol — what to change first",
      "Trend dashboard + doctor-shareable PDF report",
    ],
  },
  {
    slug: "heart-age-tracker",
    name: "Calqulate Vitals — Heart Age Tracker",
    tagline: "How old is your heart, really?",
    metaTitle: "Heart Age Calculator & Tracker | See Your Cardiovascular Age — Calqulate Vitals",
    metaDescription:
      "Calculate your heart age with the validated Framingham model and track it as you improve. Free heart age snapshot; upgrade to track the trend.",
    keywords: ["heart age calculator", "vascular age", "framingham risk score", "cardiovascular age"],
    heroHeadline: "Find out how old your heart really is — then make it younger.",
    heroSub:
      "Your heart age is calculated from the validated Framingham model. Track it over time and watch the number fall as your numbers improve.",
    bullets: [
      "Validated Framingham heart-age model",
      "See years gained as you improve",
      "Trend tracking over time",
      "Doctor-shareable report",
    ],
  },
  {
    slug: "glp1-progress-tracker",
    name: "Calqulate Vitals — GLP-1 Results Tracker",
    tagline: "Prove your GLP-1 is working — at the level that matters.",
    metaTitle: "GLP-1 Results Tracker | Track Heart & Diabetes Risk on Semaglutide — Calqulate Vitals",
    metaDescription:
      "On a GLP-1? Track more than pounds. See your heart-attack and diabetes risk fall as you lose weight, and protect lean mass. Validated clinical formulas.",
    keywords: [
      "glp-1 tracker",
      "semaglutide results tracker",
      "ozempic weight loss tracker",
      "tirzepatide progress",
    ],
    heroHeadline: "Your GLP-1 is dropping pounds. Is it dropping your risk?",
    heroSub:
      "Track the outcomes that actually matter on semaglutide or tirzepatide: heart-attack risk, diabetes risk and lean-mass-aware body composition — not just the scale.",
    bullets: [
      "See cardiovascular & diabetes risk fall over time",
      "Lean-mass aware body composition",
      "Personalized protocol to protect muscle",
      "Doctor-shareable progress report",
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
