import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertTriangle,
  Info,
  ShieldCheck,
  Megaphone,
  LocateFixed,
  Lightbulb,
  Scale,
  Link,
  Edit,
  UserCheck,
  Mail,
  Zap,
  List,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Disclaimer - Calqulate.net",
  description:
    "Calqulate.net's disclaimer: Our health calculators provide estimates for informational purposes only and do not replace professional medical advice. Read our full terms.",
  keywords: "disclaimer, Calqulate.net, calculator accuracy, terms of use, estimates, professional advice, health calculator disclaimer",
  alternates: {
    canonical: "https://calqulate.net/disclaimer",
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

export default function DisclaimerPage() {
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
              <h1
                className="text-4xl md:text-5xl font-bold mb-3"
                style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}
              >
                Disclaimer
              </h1>
              <p
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
                style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}
              >
                Last updated: June 8, 2026
              </p>
            </div>

            <div className="lg:flex lg:gap-10">
              {/* Sidebar - Desktop only */}
              <nav className="hidden lg:block w-56 shrink-0">
                <div className="sticky top-[76px] space-y-1 border-l-2 border-slate-200 pl-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">On this page</p>
                  <a href="#general-information" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">General Info</a>
                  <a href="#not-professional-advice" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Not Professional Advice</a>
                  <a href="#global-audience" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">International Users</a>
                  <a href="#accuracy-limitations" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Accuracy</a>
                  <a href="#limitation-of-liability" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Liability</a>
                  <a href="#outer-links" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">External Links</a>
                  <a href="#updates-revisions" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Updates</a>
                  <a href="#user-responsibility" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">User Responsibility</a>
                  <a href="#get-in-touch" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Contact</a>
                  <a href="#final-point" className="block text-sm text-slate-600 hover:text-emerald-700 transition-colors py-1">Our Commitment</a>
                </div>
              </nav>

              {/* Content area */}
              <div className="flex-1 min-w-0">
                {/* Mobile TOC pills */}
                <div className="lg:hidden mb-8 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-xs font-bold mb-2 flex items-center gap-2 text-slate-500">
                    <List className="w-3.5 h-3.5" />
                    Jump to Section
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <a href="#general-information" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">General Info</a>
                    <a href="#not-professional-advice" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Not Professional Advice</a>
                    <a href="#global-audience" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">International Users</a>
                    <a href="#accuracy-limitations" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Accuracy</a>
                    <a href="#limitation-of-liability" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Liability</a>
                    <a href="#outer-links" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">External Links</a>
                    <a href="#updates-revisions" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Updates</a>
                    <a href="#user-responsibility" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">User Responsibility</a>
                    <a href="#get-in-touch" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Contact</a>
                    <a href="#final-point" className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-200 rounded-md text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">Our Commitment</a>
                  </div>
                </div>

                {/* Introduction */}
                <section className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-lg w-full max-w-none mb-10">
              <h2 className="text-3xl font-bold mb-4 text-primary">Welcome to Calqulate.net</h2>
              <div className="prose prose-gray max-w-none text-lg leading-relaxed">
                <p>
                  Welcome to Calqulate.net — your home for simple, intelligent, and informative health calculators.
                </p>
                <p>
                  Please read this disclaimer carefully before using our tools. As you continue looking at or using our
                  calculators, you automatically accept the terms provided below.
                </p>
              </div>
            </section>

            <SectionHeader id="general-information" title="1. This information is general only." icon={Info} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>All the calculators and tools on Calqulate.net are meant for information and education only.</p>
                <p>
                  We aim for correct, accurate, and easy-to-use calculations — but note our results are estimates, not
                  a sure thing.
                </p>
                <p>
                  Always consult on your own or with a qualified expert prior to using our tools for any health,
                  financial, or life decisions.
                </p>
              </CardContent>
            </Card>

            <SectionHeader id="not-professional-advice" title="2. Not a Substitute for Professional Advice" icon={ShieldCheck} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>The calqulate.net does not make medical, financial, legal, or professional recommendations.</p>
                <p>
                  They are not a substitute for medical diagnostics or therapy, for example, our health calculators. If
                  you have questions or concerns about your health or personal situation, consult a licensed
                  professional.
                </p>
                <p>Consider our tools approachable guides, rather than accredited advisors.</p>
              </CardContent>
            </Card>

            <SectionHeader id="global-audience" title="3. International Users" icon={LocateFixed} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>
                  Our users are located worldwide, so some calculators or results may not align with local laws,
                  standards, or regulations.
                </p>
                <p>
                  Always verify results against your country's official guidelines before relying on them for decisions.
                </p>
              </CardContent>
            </Card>

            <SectionHeader id="accuracy-limitations" title="4. Accuracy & Limitations" icon={Zap} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>
                  We regularly refresh our calculators for greater precision, but errors, mechanical faults, or
                  out-of-date information may occur on occasion.
                </p>
                <p>
                  Calqulate.net does not guarantee that information, results, materials, or other items on the site are
                  complete, reliable, or suitable.
                </p>
                <p>Your decision to make any calculator usage is entirely your own risk.</p>
              </CardContent>
            </Card>

            <SectionHeader id="limitation-of-liability" title="5. Limitation of Liability" icon={Scale} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>
                  Calqulate.net, its affiliates, and owners won't be held responsible for any direct, indirect, or
                  consequential losses that happen when our tools, information, or site materials are being used.
                </p>
                <p>
                  Your usage of our website constitutes your acknowledgment that we won't be liable for what you do on
                  the basis of calculator output.
                </p>
              </CardContent>
            </Card>

            <SectionHeader id="outer-links" title="6. Disclaimer for Outer Links" icon={Link} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>Our site might contain links to other third parties' sites or tools.</p>
                <p>We incorporate them for you, but do not endorse or guarantee their sites, content, or privacy policies.</p>
                <p>Check their policies first when using any other sites.</p>
              </CardContent>
            </Card>

            <SectionHeader id="updates-revisions" title="7. Updates & Revisions" icon={Edit} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>Calqulate.net may update this disclaimer at any time without prior notice.</p>
                <p>We recommend checking this page periodically for any changes.</p>
              </CardContent>
            </Card>

            <SectionHeader id="user-responsibility" title="8. User Responsibility" icon={UserCheck} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>All results must be investigated and verified for compliance with your own needs, or the needs of your workplace.</p>
                <p>It is recommended that results which concern health, finances, or legal matters be double-checked.</p>
              </CardContent>
            </Card>

            <SectionHeader id="get-in-touch" title="9. Contact Us" icon={Mail} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>Have questions about this disclaimer or our tools?</p>
                <p>We'd love to hear from you:</p>
                <p>Email: <a href="mailto:krushal.barasiya@calqulate.net" className="text-primary hover:underline">krushal.barasiya@calqulate.net</a></p>
              </CardContent>
            </Card>

            <SectionHeader id="final-point" title="10. Our Commitment" icon={Megaphone} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>
                  At Calqulate.net, our mission is to make health information more accessible — one calculation at a time.
                  We are committed to accuracy, transparency, and helping you make informed decisions. Use our tools
                  wisely and always consult a professional for medical advice.
                </p>
              </CardContent>
            </Card>
          </div>
          </div>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}