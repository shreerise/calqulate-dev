import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import AgeCalculator from "@/components/calculators/age-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  Info, 
  FileText, 
  Scale, 
  Activity,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Age Calculator: Calculate Age from Date of Birth | Fast & Free",
  description:
    "Use our free age calculator to accurately find your age in years, months, days, and total days lived. Perfect for official forms, job applications, and personal use.",
  keywords:
    "age calculator, calculate age from date of birth, age calculator online, calculate my age, age difference calculator, date of birth age, age in days calculator",
}

const faqs = [
  {
    question: "How accurate is an online age calculator?",
    answer:
      "A well-built age calculator is 100% accurate when the correct date of birth is entered and leap years are included.",
  },
  {
    question: "Does this calculator include leap years?",
    answer:
      "Yes. Leap years are automatically considered to ensure precise results.",
  },
  {
    question: "Can I calculate age by year only?",
    answer:
      "Yes, but year-only calculations are approximate. For official use, always calculate by full date of birth.",
  },
  {
    question: "Is my data saved?",
    answer:
      "No. We do not store, track, or share any personal information. Your privacy and clarity come first.",
  },
]

export default function AgeCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Age Calculator"
        description="Instantly calculate your exact age in years, months, and days. Find your total days lived and age difference between dates."
        url="https://calqulate.net/health/age-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Age Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Use our age calculator online to accurately calculate your age from your date of birth. Instantly find your age in years, months, days, and even total days lived — fast, simple, and 100% free.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Whether you’re checking your age for official forms, school admissions, job applications, medical needs, or personal curiosity, this tool gives you clear and reliable results.
              </p>
            </div>

            {/* Calculator Component */}
            <AgeCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Calculate Age From DOB */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-green-600" />
                  Calculate Age From Date of Birth (Accurate & Transparent)
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Our calculator helps you calculate age from date of birth by considering:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <ul className="space-y-2 text-gray-700 list-none pl-0">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> Exact birth date
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> Current date
                    </li>
                  </ul>
                  <ul className="space-y-2 text-gray-700 list-none pl-0">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> Leap years
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> Month lengths (28–31 days)
                    </li>
                  </ul>
                </div>
                <p className="mt-4 text-gray-700 font-medium bg-green-50 p-3 rounded-lg border-l-4 border-green-600">
                  This ensures your age is calculated correctly — not approximately. 👉 Just enter your date of birth, and the calculator does the rest.
                </p>
              </section>
              
              {/* How it works Card */}
                    <section>
                      <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                        <CardHeader className="bg-green-50 pb-4">
                          <CardTitle className="flex items-center gap-2 text-xl font-bold text-green-800">
                            <Info className="w-5 h-5" />
                            How Does This Age Calculator Work?
                          </CardTitle>
                          <CardDescription className="text-green-700/80">
                            Unlike many tools that only show a number, we believe in full transparency.
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-6">
                          
                          {/* Image */}
                          <div className="mb-8 flex justify-center">
                            <Image
                              src="/age-calculator.png"
                              alt="Age calculator working process showing date comparison, year counting, month and day calculation with leap year adjustment"
                              width={700}
                              height={400}
                              className="rounded-2xl shadow-lg border border-green-100"
                              priority
                            />
                          </div>

                          <p className="text-gray-700 mb-4 font-semibold uppercase tracking-wider text-sm">
                            Here’s how age calculation actually works:
                          </p>

                          <div className="space-y-4">
                            <div className="flex gap-4">
                              <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">
                                1
                              </div>
                              <p className="text-gray-700">
                                Your birth date is compared with today’s date.
                              </p>
                            </div>

                            <div className="flex gap-4">
                              <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">
                                2
                              </div>
                              <p className="text-gray-700">
                                Completed years are counted first.
                              </p>
                            </div>

                            <div className="flex gap-4">
                              <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">
                                3
                              </div>
                              <p className="text-gray-700">
                                Remaining months and days are calculated precisely.
                              </p>
                            </div>

                            <div className="flex gap-4">
                              <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">
                                4
                              </div>
                              <p className="text-gray-700">
                                Leap years (366 days) are included automatically to ensure 100% accuracy.
                              </p>
                            </div>
                          </div>

                          <p className="mt-6 text-sm italic text-gray-500 border-t pt-4">
                            This method matches official age calculation standards used in education, government, and healthcare.
                          </p>

                        </CardContent>
                      </Card>
                    </section>

              {/* Result Chart */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Age Calculator by Year, Month & Day</h2>
                <p className="mb-4 text-gray-700">Our age calculator by year doesn’t stop at just years. You’ll get:</p>
                
                <Card className="not-prose overflow-hidden border-green-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Output Metric</th>
                        <th className="px-6 py-4 text-left font-bold">What it Represents</th>
                        <th className="px-6 py-4 text-left font-bold">Primary Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-bold text-green-700">✅ Age in Years</td>
                        <td className="px-6 py-4">Total completed solar cycles</td>
                        <td className="px-6 py-4">Legal/Official documents</td>
                      </tr>
                      <tr className="bg-green-50/30">
                        <td className="px-6 py-4 font-bold text-green-700">✅ Age in Months</td>
                        <td className="px-6 py-4">Months since last birthday</td>
                        <td className="px-6 py-4">Infant milestones & Growth</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-green-700">✅ Age in Days</td>
                        <td className="px-6 py-4">Exact days in the current month</td>
                        <td className="px-6 py-4">Precise record keeping</td>
                      </tr>
                      <tr className="bg-green-50/30">
                        <td className="px-6 py-4 font-bold text-green-700">✅ Total Days Lived</td>
                        <td className="px-6 py-4">Cumulative days including leap years</td>
                        <td className="px-6 py-4">Milestones & Statistics</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                
                <p className="mt-6 text-gray-700 font-semibold">This is especially useful for:</p>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 list-none pl-0 mt-4">
                  <li className="bg-white border border-green-200 p-3 rounded-xl text-center text-sm font-medium text-gray-700">Legal verification</li>
                  <li className="bg-white border border-green-200 p-3 rounded-xl text-center text-sm font-medium text-gray-700">Academic eligibility</li>
                  <li className="bg-white border border-green-200 p-3 rounded-xl text-center text-sm font-medium">
                    <Link
                      href="/health/diabetes-risk-calculator"
                      className="text-gray-700 hover:text-green-700 hover:underline transition-colors"
                    > 
                      Medical tracking
                    </Link>
                  </li>
                  <li className="bg-white border border-green-200 p-3 rounded-xl text-center text-sm font-medium text-gray-700">HR records</li>
                </ul>
              </section>

              {/* Use Cases Grid */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-green-600" />
                  Calculate My Age – Common Use Cases
                </h2>
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-green-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-green-800 mb-2">Documentation</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Filling government or school forms and medical documentation.</p>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-green-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-green-800 mb-2">Eligibility</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Checking eligibility for exams, jobs, or insurance applications.</p>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-green-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-green-800 mb-2">Personal</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Birthday reminders and tracking significant personal milestones.</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 italic">If you’ve ever searched “calculate my age”, this tool is built exactly for you.</p>
              </section>

              {/* Reliability Section */}
              <section className="bg-green-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6" />
                  Why Our Age Calculator Is More Reliable
                </h2>
                <p className="mb-6 opacity-90">We designed this calculator with accuracy and trust in mind. What makes it better:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>No ads or misleading popups</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>No data stored or tracked</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>Handles leap years correctly</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>Clear explanations, not black-box results</span>
                  </div>
                </div>
              </section>

              {/* Age Difference & Date Logic */}
              <section className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Scale className="text-green-600 w-5 h-5" /> Age Difference Calculator
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Need to calculate the age difference between two people? Our age difference calculator helps you compare ages in years, months, and days. This is useful for legal, academic, and personal comparisons.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Clock className="text-green-600 w-5 h-5" /> Date Calculator Age
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Most date calculator age tools fail to explain why ages change during leap years, why two people born the same year can have different ages, or how month-length affects calculations. We don’t hide the math — we explain it.
                  </p>
                </div>
              </section>

              {/* Medical Note */}
              <section className="border-2 border-dashed border-green-200 p-6 rounded-2xl bg-green-50/30">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-green-800 uppercase tracking-tight">
                  <Activity className="w-5 h-5" /> Gestational Age Calculator – Medical Note
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  If you’re looking for a gestational age calculator, note: Gestational age is calculated differently. It’s based on the last menstrual period (LMP). Medical calculators should always be used with professional advice. Our general age calculator is not a medical substitute, and we clearly state that — transparency matters.
                </p>
              </section>

              {/* Who built this */}
              <section className="text-center pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <UserCheck className="w-6 h-6 text-green-600" />
                  Who Built This Age Calculator?
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  This tool was created by professionals with years of experience in digital tools, data accuracy, and user-first design. Our goal is simple: Build tools that are clear, accurate, and genuinely helpful.
                </p>
              </section>

              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Checking your health metrics?</h3>
                    <p className="text-gray-300 max-w-md">
                      Now that you know your exact age, see how your heart age measurements compare. 
                      Try our Heart Age Calculator next.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/heart-age-calculator">
                      Check Heart Age <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

            </div>

            {/* Structured FAQ UI */}
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