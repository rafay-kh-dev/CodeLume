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
// Import fix kiya hai: File ka naam "calculator" hai aur humein component ka naam "Calculator" chahiye.
import Calculator from "./components/calculator"; 
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

// Handles scrolling to top AND updating Tab Titles, Clean SEO & Schema Tags
function RouteTracker() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Default SEO Data
  let pageTitle = "CodeLume | Bespoke Web Development & Digital Design"; 
  let pageDesc = "We build fast, scalable, and visually stunning digital experiences. From custom web apps to full brand identities, let's scale your business.";
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

  // Clean, Human, and Click-Worthy SEO Titles
  if (pathname === "/") {
    pageTitle = "CodeLume | Bespoke Web Development & Digital Design";
  } else if (pathname === "/start-project") {
    pageTitle = "Start a Project | CodeLume";
    pageDesc = "Ready to upgrade your digital presence? Book a consultation with Rafay and let's build something exceptional together.";
  } else if (pathname === "/services") {
    pageTitle = "Digital Services | Web Dev, UI/UX & Branding | CodeLume";
    pageDesc = "Explore our core services: MERN stack apps, custom Laravel backends, Webflow design, and complete 0-to-100 brand engineering.";
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
    pageTitle = "MERN Stack Development | Custom React & Node Apps | CodeLume";
    pageDesc = "Need a fast, scalable web app? We engineer bespoke MERN stack solutions tailored exactly to your business logic. Packages from $149.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "MERN Stack Web Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "149.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/php-laravel") {
    pageTitle = "Custom PHP & Laravel Development | CodeLume";
    pageDesc = "Bulletproof backend architecture for your business. We build secure, dynamic Laravel applications that scale seamlessly. From $139.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "PHP & Laravel Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "139.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/angular-apps") {
    pageTitle = "Angular Web App Development | CodeLume";
    pageDesc = "High-performance, enterprise-grade Angular frontends built for speed and complexity. Upgrade your user experience today. From $135.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Angular Web App Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "135.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/wordpress") {
    pageTitle = "WordPress & WooCommerce Development | CodeLume";
    pageDesc = "High-converting WooCommerce stores and custom WordPress themes. Fast, secure, and easily manageable CMS solutions starting at $100.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "WordPress & WooCommerce Services", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "100.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/shopify") {
    pageTitle = "Custom Shopify Development | CodeLume";
    pageDesc = "Turn visitors into buyers. We build bespoke, high-converting Shopify storefronts with custom Liquid coding and seamless integrations.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Shopify Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "115.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/webflow") {
    pageTitle = "Webflow Design Agency | CodeLume";
    pageDesc = "Pixel-perfect, award-winning Webflow websites with advanced GSAP animations and zero bloat. Stand out from the competition.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Webflow Site Design", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "149.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/custom-platforms") {
    pageTitle = "Bespoke Web Platforms & SaaS Development | CodeLume";
    pageDesc = "Have a complex app idea? We engineer custom SaaS platforms, portals, and dashboards from the ground up. Enterprise solutions from $299.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Custom Platform Engineering", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "299.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/api-integrations") {
    pageTitle = "Custom API Development & Integrations | CodeLume";
    pageDesc = "Connect your systems flawlessly. We build secure REST/GraphQL APIs and handle complex third-party data synchronisation. Starting at $99.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "API & Integrations", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "99.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/mobile-apps") {
    pageTitle = "Custom Mobile App Development | CodeLume";
    pageDesc = "High-performance, cross-platform mobile apps built to scale. Take your business native with bespoke iOS and Android solutions.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Mobile App Development", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "399.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/ui-ux-design") {
    pageTitle = "UI/UX Design Services | CodeLume";
    pageDesc = "Data-driven interface design that converts. We craft stunning, user-centric web and mobile experiences from wireframe to final handoff.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "UI/UX Design Services", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "199.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/services/full-branding") {
    pageTitle = "0-to-100 Digital Branding & Web Development | CodeLume";
    pageDesc = "The ultimate launchpad. Bespoke logo design, enterprise web development, and targeted SEO to launch and scale your brand globally.";
    schemaData = { "@context": "https://schema.org", "@type": "Product", "name": "Full Branding & Marketing Services", "description": pageDesc, "brand": { "@type": "Brand", "name": "CodeLume" }, "offers": { "@type": "Offer", "price": "1499.00", "priceCurrency": "USD", "availability": "https://schema.org/InStock" } };
  } else if (pathname === "/blogs") {
    pageTitle = "Blogs | CodeLume";
    pageDesc = "Real-world technical tutorials, UI/UX trends, and digital strategy insights from an active full-stack developer.";
  } else if (pathname === "/case-studies") {
    pageTitle = "Case Studies | CodeLume";
    pageDesc = "See exactly how we solve complex business challenges through strategic design and bespoke web engineering.";
  } else if (pathname === "/about") {
    pageTitle = "About | CodeLume";
    pageDesc = "Meet the engineer behind CodeLume. I specialise in the MERN stack, Laravel, and bespoke UI/UX design to help businesses grow.";
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
    pageDesc = "Our operational guidelines and terms of service for engaging with CodeLume's web development and design projects.";  
  } else if (pathname === "/privacy-policy") {
    pageTitle = "Privacy Policy | CodeLume";
    pageDesc = "How we protect, manage, and secure your personal data across the CodeLume ecosystem.";
  } else if (pathname === "/admin/login") {
    pageTitle = "Admin Login | CodeLume";
    pageDesc = "Secure portal for CodeLume administration.";
  } else if (pathname.includes("/admin")) {
    pageTitle = "Dashboard | CodeLume Admin";
    pageDesc = "Content management and administration dashboard.";
  } else if (pathname.includes("/blogs/")) {
    pageTitle = "Article | CodeLume Insights";
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
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <About />
                    <Service />
                    <Calculator />
                    <OurProcess />
                    <Testimonials />
                  </>
                }
              />

              <Route path="/start-project" element={<StartProject />} />
              <Route path="/services" element={<Services />} />

              <Route path="/services/mern-stack" element={<MernStackService />} />
              <Route path="/services/php-laravel" element={<PhpLaravelService />} />
              <Route path="/services/angular-apps" element={<AngularAppsService />} />
              <Route path="/services/wordpress" element={<WordPressService />} />
              <Route path="/services/shopify" element={<ShopifyService />} />
              <Route path="/services/webflow" element={<WebflowService />} />
              <Route path="/services/custom-platforms" element={<CustomPlatformsService />} />
              <Route path="/services/api-integrations" element={<ApiIntegrationsService />} />
              <Route path="/services/mobile-apps" element={<MobileAppsService />} />
              <Route path="/services/ui-ux-design" element={<UiUxDesignService />} />
              <Route path="/services/full-branding" element={<FullBrandingService />} />

              <Route path="/blogs" element={<Blog />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/about" element={<AboutCodeLume />} />
              <Route path="/blogs/:slug" element={<Article />} />
              
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              
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