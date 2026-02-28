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
  {
    title: "Mean Arterial Pressure Calculator",
    description: "Calculate your mean arterial pressure using systolic and diastolic blood pressure readings",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/mean-arterial-pressure-calculator",
    category: "Health",
  },
  {
    title: "Framingham Risk Score Calculator",
    description: "Estimate 10-year cardiovascular risk using the Framingham Risk Score model",
    icon: <Calculator className="h-6 w-6" />, 
    href: "/health/framingham-risk-score-calculator",
    category: "Health",
  },
  {
    title: "Pulse Pressure Calculator",
    description: "Determine your pulse pressure using systolic and diastolic blood pressure values",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/pulse-pressure-calculator",
    category: "Health",
  },
  {
    title: "ASVCD Risk Calculator",
    description: "Estimate 10-year risk for atherosclerotic cardiovascular disease using the ASCVD Risk Estimator",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/ascvd-risk-calculator",
    category: "Health",
  },
  {
    title: "Qrisk3 Calculator",
    description: "Estimate 10-year cardiovascular risk using the Qrisk3 model",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/qrisk3-calculator",
    category: "Health",
  },
  {
    title: "TDEE Calculator",
    description: "Calculate your Total Daily Energy Expenditure (TDEE) and recommended macros",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/tdee-calculator",
    category: "Health",
  },
  {
    title: "Macro Calculator",
    description: "Determine your ideal macronutrient breakdown based on fitness goals",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/macro-calculator",
    category: "Health",
  },
  {
    title: "One-Rep Max Calculator",
    description: "Estimate your one-rep max for various strength training exercises",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/one-rep-max-calculator",
    category: "Health",
  },
  {
    title: "VO2 Max Calculator",
    description: "Estimate your VO2 max based on exercise performance and heart rate data",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/vo2-max-calculator",
    category: "Health",
  },
  {
    title: "Willks Calculator",
    description: "Calculate your Wilks Score for powerlifting performance comparison",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/wilks-calculator",
    category: "Health",
  },
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index (BMI) to assess if you are underweight, normal weight, overweight, or obese",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/bmi-calculator",
    category: "Health",
  },
  {
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, and days based on your date of birth",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/age-calculator",
    category: "Health",
  },
  {
    title: "Waist-to-Height Ratio Calculator",
    description: "Calculate your waist-to-height ratio to assess health risk based on waist circumference and height",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/waist-to-height-ratio-calculator",
    category: "Health",
  },
  {
    title: "Ideal Body Weight Calculator",
    description: "Calculate your ideal body weight using multiple medical formulas for accurate health insights",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/ideal-body-weight-calculator",
    category: "Health",
  },
  {
    title: "Body Fat Percentage Calculator",
    description: "Calculate your body fat percentage using the U.S. Navy method for accurate body composition analysis",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/body-fat-calculator",
    category: "Health",
  },
  {
    title: "Blood Pressure Calculator",
    description: "Calculate your blood pressure category and health insights",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/blood-pressure-calculator",
    category: "Health",
  },
  {
    title: "Resting Heart Rate Calculator",
    description: "Calculate your resting heart rate and assess your cardiovascular health",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/resting-heart-rate-calculator",
    category: "Health",
  },
  {
    title: "Heart Age Calculator",
    description: "Calculate your heart age based on cardiovascular risk factors and health metrics",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/heart-age-calculator",
    category: "Health",
  },
  {
    title: "Diabetes Risk Calculator",
    description: "Calculate your risk of developing Type 2 Diabetes using clinical guidelines",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/diabetes-risk-calculator",
    category: "Health",
  },
  {
    title: "Estimated Average Glucose (eAG) Calculator",
    description: "Convert your A1C percentage to Estimated Average Glucose (eAG) in mg/dL or mmol/L",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/estimated-average-glucose-calculator",
    category: "Health",
  },
  {
    title: "Daily Water Intake Calculator",
    description: "Calculate your recommended daily water intake based on weight, activity level, and climate",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/daily-water-intake-calculator",
    category: "Health",
  },
  {
    title: "Calorie Deficit Calculator",
    description: "Calculate your daily calorie deficit for sustainable weight loss",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/calorie-deficit-calculator",
    category: "Health",
  },
  {
    title: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate (BMR) to understand your body's energy needs at rest",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/bmr-calculator",
    category: "Health",
  },
  {
    title: "Obesity Risk Calculator",
    description: "Calculate your risk of obesity-related health issues based on BMI and other factors",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/obesity-risk-calculator",
    category: "Health",
  },
  {
    title: "Stress Level Calculator",
    description: "Calculate your stress level based on lifestyle factors and health indicators",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/stress-level-calculator",
    category: "Health",
  },
  {
    title: "Breast Cancer Risk Calculator",
    description: "Calculate your risk of developing breast cancer using the Gail Model",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/breast-cancer-risk-calculator",
    category: "Health",
  },
  {
    title: "Sleep Cycle Calculator",
    description: "Calculate your optimal sleep and wake times based on sleep cycles",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/sleep-cycle-calculator",
    category: "Health",
  },
  {
    title: "Sleep Debt Calculator",
    description: "Calculate your accumulated sleep debt based on sleep duration and needs",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/sleep-debt-calculator",
    category: "Health",
  },
  {
    title: "Calories Burned Calculator",
    description: "Calculate calories burned during various activities based on MET values",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/calories-burned-calculator",
    category: "Health",
  },
  {
    title: "Running Pace Calculator",
    description: "Calculate your running pace based on distance and time",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/running-pace-calculator",
    category: "Health",
  },
  {
    title: "Period Cycle Calculator",
    description: "Calculate your menstrual cycle and predict ovulation days",
    icon: <Calculator className="h-6 w-6" />,
    href: "/health/period-cycle-calculator",
    category: "Health",
  }
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
