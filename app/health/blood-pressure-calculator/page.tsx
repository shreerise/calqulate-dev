import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import BloodPressureCalculator from "@/components/calculators/blood-pressure-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"
import { MedicalReviewerSection } from "@/components/seo/medical-reviewer-section"
import { MedicalReviewerSchema } from "@/components/seo/medical-reviewer-schema"
import { Card } from "@/components/ui/card"
import { 
  Heart, 
  Activity, 
  AlertCircle, 
  Stethoscope, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Info, 
  AlertTriangle
} from "lucide-react"

export const metadata: Metadata = {
  title: "Blood Pressure Calculator: Is Your BP Normal? Check Your Risk of Heart Attack",
  description:
    "Use our blood pressure calculator to classify your BP readings into levels like Normal, Elevated, or Hypertension. Learn how age and gender affect your BP.",
  keywords:
    "blood pressure calculator, BP level calculator, normal blood pressure by age, calculate blood pressure, high blood pressure range, systolic and diastolic meaning",
  alternates: {
    canonical: "https://calqulate.net/health/blood-pressure-calculator",
  },
  openGraph: {
    title: "Blood Pressure Calculator: Is Your BP Normal? Check Your Risk of Heart Attack",
    description: "Use our blood pressure calculator to classify your BP readings into levels like Normal, Elevated, or Hypertension. Learn how age and gender affect your BP.",
    url: "https://calqulate.net/health/blood-pressure-calculator",
    siteName: "Calqulate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Pressure Calculator: Is Your BP Normal? Check Your Risk of Heart Attack",
    description: "Use our blood pressure calculator to classify your BP readings into levels like Normal, Elevated, or Hypertension. Learn how age and gender affect your BP.",
  },
}

const faqs = [
  {
    question: "What is a blood pressure calculator?",
    answer:
      "A tool that classifies BP readings into health categories like Normal, Elevated, Stage 1, or Stage 2 Hypertension based on medical standards.",
  },
  {
    question: "How to calculate blood pressure?",
    answer:
      "Blood pressure cannot be calculated from a mathematical formula. It must be measured with a physical device like a digital monitor or manual sphygmomanometer.",
  },
  {
    question: "What is normal blood pressure by age?",
    answer:
      "Average BP rises slightly with age (from 110/70 in your 20s to 130/80 in your 60s), but medical definitions of high BP remain consistent across ages.",
  },
  {
    question: "What is a dangerous BP level?",
    answer:
      "Readings of 180/120 mmHg or higher are considered a hypertensive crisis and require immediate medical attention.",
  },
  {
    question: "Is BP different for men and women?",
    answer:
      "Yes. Women typically have lower baseline BP until menopause, after which risk levels tend to equalize or increase.",
  },
  {
    question: "How often should I check my blood pressure?",
    answer:
      "If your BP is normal, once every 1 to 2 months is usually sufficient. If you are high risk or have hypertension, you may need to check weekly or as advised by your doctor.",
  },
]

