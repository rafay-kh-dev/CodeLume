export const metadata = {
  title: "Custom WordPress Development | CodeLume",
  description:
    "Bespoke, SEO-optimised WordPress architectures and custom themes designed for speed, security, and scalability.",
};

export default function WordPressLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom WordPress Development",
    provider: { "@type": "Organization", name: "CodeLume" },
    description:
      "Bespoke, SEO-optimised WordPress architectures and custom themes.",
    url: "https://www.codelume.online/services/wordpress",
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
