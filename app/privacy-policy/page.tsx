import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy - Calculator Hub",
  description: "Calculator Hub's privacy policy explaining how we collect, use, and protect your personal information.",
  keywords: "privacy policy, data protection, calculator hub privacy",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <Card>
              <CardContent className="prose prose-gray max-w-none p-8">
                <h2>Introduction</h2>
                <p>
                  Calculator Hub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you visit our website and
                  use our calculator services.
                </p>

                <h2>Information We Collect</h2>
                <h3>Information You Provide</h3>
                <ul>
                  <li>Contact information when you reach out to us</li>
                  <li>Feedback and suggestions you submit</li>
                  <li>Calculator inputs (processed locally, not stored)</li>
                </ul>

                <h3>Information Automatically Collected</h3>
                <ul>
                  <li>Usage data and analytics</li>
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide and maintain our calculator services</li>
                  <li>Improve user experience and website functionality</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Analyze usage patterns to enhance our services</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2>Information Sharing</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share information:
                </p>
                <ul>
                  <li>With service providers who assist in operating our website</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>

                <h2>Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your information against unauthorized access,
                  alteration, disclosure, or destruction. However, no method of transmission over the internet is 100%
                  secure.
                </p>

                <h2>Cookies and Tracking</h2>
                <p>
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and
                  understand user preferences. You can control cookie settings through your browser preferences.
                </p>

                <h2>Third-Party Services</h2>
                <p>Our website may contain links to third-party websites or integrate with third-party services:</p>
                <ul>
                  <li>Google Analytics for website analytics</li>
                  <li>Advertising partners for relevant ads</li>
                  <li>Social media platforms for sharing features</li>
                </ul>

                <h2>Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of certain data collection practices</li>
                </ul>

                <h2>Children's Privacy</h2>
                <p>
                  Our services are not directed to children under 13. We do not knowingly collect personal information
                  from children under 13. If you believe we have collected such information, please contact us
                  immediately.
                </p>

                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last updated" date.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us through our contact page or
                  email us at privacy@calculatorhub.com.
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
