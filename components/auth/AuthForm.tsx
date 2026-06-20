"use client";
import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { TurnstileWidget } from "./TurnstileWidget";

const input = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const onToken = useCallback((t: string) => setToken(t), []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "signup"
            ? { email, password, consent, turnstileToken: token }
            : { email, password, turnstileToken: token },
        ),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      if (mode === "signup" && data.needsConfirmation) {
        setInfo("Check your email to confirm your account, then sign in.");
        return;
      }
      router.push(next);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function oauth(provider: "google" | "azure") {
    setError(null);
    const res = await fetch("/api/auth/oauth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, next }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setError(data.error ?? "Could not start sign-in.");
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-bold">
        {mode === "signup" ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        {mode === "signup" ? "Start tracking your metabolic health." : "Sign in to your dashboard."}
      </p>

      <div className="mt-5 space-y-2">
        <button onClick={() => oauth("google")} className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium hover:bg-gray-50">
          <span aria-hidden>G</span> Continue with Google
        </button>
        <button onClick={() => oauth("azure")} className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium hover:bg-gray-50">
          <span aria-hidden>⊞</span> Continue with Outlook / Microsoft
        </button>
      </div>

      <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
        <div className="h-px flex-1 bg-gray-200" /> or <div className="h-px flex-1 bg-gray-200" />
      </div>

      <form onSubmit={submit} className="space-y-3">
        <label className="block text-sm">
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} autoComplete="email" />
        </label>
        <label className="block text-sm">
          Password
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={input} autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={8} />
        </label>

        {mode === "signup" && (
          <label className="flex items-start gap-2 text-xs text-gray-600">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
            <span>
              I agree to the <Link href="/terms-and-conditions" className="text-blue-600 underline">Terms</Link> and{" "}
              <Link href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</Link>, and understand this is educational, not medical advice.
            </span>
          </label>
        )}

        <TurnstileWidget onToken={onToken} />

        {error && <p className="text-sm text-red-600">{error}</p>}
        {info && <p className="text-sm text-green-600">{info}</p>}

        <button disabled={busy} className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
          {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        {mode === "signup" ? (
          <>Already have an account? <Link href="/login" className="text-blue-600">Sign in</Link></>
        ) : (
          <>New here? <Link href="/signup" className="text-blue-600">Create an account</Link></>
        )}
      </p>
    </div>
  );
}
