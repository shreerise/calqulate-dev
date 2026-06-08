import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import {
  Cookie,
  Info,
  BarChart3,
  Megaphone,
  Link,
  Edit,
  Mail,
  List,
  Settings,
  ShieldCheck,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy - Calqulate.NET",
  description:
    "Calqulate.net's Cookie Policy explains how we use cookies and similar tracking technologies on our health calculator website, including Google AdSense, Google Analytics, and Microsoft Clarity.",
  keywords: "cookie policy, cookies, Google AdSense, Google Analytics, Microsoft Clarity, Calqulate, tracking",
  alternates: {
    canonical: "https://calqulate.net/cookie-policy",
  },
}

const SectionHeader = ({ id, title, icon: Icon }: { id: string; title: string; icon: React.ElementType }) => (
  <h2
    id={id}
    className="flex items-center gap-3 text-2xl font-bold mb-6 pt-8"
    style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}
  >
    <Icon className="w-8 h-8 text-primary" />
    {title}
  </h2>
)

export default function CookiePolicyPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}
    >
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>
                Cookie Policy
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}>
                Last updated: June 8, 2026
              </p>
            </div>

            <div className="lg:flex lg:gap-10">
              {/* Sidebar - Desktop only */}
              <nav className="hidden lg:block w-56 shrink-0">
                <div className="sticky top-[76px] space-y-1 border-l-2 border-slate-200 pl-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">On this page</p>
                  <a href="#what-are-cookies" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">What Are Cookies</a>
                  <a href="#how-we-use" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">How We Use Cookies</a>
                  <a href="#types" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Types of Cookies</a>
                  <a href="#third-party" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Third-Party Cookies</a>
                  <a href="#choices" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Your Cookie Choices</a>
                  <a href="#updates" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Updates</a>
                  <a href="#contact" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Contact</a>
                </div>
              </nav>

              {/* Content area */}
              <div className="flex-1 min-w-0">
                {/* Mobile TOC pills */}
                <div className="lg:hidden mb-8 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-xs font-bold mb-2 flex items-center gap-2 text-slate-500">
                    <Cookie className="w-3.5 h-3.5" />
                    Jump to Section
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <a href="#what-are-cookies" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">What Are Cookies</a>
                    <a href="#how-we-use" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">How We Use Cookies</a>
                    <a href="#types" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Types of Cookies</a>
                    <a href="#third-party" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Third-Party Cookies</a>
                    <a href="#choices" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Your Cookie Choices</a>
                    <a href="#updates" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Updates</a>
                    <a href="#contact" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Contact</a>
                  </div>
                </div>

                {/* Main Content */}
                <div className="space-y-10">

                  {/* Introduction */}
                  <section className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg w-full max-w-none">
                    <h2 className="text-3xl font-bold mb-4 text-primary">Welcome to Calqulate.net</h2>
                    <div className="prose prose-gray max-w-none text-lg leading-relaxed">
                      <p>
                        This Cookie Policy explains how <strong>Calqulate</strong> ("we", "us", "our") uses cookies and
                        similar tracking technologies on our website. By using Calqulate.net, you agree to the use of
                        cookies as described in this policy.
                      </p>
                      <p>
                        We are a free, research-based health calculator platform. Our services are supported by
                        advertising and analytics, which use cookies to function properly.
                      </p>
                    </div>
                  </section>

                  <SectionHeader id="what-are-cookies" title="1. What Are Cookies" icon={Info} />
                  <Card className="rounded-lg p-6">
                    <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                      <p>
                        Cookies are small text files stored on your device (computer, tablet, or phone) when you visit a
                        website. They help websites remember your preferences, understand how you use the site, and
                        deliver relevant content and ads.
                      </p>
                      <p>
                        Cookies can be "first-party" (set by the website you are visiting) or "third-party" (set by
                        external services we use). They can be "session" cookies (deleted when you close your browser) or
                        "persistent" cookies (remain for a set period).
                      </p>
                    </CardContent>
                  </Card>

                  <SectionHeader id="how-we-use" title="2. How We Use Cookies" icon={Settings} />
                  <Card className="rounded-lg p-6">
                    <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                      <p>We use cookies for the following purposes:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>
                          <strong>Essential Operation</strong> — To ensure our website and calculators function
                          correctly.
                        </li>
                        <li>
                          <strong>Analytics</strong> — To understand how visitors use our site, which pages are most
                          popular, and how we can improve your experience.
                        </li>
                        <li>
                          <strong>Advertising</strong> — To show relevant ads via Google AdSense and measure their
                          performance.
                        </li>
                        <li>
                          <strong>Session Management</strong> — To remember your preferences during a single visit.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <SectionHeader id="types" title="3. Types of Cookies We Use" icon={BarChart3} />
                  <Card className="rounded-lg p-6">
                    <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                      <h3 className="text-xl font-semibold mt-4 mb-2">3.1 Essential Cookies</h3>
                      <p>
                        These cookies are necessary for the website to function. They enable basic features like page
                        navigation and access to secure areas. The website cannot function properly without these
                        cookies.
                      </p>

                      <h3 className="text-xl font-semibold mt-6 mb-2">3.2 Analytics Cookies</h3>
                      <p>We use the following analytics services:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>
                          <strong>Google Analytics</strong> — Collects anonymized data about page views, session
                          duration, and user behavior. This helps us improve our calculators and content.
                        </li>
                        <li>
                          <strong>Microsoft Clarity</strong> — Provides heatmaps, session recordings, and user
                          interaction insights. This helps us identify usability issues and optimize the user
                          experience.
                        </li>
                      </ul>

                      <h3 className="text-xl font-semibold mt-6 mb-2">3.3 Advertising Cookies</h3>
                      <p>We use the following advertising service:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>
                          <strong>Google AdSense</strong> — Uses cookies to serve personalized ads based on your
                          browsing history and interests. AdSense may use the DoubleClick cookie to serve relevant
                          ads and measure ad performance.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <SectionHeader id="third-party" title="4. Third-Party Cookies" icon={Link} />
                  <Card className="rounded-lg p-6">
                    <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                      <p>
                        Some cookies on Calqulate.net are placed by trusted third-party services. These third parties
                        have their own privacy and cookie policies:
                      </p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>
                          <strong>Google (AdSense & Analytics)</strong> —{" "}
                          <a href="https://policies.google.com/technologies/cookies" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            Google's Cookie Policy
                          </a>
                        </li>
                        <li>
                          <strong>Microsoft (Clarity)</strong> —{" "}
                          <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/cookie-list" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            Microsoft's Cookie Policy
                          </a>
                        </li>
                        <li>
                          <strong>Google AdSense</strong> —{" "}
                          <a href="https://support.google.com/adsense/answer/7549925" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            AdSense Cookie Usage
                          </a>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <SectionHeader id="choices" title="5. Your Cookie Choices" icon={ShieldCheck} />
                  <Card className="rounded-lg p-6">
                    <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                      <p>You have several options to manage or disable cookies:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>
                          <strong>Browser Settings</strong> — Most browsers allow you to block or delete cookies.
                          Check your browser's help menu for instructions.
                        </li>
                        <li>
                          <strong>Google Ad Settings</strong> — You can opt out of personalized ads at{" "}
                          <a href="https://adssettings.google.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            adssettings.google.com
                          </a>.
                        </li>
                        <li>
                          <strong>Google Analytics Opt-Out</strong> — Install the{" "}
                          <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            Google Analytics Opt-Out Browser Add-on
                          </a>.
                        </li>
                        <li>
                          <strong>Your Online Choices</strong> — Visit{" "}
                          <a href="https://www.youronlinechoices.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            youronlinechoices.com
                          </a> to manage interest-based advertising preferences.
                        </li>
                      </ul>
                      <p className="mt-4">
                        Please note that blocking certain cookies may affect the functionality of our site and some
                        features may not work as intended.
                      </p>
                    </CardContent>
                  </Card>

                  <SectionHeader id="updates" title="6. Updates to This Cookie Policy" icon={Edit} />
                  <Card className="rounded-lg p-6">
                    <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                      <p>
                        We may update this Cookie Policy from time to time to reflect changes in our practices or for
                        legal, operational, or regulatory reasons. We encourage you to review this page periodically.
                      </p>
                      <p>
                        If we make material changes, we will update the "Last updated" date at the top of this page.
                      </p>
                    </CardContent>
                  </Card>

                  <SectionHeader id="contact" title="7. Contact Us" icon={Mail} />
                  <Card className="rounded-lg p-6">
                    <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                      <p>If you have any questions about our use of cookies, please contact us:</p>
                      <p>
                        Email: <a href="mailto:krushal.barasiya@calqulate.net" className="text-primary hover:underline">krushal.barasiya@calqulate.net</a>
                      </p>
                      <p>
                        Contact Form: <a href="/contact-us" className="text-primary hover:underline">Contact Us</a>
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
  )
}
