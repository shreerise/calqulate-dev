import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import AscvdRiskCalculator from "@/components/calculators/ascvd-risk-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { 
  Heart, 
  Stethoscope, 
  ShieldCheck, 
  Info, 
  Activity, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  ClipboardList,
  Target,
  Users
} from "lucide-react"

export const metadata: Metadata = {
  title: "ASCVD Risk Calculator: 10-Year Cardiovascular Score & PCE Guide",
  description:
    "Calculate your 10-year risk of heart disease or stroke. Our ASCVD score calculator uses the Pooled Cohort Equation (PCE) and modern PREVENT guidelines for accurate prediction.",
  keywords:
    "ascvd risk calculator, ascvd calculator, cardiac risk calculator, cardiovascular risk calculator, pooled cohort equation, ascvd score, mdcalc ascvd, 10 year cardiovascular risk calculator, ascvd score calculator",
}

const faqs = [
  {
    question: "How accurate is the ASCVD risk calculator?",
    answer:
      "The ascvd risk calculator is based on the Pooled Cohort Equations, which were derived from large-scale U.S. population studies. While it is highly accurate for predicting risk across broad populations, it is an estimate. Individual factors like genetics or specific 'risk enhancers' (like chronic kidney disease) can adjust your real-world risk.",
  },
  {
    question: "What is the difference between the 10-year and lifetime ascvd score?",
    answer:
      "A 10-year cardiovascular risk calculator focuses on your immediate risk of a major event (heart attack/stroke) within a decade. This is primarily used for people aged 40-79. Lifetime risk assessments are more useful for younger adults (aged 20-59) to understand how their current lifestyle will impact them decades down the line.",
  },
  {
    question: "Why does the mdcalc ascvd tool ask for race?",
    answer:
      "The original 2013 Pooled Cohort Equation included race because historical data showed different risk profiles for White and African American populations in the U.S. However, modern medicine is moving toward the PREVENT score, which is race-free, as researchers have found that social and environmental factors are more predictive than biological race.",
  },
  {
    question: "At what ascvd score should I start taking a statin?",
    answer:
      "Generally, an ascvd score of 7.5% or higher is the threshold where doctors begin discussing statin therapy. However, for those with a score between 5% and 7.5% (borderline risk), a doctor may still recommend a statin if 'risk enhancers' like a family history of heart disease are present.",
  },
]

