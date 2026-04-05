import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import OvulationCalculator from "@/components/calculators/ovulation-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Calendar,
  Heart,
  Baby,
  Thermometer,
  Droplet,
  Clock,
  CheckCircle2,
  ArrowRight,
  Target,
  AlertTriangle,
  ShieldCheck,
  Users,
  BookOpen,
  Info,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Free Ovulation Calculator: Accurate Fertile Window & Ovulation Date Predictor | Calqulate.net",
  description:
    "Use our free ovulation calculator to find your exact ovulation day, fertile window, and best time to conceive. Works for regular & irregular periods (including PCOS). Trusted by women in USA & India.",
  keywords:
    "ovulation calculator, fertile window calculator, ovulation date predictor, calculate ovulation date, ovulation calculator irregular periods, best ovulation calculator, ovulation calculator PCOS, free ovulation calculator, when do I ovulate calculator, ovulation calculator boy or girl, ovulation after miscarriage",
}

const faqs = [
  {
    question: "How do you calculate ovulation for irregular periods?",
    answer:
      "Enter your shortest and longest cycle lengths into our calculator. It gives you a wider but more realistic fertile window. Combine with OPKs and BBT for best accuracy.",
  },
  {
    question: "When do I ovulate calculator – is there a 100% accurate one?",
    answer:
      "No tool is 100% accurate on its own, but combining our ovulation calculator with OPKs and BBT gets you very close. Apps alone often assume a fixed 14-day luteal phase.",
  },
  {
    question: "Ovulation calculator boy or girl – does it really work?",
    answer:
      "It shows timing windows based on the Shettles theory, but results are not guaranteed. Focus on a healthy pregnancy first.",
  },
  {
    question: "How accurate is the Flo app or other period trackers?",
    answer:
      "They’re great for tracking periods but often off for ovulation because they assume a fixed luteal phase. Our calculator lets you adjust for your real cycle history.",
  },
  {
    question: "What is the best free ovulation calculator?",
    answer:
      "Calqulate.net’s tool is designed for real women with real cycles — no login needed, works perfectly in USA and India time zones, and handles irregular periods & PCOS.",
  },
  {
    question: "How soon after miscarriage can I use an ovulation calculator?",
    answer:
      "Usually within the next cycle. Enter the first day of post-miscarriage bleeding as your 'last period' and track closely with OPKs.",
  },
  {
    question: "Is there an ovulation calculator for irregular periods or PCOS?",
    answer:
      "Yes. Our calculator accepts shortest/longest cycle lengths. For PCOS, combine it with OPKs (start early) and BBT to confirm actual ovulation.",
  },
  {
    question: "Can I use an ovulation calculator to prevent pregnancy?",
    answer:
      "Yes — this is the Fertility Awareness Method (FAM). Track BBT + cervical mucus strictly. Never rely on the calculator alone for birth control.",
  },
]

