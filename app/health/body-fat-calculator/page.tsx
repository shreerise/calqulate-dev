import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BodyFatCalculator from "@/components/calculators/body-fat-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Scale,
  Ruler,
  Heart,
  Activity,
  ShieldCheck,
  User,
  Users,
  Info,
  AlertTriangle,
  CheckCircle2,
  Target,
  TrendingDown,
  Dumbbell,
  ArrowRight,
  X,
  Check,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Body Fat Calculator: Calculate Body Fat % by Measurements | Free & Accurate",
  description:
    "Calculate body fat percentage accurately using the U.S. Navy Method. Our free body fat calculator uses your measurements (waist, neck, hip, height) to estimate body fat for men and women.",
  keywords:
    "body fat calculator, body fat percentage calculator, calculate body fat, body fat calculator by measurements, body fat calculator for women, body fat calculator for men, accurate body fat calculator, bmi to body fat calculator",
}

// Long-tail GSC queries converted to FAQs
const faqs = [
  {
    question: "How do I calculate body fat percentage accurately?",
    answer:
      "The most accurate home method is the U.S. Navy circumference formula. Measure your waist at the narrowest point, neck just below Adam's apple, and hip at the widest point (women only). Enter these measurements along with your height into the body fat calculator. For clinical accuracy, DEXA scans or hydrostatic weighing are gold standards but require professional facilities.",
  },
  {
    question: "Is a body fat calculator better than BMI?",
    answer:
      "Yes, for assessing health risks. BMI only measures weight vs height and cannot distinguish between muscle and fat. A muscular athlete may have a 'high' BMI but low body fat. Body fat percentage directly measures adipose tissue, which is what actually correlates with heart disease, diabetes, and metabolic health risks.",
  },
  {
    question: "What is the ideal body fat percentage for women?",
    answer:
      "For women, healthy body fat ranges from 21-31%. Athletes typically maintain 14-20%, while fitness-focused women aim for 21-24%. Essential fat (minimum for hormonal health) is 10-13%. Women naturally carry more body fat than men due to reproductive and hormonal needs. Going below essential fat can disrupt menstruation and bone health.",
  },
  {
    question: "What is the ideal body fat percentage for men?",
    answer:
      "For men, healthy body fat ranges from 14-24%. Athletes typically maintain 6-13%, while fitness-focused men aim for 14-17%. Essential fat (minimum for physiological function) is 2-5%. Body fat below 5% is difficult to maintain and can impair hormone production, immune function, and energy levels.",
  },
  {
    question: "Can I calculate body fat at home without equipment?",
    answer:
      "Yes. The U.S. Navy Method only requires a soft measuring tape. Measure your waist, neck, hip (women), and height. This method has been validated against hydrostatic weighing and provides reasonably accurate estimates for most people. Smart scales with bioelectrical impedance are convenient but less accurate than circumference methods.",
  },
  {
    question: "How accurate is the Navy body fat calculator?",
    answer:
      "The U.S. Navy formula is accurate within 3-4% of DEXA scan results for most individuals. It is more reliable than BMI-based estimates or consumer-grade smart scales. The key to accuracy is consistent measurement technique: measure at the same time of day, use the same landmarks, and don't compress the tape too tightly.",
  },
  {
    question: "What is the difference between fat loss and weight loss?",
    answer:
      "Weight loss includes muscle, water, and fat. Fat loss specifically targets adipose tissue while preserving muscle mass. You can lose weight but gain fat (muscle loss from crash dieting), or gain weight but lose fat (muscle gain from strength training). Body fat percentage tracks true fat loss; scale weight does not.",
  },
  {
    question: "Why does the body fat calculator need hip measurement for women only?",
    answer:
      "Women store fat differently than men due to estrogen. The female body naturally deposits fat around the hips and thighs (gynoid pattern), while men typically store fat around the abdomen (android pattern). The Navy formula accounts for this by including hip circumference in the female calculation to improve accuracy.",
  },
]

