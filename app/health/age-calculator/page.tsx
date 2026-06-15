import type { Metadata } from "next"
import Image from "next/image"
import { ClickableImage } from "@/components/ui/image-lightbox"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import AgeCalculator from "@/components/calculators/age-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"
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
  title: "Age Calculator & Online Age Converter: Exact Years, Months & Days",
  description:
    "Calculate the exact age of a person from their date of birth. Find your age in years, months, and days using this free online age converter.",
  keywords:
    "online age converter, age calculator, date of birth, date calculator, calculate my age, age in years months, years months and days",
  alternates: {
    canonical: "https://calqulate.net/health/age-calculator",
  },
  openGraph: {
    title: "Age Calculator & Online Age Converter: Exact Years, Months & Days",
    description: "Calculate the exact age of a person from their date of birth. Find your age in years, months, and days using this free online age converter.",
    url: "https://calqulate.net/health/age-calculator",
    siteName: "Calqulate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Age Calculator & Online Age Converter: Exact Years, Months & Days",
    description: "Calculate the exact age of a person from their date of birth. Find your age in years, months, and days using this free online age converter.",
  },
}

const faqs = [
  {
    question: "How accurate is an online age converter?",
    answer:
      "A well-built date calculator provides exact results when you enter the correct date of birth. It adjusts for leap years and different month lengths automatically.",
  },
  {
    question: "Does this calculator include leap years?",
    answer:
      "Yes. The system factors in leap years to ensure the total number of days remains precise.",
  },
  {
    question: "Can I calculate age by year only?",
    answer:
      "You can, but year-only estimates often cause mistakes on legal documents. We recommend entering the full date of birth for accurate verification.",
  },
  {
    question: "Is my personal data saved?",
    answer:
      "No. We do not store or share your information. All calculations happen directly on your device to protect your privacy.",
  },
]

