"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Calculator, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search/search-bar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,} from "@/components/ui/dropdown-menu"

const calculatorCategories = [
  {
    name: "Health",
    calculators: [
      { name: "ABSI Calculator", href: "/calculators/absi-calculator" },
      { name: "Lean Body Mass Calculator", href: "/calculators/lean-body-mass-calculator" },
      { name: "RFM Calculator", href: "/calculators/rfm-calculator" },
      { name: "Ponderal Index Calculator", href: "/calculators/ponderal-index-calculator" },
    ],
  },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Calqulate.net</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Calculators</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {calculatorCategories.map((category) => (
                  <div key={category.name}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{category.name}</div>
                    {category.calculators.map((calc) => (
                      <DropdownMenuItem key={calc.href} asChild>
                        <Link href={calc.href} className="w-full">
                          {calc.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
                    <div className="text-sm font-semibold text-muted-foreground px-2">{category.name}</div>
                    {category.calculators.map((calc) => (
                      <Link
                        key={calc.href}
                        href={calc.href}
                        className="block px-2 py-1 text-sm hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {calc.name}
                      </Link>
                    ))}
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
    </header>
  )
}
