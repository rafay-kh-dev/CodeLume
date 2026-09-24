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
import StartProject from "./components/startproject";
import AdminCreatePost from "./components/admincreatepost";
import AdminLogin from "./components/adminlogin";
import AdminDashboard from "./components/admindashboard";
import Footer from "./components/footer";
import AboutCodeLume from "./components/aboutcodelume";
import TermsOfService from "./components/termsofservice";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Security Wrapper: Checks for a valid token before rendering the admin page
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

// Upgraded Function: Handles both scrolling to top AND updating Tab Titles & SEO Tags
function RouteTracker() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Scroll to the top of the page on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  // Default SEO Data
  let pageTitle = "CodeLume® | Bespoke Web Engineering & Digital Agency"; 
  let pageDesc = "CodeLume is a premium digital hub built by Rafay, specialising in full-stack web development, UI/UX design, and advanced SEO.";
  let pageUrl = `https://codelume.com${pathname}`; // Update with your actual domain when live

  // Apply your custom titles and descriptions dynamically
  if (pathname === "/") {
    pageTitle = "CodeLume® | Bespoke Web Engineering & Digital Agency";
  } else if (pathname === "/start-project") {
    pageTitle = "Start a Project | CodeLume";
    pageDesc = "Ready to build something amazing? Hire Rafay for custom web development and digital marketing services.";
  } else if (pathname === "/services") {
    pageTitle = "Services | CodeLume";
    pageDesc = "Explore bespoke digital solutions including MERN Stack, WordPress, UI/UX Design, and custom web applications.";
  } else if (pathname === "/blogs") {
    pageTitle = "Blogs | CodeLume";
    pageDesc = "Explore the latest articles on MERN stack, WordPress, UI/UX, and local SEO strategies.";
  } else if (pathname === "/case-studies") {
    pageTitle = "Case Studies | CodeLume";
    pageDesc = "Discover how CodeLume solves complex business challenges through strategic design and development.";
  } else if (pathname === "/about") {
    pageTitle = "About | CodeLume";
    pageDesc = "Learn more about Rafay, an independent freelance web developer and UI/UX designer.";
  } else if (pathname === "/terms-of-service") {
    pageTitle = "Terms of Service | CodeLume";
    pageDesc = "Read the Terms of Service for using CodeLume's web development and digital services.";  
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

      {/* Open Graph Tags for Social Media (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      
      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
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

              {/* 8. ADMIN LOGIN PAGE */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* 7. TERMS OF SERVICE PAGE */}
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* 9. ADMIN DASHBOARD (SECURED) */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 10. ADMIN CREATE POST (SECURED) */}
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