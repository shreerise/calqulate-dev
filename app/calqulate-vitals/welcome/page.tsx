import type { Metadata } from "next";
import Link from "next/link";
import {
  PartyPopper, HeartPulse, Syringe, Dumbbell, Beef, Compass, Activity,
  ShieldCheck, BookOpen, LayoutDashboard, ArrowRight, CheckCircle2,
} from "lucide-react";
import { ConfettiCelebration } from "@/components/vitals/ConfettiCelebration";

/** Green (standard) Help Guide CTA + gold (premium palette) Dashboard CTA. */
const HELP_BTN =
  "inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-500";
const DASH_BTN =
  "inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-light to-gold px-6 py-3.5 text-sm font-bold text-gold-ink shadow-[0_8px_20px_rgba(245,158,11,.35)] transition-all duration-150 hover:-translate-y-0.5";

function NextStepButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link href="/dashboard/guide" className={HELP_BTN}>
        <BookOpen className="h-4 w-4" /> Start with the Help Guide
      </Link>
      <Link href="/dashboard" className={DASH_BTN}>
        <LayoutDashboard className="h-4 w-4" /> Go to my Dashboard <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Welcome to Calqulate Vitals",
  description:
    "You've unlocked Calqulate Vitals — your personal companion for the GLP-1 journey: dose monitoring, fat-vs-muscle tracking, heart age and a personal coach.",
  robots: { index: false, follow: false },
};

const FEATURES = [
  { icon: Syringe, title: "Dose monitoring & reminders", body: "Log every shot in seconds and get reminded before the next one is due — never lose track of your schedule." },
  { icon: Dumbbell, title: "Fat loss vs. muscle loss", body: "Track body composition so you can see you're losing fat, not the muscle that keeps you strong and younger." },
  { icon: Beef, title: "Protein estimator", body: "Know exactly how much protein you need each day to protect lean muscle while the weight comes off." },
  { icon: HeartPulse, title: "Heart age tracker", body: "Watch your heart age fall as your numbers improve — the real measure of feeling and looking younger." },
  { icon: Activity, title: "Medication-level insight", body: "See how much medication is active between shots, so rising cravings finally make sense." },
  { icon: Compass, title: "Your personal coach", body: "Guided, adaptive missions that walk you through the dashboard and help you understand what to do next." },
];

export default function CalqulateVitalsWelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-emerald-50 via-white to-white px-4 py-12 sm:py-16">
      <div className="relative w-full max-w-3xl">
        <ConfettiCelebration />
        {/* Wordmark */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <HeartPulse className="h-6 w-6 text-emerald-600" />
          <span className="text-lg font-bold text-gray-900">
            Calqulate <span className="text-emerald-600">Vitals</span>
          </span>
        </div>

        {/* Congratulations hero */}
        <div className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-[0_12px_40px_rgba(16,185,129,.12)] sm:p-10">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <PartyPopper className="h-8 w-8" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Payment confirmed</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Congratulations — you've unlocked Calqulate Vitals
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600">
            Welcome aboard. Calqulate Vitals is now your companion for the whole GLP-1 journey — monitoring your
            doses, protecting your muscle, and turning the scale into real progress you can see.
          </p>

          {/* Tagline */}
          <div className="mx-auto mt-6 max-w-xl rounded-2xl bg-emerald-50/80 px-5 py-4">
            <p className="text-sm font-medium leading-relaxed text-emerald-900">
              “We're here because our product is now part of <span className="font-bold">your</span> GLP-1 journey —
              to help you feel and look younger, and to watch your heart age fall along the way.”
            </p>
          </div>

          {/* Primary next steps — top of page */}
          <div className="mx-auto mt-7 max-w-xl">
            <NextStepButtons />
          </div>
        </div>

        {/* What you now have */}
        <h2 className="mt-10 text-center text-lg font-bold text-gray-900">Here's what you now have</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-gray-500">{f.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Our promise */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
          <ShieldCheck className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-600" />
          <div>
            <p className="text-sm font-bold text-emerald-900">Our promise to you</p>
            <p className="mt-1 text-sm leading-relaxed text-emerald-900/80">
              Your data is yours and it stays safe. Everything you log is backed up the moment you save it and syncs
              across every device — so even if you change your phone, <strong>nothing is ever lost</strong>. Export
              or delete it anytime. We never sell your data.
            </p>
          </div>
        </div>

        <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-xs text-gray-400">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          New here? The Help Guide walks you through your first dose, weight and goal in about a minute.
        </p>
      </div>
    </div>
  );
}
