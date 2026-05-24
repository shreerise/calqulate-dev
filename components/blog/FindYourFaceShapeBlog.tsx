// components/blog/FindYourFaceShapeBlog.tsx

"use client";
import Link from "next/link";
import type { Blog } from "@/lib/blog/blogs-data";
import { faceShapeGuides, faqs } from "@/lib/blog/face-shape-data";
import FaceShapeCalculator from "@/components/face-shape/FaceShapeCalculator";
import FaceShapeLookbookPdfButton from "@/components/face-shape/FaceShapeLookbookPdfButton";
import { ClickableImage } from "@/components/ui/image-lightbox";

interface Props {
  blog: Blog;
}

/**
 * "Find Your Face Shape" — full blog body.
 * Brand color: emerald (green).
 *
 * Structure (follows SEO brief recommended layout):
 *   1. Hero
 *   2. TL;DR summary
 *   3. Short intro
 *   4. Embedded calculator (early!)
 *   5. What is a face shape
 *   6. How to find your face shape (with / without measurements)
 *   7. Detector vs Quiz vs App
 *   8. Why it's hard
 *   9. How the calculator solves it
 *  10. All 8 face shape deep dives
 *  11. Glasses guide
 *  12. Hairstyle guide
 *  13. FAQs
 *  14. PDF download
 *  15. FAQPage JSON-LD schema injected
 */
