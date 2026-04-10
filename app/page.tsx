import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchBar } from "@/components/search/search-bar"
import {
  Calculator,
  Wrench,
  TrendingUp,
  Heart,
  Activity,
  Scale,
  Brain,
  Zap,
  Shield,
  Star,
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

// ─── Calculator Data ────────────────────────────────────────────────────────

const calculators = [
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index to assess if you're underweight, healthy, overweight, or obese — and get personalized next steps.",
    icon: <Scale className="h-5 w-5" />,
    href: "/health/bmi-calculator",
    category: "Body Composition",
    badge: "Most Popular",
  },
  {
    title: "Body Shape Calculator",
    description: "Discover your unique body shape — apple, pear, hourglass, or rectangle — and get tailored fitness and styling recommendations.",
    icon: <Activity className="h-5 w-5" />,
    href: "/health/body-shape-calculator",
    category: "Body Composition",
    badge: "Trending",
  },
  {
    title: "Face Shape Detector",
    description: "Identify your face shape using precise measurements and unlock personalized hairstyle, glasses, and makeup guidance.",
    icon: <Sparkles className="h-5 w-5" />,
    href: "/health/face-shape-calculator",
    category: "Appearance",
    badge: "Trending",
  },
  {
    title: "Body Fat Percentage Calculator",
    description: "Measure your body composition with the U.S. Navy method — go beyond weight and understand what's actually inside.",
    icon: <Calculator className="h-5 w-5" />,
    href: "/health/body-fat-calculator",
    category: "Body Composition",
    badge: null,
  },
  {
    title: "TDEE Calculator",
    description: "Calculate your Total Daily Energy Expenditure and get a precise calorie target matched to your actual activity level.",
    icon: <Zap className="h-5 w-5" />,
    href: "/health/tdee-calculator",
    category: "Nutrition",
    badge: null,
  },
  {
    title: "Ideal Body Weight Calculator",
    description: "Find your ideal weight using multiple clinical formulas — Devine, Hamwi, Robinson — so you know exactly what to aim for.",
    icon: <TrendingUp className="h-5 w-5" />,
    href: "/health/ideal-body-weight-calculator",
    category: "Body Composition",
    badge: null,
  },
  {
    title: "Heart Rate Calculator",
    description: "Estimate your max and target heart rate zones so every workout is in the right intensity range for your fitness goal.",
    icon: <Heart className="h-5 w-5" />,
    href: "/health/heart-rate-calculator",
    category: "Cardio Health",
    badge: null,
  },
  {
    title: "Calorie Deficit Calculator",
    description: "Find the precise calorie deficit needed for your weight loss timeline — no guesswork, just a clear, sustainable plan.",
    icon: <Calculator className="h-5 w-5" />,
    href: "/health/calorie-deficit-calculator",
    category: "Nutrition",
    badge: null,
  },
  {
    title: "Sleep Cycle Calculator",
    description: "Calculate optimal bedtime and wake-up times based on your sleep cycles so you wake up refreshed — not groggy.",
    icon: <Brain className="h-5 w-5" />,
    href: "/health/sleep-cycle-calculator",
    category: "Mental Wellness",
    badge: null,
  },
  {
    title: "Blood Pressure Calculator",
    description: "Understand your blood pressure readings with clinical categories and actionable guidance on what to do next.",
    icon: <Activity className="h-5 w-5" />,
    href: "/health/blood-pressure-calculator",
    category: "Cardio Health",
    badge: null,
  },
  {
    title: "Macro Calculator",
    description: "Determine your ideal protein, carb, and fat breakdown tailored to your body, goals, and preferred eating style.",
    icon: <Zap className="h-5 w-5" />,
    href: "/health/macro-calculator",
    category: "Nutrition",
    badge: null,
  },
  {
    title: "Diabetes Risk Calculator",
    description: "Assess your risk of developing Type 2 Diabetes using clinical guidelines and understand which factors to address first.",
    icon: <Shield className="h-5 w-5" />,
    href: "/health/diabetes-risk-calculator",
    category: "Disease Risk",
    badge: null,
  },
]

