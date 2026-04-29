import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BMRCalculator from "@/components/calculators/bmr-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Flame,
  HeartPulse,
  Scale,
  Calculator,
  ShieldCheck,
  UserCheck,
  Info,
  FileText,
  Activity,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Dumbbell,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// ─────────────────────────────────────────────
// METADATA  — title & description built from
// top GSC clusters: bmr calculator (295),
// basal metabolic rate calculator (119),
// metabolic rate calculator (49),
// free bmr calculator (20),
// bmr calculator for men/women (13/7)
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: "BMR Calculator: How Many Calories Does Your Body Burn at Rest?",
  description:
    "Calculate your BMR free using the Mifflin-St Jeor & Harris-Benedict formulas. Find your basal metabolic rate in calories per day — with results for weight loss, men, and women.",
  keywords:
    "bmr calculator, basal metabolic rate calculator, metabolic rate calculator, calculate bmr, resting metabolic rate calculator, free bmr calculator, bmr calculator for men, bmr calculator for women, bmr calculator to lose weight, basal metabolic rate calculation, bmr formula, how to calculate bmr, resting calorie burn calculator, calories burned at rest calculator, metabolism calculator",
    alternates: {
      canonical: "https://calqulate.net/health/bmr-calculator",
    }
}

// ─────────────────────────────────────────────
// FAQ — every question maps to a real GSC query
// "what is my bmr" (8), "how to find bmr" (7),
// "how to calculate bmr" (19), "bmr to lose weight" (9),
// "average bmr" (9), "bmr vs rmr" cluster,
// "calories burned at rest" (5), "whats my metabolic rate" (6)
// ─────────────────────────────────────────────
const faqs = [
  {
    question: "How to calculate BMR manually?",
    answer:
      "Use the Mifflin-St Jeor formula — the most accurate modern method. For men: BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) + 5. For women: BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) − 161. Example: a 30-year-old woman, 65 kg, 165 cm → BMR = 650 + 1,031 − 150 − 161 = 1,370 kcal/day.",
  },
  {
    question: "What is a normal basal metabolic rate?",
    answer:
      "Average BMR ranges vary by sex and body size. For adult women, a normal BMR is typically 1,200–1,600 kcal/day. For adult men, it's 1,500–1,900 kcal/day. Athletes with high muscle mass often have BMRs above these ranges, while sedentary individuals may fall at the lower end.",
  },
  {
    question: "What is my BMR and how do I find it?",
    answer:
      "Your BMR is the number of calories your body burns at complete rest — just to keep your heart beating, lungs breathing, brain functioning, and cells repairing. Use the calculator above: enter your weight, height, age, and gender. The result is your personal BMR in kcal/day.",
  },
  {
    question: "Is BMR the same as calories burned daily?",
    answer:
      "No. BMR is only what you burn at complete rest. Your total daily calorie burn (TDEE) = BMR × an activity multiplier. A sedentary person burns roughly BMR × 1.2; a moderately active person burns BMR × 1.55. BMR is the floor, not the ceiling.",
  },
  {
    question: "Can I lose weight by eating my BMR?",
    answer:
      "Eating at your exact BMR means consuming only what your body needs to survive at rest — with nothing left for movement or digestion. This is an extremely aggressive deficit and is not recommended for sustained fat loss. The safer approach: calculate your TDEE, then subtract 300–500 kcal to create a sustainable deficit.",
  },
  {
    question: "How to calculate metabolic rate for weight loss?",
    answer:
      "Step 1: Calculate your BMR. Step 2: Multiply by your activity factor to get TDEE (Total Daily Energy Expenditure). Step 3: Subtract 300–500 kcal from TDEE for steady fat loss. Example: BMR of 1,500 × 1.55 (moderate activity) = TDEE of 2,325. Target intake for fat loss: ~1,825–2,025 kcal/day.",
  },
  {
    question: "What is resting metabolic rate and how does it differ from BMR?",
    answer:
      "RMR (Resting Metabolic Rate) is measured under slightly less strict conditions than BMR — you don't need to be in a fully fasted, clinically controlled state. In practice, RMR is usually 10–20 kcal higher than BMR. For daily use in fat loss planning, they are close enough to be interchangeable.",
  },
  {
    question: "How often should I recalculate my BMR?",
    answer:
      "Recalculate your BMR every 4–6 weeks if you are actively losing or gaining weight, or after any significant change in muscle mass. BMR changes as your weight, age, and body composition change — failing to update it is one of the most common reasons fat loss stalls.",
  },
]

