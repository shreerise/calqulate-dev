import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Calqulate.net",
  description:
    "How Calqulate.net collects, uses, and protects your data across the free calculators and the Calqulate Vitals service. Includes your GDPR and CCPA rights, data export and account deletion.",
  keywords: "privacy policy, data protection, Calqulate, health data, GDPR, CCPA",
  alternates: { canonical: "https://calqulate.net/privacy-policy" },
};

const UPDATED = "June 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-white py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Privacy Policy</h1>
            <p className="mt-2 text-sm text-gray-500">Last updated {UPDATED}</p>
            <p className="mt-4 text-lg text-gray-600">
              This policy explains what Calqulate.net collects, why we collect it, and the control you have over your
              data. It covers both the free calculators and the paid Calqulate Vitals service.
            </p>
          </div>
        </section>

        <article className="container mx-auto max-w-3xl px-4 py-10 prose prose-slate prose-headings:font-bold prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline">
          <h2>Who we are</h2>
          <p>
            Calqulate.net runs free health calculators and Calqulate Vitals, a metabolic and cardiovascular tracking
            service. When this policy says "we" or "us," it means the team that operates calqulate.net. You can reach us
            at <a href="mailto:support@calqulate.net">support@calqulate.net</a> for any privacy question.
          </p>

          <h2>What we collect</h2>
          <p>How much we hold depends on how you use the site.</p>
          <h3>Using the free calculators</h3>
          <p>
            You can run any calculator without an account. The numbers you type are used to produce a result and are not
            saved to a profile. Our stateless compute endpoint processes the inputs and returns the result. We log a
            short-lived IP address for rate limiting and abuse prevention, and nothing more from that interaction.
          </p>
          <h3>Creating a Calqulate Vitals account</h3>
          <p>When you sign up, we store the data needed to run the service for you:</p>
          <ul>
            <li>Account details: your email, and your name or profile picture if you sign in with Google or Microsoft.</li>
            <li>Health inputs you choose to save: measurements, lab values, body composition, and the risk results we compute from them.</li>
            <li>Reports and protocols you generate, such as a doctor PDF or a GLP-1 plan.</li>
            <li>Subscription status and your Stripe customer ID. We never see or store your card number.</li>
            <li>Notification preferences and, if you opt in, your push subscription.</li>
          </ul>
          <h3>Technical data</h3>
          <p>
            Like most sites, we receive IP address, device and browser type, and basic usage events through the
            analytics tools described in our <Link href="/cookie-policy">Cookie Policy</Link>.
          </p>

          <h2>Why we use it</h2>
          <ul>
            <li>To run the calculators and compute your scores and risk.</li>
            <li>To save your history and show your trend if you are a Vitals member.</li>
            <li>To process payments, manage your subscription, and send service emails.</li>
            <li>To send your weekly progress email and optional notifications, only if you turn them on.</li>
            <li>To keep the site secure, prevent abuse, and fix problems.</li>
          </ul>
          <p>
            Under GDPR, our legal bases are your consent, the performance of our contract with you for paid features,
            and our legitimate interest in keeping the service safe and working.
          </p>

          <h2>Who processes data for us</h2>
          <p>We do not sell your personal information. We share data only with the providers that make the service run:</p>
          <ul>
            <li><strong>Supabase</strong> for authentication and the database that holds your account and health rows.</li>
            <li><strong>Stripe</strong> for payments and subscription billing.</li>
            <li><strong>Cloudflare Turnstile</strong> to block bots at signup and login.</li>
            <li><strong>Email delivery</strong> through our SMTP provider for account and weekly digest emails.</li>
            <li><strong>Google</strong> (Tag Manager, AdSense) and <strong>Microsoft Clarity</strong> for analytics and ads, as set out in the Cookie Policy.</li>
          </ul>

          <h2>How long we keep it</h2>
          <p>
            We keep your account data while your account is active. If you delete your account, we remove your profile,
            measurements, risk results, reports, and subscription rows, then delete your login. Some records may persist
            briefly in backups before they age out, and we may retain limited billing records where the law requires it.
          </p>

          <h2>Your rights and controls</h2>
          <p>You stay in control of your data.</p>
          <ul>
            <li><strong>Export:</strong> download everything we hold about you as a JSON file from your settings.</li>
            <li><strong>Delete:</strong> permanently erase your account and all health data from your settings. This cannot be undone.</li>
            <li><strong>Access and correction:</strong> view and edit your profile any time, or email us.</li>
            <li><strong>GDPR:</strong> you can object to or restrict processing and withdraw consent.</li>
            <li><strong>CCPA:</strong> we do not sell personal information. You can request access or deletion using the same tools.</li>
          </ul>
          <p>
            Manage all of this from <Link href="/dashboard/settings">your settings</Link>, or contact us if you need help.
          </p>

          <h2>Security</h2>
          <p>
            Health rows are protected with row-level security so each account can only read its own data. Traffic is
            encrypted in transit, payments run through Stripe's hosted checkout, and signups are screened for bots. No
            system is perfect, so we also ask you to use a strong password and keep it private.
          </p>

          <h2>Children</h2>
          <p>
            Calqulate Vitals is built for adults and is not directed at anyone under 18. We do not knowingly collect
            data from children. If you believe a minor has created an account, contact us and we will remove it.
          </p>

          <h2>International transfers</h2>
          <p>
            Our providers may process data in the United States and other countries. Where required, we rely on standard
            contractual protections so your data keeps the same level of care wherever it is handled.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We will update this page when our practices change and revise the date at the top. Major changes will be
            highlighted in the product or by email.
          </p>

          <h2>Contact</h2>
          <p>
            Questions or requests go to <a href="mailto:support@calqulate.net">support@calqulate.net</a>. We read every
            message and reply.
          </p>

          <p className="text-sm text-gray-400">
            This page describes our data practices. It is not legal advice. See our{" "}
            <Link href="/terms-and-conditions">Terms</Link>, <Link href="/disclaimer">Disclaimer</Link>, and{" "}
            <Link href="/cookie-policy">Cookie Policy</Link>.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
