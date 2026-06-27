"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function UnsubscribeInner() {
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function confirm() {
    setStatus("loading");
    try {
      const res = await fetch(`/api/unsubscribe?email=${encodeURIComponent(email)}`, { method: "POST" });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main id="main" className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-bold text-gray-900">
          Calqulate <span className="text-emerald-600">Vitals</span>
        </p>

        {status === "done" ? (
          <>
            <h1 className="mt-6 text-xl font-semibold text-gray-900">You&apos;re unsubscribed</h1>
            <p className="mt-2 text-sm text-gray-600">
              {email ? <strong>{email}</strong> : "Your email"} won&apos;t receive update emails from us anymore.
              We&apos;re sorry to see you go.
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-6 text-xl font-semibold text-gray-900">Unsubscribe from updates?</h1>
            <p className="mt-2 text-sm text-gray-600">
              {email ? (
                <>
                  Confirm you want to stop receiving update emails at <strong>{email}</strong>.
                </>
              ) : (
                "We couldn't read your email address from this link."
              )}
            </p>
            <button
              onClick={confirm}
              disabled={status === "loading" || !email}
              className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
            >
              {status === "loading" ? "Unsubscribing…" : "Confirm unsubscribe"}
            </button>
            {status === "error" && (
              <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
            )}
          </>
        )}

        <a href="/" className="mt-6 inline-block text-sm font-medium text-emerald-600 hover:underline">
          ← Back to Calqulate.net
        </a>
      </div>
    </main>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={null}>
      <UnsubscribeInner />
    </Suspense>
  );
}
