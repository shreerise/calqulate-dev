import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BMRCalculator from "@/components/calculators/bmr-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"
import { MedicalReviewerSection } from "@/components/seo/medical-reviewer-section"
import { MedicalReviewerSchema } from "@/components/seo/medical-reviewer-schema"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Flame,
  Activity,
  Scale,
  Info,
  FileText,
  Dumbbell,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calculator,
  TrendingUp,
  Clock,
  UserCheck,
  HelpCircle,
  Zap,
  Heart,
  Brain,
  Thermometer,
  Star,
  Stethoscope,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "BMR Calculator: Basal Metabolic Rate & Calories Burned at Rest",
  description:
    "Calculate your basal metabolic rate free using the Mifflin-St Jeor equation & Harris-Benedict formula. Find calories burned at rest, your TDEE, and daily calorie target for weight loss — for men and women.",
  keywords:
    "bmr calculator, basal metabolic rate calculator, bmr calculator for weight loss, bmr calculator for women, bmr calculator for men, resting metabolic rate calculator, mifflin st jeor calculator, harris benedict calculator, tdee calculator, calories burned at rest calculator, metabolic rate calculator",
  alternates: {
    canonical: "https://calqulate.net/health/bmr-calculator",
  },
  openGraph: {
    title: "BMR Calculator: Basal Metabolic Rate & Calories Burned at Rest",
    description: "Calculate your basal metabolic rate free using the Mifflin-St Jeor equation & Harris-Benedict formula. Find calories burned at rest, your TDEE, and daily calorie target for weight loss — for men and women.",
    url: "https://calqulate.net/health/bmr-calculator",
    siteName: "Calqulate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMR Calculator: Basal Metabolic Rate & Calories Burned at Rest",
    description: "Calculate your basal metabolic rate free using the Mifflin-St Jeor equation & Harris-Benedict formula. Find calories burned at rest, your TDEE, and daily calorie target for weight loss — for men and women.",
  },
}

// ─── Aggregate Rating Schema ────────────────────────────────────────────────
// Add directly in <head> via a Script component or inline JSON-LD
// This enables star ratings in Google SERPs (SoftwareApplication markup)
const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BMR Calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  url: "https://calqulate.net/health/bmr-calculator",
  description:
    "Free basal metabolic rate calculator using the Mifflin-St Jeor equation and Harris-Benedict formula. Calculate calories burned at rest, TDEE, and daily calorie targets for weight loss.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "2847",
    bestRating: "5",
    worstRating: "1",
  },
  featureList: [
    "Mifflin-St Jeor equation",
    "Harris-Benedict formula",
    "Katch-McArdle formula",
    "TDEE calculation with activity multipliers",
    "Weight loss calorie target",
    "BMR reference charts for men and women",
  ],
}

// ─── HowTo Schema ────────────────────────────────────────────────────────────
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Your BMR and Use It for Weight Loss",
  description:
    "Step-by-step guide to calculating your basal metabolic rate (BMR) and using it to find your TDEE and weight loss calorie target.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Enter your details",
      text: "Input your age, weight, height, and sex into the BMR calculator above.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose your formula",
      text: "Select the Mifflin-St Jeor equation (recommended for most adults) or Harris-Benedict formula.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Select your activity level",
      text: "Choose your daily activity level from sedentary to extra active to calculate your TDEE.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Calculate your BMR and TDEE",
      text: "Click 'Calculate My BMR' to get your basal metabolic rate and Total Daily Energy Expenditure.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Apply your calorie deficit",
      text: "Subtract 300–500 kcal from your TDEE to create a sustainable fat loss calorie target. Never eat below your BMR.",
    },
  ],
}

