import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BookOpen, Stethoscope, UserCheck, CreditCard, RotateCcw, Gift, Database, Copyright, Activity, AlertTriangle, RefreshCw, Mail, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Calqulate.net",
  description:
    "The terms that govern your use of Calqulate.net, the free calculators, and the Calqulate Vitals subscription. Covers accounts, billing, cancellations, acceptable use, and liability.",
  keywords: "terms and conditions, terms of service, Calqulate, subscription terms",
  alternates: { canonical: "https://calqulate.net/terms-and-conditions" },
};

const UPDATED = "June 2026";

const nav = [
  { id: "using-the-service", label: "Using the service" },
  { id: "not-medical-advice", label: "Not medical advice" },
  { id: "accounts", label: "Accounts" },
  { id: "subscriptions", label: "Billing" },
  { id: "refunds", label: "Refunds" },
  { id: "free-tier", label: "Free tier" },
  { id: "your-content", label: "Your data" },
  { id: "intellectual-property", label: "IP" },
  { id: "availability", label: "Availability" },
  { id: "liability", label: "Liability" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

const sections = [
  {
    id: "using-the-service",
    icon: BookOpen,
    title: "Using the service",
    first: true,
    content: (
      <p className="text-gray-600 leading-relaxed">
        Calqulate.net gives you free health calculators and a paid service, Calqulate Vitals, that tracks your
        metabolic and cardiovascular numbers over time. You may use the site for your own personal health
        decisions. You agree not to misuse it, scrape it at scale, attempt to break its security, or use it to harm
        others.
      </p>
    ),
  },
  {
    id: "not-medical-advice",
    icon: Stethoscope,
    title: "Not medical advice",
    content: (
      <p className="text-gray-600 leading-relaxed">
        Everything on Calqulate.net is educational. It does not diagnose, treat, or prescribe, and it is not a
        substitute for a licensed clinician. Read the full <Link href="/disclaimer" className="text-emerald-700 font-semibold hover:underline">Disclaimer</Link> before acting
        on any result. GLP-1 dosing in particular must be confirmed with your prescriber.
      </p>
    ),
  },
  {
    id: "accounts",
    icon: UserCheck,
    title: "Accounts",
    content: (
      <p className="text-gray-600 leading-relaxed">
        You need an account to save history and use paid features. You must be at least 18, give accurate
        information, and keep your password private. You are responsible for activity under your account. Tell us at{" "}
        <a href="mailto:krushal.barasiya@calqulate.net" className="text-emerald-700 font-semibold hover:underline">krushal.barasiya@calqulate.net</a> if you suspect unauthorized access.
      </p>
    ),
  },
  {
    id: "subscriptions",
    icon: CreditCard,
    title: "Subscriptions and billing",
    content: (
      <>
        <p className="text-gray-600 leading-relaxed mb-5">
          Calqulate Vitals is one plan, billed monthly or yearly through Stripe. By subscribing, you authorize Stripe
          to charge your payment method on a recurring basis until you cancel. Prices are shown on the{" "}
          <Link href="/pricing" className="text-emerald-700 font-semibold hover:underline">pricing page</Link> and may change with notice for future billing periods.
        </p>
        <ul className="space-y-2">
          {[
            "Your plan renews automatically at the end of each period unless you cancel before it renews.",
            "You can cancel any time from your billing settings. Cancellation stops future charges.",
            "After cancelling, you keep access until the end of the period you already paid for.",
            "We do not store your card details. Stripe handles payment data on its hosted systems.",
          ].map((item) => (
            <li key={item} className="flex gap-2 text-gray-600 leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "refunds",
    icon: RotateCcw,
    title: "Refunds",
    content: (
      <p className="text-gray-600 leading-relaxed">
        If something goes wrong or you are not happy, contact us within a reasonable time and we will try to make it
        right. We review refund requests case by case. Where local law gives you a stronger refund right, that law
        applies.
      </p>
    ),
  },
  {
    id: "free-tier",
    icon: Gift,
    title: "Free tier",
    content: (
      <p className="text-gray-600 leading-relaxed">
        The calculators and a one-time snapshot are free and do not require payment. We may change, limit, or retire
        free features over time, and we will avoid breaking links to the calculators where we can.
      </p>
    ),
  },
  {
    id: "your-content",
    icon: Database,
    title: "Your content and data",
    content: (
      <p className="text-gray-600 leading-relaxed">
        The health data you enter stays yours. You grant us the limited permission needed to store and process it so
        we can run the service for you. You can export or delete it any time, as described in our{" "}
        <Link href="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    icon: Copyright,
    title: "Intellectual property",
    content: (
      <p className="text-gray-600 leading-relaxed">
        The site, its design, copy, and the way our scoring and protocols are presented belong to Calqulate.net. The
        underlying clinical models we use, such as the Pooled Cohort Equations, Framingham, and FINDRISC, are public
        and credited on the relevant pages. You may not copy or resell our content or code.
      </p>
    ),
  },
  {
    id: "availability",
    icon: Activity,
    title: "Availability",
    content: (
      <p className="text-gray-600 leading-relaxed">
        We aim to keep the service running, but we do not promise it will always be available or error free. We may
        update, pause, or change features. We are not liable for losses caused by downtime or maintenance.
      </p>
    ),
  },
  {
    id: "liability",
    icon: AlertTriangle,
    title: "Limitation of liability",
    content: (
      <p className="text-gray-600 leading-relaxed">
        To the extent the law allows, Calqulate.net is not liable for indirect or consequential losses, or for any
        health outcome that follows from how you use the information here. Our total liability for the paid service
        is limited to what you paid us in the prior twelve months. Nothing in these terms limits liability that
        cannot be limited by law.
      </p>
    ),
  },
  {
    id: "changes",
    icon: RefreshCw,
    title: "Changes to these terms",
    content: (
      <p className="text-gray-600 leading-relaxed">
        We may update these terms and will revise the date above. If a change is significant, we will flag it in the
        product or by email. Continuing to use the service after a change means you accept the new terms.
      </p>
    ),
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact",
    content: (
      <p className="text-gray-600 leading-relaxed">
        Questions about these terms go to <a href="mailto:krushal.barasiya@calqulate.net" className="text-emerald-700 font-semibold hover:underline">krushal.barasiya@calqulate.net</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <Header />
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 md:py-20 max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Terms and Conditions</h1>
            <p className="text-sm text-gray-400 mb-6">Last updated {UPDATED}</p>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl">
              These terms set the rules for using Calqulate.net. By using the calculators or subscribing to Calqulate
              Vitals, you agree to them. Read them before you create an account.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl pb-16">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
            {/* Sidebar nav */}
            <nav className="hidden lg:block" aria-label="Terms sections">
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
                  <Link href="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">Privacy Policy</Link>
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
