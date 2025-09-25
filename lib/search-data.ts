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
    href: "/calculators/absi-calculator",
    category: "Health & Fitness",
    tags: ["absi", "body shape", "index", "health", "fitness"],
    keywords: ["a body shape index", "absi calculator", "health risk", "body shape", "waist circumference"],
  },
  {
    id: "lean-body-mass",
    title: "Lean Body Mass Calculator",
    description: "Estimate your lean body mass using weight, height, and sex",
    href: "/calculators/lean-body-mass-calculator",
    category: "Health & Fitness",
    tags: ["lean body mass", "lbm", "muscle", "weight", "composition"],
    keywords: ["lean body mass", "lbm calculator", "muscle mass", "body composition", "fitness"],
  },
  {
    id: "rfm",
    title: "RFM Calculator",
    description: "Estimate your body fat percentage with the Relative Fat Mass formula",
    href: "/calculators/rfm-calculator",
    category: "Health & Fitness",
    tags: ["rfm", "relative fat mass", "body fat", "waist", "height"],
    keywords: ["rfm calculator", "relative fat mass", "body fat percentage", "body composition", "fitness"],
  },
  {
    id: "ponderal-index",
    title: "Ponderal Index Calculator",
    description: "Calculate your body proportion using the Ponderal Index",
    href: "/calculators/ponderal-index-calculator",
    category: "Health & Fitness",
    tags: ["ponderal index", "pi", "bmi", "body proportion", "health"],
    keywords: ["ponderal index", "pi calculator", "body proportion", "bmi alternative", "health"],
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
