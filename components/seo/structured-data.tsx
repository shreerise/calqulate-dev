interface StructuredDataProps {
  type: "WebApplication" | "FAQPage" | "Article" | "Organization"
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type,
      ...data,
    }

    return JSON.stringify(baseSchema)
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateSchema() }} />
}

// Specific schema generators
export function CalculatorSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const data = {
    name,
    description,
    url,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "Calqulate",
      url: "https://calqulate.net/",
    },
  }

  return <StructuredData type="WebApplication" data={data} />
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const data = {
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return <StructuredData type="FAQPage" data={data} />
}

export function OrganizationSchema() {
  const data = {
    name: "Calqulate",
    description: "Professional calculators for home improvement and financial planning",
    url: "https://calqulate.net/",
    logo: "https://calculatorhub.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 9265745667",
      contactType: "customer service",
    },
    sameAs: ["https://facebook.com/calculatorhub", "https://twitter.com/calculatorhub"],
  }

  return <StructuredData type="Organization" data={data} />
}
