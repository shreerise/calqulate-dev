import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MessageSquare, HelpCircle, Bug } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - Get Help & Support | Calculator Hub",
  description:
    "Contact Calculator Hub for support, feedback, or questions about our professional calculators. We're here to help.",
  keywords: "contact calculator hub, support, help, feedback, calculator questions",
}

export default function ContactUsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">Contact Us</h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
                Have a question, suggestion, or need help with our calculators? We'd love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Send us a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Question</SelectItem>
                          <SelectItem value="calculator">Calculator Issue</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="business">Business Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us how we can help you..." className="min-h-[120px]" />
                    </div>

                    <Button className="w-full">Send Message</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Quick Help
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Response Time</h4>
                      <p className="text-sm text-muted-foreground">
                        We typically respond to all inquiries within 24 hours during business days.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Business Hours</h4>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM EST
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      Common Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm">Calculator Accuracy</h4>
                      <p className="text-xs text-muted-foreground">
                        Our calculators use industry standards and current market data for reliable estimates.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">New Calculator Requests</h4>
                      <p className="text-xs text-muted-foreground">
                        We regularly add new calculators based on user feedback and demand.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Mobile Compatibility</h4>
                      <p className="text-xs text-muted-foreground">
                        All our calculators are fully responsive and work on mobile devices.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bug className="h-5 w-5" />
                      Report Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Found a bug or calculation error? Please let us know with details about:
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Which calculator you were using</li>
                      <li>• The inputs you entered</li>
                      <li>• What result you expected vs. received</li>
                      <li>• Your device and browser information</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
