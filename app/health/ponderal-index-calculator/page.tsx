import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import PonderalIndexCalculator from "@/components/calculators/ponderal-index-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"

export const metadata: Metadata = {
  title: "Ponderal Index Calculator - Body Proportion Measure | Calculator Hub",
  description:
    "Calculate your Ponderal Index (PI), a measure of body proportion that improves on BMI by accounting for height more accurately.",
  keywords: "ponderal index calculator, PI calculator, body composition, BMI alternative",
}

const faqs = [
  {
    question: "What is the Ponderal Index?",
    answer:
      "The Ponderal Index (PI) is a measure of body leanness that adjusts for height more accurately than BMI. It is calculated as weight divided by height cubed.",
  },
  {
    question: "How is the Ponderal Index different from BMI?",
    answer:
      "BMI uses height squared in its calculation, while PI uses height cubed. This makes PI a better measure for very tall or short individuals.",
  },
  {
    question: "Is Ponderal Index widely used?",
    answer:
      "PI is less common than BMI but is often used in neonatal and pediatric studies, as well as in certain body composition assessments.",
  },
  {
    question: "What units should I use?",
    answer:
      "Enter weight in kilograms and height in centimeters. The calculator converts height to meters for the calculation.",
  },
  {
    question: "What is a healthy Ponderal Index?",
    answer:
      "Unlike BMI, there are no universally accepted healthy ranges for PI, but values typically fall between 11–15 for adults.",
  },
]

export default function PonderalIndexCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Ponderal Index Calculator"
        description="Calculate your Ponderal Index (PI), a measure of body proportion and composition that adjusts for height more accurately than BMI."
        url="https://calqulate.net/health/ponderal-index-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Ponderal Index Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Calculate your Ponderal Index, a body composition measure that provides a more accurate assessment than
                BMI for very tall or short individuals.
              </p>
            </div>

            <PonderalIndexCalculator />

            <div className="prose prose-gray max-w-none mt-12">
              <h2>Understanding the Ponderal Index</h2>
              <p>
                The Ponderal Index is calculated as weight (kg) divided by height (m) cubed. It improves upon BMI by
                taking height into account more precisely.
              </p>

              <h3>Why Use PI?</h3>
              <ul>
                <li>More accurate than BMI for very tall or short people</li>
                <li>Commonly used in neonatal and pediatric research</li>
                <li>Helps assess body proportion in health and fitness</li>
              </ul>

              <h3>How to Use This Calculator</h3>
              <p>
                Enter your weight in kilograms and height in centimeters. The calculator will compute your Ponderal
                Index instantly.
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
