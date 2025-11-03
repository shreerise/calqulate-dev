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
