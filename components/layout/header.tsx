"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X, Calculator, ChevronDown, Search, ArrowRight } from "lucide-react"
import { SearchBar } from "@/components/search/search-bar"

// ─── Brand colours ────────────────────────────────────────────────────────────
// Primary green : #16a34a  (green-600)
// Active green  : #15803d  (green-700)
// Tint          : #f0fdf4  (green-50)

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  {
    name: "Body Composition",
    slug: "/health/body-composition",
    description: "BMI, body fat, lean mass & weight metrics",
    count: 11,
    calculators: [
      { name: "BMI Calculator", href: "/health/bmi-calculator" },
      { name: "Body Fat Calculator", href: "/health/body-fat-calculator" },
      { name: "Lean Body Mass Calculator", href: "/health/lean-body-mass-calculator" },
      { name: "Body Shape Calculator", href: "/health/body-shape-calculator" },
      { name: "Ideal Body Weight Calculator", href: "/health/ideal-body-weight-calculator" },
      { name: "Adjusted Body Weight Calculator", href: "/health/adjusted-body-weight-calculator" },
      { name: "ABSI Calculator", href: "/health/absi-calculator" },
      { name: "RFM Calculator", href: "/health/rfm-calculator" },
      { name: "Ponderal Index Calculator", href: "/health/ponderal-index-calculator" },
      { name: "Waist-to-Height Ratio Calculator", href: "/health/waist-to-height-ratio-calculator" },
      { name: "Weight Loss % Calculator", href: "/health/weight-loss-percentage-calculator" },
    ],
  },
  {
    name: "Cardio Health",
    slug: "/health/cardio",
    description: "Heart rate, blood pressure & cardiovascular risk",
    count: 8,
    calculators: [
      { name: "Heart Rate Calculator", href: "/health/heart-rate-calculator" },
      { name: "Blood Pressure Calculator", href: "/health/blood-pressure-calculator" },
      { name: "Resting Heart Rate Calculator", href: "/health/resting-heart-rate-calculator" },
      { name: "Heart Age Calculator", href: "/health/heart-age-calculator" },
      { name: "Karvonen Formula Calculator", href: "/health/karvonen-formula-calculator" },
      { name: "Mean Arterial Pressure Calculator", href: "/health/mean-arterial-pressure-calculator" },
      { name: "Pulse Pressure Calculator", href: "/health/pulse-pressure-calculator" },
      { name: "Cholesterol Ratio Calculator", href: "/health/cholesterol-ratio-calculator" },
    ],
  },
  {
    name: "Nutrition & Weight",
    slug: "/health/nutrition",
    description: "Calories, macros, TDEE, BMR & deficit",
    count: 6,
    calculators: [
      { name: "TDEE Calculator", href: "/health/tdee-calculator" },
      { name: "BMR Calculator", href: "/health/bmr-calculator" },
      { name: "Macro Calculator", href: "/health/macro-calculator" },
      { name: "Calorie Deficit Calculator", href: "/health/calorie-deficit-calculator" },
      { name: "Fat Intake Calculator", href: "/health/fat-intake-calculator" },
      { name: "Daily Water Intake Calculator", href: "/health/daily-water-intake-calculator" },
    ],
  },
  {
    name: "Fitness Performance",
    slug: "/health/fitness",
    description: "VO2 max, one-rep max, running pace",
    count: 6,
    calculators: [
      { name: "VO2 Max Calculator", href: "/health/vo2-max-calculator" },
      { name: "One-Rep Max Calculator", href: "/health/one-rep-max-calculator" },
      { name: "Running Pace Calculator", href: "/health/running-pace-calculator" },
      { name: "Calories Burned Calculator", href: "/health/calories-burned-calculator" },
      { name: "Wilks Calculator", href: "/health/wilks-calculator" },
      { name: "Draw Length Calculator", href: "/health/draw-length-calculator" },
    ],
  },
  {
    name: "Disease Risk",
    slug: "/health/disease-risk",
    description: "Diabetes, ASCVD, Framingham & cancer screening",
    count: 9,
    calculators: [
      { name: "Diabetes Risk Calculator", href: "/health/diabetes-risk-calculator" },
      { name: "ASCVD Risk Calculator", href: "/health/ascvd-risk-calculator" },
      { name: "Framingham Risk Score", href: "/health/framingham-risk-score-calculator" },
      { name: "Qrisk3 Calculator", href: "/health/qrisk3-calculator" },
      { name: "Breast Cancer Risk Calculator", href: "/health/breast-cancer-risk-calculator" },
      { name: "Obesity Risk Calculator", href: "/health/obesity-risk-calculator" },
      { name: "Creatinine Clearance Calculator", href: "/health/creatinine-clearance-calculator" },
      { name: "EAG Calculator", href: "/health/estimated-average-glucose-calculator" },
      { name: "GLP-1 Dose Calculator", href: "/health/glp-1-dose-calculator" },
    ],
  },
  // ── Overflow into "More" ───────────────────────────────────────────────────
  {
    name: "Mental Wellness",
    slug: "/health/mental-wellness",
    description: "Sleep cycles, sleep debt & stress analysis",
    count: 3,
    calculators: [
      { name: "Sleep Cycle Calculator", href: "/health/sleep-cycle-calculator" },
      { name: "Sleep Debt Calculator", href: "/health/sleep-debt-calculator" },
      { name: "Stress Level Calculator", href: "/health/stress-level-calculator" },
    ],
  },
  {
    name: "Women's Health",
    slug: "/health/womens-health",
    description: "Ovulation, periods, pregnancy & IVF dates",
    count: 4,
    calculators: [
      { name: "Ovulation Calculator", href: "/health/ovulation-calculator" },
      { name: "Period Cycle Calculator", href: "/health/period-cycle-calculator" },
      { name: "Pregnancy Weight Gain Calculator", href: "/health/pregnancy-weight-gain-calculator" },
      { name: "IVF Pregnancy Due Date Calculator", href: "/health/ivf-pregnancy-due-date-calculator" },
    ],
  },
  {
    name: "Appearance",
    slug: "/health/appearance",
    description: "Face shape, body shape & personal style",
    count: 2,
    calculators: [
      { name: "Face Shape Calculator", href: "/health/face-shape-calculator" },
      { name: "Golden Ratio Face Calculator", href: "/health/golden-ratio-face-calculator" },
    ],
  },
]

