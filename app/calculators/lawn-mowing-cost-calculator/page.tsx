import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
// import Ads from "@/components/ads/ads"
import { LawnMowingCalculator } from "@/components/calculators/lawn-mowing-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"

export const metadata: Metadata = {
  title: "Lawn Mowing Cost Calculator - Estimate Lawn Care Prices | Calculator Hub",
  description:
    "Calculate lawn mowing and maintenance costs based on lawn size, grass type, terrain, and service frequency. Get accurate pricing estimates.",
  keywords: "lawn mowing cost, lawn care calculator, grass cutting price, landscaping cost, yard maintenance cost",
}

const faqs = [
  {
    question: "How often should I mow my lawn?",
    answer:
      "Most lawns benefit from weekly mowing during peak growing season (spring and summer). During slower growth periods, bi-weekly mowing may be sufficient.",
  },
  {
    question: "What's included in basic lawn mowing service?",
    answer:
      "Basic lawn mowing typically includes cutting grass to appropriate height, basic cleanup of clippings, and sometimes edging along walkways. Additional services like trimming and detailed cleanup cost extra.",
  },
  {
    question: "How does lawn size affect pricing?",
    answer:
      "Larger lawns cost more due to increased time, fuel, and equipment wear. Most services price per 1,000 square feet or offer tiered pricing based on size ranges.",
  },
  {
    question: "Is it cheaper to mow my own lawn?",
    answer:
      "DIY mowing saves on labor costs but requires equipment investment, maintenance, storage, and your time. Professional services often provide better results and convenience.",
  },
  {
    question: "What factors increase lawn mowing costs?",
    answer:
      "Sloped terrain, obstacles like trees and flower beds, thick or tall grass, and additional services like edging and cleanup all increase costs.",
  },
]

export default function LawnMowingCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Lawn Mowing Cost Calculator"
        description="Calculate lawn mowing and maintenance costs based on lawn size, grass type, terrain, and service frequency"
        url="https://calculatorhub.com/calculators/lawn-mowing-cost-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* <Ads.BannerAd className="mb-8" /> */}

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Lawn Mowing Cost Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Calculate lawn mowing and maintenance costs based on your lawn size, grass type, and service
                preferences.
              </p>
            </div>

            <LawnMowingCalculator />

            {/* <Ads.InContentAd /> */}

            <div className="prose prose-gray max-w-none mt-12">
              <h2>Lawn Mowing Cost Factors</h2>
              <p>
                The cost of lawn mowing services depends on several key factors. Understanding these can help you budget
                appropriately and choose the right service level for your needs.
              </p>

              <h3>Key Pricing Factors</h3>
              <ul>
                <li>
                  <strong>Lawn Size:</strong> Larger lawns require more time and fuel, increasing costs
                </li>
                <li>
                  <strong>Grass Type:</strong> Some grass varieties require special care or more frequent cutting
                </li>
                <li>
                  <strong>Terrain:</strong> Sloped or hilly lawns take longer and may require specialized equipment
                </li>
                <li>
                  <strong>Service Frequency:</strong> Weekly service often provides better per-cut rates
                </li>
                <li>
                  <strong>Additional Services:</strong> Edging, trimming, and cleanup add to the base cost
                </li>
              </ul>

              <h3>Seasonal Considerations</h3>
              <p>
                Lawn care costs vary by season. Spring and fall may include additional services like fertilization and
                leaf removal, while summer requires more frequent mowing during peak growing season.
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
