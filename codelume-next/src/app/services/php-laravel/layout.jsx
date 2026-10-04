export const metadata = {
  title: "Custom PHP & Laravel Development | CodeLume",
  description:
    "Secure, scalable, and high-performance backend architectures engineered with custom PHP and Laravel frameworks.",
};

export default function PhpLaravelLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "PHP & Laravel Development",
    provider: { "@type": "Organization", name: "CodeLume" },
    description:
      "Secure and scalable backend architectures engineered with custom PHP and Laravel.",
    url: "https://www.codelume.online/services/php-laravel",
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
