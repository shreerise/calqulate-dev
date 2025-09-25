import type { Metadata } from "next"
import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SearchResults } from "./search-results"

export const metadata: Metadata = {
  title: "Search Calculators | Calqulate.NET",
  description:
    "Search our comprehensive collection of professional calculators for home improvement and financial planning.",
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Search Calculators</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Find the perfect calculator for your needs from our comprehensive collection.
              </p>
            </div>

            <Suspense fallback={<div className="text-center py-8">Loading search results...</div>}>
              <SearchResults />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
