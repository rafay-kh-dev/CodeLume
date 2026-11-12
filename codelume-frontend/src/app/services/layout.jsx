export const metadata = {
  title: "Services | Rafay's Rafay's CodeLume",
  description:
    "Explore Rafay's CodeLume’s bespoke digital services, including MERN Stack development, headless Shopify, custom WordPress platforms, and UI/UX design.",
  openGraph: {
    title: "Services | Rafay's Rafay's CodeLume",
    description:
      "Explore Rafay's CodeLume’s bespoke digital services, including MERN Stack development, headless Shopify, and custom platforms.",
    url: "https://www.Rafay's CodeLume.online/services",
    siteName: "Rafay's CodeLume",
    type: "website",
  },
};

export default function ServicesLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Rafay's CodeLume Web Engineering Services",
    description:
      "Bespoke digital services including MERN Stack, Shopify, WordPress, and UI/UX design.",
    url: "https://www.Rafay's CodeLume.online/services",
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