export default function AscvdRiskPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <CalculatorSchema
        name="ASCVD Risk Calculator"
        description="Clinically validated 10-year cardiovascular risk calculator using the Pooled Cohort Equation (PCE)."
        url="https://calqulate.net/health/ascvd-risk-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Editorial Header */}
        <header className="mb-16 border-b border-slate-100 pb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            ASCVD Risk Calculator: <span className="text-red-600">The Heart Math.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            Heart attacks and strokes aren't just random events. They are the result of decades of cumulative pressure. 
            Our <b>ascvd calculator</b> uses the industry-standard <b><a href="/health/pulse-pressure-calculator" className="no-underline hover:underline hover:text-blue-700">Pooled Cohort Equation</a></b> to turn your 
            clinical data into a 10-year survival prediction.
          </p>
        </header>

        {/* Calculator UI */}
        <div className="mb-20">
          <AscvdRiskCalculator />
        </div>

        {/* Deep Dive Content Section */}
        <article className="space-y-20">
          
          {/* Section 1: The Core Science */}
          <section>
            <div className="flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-sm mb-4">
              <Activity className="w-4 h-4" /> The Science of Prevention
            </div>
            <h2 className="text-3xl font-bold mb-6">What is the Pooled Cohort Equation (PCE)?</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="text-slate-700 leading-relaxed space-y-4">
                <p>
                  Most medical professionals use the <b>mdcalc ascvd</b> logic, which relies on the <b>Pooled Cohort Equation</b>. 
                  Introduced in 2013 by the American College of Cardiology (ACC), this formula was a breakthrough. 
                  It was the first time a <b>cardiac risk calculator</b> accounted specifically for both heart attack 
                  and stroke risk across diverse populations.
                </p>
                <p>
                  The "Pooled" part of the name comes from the fact that researchers combined data from 
                  multiple massive studies (like the <a href="/health/framingham-risk-score-calculator" className     ="text-blue-600 underline">Framingham Heart Study</a> and the ARIC study) to create 
                  a statistical model that accurately reflects the modern U.S. population.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="font-bold mb-4 flex items-center gap-2"><Target className="w-5 h-5" /> Key Inputs for Accuracy:</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-600" /> <b>Age:</b> The single biggest weight in the formula.</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-600" /> <b>Lipids:</b> The ratio of Total Cholesterol to HDL.</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-600" /> <b>BP:</b> Systolic pressure and treatment status.</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-600" /> <b>Diabetes:</b> Significantly doubles or triples risk weight.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Deciphering the Score */}
          <section className="bg-slate-900 text-white p-10 rounded-3xl">
            <h2 className="text-3xl font-bold mb-8">Deciphering Your ASCVD Score</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="text-green-400 font-bold text-2xl">0% - 4.9%</div>
                <div className="font-bold">Low Risk</div>
                <p className="text-xs text-slate-400">Maintain lifestyle. Medication is rarely indicated unless specific conditions exist.</p>
              </div>
              <div className="space-y-2">
                <div className="text-blue-400 font-bold text-2xl">5.0% - 7.4%</div>
                <div className="font-bold">Borderline Risk</div>
                <p className="text-xs text-slate-400">A &quot;gray zone.&quot; Doctors look for risk enhancers like family history to decide on statins.</p>
              </div>
              <div className="space-y-2">
                <div className="text-orange-400 font-bold text-2xl">7.5% - 19.9%</div>
                <div className="font-bold">Intermediate Risk</div>
                <p className="text-xs text-slate-400">The threshold for moderate-intensity statins. High focus on LDL reduction.</p>
              </div>
              <div className="space-y-2">
                <div className="text-red-500 font-bold text-2xl">20% +</div>
                <div className="font-bold">High Risk</div>
                <p className="text-xs text-slate-400">Aggressive intervention required. High-intensity statins are standard.</p>
              </div>
            </div>
          </section>

          {/* Section 3: The Race-Free Revolution */}
          <section>
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-6">The PREVENT Score: The Future of Cardiac Prediction</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                As of 2023, the American Heart Association has moved toward the PREVENT™ equations. 
                If you are using a 10 year cardiovascular risk calculator, you should know about this shift. 
                PREVENT is unique because it is the first major <b>ascvd score calculator</b> that is completely race-free.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <Scale className="w-10 h-10 text-slate-400 shrink-0" />
                  <div>
                    <h4 className="font-bold">Biological vs. Social Factors</h4>
                    <p className="text-sm text-slate-600">Research shows that using race in medical formulas can lead to biased care. PREVENT focuses on health metrics and social deprivation indices instead.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <ShieldCheck className="w-10 h-10 text-slate-400 shrink-0" />
                  <div>
                    <h4 className="font-bold">Kidney Function Inclusion</h4>
                    <p className="text-sm text-slate-600">Unlike the old PCE, PREVENT includes eGFR and UACR (kidney filters) because heart health and kidney health are inseparable.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Risk Enhancers (The Hidden Factors) */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The &quot;Risk Enhancers&quot;: When the Calculator Isn't Enough</h2>
            <p className="text-slate-700 mb-8">
              Sometimes your <b>ascvd score</b> is low, but your clinical risk is high. Doctors use &quot;Risk Enhancers&quot; 
              to tip the scale toward treatment. If you have any of the following, your real risk may be higher than what the <b>cardiovascular risk calculator</b> shows:
            </p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4 text-orange-500" /> Family history of premature heart attack.</li>
                <li className="flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4 text-orange-500" /> Persistent high LDL (160–189 mg/dL).</li>
                <li className="flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4 text-orange-500" /> Chronic Inflammatory diseases (Lupus, RA, Psoriasis).</li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4 text-orange-500" /> High Triglycerides (≥175 mg/dL).</li>
                <li className="flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4 text-orange-500" /> High hs-CRP (C-reactive protein ≥2.0 mg/L).</li>
                <li className="flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4 text-orange-500" /> South Asian ancestry (higher genetic predisposition).</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Statin Guide */}
          <section className="border-t border-slate-100 pt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Standard Treatment Pathways</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-red-50 rounded-3xl">
                <h3 className="text-xl font-bold text-red-900 mb-4">Moderate-Intensity Statins</h3>
                <p className="text-sm text-red-800/80 mb-6">Goal: Reduce LDL by 30% to 49%.</p>
                <div className="space-y-2 text-sm font-medium">
                  <div className="bg-white p-3 rounded-lg">Atorvastatin 10–20 mg</div>
                  <div className="bg-white p-3 rounded-lg">Rosuvastatin 5–10 mg</div>
                  <div className="bg-white p-3 rounded-lg">Simvastatin 20–40 mg</div>
                </div>
              </div>
              <div className="p-8 bg-red-900 rounded-3xl text-white">
                <h3 className="text-xl font-bold mb-4">High-Intensity Statins</h3>
                <p className="text-sm text-red-100/80 mb-6">Goal: Reduce LDL by ≥ 50%.</p>
                <div className="space-y-2 text-sm font-medium text-slate-900">
                  <div className="bg-white p-3 rounded-lg">Atorvastatin 40–80 mg</div>
                  <div className="bg-white p-3 rounded-lg">Rosuvastatin 20–40 mg</div>
                </div>
              </div>
            </div>
          </section>

          {/* Summary / Educational Checklist */}
          <section className="bg-slate-50 p-10 rounded-3xl text-center">
            <h2 className="text-2xl font-bold mb-4">Knowledge is the Best Medicine</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              Predicting your 10-year risk is the start of a clinical conversation. Whether you are using the 
              <b> ascvd score calculator</b> for a personal check-up or medical rounds, remember that 
              prevention is most effective when started early.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-sm font-bold"><Users className="w-4 h-4 text-slate-400" /> Validated for Ages 40-79</div>
              <div className="flex items-center gap-2 text-sm font-bold"><ShieldCheck className="w-4 h-4 text-slate-400" /> Privacy Protected</div>
              <div className="flex items-center gap-2 text-sm font-bold"><Info className="w-4 h-4 text-slate-400" /> AHA/ACC Compliant</div>
            </div>
          </section>

        </article>

        {/* Structured FAQ Section */}
        <div className="mt-20">
          <FAQSection faqs={faqs} />
        </div>
      </main>

      <Footer />
    </div>
  )
}