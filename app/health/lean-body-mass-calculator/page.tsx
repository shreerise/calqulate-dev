import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import LeanBodyMassCalculator from "@/components/calculators/lean-body-mass-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Calculator,
  Dumbbell,
  Heart,
  Info,
  Scale,
  Activity,
  CheckCircle2,
  ArrowRight,
  Target,
  TrendingUp,
  AlertTriangle,
  Zap,
  Users,
  BookOpen,
  FlaskConical,
  ShieldCheck,
  Ruler,
  Percent,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Lean Body Mass Calculator: Boer, James & Hume Formulas | Free LBM Calculator",
  description:
    "Calculate your lean body mass (LBM) using Boer, James, and Hume formulas. Free LBM calculator shows muscle, bone, and organ mass. Find your lean body weight instantly.",
  keywords:
    "lean body mass calculator, lbm calculator, lean body mass, calculate lean body mass, lean body weight calculator, lean mass calculator, boer james hume formula, how to calculate lean body mass, lean body mass formula, what is my lean body mass",
}

const faqs = [
  {
    question: "What is a normal Lean Body Mass?",
    answer:
      "Normal LBM ranges from 60-90% of total body weight. Men typically have 75-85% LBM, women have 65-75% LBM. Athletes may reach 80-90% LBM due to higher muscle mass and lower body fat.",
  },
  {
    question: "Is Lean Body Mass the same as Fat Free Mass?",
    answer:
      "They are nearly identical but not exactly the same. Fat Free Mass (FFM) excludes all fat, while Lean Body Mass includes essential fat (about 2-3% in men, 10-12% in women). For practical purposes, the difference is minimal.",
  },
  {
    question: "Which LBM formula is most accurate: Boer, James, or Hume?",
    answer:
      "The Boer formula is generally considered most accurate for average adults. James formula works better for athletes and muscular individuals. Hume formula is preferred for clinical settings. We show all three so you can see the range.",
  },
  {
    question: "Can you calculate LBM without knowing your body fat %?",
    answer:
      "Yes. The Boer, James, and Hume formulas estimate LBM using only your weight, height, and sex. These prediction equations give reliable estimates without requiring body fat measurement.",
  },
  {
    question: "What's the difference between LBM and BMI?",
    answer:
      "BMI divides weight by height squared and cannot distinguish muscle from fat. LBM specifically measures non-fat mass. A muscular person may have high BMI but excellent LBM, showing why LBM is more useful for fitness assessment.",
  },
  {
    question: "How can I increase my Lean Body Mass?",
    answer:
      "Increase LBM through resistance training 3-5 times weekly, consuming 1.6-2.2g protein per kg bodyweight, maintaining a slight calorie surplus, and getting 7-9 hours of sleep. Progressive overload in training is essential for muscle growth.",
  },
  {
    question: "Is LBM more important than total weight?",
    answer:
      "For health and fitness, yes. LBM indicates metabolically active tissue. Higher LBM means higher basal metabolic rate, better insulin sensitivity, and stronger bones. Total weight alone cannot show if you are gaining muscle or fat.",
  },
  {
    question: "How often should I measure my Lean Body Mass?",
    answer:
      "Track LBM every 4-6 weeks during a fitness program. Muscle growth is slow (0.5-1kg per month for beginners). More frequent measurements create noise and false expectations. Consistent timing and conditions improve accuracy.",
  },
]

