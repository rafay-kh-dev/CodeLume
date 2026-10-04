export const metadata = {
  title: "Blogs | CodeLume",
  description:
    "Read the latest technical insights, SEO strategies, and frontend development tutorials by Rafay at CodeLume.",
  openGraph: {
    title: "Blogs | CodeLume",
    description:
      "Read the latest technical insights, SEO strategies, and frontend development tutorials.",
    url: "https://www.codelume.online/blogs",
    siteName: "CodeLume",
    type: "website",
  },
};

export default function BlogsLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blogs",
    description:
      "Technical insights, SEO strategies, and frontend development tutorials.",
    url: "https://www.codelume.online/blogs",
    publisher: {
      "@type": "Organization",
      name: "CodeLume",
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
