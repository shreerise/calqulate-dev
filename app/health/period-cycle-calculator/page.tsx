import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import PeriodCalculator from "@/components/calculators/period-cycle-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, Sparkles, Baby, Moon } from "lucide-react"

export const metadata: Metadata = {
  title: "Period Cycle Calculator & Ovulation Tracker",
  description: "Simple and accurate menstrual cycle tracker. Predict your next period, ovulation day, and fertile window.",
  keywords: "period calculator, ovulation tracker, menstrual cycle phases, next period date",
}

const faqs = [
  {
    question: "How does the Period Cycle Calculator predict my next period?",
    answer: "It adds your average cycle length (usually 28 days) to the start date of your last period to project future dates.",
  },
  {
    question: "How accurate is the ovulation prediction?",
    answer: "It estimates ovulation 14 days before your next period. Stress, diet, and health can shift this date by a few days.",
  },
  {
    question: "What is the 'Fertile Window'?",
    answer: "The 5 days leading up to ovulation plus ovulation day itself. This is when pregnancy is most likely.",
  },
  {
    question: "Is my data saved?",
    answer: "No. All calculations happen on your device. We do not store your personal health data.",
  },
]

export default function PeriodCycleCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <CalculatorSchema
        name="Period Cycle Calculator"
        description="Accurately track your period, predict ovulation, and understand your cycle phases."
        url="https://calqulate.net/health/period-cycle-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Compact Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Period Cycle Calculator
              </h1>
              <p className="text-gray-600 max-w-xl mx-auto text-base">
                Track your cycle, find your fertile window, and predict your next period in seconds.
              </p>
            </div>

            {/* Calculator */}
            <PeriodCalculator />

            {/* Content Section */}
            <div className="prose prose-slate max-w-none mt-12 bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
              
              {/* Phases Section */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">The 4 Phases of Your Cycle</h2>
                
                {/* Visual Placeholder - Reduced Height */}
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border mb-6">
                   <Image 
                     src="/images/placeholder-cycle-phases.jpg" 
                     alt="Cycle Phases Diagram"
                     fill
                     className="object-cover opacity-80"
                   />
                   <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
                      [Image: Cycle Phases Diagram]
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                  <div className="p-4 rounded-lg bg-rose-50 border border-rose-100">
                    <h3 className="font-semibold text-rose-700 flex items-center gap-2 text-sm">
                      <Activity className="w-4 h-4" /> Menstrual
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">Days 1–7. Shedding of lining.</p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <h3 className="font-semibold text-blue-700 flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4" /> Follicular
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">Days 8–13. Egg preparation.</p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                    <h3 className="font-semibold text-purple-700 flex items-center gap-2 text-sm">
                      <Baby className="w-4 h-4" /> Ovulation
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">Day 14. Peak fertility.</p>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                    <h3 className="font-semibold text-amber-700 flex items-center gap-2 text-sm">
                      <Moon className="w-4 h-4" /> Luteal
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">Days 15–28. Premenstrual.</p>
                  </div>
                </div>
              </section>

              {/* Fertility Section */}
              <section className="mt-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Understanding Fertility</h2>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                   <div className="w-full md:w-1/3 relative h-40 bg-gray-100 rounded-lg overflow-hidden border shrink-0">
                     <Image 
                       src="/images/placeholder-fertility.jpg" 
                       alt="Fertility Calendar"
                       fill
                       className="object-cover opacity-80"
                     />
                   </div>
                   <div>
                     <p className="text-sm text-gray-600 mb-2">
                       The <strong>fertile window</strong> is the 6-day interval ending on the day of ovulation. This is the only time during the cycle when pregnancy is possible.
                     </p>
                     <ul className="text-sm list-disc pl-4 text-gray-600 space-y-1">
                       <li>Sperm survival: up to 5 days.</li>
                       <li>Egg survival: 12-24 hours.</li>
                       <li>Peak fertility: 2 days before ovulation.</li>
                     </ul>
                   </div>
                </div>
              </section>

            </div>

            {/* FAQ */}
            <div className="mt-10">
              <FAQSection faqs={faqs} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}