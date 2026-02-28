import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BodyFatCalculator from "@/components/calculators/body-fat-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Activity, 
  Ruler, 
  HeartPulse, 
  Calculator as CalculatorIcon, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Dumbbell, 
  Target, 
  Zap,
  User,
  Users
} from "lucide-react"

export const metadata: Metadata = {
  title: "Body Fat Calculator: Accurate Body Composition Estimator",
  description:
    "Estimate your body fat percentage using the U.S. Navy method. Understand your body composition, health risks, and fitness levels better than BMI.",
  keywords:
    "body fat calculator, body fat percentage calculator, calculate body fat, navy method body fat, ideal body fat percentage, body fat for men, body fat for women, fat loss tracking",
}

const faqs = [
  {
    question: "What is a body fat calculator?",
    answer:
      "It estimates how much of your total body weight comes from fat versus lean mass (muscle, bone, and water).",
  },
  {
    question: "How to calculate body fat percentage accurately?",
    answer:
      "The most accurate methods are medical scans like DEXA or hydrostatic weighing. However, circumference-based tools like the U.S. Navy method provide a reliable estimate for home tracking.",
  },
  {
    question: "Is body fat calculator better than BMI?",
    answer:
      "Yes. While BMI only looks at weight and height, a body fat calculator measures body composition, which is a better indicator of health and metabolic risk.",
  },
  {
    question: "Can I calculate body fat at home?",
    answer:
      "Yes. Using the U.S. Navy method, you only need a soft measuring tape and your height, waist, neck, and hip measurements.",
  },
  {
    question: "What is the ideal body fat percentage?",
    answer:
      "It depends on your age, gender, and goals. For general health, 10–20% is ideal for men and 18–28% for women.",
  },
  {
    question: "Is the army body fat calculator reliable?",
    answer:
      "Yes, the Army/Navy method is a scientifically validated formula used for general health screening and tracking fitness trends.",
  },
]

