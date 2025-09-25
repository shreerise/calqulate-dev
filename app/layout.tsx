import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { OrganizationSchema } from "@/components/seo/structured-data"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Calqulate - Professional Health & Fitness Calculators",
  description:
    "Free online calculators for health , fitness and more. Get accurate estimates for tree removal, lawn care, and construction projects.",
  keywords: "calculator, cost calculator, home improvement, financial calculator, tree removal cost, lawn mowing cost",
  generator: "Calqulate",
  robots: "index, follow",
  openGraph: {
    title: "Calqulate - Professional Calculators",
    description: "Free online calculators for home improvement and financial planning",
    type: "website",
    siteName: "Calqulate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calqulate - Professional Calculators",
    description: "Free online calculators for home improvement and financial planning",
  },
  alternates: {
    canonical: "https://calqulate.net/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