export default function LeanBodyMassCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Lean Body Mass Calculator"
        description="Calculate lean body mass using Boer, James, and Hume formulas. Free LBM calculator estimates muscle, bone, and organ mass from weight and height."
        url="https://calqulate.net/health/lean-body-mass-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section - Primary Keywords */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Lean Body Mass Calculator: Boer, James & Hume Formulas
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Calculate your lean body mass (LBM) using three scientific formulas. Our free LBM calculator estimates your muscle, bone, and organ mass to give you deeper insights into your body composition.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Whether you want to track fitness progress, optimize nutrition, or understand your metabolic health, this lean body weight calculator gives you accurate, transparent results.
              </p>
            </div>

            {/* Calculator Component */}
            <LeanBodyMassCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">

              {/* What is LBM - Core Definition */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-green-600" />
                  What is Lean Body Mass (LBM)?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Lean Body Mass is your total body weight minus all fat mass. LBM includes everything that is not fat: muscles, bones, organs, skin, blood, and water. It represents your metabolically active tissue.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Unlike BMI, which can misclassify muscular individuals as overweight, lean body mass provides a clearer picture of your health. Tracking LBM helps athletes monitor muscle gain and helps dieters ensure they lose fat, not muscle.
                </p>
                
                {/* Visual Comparison Card */}
                <Card className="not-prose border-green-200 mt-6">
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                        <h4 className="font-bold text-red-800 mb-2">BMI Limitations</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Cannot distinguish muscle from fat</li>
                          <li>• Misclassifies muscular people</li>
                          <li>• No metabolic insight</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                        <h4 className="font-bold text-green-800 mb-2">LBM Advantages</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Measures actual muscle mass</li>
                          <li>• Tracks real fitness progress</li>
                          <li>• Indicates metabolic health</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <p className="mt-4 text-gray-700">
                  To understand your fat distribution specifically, check your <Link href="/health/body-fat-calculator" className="text-green-600 hover:underline font-medium">Body fat calculator</Link> using our dedicated calculator.
                </p>
              </section>

              {/* Healthy LBM Percentage Table - High Value Data */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Percent className="w-6 h-6 text-green-600" />
                  What's a Healthy Lean Body Mass Percentage?
                </h2>
                <p className="mb-4 text-gray-700">
                  Your lean body mass percentage depends on age, sex, and activity level. Here is a complete breakdown of healthy LBM ranges:
                </p>
                
                <Card className="not-prose overflow-hidden border-green-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Group</th>
                        <th className="px-6 py-4 text-left font-bold">Average LBM (% of Body Weight)</th>
                        <th className="px-6 py-4 text-left font-bold">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-bold text-green-700">Men 20-39 years</td>
                        <td className="px-6 py-4">75-85%</td>
                        <td className="px-6 py-4">Peak muscle mass years</td>
                      </tr>
                      <tr className="bg-green-50/30">
                        <td className="px-6 py-4 font-bold text-green-700">Women 20-39 years</td>
                        <td className="px-6 py-4">65-75%</td>
                        <td className="px-6 py-4">Higher essential fat needs</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-green-700">Men 40-59 years</td>
                        <td className="px-6 py-4">70-80%</td>
                        <td className="px-6 py-4">Natural decline begins</td>
                      </tr>
                      <tr className="bg-green-50/30">
                        <td className="px-6 py-4 font-bold text-green-700">Women 40-59 years</td>
                        <td className="px-6 py-4">60-70%</td>
                        <td className="px-6 py-4">Hormonal changes affect composition</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-green-700">Adults 60+ years</td>
                        <td className="px-6 py-4">-1% per year</td>
                        <td className="px-6 py-4">Without resistance training</td>
                      </tr>
                      <tr className="bg-green-50/30">
                        <td className="px-6 py-4 font-bold text-green-700">Athletes (any age)</td>
                        <td className="px-6 py-4">80-90%</td>
                        <td className="px-6 py-4">Elite body composition</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </section>

              {/* Factors Affecting LBM */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-green-600" />
                  Factors That Affect Your Lean Body Mass
                </h2>
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-green-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" /> Sex
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Men typically have 10-15% higher LBM than women due to testosterone levels and lower essential fat requirements.
                    </p>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-green-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Age
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      After age 30, LBM declines 3-8% per decade without resistance training. This accelerates after 60.
                    </p>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-green-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      <Dumbbell className="w-4 h-4" /> Activity Level
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Resistance training increases LBM. Athletes maintain 80-90% LBM while sedentary adults drop to 60-70%.
                    </p>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-green-300 transition-colors shadow-sm">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Genetics
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Muscle fiber composition, hormone levels, and metabolic rate are partially inherited and affect LBM potential.
                    </p>
                  </div>
                </div>
              </section>

              {/* How to Calculate LBM - Formula Section */}
              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-green-800">
                      <FlaskConical className="w-5 h-5" />
                      How to Calculate Lean Body Mass: Boer, James & Hume Formulas
                    </CardTitle>
                    <CardDescription className="text-green-700/80">
                      Three validated scientific formulas for estimating LBM from weight and height
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    
                    {/* Boer Formula */}
                    <div className="p-4 bg-white border border-green-100 rounded-xl">
                      <h4 className="font-bold text-green-800 mb-3">Boer Formula (Most Common)</h4>
                      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mb-3">
                        <p><strong>Men:</strong> LBM = 0.407 × Weight(kg) + 0.267 × Height(cm) - 19.2</p>
                        <p className="mt-1"><strong>Women:</strong> LBM = 0.252 × Weight(kg) + 0.473 × Height(cm) - 48.3</p>
                      </div>
                      <p className="text-sm text-gray-600">Best for: Average adults with typical body composition</p>
                    </div>

                    {/* Hume Formula */}
                    <div className="p-4 bg-white border border-green-100 rounded-xl">
                      <h4 className="font-bold text-green-800 mb-3">Hume Formula (Clinical Standard)</h4>
                      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mb-3">
                        <p><strong>Men:</strong> LBM = 0.32810 × Weight(kg) + 0.33929 × Height(cm) - 29.5336</p>
                        <p className="mt-1"><strong>Women:</strong> LBM = 0.29569 × Weight(kg) + 0.41813 × Height(cm) - 43.2933</p>
                      </div>
                      <p className="text-sm text-gray-600">Best for: Medical and clinical applications, drug dosing calculations</p>
                    </div>

                    {/* James Formula */}
                    <div className="p-4 bg-white border border-green-100 rounded-xl">
                      <h4 className="font-bold text-green-800 mb-3">James Formula (For Athletes)</h4>
                      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm mb-3">
                        <p><strong>Men:</strong> LBM = 1.1 × Weight(kg) - 128 × (Weight/Height)²</p>
                        <p className="mt-1"><strong>Women:</strong> LBM = 1.07 × Weight(kg) - 148 × (Weight/Height)²</p>
                      </div>
                      <p className="text-sm text-gray-600">Best for: Muscular individuals and athletes with higher lean mass</p>
                    </div>

                    <p className="text-sm italic text-gray-500 border-t pt-4">
                      We display all three formulas because each was validated on different populations. The range gives you realistic expectations rather than false precision.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Direct Body Fat Method */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-green-600" />
                  Calculate LBM from Body Fat Percentage
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  If you know your body fat percentage from a DEXA scan, calipers, or bioimpedance device, you can calculate LBM directly:
                </p>
                <Card className="not-prose border-green-200">
                  <CardContent className="pt-6">
                    <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-600">
                      <p className="font-mono text-lg font-bold text-green-800">
                        Lean Body Mass = Weight × (1 - Body Fat %)
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Example: 80kg person with 20% body fat → LBM = 80 × (1 - 0.20) = 64kg
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <p className="mt-4 text-gray-700">
                  This method is more accurate if you have reliable body fat data. Our calculator supports both approaches.
                </p>
              </section>

              {/* How to Use - Step by Step */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  How to Use This LBM Calculator
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">1</div>
                    <div>
                      <p className="font-bold text-gray-800">Select Your Sex and Unit System</p>
                      <p className="text-gray-600 text-sm">Choose Male or Female. Pick Metric (kg, cm) or Imperial (lbs, ft/in).</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">2</div>
                    <div>
                      <p className="font-bold text-gray-800">Enter Your Weight and Height</p>
                      <p className="text-gray-600 text-sm">Input your current body weight and height. Use realistic, positive numbers.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">3</div>
                    <div>
                      <p className="font-bold text-gray-800">Optional: Enter Body Fat Percentage</p>
                      <p className="text-gray-600 text-sm">If you know your body fat %, add it for a direct LBM calculation method.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 font-bold">4</div>
                    <div>
                      <p className="font-bold text-gray-800">Click Calculate LBM</p>
                      <p className="text-gray-600 text-sm">See your LBM from all three formulas plus your LBM percentage.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Why LBM Matters - Key Benefits */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-green-600" />
                  Why Lean Body Mass Matters for Your Health
                </h2>
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <div className="p-5 border border-green-200 rounded-2xl bg-gradient-to-br from-green-50 to-white shadow-sm">
                    <Dumbbell className="w-8 h-8 text-green-600 mb-3" />
                    <h4 className="font-bold text-green-800 mb-2">Fitness & Performance</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      LBM is the best metric for tracking muscle gain. It separates true muscle growth from fat accumulation for better training decisions.
                    </p>
                  </div>
                  <div className="p-5 border border-green-200 rounded-2xl bg-gradient-to-br from-green-50 to-white shadow-sm">
                    <Zap className="w-8 h-8 text-green-600 mb-3" />
                    <h4 className="font-bold text-green-800 mb-2">Metabolic Health</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Your LBM drives your Basal Metabolic Rate (BMR). More lean mass means you burn more calories at rest, crucial for weight management.
                    </p>
                  </div>
                  <div className="p-5 border border-green-200 rounded-2xl bg-gradient-to-br from-green-50 to-white shadow-sm">
                    <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                    <h4 className="font-bold text-green-800 mb-2">Healthy Aging</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Maintaining LBM prevents sarcopenia (age-related muscle loss), preserving mobility, strength, and quality of life as you age.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5 Expert Insights - UNIQUE VALUE */}
              <section className="bg-white rounded-3xl p-8 text-black/90 border border-green-100 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-black/90 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  5 LBM Insights Most People Don't Know
                </h2>
                <p className="mb-6 opacity-90">Even experienced fitness professionals often miss these critical facts about lean body mass:</p>
                
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <h4 className="font-bold text-black/90 mb-1">1. LBM Includes Water Weight (40-60% of it)</h4>
                    <p className="text-sm opacity-90">
                      Lean body mass is not just muscle. Water makes up 40-60% of LBM. Dehydration can drop your LBM reading by 2-4kg overnight without any actual muscle loss. Always measure LBM at consistent hydration levels.
                    </p>
                  </div>
                  
                  <div className="bg-white/10 p-4 rounded-xl">
                    <h4 className="font-bold text-black/90 mb-1">2. Prediction Formulas Can Be Off by 5-10% in Extreme Cases</h4>
                    <p className="text-sm opacity-90">
                      Boer, Hume, and James formulas were validated on average populations. If you are very tall, very short, obese, or highly muscular, these formulas may underestimate or overestimate your LBM by 5-10%. DEXA scans are more accurate for edge cases.
                    </p>
                  </div>
                  
                  <div className="bg-white/10 p-4 rounded-xl">
                    <h4 className="font-bold text-black/90 mb-1">3. You Can Gain LBM While Losing Weight</h4>
                    <p className="text-sm opacity-90">
                      Body recomposition is real. Beginners and people returning to training can simultaneously lose fat and gain muscle, increasing LBM percentage while total weight drops. This is why tracking LBM matters more than scale weight.
                    </p>
                  </div>
                  
                  <div className="bg-white/10 p-4 rounded-xl">
                    <h4 className="font-bold text-black/90 mb-1">4. LBM Affects Drug Dosing in Medicine</h4>
                    <p className="text-sm opacity-90">
                      Many medications (especially anesthetics, chemotherapy drugs, and antibiotics) are dosed based on LBM, not total body weight. Obese patients dosed by total weight may receive toxic doses. This is why the Hume formula is used clinically.
                    </p>
                  </div>
                  
                  <div className="bg-white/10 p-4 rounded-xl">
                    <h4 className="font-bold text-black/90 mb-1">5. Muscle Loss Starts at 30 But Accelerates After 50</h4>
                    <p className="text-sm opacity-90">
                      Sarcopenia (muscle loss) begins around age 30 at 0.5-1% per year. After 50, it accelerates to 1-2% per year. After 70, it can reach 3% annually. Resistance training is the only proven intervention to reverse this decline.
                    </p>
                  </div>
                </div>
              </section>

              {/* How to Increase LBM */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Dumbbell className="w-6 h-6 text-green-600" />
                  How to Increase Your Lean Body Mass
                </h2>
                <p className="mb-4 text-gray-700">
                  Building lean mass requires strategic training and nutrition. Here is what the research shows:
                </p>
                
                <div className="space-y-4">
                  <Card className="not-prose border-green-100">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Dumbbell className="w-5 h-5 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">Resistance Training 3-5x Per Week</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Focus on compound exercises: squats, deadlifts, bench press, rows, overhead press. Progressive overload (adding weight or reps over time) is essential for muscle growth.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="not-prose border-green-100">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Target className="w-5 h-5 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">Protein: 1.6-2.2g per kg Bodyweight</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Protein provides amino acids for muscle repair. Spread intake across 4-5 meals for optimal muscle protein synthesis. Aim for 25-40g protein per meal.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="not-prose border-green-100">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">Slight Calorie Surplus (200-500 kcal)</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Building muscle requires energy. A modest surplus supports muscle growth without excessive fat gain. Track your weight weekly and adjust calories based on progress.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="not-prose border-green-100">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Clock className="w-5 h-5 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">Sleep 7-9 Hours Per Night</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Muscles grow during rest, not during training. Poor sleep reduces testosterone, increases cortisol, and impairs muscle protein synthesis. Prioritize recovery.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* LBM vs Lean Body Weight vs Lean Muscle Mass */}
              <section className="py-8 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Ruler className="w-6 h-6 text-green-600" />
                  LBM vs Lean Body Weight vs Lean Muscle Mass: What's the Difference?
                </h2>
                <p className="mb-4 text-gray-700">
                  These terms are often used interchangeably, but they have subtle differences:
                </p>
                
                <Card className="not-prose overflow-hidden border-green-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Term</th>
                        <th className="px-6 py-4 text-left font-bold">Definition</th>
                        <th className="px-6 py-4 text-left font-bold">Includes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-bold text-green-700">Lean Body Mass (LBM)</td>
                        <td className="px-6 py-4">Total weight minus fat mass</td>
                        <td className="px-6 py-4">Muscle, bone, organs, water, essential fat</td>
                      </tr>
                      <tr className="bg-green-50/30">
                        <td className="px-6 py-4 font-bold text-green-700">Lean Body Weight</td>
                        <td className="px-6 py-4">Same as LBM (alternative name)</td>
                        <td className="px-6 py-4">Muscle, bone, organs, water, essential fat</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-green-700">Fat Free Mass (FFM)</td>
                        <td className="px-6 py-4">Total weight minus ALL fat</td>
                        <td className="px-6 py-4">Muscle, bone, organs, water (no fat)</td>
                      </tr>
                      <tr className="bg-green-50/30">
                        <td className="px-6 py-4 font-bold text-green-700">Lean Muscle Mass</td>
                        <td className="px-6 py-4">Only skeletal muscle tissue</td>
                        <td className="px-6 py-4">Skeletal muscles only (not organs, bones)</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                
                <p className="mt-4 text-gray-700">
                  For practical fitness purposes, LBM and lean body weight are identical. Lean muscle mass is a subset, representing only skeletal muscle without bones and organs.
                </p>
              </section>

              {/* Accuracy Warning */}
              <section className="border-2 border-dashed border-amber-200 p-6 rounded-2xl bg-amber-50/30">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-amber-800 uppercase tracking-tight">
                  <AlertTriangle className="w-5 h-5" /> When Formula Estimates May Be Less Accurate
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Prediction formulas work well for average adults. However, accuracy decreases for:
                </p>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700 list-none pl-0">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" /> BMI over 30 (obese individuals)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" /> Pregnant women
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" /> Highly muscular athletes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" /> Elderly individuals (70+)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" /> Very tall or very short people
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" /> People with edema or fluid retention
                  </li>
                </ul>
                <p className="text-sm text-gray-700 mt-4">
                  For these populations, consider a DEXA scan, BodPod, or hydrostatic weighing for clinical-grade accuracy.
                </p>
              </section>

              {/* Calculator Transparency */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  Our Calculation Transparency
                </h2>
                <p className="text-gray-700 mb-4">
                  We deliberately show results from multiple formulas. Each was derived from different research populations, so presenting a range gives you scientific reality rather than false precision:
                </p>
                <ul className="space-y-2 text-gray-700 list-none pl-0">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Boer, Hume, and James formulas calculated automatically
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Direct Body Fat Method: If you enter body fat %, we calculate LBM = Weight × (1 - BF%)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Special population warnings displayed when relevant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> No data stored or tracked. Your privacy comes first.
                  </li>
                </ul>
              </section>

              {/* Related Calculators CTA */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl text-white shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Want More Body Composition Insights?</h3>
                    <p className="text-gray-200 max-w-md">
                      Calculate your Adjusted Body Weight for clinical applications like nutrition planning or medication dosing.
                    </p>
                  </div>
                  <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
                    <Link href="/health/adjusted-body-weight-calculator">
                      Calculate Adjusted Weight <ArrowRight className="ml-2 w-4 h-4" />
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

      {/* Author Schema */}
      <AuthorSchema />

      <Footer />
    </div>
  )
}
