export const metadata = {
  title: "Custom Platform Development | Rafay's CodeLume",
  description:
    "End-to-end engineering for complex digital platforms, SaaS applications, and enterprise-grade web solutions.",
};

export default function CustomPlatformsLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Platform Development",
    provider: { "@type": "Organization", name: "Rafay's CodeLume" },
    description:
      "End-to-end engineering for complex digital platforms and SaaS applications.",
    url: "https://www.Rafay's CodeLume.online/services/custom-platforms",
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
