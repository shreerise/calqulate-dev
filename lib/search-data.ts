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
    id: "tree-removal-cost",
    title: "Tree Removal Cost Calculator",
    description: "Calculate the cost of removing trees from your property",
    href: "/calculators/tree-removal-cost-calculator",
    category: "Home Improvement",
    tags: ["tree", "removal", "cost", "arborist", "landscaping"],
    keywords: ["tree removal", "arborist cost", "tree cutting", "stump removal", "tree service"],
  },
  {
    id: "lawn-mowing-cost",
    title: "Lawn Mowing Cost Calculator",
    description: "Estimate lawn care and mowing service costs",
    href: "/calculators/lawn-mowing-cost-calculator",
    category: "Home Improvement",
    tags: ["lawn", "mowing", "grass", "landscaping", "maintenance"],
    keywords: ["lawn mowing", "grass cutting", "lawn care", "yard maintenance", "landscaping cost"],
  },
  {
    id: "home-addition-cost",
    title: "Home Addition Cost Calculator",
    description: "Plan your home expansion project budget",
    href: "/calculators/home-addition-cost-calculator",
    category: "Home Improvement",
    tags: ["home", "addition", "construction", "renovation", "building"],
    keywords: ["home addition", "room addition", "construction cost", "home expansion", "building cost"],
  },
  {
    id: "mortgage",
    title: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments and interest",
    href: "/calculators/mortgage-calculator",
    category: "Financial",
    tags: ["mortgage", "loan", "payment", "interest", "finance"],
    keywords: ["mortgage calculator", "home loan", "monthly payment", "interest rate", "amortization"],
  },
  {
    id: "loan",
    title: "Loan Calculator",
    description: "Determine loan payments and total interest",
    href: "/calculators/loan-calculator",
    category: "Financial",
    tags: ["loan", "payment", "interest", "finance", "debt"],
    keywords: ["loan calculator", "personal loan", "auto loan", "loan payment", "interest calculation"],
  },
  {
    id: "investment",
    title: "Investment Calculator",
    description: "Calculate investment returns and growth",
    href: "/calculators/investment-calculator",
    category: "Financial",
    tags: ["investment", "returns", "growth", "compound", "finance"],
    keywords: ["investment calculator", "compound interest", "investment returns", "portfolio growth", "savings"],
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
