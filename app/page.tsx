import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
// import Ads from "@/components/ads/ads"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchBar } from "@/components/search/search-bar"
import { Calculator, Home, DollarSign, Wrench, TrendingUp } from "lucide-react"
import Link from "next/link"

const calculators = [
  {
    title: "Tree Removal Cost Calculator",
    description: "Calculate the cost of removing trees from your property",
    icon: <Wrench className="h-6 w-6" />,
    href: "/calculators/tree-removal-cost-calculator",
    category: "Home Improvement",
  },
  {
    title: "Lawn Mowing Cost Calculator",
    description: "Estimate lawn care and mowing service costs",
    icon: <Home className="h-6 w-6" />,
    href: "/calculators/lawn-mowing-cost-calculator",
    category: "Home Improvement",
  },
  {
    title: "Home Addition Cost Calculator",
    description: "Plan your home expansion project budget",
    icon: <Home className="h-6 w-6" />,
    href: "/calculators/home-addition-cost-calculator",
    category: "Home Improvement",
  },
  {
    title: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments and interest",
    icon: <DollarSign className="h-6 w-6" />,
    href: "/calculators/mortgage-calculator",
    category: "Financial",
  },
  {
    title: "Loan Calculator",
    description: "Determine loan payments and total interest",
    icon: <TrendingUp className="h-6 w-6" />,
    href: "/calculators/loan-calculator",
    category: "Financial",
  },
  {
    title: "Investment Calculator",
    description: "Calculate investment returns and growth",
    icon: <TrendingUp className="h-6 w-6" />,
    href: "/calculators/investment-calculator",
    category: "Financial",
  },
]

const categories = [
  {
    name: "Home Improvement",
    description: "Calculate costs for home projects and improvements",
    icon: <Home className="h-8 w-8" />,
    count: calculators.filter((calc) => calc.category === "Home Improvement").length,
  },
  {
    name: "Financial",
    description: "Plan your finances with professional calculators",
    icon: <DollarSign className="h-8 w-8" />,
    count: calculators.filter((calc) => calc.category === "Financial").length,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Banner Ad */}
        <div className="container mx-auto px-4 py-4">
          {/* <Ads.BannerAd /> */}
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
                Professional <span className="text-primary">Calculators</span> for Every Need
              </h1>
              <p className="text-xl text-muted-foreground text-pretty mb-8">
                Get accurate estimates for home improvement projects, financial planning, and more. Trusted by
                homeowners and professionals nationwide.
              </p>

              {/* Hero Search */}
              <div className="relative max-w-md mx-auto mb-8">
                <SearchBar placeholder="Search calculators..." className="h-12 text-lg" />
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="#calculators">Browse Calculators</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about-us">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Calculator Categories</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our comprehensive collection of professional calculators, organized by category for easy
                navigation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {categories.map((category) => (
                <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      <div className="text-primary">{category.icon}</div>
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription className="text-base">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">{category.count} calculators available</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Calculators Grid */}
        <section id="calculators" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Calculators</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Access our most popular and trusted calculators. Each tool provides accurate estimates based on current
                market data and industry standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.map((calculator) => (
                <Card
                  key={calculator.href}
                  className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-2 bg-primary/10 rounded-lg w-fit">
                        <div className="text-primary">{calculator.icon}</div>
                      </div>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">{calculator.category}</span>
                    </div>
                    <CardTitle className="text-lg text-balance">{calculator.title}</CardTitle>
                    <CardDescription className="text-pretty">{calculator.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href={calculator.href}>
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Now
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Calculator Hub?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our calculators are built by experts and trusted by professionals nationwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Calculator className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accurate Results</h3>
                <p className="text-muted-foreground">
                  Based on current market data and industry standards for reliable estimates.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Grade</h3>
                <p className="text-muted-foreground">Used by contractors, homeowners, and financial professionals.</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Always Updated</h3>
                <p className="text-muted-foreground">
                  Regular updates ensure calculations reflect current market conditions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