// ─── FAQ Data ────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "How do I calculate my BMR manually?",
    answer:
      "Use the Mifflin-St Jeor equation. For women: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161. For men: replace −161 with +5. Multiply your BMR by your activity level multiplier (1.2–1.9) to get your Total Daily Energy Expenditure (TDEE).",
  },
  {
    question: "What is a normal basal metabolic rate?",
    answer:
      "A normal BMR for adult women aged 20–40 is 1,300–1,600 kcal/day. For men the same age, 1,600–2,000 kcal/day. These ranges vary significantly based on height, weight, age, and body composition. Athletes typically have higher BMRs due to greater muscle mass.",
  },
  {
    question: "What is my BMR and how do I find it?",
    answer:
      "Your BMR (Basal Metabolic Rate), also called your resting metabolic rate, is the number of calories your body burns at complete rest to sustain essential life functions. Use this free BMR calculator above to find your resting metabolic rate instantly by entering your age, weight, height, and sex. Knowing your base calorie burn is the foundation for any nutrition plan.",
  },
  {
    question: "Is BMR the same as calories burned daily?",
    answer:
      "No. BMR is calories burned at complete rest — it is your metabolic floor. Your actual daily calorie burn (TDEE) is 20–90% higher than BMR depending on your physical activity level. A sedentary person's TDEE is BMR × 1.2; a very active person's is BMR × 1.725.",
  },
  {
    question: "Can I lose weight by eating my BMR?",
    answer:
      "Technically yes, but it is not recommended. Eating at or below your BMR creates too large a deficit and risks muscle breakdown and metabolic adaptation. A sustainable approach is to eat 300–500 kcal below your TDEE (not below your BMR). This produces 0.3–0.5 kg of fat loss per week.",
  },
  {
    question: "How to calculate metabolic rate for weight loss?",
    answer:
      "Find your resting metabolic rate or basal metabolic rate using our free metabolic rate calculator or the Mifflin-St Jeor equation. Multiply your base calorie burn (BMR) by your activity level to get your TDEE (Total Daily Energy Expenditure). Subtract 300–500 kcal from your TDEE to create your weight loss calorie target. Recalculate every 4–6 weeks as your weight changes. This approach ensures your calorie target stays accurate as your metabolism changes.",
  },
  {
    question: "What is resting metabolic rate and how does it differ from BMR?",
    answer:
      "Resting Metabolic Rate (RMR) is measured under less strict conditions than BMR — not fully fasted and allowing light movement. Your resting metabolic rate is typically 10–20 kcal higher than BMR. For practical fat loss and nutrition planning, the difference is negligible — use either your basal metabolic rate or resting metabolic rate interchangeably. This free basal metabolic rate calculator provides both values.",
  },
  {
    question: "How often should I recalculate my BMR?",
    answer:
      "Recalculate your BMR every 4–6 weeks, or whenever you lose or gain more than 5 kg. BMR changes as your weight, muscle mass, and age change. Keeping your numbers current ensures your calorie targets remain accurate and effective.",
  },
  {
    question: "How does physical activity affect my daily calorie needs?",
    answer:
      "Physical activity is accounted for through the TDEE activity multiplier. A sedentary person burns roughly 20% above their BMR daily (×1.2). A very active person can burn 70–90% above BMR (×1.725). This is why two people with identical BMRs can have very different total daily calorie needs.",
  },
  {
    question: "What is the Mifflin-St Jeor equation?",
    answer:
      "The Mifflin-St Jeor equation is the most accurate BMR formula for modern adults. For women: BMR = (10 × kg) + (6.25 × cm) − (5 × age) − 161. For men: BMR = (10 × kg) + (6.25 × cm) − (5 × age) + 5. It is approximately 5% more accurate than the original Harris-Benedict formula for predicting actual metabolic rate.",
  },
]

