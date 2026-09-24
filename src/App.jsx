import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate, 
} from "react-router-dom";
import Navbar from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import CaseStudies from "./components/casestudies";
import Services from "./components/services";
import OurProcess from "./components/ourprocess";
import Testimonials from "./components/testimonial";
import Blog from "./components/blogs";
import Article from "./components/article";
import StartProject from "./components/startproject";
import AdminCreatePost from "./components/admincreatepost";
import AdminLogin from "./components/adminlogin";
import AdminDashboard from "./components/admindashboard";
import Footer from "./components/footer";
import AboutCodeLume from "./components/aboutcodelume";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Security Wrapper: Checks for a valid token before rendering the admin page
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

// Upgraded Function: Handles both scrolling to top AND updating Tab Titles
function RouteTracker() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // 1. Scroll to the top of the page on route change
    window.scrollTo(0, 0);

    // 2. Dynamically update the browser tab title
    // Home page ka original title yahan set hai
    let pageTitle = "CodeLume"; 

    if (pathname === "/") {
      pageTitle = "CodeLume® | Bespoke Web Engineering & Digital Agency";
    } else if (pathname === "/start-project") {
      pageTitle = "Start a Project | CodeLume";
    } else if (pathname === "/blogs") {
      pageTitle = "Blogs | CodeLume";
    } else if (pathname === "/case-studies") {
      pageTitle = "Case Studies | CodeLume";
    } else if (pathname === "/about") {
      pageTitle = "About | CodeLume";
    } else if (pathname.includes("/admin")) {
      pageTitle = "Dashboard | CodeLume";
    } else if (pathname.includes("/blogs/")) {
      pageTitle = "Reading Article | CodeLume";
    }

    document.title = pageTitle;
  }, [pathname]);
  
  return null;
}

export default function App() {
  return (
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
                  <Services />
                  <OurProcess />
                  <Testimonials />
                </>
              }
            />

            {/* 2. START A PROJECT / LEAD PAGE */}
            <Route path="/start-project" element={<StartProject />} />

            {/* 3. DEDICATED BLOG HUB PAGE */}
            <Route path="/blogs" element={<Blog />} />

            {/* CASE STUDIES PAGE */}
            <Route path="/case-studies" element={<CaseStudies />} />

            {/* NEW: ABOUT CODELUME PAGE */}
            <Route path="/about" element={<AboutCodeLume />} />

            {/* 4. INDIVIDUAL ARTICLE PAGE */}
            <Route path="/blogs/:slug" element={<Article />} />

            {/* 5. ADMIN LOGIN PAGE */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* 6. ADMIN DASHBOARD (SECURED) */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 7. ADMIN CREATE POST (SECURED) */}
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
  );
}