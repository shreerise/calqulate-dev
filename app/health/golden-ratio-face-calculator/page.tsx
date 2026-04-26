import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import GoldenRatioFaceCalculator from "@/components/calculators/golden-ratio-face-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ScanFace, 
  Camera, 
  CheckCircle2, 
  Info, 
  AlertTriangle,
  ListChecks,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Focus,
  Check
} from "lucide-react"

export const metadata: Metadata = {
  title: "Golden Ratio Face Calculator: Check Your Facial Proportions",
  description:
    "Upload a clear photo and check how balanced your facial proportions appear with our Golden Ratio Face Detector.",
  keywords:
    "golden ratio face calculator, face golden ratio calculator, calculate face golden ratio, golden ratio calculator face, golden ratio face test, facial proportion analysis",
  alternates: {
    canonical: "https://calqulate.net/health/golden-ratio-face-calculator",
  },
}

const faqs =[
  {
    question: "What is a golden ratio face calculator?",
    answer:
      "A golden ratio face calculator is a tool that compares your facial measurements to the golden ratio benchmark of 1.618. It helps estimate how balanced your facial proportions appear based on symmetry, spacing, and feature alignment.",
  },
  {
    question: "How does a golden ratio calculator for face analysis work?",
    answer:
      "A golden ratio calculator for face analysis maps facial landmarks from your photo, measures important distances, and compares those ratios against the golden ratio reference. The final result usually includes an overall score and a feature-by-feature breakdown.",
  },
  {
    question: "Can I use a golden ratio face calculator to upload a photo tool on mobile?",
    answer:
      "Yes. A good golden ratio face calculator upload photo tool should work on both desktop and mobile. For best results, use a front-facing image with good lighting and a neutral expression.",
  },
  {
    question: "Is a face golden ratio calculator accurate?",
    answer:
      "A face golden ratio calculator can provide a useful estimate when the image is clear and front-facing. Accuracy depends on photo quality, visible landmarks, angle, and how the tool weighs different facial ratios.",
  },
  {
    question: "What is the difference between a golden ratio face test and a beauty score app?",
    answer:
      "A golden ratio face test focuses on measurable facial proportions and symmetry. Many beauty score apps give a score without clearly explaining the facial ratios behind it.",
  },
  {
    question: "Can AI improve a golden ratio face calculator?",
    answer:
      "Yes. A golden ratio face calculator AI system can detect facial landmarks more precisely, measure more ratios automatically, and produce a more consistent feature-by-feature report than a manual method.",
  },
  {
    question: "Is there a golden ratio face calculator app?",
    answer:
      "Yes, many users look for a golden ratio face calculator app to scan selfies directly from their phone. If your site is mobile responsive, you can offer the same convenience without forcing users to install an app.",
  },
  {
    question: "Does the perfect golden face ratio exist?",
    answer:
      "Not in an absolute sense. The golden ratio is a proportion benchmark, not a rule that defines beauty for every face. It is best used as a reference point for facial harmony analysis.",
  },
]