export default function BodyFatCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Body Fat Calculator"
        description="Estimate your body fat percentage instantly using circumference measurements. Get insights into your health and fitness status."
        url="https://calqulate.net/health/body-fat-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Body Fat Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                A body fat calculator estimates the percentage of your body made up of fat, not muscle, bone, or water. 
                This is far more meaningful than body weight or BMI alone.
              </p>
              <p className="text-base text-muted-foreground mt-3 italic">
                Because two people with the same weight can have very different health risks.
              </p>
            </div>

            {/* Calculator Component */}
            <BodyFatCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Why it matters */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  Why Body Fat Percentage Matters More Than BMI
                </h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  BMI only measures weight vs height. It does not tell you where fat is stored, how much muscle you have, or your metabolic risk. Body fat percentage directly reflects:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Heart Health', icon: HeartPulse, href: '/health/heart-age-calculator' },
                    { label: 'Diabetes Risk', icon: Activity },
                    { label: 'Hormonal Health', icon: Zap },
                    { label: 'Performance', icon: Dumbbell }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center p-4 bg-green-50 rounded-2xl border border-green-100 text-center"
                    >
                      <item.icon className="w-6 h-6 text-green-600 mb-2" />

                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-xs font-bold text-green-900 hover:underline hover:text-green-700 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-xs font-bold text-green-900">
                          {item.label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-gray-700 font-bold text-center">
                  👉 That&apos;s why fitness professionals rely on body fat percentage calculators, not BMI alone.
                </p>
              </section>

              {/* Formula Section */}
              <section>
                <Card className="border-green-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-green-600 text-white">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold">
                      <CalculatorIcon className="w-5 h-5" />
                      How It Works: The U.S. Navy Method
                    </CardTitle>
                    <CardDescription className="text-green-50">Proven circumference-based formulas for home use.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-8 bg-white space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                          <User className="w-4 h-4 text-green-600" /> For Men
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-600 font-mono text-xs leading-relaxed text-gray-700">
                          BF% = 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                          <Users className="w-4 h-4 text-green-600" /> For Women
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-600 font-mono text-xs leading-relaxed text-gray-700">
                          BF% = 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-xs text-gray-400 italic">📌 Measurements must be in cm or inches consistently.</p>
                  </CardContent>
                </Card>
              </section>

              {/* Step by Step */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Calculate Body Fat Percentage at Home</h2>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <p className="font-bold text-green-700 uppercase tracking-widest text-sm">What You Need:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600" /> Soft measuring tape</li>
                      <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600" /> Mirror</li>
                      <li className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600" /> Normal breathing (don’t suck in)</li>
                    </ul>
                  </div>
                  <div className="not-prose space-y-3">
                    {[
                      { step: '1', title: 'Measure Waist', desc: 'At the narrowest point, relaxed abdomen.' },
                      { step: '2', title: 'Measure Neck', desc: 'Just below Adam’s apple.' },
                      { step: '3', title: 'Measure Hip', desc: 'Widest part of hips (Women Only).' },
                      { step: '4', title: 'Measure Height', desc: 'Barefoot, standing straight.' }
                    ].map((s) => (
                      <div key={s.step} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="h-6 w-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold shrink-0">{s.step}</span>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{s.title}</p>
                          <p className="text-xs text-gray-600">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Charts */}
              <section className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="text-green-600" /> Healthy Body Fat – Men
                  </h3>
                  <div className="border border-green-100 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-green-600 text-white">
                        <tr>
                          <th className="px-4 py-3 text-left">Category</th>
                          <th className="px-4 py-3 text-left">Body Fat %</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-4 py-3">Essential fat</td><td className="px-4 py-3 font-bold">2–5%</td></tr>
                        <tr><td className="px-4 py-3">Athletes</td><td className="px-4 py-3 font-bold">6–13%</td></tr>
                        <tr><td className="px-4 py-3">Fitness</td><td className="px-4 py-3 font-bold">14–17%</td></tr>
                        <tr className="bg-green-50/50"><td className="px-4 py-3">Average</td><td className="px-4 py-3 font-bold">18–24%</td></tr>
                        <tr className="bg-red-50/30"><td className="px-4 py-3">Obese</td><td className="px-4 py-3 font-bold text-red-600">25%+</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Users className="text-green-600" /> Healthy Body Fat – Women
                  </h3>
                  <div className="border border-green-100 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-green-600 text-white">
                        <tr>
                          <th className="px-4 py-3 text-left">Category</th>
                          <th className="px-4 py-3 text-left">Body Fat %</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-4 py-3">Essential fat</td><td className="px-4 py-3 font-bold">10–13%</td></tr>
                        <tr><td className="px-4 py-3">Athletes</td><td className="px-4 py-3 font-bold">14–20%</td></tr>
                        <tr><td className="px-4 py-3">Fitness</td><td className="px-4 py-3 font-bold">21–24%</td></tr>
                        <tr className="bg-green-50/50"><td className="px-4 py-3">Average</td><td className="px-4 py-3 font-bold">25–31%</td></tr>
                        <tr className="bg-red-50/30"><td className="px-4 py-3">Obese</td><td className="px-4 py-3 font-bold text-red-600">32%+</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-[10px] text-gray-400 italic leading-tight">⚠️ Women naturally carry higher essential fat due to hormonal and reproductive needs.</p>
                </div>
              </section>

              {/* Ideal & Accuracy */}
              <section className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" /> What’s &quot;Ideal&quot;?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">&quot;Ideal&quot; depends on your goal, not perfection.</p>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-white rounded border border-gray-100 text-xs">
                        <span className="font-bold">Health</span>
                        <span className="text-green-700 font-bold">M: 10-20% | W: 18-28%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded border border-gray-100 text-xs">
                        <span className="font-bold">Fitness</span>
                        <span className="text-green-700 font-bold">M: 12-15% | W: 20-24%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded border border-gray-100 text-xs">
                        <span className="font-bold">Athletic</span>
                        <span className="text-green-700 font-bold">M: 6-10% | W: 14-18%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-600" /> Accuracy Matrix
                    </h3>
                    <div className="space-y-2">
                      {[
                        { m: 'DEXA Scan', a: '⭐⭐⭐⭐⭐' },
                        { m: 'Bod Pod', a: '⭐⭐⭐⭐' },
                        { m: 'Navy Formula', a: '⭐⭐⭐' },
                        { m: 'Smart Scales', a: '⭐⭐' },
                        { m: 'BMI', a: '⭐' }
                      ].map((item) => (
                        <div key={item.m} className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">{item.m}</span>
                          <span className="text-green-600 font-bold tracking-tighter">{item.a}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-[11px] text-gray-500 italic">Consistency matters more than perfection. Track changes over time using the same method.</p>
                  </div>
                </div>
              </section>

              {/* Mistakes Section */}
              <section className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Common Mistakes to Avoid</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>❌ Measuring after meals</li>
                    <li>❌ Holding breath or sucking in</li>
                    <li>❌ Tightening the tape too much</li>
                  </ul>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li>❌ Measuring at the wrong waist position</li>
                    <li>❌ Mixing cm and inches in calculations</li>
                    <li className="font-bold text-green-700">✔ Pro Tip: Measure in the morning!</li>
                  </ul>
                </div>
              </section>

              {/* Mindset Shift */}
              <section className="bg-green-600 text-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-bold mb-4">
                  <Link
                    href="/health/calorie-deficit-calculator"
                    className="text-2xl font-bold mb-4 text-white hover:underline hover:text-green-300 transition-colors"
                  >
                    Fat Loss
                  </Link>{" "}
                    vs{" "}
                  <Link
                    href="/health/calories-burned-calculator"
                    className="text-2xl font-bold mb-4 text-white hover:underline hover:text-green-300 transition-colors"
                  >
                   Weight Loss
                  </Link>{" "}
                </h2>                <p className="text-green-50 mb-6 leading-relaxed">
                  A critical insight: You can lose weight but gain fat, or you can gain weight but lose fat. 
                  Scale weight is a blunt instrument; body fat percentage is the precision tool for health.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-xs font-bold uppercase mb-1">Weight Loss</p>
                    <p className="text-sm opacity-90">Includes muscle, water, and fat.</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl">
                    <p className="text-xs font-bold uppercase mb-1">Fat Loss</p>
                    <p className="text-sm opacity-90">Targets only excess body fat storage.</p>
                  </div>
                </div>
                <p className="mt-6 text-center text-sm font-bold">👉 Focus on composition, not just the number on the scale.</p>
              </section>

              {/* Final Note */}
              <section className="text-center pt-12 border-t border-gray-100">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Your Health is More Than a Number</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Body composition provides the &quot;why&quot; behind your weight. Use the body fat calculator as a proactive step toward a leaner, stronger, and healthier version of yourself.
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