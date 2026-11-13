const SITE_URL = "https://codelume.online";

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Strictly block crawlers from your admin dashboards
      disallow: ['/admin', '/admin/login', '/admin/dashboard', '/admin/create-post'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}