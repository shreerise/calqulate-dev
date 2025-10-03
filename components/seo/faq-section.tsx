"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  faqs: FAQ[]
}

export function FAQSection({ title = "Frequently Asked Questions", faqs }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <Card className="mt-12">
      <CardHeader>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <CardDescription>Common questions and answers about our calculator</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <Collapsible key={index} open={openItems.includes(index)}>
            <CollapsibleTrigger
              className="flex w-full items-center justify-between rounded-lg border p-4 text-left hover:bg-muted/50 transition-colors"
              onClick={() => toggleItem(index)}
            >
              <h3 className="font-semibold text-base">{faq.question}</h3>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${openItems.includes(index) ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <p className="text-muted-foreground">{faq.answer}</p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  )
}
