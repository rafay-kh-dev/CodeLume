import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import CaseStudies from "./components/casestudies";
import Service from "./components/service";
import DevToolsSection from "./components/devtoolssection";
import OurProcess from "./components/ourprocess";
import Calculator from "./components/calculator";
import Testimonials from "./components/testimonial";
import Blog from "./components/blogs";
import Article from "./components/article";
import CookieBanner from "./components/cookiebanner";
import Services from "./components/services";
import FloatingActions from "./components/floatingactions";
import FAQ from "./components/faq";
import NotFound from "./components/notfound";

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
import AdminEditPost from "./components/admineditpost";
import Footer from "./components/footer";
import AboutCodeLume from "./components/aboutcodelume";
import TermsOfService from "./components/termsofservice";
import PrivacyPolicy from "./components/privacypolicy";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Tools from "./components/tools";
import SvgToReact from "./components/svgtoreact";
import JsonToTs from "./components/jsontots";
import JwtDecoder from "./components/jwtdecoder";
import MetaExtractor from "./components/metaextractor";

// FIXED IMPORTS FOR TUTORIALS & DATA
import TutorialLayout from "./components/tutoriallayout";
import TutorialHub from "./components/tutorialhub";
import { reactCourseData } from "./data/reactCourseData";
import { nodeCourseData } from "./data/nodecoursedata";
import { expressCourseData } from "./data/expresscoursedata";
import { mongodbCourseData } from "./data/mongodbcoursedata";

import TerminalWidget from "./components/terminalwidget";

import PageTransition from "./components/pagetransition";

import GlobalBackground from "./components/globalbackground";

// Security Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

