import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import DressSizeCalculator from "@/components/calculators/dress-size-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { AuthorSection } from "@/components/seo/author-section"
import { AuthorSchema } from "@/components/seo/author-schema"
import { MedicalReviewerSection } from "@/components/seo/medical-reviewer-section"
import { MedicalReviewerSchema } from "@/components/seo/medical-reviewer-schema"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Ruler, HeartPulse, UserCheck, Shield, BookOpen, Calculator as CalculatorIcon , Stethoscope } from "lucide-react"
import { Sparkles, Activity, Shirt, Dumbbell, Smile } from "lucide-react"
import { RelatedCalculators } from "@/components/calculators/related-calculators"

export const metadata: Metadata = {
  title: "Dress Size Calculator – Find Your Perfect Fit in Seconds",
  description:
    "Find your perfect dress size instantly with our free dress size calculator. Enter bust, waist & hip measurements and get accurate sizes for US, UK, India & EU brands. Stop guessing and avoid costly returns!",
  keywords:
    "dress size calculator, what size dress am i, dress size chart female, women's dress size calculator, plus size dress size calculator, wedding dress size calculator, dress size calculator based on weight and height, dress size converter, US UK EU India dress size, online dress size finder",
  alternates: {
    canonical: "https://calqulate.net/health/dress-size-calculator",
  },
  openGraph: {
    title: "Dress Size Calculator – Find Your Perfect Fit in Seconds",
    description: "Find your perfect dress size instantly with our free dress size calculator. Enter bust, waist & hip measurements and get accurate sizes for US, UK, India & EU brands. Stop guessing and avoid costly returns!",
    url: "https://calqulate.net/health/dress-size-calculator",
    siteName: "Calqulate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dress Size Calculator – Find Your Perfect Fit in Seconds",
    description: "Find your perfect dress size instantly with our free dress size calculator. Enter bust, waist & hip measurements and get accurate sizes for US, UK, India & EU brands. Stop guessing and avoid costly returns!",
  },
}

const faqs = [
  {
    question: "How do I use the dress size calculator?",
    answer:
      "Simply enter your bust, waist, and hip measurements. You can also add your height, weight, body shape, dress style, and preferred brand for a smarter, more personalised recommendation. The calculator instantly returns your size across US, UK, EU, and Indian sizing standards.",
  },
  {
    question: "Why am I a different size in different brands?",
    answer:
      "Brands use different size standards and vanity sizing, so a Medium in Zara may be a Large in H&M for the exact same measurements. Our brand-specific selector accounts for these differences so you get the right size for each retailer, not just a generic number.",
  },
  {
    question: "What measurements do I need for the dress size calculator?",
    answer:
      "You need your bust (fullest part of your chest), waist (narrowest point above your belly button), and hips (widest part). For the most accurate results, also select your body shape, dress style, and fit preference. All measurements can be entered in inches or centimetres.",
  },
  {
    question: "What should I do if I fall between two sizes?",
    answer:
      "Our calculator's Smart Between-Sizes Logic tells you exactly which direction to go based on the dress style and fabric. For bodycon or structured dresses, size up. For stretchy or relaxed styles, you can size down. The calculator always explains its recommendation.",
  },
  {
    question: "How does the plus size dress size calculator work?",
    answer:
      "The plus size section uses a separate chart that accounts for different proportions and comfort allowances. Enter your measurements normally and the calculator will automatically include plus size results (1X, 2X, 3X) alongside standard sizing.",
  },
  {
    question: "Can I use this for wedding dress sizing?",
    answer:
      "Yes. Wedding dresses typically run one to two sizes smaller than ready-to-wear. When you select 'Wedding / Bridal' as your dress style, the calculator adjusts its recommendation accordingly and always advises sizing up when you are between sizes for formal wear.",
  },
  {
    question: "How accurate is the dress size calculator based on weight and height?",
    answer:
      "Height and weight provide a useful starting estimate, especially when you don't have a measuring tape, but they cannot account for body proportions. Always use your bust, waist, and hip measurements for the most accurate result. The calculator uses weight and height as a secondary input only.",
  },
  {
    question: "Does my body shape affect which dress size I should buy?",
    answer:
      "Yes, significantly. An hourglass figure may need to size up for hip fit in a bodycon dress, while a pear shape may need a different size on top versus bottom. Our body shape input works alongside your measurements to flag these fit issues before you buy. You can also check our Body Shape Calculator at calqulate.net/health/body-shape-calculator to find your shape first.",
  },
]

