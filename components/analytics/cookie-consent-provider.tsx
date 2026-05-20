"use client";

import { useState, useEffect } from "react";
import { CookieConsentBanner } from "@/components/ui/cookie-consent-banner";

const GTM_ID = "GTM-MNCCJNHF";
const GA_MEASUREMENT_ID = "G-0KV6HQZT4D";
const ADSENSE_ID = "ca-pub-4361792190799561";

function loadScripts() {
  // Google Tag Manager
  const gtmScript = document.createElement("script");
  gtmScript.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `;
  document.head.appendChild(gtmScript);

  // Google Tag Manager noscript
  const noscript = document.createElement("noscript");
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.appendChild(noscript);

  // Google Analytics
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(gaScript);

  const gaConfig = document.createElement("script");
  gaConfig.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `;
  document.head.appendChild(gaConfig);

  // Google AdSense
  const adScript = document.createElement("script");
  adScript.async = true;
  adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
  adScript.crossOrigin = "anonymous";
  document.head.appendChild(adScript);
}

export function CookieConsentProvider() {
  const [consent, setConsent] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted") {
      setConsent(true);
      loadScripts();
    } else if (stored === "declined") {
      setConsent(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent(true);
    setShowBanner(false);
    loadScripts();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setConsent(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return <CookieConsentBanner onAccept={handleAccept} onDecline={handleDecline} />;
}