// RouteTracker for SEO & Scroll Reset
function RouteTracker() {
  const { pathname } = useLocation();

  const [seoData, setSeoData] = useState({
    title: "CodeLume® | Bespoke Web Engineering & Digital Agency",
    desc: "We build fast, scalable, and visually stunning digital experiences. From custom web apps to full brand identities, let's scale your business.",
    url: `https://www.codelume.online${pathname}`,
    schema: {},
  });

  useEffect(() => {
    // Add a tiny delay to allow exit animations to finish before snapping to top
    setTimeout(() => window.scrollTo(0, 0), 100);

    let pageTitle = "CodeLume® | Bespoke Web Engineering & Digital Agency";
    let pageDesc =
      "We build fast, scalable, and visually stunning digital experiences. From custom web apps to full brand identities, let's scale your business.";
    let schemaData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "CodeLume",
      url: "https://www.codelume.online",
      description: "Bespoke Web Engineering & Digital Agency built by Rafay.",
      publisher: {
        "@type": "Organization",
        name: "CodeLume",
        logo: {
          "@type": "ImageObject",
          url: "https://www.codelume.online/logo.png",
        },
      },
    };

    if (pathname === "/") {
      pageTitle = "CodeLume® | Bespoke Web Engineering & Digital Agency";
    } else if (pathname === "/start-project") {
      pageTitle = "Start a Project | CodeLume";
      pageDesc =
        "Ready to upgrade your digital presence? Book a consultation with Rafay and let's build something exceptional together.";
    } else if (pathname === "/services") {
      pageTitle = "Services | CodeLume";
      pageDesc =
        "Explore our core services: MERN stack apps, custom Laravel backends, Webflow design, and complete 0-to-100 brand engineering.";
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Web Development & Digital Marketing",
        provider: {
          "@type": "Person",
          name: "Rafay",
          url: "https://www.codelume.online/about",
        },
        description: pageDesc,
        areaServed: "Worldwide",
      };
    } else if (
      pathname === "/services/mern-stack" ||
      pathname === "/mern-stack-development"
    ) {
      pageTitle = "MERN Stack Development | CodeLume";
      pageDesc =
        "Need a fast, scalable web app? We engineer bespoke MERN stack solutions tailored exactly to your business logic. Packages from $149.";
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "MERN Stack Web Development",
        description: pageDesc,
        brand: { "@type": "Brand", name: "CodeLume" },
        offers: {
          "@type": "Offer",
          price: "149.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      };
    } else if (pathname === "/services/php-laravel") {
      pageTitle = "PHP & Laravel Development | CodeLume";
      pageDesc =
        "Bulletproof backend architecture for your business. We build secure, dynamic Laravel applications that scale seamlessly. From $139.";
    } else if (pathname === "/services/angular-apps") {
      pageTitle = "Angular Web App Development | CodeLume";
      pageDesc =
        "High-performance, enterprise-grade Angular frontends built for speed and complexity. Upgrade your user experience today. From $135.";
    } else if (pathname === "/services/wordpress") {
      pageTitle = "WordPress Development | CodeLume";
      pageDesc =
        "High-converting WooCommerce stores and custom WordPress themes. Fast, secure, and easily manageable CMS solutions starting at $100.";
    } else if (pathname === "/services/shopify") {
      pageTitle = "Shopify Development | CodeLume";
      pageDesc =
        "Turn visitors into buyers. We build bespoke, high-converting Shopify storefronts with custom Liquid coding and seamless integrations.";
    } else if (pathname === "/services/webflow") {
      pageTitle = "Webflow Website Development | CodeLume";
      pageDesc =
        "Pixel-perfect, award-winning Webflow websites with advanced GSAP animations and zero bloat. Stand out from the competition.";
    } else if (pathname === "/services/custom-platforms") {
      pageTitle = "Custom Web Platforms | CodeLume";
      pageDesc =
        "Have a complex app idea? We engineer custom SaaS platforms, portals, and dashboards from the ground up. Enterprise solutions from $299.";
    } else if (pathname === "/services/api-integrations") {
      pageTitle = "API Development & Integration | CodeLume";
      pageDesc =
        "Connect your systems flawlessly. We build secure REST/GraphQL APIs and handle complex third-party data synchronisation. Starting at $99.";
    } else if (pathname === "/services/mobile-apps") {
      pageTitle = "Mobile App Development | CodeLume";
      pageDesc =
        "High-performance, cross-platform mobile apps built to scale. Take your business native with bespoke iOS and Android solutions.";
    } else if (pathname === "/services/ui-ux-design") {
      pageTitle = "UI/UX Design That Converts | CodeLume";
      pageDesc =
        "Data-driven interface design that converts. We craft stunning, user-centric web and mobile experiences from wireframe to final handoff.";
    } else if (pathname === "/services/full-branding") {
      pageTitle = "Services | CodeLume";
      pageDesc =
        "The ultimate launchpad. Bespoke logo design, enterprise web development, and targeted SEO to launch and scale your brand globally.";
    } else if (pathname === "/blogs") {
      pageTitle = "Blogs | CodeLume";
      pageDesc =
        "Real-world technical tutorials, UI/UX trends, and digital strategy insights from an active full-stack developer.";
    } else if (pathname === "/case-studies" || pathname === "/portfolio") {
      pageTitle = "Case Studies | CodeLume";
      pageDesc =
        "See exactly how we solve complex business challenges through strategic design and bespoke web engineering.";
    } else if (pathname === "/about") {
      pageTitle = "About | CodeLume";
      pageDesc =
        "Meet the engineer behind CodeLume. I specialise in the MERN stack, Laravel, and bespoke UI/UX design to help businesses grow.";
    } else if (pathname === "/terms-of-service" || pathname === "/terms") {
      pageTitle = "Terms of Service | CodeLume";
      pageDesc =
        "Our operational guidelines and terms of service for engaging with CodeLume's web development and design projects.";
    } else if (pathname === "/privacy-policy" || pathname === "/privacy") {
      pageTitle = "Privacy Policy | CodeLume";
      pageDesc =
        "How we protect, manage, and secure your personal data across the CodeLume ecosystem.";
    } else if (pathname === "/admin/login") {
      pageTitle = "Admin Login | CodeLume";
      pageDesc = "Secure portal for CodeLume administration.";
    } else if (pathname.includes("/admin")) {
      pageTitle = "Dashboard | CodeLume Admin";
      pageDesc = "Content management and administration dashboard.";
    } else if (pathname.includes("/blogs/")) {
      pageTitle = "Article | CodeLume Insights";
    } else if (pathname === "/tools") {
      pageTitle = "Free Developer Tools | CodeLume";
      pageDesc =
        "Free, lightning-fast developer utilities to optimise your workflow. SVG converters, JWT decoders, and Meta tag extractors by CodeLume.";
    } else if (pathname === "/tools/svg-to-react") {
      pageTitle = "Free SVG to React Component Converter | CodeLume";
      pageDesc =
        "Instantly convert SVG files into reusable React components. A free developer tool by CodeLume.";
    } else if (pathname === "/tools/json-to-ts") {
      pageTitle = "Free JSON to TypeScript Interface Generator | CodeLume";
      pageDesc =
        "Instantly generate TypeScript interfaces and types from JSON data. A free developer tool by CodeLume.";
    } else if (pathname === "/tools/jwt-decoder") {
      pageTitle = "Free JWT Decoder | CodeLume";
      pageDesc =
        "Securely decode, verify, and inspect JSON Web Tokens (JWT) directly in your browser. A free developer tool by CodeLume.";
    } else if (pathname === "/tools/meta-extractor") {
      pageTitle = "Free Meta Tag Extractor | CodeLume";
      pageDesc =
        "Extract and preview SEO meta tags, Open Graph data, and social media cards from any live URL. A free developer tool by CodeLume.";
    } else if (pathname.startsWith("/tutorials")) {
      pageTitle = "Tutorials | CodeLume";
      pageDesc =
        "Read our structured developer notes. Learn React, Node.js, and technical SEO completely free.";
    }

    setSeoData({
      title: pageTitle,
      desc: pageDesc,
      url: `https://www.codelume.online${pathname}`,
      schema: schemaData,
    });
  }, [pathname]);

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.desc} />
      <link rel="canonical" href={seoData.url} />

      <meta
        property="og:type"
        content={pathname.includes("/blogs/") ? "article" : "website"}
      />
      <meta property="og:url" content={seoData.url} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.desc} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.desc} />

      {seoData.schema && Object.keys(seoData.schema).length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.schema) }}
        />
      ) : null}
    </Helmet>
  );
}

