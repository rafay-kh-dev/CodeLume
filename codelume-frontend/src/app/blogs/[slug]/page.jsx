import ClientArticle from "./ClientArticle";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://Rafay's CodeLume-rb3h.onrender.com";

// Fetch real blog data for metadata (SSR)
async function getBlogBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blogs/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Fallback title from slug if API is slow
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

  // Try to get real data from DB for accurate meta
  const post = await getBlogBySlug(slug);

  const title = post?.metaTitle || post?.title || formatTitle(slug);
  const description =
    post?.metaDescription ||
    post?.excerpt ||
    `Read our comprehensive guide on ${formatTitle(slug)} by Rafay's CodeLume engineers.`;
  const coverImage = post?.coverImage || null;

  return {
    title: `${title} | Rafay's CodeLume`,
    description,
    openGraph: {
      title: `${title} | Rafay's CodeLume`,
      description,
      url: `https://www.Rafay's CodeLume.online/blogs/${slug}`,
      type: "article",
      ...(coverImage && {
        images: [{ url: coverImage, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Rafay's CodeLume`,
      description,
      ...(coverImage && { images: [coverImage] }),
    },
    alternates: {
      canonical: `https://www.Rafay's CodeLume.online/blogs/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const post = await getBlogBySlug(slug);
  const title = post?.title || formatTitle(slug);
  const publishedAt = post?.createdAt || new Date().toISOString();
  const modifiedAt = post?.updatedAt || publishedAt;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: post?.excerpt || "",
    datePublished: publishedAt,
    dateModified: modifiedAt,
    ...(post?.coverImage && {
      image: post.coverImage,
    }),
    author: [
      {
        "@type": "Person",
        name: "Rafay",
        url: "https://www.Rafay's CodeLume.online/about",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Rafay's CodeLume",
      logo: {
        "@type": "ImageObject",
        url: "https://www.Rafay's CodeLume.online/icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.Rafay's CodeLume.online/blogs/${slug}`,
    },
  };
  const serializedSchemaMarkup = JSON.stringify(schemaMarkup)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializedSchemaMarkup }}
      />
      <ClientArticle slug={slug} initialBlog={post} />
    </>
  );
}
