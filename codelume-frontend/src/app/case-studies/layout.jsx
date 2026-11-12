export const metadata = {
  title: "Case Studies | Rafay's Rafay's CodeLume",
  description:
    "Explore bespoke digital platforms, scalable web applications, and high-converting UI/UX designs engineered by Rafay's CodeLume.",
};

export default function CaseStudiesLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Case Studies",
    description:
      "Explore bespoke digital platforms and high-converting UI/UX designs.",
    url: "https://www.Rafay's CodeLume.online/case-studies",
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
