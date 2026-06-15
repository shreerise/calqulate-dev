import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
// The tool component from the earlier step. Adjust the path to wherever you save it.
import FaceShapeStyleFinder from "@/components/calculators/ai-attractiveness-test"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ScanFace,
  ShieldCheck,
  Microscope,
  Info,
  ExternalLink,
  CalendarDays,
  UserCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react"
import ImproveParagraphs from "@/components/ui/improve-paragraphs"

/* ------------------------------------------------------------------ */
/* Page metadata                                                       */
/* ------------------------------------------------------------------ */

const PUBLISHED = "2026-06-02"
const MODIFIED = "2026-06-02"
const PAGE_URL = "https://calqulate.net/health/ai-attractiveness-test"

export const metadata: Metadata = {
  title: "AI Attractiveness Test: What Your Beauty Score Really Means | Calqulate.net",
  description:
    "Honest guide to AI attractiveness tests. See what a face beauty score can and cannot measure, why the golden ratio is a myth, whether the scores are biased, and try Calqulate.net's free face shape and style analysis.",
  keywords:
    "ai attractiveness test, beauty score calculator, face attractiveness analyzer, facial symmetry test, face shape detector, golden ratio face, face beauty analyzer, attractiveness calculator, facial harmony, are ai beauty tests accurate",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI Attractiveness Test: What Your Beauty Score Really Means | Calqulate.net",
    description:
      "Honest guide to AI attractiveness tests. See what a face beauty score can and cannot measure, why the golden ratio is a myth, whether the scores are biased, and try Calqulate.net's free face shape and style analysis.",
    url: PAGE_URL,
    siteName: "Calqulate",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Attractiveness Test: What Your Beauty Score Really Means | Calqulate.net",
    description:
      "Honest guide to AI attractiveness tests. See what a face beauty score can and cannot measure, why the golden ratio is a myth, whether the scores are biased, and try Calqulate.net's free face shape and style analysis.",
  },
}

/* ------------------------------------------------------------------ */
/* Sources (all verified live links)                                   */
/* ------------------------------------------------------------------ */

const SOURCES = [
  {
    title: "Rhodes, G. (2006). The Evolutionary Psychology of Facial Beauty. Annual Review of Psychology.",
    note: "Peer-reviewed review: symmetry, averageness and sex-typical features are rated attractive on average across cultures.",
    url: "https://www.annualreviews.org/content/journals/10.1146/annurev.psych.57.102904.190208",
  },
  {
    title: "Pallett, P. M., Link, S., & Lee, K. (2010). New golden ratios for facial beauty. Vision Research.",
    note: "Found the most attractive feature spacing simply matches the average face, not the 1.618 golden ratio.",
    url: "https://pubmed.ncbi.nlm.nih.gov/19896961/",
  },
  {
    title: "Naini, F. B. (2024). The golden ratio: dispelling the myth. Maxillofacial Plastic and Reconstructive Surgery.",
    note: "2024 systematic review: no convincing evidence links the golden ratio to idealized facial proportions or beauty.",
    url: "https://pubmed.ncbi.nlm.nih.gov/38228978/",
  },
  {
    title: "Levin, S. (2016). A beauty contest was judged by AI and the robots did not like dark skin. The Guardian.",
    note: "The Beauty.AI contest: of 44 winners, nearly all were light-skinned, which the team blamed on non-diverse training data.",
    url: "https://www.theguardian.com/technology/2016/sep/08/artificial-intelligence-beauty-contest-doesnt-like-black-people",
  },
  {
    title:
      "Social comparison, body image and eating disorder symptoms: systematic review and meta-analysis (2024).",
    note: "83 studies, 55,440 people: appearance-based comparison is linked to worse body image, with adolescents most affected.",
    url: "https://pubmed.ncbi.nlm.nih.gov/39721448/",
  },
]

/* ------------------------------------------------------------------ */
/* Structured data (JSON-LD)                                           */
/* No MedicalWebPage schema: this is a styling and entertainment tool, */
/* not a medical instrument.                                           */
/* ------------------------------------------------------------------ */

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Face Shape & Style Finder",
  applicationCategory: "LifestyleApplication",
  applicationSubCategory: "Face shape and style analysis",
  operatingSystem: "Web browser",
  url: PAGE_URL,
  description:
    "A free, browser-based tool that detects your face shape from facial landmarks and recommends hairstyles, eyewear and grooming. It does not assign a beauty or attractiveness score.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "On-device facial landmark detection",
    "Face shape classification with confidence estimate",
    "Hairstyle, eyewear and grooming recommendations",
    "Photo quality check",
    "No image upload or storage",
  ],
  publisher: { "@type": "Organization", name: "Calqulate.net", url: "https://calqulate.net" },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Attractiveness Test: What Your Beauty Score Really Means",
  description:
    "An evidence-based explanation of what AI attractiveness tests can and cannot measure, whether the scores are biased, and a privacy-first face shape and style alternative.",
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: {
    "@type": "Person",
    name: "Calqulate.net Editorial Team",
    description:
      "Calqulate.net's editorial team writes evidence-based explainers for the site's calculators and tools.",
    url: "https://calqulate.net/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Calqulate.net",
    url: "https://calqulate.net",
    logo: { "@type": "ImageObject", url: "https://calqulate.net/logo.webp" },
  },
  about: [
    { "@type": "Thing", name: "Facial symmetry" },
    { "@type": "Thing", name: "Golden ratio" },
    { "@type": "Thing", name: "Face shape" },
    { "@type": "Thing", name: "Facial attractiveness" },
  ],
  citation: SOURCES.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })),
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://calqulate.net" },
    { "@type": "ListItem", position: 3, name: "AI Attractiveness Test", item: PAGE_URL },
  ],
}

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