// Full calculator list (used for count display)
const allCalculators = [
  { href: "/health/absi-calculator", title: "ABSI Calculator", category: "Body Composition" },
  { href: "/health/lean-body-mass-calculator", title: "Lean Body Mass Calculator", category: "Body Composition" },
  { href: "/health/rfm-calculator", title: "RFM Calculator", category: "Body Composition" },
  { href: "/health/ponderal-index-calculator", title: "Ponderal Index Calculator", category: "Body Composition" },
  { href: "/health/adjusted-body-weight-calculator", title: "Adjusted Body Weight Calculator", category: "Body Composition" },
  { href: "/health/karvonen-formula-calculator", title: "Karvonen Formula Calculator", category: "Cardio Health" },
  { href: "/health/body-shape-calculator", title: "Body Shape Calculator", category: "Body Composition" },
  { href: "/health/draw-length-calculator", title: "Draw Length Calculator", category: "Fitness" },
  { href: "/health/face-shape-calculator", title: "Face Shape Calculator", category: "Appearance" },
  { href: "/health/cholesterol-ratio-calculator", title: "Cholesterol Ratio Calculator", category: "Cardio Health" },
  { href: "/health/heart-rate-calculator", title: "Heart Rate Calculator", category: "Cardio Health" },
  { href: "/health/creatinine-clearance-calculator", title: "Creatinine Clearance Calculator", category: "Disease Risk" },
  { href: "/health/pregnancy-weight-gain-calculator", title: "Pregnancy Weight Gain Calculator", category: "Women's Health" },
  { href: "/health/fat-intake-calculator", title: "Fat Intake Calculator", category: "Nutrition" },
  { href: "/health/mean-arterial-pressure-calculator", title: "Mean Arterial Pressure Calculator", category: "Cardio Health" },
  { href: "/health/framingham-risk-score-calculator", title: "Framingham Risk Score Calculator", category: "Disease Risk" },
  { href: "/health/pulse-pressure-calculator", title: "Pulse Pressure Calculator", category: "Cardio Health" },
  { href: "/health/ascvd-risk-calculator", title: "ASCVD Risk Calculator", category: "Disease Risk" },
  { href: "/health/qrisk3-calculator", title: "Qrisk3 Calculator", category: "Disease Risk" },
  { href: "/health/tdee-calculator", title: "TDEE Calculator", category: "Nutrition" },
  { href: "/health/macro-calculator", title: "Macro Calculator", category: "Nutrition" },
  { href: "/health/one-rep-max-calculator", title: "One-Rep Max Calculator", category: "Fitness" },
  { href: "/health/vo2-max-calculator", title: "VO2 Max Calculator", category: "Fitness" },
  { href: "/health/wilks-calculator", title: "Wilks Calculator", category: "Fitness" },
  { href: "/health/bmi-calculator", title: "BMI Calculator", category: "Body Composition" },
  { href: "/health/age-calculator", title: "Age Calculator", category: "General" },
  { href: "/health/waist-to-height-ratio-calculator", title: "Waist-to-Height Ratio Calculator", category: "Body Composition" },
  { href: "/health/ideal-body-weight-calculator", title: "Ideal Body Weight Calculator", category: "Body Composition" },
  { href: "/health/body-fat-calculator", title: "Body Fat Percentage Calculator", category: "Body Composition" },
  { href: "/health/blood-pressure-calculator", title: "Blood Pressure Calculator", category: "Cardio Health" },
  { href: "/health/resting-heart-rate-calculator", title: "Resting Heart Rate Calculator", category: "Cardio Health" },
  { href: "/health/heart-age-calculator", title: "Heart Age Calculator", category: "Cardio Health" },
  { href: "/health/diabetes-risk-calculator", title: "Diabetes Risk Calculator", category: "Disease Risk" },
  { href: "/health/estimated-average-glucose-calculator", title: "eAG Calculator", category: "Disease Risk" },
  { href: "/health/daily-water-intake-calculator", title: "Daily Water Intake Calculator", category: "Nutrition" },
  { href: "/health/calorie-deficit-calculator", title: "Calorie Deficit Calculator", category: "Nutrition" },
  { href: "/health/bmr-calculator", title: "BMR Calculator", category: "Nutrition" },
  { href: "/health/obesity-risk-calculator", title: "Obesity Risk Calculator", category: "Disease Risk" },
  { href: "/health/stress-level-calculator", title: "Stress Level Calculator", category: "Mental Wellness" },
  { href: "/health/breast-cancer-risk-calculator", title: "Breast Cancer Risk Calculator", category: "Disease Risk" },
  { href: "/health/sleep-cycle-calculator", title: "Sleep Cycle Calculator", category: "Mental Wellness" },
  { href: "/health/sleep-debt-calculator", title: "Sleep Debt Calculator", category: "Mental Wellness" },
  { href: "/health/calories-burned-calculator", title: "Calories Burned Calculator", category: "Fitness" },
  { href: "/health/running-pace-calculator", title: "Running Pace Calculator", category: "Fitness" },
  { href: "/health/period-cycle-calculator", title: "Period Cycle Calculator", category: "Women's Health" },
  { href: "/health/ovulation-calculator", title: "Ovulation Calculator", category: "Women's Health" },
  { href: "/health/ivf-pregnancy-due-date-calculator", title: "IVF Due Date Calculator", category: "Women's Health" },
]

