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
  faqs: { question: string; answer: string }[];
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
    faqs: [
      {
        question: "What is the Metabolic Health Tracker?",
        answer:
          "It turns your numbers into one composite Metabolic Health Score (0–100) and shows the outcomes that matter — your 10-year heart-attack risk, heart age and type-2 diabetes risk — tracked month over month with the same equations clinicians use. Instead of just watching the scale, you watch your actual disease risk fall.",
      },
      {
        question: "Is the Metabolic Health Score accurate, and what counts as a good score?",
        answer:
          "The score is built from peer-reviewed clinical equations — the Pooled Cohort Equations, Framingham and FINDRISC — not a black-box AI, and the methodology is shown on every result. Any single reading is an estimate, so the real value is the trend: higher is better, and the tracker shows exactly which levers move your score the most as you re-check every few weeks.",
      },
      {
        question: "What does it track besides my weight?",
        answer:
          "Your 10-year ASCVD (heart-attack) risk, your heart age, your FINDRISC type-2 diabetes risk and your composite score — all trended over time. It also surfaces your single highest-impact 'next lever', quantified in your own numbers, so you know what to change first.",
      },
      {
        question: "Is it free, and what does the paid plan cost?",
        answer:
          "Your first metabolic snapshot is free — no account, nothing saved. To save your history, track the trend and unlock the next-lever protocol and doctor-shareable report, Calqulate Vitals is one plan at $9.99/month or $79/year (about $6.58/month). Cancel anytime.",
      },
      {
        question: "Is this medical advice?",
        answer:
          "No. The Metabolic Health Tracker is educational decision-support that helps you understand and track your risk and bring better questions to your doctor. It does not diagnose, treat or prescribe — always confirm changes with a qualified clinician.",
      },
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
    faqs: [
      {
        question: "What is the Heart Age Tracker?",
        answer:
          "It calculates how old your heart really is from the validated Framingham model, then lets you track that number over time and watch it fall as your blood pressure, cholesterol and blood sugar improve. It is the difference between a one-time figure and a trend you can actually move.",
      },
      {
        question: "Why is my heart age older than my actual age?",
        answer:
          "A higher heart age usually means one or more risk factors — high blood pressure, high cholesterol, high blood sugar or smoking — are adding strain to your arteries. It is very common: the CDC estimates the average American heart is about 7 years older than their real age, with men's roughly 8 years older and women's about 5 years older.",
      },
      {
        question: "How accurate is the Framingham heart-age model?",
        answer:
          "It is a well-validated, widely used estimate, but it is an estimate, not a diagnosis. The Framingham model was developed and validated for adults aged 30–74, so results outside that range are less reliable, and it does not capture every factor (such as family history or ethnicity). The most useful signal is the direction of travel as you re-measure over time.",
      },
      {
        question: "Can I actually lower my heart age?",
        answer:
          "Yes — heart age responds to the same things your risk factors do. As you bring down blood pressure, LDL cholesterol and blood sugar, the tracker shows the years coming back off. Track it month over month and the Vitals plan tells you the single highest-impact change to make first.",
      },
      {
        question: "Is it free, and what does the paid plan cost?",
        answer:
          "Your first heart-age snapshot is free with no account. To save it and track the trend over time, plus get the doctor-shareable report, Calqulate Vitals is one plan at $9.99/month or $79/year (about $6.58/month). Cancel anytime.",
      },
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
    faqs: [
      {
        question: "What is the GLP-1 Progress Tracker?",
        answer:
          "It tracks the results that actually matter on a GLP-1 — your heart-attack risk, diabetes risk and lean-mass-aware body composition — instead of just pounds on the scale. It proves your medication is working at the level that counts and helps you hold onto muscle while you lose fat.",
      },
      {
        question: "On Ozempic or Wegovy, how do I know I'm losing fat and not muscle?",
        answer:
          "The scale can't tell fat from muscle. The tracker watches lean-mass-aware body composition over time and pairs it with protein targets and resistance-training reminders — the two things shown to protect muscle during GLP-1 weight loss — so you can see whether you're losing the right kind of weight.",
      },
      {
        question: "Does it work for tirzepatide (Mounjaro / Zepbound) too?",
        answer:
          "Yes. It works for both semaglutide (Ozempic, Wegovy) and tirzepatide (Mounjaro, Zepbound), and for compounded versions — the tracking is based on your body composition and risk numbers, not on a specific brand.",
      },
      {
        question: "Does the tracker prescribe or change my dose?",
        answer:
          "No. The GLP-1 protocol organizes a schedule from standard published dose ladders and adapts the supporting plan to the side-effects you log, but it never prescribes — every dose change must be confirmed with your prescriber. It is educational decision-support, not medical advice.",
      },
      {
        question: "Is it free, and what does the paid plan cost?",
        answer:
          "Your first GLP-1 body-composition snapshot is free with no account. To track muscle vs. fat and your risk over time, and get the protocol and progress report, Calqulate Vitals is one plan at $9.99/month or $79/year (about $6.58/month). Cancel anytime.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
