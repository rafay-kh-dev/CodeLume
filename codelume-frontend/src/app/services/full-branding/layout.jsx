export const metadata = {
  title: "Full Brand Identity & Strategy | Rafay's CodeLume",
  description:
    "Comprehensive digital branding, logo design, and visual strategy tailored to position you as an industry leader.",
};

export default function FullBrandingLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Full Brand Identity",
    provider: { "@type": "Organization", name: "Rafay's CodeLume" },
    description:
      "Comprehensive digital branding, logo design, and visual strategy.",
    url: "https://www.Rafay's CodeLume.online/services/full-branding",
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
