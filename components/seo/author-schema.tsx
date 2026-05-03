export function AuthorSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Meet Akabari",
          url: "https://calqulate.net/about-us",
          sameAs: [
            "https://www.linkedin.com/in/meet-akabari/",
          ],
          image: "https://calqulate.net/meet.akabari.jpeg",
          jobTitle: "Web Developer & Health Enthusiast",
          description:
            "Meet Akabari is a web developer and health enthusiast creating accurate, privacy-first health and fitness calculators at Calqulate.net.",
          expertise: [
            "Web Development",
            "Health & Fitness",
            "Calculator Development",
            "Health Science"
          ],
          knowsAbout: [
            "Health Calculations",
            "Fitness Metrics",
            "Body Composition",
            "Nutrition",
            "Wellness Tracking"
          ]
        }),
      }}
    />
  )
}
