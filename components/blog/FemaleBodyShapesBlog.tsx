"use client"

// components/blog/FemaleBodyShapesBlog.tsx
import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/lib/blog/blogs-data";
import { bodyShapes } from "@/lib/blog/body-shapes-data";
import BodyShapeDashboard from "@/components/body-shape/BodyShapeDashboard";
import BodyShapeRatioChart from "@/components/charts/BodyShapeRatioChart";

interface Props {
  blog: Blog;
}

export default function FemaleBodyShapesBlog({ blog }: Props) {
  return (
    <article className="bg-white">
      {/* ── HERO ─────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-emerald-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
              {blog.category}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              Your Body Isn’t the Problem-{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-rose-500 bg-clip-text text-transparent">
                You’re Dressing for the Wrong Body Shape
              </span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              {blog.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href={blog.ctaHref}
                className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
              >
                {blog.cta} →
              </Link>
              <span className="text-sm text-slate-500">
                {blog.readTime} • Updated {new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
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
            { label: "Body Shapes", value: "5" },
            { label: "Dress Styles", value: "20+" },
            { label: "Diet Plans", value: "5" },
            { label: "PDF Downloads", value: "Free" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 text-center">
              <p className="text-3xl font-bold text-slate-900 md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        {/* ── INTRO ─────────────────────────────────── */}
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700">
          <h2>What is a Body Shape?</h2>
          <p>
            Your body shape is determined by your <strong>bone structure and how your body
            naturally distributes weight</strong> across your bust, waist, and hips. It is not the
            same as body weight — two women at the same weight can have entirely different
            shapes.
          </p>
          <p>
            Understanding your shape helps you choose clothing that flatters your proportions,
            target the right kind of fitness training, and follow a diet plan that supports
            your body's unique metabolism.
          </p>

          <h2>The 5 Female Body Shapes</h2>
          <p>
            Most women fall into one of five well-defined body shape categories:{" "}
            <strong>Pear, Apple, Hourglass, Rectangle,</strong> and{" "}
            <strong>Inverted Triangle</strong>. Each is defined by the ratio between bust,
            waist, and hip measurements.
          </p>
        </div>

        {/* ── QUICK SHAPE GRID ─────────────────────── */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {bodyShapes.map((s) => (
            <a
              key={s.id}
              href={`#shape-${s.id}`}
              className="group flex flex-col items-center rounded-2xl bg-white p-5 text-center ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-xl">
                <Image
                  src={s.illustration}
                  alt={s.name}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
              <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-600">
                {s.name}
              </p>
              <p className="text-xs text-slate-500">{s.alsoKnownAs}</p>
            </a>
          ))}
        </div>

        {/* ── COMPARISON CHART ─────────────────────── */}
        <div className="mt-16">
          <BodyShapeRatioChart />
        </div>

        {/* ── HOW TO MEASURE ───────────────────────── */}
        <div className="prose prose-slate prose-lg mt-16 max-w-none">
          <h2>How to Measure Your Body Shape at Home</h2>
          <p>
            Grab a soft measuring tape, stand relaxed, and take three measurements:
          </p>
          <ol>
            <li>
              <strong>Bust:</strong> Around the fullest part of your chest, keeping the tape
              level under your armpits.
            </li>
            <li>
              <strong>Waist:</strong> Around the narrowest part of your torso — usually about
              an inch above your belly button.
            </li>
            <li>
              <strong>Hips:</strong> Around the widest part of your hips and butt.
            </li>
          </ol>
          <p>
            Then compare the three numbers using the rules below — or skip the math and let
            our{" "}
            <Link href="/health/body-shape-calculator" className="font-semibold text-emerald-600">
              Body Shape Calculator
            </Link>{" "}
            do it instantly.
          </p>
        </div>

        {/* ── RULE QUICK-REFERENCE ─────────────────── */}
        <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4 text-left">Shape</th>
                <th className="p-4 text-left">Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {bodyShapes.map((s) => (
                <tr key={s.id}>
                  <td className="p-4 font-bold" style={{ color: s.brandColor }}>
                    {s.name}
                  </td>
                  <td className="p-4 text-slate-700">{s.ratioRule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── INTERACTIVE DASHBOARD (USP) ─────────────── */}
      <div className="bg-slate-50 py-4">
        <div className="mx-auto max-w-6xl px-6">
          <BodyShapeDashboard />
        </div>
      </div>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-4">
          {[
            {
              q: "Can my body shape change over time?",
              a: "Yes. Hormonal shifts (puberty, pregnancy, menopause), weight changes, and aging all influence shape. Your underlying skeleton stays the same, but fat distribution can shift — meaning a Rectangle in her 20s may become an Hourglass after pregnancy, or an Apple after menopause.",
            },
            {
              q: "Which body shape is the 'best'?",
              a: "There is no best shape — every shape has its own beauty and styling strengths. The goal isn't to change your shape but to dress, train, and eat in a way that supports it.",
            },
            {
              q: "Can I have a mixed body shape?",
              a: "Absolutely. Many women fall between two shapes (e.g., Pear-Hourglass). When in doubt, dress for the more dominant feature — usually your hips or shoulders.",
            },
            {
              q: "Do men have body shapes too?",
              a: "Yes — male shapes follow similar logic (Trapezoid, Rectangle, Oval, Triangle, Inverted Triangle). See our companion guide on Male Body Shapes.",
            },
            {
              q: "Is the diet plan PDF really free?",
              a: "Yes. Click any 'Download Diet Plan PDF' button on this page to get a free, personalized 7-day meal plan tailored to your shape's metabolic needs.",
            },
          ].map((f) => (
            <details
              key={f.q}
              className="group rounded-xl bg-white p-5 ring-1 ring-slate-200 open:bg-slate-50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
                {f.q}
                <span className="ml-4 text-emerald-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to find your shape?
          </h2>
          <p className="mt-3 text-slate-300">
            Use our free Body Shape Calculator to get instant results, dress recommendations,
            and a personalized diet PDF.
          </p>
          <Link
            href={blog.ctaHref}
            className="mt-8 inline-block rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-xl transition hover:bg-emerald-400"
          >
            {blog.cta} →
          </Link>
        </div>
      </section>
    </article>
  );
}
