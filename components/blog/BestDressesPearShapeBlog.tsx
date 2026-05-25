"use client";

// components/blog/BestDressesPearShapeBlog.tsx
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/lib/blog/blogs-data";
import {
  pearDresses,
  pearNecklines,
  pearFabrics,
  pearAvoid,
  pearStylingRules,
} from "../../lib/blog/pear-dress-data";
import PearOutfitRecommender from "@/components/pear-shape/PearOutfitRecommender";
import PearProportionChart from "@/components/charts/PearProportionChart";
import PearLookbookPdfButton from "@/components/plans/PearLookbookPdfButton";

interface Props {
  blog: Blog;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const dressComparisonTable = [
  { type: "A-Line Dress", score: "10/10", why: "Skims hips, cinches waist — the pear-shape gold standard" },
  { type: "Fit-and-Flare", score: "9/10", why: "Flares naturally at the hip line, creating an hourglass shape" },
  { type: "Wrap Dress", score: "9/10", why: "Tie defines waist; adjustable fit works across hip sizes" },
  { type: "Bodycon", score: "4/10", why: "Clings to the widest part, exaggerating the hip-to-shoulder ratio" },
  { type: "Shift / Sack Dress", score: "3/10", why: "Hides the waist and adds visual width through the hips" },
  { type: "Drop-Waist Dress", score: "2/10", why: "Seam sits at hips — elongates the widest zone visually" },
  { type: "Boat-Neck Statement Dress", score: "8/10", why: "Widens shoulder frame to balance broader hips" },
  { type: "Peplum Top + Skirt", score: "8/10", why: "Flounce at the waist creates width above, balancing lower body" },
];

const celebrities = [
  {
    name: "Beyoncé",
    tip: "Frequently wears high-waist, A-line, and structured corset silhouettes that emphasize her waist and let the hip line breathe naturally.",
  },
  {
    name: "Jennifer Lopez",
    tip: "Gravitates toward wrap dresses, figure-skimming jersey gowns, and wide-leg trousers — always with a defined waist moment.",
  },
  {
    name: "Shakira",
    tip: "Loves fit-and-flare and ruched midi dresses that celebrate her curve ratio while keeping the upper body visually structured.",
  },
  {
    name: "Kim Kardashian",
    tip: "A pear-hourglass crossover — uses strong shoulder styling, corsetry, and high necklines to keep the visual balance at the top.",
  },
];

const visualIllusions = [
  {
    number: "01",
    title: "Widen the Shoulders",
    detail:
      "Boat necks, off-shoulder cuts, wide-strap tops, and statement sleeves all add visual breadth to the upper body — narrowing the perceived hip line without hiding it.",
  },
  {
    number: "02",
    title: "Define the Waist",
    detail:
      "A visible waist seam, wrap tie, or belt creates a clear mid-point between the bust and hip, producing the balanced hourglass silhouette most pear shapes are trying to achieve.",
  },
  {
    number: "03",
    title: "Soften the Hip Line",
    detail:
      "Soft draping fabrics (crepe, silk charmeuse, ponte) skim the hip rather than clinging. A-line and flared skirts add movement that softens angular proportions.",
  },
];

const beforeYouBuyChecklist = [
  { point: "Waist seam placement", detail: "Should sit at or just above your natural waist — not at the hip." },
  { point: "Fabric stretch", detail: "Stretch fabric in clingy cuts adds to the hip, not flatters it. Choose structured drape." },
  { point: "Hip drape", detail: "The skirt should skim and flow, not pull taut across the thigh." },
  { point: "Shoulder structure", detail: "Wider neckline or sleeve detail draws the eye upward and outward." },
  { point: "Neckline width", detail: "A wider neckline visually expands the chest to match the hip width." },
];

const indianWear = [
  { style: "Anarkali Kurta", why: "Flared from bust down — the A-line of Indian fashion. Perfectly balances hips." },
  { style: "A-Line Lehenga", why: "Skirt flares evenly from waist; avoids clinging at the thigh." },
  { style: "Straight Saree Drape", why: "Clean lines with a structured blouse add visual balance. Avoid heavy pleats at hip." },
  { style: "Boat-Neck / Wide-Neck Blouse", why: "Widens the shoulder frame to match the hip width." },
  { style: "Palazzo + Short Kurti", why: "Wide leg elongates; short top shows the waist. Classic pear-shape balance." },
  { style: "Empire-Waist Kurti", why: "Seam sits just under the bust; flows freely over hips — zero pulling." },
];

const extendedFAQs = [
  {
    q: "Can pear shapes wear maxi dresses?",
    a: "Yes — maxi dresses are excellent for pear shapes. A high-waisted maxi with a defined waist seam elongates the entire leg line and flows freely over the hips. Avoid heavy, gathered fabric at the hip zone.",
  },
  {
    q: "Can pear shapes wear satin dresses?",
    a: "With care. Bias-cut satin that is hip-length or mid-thigh pulls the eye directly to the widest point. Choose satin in an A-line or midi silhouette, and pair it with a structured neckline.",
  },
  {
    q: "Can pear shapes wear oversized dresses?",
    a: "Oversized works when the waist is still defined — think oversized shirt-dress belted at the waist. Without a belt or seam, you risk losing proportion entirely.",
  },
  {
    q: "What colors slim pear-shape hips?",
    a: "Dark, solid, low-contrast colors on the lower half reduce visual emphasis. Pair a neutral or dark bottom with a brighter, bolder top to draw the eye upward. Avoid large prints or horizontal patterns on the hips.",
  },
  {
    q: "How can pear shapes look taller?",
    a: "Monochromatic outfits from waist to toe elongates the body significantly. Pointed-toe shoes, high-waist bottoms, and midi-length skirts with a high slit all add perceived height.",
  },
  {
    q: "Can pear shapes wear crop tops?",
    a: "Absolutely. A crop top paired with high-waist wide-leg trousers or a midi skirt is one of the most flattering pear-shape combos — it shows the waist and adds visual width to the shoulder.",
  },
  {
    q: "What is the most flattering dress for a pear shape?",
    a: "The A-line dress is the universally most flattering cut for a pear shape — it cinches the waist and skims over hips and thighs. The fit-and-flare is a very close second for events that need more drama.",
  },
  {
    q: "Should pear shapes wear bodycon dresses?",
    a: "Generally no — clingy bodycon cuts emphasize the hip-to-waist contrast in a way that exaggerates rather than balances. If you love the look, choose a structured bodycon with a peplum hem or wear it under a longer blazer.",
  },
  {
    q: "Can a pear-shape body wear skinny jeans?",
    a: "Yes — but pair them with structured tops, statement sleeves, or a wider neckline. The trick is to add visual interest above the waist so the eye doesn't park on the hip line.",
  },
  {
    q: "What length skirt is best for a pear shape?",
    a: "Midi length that ends mid-calf is the sweet spot — it elongates the leg and skims the widest part of the hip. Avoid skirts that end exactly at the hip or upper thigh.",
  },
  {
    q: "Is the Pear Shape Lookbook PDF really free?",
    a: "Yes. Click the download button on this page and the PDF is generated instantly in your browser — no email, no signup.",
  },
];

const relatedGuides = [
  { label: "Best Jeans for Pear Shape", href: "/style/jeans-pear-shape" },
  { label: "Best Tops for Pear Shape", href: "/style/tops-pear-shape" },
  { label: "Saree & Lehenga Styling for Pear Shape", href: "/style/indian-wear-pear-shape" },
  { label: "Gym Wear for Pear Shape", href: "/style/gym-wear-pear-shape" },
  { label: "Wedding Dresses for Pear Shape", href: "/style/wedding-dresses-pear-shape" },
  { label: "Summer Outfits for Pear Shape", href: "/style/summer-outfits-pear-shape" },
];

// ─── TOC ────────────────────────────────────────────────────────────────────

const tocItems = [
  { id: "what-is-pear", label: "What Is a Pear Body Shape?" },
  { id: "common-problems", label: "Why Most Dresses Don't Work" },
  { id: "visual-illusions", label: "3 Visual Illusions Stylists Use" },
  { id: "dress-cuts", label: "Best Dress Cuts" },
  { id: "comparison-table", label: "Dress Comparison Table" },
  { id: "styling-rules", label: "4 Styling Rules" },
  { id: "necklines", label: "Best Necklines" },
  { id: "fabrics", label: "Fabric Cheat Sheet" },
  { id: "celebrities", label: "Celebrity Pear Shape Examples" },
  { id: "occasion-guide", label: "Occasion Guide" },
  { id: "indian-wear", label: "Indian Wear for Pear Shape" },
  { id: "before-you-buy", label: "Before You Buy: 5-Point Checklist" },
  { id: "mistakes", label: "Biggest Mistake Most Blogs Ignore" },
  { id: "avoid", label: "What to Avoid" },
  { id: "faq", label: "FAQ" },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function BestDressesPearShapeBlog({ blog }: Props) {
  // State for Image Lightbox Modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <article className="bg-white">
        {/* ── HERO ─────────────────────────────────────────── */}
        <header className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-emerald-50">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
            <div className="flex flex-col justify-center">
              <span className="inline-block w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                {blog.category}
              </span>

              <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                Best Dresses for{" "}
                <span className="bg-gradient-to-r from-rose-500 to-emerald-600 bg-clip-text text-transparent">
                  Pear Shape
                </span>{" "}
                Body
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Most dresses are cut for straight proportions — not pear-shape curves.
                That's why so many feel tight at the hips, loose at the bust, or make
                the lower body look heavier than it is. The right dress changes everything.
                This guide shows you exactly which cuts, fabrics, and necklines work —
                with a comparison table, occasion guide, celebrity examples, and a free lookbook PDF.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href={blog.ctaHref}
                  className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
                >
                  {blog.cta} →
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

              <p className="mt-5 text-xs text-slate-400 italic">
                Based on visual balance principles used in professional fashion styling.
              </p>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                className="object-contain"
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
              { label: "Dress Styles", value: `${pearDresses.length}` },
              { label: "Necklines", value: `${pearNecklines.length}` },
              { label: "Occasions", value: "6" },
              { label: "Lookbook PDF", value: "Free" },
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

        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {/* ── STICKY TABLE OF CONTENTS ──────────────── */}
            <aside className="hidden lg:block lg:w-60 xl:w-72 shrink-0">
              <div className="sticky top-24 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                  In This Guide
                </p>
                <nav className="space-y-2">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm leading-snug text-slate-600 transition-colors hover:text-rose-600 py-0.5"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* ── MAIN CONTENT ──────────────────────────── */}
            <div className="min-w-0 flex-1 max-w-3xl">
              {/* ── WHAT IS PEAR SHAPE ──────────────────── */}
              <section id="what-is-pear">
                <h2 className="scroll-mt-24 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  What Is a Pear Body Shape?
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  A pear shape — also called <strong>triangle</strong> or{" "}
                  <strong>A-shape</strong> — is defined by{" "}
                  <strong>hips that measure wider than your bust and shoulders</strong>,
                  paired with a naturally defined waist. Most of your weight sits below
                  the waistline, in the hips, thighs, and bottom.
                </p>

                <div className="mt-8 rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-100">
                  <h3 className="text-lg font-bold text-slate-900">
                    How to Know If You're a Pear Shape
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Check these three markers:
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700">
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">1</span>
                      <span><strong>Hip vs. shoulder width:</strong> Your hips measure at least 2 inches wider than your shoulders or bust.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">2</span>
                      <span><strong>Defined waist:</strong> Your waist is noticeably narrower than both your hips and bust.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">3</span>
                      <span><strong>Weight distribution:</strong> You carry most weight in the hips, thighs, and bottom — not the upper body.</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-slate-600">
                    It's one of the most common female body shapes — and celebrated by icons like Beyoncé, Jennifer Lopez, and Shakira.{" "}
                    <Link href="/health/body-shape-calculator" className="font-semibold text-emerald-700 underline">
                      Use our Body Shape Calculator
                    </Link>{" "}
                    to confirm yours in 30 seconds.
                  </p>
                </div>

                <div className="mt-8 space-y-6">
                  <p className="text-lg leading-8 text-slate-600">
                    The styling goal is simple:{" "}
                    <strong>balance the shoulders with the hips</strong> while
                    showcasing your waist. On a pear shape, the wrong cut adds visual
                    weight exactly where you don't want it. The right cut — a soft drape
                    over the hip, a defined waist, and a visual lift to the shoulders —
                    instantly creates an hourglass effect, regardless of dress size.
                  </p>
                </div>
              </section>

              {/* ── COMMON PROBLEMS ── */}
              <section id="common-problems" className="mt-20">
                <div className="rounded-3xl bg-rose-50 p-8 ring-1 ring-rose-100">
                  <h2 className="scroll-mt-24 text-3xl font-extrabold tracking-tight text-slate-900">
                    Why Most Dresses Don't Work for Pear Shapes
                  </h2>

                  <div className="mt-6 space-y-5 text-slate-700">
                    <p className="text-lg leading-8">
                      If you've ever tried a dress that fit your waist perfectly but felt
                      tight around the hips — or looked balanced in the mirror but heavy
                      in photos — you're not imagining it.
                    </p>

                    <p className="font-semibold text-slate-900">
                      Pear-shape women commonly struggle with dresses that:
                    </p>

                    <ul className="space-y-3">
                      {[
                        "Pull tightly across the thighs while gaping at the bust",
                        "Make hips appear wider in photos than they look in a mirror",
                        "Hide the waist completely with boxy or shift-style cuts",
                        "Add visual weight to the lower body with stiff or gathered fabric",
                        "Look great on hangers but don't drape correctly over the hip curve",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-lg leading-8">
                      The goal isn't to hide your body. It's to create{" "}
                      <strong>visual balance</strong> so your natural waist and curves
                      look intentional, elegant, and proportional. Every recommendation
                      in this guide is built around that principle.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── 3 VISUAL ILLUSIONS ──────────────── */}
              <section id="visual-illusions" className="mt-20">
                <h2 className="scroll-mt-24 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  The 3 Visual Illusions Professional Stylists Use
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Every great pear-shape outfit uses at least one of these three principles.
                  The best outfits use all three together.
                </p>

                <div className="mt-8 space-y-6">
                  {visualIllusions.map((illusion) => (
                    <div
                      key={illusion.number}
                      className="flex gap-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200"
                    >
                      <span className="shrink-0 text-5xl font-black text-slate-100">
                        {illusion.number}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{illusion.title}</h3>
                        <p className="mt-2 text-slate-600">{illusion.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── QUICK DRESS-CUT GRID (UPDATED) ─────────────────── */}
              <section id="dress-cuts" className="mt-20">
                <h2 className="scroll-mt-24 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  Best Dress Cuts for Pear Shape
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Not all dresses are created equal. These six cuts consistently deliver
                  the best shoulder-to-hip balance for pear-shaped women — ranked by fit score. Click any image to enlarge.
                </p>

                {/* Fully responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {pearDresses.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => setSelectedImage(d.image)}
                      className="group cursor-pointer flex flex-col items-center rounded-2xl bg-white p-5 text-center ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      {/* Responsive Image Box using aspect-ratio for a uniform look, while object-contain ensures proper display */}
                      <div className="relative mb-4 w-full aspect-[3/4] overflow-hidden rounded-xl bg-slate-50">
                        <Image
                          src={d.image}
                          alt={d.name}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-rose-600">
                        {d.name}
                      </p>
                      <p className="text-xs text-slate-500">Score {d.fitScore}/100</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── PROPORTION CHART ─────────────────────── */}
              <div className="mt-12">
                <PearProportionChart />
              </div>

              {/* ── STYLING RULES ────────────────────────── */}
              <section id="styling-rules" className="mt-20">
                <h2 className="scroll-mt-24 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  Four Styling Rules for Pear Shapes
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Before you shop, learn the four rules every pear-shape stylist uses.
                  They work for office, party, wedding, and everyday — no exceptions.
                </p>

                <div className="mt-8 space-y-6">
                  <ol className="space-y-5">
                    {pearStylingRules.map((rule, i) => (
                      <li
                        key={rule.title}
                        className="flex gap-5 rounded-2xl bg-white p-5 ring-1 ring-slate-200"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900">{rule.title}</p>
                          <p className="mt-1 text-slate-600">{rule.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="mt-6 text-slate-600">
                  Want it automated?{" "}
                  <Link href="/health/body-shape-calculator" className="font-semibold text-rose-600">
                    Try our Body Shape Calculator
                  </Link>{" "}
                  — it identifies your shape and feeds the rules into a custom outfit board.
                </p>
              </section>

              {/* ── THE BIGGEST MISTAKE ─────────────── */}
              <section id="mistakes" className="mt-20">
                <div className="rounded-3xl bg-amber-50 p-8 ring-1 ring-amber-200">
                  <h2 className="scroll-mt-24 text-2xl font-extrabold text-slate-900">
                    The Biggest Mistake Most Style Guides Ignore
                  </h2>
                  <p className="mt-4 text-lg text-slate-700">
                    Wearing <strong>dark bottoms alone</strong> does NOT balance pear-shape proportions —
                    if the upper body lacks structure, visual emphasis stays exactly where you don't want it.
                  </p>
                  <p className="mt-3 text-slate-600">
                    Dark bottoms work brilliantly when combined with a wide neckline, statement top, or structured
                    shoulders. The lower half only recedes when the upper body actively draws attention upward.
                    Think of it as a <em>visual trade</em>: you can't just subtract from below — you have to add above.
                  </p>
                </div>
              </section>

              {/* ── NECKLINE QUICK-REFERENCE TABLE ───────── */}
              <section id="necklines" className="mt-20">
                <h2 className="scroll-mt-24 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  Necklines That Flatter a Pear Shape
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Necklines do the heavy lifting — they widen the shoulder line and pull
                  the eye upward, creating an instant balancing effect before a single
                  styling choice has been made.
                </p>

                <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-slate-200">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead className="bg-slate-900 text-white">
                      <tr>
                        <th className="p-4 text-left">Neckline</th>
                        <th className="p-4 text-left">Why It Works</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {pearNecklines.map((n) => (
                        <tr key={n.name} className="hover:bg-slate-50">
                          <td className="p-4 font-bold text-rose-600">{n.name}</td>
                          <td className="p-4 text-slate-700">{n.why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ── FABRIC CHEAT SHEET ───────────────────── */}
              <section id="fabrics" className="mt-20">
                <h2 className="scroll-mt-24 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  Fabric Cheat Sheet
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  The fabric choice is half the outfit. The wrong fabric adds visual weight
                  at the hip — the right one skims, drapes, and flatters. Use this
                  list every time you shop.
                </p>

                <div className="mt-8 grid gap-3 md:grid-cols-2">
                  {pearFabrics.map((f) => {
                    const isLove = f.verdict === "love";
                    return (
                      <div
                        key={f.name}
                        className={`flex items-start gap-3 rounded-xl p-4 ring-1 ${
                          isLove ? "bg-emerald-50 ring-emerald-200" : "bg-rose-50 ring-rose-200"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                            isLove ? "bg-emerald-500" : "bg-rose-500"
                          }`}
                          aria-label={isLove ? "Recommended" : "Avoid"}
                        >
                          {isLove ? "♥" : "✕"}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900">{f.name}</p>
                          <p className="text-sm text-slate-600">{f.note}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ── CELEBRITY EXAMPLES ─────────────── */}
              <section id="celebrities" className="mt-20">
                <h2 className="scroll-mt-24 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                  Celebrity Pear Shape Style Lessons
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Some of the world's most iconic fashion moments belong to pear-shape women.
                  Here's what they consistently choose — and why it works.
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {celebrities.map((celeb) => (
                    <div
                      key={celeb.name}
                      className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"
                    >
                      <p className="text-lg font-extrabold text-rose-600">{celeb.name}</p>
                      <p className="mt-2 text-sm text-slate-600">{celeb.tip}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* ── INTERACTIVE RECOMMENDER (USP) ───────────── */}
        <section id="occasion-guide" className="scroll-mt-24 bg-slate-50 py-4">
          <div className="mx-auto max-w-6xl px-6">
            <PearOutfitRecommender />
          </div>
        </section>

        {/* ── INDIAN WEAR ──────────────────────── */}
        <section id="indian-wear" className="scroll-mt-24 mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Indian Wear for Pear Shape Body
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The same visual balance principles that apply to western wear translate
            beautifully into Indian fashion. These styles celebrate curves while
            keeping the silhouette proportional.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-slate-200">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-left">Style</th>
                  <th className="p-4 text-left">Why It Works for Pear Shape</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {indianWear.map((item) => (
                  <tr key={item.style} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-rose-600">{item.style}</td>
                    <td className="p-4 text-slate-700">{item.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Tip: For blouse necklines, boat-neck and square-neck styles widen the shoulder
            frame, balancing a broader hip in any lehenga or saree style.
          </p>
        </section>

        {/* ── BEFORE YOU BUY CHECKLIST ─────────── */}
        <section id="before-you-buy" className="scroll-mt-24 bg-slate-50 py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Before You Buy a Dress — Check These 5 Things
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Most style regrets come from skipping this checklist in the fitting
              room. Run through it before every purchase.
            </p>

            <div className="mt-8 space-y-4">
              {beforeYouBuyChecklist.map((item, i) => (
                <div
                  key={item.point}
                  className="flex gap-5 rounded-2xl bg-white p-5 ring-1 ring-slate-200"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-500 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{item.point}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT TO AVOID ─────────────────────────── */}
        <section id="avoid" className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            What to Avoid (Or Style Carefully)
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            None of these are forbidden — but they fight your natural proportions,
            so style them with intention.
          </p>

          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {pearAvoid.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
                  ✕
                </span>
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>    

        {/* ── LOOKBOOK PDF CTA ──────────────────────── */}
        <section className="bg-gradient-to-br from-rose-50 to-emerald-50 py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Take the guide with you
            </h2>
            <p className="mt-3 text-slate-600">
              Download a free, printable Pear Shape Lookbook — every dress, every
              neckline, every fabric tip in one PDF.
            </p>
            <div className="mt-8 flex justify-center">
              <PearLookbookPdfButton />
            </div>
          </div>
        </section>

        {/* ── EXTENDED FAQ ───── */}
        <section id="faq" className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Real questions from real pear-shape women — answered with the same
            visual-balance principles used throughout this guide.
          </p>

          <div className="mt-8 space-y-4">
            {extendedFAQs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl bg-white p-5 ring-1 ring-slate-200 open:bg-slate-50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
                  {f.q}
                  <span className="ml-4 text-rose-600 transition group-open:rotate-45">+</span>
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
              Not sure if you're a pear shape?
            </h2>
            <p className="mt-3 text-slate-300">
              Use our free Body Shape Calculator to confirm your shape and unlock
              personalized dress, jeans, and gym recommendations.
            </p>
            <Link
              href={blog.ctaHref}
              className="mt-8 inline-block rounded-xl bg-rose-500 px-8 py-4 text-base font-bold text-white shadow-xl transition hover:bg-rose-400"
            >
              {blog.cta} →
            </Link>
          </div>
        </section>
      </article>

      {/* ── IMAGE LIGHTBOX MODAL ─────────────────────── */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-4 sm:p-8 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          {/* Max height bounds it to 90% of screen height to never overflow viewport */}
          <div className="relative flex h-full max-h-[90vh] w-full max-w-5xl items-center justify-center">
            <Image
              src={selectedImage}
              alt="Enlarged Dress View"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
            
            {/* Close Button */}
            <button
              className="absolute right-0 top-0 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/30 md:-right-4 md:-top-4"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}