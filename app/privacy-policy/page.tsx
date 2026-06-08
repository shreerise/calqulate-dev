import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  ClipboardList,
  Info,
  Rocket,
  Cookie,
  Mail,
  Share2,
  Globe,
  Gavel,
  Lock,
  Link,
  Edit,
  Handshake,
  Lightbulb,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - Calqulate.NET",
  description:
    "Calqulate.net's privacy policy explains how we collect, use, and protect your personal information when using our free health calculators and services.",
  keywords: "privacy policy, data protection, Calqulate, calculators, GDPR, CCPA",
  alternates: {
    canonical: "https://calqulate.net/privacy-policy",
  },
};

const SectionHeader = ({ id, title, icon: Icon }: { id: string; title: string; icon: React.ElementType }) => (
  <h2 id={id} className="flex items-center gap-3 text-2xl font-bold mb-6 pt-8" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>
    <Icon className="w-8 h-8 text-primary" />
    {title}
  </h2>
);

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-left" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>Privacy Policy</h1>
              <p className="text-muted-foreground text-left text-lg" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>Last updated: June 8, 2026</p>
            </div>

            <div className="lg:flex lg:gap-10">
              {/* Sidebar - Desktop only */}
              <nav className="hidden lg:block w-56 shrink-0">
                <div className="sticky top-[76px] space-y-1 border-l-2 border-slate-200 pl-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">On this page</p>
                  <a href="#scope" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Scope</a>
                  <a href="#information" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Information We Receive</a>
                  <a href="#use" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">How We Use Info</a>
                  <a href="#ads" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Ads & Partners</a>
                  <a href="#sharing" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Data Sharing</a>
                  <a href="#international" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">International</a>
                  <a href="#rights" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Your Rights</a>
                  <a href="#security" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Security</a>
                  <a href="#links" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">External Links</a>
                  <a href="#changes" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Changes</a>
                  <a href="#contact" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Contact</a>
                  <a href="#advertise" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Advertise</a>
                  <a href="#values" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Our Values</a>
                </div>
              </nav>

              {/* Content area */}
              <div className="flex-1 min-w-0">
                {/* Mobile TOC pills */}
                <div className="lg:hidden mb-8 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-xs font-bold mb-2 flex items-center gap-2 text-slate-500">
                    <ClipboardList className="w-3.5 h-3.5" />
                    Jump to Section
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <a href="#scope" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Scope</a>
                    <a href="#information" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Information We Receive</a>
                    <a href="#use" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">How We Use Info</a>
                    <a href="#ads" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Ads & Partners</a>
                    <a href="#sharing" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Data Sharing</a>
                    <a href="#international" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">International</a>
                    <a href="#rights" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Your Rights</a>
                    <a href="#security" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Security</a>
                    <a href="#links" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">External Links</a>
                    <a href="#changes" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Changes</a>
                    <a href="#contact" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Contact</a>
                    <a href="#advertise" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Advertise</a>
                    <a href="#values" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Our Values</a>
                  </div>
                </div>

                {/* Main Content */}
                <div className="space-y-10">
              <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg w-full max-w-none">
                <h2 className="text-3xl font-bold mb-4 text-primary">
                  Introduction
                </h2>

                <div>
                  <p className="text-lg mb-2"><strong>Begin date:</strong> September 20, 2025</p>
                  <p className="text-lg mb-4"><strong>Last updated:</strong> June 8, 2026</p>
                  
                  <p className="text-lg leading-relaxed max-w-none">
                    Welcome to <strong>Calqulate</strong>. We are a tiny startup founded by two friends and co-founders — 
                    <strong> Krushal Patel</strong> and <strong>Meet Patel</strong>. We develop easy-to-use calculators 
                    and research tools for people all over the planet. Our services are free, require no login, and are built 
                    with research, design, logic, and code — guided by our ethos of helping people.
                  </p>
                </div>

                <blockquote className="border-l-4 border-primary pl-4 italic bg-muted/30 py-3 mt-6 rounded text-gray-700 w-full">
                  <p className="text-lg">निष्काम कर्म योग – निःस्वार्थ सेवा का आधार</p>
                  <p className="font-semibold text-primary">Bhagavad Gita 2.47</p>
                  <p className="text-lg">
                    कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />
                    मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
                  </p>
                </blockquote>
              </section>

              <SectionHeader id="scope" title="1. Scope and Acceptance" icon={ShieldCheck} />
              <Card className="border-l-4 border-primary rounded-lg p-6">
                <CardContent className="p-0">
                  <p className="mb-4 text-lg leading-relaxed">
                    By accessing Calqulate (the "Service" at <a href="https://calqulate.net" className="text-primary hover:underline">https://calqulate.net</a>),
                    you agree to the data practices described here. If you do not agree, please discontinue use of the Service.
                  </p>
                  <p className="text-lg leading-relaxed">No registration or account is required to use our calculators.</p>
                </CardContent>
              </Card>

              <SectionHeader id="information" title="2. Information We Receive" icon={Info} />
              <Card className="rounded-lg p-6">
                <CardContent className="p-0 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>
                      <ClipboardList className="w-6 h-6 text-blue-500" /> Log Data
                    </h3>
                    <p className="text-lg leading-relaxed">We automatically receive technical details like IP address, browser type, pages visited, timestamps, and device type. This helps us run, protect, and improve the Service.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>
                      <Cookie className="w-6 h-6 text-green-500" /> Cookies and Tracking
                    </h3>
                    <p className="text-lg leading-relaxed">We use cookies and similar technologies to remember preferences, analyze traffic, and improve functionality. You can manage cookies in your browser settings.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>
                      <Mail className="w-6 h-6 text-purple-500" /> Responses and Submissions
                    </h3>
                    <p className="text-lg leading-relaxed">If you contact us (form, email, feedback), we may receive personal details like your name, email, and message. We use this to respond and provide support.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>
                      <Rocket className="w-6 h-6 text-red-500" /> Third-party Data and Ads
                    </h3>
                    <p className="text-lg leading-relaxed">Ad partners (like Google Ads) may use cookies or tracking images to show relevant ads. Their privacy policies and opt-out tools apply.</p>
                  </div>
                </CardContent>
              </Card>

              <SectionHeader id="use" title="3. How We Use Information" icon={Lightbulb} />
              <Card className="rounded-lg p-6">
                <CardContent className="p-0">
                  <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed marker:text-primary">
                    <li>Provide and maintain calculators and services</li>
                    <li>Analyze and improve user experience</li>
                    <li>Prevent fraud, abuse, or security breaches</li>
                    <li>Serve and measure advertising</li>
                    <li>Respond to inquiries and support requests</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </CardContent>
              </Card>

              <SectionHeader id="ads" title="4. Ads, Partners & Other Companies" icon={Handshake} />
              <Card className="rounded-lg p-6">
                <CardContent className="p-0">
                  <p className="text-lg leading-relaxed">
                    We may use Google Ads and other networks that use cookies/web beacons to show targeted ads. To opt out, visit{" "}
                    <a href="https://optout.networkadvertising.org" className="text-primary hover:underline">NAI opt-out</a>.
                  </p>
                </CardContent>
              </Card>

              <SectionHeader id="sharing" title="5. Data Sharing & Disclosure" icon={Share2} />
              <Card className="rounded-lg p-6">
                <CardContent className="p-0">
                  <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed marker:text-primary">
                    <li>With providers (hosting, analytics, security)</li>
                    <li>With ad partners for serving/measurement</li>
                    <li>When required by law</li>
                    <li>To protect rights, property, or safety</li>
                    <li>During business changes (merger/acquisition)</li>
                  </ul>
                </CardContent>
              </Card>

              <SectionHeader id="international" title="6. International Users" icon={Globe} />
              <Card className="rounded-lg p-6">
                <CardContent className="p-0">
                  <p className="text-lg leading-relaxed">
                    Data may be processed outside your country. Protections vary by region. EU users have rights under GDPR.
                    For full compliance with GDPR/CCPA, consult a legal professional.
                  </p>
                </CardContent>
              </Card>

              <SectionHeader id="rights" title="7. Your Rights and Options" icon={Gavel} />
              <Card className="rounded-lg p-6">
                <CardContent className="p-0">
                  <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed marker:text-primary">
                    <li>Manage cookies via browser settings</li>
                    <li>Opt out of ad targeting via industry tools</li>
                    <li>Request access, correction, or deletion of personal data</li>
                    <li>Children under 13 cannot use our services</li>
                  </ul>
                </CardContent>
              </Card>

              <SectionHeader id="security" title="8. Maintaining and Guarding Information" icon={Lock} />
              <Card className="rounded-lg p-6">
                <CardContent className="p-0">
                  <p className="text-lg leading-relaxed">
                    We retain data as long as needed for the Service, analytics, and security. Anonymous/aggregated data
                    may be kept indefinitely. We apply safeguards, but no method is 100% secure.
                  </p>
                </CardContent>
              </Card>

              <SectionHeader id="links" title="9. Links to Other Websites" icon={Link} />
              <Card className="rounded-lg p-6">
                <CardContent className="p-0">
                  <p className="text-lg leading-relaxed">
                    Our site may contain links to third-party websites. Their privacy practices are their own, so please
                    review them before sharing personal details.
                  </p>
                </CardContent>
              </Card>

              <SectionHeader id="changes" title="10. Changes to This Policy" icon={Edit} />
              <Card className="rounded-lg p-6">
                <CardContent className="p-0">
                  <p className="text-lg leading-relaxed">
                    We may update this Privacy Policy from time to time. Updates will be posted here with a new "Last updated"
                    date. Continued use means acceptance.
                  </p>
                </CardContent>
              </Card>

              <SectionHeader id="contact" title="11. Contact & Data Requests" icon={Mail} />
              <Card className="rounded-lg p-6">
                <CardContent className="p-0">
                  <p className="text-lg leading-relaxed">
                    Email: <a href="mailto:krushal.barasiya@calqulate.net" className="text-primary hover:underline">krushal.barasiya@calqulate.net</a><br />
                    Contact form: <a href="/contact-us" className="text-primary hover:underline">Contact Us</a>
                  </p>
                </CardContent>
              </Card>

              <SectionHeader id="advertise" title="12. Advertise With Us" icon={Rocket} />
              <Card className="rounded-lg p-6">
                <CardContent className="p-0">
                  <p className="text-lg leading-relaxed">
                    We welcome sponsors and advertisers. To advertise on Calqulate, email{" "}
                    <a href="mailto:krushal.barasiya@calqulate.net" className="text-primary hover:underline">krushal.barasiya@calqulate.net</a>.
                  </p>
                </CardContent>
              </Card>

              <SectionHeader id="values" title="13. A Word About Our Values" icon={Handshake} />
              <Card className="rounded-lg p-6">
                <CardContent className="p-0">
                  <p className="text-lg leading-relaxed">
                    Calqulate was created by Krushal and Meet, college friends and business partners. They build
                    research-based tools that are simple, useful, and free — guided by the principle of selfless service.
                  </p>
                </CardContent>
              </Card>
            </div>
            </div>
          </div>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
