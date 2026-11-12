export const metadata = {
  title: "About | Rafay's Rafay's CodeLume",
  description:
    "Learn about Rafay, a freelance web developer and UI/UX designer engineering high-performance digital platforms and driving targeted SEO traffic.",
  openGraph: {
    title: "About | Rafay's Rafay's CodeLume",
    description:
      "Learn about Rafay, a freelance web developer and UI/UX designer engineering high-performance digital platforms.",
    url: "https://www.Rafay's CodeLume.online/about",
    siteName: "Rafay's CodeLume",
    type: "website",
  },
};

export default function AboutLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Person",
      name: "Rafay",
      jobTitle: "Freelance Web Developer & UI/UX Designer",
      url: "https://www.Rafay's CodeLume.online/about",
      worksFor: {
        "@type": "Organization",
        name: "Rafay's CodeLume",
      },
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
