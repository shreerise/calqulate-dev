import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import IVFCalculator from "@/components/calculators/ivf-pregnancy-due-date-calculator" // Your calculator component
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Baby,
  CalendarDays,
  Activity,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Info,
  Clock,
  Snowflake,
  Users,
  CheckCircle2,
  Stethoscope,
  Globe2,
  HelpCircle
} from "lucide-react"

export const metadata: Metadata = {
  title: "IVF Pregnancy Due Date Calculator | Day 3, 5, FET | Calqulate",
  description:
    "Accurately calculate your pregnancy due date based on your IVF embryo transfer date. Supports Day 3, Day 5, Day 6, and Frozen Embryo Transfers (FET).",
  keywords:
    "ivf due date calculator, embryo transfer due date, fet due date calculator, day 5 transfer due date, day 3 transfer due date, frozen embryo transfer due date, ivf pregnancy calculator",
}

// Extracted FAQs directly from your content
const faqs = [
  {
    question: "How do I calculate my due date for an IVF pregnancy with a 5 day transfer?",
    answer: "Add 261 days to your Day 5 embryo transfer date. Or use the Calqulate calculator above — enter your transfer date, select Day 5, and your due date appears instantly."
  },
  {
    question: "How do I calculate my due date for an IVF pregnancy with a 3 day transfer?",
    answer: "Add 263 days to your Day 3 embryo transfer date. The calculator handles this automatically when you select 'Day 3'."
  },
  {
    question: "How do I calculate my due date with a frozen embryo transfer (FET)?",
    answer: "The same way as a fresh transfer. Enter your FET date and the day of embryo development (Day 5, Day 3, etc.). Freezing does not change the calculation."
  },
  {
    question: "How do I calculate how many weeks pregnant I am after IVF?",
    answer: "Subtract your transfer date from today's date, then add back the embryo offset (5 days for a Day 5 transfer, 3 days for a Day 3 transfer). Or simply use the Calqulate calculator — it shows your current week automatically."
  },
  {
    question: "Why is my IVF due date different from what my OB told me?",
    answer: "Your OB may have adjusted your due date after a dating ultrasound, where the baby's actual size is measured. This is normal and usually means the baby was measuring slightly ahead or behind. The ultrasound date is what your OB will follow."
  },
  {
    question: "Is the due date more accurate with IVF than a natural pregnancy?",
    answer: "Yes, in theory — because you know the exact fertilization date. But the baby's actual growth rate still varies, so the first-trimester ultrasound remains the most reliable way to confirm dating."
  },
  {
    question: "Can I use this calculator before my transfer to plan ahead?",
    answer: "Absolutely. Many IVF patients calculate potential due dates before their scheduled transfer just to get a sense of the timeline. Enter your planned transfer date and it gives you a projection."
  },
  {
    question: "How do I calculate my due date for a Day 6 or Day 7 embryo transfer?",
    answer: "For Day 6, add 260 days to your transfer date. For Day 7, add 259 days. Select the correct embryo day in the calculator and it adjusts automatically."
  },
  {
    question: "What is the due date for IVF twins?",
    answer: "The due date calculation is the same as for a singleton. However, twin pregnancies usually deliver around 36–38 weeks, so your actual birth will likely be earlier than the calculated 40-week due date."
  },
  {
    question: "How do you calculate IVF pregnancy due date in India?",
    answer: "Exactly the same way — based on your embryo transfer date and embryo age at transfer. 'Blastocyst transfer' in Indian clinics usually means Day 5. Use the calculator above and enter your transfer date from your clinic records."
  },
  {
    question: "What does 'fake LMP' mean in IVF pregnancy?",
    answer: "It's an adjusted last menstrual period date that doctors calculate backwards from your transfer date. It's used to fit your IVF pregnancy into the standard 40-week pregnancy calendar. It's not a real period date — it's just a medical reference point."
  },
  {
    question: "My ultrasound is measuring 2–3 days behind my transfer date calculation. Is that normal?",
    answer: "Yes, this is very common. Minor differences in fetal measurements at early ultrasounds are normal. Your OB will typically not change the due date unless the difference is more than 7–10 days."
  }
]

