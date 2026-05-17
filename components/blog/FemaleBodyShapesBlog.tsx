"use client";

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

// ─── DATA ────────────────────────────────────────────────────────────────────

const realProblems = [
  {
    icon: "👖",
    problem: "Jeans fit perfectly on hips but leave a 3-inch gap at the waist",
  },
  {
    icon: "👗",
    problem: "A dress looks stunning on the model but completely wrong on you",
  },
  {
    icon: "🛍️",
    problem: "Online shopping is a constant cycle of ordering, disappointing, and returning",
  },
  {
    icon: "🪞",
    problem: "You constantly hide your stomach, hips, arms, or thighs in photos",
  },
  {
    icon: "😔",
    problem: "You lost weight but your proportions still feel the same",
  },
  {
    icon: "📱",
    problem: "Influencer outfit ideas never translate to your body in real life",
  },
];

const transformationBenefits = [
  "You stop buying clothes that never feel quite right",
  "You finally understand why certain cuts flatter you instantly",
  "Shopping becomes intentional — not stressful trial and error",
  "You stop comparing your body to women with completely different structures",
  "You build real confidence without chasing unrealistic beauty standards",
  "You save money by knowing exactly what will work before you buy",
];

const stylingMistakes = [
  {
    mistake: "Choosing size based only on weight or the scale number",
    fix: "Use your bust, waist, and hip measurements — not your weight — to find your true fit.",
  },
  {
    mistake: "Following trending outfits designed for a different body structure",
    fix: "Filter trends through your shape first. Not every trend is for every proportion.",
  },
  {
    mistake: "Hiding the entire body with oversized, shapeless clothing",
    fix: "Oversized works — but only when one element (a belt, a tuck, a waist seam) anchors the silhouette.",
  },
  {
    mistake: "Ignoring the shoulder-to-hip balance in every outfit",
    fix: "Every great outfit balances your widest point by drawing attention to the opposite zone.",
  },
  {
    mistake: "Shopping by color or print without considering cut first",
    fix: "Always choose silhouette and cut first. Color and print are secondary styling tools.",
  },
  {
    mistake: "Wearing all dark colors without upper-body structure",
    fix: "Dark bottoms slim — but only when the upper body actively draws the eye upward.",
  },
];

const shapeStyleHighlights = [
  {
    shape: "Pear",
    color: "#e11d48",
    tip: "A-line skirts, wide necklines, boat necks, and structured shoulders create immediate visual balance.",
    avoid: "Drop-waist styles and clingy skirts that start at the hip.",
    celebrity: "Beyoncé, Jennifer Lopez",
  },
  {
    shape: "Apple",
    color: "#d97706",
    tip: "Empire waistlines, V-necks, and wrap styles define the upper waist without pulling at the midsection.",
    avoid: "Tight waistbands and cinched belts at the widest point.",
    celebrity: "Queen Latifah, Adele",
  },
  {
    shape: "Hourglass",
    color: "#7c3aed",
    tip: "Wrap dresses, bodycon with soft fabric, and belted styles all celebrate the natural waist-to-hip ratio.",
    avoid: "Boxy, shapeless silhouettes that hide your waist entirely.",
    celebrity: "Marilyn Monroe, Scarlett Johansson",
  },
  {
    shape: "Rectangle",
    color: "#0891b2",
    tip: "Peplum tops, ruffles, belted dresses, and anything that adds visual curves at the waist.",
    avoid: "Straight-cut shift dresses that offer no visual definition.",
    celebrity: "Cameron Diaz, Natalie Portman",
  },
  {
    shape: "Inverted Triangle",
    color: "#16a34a",
    tip: "Wide-leg trousers, A-line skirts, and soft hip detail bring balance to broader shoulders.",
    avoid: "Boat necks and off-shoulder tops that add visual width to the widest zone.",
    celebrity: "Angelina Jolie, Naomi Campbell",
  },
];

