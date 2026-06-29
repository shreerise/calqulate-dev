import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AlertTriangle, Stethoscope, Calculator, Pill, Ambulance, Scale, RefreshCw, UserCheck, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | Calqulate.net",
  description:
    "Calqulate.net is educational decision-support, not medical, legal, or financial advice. Read how to use our calculators and the Calqulate Vitals service safely.",
  keywords: "disclaimer, medical disclaimer, not medical advice, Calqulate",
  alternates: { canonical: "https://calqulate.net/disclaimer" },
};

const UPDATED = "June 2026";

const nav = [
  { id: "not-medical-advice", label: "Not medical advice" },
  { id: "how-it-works", label: "How calculators work" },
  { id: "glp1", label: "GLP-1 medications" },
  { id: "emergency", label: "In an emergency" },
  { id: "not-financial", label: "Not financial advice" },
  { id: "accuracy", label: "Accuracy" },
  { id: "your-responsibility", label: "Your responsibility" },
];

const sections = [
  {
    id: "not-medical-advice",
    icon: Stethoscope,
    title: "Not medical advice",
    first: true,
    content: (
      <p className="text-gray-600 leading-relaxed">
        Every result on Calqulate.net, from the Metabolic Health Score to heart age, the Longevity Index, the Future
        You simulation, and the GLP-1 plan, is an estimate built from published models. These tools cannot examine
        you, read your full history, or account for everything a clinician would. Use the numbers to ask better
        questions, not to replace a diagnosis.
      </p>
    ),
  },
  {
    id: "how-it-works",
    icon: Calculator,
    title: "How the calculators work, and their limits",
    content: (
      <p className="text-gray-600 leading-relaxed">
        We use validated models such as the Pooled Cohort Equations, the Framingham risk score, and FINDRISC. These
        were developed on specific populations and have known limits. A risk percentage is a population estimate, not
        a prediction about you personally. Lab values, blood pressure readings, and body measurements all vary day to
        day, so a single result can mislead. Tracking the trend gives a clearer picture than any one number.
      </p>
    ),
  },
  {
    id: "glp1",
    icon: Pill,
    title: "GLP-1 medications",
    content: (
      <>
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 mb-5">
          <p className="text-sm text-amber-900 leading-relaxed">
            <strong>Safety first.</strong> The GLP-1 dose calculator and Autopilot organize standard dose schedules.
            Always confirm every dose with your prescriber and check the units against your own vial.
          </p>
        </div>
        <p className="text-gray-600 leading-relaxed">
          The GLP-1 dose calculator and the Autopilot protocol organize standard, publicly available dose schedules.
          They do not set your dose. Compounded products can differ in concentration, and your prescriber decides what
          is right for you based on your health. Confirm every dose and every change with the clinician who prescribed
          it, and check the units against your own vial before you draw anything.
        </p>
      </>
    ),
  },
  {
    id: "emergency",
    icon: Ambulance,
    title: "In an emergency",
    content: (
      <div className="rounded-xl border-l-4 border-red-400 bg-red-50 p-4">
        <p className="text-sm text-red-900 leading-relaxed">
          <strong>Do not use this site for emergencies.</strong> If you have chest pain, trouble breathing, signs of a stroke, very high
          or very low blood sugar, or any symptom that worries you, call your local emergency number or go to the
          nearest emergency department.
        </p>
      </div>
    ),
  },
  {
    id: "not-financial",
    icon: Scale,
    title: "Not financial or legal advice",
    content: (
      <p className="text-gray-600 leading-relaxed">
        Nothing here is financial or legal advice. Pricing and subscription details on the{" "}
        <Link href="/pricing" className="text-emerald-700 font-semibold hover:underline">pricing page</Link> are for the service only.
      </p>
    ),
  },
  {
    id: "accuracy",
    icon: RefreshCw,
    title: "Accuracy and updates",
    content: (
      <p className="text-gray-600 leading-relaxed">
        We work to keep our formulas correct and current with published guidance, and we test the clinical engines
        against reference values. Even so, errors can happen and guidelines change. If you spot something that looks
        wrong, tell us at <a href="mailto:krushal.barasiya@calqulate.net" className="text-emerald-700 font-semibold hover:underline">krushal.barasiya@calqulate.net</a> and we will check it.
      </p>
    ),
  },
  {
    id: "your-responsibility",
    icon: UserCheck,
    title: "Your responsibility",
    content: (
      <p className="text-gray-600 leading-relaxed">
        You decide how to use the information here. By using Calqulate.net you accept that we are not responsible for
        decisions you make based on it. Read this alongside our{" "}
        <Link href="/terms-and-conditions" className="text-emerald-700 font-semibold hover:underline">Terms</Link> and{" "}
        <Link href="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">Privacy Policy</Link>.
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <Header />
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 md:py-20 max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Disclaimer</h1>
            <p className="text-sm text-gray-400 mb-6">Last updated {UPDATED}</p>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl">
              Calqulate.net helps you understand and track your health numbers. It is educational decision-support, not
              medical advice. This page explains where the line sits and how to use the site safely.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl pb-16">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
            {/* Sidebar nav */}
            <nav className="hidden lg:block" aria-label="Disclaimer sections">
              <div className="sticky top-24 space-y-1 border-l-2 border-gray-100 pl-4">
                {nav.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    className="flex items-center gap-1.5 py-1.5 text-sm text-gray-400 hover:text-emerald-700 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 flex-shrink-0" />
                    {n.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Content */}
            <div className="min-w-0">
              {/* Short version callout */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-900 leading-relaxed font-medium mb-1">The short version</p>
                    <p className="text-amber-800/80 leading-relaxed">
                      Our calculators, scores, simulations, and protocols are for education and self-tracking. They do
                      not diagnose, treat, or prescribe. Always talk to a licensed clinician before you change anything
                      about your care.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {sections.map((s) => (
                  <div key={s.id} id={s.id} className="scroll-mt-24">
                    {s.first ? (
                      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-emerald-800">{s.title}</h2>
                        {s.content}
                      </div>
                    ) : s.icon === Ambulance || s.icon === Pill ? (
                      <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
                        <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-4 text-gray-800">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                            <s.icon className="h-5 w-5 text-emerald-700" />
                          </div>
                          {s.title}
                        </h2>
                        {s.content}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
                        <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-4 text-gray-800">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                            <s.icon className="h-5 w-5 text-emerald-700" />
                          </div>
                          {s.title}
                        </h2>
                        {s.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom nav */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <span className="text-gray-400">See also:</span>
                  <Link href="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">Privacy Policy</Link>
                  <Link href="/terms-and-conditions" className="text-emerald-700 font-semibold hover:underline">Terms</Link>
                  <Link href="/cookie-policy" className="text-emerald-700 font-semibold hover:underline">Cookie Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