export default function OvulationCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Ovulation Calculator"
        description="Free ovulation calculator to predict your fertile window, ovulation day, and best time to conceive. Works for regular, irregular, and PCOS cycles."
        url="https://calqulate.net/ovulation-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Free Ovulation Calculator: Accurate Fertile Window &amp; Ovulation Date Predictor
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Understanding your ovulation date helps you plan for pregnancy or avoid it. You can also <Link href="/health/period-cycle-calculator" className="text-green-600 hover:underline font-medium">track your period cycle accurately</Link> using our advanced tool for better predictions.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Simple, doctor-recommended tips + real-user tracking methods inside. Stop guessing and start knowing when you’re most fertile.
              </p>
            </div>

            {/* Calculator Component */}
            <OvulationCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">

              {/* What is an Ovulation Calculator */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-green-600" />
                  What Is an Ovulation Calculator and Why Do You Need One?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  An ovulation calculator is a free tool that estimates your ovulation day and fertile window (the 5–6 days when pregnancy is most likely). It uses your last period start date and average cycle length.
                </p>
                <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
                  <p className="font-semibold text-green-800 mb-3">Why it matters:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Sperm can live up to 5 days inside you</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> The egg lives only 12–24 hours after ovulation</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Timing intercourse in your fertile window can raise chances up to 25–30% per cycle</li>
                  </ul>
                </div>
                <p className="mt-6 text-gray-700">
                  Many women waste months trusting apps that assume every luteal phase is exactly 14 days. Our calculator lets you adjust for your real cycle history.
                </p>
              </section>

              {/* How Accurate Are Ovulation Calculators? */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-green-600" />
                  How Accurate Are Ovulation Calculators?
                </h2>
                <p className="mb-4 text-gray-700">
                  Online calculators are excellent starting points but are predictions, not guarantees. Apps often assume a fixed 14-day luteal phase, but yours could be 12, 13, or 16 days.
                </p>
                <Card className="border-green-200">
                  <CardContent className="pt-6">
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-3"><span className="font-mono text-green-600">•</span> Predicted ovulation can be off by 2–4 days if your cycle varies</li>
                      <li className="flex gap-3"><span className="font-mono text-green-600">•</span> Women with irregular periods or PCOS notice the biggest difference</li>
                      <li className="flex gap-3"><span className="font-mono text-green-600">•</span> Combine the calculator with 1–2 simple tracking methods and accuracy jumps dramatically</li>
                    </ul>
                  </CardContent>
                </Card>
                <p className="mt-4 text-green-700 font-medium">Many women report getting pregnant within 2–4 cycles once they stop relying on apps alone.</p>
              </section>

              {/* How to Calculate Ovulation – Step-by-Step */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  How to Calculate Ovulation Date from Your Last Period (Step-by-Step)
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-2xl bg-green-600 text-white flex items-center justify-center font-bold shrink-0">1</div>
                    <div className="flex-1">
                      <p className="font-semibold">Note the first day of your last period</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-2xl bg-green-600 text-white flex items-center justify-center font-bold shrink-0">2</div>
                    <div className="flex-1">
                      <p className="font-semibold">Calculate your average cycle length from the last 3–6 cycles</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-2xl bg-green-600 text-white flex items-center justify-center font-bold shrink-0">3</div>
                    <div className="flex-1">
                      <p className="font-semibold">Subtract 14 days → that’s your estimated ovulation day</p>
                      <p className="text-sm text-muted-foreground mt-1">Example: 30-day average cycle → ovulation around day 16</p>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-gray-700">Our free ovulation calculator does all this instantly and lets you input your last 3–6 cycles for better accuracy.</p>
              </section>

              {/* Irregular Periods & PCOS */}
              <section className="bg-green-50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-green-600" />
                  Ovulation Calculator for Irregular Periods &amp; PCOS: What Actually Works
                </h2>
                <p className="text-gray-700">
                  Irregular cycles are common (especially in India where PCOS affects 1 in 5 women). Standard calculators struggle, but our tool lets you enter shortest and longest cycle lengths for a realistic fertile window.
                </p>
                <p className="mt-4 font-medium text-green-800">Pro tip from real users: Stop guessing and start confirming with cheap OPK strips (available on Amazon India or any US pharmacy).</p>
              </section>

              {/* Best Way to Track Ovulation – Table */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Thermometer className="w-6 h-6 text-green-600" />
                  Best Way to Track Ovulation: Beyond Just the Calculator
                </h2>
                <Card className="border-green-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-green-600 text-white">
                          <th className="px-6 py-4 text-left font-bold">Method</th>
                          <th className="px-6 py-4 text-left font-bold">Accuracy</th>
                          <th className="px-6 py-4 text-left font-bold">Cost</th>
                          <th className="px-6 py-4 text-left font-bold">Best For</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-6 py-4 font-medium">Ovulation Calculator</td>
                          <td className="px-6 py-4 text-green-700">Good</td>
                          <td className="px-6 py-4">Free</td>
                          <td className="px-6 py-4">Planning &amp; starting point</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="px-6 py-4 font-medium">OPK / LH strips</td>
                          <td className="px-6 py-4 text-green-700">Very High</td>
                          <td className="px-6 py-4">Low</td>
                          <td className="px-6 py-4">Pinpointing surge</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium">Basal Body Temperature (BBT)</td>
                          <td className="px-6 py-4 text-green-700">High</td>
                          <td className="px-6 py-4">Low</td>
                          <td className="px-6 py-4">Confirming ovulation</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="px-6 py-4 font-medium">Cervical mucus</td>
                          <td className="px-6 py-4 text-green-700">High</td>
                          <td className="px-6 py-4">Free</td>
                          <td className="px-6 py-4">Natural tracking</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium">Apps (Fertility Friend, Read Your Body)</td>
                          <td className="px-6 py-4 text-green-700">Medium–High</td>
                          <td className="px-6 py-4">Free/Paid</td>
                          <td className="px-6 py-4">Daily logging with real data</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
                <p className="mt-6 text-gray-700 font-medium">
                  Real-user favorite combo: Use our ovulation calculator first → start OPKs when your fertile window opens → confirm with BBT or mucus. This finally worked for thousands of women.
                </p>
              </section>

              {/* Boy or Girl Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Baby className="w-6 h-6 text-green-600" />
                  Can an Ovulation Calculator Help You Conceive a Boy or Girl?
                </h2>
                <p className="text-gray-700">
                  Some couples search for “ovulation calculator boy” or “ovulation calculator girl.” These follow the Shettles method (timing intercourse close to ovulation for a boy, or 2–4 days before for a girl).
                </p>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mt-4">
                  <p className="text-amber-800 font-medium">Important truth: While some families report success, science calls this method “not proven.” Focus on a healthy pregnancy first.</p>
                </div>
              </section>

              {/* After Miscarriage */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-green-600" />
                  Ovulation After Miscarriage calculator: When Can You Try Again?
                </h2>
                <p className="text-gray-700">
                  Your body often ovulates within 2–6 weeks. Use our calculator by entering the first day of bleeding after the miscarriage as your “last period.” Always check with your doctor first.
                </p>
              </section>

              {/* Due Date */}
              <section className="py-8 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-green-600" />
                  How to Use Ovulation Calculator for Due Date Calculation
                </h2>
                <p className="text-gray-700">
                  Once pregnant, add 266 days to your confirmed ovulation date for the most accurate due date (more precise than LMP if you ovulated late or early). Our pregnancy due date calculator does this automatically.
                </p>
              </section>

              {/* 5 Insights Card */}
              <section className="bg-white rounded-3xl p-8 border border-green-100 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  5 Ovulation Insights Most Women Don&apos;t Know
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="shrink-0"><Droplet className="w-6 h-6 text-green-600" /></div>
                    <div><strong>1. Luteal phase isn’t always 14 days</strong><p className="text-sm text-gray-600">This is why most apps get it wrong.</p></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0"><Thermometer className="w-6 h-6 text-green-600" /></div>
                    <div><strong>2. BBT confirms ovulation — OPKs predict it</strong><p className="text-sm text-gray-600">Use both for real accuracy.</p></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0"><Users className="w-6 h-6 text-green-600" /></div>
                    <div><strong>3. PCOS can cause multiple LH surges</strong><p className="text-sm text-gray-600">That’s why OPKs can be confusing.</p></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0"><AlertTriangle className="w-6 h-6 text-green-600" /></div>
                    <div><strong>4. Stress, travel, or illness can delay ovulation</strong><p className="text-sm text-gray-600">Your body doesn’t follow a perfect calendar.</p></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0"><ShieldCheck className="w-6 h-6 text-green-600" /></div>
                    <div><strong>5. Consistency beats perfection</strong><p className="text-sm text-gray-600">Track for 2–3 cycles and you’ll learn your body’s unique pattern.</p></div>
                  </div>
                </div>
              </section>

              {/* How to Calculate Gestational Age If You Ovulated Late */}
              <section className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-amber-600" />
                  How to Calculate Gestational Age If You Ovulated Late
                </h2>
                <p className="text-gray-700 mb-4">
                  A massive point of confusion occurs once you get that positive pregnancy test. The standard medical calculation for a due date is based on your Last Menstrual Period (LMP), which assumes you ovulated precisely on Cycle Day 14.
                </p>
                <p className="text-gray-700 mb-4">
                  But what if you ovulated on Day 21? If you use a standard due date calculator, you will look like you are measuring a week behind at your first ultrasound, causing unnecessary panic!
                </p>
                <p className="text-gray-700 font-medium">
                  If you know exactly when you ovulated by using an ovulation calculator, first response test or BBT chart, you can use a due date calculator using ovulation date. You simply calculate two weeks before your known ovulation date, and treat that as your new "LMP" for dating purposes.
                </p>
              </section>

              {/* Accuracy Note */}
              <section className="border-2 border-dashed border-green-200 p-6 rounded-2xl bg-green-50/30">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-green-800">
                  <ShieldCheck className="w-5 h-5" /> Our Calculation Transparency
                </h3>
                <p className="text-gray-700">
                  We show results based on your actual cycle data. No login, accurate and privacy-first. Perfect for women in the USA and India trying to conceive naturally.
                </p>
              </section>

              {/* Related CTA */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Also try our Pregnancy Weight Gain Calculator</h3>
                    <p className="text-green-100 max-w-md">Track healthy weight gain throughout each trimester for a safe and balanced pregnancy journey.</p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/pregnancy-weight-gain-calculator">
                      Use Calculator <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}