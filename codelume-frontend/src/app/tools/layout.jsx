export const metadata = {
  title: "Free Developer Tools & Resources | Rafay's CodeLume",
  description:
    "Access CodeLume’s suite of free premium developer tools, calculators, and utilities designed to streamline your web engineering workflow.",
  openGraph: {
    title: "Free Developer Tools & Resources | Rafay's CodeLume",
    description:
      "Free developer tools and utilities engineered by Rafay's CodeLume to streamline your workflow.",
    url: "https://www.codelume.online/tools",
    siteName: "CodeLume",
    type: "website",
  },
};

export default function ToolsLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Rafay's CodeLume Developer Tools",
    description: "A suite of free premium developer tools and utilities.",
    url: "https://www.codelume.online/tools",
    publisher: {
      "@type": "Organization",
      name: "CodeLume",
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
