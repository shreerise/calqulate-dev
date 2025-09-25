import Link from "next/link"
import { Calculator, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Calculator className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Calculator Hub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional calculators for home improvement and financial planning. Get accurate estimates and make
              informed decisions.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@calculatorhub.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-555-CALC-HUB</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Nationwide Service</span>
              </div>
            </div>
          </div>

          {/* Calculators */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Popular Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/calculators/tree-removal-cost-calculator"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tree Removal Cost
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/lawn-mowing-cost-calculator"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Lawn Mowing Cost
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators/home-addition-cost-calculator"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home Addition Cost
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  View All Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-muted-foreground hover:text-primary transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">24/7 Support</span>
              </li>
              <li>
                <span className="text-muted-foreground">Free to Use</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} Calculator Hub. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Made with ❤️ for professionals</span>
              <span>•</span>
              <span>Trusted by thousands</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
