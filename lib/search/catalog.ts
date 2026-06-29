/** Searchable catalog: Calqulate calculators + Vitals service products. */
export interface CatalogItem {
  title: string;
  url: string;
  category: "calculator" | "product";
  keywords: string[];
}

export const CATALOG: CatalogItem[] = [
  // Vitals services (boosted via category weighting in the engine)
  { title: "Metabolic Health Tracker", url: "/product/metabolic-health-tracker", category: "product", keywords: ["metabolic", "health", "score", "track", "risk", "vitals"] },
  { title: "Heart Age Tracker", url: "/product/heart-age-tracker", category: "product", keywords: ["heart", "age", "vascular", "framingham", "cardiovascular"] },
  { title: "GLP-1 Results Tracker", url: "/product/glp1-progress-tracker", category: "product", keywords: ["glp1", "glp-1", "semaglutide", "ozempic", "tirzepatide", "weight", "loss"] },

  // Health calculators (high-traffic subset from calqulate.net)
  { title: "BMI Calculator", url: "/health/bmi-calculator", category: "calculator", keywords: ["bmi", "body", "mass", "index", "weight"] },
  { title: "ASCVD Risk Calculator", url: "/health/ascvd-risk-calculator", category: "calculator", keywords: ["ascvd", "heart", "stroke", "cardiovascular", "risk", "cholesterol"] },
  { title: "Framingham Risk Calculator", url: "/health/framingham-risk-score-calculator", category: "calculator", keywords: ["framingham", "heart", "risk", "cardiovascular"] },
  { title: "Heart Age Calculator", url: "/health/heart-age-calculator", category: "calculator", keywords: ["heart", "age", "cardiovascular"] },
  { title: "Diabetes Risk Calculator", url: "/health/diabetes-risk-calculator", category: "calculator", keywords: ["diabetes", "risk", "blood", "sugar", "type 2"] },
  { title: "GLP-1 Dose Calculator", url: "/health/glp-1-dose-calculator", category: "calculator", keywords: ["glp1", "glp-1", "dose", "semaglutide", "tirzepatide", "injection"] },
  { title: "Cholesterol Ratio Calculator", url: "/health/cholesterol-ratio-calculator", category: "calculator", keywords: ["cholesterol", "hdl", "ldl", "ratio"] },
  { title: "Blood Pressure Calculator", url: "/health/blood-pressure-calculator", category: "calculator", keywords: ["blood", "pressure", "hypertension", "bp"] },
  { title: "Body Fat Calculator", url: "/health/body-fat-calculator", category: "calculator", keywords: ["body", "fat", "navy", "composition"] },
  { title: "TDEE Calculator", url: "/health/tdee-calculator", category: "calculator", keywords: ["tdee", "calories", "energy", "expenditure"] },
  { title: "BMR Calculator", url: "/health/bmr-calculator", category: "calculator", keywords: ["bmr", "metabolic", "rate", "calories"] },
  { title: "Macro Calculator", url: "/health/macro-calculator", category: "calculator", keywords: ["macro", "protein", "carbs", "nutrition"] },
  { title: "Waist to Height Ratio Calculator", url: "/health/waist-to-height-ratio-calculator", category: "calculator", keywords: ["waist", "height", "ratio", "abdominal"] },
  { title: "Calorie Deficit Calculator", url: "/health/calorie-deficit-calculator", category: "calculator", keywords: ["calorie", "deficit", "weight", "loss"] },
];
