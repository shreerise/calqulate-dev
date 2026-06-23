import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AlertTriangle, Stethoscope, Calculator, Pill, Ambulance, Scale, RefreshCw, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | Calqulate.net",
  description:
    "Calqulate.net is educational decision-support, not medical, legal, or financial advice. Read how to use our calculators and the Calqulate Vitals service safely.",
  keywords: "disclaimer, medical disclaimer, not medical advice, Calqulate",
  alternates: { canonical: "https://calqulate.net/disclaimer" },
};

const UPDATED = "June 2026";

const sections = [
  {
    icon: Stethoscope,
    title: "Not medical advice",
    first: true,
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        Every result on Calqulate.net, from the Metabolic Health Score to heart age, the Longevity Index, the Future
        You simulation, and the GLP-1 plan, is an estimate built from published models. These tools cannot examine
        you, read your full history, or account for everything a clinician would. Use the numbers to ask better
        questions, not to replace a diagnosis.
      </p>
    ),
  },
  {
    icon: Calculator,
    title: "How the calculators work, and their limits",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        We use validated models such as the Pooled Cohort Equations, the Framingham risk score, and FINDRISC. These
        were developed on specific populations and have known limits. A risk percentage is a population estimate, not
        a prediction about you personally. Lab values, blood pressure readings, and body measurements all vary day to
        day, so a single result can mislead. Tracking the trend gives a clearer picture than any one number.
      </p>
    ),
  },
  {
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
        <p className="text-muted-foreground text-base leading-relaxed">
          The GLP-1 dose calculator and the Autopilot protocol organize standard, publicly available dose schedules.
          They do not set your dose. Compounded products can differ in concentration, and your prescriber decides what
          is right for you based on your health. Confirm every dose and every change with the clinician who prescribed
          it, and check the units against your own vial before you draw anything.
        </p>
      </>
    ),
  },
  {
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
    icon: Scale,
    title: "Not financial or legal advice",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        Nothing here is financial or legal advice. Pricing and subscription details on the{" "}
        <Link href="/pricing" className="text-emerald-700 font-semibold hover:underline">pricing page</Link> are for the service only.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    title: "Accuracy and updates",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        We work to keep our formulas correct and current with published guidance, and we test the clinical engines
        against reference values. Even so, errors can happen and guidelines change. If you spot something that looks
        wrong, tell us at <a href="mailto:support@calqulate.net" className="text-emerald-700 font-semibold hover:underline">support@calqulate.net</a> and we will check it.
      </p>
    ),
  },
  {
    icon: UserCheck,
    title: "Your responsibility",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
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
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Disclaimer</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated {UPDATED}</p>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12 leading-relaxed">
            Calqulate.net helps you understand and track your health numbers. It is educational decision-support, not
            medical advice. This page explains where the line sits and how to use the site safely.
          </p>

          {/* Short version callout */}
          <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-5 mb-12">
            <p className="text-amber-900 leading-relaxed">
              <strong>The short version.</strong> Our calculators, scores, simulations, and protocols are for education
              and self-tracking. They do not diagnose, treat, or prescribe. Always talk to a licensed clinician before
              you change anything about your care.
            </p>
          </div>

          <div className="space-y-12">
            {sections.map((s) => (
              <div key={s.title}>
                {s.first ? (
                  <h2 className="text-3xl font-bold mb-4 text-emerald-700">{s.title}</h2>
                ) : (
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 pt-8 text-gray-800">
                    <s.icon className="w-8 h-8 text-emerald-700" />
                    {s.title}
                  </h2>
                )}
                {s.content}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
