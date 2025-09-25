import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import RFMCalculator from "@/components/calculators/rfm-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"

export const metadata: Metadata = {
  title: "RFM Calculator - Relative Fat Mass | Calculator Hub",
  description:
    "Calculate your body fat percentage using the RFM (Relative Fat Mass) formula. A simple and accurate method based on waist circumference, height, and sex.",
  keywords: "rfm calculator, relative fat mass, body fat percentage, body composition",
}

const faqs = [
  {
    question: "What is RFM?",
    answer:
      "Relative Fat Mass (RFM) is an estimate of body fat percentage based on waist circumference, height, and sex. It is a modern alternative to BMI.",
  },
  {
    question: "How accurate is RFM compared to BMI?",
    answer:
      "Studies suggest RFM is more accurate than BMI for estimating body fat percentage, especially across different body types and sexes.",
  },
  {
    question: "Do I need special equipment to measure RFM?",
    answer:
      "No, all you need is a measuring tape to measure your waist circumference and your height in centimeters.",
  },
  {
    question: "What waist measurement should I use?",
    answer:
      "Measure your waist circumference at the level of the navel (belly button), standing upright and relaxed.",
  },
  {
    question: "Can RFM be used for children?",
    answer:
      "RFM is primarily designed for adults. For children and adolescents, growth charts and specialized formulas should be used instead.",
  },
]

export default function RFMCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="RFM Calculator"
        description="Estimate your body fat percentage using the RFM (Relative Fat Mass) formula based on waist circumference, height, and sex."
        url="https://calculatorhub.com/calculators/rfm-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">RFM Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Use the Relative Fat Mass (RFM) formula to estimate your body fat percentage. A simple and effective
                alternative to BMI that uses waist measurements.
              </p>
            </div>

            <RFMCalculator />

            <div className="prose prose-gray max-w-none mt-12">
              <h2>About the RFM Formula</h2>
              <p>
                The Relative Fat Mass (RFM) formula is designed to estimate body fat percentage more accurately than BMI.
                It considers waist circumference and height, which better reflect body composition.
              </p>

              <h3>Why Use RFM?</h3>
              <ul>
                <li>More accurate than BMI in many populations</li>
                <li>Easy to calculate with just a tape measure</li>
                <li>Provides insights into body composition and health risks</li>
              </ul>

              <h3>How to Use This Calculator</h3>
              <p>
                Select your sex, enter your height and waist circumference. The calculator will give you an estimated
                body fat percentage instantly.
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
