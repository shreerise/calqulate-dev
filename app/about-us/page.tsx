import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Users, Award, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Professional Calculator Tools | Calculator Hub",
  description:
    "Learn about Calculator Hub's mission to provide accurate, professional-grade calculators for home improvement and financial planning.",
  keywords: "about calculator hub, professional calculators, home improvement tools, financial calculators",
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">About Calculator Hub</h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
                We're dedicated to providing accurate, professional-grade calculators that help homeowners, contractors,
                and financial professionals make informed decisions.
              </p>
            </div>

            {/* Mission Section */}
            <Card className="mb-12">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-lg text-center text-muted-foreground">
                  To democratize access to professional-grade calculation tools, empowering individuals and businesses
                  to make data-driven decisions with confidence and accuracy.
                </p>
              </CardContent>
            </Card>

            {/* Values Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Calculator className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our calculators are built using industry standards and current market data for reliable results.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Professional tools should be available to everyone, not just industry experts.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Every calculator is thoroughly tested and validated by industry professionals.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We continuously improve our tools based on user feedback and industry developments.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Story Section */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Story</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Calculator Hub was founded with a simple observation: professional-grade calculation tools were often
                  locked behind expensive software or required specialized knowledge to use effectively. We believed
                  that accurate, reliable calculators should be accessible to everyone.
                </p>
                <p>
                  Starting with home improvement calculators, we quickly realized the need extended far beyond
                  construction costs. Homeowners needed reliable estimates for landscaping, contractors required quick
                  project budgeting tools, and individuals sought trustworthy financial planning calculators.
                </p>
                <p>
                  Today, Calculator Hub serves thousands of users monthly, from DIY homeowners planning their next
                  project to professional contractors estimating job costs. Our calculators are trusted by individuals
                  and businesses across the country for their accuracy and ease of use.
                </p>
              </CardContent>
            </Card>

            {/* Team Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Commitment</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We're committed to maintaining the highest standards of accuracy and usability in all our calculators.
                  Our team regularly reviews and updates our algorithms to reflect current market conditions, industry
                  standards, and user feedback.
                </p>
                <p>
                  Whether you're a homeowner planning a renovation, a contractor bidding on projects, or someone making
                  important financial decisions, you can trust Calculator Hub to provide the accurate, reliable tools
                  you need.
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
