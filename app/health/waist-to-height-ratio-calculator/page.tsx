import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import WHtRCalculator from "@/components/calculators/whtr-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Ruler, 
  Activity, 
  HeartPulse, 
  Calculator as CalculatorIcon, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Utensils, 
  Zap,
  Info,
  Users,
  Baby
} from "lucide-react"

export const metadata: Metadata = {
  title: "Waist to Height Ratio Calculator: Simple & Accurate Health Risk Check",
  description:
    "Measure your waist to height ratio (WHtR) to assess abdominal fat and metabolic health. Learn why keeping your waist less than half your height is vital.",
  keywords:
    "waist to height ratio calculator, WHtR calculator, height to waist ratio, calculate waist to height ratio, abdominal fat calculator, WHtR NHS, metabolic health risk",
}

const faqs = [
  {
    question: "What is a good waist to height ratio?",
    answer:
      "A ratio below 0.50 is considered healthy for most adults. This means your waist circumference should be less than half of your total height.",
  },
  {
    question: "Is waist to height ratio better than BMI?",
    answer:
      "Yes, especially for detecting abdominal fat and metabolic risk. While BMI looks at total weight, WHtR looks at where fat is stored, which is a better predictor of heart disease.",
  },
  {
    question: "Can I use this calculator in cm or inches?",
    answer:
      "Yes. The waist to height ratio calculator cm and inches give identical results as long as you use the same unit for both measurements.",
  },
  {
    question: "Is this the same as NHS waist to height ratio?",
    answer:
      "Yes. The calculation is identical to the waist to height ratio calculator NHS method, which emphasizes keeping your waist less than half your height.",
  },
  {
    question: "How often should I check my waist to height ratio?",
    answer:
      "Every 4–8 weeks if you are actively improving your health through diet and exercise.",
  },
  {
    question: "Can skinny people have a bad ratio?",
    answer:
      "Yes. 'Skinny-fat' individuals can have high visceral (internal) fat despite having a normal weight or BMI, leading to a higher-than-ideal ratio.",
  },
]

