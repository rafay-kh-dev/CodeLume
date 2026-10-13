import ClientArticle from "./ClientArticle";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://codelume-backend.onrender.com";

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
    `Read our comprehensive guide on ${formatTitle(slug)} by CodeLume engineers.`;
  const coverImage = post?.coverImage || null;

  return {
    title: `${title} | CodeLume`,
    description,
    openGraph: {
      title: `${title} | CodeLume`,
      description,
      url: `https://www.codelume.online/blogs/${slug}`,
      type: "article",
      ...(coverImage && {
        images: [{ url: coverImage, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CodeLume`,
      description,
      ...(coverImage && { images: [coverImage] }),
    },
    alternates: {
      canonical: `https://www.codelume.online/blogs/${slug}`,
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
        url: "https://www.codelume.online/about",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "CodeLume",
      logo: {
        "@type": "ImageObject",
        url: "https://www.codelume.online/icon.svg",
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
