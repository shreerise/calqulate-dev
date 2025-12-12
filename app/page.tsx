import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
// import Ads from "@/components/ads/ads"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchBar } from "@/components/search/search-bar"
import { Calculator, Home, DollarSign, Wrench, TrendingUp } from "lucide-react"
import Link from "next/link"
import { title } from "process"

const calculators = [
  {
    title: "ABSI Calculator",
    description: "Calculate your A Body Shape Index based on waist, height, weight, and BMI",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/absi-calculator",
    category: "Health",
  },
  {
    title: "Lean Body Mass Calculator",
    description: "Estimate your lean body mass based on height, weight, and gender",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/lean-body-mass-calculator",
    category: "Health",
  },
  {
    title: "RFM Calculator",
    description: "Calculate your Relative Fat Mass using height and waist measurements",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/rfm-calculator",
    category: "Health",
  },
  {
    title: "Ponderal Index Calculator",
    description: "Measure body leanness with the Ponderal Index formula",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/ponderal-index-calculator",
    category: "Health",
  },
  {
    title: "Adjusted Body Weight Calculator",
    description: "Calculate your adjusted body weight using ideal body weight and actual weight",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/adjusted-body-weight-calculator",
    category: "Health",
  },
  {
    title:" Karvonen Formula Calculator",
    description: "Determine your target heart rate using the Karvonen formula",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/karvonen-formula-calculator",
    category: "Health",
  },
  {
    title:"Body Shape Calculator",
    description: "Classify your body shape based on measurements of bust, waist, and hips",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/body-shape-calculator",
    category: "Health",
  },
  {
    title: "Draw Length Calculator",
    description: "Calculate your ideal archery draw length based on your wingspan measurement",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/draw-length-calculator",
    category: "Health",
  },
  {
    title: "Face Shape Calculator",
    description: "Determine your face shape using measurements of forehead, cheekbones, and jawline",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/face-shape-calculator",
    category: "Health",
  },
  {
    title: "Cholesterol Ratio Calculator",
    description: "Calculate cholesterol ratios using total cholesterol, HDL, LDL, and triglycerides",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/cholesterol-ratio-calculator",
    category: "Health",
  },
  {
    title: "Heart Rate Calculator",
    description: "Estimate your maximum and target heart rates based on age and fitness level",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/heart-rate-calculator",
    category: "Health",
  },
  {
    title: "Creatinine Clearance Calculator",
    description: "Estimate kidney function using the Cockcroft-Gault equation",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/creatinine-clearance-calculator",
    category: "Health",
  },
  {
    title: "Preganancy Weight Gain Calculator",
    description: "Determine recommended weight gain during pregnancy based on pre-pregnancy BMI",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/pregnancy-weight-gain-calculator",
    category: "Health",
  },
  {
    title: "Fat Intake Calculator",
    description: "Calculate your daily fat intake based on total calories and desired fat percentage",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/fat-intake-calculator",
    category: "Health",
  },
]

const categories = [
  {
    name: "Health",
    description: "Measure health and fitness indicators",
    icon: <Calculator className="h-8 w-8" />,
    count: calculators.filter((calc) => calc.category === "Health").length,
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
                Calculate your health metrics instantly with Calqulate.net — your trusted hub for accurate BMI, body fat, calorie, and ideal weight calculators. Stay informed, stay fit, and achieve your goals smarter.
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto ">
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
              <h2 className="text-3xl font-bold mb-4">Why Choose Calqulate ?</h2>
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
