// Server-side Metadata Generation
export async function generateMetadata({ params }) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://codelume-backend.onrender.com";

  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs/${params.slug}`);
    if (!response.ok) return { title: "Article Not Found | CodeLume" };

    const post = await response.json();

    return {
      title: `${post.metaTitle || post.title} | CodeLume`,
      description: post.metaDescription || post.excerpt,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        url: `https://www.codelume.online/blogs/${post.slug}`,
        type: "article",
        publishedTime: post.createdAt,
        authors: [post.author || "Rafay"],
        images: post.coverImage ? [post.coverImage] : [],
      },
      alternates: {
        canonical: `https://www.codelume.online/blogs/${post.slug}`,
      },
    };
  } catch (error) {
    return { title: "Article | CodeLume" };
  }
}

// Server-side Schema Generation & Layout
export default async function SingleBlogLayout({ children, params }) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://codelume-backend.onrender.com";
  let schemaMarkup = null;

  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs/${params.slug}`);
    if (response.ok) {
      const post = await response.json();

      schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.metaTitle || post.title,
        image: post.coverImage ? [post.coverImage] : [],
        datePublished: post.createdAt,
        dateModified: post.updatedAt || post.createdAt,
        author: [
          {
            "@type": "Person",
            name: post.author || "Rafay",
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
        description: post.metaDescription || post.excerpt,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.codelume.online/blogs/${post.slug}`,
        },
      };
    }
  } catch (error) {
    console.error("Schema fetching error:", error);
  }

  return (
    <>
      {schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      )}
      {children}
    </>
  );
}
