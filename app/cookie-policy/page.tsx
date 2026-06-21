import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Cookie Policy | Calqulate.net",
  description:
    "What cookies and similar tools Calqulate.net uses, why we use them, and how to control them. Covers essential sign-in cookies, analytics, and advertising.",
  keywords: "cookie policy, cookies, tracking, Calqulate, AdSense, Clarity",
  alternates: { canonical: "https://calqulate.net/cookie-policy" },
};

const UPDATED = "June 2026";

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-white py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Cookie Policy</h1>
            <p className="mt-2 text-sm text-gray-500">Last updated {UPDATED}</p>
            <p className="mt-4 text-lg text-gray-600">
              Cookies are small files a site stores in your browser. This page lists the cookies and similar tools
              Calqulate.net uses, what each one does, and how you can control them.
            </p>
          </div>
        </section>

        <article className="container mx-auto max-w-3xl px-4 py-10 prose prose-slate prose-headings:font-bold prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline">
          <h2>The categories we use</h2>

          <h3>Essential cookies</h3>
          <p>
            These keep the site working and cannot be turned off. The main one is your sign-in session, set by our
            authentication provider so you stay logged in to your Calqulate Vitals account as you move between pages.
            Cloudflare Turnstile also sets a short-lived token at signup and login to tell humans from bots. Without
            these, accounts and security would not work.
          </p>

          <h3>Analytics cookies</h3>
          <p>
            We use Google Tag Manager and Microsoft Clarity to understand which pages people use and where they get
            stuck. Clarity records anonymized usage so we can improve layout and fix problems. This data is about
            behavior on the site, not your health inputs.
          </p>

          <h3>Advertising cookies</h3>
          <p>
            The free calculators are supported in part by Google AdSense, which may set cookies to show relevant ads and
            measure them. These appear on the free, public pages. You can limit ad personalization through{" "}
            <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google's Ad settings</a>.
          </p>

          <h3>Preferences</h3>
          <p>
            We store small preferences in your browser, such as whether you chose US or metric units, so the site
            remembers your choice. These stay on your device.
          </p>

          <h2>What we do not do</h2>
          <p>
            We do not use cookies to read your saved health data, and we do not sell your personal information. Your
            measurements and risk results live in your secured account, not in cookies.
          </p>

          <h2>How to control cookies</h2>
          <p>
            You can clear or block cookies in your browser settings. Blocking essential cookies will sign you out and
            may break parts of the site. For analytics and ads, you can use browser controls, an ad blocker, or the
            Google ad settings linked above.
          </p>

          <h2>Related policies</h2>
          <p>
            For the full picture of how we handle data, read our <Link href="/privacy-policy">Privacy Policy</Link>. For
            the rules of using the service, see our <Link href="/terms-and-conditions">Terms</Link>.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about cookies go to <a href="mailto:support@calqulate.net">support@calqulate.net</a>.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
