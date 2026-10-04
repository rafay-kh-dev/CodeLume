// Helper function to format the slug into a clean title
const formatTitle = (slug) => {
  if (!slug) return "Blog Article";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Server-side Metadata Generation (Bypassing API)
export function generateMetadata({ params }) {
  const slug = params.slug;
  const articleTitle = formatTitle(slug);

  return {
    title: `${articleTitle} | CodeLume Blogs`,
    description: `Read our comprehensive guide and latest insights on ${articleTitle} by CodeLume engineers.`,
    openGraph: {
      title: `${articleTitle} | CodeLume`,
      description: `Read our comprehensive guide on ${articleTitle} at CodeLume.`,
      url: `https://www.codelume.online/blogs/${slug}`,
      type: "article",
      publishedTime: new Date().toISOString(),
      authors: ["Rafay"],
    },
    alternates: {
      canonical: `https://www.codelume.online/blogs/${slug}`,
    },
  };
}

// Server-side Schema Generation & Layout (Bypassing API)
export default function SingleBlogLayout({ children, params }) {
  const slug = params.slug;
  const articleTitle = formatTitle(slug);

  // Dynamically generate JSON-LD schema for Google Search
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: articleTitle,
    datePublished: new Date().toISOString(),
    author: [
      {
        "@type": "Person",
        name: "Rafay",
        url: "https://www.codelume.online/about",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "CodeLume",
      logo: {
        "@type": "ImageObject",
        url: "https://www.codelume.online/logo.png",
      },
    },
    description: `Comprehensive step-by-step guide and insights on ${articleTitle}.`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.codelume.online/blogs/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      {children}
    </>
  );
}