const workoutFocus = [
  {
    shape: "Pear",
    goal: "Strengthen upper body to balance naturally wider hips",
    focus: "Shoulder press, lateral raises, pull-ups, rowing, upper-body HIIT",
    cardio: "Cycling and swimming to tone legs without building thigh volume",
  },
  {
    shape: "Apple",
    goal: "Core strengthening, metabolic cardio to reduce midsection weight",
    focus: "Planks, Pilates, functional core training, full-body circuits",
    cardio: "Brisk walking, swimming, elliptical — all low-impact steady-state",
  },
  {
    shape: "Hourglass",
    goal: "Maintain proportional balance — equal upper and lower strength",
    focus: "Full-body strength training, yoga, barre — avoid extreme bulking",
    cardio: "Dance cardio, jump rope, cycling — anything with rhythm and flow",
  },
  {
    shape: "Rectangle",
    goal: "Build curves — add definition at waist and glutes",
    focus: "Glute bridges, squats, hip thrusts, lateral leg raises, waist-targeting Pilates",
    cardio: "Moderate cardio — preserve muscle mass, don't over-strip curves",
  },
  {
    shape: "Inverted Triangle",
    goal: "Build lower body volume to balance broad shoulders",
    focus: "Squats, deadlifts, lunges, hip thrusts — heavy lower-body compound work",
    cardio: "Stairmaster, incline walking — anything that targets the glutes and thighs",
  },
];

const confidenceTips = [
  {
    number: "01",
    title: "Dress Your Proportions, Not Your Weight",
    detail:
      "Your shape is defined by your skeleton — not the number on the scale. A woman at 60 kg and 80 kg can have the exact same body shape and need the same styling rules. Weight changes; structure doesn't.",
  },
  {
    number: "02",
    title: "Find Your 'Anchor' Piece",
    detail:
      "Every body shape has one item that works almost universally — the A-line dress for Pear, the wrap dress for Hourglass, the wide-leg trouser for Inverted Triangle. When in doubt, go back to your anchor piece.",
  },
  {
    number: "03",
    title: "Stop Following Trends Blindly",
    detail:
      "Trends are designed on runway models with Rectangle proportions. Filter every trend through your shape before deciding if it works. Most trends have a shape-specific version that flatters each body type.",
  },
  {
    number: "04",
    title: "Use Color as a Styling Tool, Not a Hiding Tool",
    detail:
      "Dark colors don't slim on their own — they work when combined with structure. Bright or light color on a zone draws the eye there. Use this intentionally, not as camouflage.",
  },
  {
    number: "05",
    title: "You Don't Have to Love Every Part Every Day",
    detail:
      "Body positivity doesn't mean performing constant self-love. Understanding your proportions simply removes confusion and frustration — and that alone changes how you feel getting dressed each morning.",
  },
];

const shoppingTips = [
  {
    tip: "Always measure bust, waist, and hips before buying online",
    why: "Sizing labels vary massively between brands. Measurements don't.",
  },
  {
    tip: "Filter by silhouette first — color and print second",
    why: "The wrong cut in the perfect color still won't fit well. Shape comes first.",
  },
  {
    tip: "Read the fabric description before adding to cart",
    why: "Stiff fabric adds volume; soft draping fabric skims. Both serve different shapes differently.",
  },
  {
    tip: "Check where the waist seam sits on the model's body",
    why: "A waist seam placed at the model's natural waist may fall at your hip — completely changing the fit.",
  },
  {
    tip: "Look for 'pear-fit' or 'curvy' sizing on denim brands",
    why: "These cuts add extra room in the hips and thighs while tapering at the waist — solving the gap problem permanently.",
  },
  {
    tip: "Use the return policy as a fitting room",
    why: "Order two sizes when unsure. Keep the one that fits. Return the rest. This is how smart shape-aware women shop online.",
  },
];

