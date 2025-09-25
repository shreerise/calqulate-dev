import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import  LeanBodyMassCalculator  from "@/components/calculators/lean-body-mass-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"

export const metadata: Metadata = {
  title: "Lean Body Mass Calculator - Estimate Muscle Mass | Calculator Hub",
  description:
    "Calculate your lean body mass (LBM) using the Boer formula. Get accurate estimates of your body's muscle mass based on weight, height, and sex.",
  keywords: "lean body mass calculator, LBM calculator, muscle mass estimate, body composition",
}

const faqs = [
  {
    question: "What is Lean Body Mass (LBM)?",
    answer:
      "Lean body mass (LBM) is the weight of your body minus fat mass. It includes muscles, bones, organs, and water weight.",
  },
  {
    question: "How is Lean Body Mass calculated?",
    answer:
      "This calculator uses the Boer formula, which takes into account your weight, height, and sex to estimate your LBM.",
  },
  {
    question: "Why is LBM important?",
    answer:
      "LBM is useful for understanding body composition, fitness levels, and tracking changes in muscle mass over time.",
  },
  {
    question: "Is LBM the same as muscle mass?",
    answer:
      "Not exactly. LBM includes all non-fat components of the body, including organs, bones, and water, not just muscles.",
  },
  {
    question: "Can I improve my Lean Body Mass?",
    answer:
      "Yes, by engaging in resistance training, eating sufficient protein, and following a healthy lifestyle, you can increase your lean body mass.",
  },
]

export default function LeanBodyMassCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Lean Body Mass Calculator"
        description="Calculate your lean body mass (LBM) using the Boer formula based on weight, height, and sex."
        url="https://calqulate.net/health/lean-body-mass-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Lean Body Mass Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Estimate your lean body mass using the Boer formula. This calculator helps you understand your body
                composition by separating muscle and other non-fat tissues from body fat.
              </p>
            </div>

            <LeanBodyMassCalculator />

            <div className="prose prose-gray max-w-none mt-12">
              <h2>Understanding Lean Body Mass</h2>
              <p>
                Lean body mass represents the weight of everything in your body except fat. It includes muscle, bones,
                water, organs, and connective tissues.
              </p>

              <h3>Why LBM Matters</h3>
              <ul>
                <li>Helps track muscle growth and fitness progress</li>
                <li>Useful for setting calorie and protein intake goals</li>
                <li>Important for athletes and individuals managing weight</li>
              </ul>

              <h3>How to Use This Calculator</h3>
              <p>
                Enter your weight, height, and select your sex. The calculator will provide an estimate of your lean body
                mass using a widely accepted formula.
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
