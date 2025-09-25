import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy - Calqulate",
  description: "Calqulate's privacy policy explaining how we collect, use, and protect your personal information.",
  keywords: "privacy policy, data protection, Calqulate, calculators",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: September 24, 2025</p>
            </div>

            {/* Table of Contents */}
            {/* <Card className="mb-10">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li><a href="#scope">Scope and Acceptance</a></li>
                  <li><a href="#information">Information We Receive</a></li>
                  <li><a href="#use">How We Use Information</a></li>
                  <li><a href="#ads">Ads, Partners & Other Companies</a></li>
                  <li><a href="#sharing">Data Sharing & Disclosure</a></li>
                  <li><a href="#international">International Users</a></li>
                  <li><a href="#rights">Your Rights and Options</a></li>
                  <li><a href="#security">Maintaining and Guarding Information</a></li>
                  <li><a href="#links">Links to Other Websites</a></li>
                  <li><a href="#changes">Changes to This Policy</a></li>
                  <li><a href="#contact">Contact & Data Requests</a></li>
                  <li><a href="#advertise">Advertise With Us</a></li>
                  <li><a href="#values">A Word About Our Values</a></li>
                </ol>
              </CardContent>
            </Card> */}

            {/* Main Content */}
            <Card>
              <CardContent className="prose prose-gray max-w-none p-8 space-y-8">
                <h2 className="text-2xl font-semibold">Introduction</h2>
                <section>
                  <p><strong>Begin date:</strong> 20 September 2025</p>
                  <p><strong>Last updated:</strong> September 24, 2025</p>
                </section>
                <section>
                  <p>
                    Welcome to <strong>Calqulate</strong>. We are a tiny startup founded by two friends and co-founders —
                    <strong> Krushal Patel</strong> and <strong>Meet Patel</strong>. We develop easy-to-use calculators
                    and research tools for people all over the planet. Our services are free, require no login, and are
                    built with research, design, logic, and code — guided by our ethos of helping people.
                  </p>

                  <blockquote className="border-l-4 border-primary pl-4 italic bg-muted/30 py-2 rounded">
                    <p>निष्काम कर्म योग – निःस्वार्थ सेवा का आधार</p>
                    <p>Bhagavad Gita 2.47</p>
                    <p>कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥</p>
                  </blockquote>
                </section>

                <section id="scope">
                  <h2 className="text-2xl font-semibold">1. Scope and Acceptance</h2>
                  <p>
                    By accessing Calqulate (the "Service" at <a href="https://calqulate.net">https://calqulate.net</a>),
                    you agree to the data practices described here. If you do not agree, please discontinue use of the Service.
                  </p>
                  <p>No registration or account is required to use our calculators.</p>
                </section>

                <section id="information">
                  <h2 className="text-2xl font-semibold">2. Information We Receive</h2>
                  <h3>Log Data</h3>
                  <p>We automatically receive technical details like IP address, browser type, pages visited, timestamps, and device type. This helps us run, protect, and improve the Service.</p>

                  <h3>Cookies and Tracking</h3>
                  <p>We use cookies and similar technologies to remember preferences, analyze traffic, and improve functionality. You can manage cookies in your browser settings.</p>

                  <h3>Responses and Submissions</h3>
                  <p>If you contact us (form, email, feedback), we may receive personal details like your name, email, and message. We use this to respond and provide support.</p>

                  <h3>Third-party Data and Ads</h3>
                  <p>Ad partners (like Google Ads) may use cookies or tracking images to show relevant ads. Their privacy policies and opt-out tools apply.</p>
                </section>

                <section id="use">
                  <h2 className="text-2xl font-semibold">3. How We Use Information</h2>
                  <ul>
                    <li>Provide and maintain calculators and services</li>
                    <li>Analyze and improve user experience</li>
                    <li>Prevent fraud, abuse, or security breaches</li>
                    <li>Serve and measure advertising</li>
                    <li>Respond to inquiries and support requests</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section id="ads">
                  <h2 className="text-2xl font-semibold">4. Ads, Partners & Other Companies</h2>
                  <p>
                    We may use Google Ads and other networks that use cookies/web beacons to show targeted ads. To opt out, visit{" "}
                    <a href="https://optout.networkadvertising.org">NAI opt-out</a>.
                  </p>
                </section>

                <section id="sharing">
                  <h2 className="text-2xl font-semibold">5. Data Sharing & Disclosure</h2>
                  <ul>
                    <li>With providers (hosting, analytics, security)</li>
                    <li>With ad partners for serving/measurement</li>
                    <li>When required by law</li>
                    <li>To protect rights, property, or safety</li>
                    <li>During business changes (merger/acquisition)</li>
                  </ul>
                </section>

                <section id="international">
                  <h2 className="text-2xl font-semibold">6. International Users</h2>
                  <p>
                    Data may be processed outside your country. Protections vary by region. EU users have rights under GDPR.
                    For full compliance with GDPR/CCPA, consult a legal professional.
                  </p>
                </section>

                <section id="rights">
                  <h2 className="text-2xl font-semibold">7. Your Rights and Options</h2>
                  <ul>
                    <li>Manage cookies via browser settings</li>
                    <li>Opt out of ad targeting via industry tools</li>
                    <li>Request access, correction, or deletion of personal data</li>
                    <li>Children under 13 cannot use our services</li>
                  </ul>
                </section>

                <section id="security">
                  <h2 className="text-2xl font-semibold">8. Maintaining and Guarding Information</h2>
                  <p>
                    We retain data as long as needed for the Service, analytics, and security. Anonymous/aggregated data
                    may be kept indefinitely. We apply safeguards, but no method is 100% secure.
                  </p>
                </section>

                <section id="links">
                  <h2 className="text-2xl font-semibold">9. Links to Other Websites</h2>
                  <p>
                    Our site may contain links to third-party websites. Their privacy practices are their own, so please
                    review them before sharing personal details.
                  </p>
                </section>

                <section id="changes">
                  <h2 className="text-2xl font-semibold">10. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. Updates will be posted here with a new "Last updated"
                    date. Continued use means acceptance.
                  </p>
                </section>

                <section id="contact">
                  <h2 className="text-2xl font-semibold">11. Contact & Data Requests</h2>
                  <p>
                    Email: <a href="mailto:shreerise@gmail.com">shreerise@gmail.com</a><br />
                    Contact form: <a href="/contact-us">Contact Us</a>
                  </p>
                </section>

                <section id="advertise">
                  <h2 className="text-2xl font-semibold">12. Advertise With Us</h2>
                  <p>
                    We welcome sponsors and advertisers. To advertise on Calqulate, email{" "}
                    <a href="mailto:shreerise@gmail.com">shreerise@gmail.com</a>.
                  </p>
                </section>

                <section id="values">
                  <h2 className="text-2xl font-semibold">13. A Word About Our Values</h2>
                  <p>
                    Calqulate was created by Krushal and Meet, college friends and business partners. They build
                    research-based tools that are simple, useful, and free — guided by the principle of selfless service.
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
