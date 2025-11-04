import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import FaceShapeCalculator from "@/components/calculators/face-shape-calculator";
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data";
import { FAQSection } from "@/components/seo/faq-section";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Face Shape Calculator (Photo + Manual) | Calqulate",
  description:
    "Find your face shape instantly from a selfie or by entering measurements. Get face length, forehead, cheekbone, and jaw widths. Private, on-device analysis.",
  keywords:
    "face shape calculator, face shape detector, selfie face shape, oval face, round face, square face, diamond face, heart face, oblong face, triangle face",
};

const faqs = [
  {
    question: "Do you upload my photo?",
    answer:
      "No. The analysis runs entirely in your browser using on-device AI (MediaPipe). Images are not sent to our servers.",
  },
  {
    question: "How accurate is the face shape result?",
    answer:
      "Results depend on lighting and a front-facing angle. We also show transparent ratios so you can compare manually. For the most accurate sizes, use a known scale (like IPD or a card).",
  },
  {
    question: "Can I get sizes in cm/inches?",
    answer:
      "Yes. We estimate cm/in after you provide an interpupillary distance (IPD) or the length of a known object in the photo.",
  },
  {
    question: "Which shapes can it detect?",
    answer:
      "Oval, Round, Square, Oblong (Rectangular), Heart (Inverted Triangle), Diamond, and Triangle (Pear).",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="Face Shape Calculator"
        description="Detect your face shape from a selfie or with manual measurements. Private, on-device processing."
        url="https://calqulate.net/health/face-shape-calculator"
      />
      <FAQSchema faqs={faqs} />
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Face Shape Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Upload a selfie (kept on your device) or enter simple measurements to
                find your face shape. We also estimate face length and widths (forehead,
                cheekbones, jaw) with optional real-world units.
              </p>
            </div>

            <FaceShapeCalculator />

            {/* --- SEO Content --- */}
            <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-12">
              <section>
                <h2><b>How this calculator works</b></h2>
                <p>
                  The photo tool uses privacy-safe facial landmarks in your browser to
                  estimate your face length and widths across the upper (forehead),
                  middle (cheekbones), and lower (jaw) thirds. We then apply a simple,
                  explainable rule set to classify your shape. Prefer not to use a
                  selfie? Switch to the manual tab and enter measurements with a tape.
                </p>
              </section>

              <section>
                <h2><b>Tips for best accuracy</b></h2>
                <ul>
                  <li>Use a front-facing photo with the camera at eye level.</li>
                  <li>Even lighting, hair pulled back, and a neutral expression.</li>
                  <li>Optional scale: enter your IPD (usually 58–70 mm) or place a known object (e.g., a card = 85.6 mm).</li>
                </ul>
              </section>

              <section>
                <h2><b>Style guides by face shape</b></h2>
                <p>
                  After you get your result, explore recommended{" "}
                  <Link className="text-primary hover:underline" href="/search?q=hairstyle">
                    hairstyles
                  </Link>
                  , beard styles, and glasses frames to balance proportions. We surface
                  tailored tips directly in the results section.
                </p>
              </section>
            </div>

            <FAQSection faqs={faqs} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
