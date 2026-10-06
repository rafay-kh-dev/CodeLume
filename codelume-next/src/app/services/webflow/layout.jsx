export const metadata = {
  title: "Webflow Development | CodeLume",
  description:
    "Award-winning, high-performance Webflow websites engineered for fluid animations and total content control.",
};

export default function WebflowLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Webflow Development Services",
    provider: { "@type": "Organization", name: "CodeLume" },
    description:
      "High-performance Webflow websites engineered for fluid animations.",
    url: "https://www.codelume.online/services/webflow",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
