import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate, 
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Navbar from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import CaseStudies from "./components/casestudies";
import Service from "./components/service"; 
import OurProcess from "./components/ourprocess";
import Testimonials from "./components/testimonial";
import Blog from "./components/blogs";
import Article from "./components/article";
import Services from "./components/services"; 

// --- SERVICE PAGES IMPORTS ---
import MernStackService from "./components/mernstack"; 
import PhpLaravelService from "./components/phplaravel";
import AngularAppsService from "./components/angularapps";
import WordPressService from "./components/wordpress";
import ShopifyService from "./components/shopify";
import WebflowService from "./components/webflow";
import CustomPlatformsService from "./components/customplatforms";
import ApiIntegrationsService from "./components/apiintegrations";

import StartProject from "./components/startproject";
import AdminCreatePost from "./components/admincreatepost";
import AdminLogin from "./components/adminlogin";
import AdminDashboard from "./components/admindashboard";
import Footer from "./components/footer";
import AboutCodeLume from "./components/aboutcodelume";
import TermsOfService from "./components/termsofservice";
import PrivacyPolicy from "./components/privacypolicy";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Security Wrapper: Checks for a valid token before rendering the admin page
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

// Handles scrolling to top AND updating Tab Titles, SEO & Schema Tags
function RouteTracker() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Default SEO Data
  let pageTitle = "CodeLume® | Bespoke Web Engineering & Digital Agency"; 
  let pageDesc = "CodeLume is a premium digital hub specialising in full-stack web development, UI/UX design, and advanced SEO.";
  let pageUrl = `https://codelume.com${pathname}`;
  
  // Default Schema Markup (WebSite)
  let schemaType = "WebSite";
  let schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CodeLume",
    "url": "https://codelume.com",
    "description": "Bespoke Web Engineering & Digital Agency built by Rafay.",
    "publisher": {
      "@type": "Organization",
      "name": "CodeLume",
      "logo": {
        "@type": "ImageObject",
        "url": "https://codelume.com/logo.png"
      }
    }
  };

  // Apply custom titles, descriptions and Schema dynamically
  if (pathname === "/") {
    pageTitle = "CodeLume® | Bespoke Web Engineering & Digital Agency";
  } else if (pathname === "/start-project") {
    pageTitle = "Start a Project | CodeLume";
    pageDesc = "Ready to build something amazing? Hire Rafay for custom web development and digital marketing services.";
  } else if (pathname === "/services") {
    pageTitle = "Services | CodeLume";
    pageDesc = "Explore bespoke digital solutions including MERN Stack, WordPress, UI/UX Design, and custom web applications.";
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Web Development & Digital Marketing",
      "provider": {
        "@type": "Person",
        "name": "Rafay",
        "url": "https://codelume.com/about"
      },
      "description": pageDesc,
      "areaServed": "Worldwide"
    };
  } else if (pathname === "/services/mern-stack") {
    pageTitle = "MERN Stack Development Services | CodeLume";
    pageDesc = "Custom MERN stack web applications tailored to your business needs. Choose from basic, standard, or premium packages starting at $149.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "MERN Stack Web Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "149.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/php-laravel") {
    pageTitle = "Custom PHP & Laravel Development | CodeLume";
    pageDesc = "Robust, secure, and highly scalable backend architectures engineered to your business logic. Packages starting at $139.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "PHP & Laravel Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "139.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/angular-apps") {
    pageTitle = "Angular Web Application Development | CodeLume";
    pageDesc = "Enterprise-grade frontend frameworks for complex, high-speed single-page applications. Packages starting at $135.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Angular Web App Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "135.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/wordpress") {
    pageTitle = "WordPress & WooCommerce Development | CodeLume";
    pageDesc = "Custom themes, premium plugins, and high-converting e-commerce experiences. Professional CMS packages starting at $100.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "WordPress & WooCommerce Services", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "100.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/shopify") {
    pageTitle = "High-Converting Shopify Development | CodeLume";
    pageDesc = "Bespoke storefronts, custom Liquid coding, and powerful app integrations to scale your brand. Packages starting at $115.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Shopify Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "115.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/webflow") {
    pageTitle = "Pixel-Perfect Webflow Sites | CodeLume";
    pageDesc = "Lightning-fast, visually stunning responsive websites with advanced animations. Premium Webflow builds starting at $149.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Webflow Site Design", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "149.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/custom-platforms") {
    pageTitle = "Custom Web Platform Engineering | CodeLume";
    pageDesc = "Bespoke digital solutions including SaaS apps, portals, and dashboards engineered from scratch. Starting at $299.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Custom Platform Engineering", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "299.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/api-integrations") {
    pageTitle = "API Integrations & Data Synchronisation | CodeLume";
    pageDesc = "Connect your digital ecosystem effortlessly with secure third-party API integrations and custom endpoints. Starting at $99.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "API & Integrations", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "99.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/blogs") {
    pageTitle = "Blogs | CodeLume";
    pageDesc = "Explore the latest articles on web development, UI/UX, and digital strategies.";
  } else if (pathname === "/case-studies") {
    pageTitle = "Case Studies | CodeLume";
    pageDesc = "Discover how CodeLume solves complex business challenges through strategic design and development.";
  } else if (pathname === "/about") {
    pageTitle = "About | CodeLume";
    pageDesc = "Learn more about Rafay, an independent freelance web developer and UI/UX designer.";
    schemaData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Rafay",
      "jobTitle": "Freelance Web Developer & UI/UX Designer",
      "url": "https://codelume.com/about",
      "worksFor": {
        "@type": "Organization",
        "name": "CodeLume"
      }
    };
  } else if (pathname === "/terms-of-service") {
    pageTitle = "Terms of Service | CodeLume";
    pageDesc = "Read the Terms of Service for using CodeLume's web development and digital services.";  
  } else if (pathname === "/privacy-policy") {
    pageTitle = "Privacy Policy | CodeLume";
    pageDesc = "Understand how we collect, use, and protect your personal information.";
  } else if (pathname === "/admin/login") {
    pageTitle = "Admin Login | CodeLume";
    pageDesc = "Sign in to access the CodeLume management dashboard.";
  } else if (pathname.includes("/admin")) {
    pageTitle = "Dashboard | CodeLume";
    pageDesc = "Admin dashboard for CodeLume website management.";
  } else if (pathname.includes("/blogs/")) {
    pageTitle = "Reading Article | CodeLume";
  }

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content={pathname.includes("/blogs/") ? "article" : "website"} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />

      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <RouteTracker />
        <div className="min-h-screen bg-[#030712] text-white selection:bg-blue-500 selection:text-white">
          <Navbar />

          <main>
            <Routes>
              {/* HOMEPAGE */}
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <About />
                    <Service />
                    <OurProcess />
                    <Testimonials />
                  </>
                }
              />

              <Route path="/start-project" element={<StartProject />} />
              
              {/* SERVICES HUB */}
              <Route path="/services" element={<Services />} />

              {/* INDIVIDUAL SERVICE PAGES */}
              <Route path="/services/mern-stack" element={<MernStackService />} />
              <Route path="/services/php-laravel" element={<PhpLaravelService />} />
              <Route path="/services/angular-apps" element={<AngularAppsService />} />
              <Route path="/services/wordpress" element={<WordPressService />} />
              <Route path="/services/shopify" element={<ShopifyService />} />
              <Route path="/services/webflow" element={<WebflowService />} />
              <Route path="/services/custom-platforms" element={<CustomPlatformsService />} />
              <Route path="/services/api-integrations" element={<ApiIntegrationsService />} />

              {/* OTHER PAGES */}
              <Route path="/blogs" element={<Blog />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/about" element={<AboutCodeLume />} />
              <Route path="/blogs/:slug" element={<Article />} />
              
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              
              {/* ADMIN ROUTES */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/create-post"
                element={
                  <ProtectedRoute>
                    <AdminCreatePost />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <Footer />
          <Analytics />
          <SpeedInsights />
        </div>
      </Router>
    </HelmetProvider>
  );
}