export default function BodyFatCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Body Fat Calculator"
        description="Calculate your body fat percentage using the U.S. Navy Method. Accurate body fat estimation for men and women based on body measurements."
        url="https://calqulate.net/health/body-fat-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Hero - Primary keyword "body fat calculator" in H1 */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium mb-3 sm:mb-4">
                <Ruler className="w-4 h-4" />
                U.S. Navy Method • Clinically Validated
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance mb-3 sm:mb-4">
                Body Fat Calculator
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground text-pretty px-2 sm:px-0">
                Calculate your body fat percentage accurately using proven circumference measurements. Our free body fat calculator uses the U.S. Navy Method to estimate body fat for men and women.
              </p>
              <p className="text-xs sm:text-base text-muted-foreground mt-2 sm:mt-3 px-2 sm:px-0">
                Body fat percentage tells you what BMI cannot: how much of your weight is actually fat vs muscle, bone, and water. Two people at the same weight can have vastly different health risks.
              </p>
            </div>

            {/* Calculator Component - Above the fold */}
            <BodyFatCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Why Body Fat % Matters - Addresses "bmi to body fat" queries */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-teal-600" />
                  Why Body Fat Percentage Matters More Than BMI
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  BMI (Body Mass Index) only measures weight relative to height. It cannot tell you where fat is stored, how much muscle you have, or your actual metabolic risk. A muscular athlete with low body fat may be classified as "overweight" by BMI, while someone with little muscle and high body fat might appear "normal."
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Body fat percentage directly reflects what matters for health:</strong>
                </p>
                
                <div className="grid md:grid-cols-4 gap-4 not-prose">
                  <div className="p-4 bg-red-50 rounded-xl text-center">
                    <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800 text-sm">Heart Health</p>
                    <p className="text-xs text-gray-600">Visceral fat correlates with cardiovascular risk</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl text-center">
                    <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800 text-sm">Diabetes Risk</p>
                    <p className="text-xs text-gray-600">Body fat affects insulin sensitivity</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl text-center">
                    <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800 text-sm">Hormonal Health</p>
                    <p className="text-xs text-gray-600">Fat tissue influences hormone production</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl text-center">
                    <Dumbbell className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold text-gray-800 text-sm">Performance</p>
                    <p className="text-xs text-gray-600">Body composition affects athletic output</p>
                  </div>
                </div>
                
                <p className="mt-6 text-gray-700 font-medium bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                  👉 This is why fitness professionals, doctors, and athletes rely on <strong>body fat percentage calculators</strong>, not BMI alone.
                </p>
              </section>

              {/* Navy Method Formula - Addresses "body fat calculator by measurements" queries */}
              <section>
                <Card className="border-teal-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-teal-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-teal-800">
                      <Ruler className="w-5 h-5" />
                      The U.S. Navy Method: How to Calculate Body Fat by Measurements
                    </CardTitle>
                    <CardDescription className="text-teal-700/80">
                      Proven circumference-based formulas validated against clinical methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {/* Formula for Men */}
                      <div className="p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="w-5 h-5 text-blue-600" />
                          <p className="font-bold text-blue-800">Body Fat Formula for Men</p>
                        </div>
                        <div className="text-sm font-mono bg-white p-3 rounded-lg border border-blue-200 text-blue-800">
                          BF% = 86.010 × log₁₀(waist − neck) − 70.041 × log₁₀(height) + 36.76
                        </div>
                      </div>
                      
                      {/* Formula for Women */}
                      <div className="p-4 bg-pink-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-5 h-5 text-pink-600" />
                          <p className="font-bold text-pink-800">Body Fat Formula for Women</p>
                        </div>
                        <div className="text-sm font-mono bg-white p-3 rounded-lg border border-pink-200 text-pink-800">
                          BF% = 163.205 × log₁₀(waist + hip − neck) − 97.684 × log₁₀(height) − 78.387
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-700">
                        <strong>📌 Important:</strong> All measurements must be in the same unit (cm or inches). The calculator above handles unit conversion automatically.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* How to Measure - Step by step for "calculate body fat at home" */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-teal-600" />
                  How to Calculate Body Fat Percentage at Home
                </h2>
                <p className="mb-4 text-gray-700">Follow these steps for accurate body fat measurement using circumference:</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-white border border-gray-200 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-3">What You Need:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" /> Soft measuring tape (not metal)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" /> Mirror for positioning
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" /> Normal breathing (don't suck in)
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <h4 className="font-bold text-amber-800 mb-3">Best Time to Measure:</h4>
                    <p className="text-sm text-amber-700">
                      Morning, before eating or drinking, after using the bathroom. Measure at the same time consistently for tracking progress.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 not-prose">
                  <div className="p-5 bg-white border-2 border-teal-200 rounded-2xl">
                    <div className="h-10 w-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold mb-3">1</div>
                    <h4 className="font-bold text-gray-800 mb-2">Measure Waist</h4>
                    <p className="text-sm text-gray-600">At the narrowest point (usually navel level), relaxed abdomen.</p>
                  </div>
                  <div className="p-5 bg-white border-2 border-teal-200 rounded-2xl">
                    <div className="h-10 w-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold mb-3">2</div>
                    <h4 className="font-bold text-gray-800 mb-2">Measure Neck</h4>
                    <p className="text-sm text-gray-600">Just below Adam's apple, tape level around.</p>
                  </div>
                  <div className="p-5 bg-white border-2 border-pink-200 rounded-2xl">
                    <div className="h-10 w-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold mb-3">3</div>
                    <h4 className="font-bold text-gray-800 mb-2">Measure Hip</h4>
                    <p className="text-sm text-gray-600">Widest part of buttocks. <span className="text-pink-600 font-semibold">(Women only)</span></p>
                  </div>
                  <div className="p-5 bg-white border-2 border-teal-200 rounded-2xl">
                    <div className="h-10 w-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold mb-3">4</div>
                    <h4 className="font-bold text-gray-800 mb-2">Measure Height</h4>
                    <p className="text-sm text-gray-600">Barefoot, standing straight against a wall.</p>
                  </div>
                </div>
              </section>

              {/* Body Fat Ranges - Gender specific sections for GSC queries */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-teal-600" />
                  Healthy Body Fat Percentage Ranges
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Men's Table - Addresses "body fat calculator for men" / "body fat calculator male" */}
                  <Card className="border-blue-200 overflow-hidden">
                    <CardHeader className="bg-blue-600 text-white pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <User className="w-5 h-5" />
                        Body Fat Ranges for Men
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[300px]">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="px-4 py-3 text-left font-bold text-blue-800 whitespace-nowrap">Category</th>
                            <th className="px-4 py-3 text-left font-bold text-blue-800 whitespace-nowrap">Body Fat %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr>
                            <td className="px-4 py-3 font-medium whitespace-nowrap">Essential Fat</td>
                            <td className="px-4 py-3 text-blue-700 font-semibold whitespace-nowrap">2–5%</td>
                          </tr>
                          <tr className="bg-green-50">
                            <td className="px-4 py-3 font-medium whitespace-nowrap">Athletes</td>
                            <td className="px-4 py-3 text-green-700 font-semibold whitespace-nowrap">6–13%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium whitespace-nowrap">Fitness</td>
                            <td className="px-4 py-3 text-green-700 font-semibold whitespace-nowrap">14–17%</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-4 py-3 font-medium whitespace-nowrap">Average</td>
                            <td className="px-4 py-3 text-gray-700 font-semibold whitespace-nowrap">18–24%</td>
                          </tr>
                          <tr className="bg-red-50">
                            <td className="px-4 py-3 font-medium whitespace-nowrap">Obese</td>
                            <td className="px-4 py-3 text-red-700 font-semibold whitespace-nowrap">25%+</td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Women's Table - Addresses "body fat calculator for women" / "body fat calculator female" */}
                  <Card className="border-pink-200 overflow-hidden">
                    <CardHeader className="bg-pink-600 text-white pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Users className="w-5 h-5" />
                        Body Fat Ranges for Women
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[300px]">
                        <thead className="bg-pink-50">
                          <tr>
                            <th className="px-4 py-3 text-left font-bold text-pink-800 whitespace-nowrap">Category</th>
                            <th className="px-4 py-3 text-left font-bold text-pink-800 whitespace-nowrap">Body Fat %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr>
                            <td className="px-4 py-3 font-medium whitespace-nowrap">Essential Fat</td>
                            <td className="px-4 py-3 text-pink-700 font-semibold whitespace-nowrap">10–13%</td>
                          </tr>
                          <tr className="bg-green-50">
                            <td className="px-4 py-3 font-medium whitespace-nowrap">Athletes</td>
                            <td className="px-4 py-3 text-green-700 font-semibold whitespace-nowrap">14–20%</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium whitespace-nowrap">Fitness</td>
                            <td className="px-4 py-3 text-green-700 font-semibold whitespace-nowrap">21–24%</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-4 py-3 font-medium whitespace-nowrap">Average</td>
                            <td className="px-4 py-3 text-gray-700 font-semibold whitespace-nowrap">25–31%</td>
                          </tr>
                          <tr className="bg-red-50">
                            <td className="px-4 py-3 font-medium whitespace-nowrap">Obese</td>
                            <td className="px-4 py-3 text-red-700 font-semibold whitespace-nowrap">32%+</td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
                  <p className="text-purple-800 text-sm">
                    <strong>⚠️ Why Women Have Higher Essential Fat:</strong> Women naturally carry 8-12% more body fat than men due to estrogen, reproductive needs, and hormonal health. Going below essential fat levels can disrupt menstruation, bone density, and fertility.
                  </p>
                </div>
              </section>

              {/* What's Ideal - Goal-based section */}
              <section className="py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-teal-600" />
                  What's the "Ideal" Body Fat Percentage?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  "Ideal" depends on your personal goal, not a universal standard. Here's how to think about your target:
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <div className="p-5 bg-green-50 border border-green-200 rounded-2xl text-center">
                    <Heart className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h4 className="font-bold text-green-800 mb-2">Health Goal</h4>
                    <p className="text-2xl font-bold text-green-700 mb-1">M: 10-20% | W: 18-28%</p>
                    <p className="text-sm text-green-600">Sustainable, reduces disease risk</p>
                  </div>
                  <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center">
                    <Dumbbell className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-bold text-blue-800 mb-2">Fitness Goal</h4>
                    <p className="text-2xl font-bold text-blue-700 mb-1">M: 12-15% | W: 20-24%</p>
                    <p className="text-sm text-blue-600">Visible definition, active lifestyle</p>
                  </div>
                  <div className="p-5 bg-orange-50 border border-orange-200 rounded-2xl text-center">
                    <Activity className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <h4 className="font-bold text-orange-800 mb-2">Athletic Goal</h4>
                    <p className="text-2xl font-bold text-orange-700 mb-1">M: 6-10% | W: 14-18%</p>
                    <p className="text-sm text-orange-600">Competition-level, hard to maintain</p>
                  </div>
                </div>
              </section>

              {/* Accuracy Comparison - Addresses "accurate body fat calculator" */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-teal-600" />
                  Body Fat Measurement Accuracy: Which Method is Best?
                </h2>
                
                <Card className="not-prose overflow-hidden border-gray-200">
                  <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold text-gray-800 whitespace-nowrap">Method</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-800 whitespace-nowrap">Accuracy</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-800 whitespace-nowrap">Accessibility</th>
                        <th className="px-6 py-4 text-left font-bold text-gray-800 whitespace-nowrap">Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="bg-green-50">
                        <td className="px-6 py-4 font-bold text-green-700 whitespace-nowrap">DEXA Scan</td>
                        <td className="px-6 py-4 whitespace-nowrap">⭐⭐⭐⭐⭐ Gold Standard</td>
                        <td className="px-6 py-4 whitespace-nowrap">Medical facility only</td>
                        <td className="px-6 py-4 whitespace-nowrap">$75-150</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-blue-700 whitespace-nowrap">Bod Pod</td>
                        <td className="px-6 py-4 whitespace-nowrap">⭐⭐⭐⭐ Very High</td>
                        <td className="px-6 py-4 whitespace-nowrap">University/research labs</td>
                        <td className="px-6 py-4 whitespace-nowrap">$40-75</td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td className="px-6 py-4 font-bold text-orange-700 whitespace-nowrap">Navy Formula (This Calculator)</td>
                        <td className="px-6 py-4 whitespace-nowrap">⭐⭐⭐ Good (±3-4%)</td>
                        <td className="px-6 py-4 whitespace-nowrap">Free, at home</td>
                        <td className="px-6 py-4 whitespace-nowrap">$0</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-gray-700 whitespace-nowrap">Smart Scales (BIA)</td>
                        <td className="px-6 py-4 whitespace-nowrap">⭐⭐ Variable</td>
                        <td className="px-6 py-4 whitespace-nowrap">Home use</td>
                        <td className="px-6 py-4 whitespace-nowrap">$30-200</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-bold text-gray-500 whitespace-nowrap">BMI</td>
                        <td className="px-6 py-4 whitespace-nowrap">⭐ Poor (not body fat)</td>
                        <td className="px-6 py-4 whitespace-nowrap">Free</td>
                        <td className="px-6 py-4 whitespace-nowrap">$0</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </Card>

                <p className="mt-4 text-gray-700 font-medium bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                  <strong>💡 Key Insight:</strong> Consistency matters more than perfection. Track changes over time using the same method. A 2% drop measured by the Navy formula is meaningful even if the absolute number isn't lab-perfect.
                </p>
              </section>

              {/* Common Mistakes - Practical user value */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-teal-600" />
                  Common Measurement Mistakes to Avoid
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-bold text-red-700 flex items-center gap-2">
                      <X className="w-5 h-5" /> Don't Do This:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2 bg-red-50 p-3 rounded-lg">
                        <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        Measuring after meals (bloating skews waist)
                      </li>
                      <li className="flex items-start gap-2 bg-red-50 p-3 rounded-lg">
                        <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        Holding breath or sucking in stomach
                      </li>
                      <li className="flex items-start gap-2 bg-red-50 p-3 rounded-lg">
                        <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        Pulling the tape too tight
                      </li>
                      <li className="flex items-start gap-2 bg-red-50 p-3 rounded-lg">
                        <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        Measuring at the wrong waist position
                      </li>
                      <li className="flex items-start gap-2 bg-red-50 p-3 rounded-lg">
                        <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        Mixing cm and inches in calculations
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-green-700 flex items-center gap-2">
                      <Check className="w-5 h-5" /> Do This Instead:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2 bg-green-50 p-3 rounded-lg">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        Measure in the morning, before eating
                      </li>
                      <li className="flex items-start gap-2 bg-green-50 p-3 rounded-lg">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        Breathe normally, relaxed posture
                      </li>
                      <li className="flex items-start gap-2 bg-green-50 p-3 rounded-lg">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        Tape snug but not compressing skin
                      </li>
                      <li className="flex items-start gap-2 bg-green-50 p-3 rounded-lg">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        Use navel level for waist consistently
                      </li>
                      <li className="flex items-start gap-2 bg-green-50 p-3 rounded-lg">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        Stick to one unit system throughout
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Fat Loss vs Weight Loss - Critical differentiation */}
              <section className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <TrendingDown className="w-6 h-6 text-teal-600" />
                  Fat Loss vs Weight Loss: The Critical Difference
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  A critical insight many people miss: <strong>You can lose weight but gain fat</strong>, or <strong>gain weight but lose fat</strong>. Scale weight is a blunt instrument; body fat percentage is the precision tool for health.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <div className="p-5 bg-white border-2 border-red-200 rounded-2xl">
                    <h4 className="font-bold text-red-700 mb-3 text-lg">Weight Loss</h4>
                    <p className="text-gray-600 mb-3">Includes muscle, water, AND fat.</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Crash diets often cause muscle loss</li>
                      <li>• Water fluctuations mask true progress</li>
                      <li>• Can leave you "skinny fat"</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-white border-2 border-green-200 rounded-2xl">
                    <h4 className="font-bold text-green-700 mb-3 text-lg">Fat Loss</h4>
                    <p className="text-gray-600 mb-3">Targets only excess body fat storage.</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Preserves or builds muscle mass</li>
                      <li>• Improves body composition</li>
                      <li>• Sustainable, healthy approach</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-6 text-gray-700 font-semibold text-center">
                  👉 Focus on body composition, not just the number on the scale.
                </p>
              </section>

              {/* Trust Section */}
              <section className="bg-white rounded-3xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-teal-600" />
                  Why Trust This Body Fat Calculator?
                </h2>
                <p className="mb-6 text-gray-700">We designed this calculator with accuracy and user trust as priorities:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-800">Uses the clinically validated U.S. Navy Method</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-800">Separate formulas for men and women</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-800">No data stored or tracked — complete privacy</span>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    <span className="text-gray-800">Clear explanations of what results mean</span>
                  </div>
                </div>
              </section>

              {/* Disclaimer */}
              <section className="border-2 border-dashed border-teal-200 p-6 rounded-2xl bg-gray-50">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-gray-800 uppercase tracking-tight">
                  <Info className="w-5 h-5 text-teal-600" /> Health Disclaimer
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This body fat calculator provides estimates for educational purposes only. Results should not replace professional medical assessment. For clinical body composition analysis, consult a healthcare provider or certified fitness professional. If you have concerns about your body fat levels, eating habits, or body image, speak with a qualified professional.
                </p>
              </section>

              {/* CTA Section */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-white border-2 border-teal-200 rounded-3xl shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800">Complete Your Health Assessment</h3>
                    <p className="text-gray-600 max-w-md">
                      Now that you know your body fat percentage, check your overall fitness metrics with our BMI Calculator.
                    </p>
                  </div>
                  <Button asChild size="lg" className="whitespace-nowrap bg-teal-600 hover:bg-teal-700">
                    <Link href="/health/bmi-calculator">
                      Calculate BMI <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

            </div>

            {/* FAQ Section - Long-tail keyword capture */}
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
