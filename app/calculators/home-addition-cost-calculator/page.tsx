import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
// import Ads from "@/components/ads/ads"
import { HomeAdditionCalculator } from "@/components/calculators/home-addition-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"

export const metadata: Metadata = {
  title: "Home Addition Cost Calculator - Estimate Construction Costs | Calculator Hub",
  description:
    "Calculate home addition costs for rooms, bathrooms, kitchens, and more. Get accurate construction estimates based on size and finish level.",
  keywords: "home addition cost, room addition calculator, construction cost, home expansion, building cost calculator",
}

const faqs = [
  {
    question: "How accurate are home addition cost estimates?",
    answer:
      "Our calculator provides estimates based on national averages and industry standards. Actual costs can vary significantly based on local labor rates, material costs, permits, and specific project requirements.",
  },
  {
    question: "What's the most expensive type of home addition?",
    answer:
      "Kitchen and bathroom additions are typically the most expensive due to extensive plumbing, electrical, and ventilation requirements. Second-story additions also cost more due to structural considerations.",
  },
  {
    question: "Do I need permits for a home addition?",
    answer:
      "Most home additions require building permits. The permit process ensures your addition meets local building codes and safety standards. Check with your local building department for specific requirements.",
  },
  {
    question: "How long does a home addition take to complete?",
    answer:
      "Timeline varies by project size and complexity. Simple room additions may take 2-4 months, while complex additions with kitchens or bathrooms can take 4-8 months or longer.",
  },
  {
    question: "Will a home addition increase my property value?",
    answer:
      "Well-planned additions typically increase property value, though the return on investment varies. Kitchens and bathrooms generally provide the best ROI, while the overall market and location also play important roles.",
  },
]

export default function HomeAdditionCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Home Addition Cost Calculator"
        description="Calculate home addition costs for rooms, bathrooms, kitchens, and more based on size and finish level"
        url="https://calculatorhub.com/calculators/home-addition-cost-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* <Ads.BannerAd className="mb-8" /> */}

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Home Addition Cost Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Estimate the cost of your home addition project based on size, type, finish level, and location factors.
              </p>
            </div>

            <HomeAdditionCalculator />

            {/* <Ads.InContentAd /> */}

            <div className="prose prose-gray max-w-none mt-12">
              <h2>Home Addition Cost Guide</h2>
              <p>
                Home additions are a significant investment that can add value and functionality to your property.
                Understanding the cost factors helps you plan and budget effectively for your project.
              </p>

              <h3>Types of Home Additions</h3>
              <ul>
                <li>
                  <strong>Room Additions:</strong> General living spaces with standard finishes
                </li>
                <li>
                  <strong>Kitchen Additions:</strong> Require extensive plumbing, electrical, and ventilation work
                </li>
                <li>
                  <strong>Bathroom Additions:</strong> Need specialized plumbing and waterproofing
                </li>
                <li>
                  <strong>Second Story:</strong> May require structural reinforcement of existing foundation
                </li>
                <li>
                  <strong>Sunrooms:</strong> Often less expensive due to simpler construction requirements
                </li>
              </ul>

              <h3>Planning Your Addition</h3>
              <p>
                Before starting your project, consider permits, architectural plans, and contractor selection. Quality
                construction and proper planning ensure your addition adds maximum value to your home.
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
