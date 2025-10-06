import type { Metadata } from "next"
import { Suspense } from "react"
import Head from "next/head"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SearchResults } from "./search-results"
import { getAllCategories, searchCalculators } from "@/lib/search-data"

export const metadata: Metadata = {
  title: "Search Calculators | Calqulate.NET",
  description:
    "Find and use professional online calculators for finance, health, home improvement, and more — all in one place at Calqulate.NET.",
  openGraph: {
    title: "Search Calculators | Calqulate.NET",
    description:
      "Quickly find accurate calculators for every category — health, fitness, finance, and more.",
    url: "https://calqulate.net/search",
    siteName: "Calqulate.NET",
    images: [
      {
        url: "https://calqulate.net/og-image.png",
        width: 1200,
        height: 630,
        alt: "Calqulate.NET — Search Calculators",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

// ✅ Generate structured JSON-LD schema dynamically
function generateSchema() {
  const calculators = searchCalculators("")
  const schema = calculators.map((calc) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calc.title,
    applicationCategory: calc.category,
    operatingSystem: "Web",
    description: calc.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `https://calqulate.net${calc.href}`,
  }))
  return schema
}

export default function SearchPage() {
  const schema = generateSchema()

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                  Search Calculators
                </h1>
                <p className="text-lg text-muted-foreground text-pretty">
                  Find the perfect calculator for your needs from our
                  comprehensive collection.
                </p>
              </div>

              <Suspense
                fallback={<div className="text-center py-8">Loading search results...</div>}
              >
                <SearchResults />
              </Suspense>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
