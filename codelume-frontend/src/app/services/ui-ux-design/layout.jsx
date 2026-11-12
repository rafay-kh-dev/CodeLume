export const metadata = {
  title: "UI/UX Design | Rafay's CodeLume",
  description:
    "Data-driven, user-centric UI/UX design services tailored to elevate your digital product and maximise user retention.",
};

export default function UiUxLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "UI/UX Design Services",
    provider: { "@type": "Organization", name: "Rafay's CodeLume" },
    description: "Data-driven, user-centric UI/UX design services.",
    url: "https://www.Rafay's CodeLume.online/services/ui-ux-design",
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
