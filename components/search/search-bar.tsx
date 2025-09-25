"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { searchCalculators, type Calculator } from "@/lib/search-data"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SearchBarProps {
  placeholder?: string
  className?: string
  showResults?: boolean
}

export function SearchBar({
  placeholder = "Search calculators...",
  className = "",
  showResults = true,
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Calculator[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchCalculators(query)
      setResults(searchResults.slice(0, 6)) // Limit to 6 results
      setIsOpen(showResults && searchResults.length > 0)
    } else {
      setResults([])
      setIsOpen(false)
    }
    setSelectedIndex(-1)
  }, [query, showResults])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          router.push(results[selectedIndex].href)
          setIsOpen(false)
          setQuery("")
        } else if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query)}`)
          setIsOpen(false)
        }
        break
      case "Escape":
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleResultClick = (calculator: Calculator) => {
    router.push(calculator.href)
    setIsOpen(false)
    setQuery("")
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 shadow-lg">
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {results.map((calculator, index) => (
                <button
                  key={calculator.id}
                  className={`w-full text-left p-3 hover:bg-muted/50 transition-colors border-b last:border-b-0 ${
                    index === selectedIndex ? "bg-muted/50" : ""
                  }`}
                  onClick={() => handleResultClick(calculator)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{calculator.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{calculator.description}</p>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      {calculator.category}
                    </span>
                  </div>
                </button>
              ))}

              {query.trim() && (
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="block p-3 text-center text-sm text-primary hover:bg-muted/50 transition-colors border-t"
                  onClick={() => setIsOpen(false)}
                >
                  View all results for "{query}"
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
