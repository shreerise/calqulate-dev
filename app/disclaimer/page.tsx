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
} from "lucide-react"

export const metadata: Metadata = {
  title: "Disclaimer - Calqulate.net",
  description:
    "Important disclaimer about Calqulate.net's calculator results, limitations, and terms of use. Last edited: October 2025.",
  keywords: "disclaimer, Calqulate.net, calculator accuracy, terms of use, estimates, professional advice",
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
          <div className="max-w-4xl mx-auto">
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
                Last edited: October 2025
              </p>
            </div>

            {/* Introduction */}
            <section className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-lg w-full max-w-none mb-10">
              <h2 className="text-3xl font-bold mb-4 text-primary">Welcome to Calqulate.net</h2>
              <div className="prose prose-gray max-w-none text-lg leading-relaxed">
                <p>
                  Welcome to Calqulate.net — your home for simple, intelligent, and informative calculators. Whether
                  considering health figures or planning for future computations, here math is made easy for all.
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

            <SectionHeader id="not-professional-advice" title="2. Not Professional Advice" icon={ShieldCheck} />
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

            <SectionHeader id="global-audience" title="3. Notice for Global Audience" icon={LocateFixed} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>
                  They are all over the globe, so some calculators or results may not exactly correspond to local laws,
                  standards, or regulations.
                </p>
                <p>
                  Always verify results and data based on your nation's legitimate regulations prior to putting your
                  confidence in them.
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

            <SectionHeader id="updates-revisions" title="7. Updates and Revis" icon={Edit} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>Calqulate.net is entitled at any time without notice to make changes or updates to this disclaimer.</p>
                <p>We suggest you check this page frequently for updates on any changes.</p>
              </CardContent>
            </Card>

            <SectionHeader id="user-responsibility" title="8. User Responsibility" icon={UserCheck} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>All results must be investigated and verified for compliance with your own needs, or the needs of your workplace.</p>
                <p>It is recommended that results which concern health, finances, or legal matters be double-checked.</p>
              </CardContent>
            </Card>

            <SectionHeader id="get-in-touch" title="9. Get in Touch" icon={Mail} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>Have some questions regarding this disclaimer or our tools?</p>
                <p>We'd love for you to reach out!</p>
                <p>Gmail: <a href="mailto:shreerise@gmail.com" className="text-primary hover:underline">shreerise@gmail.com</a></p>
              </CardContent>
            </Card>

            <SectionHeader id="final-point" title="10. Final point" icon={Megaphone} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>
                  Here at calqulate.net, our mission is simple: reduce stress a little, calculation at a time. We
                  commit to being correct, open, and assisting users. Use our calculators wisely, stay curious, and
                  have data work more intelligently for you.
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