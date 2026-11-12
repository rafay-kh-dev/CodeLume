export const metadata = {
  title: "JSON to TypeScript Converter | Rafay's CodeLume",
  description:
    "Instantly convert JSON objects into clean, production-ready TypeScript interfaces. A free, secure developer tool engineered by Rafay's CodeLume.",
};

export default function JsonToTsLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON to TypeScript Converter",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    description:
      "Instantly convert JSON objects into clean TypeScript interfaces.",
    url: "https://www.Rafay's CodeLume.online/tools/json-to-ts",
    creator: {
      "@type": "Organization",
      name: "Rafay's CodeLume",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "AUD",
    },
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
