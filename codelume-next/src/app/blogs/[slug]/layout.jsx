// URL slug (jaise 'mern-stack-development') ko normal text mein convert karne ka helper
const formatTitle = (slug) => {
  if (!slug) return "Blog Article";
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function generateMetadata({ params }) {
  // Agar aapka dynamic folder [id] hai, toh yahan params.id use karein
  const slug = params.slug || params.id || params.blogId; 
  const articleTitle = formatTitle(slug);

  return {
    title: `${articleTitle} | CodeLume Blogs`,
    description: `Read our comprehensive guide and latest insights on ${articleTitle} by CodeLume engineers.`,
    openGraph: {
      title: `${articleTitle} | CodeLume Blogs`,
      description: `Read our comprehensive guide on ${articleTitle} at CodeLume.`,
      url: `https://www.codelume.online/blogs/${slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://www.codelume.online/blogs/${slug}`,
    },
  };
}