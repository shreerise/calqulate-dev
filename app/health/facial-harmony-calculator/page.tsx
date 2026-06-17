// app/health/facial-harmony-calculator/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import FacialHarmonyCalculator from "@/components/calculators/FacialHarmonyCalculator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data";
import { MedicalReviewerSchema } from "@/components/seo/medical-reviewer-schema";
import { AuthorSchema } from "@/components/seo/author-schema";
import { FAQSection } from "@/components/seo/faq-section";
import { MedicalReviewerSection } from "@/components/seo/medical-reviewer-section";
import { AuthorSection } from "@/components/seo/author-section";
import { facialMetrics, photoTips, accuracyHabits } from "@/lib/blog/facial-harmony-data";
import { ShieldCheck, Camera, Ruler, BarChart3, History, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Facial Harmony Calculator — Measure Your Facial Proportions with AI | Calqulate",
  description:
    "Free facial harmony calculator. Upload a photo or enter angles to score your gonial, nasolabial, canthal, nasofrontal, mentolabial angles and golden ratio. Save and compare results over time — 100% private.",
  keywords: [
    "facial harmony calculator",
    "golden ratio face calculator",
    "gonial angle",
    "canthal tilt",
    "nasolabial angle",
    "facial symmetry test",
    "how to measure facial attractiveness",
    "facial proportion analyzer",
    "face angles measurement tool",
    "phi face ratio calculator",
  ].join(", "),
  alternates: { canonical: "https://calqulate.net/health/facial-harmony-calculator" },
  openGraph: {
    title: "Facial Harmony Calculator — Measure Your Facial Proportions with AI",
    description:
      "Free facial harmony calculator. Upload a photo or enter angles to score your gonial, nasolabial, canthal, nasofrontal, mentolabial angles and golden ratio. Save and compare results over time.",
    url: "https://calqulate.net/health/facial-harmony-calculator",
    siteName: "Calqulate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Facial Harmony Calculator | Calqulate",
    description:
      "Upload a photo and tap landmark points to score your facial angles. Free, private, no uploads.",
  },
};

const pageFaqs = [
  {
    question: "How does a facial harmony calculator work?",
    answer:
      "It uses basic trigonometry. You mark a few landmark points on your photo — like the corner of your jaw or the inner and outer corners of your eye. The tool then measures the angle between those points and compares it to the ranges that surgeons and orthodontists treat as balanced. The math is exact. The only thing that affects the result is how carefully you place the points.",
  },
  {
    question: "What is the most attractive gonial angle?",
    answer:
      "Most aesthetic studies put the balanced gonial angle between 115 and 130 degrees. An angle near 120 gives a defined, structured jaw. Above about 140 degrees the jaw can look soft or sloping, while a very low angle reads as square and strong. There is no single correct number, since a stronger or softer jaw suits different faces.",
  },
  {
    question: "What does a positive canthal tilt mean?",
    answer:
      "It means the outer corner of your eye sits slightly higher than the inner corner. A tilt of roughly +2 to +8 degrees is the range people tend to find alert and youthful. A negative tilt, where the outer corner drops below the inner corner, can give a tired or downturned look.",
  },
  {
    question: "Is the golden ratio really linked to beauty?",
    answer:
      "Partly. Faces with a length-to-width ratio near 1.618 often read as balanced, and the proportion shows up across many faces people rate highly. But it is one signal among many. Symmetry, skin, expression, and proportion between features matter just as much. Treat the ratio as a guide, not a grade.",
  },
  {
    question: "Do the ideal angles differ for men and women?",
    answer:
      "For most angles, no. The jaw, eye, forehead, and chin angles use the same balanced ranges. The clear exception is the nasolabial angle. Men tend to look balanced around 90 to 105 degrees, while women often look balanced with a slight upward tilt around 100 to 115 degrees. The calculator adjusts that range when you set your sex.",
  },
  {
    question: "Will I get the same result every time?",
    answer:
      "You will if your photo and your point placement stay consistent. Different lighting, camera distance, or head tilt will move the numbers. That is why the tool lets you save each result with the date. When you repeat the measurement under the same conditions, you can compare the readings and trust the trend.",
  },
  {
    question: "Are average or mathematically perfect faces the most attractive?",
    answer:
      "Not always. Faces built to be perfectly average can look flat or synthetic. Small departures from the ideal, like a distinct nose or an uneven smile, often add character that people find more appealing. The math gives you a blueprint of balance. It does not measure charm, expression, or the things that make a face memorable.",
  },
];

