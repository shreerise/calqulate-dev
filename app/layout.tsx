import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { OrganizationSchema } from "@/components/seo/structured-data";
import "./globals.css";
import { Suspense } from "react";
import CalculatorPopup from "@/components/ui/calculator-popup";
import ClarityProvider from "@/components/analytics/clarity-provider";
import { CookieConsentProvider } from "@/components/analytics/cookie-consent-provider";
import { AdUnit } from "@/components/ads/ad-unit";
import { NATIVE_AD, BANNER_320x50, BANNER_720x90 } from "@/components/ads/ad-codes";

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

      </head>

      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased pb-[60px] md:pb-0`}
      >
        {/* 720x90 Leaderboard - top of every page, desktop only */}
        <div className="hidden md:block bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-center">
              <AdUnit html={BANNER_720x90} />
            </div>
          </div>
        </div>

        <ClarityProvider />

        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>

        <CalculatorPopup />
        
        <Analytics />

        <CookieConsentProvider />

        {/* 320x50 Mobile Sticky Banner - visible only on small screens */}
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
          <AdUnit html={BANNER_320x50} className="mx-auto" />
        </div>
      </body>
    </html>
  );
}