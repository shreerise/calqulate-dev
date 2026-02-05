"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Calculator, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search/search-bar"

const calculatorCategories = [
  {
    name: "Health",
    slug: "/health",
    calculators: [
      { name: "ABSI Calculator", href: "/health/absi-calculator" },
      { name: "Lean Body Mass Calculator", href: "/health/lean-body-mass-calculator" },
      { name: "RFM Calculator", href: "/health/rfm-calculator" },
      { name: "Ponderal Index Calculator", href: "/health/ponderal-index-calculator" },
      { name: "Adjusted Body Weight Calculator", href: "/health/adjusted-body-weight-calculator" },
      { name: "Karvonen Formula Calculator", href: "/health/karvonen-formula-calculator" },
      { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
      { name: "Draw Length Calculator", href: "/health/draw-length-calculator" },
      { name: "Face Shape Calculator", href: "/health/face-shape-calculator" },
      { name: "Cholesterol Ratio Calculator", href: "/health/cholesterol-ratio-calculator" },
      { name: "Heart Rate Calculator", href: "/health/heart-rate-calculator" },
      { name: "Creatinine Clearance Calculator", href: "/health/creatinine-clearance-calculator" },
      { name: "Pregnancy Weight Gain Calculator", href: "/health/pregnancy-weight-gain-calculator" },
      { name: "Fat Intake Calculator", href: "/health/fat-intake-calculator" },
      { name: "Mean Arterial Pressure Calculator", href: "/health/mean-arterial-pressure-calculator" },
      { name: "Framingham Risk Score Calculator", href: "/health/framingham-risk-score-calculator" },
      { name: "Pulse Pressure Calculator", href: "/health/pulse-pressure-calculator" },
      { name: "ASCVD Risk Calculator", href: "/health/ascvd-risk-calculator" },
      { name: "Qrisk3 Calculator", href: "/health/qrisk3-calculator" },
      { name: "TDEE Calculator", href: "/health/tdee-calculator" },
      { name: "Macro Calculator", href: "/health/macro-calculator" },
      { name: "One-Rep Max Calculator", href: "/health/one-rep-max-calculator" },
      { name: "VO2 Max Calculator", href: "/health/vo2-max-calculator" },
      { name: "Wilks Calculator", href: "/health/wilks-calculator" },
      { name: "BMI Calculator", href: "/health/bmi-calculator" },
      { name: "Age Calculator", href: "/health/age-calculator" },
    ],
  },
]

export function Header() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
        setActiveCategory(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Calqulate.NET</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 relative">
            {/* Calculators */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((v) => !v)}
                className="flex items-center space-x-1 text-sm font-medium hover:text-primary"
              >
                <span>Calculators</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showDropdown ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              {showDropdown && (
                <div className="absolute left-0 mt-2 flex bg-white border rounded-lg shadow-lg z-50">
                  {/* Categories */}
                  <div className="w-48 border-r p-2">
                    {calculatorCategories.map((category) => (
                      <button
                        key={category.name}
                        onMouseEnter={() => setActiveCategory(category.name)}
                        onClick={() => setActiveCategory(category.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md ${
                          activeCategory === category.name
                            ? "bg-gray-100 font-semibold"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {category.name}
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                    ))}
                  </div>

                  {/* Submenu */}
                  {calculatorCategories.map(
                    (category) =>
                      activeCategory === category.name && (
                        <div
                          key={category.name}
                          className="
                            w-80 p-2
                            max-h-[50vh] overflow-y-auto
                          "
                        >
                          {category.calculators.map((calc) => (
                            <Link
                              key={calc.href}
                              href={calc.href}
                              className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                              onClick={() => {
                                setShowDropdown(false)
                                setActiveCategory(null)
                              }}
                            >
                              {calc.name}
                            </Link>
                          ))}

                          <div className="mt-2 border-t pt-2">
                            <Link
                              href="/search"
                              className="block px-3 py-2 text-sm font-medium text-primary hover:underline"
                              onClick={() => {
                                setShowDropdown(false)
                                setActiveCategory(null)
                              }}
                            >
                              View all Health Calculators →
                            </Link>
                          </div>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>

            <Link href="/about-us" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/contact-us" className="text-sm font-medium hover:text-primary ">
              Contact
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <SearchBar placeholder="Search calculators..." className="w-full" />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            <SearchBar placeholder="Search calculators..." />

            {calculatorCategories.map((category) => (
              <div key={category.name}>
                <div className="px-2 py-2 text-sm font-semibold">
                  {category.name}
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                  {category.calculators.map((calc) => (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      className="block px-4 py-1 text-sm hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/search"
                  className="block px-4 py-2 text-sm font-medium text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View all Health Calculators →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
