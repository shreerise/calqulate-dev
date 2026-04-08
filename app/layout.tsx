import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { OrganizationSchema } from "@/components/seo/structured-data";
import "./globals.css";
import { Suspense } from "react";
import CalculatorPopup from "@/components/ui/calculator-popup";

// GTM and GA IDs
const GTM_ID = "GTM-MNCCJNHF";
const GA_MEASUREMENT_ID = "G-0KV6HQZT4D";

export const metadata: Metadata = {
  title: "Calqulate - Professional Health Calculators",
  description:
    "Calculate your health metrics instantly with Calqulate.net — your trusted hub for accurate BMI, body fat, calorie, and ideal weight calculators.",
  keywords: "calqulate.net",
  generator: "Calqulate",
  robots: "index, follow",
  openGraph: {
    title: "Calqulate - Professional Calculators",
    description: "Free online calculators for health improvement",
    type: "website",
    siteName: "Calqulate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calqulate - Professional Calculators",
    description: "Free online calculators for health improvement",
  },
  alternates: {
    canonical: "https://calqulate.net/",
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.jpg",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />

        {/* Google AdSense Verification */}
        <meta name="google-adsense-account" content="ca-pub-4361792190799561" />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,  
          }}
        />

        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4361792190799561"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>

        <CalculatorPopup />
        
        <Analytics />
      </body>
    </html>
  );
}