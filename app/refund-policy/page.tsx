import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BadgeCheck, Clock, RefreshCw, XCircle, CreditCard, Mail, Scale, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy | Calqulate.net",
  description:
    "Calqulate Vitals comes with a 14-day money-back guarantee. Read how refunds, renewals, and cancellations work for monthly and annual subscriptions.",
  keywords: "refund policy, money-back guarantee, Calqulate Vitals refund, subscription refund, cancel subscription",
  alternates: { canonical: "https://calqulate.net/refund-policy" },
};

const UPDATED = "June 2026";

const nav = [
  { id: "guarantee", label: "14-day guarantee" },
  { id: "how-to-request", label: "How to request" },
  { id: "renewals", label: "Renewals & cancellation" },
  { id: "non-refundable", label: "What isn't refundable" },
  { id: "processing", label: "Processing & method" },
  { id: "your-rights", label: "Your legal rights" },
];

const sections = [
  {
    id: "how-to-request",
    icon: Mail,
    title: "How to request a refund",
    content: (
      <>
        <p className="text-gray-600 leading-relaxed">
          Email us at{" "}
          <a href="mailto:krushal.barasiya@calqulate.net" className="text-emerald-700 font-semibold hover:underline">
            krushal.barasiya@calqulate.net
          </a>{" "}
          from the address on your account, with the word <strong>“Refund”</strong> in the subject line. Include the
          email you signed up with and the approximate date of payment so we can find your order quickly.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          You do not need to give a reason to use the 14-day guarantee, though any feedback helps us improve. You can
          stop future charges at any time from your{" "}
          <Link href="/dashboard/settings" className="text-emerald-700 font-semibold hover:underline">
            billing settings
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "renewals",
    icon: RefreshCw,
    title: "Renewals and cancellation",
    content: (
      <>
        <p className="text-gray-600 leading-relaxed">
          Calqulate Vitals is offered as a <strong>monthly</strong> or <strong>annual</strong> subscription that
          renews automatically until you cancel. Cancelling is one click in your billing settings — no phone call and
          no retention maze.
        </p>
        <ul className="mt-4 space-y-2">
          {[
            "Cancel any time before your renewal date to stop the next charge.",
            "After you cancel, you keep full access until the end of the period you already paid for.",
            "Renewal charges (after your first 14 days) are not refunded, but cancelling means you are never billed again.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2.5 text-gray-600 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
              {t}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "non-refundable",
    icon: XCircle,
    title: "What isn't refundable",
    content: (
      <p className="text-gray-600 leading-relaxed">
        Outside the 14-day window, payments and automatic renewals are generally non-refundable. We also cannot refund
        charges where there is clear evidence of account sharing or abuse of the guarantee (for example, repeated
        subscribe-and-refund cycles). The free calculators and your first metabolic snapshot are always free, so there
        is nothing to refund there. If your situation is unusual, write to us anyway — we review every message.
      </p>
    ),
  },
  {
    id: "processing",
    icon: CreditCard,
    title: "How refunds are processed",
    content: (
      <p className="text-gray-600 leading-relaxed">
        Approved refunds are returned to your <strong>original payment method</strong> through the same gateway you
        paid with — PayPal for international and U.S. card payments, or Razorpay for payments made in India. We process
        approved refunds within <strong>5–10 business days</strong>. Depending on your bank or card issuer, it can take
        a few extra days for the credit to appear on your statement.
      </p>
    ),
  },
  {
    id: "your-rights",
    icon: Scale,
    title: "Your legal rights",
    content: (
      <p className="text-gray-600 leading-relaxed">
        This policy is in addition to any rights you have under consumer-protection law in your country or state. Where
        local law gives you a stronger refund right than this policy, that law applies. Read this page alongside our{" "}
        <Link href="/terms-and-conditions" className="text-emerald-700 font-semibold hover:underline">Terms &amp; Conditions</Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">Privacy Policy</Link>.
      </p>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <Header />
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 md:py-20 max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">Refund Policy</h1>
            <p className="text-sm text-gray-400 mb-6">Last updated {UPDATED}</p>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl">
              We want you to feel confident trying Calqulate Vitals. Every new subscription is backed by a 14-day
              money-back guarantee, and you can cancel any time. This page explains exactly how refunds work.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-6xl pb-16">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
            {/* Sidebar nav */}
            <nav className="hidden lg:block" aria-label="Refund policy sections">
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
              {/* 14-day guarantee callout */}
              <div id="guarantee" className="scroll-mt-24 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 md:p-8 mb-8">
                <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold mb-4 text-emerald-800">
                  <BadgeCheck className="h-7 w-7 flex-shrink-0 text-emerald-600" />
                  14-day money-back guarantee
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  If you are not happy with Calqulate Vitals for any reason, request a full refund within{" "}
                  <strong>14 days of your first payment</strong> and we will refund it in full — no questions asked.
                  This applies to your first subscription payment, whether you chose the monthly or annual plan.
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-700">
                  <Clock className="h-4 w-4" /> The clock starts on the date of your first charge.
                </div>
              </div>

              <div className="space-y-8">
                {sections.map((s) => (
                  <div key={s.id} id={s.id} className="scroll-mt-24">
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
                  <Link href="/terms-and-conditions" className="text-emerald-700 font-semibold hover:underline">Terms &amp; Conditions</Link>
                  <Link href="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">Privacy Policy</Link>
                  <Link href="/pricing" className="text-emerald-700 font-semibold hover:underline">Pricing</Link>
                  <Link href="/contact-us" className="text-emerald-700 font-semibold hover:underline">Contact Us</Link>
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