export default function BMRCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="BMR Calculator"
        description="Free basal metabolic rate calculator using Mifflin-St Jeor and Harris-Benedict formulas. Calculate calories burned at rest for men and women, with TDEE and weight loss targets."
        url="https://calqulate.net/health/bmr-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            {/* ── HERO ── */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                BMR Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Calculate your <strong>basal metabolic rate</strong> accurately using the Mifflin-St Jeor
                and Harris-Benedict formulas — the same methods used by dietitians and sports scientists.
                Find out exactly how many <strong>calories you burn at rest</strong>, free.
              </p>
              <p className="text-base text-muted-foreground mt-3">
                Whether you want to <strong>calculate your BMR to lose weight</strong>, understand your
                resting calorie burn, or plan a smarter nutrition strategy — this tool gives you
                a complete metabolic picture in seconds.
              </p>
            </div>

            {/* ── CALCULATOR COMPONENT ── */}
            <BMRCalculator />

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">

              {/* ── WHAT IS BMR ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  What Is Basal Metabolic Rate (BMR)?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Your <strong>basal metabolic rate (BMR)</strong> is the number of calories your body burns
                  at complete rest to sustain essential life functions. It is the energy cost of simply being
                  alive — with no movement, no digestion, no exercise.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  In short: <strong>BMR = the calories your body needs to survive</strong>. It does NOT
                  include exercise, daily movement, or digestion. Those are added on top via your
                  activity multiplier (TDEE).
                </p>

                <div className="grid md:grid-cols-3 gap-4 not-prose">
                  {[
                    { icon: "🫁", title: "Breathing", desc: "Constant energy to inflate and deflate lungs" },
                    { icon: "❤️", title: "Heartbeat", desc: "Pumping blood through 60,000 miles of vessels" },
                    { icon: "🧠", title: "Brain function", desc: "Your brain alone uses ~20% of your BMR" },
                    { icon: "🔬", title: "Cell repair", desc: "Replacing ~330 billion cells per day" },
                    { icon: "🌡️", title: "Temperature", desc: "Keeping your core at 37°C regardless of environment" },
                    { icon: "🦠", title: "Organ function", desc: "Liver, kidneys, and organs running continuously" },
                  ].map((item) => (
                    <div key={item.title} className="p-4 border border-gray-100 rounded-2xl bg-white shadow-sm">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <h4 className="font-bold text-gray-800 mb-1 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-gray-700 font-medium bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                  <strong>Key distinction:</strong> BMR is your metabolic floor. Eating below your BMR
                  means your body is starving — it will break down muscle tissue for fuel. Never target
                  BMR as your daily calorie goal.
                </p>
              </section>

              {/* ── BMR FORMULA SECTION ── */}
              <section>
                <Card className="border-orange-100 shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="bg-orange-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-orange-800">
                      <Calculator className="w-5 h-5" />
                      How to Calculate BMR — Formula Guide
                    </CardTitle>
                    <CardDescription className="text-orange-700/80">
                      Three clinically validated formulas. Mifflin-St Jeor is the gold standard for most adults.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">

                    {/* Mifflin */}
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                        Mifflin-St Jeor Formula — Most Accurate for Modern Adults
                      </p>
                      <div className="space-y-3">
                        <div className="flex gap-4">
                          <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 font-bold text-sm">♂</div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">For Men</p>
                            <p className="font-mono text-sm bg-gray-50 px-3 py-1.5 rounded mt-1 border">
                              BMR = (10 × kg) + (6.25 × cm) − (5 × age) + 5
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 font-bold text-sm">♀</div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">For Women</p>
                            <p className="font-mono text-sm bg-gray-50 px-3 py-1.5 rounded mt-1 border">
                              BMR = (10 × kg) + (6.25 × cm) − (5 × age) − 161
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Harris-Benedict */}
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                        Harris-Benedict Formula (Revised) — Traditional Clinical Standard
                      </p>
                      <div className="space-y-3">
                        <div className="flex gap-4">
                          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 font-bold text-sm">♂</div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">For Men</p>
                            <p className="font-mono text-sm bg-gray-50 px-3 py-1.5 rounded mt-1 border">
                              BMR = (13.397 × kg) + (4.799 × cm) − (5.677 × age) + 88.362
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 font-bold text-sm">♀</div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">For Women</p>
                            <p className="font-mono text-sm bg-gray-50 px-3 py-1.5 rounded mt-1 border">
                              BMR = (9.247 × kg) + (3.098 × cm) − (4.330 × age) + 447.593
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Worked example */}
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                      <p className="text-sm font-bold text-orange-800 mb-3">
                        Worked Example — Basal Metabolic Rate Calculation
                      </p>
                      <p className="text-sm text-gray-700 mb-2">
                        30-year-old female · 65 kg · 165 cm (Mifflin-St Jeor):
                      </p>
                      <div className="font-mono text-sm space-y-1 text-gray-600">
                        <p>= (10 × 65) + (6.25 × 165) − (5 × 30) − 161</p>
                        <p>= 650 + 1,031 − 150 − 161</p>
                        <p className="font-bold text-orange-700">= 1,370 kcal/day</p>
                      </div>
                    </div>

                    <p className="text-sm italic text-gray-500 border-t pt-4">
                      The Mifflin-St Jeor formula is considered ~5% more accurate than the original
                      Harris-Benedict for modern populations. Use Katch-McArdle if you know your
                      lean body mass — it's the most accurate for athletes.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* ── BMR FOR MEN ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Dumbbell className="w-6 h-6 text-orange-500" />
                  BMR Calculator for Men — Reference Chart
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Men generally have a higher <strong>basal metabolic rate</strong> than women of the same
                  height and weight due to greater muscle mass and lower essential fat percentage.
                  The table below shows estimated BMR values for men using the Mifflin-St Jeor formula
                  — the most accurate method for <strong>calculating BMR for men</strong>.
                </p>

                <Card className="not-prose overflow-hidden border-orange-200 mb-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[500px]">
                      <thead>
                        <tr className="bg-orange-500 text-white">
                          <th className="px-5 py-3 text-left font-bold sticky top-0 bg-orange-500">Age</th>
                          <th className="px-5 py-3 text-left font-bold sticky top-0 bg-orange-500">70 kg / 175 cm</th>
                          <th className="px-5 py-3 text-left font-bold sticky top-0 bg-orange-500">80 kg / 175 cm</th>
                          <th className="px-5 py-3 text-left font-bold sticky top-0 bg-orange-500">90 kg / 175 cm</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-5 py-3 font-semibold">25</td><td className="px-5 py-3">1,788 kcal</td><td className="px-5 py-3">1,888 kcal</td><td className="px-5 py-3">1,988 kcal</td></tr>
                        <tr className="bg-orange-50/30"><td className="px-5 py-3 font-semibold">35</td><td className="px-5 py-3">1,738 kcal</td><td className="px-5 py-3">1,838 kcal</td><td className="px-5 py-3">1,938 kcal</td></tr>
                        <tr><td className="px-5 py-3 font-semibold">45</td><td className="px-5 py-3">1,688 kcal</td><td className="px-5 py-3">1,788 kcal</td><td className="px-5 py-3">1,888 kcal</td></tr>
                        <tr className="bg-orange-50/30"><td className="px-5 py-3 font-semibold">55</td><td className="px-5 py-3">1,638 kcal</td><td className="px-5 py-3">1,738 kcal</td><td className="px-5 py-3">1,838 kcal</td></tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
                <p className="text-sm text-gray-500 italic">
                  BMR decreases by approximately 50 kcal per decade as muscle mass naturally declines
                  with age. Resistance training is the most effective way to slow this decline.
                </p>
              </section>

              {/* ── BMR FOR WOMEN ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HeartPulse className="w-6 h-6 text-orange-500" />
                  BMR Calculator for Women — Reference Chart
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Women naturally carry higher essential body fat (12–15% vs. 2–5% for men), which is
                  metabolically less active than muscle tissue. This is reflected in the −161 constant
                  in the female Mifflin-St Jeor formula. The table below is your reference for
                  <strong> calculating BMR for women</strong> across common age and weight combinations.
                </p>

                <Card className="not-prose overflow-hidden border-orange-200 mb-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[500px]">
                      <thead>
                        <tr className="bg-orange-500 text-white">
                          <th className="px-5 py-3 text-left font-bold sticky top-0 bg-orange-500">Age</th>
                          <th className="px-5 py-3 text-left font-bold sticky top-0 bg-orange-500">55 kg / 163 cm</th>
                          <th className="px-5 py-3 text-left font-bold sticky top-0 bg-orange-500">65 kg / 163 cm</th>
                          <th className="px-5 py-3 text-left font-bold sticky top-0 bg-orange-500">75 kg / 163 cm</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-5 py-3 font-semibold">25</td><td className="px-5 py-3">1,332 kcal</td><td className="px-5 py-3">1,432 kcal</td><td className="px-5 py-3">1,532 kcal</td></tr>
                        <tr className="bg-orange-50/30"><td className="px-5 py-3 font-semibold">35</td><td className="px-5 py-3">1,282 kcal</td><td className="px-5 py-3">1,382 kcal</td><td className="px-5 py-3">1,482 kcal</td></tr>
                        <tr><td className="px-5 py-3 font-semibold">45</td><td className="px-5 py-3">1,232 kcal</td><td className="px-5 py-3">1,332 kcal</td><td className="px-5 py-3">1,432 kcal</td></tr>
                        <tr className="bg-orange-50/30"><td className="px-5 py-3 font-semibold">55</td><td className="px-5 py-3">1,182 kcal</td><td className="px-5 py-3">1,282 kcal</td><td className="px-5 py-3">1,382 kcal</td></tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
                <p className="mt-3 text-gray-700 font-medium bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                  <strong>Hormonal note:</strong> Pregnancy, menopause, and thyroid conditions can
                  significantly alter actual BMR. Always consult a registered dietitian if your
                  calculated BMR doesn't align with your real-world experience.
                </p>
              </section>

              {/* ── AVERAGE BMR CHART ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-orange-500" />
                  Average BMR — What Is a Normal Metabolic Rate?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Your <strong>average basal metabolic rate</strong> depends on sex, age, height, and body
                  composition. The ranges below represent healthy adults at average height and weight.
                  Use these as a benchmark — not a target.
                </p>

                <Card className="not-prose overflow-hidden border-orange-200 mb-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                      <thead>
                        <tr className="bg-orange-500 text-white">
                          <th className="px-5 py-3 text-left font-bold sticky top-0 bg-orange-500">Group</th>
                          <th className="px-5 py-3 text-left font-bold sticky top-0 bg-orange-500">Average BMR Range</th>
                          <th className="px-5 py-3 text-left font-bold sticky top-0 bg-orange-500">Average TDEE (Moderate Activity)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-5 py-3 font-semibold">Adult Women (20–40)</td><td className="px-5 py-3">1,300–1,600 kcal</td><td className="px-5 py-3">2,000–2,400 kcal</td></tr>
                        <tr className="bg-orange-50/30"><td className="px-5 py-3 font-semibold">Adult Men (20–40)</td><td className="px-5 py-3">1,600–2,000 kcal</td><td className="px-5 py-3">2,400–3,000 kcal</td></tr>
                        <tr><td className="px-5 py-3 font-semibold">Women (40–60)</td><td className="px-5 py-3">1,200–1,500 kcal</td><td className="px-5 py-3">1,850–2,300 kcal</td></tr>
                        <tr className="bg-orange-50/30"><td className="px-5 py-3 font-semibold">Men (40–60)</td><td className="px-5 py-3">1,500–1,900 kcal</td><td className="px-5 py-3">2,300–2,900 kcal</td></tr>
                        <tr><td className="px-5 py-3 font-semibold">Athletes (any sex)</td><td className="px-5 py-3">1,700–2,400+ kcal</td><td className="px-5 py-3">3,000–4,500+ kcal</td></tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-12 mt-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                      <Scale className="text-orange-500 w-5 h-5" /> BMR vs RMR — What's the Difference?
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <strong>BMR</strong> (Basal Metabolic Rate) is measured in a clinically controlled
                      fasted state. <strong>RMR</strong> (Resting Metabolic Rate) is measured under
                      less strict conditions — after light activity, not fully fasted. RMR is typically
                      10–20 kcal higher than BMR. For calculating your <strong>resting metabolic rate</strong>
                      for fat loss planning, the difference is negligible — use either interchangeably.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                      <Dumbbell className="text-orange-500 w-5 h-5" /> Why Muscle Mass Changes Your BMR
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Muscle tissue burns roughly 6 kcal/kg/day at rest; fat tissue burns only 2 kcal/kg/day.
                      Two people of identical weight and height can have BMRs that differ by 200–300 kcal/day
                      based purely on body composition. This is why resistance training is the most powerful
                      long-term lever for <strong>increasing your metabolic rate</strong>.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── BMR TO LOSE WEIGHT ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingDown className="w-6 h-6 text-orange-500" />
                  BMR Calculator to Lose Weight — The TDEE Method
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  BMR alone doesn't tell you how many calories to eat — it tells you the floor.
                  To use a <strong>BMR calculator to lose weight</strong>, you must find your
                  <strong> TDEE (Total Daily Energy Expenditure)</strong> first, then apply a deficit.
                </p>

                <Card className="border-orange-100 shadow-sm rounded-2xl overflow-hidden mb-6">
                  <CardHeader className="bg-orange-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold text-orange-800">
                      <Info className="w-5 h-5" />
                      TDEE Activity Multipliers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 px-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[500px]">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-5 py-3 text-left font-bold text-gray-700 sticky top-0 bg-gray-50">Activity Level</th>
                            <th className="px-5 py-3 text-left font-bold text-gray-700 sticky top-0 bg-gray-50">Multiplier</th>
                            <th className="px-5 py-3 text-left font-bold text-gray-700 sticky top-0 bg-gray-50">Example</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          <tr><td className="px-5 py-3">Sedentary</td><td className="px-5 py-3 font-mono font-semibold text-orange-700">× 1.2</td><td className="px-5 py-3 text-gray-500">Desk job, no gym</td></tr>
                          <tr className="bg-orange-50/20"><td className="px-5 py-3">Lightly active</td><td className="px-5 py-3 font-mono font-semibold text-orange-700">× 1.375</td><td className="px-5 py-3 text-gray-500">1–3 days/week training</td></tr>
                          <tr><td className="px-5 py-3">Moderately active</td><td className="px-5 py-3 font-mono font-semibold text-orange-700">× 1.55</td><td className="px-5 py-3 text-gray-500">3–5 days/week training</td></tr>
                          <tr className="bg-orange-50/20"><td className="px-5 py-3">Very active</td><td className="px-5 py-3 font-mono font-semibold text-orange-700">× 1.725</td><td className="px-5 py-3 text-gray-500">Hard training 6–7 days</td></tr>
                          <tr><td className="px-5 py-3">Extra active</td><td className="px-5 py-3 font-mono font-semibold text-orange-700">× 1.9</td><td className="px-5 py-3 text-gray-500">Physical job + daily training</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {[
                    { step: "1", text: "Calculate your BMR using the calculator above." },
                    { step: "2", text: "Multiply BMR by your activity factor to get your TDEE." },
                    { step: "3", text: "Subtract 300–500 kcal from TDEE for steady, sustainable fat loss." },
                    { step: "4", text: "Never eat below your BMR — that triggers muscle loss and metabolic adaptation." },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 font-bold">{item.step}</div>
                      <p className="text-gray-700 pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-gray-700 font-medium bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                  <strong>Example:</strong> BMR of 1,500 kcal × 1.55 (moderate activity) = TDEE of
                  2,325 kcal. Fat loss target: <strong>1,825–2,025 kcal/day</strong>. At this pace,
                  expect 0.3–0.5 kg of fat loss per week.
                </p>
              </section>

              {/* ── RESTING METABOLIC RATE ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <HeartPulse className="w-6 h-6 text-orange-500" />
                  Resting Metabolic Rate Calculator — Calories Burned at Rest
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Your <strong>resting metabolic rate</strong> (RMR) — sometimes called
                  <strong> resting calorie burn</strong> — is what your body expends just to maintain
                  basic function while at rest (not fully fasted, unlike BMR). For a practical
                  <strong> resting calorie burn calculator</strong>, your BMR result above is the
                  best available estimate.
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  On average, the liver, brain, skeletal muscle, and kidneys together account for
                  over 70% of your total <strong>calories burned at rest</strong>. This is why
                  organ health and muscle mass are the two biggest levers you have over your metabolic rate.
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose mt-4">
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                    <h4 className="font-bold text-orange-700 mb-2">Organs driving resting calorie burn</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {[
                        ["Liver", "~27% of RMR"],
                        ["Brain", "~19% of RMR"],
                        ["Skeletal muscle", "~18% of RMR"],
                        ["Kidneys", "~10% of RMR"],
                        ["Heart", "~7% of RMR"],
                      ].map(([organ, pct]) => (
                        <li key={organ} className="flex justify-between">
                          <span>{organ}</span>
                          <span className="font-semibold text-orange-600">{pct}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                    <h4 className="font-bold text-orange-700 mb-2">Factors that raise your metabolic rate</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {[
                        "Resistance training → more muscle mass",
                        "Higher protein intake → thermic effect",
                        "Cold exposure → thermogenesis",
                        "Adequate sleep → hormone regulation",
                        "NEAT (non-exercise activity)",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* ── METABOLIC AGE ── */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-orange-500" />
                  What Is Metabolic Age?
                </h2>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Metabolic age compares your calculated BMR against the <strong>average metabolic rate</strong>
                  for your chronological age group. If your BMR matches the average for a 28-year-old but you
                  are 38, your metabolic age is 28 — a positive indicator of body composition and fitness.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  While metabolic age is a motivational benchmark and not a clinical diagnosis,
                  it reliably reflects lean muscle preservation, activity levels, and dietary quality.
                  The single most effective way to lower your metabolic age: <strong>build muscle mass
                  through progressive resistance training.</strong>
                </p>
              </section>

              {/* ── RELIABILITY STRIP ── */}
              <section className="bg-white border-2 border-teal-200 rounded-3xl p-8 text-gray-800">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                  <AlertTriangle className="w-6 h-6 text-teal-600" />
                  Common BMR Mistakes — and How to Avoid Them
                </h2>
                <p className="mb-6 opacity-90">
                  These are the errors that quietly derail fat loss progress for most people:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    ["Confusing BMR with total daily calorie needs", "BMR is your floor. Your TDEE — BMR × activity — is your real daily burn."],
                    ["Eating below your BMR", "Sub-BMR eating causes muscle breakdown and metabolic adaptation within weeks."],
                    ["Not recalculating after weight loss", "Lose 10 kg and your BMR drops ~100 kcal. Keep updating your numbers."],
                    ["Ignoring resistance training", "Cardio burns calories today. Muscle raises your BMR permanently."],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex gap-3 bg-white/10 p-4 rounded-xl">
                      <span className="text-red-200 font-bold shrink-0 mt-0.5">✗</span>
                      <div>
                        <p className="font-semibold text-sm mb-1">{title}</p>
                        <p className="text-white/70 text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── USE CASES ── */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-orange-500" />
                  Who Should Use a BMR Calculator?
                </h2>
                <div className="grid md:grid-cols-3 gap-6 not-prose">
                  {[
                    { title: "Fat loss planning", desc: "Build your calorie deficit on real metabolic data, not generic 1,200 kcal targets." },
                    { title: "Muscle building", desc: "Calculate the calorie surplus needed to build muscle without excessive fat gain." },
                    { title: "Nutrition coaching", desc: "Dietitians and PTs use BMR as the starting point for every meal plan they write." },
                    { title: "Medical reference", desc: "Used in clinical settings for calculating feeding rates for tube-fed patients." },
                    { title: "Fitness tracking", desc: "Recalculate every 4–6 weeks as body composition changes to keep targets accurate." },
                    { title: "General curiosity", desc: "Understanding your metabolic rate is the foundation of long-term health literacy." },
                  ].map((item) => (
                    <div key={item.title} className="p-5 border border-gray-100 rounded-2xl bg-white hover:border-orange-300 transition-colors shadow-sm">
                      <h4 className="font-bold text-orange-800 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-gray-700 italic">
                  If you've ever searched "what is my BMR," "how to find my metabolic rate," or
                  "calculate my basal metabolic rate" — this tool is built exactly for you.
                </p>
              </section>

              {/* ── WHO BUILT ── */}
              <section className="text-center pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                  <UserCheck className="w-6 h-6 text-orange-500" />
                  Your BMR is your body's engine size
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Your calorie intake determines whether that engine gains, loses, or maintains.
                  A <strong>BMR calculator</strong> isn't just a number — it's the starting point of
                  every intelligent fat loss, muscle building, or maintenance strategy.
                  Calculate it. Understand it. Revisit it as you change.
                </p>
              </section>

              {/* ── CTA ── */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-white border-2 border-teal-200 rounded-3xl text-gray-800 shadow-xl">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800">Ready to calculate your calorie deficit?</h3>
                    <p className="text-gray-600 max-w-md">
                      Now that you know your BMR, find out exactly how many calories you need
                      to eat to reach your weight loss goals.
                    </p>
                  </div>
                  <Button asChild size="lg" className="whitespace-nowrap bg-teal-600 hover:bg-teal-700 text-white">
                    <Link href="/health/calorie-deficit-calculator">
                      Calorie Deficit Tool <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

            </div>

            {/* ── FAQ ── */}
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
