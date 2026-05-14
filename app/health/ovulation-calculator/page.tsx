import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import OvulationCalculator from "@/components/calculators/ovulation-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import {
  Info,
  Calculator as CalculatorIcon,
  AlertTriangle,
  CheckCircle2,
  Heart,
  Calendar,
  Clock,
  Thermometer,
  Baby,
  Activity,
} from "lucide-react"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"

export const metadata: Metadata = {
  title: "Ovulation Calculator: Find Your Fertile Window Fast",
  description:
    "Trying to conceive? Use our ovulation calculator to estimate your ovulation date, fertile window, and best days to get pregnant based on your last period and cycle length.",
  keywords:
    "ovulation calculator, fertility calculator, ovulation date calculator, fertile window calculator, fertility days calculator, ovulation day calculator, fertile days calculator, ovulation period calculator, ovulation calculator for irregular periods, ovulation calculator for pcos, fertilization calculator, ovulation predictor, fertile period calculator, ovulation cycle calculator",
  alternates: {
    canonical: "https://calqulate.net/health/ovulation-calculator",
  },
}

const faqs = [
  {
    question: "How accurate is an ovulation calculator?",
    answer:
      "Ovulation calculators are a helpful starting point but not 100% accurate. They estimate your fertile window based on average cycle patterns. For the most reliable results, combine the calculator with ovulation predictor kits (OPKs), basal body temperature (BBT) tracking, and cervical mucus observation.",
  },
  {
    question: "Can I use an ovulation calculator for irregular periods?",
    answer:
      "Ovulation calculators work best with regular cycles. If your periods are irregular — due to PCOS, thyroid conditions, stress, or recent hormonal changes — the estimates will be less reliable. Ovulation predictor kits and tracking physical signs are better tools for irregular cycles.",
  },
  {
    question: "What is the fertile window and how many days does it last?",
    answer:
      "The fertile window typically spans 6 days: the 5 days before ovulation plus the day of ovulation itself. Sperm can survive in the reproductive tract for up to 5 days, while the egg remains viable for less than 24 hours after ovulation. This is why the days leading up to ovulation are just as important as ovulation day itself.",
  },
  {
    question: "Can I use this ovulation calculator to avoid pregnancy?",
    answer:
      "No. This calculator is designed to help people trying to conceive — not to prevent pregnancy. Ovulation timing can vary even in regular cycles, making this tool unreliable as a contraceptive method. Always use proven birth control methods if you wish to avoid pregnancy.",
  },
  {
    question: "What are the signs that ovulation is happening?",
    answer:
      "Common ovulation signs include clear, stretchy cervical mucus (similar to egg whites), mild pelvic cramping (mittelschmerz), a slight rise in basal body temperature, increased libido, and a positive reading on an ovulation predictor kit due to the LH surge. Not everyone experiences all of these signs.",
  },
  {
    question: "How does an ovulation calculator work for a 28-day cycle?",
    answer:
      "For a standard 28-day cycle, ovulation typically occurs around Day 14. The calculator subtracts 14 days (the average luteal phase length) from your next expected period date to estimate ovulation. Your fertile window would then fall roughly between Days 9 and 14 of your cycle.",
  },
  {
    question: "What should I do if the ovulation calculator shows no fertile window?",
    answer:
      "If the calculator results seem off or your cycles are very short or very long, speak with a healthcare provider. Conditions like PCOS, thyroid imbalances, or hormonal issues can affect ovulation timing and may require medical evaluation.",
  },
]

