import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BookOpen, Stethoscope, UserCheck, CreditCard, RotateCcw, Gift, Database, Copyright, Activity, AlertTriangle, RefreshCw, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Calqulate.net",
  description:
    "The terms that govern your use of Calqulate.net, the free calculators, and the Calqulate Vitals subscription. Covers accounts, billing, cancellations, acceptable use, and liability.",
  keywords: "terms and conditions, terms of service, Calqulate, subscription terms",
  alternates: { canonical: "https://calqulate.net/terms-and-conditions" },
};

const UPDATED = "June 2026";

const sections = [
  {
    icon: BookOpen,
    title: "Using the service",
    first: true,
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        Calqulate.net gives you free health calculators and a paid service, Calqulate Vitals, that tracks your
        metabolic and cardiovascular numbers over time. You may use the site for your own personal health
        decisions. You agree not to misuse it, scrape it at scale, attempt to break its security, or use it to harm
        others.
      </p>
    ),
  },
  {
    icon: Stethoscope,
    title: "Not medical advice",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        Everything on Calqulate.net is educational. It does not diagnose, treat, or prescribe, and it is not a
        substitute for a licensed clinician. Read the full <Link href="/disclaimer" className="text-emerald-700 font-semibold hover:underline">Disclaimer</Link> before acting
        on any result. GLP-1 dosing in particular must be confirmed with your prescriber.
      </p>
    ),
  },
  {
    icon: UserCheck,
    title: "Accounts",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        You need an account to save history and use paid features. You must be at least 18, give accurate
        information, and keep your password private. You are responsible for activity under your account. Tell us at{" "}
        <a href="mailto:support@calqulate.net" className="text-emerald-700 font-semibold hover:underline">support@calqulate.net</a> if you suspect unauthorized access.
      </p>
    ),
  },
  {
    icon: CreditCard,
    title: "Subscriptions and billing",
    content: (
      <>
        <p className="text-muted-foreground text-base leading-relaxed mb-5">
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
            <li key={item} className="flex gap-2 text-muted-foreground text-base leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: RotateCcw,
    title: "Refunds",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        If something goes wrong or you are not happy, contact us within a reasonable time and we will try to make it
        right. We review refund requests case by case. Where local law gives you a stronger refund right, that law
        applies.
      </p>
    ),
  },
  {
    icon: Gift,
    title: "Free tier",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        The calculators and a one-time snapshot are free and do not require payment. We may change, limit, or retire
        free features over time, and we will avoid breaking links to the calculators where we can.
      </p>
    ),
  },
  {
    icon: Database,
    title: "Your content and data",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        The health data you enter stays yours. You grant us the limited permission needed to store and process it so
        we can run the service for you. You can export or delete it any time, as described in our{" "}
        <Link href="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">Privacy Policy</Link>.
      </p>
    ),
  },
  {
    icon: Copyright,
    title: "Intellectual property",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        The site, its design, copy, and the way our scoring and protocols are presented belong to Calqulate.net. The
        underlying clinical models we use, such as the Pooled Cohort Equations, Framingham, and FINDRISC, are public
        and credited on the relevant pages. You may not copy or resell our content or code.
      </p>
    ),
  },
  {
    icon: Activity,
    title: "Availability",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        We aim to keep the service running, but we do not promise it will always be available or error free. We may
        update, pause, or change features. We are not liable for losses caused by downtime or maintenance.
      </p>
    ),
  },
  {
    icon: AlertTriangle,
    title: "Limitation of liability",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        To the extent the law allows, Calqulate.net is not liable for indirect or consequential losses, or for any
        health outcome that follows from how you use the information here. Our total liability for the paid service
        is limited to what you paid us in the prior twelve months. Nothing in these terms limits liability that
        cannot be limited by law.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    title: "Changes to these terms",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        We may update these terms and will revise the date above. If a change is significant, we will flag it in the
        product or by email. Continuing to use the service after a change means you accept the new terms.
      </p>
    ),
  },
  {
    icon: Mail,
    title: "Contact",
    content: (
      <p className="text-muted-foreground text-base leading-relaxed">
        Questions about these terms go to <a href="mailto:support@calqulate.net" className="text-emerald-700 font-semibold hover:underline">support@calqulate.net</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Terms and Conditions</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated {UPDATED}</p>
          <p className="text-muted-foreground text-lg max-w-2xl mb-12 leading-relaxed">
            These terms set the rules for using Calqulate.net. By using the calculators or subscribing to Calqulate
            Vitals, you agree to them. Read them before you create an account.
          </p>

          <div className="space-y-12">
            {sections.map((s, i) => (
              <div key={s.title}>
                {s.first ? (
                  <h2 className="text-3xl font-bold mb-4 text-emerald-700">{s.title}</h2>
                ) : (
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 pt-8 text-gray-800">
                    <s.icon className="w-8 h-8 text-emerald-700" />
                    {s.title}
                  </h2>
                )}
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
