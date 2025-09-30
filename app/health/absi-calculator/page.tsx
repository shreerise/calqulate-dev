import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
// import Ads from "@/components/ads/ads"
import ABSICalculator from "@/components/calculators/absi-calculator"
import { CalculatorSchema, FAQSchema } from "@/components/seo/structured-data"
import { FAQSection } from "@/components/seo/faq-section"

export const metadata: Metadata = {
  title: "ABSI Calculator: A Body Shape Index Health Risk Assessment",
  description:
    "Go beyond BMI with our accurate ABSI Calculator. Learn how your body shape, specifically abdominal fat, impacts your long-term health risk. Includes detailed charts and interpretations.",
  keywords: "ABSI calculator, A Body Shape Index, body shape calculator, health risk assessment, visceral fat, abdominal fat, BMI vs ABSI, metabolic health",
}

const faqs = [
  {
    question: "What is A Body Shape Index (ABSI)?",
    answer:
      "A Body Shape Index (ABSI) is a health metric that evaluates mortality risk based on how fat is distributed in the body, particularly abdominal fat. It's calculated using your waist circumference, height, and weight.",
  },
  {
    question: "How is the ABSI formula different from BMI?",
    answer:
      "The ABSI formula is: Waist / (BMI^(2/3) * Height^(1/2)). Unlike BMI, which only considers height and weight, ABSI specifically includes waist circumference to assess the risk associated with central obesity.",
  },
  {
    question: "What does the ABSI Z-Score mean?",
    answer:
      "The Z-Score indicates how your ABSI value compares to a reference population of the same age and gender. A positive Z-score means your risk is higher than average, while a negative score means it's lower.",
  },
  {
    question: "Why is a high ABSI score considered risky?",
    answer:
      "A high ABSI score means your waist is larger than expected for your height and weight. This indicates a higher concentration of visceral (abdominal) fat, which is strongly linked to an increased risk of cardiovascular disease, type 2 diabetes, and premature mortality.",
  },
  {
      question: "Is ABSI accurate for athletes or bodybuilders?",
      answer: "ABSI is generally more reliable than BMI for muscular individuals because it focuses on waist size rather than total weight. However, extreme body compositions can still affect its accuracy. It is best used for the general adult population."
    },
  {
    question: "How can I improve my ABSI score?",
    answer:
      "Improving your ABSI score involves reducing abdominal fat through a combination of a balanced diet, regular aerobic exercise (like running or cycling), and strength training. Consulting a healthcare provider for personalized advice is recommended.",
  },
  {
    question: "Is ABSI a definitive diagnostic tool?",
    answer: "No, ABSI is a screening tool, not a diagnostic one. It provides an estimate of risk. Always consult with a healthcare professional for a comprehensive health evaluation and diagnosis."
  }
]

