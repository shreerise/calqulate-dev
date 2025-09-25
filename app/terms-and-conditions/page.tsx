import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms and Conditions - Calqulate",
  description: "Terms and Conditions for Calqulate’s calculators, tools, and services.",
  keywords: "terms, terms and conditions, terms of service, Calqulate",
}

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Page Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Terms & Conditions — Calqulate</h1>
              <p className="text-muted-foreground">Last updated: September 24, 2025</p>
              <p className="text-sm mt-2">
                Contact: <a href="mailto:shreerise@gmail.com" className="underline">shreerise@gmail.com</a> 
                {" "}or use our <a href="/contact-us" className="underline">Contact Us</a> form.
              </p>
            </div>

            {/* Table of Contents */}
            {/* <Card className="mb-10">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li><a href="#intro">Introduction / Agreement to Terms</a></li>
                  <li><a href="#services">Our Services</a></li>
                  <li><a href="#orders">Custom Services Orders, Quotes & Remit</a></li>
                  <li><a href="#ip">Intellectual Property</a></li>
                  <li><a href="#conduct">User Conduct & Acceptable Use</a></li>
                  <li><a href="#privacy">Privacy and Data</a></li>
                  <li><a href="#disclaimer">Disclaimers — No Warranty</a></li>
                  <li><a href="#liability">Limit on Responsibility</a></li>
                  <li><a href="#indemnification">Indemnification</a></li>
                  <li><a href="#changes">Changes to Site and Terms</a></li>
                  <li><a href="#termination">Ending</a></li>
                  <li><a href="#thirdparty">Third-Party Links and Services</a></li>
                  <li><a href="#law">Governing Law & Dispute Resolution</a></li>
                  <li><a href="#modifications">Product Statement & Calculator Modifications</a></li>
                  <li><a href="#contact">Contact & Notices</a></li>
                  <li><a href="#agreement">Complete Agreement</a></li>
                  <li><a href="#legal">Legal Advice</a></li>
                </ol>
              </CardContent>
            </Card> */}

            {/* Main Content */}
            <Card>
              <CardContent className="prose prose-gray max-w-none p-8 space-y-8">

                <section id="intro">
                  <h2>1. Introduction / Agreement to Terms</h2>
                  <p>
                    Welcome to <strong>Calqulate</strong> ("we", "us", "our"). These Terms & Conditions
                    ("Terms") define how you can access and use our website, calculators, tools,
                    and related services (collectively, the "Site" or "Services").
                    Accessing this Site or requesting custom services signifies acceptance of these Terms.
                  </p>
                </section>

                <section id="services">
                  <h2>2. Our Services</h2>
                  <h3>2.1 Free Calculators</h3>
                  <p>All calculators on Calqulate are free to access without login or fees.</p>
                  
                  <h3>2.2 Custom Calculator & Development Services</h3>
                  <p>
                    We offer custom calculator development for entrepreneurs or organizations.
                    Contact us via email at <a href="mailto:shreerise@gmail.com">shreerise@gmail.com</a> 
                    or through our <a href="/contact-us">Contact Us</a> page.
                  </p>

                  <h3>2.3 Product Description</h3>
                  <p>
                    Features, timelines, and specific terms for custom services are defined in each written proposal or agreement.
                  </p>
                </section>

                <section id="orders">
                  <h2>3. Custom Services Orders, Quotes & Remit</h2>
                  <p>Requests begin with a quote inquiry via email or contact form. A binding agreement is only formed once both parties sign off in writing.</p>
                  <ul>
                    <li><strong>Payment:</strong> Fees and payment terms are included in written proposals.</li>
                    <li><strong>Cancellations/Refunds:</strong> Terms are specified in each contract.</li>
                  </ul>
                </section>

                <section id="ip">
                  <h2>4. Intellectual Property</h2>
                  <ul>
                    <li><strong>Our Ownership:</strong> All rights to the Site, design, source code, and calculators remain with Calqulate.</li>
                    <li><strong>Your Content/Data:</strong> You own your data but grant us rights to use it solely to deliver services.</li>
                    <li><strong>Deliverables:</strong> Licensing and reuse of non-confidential components may be specified in contracts.</li>
                  </ul>
                </section>

                <section id="conduct">
                  <h2>5. User Conduct & Acceptable Use</h2>
                  <p>You agree not to:</p>
                  <ul>
                    <li>Violate laws or regulations</li>
                    <li>Upload harmful code or viruses</li>
                    <li>Exploit or resell our logic and algorithms unlawfully</li>
                    <li>Use calculators in high-risk scenarios where errors could cause harm</li>
                  </ul>
                </section>

                <section id="privacy">
                  <h2>6. Privacy and Data</h2>
                  <p>
                    We collect minimal data needed to provide services. See our 
                    <a href="/privacy-policy"> Privacy Policy</a> for full details.
                  </p>
                </section>

                <section id="disclaimer">
                  <h2>7. Disclaimers — No Warranty</h2>
                  <ul>
                    <li>No guarantee of 100% accuracy in calculator results</li>
                    <li>Not professional advice in finance, law, medicine, etc.</li>
                    <li>All services are provided “as-is” with no implied warranties</li>
                  </ul>
                </section>

                <section id="liability">
                  <h2>8. Limit on Responsibility</h2>
                  <p>
                    Calqulate is not liable for indirect, incidental, or consequential damages. 
                    Liability is limited to fees paid (if any) in the 12 months before a claim.
                  </p>
                </section>

                <section id="indemnification">
                  <h2>9. Indemnification</h2>
                  <p>
                    You agree to indemnify and hold harmless Calqulate and its team from claims or damages 
                    resulting from violations of these Terms or misuse of the Site.
                  </p>
                </section>

                <section id="changes">
                  <h2>10. Changes to Site and Terms</h2>
                  <p>
                    We may revise these Terms at any time. Updates will be posted here with an updated 
                    "Last updated" date.
                  </p>
                </section>

                <section id="termination">
                  <h2>11. Ending</h2>
                  <p>
                    We may terminate or suspend access at any time. Provisions regarding intellectual property,
                    disclaimers, liability, and indemnification survive termination.
                  </p>
                </section>

                <section id="thirdparty">
                  <h2>12. Third-Party Links and Services</h2>
                  <p>
                    External sites may have their own policies. We are not responsible for third-party content 
                    or practices.
                  </p>
                </section>

                <section id="law">
                  <h2>13. Governing Law & Dispute Resolution</h2>
                  <p>
                    These Terms are governed by applicable local laws. Disputes are resolved in courts of our location, unless otherwise agreed in writing.
                  </p>
                </section>

                <section id="modifications">
                  <h2>14. Product Statement & Calculator Modifications</h2>
                  <p>
                    We may modify calculators or features at any time. Marketing terms like “fast” or “easy” are not guarantees of performance.
                  </p>
                </section>

                <section id="contact">
                  <h2>15. Contact & Notices</h2>
                  <p>
                    For questions or notices, contact us at: <br />
                    Email: <a href="mailto:shreerise@gmail.com">shreerise@gmail.com</a> <br />
                    Contact Form: <a href="/contact-us">Contact Us</a>
                  </p>
                </section>

                <section id="agreement">
                  <h2>16. Complete Agreement</h2>
                  <p>
                    These Terms, along with any written agreements, represent the entire understanding 
                    between you and Calqulate.
                  </p>
                </section>

                <section id="legal">
                  <h2>17. Legal Advice</h2>
                  <p>
                    These Terms are provided as a model. Please seek legal advice to ensure compliance with 
                    local laws, especially regarding payment, intellectual property, and consumer protection.
                  </p>
                </section>

              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