export default function IVFDdueDateCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <CalculatorSchema
        name="IVF Due Date Calculator"
        description="Accurately calculate your pregnancy due date based on your IVF embryo transfer date. Supports Day 3, Day 5, Day 6, and Frozen Embryo Transfers (FET)."
        url="https://calqulate.net/health/ivf-due-date-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-semibold mb-6 shadow-sm border border-green-100">
                <Baby className="w-4 h-4" />
                Updated for 2026 • Evidence-Based Math
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-balance mb-6">
                IVF Pregnancy Due Date Calculator
              </h1>
              <p className="text-lg text-gray-600 text-pretty max-w-2xl mx-auto leading-relaxed">
                Know your exact due date from your transfer date — accurately calibrated for Day 3, Day 5, Day 6, and frozen embryo transfers.
              </p>
            </div>

            {/* Calculator Component Block */}
            <div className="mb-16">
              <IVFCalculator />
            </div>

            {/* Main Content Area */}
            <div className="prose prose-lg prose-gray max-w-none space-y-12">
              
              {/* Section 1 */}
              <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="mb-6 text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <CalendarDays className="w-8 h-8 text-green-600" />
                  Why Can't You Use a Regular Due Date Calculator for IVF?
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you got pregnant through IVF, you already know: the usual pregnancy calculators don't work for you.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Normal calculators ask for your last menstrual period (LMP). But in IVF, there is often no natural cycle. Your embryo was transferred on a specific date — and that's the number that actually matters.
                </p>
                <div className="my-6 p-6 bg-blue-50/50 rounded-2xl border-l-4 border-blue-500">
                  <p className="text-gray-800 italic leading-relaxed m-0">
                    This is one of the most common questions in IVF communities. Hundreds of people on Reddit have asked the same thing: "How do I calculate my due date after a frozen embryo transfer?" or "Why is my OB's date different from what the app says?"
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The answer lies in how IVF dating actually works — and once you understand it, the math is simple.
                </p>
              </section>

              {/* Section 2: Formulas */}
              <section>
                <h2 className="mb-6 text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Calculator className="w-8 h-8 text-green-600" />
                  How to Calculate Your Due Date for an IVF Pregnancy
                </h2>
                <p className="mb-6 text-gray-700">
                  The formula is based on your embryo transfer date and the age of the embryo at transfer. Here's how doctors calculate it:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 not-prose mb-6">
                  <Card className="border-green-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="bg-green-50/50 pb-3">
                      <CardTitle className="text-lg text-green-900">For a Day 5 Transfer</CardTitle>
                      <CardDescription className="text-green-700 font-medium">(Blastocyst Transfer)</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 text-gray-700 text-sm leading-relaxed">
                      Subtract 5 days from your transfer date. That gives you a "virtual conception date." Then add 266 days (38 weeks). Or simply: <strong>add 261 days to your transfer date.</strong>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="bg-blue-50/50 pb-3">
                      <CardTitle className="text-lg text-blue-900">For a Day 3 Transfer</CardTitle>
                      <CardDescription className="text-blue-700 font-medium">(Cleavage Stage)</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 text-gray-700 text-sm leading-relaxed">
                      Subtract 3 days from your transfer date, then add 266 days. Or simply: <strong>add 263 days to your transfer date.</strong>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="bg-purple-50/50 pb-3">
                      <CardTitle className="text-lg text-purple-900">For a Day 6 Transfer</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 text-gray-700 text-sm">
                      <strong>Add 260 days</strong> to your transfer date.
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="bg-orange-50/50 pb-3">
                      <CardTitle className="text-lg text-orange-900">For a Day 7 Transfer</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 text-gray-700 text-sm">
                      <strong>Add 259 days</strong> to your transfer date.
                    </CardContent>
                  </Card>
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 not-prose mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                    <Snowflake className="w-5 h-5 text-blue-500" />
                    For a Frozen Embryo Transfer (FET):
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    The math is the same — the embryo's age at transfer is what determines the offset, not whether it was fresh or frozen. Enter your FET date and the embryo day the same way.
                  </p>
                </div>

                <div className="p-5 bg-green-600 text-white rounded-2xl shadow-md not-prose">
                  <p className="font-medium">
                    <span className="text-green-200 text-xl mr-2">💡</span>
                    <strong>Quick Example:</strong> If your Day 5 blastocyst was transferred on March 10, 2025, your estimated due date would be around December 26, 2025.
                  </p>
                </div>

                <p className="mt-6 text-gray-700">
                  Our calculator on Calqulate does all of this automatically. Just enter your transfer date, select the embryo day, and you'll get your due date in seconds.
                </p>
              </section>

              {/* Section 3 & 4: Medical Details */}
              <div className="grid md:grid-cols-2 gap-8 not-prose">
                <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-6 h-6 text-green-600" />
                    What Is a "Fake LMP"?
                  </h2>
                  <p className="text-gray-700 text-sm mb-4">
                    You may have heard your doctor mention an LMP date even though you went through IVF. That might feel confusing.
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    Doctors use a "fake" or adjusted LMP to slot your pregnancy into the standard 40-week calendar that medical systems use. It's a backwards calculation from your known transfer date.
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    For a Day 5 transfer, the adjusted LMP is typically set to 17 days before the transfer date. This way, on the day of transfer, you're officially considered "2 weeks and 5 days" pregnant — just as you would be in a natural pregnancy.
                  </p>
                  <p className="text-gray-700 text-sm font-medium">
                    So when your OB says you're "6 weeks and 3 days," they're using this adjusted LMP, not the date you actually transferred. It's a medical convention that keeps everything standardized.
                  </p>
                </section>

                <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-blue-600" />
                    IVF vs. Natural Pregnancy
                  </h2>
                  <p className="text-gray-700 text-sm mb-4">
                    The due date calculation is more accurate with IVF than with natural conception — because you know the exact date of fertilization, unlike in a natural pregnancy where ovulation timing is estimated.
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    That said, your due date can still shift slightly after your 12-week dating scan, if the baby is measuring ahead or behind. Many IVF parents find their baby measures a few days ahead at the dating ultrasound.
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg mb-4 text-xs text-gray-600 border border-gray-200">
                    As one person noted on Reddit's r/IVF community: the due date given by their OB after the 12-week scan was different from the one calculated from transfer — because the baby was measuring 5 days ahead.
                  </div>
                  <p className="text-gray-700 text-sm font-medium">
                    So treat your calculated due date as an estimate, not a guaranteed delivery date. Most doctors advise IVF parents to hold it loosely and be prepared to go slightly over.
                  </p>
                </section>
              </div>

              {/* Section 5 & 6 */}
              <section className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Snowflake className="w-6 h-6 text-blue-500" />
                    IVF Due Date Calculator for Frozen Embryo Transfer (FET)
                  </h2>
                  <p className="text-gray-700 mb-3">
                    Frozen embryo transfers are now more common than fresh transfers in many clinics — especially in the USA and India. The good news: the calculation is exactly the same.
                  </p>
                  <p className="text-gray-700 font-medium mb-2">What matters is:</p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                    <li>The date of your FET</li>
                    <li>The day of development the embryo was at transfer (Day 3, 5, 6, or 7)</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Whether the embryo was frozen for 1 month or 2 years does not change the due date math. The embryo's biological age "starts" from transfer.
                  </p>
                  <p className="text-gray-700 mb-4">
                    If your clinic transferred a Day 5 frozen blastocyst on February 1, your estimated due date is November 19.
                  </p>
                  <p className="text-gray-700">
                    Use the Calqulate IVF due date calculator above — just select "Frozen Transfer" and enter your embryo day. It works the same way.
                  </p>
                </div>

                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                  <h2 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                    <Users className="w-6 h-6 text-amber-600" />
                    IVF Due Date Calculator for Twins
                  </h2>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    Carrying twins after IVF? Your due date is calculated the same way based on the transfer date and embryo age. However, twin pregnancies typically deliver earlier than singleton pregnancies — most often around 36–38 weeks rather than 40. Your OB will monitor your twin pregnancy more closely and may give you a different target delivery window. The calculated due date still gives you a useful benchmark, but expect your actual delivery to happen somewhat earlier.
                  </p>
                </div>
              </section>

              {/* Section 7: Table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-green-600" />
                  How to Calculate Pregnancy Due Date with IVF — Week by Week
                </h2>
                <p className="text-gray-700 mb-6">
                  Once you know your due date, you can work backwards to understand where you are each week. Here's a simple reference for Day 5 transfers (add 261 days to transfer date):
                </p>

                <Card className="not-prose overflow-hidden border-green-100 shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="bg-green-600 text-white">
                          <th className="px-6 py-4 font-semibold text-base">Week of Pregnancy</th>
                          <th className="px-6 py-4 font-semibold text-base">Days After Transfer</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                        <tr className="hover:bg-green-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium">3 weeks</td>
                          <td className="px-6 py-4">2 days after transfer</td>
                        </tr>
                        <tr className="bg-gray-50 hover:bg-green-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium">4 weeks</td>
                          <td className="px-6 py-4">9 days after transfer</td>
                        </tr>
                        <tr className="hover:bg-green-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium">6 weeks</td>
                          <td className="px-6 py-4">23 days after transfer</td>
                        </tr>
                        <tr className="bg-gray-50 hover:bg-green-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium">8 weeks</td>
                          <td className="px-6 py-4">37 days after transfer</td>
                        </tr>
                        <tr className="hover:bg-green-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium">12 weeks</td>
                          <td className="px-6 py-4">65 days after transfer</td>
                        </tr>
                        <tr className="bg-gray-50 hover:bg-green-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium">20 weeks</td>
                          <td className="px-6 py-4">121 days after transfer</td>
                        </tr>
                        <tr className="hover:bg-green-50 transition-colors border-t-2 border-green-200">
                          <td className="px-6 py-4 font-bold text-green-700">40 weeks (due date)</td>
                          <td className="px-6 py-4 font-bold text-green-700">261 days after transfer</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
                <p className="mt-4 text-sm text-gray-500 italic">
                  Our calculator also shows your current pregnancy week automatically, so you don't need to count manually.
                </p>
              </section>

              {/* Section 8 & 9 */}
              <section className="grid md:grid-cols-2 gap-8 not-prose">
                <Card className="border-gray-200 shadow-sm">
                  <CardHeader className="pb-3 border-b border-gray-100">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Globe2 className="w-5 h-5 text-indigo-600" />
                      IVF Calculations in India
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 text-gray-700 text-sm leading-relaxed space-y-3">
                    <p>
                      <strong>Does It Work Differently?</strong> No — the biological math is the same everywhere. The embryo transfer date plus the offset based on embryo age gives you the estimated due date, whether you're at a clinic in Mumbai, Delhi, Chennai, or anywhere in the US.
                    </p>
                    <p>
                      What differs in India is the terminology some clinics use. Indian IVF clinics sometimes report the embryo stage differently — if your report says "blastocyst transfer" without a day number, it almost always means Day 5. If it says "cleavage stage transfer," that's typically Day 3.
                    </p>
                    <p>
                      If you're unsure, just ask your clinic: "Was it a Day 3 or Day 5 transfer?" — they will tell you immediately.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 shadow-sm">
                  <CardHeader className="pb-3 border-b border-gray-100">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-rose-500" />
                      App Discrepancies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 text-gray-700 text-sm leading-relaxed space-y-3">
                    <p>
                      <strong>Why Is My IVF Due Date Different from What My App Says?</strong> This is one of the most upvoted questions in the r/IVF and r/IVFbabies subreddits — and it causes a lot of unnecessary stress.
                    </p>
                    <p>
                      The reason is simple: most pregnancy apps use LMP-based calculations. If you enter a random LMP or the app estimates it automatically, the due date will be off. For an accurate IVF pregnancy due date, you need a calculator that starts from your embryo transfer date, not your last period. That's exactly what the Calqulate IVF due date calculator does.
                    </p>
                    <p>
                      If there's a discrepancy between the calculator result and your OB's date, the most common reason is that your dating ultrasound (usually at 7–12 weeks) has been used to adjust the due date based on actual fetal measurements. Ultrasound dating at this stage is very accurate and is what your OB will rely on going forward.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Trust Section */}
              <section className="bg-green-700 rounded-3xl p-8 text-white not-prose mt-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
                  <ShieldCheck className="w-6 h-6" />
                  Why Trust This Calculator?
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <span className="text-green-50 text-sm">Uses standard reproductive endocrinology formulas applied globally.</span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <span className="text-green-50 text-sm">Takes into account embryo transfer age (Day 3, 5, 6, 7) accurately.</span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <span className="text-green-50 text-sm">Works perfectly for both fresh and Frozen Embryo Transfers (FET).</span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0 mt-0.5" />
                    <span className="text-green-50 text-sm">No data stored or tracked ensuring absolute privacy.</span>
                  </div>
                </div>
              </section>

              {/* Disclaimer */}
              <section className="border-2 border-dashed border-gray-300 p-6 rounded-2xl bg-gray-50/50 not-prose mt-8">
                <h3 className="text-sm font-bold mb-2 flex items-center gap-2 text-gray-600 uppercase tracking-tight">
                  <AlertTriangle className="w-4 h-4" /> Medical Disclaimer
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  This content is for informational purposes. Always confirm your due date and pregnancy dating with your reproductive endocrinologist or OB-GYN.
                </p>
              </section>

              {/* Next Steps CTA */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Track Your Pregnancy Journey</h3>
                    <p className="text-blue-100 max-w-md text-sm leading-relaxed">
                      If you're already confirmed pregnant, find out your estimated delivery window and start planning.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap rounded-full px-8 text-blue-700 hover:text-blue-800">
                    <Link href="/health/pregnancy-weight-gain-calculator">
                      Pregnancy Weight Tracker <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

            </div>

            {/* FAQ Section mapped with schema */}
            <div className="mt-16 border-t border-gray-200 pt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              <FAQSection faqs={faqs} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}