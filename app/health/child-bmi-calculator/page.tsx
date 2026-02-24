import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import ChildBmiCalculator from "@/components/calculators/child-bmi-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Activity, HeartPulse, Shield, Calculator as CalculatorIcon, ArrowRight, Baby, Info, Apple, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Child & Teen BMI Calculator: Find Your Child's Percentile Instantly",
  description: "Calculate your child's BMI (Body Mass Index) and BMI percentile using official CDC growth standards for ages 2 to 20. Get instant, easy-to-understand health insights.",
  keywords: "child bmi calculator, bmi calculator for kids, teen bmi calculator, bmi percentile calculator, cdc child bmi, calculate bmi for children, child growth chart calculator",
}

const faqs = [
  {
    question: "Why can't I use an adult BMI calculator for my child?",
    answer: "Children and teens are constantly growing, and their body fat changes significantly with age. Furthermore, boys and girls differ in their amount of body fat as they mature. Standard adult BMI categories do not apply to kids. A Child BMI Calculator compares their BMI against other children of the exact same age and gender to find their 'percentile'."
  },
  {
    question: "What does the BMI 'percentile' mean?",
    answer: "The percentile shows how your child's weight compares to other children of the same age and gender. For example, if your child is in the 75th percentile, it means their BMI is higher than 75% of kids their age. A healthy percentile is generally considered to be anywhere between the 5th and 85th percentiles."
  },
  {
    question: "What age range is this calculator for?",
    answer: "This calculator is designed to follow standard CDC and NHS guidelines for children and teenagers between the ages of 2 and 20 years old. For infants under 2, pediatricians use different infant growth charts based on length and weight."
  },
  {
    question: "What should I do if my child's BMI is in the overweight or obese category?",
    answer: "Don't panic. BMI is a screening tool, not a diagnosis. A high BMI can sometimes be due to a muscular build or a sudden growth spurt. We highly recommend consulting your child's pediatrician, who can look at their overall health, diet, and physical activity to determine if any lifestyle changes are necessary."
  },
  {
    question: "Why do I need to enter the exact age in months?",
    answer: "Children grow incredibly fast! A 5-year and 1-month-old can have drastically different healthy weight ranges than a 5-year and 11-month-old. Adding the exact months ensures our algorithm provides the most scientifically accurate CDC percentile calculation."
  }
]

