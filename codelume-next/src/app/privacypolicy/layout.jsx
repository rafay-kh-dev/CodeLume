import React from "react";

export const metadata = {
  title: "Privacy Policy | CodeLume",
  description:
    "Our commitment to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner in accordance with the Australian Privacy Principles (APPs).",
  alternates: {
    canonical: "https://www.codelume.online/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({ children }) {
  // Generate structured data for Google Search SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | CodeLume",
    description:
      "Our commitment to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner in accordance with the Australian Privacy Principles (APPs).",
    url: "https://www.codelume.online/privacy-policy",
    inLanguage: "en-AU",
    publisher: {
      "@type": "Organization",
      name: "CodeLume",
      url: "https://www.codelume.online",
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
