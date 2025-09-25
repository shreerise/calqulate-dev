import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Disclaimer - Calculator Hub",
  description: "Important disclaimer about Calculator Hub's calculator results and limitations of our estimates.",
  keywords: "disclaimer, calculator accuracy, estimates, calculator hub disclaimer",
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-yellow-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">Disclaimer</h1>
              <p className="text-muted-foreground">Important information about our calculator results</p>
            </div>

            <Card>
              <CardContent className="prose prose-gray max-w-none p-8">
                <h2>General Disclaimer</h2>
                <p>
                  The information provided by Calculator Hub's calculators is for general informational and educational
                  purposes only. All calculations are estimates based on the data you provide and industry-standard
                  formulas. These estimates should not be considered as professional advice or exact quotes.
                </p>

                <h2>Accuracy of Calculations</h2>
                <p>
                  While we strive to provide accurate and up-to-date calculations, Calculator Hub makes no
                  representations or warranties of any kind, express or implied, about the completeness, accuracy,
                  reliability, suitability, or availability of the calculator results.
                </p>

                <h3>Factors Affecting Accuracy</h3>
                <ul>
                  <li>Regional variations in labor costs and material prices</li>
                  <li>Market fluctuations and economic conditions</li>
                  <li>Specific project requirements and complications</li>
                  <li>Local building codes and permit requirements</li>
                  <li>Seasonal variations in pricing and availability</li>
                </ul>

                <h2>Professional Consultation Required</h2>
                <p>
                  Calculator results should not replace professional consultation. For important decisions involving:
                </p>
                <ul>
                  <li>
                    <strong>Home Improvement Projects:</strong> Consult with licensed contractors, architects, or
                    engineers
                  </li>
                  <li>
                    <strong>Financial Decisions:</strong> Seek advice from qualified financial advisors or accountants
                  </li>
                  <li>
                    <strong>Legal Matters:</strong> Consult with appropriate legal professionals
                  </li>
                  <li>
                    <strong>Safety Concerns:</strong> Always prioritize safety and follow professional guidelines
                  </li>
                </ul>

                <h2>Limitation of Liability</h2>
                <p>
                  Calculator Hub shall not be liable for any direct, indirect, incidental, consequential, or punitive
                  damages arising from:
                </p>
                <ul>
                  <li>Use of calculator results in decision-making</li>
                  <li>Reliance on estimates for project planning or budgeting</li>
                  <li>Financial losses resulting from calculator-based decisions</li>
                  <li>Errors or omissions in calculation results</li>
                  <li>Technical issues or website downtime</li>
                </ul>

                <h2>User Responsibility</h2>
                <p>Users are responsible for:</p>
                <ul>
                  <li>Providing accurate input data for calculations</li>
                  <li>Understanding the limitations of estimate-based results</li>
                  <li>Seeking professional advice for important decisions</li>
                  <li>Verifying results with multiple sources when appropriate</li>
                  <li>Using common sense and professional judgment</li>
                </ul>

                <h2>Third-Party Information</h2>
                <p>
                  Our calculators may incorporate data from third-party sources, including industry reports, government
                  statistics, and market research. While we select reputable sources, we cannot guarantee the accuracy
                  or completeness of third-party information.
                </p>

                <h2>Updates and Changes</h2>
                <p>
                  Calculator formulas and underlying data are updated periodically to reflect current market conditions
                  and industry standards. However, there may be delays between market changes and calculator updates.
                </p>

                <h2>Regional Variations</h2>
                <p>
                  Our calculators provide general estimates that may not reflect specific regional conditions, local
                  regulations, or market variations. Always consider local factors when making decisions based on
                  calculator results.
                </p>

                <h2>No Warranty</h2>
                <p>
                  Calculator Hub provides its services "as is" without any warranty of any kind, either express or
                  implied, including but not limited to the implied warranties of merchantability, fitness for a
                  particular purpose, or non-infringement.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have questions about this disclaimer or need clarification about calculator limitations, please
                  contact us through our contact page or email us at info@calculatorhub.com.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
