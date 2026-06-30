import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, Heart, Code2, Users, ShieldCheck, Sparkles, Linkedin } from "lucide-react";
import { FounderVision } from "@/components/marketing/FounderVision";

export const metadata: Metadata = {
  title: "About Calqulate.net | Metabolic and heart health, tracked",
  description:
    "Calqulate.net started as free health calculators and grew into Calqulate Vitals, a service that tracks your metabolic and cardiovascular risk over time and shows the one change that moves it most.",
  keywords: "about Calqulate, metabolic health, longevity, our story",
  alternates: { canonical: "https://calqulate.net/about-us" },
};

const values = [
  {
    icon: Heart,
    title: "What we believe",
    content: (
      <>
        <p className="text-gray-600 leading-relaxed mb-4">
          Most health tools stop at a result. We think the result is the start. A number only helps if you can see
          whether it is moving the right way, and if you know which lever to pull next. That belief shapes the whole
          product. Every score comes with the math behind it and the one action that matters most.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We also think people deserve to understand their own data. So we show our methodology, name the clinical
          models we use, and let you export or delete everything any time. There are no dark patterns and no fake
          urgency.
        </p>
      </>
    ),
  },
  {
    icon: Code2,
    title: "How we build it",
    content: (
      <p className="text-gray-600 leading-relaxed">
        The clinical engines are written as plain, testable code and checked against published reference values. We
        use the Pooled Cohort Equations for cardiovascular risk, the Framingham model for heart age, and FINDRISC for
        diabetes risk. The scores and simulations are transparent composites built on top of those models, and we
        label them as educational rather than as a diagnosis.
      </p>
    ),
  },
  {
    icon: Users,
    title: "Who it is for",
    content: (
      <p className="text-gray-600 leading-relaxed">
        Calqulate Vitals is built for adults who got a number they did not understand and were left to figure it out
        alone. Someone with a borderline A1c told to come back in six months. Someone on a GLP-1 worried about losing
        muscle. Someone handed a heart risk score with no plan. If that sounds familiar, this was made for you.
      </p>
    ),
  },
  {
    icon: ShieldCheck,
    title: "A clear boundary",
    content: (
      <p className="text-gray-600 leading-relaxed">
        We are not your doctor and we do not pretend to be. Calqulate is educational decision-support. It helps you
        understand your risk, track it, and bring better questions to your clinician. Read the full{" "}
        <Link href="/disclaimer" className="text-emerald-700 font-semibold hover:underline">
          Disclaimer
        </Link>{" "}
        for where the line sits.
      </p>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <Header />
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-transparent to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800 mb-6">
              <Sparkles className="h-4 w-4" />
              Our story
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 leading-tight">
              We built the tracker we wanted for our own numbers
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl leading-relaxed">
              Calqulate.net began as a set of free health calculators. People used them, got a number, and left. The
              problem was obvious. A one-time number tells you where you stand today, but health is a trend, not a
              snapshot. So we built Calqulate Vitals to track the numbers that actually predict disease and show what to
              change first.
            </p>
          </div>
        </section>

        {/* What we do — full-width emphasis */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-emerald-800">
              What we do
            </h2>
            <p className="text-emerald-700/80 text-base md:text-lg leading-relaxed max-w-3xl">
              We turn your numbers into a Metabolic Health Score, a Longevity Index, a heart age, and validated 10-year
              risk estimates for heart attack and type-2 diabetes. Then we track them over time and point you to the single
              change that lowers your risk most. The free calculators are still here, and they are still the easy way in.
            </p>
          </div>
        </section>

        {/* Founder vision */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <FounderVision />
        </section>

        {/* Values */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <div className="grid gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-4 text-gray-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                    <v.icon className="h-5 w-5 text-emerald-700" />
                  </div>
                  {v.title}
                </h2>
                {v.content}
              </div>
            ))}
          </div>
        </section>

        {/* Founders */}
        <section className="container mx-auto px-4 max-w-4xl mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">About the founders</h2>
          <div className="space-y-8">
            {/* Meet */}
            <div id="meet" className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <a
                  href="/meet.akabari.webp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md ring-1 ring-gray-200 hover:ring-emerald-400 transition-all"
                >
                  <Image
                    src="/meet.akabari.webp"
                    alt="Meet Akabari"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </a>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">Meet Akabari</h3>
                  <p className="text-sm text-emerald-700 font-medium mb-3">Co-Founder, Calqulate.net</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {["Product Strategy", "Product Algorithm", "User Acquisition"].map((c) => (
                      <span key={c} className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Meet is the co-founder of Calqulate.net, dedicated to building accurate, privacy-first, personalized,
                    and evidence-based health, beauty, and fitness tools that help users make informed decisions about
                    their well-being and appearance. With expertise in Product Stretagy, Product Algorithm Creator and a passion for health science,
                    Meet combines technical excellence with practical health knowledge to deliver product you can trust.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/meet-akabari/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Krushal */}
            <div id="krushal" className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <a
                  href="/krushal.barasiya.webp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md ring-1 ring-gray-200 hover:ring-emerald-400 transition-all"
                >
                  <Image
                    src="/krushal.barasiya.webp"
                    alt="Krushal Barasiya"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </a>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">Krushal Barasiya</h3>
                  <p className="text-sm text-emerald-700 font-medium mb-3">Co-Founder, Calqulate.net</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {["Software Engineering", "Calculator Development", "Technical SEO"].map((c) => (
                      <span key={c} className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Krushal builds health calculators and educational tools focused on accuracy, usability, and
                    evidence-based information. As a software engineer, Krushal ensures every calculator and tracking
                    tool on Calqulate.net is reliable, fast, and technically sound — from the clinical engines to the
                    infrastructure that powers them.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/krushalbarasiya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Ready to know your numbers?
            </h2>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              Start with a free metabolic health snapshot and see where you stand today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/product/metabolic-health-tracker"
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
