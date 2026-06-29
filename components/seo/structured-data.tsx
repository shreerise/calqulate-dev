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
    description: "Professional health calculators — BMI, body fat, calorie, face shape, and body composition tools.",
    url: "https://calqulate.net/",
    logo: "https://calqulate.net/logo.webp",
    founder: [
      {
        "@type": "Person",
        name: "Meet Akabari",
        jobTitle: "Co-Founder",
        url: "https://www.linkedin.com/in/meet-akabari/",
      },
      {
        "@type": "Person",
        name: "Krushal Barasiya",
        jobTitle: "Co-Founder",
        url: "https://www.linkedin.com/in/krushalbarasiya/",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "krushal.barasiya@calqulate.net",
      contactType: "customer service",
    },
  }

  return <StructuredData type="Organization" data={data} />
}

export function ArticleAuthorsSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://calqulate.net/#meet-akabari",
        name: "Meet Akabari",
        url: "https://www.linkedin.com/in/meet-akabari/",
      },
      {
        "@type": "Person",
        "@id": "https://calqulate.net/#krushal-barasiya",
        name: "Krushal Barasiya",
        url: "https://www.linkedin.com/in/krushalbarasiya/",
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
