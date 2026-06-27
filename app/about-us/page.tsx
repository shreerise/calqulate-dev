import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, Target, Heart, Code2, Users, ShieldCheck } from "lucide-react";

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
      <main id="main" className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
            We built the tracker we wanted for our own numbers
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12 leading-relaxed">
            Calqulate.net began as a set of free health calculators. People used them, got a number, and left. The
            problem was obvious. A one-time number tells you where you stand today, but health is a trend, not a
            snapshot. So we built Calqulate Vitals to track the numbers that actually predict disease and show what to
            change first.
          </p>

          <div className="space-y-12">
            {/* What we do */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-emerald-700">
                What we do
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We turn your numbers into a Metabolic Health Score, a Longevity Index, a heart age, and validated 10-year
                risk estimates for heart attack and type-2 diabetes. Then we track them over time and point you to the single
                change that lowers your risk most. The free calculators are still here, and they are still the easy way in.
              </p>
            </div>

            {/* What we believe */}
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 pt-8 text-gray-800">
                <Heart className="w-8 h-8 text-emerald-700" />
                What we believe
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-4">
                Most health tools stop at a result. We think the result is the start. A number only helps if you can see
                whether it is moving the right way, and if you know which lever to pull next. That belief shapes the whole
                product. Every score comes with the math behind it and the one action that matters most.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed">
                We also think people deserve to understand their own data. So we show our methodology, name the clinical
                models we use, and let you export or delete everything any time. There are no dark patterns and no fake
                urgency.
              </p>
            </div>

            {/* How we build it */}
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 pt-8 text-gray-800">
                <Code2 className="w-8 h-8 text-emerald-700" />
                How we build it
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                The clinical engines are written as plain, testable code and checked against published reference values. We
                use the Pooled Cohort Equations for cardiovascular risk, the Framingham model for heart age, and FINDRISC for
                diabetes risk. The scores and simulations are transparent composites built on top of those models, and we
                label them as educational rather than as a diagnosis.
              </p>
            </div>

            {/* Who it is for */}
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 pt-8 text-gray-800">
                <Users className="w-8 h-8 text-emerald-700" />
                Who it is for
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Calqulate Vitals is built for adults who got a number they did not understand and were left to figure it out
                alone. Someone with a borderline A1c told to come back in six months. Someone on a GLP-1 worried about losing
                muscle. Someone handed a heart risk score with no plan. If that sounds familiar, this was made for you.
              </p>
            </div>

            {/* A clear boundary */}
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 pt-8 text-gray-800">
                <ShieldCheck className="w-8 h-8 text-emerald-700" />
                A clear boundary
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We are not your doctor and we do not pretend to be. Calqulate is educational decision-support. It helps you
                understand your risk, track it, and bring better questions to your clinician. Read the full{" "}
                <Link href="/disclaimer" className="text-emerald-700 font-semibold hover:underline">
                  Disclaimer
                </Link>{" "}
                for where the line sits.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/service/metabolic-health-tracker"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-600 transition-colors"
              >
                Get my free score <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
