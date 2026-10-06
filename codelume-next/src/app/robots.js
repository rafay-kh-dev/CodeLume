export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Strictly block crawlers from your admin dashboards
      disallow: ['/admin', '/admin/login', '/admin/dashboard', '/admin/create-post'],
    },
    sitemap: 'https://www.codelume.com/sitemap.xml',
  }
}