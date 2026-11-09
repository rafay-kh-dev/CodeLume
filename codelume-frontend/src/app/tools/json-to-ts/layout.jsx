export const metadata = {
  title: "JSON to TypeScript Converter | CodeLume",
  description:
    "Instantly convert JSON objects into clean, production-ready TypeScript interfaces. A free, secure developer tool engineered by CodeLume.",
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
    url: "https://www.codelume.online/tools/json-to-ts",
    creator: {
      "@type": "Organization",
      name: "CodeLume",
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
