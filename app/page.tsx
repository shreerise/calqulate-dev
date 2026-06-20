import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search/search-bar"
import { ScoreGauge } from "@/components/vitals/ScoreGauge"
import { SinglePlan } from "@/components/vitals/SinglePlan"

import {
  Calculator,
  Wrench,
  TrendingUp,
  Heart,
  HeartPulse,
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
  Target,
  LineChart,
  Lock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// ─── Calculator Data ────────────────────────────────────────────────────────

const calculators = [
  {
    title: "BMI Calculator",
    description: "Standard weight scales don't tell the whole story. Decode what your numbers mean for your health and get a realistic, shame-free action plan.",
    icon: <Scale className="h-5 w-5" />,
    href: "/health/bmi-calculator",
    category: "Body Composition",
    badge: "Most Popular",
    cta: "Check My BMI",
  },
  {
    title: "Body Shape Calculator",
    description: "Many clothes look great on the hanger but fit poorly on your body. Discover your exact frame shape to find flattering styling choices that match your natural proportions.",
    icon: <Activity className="h-5 w-5" />,
    href: "/health/body-shape-calculator",
    category: "Body Composition",
    badge: "Trending",
    cta: "Find My Body Shape",
  },
  {
    title: "Face Shape Detector",
    description: "Stop wasting money on haircuts or glasses that don't suit you. Instantly identify your facial structure so you can make style choices that naturally flatter your look.",
    icon: <Sparkles className="h-5 w-5" />,
    href: "/health/face-shape-calculator",
    category: "Appearance",
    badge: "Trending",
    cta: "Detect My Face Shape",
  },
  {
    title: "Body Fat Percentage Calculator",
    description: "Scale weight doesn't show your hard-earned muscle, which leads to needless frustration. Estimate your body composition using the trusted US Navy method to see real progress.",
    icon: <Calculator className="h-5 w-5" />,
    href: "/health/body-fat-calculator",
    category: "Body Composition",
    badge: null,
    cta: "Check My Fat",
  },
  {
    title: "TDEE Calculator",
    description: "Consistent healthy eating still requires proper portion control. Find the exact baseline calories your body burns daily so you can eat with clear purpose.",
    icon: <Zap className="h-5 w-5" />,
    href: "/health/tdee-calculator",
    category: "Nutrition",
    badge: null,
    cta: "Find My Baseline",
  },
  {
    title: "Ideal Body Weight Calculator",
    description: "Generic height-weight charts often set unrealistic, discouraging targets. Calculate a personalized, clinically backed weight range based on your unique body frame.",
    icon: <TrendingUp className="h-5 w-5" />,
    href: "/health/ideal-body-weight-calculator",
    category: "Body Composition",
    badge: null,
    cta: "Get My Range for ideal body weight",
  },
  {
    title: "Heart Rate Calculator",
    description: "Working out to exhaustion without losing body fat is common when heart rate zones are off. Identify your target cardio zones to build stamina without burning yourself out.",
    icon: <Heart className="h-5 w-5" />,
    href: "/health/heart-rate-calculator",
    category: "Cardio Health",
    badge: null,
    cta: "Check Heart Zone",
  },
  {
    title: "Calorie Deficit Calculator",
    description: "Restrictive dieting usually leads to crashes and intense cravings. Calculate a safe, sustainable deficit tailored to your lifestyle so you can lose weight without starving.",
    icon: <Calculator className="h-5 w-5" />,
    href: "/health/calorie-deficit-calculator",
    category: "Nutrition",
    badge: null,
    cta: "Find My Deficit",
  },
  {
    title: "Sleep Cycle Calculator",
    description: "Sleeping for eight hours can still leave you feeling tired if you wake up mid-cycle. Time your bedtime with your natural sleep cycles to wake up clear-headed.",
    icon: <Brain className="h-5 w-5" />,
    href: "/health/sleep-cycle-calculator",
    category: "Mental Wellness",
    badge: null,
    cta: "Fix My Sleep cycle",
  },
  {
    title: "Blood Pressure Calculator",
    description: "High numbers at the doctor's office can cause unnecessary anxiety. Safely decode your readings into clear terms and learn simple daily steps to protect your heart.",
    icon: <Activity className="h-5 w-5" />,
    href: "/health/blood-pressure-calculator",
    category: "Cardio Health",
    badge: null,
    cta: "Is My BP High?",
  },
  {
    title: "Macro Calculator",
    description: "Tracking calories without balancing proteins, carbs, and fats often leads to hunger and low energy. Find the right daily ratio to preserve lean muscle.",
    icon: <Zap className="h-5 w-5" />,
    href: "/health/macro-calculator",
    category: "Nutrition",
    badge: null,
    cta: "Get My Macros",
  },
  {
    title: "Diabetes Risk Calculator",
    description: "Silent risk factors can be hard to spot on your own. Take a clinical assessment to understand your personal risk levels and discover practical steps to protect your long-term health.",
    icon: <Shield className="h-5 w-5" />,
    href: "/health/diabetes-risk-calculator",
    category: "Disease Risk",
    badge: null,
    cta: "Diabetes Risk Scan",
  },
  {
    title: "Golden Ratio Face Calculator",
    description: "Cameras distort features differently than a standard flat mirror. Discover your structural symmetry using the classic Golden Ratio to analyze your natural balance.",
    icon: <Sparkles className="h-5 w-5" />,
    href: "/health/golden-ratio-face-calculator",
    category: "Appearance",
    badge: null,
    cta: "Measure My Face Symmetry",
  },
  {
    title: "Waist-to-Height Ratio Calculator",
    description: "Standard weight doesn't account for midsection fat, which is often a hidden indicator of cardiovascular strain. Find out if your waistline falls within a healthy, safe range.",
    icon: <Scale className="h-5 w-5" />,
    href: "/health/waist-to-height-ratio-calculator",
    category: "Body Composition",
    badge: null,
    cta: "Check Belly Fat",
  },
  {
    title: "Weight loss percentage Calculator",
    description: "When progress feels slow, focusing only on the scale can kill your motivation. Shift your focus to your total progress percentage to celebrate how far you have come.",
    icon: <TrendingUp className="h-5 w-5" />,
    href: "/health/weight-loss-percentage-calculator",
    category: "Body Composition",
    badge: null,
    cta: "Weight Loss % Check",
  },
  {
    title: "GLP-1 Dose Calculator",
    description: "Titrating weight loss medications like Ozempic or Wegovy requires careful scheduling. Map out your typical dose progression to understand your plan and manage side effects.",
    icon: <Wrench className="h-5 w-5" />,
    href: "/health/glp-1-dose-calculator",
    category: "Disease Risk",
    badge: null,
    cta: "GLP-1 Dose Check",
  },
  {
    title: "Dress Size Calculator",
    description: "Inconsistent sizing across apparel brands makes online shopping difficult. Get a personalized dress size recommendation based on your unique body measurements to reduce shopping errors.",
    icon: <Sparkles className="h-5 w-5" />,
    href: "/health/dress-size-calculator",
    category: "Appearance",
    badge: null,
    cta: "Find My Dress Size",
  },
  {
    title: "Ai Attractiveness Test",
    description: "Discover your unique facial features and learn what makes you attractive to others.",
    icon: <Sparkles className="h-5 w-5" />,
    href: "/health/ai-attractiveness-test",
    category: "Appearance",
    badge: null,
    cta: "Take the AI Attractiveness Test",
  }
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
  { href: "/health/golden-ratio-face-calculator", title: "Golden Ratio Face Calculator", category: "Appearance" },
  { href: "/health/weight-loss-percentage-calculator", title: "Weight Loss Percentage Calculator", category: "Body Composition" },
  { href: "/health/glp-1-dose-calculator", title: "GLP-1 Dose Calculator", category: "Disease Risk" },
  { href: "/health/dress-size-calculator", title: "Dress Size Calculator", category: "Appearance" },
  { href: "/health/ai-attractiveness-test", title: "AI Attractiveness Test", category: "Appearance" },
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
    desc: "Every calculator uses peer-reviewed, medically validated formulas, which are the same tools used by healthcare professionals.",
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
    desc: "No email gates, no confusing interfaces. Just enter your numbers and get your answer.",
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    title: "Track Change Over Time",
    desc: "See your trajectory, not a one-off number. Watch your Metabolic Health Score and risk fall month over month.",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Privacy-First Paid Tier",
    desc: "GDPR/CCPA data export and permanent delete, anytime. Your health data is yours to take or erase.",
  },
]

