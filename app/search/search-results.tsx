"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SearchBar } from "@/components/search/search-bar"
import {
  searchCalculators,
  getAllCategories,
  getCalculatorsByCategory,
  type Calculator,
} from "@/lib/search-data"
import { Home, DollarSign, CalculatorIcon } from "lucide-react"
import Link from "next/link"

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""

  const [results, setResults] = useState<Calculator[]>([])
  const [selectedCategory, setSelectedCategory] = useState(category)
  const [isLoading, setIsLoading] = useState(true)

  const categories = getAllCategories()

  useEffect(() => {
    setIsLoading(true)
    let searchResults: Calculator[] = []

    if (query) {
      searchResults = searchCalculators(query)
    } else if (selectedCategory) {
      searchResults = getCalculatorsByCategory(selectedCategory)
    } else {
      searchResults = searchCalculators("") // all calculators
    }

    setResults(searchResults)
    setIsLoading(false)
  }, [query, selectedCategory])

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Home Improvement":
        return <Home className="h-4 w-4" />
      case "Financial":
        return <DollarSign className="h-4 w-4" />
      default:
        return <CalculatorIcon className="h-4 w-4" />
    }
  }

  if (isLoading) return <div className="text-center py-8">Loading search results...</div>

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <SearchBar placeholder="Search calculators..." showResults={false} />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("")}
        >
          All Categories
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="flex items-center gap-2"
          >
            {getCategoryIcon(cat)}
            {cat}
          </Button>
        ))}
      </div>

      {/* Search Info */}
      <div className="text-center space-y-1">
        {query && (
          <p className="text-muted-foreground">
            Search results for <strong>"{query}"</strong>
          </p>
        )}
        {selectedCategory && !query && (
          <p className="text-muted-foreground">
            Showing <strong>{selectedCategory}</strong> calculators
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          {results.length} calculator{results.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((calculator) => (
            <Card
              key={calculator.id}
              className="flex flex-col justify-between hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg w-fit">
                      {getCategoryIcon(calculator.category)}
                    </div>
                    <Badge variant="secondary">{calculator.category}</Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold mb-2">
                    {calculator.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {calculator.description}
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="mt-auto">
                <div className="space-y-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {calculator.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button asChild className="w-full">
                    <Link href={calculator.href}>
                      <CalculatorIcon className="h-4 w-4 mr-2" />
                      Use Calculator
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <CalculatorIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No calculators found</h3>
          <p className="text-muted-foreground mb-4">
            {query
              ? `No calculators match your search for "${query}"`
              : "No calculators found in this category"}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCategory("")
              window.history.pushState({}, "", "/search")
            }}
          >
            View All Calculators
          </Button>
        </div>
      )}
    </div>
  )
}
