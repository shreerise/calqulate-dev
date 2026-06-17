// components/blog/FacialHarmonyBlog.tsx
import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/lib/blog/blogs-data";
import {
  facialMetrics,
  photoTips,
  accuracyHabits,
  faqs,
} from "@/lib/blog/facial-harmony-data";
import FacialHarmonyRadarChart from "@/components/charts/FacialHarmonyRadarChart";
import FacialHarmonyCalculator from "@/components/calculators/FacialHarmonyCalculator";
import { ShieldCheck, BarChart3, Camera, History, Lock, Ruler, Star, BookOpen } from "lucide-react";

interface Props {
  blog: Blog;
}

export default function FacialHarmonyBlog({ blog }: Props) {
  return (
    <article className="bg-white">
      {/* ── JSON-LD FAQ Schema ─────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* ── HERO ─────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-lime-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
              {blog.category}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              The Mathematics of Beauty:{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-lime-600 bg-clip-text text-transparent">
                Calculate Your Facial Harmony
              </span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">{blog.description}</p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="#facial-harmony-calculator-widget"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
              >
                Measure My Face Now →
              </Link>
              <span className="text-sm text-slate-500">
                {blog.readTime} • Updated{" "}
                {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
            <Image
              src={blog.featuredImage}
              alt="Facial harmony calculator measuring jaw, eye, nose, and chin angles"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
          </div>
        </div>
      </header>

      {/* ── MINI DASHBOARD STATS ─────────────────────── */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-4">
          {[
            { label: "Measurements", value: `${facialMetrics.length}`, icon: BarChart3 },
            { label: "Input Methods", value: "2", icon: Camera },
            { label: "Saved History", value: "Yes", icon: History },
            { label: "Price", value: "Free", icon: ShieldCheck },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white p-6 text-center">
                <Icon className="mx-auto h-5 w-5 text-emerald-500" />
                <p className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TL;DR ────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-6 pt-12 md:pt-16">
        <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-600" />
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
              Key Takeaways
            </p>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">✦</span>
              <span>Facial harmony is measured using six key angles and ratios — the same benchmarks surgeons and orthodontists use.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">✦</span>
              <span>The golden ratio (Phi ≈ 1.618) appears in faces people rate as balanced, but it is one signal among many.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">✦</span>
              <span>Your results depend on photo quality and point placement — consistent conditions make comparisons meaningful.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-emerald-500">✦</span>
              <span>The built-in calculator saves your history locally and lets you compare results side-by-side over time.</span>
            </li>
          </ul>
        </aside>
      </div>

      {/* ── SECTION 1 : Beauty Has a Measurable Side ── */}
      <section id="beauty-measurable" className="scroll-mt-20 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-3 items-center mb-8">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Beauty Has a Measurable Side</h2>
            </div>
            <div className="h-1 w-16 rounded-full bg-emerald-500" />
          </div>

          <div className="space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              People have argued about what makes a face attractive for as long as
              they&rsquo;ve made art. Culture shifts, taste is personal, and two people
              rarely agree on everything. Underneath all of that, though, surgeons,
              orthodontists, and the engineers who build beauty filters work with something
              far more concrete. They work with angles, distances, and ratios.
            </p>
            <p>
              Plastic surgeons plan a chin or nose around specific degrees. Orthodontists
              read jaw angles off an X-ray before they move a single tooth. The face apps
              that smooth and reshape your selfie are running the same measurements in the
              background. The shared idea behind all of it is <strong>facial harmony</strong>,
              which is how well your features sit in proportion with each other.
            </p>
            <p>
              This guide breaks down the six measurements that matter most, shows the simple
              math behind each one, and gives you a free{" "}
              <Link href="/health/facial-harmony-calculator" className="font-semibold text-emerald-600 underline hover:text-emerald-700">facial harmony calculator</Link>{" "}
              that does the trigonometry for you. You can upload a photo and tap the points,
              or type in numbers you measured yourself. Either way you get a harmony score,
              a breakdown of each feature, and the option to save your result and compare it
              later.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl">🏥</span>
              <p className="mt-3 text-sm font-bold text-slate-900">Plastic Surgery</p>
              <p className="mt-1 text-xs text-slate-500">Plans procedures around precise degree measurements</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl">🦷</span>
              <p className="mt-3 text-sm font-bold text-slate-900">Orthodontics</p>
              <p className="mt-1 text-xs text-slate-500">Reads jaw angles off X-rays before moving teeth</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl">📱</span>
              <p className="mt-3 text-sm font-bold text-slate-900">Beauty Filters</p>
              <p className="mt-1 text-xs text-slate-500">Runs the same measurements to reshape selfies</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 : Golden Ratio ────────────────── */}
      <section id="golden-ratio" className="scroll-mt-20 bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-3 items-center mb-8">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 7 4 4 20 4 20 7" />
                  <line x1="9" y1="20" x2="15" y2="20" />
                  <line x1="12" y1="4" x2="12" y2="20" />
                </svg>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">The Golden Ratio, Phi 1.618</h2>
            </div>
            <div className="h-1 w-16 rounded-full bg-amber-500" />
          </div>

          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-3 space-y-5 text-base leading-relaxed text-slate-700">
              <p>
                The Greeks found a proportion they called Phi, roughly{" "}
                <strong>1.618</strong>, and it keeps turning up in nature, from the spiral of a
                shell to the branching of a plant. When a face sits close to this ratio, most
                people read it as balanced. The link is not magic. We see well-proportioned
                faces as a sign of health, and the brain tends to prefer what it can process
                easily.
              </p>
              <p>In a face that fits the ratio well, two relationships stand out:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/50 p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-800">1</span>
                  <span className="text-slate-700">
                    The <strong>length of the face</strong> is about 1.618 times its <strong>width</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/50 p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-800">2</span>
                  <span className="text-slate-700">
                    The distance from the base of the nose to the chin is roughly 1.618 times the
                    distance from the bottom of the lips to the chin.
                  </span>
                </li>
              </ul>
              <p>
                Treat the ratio as a guide, not a grade. Plenty of faces people love sit a
                little outside it, and that is the point we keep coming back to in this article.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="sticky top-24 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-8 ring-1 ring-amber-200 text-center">
                <span className="text-5xl font-bold text-amber-600 leading-none">φ</span>
                <p className="mt-3 text-6xl font-extrabold text-amber-700 leading-none tracking-tight">
                  1.618
                </p>
                <p className="mt-3 text-base font-semibold text-amber-800">Phi — The Golden Ratio</p>
                <div className="mt-6 mx-auto max-w-xs rounded-xl bg-white/80 p-4 ring-1 ring-amber-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Face length ÷ Face width</span>
                    <span className="font-bold text-amber-700">≈ 1.618</span>
                  </div>
                  <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-amber-200">
                    <div className="h-full w-[80%] rounded-full bg-amber-500" />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">Closer to full bar = closer to Phi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 : Rule of Thirds ──────────────── */}
      <section id="rule-of-thirds" className="scroll-mt-20 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-3 items-center mb-8">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="3" y1="15" x2="21" y2="15" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                  <line x1="15" y1="3" x2="15" y2="21" />
                </svg>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">The Rule of Thirds and Fifths</h2>
            </div>
            <div className="h-1 w-16 rounded-full bg-sky-500" />
          </div>

          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-3 space-y-5 text-base leading-relaxed text-slate-700">
              <p>
                Before measuring any angle, surgeons map the face onto a simple grid. It tells
                them at a glance whether the features are spaced evenly.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 rounded-lg border border-sky-200 bg-sky-50/50 p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-sky-200 text-xs font-bold text-sky-800">Ⅲ</span>
                  <div>
                    <strong>Vertical thirds.</strong> A balanced face splits into three roughly
                    equal bands: hairline to brow, brow to base of the nose, and base of the nose
                    to the bottom of the chin.
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-lg border border-sky-200 bg-sky-50/50 p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-sky-200 text-xs font-bold text-sky-800">Ⅴ</span>
                  <div>
                    <strong>Horizontal fifths.</strong> Across the face, the width should fit
                    about five eye-widths. The gap between the eyes is close to one eye-width.
                  </div>
                </li>
              </ul>
              <p className="rounded-xl border-l-4 border-sky-400 bg-sky-50 p-4 text-sm">
                These zones explain why a face can look slightly off even when each feature is
                fine on its own. If one third runs long, or the eyes sit wide, the proportion
                shifts and the eye notices.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
                  Facial Grid — Vertical Thirds
                </p>
                <div className="mt-5 mx-auto aspect-[3/4] max-w-[180px] rounded-xl border-2 border-slate-300 overflow-hidden divide-y-2 divide-slate-300 shadow-sm">
                  <div className="flex items-center justify-center h-1/3 bg-gradient-to-b from-sky-100 to-sky-50">
                    <span className="text-[11px] font-bold text-sky-800 text-center leading-tight px-2">
                      Hairline<br />→ brow
                    </span>
                  </div>
                  <div className="flex items-center justify-center h-1/3 bg-gradient-to-b from-emerald-100 to-emerald-50">
                    <span className="text-[11px] font-bold text-emerald-800 text-center leading-tight px-2">
                      Brow →<br />nose base
                    </span>
                  </div>
                  <div className="flex items-center justify-center h-1/3 bg-gradient-to-b from-amber-100 to-amber-50">
                    <span className="text-[11px] font-bold text-amber-800 text-center leading-tight px-2">
                      Nose base<br />→ chin
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-slate-400">Three equal vertical bands</p>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-sm">👁</span>
                  <span className="text-slate-300">×</span>
                  <span className="font-bold text-slate-700">5</span>
                  <span className="text-slate-400">= face width (horizontal fifths)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 : The 6 Measurements ──────────── */}
      <section id="six-measurements" className="scroll-mt-20 bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-3 items-center mb-8">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </span>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">The Six Measurements That Decide Facial Harmony</h2>
            </div>
            <div className="h-1 w-16 rounded-full bg-emerald-500" />
          </div>

          <p className="mb-8 text-base leading-relaxed text-slate-600">
            View a face from the side, or plot a few points on a front photo, and a handful
            of angles do most of the work. Here is what each one measures and the range
            aesthetic experts treat as balanced.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 mb-10">
            {facialMetrics.map((m) => (
              <a
                key={m.id}
                href={`#metric-${m.id}`}
                className="group flex flex-col items-center rounded-2xl bg-white p-4 text-center ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="mb-2 h-1 w-8 rounded-full" style={{ backgroundColor: m.brandColor }} />
                <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-600">{m.short}</p>
                <p className="text-xs text-slate-500">{m.name}</p>
              </a>
            ))}
          </div>

          <div className="rounded-2xl bg-white p-6 ring-1 ring-emerald-200 md:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              How an angle is calculated from three points
            </p>
            <div className="mt-4 rounded-xl bg-emerald-50/50 p-5 text-center ring-1 ring-emerald-100">
              <p className="text-lg font-bold text-slate-900 md:text-xl">
                <span className="text-emerald-600">angle at B</span>
                <span className="text-slate-400"> = </span>
                <span className="text-emerald-600">arccos</span>
                <span className="text-slate-500"> ( (BA · BC) / (|BA| × |BC|) )</span>
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                Three points A, B, C. The angle sits at the middle point B.
              </p>
            </div>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              That is the same formula the calculator runs when you tap the points on your
              photo. For the eye tilt it measures the slope of the line between your inner and
              outer eye corner. For the golden ratio it divides face length by face width.
              The math is exact. Your accuracy depends only on how carefully you place the
              points.
            </p>
          </div>

          <div className="mt-12">
            <FacialHarmonyRadarChart />
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {facialMetrics.map((m) => (
              <div
                key={m.id}
                id={`metric-${m.id}`}
                className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-md"
                style={{ borderTop: `4px solid ${m.brandColor}` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-white"
                    style={{ backgroundColor: m.brandColor }}
                  >
                    {m.unit === "deg" ? (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="5" r="2" />
                        <line x1="12" y1="9" x2="12" y2="21" />
                        <line x1="8" y1="15" x2="16" y2="15" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <line x1="9" y1="12" x2="15" y2="12" />
                        <line x1="12" y1="9" x2="12" y2="15" />
                      </svg>
                    )}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold leading-tight text-slate-900">{m.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{m.short}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{m.blurb}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 text-sm ring-1 ring-slate-200">
                  <span className="font-semibold text-slate-500">Balanced:</span>
                  {m.idealBySex ? (
                    <span className="font-bold text-slate-800">
                      {m.idealBySex.male.min}&ndash;{m.idealBySex.male.max}° men ·{" "}
                      {m.idealBySex.female.min}&ndash;{m.idealBySex.female.max}° women
                    </span>
                  ) : (
                    <span className="font-bold text-slate-800">
                      {m.ideal.min}{m.unit === "deg" ? "°" : ""}&ndash;{m.ideal.max}{m.unit === "deg" ? "°" : ""}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMBEDDED CALCULATOR WIDGET ────────────────── */}
      <section
        id="facial-harmony-calculator-widget"
        className="mx-auto max-w-5xl scroll-mt-20 px-6"
      >
        <div className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-2 ring-1 ring-emerald-200">
          <div className="rounded-[1.4rem] bg-white p-5 md:p-8">
            <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
              <div>
                <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Free Tool
                </span>
                <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                  Calculate Your Facial Harmony
                </h2>
                <p className="mt-2 text-slate-600">
                  Upload a photo and tap the landmark points, or type your angles by hand.
                  Get a harmony score, a per-feature breakdown, and the option to save and
                  compare. Your photo never leaves your device.
                </p>
              </div>
              <Link
                href="/health/facial-harmony-calculator"
                className="shrink-0 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Open full page ↗
              </Link>
            </div>
            <FacialHarmonyCalculator />
          </div>
        </div>
      </section>

      {/* ── TRACK YOUR RESULTS ────────────────────────── */}
      <section className="mx-auto mt-20 max-w-4xl px-6">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Track Your Results and Compare Over Time
        </h2>
        <p className="mt-3 text-slate-600">
          Most face-angle tools give you a number and forget it the moment you close the
          tab. This one keeps a private history on your device, so a measurement you take
          today still means something months from now.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              t: "Save every reading",
              d: "Each result is stored with its date and your harmony score. Nothing is sent to a server. It all stays in your browser.",
              icon: History,
            },
            {
              t: "Compare two dates side by side",
              d: "Tick any two saved results and the tool lays them out together, with the change in each angle marked up or down.",
              icon: BarChart3,
            },
            {
              t: "See the trend after a change",
              d: "Braces, a fitness change, or a procedure can shift these angles. Re-measure under the same conditions and watch the numbers move.",
              icon: Star,
            },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.t}
                className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 transition hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900">{f.t}</h3>
                <p className="mt-1 text-sm text-slate-600">{f.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PHOTO TIPS ────────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-4xl px-6">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          How to Get an Accurate Reading
        </h2>
        <p className="mt-2 text-slate-600">
          The math is only as good as the photo you feed it. These habits keep your numbers
          honest and repeatable.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {photoTips.map((t) => (
            <div
              key={t.id}
              className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200 transition hover:shadow-sm"
            >
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                ✓
              </span>
              <div>
                <p className="font-bold text-slate-900">{t.title}</p>
                <p className="text-sm text-slate-600">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACCURACY HABITS ──────────────────────────── */}
      <section className="mt-20 bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            What Helps and What Hurts Your Accuracy
          </h2>
          <p className="mt-3 text-slate-600">
            A few small habits make the difference between a number you can trust and one
            that changes every time you measure.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {accuracyHabits.map((h) => {
              const good = h.verdict === "good";
              return (
                <div
                  key={h.name}
                  className={`flex items-start gap-3 rounded-xl p-4 ring-1 transition hover:shadow-sm ${
                    good
                      ? "bg-emerald-50 ring-emerald-200"
                      : "bg-rose-50 ring-rose-200"
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
                    <p className="text-sm text-slate-600">{h.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-6">
          <h3 className="text-lg font-bold text-slate-900">
            A Note on What These Numbers Mean
          </h3>
          <p className="mt-2 text-sm text-slate-700">
            Mathematically average faces can look flat or synthetic, while a distinct nose
            or an uneven smile often adds the character people remember. These angles give
            you a blueprint of balance, nothing more. They do not measure expression,
            health, or worth. If you are weighing a cosmetic or orthodontic change, talk to
            a qualified professional who can assess your face in person. This tool is built
            for general interest, not medical advice.
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="text-3xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl bg-white p-5 ring-1 ring-slate-200 transition open:bg-slate-50 hover:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                {f.q}
                <span className="shrink-0 text-emerald-600 transition group-open:rotate-45 text-lg leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-700 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── BOTTOM LINE / FINAL CTA ──────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">The Bottom Line</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300 text-lg leading-relaxed">
            Math gives you a fair, repeatable way to read facial proportion, and it explains
            why some faces strike us as balanced. It is only half the story. The angles set
            the structure. Expression, symmetry, and the small things that make a face
            distinct bring it to life. Measure for curiosity, save your result, and let the
            number be one input among many.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/health/facial-harmony-calculator"
              className="rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-xl transition hover:bg-emerald-400"
            >
              Open Full Calculator →
            </Link>
            <Link
              href="/blog"
              className="rounded-xl bg-white/10 px-8 py-4 text-base font-bold text-white ring-1 ring-white/20 transition hover:bg-white/20"
            >
              Browse All Guides
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
