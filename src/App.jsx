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
// Naye Pages Add Kiye Gaye Hain:
import MobileAppsService from "./components/mobileapps";
import UiUxDesignService from "./components/uiuxdesign";
import FullBrandingService from "./components/fullbranding";

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

// Handles scrolling to top AND updating Tab Titles, Highly Optimized SEO & Schema Tags
function RouteTracker() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Default SEO Data
  let pageTitle = "CodeLume® | Premium Web Engineering & Digital Agency"; 
  let pageDesc = "CodeLume is a premium digital hub specialising in full-stack web development, UI/UX design, and advanced SEO to scale your business.";
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

  // Apply highly attractive SEO titles and compelling descriptions
  if (pathname === "/") {
    pageTitle = "CodeLume® | Premium Web Engineering & Digital Agency";
  } else if (pathname === "/start-project") {
    pageTitle = "Start Your Project | Hire Expert Web Developers at CodeLume";
    pageDesc = "Ready to build a high-performance digital product? Consult with Rafay to engineer bespoke web applications and design systems.";
  } else if (pathname === "/services") {
    pageTitle = "Premium Digital Services | Web Development & UI/UX Design";
    pageDesc = "Explore our bespoke digital solutions including MERN Stack apps, premium WordPress sites, expert UI/UX Design, and full branding.";
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
    pageTitle = "Custom MERN Stack Development Agency | Hire React Experts";
    pageDesc = "Build lightning-fast, highly scalable JavaScript web applications tailored to your business logic. Premium MERN stack packages starting at $149.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "MERN Stack Web Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "149.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/php-laravel") {
    pageTitle = "Expert PHP & Laravel Development Services | Secure Web Apps";
    pageDesc = "Engineer robust, highly secure, and scalable backend architectures with our premium Laravel development services. Packages starting at $139.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "PHP & Laravel Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "139.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/angular-apps") {
    pageTitle = "Enterprise Angular Web App Development | Fast Custom SPAs";
    pageDesc = "Launch enterprise-grade frontend frameworks for complex, high-speed single-page applications. Premium Angular builds starting at $135.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Angular Web App Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "135.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/wordpress") {
    pageTitle = "Premium WordPress & WooCommerce Development Agency";
    pageDesc = "Get high-converting custom WordPress themes and WooCommerce stores designed for maximum sales. Professional CMS packages starting at $100.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "WordPress & WooCommerce Services", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "100.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/shopify") {
    pageTitle = "High-Converting Custom Shopify Store Development Experts";
    pageDesc = "Scale your e-commerce brand with bespoke Shopify storefronts, custom Liquid coding, and powerful integrations. Premium stores from $115.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Shopify Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "115.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/webflow") {
    pageTitle = "Award-Winning Webflow Design Agency | Pixel-Perfect Websites";
    pageDesc = "Dominate your industry with visually stunning, highly interactive Webflow websites featuring complex animations. Premium builds starting at $149.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Webflow Site Design", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "149.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/custom-platforms") {
    pageTitle = "Bespoke Web Platform & SaaS Engineering Services | CodeLume";
    pageDesc = "We engineer complex SaaS applications, custom portals, and dynamic dashboards from scratch. Enterprise custom platform development from $299.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Custom Platform Engineering", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "299.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/api-integrations") {
    pageTitle = "Custom API Development & Seamless Third-Party Integrations";
    pageDesc = "Connect your digital ecosystem effortlessly. We build secure REST/GraphQL APIs and integrate complex third-party tools. Starting at $99.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "API & Integrations", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "99.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/mobile-apps") {
    pageTitle = "Top Mobile App Development Agency | Custom iOS & Android Apps";
    pageDesc = "Launch your startup with high-performance, cross-platform mobile applications engineered to deliver seamless user experiences. Starting at $399.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Mobile App Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "399.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/ui-ux-design") {
    pageTitle = "Premium UI/UX Design Agency | Data-Driven Digital Experiences";
    pageDesc = "Stand out with bespoke, user-centric interfaces crafted in Figma. We design stunning web and app experiences optimised for conversion. Starting at $199.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "UI/UX Design Services", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "199.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/full-branding") {
    pageTitle = "Complete 0-to-100 Branding & Digital Marketing Agency";
    pageDesc = "We handle everything. From bespoke logo design and complex web engineering to aggressive SEO and marketing strategies. The complete package from $1,499.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Full Branding & Marketing Services", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "1499.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/blogs") {
    pageTitle = "Expert Insights & Technical Blogs | CodeLume";
    pageDesc = "Master the digital landscape with our expert articles on full-stack web development, advanced SEO strategies, and premium UI/UX design trends.";
  } else if (pathname === "/case-studies") {
    pageTitle = "Award-Winning Case Studies & Digital Success Stories";
    pageDesc = "Discover how CodeLume solves complex business challenges and scales brands globally through strategic design and bespoke web engineering.";
  } else if (pathname === "/about") {
    pageTitle = "About CodeLume | Bespoke Web Developers & Designers";
    pageDesc = "Learn about Rafay, an independent full-stack web engineer and UI/UX designer dedicated to building high-performance digital platforms.";
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
    pageTitle = "Terms of Service | CodeLume Digital Agency";
    pageDesc = "Read the comprehensive Terms of Service and professional guidelines for engaging with CodeLume's bespoke web development services.";  
  } else if (pathname === "/privacy-policy") {
    pageTitle = "Privacy Policy | CodeLume Digital Agency";
    pageDesc = "Understand our strict commitment to protecting your personal information and data privacy across all digital touchpoints.";
  } else if (pathname === "/admin/login") {
    pageTitle = "Secure Admin Portal | CodeLume";
    pageDesc = "Restricted access. Secure sign-in to the CodeLume ecosystem management dashboard.";
  } else if (pathname.includes("/admin")) {
    pageTitle = "Executive Dashboard | CodeLume";
    pageDesc = "Administrative control panel for content and ecosystem management.";
  } else if (pathname.includes("/blogs/")) {
    pageTitle = "Exclusive Technical Article | CodeLume";
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
              {/* NEWLY ADDED SERVICE PAGES */}
              <Route path="/services/mobile-apps" element={<MobileAppsService />} />
              <Route path="/services/ui-ux-design" element={<UiUxDesignService />} />
              <Route path="/services/full-branding" element={<FullBrandingService />} />

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