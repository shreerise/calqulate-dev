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

// ── EMBEDDED CALCULATOR ────────────────────────────────────────────
// Same reusable component your /tools/facial-harmony-calculator page renders.
// If your export lives at a different path, adjust this single line.
import FacialHarmonyCalculator from "@/components/calculators/FacialHarmonyCalculator";

interface Props {
  blog: Blog;
}

export default function FacialHarmonyBlog({ blog }: Props) {
  return (
    <article className="bg-white">
      {/* ── HERO ─────────────────────────────────────────── */}
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
            { label: "Measurements", value: `${facialMetrics.length}` },
            { label: "Input Methods", value: "2" },
            { label: "Saved History", value: "Yes" },
            { label: "Calculator", value: "Free" },
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
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-emerald-600 prose-strong:text-slate-900">
          <h2>Beauty Has a Measurable Side</h2>
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
            <Link href="/tools/facial-harmony-calculator">facial harmony calculator</Link>{" "}
            that does the trigonometry for you. You can upload a photo and tap the points,
            or type in numbers you measured yourself. Either way you get a harmony score,
            a breakdown of each feature, and the option to save your result and compare it
            later.
          </p>

          <h2>The Golden Ratio, Phi 1.618</h2>
          <p>
            The Greeks found a proportion they called Phi, roughly{" "}
            <strong>1.618</strong>, and it keeps turning up in nature, from the spiral of a
            shell to the branching of a plant. When a face sits close to this ratio, most
            people read it as balanced. The link is not magic. We see well-proportioned
            faces as a sign of health, and the brain tends to prefer what it can process
            easily.
          </p>
          <p>In a face that fits the ratio well, two relationships stand out:</p>
          <ul>
            <li>
              The <strong>length of the face</strong> is about 1.618 times its{" "}
              <strong>width</strong>.
            </li>
            <li>
              The distance from the base of the nose to the chin is roughly 1.618 times the
              distance from the bottom of the lips to the chin.
            </li>
          </ul>
          <p>
            Treat the ratio as a guide, not a grade. Plenty of faces people love sit a
            little outside it, and that is the point we keep coming back to in this article.
          </p>

          <h2>The Rule of Thirds and Fifths</h2>
          <p>
            Before measuring any angle, surgeons map the face onto a simple grid. It tells
            them at a glance whether the features are spaced evenly.
          </p>
          <ul>
            <li>
              <strong>Vertical thirds.</strong> A balanced face splits into three roughly
              equal bands: hairline to brow, brow to base of the nose, and base of the nose
              to the bottom of the chin.
            </li>
            <li>
              <strong>Horizontal fifths.</strong> Across the face, the width should fit
              about five eye-widths. The gap between the eyes is close to one eye-width.
            </li>
          </ul>
          <p>
            These zones explain why a face can look slightly off even when each feature is
            fine on its own. If one third runs long, or the eyes sit wide, the proportion
            shifts and the eye notices.
          </p>
        </div>

        {/* ── METRIC QUICK GRID ─────────────────────── */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {facialMetrics.map((m) => (
            <a
              key={m.id}
              href={`#metric-${m.id}`}
              className="group flex flex-col items-center rounded-2xl bg-white p-5 text-center ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-xs font-bold text-white"
                style={{ backgroundColor: m.brandColor }}
              >
                {m.unit === "deg" ? "°" : "φ"}
              </div>
              <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-600">
                {m.short}
              </p>
              <p className="text-xs text-slate-500">{m.name}</p>
            </a>
          ))}
        </div>

        {/* ── THE ANGLES / MATH ─────────────────────── */}
        <div className="prose prose-slate prose-lg mt-16 max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-strong:text-slate-900">
          <h2>The Six Measurements That Decide Facial Harmony</h2>
          <p>
            View a face from the side, or plot a few points on a front photo, and a handful
            of angles do most of the work. Here is what each one measures and the range
            aesthetic experts treat as balanced.
          </p>
        </div>

        {/* Formula card */}
        <div className="mt-6 rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-200 md:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            How an angle is calculated from three points
          </p>
          <div className="mt-4 rounded-xl bg-white p-5 text-center ring-1 ring-emerald-200">
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
          <p className="mt-4 text-sm text-slate-600">
            That is the same formula the calculator runs when you tap the points on your
            photo. For the eye tilt it measures the slope of the line between your inner and
            outer eye corner. For the golden ratio it divides face length by face width.
            The math is exact. Your accuracy depends only on how carefully you place the
            points.
          </p>
        </div>

        {/* ── CHART ─────────────────────────────────── */}
        <div className="mt-12">
          <FacialHarmonyRadarChart />
        </div>

        {/* metric deep cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {facialMetrics.map((m) => (
            <div
              key={m.id}
              id={`metric-${m.id}`}
              className="rounded-2xl bg-white p-6 ring-1 ring-slate-200"
              style={{ borderTop: `4px solid ${m.brandColor}` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white"
                  style={{ backgroundColor: m.brandColor }}
                >
                  {m.unit === "deg" ? "°" : "φ"}
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-tight text-slate-900">
                    {m.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {m.short}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{m.blurb}</p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 text-sm ring-1 ring-slate-200">
                <span className="font-semibold text-slate-500">Balanced:</span>
                {m.idealBySex ? (
                  <span className="font-bold text-slate-800">
                    {m.idealBySex.male.min}&ndash;{m.idealBySex.male.max}° men ·{" "}
                    {m.idealBySex.female.min}&ndash;{m.idealBySex.female.max}° women
                  </span>
                ) : (
                  <span className="font-bold text-slate-800">
                    {m.ideal.min}
                    {m.unit === "deg" ? "°" : ""}&ndash;{m.ideal.max}
                    {m.unit === "deg" ? "°" : ""}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ───────────────────────────────────────────────
          EMBEDDED CALCULATOR WIDGET   ★ USP ★
         ─────────────────────────────────────────────── */}
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
                href="/tools/facial-harmony-calculator"
                className="shrink-0 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Open full page ↗
              </Link>
            </div>

            {/* ▼▼▼  ACTUAL CALCULATOR COMPONENT  ▼▼▼ */}
            <FacialHarmonyCalculator />
            {/* ▲▲▲  END CALCULATOR  ▲▲▲ */}
          </div>
        </div>
      </section>

      {/* ── UNIQUE FEATURE: TRACKING ───────────────── */}
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
            },
            {
              t: "Compare two dates side by side",
              d: "Tick any two saved results and the tool lays them out together, with the change in each angle marked up or down.",
            },
            {
              t: "See the trend after a change",
              d: "Braces, a fitness change, or a procedure can shift these angles. Re-measure under the same conditions and watch the numbers move.",
            },
          ].map((f) => (
            <div
              key={f.t}
              className="rounded-2xl bg-white p-5 ring-1 ring-slate-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                ★
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900">{f.t}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHOTO TIPS ─────────────────────────────── */}
      <section className="mx-auto mt-20 max-w-4xl px-6">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
          How to Get an Accurate Reading
        </h2>
        <p className="mt-2 text-slate-600">
          The math is only as good as the photo you feed it. These habits keep your numbers
          honest and repeatable.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {photoTips.map((t) => (
            <div
              key={t.id}
              className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200"
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

      {/* ── ACCURACY: GOOD / BAD ───────────────────── */}
      <section className="mt-20 bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            What Helps and What Hurts Your Accuracy
          </h2>
          <p className="mt-3 text-slate-600">
            A few small habits make the difference between a number you can trust and one
            that changes every time you measure.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {accuracyHabits.map((h) => {
              const good = h.verdict === "good";
              return (
                <div
                  key={h.name}
                  className={`flex items-start gap-3 rounded-xl p-4 ring-1 ${
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

      {/* ── DISCLAIMER ─────────────────────────────── */}
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

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="text-3xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
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

      {/* ── BOTTOM LINE / FINAL CTA ────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">The Bottom Line</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Math gives you a fair, repeatable way to read facial proportion, and it explains
            why some faces strike us as balanced. It is only half the story. The angles set
            the structure. Expression, symmetry, and the small things that make a face
            distinct bring it to life. Measure for curiosity, save your result, and let the
            number be one input among many.
          </p>
          <Link
            href="/tools/facial-harmony-calculator"
            className="mt-8 inline-block rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-xl transition hover:bg-emerald-400"
          >
            Open Full Calculator →
          </Link>
        </div>
      </section>
    </article>
  );
}
