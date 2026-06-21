import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Calqulate.net",
  description:
    "The terms that govern your use of Calqulate.net, the free calculators, and the Calqulate Vitals subscription. Covers accounts, billing, cancellations, acceptable use, and liability.",
  keywords: "terms and conditions, terms of service, Calqulate, subscription terms",
  alternates: { canonical: "https://calqulate.net/terms-and-conditions" },
};

const UPDATED = "June 2026";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-white py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Terms and Conditions</h1>
            <p className="mt-2 text-sm text-gray-500">Last updated {UPDATED}</p>
            <p className="mt-4 text-lg text-gray-600">
              These terms set the rules for using Calqulate.net. By using the calculators or subscribing to Calqulate
              Vitals, you agree to them. Read them before you create an account.
            </p>
          </div>
        </section>

        <article className="container mx-auto max-w-3xl px-4 py-10 prose prose-slate prose-headings:font-bold prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline">
          <h2>Using the service</h2>
          <p>
            Calqulate.net gives you free health calculators and a paid service, Calqulate Vitals, that tracks your
            metabolic and cardiovascular numbers over time. You may use the site for your own personal health
            decisions. You agree not to misuse it, scrape it at scale, attempt to break its security, or use it to harm
            others.
          </p>

          <h2>Not medical advice</h2>
          <p>
            Everything on Calqulate.net is educational. It does not diagnose, treat, or prescribe, and it is not a
            substitute for a licensed clinician. Read the full <Link href="/disclaimer">Disclaimer</Link> before acting
            on any result. GLP-1 dosing in particular must be confirmed with your prescriber.
          </p>

          <h2>Accounts</h2>
          <p>
            You need an account to save history and use paid features. You must be at least 18, give accurate
            information, and keep your password private. You are responsible for activity under your account. Tell us at{" "}
            <a href="mailto:support@calqulate.net">support@calqulate.net</a> if you suspect unauthorized access.
          </p>

          <h2>Subscriptions and billing</h2>
          <p>
            Calqulate Vitals is one plan, billed monthly or yearly through Stripe. By subscribing, you authorize Stripe
            to charge your payment method on a recurring basis until you cancel. Prices are shown on the{" "}
            <Link href="/pricing">pricing page</Link> and may change with notice for future billing periods.
          </p>
          <ul>
            <li>Your plan renews automatically at the end of each period unless you cancel before it renews.</li>
            <li>You can cancel any time from your billing settings. Cancellation stops future charges.</li>
            <li>After cancelling, you keep access until the end of the period you already paid for.</li>
            <li>We do not store your card details. Stripe handles payment data on its hosted systems.</li>
          </ul>

          <h2>Refunds</h2>
          <p>
            If something goes wrong or you are not happy, contact us within a reasonable time and we will try to make it
            right. We review refund requests case by case. Where local law gives you a stronger refund right, that law
            applies.
          </p>

          <h2>Free tier</h2>
          <p>
            The calculators and a one-time snapshot are free and do not require payment. We may change, limit, or retire
            free features over time, and we will avoid breaking links to the calculators where we can.
          </p>

          <h2>Your content and data</h2>
          <p>
            The health data you enter stays yours. You grant us the limited permission needed to store and process it so
            we can run the service for you. You can export or delete it any time, as described in our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The site, its design, copy, and the way our scoring and protocols are presented belong to Calqulate.net. The
            underlying clinical models we use, such as the Pooled Cohort Equations, Framingham, and FINDRISC, are public
            and credited on the relevant pages. You may not copy or resell our content or code.
          </p>

          <h2>Availability</h2>
          <p>
            We aim to keep the service running, but we do not promise it will always be available or error free. We may
            update, pause, or change features. We are not liable for losses caused by downtime or maintenance.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent the law allows, Calqulate.net is not liable for indirect or consequential losses, or for any
            health outcome that follows from how you use the information here. Our total liability for the paid service
            is limited to what you paid us in the prior twelve months. Nothing in these terms limits liability that
            cannot be limited by law.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms and will revise the date above. If a change is significant, we will flag it in the
            product or by email. Continuing to use the service after a change means you accept the new terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms go to <a href="mailto:support@calqulate.net">support@calqulate.net</a>.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
