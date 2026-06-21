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
        "email": "support@calqulate.net",
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

// ─── Validation rules ────────────────────────────────────────────────────────

const NAME_REGEX    = /^[A-Za-z\s\u00C0-\u024F]{2,60}$/
const EMAIL_REGEX   = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
const PHONE_REGEX   = /^\+?[0-9]{7,15}$/          // after stripping spaces/dashes/parens
const COUNTRY_REGEX = /^[A-Za-z\s\u00C0-\u024F]{2,60}$/
const URL_PATTERN   = /https?:\/\//i
const SYMBOL_PATTERN = /[<>{}\[\]\\|]/

function validateName(v: string) {
  if (!NAME_REGEX.test(v.trim())) return "Letters and spaces only, 2–60 characters."
  return ""
}

function validateEmail(v: string) {
  const t = v.trim().toLowerCase()
  if (!EMAIL_REGEX.test(t) || t.length > 254) return "Enter a valid email address (e.g. you@gmail.com)."
  return ""
}

function validateSubject(v: string) {
  const t = v.trim()
  if (t.length < 5 || t.length > 120) return "Subject must be 5–120 characters."
  if (URL_PATTERN.test(t)) return "URLs are not allowed in the subject."
  if (SYMBOL_PATTERN.test(t)) return "Remove special symbols like < > { } [ ]."
  return ""
}

function validatePhone(v: string) {
  if (!v.trim()) return ""                           // optional
  const digits = v.replace(/[\s\-().]/g, "")
  if (!PHONE_REGEX.test(digits)) return "Digits only, 7–15 numbers. You may start with +."
  return ""
}

function validateCountry(v: string) {
  if (!COUNTRY_REGEX.test(v.trim())) return "Letters only, 2–60 characters."
  return ""
}

function validateMessage(v: string) {
  const len = v.trim().length
  if (len < 20) return `Too short. ${20 - len} more character(s) needed.`
  if (len > 1000) return `Too long. Please trim by ${len - 1000} character(s).`
  return ""
}

// ─── Field component ──────────────────────────────────────────────────────────

function FieldHint({ error, value, optional }: { error: string; value: string; optional?: boolean }) {
  if (error) return <p className="text-xs text-red-500 mt-1">{error}</p>
  if (optional && !value.trim()) return <p className="text-xs text-muted-foreground mt-1">Optional. Leave blank if not applicable.</p>
  if (value.trim()) return <p className="text-xs text-green-600 mt-1">Looks good ✓</p>
  return null
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type FormState = {
  name: string
  email: string
  subject: string
  phone: string
  country: string
  message: string
}

type TouchState = Partial<Record<keyof FormState, boolean>>

export default function ContactUsPage() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", subject: "", phone: "", country: "", message: "",
  })
  const [touched, setTouched] = useState<TouchState>({})
  const [status, setStatus] = useState("")

  const errors: Partial<Record<keyof FormState, string>> = {
    name:    validateName(form.name),
    email:   validateEmail(form.email),
    subject: validateSubject(form.subject),
    phone:   validatePhone(form.phone),
    country: validateCountry(form.country),
    message: validateMessage(form.message),
  }

  const isValid = Object.values(errors).every(e => !e)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target

    // Phone: block non-numeric characters (allow + at start, spaces, dashes, parens)
    if (id === "phone") {
      if (!/^[0-9+\s\-().]*$/.test(value)) return
    }

    // Name / Country: block digits and non-letter characters
    if (id === "name" || id === "country") {
      if (/[0-9@#$%^&*_=[\]{}\\|<>]/.test(value)) return
    }

    setForm(prev => ({ ...prev, [id]: value }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched(prev => ({ ...prev, [e.target.id]: true }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mark all fields as touched so errors show
    setTouched({ name: true, email: true, subject: true, phone: true, country: true, message: true })
    if (!isValid) { setStatus("Please fix the errors above."); return }

    setStatus("Sending…")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("Message sent successfully ✅")
        setForm({ name: "", email: "", subject: "", phone: "", country: "", message: "" })
        setTouched({})
      } else {
        setStatus("Failed to send message ❌")
      }
    } catch {
      setStatus("Error sending message ❌")
    }
  }

  const fieldClass = (key: keyof FormState) => {
    if (!touched[key]) return ""
    return errors[key] ? "border-red-500 focus-visible:ring-red-300" : "border-green-500 focus-visible:ring-green-300"
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <StructuredData />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact us</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Need help with a calculator, your Calqulate Vitals account, billing, or your data? Send us a note and we
                will reply. For account and subscription questions, email <strong>support@calqulate.net</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">support@calqulate.net</p>
                    <p className="mt-1 text-sm text-muted-foreground">krushal.barasiya@calqulate.net</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5" /> Phone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">+91 6351007253</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Address</CardTitle>
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
                      Fill out this quick form and we&apos;ll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={form.name} onChange={handleChange} onBlur={handleBlur}
                          className={fieldClass("name")} placeholder="e.g. Krushal Barasiya" required />
                        {touched.name && <FieldHint error={errors.name!} value={form.name} />}
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
                          className={fieldClass("email")} placeholder="you@gmail.com" required />
                        {touched.email && <FieldHint error={errors.email!} value={form.email} />}
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" value={form.subject} onChange={handleChange} onBlur={handleBlur}
                          className={fieldClass("subject")} placeholder="Brief topic of your message" required />
                        {touched.subject && <FieldHint error={errors.subject!} value={form.subject} />}
                      </div>

                      <div>
                        <Label htmlFor="phone">
                          Phone <span className="text-xs text-muted-foreground font-normal">(optional)</span>
                        </Label>
                        <Input id="phone" type="tel" value={form.phone} onChange={handleChange} onBlur={handleBlur}
                          className={fieldClass("phone")} placeholder="+91 6351007253" inputMode="tel" />
                        {touched.phone && <FieldHint error={errors.phone!} value={form.phone} optional />}
                      </div>

                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" value={form.country} onChange={handleChange} onBlur={handleBlur}
                          className={fieldClass("country")} placeholder="India" required />
                        {touched.country && <FieldHint error={errors.country!} value={form.country} />}
                      </div>

                      <div>
                        <Label htmlFor="message">
                          Message
                          <span className="text-xs text-muted-foreground font-normal ml-2">
                            ({form.message.trim().length}/1000)
                          </span>
                        </Label>
                        <Textarea id="message" value={form.message} onChange={handleChange} onBlur={handleBlur}
                          className={`min-h-[120px] ${fieldClass("message")}`}
                          placeholder="Describe your question or feedback…" required />
                        {touched.message && <FieldHint error={errors.message!} value={form.message} />}
                      </div>

                      <Button type="submit" className="w-full" disabled={status === "Sending…"}>
                        {status === "Sending…" ? "Sending…" : "Send Message"}
                      </Button>

                      {status && status !== "Sending…" && (
                        <p className={`text-sm text-center mt-2 ${status.includes("✅") ? "text-green-600" : "text-red-500"}`}>
                          {status}
                        </p>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12">
              <Card>
                <CardHeader><CardTitle>Privacy Note</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We respect your privacy. Any contact details you share will be used only to reply to your
                    message and will never be sold or shared with third parties.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8 text-muted-foreground">
              <p>Thanks for reaching out. The Calqulate.net team</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}