const RELATED_TOOLS = [
  { label: "Face Shape Detector", href: "/health/face-shape-calculator" },
  { label: "Golden Ratio Calculator", href: "/health/golden-ratio-face-calculator" },
  { label: "Hairstyle Finder", href: "blog/best-haircut-for-your-face-shape" },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function AiAttractivenessTestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={softwareSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Header />

      {/* Improve paragraph readability on the client for long blocks */}
      <ImproveParagraphs />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                AI Attractiveness Test: What Your Beauty Score Really Means
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Thinking about uploading a selfie to find out how attractive you are? Before you do, here is the
                honest version from Calqulate.net: what these tools actually measure, what they get wrong, and a
                free face shape analysis that gives you something useful instead of a number that ranks your looks.
              </p>
              {/* Freshness + authorship signals for E-E-A-T */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-primary" /> By the Calqulate.net Editorial Team
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-primary" /> Updated June 2, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Microscope className="w-4 h-4 text-primary" /> Reviewed against peer-reviewed sources
                </span>
              </div>
            </div>

            {/* TLDR / AI-overview answer block */}
            <Card className="mb-10 border-primary/40 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Info className="w-5 h-5" /> TL;DR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-foreground/90">
                  An AI attractiveness test does not measure how beautiful you are. It measures facial geometry,
                  such as symmetry and proportion, from one photo and turns it into a beauty score. There is no
                  scientific formula for beauty. A 2024 peer-reviewed review found no convincing evidence that the
                  golden ratio drives facial beauty, the scores shift with lighting and angle, and they can inherit
                  bias from their training data. Calqulate.net skips the ranking. The free tool below detects your
                  face shape and gives practical style tips, processed privately in your browser.
                </p>
              </CardContent>
            </Card>

            {/* The actual tool */}
            <FaceShapeStyleFinder />

            {/* Article body */}
            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              <section>
                <h2 className="flex items-center gap-2">
                  <ScanFace className="w-6 h-6 text-primary" /> What is an AI attractiveness test?
                </h2>
                <p>
                  An AI attractiveness test is an online tool that maps the landmarks of a face in a photo,
                  measures features like symmetry and proportion, and converts them into a beauty score, usually on
                  a scale of 0 to 100. The important part is what that number is not. It is a statistical estimate
                  produced by one software model, not an objective fact about your appearance.
                </p>
                <p>
                  This is why a face attractiveness analyzer and the next tool you try will often disagree on the
                  same selfie. The score follows the model and the faces it was trained on. Change the tool, and
                  the verdict changes with it.
                </p>
              </section>

              <section>
                <h2>What can AI actually measure about your face?</h2>
                <p>
                  Quite a lot, as long as you separate measurement from judgment. Software is dependable at reading
                  geometry and surface detail. It cannot read the things that actually shape how attractive a
                  person seems in real life.
                </p>
                <div className="not-prose overflow-x-auto mt-4">
                  <table className="w-full text-sm text-left table-auto border rounded-lg">
                    <thead>
                      <tr className="bg-muted/60">
                        <th className="px-4 py-2 text-primary">
                          <span className="inline-flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" /> AI can measure this reliably
                          </span>
                        </th>
                        <th className="px-4 py-2 text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <XCircle className="w-4 h-4" /> AI cannot measure this
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t align-top">
                        <td className="px-4 py-3">Landmark positions (eyes, nose, mouth, jaw)</td>
                        <td className="px-4 py-3">Whether you are beautiful</td>
                      </tr>
                      <tr className="border-t align-top bg-muted/30">
                        <td className="px-4 py-3">Left and right facial symmetry</td>
                        <td className="px-4 py-3">Charisma, warmth and expression in motion</td>
                      </tr>
                      <tr className="border-t align-top">
                        <td className="px-4 py-3">Proportions and face shape</td>
                        <td className="px-4 py-3">How a specific person or culture will perceive you</td>
                      </tr>
                      <tr className="border-t align-top bg-muted/30">
                        <td className="px-4 py-3">Skin smoothness and evenness on the surface</td>
                        <td className="px-4 py-3">Your value, confidence or how you carry yourself</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  Treat the left column as data you can use. Treat the right column as out of any algorithm's reach.
                </p>
              </section>

              <section>
                <h2>Are AI beauty scores accurate?</h2>
                <p>
                  Partly. A facial symmetry test or proportion analyzer is reliable at the geometry and shaky at
                  the conclusion it draws from it. Even the research that does find an ideal layout undercuts the
                  idea of a perfect score. In a well known 2010 study (Pallett, Link and Lee), faces looked most
                  attractive when the eyes sat about 36 percent of the way down the face and the eyes were spaced
                  about 46 percent of the face width apart. The catch is that these so called ideal ratios simply
                  matched the average face, and they shift from one population to another. There is no single fixed
                  target a score can measure you against.
                </p>
              </section>

              <section>
                <h2>Is the golden ratio a real measure of beauty?</h2>
                <p>
                  No. Many tools claim your face is beautiful when its proportions hit the golden ratio of about
                  1.618, but the evidence does not back this up. A 2024 systematic review in Maxillofacial Plastic
                  and Reconstructive Surgery concluded there is no convincing evidence linking the golden ratio to
                  idealized facial proportions or beauty, and that it should not even guide surgical planning.
                  Plenty of widely admired faces do not fit it. When a <a href="/health/golden-ratio-face-calculator" className="text-primary hover:underline">
                    golden ratio face calculator
                  </a> presents 1.618
                  as objective science, read it as marketing.
                </p>
              </section>

              <section>
                <h2>Are AI attractiveness tests biased?</h2>
                <p>
                  They can be, because a model only knows the faces it was trained on. The clearest example is
                  Beauty.AI, an algorithm-judged beauty contest from 2016 that drew roughly 6,000 entries from more
                  than 100 countries. Of its 44 winners, nearly all were light-skinned and only one had dark skin,
                  even though many entrants came from Africa and India. The organizers blamed a training set that
                  lacked diversity. The lesson holds today: a low score can reveal more about a narrow dataset than
                  about your face.
                </p>
              </section>

              <section>
                <h2>Why a single beauty score can backfire</h2>
                <p>
                  This is the part most viral tools leave out. Reducing a face to one ranking invites appearance
                  comparison, and the research on that is consistent. A 2024 meta-analysis pooling 83 studies and
                  more than 55,000 people found a clear link between appearance-based comparison and worse body
                  image, with teenagers the most vulnerable group. A label like below average is not useful
                  feedback. It is a comparison aimed straight at your self-worth, which is exactly why Calqulate.net
                  does not hand out an attractiveness score.
                </p>
              </section>

              <section>
                <h2>A better alternative: face shape and style</h2>
                <p>
                  Instead of rating you, Calqulate.net analyzes your face shape, the one neutral and genuinely
                  useful thing the geometry can tell you. The Face Shape and Style Finder above detects your face
                  shape from facial landmarks, shows exactly what it measured, and recommends hairstyles, eyewear,
                  beard or makeup framing, and flattering photo angles for that shape. It gives you something to act
                  on, not a verdict to carry around.
                </p>
              </section>

              <section>
                <h2>How to get the most reliable result</h2>
                <p>
                  The photo matters more than the tool. Use even, natural light, face the camera directly, hold a
                  neutral expression, pull your hair back, and remove glasses so the software can read your
                  features. Skip heavy filters, which flatten the texture and proportions the model depends on. A
                  weak photo lowers accuracy, so Calqulate.net flags image quality on its own rather than letting a
                  bad picture drag down the result it shows you.
                </p>
              </section>

              <section>
                <h2>Is it safe to upload your photo?</h2>
                <p>
                  On Calqulate.net, yes, because nothing leaves your device. The face detection runs locally in
                  your browser, and the site does not upload, store, sell or share your photo. With other
                  attractiveness tools, check the privacy policy first, since face data is sensitive and some tools
                  keep or reuse the images you submit.
                </p>
              </section>

              {/* Disclaimer */}
              <section className="not-prose">
                <Card className="border-amber-300/60 bg-amber-50 dark:bg-amber-950/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300 text-lg">
                      <ShieldCheck className="w-5 h-5" /> Disclaimer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-amber-800/90 dark:text-amber-200/90">
                    This tool is for general guidance and entertainment. It does not measure objective beauty,
                    provide a medical or psychological assessment, or guarantee any outcome, and no result is 100
                    percent accurate. Estimates come from a single 2D photo and vary with lighting, angle and
                    expression. If worries about your appearance are affecting your mood or daily life, consider
                    talking with a qualified professional.
                  </CardContent>
                </Card>
              </section>

            

              {/* Sources */}
              <section className="not-prose">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Microscope className="w-6 h-6 text-primary" /> Sources and further reading
                </h2>
                <ul className="space-y-3">
                  {SOURCES.map((s) => (
                    <li key={s.url} className="text-sm">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="font-medium text-primary inline-flex items-center gap-1 hover:underline"
                      >
                        {s.title}
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                      <p className="text-muted-foreground mt-0.5">{s.note}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
