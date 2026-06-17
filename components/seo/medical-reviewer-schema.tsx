export function MedicalReviewerSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Dr. Jaydeep Sanghani",
          alternateName: "Jaydeep Sanghani",
          honorificPrefix: "Dr.",
          url: "https://calqulate.net/about-us#dr-jaydeep-sanghani",
          sameAs: [
            "https://www.docindia.org/doctors/rajkot/dr-jaydeep-sanghani-anesthesiology",
            "https://www.urbanpro.com/rajkot/jaydeep-sanghani-anesthesiologist-and-critical-care-specialist-from-aiims-bhubaneswar",
          ],
          image: "https://calqulate.net/dr-jaydeep-sanghani.webp",
          jobTitle: "Critical Care Specialist & Anesthesiologist",
          description:
            "Dr. Jaydeep Sanghani is a critical care specialist and anesthesiologist (MBBS, MD, DNB, PDCC, DrNB) with training from AIIMS Bhubaneswar and AIIMS Rishikesh. He medically reviews health calculators at Calqulate.net to ensure clinical accuracy.",
          medicalSpecialty: ["Anesthesiology", "Critical Care Medicine", "Emergency Medicine"],
          hasCredential: [
            { "@type": "MedicalAudience", name: "MBBS" },
            { "@type": "MedicalAudience", name: "MD Anaesthesiology" },
            { "@type": "MedicalAudience", name: "DNB Anaesthesiology" },
            { "@type": "MedicalAudience", name: "PDCC Critical Care Medicine" },
            { "@type": "MedicalAudience", name: "DrNB Critical Care Medicine" },
          ],
          alumniOf: [
            {
              "@type": "CollegeOrUniversity",
              name: "All India Institute of Medical Sciences, Bhubaneswar",
              sameAs: "https://aiimsbhubaneswar.nic.in/",
            },
            {
              "@type": "CollegeOrUniversity",
              name: "All India Institute of Medical Sciences, Rishikesh",
              sameAs: "https://aiimsrishikesh.edu.in/",
            },
            {
              "@type": "CollegeOrUniversity",
              name: "GMERS Medical College, Patan",
            },
          ],
          knowsAbout: [
            "Anaesthesiology",
            "Critical Care Medicine",
            "Emergency Medicine",
            "Pain Management",
            "Perioperative Care",
            "Airway Management",
            "Physiology",
          ],
        }),
      }}
    />
  )
}

export function MedicalWebPageSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name,
          description,
          url,
          reviewedBy: {
            "@type": "Person",
            name: "Dr. Jaydeep Sanghani",
            honorificPrefix: "Dr.",
            medicalSpecialty: ["Anesthesiology", "Critical Care Medicine"],
          },
          lastReviewed: "2026-06-16",
          mainEntity: {
            "@type": "WebApplication",
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
          },
        }),
      }}
    />
  )
}
