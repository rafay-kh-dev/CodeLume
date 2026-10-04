export const postsData = [
  {
    id: 1,
    slug: "architecting-headless-shopify-nextjs",
    metaTitle: "Architecting High-Conversion Headless Shopify Storefronts | CodeLume",
    metaDescription: "Decoupling your e-commerce backend from the frontend is essential for speed. Discover how a Next.js and Shopify architecture maximises performance and sales.",
    focusKeyword: "Headless Shopify Next.js",
    tags: ["Shopify", "Next.js", "E-Commerce", "React"],
    title: "Architecting High-Conversion Headless Shopify Storefronts",
    excerpt: "Decoupling your e-commerce backend from the frontend is no longer a luxury. Discover how a Next.js and Shopify architecture maximises performance and sales.",
    category: "E-Commerce",
    date: "Sep 22, 2026",
    readTime: "8 min read",
    imageGlow: "from-blue-500/40 to-transparent",
    // Live Unsplash Image
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop", 
    featured: true,
    markdownContent: `
## The Evolution of Modern E-Commerce
Traditional monolithic architectures often struggle to keep up with the rigorous demands of modern digital consumers. When a storefront relies on a bloated theme, the time to interactive (TTI) metrics suffer, directly impacting conversion rates.

## Why We Decouple the Frontend
By transitioning to a headless architecture using Shopify's Storefront API and Next.js, we gain absolute control over the visual delivery. This means we can pre-render product pages on the server, serving them to users instantly through a global CDN.

## Implementing the Storefront API
To ensure zero-latency data fetching, we bypass standard plugins and query the Shopify GraphQL API directly.

\`\`\`javascript
export async function getProductData(handle) {
  const query = \`
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        descriptionHtml
        variants(first: 10) {
          edges {
            node {
              id
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  \`;

  const response = await fetch(process.env.SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables: { handle } }),
  });

  return response.json();
}
\`\`\`

## The Impact on Core Web Vitals
This bespoke approach drastically reduces the main thread blocking time. The result is a lightning-fast experience that not only satisfies search engine algorithms but also prevents cart abandonment.
    `
  },
  {
    id: 2,
    slug: "mastering-tailwind-v4-eliminating-gpu-lag",
    metaTitle: "Mastering Tailwind CSS v4: Eliminating GPU Render-Blocking | CodeLume",
    metaDescription: "Heavy backdrop blurs can choke mobile processors. Learn advanced Tailwind v4 techniques to maintain glassmorphism aesthetics with zero latency.",
    focusKeyword: "Tailwind CSS Optimisation",
    tags: ["Tailwind CSS", "UI/UX", "Performance", "Frontend Engineering"],
    title: "Mastering Tailwind v4: Eliminating GPU Render-Blocking",
    excerpt: "Heavy backdrop blurs and deep shadows can choke mobile processors. Learn advanced Tailwind v4 techniques to maintain glassmorphism aesthetics with zero latency.",
    category: "UI/UX Design",
    date: "Sep 18, 2026",
    readTime: "6 min read",
    imageGlow: "from-purple-500/40 to-transparent",
    // Live Unsplash Image
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop", 
    featured: false,
    markdownContent: `
## The Hidden Cost of Glassmorphism
Frosted glass interfaces are the hallmark of high-end, premium web design. However, applying extensive backdrop filters across massive DOM elements forces the browser to continuously recalculate pixels during scroll events. 

## The Blink Engine Struggle
While Apple's WebKit handles intense CSS blurs efficiently, Android devices and lower-end Windows machines often experience severe frame drops. This creates a disjointed and frustrating user experience.

## The Radial Gradient Solution
Instead of forcing the GPU to calculate complex blur algorithms, we can achieve identical atmospheric lighting by utilising hardware-accelerated radial gradients.

\`\`\`html
<!-- The Expensive Way (Chokes Mobile GPUs) -->
<div className="w-[50rem] h-[50rem] bg-blue-600/20 blur-[150px]" />

<!-- The Optimised Way (Zero Latency) -->
<div className="w-[50rem] h-[50rem] bg-[radial-gradient(circle,rgba(37,99,235,0.15)_0%,transparent_60%)]" />
\`\`\`

## Optimising Drop Shadows
Alongside removing heavy blurs, softening box shadows from massive, multi-layered spreads to refined, single-layer variants ensures that your application remains fluid and responsive across all global devices.
    `
  },
  {
    id: 3,
    slug: "enterprise-security-protocols-mern-stack",
    metaTitle: "Enterprise Security Protocols in the Modern MERN Stack | CodeLume",
    metaDescription: "Securing Node.js and Express backends requires more than just basic authentication. A deep dive into JWT handling and Redis session management.",
    focusKeyword: "MERN Stack Security",
    tags: ["Node.js", "Security", "Backend Architecture", "MongoDB"],
    title: "Enterprise Security Protocols in the Modern MERN Stack",
    excerpt: "Securing Node.js and Express backends requires more than just basic authentication. A deep dive into JWT handling, Redis session management, and rate limiting.",
    category: "Backend Architecture",
    date: "Sep 10, 2026",
    readTime: "10 min read",
    imageGlow: "from-indigo-500/40 to-transparent",
    // Live Unsplash Image
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop", 
    featured: false,
    markdownContent: `
## Moving Beyond Basic Authentication
Building a robust MERN stack application involves anticipating sophisticated cyber threats. Standard email and password hashing is simply the baseline; true enterprise security requires a multi-layered defence system.

## Advanced JWT Strategies
Storing JSON Web Tokens in local storage exposes your application to Cross-Site Scripting (XSS) attacks. The professional standard dictates using secure, HttpOnly cookies to handle token transmission seamlessly.

\`\`\`javascript
// Setting an HttpOnly cookie in Express.js
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    data: user.getPublicProfile()
  });
};
\`\`\`

## Redis for Session Revocation
A major flaw in stateless JWT architecture is the inability to revoke tokens immediately. By integrating Redis, we can maintain a high-speed blacklist of compromised or logged-out tokens, ensuring our backend remains strictly protected without sacrificing response times.
    `
  },
  {
    id: 4,
    slug: "technical-seo-server-side-rendering",
    metaTitle: "Technical SEO in 2026: Dominating Search with SSR | CodeLume",
    metaDescription: "Why client-side rendered applications struggle with indexing, and how implementing proper SSR guarantees search engine dominance.",
    focusKeyword: "Technical SEO SSR",
    tags: ["SEO", "React", "Next.js", "Growth"],
    title: "Technical SEO in 2026: Dominating Search with SSR",
    excerpt: "Why client-side rendered applications struggle with indexing, and how implementing proper Server-Side Rendering guarantees search engine dominance.",
    category: "SEO & Growth",
    date: "Sep 02, 2026",
    readTime: "7 min read",
    imageGlow: "from-emerald-500/40 to-transparent",
    // Live Unsplash Image
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop", 
    featured: false,
    markdownContent: `
## The Client-Side Rendering Dilemma
Building a Single Page Application entirely in standard React forces Google's crawlers to execute JavaScript before they can read your content. This causes critical delays in indexing and frequently damages your organic search ranking.

## The Power of Pre-Rendering
By utilising Next.js or highly customised server environments, we can pre-render the entire HTML structure on the server. When the crawler hits the page, it immediately parses the heavily optimised content and dynamic meta tags.

## Implementing Dynamic Meta Injection
Managing SEO programmatically means adjusting your document head based on the active route.

\`\`\`javascript
export function generateMetadata({ params }) {
  const post = fetchPostData(params.slug);
  
  return {
    title: \`\${post.metaTitle} | CodeLume Agency\`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: \`https://codelume.com/insights/\${params.slug}\`,
    }
  };
}
\`\`\`

## Structured Data for Rich Snippets
Providing search engines with exact context via JSON-LD schema markup is non-negotiable for competitive markets. This ensures your articles and case studies appear as rich results, significantly increasing click-through rates.
    `
  }
];