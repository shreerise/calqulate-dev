import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import WHtRCalculator from "@/components/calculators/whtr-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"
import { MedicalReviewerSection } from "@/components/seo/medical-reviewer-section"
import { MedicalReviewerSchema } from "@/components/seo/medical-reviewer-schema"
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
  Baby,
  Stethoscope,
  Sparkles,
} from "lucide-react"
import { RelatedCalculators } from "@/components/calculators/related-calculators"

export const metadata: Metadata = {
  title: "Waist to Height Ratio Calculator: Simple & Accurate Health Risk Check",
  description:
    "Measure your waist to height ratio (WHtR) to assess abdominal fat and metabolic health. Learn why keeping your waist less than half your height is vital.",
  keywords:
    "waist to height ratio calculator, WHtR calculator, height to waist ratio, calculate waist to height ratio, abdominal fat calculator, WHtR NHS, metabolic health risk",
  alternates: {
    canonical: "https://calqulate.net/health/waist-to-height-ratio-calculator",
  },
  openGraph: {
    title: "Waist to Height Ratio Calculator: Simple & Accurate Health Risk Check",
    description: "Measure your waist to height ratio (WHtR) to assess abdominal fat and metabolic health. Learn why keeping your waist less than half your height is vital.",
    url: "https://calqulate.net/health/waist-to-height-ratio-calculator",
    siteName: "Calqulate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waist to Height Ratio Calculator: Simple & Accurate Health Risk Check",
    description: "Measure your waist to height ratio (WHtR) to assess abdominal fat and metabolic health. Learn why keeping your waist less than half your height is vital.",
  },
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
      <MedicalReviewerSchema />

      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-lime-50 border-b border-slate-200">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 mb-5">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
              Free · Instant · No sign-up required
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-balance leading-tight text-slate-900">
              Waist to Height Ratio Calculator
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl text-pretty">
              A waist to height ratio calculator measures how your waist circumference compares to your height. It helps assess abdominal fat, which is strongly linked to{" "} <Link href="/health/heart-age-calculator" className="text-red-600 hover:underline hover:text-red-800 transition-colors font-medium" > heart disease </Link>{" "} and metabolic health.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#calculator"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
              >
                Try the Calculator ↓
              </a>
            </div>
          </div>
        </section>

        {/* USP SUMMARY (TOFU) */}
        <section className="border-b border-emerald-100 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-6">
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 md:p-6">
              <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                Calqulate.net checks your waist-to-height ratio from two measurements using the evidence-backed &apos;&lt;0.5&apos; rule. You get a clear risk tier and the exact inches to lose.
              </p>
            </div>
          </div>
        </section>

        {/* STATS DASHBOARD */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-5">
            {[
              { value: "0.5", label: "Threshold" },
              { value: "Free", label: "Price" },
              { value: "No", label: "Sign-up" },
              { value: "Instant", label: "Results" },
              { value: "Private", label: "In-browser" },
            ].map((s) => (
              <div key={s.label} className="bg-white p-5 text-center">
                <p className="text-2xl md:text-3xl font-bold text-slate-900">{s.value}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CALCULATOR */}
        <section id="calculator" className="scroll-mt-20">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <WHtRCalculator />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

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
                          <th className="px-4 py-3 text-left">
                            <Link
                              href="/health/bmi-calculator"
                              className="hover:underline hover:text-green-800 transition-colors"
                            >
                              BMI Calculator
                            </Link>
                          </th>
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
                  <p className="mt-3 text-sm font-bold text-green-700">
                    👉 Using a{" "}
                    <Link
                      href="/health/bmi-calculator"
                      className="underline hover:text-green-900 transition-colors"
                    >
                      BMI calculator
                    </Link>{" "}
                    and waist to height ratio together gives a far better health picture than either alone.
                  </p>
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
                      <li>
                        • Improve{" "}
                        <Link
                          href="/health/sleep-cycle-calculator"
                          className="hover:underline hover:text-green-900 transition-colors font-medium"
                        >
                          sleep quality
                        </Link>
                      </li>

                      <li>
                        •{" "}
                        <Link
                          href="/health/stress-level-calculator"
                          className="hover:underline hover:text-green-900 transition-colors font-medium"
                        >
                          Manage stress
                        </Link>{" "}
                        (cortisol)
                      </li>
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

            <RelatedCalculators slug="waist-to-height-ratio-calculator" />

            {/* Structured FAQ UI */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>

            {/* Author Badge Section */}
            <MedicalReviewerSection />
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