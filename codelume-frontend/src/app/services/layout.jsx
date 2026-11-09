export const metadata = {
  title: "Services | CodeLume",
  description:
    "Explore CodeLume’s bespoke digital services, including MERN Stack development, headless Shopify, custom WordPress platforms, and UI/UX design.",
  openGraph: {
    title: "Services | CodeLume",
    description:
      "Explore CodeLume’s bespoke digital services, including MERN Stack development, headless Shopify, and custom platforms.",
    url: "https://www.codelume.online/services",
    siteName: "CodeLume",
    type: "website",
  },
};

export default function ServicesLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CodeLume Web Engineering Services",
    description:
      "Bespoke digital services including MERN Stack, Shopify, WordPress, and UI/UX design.",
    url: "https://www.codelume.online/services",
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
