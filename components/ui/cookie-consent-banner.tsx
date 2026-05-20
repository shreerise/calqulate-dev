"use client";

import { useState, useEffect } from "react";
import { X, Settings, Check } from "lucide-react";

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function CookieConsentBanner({ onAccept, onDecline }: CookieConsentProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] bg-white border-t border-slate-200 shadow-2xl">
      {/* Main banner */}
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Close button */}
          <button
            onClick={onDecline}
            className="absolute right-2 top-2 sm:right-4 sm:top-4 p-1 rounded-md text-slate-400 hover:text-slate-600 transition"
            aria-label="Dismiss cookie banner"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Cookie icon + text */}
          <div className="flex-1 pr-8 sm:pr-0">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              We use cookies to enhance your experience, serve personalized ads, and analyze traffic.
              By clicking &quot;Accept All&quot;, you consent to our use of cookies.{" "}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-emerald-600 hover:text-emerald-500 font-semibold underline underline-offset-2"
              >
                Cookie Settings
              </button>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onDecline}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition flex items-center gap-1.5"
            >
              <Check className="h-4 w-4" />
              Accept All
            </button>
          </div>
        </div>

        {/* Details panel */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="space-y-3">
              {[
                { name: "Essential", description: "Required for the website to function. Cannot be disabled.", alwaysOn: true },
                { name: "Analytics", description: "Help us understand how visitors interact with our site.", alwaysOn: false },
                { name: "Advertising", description: "Used to deliver relevant ads and measure ad performance.", alwaysOn: false },
              ].map((cookie) => (
                <div key={cookie.name} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{cookie.name} Cookies</p>
                    <p className="text-xs text-slate-500">{cookie.description}</p>
                  </div>
                  <div className={`flex h-6 w-10 items-center rounded-full px-0.5 ${cookie.alwaysOn ? "bg-emerald-600" : "bg-emerald-600"}`}>
                    <div className="h-5 w-5 rounded-full bg-white shadow-sm transform translate-x-0" />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Read our{" "}
              <a href="/privacy-policy" className="text-emerald-600 hover:underline">Privacy Policy</a>{" "}
              and{" "}
              <a href="/terms-and-conditions" className="text-emerald-600 hover:underline">Terms & Conditions</a>{" "}
              for more information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
