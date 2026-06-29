import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Shield, Database, Target, Share2, Clock, FileText, Lock, Users, Globe, RefreshCw, Mail, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Calqulate.net",
  description:
    "How Calqulate.net collects, uses, and protects your data across the free calculators and the Calqulate Vitals service. Includes your GDPR and CCPA rights, data export and account deletion.",
  keywords: "privacy policy, data protection, Calqulate, health data, GDPR, CCPA",
  alternates: { canonical: "https://calqulate.net/privacy-policy" },
};

const UPDATED = "June 2026";

const nav = [
  { id: "who-we-are", label: "Who we are" },
  { id: "what-we-collect", label: "What we collect" },
  { id: "why-we-use-it", label: "Why we use it" },
  { id: "who-processes-data", label: "Who processes data" },
  { id: "how-long", label: "How long we keep it" },
  { id: "rights", label: "Your rights" },
  { id: "security", label: "Security" },
  { id: "children", label: "Children" },
  { id: "transfers", label: "International transfers" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

const sections = [
  {
    id: "who-we-are",
    icon: Shield,
    title: "Who we are",
    first: true,
    content: (
      <p className="text-gray-600 leading-relaxed">
        Calqulate.net runs free health calculators and Calqulate Vitals, a metabolic and cardiovascular tracking
        service. When this policy says &ldquo;we&rdquo; or &ldquo;us,&rdquo; it means the team that operates calqulate.net. You can reach us
        at <a href="mailto:krushal.barasiya@calqulate.net" className="text-emerald-700 font-semibold hover:underline">krushal.barasiya@calqulate.net</a> for any privacy question.
      </p>
    ),
  },
  {
    id: "what-we-collect",
    icon: Database,
    title: "What we collect",
    content: (
      <>
        <p className="text-gray-600 leading-relaxed mb-6">
          How much we hold depends on how you use the site.
        </p>
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Using the free calculators</h3>
            <p className="text-gray-600 leading-relaxed">
              You can run any calculator without an account. The numbers you type are used to produce a result and are not
              saved to a profile. Our stateless compute endpoint processes the inputs and returns the result. We log a
              short-lived IP address for rate limiting and abuse prevention, and nothing more from that interaction.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Creating a Calqulate Vitals account</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              When you sign up, we store the data needed to run the service for you:
            </p>
            <ul className="space-y-2">
              {[
                "Account details: your email, and your name or profile picture if you sign in with Google or Microsoft.",
                "Health inputs you choose to save: measurements, lab values, body composition, and the risk results we compute from them.",
                "Reports and protocols you generate, such as a doctor PDF or a GLP-1 plan.",
                "Subscription status and your Stripe customer ID. We never see or store your card number.",
                "Notification preferences and, if you opt in, your push subscription.",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-gray-600 leading-relaxed">
                  <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">Technical data</h3>
            <p className="text-gray-600 leading-relaxed">
              Like most sites, we receive IP address, device and browser type, and basic usage events through the
              analytics tools described in our <Link href="/cookie-policy" className="text-emerald-700 font-semibold hover:underline">Cookie Policy</Link>.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "why-we-use-it",
    icon: Target,
    title: "Why we use it",
    content: (
      <>
        <ul className="space-y-2 mb-5">
          {[
            "To run the calculators and compute your scores and risk.",
            "To save your history and show your trend if you are a Vitals member.",
            "To process payments, manage your subscription, and send service emails.",
            "To send your weekly progress email and optional notifications, only if you turn them on.",
            "To keep the site secure, prevent abuse, and fix problems.",
          ].map((item) => (
            <li key={item} className="flex gap-2 text-gray-600 leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 leading-relaxed">
          Under GDPR, our legal bases are your consent, the performance of our contract with you for paid features,
          and our legitimate interest in keeping the service safe and working.
        </p>
      </>
    ),
  },
  {
    id: "who-processes-data",
    icon: Share2,
    title: "Who processes data for us",
    content: (
      <>
        <p className="text-gray-600 leading-relaxed mb-4">
          We do not sell your personal information. We share data only with the providers that make the service run:
        </p>
        <ul className="space-y-2">
          {[
            <><strong className="text-gray-800">Supabase</strong> for authentication and the database that holds your account and health rows.</>,
            <><strong className="text-gray-800">Stripe</strong> for payments and subscription billing.</>,
            <><strong className="text-gray-800">Cloudflare Turnstile</strong> to block bots at signup and login.</>,
            <><strong className="text-gray-800">Email delivery</strong> through our SMTP provider for account and weekly digest emails.</>,
            <><strong className="text-gray-800">Google</strong> (Tag Manager, AdSense) and <strong className="text-gray-800">Microsoft Clarity</strong> for analytics and ads, as set out in the Cookie Policy.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-gray-600 leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "how-long",
    icon: Clock,
    title: "How long we keep it",
    content: (
      <p className="text-gray-600 leading-relaxed">
        We keep your account data while your account is active. If you delete your account, we remove your profile,
        measurements, risk results, reports, and subscription rows, then delete your login. Some records may persist
        briefly in backups before they age out, and we may retain limited billing records where the law requires it.
      </p>
    ),
  },
  {
    id: "rights",
    icon: FileText,
    title: "Your rights and controls",
    content: (
      <>
        <p className="text-gray-600 leading-relaxed mb-4">
          You stay in control of your data.
        </p>
        <ul className="space-y-3 mb-5">
          {[
            { label: "Export", desc: "download everything we hold about you as a JSON file from your settings." },
            { label: "Delete", desc: "permanently erase your account and all health data from your settings. This cannot be undone." },
            { label: "Access and correction", desc: "view and edit your profile any time, or email us." },
            { label: "GDPR", desc: "you can object to or restrict processing and withdraw consent." },
            { label: "CCPA", desc: "we do not sell personal information. You can request access or deletion using the same tools." },
          ].map((item) => (
            <li key={item.label} className="flex gap-2 text-gray-600 leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
              <span><strong className="text-gray-800">{item.label}:</strong> {item.desc}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-600 leading-relaxed">
          Manage all of this from <Link href="/dashboard/settings" className="text-emerald-700 font-semibold hover:underline">your settings</Link>, or contact us if you need help.
        </p>
      </>
    ),
  },
  {
    id: "security",
    icon: Lock,
    title: "Security",
    content: (
      <p className="text-gray-600 leading-relaxed">
        Health rows are protected with row-level security so each account can only read its own data. Traffic is
        encrypted in transit, payments run through Stripe&rsquo;s hosted checkout, and signups are screened for bots. No
        system is perfect, so we also ask you to use a strong password and keep it private.
      </p>
    ),
  },
  {
    id: "children",
    icon: Users,
    title: "Children",
    content: (
      <p className="text-gray-600 leading-relaxed">
        Calqulate Vitals is built for adults and is not directed at anyone under 18. We do not knowingly collect
        data from children. If you believe a minor has created an account, contact us and we will remove it.
      </p>
    ),
  },
  {
    id: "transfers",
    icon: Globe,
    title: "International transfers",
    content: (
      <p className="text-gray-600 leading-relaxed">
        Our providers may process data in the United States and other countries. Where required, we rely on standard
        contractual protections so your data keeps the same level of care wherever it is handled.
      </p>
    ),
  },
  {
    id: "changes",
    icon: RefreshCw,
    title: "Changes to this policy",
    content: (
      <p className="text-gray-600 leading-relaxed">
        We will update this page when our practices change and revise the date at the top. Major changes will be
        highlighted in the product or by email.
      </p>
    ),
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact",
    content: (
      <p className="text-gray-600 leading-relaxed">
        Questions or requests go to <a href="mailto:krushal.barasiya@calqulate.net" className="text-emerald-700 font-semibold hover:underline">krushal.barasiya@calqulate.net</a>. We read every
        message and reply.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <Header />
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 md:py-20 max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Privacy Policy</h1>
            <p className="text-sm text-gray-400 mb-6">Last updated {UPDATED}</p>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl">
              This policy explains what Calqulate.net collects, why we collect it, and the control you have over your
              data. It covers both the free calculators and the paid Calqulate Vitals service.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl pb-16">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
            {/* Sidebar nav */}
            <nav className="hidden lg:block" aria-label="Privacy policy sections">
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
              <div className="space-y-8">
                {sections.map((s) => (
                  <div key={s.id} id={s.id} className="scroll-mt-24">
                    {s.first ? (
                      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-emerald-800">{s.title}</h2>
                        {s.content}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm">
                        <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-4 text-gray-800">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                            <s.icon className="h-5 w-5 text-emerald-700" />
                          </div>
                          {s.title}
                        </h2>
                        {s.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom nav */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <span className="text-gray-400">See also:</span>
                  <Link href="/terms-and-conditions" className="text-emerald-700 font-semibold hover:underline">Terms</Link>
                  <Link href="/disclaimer" className="text-emerald-700 font-semibold hover:underline">Disclaimer</Link>
                  <Link href="/cookie-policy" className="text-emerald-700 font-semibold hover:underline">Cookie Policy</Link>
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
