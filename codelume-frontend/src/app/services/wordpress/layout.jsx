export const metadata = {
  title: "Custom WordPress Development | Rafay's CodeLume",
  description:
    "Bespoke, SEO-optimised WordPress architectures and custom themes designed for speed, security, and scalability.",
};

export default function WordPressLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom WordPress Development",
    provider: { "@type": "Organization", name: "Rafay's CodeLume" },
    description:
      "Bespoke, SEO-optimised WordPress architectures and custom themes.",
    url: "https://www.Rafay's CodeLume.online/services/wordpress",
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
