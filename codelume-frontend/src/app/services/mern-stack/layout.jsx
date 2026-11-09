export const metadata = {
  title: "MERN Stack Development Services | CodeLume",
  description:
    "Engineer lightning-fast, scalable web applications with CodeLume’s bespoke MERN stack (MongoDB, Express, React, Node.js) development services.",
};

export default function MernStackLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "MERN Stack Development",
    provider: {
      "@type": "Organization",
      name: "CodeLume",
    },
    description:
      "Bespoke MERN stack (MongoDB, Express, React, Node.js) development services for scalable web applications.",
    url: "https://www.codelume.online/services/mern-stack",
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
