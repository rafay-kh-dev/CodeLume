export const metadata = {
  title: "Custom API Integrations | CodeLume",
  description:
    "Seamless third-party API integrations and robust backend logic to connect your digital ecosystem efficiently.",
};

export default function ApiIntegrationsLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom API Integrations",
    provider: { "@type": "Organization", name: "CodeLume" },
    description:
      "Seamless third-party API integrations and robust backend logic.",
    url: "https://www.codelume.online/services/api-integrations",
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