// ─── Category Groups ─────────────────────────────────────────────────────────

const categoryGroups = [
  {
    name: "Body Composition",
    icon: <Scale className="h-6 w-6" />,
    description: "BMI, body fat, lean mass, body shape & weight metrics",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconColor: "text-emerald-600",
    bgAccent: "bg-emerald-500",
    count: allCalculators.filter((c) => c.category === "Body Composition").length,
  },
  {
    name: "Cardio Health",
    icon: <Heart className="h-6 w-6" />,
    description: "Heart rate, blood pressure, cardiovascular risk",
    color: "bg-rose-50 text-rose-700 border-rose-200",
    iconColor: "text-rose-500",
    bgAccent: "bg-rose-500",
    count: allCalculators.filter((c) => c.category === "Cardio Health").length,
  },
  {
    name: "Nutrition & Weight",
    icon: <Zap className="h-6 w-6" />,
    description: "Calories, macros, TDEE, BMR, deficit & intake",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    iconColor: "text-amber-600",
    bgAccent: "bg-amber-500",
    count: allCalculators.filter((c) => c.category === "Nutrition").length,
  },
  {
    name: "Fitness Performance",
    icon: <TrendingUp className="h-6 w-6" />,
    description: "VO2 max, one-rep max, running pace, draw length",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    iconColor: "text-blue-600",
    bgAccent: "bg-blue-500",
    count: allCalculators.filter((c) => c.category === "Fitness").length,
  },
  {
    name: "Disease Risk",
    icon: <Shield className="h-6 w-6" />,
    description: "Diabetes, ASCVD, Framingham, cancer risk screening",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    iconColor: "text-violet-600",
    bgAccent: "bg-violet-500",
    count: allCalculators.filter((c) => c.category === "Disease Risk").length,
  },
  {
    name: "Mental Wellness",
    icon: <Brain className="h-6 w-6" />,
    description: "Sleep cycles, sleep debt, stress level analysis",
    color: "bg-teal-50 text-teal-700 border-teal-200",
    iconColor: "text-teal-600",
    bgAccent: "bg-teal-500",
    count: allCalculators.filter((c) => c.category === "Mental Wellness").length,
  },
  {
    name: "Women's Health",
    icon: <Activity className="h-6 w-6" />,
    description: "Ovulation, periods, pregnancy weight & IVF dates",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    iconColor: "text-pink-600",
    bgAccent: "bg-pink-500",
    count: allCalculators.filter((c) => c.category === "Women's Health").length,
  },
  {
    name: "Appearance",
    icon: <Sparkles className="h-6 w-6" />,
    description: "Face shape, body shape, personal style guidance",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconColor: "text-emerald-600",
    bgAccent: "bg-emerald-500",
    count: allCalculators.filter((c) => c.category === "Appearance").length,
  },
]

