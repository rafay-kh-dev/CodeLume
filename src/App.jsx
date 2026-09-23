import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import Services from "./components/services";
import OurProcess from "./components/ourprocess";
import Testimonials from "./components/testimonial";
import Blog from "./components/blog";
import Article from "./components/article";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { postsData } from "./data/postsData";

// Yeh function ensure karta hai ke route change hone par page automatically top par scroll ho jaye
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
            {/* 1. ULTRA-MINIMAL HOMEPAGE (No Blogs, No Clutter) */}
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

            {/* 2. DEDICATED BLOG HUB PAGE */}
            <Route path="/insights" element={<Blog posts={postsData} />} />

            {/* 3. INDIVIDUAL ARTICLE PAGE */}
            <Route
              path="/insights/:slug"
              element={<Article posts={postsData} />}
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