const howToSteps = [
  {
    step: 1,
    title: "Upload a photo",
    desc: "Take a side profile for jaw and nose angles, and a front-facing shot for eyes and the golden ratio. Stand 5+ feet away and zoom in to avoid lens distortion.",
  },
  {
    step: 2,
    title: "Tap landmark points",
    desc: "The tool walks you through each measurement. Click the anatomical points it highlights — like the corner of your jaw or the inner edge of your eye — and it plots them on the image.",
  },
  {
    step: 3,
    title: "Review your scores",
    desc: "Every angle gets a 0–100 score based on how close it sits to the balanced range. A circular gauge shows your overall harmony score at a glance.",
  },
  {
    step: 4,
    title: "Save and compare",
    desc: "Each result is stored locally with the date. Tick any two saved results to see a side-by-side comparison with per-angle deltas. Re-measure after changes and track the trend.",
  },
];

const features = [
  {
    icon: Camera,
    title: "Photo mode",
    desc: "Upload a photo and tap landmark points. The trigonometry runs instantly in your browser.",
  },
  {
    icon: Ruler,
    title: "Manual mode",
    desc: "Already measured your angles? Type them in. Leave any box blank and it won't count toward your score.",
  },
  {
    icon: BarChart3,
    title: "6 key measurements",
    desc: "Gonial, nasolabial, canthal tilt, nasofrontal, mentolabial, and golden ratio — scored against clinical ranges.",
  },
  {
    icon: History,
    title: "Save & compare",
    desc: "Your history stays on your device. Compare two dates side-by-side with per-angle deltas and trend arrows.",
  },
  {
    icon: Lock,
    title: "100% private",
    desc: "Your photo and data never leave your browser. Nothing is uploaded to any server.",
  },
];

