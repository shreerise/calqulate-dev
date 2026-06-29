import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Cookie, ShieldCheck, SlidersHorizontal, FileText, Mail, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | Calqulate.net",
  description:
    "What cookies and similar tools Calqulate.net uses, why we use them, and how to control them. Covers essential sign-in cookies, analytics, and advertising.",
  keywords: "cookie policy, cookies, tracking, Calqulate, AdSense, Clarity",
  alternates: { canonical: "https://calqulate.net/cookie-policy" },
};

const UPDATED = "June 2026";

const categories = [
  {
    title: "Essential cookies",
    icon: ShieldCheck,
    content:
      "These keep the site working and cannot be turned off. The main one is your sign-in session, set by our authentication provider so you stay logged in to your Calqulate Vitals account as you move between pages. Cloudflare Turnstile also sets a short-lived token at signup and login to tell humans from bots. Without these, accounts and security would not work.",
  },
  {
    title: "Analytics cookies",
    icon: SlidersHorizontal,
    content:
      "We use Google Tag Manager and Microsoft Clarity to understand which pages people use and where they get stuck. Clarity records anonymized usage so we can improve layout and fix problems. This data is about behavior on the site, not your health inputs.",
  },
  {
    title: "Advertising cookies",
    icon: Cookie,
    content:
      "The free calculators are supported in part by Google AdSense, which may set cookies to show relevant ads and measure them. These appear on the free, public pages. You can limit ad personalization through Google's Ad settings.",
  },
  {
    title: "Preferences",
    icon: SlidersHorizontal,
    content:
      "We store small preferences in your browser, such as whether you chose US or metric units, so the site remembers your choice. These stay on your device.",
  },
];

const sections = [
  {
    icon: ShieldCheck,
    title: "What we do not do",
    content: (
      <p className="text-gray-600 leading-relaxed">
        We do not use cookies to read your saved health data, and we do not sell your personal information. Your
        measurements and risk results live in your secured account, not in cookies.
      </p>
    ),
  },
  {
    icon: SlidersHorizontal,
    title: "How to control cookies",
    content: (
      <p className="text-gray-600 leading-relaxed">
        You can clear or block cookies in your browser settings. Blocking essential cookies will sign you out and
        may break parts of the site. For analytics and ads, you can use browser controls, an ad blocker, or the
        Google ad settings linked above.
      </p>
    ),
  },
  {
    icon: FileText,
    title: "Related policies",
    content: (
      <p className="text-gray-600 leading-relaxed">
        For the full picture of how we handle data, read our <Link href="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">Privacy Policy</Link>. For
        the rules of using the service, see our <Link href="/terms-and-conditions" className="text-emerald-700 font-semibold hover:underline">Terms</Link>.
      </p>
    ),
  },
  {
    icon: Mail,
    title: "Contact",
    content: (
      <p className="text-gray-600 leading-relaxed">
        Questions about cookies go to <a href="mailto:krushal.barasiya@calqulate.net" className="text-emerald-700 font-semibold hover:underline">krushal.barasiya@calqulate.net</a>.
      </p>
    ),
  },
];

const nav = [
  { id: "categories", label: "Categories" },
  { id: "what-we-do-not", label: "What we do not do" },
  { id: "control", label: "Control cookies" },
  { id: "related", label: "Related policies" },
  { id: "contact", label: "Contact" },
];

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <Header />
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 md:py-20 max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Cookie Policy</h1>
            <p className="text-sm text-gray-400 mb-6">Last updated {UPDATED}</p>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl">
              Cookies are small files a site stores in your browser. This page lists the cookies and similar tools
              Calqulate.net uses, what each one does, and how you can control them.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl pb-16">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
            {/* Sidebar nav */}
            <nav className="hidden lg:block" aria-label="Cookie policy sections">
              <div className="sticky top-24 space-y-1 border-l-2 border-gray-100 pl-4">
                {nav.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    className="flex items-center gap-1.5 py-1.5 text-sm text-gray-400 hover:text-emerald-700 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 flex-shrink-0" />
                    {n.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Content */}
            <div className="min-w-0">
              {/* The categories we use */}
              <div id="categories" className="scroll-mt-24 mb-8">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 md:p-8">
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-emerald-800">
                    <Cookie className="h-7 w-7" />
                    The categories we use
                  </h2>
                  <div className="space-y-4">
                    {categories.map((c) => (
                      <div key={c.title} className="rounded-xl border border-emerald-100/50 bg-white p-5 shadow-sm">
                        <h3 className="font-bold mb-2 text-gray-800 flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100">
                            <c.icon className="h-3.5 w-3.5 text-emerald-700" />
                          </div>
                          {c.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{c.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {sections.map((s, i) => (
                  <div key={s.title} id={nav[i + 1]?.id} className="scroll-mt-24">
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
                      <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-4 text-gray-800">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                          <s.icon className="h-5 w-5 text-emerald-700" />
                        </div>
                        {s.title}
                      </h2>
                      {s.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom nav */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <span className="text-gray-400">See also:</span>
                  <Link href="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">Privacy Policy</Link>
                  <Link href="/terms-and-conditions" className="text-emerald-700 font-semibold hover:underline">Terms</Link>
                  <Link href="/disclaimer" className="text-emerald-700 font-semibold hover:underline">Disclaimer</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
