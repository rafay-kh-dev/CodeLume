export const metadata = {
  title: "SVG to React Converter | CodeLume",
  description:
    "Instantly convert raw SVG files into clean, reusable React components. A free web engineering tool by CodeLume.",
};

// Yeh hissa miss hone ki wajah se error aa raha tha
export default function SvgToReactLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SVG to React Component Converter",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    description: "Instantly convert SVG files into reusable React components.",
    url: "https://www.codelume.online/tools/svg-to-react",
    creator: {
      "@type": "Organization",
      name: "CodeLume",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
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
