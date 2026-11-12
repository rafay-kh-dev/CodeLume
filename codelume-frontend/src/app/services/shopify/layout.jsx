export const metadata = {
  title: "Shopify & E-Commerce Development | Rafay's CodeLume",
  description:
    "Maximise your conversion rates with lightning-fast, bespoke Headless Shopify storefronts engineered by Rafay's CodeLume.",
};

export default function ShopifyLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Shopify Development",
    provider: { "@type": "Organization", name: "Rafay's CodeLume" },
    description:
      "Maximise conversions with lightning-fast Headless Shopify storefronts.",
    url: "https://www.Rafay's CodeLume.online/services/shopify",
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
