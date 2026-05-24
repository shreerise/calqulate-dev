// components/blog/BestJeansBodyShapeBlog.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Blog } from "@/lib/blog/blogs-data";
import { bodyShapeGuides, jeansStyles, faqs } from "@/lib/blog/jeans-fit-data";
import JeansFitFinder from "@/components/jeans/JeansFitFinder";
import JeansLookbookPdfButton from "@/components/jeans/JeansLookbookPdfButton";

interface Props {
  blog: Blog;
}

export default function BestJeansBodyShapeBlog({ blog }: Props) {
  const womenGuides = bodyShapeGuides.filter((g) => g.gender === "women");
  const menGuides = bodyShapeGuides.filter((g) => g.gender === "men");

  return (
    <article className="bg-white">
      {/* ── HERO ─────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
              {blog.category}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              Best Jeans for Your{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                Body Shape
              </span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              A complete fit guide for men and women — what works for your shape, what to skip,
              and how to find the perfect denim every time.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="#jeans-fit-finder"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
              >
                Find My Fit →
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

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#f5f0eb] shadow-xl ring-1 ring-slate-200">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <div
        id="jeans-fit-guide"
        className="mx-auto max-w-3xl px-6 py-12 md:py-16 lg:max-w-4xl"
      >
        {/* ── TL;DR SUMMARY ─────────────────────────────── */}
        <aside className="mb-12 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
          <h2 className="text-xl font-bold text-emerald-800 md:text-2xl">
            TL;DR — Best Jeans by Body Type at a Glance
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700 md:text-base">
            <li><strong className="text-emerald-700">Pear-shaped women:</strong> high-rise straight, bootcut, and wide-leg jeans balance fuller hips.</li>
            <li><strong className="text-emerald-700">Apple-shaped women:</strong> mid-to-high-rise straight jeans with stretch and tummy-control panels work best.</li>
            <li><strong className="text-emerald-700">Hourglass women:</strong> high-rise skinny, straight, and curvy-fit jeans hug the waist without gapping.</li>
            <li><strong className="text-emerald-700">Rectangle women:</strong> mom jeans, wide-leg, and flared styles add visual curves.</li>
            <li><strong className="text-emerald-700">Athletic men &amp; men with bigger thighs:</strong> athletic-fit and tapered jeans with stretch give room for quads.</li>
            <li><strong className="text-emerald-700">Slim or shorter men:</strong> slim straight or tapered jeans in mid-rise create the cleanest line.</li>
            <li><strong className="text-emerald-700">Tall men &amp; women:</strong> filter for 34&quot;+ inseam from Levi&apos;s, Gap, Old Navy, Madewell, or American Eagle.</li>
            <li><strong className="text-emerald-700">Safe bet for everyone:</strong> a mid-blue, mid-to-high-rise straight-leg jean works on almost every body type.</li>
          </ul>
        </aside>

        {/* ── INTRO ─────────────────────────────────────── */}
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-relaxed text-slate-700">
            You and your friend can pick out the exact same pair of jeans, in the exact same
            size, and walk away looking nothing alike. One pair pulls at the thighs, the other
            sits perfectly at the waist. Same jeans, different result. The reason is simple —
            jeans fit your <em>shape</em>, not just your size.
          </p>
          <p className="mt-5 text-base leading-relaxed text-slate-700">
            Finding the best jeans for your body shape is less about chasing trends and more
            about understanding your proportions, picking the right rise, choosing the right
            leg cut, and adding just the right amount of stretch. This is your full jeans fit
            guide — practical advice for both men and women, written like a stylist would
            explain it, not a fashion magazine.
          </p>
          <div className="mt-8 rounded-xl border-l-4 border-emerald-600 bg-emerald-50/60 p-5">
            <p className="font-semibold text-slate-800">
              Choosing the best jeans for your body shape means finding a denim style that
              balances your proportions, fits comfortably at the waist and hips, and supports
              your natural silhouette — without pulling, gapping, or stacking.
            </p>
          </div>
        </div>

        {/* ── H2: Why body shape matters ──────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Why Body Shape Matters When Choosing Jeans
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Jeans are one of the most structured pieces of clothing in your wardrobe. Unlike a
            t-shirt or a sweater, denim doesn&apos;t drape or stretch to forgive a bad cut. The
            seams, rise, and leg opening all sit in fixed places — which means a small fit
            issue (like a back-waist gap or a tight thigh) becomes very visible.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Two people with the exact same 30-inch waist can wear completely different jeans.
            One might have narrow hips and slim thighs and need a slim straight. The other
            might have an athletic build and need a tapered or relaxed cut. Body shape
            decides the rise, the cut, the stretch, and the inseam — not the size tag.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            A good pair of jeans passes three tests: it feels comfortable when you stand, it
            feels comfortable when you sit, and it still looks good when you walk. If any one
            of those breaks, the jeans are wrong for your body — even if the size is right.
          </p>

          {/* Hero image — object-contain so full image always shows */}
          <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-[#f5f0eb]">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <Image
                src="/blogs/jeans/hero.png"
                alt="Different body shapes wearing different jeans cuts — side-by-side comparison"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <figcaption className="px-5 py-3 text-xs text-slate-500">
              Same size, different shape, different jeans — the right cut changes everything.
            </figcaption>
          </figure>
        </section>

        {/* ── H2: Quick fit guide table ───────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Quick Jeans Fit Guide by Body Shape
          </h2>
          <p className="mt-3 text-base text-slate-700">
            Skip ahead to your shape. Each row tells you which jeans to try first and which to
            be careful with.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-emerald-50 text-xs uppercase tracking-wider text-emerald-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Body Shape</th>
                  <th className="px-4 py-3 font-bold">Best Jeans Styles</th>
                  <th className="px-4 py-3 font-bold">Why It Works</th>
                  <th className="px-4 py-3 font-bold">Be Careful With</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {bodyShapeGuides.map((g) => (
                  <tr key={g.id} className="even:bg-slate-50/40">
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900">
                      {g.label}
                      <span className="ml-1 text-[10px] uppercase tracking-wider text-slate-400">
                        ({g.gender})
                      </span>
                    </td>
                    <td className="px-4 py-3">{g.recommendedJeans.slice(0, 3).join(", ")}</td>
                    <td className="px-4 py-3 text-slate-600">{g.description}</td>
                    <td className="px-4 py-3 text-slate-600">{g.avoid[0] ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── H2: Women body shapes ──────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Best Jeans for Women by Body Shape
          </h2>
          <p className="mt-3 text-base text-slate-700">
            The best jeans for women body type depend on where you carry width — hips, waist,
            bust, or shoulders. Here&apos;s exactly what to look for, by shape.
          </p>
          <div className="mt-8 space-y-12">
            {womenGuides.map((g, idx) => (
              <BodyShapeBlock key={g.id} guide={g} index={idx} />
            ))}
          </div>
        </section>

        {/* ── H2: Men body types ─────────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Best Jeans for Men by Body Type
          </h2>
          <p className="mt-3 text-base text-slate-700">
            Men&apos;s body types come down to one question: how much room do you need through
            the seat and thigh? Get that right, and the rest follows. This is the men&apos;s
            jeans fit guide we wish every store had.
          </p>
          <div className="mt-8 space-y-12">
            {menGuides.map((g, idx) => (
              <BodyShapeBlock key={g.id} guide={g} index={idx} />
            ))}
          </div>
        </section>
      </div>

      {/* ── EMBEDDED DASHBOARD ──────────────────────── */}
      <section
        id="jeans-fit-finder"
        className="mx-auto max-w-6xl scroll-mt-16 px-6 py-12 md:py-16"
      >
        <JeansFitFinder />
      </section>

      {/* ── BACK TO CONTENT ─────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 py-6 lg:max-w-4xl">
        {/* ── H2: Jeans styles explained ────────────── */}
        <section className="mt-6">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Jeans Styles Explained: Which One Should You Choose?
          </h2>
          <p className="mt-3 text-base text-slate-700">
            Skinny, slim, straight, bootcut, wide-leg, tapered — denim has more cuts now than
            ever. Here&apos;s what each one actually means, who it works for, and how to wear it.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {jeansStyles.map((s) => (
              <div
                key={s.name}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-base font-bold text-slate-900">{s.name}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold text-emerald-700">Best for:</span> {s.bestFor}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  <span className="font-semibold text-emerald-700">Body shapes:</span>{" "}
                  {s.bodyShapes}
                </p>
                <p className="mt-2 text-sm italic text-slate-500">{s.styleTip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── H2: Rise guide ────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            How to Choose the Right Jeans Rise (Low Rise vs Mid Rise vs High Rise)
          </h2>
          <p className="mt-3 text-base text-slate-700">
            &quot;Rise&quot; means the distance from the crotch seam to the top of the
            waistband. It&apos;s the single biggest factor in whether your jeans feel
            comfortable and look flattering — yet most people never look at it.
          </p>
          <div className="mt-6 space-y-4">
            <RiseBlock label="Low-rise jeans" measurement="7 inches or less" description="Sit below the belly button. They were the dominant cut in the early 2000s and are creeping back as a trend. They are less forgiving on most body types — anyone with a curvier waist or a softer midsection tends to find them uncomfortable." />
            <RiseBlock label="Mid-rise jeans" measurement="8–10 inches" description="Sit just at or slightly below the belly button. This is the most comfortable everyday rise for men and a flexible choice for women who don't love a tight waistband. It's the safest mid-rise vs high-rise pick for daily wear." />
            <RiseBlock label="High-rise jeans" measurement="10–12 inches" description="Sit at or above the belly button. The clear winner for women who want to define the waist, smooth the tummy, and prevent muffin-top. Hourglass, pear, apple, and curvy figures all benefit from high-rise." />
            <RiseBlock label="Ultra-high-rise jeans" measurement="12+ inches" description="Sit well above the belly button — sometimes near the bottom of the rib cage. Great for tall women, dramatic styling, and anyone who wants extra coverage when sitting." />
          </div>
          <div className="mt-6 rounded-xl bg-slate-50 p-5 text-sm text-slate-700">
            <p>
              <strong className="text-emerald-700">Quick rule:</strong> high-rise for women who
              want a defined waist, mid-rise as the universal default, low-rise only if you
              love a specific trend look and your body type carries it comfortably.
            </p>
          </div>
        </section>

        {/* ── H2: Fabric, stretch, wash ─────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Fabric, Stretch, and Wash: What Actually Matters
          </h2>
          <p className="mt-3 text-base text-slate-700">
            The cut decides whether jeans flatter you. The fabric decides whether you can
            actually wear them for eight hours.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoCard title="100% cotton denim" body="Stiff, structured, and breaks in beautifully over time. Best for raw or selvedge denim lovers — but unforgiving on curvier bodies." />
            <InfoCard title="Stretch denim (1–3% elastane)" body="The everyday sweet spot. Just enough give to move with you, still holds shape. Look for this on jeans from American Eagle, Levi's, Madewell, and Gap." />
            <InfoCard title="High-stretch / hyper-stretch denim" body="Up to 5% elastane plus polyester. Maximum comfort but can bag out at the knees after a few wears. Great for travel and curvy or athletic bodies." />
            <InfoCard title="Rigid denim" body="No stretch at all. Best for a structured, vintage look — but try them on; sizing is unforgiving." />
            <InfoCard title="Dark wash" body="The most slimming and most versatile. Pairs with everything from sneakers to heels. Great for office or evening looks." />
            <InfoCard title="Light wash & whiskering" body="Casual and weekend-friendly. Heavy fading on thighs can visually add width — be careful if you're pear-shaped." />
            <InfoCard title="Black jeans" body="The most slimming color in denim. Works for almost every occasion if the fit is right." />
            <InfoCard title="Distressed denim" body="Best in moderation. Heavy ripping in one area draws the eye there — choose carefully based on your shape." />
          </div>
          <p className="mt-6 text-base text-slate-700">
            For US shoppers, brands like Levi&apos;s, Wrangler, Lee, American Eagle, Gap,
            Madewell, Abercrombie, Old Navy, and Target each have their strengths — Madewell
            and AE for stretch, Levi&apos;s for classic cuts, Wrangler and Lee for value. For
            India shoppers, Levi&apos;s, Pepe Jeans, Spykar, Jack &amp; Jones, Allen Solly, and
            Flying Machine cover most fit needs. Always cross-check the size chart — Indian and
            US sizing can differ by 1–2 inches at the waist.
          </p>
        </section>

        {/* ── H2: Size tips ─────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Men&apos;s and Women&apos;s Jeans Size Tips Before Buying
          </h2>
          <p className="mt-3 text-base text-slate-700">
            Buying jeans online has gotten easier, but the return cycle is brutal if you skip
            these steps.
          </p>
          <ol className="mt-6 space-y-4 text-base text-slate-700">
            <ChecklistItem n={1} title="Measure waist, hip, thigh, and inseam at home" body="Use a soft tape over a thin layer of clothes. Most return problems trace back to a wrong measurement." />
            <ChecklistItem n={2} title="Read the brand's size chart — every time" body="A size 30 from Levi's is not a size 30 from Madewell. Trust the chart, not the tag." />
            <ChecklistItem n={3} title="Check the rise measurement" body="Two pairs labeled 'high-rise' can differ by 2 inches. Look at the front-rise number in the spec sheet." />
            <ChecklistItem n={4} title="Check the stretch percentage" body="2% is the sweet spot for most people. More than 3% can bag out; less than 1% is rigid." />
            <ChecklistItem n={5} title="Read reviews from shoppers with similar body type" body="Filter by 'curvy', 'athletic', 'tall', or 'petite' if the review filter allows." />
            <ChecklistItem n={6} title="Run the sitting, walking, and waistband test" body="Sit down — does the back waist gap? Walk — do the thighs pull? Stand — does the waistband stay flat without a belt? If any answer is wrong, return them." />
            <ChecklistItem n={7} title="Confirm the return policy before ordering" body="Buy from retailers with free or paid returns. Some Indian brands only allow exchanges, which limits your safety net." />
          </ol>
        </section>

        {/* ── H2: Common mistakes ───────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Common Jeans Buying Mistakes to Avoid
          </h2>
          <p className="mt-3 text-base text-slate-700">
            We&apos;ve all bought a pair of jeans that ended up at the back of the closet.
            Here&apos;s how to stop doing it.
          </p>
          <ul className="mt-6 space-y-3 text-base text-slate-700">
            {[
              "Buying only by waist size and ignoring hip, thigh, and rise measurements.",
              "Ignoring the rise — a high-rise pair that should fit perfectly can feel completely wrong if you usually wear mid-rise.",
              "Choosing trend over comfort — if you can't sit in them, you won't wear them.",
              "Wearing jeans too long, with too much fabric pooling at the ankle (this makes everyone look shorter).",
              "Wearing jeans too cropped without intent — an unintentional flood looks like a fit mistake.",
              "Ignoring thigh fit — especially for athletic men and curvy women, this is where most jeans go wrong.",
              "Buying jeans with too much stretch — they look great for two weeks, then bag out.",
              "Forgetting to check back-pocket placement — pockets that are too high or too small can completely change how your seat looks.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── H2: Best jeans by goal ────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Best Jeans Recommendations by Styling Goal
          </h2>
          <p className="mt-3 text-base text-slate-700">
            Sometimes you don&apos;t know your body shape but you do know what you want jeans
            to do for you. Pick your goal:
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-emerald-50 text-xs uppercase tracking-wider text-emerald-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Goal</th>
                  <th className="px-4 py-3 font-bold">Best Jeans Style</th>
                  <th className="px-4 py-3 font-bold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {[
                  ["Look taller", "Slim straight, high-rise straight, cropped ankle", "Petite, shorter men, anyone"],
                  ["Define waist", "High-rise straight, mom jeans, curvy-fit", "Hourglass, pear, curvy"],
                  ["Balance hips", "Bootcut, wide-leg, flared", "Pear, apple, stocky"],
                  ["Add curves", "Mom jeans, flared, wide-leg with fitted top", "Rectangle, athletic"],
                  ["Slim the legs visually", "High-rise skinny, slim straight", "Hourglass, slim men"],
                  ["Daily comfort", "Relaxed straight, athletic tapered, stretch straight", "Everyone"],
                  ["Office casual look", "Dark wash slim or straight", "Men & women"],
                  ["Weekend casual", "Boyfriend, mom jeans, relaxed", "Everyone"],
                  ["Travel comfort", "Relaxed or straight in stretch denim", "Long flights, road trips"],
                  ["Plus-size comfort", "Curvy-fit, relaxed straight with stretch", "Curvy, larger thighs"],
                  ["Athletic thighs", "Athletic tapered, athletic straight", "Athletic men, lifters"],
                  ["Minimalist wardrobe", "One mid-blue, mid-rise straight-leg", "Everyone"],
                ].map((row) => (
                  <tr key={row[0]} className="even:bg-slate-50/40">
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900">{row[0]}</td>
                    <td className="px-4 py-3">{row[1]}</td>
                    <td className="px-4 py-3 text-slate-600">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── H2: Final verdict ─────────────────────── */}
        <section className="mt-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Final Verdict: Which Jeans Are Best for Your Body Shape?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            The best jeans for your body shape are the ones that balance your proportions and
            stay comfortable for a full day. There&apos;s no single &quot;most flattering&quot;
            cut — only the one that fits the way <em>your</em> body is built.
          </p>
          <ul className="mt-5 space-y-2 text-base text-slate-700">
            <li className="flex items-start gap-2"><span className="mt-0.5 shrink-0 font-bold text-emerald-600">OK</span> Straight-leg jeans are the safest, most universal choice.</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 shrink-0 font-bold text-emerald-600">OK</span> High-rise jeans give the best waist definition for women.</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 shrink-0 font-bold text-emerald-600">OK</span> Athletic and relaxed fits are the comfort answer for men with bigger thighs.</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 shrink-0 font-bold text-emerald-600">OK</span> Bootcut and wide-leg jeans balance fuller hips and broader shoulders.</li>
            <li className="flex items-start gap-2"><span className="mt-0.5 shrink-0 font-bold text-emerald-600">OK</span> The right jeans look good when you stand, sit, and walk — not just in the mirror.</li>
          </ul>
          <div className="mt-6">
            <JeansLookbookPdfButton />
          </div>
        </section>

        {/* ── H2: FAQs ─────────────────────────────── */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {faqs.map((f, idx) => (
              <details key={f.q} className="group p-5 open:bg-emerald-50/40" open={idx === 0}>
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-slate-900">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Final CTA strip ───────────────────────── */}
        <div className="mt-14 rounded-2xl border border-emerald-200 bg-white p-6 text-center shadow-sm md:p-8">
          <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
            Ready to find your perfect pair?
          </h3>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Use the jeans fit finder above to filter by body shape, fit, rise, and goal —
            and bookmark this guide for your next denim shop.
          </p>
          <Link
            href="#jeans-fit-finder"
            className="mt-5 inline-block rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
          >
            Open the Fit Finder →
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────
 * BodyShapeBlock — with hover zoom + click lightbox
 * ─────────────────────────────────────────────────────── */

interface BodyShapeBlockProps {
  guide: (typeof bodyShapeGuides)[number];
  index: number;
}

function BodyShapeBlock({ guide, index }: BodyShapeBlockProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">

          {/* ── Image: hover zoom + click to fullscreen ── */}
          <div className="group w-full md:w-[52%] shrink-0">
            <div
              className="relative cursor-zoom-in overflow-hidden rounded-xl bg-[#f5f0eb]"
              style={{ paddingBottom: "125%" }}
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={`/blogs/jeans/shape-${guide.id}.png`}
                alt={`${guide.label} — best jeans illustration`}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 420px"
              />
              {/* Zoom hint — appears on hover */}
              <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
                Click to expand
              </span>
            </div>
          </div>

          {/* ── Content side ── */}
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              {guide.gender === "women" ? "For Women" : "For Men"} • Body type {index + 1}
            </span>
            <h3 className="mt-2 text-xl font-bold text-slate-900 md:text-2xl">
              Best Jeans for {guide.label}
            </h3>
            <p className="mt-3 text-base text-slate-700">{guide.description}</p>

            <p className="mt-4 text-sm font-semibold text-slate-800">Key features:</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {guide.features.map((f) => (
                <li key={f} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Recommend</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {guide.recommendedJeans.map((j) => (
                    <li key={j}>• {j}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-red-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-red-700">Be careful with</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {guide.avoid.map((j) => (
                    <li key={j}>• {j}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 rounded-xl border-l-4 border-emerald-500 bg-emerald-50/50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Stylist tip</p>
              <p className="mt-1 text-sm text-slate-700">{guide.styleTip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-[#f5f0eb] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close full-screen view"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg transition hover:bg-slate-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Full image — padding-bottom matches image ratio */}
            <div className="relative" style={{ paddingBottom: "125%" }}>
              <Image
                src={`/blogs/jeans/shape-${guide.id}.png`}
                alt={`${guide.label} — full view`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <p className="py-3 text-center text-sm font-semibold text-slate-600">
              {guide.label} — tap outside to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────
 * Shared sub-components
 * ─────────────────────────────────────────────────────── */

function RiseBlock({ label, measurement, description }: { label: string; measurement: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-bold text-slate-900 md:text-lg">{label}</h3>
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{measurement}</span>
      </div>
      <p className="mt-2 text-sm text-slate-600 md:text-base">{description}</p>
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

function ChecklistItem({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
        {n}
      </span>
      <div>
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{body}</p>
      </div>
    </li>
  );
}