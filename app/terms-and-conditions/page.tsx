import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms and Conditions - Calculator Hub",
  description: "Calculator Hub's terms and conditions governing the use of our calculator services and website.",
  keywords: "terms and conditions, terms of service, calculator hub terms",
}

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">Terms and Conditions</h1>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <Card>
              <CardContent className="prose prose-gray max-w-none p-8">
                <h2>Agreement to Terms</h2>
                <p>
                  By accessing and using Calculator Hub, you accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2>Use License</h2>
                <p>
                  Permission is granted to temporarily use Calculator Hub's calculators for personal and commercial use.
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul>
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>

                <h2>Calculator Accuracy and Disclaimers</h2>
                <p>
                  Our calculators provide estimates based on the information you input and current industry standards.
                  However:
                </p>
                <ul>
                  <li>Results are estimates and should not be considered exact quotes</li>
                  <li>
                    Actual costs may vary based on local conditions, market fluctuations, and specific circumstances
                  </li>
                  <li>We recommend consulting with professionals for final decisions</li>
                  <li>Calculator Hub is not responsible for decisions made based on calculator results</li>
                </ul>

                <h2>User Responsibilities</h2>
                <p>Users of Calculator Hub agree to:</p>
                <ul>
                  <li>Provide accurate information when using calculators</li>
                  <li>Use the service for lawful purposes only</li>
                  <li>Not attempt to interfere with the website's operation</li>
                  <li>Respect intellectual property rights</li>
                </ul>

                <h2>Prohibited Uses</h2>
                <p>You may not use our service:</p>
                <ul>
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>
                    To violate any international, federal, provincial, or state regulations, rules, laws, or local
                    ordinances
                  </li>
                  <li>
                    To infringe upon or violate our intellectual property rights or the intellectual property rights of
                    others
                  </li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>

                <h2>Intellectual Property</h2>
                <p>
                  The service and its original content, features, and functionality are and will remain the exclusive
                  property of Calculator Hub and its licensors. The service is protected by copyright, trademark, and
                  other laws.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                  In no event shall Calculator Hub, nor its directors, employees, partners, agents, suppliers, or
                  affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                  resulting from your use of the service.
                </p>

                <h2>Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Calculator Hub and its licensee and licensors, and
                  their employees, contractors, agents, officers and directors, from and against any and all claims,
                  damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to
                  attorney's fees).
                </p>

                <h2>Termination</h2>
                <p>
                  We may terminate or suspend your access immediately, without prior notice or liability, for any reason
                  whatsoever, including without limitation if you breach the Terms.
                </p>

                <h2>Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                  revision is material, we will try to provide at least 30 days notice prior to any new terms taking
                  effect.
                </p>

                <h2>Contact Information</h2>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us through our contact page
                  or email us at legal@calculatorhub.com.
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
