"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Calculator, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search/search-bar"

const calculatorCategories = [
  {
    name: "Health",
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
    ],
  },
]

export function Header() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
        setActiveCategory(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* <Image
              src="/logo.png"       
              alt="Calqulate Logo"
              width={180}           // adjust to match your design
              height={100}
              priority
            /> */}
            <Calculator className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Calqulate.NET</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 relative">

            {/* Calculators Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition"
              >
                <span>Calculators</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    showDropdown ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              {showDropdown && (
                <div
                  className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2"
                  onMouseLeave={() => {
                    setShowDropdown(false)
                    setActiveCategory(null)
                  }}
                >
                  {calculatorCategories.map((category) => (
                    <div key={category.name} className="mb-2 last:mb-0">
                      <button
                        onClick={() =>
                          setActiveCategory(
                            activeCategory === category.name ? null : category.name
                          )
                        }
                        className="w-full flex justify-between items-center px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 rounded-md transition"
                      >
                        {category.name}
                        <ChevronRight
                          className={`h-4 w-4 text-gray-500 transition-transform ${
                            activeCategory === category.name ? "rotate-90 text-primary" : ""
                          }`}
                        />
                      </button>

                      {/* Submenu calculators */}
                      {activeCategory === category.name && (
                        <div className="absolute top-0 left-full ml-2 w-64 bg-white border rounded-md shadow-md p-2 animate-slideRight">
                          {category.calculators.map((calc) => (
                            <Link
                              key={calc.href}
                              href={calc.href}
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
                              onClick={() => {
                                setShowDropdown(false)
                                setActiveCategory(null)
                              }}
                            >
                              {calc.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about-us" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact-us" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-6">
            <SearchBar placeholder="Search calculators..." className="w-full" />
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="space-y-4">
              <SearchBar placeholder="Search calculators..." />

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {calculatorCategories.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <button
                      onClick={() =>
                        setActiveCategory(activeCategory === category.name ? null : category.name)
                      }
                      className="w-full flex justify-between items-center px-2 py-2 text-sm font-semibold text-muted-foreground hover:text-primary transition"
                    >
                      {category.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          activeCategory === category.name ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        activeCategory === category.name ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      {category.calculators.map((calc) => (
                        <Link
                          key={calc.href}
                          href={calc.href}
                          className="block pl-5 pr-2 py-1 text-sm text-gray-700 hover:text-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {calc.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <Link
                    href="/about-us"
                    className="block px-2 py-1 text-sm hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/contact-us"
                    className="block px-2 py-1 text-sm hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Smooth Fade Animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.25s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </header>
  )
}