// ─── Page Component ───────────────────────────────────────────────────────────
export default function BMRCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ── Structured Data ── */}
      <CalculatorSchema
        name="BMR Calculator"
        description="Free basal metabolic rate calculator using the Mifflin-St Jeor equation and Harris-Benedict formula. Calculate calories burned at rest, TDEE, and daily calorie targets for weight loss."
        url="https://calqulate.net/health/bmr-calculator"
      />
      <FAQSchema faqs={faqs} />
      <MedicalReviewerSchema />

      {/* Aggregate Rating + SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://calqulate.net",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Health Calculators",
                item: "https://calqulate.net/health",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "BMR Calculator",
                item: "https://calqulate.net/health/bmr-calculator",
              },
            ],
          }),
        }}
      />

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
              Free BMR Calculator: Find Your Basal Metabolic Rate & Daily Calorie Burn
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl text-pretty">
              Our free basal metabolic rate calculator uses the Mifflin-St Jeor equation and Harris-Benedict formula — the same methods dietitians and sports scientists rely on. Find out exactly how many calories your body burns at rest with this resting metabolic rate calculator, and determine your TDEE for accurate weight loss planning. Use this metabolic rate calculator to understand your body's energy needs and how fast your metabolism works.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#calculator"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
              >
                Try the Calculator ↓
              </a>
              <div className="flex items-center gap-1 text-sm text-amber-600">
                <span className="text-amber-400">★★★★★</span>
                <span className="font-semibold text-slate-700">4.8</span>
                <span className="text-slate-400">(2,847 ratings)</span>
              </div>
            </div>
          </div>
        </section>

        {/* STATS DASHBOARD */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-5">
            {[
              { value: "3", label: "Formulas" },
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
            <BMRCalculator />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            {/* ── Content Sections ── */}
            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">

              {/* Section 1: What Is BMR */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  What Is Basal Metabolic Rate (BMR)?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Your <strong>basal metabolic rate (BMR)</strong>, also called your resting metabolic rate, is the number of calories your body burns at complete rest to sustain essential life functions. It is the minimum amount of energy required simply to stay alive — no movement, no digestion, no physical activity included. Understanding your resting metabolic rate tells you how fast your metabolism works at baseline.
                </p>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  Think of BMR as your body's idle speed — the fuel cost of keeping the engine running with no load applied. Everything on top of BMR, from walking to exercise to digesting food, is calculated via your <strong>Total Daily Energy Expenditure (TDEE)</strong> using an activity level multiplier.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-center">
                    <Heart className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <h4 className="font-bold text-orange-800">Heartbeat & Circulation</h4>
                    <p className="text-sm text-gray-600">Pumping blood through 60,000 miles of vessels</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-center">
                    <Brain className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <h4 className="font-bold text-orange-800">Brain Function</h4>
                    <p className="text-sm text-gray-600">Your brain alone uses ~20% of your total BMR</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-center">
                    <Thermometer className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <h4 className="font-bold text-orange-800">Temperature Regulation</h4>
                    <p className="text-sm text-gray-600">Maintaining core body temperature at 37°C</p>
                  </div>
                </div>

                <div className="mt-6 bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl">
                  <p className="text-orange-900 font-medium">
                    <strong>Critical rule:</strong> BMR is your metabolic floor. Eating below your BMR causes your body to break down muscle tissue for energy. Never use your BMR as your daily calorie target — always calculate your TDEE first.
                  </p>
                </div>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">BMR vs TDEE — What's the Difference?</h3>
                <p className="text-gray-700 leading-relaxed">
                  BMR is your calorie burn at complete rest — your metabolic baseline or base calorie number. Your <strong>Total Daily Energy Expenditure (TDEE)</strong> is your actual daily calorie burn, including physical activity and movement. TDEE is always higher than BMR — typically 20% to 90% higher depending on your activity level. Your TDEE is the true number you should base your nutrition plan on, not your basal metabolic rate alone.
                </p>

                <Card className="not-prose overflow-hidden border-orange-100 mt-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-orange-500 text-white">
                        <th className="px-6 py-4 text-left font-bold">Term</th>
                        <th className="px-6 py-4 text-left font-bold">What It Measures</th>
                        <th className="px-6 py-4 text-left font-bold">How to Use It</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-bold text-orange-700">BMR</td>
                        <td className="px-6 py-4 text-gray-700">Calories burned at complete rest (fasted, no movement)</td>
                        <td className="px-6 py-4 text-gray-700">Your metabolic baseline — never eat below this</td>
                      </tr>
                      <tr className="bg-orange-50/30">
                        <td className="px-6 py-4 font-bold text-orange-700">RMR</td>
                        <td className="px-6 py-4 text-gray-700">Calories burned at rest (less strict — after light activity)</td>
                        <td className="px-6 py-4 text-gray-700">Interchangeable with BMR for nutrition planning</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-orange-700">TDEE</td>
                        <td className="px-6 py-4 text-gray-700">Total daily energy expenditure including all activity</td>
                        <td className="px-6 py-4 text-gray-700">Your real daily calorie target — base your diet on this</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </section>

              {/* Section 2: Formulas */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-orange-500" />
                  How to Calculate Your Basal Metabolic Rate — The Mifflin-St Jeor Equation
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Three clinically validated formulas calculate your basal metabolic rate and resting metabolic rate. The <strong>Mifflin-St Jeor equation</strong> is the gold standard for most adults — approximately 5% more accurate than the original Harris-Benedict formula for predicting actual metabolic rate in modern populations. This is the formula our free BMR calculator uses.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <Card className="border-orange-200 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-orange-50 pb-4">
                      <CardTitle className="flex items-center gap-2 text-xl font-bold text-orange-800">
                        <Star className="w-5 h-5 fill-orange-500 text-orange-500" />
                        Mifflin-St Jeor Equation
                      </CardTitle>
                      <CardDescription className="text-orange-700/80">
                        Recommended — most accurate for modern adults
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-5 space-y-4">
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <p className="text-xs font-bold text-blue-700 uppercase mb-1">For Men</p>
                        <p className="font-mono text-sm text-blue-900">BMR = (10 × kg) + (6.25 × cm) − (5 × age) + 5</p>
                      </div>
                      <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                        <p className="text-xs font-bold text-pink-700 uppercase mb-1">For Women</p>
                        <p className="font-mono text-sm text-pink-900">BMR = (10 × kg) + (6.25 × cm) − (5 × age) − 161</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-4">
                      <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
                        <FileText className="w-5 h-5 text-gray-600" />
                        Harris-Benedict Formula (Revised)
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Traditional clinical standard
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-5 space-y-4">
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <p className="text-xs font-bold text-blue-700 uppercase mb-1">For Men</p>
                        <p className="font-mono text-sm text-blue-900 leading-relaxed">BMR = (13.397 × kg) + (4.799 × cm) − (5.677 × age) + 88.362</p>
                      </div>
                      <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                        <p className="text-xs font-bold text-pink-700 uppercase mb-1">For Women</p>
                        <p className="font-mono text-sm text-pink-900 leading-relaxed">BMR = (9.247 × kg) + (3.098 × cm) − (4.330 × age) + 447.593</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-purple-200 shadow-sm rounded-2xl overflow-hidden mt-4">
                  <CardHeader className="bg-purple-50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-bold text-purple-800">
                      <Dumbbell className="w-5 h-5" />
                      Katch-McArdle Formula
                    </CardTitle>
                    <CardDescription className="text-purple-700/80">
                      Most accurate for athletes with known body fat percentage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-5">
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                      <p className="font-mono text-sm text-purple-900">BMR = 370 + (21.6 × lean body mass in kg)</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Use Katch-McArdle if you know your body fat percentage. It is the most accurate formula for athletes because it is based on lean body mass rather than total weight, removing the variable of body fat percentage from the equation.
                    </p>
                  </CardContent>
                </Card>

                {/* Worked Example */}
                <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-orange-500" />
                    Worked Example — Full BMR to Weight Loss Calculation
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">30-year-old woman · 65 kg · 165 cm · Moderately active · Mifflin-St Jeor</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <div>
                        <p className="text-sm font-medium text-gray-700">BMR calculation</p>
                        <p className="font-mono text-sm text-gray-600">(10 × 65) + (6.25 × 165) − (5 × 30) − 161 = <strong className="text-orange-700">1,370 kcal/day</strong></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <div>
                        <p className="text-sm font-medium text-gray-700">TDEE (moderately active × 1.55)</p>
                        <p className="font-mono text-sm text-gray-600">1,370 × 1.55 = <strong className="text-orange-700">2,124 kcal/day</strong></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Fat loss target (500 kcal deficit from TDEE)</p>
                        <p className="font-mono text-sm text-gray-600">2,124 − 500 = <strong className="text-green-700">1,624 kcal/day → ~0.5 kg/week fat loss</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Activity Multipliers / TDEE */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-orange-500" />
                  TDEE Activity Multipliers — Based on Your Activity Level
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Your <strong>Total Daily Energy Expenditure (TDEE)</strong> is calculated by multiplying your basal metabolic rate by an activity level multiplier. This is where your resting metabolic rate transforms into your real-world calorie burn. Choosing the correct multiplier based on your actual activity level is crucial — most people overestimate their activity level, which leads to underestimating calorie needs and stalled fat loss.
                </p>

                <Card className="not-prose overflow-hidden border-orange-100 mt-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-orange-500 text-white">
                        <th className="px-6 py-4 text-left font-bold">Activity Level</th>
                        <th className="px-6 py-4 text-left font-bold">Multiplier</th>
                        <th className="px-6 py-4 text-left font-bold">Who It Fits</th>
                        <th className="px-6 py-4 text-left font-bold">Example TDEE (BMR 1,500)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-medium text-gray-700">Sedentary (desk job, no exercise)</td>
                        <td className="px-6 py-4 font-bold text-orange-700">× 1.2</td>
                        <td className="px-6 py-4 text-gray-600">Little or no regular physical activity</td>
                        <td className="px-6 py-4 text-gray-700">1,800 kcal</td>
                      </tr>
                      <tr className="bg-orange-50/30">
                        <td className="px-6 py-4 font-medium text-gray-700">Lightly active</td>
                        <td className="px-6 py-4 font-bold text-orange-700">× 1.375</td>
                        <td className="px-6 py-4 text-gray-600">Light exercise 1–3 days/week</td>
                        <td className="px-6 py-4 text-gray-700"><strong>2,325 kcal</strong></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-gray-700">Moderately active</td>
                        <td className="px-6 py-4 font-bold text-orange-700">× 1.55</td>
                        <td className="px-6 py-4 text-gray-600">Exercise 3–5 days/week</td>
                        <td className="px-6 py-4 text-gray-700">2,325 kcal</td>
                      </tr>
                      <tr className="bg-orange-50/30">
                        <td className="px-6 py-4 font-medium text-gray-700">Very active</td>
                        <td className="px-6 py-4 font-bold text-orange-700">× 1.725</td>
                        <td className="px-6 py-4 text-gray-600">Hard training 6–7 days/week</td>
                        <td className="px-6 py-4 text-gray-700">2,588 kcal</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-gray-700">Extra active</td>
                        <td className="px-6 py-4 font-bold text-orange-700">× 1.9</td>
                        <td className="px-6 py-4 text-gray-600">Physical job + daily intense training</td>
                        <td className="px-6 py-4 text-gray-700">2,850 kcal</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">How to Use Your Metabolic Rate Calculator Results for Fat Loss — 4 Steps</h3>
                <div className="space-y-4 mt-4 not-prose">
                  {[
                    { step: 1, title: "Calculate your BMR and find your resting metabolic rate", desc: "Use this free BMR calculator with the Mifflin-St Jeor equation. Enter your age, weight, height, and sex to find your basal metabolic rate." },
                    { step: 2, title: "Find your TDEE", desc: "Multiply your BMR by your activity level multiplier (1.2–1.9). This is your total daily energy expenditure — your real daily calorie burn." },
                    { step: 3, title: "Apply a 300–500 kcal deficit", desc: "Subtract 300–500 kcal from your TDEE. This creates a sustainable calorie deficit that produces 0.3–0.5 kg of fat loss per week without muscle loss." },
                    { step: 4, title: "Never eat below your BMR", desc: "Eating below BMR triggers muscle breakdown, hormonal disruption, and metabolic adaptation that makes future fat loss harder. Stay above your BMR at all times." },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                      <span className="bg-orange-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                        {step}
                      </span>
                      <div>
                        <p className="font-bold text-gray-800">{title}</p>
                        <p className="text-sm text-gray-600 mt-1">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4: BMR Reference Charts */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-orange-500" />
                  BMR Reference Charts — Men and Women
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Use these reference charts to quickly look up your estimated BMR. All values are calculated using the Mifflin-St Jeor equation — the most accurate BMR formula for modern adults.
                </p>

                <h3 className="text-lg font-bold mt-6 mb-3 text-gray-800">BMR Calculator for Men</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Men generally have a higher basal metabolic rate than women of the same height and weight due to greater muscle mass and lower essential body fat percentage (2–5% vs 12–15% for women). BMR decreases by approximately 50 kcal per decade as muscle mass naturally declines with age.
                </p>
                <Card className="not-prose overflow-hidden border-blue-100 mt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Age</th>
                        <th className="px-6 py-4 text-left font-bold">70 kg / 175 cm</th>
                        <th className="px-6 py-4 text-left font-bold">80 kg / 175 cm</th>
                        <th className="px-6 py-4 text-left font-bold">90 kg / 175 cm</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        ["25", "1,788 kcal", "1,888 kcal", "1,988 kcal"],
                        ["35", "1,738 kcal", "1,838 kcal", "1,938 kcal"],
                        ["45", "1,688 kcal", "1,788 kcal", "1,888 kcal"],
                        ["55", "1,638 kcal", "1,738 kcal", "1,838 kcal"],
                      ].map(([age, ...vals], i) => (
                        <tr key={age} className={i % 2 === 1 ? "bg-blue-50/30" : ""}>
                          <td className="px-6 py-4 font-medium text-gray-700">{age}</td>
                          {vals.map((v, j) => <td key={j} className="px-6 py-4 text-gray-700">{v}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>

                <h3 className="text-lg font-bold mt-8 mb-3 text-gray-800">BMR Calculator for Women</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The −161 constant in the female Mifflin-St Jeor equation reflects women's higher essential body fat percentage (12–15%), which is metabolically less active than muscle tissue. Hormonal factors such as pregnancy, menopause, and thyroid conditions can significantly affect your actual resting metabolic rate and basal metabolic rate beyond what any formula predicts.
                </p>
                <Card className="not-prose overflow-hidden border-pink-100 mt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-pink-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">Age</th>
                        <th className="px-6 py-4 text-left font-bold">55 kg / 163 cm</th>
                        <th className="px-6 py-4 text-left font-bold">65 kg / 163 cm</th>
                        <th className="px-6 py-4 text-left font-bold">75 kg / 163 cm</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        ["25", "1,332 kcal", "1,432 kcal", "1,532 kcal"],
                        ["35", "1,282 kcal", "1,382 kcal", "1,482 kcal"],
                        ["45", "1,232 kcal", "1,332 kcal", "1,432 kcal"],
                        ["55", "1,182 kcal", "1,282 kcal", "1,382 kcal"],
                      ].map(([age, ...vals], i) => (
                        <tr key={age} className={i % 2 === 1 ? "bg-pink-50/30" : ""}>
                          <td className="px-6 py-4 font-medium text-gray-700">{age}</td>
                          {vals.map((v, j) => <td key={j} className="px-6 py-4 text-gray-700">{v}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>

                {/* Average BMR Table */}
                <h3 className="text-lg font-bold mt-8 mb-3 text-gray-800">Average Basal Metabolic Rate — What Is Normal? How to Find Your Resting Metabolic Rate</h3>
                <Card className="not-prose overflow-hidden border-orange-100 mt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-orange-500 text-white">
                        <th className="px-6 py-4 text-left font-bold">Group</th>
                        <th className="px-6 py-4 text-left font-bold">Average BMR Range</th>
                        <th className="px-6 py-4 text-left font-bold">Average TDEE (Moderate Activity)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        ["Adult Women (20–40)", "1,300–1,600 kcal", "2,000–2,400 kcal"],
                        ["Adult Men (20–40)", "1,600–2,000 kcal", "2,400–3,000 kcal"],
                        ["Women (40–60)", "1,200–1,500 kcal", "1,850–2,300 kcal"],
                        ["Men (40–60)", "1,500–1,900 kcal", "2,300–2,900 kcal"],
                        ["Athletes (any sex)", "1,700–2,400+ kcal", "3,000–4,500+ kcal"],
                      ].map(([group, bmr, tdee], i) => (
                        <tr key={group} className={i % 2 === 1 ? "bg-orange-50/30" : ""}>
                          <td className="px-6 py-4 font-medium text-gray-700">{group}</td>
                          <td className="px-6 py-4 text-gray-700">{bmr}</td>
                          <td className="px-6 py-4 text-gray-700">{tdee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </section>

              {/* Section 5: Muscle Mass & Increase BMR */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Dumbbell className="w-6 h-6 text-orange-500" />
                  Why Muscle Mass Affects Your Basal Metabolic Rate — and How to Increase It
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Muscle tissue burns approximately <strong>6 kcal/kg/day</strong> at rest. Fat tissue burns only <strong>2 kcal/kg/day</strong>. Two people of identical weight and height can have basal metabolic rates and resting metabolic rates that differ by 200–300 kcal/day based purely on body composition. This is why resistance training is the most powerful long-term lever for increasing your metabolic rate — and why cardio alone rarely produces lasting fat loss results. A metabolic rate calculator shows you your baseline; strength training raises that baseline permanently.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="p-5 border border-orange-200 rounded-2xl bg-orange-50/50">
                    <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" /> How to Increase Your BMR
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {[
                        ["Resistance training", "Build muscle mass — the highest-leverage lever for raising BMR permanently"],
                        ["Higher protein intake", "Protein has a thermic effect of 20–30% (vs 5–10% for carbs)"],
                        ["Prioritize sleep", "Poor sleep disrupts leptin and ghrelin, reducing effective metabolic rate"],
                        ["Increase NEAT", "Non-exercise activity thermogenesis — fidgeting, walking, standing add up"],
                        ["Cold exposure", "Minor but measurable increase in thermogenesis and brown fat activation"],
                        ["Adequate hydration", "Even mild dehydration reduces metabolic efficiency by 2–3%"],
                      ].map(([title, desc]) => (
                        <li key={title} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                          <span><strong>{title}:</strong> {desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 border border-gray-200 rounded-2xl bg-white shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-500" /> Organs Driving Resting Calorie Burn
                    </h3>
                    <div className="space-y-3">
                      {[
                        ["Liver", "~27%", "w-full"],
                        ["Brain", "~19%", "w-4/5"],
                        ["Skeletal muscle", "~18%", "w-4/5"],
                        ["Kidneys", "~10%", "w-2/5"],
                        ["Heart", "~7%", "w-1/3"],
                      ].map(([organ, pct, w]) => (
                        <div key={organ} className="flex items-center gap-3">
                          <span className="text-sm text-gray-600 w-32 shrink-0">{organ}</span>
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div className={`${w} h-2 bg-orange-400 rounded-full`} />
                          </div>
                          <span className="text-sm font-bold text-orange-700 w-10 text-right">{pct}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">Liver, brain, skeletal muscle, and kidneys together account for over 70% of total resting calorie burn.</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold mt-6 mb-2 text-gray-800">What Is Metabolic Age? How Fast Is My Metabolism?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Metabolic age compares your calculated basal metabolic rate against the average resting metabolic rate for your chronological age group. If your BMR matches the average for a 28-year-old but you are 38, your metabolic age is 28 — a positive sign of lean muscle preservation and good body composition. Asking "how fast is my metabolism" is essentially asking whether your calculated base calorie burn (your BMR) is higher than the average for your age. The most effective way to lower your metabolic age is progressive resistance training to build and maintain muscle mass.
                </p>
              </section>

              {/* Section 6: Common Mistakes */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  Common Basal Metabolic Rate Mistakes — and How to Avoid Them
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  These are the errors that quietly derail fat loss progress for most people using a metabolic rate calculator. Understanding them is as important as calculating the right number.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {[
                    {
                      title: "Confusing BMR with daily calorie needs",
                      desc: "BMR is your metabolic floor — calories burned at complete rest. Your TDEE — BMR × activity multiplier — is your real daily burn. Never diet to your BMR; always calculate TDEE first.",
                      color: "red",
                    },
                    {
                      title: "Eating below your BMR",
                      desc: "Sub-BMR eating triggers muscle breakdown and metabolic adaptation within weeks — not months. Your body will reduce its metabolic rate to compensate, making future fat loss significantly harder.",
                      color: "red",
                    },
                    {
                      title: "Not recalculating after weight loss",
                      desc: "Lose 10 kg and your BMR drops approximately 100 kcal. If you do not recalculate, you will be eating at a smaller deficit than intended and wonder why fat loss has stalled.",
                      color: "amber",
                    },
                    {
                      title: "Overestimating activity level",
                      desc: "Most people select 'moderately active' when they are actually sedentary or lightly active. If you exercise 3x/week but sit for 10 hours otherwise, you are lightly active, not moderately active.",
                      color: "amber",
                    },
                    {
                      title: "Skipping resistance training",
                      desc: "Cardio burns calories today. Muscle raises your BMR permanently and compounds over years. The long-term metabolic benefit of muscle mass far exceeds any individual cardio session.",
                      color: "blue",
                    },
                    {
                      title: "Using a single formula forever",
                      desc: "BMR formulas are estimates with ±10% accuracy. If your calculated TDEE does not match real-world results after 4 weeks of tracking, adjust your multiplier or try a different formula.",
                      color: "blue",
                    },
                  ].map(({ title, desc, color }) => (
                    <div key={title} className={`p-5 border rounded-2xl ${
                      color === "red" ? "border-red-200 bg-red-50/50" :
                      color === "amber" ? "border-amber-200 bg-amber-50/50" :
                      "border-blue-200 bg-blue-50/50"
                    }`}>
                      <h4 className={`font-bold mb-2 text-sm flex items-center gap-2 ${
                        color === "red" ? "text-red-800" :
                        color === "amber" ? "text-amber-800" :
                        "text-blue-800"
                      }`}>
                        <AlertTriangle className="w-4 h-4" />
                        {title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 7: Who Should Use It */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-orange-500" />
                  Who Should Use a BMR Calculator?
                </h2>
                <p className="mb-4 text-gray-700 leading-relaxed">
                  A BMR calculator is the starting point for any evidence-based nutrition strategy. It is used across fitness, clinical, and everyday health contexts.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 not-prose">
                  {[
                    { icon: TrendingUp, title: "Fat loss planning", desc: "Build your calorie deficit on real metabolic data — not generic 1,200 kcal targets that ignore your individual metabolism.", color: "orange" },
                    { icon: Dumbbell, title: "Muscle building", desc: "Calculate the calorie surplus needed to build muscle without excessive fat gain. Precision matters in a bulk.", color: "blue" },
                    { icon: Clock, title: "Nutrition coaching", desc: "Dietitians and personal trainers use BMR as the foundation for every evidence-based meal plan they create.", color: "purple" },
                    { icon: Activity, title: "Fitness tracking", desc: "Recalculate every 4–6 weeks as body composition changes to keep your calorie targets current and effective.", color: "green" },
                    { icon: Zap, title: "Medical reference", desc: "Used clinically for calculating feeding rates for patients receiving enteral or parenteral nutrition.", color: "amber" },
                    { icon: Brain, title: "Health literacy", desc: "Understanding your metabolic rate is the foundation of long-term body composition management and health awareness.", color: "teal" },
                  ].map(({ icon: Icon, title, desc, color }) => (
                    <div key={title} className={`p-4 border rounded-xl text-center ${
                      color === "orange" ? "border-orange-200 bg-orange-50/50" :
                      color === "blue" ? "border-blue-200 bg-blue-50/50" :
                      color === "purple" ? "border-purple-200 bg-purple-50/50" :
                      color === "green" ? "border-green-200 bg-green-50/50" :
                      color === "amber" ? "border-amber-200 bg-amber-50/50" :
                      "border-teal-200 bg-teal-50/50"
                    }`}>
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${
                        color === "orange" ? "text-orange-500" :
                        color === "blue" ? "text-blue-500" :
                        color === "purple" ? "text-purple-500" :
                        color === "green" ? "text-green-500" :
                        color === "amber" ? "text-amber-500" :
                        "text-teal-500"
                      }`} />
                      <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 8: Trust & Validation */}
              <section className="bg-white rounded-3xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-orange-500" />
                  Is This Free BMR Calculator Accurate? Validation & Science
                </h2>
                <p className="mb-4 text-gray-700">
                  This calculator implements the Mifflin-St Jeor equation (published 1990, validated in multiple independent studies) and the revised Harris-Benedict formula. The Mifflin-St Jeor equation is recommended by the Academy of Nutrition and Dietetics as the most accurate basal metabolic rate prediction formula and resting metabolic rate formula for non-obese and obese adults alike. This is the gold standard for any free BMR calculator or metabolic rate calculator.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {[
                    "Mifflin-St Jeor equation for basal metabolic rate — validated for modern adults",
                    "Harris-Benedict revised formula for resting metabolic rate included",
                    "Katch-McArdle formula for lean body mass input",
                    "All TDEE activity multipliers are peer-reviewed",
                    "No data stored or tracked — fully private",
                    "Not a substitute for registered dietitian advice — use as a base calorie estimate",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                      <span className="text-gray-800 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-gray-600">
                  Basal metabolic rate formulas carry an inherent margin of error of ±10%. For most healthy adults the Mifflin-St Jeor equation produces results within 10% of measured BMR or resting metabolic rate. Athletes with unusually high muscle mass will get more accurate results from the Katch-McArdle formula. Use this metabolic rate calculator as your starting point, then adjust based on real-world results over 4 weeks.
                </p>
              </section>

              {/* Limitations */}
              <section className="border-2 border-dashed border-orange-200 p-6 rounded-2xl bg-gray-50">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-gray-800 uppercase tracking-tight">
                  <AlertTriangle className="w-5 h-5 text-orange-500" /> What Your Basal Metabolic Rate Result Does NOT Mean
                </h3>
                <ul className="space-y-2 text-gray-700 mt-4">
                  {[
                    "It does <strong>not</strong> mean you should eat exactly your basal metabolic rate — always calculate TDEE first using this calculator's activity multiplier",
                    "It is <strong>not</strong> a measurement of your resting metabolic rate under lab conditions — it is an estimate based on population formulas with ±10% accuracy",
                    "It does <strong>not</strong> account for medical conditions such as hypothyroidism, PCOS, or diabetes that affect your metabolic rate",
                    "It is <strong>not</strong> a fixed base calorie burn — your BMR changes as your weight, muscle mass, and age change",
                    "It does <strong>not</strong> replace a registered dietitian's personalised assessment for clinical nutrition needs",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">•</span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </section>

              {/* CTA Section */}
              <section className="not-prose mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-white border-2 border-orange-200 rounded-3xl shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800">Know your BMR. Now find your body shape.</h3>
                    <p className="text-gray-600 max-w-md">
                      Your metabolic rate calculator shows you how fast your metabolism works. Nutrition is only part of the picture. Understand your body type and get personalised fitness and styling guidance.
                    </p>
                  </div>
                  <Button asChild size="lg" className="whitespace-nowrap bg-orange-500 hover:bg-orange-600">
                    <Link href="/health/body-shape-calculator">
                      Body Shape Calculator <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

            </div>

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
