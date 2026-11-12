export const metadata = {
  title: "MERN Stack Development Services | Rafay's CodeLume",
  description:
    "Engineer lightning-fast, scalable web applications with Rafay's CodeLume’s bespoke MERN stack (MongoDB, Express, React, Node.js) development services.",
};

export default function MernStackLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "MERN Stack Development",
    provider: {
      "@type": "Organization",
      name: "Rafay's CodeLume",
    },
    description:
      "Bespoke MERN stack (MongoDB, Express, React, Node.js) development services for scalable web applications.",
    url: "https://www.Rafay's CodeLume.online/services/mern-stack",
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
