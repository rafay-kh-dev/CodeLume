export const metadata = {
  title: "Angular Web App Development | CodeLume",
  description:
    "Dynamic, enterprise-ready Single Page Applications (SPAs) engineered using modern Angular architecture.",
};

export default function AngularLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Angular Web App Development",
    provider: { "@type": "Organization", name: "CodeLume" },
    description:
      "Dynamic, enterprise-ready Single Page Applications (SPAs) engineered using Angular.",
    url: "https://www.codelume.online/services/angular-apps",
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
