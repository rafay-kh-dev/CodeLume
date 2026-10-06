export const metadata = {
  title: "Mobile App Development | CodeLume",
  description:
    "High-performance iOS and Android mobile applications engineered with React Native and Flutter frameworks.",
};

export default function MobileAppsLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Mobile App Development",
    provider: { "@type": "Organization", name: "CodeLume" },
    description: "High-performance iOS and Android mobile applications.",
    url: "https://www.codelume.online/services/mobile-apps",
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
