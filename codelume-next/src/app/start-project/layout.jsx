export const metadata = {
  title: "Start a Project | CodeLume",
  description:
    "Ready to upgrade your digital presence? Fill out your project requirements and let CodeLume engineer a high-performance solution for your business.",
};

export default function StartProjectLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Start a Project with CodeLume",
    description:
      "Contact Rafay to start engineering your custom web application or digital platform.",
    url: "https://www.codelume.online/start-project",
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
