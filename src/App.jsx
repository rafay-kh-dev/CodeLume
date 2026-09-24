import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate, // Imported Navigate for redirects
} from "react-router-dom";
import Navbar from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import Services from "./components/services";
import OurProcess from "./components/ourprocess";
import Testimonials from "./components/testimonial";
import Blog from "./components/blogs";
import Article from "./components/article";
import StartProject from "./components/startproject";
import AdminCreatePost from "./components/admincreatepost";
import AdminLogin from "./components/adminlogin"; // Imported Admin Login
import AdminDashboard from "./components/admindashboard"; // Imported Admin Dashboard
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Security Wrapper: Checks for a valid token before rendering the admin page
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
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
