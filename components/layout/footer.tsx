import Link from "next/link"
import { HeartPulse, Mail } from "lucide-react"
import { STANDALONE_QUESTIONS } from "@/app/answers/questions-data"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-3 sm:px-4 py-10 sm:py-12">
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
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/service/metabolic-health-tracker" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Metabolic Health Tracker
                </Link>
              </li>
              <li>
                <Link href="/service/heart-age-tracker" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Heart Age Tracker
                </Link>
              </li>
              <li>
                <Link href="/service/glp1-progress-tracker" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  GLP-1 Progress Tracker
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Calculators */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Popular Calculators</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/health/absi-calculator" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  ABSI Calculator
                </Link>
              </li>
              <li>
                <Link href="/health/lean-body-mass-calculator" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Lean Body Mass Calculator
                </Link>
              </li>
              <li>
                <Link href="/health/rfm-calculator" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  RFM Calculator
                </Link>
              </li>
              <li>
                <Link href="/search" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  View All Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/about-us" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/answers" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Health Questions
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal &amp; Support</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/terms-and-conditions" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1">
                  Your privacy choices / Delete my data
                </Link>
              </li>
              <li>
                <span className="block text-muted-foreground py-1.5 sm:py-1">24/7 Support · Free to start</span>
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
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 text-sm">
            {STANDALONE_QUESTIONS.map((q) => (
              <li key={q.slug}>
                <Link
                  href={`/answers/${q.slug}`}
                  className="block text-muted-foreground hover:text-emerald-700 transition-colors py-1.5 sm:py-1"
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