// NEW: Extracted Routes Component for Animation Tracking
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Hero />
              <About />
              <Service />
              <DevToolsSection />
              <Calculator />
              <OurProcess />
              <FAQ />
              <Testimonials />
            </PageTransition>
          }
        />

        <Route path="/start-project" element={<PageTransition><StartProject /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />

        {/* DUAL ROUTES */}
        <Route path="/services/mern-stack" element={<PageTransition><MernStackService /></PageTransition>} />
        <Route path="/mern-stack-development" element={<PageTransition><MernStackService /></PageTransition>} />

        <Route path="/services/php-laravel" element={<PageTransition><PhpLaravelService /></PageTransition>} />
        <Route path="/services/angular-apps" element={<PageTransition><AngularAppsService /></PageTransition>} />
        <Route path="/services/wordpress" element={<PageTransition><WordPressService /></PageTransition>} />
        <Route path="/services/shopify" element={<PageTransition><ShopifyService /></PageTransition>} />
        <Route path="/services/webflow" element={<PageTransition><WebflowService /></PageTransition>} />
        <Route path="/services/custom-platforms" element={<PageTransition><CustomPlatformsService /></PageTransition>} />
        <Route path="/services/api-integrations" element={<PageTransition><ApiIntegrationsService /></PageTransition>} />
        <Route path="/services/mobile-apps" element={<PageTransition><MobileAppsService /></PageTransition>} />
        <Route path="/services/ui-ux-design" element={<PageTransition><UiUxDesignService /></PageTransition>} />
        <Route path="/services/full-branding" element={<PageTransition><FullBrandingService /></PageTransition>} />

        <Route path="/blogs" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blogs/:slug" element={<PageTransition><Article /></PageTransition>} />

        <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><CaseStudies /></PageTransition>} />

        <Route path="/about" element={<PageTransition><AboutCodeLume /></PageTransition>} />

        <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TermsOfService /></PageTransition>} />

        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />

        <Route path="/tools" element={<PageTransition><Tools /></PageTransition>} />
        <Route path="/tools/svg-to-react" element={<PageTransition><SvgToReact /></PageTransition>} />
        <Route path="/tools/json-to-ts" element={<PageTransition><JsonToTs /></PageTransition>} />
        <Route path="/tools/jwt-decoder" element={<PageTransition><JwtDecoder /></PageTransition>} />
        <Route path="/tools/meta-extractor" element={<PageTransition><MetaExtractor /></PageTransition>} />

        <Route path="/tutorials" element={<PageTransition><TutorialHub /></PageTransition>} />
        <Route
          path="/tutorials/react"
          element={
            <PageTransition>
              <TutorialLayout courseData={reactCourseData} courseTitle="React Mastery" />
            </PageTransition>
          }
        />
        <Route
          path="/tutorials/node"
          element={
            <PageTransition>
              <TutorialLayout courseData={nodeCourseData} courseTitle="Node.js Architecture" />
            </PageTransition>
          }
        />
        <Route
          path="/tutorials/express"
          element={
            <PageTransition>
              <TutorialLayout courseData={expressCourseData} courseTitle="Express.js APIs" />
            </PageTransition>
          }
        />
        <Route
          path="/tutorials/mongodb"
          element={
            <PageTransition>
              <TutorialLayout courseData={mongodbCourseData} courseTitle="MongoDB Databases" />
            </PageTransition>
          }
        />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <PageTransition><AdminDashboard /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-post"
          element={
            <ProtectedRoute>
              <PageTransition><AdminCreatePost /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-post/:id"
          element={
            <ProtectedRoute>
              <PageTransition><AdminEditPost /></PageTransition>
            </ProtectedRoute>
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <RouteTracker />
        <div className="min-h-screen bg-[#030712] text-white selection:bg-blue-500 selection:text-white">
          {/* Navbar sits outside the routes so it doesn't animate out */}

          <GlobalBackground />

          <style>
            {`
              main section, main div {
                background-color: transparent !important;
              }
            `}
          </style>

          <Navbar />

          <main>
            {/* The routes and their animations happen here */}
            <AnimatedRoutes />
          </main>

          {/* Footer and fixed elements sit outside so they stay stable */}
          <Footer />
          <CookieBanner />
          <FloatingActions />
          <TerminalWidget />
          <Analytics />
          <SpeedInsights />
        </div>
      </Router>
    </HelmetProvider>
  );
}