export default function FindYourFaceShapeBlog({ blog }: Props) {
  // JSON-LD FAQ schema for AI Overview / rich results.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <article className="bg-white">
      {/* ── FAQ schema for Google rich results ──────────── */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
              {blog.category}
            </span>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              Find Your{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                Face Shape
              </span>{" "}
              Online Free
            </h1>

            <p className="mt-5 text-lg text-slate-600">
              A free face shape detector, quiz, and complete styling guide — find your face
              shape in under a minute, then pick glasses, hairstyles, haircuts, and beard
              styles that actually suit you.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/health/face-shape-calculator"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
              >
                Find My Face Shape Now →
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
            <ClickableImage
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ───────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16 lg:max-w-4xl">
        {/* ── TL;DR ───────────────────────────────────── */}
        <aside className="mb-12 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
          <h2 className="text-xl font-bold text-emerald-800 md:text-2xl">
            TL;DR — Find Your Face Shape in 30 Seconds
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700 md:text-base">
            <li>
              <strong className="text-emerald-700">The 8 face shapes:</strong> oval, round,
              square, heart, diamond, oblong, rectangle, and triangle.
            </li>
            <li>
              <strong className="text-emerald-700">Three quick checks:</strong> which part of
              your face is widest, is your face longer than wide, and is your jaw sharp or
              soft.
            </li>
            <li>
              <strong className="text-emerald-700">Use the free calculator below</strong> — no
              download, no sign-up, works on any phone or desktop.
            </li>
            <li>
              <strong className="text-emerald-700">For glasses:</strong> round faces suit
              angular frames; square faces suit round frames; heart faces suit rimless or
              bottom-heavy frames.
            </li>
            <li>
              <strong className="text-emerald-700">For haircuts:</strong> long faces need width
              (bangs, waves); round and square faces need length (layers, side parts).
            </li>
            <li>
              <strong className="text-emerald-700">Most accurate test:</strong> measurements
              and a guided quiz beat a single selfie because cameras distort proportions.
            </li>
          </ul>
        </aside>

        {/* ── Intro ──────────────────────────────────── */}
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-relaxed text-slate-700">
            Finding your face shape sounds simple, but it can be surprisingly confusing. One
            selfie makes your face look round, another makes it look longer, and your
            hairstyle or camera angle can completely hide your real facial proportions. That
            is why so many people search for a way to <strong>find your face shape online
            free</strong> before choosing glasses, hairstyles, haircuts, or makeup.
          </p>

          <p className="mt-5 text-base leading-relaxed text-slate-700">
            Our free face shape calculator helps you figure out your likely face shape using
            simple clues — face length, cheekbone width, forehead width, jawline, and chin
            shape. Whether you want a quick face shape detector, a 5-question quiz, or a guide
            to <strong>find my face shape for glasses</strong>, this page walks you through it
            step by step.
          </p>

          <div className="mt-8 rounded-xl border-l-4 border-emerald-600 bg-emerald-50/60 p-5">
            <p className="font-semibold text-slate-800">
              Knowing your face shape helps with choosing glasses, hairstyles, haircuts, beard
              styles, makeup, contouring, filters, and fashion choices — it&apos;s the single
              most useful piece of styling information you can have about yourself.
            </p>
          </div>
        </div>
      </div>

      {/* ── CALCULATOR EMBEDDED EARLY ────────────────── */}
      <section
        id="face-shape-calculator"
        className="mx-auto max-w-6xl scroll-mt-16 px-6 pb-12"
      >
        <FaceShapeCalculator />
      </section>

      {/* ── BACK TO BLOG CONTENT ─────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 py-6 lg:max-w-4xl">
        {/* ── What is a face shape ──────────────────── */}
        <section className="mt-6">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            What Is a Face Shape?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            A face shape is the overall outline of your face when viewed from the front — the
            way your forehead, cheekbones, jawline, and chin combine to form a recognizable
            silhouette. Most people fit into one of eight common face shapes:
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {faceShapeGuides.map((g) => (
              <a
                key={g.id}
                href={`#shape-${g.id}`}
                className="group flex flex-col items-center rounded-xl border border-slate-200 bg-white p-3 text-center transition hover:border-emerald-300 hover:shadow-md"
              >
                <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                  {g.label.replace(" Face Shape", "")}
                </span>
              </a>
            ))}
          </div>

          <p className="mt-6 text-base leading-relaxed text-slate-700">
            Your face shape depends on five things:{" "}
            <strong>forehead width, cheekbone width, jawline width, face length, and chin
            shape</strong>. When you know how those measurements compare, your shape becomes
            obvious — and that&apos;s exactly what the calculator above checks for you.
          </p>
        </section>

        {/* ── How to find your face shape ───────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            How to Find Your Face Shape
          </h2>
          <p className="mt-3 text-base text-slate-700">
            There are two reliable ways to figure out your face shape. Use whichever feels
            easier — both lead to the same answer.
          </p>

          {/* Method 1 */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-900">
              Method 1: How to Find Your Face Shape Without Measurements
            </h3>
            <p className="mt-3 text-base text-slate-700">
              You can find your face shape without a measuring tape. Tie your hair back, stand
              in front of a mirror in good lighting, and ask yourself four questions:
            </p>
            <ol className="mt-4 space-y-3 text-base text-slate-700">
              <NumberedStep n={1} title="Which part is widest?">
                Look at your forehead, cheekbones, and jawline. The widest one tells you a lot
                — forehead-widest is usually heart-shaped, cheek-widest is often diamond or
                oval, jaw-widest is triangle or square.
              </NumberedStep>
              <NumberedStep n={2} title="Is your face longer or balanced?">
                Compare top of forehead to chin against ear-to-ear width. If they&apos;re
                similar, you&apos;re in the round/square family. If length is much greater,
                you&apos;re in the oval/oblong/rectangle family.
              </NumberedStep>
              <NumberedStep n={3} title="Is your jawline sharp or soft?">
                Sharp, angular jaw → square or rectangle. Soft, rounded jaw → round, oval, or
                oblong. Narrow or pointed → heart or diamond.
              </NumberedStep>
              <NumberedStep n={4} title="What does your chin look like?">
                Rounded chin = round or oval. Pointed chin = heart or diamond. Squared chin =
                square, rectangle, or triangle.
              </NumberedStep>
            </ol>
          </div>

          {/* Method 2 */}
          <div className="mt-10">
            <h3 className="text-xl font-bold text-slate-900">
              Method 2: How to Find Your Face Shape With Measurements
            </h3>
            <p className="mt-3 text-base text-slate-700">
              For a more accurate answer, use a soft measuring tape and write down four
              numbers (cm or inches — it doesn&apos;t matter, we&apos;re comparing ratios):
            </p>
            <ol className="mt-4 space-y-3 text-base text-slate-700">
              <NumberedStep n={1} title="Forehead width">
                Across the widest part of your forehead, temple to temple.
              </NumberedStep>
              <NumberedStep n={2} title="Cheekbone width">
                The outer edge of one cheekbone to the other, just under the eyes.
              </NumberedStep>
              <NumberedStep n={3} title="Jawline width">
                Just below the ears, around the curve to the chin.
              </NumberedStep>
              <NumberedStep n={4} title="Face length">
                Center of the hairline straight down to the bottom of your chin.
              </NumberedStep>
            </ol>

            <p className="mt-5 text-base text-slate-700">Compare the numbers:</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 md:text-base">
              <li>
                <strong className="text-emerald-700">Oval face:</strong> Face length is longer
                than width; cheekbones are the widest point; jaw is softly rounded.
              </li>
              <li>
                <strong className="text-emerald-700">Round face:</strong> Length and width are
                similar; soft jawline; full cheeks.
              </li>
              <li>
                <strong className="text-emerald-700">Square face:</strong> Forehead,
                cheekbones, and jaw are similar in width; strong, angular jaw.
              </li>
              <li>
                <strong className="text-emerald-700">Heart face:</strong> Wider forehead,
                narrower chin.
              </li>
              <li>
                <strong className="text-emerald-700">Diamond face:</strong> Cheekbones are
                widest, narrow forehead and jaw.
              </li>
              <li>
                <strong className="text-emerald-700">Oblong face shape:</strong> Face is
                noticeably longer than wide, with similar widths across.
              </li>
              <li>
                <strong className="text-emerald-700">Rectangle face:</strong> Long face with a
                stronger, straighter jawline.
              </li>
              <li>
                <strong className="text-emerald-700">Triangle face:</strong> Jawline is wider
                than forehead.
              </li>
            </ul>
          </div>
        </section>

        {/* ── Detector vs Quiz vs App ───────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Face Shape Detector vs Face Shape Quiz vs Face Shape App
          </h2>
          <p className="mt-3 text-base text-slate-700">
            People search for all three — and they&apos;re not the same. Here&apos;s how to
            choose:
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Face shape detector"
              body="A tool that analyzes your facial proportions — either from measurements or from answers about your features. Our calculator above is a face shape detector."
            />
            <InfoCard
              title="Face shape quiz"
              body="A guided 5-question quiz that asks about your forehead, cheekbones, jawline, chin, and face length. Best for users who don't want to measure anything."
            />
            <InfoCard
              title="Face shape app"
              body="A downloadable app that often uses AR filters or camera AI. Convenient, but accuracy depends on lighting and angle. Many users prefer a no-download tool."
            />
          </div>

          <p className="mt-6 text-base text-slate-700">
            Our online face shape detector and quiz can be a faster, more reliable option than
            downloading a <strong>find your face shape app</strong> — there&apos;s nothing to
            install, no permissions required, and it works in any browser.
          </p>
        </section>

        {/* ── Why it's hard ─────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Why It Is Hard to Find Your Face Shape
          </h2>
          <p className="mt-3 text-base text-slate-700">
            If you&apos;ve ever looked in the mirror and thought &quot;I see three different
            face shapes,&quot; you&apos;re not alone. Several real problems get in the way:
          </p>

          <ul className="mt-5 space-y-3 text-base text-slate-700">
            {[
              "Selfies distort proportions — phone cameras use wide-angle lenses that make the forehead look bigger and the chin look smaller.",
              "Camera angles change your face length — a slightly tilted phone can turn an oblong into an oval.",
              "Hairstyles hide the forehead and jaw, making it almost impossible to see your true outline.",
              "Weight changes affect facial fullness, especially in the cheeks and jaw.",
              "Many people have a mix of two face shapes (oval-square, heart-diamond) and don't fit a single label cleanly.",
              "Lighting and shadow can make a soft jaw look sharper, or a sharp jaw look soft.",
              "AR filters and beauty apps change facial proportions automatically — so what you see isn't what you have.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── How calc solves it ────────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            How Our Face Shape Calculator Solves This Problem
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Instead of guessing from a single selfie, our face shape detector uses multiple
            signals — the shape of your jaw, the widths of your face, the relationship between
            length and width, and the look of your chin. It gives you a structured answer
            instead of a vague impression.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoCard title="Saves time" body="A face shape result in under 30 seconds — no app to download, no account to create." />
            <InfoCard title="Works online" body="Open it on your phone, tablet, or laptop. Anywhere with a browser." />
            <InfoCard title="Free forever" body="No paywall, no email gate, no premium tier. Just use it." />
            <InfoCard title="Beginner-friendly" body="The quiz uses plain language — no measurements required if you don't want them." />
            <InfoCard title="Actionable result" body="Every result includes glasses, hairstyle, and beard recommendations you can use today." />
            <InfoCard title="No download needed" body="A genuine alternative to a find your face shape app — the same answer, faster." />
          </div>
        </section>

        {/* ── Glasses guide ─────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Find My Face Shape for Glasses
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            The right glasses balance your face. The rule is simple: pick frames that
            contrast with your natural lines. Sharp jaw? Go soft. Soft round face? Go
            angular. Here&apos;s a face-by-face breakdown:
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-emerald-50 text-xs uppercase tracking-wider text-emerald-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Face Shape</th>
                  <th className="px-4 py-3 font-bold">Best Frame Styles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {faceShapeGuides.map((g) => (
                  <tr key={g.id} className="even:bg-slate-50/40">
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900">
                      {g.label.replace(" Face Shape", "")}
                    </td>
                    <td className="px-4 py-3">{g.bestGlasses.slice(0, 2).join(" • ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Hairstyle guide ───────────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Find Your Face Shape and Hairstyle
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Your face shape is the strongest predictor of which haircuts will suit you.
            Whether you&apos;re trying to find your face shape for a haircut as a man or a
            woman, the principle is the same: balance length with width.
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-emerald-50 text-xs uppercase tracking-wider text-emerald-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Face Shape</th>
                  <th className="px-4 py-3 font-bold">Hairstyle Ideas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {faceShapeGuides.map((g) => (
                  <tr key={g.id} className="even:bg-slate-50/40">
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900">
                      {g.label.replace(" Face Shape", "")}
                    </td>
                    <td className="px-4 py-3">{g.bestHairstyles.slice(0, 2).join(" • ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-base text-slate-700">
            For men, the same logic applies to beard styles. A square face benefits from a
            softly rounded beard. A round face benefits from a goatee that adds vertical
            length. A heart face benefits from a fuller beard that adds weight to a narrower
            chin.
          </p>
        </section>

        {/* ── 8 face shape deep dives ──────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Face Shape Types Explained
          </h2>
          <p className="mt-3 text-base text-slate-700">
            Below is a detailed guide for every face shape — how to identify it, common
            features, the best glasses and hairstyles, and the most common mistake people
            make.
          </p>

          <div className="mt-8 space-y-12">
            {faceShapeGuides.map((g, idx) => (
              <FaceShapeBlock key={g.id} guide={g} index={idx} />
            ))}
          </div>
        </section>

        {/* ── Conclusion / CTA ─────────────────────── */}
        <section className="mt-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Stop Guessing — Find Your Face Shape Now
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Instead of guessing, use our free face shape calculator to find your face shape
            online and get better ideas for glasses, hairstyles, haircuts, and personal
            styling. You&apos;ll have an answer in less than a minute.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#face-shape-calculator"
              className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
            >
              Use Free Face Shape Detector →
            </Link>
            <FaceShapeLookbookPdfButton />
          </div>
        </section>

        {/* ── FAQs ─────────────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {faqs.map((f, idx) => (
              <details
                key={f.q}
                className="group p-5 open:bg-emerald-50/40"
                open={idx === 0}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-slate-900">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Final CTA strip ──────────────────────── */}
        <div className="mt-14 rounded-2xl border border-emerald-200 bg-white p-6 text-center shadow-sm md:p-8">
          <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
            Ready to find your face shape?
          </h3>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Use the calculator at the top of this page to get your result in under a minute —
            free, no download, works on any device.
          </p>
          <Link
            href="#face-shape-calculator"
            className="mt-5 inline-block rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
          >
            Start Face Shape Quiz →
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────
 * Sub-components
 * ─────────────────────────────────────────────────────── */

function FaceShapeBlock({
  guide,
  index,
}: {
  guide: (typeof faceShapeGuides)[number];
  index: number;
}) {
  return (
    <div
      id={`shape-${guide.id}`}
      className="scroll-mt-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Image side */}
        <div className="md:w-2/5 self-start">
          <ClickableImage
            src={`/blog/face-shape/shape-${guide.id}.jpg`}
            alt={`${guide.label} — illustration and styling guide`}
            fill
            containerClassName="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-emerald-50"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
          />
        </div>

        {/* Content side */}
        <div className="flex-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Face shape {index + 1} of 8
          </span>
          <h3 className="mt-2 text-xl font-bold text-slate-900 md:text-2xl">
            {guide.label}
          </h3>

          <p className="mt-3 text-base text-slate-700">{guide.shortDescription}</p>

          <p className="mt-4 text-sm font-semibold text-slate-800">How to identify:</p>
          <p className="mt-1 text-sm text-slate-600 md:text-base">{guide.howToIdentify}</p>

          <p className="mt-4 text-sm font-semibold text-slate-800">Common features:</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {guide.features.map((f) => (
              <li
                key={f}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                ✓ Best glasses
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {guide.bestGlasses.map((j) => (
                  <li key={j}>• {j}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                ✓ Best hairstyles
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {guide.bestHairstyles.map((j) => (
                  <li key={j}>• {j}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-red-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-red-700">
              Common mistake
            </p>
            <p className="mt-1 text-sm text-slate-700">{guide.commonMistake}</p>
          </div>

          <div className="mt-4 rounded-xl border-l-4 border-emerald-500 bg-emerald-50/50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Stylist tip
            </p>
            <p className="mt-1 text-sm text-slate-700">{guide.styleTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{body}</p>
    </div>
  );
}

function NumberedStep({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
        {n}
      </span>
      <div>
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{children}</p>
      </div>
    </li>
  );
}
