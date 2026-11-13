import React from "react";

export const metadata = {
  title: "Privacy Policy | Rafay's CodeLume",
  description:
    "Our commitment to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner in accordance with the Australian Privacy Principles (APPs).",
  alternates: {
    canonical: "https://codelume.online/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({ children }) {
  // Generate structured data for Google Search SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | Rafay's CodeLume",
    description:
      "Our commitment to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner in accordance with the Australian Privacy Principles (APPs).",
    url: "https://codelume.online/privacy-policy",
    inLanguage: "en-AU",
    publisher: {
      "@type": "Organization",
      name: "Rafay's CodeLume",
      url: "https://codelume.online",
    },
  };

  return (
    <>
      {/* Injecting Schema Markup directly into the DOM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
