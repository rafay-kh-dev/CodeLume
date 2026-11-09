export const metadata = {
  title: "Custom Platform Development | CodeLume",
  description:
    "End-to-end engineering for complex digital platforms, SaaS applications, and enterprise-grade web solutions.",
};

export default function CustomPlatformsLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Platform Development",
    provider: { "@type": "Organization", name: "CodeLume" },
    description:
      "End-to-end engineering for complex digital platforms and SaaS applications.",
    url: "https://www.codelume.online/services/custom-platforms",
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