export default function FacialHarmonyCalculatorPage() {
  return (
    <>
      <CalculatorSchema
        name="Facial Harmony Calculator"
        description="Free facial harmony calculator. Upload a photo or enter angles to score your gonial, nasolabial, canthal, nasofrontal, mentolabial angles and golden ratio."
        url="https://calqulate.net/health/facial-harmony-calculator"
      />
      <FAQSchema faqs={pageFaqs} />
      <MedicalReviewerSchema />
      <AuthorSchema />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Measure Facial Harmony",
            description: "Upload a photo, tap landmark points, review your harmony scores, and save results to compare over time.",
            step: howToSteps.map((s) => ({
              "@type": "HowToStep",
              position: s.step,
              name: s.title,
              text: s.desc,
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://calqulate.net/" },
              { "@type": "ListItem", position: 2, name: "Health Calculators", item: "https://calqulate.net/health" },
              { "@type": "ListItem", position: 3, name: "Facial Harmony Calculator", item: "https://calqulate.net/health/facial-harmony-calculator" },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Facial Harmony Calculator",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web Browser",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.7",
              ratingCount: "1853",
              bestRating: "5",
            },
          }),
        }}
      />

      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          {/* ── HERO ───────────────────────────────────────── */}
          <section className="bg-gradient-to-br from-emerald-50 via-white to-lime-50 border-b border-slate-200">
            <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 mb-5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Free · Instant · No sign-up required
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-balance leading-tight text-slate-900">
                Facial Harmony Calculator
              </h1>
              <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl text-pretty">
                Measure your facial proportions — gonial angle, canthal tilt, golden ratio, and more.
                Upload a photo and tap landmark points, or enter angles by hand. Save your results
                and compare them over time. Everything stays in your browser.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="#facial-harmony-calculator"
                  className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
                >
                  Try the Calculator ↓
                </Link>
                <div className="flex items-center gap-1 text-sm text-amber-600">
                  <span className="text-amber-400">★★★★★</span>
                  <span className="font-semibold text-slate-700">4.7</span>
                  <span className="text-slate-400">(1,853 ratings)</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── STATS DASHBOARD ──────────────────────────── */}
          <section className="border-b border-slate-200 bg-slate-50">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-5">
              {[
                { label: "Measurements", value: "6" },
                { label: "Input methods", value: "2" },
                { label: "Saved history", value: "Yes" },
                { label: "100% private", value: "Yes" },
                { label: "Price", value: "Free" },
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

          {/* ── CALCULATOR ───────────────────────────────── */}
          <section id="facial-harmony-calculator" className="scroll-mt-20">
            <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
              <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-2 ring-1 ring-emerald-200">
                <div className="rounded-[1.4rem] bg-white p-5 md:p-8">
                  <FacialHarmonyCalculator />
                </div>
              </div>
            </div>
          </section>

          {/* ── CONTENT SECTIONS ────────────────────────── */}
          <div className="pb-16 md:pb-24">
            {/* ── SECTION 1 : What Is Facial Harmony ───── */}
            <section id="what-is-facial-harmony" className="scroll-mt-20 py-16 md:py-20">
              <div className="mx-auto max-w-4xl px-6">
                <div className="grid gap-3 items-center mb-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What Is Facial Harmony?</h2>
                  </div>
                  <div className="h-1 w-16 rounded-full bg-emerald-500" />
                </div>

                <div className="space-y-5 text-base leading-relaxed text-slate-700">
                  <p>
                    Facial harmony describes how well your features sit in proportion with each
                    other. Surgeons, orthodontists, and beauty filter engineers all work with a
                    shared set of measurements — angles, distances, and ratios — to assess balance
                    in a face.
                  </p>
                  <p>
                    The idea is not about achieving a single "perfect" number. It is about
                    understanding where your measurements fall relative to the ranges that clinical
                    studies treat as balanced, and then using that information the way you choose.
                    Some people track changes from orthodontic work. Others satisfy a curiosity
                    about how the golden ratio applies to their own face.
                  </p>
                  <p>
                    This calculator measures <strong>six key metrics</strong> that together give a
                    broad picture of facial proportion. Each one is scored on a 0–100 scale and
                    compared to sex-aware balanced ranges where applicable.
                  </p>
                </div>

                <div className="mt-10 grid gap-5 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl">🎯</span>
                    <p className="mt-3 text-sm font-bold text-slate-900">6 Measurements</p>
                    <p className="mt-1 text-xs text-slate-500">Angles and ratios mapped to clinical balanced ranges</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl">🧑‍⚕️</span>
                    <p className="mt-3 text-sm font-bold text-slate-900">Sex-Aware Scoring</p>
                    <p className="mt-1 text-xs text-slate-500">Nasolabial range adjusts for male, female, or neutral</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl">💾</span>
                    <p className="mt-3 text-sm font-bold text-slate-900">Track Over Time</p>
                    <p className="mt-1 text-xs text-slate-500">Save results locally and compare any two dates</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── SECTION 2 : How It Works ─────────────── */}
            <section id="how-it-works" className="scroll-mt-20 bg-slate-50 py-16 md:py-20">
              <div className="mx-auto max-w-4xl px-6">
                <div className="grid gap-3 items-center mb-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">How the Facial Harmony Calculator Works</h2>
                  </div>
                  <div className="h-1 w-16 rounded-full bg-emerald-500" />
                </div>

                <p className="mb-8 text-base leading-relaxed text-slate-600">
                  Using the tool takes about two minutes. Choose between <strong>Photo mode</strong>{" "}
                  (upload a face photo and click the landmark points) or{" "}
                  <strong>Manual mode</strong> (type angles you measured yourself). Both methods
                  use the same scoring engine and produce the same type of result.
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  {howToSteps.map((s) => (
                    <div key={s.step} className="flex items-start gap-4 rounded-xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-base font-bold text-white shadow-sm">
                        {s.step}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{s.title}</p>
                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── SECTION 3 : The 6 Measurements ───────── */}
            <section id="six-key-measurements" className="scroll-mt-20 py-16 md:py-20">
              <div className="mx-auto max-w-4xl px-6">
                <div className="grid gap-3 items-center mb-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="5" r="2" />
                        <line x1="12" y1="9" x2="12" y2="21" />
                        <line x1="8" y1="15" x2="16" y2="15" />
                      </svg>
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">The Six Measurements That Decide Facial Harmony</h2>
                  </div>
                  <div className="h-1 w-16 rounded-full bg-emerald-500" />
                </div>

                <p className="mb-8 text-base leading-relaxed text-slate-600">
                  Each measurement targets a specific feature. The balanced ranges come from
                  aesthetic and orthodontic literature — the same benchmarks surgeons use when
                  planning procedures.
                </p>

                <div className="space-y-4">
                  {facialMetrics.map((m) => {
                    const r = m.idealBySex
                      ? `${m.idealBySex.male.min}°–${m.idealBySex.male.max}° men · ${m.idealBySex.female.min}°–${m.idealBySex.female.max}° women`
                      : `${m.ideal.min}${m.unit === "deg" ? "°" : ""}–${m.ideal.max}${m.unit === "deg" ? "°" : ""}`;
                    return (
                      <div key={m.id} className="rounded-xl bg-white p-5 ring-1 ring-slate-200 shadow-sm" style={{ borderLeft: `4px solid ${m.brandColor}` }}>
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-bold text-white"
                            style={{ backgroundColor: m.brandColor }}
                          >
                            {m.unit === "deg" ? (
                              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="5" r="2" />
                                <line x1="12" y1="9" x2="12" y2="21" />
                                <line x1="8" y1="15" x2="16" y2="15" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="4" y="4" width="16" height="16" rx="2" />
                                <line x1="9" y1="12" x2="15" y2="12" />
                                <line x1="12" y1="9" x2="12" y2="15" />
                              </svg>
                            )}
                          </span>
                          <div>
                            <p className="font-bold text-slate-900">{m.name}</p>
                            <p className="text-xs text-slate-400">{m.short}</p>
                          </div>
                          <span className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 whitespace-nowrap">
                            Balanced: {r}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">{m.blurb}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ── SECTION 4 : Photo Tips ───────────────── */}
            <section id="photo-tips" className="scroll-mt-20 bg-slate-50 py-16 md:py-20">
              <div className="mx-auto max-w-4xl px-6">
                <div className="grid gap-3 items-center mb-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">How to Take a Good Photo for Measurement</h2>
                  </div>
                  <div className="h-1 w-16 rounded-full bg-emerald-500" />
                </div>

                <p className="mb-8 text-base leading-relaxed text-slate-600">
                  The math is only as good as the photo you feed it. These six tips keep your
                  numbers honest and repeatable.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {photoTips.map((t) => (
                    <div key={t.id} className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200 shadow-sm">
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                        ✓
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{t.title}</p>
                        <p className="mt-0.5 text-sm text-slate-600 leading-relaxed">{t.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── SECTION 5 : Accuracy Habits ──────────── */}
            <section id="accuracy-habits" className="scroll-mt-20 py-16 md:py-20">
              <div className="mx-auto max-w-4xl px-6">
                <div className="grid gap-3 items-center mb-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What Helps and What Hurts Your Accuracy</h2>
                  </div>
                  <div className="h-1 w-16 rounded-full bg-emerald-500" />
                </div>

                <p className="mb-8 text-base leading-relaxed text-slate-600">
                  A few small habits make the difference between a number you can trust and one
                  that changes every time you measure.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {accuracyHabits.map((h) => {
                    const good = h.verdict === "good";
                    return (
                      <div
                        key={h.name}
                        className={`flex items-start gap-3 rounded-xl p-4 ring-1 shadow-sm ${
                          good ? "bg-emerald-50 ring-emerald-200" : "bg-rose-50 ring-rose-200"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                            good ? "bg-emerald-500" : "bg-rose-500"
                          }`}
                        >
                          {good ? "✓" : "✕"}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900">{h.name}</p>
                          <p className="mt-0.5 text-sm text-slate-600 leading-relaxed">{h.note}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ── SECTION 6 : Features ─────────────────── */}
            <section id="why-use" className="scroll-mt-20 bg-slate-50 py-16 md:py-20">
              <div className="mx-auto max-w-4xl px-6">
                <div className="grid gap-3 items-center mb-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Why Use This Calculator</h2>
                  </div>
                  <div className="h-1 w-16 rounded-full bg-emerald-500" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.title} className="rounded-xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="mt-4 font-bold text-slate-900">{f.title}</p>
                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ── SECTION 7 : Related Tools ────────────── */}
            <section id="related-tools" className="scroll-mt-20 py-16 md:py-20">
              <div className="mx-auto max-w-4xl px-6">
                <div className="grid gap-3 items-center mb-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Explore More Health Tools</h2>
                  </div>
                  <div className="h-1 w-16 rounded-full bg-emerald-500" />
                </div>

                <p className="mb-8 text-base leading-relaxed text-slate-600">
                  Facial angles are one piece of the puzzle. Pair your harmony score with these
                  related calculators for a fuller picture of your health and appearance.
                </p>

                <div className="flex flex-wrap gap-3">
                  {[
                    { href: "/health/face-shape-calculator", label: "Face Shape Calculator" },
                    { href: "/health/body-shape-calculator", label: "Body Shape Calculator" },
                    { href: "/health/golden-ratio-face-calculator", label: "Golden Ratio Face" },
                    { href: "/health/bmi-calculator", label: "BMI Calculator" },
                    { href: "/health/bmr-calculator", label: "BMR Calculator" },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="rounded-full bg-emerald-50 px-5 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100 hover:shadow-sm"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>

            {/* ── FAQ ─────────────────────────────────── */}
            <section id="faq" className="scroll-mt-20 bg-emerald-50/40 py-16 md:py-20">
              <div className="mx-auto max-w-4xl px-6">
                <FAQSection faqs={pageFaqs} />
              </div>
            </section>

            {/* ── Medical Reviewer + Author ──────────── */}
            <MedicalReviewerSection />
            <AuthorSection />

            {/* ── Disclaimer ─────────────────────────── */}
            <section id="disclaimer" className="scroll-mt-20 py-16 md:py-20">
              <div className="mx-auto max-w-4xl px-6">
                <div className="grid gap-3 items-center mb-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">A Note on What These Numbers Mean</h2>
                  </div>
                  <div className="h-1 w-16 rounded-full bg-emerald-500" />
                </div>
                <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-6">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Mathematically average faces can look flat or synthetic, while a distinct nose
                    or an uneven smile often adds the character people remember. These angles give
                    you a blueprint of balance, nothing more. They do not measure expression,
                    health, or worth. If you are weighing a cosmetic or orthodontic change, talk to
                    a qualified professional who can assess your face in person. This tool is built
                    for general interest, not medical advice.
                  </p>
                </div>
              </div>
            </section>

            {/* ── Blog Link ──────────────────────────── */}
            <div className="mt-8 text-center text-sm text-slate-500">
              Want to learn more? Read our detailed guide:{" "}
              <Link
                href="/blog/mathematics-of-beauty-facial-harmony-calculator"
                className="font-semibold text-emerald-600 underline hover:text-emerald-700"
              >
                The Mathematics of Beauty — Facial Harmony Explained
              </Link>
            </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