export default function BloodPressurePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Blood Pressure Calculator"
        description="Classify your blood pressure readings instantly. Understand systolic and diastolic numbers and identify health risks."
        url="https://calqulate.net/health/blood-pressure-calculator"
      />
      <FAQSchema faqs={faqs} />
      <MedicalReviewerSchema />
      <AuthorSchema />

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
              Blood Pressure Calculator
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl text-pretty">
              This tool classifies your blood pressure measurements using standard medical thresholds. It groups your readings into categories like normal, elevated, or high blood pressure to help you assess your cardiovascular risk.
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

        {/* STATS DASHBOARD */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-5">
            {[
              { value: "5", label: "BP categories" },
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
            <BloodPressureCalculator />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              
              {/* Understanding BP */}
              <section className="py-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Info className="w-6 h-6 text-green-600" />
                  Understanding Blood Pressure Readings
                </h2>
                <p className="mb-6 text-gray-700 leading-relaxed">
                  Blood pressure measures the force of blood against your artery walls as your heart pumps. The reading displays two numbers, written as systolic over diastolic pressure, measured in millimeters of mercury (mmHg).
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 bg-green-50 rounded-2xl border border-green-100">
                    <p className="font-bold text-green-900 mb-1">Systolic Pressure (Top Number)</p>
                    <p className="text-sm text-green-800">
                      This represents the maximum pressure exerted in your arteries when your heart contracts to pump blood to the rest of your body.
                    </p>
                  </div>
                  <div className="p-5 bg-green-50 rounded-2xl border border-green-100">
                    <p className="font-bold text-green-900 mb-1">Diastolic Pressure (Bottom Number)</p>
                    <p className="text-sm text-green-800">
                      This represents the lowest pressure in your arteries when your heart muscle rests between beats to refill with blood.
                    </p>
                  </div>
                </div>
              </section>

              {/* Measurement vs Calculation */}
              <section className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h3 className="text-xl font-bold text-orange-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Why There is No Formula to Calculate Blood Pressure
                </h3>
                <p className="text-sm text-orange-800 font-bold mb-2 uppercase tracking-wide">Measurement vs. Equation:</p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  You cannot calculate blood pressure using a mathematical equation based on age, weight, or height. Unlike body mass index, blood pressure requires physical measurement with a digital monitor or a manual cuff. 
                </p>
                <p className="text-sm text-gray-600 italic">
                  Online tools that claim to calculate blood pressure are actually classification systems. They take your physical measurements and map them to standard clinical guidelines.
                </p>
              </section>

              {/* BP Level Chart */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Blood Pressure Classification Table</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  This classification system is defined by the American Heart Association and the American College of Cardiology. It serves as the foundation for modern clinical assessments.
                </p>
                <Card className="not-prose border-green-200 overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-left font-bold">BP Level</th>
                        <th className="px-6 py-4 text-left font-bold">Systolic (mmHg)</th>
                        <th className="px-6 py-4 text-left font-bold">Diastolic (mmHg)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-medium text-blue-700">Low BP (Hypotension)</td>
                        <td className="px-6 py-4">&lt; 90</td>
                        <td className="px-6 py-4">&lt; 60</td>
                      </tr>
                      <tr className="bg-green-50/50">
                        <td className="px-6 py-4 font-bold text-green-700">Normal</td>
                        <td className="px-6 py-4">90–119</td>
                        <td className="px-6 py-4">60–79</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-amber-600">Elevated</td>
                        <td className="px-6 py-4">120–129</td>
                        <td className="px-6 py-4">&lt; 80</td>
                      </tr>
                      <tr className="bg-orange-50/30">
                        <td className="px-6 py-4 font-medium text-orange-700">Hypertension Stage 1</td>
                        <td className="px-6 py-4">130–139</td>
                        <td className="px-6 py-4">80–89</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-red-600">Hypertension Stage 2</td>
                        <td className="px-6 py-4">≥ 140</td>
                        <td className="px-6 py-4">≥ 90</td>
                      </tr>
                      <tr className="bg-red-600 text-white">
                        <td className="px-6 py-4 font-bold">Hypertensive Crisis</td>
                        <td className="px-6 py-4">≥ 180</td>
                        <td className="px-6 py-4">≥ 120</td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                <p className="mt-4 text-sm text-center text-gray-500 italic">Note: If your systolic and diastolic numbers fall into different categories, the higher category determines your overall classification status.</p>
              </section>

              {/* BP By Age */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-green-600" />
                  Normal Blood Pressure by Age
                </h2>
                <p className="text-gray-700 mb-6">
                  Blood vessels naturally stiffen over time, which often leads to higher average systolic readings as people age. However, the medical definition of high blood pressure does not change with age.
                </p>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <Card className="not-prose border-green-100 overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-green-50 text-green-900">
                        <tr>
                          <th className="px-6 py-3 text-left">Age Group</th>
                          <th className="px-6 py-3 text-left">Typical Healthy BP</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr><td className="px-6 py-3">18–29</td><td className="px-6 py-3 font-bold text-green-700">~110/70</td></tr>
                        <tr><td className="px-6 py-3">30–39</td><td className="px-6 py-3 font-bold text-green-700">~115/75</td></tr>
                        <tr><td className="px-6 py-3">40–49</td><td className="px-6 py-3 font-bold text-green-700">~120/80</td></tr>
                        <tr><td className="px-6 py-3">50–59</td><td className="px-6 py-3 font-bold text-green-700">~125/80</td></tr>
                        <tr><td className="px-6 py-3">60+</td><td className="px-6 py-3 font-bold text-green-700">~130/80</td></tr>
                      </tbody>
                    </table>
                  </Card>
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-800 uppercase tracking-widest text-sm">Understanding These Trends:</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      While your blood pressure might rise slightly as you get older, a reading of 140/90 mmHg remains high-risk for someone who is 65, just as it is for someone who is 30. Stiffened vessels put extra strain on your heart muscle. 
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Monitoring both your pressure and your{" "}
                      <Link
                        href="/health/resting-heart-rate-calculator"
                        className="font-medium text-green-700 hover:underline transition-colors"
                      >
                        resting heart rate
                      </Link>{" "}
                      can provide a more complete view of your cardiovascular adaptation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Gender Differences */}
              <section className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 p-6 border border-gray-100 rounded-3xl bg-white shadow-sm hover:border-green-300 transition-colors">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                    <Users className="text-green-600" /> Statistical Ranges for Men
                  </h3>
                  <p className="text-sm font-bold text-green-700">Ideal: 110–120 / 70–80 mmHg</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Prior to middle age, men statistically develop high blood pressure at higher rates. Lifestyle choices, abdominal fat storage, and tobacco use often accelerate early cardiovascular risks in men.
                  </p>
                </div>
                <div className="space-y-4 p-6 border border-gray-100 rounded-3xl bg-white shadow-sm hover:border-green-300 transition-colors">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                    <Users className="text-green-600" /> Statistical Ranges for Women
                  </h3>
                  <p className="text-sm font-bold text-green-700">Ideal: 105–115 / 65–75 mmHg</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Women often maintain lower average readings than men until menopause. Hormonal shifts during pregnancy or menopause can trigger rapid changes in blood vessel elasticity, making regular checks essential.
                  </p>
                </div>
              </section>

              {/* Silent Killer Note */}
              <section className="bg-red-50 p-8 rounded-3xl border border-red-100">
                <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-red-600" /> High Blood Pressure: The Silent Killer
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="font-bold text-red-800">Stage 1 Range: 130–139 / 80–89</p>
                    <p className="font-bold text-red-800">Stage 2 Range: ≥ 140 / 90</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    High blood pressure rarely causes symptoms in its early stages. Arterial damage occurs quietly over years before complications arise. Unmanaged pressure strains the heart muscle, eventually increasing the risk of stroke or heart attack.
                  </p>
                </div>
              </section>

              {/* How to measure */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                  How to Measure Blood Pressure at Home
                </h2>
                <p className="text-gray-700 mb-6">
                  For the most accurate assessment, physical preparation is key. Temporary factors like stress, physical activity, and caffeine can inflate your readings.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase text-gray-500">Step-by-Step Protocol:</h4>
                    <div className="space-y-3">
                      {[
                        "Rest quietly for five minutes before pressing start.",
                        "Sit in a chair with back support, keeping feet flat on the floor.",
                        "Position your arm on a flat surface so the cuff sits at heart level.",
                        "Avoid caffeine, exercise, and smoking for at least thirty minutes prior.",
                        "Measure twice, keeping a one-minute gap between tests, and average the numbers."
                      ].map((step, i) => (
                        <div key={i} className="flex gap-3 text-sm text-gray-700">
                          <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold shrink-0">{i+1}</span>
                          <p>{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase text-red-500">Common Mistakes to Avoid:</h4>
                    <ul className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">❌ Talking or moving during your test</li>
                      <li className="flex items-center gap-2">❌ Crossing your legs, which temporarily restricts blood flow</li>
                      <li className="flex items-center gap-2">❌ Placing the cuff over thick clothing instead of bare skin</li>
                      <li className="flex items-center gap-2">❌ Measuring immediately after physical exertion or stress</li>
                    </ul>
                    <p className="text-xs text-orange-600 font-medium p-3 bg-orange-50 rounded-lg">
                      Note: These errors can raise your readings artificially by 10 to 20 mmHg, leading to unnecessary anxiety.
                    </p>
                  </div>
                </div>
              </section>

              {/* Trends vs Numbers */}
              <section className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  One-Time Readings vs. Long-Term Trends
                </h3>

                <p className="text-gray-700 leading-relaxed mb-4">
                  A single high reading does not mean you have a chronic condition. Blood pressure fluctuates throughout the day due to stress, digestion, and activity. Diagnosing hypertension requires consistent measurements taken on different days.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you consistently record high readings, tracking metrics like your{" "}
                  <Link
                    href="/health/mean-arterial-pressure-calculator"
                    className="font-medium text-green-700 hover:underline transition-colors"
                  >
                    mean arterial pressure
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="/health/pulse-pressure-calculator"
                    className="font-medium text-green-700 hover:underline transition-colors"
                  >
                    pulse pressure
                  </Link>{" "}
                  can help you and your doctor identify vascular stiffness.
                </p>

                <div className="flex flex-wrap gap-4 mt-6">
                  {[
                    { label: "Age over 35" },
                    { label: "Diabetes Status", href: "/health/diabetes-risk-calculator" },
                    { label: "Elevated BMI", href: "/health/bmi-calculator" },
                    { label: "Family History" },
                    { label: "Poor Sleep Patterns", href: "/health/sleep-debt-calculator" }
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100"
                    >
                      Monitor Regularly:{" "}
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="underline hover:text-green-900 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        item.label
                      )}
                    </span>
                  ))}
                </div>
              </section>

              {/* Heart rate integration */}
              <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-950 mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-slate-600" />
                  Understanding Your Complete Cardiovascular Profile
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  While blood pressure represents the force on your vessel walls, your heart rate measures how hard your heart is working. You can use our general{" "}
                  <Link
                    href="/health/heart-rate-calculator"
                    className="font-medium text-green-700 hover:underline transition-colors"
                  >
                    heart rate calculator
                  </Link>{" "}
                  during physical activity to track how your cardiovascular system recovers from exertion. Combining both metrics offers a more comprehensive perspective on your physical fitness.
                </p>
              </section>

              {/* Final Note */}
              <section className="text-center pt-12 border-t border-gray-100">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Your Heart Health Matters</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  By tracking your blood pressure and understanding what the levels mean, you are taking a proactive step toward a longer, healthier life. Share your saved records with your primary care physician to make informed decisions about your health.
                </p>
              </section>

            </div>

            {/* Structured FAQ UI */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>
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