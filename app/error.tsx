"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <AlertTriangle className="h-24 w-24 text-destructive mx-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Something went wrong</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                We encountered an error while loading this page. This might be a temporary issue.
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What happened?</CardTitle>
                <CardDescription>There was an unexpected error while processing your request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={reset} className="h-auto p-4 flex flex-col items-center space-y-2">
                    <RefreshCw className="h-6 w-6" />
                    <span>Try Again</span>
                  </Button>

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
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              If this problem persists, please{" "}
              <Link href="/contact-us" className="text-primary hover:underline">
                contact our support team
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
