import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Calqulate.net | Metabolic and heart health, tracked",
  description:
    "Calqulate.net started as free health calculators and grew into Calqulate Vitals, a service that tracks your metabolic and cardiovascular risk over time and shows the one change that moves it most.",
  keywords: "about Calqulate, metabolic health, longevity, our story",
  alternates: { canonical: "https://calqulate.net/about-us" },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-white py-14">
          <div className="container mx-auto max-w-3xl px-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              We built the tracker we wanted for our own numbers
            </h1>
            <p className="mt-5 text-lg text-gray-600">
              Calqulate.net began as a set of free health calculators. People used them, got a number, and left. The
              problem was obvious. A one-time number tells you where you stand today, but health is a trend, not a
              snapshot. So we built Calqulate Vitals to track the numbers that actually predict disease and show what to
              change first.
            </p>
          </div>
        </section>

        <article className="container mx-auto max-w-3xl px-4 py-10 prose prose-slate prose-headings:font-bold prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline">
          <h2>What we do</h2>
          <p>
            We turn your numbers into a Metabolic Health Score, a Longevity Index, a heart age, and validated 10-year
            risk estimates for heart attack and type-2 diabetes. Then we track them over time and point you to the single
            change that lowers your risk most. The free calculators are still here, and they are still the easy way in.
          </p>

          <h2>What we believe</h2>
          <p>
            Most health tools stop at a result. We think the result is the start. A number only helps if you can see
            whether it is moving the right way, and if you know which lever to pull next. That belief shapes the whole
            product. Every score comes with the math behind it and the one action that matters most.
          </p>
          <p>
            We also think people deserve to understand their own data. So we show our methodology, name the clinical
            models we use, and let you export or delete everything any time. There are no dark patterns and no fake
            urgency.
          </p>

          <h2>How we build it</h2>
          <p>
            The clinical engines are written as plain, testable code and checked against published reference values. We
            use the Pooled Cohort Equations for cardiovascular risk, the Framingham model for heart age, and FINDRISC for
            diabetes risk. The scores and simulations are transparent composites built on top of those models, and we
            label them as educational rather than as a diagnosis.
          </p>

          <h2>Who it is for</h2>
          <p>
            Calqulate Vitals is built for adults who got a number they did not understand and were left to figure it out
            alone. Someone with a borderline A1c told to come back in six months. Someone on a GLP-1 worried about losing
            muscle. Someone handed a heart risk score with no plan. If that sounds familiar, this was made for you.
          </p>

          <h2>A clear boundary</h2>
          <p>
            We are not your doctor and we do not pretend to be. Calqulate is educational decision-support. It helps you
            understand your risk, track it, and bring better questions to your clinician. Read the full{" "}
            <Link href="/disclaimer">Disclaimer</Link> for where the line sits.
          </p>

          <div className="not-prose mt-8 flex flex-wrap gap-3">
            <Link href="/service/metabolic-health-tracker" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700">
              Get my free score <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/how-it-works" className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50">
              See how it works
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
