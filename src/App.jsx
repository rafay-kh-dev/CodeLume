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
import AboutCodeLume from "./components/aboutcodelume"; // Aap is component ka naam future mein AboutStoryTutorials kar sakte hain
import TermsOfService from "./components/TermsOfService"; // <-- New Component Import
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
  let pageTitle = "Story Tutorials | Bespoke Web Engineering & Digital Agency"; 
  let pageDesc = "Story Tutorials is a premium digital hub specialising in full-stack web development, UI/UX design, and advanced SEO.";
  let pageUrl = `https://storytutorials.com${pathname}`; // Update with your actual domain when live

  // Apply your custom titles and descriptions dynamically
  if (pathname === "/") {
    pageTitle = "Story Tutorials | Bespoke Web Engineering & Digital Agency";
  } else if (pathname === "/start-project") {
    pageTitle = "Start a Project | Story Tutorials";
    pageDesc = "Ready to build something amazing? Hire us for custom web development and digital marketing services.";
  } else if (pathname === "/services") {
    pageTitle = "Services | Story Tutorials";
    pageDesc = "Explore bespoke digital solutions including MERN Stack, WordPress, UI/UX Design, and custom web applications.";
  } else if (pathname === "/blogs") {
    pageTitle = "Blogs | Story Tutorials";
    pageDesc = "Explore the latest articles on MERN stack, WordPress, UI/UX, and local SEO strategies.";
  } else if (pathname === "/case-studies") {
    pageTitle = "Case Studies | Story Tutorials";
    pageDesc = "Discover how Story Tutorials solves complex business challenges through strategic design and development.";
  } else if (pathname === "/about") {
    pageTitle = "About | Story Tutorials";
    pageDesc = "Learn more about us, an independent freelance web development and UI/UX design hub.";
  } else if (pathname === "/terms-of-service") {
    pageTitle = "Terms of Service | Story Tutorials";
    pageDesc = "Read the official Terms of Service and usage guidelines for Story Tutorials.";
  } else if (pathname.includes("/admin")) {
    pageTitle = "Dashboard | Story Tutorials";
    pageDesc = "Admin dashboard for Story Tutorials website management.";
  } else if (pathname.includes("/blogs/")) {
    pageTitle = "Reading Article | Story Tutorials";
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

              {/* 6. ABOUT PAGE */}
              <Route path="/about" element={<AboutCodeLume />} />
              
              {/* 7. TERMS OF SERVICE PAGE */}
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* 8. INDIVIDUAL ARTICLE PAGE */}
              <Route path="/blogs/:slug" element={<Article />} />

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