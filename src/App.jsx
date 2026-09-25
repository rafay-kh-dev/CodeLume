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
import Service from "./components/service"; // Home page services
import OurProcess from "./components/ourprocess";
import Testimonials from "./components/testimonial";
import Blog from "./components/blogs";
import Article from "./components/article";
import Services from "./components/services"; // Dedicated services page
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

// Upgraded Function: Handles both scrolling to top AND updating Tab Titles, SEO & Schema Tags
function RouteTracker() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Scroll to the top of the page on route change
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
        "url": "https://codelume.com/logo.png" // Update with your actual logo URL
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
    // Service Schema for Services Page
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
  } else if (pathname === "/blogs") {
    pageTitle = "Blogs | CodeLume";
    pageDesc = "Explore the latest articles on MERN stack, WordPress, UI/UX, and local SEO strategies.";
  } else if (pathname === "/case-studies") {
    pageTitle = "Case Studies | CodeLume";
    pageDesc = "Discover how CodeLume solves complex business challenges through strategic design and development.";
  } else if (pathname === "/about") {
    pageTitle = "About | CodeLume";
    pageDesc = "Learn more about Rafay, an independent freelance web developer and UI/UX designer.";
    // Profile Schema for About Page
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

      {/* Open Graph Tags for Social Media */}
      <meta property="og:type" content={pathname.includes("/blogs/") ? "article" : "website"} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      
      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />

      {/* Dynamic JSON-LD Schema Markup */}
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
              {/* 1. HOMEPAGE */}
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

              {/* 2. START A PROJECT / LEAD PAGE */}
              <Route path="/start-project" element={<StartProject />} />

              {/* 3. DEDICATED SERVICES PAGE */}
              <Route path="/services" element={<Services />} />

              {/* 4. DEDICATED BLOG HUB PAGE */}
              <Route path="/blogs" element={<Blog />} />

              {/* 5. CASE STUDIES PAGE */}
              <Route path="/case-studies" element={<CaseStudies />} />

              {/* 6. ABOUT CODELUME PAGE */}
              <Route path="/about" element={<AboutCodeLume />} />

              {/* 7. INDIVIDUAL ARTICLE PAGE */}
              <Route path="/blogs/:slug" element={<Article />} />

              {/* 8. TERMS OF SERVICE PAGE */}
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* 9. PRIVACY POLICY PAGE */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              
              {/* 9. ADMIN LOGIN PAGE */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* 10. ADMIN DASHBOARD (SECURED) */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 11. ADMIN CREATE POST (SECURED) */}
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