export default function GoldenRatioFacePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CalculatorSchema
        name="Golden Ratio Face Calculator"
        description="Upload a photo and analyze your facial proportions, symmetry, and harmony using the golden ratio benchmark."
        url="https://calqulate.net/tools/golden-ratio-face-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            
            {/* H1 & Hero section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-balance mb-4">
                Golden Ratio Face Detector
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-4 max-w-3xl mx-auto">
                Upload a clear photo and check how balanced your facial proportions appear with our Golden Ratio Face Detector.
              </h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-4xl mx-auto mb-6">
                Most face score tools give you a random number and no real explanation. Our golden ratio face calculator helps you understand facial symmetry, feature balance, and proportion match using a simple upload-photo analysis.
              </p>
            </div>

            {/* Calculator Component */}
            <GoldenRatioFaceCalculator />
            
            <p className="text-center text-sm font-bold text-gray-600 mt-4 flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              No filters. No beautification. Just proportion-based facial analysis.
            </p>

            <div className="prose prose-gray dark:prose-invert max-w-none mt-16 space-y-16">
              
              {/* Intro Section under hero */}
              <section className="text-center max-w-3xl mx-auto space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  People usually search for a golden ratio face calculator because they want a clear answer to one question: How balanced are my facial proportions? But most tools either oversimplify the result or hide how the score is measured.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our tool is designed for people who want more than a face rating. It helps you understand how your features align through a practical golden ratio face test that looks at facial symmetry, spacing, and proportion balance in one report.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Whether you searched for a golden ratio calculator face, face golden ratio calculator, or calculate face golden ratio, the goal is the same: get a result that feels easy to understand and worth using.
                </p>
              </section>

              {/* Golden Ratio Face Image */}
              <section className="flex justify-center my-8">
                <img
                  src="/face-shape-golden-ratio-image.png"
                  alt="Golden ratio face proportions visualization"
                  className="w-full max-w-[700px] h-auto rounded-lg shadow-md mx-auto"
                />
              </section>

              {/* H2: What Is a Golden Ratio Face Calculator? */}
              <section className="py-8 border-t border-gray-100">
                <h2 className="mb-6 text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <Info className="w-7 h-7 text-indigo-600" />
                  What Is a Golden Ratio Face Calculator?
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                  <p>
                    A golden ratio face calculator is a facial proportion tool that checks how closely your face measurements align with the golden ratio benchmark, often represented as 1.618. It is commonly used to study facial harmony, spacing, and symmetry.
                  </p>
                  <p>
                    A golden ratio calculator face tool usually looks at key distances on the face, compares them to expected proportions, and gives you a score or report. Some tools also include a visual overlay, face shape estimate, and more detailed golden ratio face test insights.
                  </p>
                  <p className="p-5 bg-indigo-50 text-indigo-900 border-l-4 border-indigo-600 italic rounded-r-lg">
                    It is important to treat the result as a proportion analysis, not a final judgment of beauty. Facial attractiveness is influenced by many factors, and different tools may weigh measurements differently.
                  </p>
                </div>
              </section>

              {/* H2: How Our Golden Ratio Face Detector Works */}
              <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  How Our Golden Ratio Face Detector Works
                </h2>
                <h3 className="text-xl font-bold text-slate-800 mb-4">How to use the golden ratio face calculator:</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  {[
                    "Upload a clear front-facing photo",
                    "Let the detector identify key facial landmarks",
                    "Compare your facial ratios against the golden ratio benchmark",
                    "Review your score, symmetry insights, and feature-by-feature analysis"
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="font-medium">{step}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* H2: Upload a Photo and Check Your Facial Proportions */}
              <section>
                <h2 className="mb-8 text-3xl font-bold text-gray-900">
                  Upload a Photo and Check Your Facial Proportions
                </h2>
                <p className="text-gray-700 mb-6 text-lg">How to check your golden ratio face in 3 simple steps:</p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                      <Camera className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-blue-900 mb-2 text-lg">Step 1: Upload your photo</h3>
                    <p className="text-sm text-blue-800 leading-relaxed">Choose a clear, front-facing image with good lighting. Avoid filters, extreme angles, sunglasses, or cropped foreheads.</p>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                      <ScanFace className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-purple-900 mb-2 text-lg">Step 2: Let the detector scan your features</h3>
                    <p className="text-sm text-purple-800 leading-relaxed">Our system maps facial landmarks and compares your measurements through a golden ratio calculator for face analysis.</p>
                  </div>
                  <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <ListChecks className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-green-900 mb-2 text-lg">Step 3: Review your face score</h3>
                    <p className="text-sm text-green-800 leading-relaxed">You will see your golden face ratio calculator result with symmetry, harmony, and feature-balance insights in one place.</p>
                  </div>
                </div>
              </section>

              {/* H2: What We Measure in Our Face Golden Ratio Calculator */}
              <section>
                <h2 className="mb-8 text-3xl font-bold text-gray-900">
                  What We Measure in Our Face Golden Ratio Calculator
                </h2>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <Card className="not-prose shadow-sm border-gray-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-4">
                        <Focus className="w-6 h-6 text-indigo-600" />
                        What the detector measures
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Our golden ratio face detector is built to analyze the parts of the face that most proportion tools focus on:
                      </p>
                      <ul className="space-y-3">
                        {[
                          "face length to face width",
                          "forehead width",
                          "cheekbone width",
                          "jaw width",
                          "eye spacing",
                          "nose width",
                          "lip width",
                          "upper, middle, and lower face balance",
                          "left-right facial symmetry"
                        ].map((item, i) => (
                          <li key={i} className="flex gap-3 text-gray-700 items-start">
                            <Check className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                            <span className="capitalize">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="not-prose shadow-sm border-gray-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 mb-4">
                        <Sparkles className="w-6 h-6 text-emerald-600" />
                        What you get in your facial analysis report
                      </h3>
                      <ul className="space-y-3 mt-4">
                        {[
                          "Overall golden ratio face score",
                          "Facial symmetry score",
                          "Feature harmony score",
                          "Face shape estimate",
                          "Proportion match breakdown",
                          "Landmark mapping overlay",
                          "Ratio-by-ratio explanation",
                          "Tips to improve photo accuracy",
                          "Easy retest with another image"
                        ].map((item, i) => (
                          <li key={i} className="flex gap-3 text-gray-700 items-start">
                            <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* H2: How We Map Accuracy in the Result */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Map Accuracy in the Result</h2>
                <p className="text-lg text-gray-700 mb-8">
                  Our calculator does not guess your result from a single impression. It follows a measurement-based process:
                </p>
                
                <div className="space-y-6 mb-10 pl-6 border-l-4 border-indigo-100">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Step 1: Facial landmark detection</h4>
                    <p className="text-gray-700 mt-1">The system identifies important facial points such as the eyes, nose edges, lip corners, jawline, cheek width, and chin.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Step 2: Ratio calculation</h4>
                    <p className="text-gray-700 mt-1">It measures key distances and compares them with the golden ratio benchmark of 1.618, which is commonly used in facial proportion analysis.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Step 3: Deviation scoring</h4>
                    <p className="text-gray-700 mt-1">Each facial ratio is scored by how close it is to the ideal benchmark. Smaller deviation means a higher match score.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Step 4: Weighted score system</h4>
                    <p className="text-gray-700 mt-1">Not every facial measurement matters equally. Core facial balance, symmetry, and primary proportion ratios get more weight than minor variations.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Step 5: Accuracy check</h4>
                    <p className="text-gray-700 mt-1">If the uploaded image has poor lighting, side angle, blur, heavy filter, covered features, or strong expression, the confidence level drops.</p>
                  </div>
                </div>

                <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                  <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    What affects accuracy
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <ul className="space-y-3 text-red-800 font-medium">
                      <li className="flex items-center gap-2">❌ side-facing photos</li>
                      <li className="flex items-center gap-2">❌ low light</li>
                      <li className="flex items-center gap-2">❌ beauty filters</li>
                      <li className="flex items-center gap-2">❌ sunglasses or hair covering the face</li>
                    </ul>
                    <ul className="space-y-3 text-red-800 font-medium">
                      <li className="flex items-center gap-2">❌ tilted head</li>
                      <li className="flex items-center gap-2">❌ smile or strong facial expression</li>
                      <li className="flex items-center gap-2">❌ low-quality image</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white/60 rounded-xl border border-red-200">
                    <p className="text-red-900 font-bold">
                      For the most consistent result, upload a clear, front-facing photo with neutral expression and good lighting.
                    </p>
                  </div>
                </div>
              </section>

              {/* H2: Why Our Golden Ratio Face Calculator Is Better */}
              <section className="py-8 border-t border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Why Our Golden Ratio Face Calculator Is Better
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">1</span>
                      Upload-photo based analysis
                    </h4>
                    <p className="text-gray-700 pl-10">You do not need to guess your measurements manually. Our golden ratio face calculator upload photo flow makes the experience faster and easier.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">2</span>
                      Real ratio breakdown
                    </h4>
                    <p className="text-gray-700 pl-10">Instead of showing just one number, we explain the facial proportions behind the result.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">3</span>
                      Symmetry + harmony in one report
                    </h4>
                    <p className="text-gray-700 pl-10">A good face golden ratio calculator should not only compare one ratio. It should also show how balanced the full face appears.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">4</span>
                      Easy to use on mobile
                    </h4>
                    <p className="text-gray-700 pl-10">Most users want an instant answer on the phone. Our layout is built for quick photo upload, readable results, and smooth mobile use.</p>
                  </div>
                  <div className="space-y-3 md:col-span-2 md:w-1/2">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">5</span>
                      Better user trust
                    </h4>
                    <p className="text-gray-700 pl-10">We explain what affects your result, what lowers accuracy, and why different photos can produce slightly different scores.</p>
                  </div>
                </div>
              </section>

               {/* H2: How to Get the Best Result from a Golden Ratio Face Test (Conversion/Trust Block) */}
               <section className="bg-white text-gray-900 p-10 rounded-3xl border border-gray-200">
                 <h2 className="text-3xl font-bold text-gray-900 mb-6">
                   How to Get the Best Result from a Golden Ratio Face Test
                 </h2>
                 <h3 className="text-xl font-semibold text-gray-700 mb-4">Why users prefer our golden ratio face calculator</h3>
                 <p className="text-gray-700 text-lg mb-6">
                   Most people do not want just a number. They want to know:
                 </p>
                 <ul className="space-y-4 mb-8">
                   {[
                     "what was measured",
                     "why the score looks the way it does",
                     "how accurate the result is",
                     "whether the photo quality affected the report",
                     "what to try next for a better scan"
                   ].map((item, i) => (
                     <li key={i} className="flex gap-3 text-gray-700 items-center text-lg">
                       <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                       {item}
                     </li>
                   ))}
                 </ul>
                 <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                   <p className="text-xl font-bold text-gray-900 text-center">
                     That is exactly what our detector is built to solve.
                   </p>
                 </div>
               </section>

              {/* Interlinking: Face Shape Calculator */}
              <section className="py-8 border-t border-gray-100">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-100">
                  <p style={{ fontWeight: 600, fontSize: "18px", marginBottom: "16px" }}>
                    Your proportions look balanced—but your <span style={{ color: "#ff4d6d" }}>face shape reveals the full picture</span>.
                  </p>
                  <a
                    href="/health/face-shape-calculator"
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      padding: "12px 20px",
                      background: "#10b981",
                      color: "#fff",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    Discover Your Face Shape →
                  </a>
                </div>
              </section>

            </div>

            {/* Structured FAQ UI */}
            <div className="mt-16 pt-8 border-t border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                FAQ About Golden Ratio Calculator Face Analysis
              </h2>
              <FAQSection faqs={faqs} />
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}