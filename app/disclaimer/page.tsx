import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Disclaimer | Calqulate.net",
  description:
    "Calqulate.net is educational decision-support, not medical, legal, or financial advice. Read how to use our calculators and the Calqulate Vitals service safely.",
  keywords: "disclaimer, medical disclaimer, not medical advice, Calqulate",
  alternates: { canonical: "https://calqulate.net/disclaimer" },
};

const UPDATED = "June 2026";

export default function DisclaimerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-white py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Disclaimer</h1>
            <p className="mt-2 text-sm text-gray-500">Last updated {UPDATED}</p>
            <p className="mt-4 text-lg text-gray-600">
              Calqulate.net helps you understand and track your health numbers. It is educational decision-support, not
              medical advice. This page explains where the line sits and how to use the site safely.
            </p>
          </div>
        </section>

        <article className="container mx-auto max-w-3xl px-4 py-10 prose prose-slate prose-headings:font-bold prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline">
          <div className="not-prose rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <strong>The short version.</strong> Our calculators, scores, simulations, and protocols are for education
            and self-tracking. They do not diagnose, treat, or prescribe. Always talk to a licensed clinician before
            you change anything about your care.
          </div>

          <h2>Not medical advice</h2>
          <p>
            Every result on Calqulate.net, from the Metabolic Health Score to heart age, the Longevity Index, the Future
            You simulation, and the GLP-1 plan, is an estimate built from published models. These tools cannot examine
            you, read your full history, or account for everything a clinician would. Use the numbers to ask better
            questions, not to replace a diagnosis.
          </p>

          <h2>How the calculators work, and their limits</h2>
          <p>
            We use validated models such as the Pooled Cohort Equations, the Framingham risk score, and FINDRISC. These
            were developed on specific populations and have known limits. A risk percentage is a population estimate, not
            a prediction about you personally. Lab values, blood pressure readings, and body measurements all vary day to
            day, so a single result can mislead. Tracking the trend gives a clearer picture than any one number.
          </p>

          <h2>GLP-1 medications</h2>
          <p>
            The GLP-1 dose calculator and the Autopilot protocol organize standard, publicly available dose schedules.
            They do not set your dose. Compounded products can differ in concentration, and your prescriber decides what
            is right for you based on your health. Confirm every dose and every change with the clinician who prescribed
            it, and check the units against your own vial before you draw anything.
          </p>

          <h2>In an emergency</h2>
          <p>
            Do not use this site for emergencies. If you have chest pain, trouble breathing, signs of a stroke, very high
            or very low blood sugar, or any symptom that worries you, call your local emergency number or go to the
            nearest emergency department.
          </p>

          <h2>Not financial or legal advice</h2>
          <p>
            Nothing here is financial or legal advice. Pricing and subscription details on the{" "}
            <Link href="/pricing">pricing page</Link> are for the service only.
          </p>

          <h2>Accuracy and updates</h2>
          <p>
            We work to keep our formulas correct and current with published guidance, and we test the clinical engines
            against reference values. Even so, errors can happen and guidelines change. If you spot something that looks
            wrong, tell us at <a href="mailto:support@calqulate.net">support@calqulate.net</a> and we will check it.
          </p>

          <h2>Your responsibility</h2>
          <p>
            You decide how to use the information here. By using Calqulate.net you accept that we are not responsible for
            decisions you make based on it. Read this alongside our{" "}
            <Link href="/terms-and-conditions">Terms</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
