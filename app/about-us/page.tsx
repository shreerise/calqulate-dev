import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Zap,
  Award,
  Link,
  Mail,
  Handshake,
  TrendingUp,
  FlaskConical,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Calqulate.NET",
  description:
    "Learn about Calqulate.NET's mission to make calculations simpler and quicker for everyone, founded by Meet Patel and Krushal Patel.",
  keywords: "about Calqulate, online calculators, free calculation tools, Meet Patel, Krushal Patel",
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

export default function AboutUsPage() {
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
                About Us
              </h1>
              <p
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
                style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, \"Helvetica Neue\", Arial, sans-serif" }}
              >
                We are two college buddies, Meet Patel and Krushal Patel, who transformed our friendship into a business
                cooperation.
              </p>
            </div>

            {/* Introduction */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg w-full max-w-none mb-10">
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Story</h2>
              <div className="prose prose-gray max-w-none text-lg leading-relaxed">
                <p>
                  Calqulate.net was launched jointly by us on 15th September 2025 with a very simple mission: making
                  calculations simpler and quicker for all.
                </p>
                <p>
                  At Calqulate.net, our free calculators enable quick solutions to hard problems. Rather than wasting
                  time grappling to remember tricky formulas or calculating manually, individuals simply input their
                  numbers and receive correct answers instantly. We also provide concise explanations and details about
                  every calculator—so individuals don't get answers alone, they comprehend them as well.
                </p>
              </div>
            </section>

            <SectionHeader id="how-we-began" title="How We Began" icon={Lightbulb} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>
                  When we started out, we didn't have our own office. We'd sit together in coffee shops and throw out
                  big ideas over coffee. We saw how many people struggled with everyday mathematics,—with homework,
                  with work, with everyday life,—and decided to create something that would truly make an impact.
                </p>
              </CardContent>
            </Card>

            <SectionHeader id="why-calqulate" title="Why Calqulate.net?" icon={Rocket} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0">
                <p className="text-lg leading-relaxed mb-4">We began Calqulate.NET to:</p>
                <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed marker:text-primary">
                  <li>With basic tools, solve everyday problems.</li>
                  <li>Benefit users by giving them quick and right answers.</li>
                  <li>Share what we know and learn new things.</li>
                  <li>Network with individuals online and learn their needs.</li>
                  <li>Earn enough to support ourselves and our families and create something worthwhile.</li>
                </ul>
              </CardContent>
            </Card>

            <SectionHeader id="our-mission" title="Our Mission" icon={Handshake} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0 prose prose-gray max-w-none text-lg leading-relaxed">
                <p>
                  Our mission is to assist users by providing them with appropriate answers according to what they
                  require, thus cutting time and facilitating remembrance of difficult formulas. With Calqulate.net, it
                  is simple to get answers, it is dependable, and it is stress-free.
                </p>
                <p>
                  We aim to create one website that will provide all forms of calculators in the future from basic
                  mathematical needs to advanced professional instruments.
                </p>
              </CardContent>
            </Card>

            <SectionHeader id="how-are-we-different" title="How are we different?" icon={FlaskConical} />
            <Card className="rounded-lg p-6 mb-10">
              <CardContent className="p-0">
                <p className="text-lg leading-relaxed mb-4">
                  There are many other calculator sites on the Internet, but this one's unique:
                </p>
                <ul className="list-disc list-inside space-y-3 text-lg leading-relaxed marker:text-primary">
                  <li>99% correct results according to inputs from users.</li>
                  <li>A simple and streamlined installation that saves time.</li>
                  <li>Totally free—no extra fees.</li>
                  <li>No signup required—just calculate and go.</li>
                  <li>
                    Dynamic dashboards with charts, tables, and even 3D icons to make data easy to understand.
                  </li>
                </ul>
                <p className="text-lg leading-relaxed mt-4">
                  For us, calqulate.net is not only one website—it's how we learn together, solve things together, and
                  develop together while helping anyone anywhere.
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
