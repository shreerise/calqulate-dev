"use client";
import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget (script-injected, no npm dependency).
 * Calls onToken with the verification token. If no site key is configured,
 * it transparently no-ops with a "dev" token so local development works.
 */
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

export function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      onToken("dev"); // no key in dev -> server allows in non-production
      return;
    }
    const id = "cf-turnstile-script";
    function render() {
      if (ref.current && window.turnstile) {
        ref.current.innerHTML = "";
        window.turnstile.render(ref.current, {
          sitekey: siteKey,
          callback: (token: string) => onToken(token),
          "error-callback": () => onToken(""),
          "expired-callback": () => onToken(""),
        });
      }
    }
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      s.onload = render;
      document.head.appendChild(s);
    } else {
      render();
    }
  }, [siteKey, onToken]);

  if (!siteKey) return null;
  return <div ref={ref} className="my-2" />;
}