export default function ChildBmiCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Child and Teen BMI Calculator"
        description="Check your child's BMI percentile instantly using industry-standard CDC data for ages 2 to 20."
        url="https://calqulate.net/health/child-bmi-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium mb-4">
                <Shield className="w-4 h-4" /> Based on Standard CDC Growth Guidelines
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Child & Teen BMI Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Discover your child's BMI percentile instantly. Designed for ages 2 to 20, our calculator uses age and gender-specific data to help you ensure your child is on track for a healthy future.
              </p>
            </div>

            {/* Interactive Calculator Component */}
            <ChildBmiCalculator />

            {/* Informative SEO Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none mt-16 space-y-12">
              
              <section>
                <h2 className="text-2xl font-semibold border-b pb-2 flex items-center gap-2">
                  <Info className="w-6 h-6 text-blue-500" />
                  Understanding Child BMI (BMI-for-Age)
                </h2>
                <p>
                  Unlike adults, calculating the Body Mass Index (BMI) for children and teenagers requires more than just height and weight. Because children's bodies change rapidly as they grow—and because boys and girls grow at different rates—a child's BMI must be compared against historical growth charts.
                </p>
                <p>
                  This is known as <strong>BMI-for-age</strong>. Instead of giving you a flat number, our calculator gives you a <strong>percentile</strong>, which is the industry standard used by pediatricians, the CDC, and the NHS to screen for potential weight and health-related issues.
                </p>
              </section>

              {/* Cross-linking Banner / Referral Feature */}
              <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-900 border-indigo-100 dark:border-indigo-800 shadow-md my-8 not-prose">
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">
                      Parents: What about your own health & shape?
                    </h3>
                    <p className="text-indigo-700 dark:text-indigo-300 text-sm md:text-base mb-4">
                      While you're checking on your child's growth, take a moment to understand your own body! Our advanced Body Shape Calculator analyzes your measurements to provide personalized style, fitness, and health insights.
                    </p>
                    <Link href="/health/body-shape-calculator" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2">
                      Try the Body Shape Calculator <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Percentile Categories */}
              <section>
                <Card className="not-prose border border-gray-200 shadow-sm rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-background dark:to-muted/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-red-500" />
                      BMI Percentile Weight Categories
                    </CardTitle>
                    <CardDescription>
                      How health organizations classify your child's BMI percentile:
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="border px-4 py-3 text-left font-semibold">Weight Category</th>
                            <th className="border px-4 py-3 text-left font-semibold">Percentile Range</th>
                            <th className="border px-4 py-3 text-left font-semibold">What it means</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-3 font-medium text-blue-600 dark:text-blue-400">Underweight</td>
                            <td className="border px-4 py-3">Less than the 5th percentile</td>
                            <td className="border px-4 py-3 text-muted-foreground">Child weighs less than 95% of children of the same age and sex.</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3 font-medium text-green-600 dark:text-green-500">Healthy Weight</td>
                            <td className="border px-4 py-3">5th to less than 85th percentile</td>
                            <td className="border px-4 py-3 text-muted-foreground">Child is within a healthy, standard growth range.</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3 font-medium text-yellow-600 dark:text-yellow-500">Overweight</td>
                            <td className="border px-4 py-3">85th to less than 95th percentile</td>
                            <td className="border px-4 py-3 text-muted-foreground">Child has a higher weight than 85% of their peers. May require lifestyle adjustments.</td>
                          </tr>
                          <tr>
                            <td className="border px-4 py-3 font-medium text-red-600 dark:text-red-500">Obese</td>
                            <td className="border px-4 py-3">Equal to or greater than 95th percentile</td>
                            <td className="border px-4 py-3 text-muted-foreground">Child is in the highest weight category. A doctor's guidance is recommended.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Why use our calculator */}
              <section>
                <Card className="not-prose border border-gray-200 shadow-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Activity className="w-6 h-6 text-primary" />
                      Why Use Our Child BMI Calculator?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground mb-6">
                      Unlike generic calculators, we have designed this tool to provide parents with <strong>industrial-standard accuracy</strong> alongside an easy-to-understand visual experience.
                    </p>
                    <ul className="grid md:grid-cols-2 gap-6">
                      <li className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary mt-0.5"><Baby className="w-4 h-4" /></div>
                        <div>
                          <strong className="block text-foreground text-base">Age & Sex Specific</strong>
                          <span className="text-sm text-muted-foreground">Incorporates exact months and gender to ensure you never get skewed adult results.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary mt-0.5"><TrendingUp className="w-4 h-4" /></div>
                        <div>
                          <strong className="block text-foreground text-base">Visual Percentile Gauge</strong>
                          <span className="text-sm text-muted-foreground">We plot your child's data on a visual bar so you instantly understand where they stand.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary mt-0.5"><CalculatorIcon className="w-4 h-4" /></div>
                        <div>
                          <strong className="block text-foreground text-base">Instant Unit Swapping</strong>
                          <span className="text-sm text-muted-foreground">Easily switch between Metric (cm/kg) and Imperial (ft/lbs) without losing your data.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary mt-0.5"><Shield className="w-4 h-4" /></div>
                        <div>
                          <strong className="block text-foreground text-base">Privacy First</strong>
                          <span className="text-sm text-muted-foreground">All calculations happen right in your browser. We never store your child's health data.</span>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Tips for Parents */}
              <section>
                <h2 className="mb-2 font-semibold flex items-center gap-2">
                  <Apple className="w-6 h-6 text-green-500" />
                  Tips for Parents: Promoting Healthy Habits
                </h2>
                <p className="mb-4">
                  Whether your child's BMI percentile falls into the 10th or the 90th percentile, establishing healthy habits early on is the best foundation for a lifetime of wellness. Here are a few industrial-standard tips recommended by pediatricians:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Focus on Family Health:</strong> Instead of singling out the child, make healthy eating and physical activity a family-wide goal.</li>
                  <li><strong>Eat the Rainbow:</strong> Encourage a variety of fruits and vegetables daily. Limit heavily processed snacks and sugary beverages.</li>
                  <li><strong>Get Moving:</strong> Children and teens should aim for at least 60 minutes of moderate to vigorous physical activity every day.</li>
                  <li><strong>Prioritize Sleep:</strong> Lack of sleep is strongly linked to weight gain. Establish consistent bedtimes.</li>
                  <li><strong>Consult the Pros:</strong> Never place a child on a restrictive diet without consulting a registered dietitian or a pediatrician.</li>
                </ul>
              </section>

            </div>

            {/* Structured FAQ UI */}
            <div className="mt-16 border-t pt-8">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <FAQSection faqs={faqs} />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}