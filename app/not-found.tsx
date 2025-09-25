import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Calculator className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-4">404</h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                The calculator or page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What can you do?</CardTitle>
                <CardDescription>Here are some helpful options to get you back on track</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                  >
                    <Link href="/">
                      <Home className="h-6 w-6" />
                      <span>Go Home</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                  >
                    <Link href="/search">
                      <Search className="h-6 w-6" />
                      <span>Search Calculators</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                  >
                    <Link href="/contact-us">
                      <Calculator className="h-6 w-6" />
                      <span>Contact Support</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Popular Calculators</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/calculators/tree-removal-cost-calculator">Tree Removal Cost</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/calculators/lawn-mowing-cost-calculator">Lawn Mowing Cost</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/calculators/home-addition-cost-calculator">Home Addition Cost</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
