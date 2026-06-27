import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Cookie, ShieldCheck, SlidersHorizontal, FileText, Mail } from "lucide-react";

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
    content:
      "These keep the site working and cannot be turned off. The main one is your sign-in session, set by our authentication provider so you stay logged in to your Calqulate Vitals account as you move between pages. Cloudflare Turnstile also sets a short-lived token at signup and login to tell humans from bots. Without these, accounts and security would not work.",
  },
  {
    title: "Analytics cookies",
    content:
      "We use Google Tag Manager and Microsoft Clarity to understand which pages people use and where they get stuck. Clarity records anonymized usage so we can improve layout and fix problems. This data is about behavior on the site, not your health inputs.",
  },
  {
    title: "Advertising cookies",
    content:
      "The free calculators are supported in part by Google AdSense, which may set cookies to show relevant ads and measure them. These appear on the free, public pages. You can limit ad personalization through Google's Ad settings.",
  },
  {
    title: "Preferences",
    content:
      "We store small preferences in your browser, such as whether you chose US or metric units, so the site remembers your choice. These stay on your device.",
  },
];

const sections = [
  {
    icon: ShieldCheck,
    title: "What we do not do",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        We do not use cookies to read your saved health data, and we do not sell your personal information. Your
        measurements and risk results live in your secured account, not in cookies.
      </p>
    ),
  },
  {
    icon: SlidersHorizontal,
    title: "How to control cookies",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
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
      <p className="text-muted-foreground text-base leading-relaxed">
        For the full picture of how we handle data, read our <Link href="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">Privacy Policy</Link>. For
        the rules of using the service, see our <Link href="/terms-and-conditions" className="text-emerald-700 font-semibold hover:underline">Terms</Link>.
      </p>
    ),
  },
  {
    icon: Mail,
    title: "Contact",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        Questions about cookies go to <a href="mailto:support@calqulate.net" className="text-emerald-700 font-semibold hover:underline">support@calqulate.net</a>.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main id="main" className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Cookie Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated {UPDATED}</p>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12 leading-relaxed">
            Cookies are small files a site stores in your browser. This page lists the cookies and similar tools
            Calqulate.net uses, what each one does, and how you can control them.
          </p>

          {/* The categories we use */}
          <div className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 pt-8 text-gray-800">
              <Cookie className="w-8 h-8 text-emerald-700" />
              The categories we use
            </h2>
            <div className="space-y-4">
              {categories.map((c) => (
                <div key={c.title} className="rounded-xl border border-gray-200 bg-gray-50/40 p-5">
                  <h3 className="font-bold mb-2 text-gray-800">{c.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{c.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 pt-8 text-gray-800">
                  <s.icon className="w-8 h-8 text-emerald-700" />
                  {s.title}
                </h2>
                {s.content}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
