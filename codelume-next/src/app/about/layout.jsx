export const metadata = {
  title: "About | CodeLume",
  description:
    "Learn about Rafay, a freelance web developer and UI/UX designer engineering high-performance digital platforms and driving targeted SEO traffic.",
  openGraph: {
    title: "About | CodeLume",
    description:
      "Learn about Rafay, a freelance web developer and UI/UX designer engineering high-performance digital platforms.",
    url: "https://www.codelume.online/about",
    siteName: "CodeLume",
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
      url: "https://www.codelume.online/about",
      worksFor: {
        "@type": "Organization",
        name: "CodeLume",
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
