import React from "react";

export const metadata = {
  title: "Terms of Service | CodeLume",
  description:
    "By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before using our website or accessing our educational materials.",
  alternates: {
    canonical: "https://www.codelume.online/terms-of-service",
  },
};

export default function TermsOfServiceLayout({ children }) {
  // Generate structured data for Google Search SEO (WebPage schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service | CodeLume",
    description:
      "By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before using our website or accessing our educational materials.",
    url: "https://www.codelume.online/terms-of-service",
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
