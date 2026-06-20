import Link from "next/link"
import { HeartPulse, Mail } from "lucide-react"
import { STANDALONE_QUESTIONS } from "@/app/answers/questions-data"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <HeartPulse className="h-6 w-6 text-emerald-600" />
              <span className="text-lg font-bold">
                Calqulate<span className="text-emerald-600">.NET</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Calqulate is a risk-reversal service for metabolic and heart health. Track your score,
              watch your trend, lower your risk — backed by validated clinical models.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:krushal.barasiya@calqulate.net" className="hover:underline">
                  krushal.barasiya@calqulate.net
                </a>
              </div>
            </div>
          </div>

          {/* Vitals (service) */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Calqulate Vitals</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/service/metabolic-health-tracker" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Metabolic Health Tracker
                </Link>
              </li>
              <li>
                <Link href="/service/heart-age-tracker" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Heart Age Tracker
                </Link>
              </li>
              <li>
                <Link href="/service/glp1-progress-tracker" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  GLP-1 Progress Tracker
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Calculators */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Popular Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/health/absi-calculator" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  ABSI Calculator
                </Link>
              </li>
              <li>
                <Link href="/health/lean-body-mass-calculator" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Lean Body Mass Calculator
                </Link>
              </li>
              <li>
                <Link href="/health/rfm-calculator" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  RFM Calculator
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  View All Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/answers" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Health Questions
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal &amp; Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms-and-conditions" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="text-muted-foreground hover:text-emerald-700 transition-colors">
                  Your privacy choices / Delete my data
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">24/7 Support · Free to start</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Popular health questions (high-intent answer pages) */}
        <div className="border-t mt-8 pt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Popular health questions</h3>
            <Link href="/answers" className="text-xs font-medium text-emerald-700 hover:underline">
              View all answers →
            </Link>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm">
            {STANDALONE_QUESTIONS.map((q) => (
              <li key={q.slug}>
                <Link
                  href={`/answers/${q.slug}`}
                  className="text-muted-foreground hover:text-emerald-700 transition-colors"
                >
                  {q.q}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t mt-8 pt-8 space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Calqulate.NET All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center">
            Educational decision-support — not medical, legal, or financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