const fabricGuide = [
  {
    fabric: "Crepe",
    verdict: "love",
    note: "Structured but fluid — holds its shape over curves without clinging. Universal for all body types.",
  },
  {
    fabric: "Ponte",
    verdict: "love",
    note: "Firm enough to smooth and sculpt. Ideal for Pear and Apple shapes that want structure at the waist.",
  },
  {
    fabric: "Silk Charmeuse",
    verdict: "love",
    note: "Skims and drapes beautifully over curves. Best on Hourglass and Pear when cut on the bias.",
  },
  {
    fabric: "Jersey (medium weight)",
    verdict: "love",
    note: "Comfortable stretch that follows your curve without exaggerating it. Avoid very light jersey.",
  },
  {
    fabric: "Chiffon",
    verdict: "love",
    note: "Light, flowing fabric that adds softness without bulk. Excellent layering option for all shapes.",
  },
  {
    fabric: "Stiff Denim (unstructured)",
    verdict: "avoid",
    note: "Adds visual bulk at the widest point. Structure without tailoring is rarely flattering on curves.",
  },
  {
    fabric: "Satin (bias cut, hip length)",
    verdict: "avoid",
    note: "Pulls and reflects light directly at the widest zone. Use satin only in A-line or midi silhouettes.",
  },
  {
    fabric: "Thick Knit / Ribbed Knit",
    verdict: "avoid",
    note: "Adds visual texture and bulk everywhere equally. Choose for tops only, not hip-length styles.",
  },
];

const tocItems = [
  { id: "emotional-truth", label: "Why Clothes Feel Wrong" },
  { id: "real-problems", label: "Struggles Most Women Share" },
  { id: "transformation", label: "What Changes When You Know" },
  { id: "what-is-shape", label: "What Is a Body Shape?" },
  { id: "five-shapes", label: "The 5 Female Body Shapes" },
  { id: "how-to-measure", label: "How to Measure at Home" },
  { id: "shape-highlights", label: "Shape Style Highlights" },
  { id: "styling-mistakes", label: "6 Styling Mistakes to Stop" },
  { id: "workout-focus", label: "Workout Guide by Shape" },
  { id: "fabric-guide", label: "Fabric Cheat Sheet" },
  { id: "shopping-tips", label: "Smart Shopping Tips" },
  { id: "confidence-tips", label: "5 Confidence Principles" },
  { id: "calculator", label: "Interactive Calculator" },
  { id: "faq", label: "FAQ" },
];

