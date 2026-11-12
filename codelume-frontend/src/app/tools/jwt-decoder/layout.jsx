export const metadata = {
  title: "JWT Token Decoder & Parser | Rafay's CodeLume",
  description:
    "Securely decode, verify, and inspect JSON Web Tokens (JWT) directly in your browser. A free developer utility engineered by Rafay's CodeLume.",
};

export default function JwtDecoderLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JWT Token Decoder",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    description:
      "Securely decode and inspect JSON Web Tokens (JWT) directly in your browser.",
    url: "https://www.Rafay's CodeLume.online/tools/jwt-decoder",
    creator: {
      "@type": "Organization",
      name: "Rafay's CodeLume",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "AUD",
    },
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
