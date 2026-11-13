const SITE_URL = "https://codelume.online";

export default async function sitemap() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Fetch all your live blogs from the database
  let blogUrls = [];
  try {
    const res = await fetch(`${API_BASE_URL}/api/blogs`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const blogs = await res.json();
      
      // Filter out drafts, only index published posts
      const publishedBlogs = blogs.filter(post => post.status === "published");

      blogUrls = publishedBlogs.map((blog) => ({
        url: `${SITE_URL}/blogs/${blog.slug}`,
        lastModified: new Date(blog.updatedAt || blog.createdAt),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Sitemap generation failed to fetch blogs:", error);
  }

  // Define your core static pages
  const staticUrls = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  return [...staticUrls, ...blogUrls];
}