export default function WHtRCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Waist to Height Ratio Calculator"
        description="Calculate your waist-to-height ratio (WHtR) to assess abdominal fat and metabolic health risks instantly."
        url="https://calqulate.net/health/waist-to-height-ratio-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Waist to Height Ratio Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                A waist to height ratio calculator measures how your waist circumference compares to your height. 
                It helps assess abdominal fat, which is strongly linked to heart disease and metabolic health.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold border border-green-200">
                <Zap className="w-4 h-4 fill-current" />
                Simple rule: Keep your waist less than half your height.
              </div>
            </div>

            {/* Calculator Component */}
            <WHtRCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* What is WHtR? */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  What is a Waist to Height Ratio Calculator?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Unlike BMI, this method focuses on where fat is stored, not just body weight. It helps assess abdominal fat, which is strongly linked to:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {['Heart disease', 'Type 2 diabetes', 'High blood pressure', 'Metabolic syndrome'].map((item) => (
                    <div key={item} className="flex flex-col items-center p-3 bg-white border border-green-100 rounded-xl shadow-sm text-center">
                      <HeartPulse className="w-5 h-5 text-green-600 mb-2" />
                      <span className="text-xs font-bold text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Formula Card */}
              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-600 text-white">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                      <CalculatorIcon className="w-5 h-5" />
                      Waist to Height Ratio Formula
                    </CardTitle>
                    <CardDescription className="text-green-50">Simple & Accurate Calculation</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8">
                    <div className="text-center mb-8">
                      <p className="text-sm text-gray-500 uppercase tracking-widest mb-2 font-bold">The Math:</p>
                      <p className="text-2xl md:text-3xl font-mono text-green-700 font-bold">
                        Waist to Height Ratio = Waist ÷ Height
                      </p>
                      <p className="text-xs text-gray-400 mt-2 italic">Both measurements must be in the same unit (cm/cm or inches/inches).</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 border-t pt-8">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" /> Manual Steps
                        </h4>
                        <ol className="text-sm space-y-3 text-gray-600">
                          <li><b>1.</b> Measure your waist at the midpoint between ribs and hips.</li>
                          <li><b>2.</b> Measure your height without shoes.</li>
                          <li><b>3.</b> Divide waist by height.</li>
                        </ol>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <h4 className="font-bold text-green-800 mb-2">Example (Metric):</h4>
                        <div className="text-sm text-green-900 space-y-1">
                          <p>Waist: 80 cm</p>
                          <p>Height: 170 cm</p>
                          <p className="font-bold pt-2">80 ÷ 170 = 0.47</p>
                          <p className="text-xs font-bold text-green-600">✅ Healthy range</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Chart Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Waist to Height Ratio Chart (Adults)</h2>
                <Card className="not-prose border-green-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Ratio</th>
                        <th className="px-6 py-4 text-left font-bold">Health Risk</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr><td className="px-6 py-4 font-medium">Below 0.40</td><td className="px-6 py-4 text-blue-600 font-bold">Underweight</td></tr>
                      <tr className="bg-green-50/50"><td className="px-6 py-4 font-medium">0.40 – 0.49</td><td className="px-6 py-4 text-green-600 font-bold">Healthy</td></tr>
                      <tr><td className="px-6 py-4 font-medium">0.50 – 0.59</td><td className="px-6 py-4 text-orange-600 font-bold">Increased risk</td></tr>
                      <tr className="bg-red-50/30"><td className="px-6 py-4 font-medium">0.60+</td><td className="px-6 py-4 text-red-600 font-bold">High health risk</td></tr>
                    </tbody>
                  </table>
                </Card>
                <p className="mt-4 text-sm text-gray-500 italic">This threshold is supported by large-scale population studies and aligns closely with waist to height ratio calculator NHS guidance.</p>
              </section>

              {/* NHS & BMI Comparison */}
              <section className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Waist to Height Ratio Calculator NHS – What’s the Difference?</h2>
                  <p className="text-gray-700 leading-relaxed">
                    The waist to height ratio calculator NHS follows the same principle: <b>Waist should be less than half your height</b>. This guide fills the gaps that most calculators miss, such as how athletes and &quot;skinny-fat&quot; people are misclassified by BMI.
                  </p>
                </div>

                <div className="not-prose">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">BMI vs Waist to Height Ratio</h3>
                  <div className="overflow-x-auto border border-green-100 rounded-xl">
                    <table className="w-full text-sm">
                      <thead className="bg-green-50 text-green-900">
                        <tr>
                          <th className="px-4 py-3 text-left">Factor</th>
                          <th className="px-4 py-3 text-left">BMI Calculator</th>
                          <th className="px-4 py-3 text-left">Waist to Height Ratio</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-4 py-3 font-medium">Considers fat location</td><td className="px-4 py-3 text-red-500">❌ No</td><td className="px-4 py-3 text-green-600 font-bold">✅ Yes</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Works for athletes</td><td className="px-4 py-3 text-red-500">❌ Often wrong</td><td className="px-4 py-3 text-green-600 font-bold">✅ Better</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Ethnicity-neutral</td><td className="px-4 py-3 text-red-500">❌ No</td><td className="px-4 py-3 text-green-600 font-bold">✅ Mostly</td></tr>
                        <tr><td className="px-4 py-3 font-medium">Detects visceral fat</td><td className="px-4 py-3 text-red-500">❌ No</td><td className="px-4 py-3 text-green-600 font-bold">✅ Yes</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-sm font-bold text-green-700">👉 BMI calculator waist to height ratio together gives a far better health picture than either alone.</p>
                </div>
              </section>

              {/* Gender & Children */}
              <section className="grid md:grid-cols-2 gap-8">
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-800">
                      <Users className="w-5 h-5 text-green-600" />
                      WHtR Men vs Women
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Men Target</span>
                        <span className="font-bold text-green-700">≤ 0.50</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Women Target</span>
                        <span className="font-bold text-green-700">≤ 0.50</span>
                      </div>
                      <p className="text-xs text-gray-500">✔️ Same cutoff across genders for health risk assessment.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-100 bg-orange-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-bold text-orange-800">
                      <Baby className="w-5 h-5 text-orange-600" />
                      WHtR for Children & Teens
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">Ratio below <b>0.50</b> is still recommended for children. It often predicts future health risks better than BMI percentiles.</p>
                    <p className="text-xs font-bold text-orange-700 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Always interpret with pediatric guidance.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Practical Tips */}
              <section className="bg-green-50 p-8 rounded-3xl border border-green-100">
                <h2 className="text-2xl font-bold mb-6 text-green-900">Practical Tips to Improve Waist to Height Ratio</h2>
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  <div className="space-y-3">
                    <h4 className="font-bold text-green-800 flex items-center gap-2">
                      <Utensils className="w-4 h-4" /> Nutrition
                    </h4>
                    <ul className="text-sm space-y-2 text-green-700">
                      <li>• Reduce ultra-processed carbs</li>
                      <li>• Increase protein & fiber</li>
                      <li>• Control liquid calories</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-green-800 flex items-center gap-2">
                      <Ruler className="w-4 h-4" /> Activity
                    </h4>
                    <ul className="text-sm space-y-2 text-green-700">
                      <li>• Strength training (2–3x/week)</li>
                      <li>• Daily walking (7k–10k steps)</li>
                      <li>• Reduce prolonged sitting</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-green-800 flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Lifestyle
                    </h4>
                    <ul className="text-sm space-y-2 text-green-700">
                      <li>• Improve sleep quality</li>
                      <li>• Manage stress (cortisol)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Mistakes Section */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Common Measurement Mistakes (Avoid These)</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border border-red-100 rounded-xl bg-red-50/30">
                    <h4 className="text-red-700 font-bold mb-2">Don&apos;t:</h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li>❌ Measuring waist at belly button</li>
                      <li>❌ Holding breath</li>
                      <li>❌ Tight tape measure</li>
                      <li>❌ Measuring after meals</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-green-100 rounded-xl bg-green-50/30">
                    <h4 className="text-green-700 font-bold mb-2">Do:</h4>
                    <ul className="text-sm space-y-2 text-gray-600">
                      <li>✔️ Measure relaxed, standing</li>
                      <li>✔️ Measure before food (morning)</li>
                      <li>✔️ Use consistent units (cm or inches)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Final Note */}
              <section className="text-center pt-12 border-t border-gray-100">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Final Takeaway</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  If you remember one thing: <b>Keep your waist less than half your height.</b> 
                  This single ratio may reveal health risks years before symptoms appear.
                </p>
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