const extendedFAQs = [
  {
    q: "Can my body shape change over time?",
    a: "Yes. Hormonal shifts (puberty, pregnancy, menopause), weight changes, and aging all influence how your body distributes weight. Your underlying skeleton stays the same, but where your body carries fat can shift — meaning a Rectangle in her 20s may become more Pear-shaped after pregnancy, or more Apple-shaped after menopause.",
  },
  {
    q: "Which body shape is the 'best'?",
    a: "There is no best shape. Every shape has its own beauty and unique styling strengths. The Hourglass isn't inherently more beautiful than the Pear — it's simply proportioned differently. The goal is never to change your shape, but to dress, train, and care for it in a way that makes you feel confident and comfortable.",
  },
  {
    q: "Can I have a mixed body shape?",
    a: "Absolutely — and most women do. Many fall between two shapes (Pear-Hourglass, Rectangle-Apple, etc.). When your measurements don't clearly fit one category, identify your most dominant proportional feature (usually your widest measurement relative to your narrowest) and style for that first.",
  },
  {
    q: "Is body shape the same as body type?",
    a: "They're closely related but not identical. Body shape describes your visual silhouette (the ratio of bust, waist, and hips). Body type — like endomorph, mesomorph, ectomorph — describes how your body responds to food and exercise. Understanding both gives you a more complete picture for styling and fitness.",
  },
  {
    q: "Why do clothes designed for my size still not fit my shape?",
    a: "Because standard clothing sizing is based on one set of proportions — typically a Rectangle or slight Hourglass at a specific height. If your proportions differ from that standard (wider hips, narrower shoulders, fuller bust), standard sizing will always feel 'off' in one area or another. This is a fashion industry limitation, not a problem with your body.",
  },
  {
    q: "Do men have body shapes too?",
    a: "Yes — male shapes follow similar visual balance principles (Trapezoid, Rectangle, Oval, Triangle, Inverted Triangle). The same concept of dressing to balance proportions applies, just with different reference points and styling rules.",
  },
  {
    q: "Is the diet plan PDF really free?",
    a: "Yes. Click any 'Download Diet Plan PDF' button on this page to get a free, printable 7-day meal plan tailored to your shape's metabolic and hormonal tendencies.",
  },
  {
    q: "How accurate is the Body Shape Calculator?",
    a: "Our calculator uses the same measurement ratios used in professional fashion styling and personal image consulting — bust, waist, and hip measurements compared against standardized proportion thresholds. It's one of the most accurate free tools available because it uses three data points, not one.",
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

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
              The Reason Clothes Never Fit Right
              <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-rose-500 bg-clip-text text-transparent">
                May Have Nothing To Do With Your Weight
              </span>
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Most women spend years blaming themselves when the real issue is simply
              wearing silhouettes designed for a different body structure. Once you
              understand your natural proportions, everything changes — shopping, confidence,
              and how you see yourself.
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
              Based on real body proportion principles used in fashion styling, tailoring,
              and professional image consulting.
            </p>
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

      {/* ── EMOTIONAL TRUST SECTION ───────────────────── */}
      <section id="emotional-truth" className="scroll-mt-24 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            It's Not That Your Body Is Wrong.
            <span className="block text-emerald-600">
              Most Fashion Advice Just Isn't Made for Your Shape.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            If jeans feel too tight on your hips but loose at your waist, if dresses
            look completely different on you than on the model, or if you find yourself
            constantly hiding certain parts of your body — you are not alone. Millions
            of women experience this confusion daily.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            The real issue isn't your body. It's that standard fashion sizing and most
            style advice is built around one set of proportions — and yours may simply
            be different. Understanding your natural silhouette removes that confusion
            permanently.
          </p>

          <p className="mt-6 text-sm text-slate-500">
            Millions of women struggle with sizing confusion because fashion sizing is
            rarely designed around real, diverse body proportions. This guide is here
            to change that.
          </p>
        </div>
      </section>

      {/* ── REAL PROBLEMS GRID ───────────────────── */}
      <section id="real-problems" className="scroll-mt-24 bg-rose-50/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Common Struggles Women Face Before Understanding Their Shape
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              These problems are incredibly common — but most women never realize
              that body proportions, not body size, are the real reason behind them.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {realProblems.map((item) => (
              <div
                key={item.problem}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-rose-100"
              >
                <span className="text-3xl">{item.icon}</span>
                <p className="mt-3 text-base font-medium leading-7 text-slate-700">
                  {item.problem}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSFORMATION SECTION ───────────────────────── */}
      <section id="transformation" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                What Changes When You Finally Understand Your Body Shape?
              </h2>

              <div className="mt-8 space-y-5">
                {transformationBenefits.map((item) => (
                  <div key={item} className="flex gap-4">
                    <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-emerald-500" />
                    <p className="text-lg leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-rose-50 p-8 ring-1 ring-slate-200">
              <p className="text-lg leading-8 text-slate-700">
                Body shape knowledge isn't about changing who you are or chasing some
                ideal silhouette. It's about understanding how your natural proportions
                work — so you can dress with confidence and clarity instead of confusion
                and frustration.
              </p>

              <p className="mt-5 text-lg font-semibold text-slate-900">
                The goal is not perfection.
                The goal is feeling comfortable and intentional in your own body.
              </p>

              <p className="mt-5 text-sm text-slate-500">
                You do not need to love every part of your body every day. But understanding
                your proportions can remove a huge amount of confusion, frustration, and
                self-criticism from your daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND USP SECTION ─────────────────────────────────────────────────
          This is the brand authority differentiator — no other tool does this.
      ───────────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        {/* Decorative background detail */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-emerald-500 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-rose-500 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-emerald-500/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
              Why This Guide Is Different
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Built as a Style Intelligence System,{" "}
              <span className="text-emerald-400">Not Just a Blog</span>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Most "body shape" content online gives you a list and leaves you alone with it.
              We built something different — a complete system that connects your measurements
              to real outfit decisions, workout plans, and styling logic in one place.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "🧠",
                title: "Proportion Intelligence, Not Generic Advice",
                detail:
                  "Every recommendation — from dress cuts to fabric choices to necklines — is derived from the same visual balance principles used by professional fashion stylists and image consultants. Not crowd-sourced opinion. Structured knowledge.",
              },
              {
                icon: "🎯",
                title: "Shape-Specific. Not One-Size-Fits-All.",
                detail:
                  "Our calculator doesn't just label you. It connects your shape to a full styling ecosystem: dresses, jeans, tops, Indian wear, gym outfits, fabrics, and occasion-specific guides — all filtered through your specific proportions.",
              },
              {
                icon: "📐",
                title: "Measurement-First, Not Trend-First",
                detail:
                  "Trends are designed on runway proportions. We invert that approach. Start with your measurements, identify your structure, and then filter trends through what actually works for your silhouette — not the other way around.",
              },
              {
                icon: "🌸",
                title: "Built for Real Women's Bodies",
                detail:
                  "Not for standard sizing models. Our content accounts for the full spectrum of pear-hourglass cross-shapes, post-pregnancy proportion shifts, height variation, and bust-to-hip ratios that most style guides completely ignore.",
              },
              {
                icon: "📄",
                title: "Actionable Outputs You Can Use Today",
                detail:
                  "Every guide generates something you can act on immediately — a free PDF, a personalized outfit board, a diet plan, or a measurement card. Knowledge that becomes action is the only kind worth having.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-white/10"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-white/5 p-8 ring-1 ring-emerald-500/30 text-center">
            <p className="text-lg font-semibold text-emerald-400">
              "Understanding your proportions is not about dressing to hide your body.
              It's about dressing with enough knowledge that your body finally feels like
              the starting point — not the obstacle."
            </p>
            <p className="mt-3 text-sm text-slate-500">
              — The editorial principle this entire guide was built on
            </p>
          </div>
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

            {/* ── WHAT IS A BODY SHAPE ─────────────── */}
            <section id="what-is-shape" className="scroll-mt-24">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                What Is a Body Shape?
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Your body shape is determined by your{" "}
                <strong>bone structure and how your body naturally distributes weight</strong>{" "}
                across your bust, waist, and hips. It is not the same as body weight —
                two women at the same weight can have entirely different silhouettes and
                therefore entirely different styling needs.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Understanding your shape helps you choose clothing that honors your natural
                proportions, target the right kind of fitness training for your specific
                structure, and follow a diet plan that supports how your body naturally
                carries and distributes weight.
              </p>

              <div className="mt-8 rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-100">
                <h3 className="text-lg font-bold text-slate-900">
                  The key principle: Visual Balance
                </h3>
                <p className="mt-2 text-slate-700 leading-7">
                  Every styling rule in this guide — regardless of shape — comes back to
                  one idea: create a silhouette where your bust, waist, and hips appear
                  proportionally balanced. This isn't about achieving any particular
                  look. It's about understanding how clothing interacts with your natural
                  silhouette so you can make intentional choices instead of guesses.
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  This guide applies real body proportion principles used in fashion
                  styling, tailoring, and personal image consulting — not arbitrary
                  fashion rules.
                </p>
              </div>
            </section>

            {/* ── THE 5 SHAPES ─────────────────────────── */}
            <section id="five-shapes" className="scroll-mt-24 mt-20">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                The 5 Female Body Shapes
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Most women fall into one of five well-defined body shape categories:{" "}
                <strong>Pear, Apple, Hourglass, Rectangle,</strong> and{" "}
                <strong>Inverted Triangle</strong>. Each is defined by the ratio between
                bust, waist, and hip measurements — not by size, weight, or height.
              </p>

              {/* Quick Shape Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
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

              {/* Comparison Chart */}
              <div className="mt-14">
                <BodyShapeRatioChart />
              </div>
            </section>

            {/* ── HOW TO MEASURE ───────────────────────── */}
            <section id="how-to-measure" className="scroll-mt-24 mt-20">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                How to Measure Your Body Shape at Home
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Grab a soft measuring tape, stand relaxed in front of a mirror, and take
                three measurements. This takes less than two minutes and gives you
                everything you need.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    num: "1",
                    label: "Bust",
                    detail:
                      "Around the fullest part of your chest, keeping the tape level and parallel to the ground. Don't pull it tight — keep it snug but comfortable.",
                  },
                  {
                    num: "2",
                    label: "Waist",
                    detail:
                      "Around the narrowest part of your torso — usually about an inch above your belly button. Breathe normally and measure at the end of a natural exhale.",
                  },
                  {
                    num: "3",
                    label: "Hips",
                    detail:
                      "Around the widest part of your hips and seat — typically 7–9 inches below your natural waist. Keep feet together for an accurate reading.",
                  },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="flex gap-5 rounded-2xl bg-white p-5 ring-1 ring-slate-200"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                      {step.num}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">{step.label}</p>
                      <p className="mt-1 text-slate-600">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ratio Rule Table */}
              <div className="mt-10 overflow-hidden rounded-2xl ring-1 ring-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="p-4 text-left">Shape</th>
                      <th className="p-4 text-left">Measurement Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {bodyShapes.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold" style={{ color: s.brandColor }}>
                          {s.name}
                        </td>
                        <td className="p-4 text-slate-700">{s.ratioRule}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-5 text-slate-600">
                Skip the math entirely —{" "}
                <Link href="/health/body-shape-calculator" className="font-semibold text-emerald-600 underline">
                  use our Body Shape Calculator
                </Link>{" "}
                to get your shape identified in 30 seconds with personalized style
                recommendations included.
              </p>
            </section>

            {/* ── SHAPE STYLE HIGHLIGHTS ───────────────── */}
            <section id="shape-highlights" className="scroll-mt-24 mt-20">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Shape Style Highlights: What Works for Each Body
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Every body shape has styling strengths — and specific cuts and silhouettes
                that will always work in its favor. Here's the core principle for each,
                plus which celebrities share your proportions.
              </p>

              <div className="mt-8 space-y-6">
                {shapeStyleHighlights.map((item) => (
                  <div
                    key={item.shape}
                    className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {item.shape} Shape
                      </h3>
                    </div>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                          Best Choices
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-700">{item.tip}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-rose-500">
                          Style Carefully
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-700">{item.avoid}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Celebrity Examples
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-700">
                          {item.celebrity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 6 STYLING MISTAKES ───────────────────── */}
            <section id="styling-mistakes" className="scroll-mt-24 mt-20">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                6 Styling Mistakes Most Women Make (And the Fix)
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                These are the patterns that keep women frustrated with clothes, bodies,
                and shopping — despite trying harder every season.
              </p>

              <div className="mt-8 space-y-5">
                {stylingMistakes.map((item, i) => (
                  <div
                    key={item.mistake}
                    className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"
                  >
                    <div className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{item.mistake}</p>
                        <p className="mt-2 text-sm leading-6 text-emerald-700">
                          <strong>Fix:</strong> {item.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── WORKOUT FOCUS BY SHAPE ───────────────── */}
            <section id="workout-focus" className="scroll-mt-24 mt-20">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Workout Guide by Body Shape
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Your body shape isn't just a styling guide — it also tells you where
                your body naturally holds weight and how exercise can best create
                visual balance. These are the most effective focuses for each shape.
              </p>

              <div className="mt-8 space-y-5">
                {workoutFocus.map((item) => (
                  <div
                    key={item.shape}
                    className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"
                  >
                    <h3 className="text-base font-extrabold text-slate-900">
                      {item.shape} Shape
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-emerald-600">
                      Goal: {item.goal}
                    </p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Strength Focus
                        </p>
                        <p className="mt-1 text-sm text-slate-700">{item.focus}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Cardio Focus
                        </p>
                        <p className="mt-1 text-sm text-slate-700">{item.cardio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── FABRIC CHEAT SHEET ───────────────────── */}
            <section id="fabric-guide" className="scroll-mt-24 mt-20">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Fabric Cheat Sheet
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Fabric is half the outfit. The right fabric skims, drapes, and creates
                visual fluidity — the wrong one adds bulk and clings at the wrong moments.
                Use this every time you shop.
              </p>

              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {fabricGuide.map((f) => {
                  const isLove = f.verdict === "love";
                  return (
                    <div
                      key={f.fabric}
                      className={`flex items-start gap-3 rounded-xl p-4 ring-1 ${
                        isLove
                          ? "bg-emerald-50 ring-emerald-200"
                          : "bg-rose-50 ring-rose-200"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                          isLove ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                        aria-label={isLove ? "Recommended" : "Use With Care"}
                      >
                        {isLove ? "♥" : "✕"}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{f.fabric}</p>
                        <p className="text-sm text-slate-600">{f.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── SMART SHOPPING TIPS ──────────────────── */}
            <section id="shopping-tips" className="scroll-mt-24 mt-20">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Smart Shopping Tips for Every Body Shape
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Online shopping fails most women not because of their bodies, but because
                they're shopping without enough information. These rules change that.
              </p>

              <div className="mt-8 space-y-4">
                {shoppingTips.map((item, i) => (
                  <div
                    key={item.tip}
                    className="flex gap-5 rounded-2xl bg-white p-5 ring-1 ring-slate-200"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">{item.tip}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.why}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 5 CONFIDENCE PRINCIPLES ──────────────── */}
            <section id="confidence-tips" className="scroll-mt-24 mt-20">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                5 Principles for Dressing with Confidence
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Confidence in dressing isn't a personality trait. It's a skill — and it
                comes from knowledge, not from having a certain body type. These five
                principles are the foundation.
              </p>

              <div className="mt-8 space-y-6">
                {confidenceTips.map((item) => (
                  <div
                    key={item.number}
                    className="flex gap-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200"
                  >
                    <span className="shrink-0 text-5xl font-black text-slate-100">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* ── INTERACTIVE DASHBOARD (USP) ─────────────── */}
      <section id="calculator" className="scroll-mt-24 bg-slate-50 py-4">
        <div className="mx-auto max-w-6xl px-6">
          <BodyShapeDashboard />
        </div>
      </section>

      {/* ── PDF DOWNLOAD CTA ─────────────────────────── */}
      <section className="bg-gradient-to-br from-rose-50 to-emerald-50 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Take the full guide with you
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            Download a free personalized PDF — your body shape, styling rules, workout
            focus, and 7-day diet plan in one printable guide.
          </p>
          <Link
            href={blog.ctaHref}
            className="mt-8 inline-block rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-xl transition hover:bg-slate-800"
          >
            Find My Shape + Download Free PDF →
          </Link>
          <p className="mt-3 text-sm text-slate-400">
            No email required. No signup. Generated instantly in your browser.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section id="faq" className="scroll-mt-24 mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Real questions from real women — answered with the same proportion logic
          used throughout this guide.
        </p>

        <div className="mt-8 space-y-4">
          {extendedFAQs.map((f) => (
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
          <p className="mt-3 text-lg text-slate-300">
            Use our free Body Shape Calculator to get your result in 30 seconds — with
            personalized dress recommendations, workout guidance, and a free diet PDF
            included.
          </p>
          <Link
            href={blog.ctaHref}
            className="mt-8 inline-block rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-xl transition hover:bg-emerald-400"
          >
            {blog.cta} →
          </Link>
          <p className="mt-4 text-sm text-slate-500">
            Free. No account needed. Results in under a minute.
          </p>
        </div>
      </section>

    </article>
  );
}