export default function AgeCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Age Calculator and Online Age Converter"
        description="Instantly calculate your exact age in years, months, and days. Find your total days lived and age difference between dates."
        url="https://calqulate.net/health/age-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Age Calculator and Online Age Converter
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Find the exact age of a person using this simple date calculator. Enter the date of birth and the current date to see your age in years months and days.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                People use this tool to verify their age for official forms, school admissions, and job applications. It calculates the total number of days lived to give you a highly accurate result.
              </p>
            </div>

            <AgeCalculator />

            <section className="bg-white rounded-3xl p-8 border border-green-200 shadow-sm mt-8">
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-green-600" />
                Product Update: Personalized Tracking
              </h2>
              <p className="text-black mb-6">
                We updated our systems to help you track your calculations over time. You can monitor your changing health and age metrics securely.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-black">
                    <strong>No login required:</strong> You can start tracking your metrics immediately. You do not need to create an account or verify an email address.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-black">
                    <strong>Complete privacy:</strong> Your data remains local to your device. We do not track, store, or sell your personal information.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-black">
                    <strong>View history:</strong> Access previous dates you entered to review your past calculations and track milestones.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-black">
                    <strong>Compare results:</strong> Monitor your data year over year or month on month to identify important changes.
                  </span>
                </li>
              </ul>
            </section>

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-green-600" />
                  Calculate Age From Date of Birth
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Finding the exact age of a person requires more than basic subtraction. You must account for different calendar rules to get a precise answer. Just enter the date into the form above, and the calculator considers:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <ul className="space-y-2 text-gray-700 list-none pl-0">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> Your exact date of birth
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> The specific starting date or current date
                    </li>
                  </ul>
                  <ul className="space-y-2 text-gray-700 list-none pl-0">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> Extra days from leap years
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" /> Uneven month lengths
                    </li>
                  </ul>
                </div>
                <p className="mt-4 text-gray-700 font-medium bg-green-50 p-3 rounded-lg border-l-4 border-green-600">
                  When you click calculate, the script runs these variables immediately. You will not have to guess your exact age in years months and days again.
                </p>
              </section>
              
              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-green-800">
                      <Info className="w-5 h-5" />
                      How to Use This Date Calculator
                    </CardTitle>
                    <CardDescription className="text-green-700/80">
                      Follow these steps to find the exact number of days.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <div className="mb-8 flex justify-center">
                      <ClickableImage
                        src="/age-calculator.webp"
                        alt="Age calculator process showing date selection and calculate button click"
                        width={700}
                        height={400}
                        className="rounded-2xl shadow-lg border border-green-100"
                        priority
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">
                          1
                        </div>
                        <p className="text-gray-700">
                          Select your exact date of birth as the starting date.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">
                          2
                        </div>
                        <p className="text-gray-700">
                          Choose an end date. The tool defaults to today, but you can select a past or future date.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">
                          3
                        </div>
                        <p className="text-gray-700">
                          Press the calculate button to process the calendar math.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">
                          4
                        </div>
                        <p className="text-gray-700">
                          Review your total years, months and day breakdown below the form.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Understanding Your Output Format</h2>
                <p className="mb-4 text-gray-700">
                  Knowing your age involves more than a single number. This online age converter presents your life data in four distinct ways.
                </p>
                
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
                        <td className="px-6 py-4">Legal and official documents</td>
                      </tr>
                      <tr className="bg-green-50/30">
                        <td className="px-6 py-4 font-bold text-green-700">✅ Age in Months</td>
                        <td className="px-6 py-4">Months since your last birthday</td>
                        <td className="px-6 py-4">Infant milestones and growth tracking</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-green-700">✅ Age in Days</td>
                        <td className="px-6 py-4">Exact days in the current month</td>
                        <td className="px-6 py-4">Precise record keeping</td>
                      </tr>
                      <tr className="bg-green-50/30">
                        <td className="px-6 py-4 font-bold text-green-700">✅ Total Days Lived</td>
                        <td className="px-6 py-4">Cumulative days including leap years</td>
                        <td className="px-6 py-4">Personal milestones and statistics</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                
                <p className="mt-6 text-gray-700 font-semibold">This breakdown is particularly useful for:</p>
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

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-green-600" />
                  Common Reasons to Calculate My Age
                </h2>
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-green-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-green-800 mb-2">Documentation</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Government agencies require exact dates for passport applications, licenses, and medical paperwork.</p>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-green-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-green-800 mb-2">Eligibility</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Verify your eligibility for standardized exams, competitive sports, and insurance policies.</p>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-green-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-green-800 mb-2">Personal Tracking</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">Find out exactly how many days you have lived to celebrate unique life milestones.</p>
                  </div>
                </div>
              </section>

              <section className="bg-green-600 rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6" />
                  Why This Converter is Reliable
                </h2>
                <p className="mb-6 opacity-90">We designed this calculator to deliver fast, correct answers without confusing interfaces.</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>No misleading advertisements</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>All calculations run locally</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>Handles leap years automatically</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-200" />
                    <span>Calculates future or past dates</span>
                  </div>
                </div>
              </section>

              <section className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Scale className="text-green-600 w-5 h-5" /> Compare Dates
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    You can calculate the age difference between two people easily. Just enter the two birth dates separately to find the gap in years, months, and days. This function helps with academic placements and legal documentation.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Clock className="text-green-600 w-5 h-5" /> Calendar Math Explained
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Many age tools fail to explain why ages change during leap years. We calculate every month length precisely. We do not use average month lengths, which guarantees your final day count is completely accurate.
                  </p>
                </div>
              </section>

              <section className="border-2 border-dashed border-green-200 p-6 rounded-2xl bg-green-50/30">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-green-800 uppercase tracking-tight">
                  <Activity className="w-5 h-5" /> Gestational Age Note
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Medical professionals calculate gestational age differently. They base pregnancy timelines on the last menstrual period, not the conception date. You should always consult a doctor for pregnancy timelines. This tool handles general calendar ages, not medical diagnoses.
                </p>
              </section>

              <section className="text-center pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <UserCheck className="w-6 h-6 text-green-600" />
                  Who Built This Tool?
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  We built this tool after researching how often people receive incorrect information from basic calculators. Our team focuses on data accuracy and user privacy so you can get the answers you need without frustration.
                </p>
              </section>

              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Checking your health metrics?</h3>
                    <p className="text-gray-300 max-w-md">
                      Now that you have your precise calendar age, check how your lifestyle impacts your physical health.
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

            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>
            <AuthorSection />
          </div>
        </div>
      </main>

      <AuthorSchema />

      <Footer />
    </div>
  )
}