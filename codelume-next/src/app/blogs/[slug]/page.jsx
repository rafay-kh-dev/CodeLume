import ClientArticle from "./ClientArticle";

const formatTitle = (slug) => {
  if (!slug) return "Blog Article";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const articleTitle = formatTitle(slug);

  return {
    title: `${articleTitle} | CodeLume`,
    description: `Read our comprehensive guide and latest insights on ${articleTitle} by CodeLume engineers.`,
    openGraph: {
      title: `${articleTitle} | CodeLume`,
      description: `Read our comprehensive guide on ${articleTitle}.`,
      url: `https://www.codelume.online/blogs/${slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://www.codelume.online/blogs/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const articleTitle = formatTitle(slug);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: articleTitle,
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
      <ClientArticle slug={slug} />
    </>
  );
}