// ─── Why Choose Us Points ─────────────────────────────────────────────────────

const trustPoints = [
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Clinically-Grounded Formulas",
    desc: "Every calculator uses peer-reviewed, medically validated formulas — the same ones used by healthcare professionals.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Built for Real People",
    desc: "Results come with context, not just numbers. We explain what your score means and what to do next.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "100% Private, No Account Needed",
    desc: "Nothing is stored. Your health data stays on your device. No login, no tracking, no selling your information.",
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: "Updated to Current Standards",
    desc: "We regularly review and update our calculators to reflect the latest clinical guidelines from AHA, WHO, and NHS.",
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "Trusted by Thousands Monthly",
    desc: "From fitness enthusiasts to healthcare professionals, Calqulate is a go-to resource for accurate health insight.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Instant, No-Friction Results",
    desc: "no email gates, no confusing interfaces. Just enter your numbers and get your answer.",
  },
]

// ─── Page Component ───────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Global CSS for floating animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 4s ease-in-out 2s infinite;
        }
      `}</style>

      <Header />

      <main className="flex-1">

        {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 py-16 lg:py-24">

          {/* Decorative background dots */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          {/* Glowing orb accent */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-400 rounded-full opacity-10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-300 rounded-full opacity-10 blur-3xl pointer-events-none" />

          <div className="relative container mx-auto px-4">
            {/* Swapped to 12-column grid to increase image size and decrease gap */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
              
              {/* LEFT SIDE: Content (Takes 5 columns out of 12) */}
              <div className="lg:col-span-5 text-center lg:text-left mx-auto lg:mx-0 w-full max-w-2xl lg:max-w-none">
                {/* Pill badge */}
                <div className="inline-flex items-center gap-2 bg-emerald-800/60 border border-emerald-600/40 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  47 Free Health Calculators — No Login Required
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                  Know Your Health Numbers.{" "}
                  <span className="text-emerald-400 block lg:inline">
                    Know What to Do Next.
                  </span>
                </h1>

                <p className="text-lg text-emerald-100/80 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Calqulate goes beyond raw numbers. Calculate your BMI, body fat, heart health, sleep cycles, and
                  50+ more health metrics — then get clear, actionable guidance tailored to your results.
                </p>

                {/* Hero Search */}
                <div className="max-w-md mx-auto lg:mx-0 mb-8">
                  <SearchBar
                    placeholder="Search calculators... e.g. BMI, body fat"
                    className="h-13 text-base bg-white shadow-xl rounded-xl"
                  />
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-emerald-900/40 transition-all duration-200 hover:shadow-emerald-500/30"
                    asChild
                  >
                    <Link href="\search">
                      Explore All Calculators
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-emerald-500/50 text-emerald-200 hover:bg-emerald-800/50 hover:text-white px-8 py-3 rounded-xl transition-all duration-200"
                    asChild
                  >
                    <Link href="/about-us">How It Works</Link>
                  </Button>
                </div>

                {/* Social proof strip */}
                <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-emerald-300/70">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Clinically validated formulas
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    No account needed
                  </span>
                </div>
              </div>

              {/* RIGHT SIDE: Visual/Image Representation (Takes 7 columns out of 12) */}
              <div className="lg:col-span-7 relative hidden lg:block w-full lg:pl-4 xl:pl-8">
                {/* Soft backdrop glow behind image */}
                <div className="absolute inset-0 bg-emerald-400 rounded-[2rem] blur-3xl opacity-20 animate-pulse" />
                
                {/* Main Image Container */}
                <div className="relative w-full max-w-2xl lg:max-w-none ml-auto bg-emerald-800/40 border border-emerald-600/30 p-4 rounded-[2.5rem] shadow-2xl backdrop-blur-sm">
                  <img 
                    src="\Health-personalized-dashboard-calqulate.net.png" 
                    alt="Health Metrics and Analytics Graphic" 
                    className="w-full h-[480px] object-cover rounded-[1.8rem] shadow-inner"
                  />
                  
                  {/* Floating Concept UI Element 1: Insights (Animated) */}
                  <div className="absolute -bottom-6 -left-4 xl:-left-8 bg-white p-4 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-4 animate-float">
                    <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div className="pr-2">
                      <div className="text-sm font-bold text-gray-900">Actionable Insights</div>
                      <div className="text-xs text-gray-500 font-medium">Based on your numbers</div>
                    </div>
                  </div>

                  {/* Floating Concept UI Element 2: Value & Privacy (Animated) */}
                  <div className="absolute -top-6 -right-2 xl:-right-6 bg-emerald-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-4 animate-float-delayed">
                    <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-300">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div className="pr-2">
                      <div className="text-sm font-bold text-white">100% Private</div>
                      <div className="text-xs text-emerald-200/80 font-medium">No data stored</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── UNIQUE VALUE PROPOSITION ──────────────────────────────────────── */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                  <div className="text-4xl font-extrabold text-emerald-600 mb-1">47+</div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Health Calculators</div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    From BMI to cardiovascular risk — every health metric covered in one place.
                  </p>
                </div>
                <div className="p-6 border-x border-gray-100">
                  <div className="text-4xl font-extrabold text-emerald-600 mb-1">100%</div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Actionable Insights</div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    We don't just show you a number. We explain it and tell you what to do next.
                  </p>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-extrabold text-emerald-600 mb-1">0</div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Data Stored or Sold</div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Your health is private. Everything runs in your browser. Nothing leaves your device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED: Face & Body Shape ──────────────────────────────────── */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3 block">
                Featured Calculators
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Discover Your Body & Face Shape
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Two of our most-loved tools — used by hundreds of thousands to better understand their body and unlock personalized lifestyle guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Body Shape Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-x-8 -translate-y-8 group-hover:bg-emerald-100 transition-colors" />
                <div className="p-8 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <Activity className="h-6 w-6 text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                      Trending
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Body Shape Calculator</h3>
                  <p className="text-gray-500 mb-2 leading-relaxed">
                    Enter your bust, waist, and hip measurements to discover your body shape - hourglass, pear, apple, or rectangle.
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {["Identify your exact body type", "Get fitness tips for your shape", "Find flattering clothing styles"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl"
                    asChild
                  >
                    <Link href="/health/body-shape-calculator">
                      Find My Body Shape
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Face Shape Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -translate-x-8 -translate-y-8 group-hover:bg-teal-100 transition-colors" />
                <div className="p-8 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-teal-100 rounded-xl">
                      <Sparkles className="h-6 w-6 text-teal-600" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                      Trending
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Face Shape Detector</h3>
                  <p className="text-gray-500 mb-2 leading-relaxed">
                    Use precise facial measurements - forehead, cheekbones, jaw, and face length - to identify your exact face shape.
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {["Determine oval, round, square, heart, diamond, or oblong", "Get hairstyle recommendations", "Find the best glasses for your features"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-teal-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl"
                    asChild
                  >
                    <Link href="/health/face-shape-calculator">
                      Find My Face Shape
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CATEGORY SECTION ──────────────────────────────────────────────── */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3 block">
                Browse by Category
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Every Aspect of Your Health, Covered
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Eight specialized health categories so you always find exactly the calculator you need — fast.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {categoryGroups.map((cat) => (
                <div
                  key={cat.name}
                  className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${cat.color} border`}>
                    <span className={cat.iconColor}>{cat.icon}</span>
                  </div>
                  <div className="text-sm font-bold text-gray-800 mb-1">{cat.name}</div>
                  <div className="text-xs text-gray-400 mb-2 leading-relaxed">{cat.description}</div>
                  <div className="text-xs font-semibold text-emerald-600">{cat.count} calculators</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── POPULAR CALCULATORS GRID ──────────────────────────────────────── */}
        <section id="calculators" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3 block">
                Most Used Tools
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Health Calculators
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Clinically validated calculators — each one gives you a result plus the context to act on it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {calculators.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="group block bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2.5 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                        <span className="text-emerald-600">{calculator.icon}</span>
                      </div>
                      {calculator.badge && (
                        <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
                          {calculator.badge}
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1.5">
                      {calculator.category}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {calculator.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      {calculator.description}
                    </p>

                    <div className="flex items-center text-sm font-semibold text-emerald-600 group-hover:text-emerald-500">
                      Calculate Now
                      <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-gray-500 mb-4">
                Showing 12 of {allCalculators.length}+ calculators
              </p>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-semibold px-8 rounded-xl"
                asChild
              >
                <Link href="/search">
                  View All Calculators
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── DIFFERENTIATION / VALUE SECTION ──────────────────────────────── */}
        <section className="py-16 bg-gradient-to-br from-emerald-950 to-emerald-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

              {/* Left: Headline */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3 block">
                  Our Difference
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Not Just Numbers.{" "}
                  <span className="text-emerald-400">A Decision Engine for Your Health.</span>
                </h2>
                <p className="text-emerald-100/70 text-lg leading-relaxed mb-6">
                  Most health calculators stop at a result. Calqulate goes further — every calculation comes
                  with an explanation of what your result means, how it compares to healthy ranges, and what
                  concrete steps you should take next.
                </p>
                <p className="text-emerald-100/70 leading-relaxed">
                  Whether you're optimizing your fitness, managing a chronic condition, tracking weight loss,
                  or simply curious about your body — Calqulate turns raw data into real decisions.
                </p>
              </div>

              {/* Right: Features list */}
              <div className="space-y-4">
                {[
                  { title: "Result + Interpretation", desc: "Every score includes a plain-English explanation of what it means for your health." },
                  { title: "Healthy Range Benchmarks", desc: "See where you stand against clinical healthy ranges — not just a raw number." },
                  { title: "Next-Step Recommendations", desc: "Actionable guidance for each result: what to eat, how to train, when to see a doctor." },
                  { title: "Multiple Validated Formulas", desc: "Where relevant, we show results from multiple clinical formulas side-by-side." },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="flex gap-4 p-5 bg-emerald-900/50 rounded-2xl border border-emerald-800/50"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm mb-0.5">{feature.title}</div>
                      <div className="text-sm text-emerald-300/70 leading-relaxed">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3 block">
                Why Calqulate
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Built on Trust. Designed for Clarity.
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                We built Calqulate because health tools should help people make better decisions — not overwhelm or mislead them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {trustPoints.map((point) => (
                <div
                  key={point.title}
                  className="flex gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-emerald-600">{point.icon}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm mb-1">{point.title}</div>
                    <div className="text-sm text-gray-500 leading-relaxed">{point.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA STRIP ───────────────────────────────────────────────── */}
        <section className="py-16 bg-emerald-50 border-t border-emerald-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Understand Your Health Better?
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
              Start with any calculator below — no account, no friction, just clear health insights in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 rounded-xl shadow-md shadow-emerald-200"
                asChild
              >
                <Link href="/health/bmi-calculator">
                  Start with BMI Calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-100 px-8 rounded-xl font-semibold"
                asChild
              >
                <Link href="/health/ovulation-calculator">
                  Try Ovulation Calculator
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}