export default function OvulationCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Ovulation Calculator"
        description="Estimate your ovulation date, fertile window, and best days to conceive based on your last menstrual period and average cycle length."
        url="https://calqulate.net/health/ovulation-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Ovulation Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Knowing when you ovulate is one of the most powerful things you can do when trying to conceive. Enter your last period date and average cycle length below to estimate your ovulation date, fertile window, and the best days to try.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                This fertility calculator uses standard cycle science to give you a clear picture of your most fertile days — so you can plan with confidence instead of guessing.
              </p>
            </div>

            {/* Calculator Component */}
            <OvulationCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">

              {/* How It Works */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  How Does This Ovulation Calculator Work?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  This fertility calculator uses the standard fertility awareness method. It treats the first day of your last menstrual period (LMP) as Cycle Day 1, then uses your average cycle length to estimate key dates.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The math behind it is simple but reliable for regular cycles. Ovulation typically happens about 14 days before your next period — not 14 days after your last one. That distinction matters, especially if your cycle is shorter or longer than 28 days.
                </p>

                <Card className="mt-8 border border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold text-green-800">
                      <CalculatorIcon className="w-5 h-5" />
                      The Calculation Logic
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                    <div className="text-gray-700 text-sm leading-relaxed space-y-3">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Next Period Date:</h3>
                        <p className="bg-gray-100 p-3 rounded-lg font-mono text-center border-l-4 border-green-600">
                          LMP + Average Cycle Length
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Estimated Ovulation:</h3>
                        <p className="bg-gray-100 p-3 rounded-lg font-mono text-center border-l-4 border-green-600">
                          Next Period Date − 14 Days
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Fertile Window:</h3>
                        <p className="bg-gray-100 p-3 rounded-lg font-mono text-center border-l-4 border-green-600">
                          5 Days Before Ovulation + Ovulation Day
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center bg-white border border-green-100 rounded-xl p-5 space-y-3">
                      <h3 className="text-green-800 font-bold mb-1">Cycle Length Examples:</h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between border-b pb-1">
                          <span>28-day cycle</span>
                          <span className="font-bold text-green-700">Ovulation ~Day 14</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span>30-day cycle</span>
                          <span className="font-bold text-green-700">Ovulation ~Day 16</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span>35-day cycle</span>
                          <span className="font-bold text-green-700">Ovulation ~Day 21</span>
                        </div>
                        <div className="flex justify-between">
                          <span>21-day cycle</span>
                          <span className="font-bold text-green-700">Ovulation ~Day 7</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Fertile Window */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-green-600" />
                  What Is the Fertile Window?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Your fertile window is the stretch of days in each cycle when pregnancy is biologically possible. It usually covers 6 days total — the 5 days leading up to ovulation and ovulation day itself.
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Here is why those days before ovulation matter so much: sperm can survive inside the reproductive tract for up to 5 days. The egg, however, only stays viable for around 12 to 24 hours after it is released. So having sperm already present when ovulation occurs dramatically increases your chances of fertilization.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Most fertility experts recommend having intercourse every day or every other day during this window. Many couples focus specifically on the 2 to 3 days just before ovulation as the peak opportunity period.
                </p>

                <div className="mt-6 grid md:grid-cols-3 gap-4 not-prose">
                  {[
                    { label: "Days Before Ovulation", value: "5 Days", desc: "Sperm waits for the egg", color: "bg-green-50 border-green-200 text-green-700" },
                    { label: "Ovulation Day", value: "Day 0", desc: "Egg is released — peak fertility", color: "bg-green-600 text-white border-green-600" },
                    { label: "After Ovulation", value: "12–24 hrs", desc: "Egg viability window closes", color: "bg-orange-50 border-orange-200 text-orange-700" },
                  ].map((item, i) => (
                    <div key={i} className={`p-5 rounded-2xl border text-center ${item.color}`}>
                      <p className="text-xs uppercase tracking-widest opacity-70 mb-1">{item.label}</p>
                      <p className="text-2xl font-bold mb-1">{item.value}</p>
                      <p className="text-xs opacity-80">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Menstrual Cycle Phases */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-green-600" />
                  How the Menstrual Cycle Works
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Your menstrual cycle starts on the first day of your period and ends the day before your next period begins. Most cycles fall between 21 and 35 days. Understanding the four phases helps you see where ovulation fits in — and why it does not always happen exactly at the midpoint.
                </p>

                <Card className="not-prose border border-green-100 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-green-600 text-white">
                            <th className="px-6 py-4 text-left font-bold">Phase</th>
                            <th className="px-6 py-4 text-left font-bold">Timing</th>
                            <th className="px-6 py-4 text-left font-bold">What Is Happening</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr>
                            <td className="px-6 py-4 font-semibold text-blue-700">Menstrual Phase</td>
                            <td className="px-6 py-4">Days 1–5</td>
                            <td className="px-6 py-4">Uterine lining sheds — this is your period</td>
                          </tr>
                          <tr className="bg-green-50/50">
                            <td className="px-6 py-4 font-semibold text-green-700">Follicular Phase</td>
                            <td className="px-6 py-4">Days 1–13</td>
                            <td className="px-6 py-4">Follicles develop in the ovary; estrogen rises</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 font-semibold text-orange-700">Ovulation</td>
                            <td className="px-6 py-4">~Day 14 (28-day cycle)</td>
                            <td className="px-6 py-4">LH surge triggers egg release — peak fertility</td>
                          </tr>
                          <tr className="bg-orange-50/30">
                            <td className="px-6 py-4 font-semibold text-red-700">Luteal Phase</td>
                            <td className="px-6 py-4">Days 15–28</td>
                            <td className="px-6 py-4">Progesterone rises; uterus prepares for implantation</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                <p className="mt-3 text-sm text-center italic text-gray-500">
                  The luteal phase is relatively fixed at around 14 days. It is the follicular phase that varies most between women.
                </p>
              </section>

              {/* Ovulation Signs */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Thermometer className="w-6 h-6 text-green-600" />
                  Signs and Symptoms of Ovulation
                </h2>
                <div className="mb-6 flex justify-center">
                  <Image
                    src="/signs-and-symptoms-of-ovulation-infograpic.png"
                    alt="Signs and Symptoms of Ovulation infographic"
                    width={420}
                    height={190}
                    className="rounded-xl shadow-sm border border-gray-100 w-full max-w-lg h-auto"
                    priority
                  />
                </div>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Many women notice physical changes around ovulation. Learning to recognize these signals helps you confirm what the ovulation calculator predicts and gives you even more confidence about your timing.
                </p>

                <div className="grid md:grid-cols-2 gap-4 not-prose">
                  {[
                    {
                      title: "Cervical Mucus Changes",
                      desc: "Discharge becomes clear, slippery, and stretchy — similar to raw egg whites. This is one of the most reliable signs of approaching ovulation.",
                      icon: "💧",
                    },
                    {
                      title: "Basal Body Temperature Rise",
                      desc: "BBT rises slightly (0.2–0.5°C) after ovulation due to progesterone. Tracking BBT daily confirms ovulation has occurred but not before it happens.",
                      icon: "🌡️",
                    },
                    {
                      title: "Ovulation Pain (Mittelschmerz)",
                      desc: "Some women feel a mild, one-sided pelvic ache or twinge during ovulation. It typically lasts from a few minutes to a couple of hours.",
                      icon: "⚡",
                    },
                    {
                      title: "Positive OPK Result",
                      desc: "Ovulation predictor kits detect the LH surge that happens 24–36 hours before ovulation. A positive OPK is a strong signal that ovulation is imminent.",
                      icon: "✅",
                    },
                    {
                      title: "Increased Libido",
                      desc: "Many women notice a natural increase in sex drive around ovulation — this is a biological signal that your body is at peak fertility.",
                      icon: "❤️",
                    },
                    {
                      title: "Breast Tenderness",
                      desc: "Mild breast sensitivity can appear around ovulation due to hormone fluctuations, particularly rising estrogen and progesterone levels.",
                      icon: "🎯",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-white border border-green-100 rounded-2xl p-5 shadow-sm">
                      <h4 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                        <span>{item.icon}</span> {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-4">
                  <p className="text-sm text-green-800">
                    <strong>Pro tip:</strong> Combining an ovulation calculator with OPK testing and BBT charting gives you the most complete fertility picture. No single method is perfect on its own — but together they significantly improve accuracy.
                  </p>
                </div>
              </section>

              {/* Irregular Periods */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-green-600" />
                  Using This Calculator for Irregular Periods and PCOS
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  This ovulation calculator works best when your cycles are consistent. If you have irregular periods, PCOS, a thyroid condition, or if you are breastfeeding or recently came off hormonal birth control, your ovulation timing may not follow a predictable pattern.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  For longer or unpredictable cycles — common with PCOS — ovulation may happen much later in the cycle or not at all in some months. An ovulation calculator can still give you a rough estimate, but it should be treated as a starting point rather than a definitive answer.
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 not-prose">
                  <h4 className="font-bold text-gray-800 mb-3">If your cycles are irregular, try these alongside the calculator:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /> Use ovulation predictor kits (OPKs) from Day 10 onward to catch the LH surge when it comes</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /> Track basal body temperature (BBT) daily to confirm ovulation after it happens</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /> Observe cervical mucus changes throughout your cycle</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /> Use a fertility charting app to log signs over several months and spot patterns</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /> Speak with a healthcare provider if cycles are very irregular, absent, or unpredictable</li>
                  </ul>
                </div>
              </section>

              {/* Best Time to Conceive */}
              <section className="bg-green-50 p-8 rounded-3xl border border-green-100">
                <h2 className="text-2xl font-bold mb-6 text-green-900 flex items-center gap-2">
                  <Baby className="w-6 h-6" />
                  When Is the Best Time to Conceive?
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The highest probability of conception comes from timing intercourse well within your fertile window. Research consistently shows that the two days before ovulation and ovulation day itself offer the best odds. Here is a practical breakdown:
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-green-800 mb-3">Highest Probability Days</h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> 2 days before ovulation (peak sperm meets egg timing)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> 1 day before ovulation</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Ovulation day itself</li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-green-800 mb-3">Good Supporting Days</h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5" /> 3–5 days before ovulation (sperm will survive to wait)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5" /> 1 day after ovulation (lower chance, egg still briefly viable)</li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-green-800 mb-3">Recommended Frequency</h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Every day or every other day during the fertile window</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Daily intercourse is fine and does not reduce sperm quality in healthy men</li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm">
                    <h4 className="font-bold text-green-800 mb-3">Track Multiple Signs</h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Use OPK tests alongside this fertility date calculator</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Watch for egg-white cervical mucus as a natural signal</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* When to See a Doctor */}
              <section className="border-l-4 border-orange-400 bg-orange-50/50 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="w-5 h-5" /> When to Speak with a Healthcare Provider
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  A fertility calculator is a useful starting point — but it is not a substitute for professional guidance. Reach out to a doctor or reproductive specialist if:
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700 not-prose">
                  {[
                    "You are under 35 and have been trying to conceive for 12 months without success",
                    "You are 35 or older and have been trying for 6 months without a positive result",
                    "Your periods are very irregular, extremely painful, or absent altogether",
                    "You have a known condition such as PCOS, endometriosis, or a thyroid disorder",
                    "You have experienced recurrent miscarriages or pregnancy loss",
                    "Your OPK results are consistently negative even mid-cycle",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* How Long to Conceive */}
              <section className="py-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                  <Clock className="w-6 h-6 text-green-600" /> How Many Cycles Does It Typically Take to Conceive?
                </h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Conception does not always happen immediately, even with perfect timing. Here is a realistic picture of what research shows for couples actively trying:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
                  {[
                    { stat: "~30%", label: "Conceive in the first cycle", color: "bg-green-50 text-green-700 border-green-200" },
                    { stat: "~75%", label: "Conceive within 6 months", color: "bg-green-100 text-green-800 border-green-200" },
                    { stat: "~90%", label: "Conceive within 12 months", color: "bg-green-600 text-white border-green-600" },
                  ].map((item, i) => (
                    <div key={i} className={`p-6 rounded-2xl text-center border ${item.color}`}>
                      <p className="text-3xl font-bold mb-2">{item.stat}</p>
                      <p className="text-sm font-medium opacity-90">{item.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-center text-gray-600 italic text-sm">
                  These figures apply to couples under 35 with no fertility issues. Age, health, and timing all play a role.
                </p>
              </section>

              {/* Limitations */}
              <section className="py-8 border-t border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  Limitations of This Ovulation Calculator
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  This fertility calculator provides helpful estimates — but it cannot confirm whether ovulation has actually occurred, or guarantee pregnancy. Actual ovulation can shift from cycle to cycle even in women with generally regular periods. Stress, illness, travel, or sudden changes in weight or exercise can all delay or advance ovulation.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This tool is not appropriate as a birth control method. If you are trying to avoid pregnancy, please use a proven contraceptive and speak with a healthcare provider about your options.
                </p>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 text-xs font-medium text-gray-600 not-prose">
                  {[
                    "Irregular cycles", "PCOS", "Thyroid conditions",
                    "Recent hormonal birth control", "Breastfeeding", "Perimenopause",
                    "High stress levels", "Significant weight changes", "Recent illness"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">
                      <CheckCircle2 className="w-3 h-3 text-orange-500 flex-shrink-0" /> {item}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  For any of the situations above, estimates from this ovulation date calculator may be less accurate. Combine with physical tracking and professional guidance when needed.
                </p>
              </section>

              {/* Disclaimer */}
              <section className="text-center py-10 border-t border-gray-100">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Use this calculator as a guide — not a guarantee.
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm">
                  This ovulation calculator is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Ovulation dates and fertile windows are estimates that can vary from cycle to cycle. Always consult a qualified healthcare provider for personalized fertility guidance.
                </p>
              </section>

            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>

            {/* Author Badge Section */}
            <AuthorSection />
          </div>
        </div>
      </main>

      {/* Author Schema */}
      <AuthorSchema />

      <Footer />
    </div>
  )
}
