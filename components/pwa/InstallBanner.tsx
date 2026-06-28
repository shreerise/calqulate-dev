"use client";

import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const installedHandler = () => setInstalled(true);

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferredPrompt(null);
    setDismissed(true);
  };

  if (!deferredPrompt || dismissed || installed) return null;

  return (
    // Compact card, bottom-right ABOVE the chat launcher (bottom-4/5).
    // z-40 so an open chat panel (z-50) covers it instead of overlapping.
    <div className="fixed bottom-20 right-3 sm:right-5 z-40 w-[calc(100%-1.5rem)] max-w-[17rem] animate-slide-up rounded-xl border border-emerald-200 bg-white p-3 shadow-xl">
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-1.5 top-1.5 rounded-md p-0.5 text-gray-400 transition hover:text-gray-600"
        aria-label="Dismiss install banner"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
          <Download className="h-4 w-4 text-emerald-600" />
        </div>
        <p className="pr-4 text-[13px] font-semibold leading-tight text-gray-900">Try the app experience</p>
      </div>

      <p className="mt-1.5 text-[11px] leading-snug text-gray-500">
        No native app yet &mdash; install Calqulate for an app-like experience: offline, faster &amp; reminders.
      </p>

      <button
        onClick={handleInstall}
        className="mt-2 w-full rounded-lg bg-emerald-600 px-3 py-2 text-[13px] font-semibold text-white transition hover:bg-emerald-700"
      >
        Install app
      </button>
    </div>
  );
}
