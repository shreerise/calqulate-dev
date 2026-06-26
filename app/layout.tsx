import type React from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { OrganizationSchema } from "@/components/seo/structured-data";
import "./globals.css";
import { Suspense } from "react";
import CalculatorPopup from "@/components/ui/calculator-popup";
import ClarityProvider from "@/components/analytics/clarity-provider";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { InstallBanner } from "@/components/pwa/InstallBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://calqulate.net"),
  title: "Calqulate - Professional Health Calculators",
  description:
    "Calculate your health metrics instantly with Calqulate.net — your trusted hub for accurate BMI, body fat, calorie, and ideal weight calculators.",
  keywords: "calqulate.net",
  generator: "Calqulate",
  robots: "index, follow",
  applicationName: "Calqulate",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Calqulate",
  },
  formatDetection: {
    telephone: false,
  },
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
      { url: "/favicon/favicon-32x32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/favicon/favicon-16x16.webp", sizes: "16x16", type: "image/webp" },
      { url: "/logo.webp", sizes: "192x192", type: "image/webp" },
    ],
    apple: "/favicon/apple-touch-icon.webp",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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

        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

      </head>

      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {/* Google Tag Manager — loaded after page becomes interactive */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MNCCJNHF');`
          }}
        />

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MNCCJNHF" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>

        <ClarityProvider />

        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>

        <CalculatorPopup />
        <ChatWidget />
        <ServiceWorkerRegister />
        <InstallBanner />
      </body>
    </html>
  );
}