const PRIMARY_COUNT = 5
const primaryCategories = categories.slice(0, PRIMARY_COUNT)
const moreCategories = categories.slice(PRIMARY_COUNT)

type Category = (typeof categories)[0]

// ─── Mega Menu ───────────────────────────────────────────────────────────────

function MegaMenu({ category, onClose }: { category: Category; onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-xl">
      <div className="container mx-auto px-6 py-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-gray-900">{category.name}</span>
            <span className="text-xs text-gray-400 hidden sm:inline">{category.description}</span>
          </div>
          <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full flex-shrink-0">
            {category.count} calculators
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-0 mb-4">
          {category.calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              onClick={onClose}
              className="group flex items-center gap-2 py-2 px-2 text-sm text-gray-600 rounded-md hover:text-green-700 hover:bg-green-50 transition-colors duration-100"
            >
              <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-green-500 flex-shrink-0 transition-colors" />
              {calc.name}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-gray-100">
          <Link
            href={category.slug}
            onClick={onClose}
            className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
          >
            View all {category.name} calculators
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── More Dropdown ────────────────────────────────────────────────────────────

function MoreDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden py-2">
      {moreCategories.map((cat, idx) => (
        <div key={cat.name}>
          {/* Category label */}
          <div className="px-4 pt-3 pb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              {cat.name}
            </span>
            <span className="text-[11px] text-gray-300">{cat.count}</span>
          </div>

          {/* All calculators in this category */}
          {cat.calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              onClick={onClose}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors group"
            >
              <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-green-500 flex-shrink-0 transition-colors" />
              {calc.name}
            </Link>
          ))}

          {/* Divider between categories, not after last */}
          {idx < moreCategories.length - 1 && (
            <div className="mx-4 mt-2 border-t border-gray-100" />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Mobile Accordion Item ────────────────────────────────────────────────────

function MobileCategory({ category, onLinkClick }: { category: Category; onLinkClick: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-gray-900">{category.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{category.count} calculators</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-green-600" : "text-gray-400"
          }`}
        />
      </button>

      {open && (
        <div className="bg-gray-50 pb-1">
          {category.calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              onClick={onLinkClick}
              className="flex items-center gap-2.5 px-6 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors"
            >
              <span className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
              {calc.name}
            </Link>
          ))}
          <Link
            href={category.slug}
            onClick={onLinkClick}
            className="flex items-center gap-1 px-6 py-3 text-xs font-semibold text-green-600 hover:text-green-700"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────

export function Header() {
  const [activeCat, setActiveCat] = useState<Category | null>(null)
  const [moreOpen, setMoreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveCat(null)
        setMoreOpen(false)
      }
    }
    const onScroll = () => { setActiveCat(null); setMoreOpen(false) }
    document.addEventListener("mousedown", onOutside)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      document.removeEventListener("mousedown", onOutside)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const startClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveCat(null), 180)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const closeAll = useCallback(() => {
    setActiveCat(null)
    setMoreOpen(false)
    setMobileOpen(false)
    setSearchOpen(false)
  }, [])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm"
    >
      {/* ── Main bar ── */}
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-[60px] items-center gap-4 lg:gap-6">

          {/* Logo */}
          <Link href="/" onClick={closeAll} className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-green-600 group-hover:bg-green-700 transition-colors flex items-center justify-center shadow-sm">
              <Calculator className="h-[18px] w-[18px] text-white" />
            </div>
            <span className="text-[17px] font-bold tracking-tight text-gray-900">
              Calqulate<span className="text-green-600">.NET</span>
            </span>
          </Link>

          {/* ── Desktop nav: 5 categories + More ── */}
          <nav
            className="hidden lg:flex items-center gap-0.5 flex-1"
            onMouseLeave={startClose}
            onMouseEnter={cancelClose}
          >
            {primaryCategories.map((cat) => {
              const active = activeCat?.name === cat.name
              return (
                <button
                  key={cat.name}
                  onMouseEnter={() => { cancelClose(); setActiveCat(cat); setMoreOpen(false) }}
                  onClick={() => { setActiveCat(active ? null : cat); setMoreOpen(false) }}
                  className={`
                    relative flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium rounded-md
                    whitespace-nowrap transition-colors duration-100
                    ${active
                      ? "text-green-700 bg-green-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  {cat.name}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-150
                      ${active ? "rotate-180 text-green-600" : "text-gray-400"}`}
                  />
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-green-500" />
                  )}
                </button>
              )
            })}

            {/* More */}
            <div className="relative">
              <button
                onClick={() => { setMoreOpen((v) => !v); setActiveCat(null) }}
                className={`
                  flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-medium rounded-md
                  whitespace-nowrap transition-colors duration-100
                  ${moreOpen ? "text-green-700 bg-green-50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}
                `}
              >
                More
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-150
                    ${moreOpen ? "rotate-180 text-green-600" : "text-gray-400"}`}
                />
              </button>
              {moreOpen && <MoreDropdown onClose={closeAll} />}
            </div>
          </nav>

          {/* ── Desktop right: search icon + links ── */}
          <div className="hidden lg:flex items-center gap-1 ml-auto flex-shrink-0">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className={`p-2 rounded-md transition-colors ${
                searchOpen ? "bg-green-50 text-green-700" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link href="/about-us" className="px-3 py-2 text-[13.5px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
              About
            </Link>
            <Link href="/contact-us" className="px-3 py-2 text-[13.5px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors">
              Contact
            </Link>
          </div>

          {/* ── Tablet: All Calculators + search ── */}
          <div className="hidden md:flex lg:hidden items-center gap-2 ml-auto">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className="p-2 rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              All Calculators
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* ── Mobile: search + hamburger ── */}
          <div className="flex md:hidden items-center gap-1 ml-auto">
            <button
              onClick={() => { setSearchOpen((v) => !v); setMobileOpen(false) }}
              aria-label="Search"
              className="p-2 rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => { setMobileOpen((v) => !v); setSearchOpen(false) }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ── Inline search bar (desktop, expands below nav row) ── */}
        {searchOpen && (
          <div className="hidden lg:block border-t border-gray-100 py-3">
            <SearchBar placeholder="Search calculators…" className="max-w-sm" />
          </div>
        )}
      </div>

      {/* ── Desktop mega menu ── */}
      <div
        className="hidden lg:block"
        onMouseEnter={cancelClose}
        onMouseLeave={startClose}
      >
        {activeCat && <MegaMenu category={activeCat} onClose={closeAll} />}
      </div>

      {/* ── Tablet dropdown ── */}
      {mobileOpen && (
        <div className="hidden md:block lg:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="container mx-auto px-6 py-5 grid grid-cols-2 gap-x-8 gap-y-5 max-h-[65vh] overflow-y-auto">
            {categories.map((cat) => (
              <div key={cat.name}>
                <Link href={cat.slug} onClick={closeAll} className="text-sm font-semibold text-gray-900 hover:text-green-700 transition-colors">
                  {cat.name}
                </Link>
                <p className="text-xs text-gray-400 mb-2 mt-0.5">{cat.description}</p>
                <ul className="space-y-1">
                  {cat.calculators.slice(0, 4).map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} onClick={closeAll} className="text-xs text-gray-500 hover:text-green-700 transition-colors">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                  {cat.calculators.length > 4 && (
                    <li>
                      <Link href={cat.slug} onClick={closeAll} className="text-xs font-semibold text-green-600 hover:text-green-700">
                        +{cat.calculators.length - 4} more →
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Mobile/tablet search bar ── */}
      {searchOpen && (
        <div className="lg:hidden border-t border-gray-100 px-4 py-3 bg-white">
          <SearchBar placeholder="Search calculators…" className="w-full"/>
        </div>
      )}

      {/* ── Mobile accordion ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white max-h-[75vh] overflow-y-auto">
          {categories.map((cat) => (
            <MobileCategory key={cat.name} category={cat} onLinkClick={closeAll} />
          ))}
          <div className="border-t border-gray-100 px-4 py-3 flex gap-4">
            <Link href="/about-us" onClick={closeAll} className="text-sm font-medium text-gray-600 hover:text-green-700">About</Link>
            <Link href="/contact-us" onClick={closeAll} className="text-sm font-medium text-gray-600 hover:text-green-700">Contact</Link>
          </div>
        </div>
      )}
    </header>
  )
}