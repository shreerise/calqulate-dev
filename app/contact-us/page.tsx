"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

// Structured Data for SEO (JSON-LD)
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Calqulate.net",
      "url": "https://calqulate.net",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "shreerise@gmail.com",
        "telephone": "+91-6351007253",
        "contactType": "customer support",
        "areaServed": "Worldwide",
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rajkot",
        "addressCountry": "India"
      }
    }
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    country: "",
    message: "",
  })
  const [status, setStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("Sending...")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("Message sent successfully ✅")
        setForm({ name: "", email: "", subject: "", phone: "", country: "", message: "" })
      } else {
        setStatus("Failed to send message ❌")
      }
    } catch (err) {
      setStatus("Error sending message ❌")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <StructuredData />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Have a question, suggestion, or need help using a calculator? We’d love to hear from you.
                Reach out to <strong>Krushal</strong> and <strong>Meet</strong> at Calqulate.net —
                simple, friendly help is just an email or call away.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">shreerise@gmail.com</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Phone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">+91 6351007253</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Rajkot, India</p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                      Prefer using our site? Fill out this quick form and we’ll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={form.name} onChange={handleChange} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={form.email} onChange={handleChange} required />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" value={form.subject} onChange={handleChange} required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input id="phone" value={form.phone} onChange={handleChange} />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" value={form.country} onChange={handleChange} required />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" value={form.message} onChange={handleChange} className="min-h-[120px]" required />
                      </div>
                      <Button type="submit" className="w-full">Send Message</Button>
                      {status && <p className="text-sm text-center mt-2">{status}</p>}
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Privacy Note */}
            <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Note</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We respect your privacy. Any contact details you share will be used only to reply to your
                    message and will never be sold or shared with third parties.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Signature */}
            <div className="text-center mt-8 text-muted-foreground">
              <p>
                Thanks for reaching out — <strong>Krushal & Meet</strong>, Calqulate.net
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
