"use client";

import { useState, useEffect } from "react";
import { CookieConsentBanner } from "@/components/ui/cookie-consent-banner";

const GTM_ID = "GTM-MNCCJNHF";
const ADSENSE_ID = "ca-pub-4361792190799561";

export function CookieConsentProvider() {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    // Google Tag Manager — loads immediately, no consent gate
    const gtmScript = document.createElement("script");
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
    document.head.appendChild(gtmScript);

    // GTM noscript iframe
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);

    // Google AdSense
    const adScript = document.createElement("script");
    adScript.async = true;
    adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
    adScript.crossOrigin = "anonymous";
    document.head.appendChild(adScript);
  }, []);

  const handleDismiss = () => setShowBanner(false);

  if (!showBanner) return null;

  return <CookieConsentBanner onAccept={handleDismiss} onDecline={handleDismiss} />;
}
