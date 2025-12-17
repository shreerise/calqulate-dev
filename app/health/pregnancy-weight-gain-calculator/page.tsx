import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import PregnancyWeightCalculator from "@/components/calculators/pregnancy-weight-gain-calculator" // Placeholder for your interactive component
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Scale, 
  Baby, 
  Apple, 
  Globe, 
  AlertTriangle, 
  HeartPulse, 
  Calculator as CalculatorIcon, 
  Info,
  CheckCircle2
} from "lucide-react"

export const metadata: Metadata = {
  title: "Pregnancy Weight Gain Calculator: Healthy Week-by-Week Guide",
  description:
    "Track your healthy pregnancy weight gain with our calculator guide based on BMI. Learn where the weight goes, IOM vs. French guidelines, and trimester targets. (Kg & Lbs).",
  keywords:
    "pregnancy weight gain calculator, weight gain calculator pregnancy, weight gain pregnancy calculator, weight gain during pregnancy calculator, french pregnancy weight gain calculator, pregnancy bmi calculator, healthy pregnancy weight, pregnancy weight distribution",
}

const faqs = [
  {
    question: "I lost weight in my first trimester. Is my baby okay?",
    answer:
      "Yes, this is very common due to nausea (morning sickness) and food aversions. Your baby is tiny (the size of a lime by week 12) and draws from your existing reserves. Focus on hydration and prenatal vitamins until your appetite returns.",
  },
  {
    question: "Does this calculator apply to the UK and UAE?",
    answer:
      "Yes. While the UK (NICE guidelines) and UAE health authorities may have slight variations in clinical practice, they generally align with the IOM BMI-based ranges used in this calculator. Note that in the UK, weight is often discussed in 'stones,' but medical charts use kg.",
  },
  {
    question: "Is the French pregnancy weight gain calculator healthier?",
    answer:
      "'Healthier' is subjective. The French approach historically prioritizes a quicker return to pre-pregnancy weight (approx 1kg gain per month), whereas the IOM guidelines prioritize fetal safety and breastfeeding reserves. Always follow the advice of your specific OB-GYN.",
  },
  {
    question: "When should I stop using the calculator?",
    answer:
      "If tracking your weight causes you anxiety or leads to disordered eating behaviors, stop immediately. Your doctor will monitor your weight at appointments. Your mental health is just as important as your physical health.",
  },
  {
    question: "How much weight is actually fat?",
    answer:
      " Surprisingly little! In an average 30 lb weight gain, only about 7 lbs is maternal fat storage (reserved for breastfeeding energy). The rest is baby, placenta, fluids, blood volume, and breast tissue.",
  },
]