export default function DressSizeCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Dress Size Calculator"
        description="Find your perfect dress size instantly using bust, waist, and hip measurements. Get accurate sizes for US, UK, EU, and India brands with smart fit advice for every body shape and dress style."
        url="https://calqulate.net/health/dress-size-calculator"
      />
      <FAQSchema faqs={faqs} />
      <MedicalReviewerSchema />

      <Header />

      <main id="main" className="flex-1">
        {/* HERO */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-lime-50 border-b border-slate-200">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 mb-5">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
              Free · Instant · No sign-up required
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-balance leading-tight text-slate-900">
              What Size Dress Am I? Free Dress Size Calculator
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-3xl text-pretty">
              Stop guessing your dress size. Our Dress Size Calculator uses your bust, waist, and hip measurements to give you accurate sizes across US, UK, EU, and Indian brands — with smart advice for your body shape, dress style, and fit preference.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#calculator"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
              >
                Try the Calculator ↓
              </a>
            </div>
          </div>
        </section>

        {/* USP SUMMARY (TOFU) */}
        <section className="border-b border-emerald-100 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-6">
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 md:p-6">
              <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <p className="text-sm md:text-base leading-relaxed text-slate-700">
                Calqulate.net converts your measurements into the right dress size, mapped across US, UK, EU and India charts. You get one clear answer that removes online-shopping guesswork.
              </p>
            </div>
          </div>
        </section>

        {/* STATS DASHBOARD */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-slate-200 md:grid-cols-5">
            {[
              { value: "US / UK / EU", label: "Sizes" },
              { value: "Free", label: "Price" },
              { value: "No", label: "Sign-up" },
              { value: "Instant", label: "Results" },
              { value: "Private", label: "In-browser" },
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

        {/* CALCULATOR */}
        <section id="calculator" className="scroll-mt-20">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <DressSizeCalculator />
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-16">

              {/* Why Sizing Feels Confusing */}
              <section className="py-8">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Why Women&apos;s Dress Sizing Feels So Confusing
                </h2>

                <p className="mb-3 text-gray-700 leading-relaxed">
                  Buying dresses online shouldn&apos;t feel confusing. One brand says you&apos;re a Medium.
                  Another says Large. You wait for delivery, try it on, and it still doesn&apos;t fit. Sound
                  familiar?
                </p>

                <p className="mb-3 text-gray-700 leading-relaxed">
                  Women&apos;s sizing isn&apos;t universal. Brands use vanity sizing, body shapes differ, and
                  international standards vary wildly. US vs UK vs India vs EU sizes don&apos;t match. Weight
                  changes, pregnancy, or lifestyle shifts affect fit. Plus-size options often have completely
                  different proportions.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  That&apos;s why a reliable dress size chart and smart converter are essential — and why our
                  calculator goes beyond a simple chart to act as your personal fit advisor.
                </p>

                <Card className="mt-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-medium text-gray-800">
                      <CalculatorIcon className="w-5 h-5 text-emerald-600" />
                      TL;DR — What Our Dress Size Calculator Does for You
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      A quick look at why this is more than a basic size chart
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
                      <li>Get your accurate size in seconds across US, UK, EU, and India.</li>
                      <li>Avoid wrong online purchases and costly returns.</li>
                      <li>Stop confusion between different brands and countries.</li>
                      <li>Get smart between-sizes advice based on dress style and fabric.</li>
                      <li>Understand how your body shape affects fit — not just your measurements.</li>
                      <li>Shop with total confidence every time.</li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* How to Use */}
              <section>
                <h2 className="mb-2 font-semibold">
                  <b>How to Use Our Dress Size Calculator (It&apos;s Super Easy)</b>
                </h2>
                <p className="mb-2">
                  You don&apos;t need a tailor. Just three key measurements — and a few optional inputs to
                  unlock smarter recommendations:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <b>Bust</b> — Wrap the tape around the fullest part of your chest.
                  </li>
                  <li>
                    <b>Waist</b> — Measure at the narrowest point, usually above your belly button.
                  </li>
                  <li>
                    <b>Hips</b> — Measure at the widest part of your hips and bottom.
                  </li>
                </ul>
                <p className="mt-3">
                  Pro Tip: Stand straight, wear light clothing or underwear, and keep the tape level.
                  Measure in centimetres or inches — the calculator handles both.
                </p>
                <p className="mt-3">
                  For a smarter result, also select your <b>body shape</b>, <b>dress style</b>, and
                  <b> preferred brand</b>. Not sure about your body shape? Use our{" "}
                  <Link href="https://calqulate.net/health/body-shape-calculator" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 font-medium">
                    Body Shape Calculator
                  </Link>{" "}
                  first for the most accurate dress size result.
                </p>
              </section>

              {/* Standard Size Chart */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>Standard Women&apos;s Dress Size Chart (US, UK, EU, India)</CardTitle>
                    <CardDescription>
                      Use this as a quick reference. Always check the brand&apos;s own chart before buying.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr>
                            <th className="border px-2 py-2 text-left">Size</th>
                            <th className="border px-2 py-2 text-left">US</th>
                            <th className="border px-2 py-2 text-left">UK</th>
                            <th className="border px-2 py-2 text-left">EU</th>
                            <th className="border px-2 py-2 text-left">Bust (in)</th>
                            <th className="border px-2 py-2 text-left">Waist (in)</th>
                            <th className="border px-2 py-2 text-left">Hips (in)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-2 py-2">XS</td>
                            <td className="border px-2 py-2">2</td>
                            <td className="border px-2 py-2">6</td>
                            <td className="border px-2 py-2">34</td>
                            <td className="border px-2 py-2">32–33</td>
                            <td className="border px-2 py-2">24–25</td>
                            <td className="border px-2 py-2">34–35</td>
                          </tr>
                          <tr>
                            <td className="border px-2 py-2">S</td>
                            <td className="border px-2 py-2">4–6</td>
                            <td className="border px-2 py-2">8–10</td>
                            <td className="border px-2 py-2">36–38</td>
                            <td className="border px-2 py-2">34–35</td>
                            <td className="border px-2 py-2">26–27</td>
                            <td className="border px-2 py-2">36–37</td>
                          </tr>
                          <tr>
                            <td className="border px-2 py-2">M</td>
                            <td className="border px-2 py-2">8–10</td>
                            <td className="border px-2 py-2">12–14</td>
                            <td className="border px-2 py-2">40–42</td>
                            <td className="border px-2 py-2">36–38</td>
                            <td className="border px-2 py-2">28–30</td>
                            <td className="border px-2 py-2">38–40</td>
                          </tr>
                          <tr>
                            <td className="border px-2 py-2">L</td>
                            <td className="border px-2 py-2">12–14</td>
                            <td className="border px-2 py-2">16–18</td>
                            <td className="border px-2 py-2">44–46</td>
                            <td className="border px-2 py-2">39–41</td>
                            <td className="border px-2 py-2">31–33</td>
                            <td className="border px-2 py-2">41–43</td>
                          </tr>
                          <tr>
                            <td className="border px-2 py-2">XL</td>
                            <td className="border px-2 py-2">16</td>
                            <td className="border px-2 py-2">20</td>
                            <td className="border px-2 py-2">48</td>
                            <td className="border px-2 py-2">42–44</td>
                            <td className="border px-2 py-2">34–36</td>
                            <td className="border px-2 py-2">44–46</td>
                          </tr>
                          <tr>
                            <td className="border px-2 py-2">2XL</td>
                            <td className="border px-2 py-2">18</td>
                            <td className="border px-2 py-2">22</td>
                            <td className="border px-2 py-2">50</td>
                            <td className="border px-2 py-2">45–47</td>
                            <td className="border px-2 py-2">37–39</td>
                            <td className="border px-2 py-2">47–49</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Note: Indian sizes often align closer to UK but can run smaller — always check
                      brand-specific charts. To convert inches to cm, multiply by 2.54.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Plus Size Chart */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>Plus Size Dress Size Chart</CardTitle>
                    <CardDescription>
                      For plus size shopping, proportions matter even more. Our calculator accounts for
                      comfort and flattering cuts, not just number matching.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr>
                            <th className="border px-2 py-2 text-left">Size</th>
                            <th className="border px-2 py-2 text-left">US (W)</th>
                            <th className="border px-2 py-2 text-left">Bust (in)</th>
                            <th className="border px-2 py-2 text-left">Waist (in)</th>
                            <th className="border px-2 py-2 text-left">Hips (in)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-2 py-2">1X</td>
                            <td className="border px-2 py-2">14–16W</td>
                            <td className="border px-2 py-2">44–45.5</td>
                            <td className="border px-2 py-2">36–38</td>
                            <td className="border px-2 py-2">46–48</td>
                          </tr>
                          <tr>
                            <td className="border px-2 py-2">2X</td>
                            <td className="border px-2 py-2">18–20W</td>
                            <td className="border px-2 py-2">47–49</td>
                            <td className="border px-2 py-2">39–41</td>
                            <td className="border px-2 py-2">49–51</td>
                          </tr>
                          <tr>
                            <td className="border px-2 py-2">3X</td>
                            <td className="border px-2 py-2">22–24W</td>
                            <td className="border px-2 py-2">51–54</td>
                            <td className="border px-2 py-2">44–46</td>
                            <td className="border px-2 py-2">53–56</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Body Shape & Dress Fit */}
              <section>
                <h2 className="mb-2 font-semibold">
                  <b>Why Your Body Shape Changes How a Dress Fits</b>
                </h2>
                <p className="mb-2">
                  A size chart gives you a number. Your body shape tells you whether that number will
                  actually fit. An hourglass figure may need to size up to accommodate hips in a bodycon
                  style. A pear shape often needs a different size on top versus bottom. A rectangle shape
                  may find that structured dresses fit better than wrap styles at the same size.
                </p>
                <p className="mb-2">
                  That&apos;s why our calculator asks for your body shape alongside your measurements. Not
                  sure what shape you are? Our{" "}
                  <Link href="https://calqulate.net/health/body-shape-calculator" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 font-medium">
                    Body Shape Calculator
                  </Link>{" "}
                  will tell you in seconds. And if you want to go deeper,{" "}
                  <Link href="https://calqulate.net/blog/female-body-shapes-explained" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 font-medium">
                    our guide to female body shapes explained
                  </Link>{" "}
                  covers styling, fit tips, and dress recommendations for every shape.
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hourglass</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>Balanced bust and hips with a defined waist.</p>
                      <p><b>Fit tip:</b> Wrap dresses and fitted styles work beautifully. Size by your hips first.</p>
                      <p><b>Between sizes:</b> Size up — your waist can always be belted.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Pear (Triangle)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>Wider hips than bust and shoulders.</p>
                      <p><b>Fit tip:</b> A-line and fit-and-flare dresses are your best friend. Size by your hips.</p>
                      <p><b>Between sizes:</b> Size up for bodycon; standard size for A-line.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Apple (Round)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>Fuller bust and midsection, narrower hips.</p>
                      <p><b>Fit tip:</b> Empire waist and V-neck dresses elongate and flatter. Size by your bust.</p>
                      <p><b>Between sizes:</b> Size up for comfort through the torso.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Rectangle (Athletic)</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>Similar bust, waist, and hip measurements.</p>
                      <p><b>Fit tip:</b> Peplum, ruffles, and tiered styles add shape. Size by your bust.</p>
                      <p><b>Between sizes:</b> Size down for bodycon; size up for layered styles.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Inverted Triangle</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>Broader shoulders and bust with narrower hips.</p>
                      <p><b>Fit tip:</b> Flared skirts and full dresses balance your silhouette. Size by your bust.</p>
                      <p><b>Between sizes:</b> Size up for shoulder comfort; choose styles with flare below.</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Also check your Face Shape</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <p>Neckline choice is just as important as dress style for an overall flattering look.</p>
                      <p>
                        Use our{" "}
                        <Link href="https://calqulate.net/health/face-shape-calculator" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 font-medium">
                          Face Shape Calculator
                        </Link>{" "}
                        to find necklines and collar styles that complement your face shape.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Dress Style & Fabric Matters */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shirt className="w-5 h-5 text-emerald-600" />
                      Does Dress Style Affect Which Size You Should Buy?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p>
                      Yes — and this is one of the most overlooked factors in online dress shopping. The same
                      measurements can require two different sizes depending on the dress style and fabric.
                    </p>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>
                        <b>Bodycon / Fitted:</b> Size up if you are between sizes. These styles are
                        unforgiving — a tight bodycon dress shows every fit issue.
                      </li>
                      <li>
                        <b>A-line / Fit &amp; Flare:</b> True to size in most cases. The flared skirt hides
                        hip measurement differences.
                      </li>
                      <li>
                        <b>Maxi / Shift:</b> Relaxed fit. You can often size down if you prefer a less
                        voluminous look.
                      </li>
                      <li>
                        <b>Wrap dresses:</b> Adjustable fit. True to size or size down for a closer look.
                      </li>
                      <li>
                        <b>Wedding / Bridal:</b> Always size up. Bridal dresses run one to two sizes smaller
                        than ready-to-wear and can be taken in by a tailor.
                      </li>
                      <li>
                        <b>Stretch fabric:</b> You can usually size down one size. Non-stretch structured
                        fabric: size up or true to size.
                      </li>
                    </ul>
                    <p>
                      Our calculator&apos;s dress style selector accounts for all of these scenarios
                      automatically.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Brand Differences */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Why Every Brand Fits Differently — And How to Stop Guessing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p>
                      Vanity sizing means brands label larger sizes as smaller numbers to make customers feel
                      better. Different target body shapes (petite, tall, curvy, athletic) also change how a
                      garment is cut. Manufacturing country standards add another layer of inconsistency.
                    </p>
                    <p>
                      Our brand-specific selector covers 20+ popular international and Indian brands including
                      Zara, H&M, ASOS, Shein, Myntra, Mango, Forever 21, and more. When you select your
                      brand, the calculator adjusts its recommendation based on how that brand&apos;s sizing
                      runs relative to standard measurements.
                    </p>
                    <p>
                      If your brand isn&apos;t listed, select &quot;Other&quot; and use your measurements
                      against the standard chart — then check the brand&apos;s own size guide to confirm.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Special Occasion */}
              <section>
                <h2 className="mb-2 font-semibold">
                  <b>Special Occasion: Wedding Dress Size Calculator</b>
                </h2>
                <p className="mb-3">
                  For bridal or wedding guest dresses, go by your largest measurement and always consider
                  alterations. Wedding dresses often run one to two sizes smaller than ready-to-wear, so
                  sizing up and consulting the designer&apos;s own chart is essential.
                </p>
                <p className="mb-3">
                  If you are between sizes in bridal wear, always choose the larger one. A dress can be
                  taken in by a skilled seamstress; letting it out is far harder and sometimes impossible.
                  Our calculator flags this automatically when you select the Wedding / Bridal dress style.
                </p>
                <p>
                  This also applies to other formal occasions: prom dresses, bridesmaid dresses, and
                  occasion wear from designer labels. Always size up and plan for a fitting.
                </p>
              </section>

              {/* Features Card */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle>Features of Our Dress Size Calculator</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <ul className="list-disc pl-4 space-y-2">
                      <li>
                        <b>Multi-Region Sizing:</b> Instantly returns US, UK, EU, and India sizes from one
                        set of measurements.
                      </li>
                      <li>
                        <b>Brand-Specific Selector:</b> Accounts for how 20+ popular brands size relative to
                        standard measurements.
                      </li>
                      <li>
                        <b>Dress Style Advisor:</b> Adjusts recommendations based on bodycon, A-line, wrap,
                        maxi, wedding, and more.
                      </li>
                      <li>
                        <b>Fit Preference Toggle:</b> Choose tight, comfortable, relaxed, or oversized —
                        your preference shifts the final recommendation.
                      </li>
                      <li>
                        <b>Smart Between-Sizes Logic:</b> Clear advice on whether to size up or down based
                        on style, fabric, and body shape.
                      </li>
                      <li>
                        <b>Return Risk Meter:</b> See your estimated return risk (Low / Medium / High) and
                        the reason, so you can shop with confidence.
                      </li>
                      <li>
                        <b>Body Shape Integration:</b> Works alongside your body shape for dramatically more
                        accurate results.
                      </li>
                      <li>
                        <b>Height &amp; Weight Input:</b> Useful secondary input when a measuring tape is
                        not available.
                      </li>
                      <li>
                        <b>Metric &amp; Imperial:</b> Enter measurements in cm or inches — the calculator
                        handles both and converts automatically.
                      </li>
                      <li>
                        <b>Safe &amp; Private:</b> No data stored — your measurements stay on your device.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </section>

              {/* Benefits */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="w-5 h-5" />
                      Benefits of Using Our Dress Size Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>
                      <b>Stop the cycle of wrong orders and returns.</b>
                      <br />
                      Know your correct size before you buy — not after it arrives.
                    </p>
                    <p>
                      <b>Shop confidently across brands and countries.</b>
                      <br />
                      US, UK, EU, and India sizes explained and converted instantly.
                    </p>
                    <p>
                      <b>Get style-specific advice, not just a number.</b>
                      <br />
                      Bodycon fits very differently from a maxi — our calculator knows this.
                    </p>
                    <p>
                      <b>Understand your between-sizes situation once and for all.</b>
                      <br />
                      Clear, reasoned guidance on which size to pick every time.
                    </p>
                    <p>
                      <b>Find your size for special occasions without stress.</b>
                      <br />
                      Wedding dresses, plus size, post-pregnancy, and more — all covered.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* What's Unique */}
              <section>
                <Card className="not-prose">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      What&apos;s Unique About Our Calculator?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3">
                    <p>
                      Most dress size tools give you a chart. We give you a smart advisor. Our calculator
                      combines your measurements, body shape, dress style, brand, and fit preference to
                      return a personalised recommendation — not a generic number.
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        Explains <em>why</em> it recommends a size, not just what size to buy.
                      </li>
                      <li>
                        Covers the full size spectrum including plus size (1X, 2X, 3X) and petite
                        considerations.
                      </li>
                      <li>
                        Integrates with our{" "}
                        <Link href="https://calqulate.net/health/body-shape-calculator" className="text-emerald-700 underline underline-offset-2 hover:text-emerald-900 font-medium">
                          Body Shape Calculator
                        </Link>{" "}
                        for a complete fit picture.
                      </li>
                      <li>Flags return risk so you can decide whether to order one size or two.</li>
                      <li>
                        Covers special cases: wedding dresses, post-pregnancy sizing, and international
                        shopping.
                      </li>
                    </ul>
                    <p>
                      You deserve clothes that fit perfectly and make you feel amazing. No more guessing
                      &quot;What size dress am I?&quot; — just reliable, stress-free shopping.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Embrace Your Size */}
              <section>
                <h2 className="mb-2">
                  <b>The Right Size Is the One That Fits — Not the Smallest Number</b>
                </h2>
                <p>
                  It&apos;s easy to get caught up in the number on the label, but dress sizes are not
                  standardised and they vary between brands, countries, and decades. A size is just a
                  measurement — it says nothing about you.
                </p>
                <p className="mt-3">
                  Our mission is to help you find clothes that fit your body well and make you feel
                  confident — not to chase a smaller label. Whether you are shopping for everyday wear,
                  a special occasion, or exploring international brands for the first time, our dress size
                  calculator is here to make it simple and stress-free.
                </p>
              </section>

            </div>

            <RelatedCalculators slug="dress-size-calculator" />

            {/* Structured FAQ UI */}
            <div className="mt-12">
              <FAQSection faqs={faqs} />
            </div>

            {/* Author Badge Section */}
            <MedicalReviewerSection />
            <AuthorSection />
          </div>
        </div>
      </main>

      {/* Author Schema */}
      <AuthorSchema />

      <Footer />
    </div>
  )
}
