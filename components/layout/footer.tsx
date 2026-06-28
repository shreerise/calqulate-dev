import Link from "next/link"
import { HeartPulse, Mail, ShieldCheck } from "lucide-react"
import { STANDALONE_QUESTIONS } from "@/app/answers/questions-data"

const linkCls = "block text-white/55 hover:text-white transition-colors py-1.5 sm:py-1"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="container mx-auto px-3 sm:px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <HeartPulse className="h-6 w-6 text-brand" />
              <span className="text-lg font-bold text-white">
                Calqulate<span className="text-brand">.NET</span>
              </span>
            </Link>
            <p className="text-sm text-white/55">
              Calqulate is a risk-reversal service for metabolic and heart health. Track your score,
              watch your trend, lower your risk — backed by validated clinical models.
            </p>
            <div className="space-y-2 text-sm text-white/55">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:krushal.barasiya@calqulate.net" className="hover:text-white hover:underline">
                  krushal.barasiya@calqulate.net
                </a>
              </div>
              <div className="flex items-center gap-2 text-brand">
                <ShieldCheck className="h-4 w-4" /> We never sell your data.
              </div>
            </div>
          </div>

          {/* Vitals (service) */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Calqulate Vitals</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/service/metabolic-health-tracker" className={linkCls}>Metabolic Health Tracker</Link></li>
              <li><Link href="/service/heart-age-tracker" className={linkCls}>Heart Age Tracker</Link></li>
              <li><Link href="/service/glp1-progress-tracker" className={linkCls}>GLP-1 Progress Tracker</Link></li>
              <li><Link href="/pricing" className={linkCls}>Pricing</Link></li>
              <li><Link href="/dashboard" className={linkCls}>Dashboard</Link></li>
            </ul>
          </div>

          {/* Popular Calculators */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Popular Calculators</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/health/absi-calculator" className={linkCls}>ABSI Calculator</Link></li>
              <li><Link href="/health/lean-body-mass-calculator" className={linkCls}>Lean Body Mass Calculator</Link></li>
              <li><Link href="/health/rfm-calculator" className={linkCls}>RFM Calculator</Link></li>
              <li><Link href="/search" className={linkCls}>View All Calculators</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/about-us" className={linkCls}>About Us</Link></li>
              <li><Link href="/how-it-works" className={linkCls}>How It Works</Link></li>
              <li><Link href="/answers" className={linkCls}>Health Questions</Link></li>
              <li><Link href="/contact-us" className={linkCls}>Contact Us</Link></li>
              <li><Link href="/privacy-policy" className={linkCls}>Privacy Policy</Link></li>
              <li><Link href="/sitemap.xml" className={linkCls}>Sitemap</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Legal &amp; Support</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/terms-and-conditions" className={linkCls}>Terms &amp; Conditions</Link></li>
              <li><Link href="/disclaimer" className={linkCls}>Disclaimer</Link></li>
              <li><Link href="/cookie-policy" className={linkCls}>Cookie Policy</Link></li>
              <li><Link href="/dashboard/settings" className={linkCls}>Your privacy choices / Delete my data</Link></li>
              <li><span className="block py-1.5 text-white/55 sm:py-1">24/7 Support · Free to start</span></li>
            </ul>
          </div>
        </div>

        {/* Popular health questions (high-intent answer pages) */}
        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Popular health questions</h3>
            <Link href="/answers" className="text-xs font-medium text-gold-light hover:underline">View all answers →</Link>
          </div>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {STANDALONE_QUESTIONS.map((q) => (
              <li key={q.slug}>
                <Link href={`/answers/${q.slug}`} className={linkCls}>{q.q}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 space-y-2 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-white/55">
            &copy; {new Date().getFullYear()} Calqulate.NET — All rights reserved.
          </p>
          <p className="text-center text-xs text-white/40">
            Educational decision-support — not medical, legal, or financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