export default function PregnancyWeightCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Pregnancy Weight Gain Calculator"
        description="Calculate your ideal pregnancy weight gain week-by-week based on pre-pregnancy BMI and IOM guidelines."
        url="https://calqulate.net/health/pregnancy-weight-gain-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Pregnancy Weight Gain Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Watching your body change during pregnancy is a beautiful, miraculous, and—let’s be honest—sometimes stressful experience. Whether you are in New York, London, or Dubai, the question remains the same: <i>"Is my weight gain normal?"</i>
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Our comprehensive tool helps you interpret <b>weight gain during pregnancy</b>, understand the Institute of Medicine (IOM) standards versus the stricter "French" models, and see exactly where those extra pounds are going.
              </p>
            </div>

            {/* Calculator Component */}
            <PregnancyWeightCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">
              
              {/* The Calculator Logic */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  The Calculator Logic: How We Estimate Your Target
                </h2>

                <p className="mb-3 text-gray-700 leading-relaxed">
                   While using a <b>pregnancy weight gain calculator</b> is an excellent way to stay on track, it is vital to remember that these numbers are guidelines, not laws. Your body knows what it needs to do to grow a healthy human.
                </p>

                <p className="mb-3 text-gray-700 leading-relaxed">
                  To manually estimate your target, we first need to establish your <b>Pre-Pregnancy BMI</b>. Your recommended results depend entirely on where you started.
                </p>

                <Card className="mt-6 bg-slate-50 border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CalculatorIcon className="w-5 h-5 text-blue-500" />
                      The Formula
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-mono text-center text-lg bg-white p-4 rounded border">
                      BMI = Weight (kg) / (Height (m))²
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* IOM Recommendations Table */}
              <section>
                <h2 className="mb-2 font-semibold">
                  <b>Institute of Medicine (IOM) Recommendations</b>
                </h2>
                <p className="mb-4">
                  These are the gold-standard guidelines used by obstetricians in the USA, UK, and UAE.
                </p>

                <Card className="not-prose border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                          <tr>
                            <th className="px-6 py-3 font-bold">Pre-Pregnancy BMI</th>
                            <th className="px-6 py-3 font-bold">Category</th>
                            <th className="px-6 py-3 font-bold">Total Gain (lbs)</th>
                            <th className="px-6 py-3 font-bold">Total Gain (kg)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr className="bg-white hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">&lt; 18.5</td>
                            <td className="px-6 py-4 text-blue-600 font-medium">Underweight</td>
                            <td className="px-6 py-4">28 – 40 lbs</td>
                            <td className="px-6 py-4">12.5 – 18 kg</td>
                          </tr>
                          <tr className="bg-gray-50/50 hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">18.5 – 24.9</td>
                            <td className="px-6 py-4 text-green-600 font-medium">Normal Weight</td>
                            <td className="px-6 py-4">25 – 35 lbs</td>
                            <td className="px-6 py-4">11.5 – 16 kg</td>
                          </tr>
                          <tr className="bg-white hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">25.0 – 29.9</td>
                            <td className="px-6 py-4 text-yellow-600 font-medium">Overweight</td>
                            <td className="px-6 py-4">15 – 25 lbs</td>
                            <td className="px-6 py-4">7 – 11.5 kg</td>
                          </tr>
                          <tr className="bg-gray-50/50 hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">≥ 30.0</td>
                            <td className="px-6 py-4 text-red-600 font-medium">Obese</td>
                            <td className="px-6 py-4">11 – 20 lbs</td>
                            <td className="px-6 py-4">5 – 9 kg</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <div className="p-4 bg-blue-50 text-sm text-blue-800 border-t border-blue-100 flex items-start gap-2">
                    <Info className="w-5 h-5 shrink-0" />
                    <p>
                      <b>Note for Twins:</b> If you are carrying multiples, a weight gain calculator pregnancy adjustment is necessary. Normal weight mothers carrying twins should aim for <b>37–54 lbs (17–25 kg)</b>.
                    </p>
                  </div>
                </Card>
              </section>

              {/* French vs Global Approach */}
              <section>
                <Card className="not-prose mt-8 border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Globe className="w-6 h-6 text-purple-600" />
                      The "French" Pregnancy Weight Gain Calculator: What’s the Difference?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-gray-700">
                    <p>
                      You may have searched for a <b>French pregnancy weight gain calculator</b>. This interest often stems from the observation that French obstetrics guidelines historically suggested a lower, stricter weight gain curve compared to American standards.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <h4 className="font-bold mb-2">🇺🇸 The American/UK Approach (IOM)</h4>
                        <p>Focuses on ensuring the baby is not underweight and the mother has sufficient fat stores for breastfeeding. Target: <b>25–35 lbs</b>.</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <h4 className="font-bold mb-2">🇫🇷 The "French" Approach</h4>
                        <p>Historically emphasized gaining approx. 1 kg (2.2 lbs) per month, totaling roughly <b>9–12 kg (20–26 lbs)</b> for a normal BMI pregnancy.</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 italic mt-2">
                      <b>Which should you follow?</b> Unless your doctor specifically advises a restricted weight gain plan due to gestational diabetes, the IOM guidelines listed above are considered the safest global standard for fetal development.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Where Does the Weight Go? */}
              <section>
                <h2 className="mb-4 text-2xl font-bold">Where Does the Weight Go? (It’s Not Just Fat!)</h2>
                <p className="mb-4">
                  Many expectant mothers panic when they see the scale jump, assuming it is all maternal body fat. It isn’t. A <b>weight gain during pregnancy calculator</b> accounts for the entire support system required to keep your baby alive.
                </p>
                
                <Card className="not-prose bg-gradient-to-br from-white to-pink-50/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-pink-500" />
                      Breakdown of an Average 30 lb (13.6 kg) Gain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-3 rounded shadow-sm border text-center">
                        <Baby className="w-8 h-8 mx-auto text-blue-400 mb-2" />
                        <p className="text-xs text-gray-500 uppercase font-bold">Baby</p>
                        <p className="font-semibold text-gray-800">~7.5 lbs</p>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm border text-center">
                        <div className="w-8 h-8 mx-auto text-red-400 mb-2 flex items-center justify-center font-bold text-xl">🩸</div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Blood Vol</p>
                        <p className="font-semibold text-gray-800">~4 lbs</p>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm border text-center">
                        <div className="w-8 h-8 mx-auto text-blue-300 mb-2 flex items-center justify-center font-bold text-xl">💧</div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Fluids</p>
                        <p className="font-semibold text-gray-800">~4 lbs</p>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm border text-center">
                        <div className="w-8 h-8 mx-auto text-yellow-500 mb-2 flex items-center justify-center font-bold text-xl">🧀</div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Fat Stores</p>
                        <p className="font-semibold text-gray-800">~7 lbs</p>
                      </div>
                      {/* Secondary Items */}
                      <div className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mt-2">
                         <div className="text-center">Placenta: <b>~1.5 lbs</b></div>
                         <div className="text-center">Amniotic Fluid: <b>~2 lbs</b></div>
                         <div className="text-center">Uterus: <b>~2 lbs</b></div>
                         <div className="text-center">Breast Tissue: <b>~2 lbs</b></div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-pink-100 rounded text-center text-pink-800 font-medium">
                      Insight: Only about 7 lbs of a 30 lb weight gain is actual fat storage. The rest is biological infrastructure!
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Weight Gain by Trimester */}
              <section>
                <h2 className="mb-4"><b>Weight Gain by Trimester: What to Expect</b></h2>
                <p className="mb-6">
                  A pregnancy weight gain calculator isn't a straight line. Your baby grows at different speeds, and your fluid retention changes.
                </p>

                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  {/* Trimester 1 */}
                  <Card className="border-t-4 border-t-emerald-400">
                    <CardHeader>
                      <CardTitle className="text-lg">First Trimester</CardTitle>
                      <CardDescription>Weeks 1–12</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p><b>Goal:</b> 1–4 lbs (0.5 – 1.8 kg) Total</p>
                      <hr />
                      <p><b>Reality Check:</b> Many women gain nothing—or even lose weight—due to morning sickness. This is generally considered safe as long as you stay hydrated.</p>
                    </CardContent>
                  </Card>

                  {/* Trimester 2 */}
                  <Card className="border-t-4 border-t-yellow-400">
                    <CardHeader>
                      <CardTitle className="text-lg">Second Trimester</CardTitle>
                      <CardDescription>Weeks 13–26</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p><b>Goal:</b> 1–2 lbs (0.5 – 1 kg) Per Week</p>
                      <hr />
                      <p><b>The Shift:</b> This is when the "bump" pops. Blood volume doubles and the baby grows rapidly. Energy often returns and appetite increases.</p>
                    </CardContent>
                  </Card>

                  {/* Trimester 3 */}
                  <Card className="border-t-4 border-t-orange-400">
                    <CardHeader>
                      <CardTitle className="text-lg">Third Trimester</CardTitle>
                      <CardDescription>Weeks 27–40</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p><b>Goal:</b> 1–2 lbs (0.5 – 1 kg) Per Week</p>
                      <hr />
                      <p><b>Final Stretch:</b> Gains might slow in the final month. <span className="text-red-600 font-bold">Warning:</span> Sudden, rapid swelling (&gt2 lbs/week) can be preeclampsia.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Managing Your Weight: Nutrition */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Apple className="w-5 h-5 text-green-600" />
                      Managing Your Weight: Nutrition Over Calories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-4">
                    <p>
                      To stay within the green zone of your weight gain pregnancy calculator, focus on nutrient density rather than calorie counting. <b>The old adage "eating for two" is a myth.</b>
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Calorie Needs by Trimester:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><b>Trimester 1:</b> No extra calories required.</li>
                        <li><b>Trimester 2:</b> ~340 extra calories/day (e.g., an apple, yogurt, and almonds).</li>
                        <li><b>Trimester 3:</b> ~450 extra calories/day.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">Top Nutrients to Prioritize:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                          <span><b>Folate/Folic Acid:</b> Critical for neural tube development (Spinach, lentils).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                          <span><b>Iron:</b> Prevents anemia as blood volume rises 50% (Red meat, beans).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                          <span><b>Calcium:</b> Vital for baby's bones (Dairy, sardines, kale).</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Risks of Suboptimal Weight Gain */}
              <section>
                <h2 className="mb-2"><b>Risks of Suboptimal Weight Gain</b></h2>
                <p className="mb-4">
                  Why do we use a weight gain calculator pregnancy tool? Because straying too far from the range carries risks.
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose">
                  <Card className="border border-red-100 bg-red-50/30">
                    <CardHeader>
                      <CardTitle className="text-red-700 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Gaining Too Little
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Risk of Low Birth Weight (LBW) babies (&lt; 2.5 kg).</li>
                        <li>Preterm birth complications.</li>
                        <li>Difficulty establishing breastfeeding.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border border-orange-100 bg-orange-50/30">
                    <CardHeader>
                      <CardTitle className="text-orange-700 flex items-center gap-2">
                        <HeartPulse className="w-5 h-5" />
                        Gaining Too Much
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li><b>Gestational Diabetes:</b> Excess weight can increase insulin resistance.</li>
                        <li><b>Fetal Macrosomia:</b> A "large for gestational age" baby, increasing C-section risks.</li>
                        <li><b>Postpartum Retention:</b> Difficulty returning to a healthy weight after birth.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Disclaimer */}
              <section className="bg-blue-50 p-6 rounded-lg text-sm text-blue-900 mt-8">
                 <p className="font-bold mb-2">Medical Disclaimer:</p>
                 <p>This pregnancy weight gain calculator content is for educational purposes only. Every pregnancy is unique. Always consult your obstetrician, midwife, or healthcare provider for personalized medical advice.</p>
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