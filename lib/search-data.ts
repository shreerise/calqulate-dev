export interface Calculator {
  id: string
  title: string
  description: string
  href: string
  category: string
  tags: string[]
  keywords: string[]
}

export const calculators: Calculator[] = [
  {
    id: "absi",
    title: "ABSI Calculator",
    description: "Calculate your A Body Shape Index (ABSI) score",
    href: "/health/absi-calculator",
    category: "Health",
    tags: ["absi", "body shape", "index", "health", "fitness"],
    keywords: ["a body shape index", "absi calculator", "health risk", "body shape", "waist circumference"],
  },
  {
    id: "lean-body-mass",
    title: "Lean Body Mass Calculator",
    description: "Estimate your lean body mass using weight, height, and sex",
    href: "/health/lean-body-mass-calculator",
    category: "Health",
    tags: ["lean body mass", "lbm", "muscle", "weight", "composition"],
    keywords: ["lean body mass", "lbm calculator", "muscle mass", "body composition", "fitness"],
  },
  {
    id: "rfm",
    title: "RFM Calculator",
    description: "Estimate your body fat percentage with the Relative Fat Mass formula",
    href: "/health/rfm-calculator",
    category: "Health",
    tags: ["rfm", "relative fat mass", "body fat", "waist", "height"],
    keywords: ["rfm calculator", "relative fat mass", "body fat percentage", "body composition", "fitness"],
  },
  {
    id: "ponderal-index",
    title: "Ponderal Index Calculator",
    description: "Calculate your body proportion using the Ponderal Index",
    href: "/health/ponderal-index-calculator",
    category: "Health",
    tags: ["ponderal index", "pi", "bmi", "body proportion", "health"],
    keywords: ["ponderal index", "pi calculator", "body proportion", "bmi alternative", "health"],
  },
  {
  id: "adjusted-body-weight",
  title: "Adjusted Body Weight Calculator",
  description: "Calculate your adjusted body weight based on your ideal and actual body weight",
  href: "/health/adjusted-body-weight-calculator",
  category: "Health",
  tags: ["adjusted body weight", "abw", "ibw", "weight correction", "obesity"],
  keywords: ["adjusted body weight calculator","ibw calculator","ideal body weight","obesity dosing weight","nutrition"],
  },
  {
  id: "karvonen-formula",
  title: "Karvonen Formula Calculator",
  description: "Determine your target heart rate using the Karvonen formula",
  href: "/health/karvonen-formula-calculator",
  category: "Health",
  tags: ["karvonen formula", "target heart rate", "heart rate reserve", "exercise", "fitness"],
  keywords: ["karvonen formula calculator","target heart rate","heart rate reserve","exercise intensity","fitness"],
  },
  {
    id: "body-shape",
    title: "Body Shape Calculator",
    description: "Classify your body shape based on measurements of bust, waist, and hips",
    href: "/health/body-shape-calculator", 
    category: "Health",
    tags: ["body shape", "classification", "bust", "waist", "hips"],
    keywords: ["body shape calculator", "body classification", "bust measurement", "waist measurement", "hip measurement"],
  },
  {
    id: "draw-length",
    title: "Draw Length Calculator",
    description: "Calculate your ideal archery draw length based on your wingspan measurement",
    href: "/health/draw-length-calculator",
    category: "Health",
    tags: ["draw length", "archery", "wingspan", "bow", "archer"],
    keywords: ["draw length calculator","archery draw length","wingspan measurement","bow fitting","archer setup"],
  },
  {
    id: "face-shape",
    title: "Face Shape Calculator",
    description: "Determine your face shape using measurements of forehead, cheekbones, and jawline",
    href: "/health/face-shape-calculator",
    category: "Health",
    tags: ["face shape", "classification", "forehead", "cheekbones", "jawline"],
    keywords: ["face shape calculator", "face classification", "forehead measurement", "cheekbone measurement", "jawline measurement"],
  },
  {
    id: "cholesterol-ratio",
    title: "Cholesterol Ratio Calculator",
    description: "Calculate cholesterol ratios using total cholesterol, HDL, LDL, and triglycerides", 
    href: "/health/cholesterol-ratio-calculator",
    category: "Health",
    tags: ["cholesterol ratio", "total cholesterol", "hdl", "ldl", "triglycerides"],
    keywords: ["cholesterol ratio calculator","total cholesterol","hdl cholesterol","ldl cholesterol","triglycerides"],
  },
  {
    id: "heart-rate",
    title: "Heart Rate Calculator",
    description: "Estimate your maximum and target heart rates based on age and fitness level",
    href: "/health/heart-rate-calculator",
    category: "Health",
    tags: ["heart rate", "maximum heart rate", "target heart rate", "age", "fitness"],
    keywords: ["heart rate calculator","maximum heart rate","target heart rate","age based heart rate","fitness level"],
  },
  {
    id: "creatinine-clearance",
    title: "Creatinine Clearance Calculator",
    description: "Estimate kidney function using the Cockcroft-Gault equation",
    href: "/health/creatinine-clearance-calculator",
    category: "Health",
    tags: ["creatinine clearance", "kidney function", "cockcroft-gault", "renal", "glomerular filtration rate"],
    keywords: ["creatinine clearance calculator","kidney function estimation","cockcroft-gault equation","renal function","gfr estimation"],
  },
  {
    id: "pregnancy-weight-gain",
    title: "Pregnancy Weight Gain Calculator",
    description: "Determine recommended weight gain during pregnancy based on pre-pregnancy BMI",
    href: "/health/pregnancy-weight-gain-calculator",
    category: "Health",
    tags: ["pregnancy weight gain", "pregnancy", "weight gain", "bmi", "health"],
    keywords: ["pregnancy weight gain calculator","recommended weight gain","pre-pregnancy bmi","healthy pregnancy","maternal health"],
  },
  {
    id: "fat-intake",
    title: "Fat Intake Calculator",
    description: "Calculate your daily fat intake based on total calories and desired fat percentage",
    href: "/health/fat-intake-calculator",
    category: "Health",
    tags: ["fat intake", "diet", "nutrition", "calories", "health"],
    keywords: ["fat intake calculator","daily fat intake","dietary fat","nutrition planning","healthy eating"],
  },
  {
    id: "mean-arterial-pressure",
    title: "Mean Arterial Pressure Calculator",
    description: "Calculate your mean arterial pressure using systolic and diastolic blood pressure readings",
    href: "/health/mean-arterial-pressure-calculator",
    category: "Health",
    tags: ["mean arterial pressure", "map", "blood pressure", "systolic", "diastolic"],
    keywords: ["mean arterial pressure calculator","map calculation","blood pressure readings","systolic pressure","diastolic pressure"],
  },
  {
    id: "framingham-risk-score",
    title: "Framingham Risk Score Calculator",
    description: "Estimate 10-year cardiovascular risk using the Framingham Risk Score model",
    href: "/health/framingham-risk-score-calculator",
    category: "Health",
    tags: ["framingham risk score", "cardiovascular risk", "heart disease", "10-year risk", "health"],
    keywords: ["framingham risk score calculator","cardiovascular risk estimation","heart disease risk","10-year risk prediction","health assessment"],
  },
  {
    id: "pulse-pressure",
    title: "Pulse Pressure Calculator",
    description: "Determine your pulse pressure using systolic and diastolic blood pressure values",
    href: "/health/pulse-pressure-calculator",
    category: "Health",
    tags: ["pulse pressure", "blood pressure", "systolic", "diastolic", "health"],
    keywords: ["pulse pressure calculator","blood pressure values","systolic pressure","diastolic pressure","cardiovascular health"],
  },
  {
    id: "ascvd-risk",
    title: "ASCVD Risk Calculator",
    description: "Estimate your 10-year risk of atherosclerotic cardiovascular disease (ASCVD)",
    href: "/health/ascvd-risk-calculator",
    category: "Health",
    tags: ["ascvd risk", "cardiovascular disease", "10-year risk", "atherosclerosis", "health"],
    keywords: ["ascvd risk calculator","10-year cardiovascular risk","atherosclerotic disease","heart disease risk","health assessment"],
  },
  {
    id: "qrisk3",
    title: "Qrisk3 Calculator",
    description: "Calculate your risk of developing cardiovascular disease using the Qrisk3 model",
    href: "/health/qrisk3-calculator",
    category: "Health",
    tags: ["qrisk3", "cardiovascular disease", "risk assessment", "health", "disease prediction"],
    keywords: ["qrisk3 calculator","cardiovascular disease risk","risk assessment model","health prediction","disease prevention"],
  },
]

export function searchCalculators(query: string): Calculator[] {
  if (!query.trim()) return calculators

  const searchTerm = query.toLowerCase().trim()

  return calculators.filter((calc) => {
    // Search in title
    if (calc.title.toLowerCase().includes(searchTerm)) return true

    // Search in description
    if (calc.description.toLowerCase().includes(searchTerm)) return true

    // Search in category
    if (calc.category.toLowerCase().includes(searchTerm)) return true

    // Search in tags
    if (calc.tags.some((tag) => tag.toLowerCase().includes(searchTerm))) return true

    // Search in keywords
    if (calc.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm))) return true

    return false
  })
}

export function getCalculatorsByCategory(category: string): Calculator[] {
  return calculators.filter((calc) => calc.category === category)
}

export function getAllCategories(): string[] {
  return Array.from(new Set(calculators.map((calc) => calc.category)))
}