export default function ABSICalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CalculatorSchema
        name="ABSI Calculator"
        description="Calculate A Body Shape Index (ABSI) to assess health risks related to body shape."
        url="https://calqulate.net/health/absi-calculator"
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* <Ads.BannerAd className="mb-8" /> */}

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">ABSI Calculator</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Assess your health risk by calculating your "A Body Shape Index" (ABSI)—a metric that goes beyond traditional BMI by factoring in your waist circumference.
              </p>
            </div>

            <ABSICalculator />

            {/* <Ads.InContentAd /> */}

              <div className="prose prose-gray dark:prose-invert max-w-none mt-12 space-y-8">
              <section>
                <h2>How to Interpret Your ABSI Score</h2>
                <p>
                  Your raw ABSI score is converted into an ABSI Z-Score. This score tells you where your body shape risk falls relative to others of your age and gender.
                </p>
                <ul>
                  <li><strong>Low Risk (Z &lt; -0.868):</strong>Your body shape indicates a very low relative health risk. This is a positive sign for your metabolic health.</li>
                  <li><strong>Average Risk (-0.868 to 0.868):</strong> Your risk is within the normal range for your demographic. Maintaining a healthy lifestyle is key.</li>
                  <li><strong>High Risk (0.868 to 1.645):</strong> Your body shape suggests an elevated risk, which may warrant lifestyle changes focused on reducing abdominal fat.</li>
                  <li><strong>Very High Risk (Z &ge; 1.645):</strong> Indicates a significantly increased health risk. Consulting a healthcare professional for guidance is strongly advised.</li>
                </ul>
              </section>

              {/* --- NEW SECTION --- */}
              <section>
                <h2>The Science Behind Why ABSI Matters</h2>
                <p>
                  ABSI was developed by researchers to specifically address the shortcomings of BMI. While BMI is good at measuring overall mass, it fails to account for where that mass is stored. The real danger to health isn't weight itself, but <strong>visceral fat</strong>—the fat stored deep within the abdominal cavity around organs like the liver and intestines.
                </p>
                <p>
                  This type of fat is metabolically active and releases inflammatory substances that contribute to insulin resistance, high blood pressure, and cardiovascular disease. Because ABSI incorporates waist circumference, it serves as a powerful proxy for visceral fat levels, making it a more nuanced predictor of mortality risk than BMI alone.
                </p>
              </section>

              {/* --- NEW VISUALS SECTION --- */}
              <section>
                  <h2>Visualizing Health Risk: Shape vs. Size</h2>
                  <p>
                      Visuals can help clarify why body shape (measured by ABSI) can be more telling than body size (measured by BMI) alone. Below are two illustrations that explain these critical health concepts.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                      <div className="p-4 border rounded-lg">
                          <Image
                              src="/absi-vs-bmi.svg" // IMPORTANT: Create this image and place it in your /public folder
                              alt="An illustration comparing two people with the same BMI but different ABSI scores. One has a healthy waist, the other has central obesity, highlighting a higher health risk."
                              width={300}
                              height={300}
                              className="mx-auto"
                          />
                          <p className="text-center text-sm mt-2 text-muted-foreground">Fig 1: Same BMI, Different Risk. The person on the right has a higher ABSI due to more abdominal fat, indicating greater health risk.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                          <Image
                              src="/visceral-fat.svg" // IMPORTANT: Create this image and place it in your /public folder
                              alt="A diagram showing the difference between subcutaneous fat (under the skin) and visceral fat (around the organs). Visceral fat is shown as being more dangerous."
                              width={300}
                              height={300}
                              className="mx-auto"
                          />
                          <p className="text-center text-sm mt-2 text-muted-foreground">Fig 2: Visceral vs. Subcutaneous Fat. ABSI helps estimate the risk associated with harmful visceral fat.</p>
                      </div>
                  </div>
              </section>

              {/* --- NEW SECTION --- */}
              <section>
                <h2>How to Accurately Measure Your Waist Circumference</h2>
                <p>
                  An accurate waist measurement is crucial for a meaningful ABSI result. Follow these steps for the best measurement:
                </p>
                <ol>
                  <li><strong>Find the right spot:</strong> Locate the top of your hip bone and the bottom of your ribs. Your waist is the soft, fleshy part in between, usually just above your belly button.</li>
                  <li><strong>Use a flexible tape measure:</strong> Wrap the tape around your waist. Make sure it is parallel to the floor and not twisted.</li>
                  <li><strong>Breathe normally:</strong> Stand relaxed and breathe out normally. Do not suck in your stomach.</li>
                  <li><strong>Check the fit:</strong> The tape should be snug against your skin, but not so tight that it's digging in. You should be able to fit one finger between the tape and your body.</li>
                  <li><strong>Read the measurement:</strong> Record the number where the tape measure's end meets the circling tape.</li>
                </ol>
              </section>

              <section>
                <h2>ABSI vs. BMI: A Detailed Comparison</h2>
                <p>
                  Using both ABSI and BMI together gives a more complete picture of your health status. Here's how they differ:
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left p-2">Metric</th>
                                <th className="text-left p-2">What It Measures</th>
                                <th className="text-left p-2">Primary Pro</th>
                                <th className="text-left p-2">Primary Con</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border-t"><strong>BMI</strong></td>
                                <td className="p-2 border-t">Body mass relative to height (Size)</td>
                                <td className="p-2 border-t">Simple to calculate; good for population studies.</td>
                                <td className="p-2 border-t">Can't distinguish fat from muscle mass.</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-t"><strong>ABSI</strong></td>
                                <td className="p-2 border-t">Body shape and abdominal fat (Shape)</td>
                                <td className="p-2 border-t">Better predictor of mortality risk by isolating abdominal obesity.</td>
                                <td className="p-2 border-t">Requires an accurate waist measurement.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </section>

              {/* --- NEW SECTION --- */}
              <section>
                <h2>Actionable Steps to Improve Your ABSI Score</h2>
                <p>
                  If your ABSI score is in a high-risk category, the primary goal is to reduce visceral fat. Here are proven strategies:
                </p>
                <ul>
                  <li><strong>Increase Soluble Fiber:</strong> Foods like oats, beans, avocados, and broccoli can help reduce belly fat.</li>
                  <li><strong>Prioritize Aerobic Exercise:</strong> Activities like brisk walking, running, cycling, and swimming are highly effective at burning visceral fat. Aim for at least 150 minutes of moderate-intensity cardio per week.</li>
                  <li><strong>Incorporate Strength Training:</strong> Building muscle increases your overall metabolic rate, helping your body burn more fat at rest.</li>
                  <li><strong>Avoid Trans Fats and Reduce Sugar:</strong> Read labels to avoid hydrogenated oils. Minimize sugary drinks, desserts, and processed foods, which contribute directly to abdominal fat storage.</li>
                  <li><strong>Manage Stress and Prioritize Sleep:</strong> High stress levels (and the hormone cortisol) are linked to increased belly fat. Aim for 7-9 hours of quality sleep per night.</li>
                </ul>
              </section>

              {/* --- NEW RESOURCES SECTION --- */}
              <section>
                  <h2>Authoritative Resources & Further Reading</h2>
                  <p>
                      To ensure transparency and provide opportunities for deeper learning, this calculator and its information are based on established scientific research. Below are links to the original studies and other authoritative resources.
                  </p>
                  <ul>
                      <li>
                          <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0039504" target="_blank" rel="noopener noreferrer nofollow">
                              <strong>Original ABSI Study (PLOS ONE):</strong> The 2012 paper by Krakauer & Krakauer that first proposed "A Body Shape Index" as a new measure of mortality risk.
                          </a>
                      </li>
                      <li>
                          <a href="https://www.niddk.nih.gov/health-information/weight-management/assessing-your-weight-health-risk" target="_blank" rel="noopener noreferrer nofollow">
                              <strong>National Institutes of Health (NIH):</strong> Guidance on assessing weight and health risk, explaining the importance of waist circumference.
                          </a>
                      </li>
                      <li>
                          <a href="https://www.hsph.harvard.edu/obesity-prevention-source/obesity-definition/abdominal-obesity/" target="_blank" rel="noopener noreferrer nofollow">
                              <strong>Harvard T.H. Chan School of Public Health:</strong> An explanation of abdominal obesity and its associated health dangers.
                          </a>
                      </li>
                       <li>
                          <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4362399/" target="_blank" rel="noopener noreferrer nofollow">
                              <strong>Anthropometric indices as predictors of mortality (PMC):</strong> A comparative study highlighting the predictive power of measures like ABSI.
                          </a>
                      </li>
                  </ul>
              </section>

              <section>
                <h2>Limitations & Medical Disclaimer</h2>
                <p>
                  While ABSI is a powerful screening tool, it's essential to understand its limitations.
                </p>
                <ul>
                  <li><strong>Not a Diagnostic Tool:</strong> It provides a risk estimate, not a medical diagnosis.</li>
                  <li><strong>Measurement Accuracy:</strong> The result is highly dependent on the accuracy of your waist, weight, and height measurements.</li>
                  <li><strong>Population Averages:</strong> The Z-score is based on population data and may not perfectly reflect individual health factors or ethnicity.</li>
                </ul>
                <p>
                  <strong>Disclaimer:</strong> The information provided by this calculator is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </section>
            </div>

            <FAQSection faqs={faqs} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
