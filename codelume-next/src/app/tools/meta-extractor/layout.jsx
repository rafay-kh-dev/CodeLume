export const metadata = {
  title: "Website Meta Tags Extractor & SEO Checker | CodeLume",
  description:
    "Instantly extract and analyse SEO metadata, Open Graph tags, and page structure from any URL. A free SEO engineering tool by CodeLume.",
};

export default function MetaExtractorLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Website Meta Tags Extractor",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    description:
      "Instantly extract and analyse SEO metadata and Open Graph tags from any URL.",
    url: "https://www.codelume.online/tools/meta-extractor",
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