// ─── Calqulate Vitals services ────────────────────────────────────────────────

const vitalsServices = [
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Metabolic Health Tracker",
    desc: "A composite Metabolic Health Score plus heart age and 10-year ASCVD risk, tracked over time.",
    href: "/service/metabolic-health-tracker",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Heart Age Tracker",
    desc: "See your vascular age versus your real age with the validated Framingham model — and watch it fall.",
    href: "/service/heart-age-tracker",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "GLP-1 Progress Tracker",
    desc: "On semaglutide or Ozempic? Track results that matter beyond the scale — risk, not just pounds.",
    href: "/service/glp1-progress-tracker",
  },
]


// ─── Page Component ───────────────────────────────────────────────────────────

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Calqulate.NET",
      url: "https://calqulate.net",
      description:
        "A metabolic and cardiovascular risk-reversal service. Know your score, track your trend, lower your risk.",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://calqulate.net/search?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Product",
      name: "Calqulate Vitals",
      description:
        "Track your Metabolic Health Score, heart age, and 10-year disease risk over time — and get the one change that moves it most.",
      brand: { "@type": "Brand", name: "Calqulate" },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "0",
        highPrice: "119",
        offerCount: "3",
      },
    },
  ],
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
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
                  Metabolic &amp; cardiovascular risk-reversal · Built on validated clinical models
                </div>

                            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                  Stop calculating. <span className="text-emerald-400">Start reversing.</span>
                </h1>

                <p className="text-lg text-emerald-100/80 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Calqulate tracks your metabolic and cardiovascular risk over time — and tells you the
                  single highest-impact change to make next.
                </p>

                {/* Hero Search */}
                <div className="max-w-md mx-auto lg:mx-0 mb-8">
                  <SearchBar
                    placeholder="Search free snapshot tools... e.g. BMI, heart age"
                    className="h-13 text-base bg-white shadow-xl rounded-xl"
                  />
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-emerald-900/40 transition-all duration-200 hover:shadow-emerald-500/30"
                    asChild
                  >
                    <Link href="/service/metabolic-health-tracker">
                      Get my Metabolic Health Score
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-emerald-500/50 text-emerald-200 hover:bg-emerald-800/50 hover:text-white px-8 py-3 rounded-xl transition-all duration-200"
                    asChild
                  >
                    <Link href="/#how-it-works">See how it works</Link>
                  </Button>
                </div>

                {/* Trust chips */}
                <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-emerald-300/70">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Validated clinical models
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Private by design
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Cancel anytime
                  </span>
                </div>
              </div>

              {/* RIGHT SIDE: Visual/Image Representation (Takes 7 columns out of 12) */}
              <div className="lg:col-span-7 relative hidden lg:block w-full lg:pl-4 xl:pl-8">
                {/* Soft backdrop glow behind image */}
                <div className="absolute inset-0 bg-emerald-400 rounded-[2rem] blur-3xl opacity-20 animate-pulse" />
                
                {/* Main Image Container */}
                <div className="relative w-full max-w-2xl lg:max-w-none ml-auto bg-emerald-800/40 border border-emerald-600/30 p-4 rounded-[2.5rem] shadow-2xl backdrop-blur-sm">
                  <div className="relative w-full h-[480px] overflow-hidden rounded-[1.8rem] shadow-inner">
                    <Image
                      src="/Health-personalized-dashboard-calqulate.net.webp"
                      alt="Health Metrics and Analytics Graphic"
                      fill
                      priority
                      sizes="(min-width: 1024px) 720px, 100vw"
                      className="object-contain"
                    />
                  </div>

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

        {/* ── SECTION B: THE FREE ON-RAMP ──────────────────────────────────── */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Start with a free snapshot — no account needed.
                </h2>
                <p className="mt-2 text-gray-600">
                  Run every clinical engine once, free and stateless. Upgrade only when you want to
                  save it, track it, and reverse it.
                </p>
              </div>
              <Link
                href="/search"
                className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl border border-emerald-300 bg-white px-6 py-3 font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                Browse all snapshot tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION C: INTRODUCING CALQULATE VITALS ──────────────────────── */}
        <section id="how-it-works" className="py-16 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                <HeartPulse className="h-5 w-5" />
                Introducing Calqulate Vitals
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                From a one-time number to a health trajectory.
              </h2>
              <p className="text-lg text-gray-600">
                Calqulate Vitals turns your numbers into a tracked score, validated risk models, and the
                single highest-impact change to make next.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
              {/* 3-step how it works */}
              <div className="lg:col-span-2 grid sm:grid-cols-3 gap-5">
                {[
                  { n: "1", icon: <Calculator className="h-5 w-5" />, title: "Compute", desc: "Run every clinical engine free and stateless — no login required." },
                  { n: "2", icon: <LineChart className="h-5 w-5" />, title: "Save & track", desc: "Trend your Metabolic Health Score, heart age, and 10-yr ASCVD & diabetes risk over time." },
                  { n: "3", icon: <Target className="h-5 w-5" />, title: "Act", desc: "A weighted risk-graph engine surfaces your single highest-impact 'next lever.'" },
                ].map((step) => (
                  <div key={step.n} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">{step.n}</span>
                      <span className="text-emerald-600">{step.icon}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Score gauge + trend illustration */}
              <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm flex flex-col items-center">
                <ScoreGauge score={82} grade="B" />
                <svg viewBox="0 0 240 60" className="mt-4 w-full" role="img" aria-label="Sample improving score trend">
                  <polyline
                    points="0,48 40,44 80,46 120,36 160,30 200,22 240,14"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {[[0,48],[40,44],[80,46],[120,36],[160,30],[200,22],[240,14]].map(([x,y],i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill="#10b981" />
                  ))}
                </svg>
                <p className="mt-2 text-xs text-gray-400 text-center">Sample score trending up over six measurements.</p>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500 max-w-3xl mx-auto">
              Built on validated, published models:{" "}
              <span className="font-medium text-gray-700">Pooled Cohort Equations (ASCVD)</span>,{" "}
              <span className="font-medium text-gray-700">Framingham (heart age)</span>, and{" "}
              <span className="font-medium text-gray-700">FINDRISC (type-2 diabetes risk)</span>.{" "}
              Educational decision-support — not medical advice.
            </p>
          </div>
        </section>

        {/* ── SECTION D: THE THREE VITALS SERVICES ─────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3 block">
                The Vitals services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pick the track that fits your goal
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {vitalsServices.map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="group block rounded-2xl border border-gray-100 bg-white p-6 hover:border-emerald-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="p-3 bg-emerald-50 rounded-xl w-fit text-emerald-600 group-hover:bg-emerald-100 transition-colors mb-4">
                    {svc.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">{svc.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{svc.desc}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-emerald-600 group-hover:text-emerald-500">
                    Explore <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION E: PRICING ───────────────────────────────────────────── */}
        <section id="pricing" className="py-16 bg-gray-50 border-y border-gray-100 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3 block">
                Simple, honest pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Free to start. Upgrade to track &amp; reverse.
              </h2>
              <p className="text-gray-600">
                The free snapshot is genuinely free — run any engine once, nothing saved. One plan unlocks
                saved history, the trajectory engine, your next-lever protocol, and doctor-shareable reports.
              </p>
            </div>
            <SinglePlan />
            <p className="mt-8 text-center text-xs text-gray-400">
              Educational decision-support — not medical advice. Cancel anytime.
            </p>
          </div>
        </section>

        {/* ── UNIQUE VALUE PROPOSITION ──────────────────────────────────────── */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                  <div className="text-4xl font-extrabold text-emerald-600 mb-1">50+</div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Health Calculators</div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    From BMI to cardiovascular risk, find every health metric covered in one place.
                  </p>
                </div>
                <div className="p-6 border-x border-gray-100">
                  <div className="text-4xl font-extrabold text-emerald-600 mb-1">100%</div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Actionable Insights</div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Receive a clear explanation of your results alongside specific, practical recommendations.
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
                Two of our most-loved tools. Hundreds of thousands of people use them to understand their physical traits and receive personalized lifestyle guidance.
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
                    Enter your bust, waist, and hip measurements to discover your body shape, such as hourglass, pear, apple, or rectangle.
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
                    Use precise facial measurements, including your forehead, cheekbones, jaw, and face length, to identify your exact face shape.
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
                Eight specialized health categories help you find the calculator you need quickly.
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
                Clinically validated calculators. Each tool provides a clear result alongside the context you need to take action.
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
                      {calculator.cta ?? "Calculate Now"}
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
                  Go Beyond Raw Numbers.{" "}
                  <span className="text-emerald-400">A Decision Guide for Your Health.</span>
                </h2>
                <p className="text-emerald-100/70 text-lg leading-relaxed mb-6">
                  Most health calculators stop at a result. Calqulate goes further. Every calculation comes
                  with an explanation of what your result means, how it compares to healthy ranges, and what
                  concrete steps you should take next.
                </p>
                <p className="text-emerald-100/70 leading-relaxed">
                  You might want to optimize your fitness, manage a chronic condition, track weight loss,
                  or understand your body. Calqulate turns raw data into real decisions.
                </p>
              </div>

              {/* Right: Features list */}
              <div className="space-y-4">
                {[
                  { title: "Result + Interpretation", desc: "Every score includes a plain-English explanation of what it means for your health." },
                  { title: "Healthy Range Benchmarks", desc: "See where you stand compared to clinical benchmarks instead of looking at a raw number." },
                  { title: "Actionable Recommendations", desc: "Actionable guidance for each result, telling you what to eat, how to train, and when to see a doctor." },
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
                Built on Trust. Designed for Understanding.
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                We built Calqulate because health tools should help people make better decisions, rather than overwhelming or misleading them.
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

        {/* ── VISUAL GALLERY ───────────────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3 block">
                Visual Guides
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Health Visuals
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Body shapes, face shapes, and BMI charts are easier to understand visually. Click any image to explore detailed guides.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { title: "Body Shapes", href: "/gallery#pear-shape", image: "/images/body-shapes/pear-shape.webp", color: "bg-rose-50" },
                { title: "Face Shapes", href: "/gallery#face-shape-comparison", image: "/face-shape-comparison.webp", color: "bg-blue-50" },
                { title: "BMI Chart", href: "/gallery#bmi-chart", image: "/bmi-chart.webp", color: "bg-emerald-50" },
                { title: "Sleep Guide", href: "/gallery#sleep-cycle", image: "/recommendation-sleep-cycle-by-age-infographic.webp", color: "bg-violet-50" },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group block rounded-2xl overflow-hidden bg-white ring-1 ring-gray-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className={`relative w-full aspect-[4/3] ${item.color}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                View All Visual Guides
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── SECTION I: FINAL CTA (service-led, dual path) ────────────────── */}
        <section className="py-16 bg-gradient-to-br from-emerald-950 to-emerald-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Watch your disease risk drop, not just the scale.
            </h2>
            <p className="text-emerald-100/80 text-lg mb-8 max-w-xl mx-auto">
              Know your score, track your trend, lower your risk. Start free — upgrade only when you
              want to save and reverse it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 rounded-xl shadow-lg shadow-emerald-900/40"
                asChild
              >
                <Link href="/service/metabolic-health-tracker">
                  Start your free Metabolic Health Score
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-500/50 text-emerald-200 hover:bg-emerald-800/50 hover:text-white px-8 rounded-xl font-semibold"
                asChild
              >
                <Link href="/search">Or try any free snapshot</Link>
              </Button>
            </div>
            <p className="mt-8 text-xs text-emerald-300/60">
              Educational decision-support — not medical, legal, or financial advice.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}