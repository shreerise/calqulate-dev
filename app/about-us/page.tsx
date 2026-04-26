import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import {
  Lightbulb,
  Rocket,
  Zap,
  Handshake,
  TrendingUp,
  FlaskConical,
  Linkedin,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Calqulate.NET",
  description:
    "Learn about Calqulate.NET's mission to provide accurate, user-friendly calculators with clear explanations and real-world usability.",
  keywords:
    "about Calqulate, online calculators, free calculation tools, Meet Akabari, SEO expert, calculator website",
}

const SectionHeader = ({ id, title, icon: Icon }: any) => (
  <h2
    id={id}
    className="flex items-center gap-3 text-2xl font-bold mb-6 pt-8"
  >
    <Icon className="w-8 h-8 text-primary" />
    {title}
  </h2>
)

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                About Us
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We are building Calqulate.net to make calculations simple,
                accurate, and easy to understand for everyone.
              </p>
            </div>

            {/* Our Story */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg mb-10">
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Story</h2>
              <p className="text-lg mb-4">
                Calqulate.net was launched with a simple mission: making
                calculations faster, simpler, and more useful for real users.
              </p>
              <p className="text-lg">
                Instead of forcing users to remember formulas or do manual
                calculations, we provide tools that give accurate results along
                with clear explanations.
              </p>
            </section>

            {/* How We Began */}
            <SectionHeader id="how-we-began" title="How We Began" icon={Lightbulb} />
            <Card className="p-6 mb-10">
              <CardContent className="p-0 text-lg">
                We noticed that many people struggle with everyday calculations —
                whether in health, finance, or daily life. That’s when we decided
                to build a platform that solves real problems with simple tools.
              </CardContent>
            </Card>

            {/* Why Calqulate */}
            <SectionHeader id="why-calqulate" title="Why Calqulate.net?" icon={Rocket} />
            <Card className="p-6 mb-10">
              <CardContent className="p-0 text-lg">
                <ul className="list-disc list-inside space-y-3">
                  <li>Solve real-world problems using simple tools</li>
                  <li>Provide accurate and instant results</li>
                  <li>Help users understand calculations</li>
                  <li>Continuously improve based on user needs</li>
                </ul>
              </CardContent>
            </Card>

            {/* Mission */}
            <SectionHeader id="our-mission" title="Our Mission" icon={Handshake} />
            <Card className="p-6 mb-10">
              <CardContent className="p-0 text-lg">
                Our mission is to provide accurate, easy-to-use calculators that
                save time and remove confusion. We aim to build a platform where
                users can trust every result they see.
              </CardContent>
            </Card>

            {/* Difference */}
            <SectionHeader id="difference" title="How are we different?" icon={FlaskConical} />
            <Card className="p-6 mb-10">
              <CardContent className="p-0 text-lg">
                <ul className="list-disc list-inside space-y-3">
                  <li>Accurate and reliable results</li>
                  <li>Simple and user-friendly interface</li>
                  <li>No signup required</li>
                  <li>Free to use</li>
                  <li>Clear explanations with every tool</li>
                </ul>
              </CardContent>
            </Card>

            {/* Our Approach */}
            <SectionHeader id="approach" title="Our Approach: Beyond Just Calculation" icon={Zap} />
            <Card className="p-6 mb-10">
              <CardContent className="p-0 text-lg">
                <p className="mb-4">
                  Most calculator websites only give numbers.
                </p>

                <p className="mb-4 font-semibold">
                  Users don’t want just a number — they also want to understand the process behind it.
                </p>

                <ul className="list-disc list-inside space-y-3">
                  <li>Step-by-step explanation</li>
                  <li>Real-world meaning of results</li>
                  <li>Focus on accuracy (especially health tools)</li>
                </ul>

              </CardContent>
            </Card>

            {/* Organic Growth */}
            <SectionHeader id="growth" title="Our Organic Growth (Google Search Performance)" icon={TrendingUp} />
            <Card className="p-6 mb-10">
              <CardContent className="p-0 text-lg">

                <img
                  src="/gsc-report.png"
                  alt="Google Search Console performance"
                  className="mb-6 rounded-lg shadow-md"
                />

                <ul className="list-disc list-inside space-y-3">
                  <li><strong>27.5K+ impressions</strong></li>
                  <li><strong>105 clicks</strong></li>
                  <li><strong>0.4% CTR</strong></li>
                  <li><strong>Avg position: 45.7</strong></li>
                </ul>

                <p className="mt-4">
                  This growth is completely organic, driven by users searching for real solutions.
                </p>

              </CardContent>
            </Card>

            {/* Author Section */}
            <Card className="p-6 mb-10">
              <CardContent className="flex items-start md:items-center gap-4">
                <img
                  src="/meet.akabari.jpeg"
                  alt="Meet Akabari"
                  className="w-16 h-16 rounded-full object-cover mt-1 md:mt-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-lg">Meet Akabari</p>
                    <a
                      href="https://www.linkedin.com/in/meet-akabari/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-[#0A66C2] transition-colors"
                      aria-label="Connect with Meet Akabari on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Web Developer & Health enthusiast with a passion for building tools that solve real problems.
                  </p>
                  <p className="text-sm mt-1">
                    Founder of Calqulate.net, focused on building accurate,
                    user-friendly calculators.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>

      {/* Author Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Meet Akabari",
            url: "https://calqulate.net/about-us",
            sameAs: [
              "https://www.linkedin.com/in/meet-akabari/"
            ],
            image: "/meet.akabari.jpeg",
            jobTitle: "Web Developer & health enthusiast",
            worksFor: {
              "@type": "Organization",
              name: "Calqulate.net",
            },
            description:
              "Meet Akabari is a web developer and Health enthusiast building Calqulate.net.",
          }),
        }}
      />

      <Footer />
    </div>
  )
}