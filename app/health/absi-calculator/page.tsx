import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
// import Ads from "@/components/ads/ads"
import ABSICalculator from "@/components/calculators/absi-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"

export const metadata: Metadata = {
  title: "ABSI Calculator - A Body Shape Index | Calculator Hub",
  description:
    "Calculate your A Body Shape Index (ABSI) using waist circumference, weight, and height. Assess your health risk based on body shape metrics.",
  keywords: "ABSI calculator, body shape index, health risk calculator, waist circumference BMI",
}

const faqs = [
  {
    question: "What is ABSI?",
    answer:
      "ABSI (A Body Shape Index) is a metric that combines waist circumference, BMI, and height to estimate health risk associated with body shape.",
  },
  {
    question: "How is ABSI calculated?",
    answer:
      "ABSI is calculated using the formula: Waist circumference / (BMI^(2/3) × Height^(1/2)). This adjusts waist size for your height and weight.",
  },
  {
    question: "Is ABSI better than BMI?",
    answer:
      "ABSI provides additional insight compared to BMI, since it includes waist circumference. High ABSI values are associated with greater health risks, even if BMI is normal.",
  },
  {
    question: "What does a high ABSI mean?",
    answer:
      "A higher ABSI score indicates that more body mass is concentrated around the waist, which is linked to higher risk of cardiovascular disease and other conditions.",
  },
  {
    question: "Should I rely only on ABSI?",
    answer:
      "No single metric should be used alone. ABSI is best used alongside BMI, waist-to-height ratio, and professional medical advice.",
  },
]

export default function ABSICalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="ABSI Calculator"
        description="Calculate your A Body Shape Index (ABSI) using waist circumference, weight, and height."
        url="https://calqulate.net/health/absi-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* <Ads.BannerAd className="mb-8" /> */}

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">ABSI Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Enter your waist circumference, weight, and height to calculate your A Body Shape Index and assess your health risk.
              </p>
            </div>

            <ABSICalculator />

            {/* <Ads.InContentAd /> */}

            <div className="prose prose-gray max-w-none mt-12">
              <h2>Understanding ABSI</h2>
              <p>
                A Body Shape Index (ABSI) is a modern health metric that adjusts waist circumference for height and weight.
                Unlike BMI, ABSI highlights risks associated with abdominal fat, even in individuals with a normal BMI.
              </p>

              <h3>Why ABSI Matters</h3>
              <ul>
                <li><strong>Waist-Centric:</strong> Focuses on abdominal fat, a key risk factor for heart disease and diabetes.</li>
                <li><strong>More Insight:</strong> Complements BMI and waist-to-height ratio for better health assessment.</li>
                <li><strong>Predictive Power:</strong> High ABSI values are linked to increased mortality risk.</li>
              </ul>

              <h3>Using Your ABSI Score</h3>
              <p>
                ABSI should not replace medical diagnosis but can be a useful tool to understand your body composition.
                Always consult a healthcare provider for a full evaluation.
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
