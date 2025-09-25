import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
// import Ads from "@/components/ads/ads"
import { TreeRemovalCalculator } from "@/components/calculators/tree-removal-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"

export const metadata: Metadata = {
  title: "Tree Removal Cost Calculator - Free Estimate Tool | Calculator Hub",
  description:
    "Calculate tree removal costs based on height, diameter, type, and accessibility. Get accurate estimates for professional tree removal services.",
  keywords: "tree removal cost, tree service calculator, arborist cost, tree cutting price, stump removal cost",
}

const faqs = [
  {
    question: "How accurate is the tree removal cost calculator?",
    answer:
      "Our calculator provides estimates based on industry standards and current market rates. Actual costs may vary depending on local labor rates, specific site conditions, and contractor pricing.",
  },
  {
    question: "What factors affect tree removal cost the most?",
    answer:
      "Tree height and accessibility are the biggest cost factors. Tall trees require specialized equipment, and trees near power lines or buildings require extra safety precautions, increasing costs significantly.",
  },
  {
    question: "Is stump removal included in tree removal?",
    answer:
      "Stump removal is typically a separate service. Most tree removal services will cut the tree close to ground level, but removing the stump requires additional equipment and labor.",
  },
  {
    question: "When is the best time to remove a tree?",
    answer:
      "Late fall through early spring is often the best time for tree removal when trees are dormant. However, emergency removals for safety reasons should be done immediately regardless of season.",
  },
  {
    question: "Do I need permits for tree removal?",
    answer:
      "Permit requirements vary by location. Many municipalities require permits for removing large trees or trees in protected areas. Check with your local government before proceeding.",
  },
]

export default function TreeRemovalCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Tree Removal Cost Calculator"
        description="Calculate tree removal costs based on height, diameter, type, and accessibility"
        url="https://calculatorhub.com/calculators/tree-removal-cost-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* <Ads.BannerAd className="mb-8" /> */}

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Tree Removal Cost Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Get accurate estimates for tree removal costs based on size, type, accessibility, and location factors.
              </p>
            </div>

            <TreeRemovalCalculator />

            {/* <Ads.InContentAd /> */}

            <div className="prose prose-gray max-w-none mt-12">
              <h2>Understanding Tree Removal Costs</h2>
              <p>
                Tree removal costs vary significantly based on several factors including tree size, species, location,
                and accessibility. Our calculator considers all these variables to provide you with accurate estimates.
              </p>

              <h3>Factors Affecting Tree Removal Cost</h3>
              <ul>
                <li>
                  <strong>Tree Height:</strong> Taller trees require more specialized equipment and safety measures
                </li>
                <li>
                  <strong>Trunk Diameter:</strong> Thicker trunks take more time and effort to cut and remove
                </li>
                <li>
                  <strong>Tree Species:</strong> Hardwood trees like oak are more expensive to remove than softwoods
                </li>
                <li>
                  <strong>Accessibility:</strong> Trees near power lines, buildings, or in tight spaces cost more
                </li>
                <li>
                  <strong>Stump Removal:</strong> Optional service that adds to the total cost
                </li>
              </ul>

              <h3>When to Remove a Tree</h3>
              <p>
                Consider tree removal if the tree is dead, diseased, damaged by storms, poses a safety hazard, or
                interferes with construction projects. Always consult with a certified arborist for professional advice.
              </p>
            </div>

            <FAQSection faqs={faqs} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
