"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Code2, Menu, X, ChevronDown } from "lucide-react";

// Official SVG Icons
import {
  React as ReactIcon,
  Laravel,
  Angular,
  Wordpress,
  Shopify,
  Webflow,
  GcpCloudMonitoring,
  GcpApiMonetization,
  Flutter,
  Figma,
  Typescript,
  Jwt,
  GoogleSearchConsole,
} from "@thesvg/react";

const servicesData = [
  { title: "MERN Stack", link: "/services/mern-stack", icon: ReactIcon },
  { title: "PHP & Laravel", link: "/services/php-laravel", icon: Laravel },
  { title: "Angular Apps", link: "/services/angular-apps", icon: Angular },
  { title: "Custom Platforms", link: "/services/custom-platforms", icon: GcpCloudMonitoring },
  { title: "WordPress Sites", link: "/services/wordpress", icon: Wordpress },
  { title: "Shopify Dev", link: "/services/shopify", icon: Shopify },
  { title: "Webflow Sites", link: "/services/webflow", icon: Webflow },
  { title: "API & Integrations", link: "/services/api-integrations", icon: GcpApiMonetization },
  { title: "Mobile Apps", link: "/services/mobile-apps", icon: Flutter },
  { title: "UI/UX Design", link: "/services/ui-ux-design", icon: Figma },
];

const toolsData = [
  { title: "SVG to React JSX", link: "/tools/svg-to-react", icon: ReactIcon },
  { title: "JSON to TypeScript", link: "/tools/json-to-ts", icon: Typescript },
  { title: "JWT Decoder", link: "/tools/jwt-decoder", icon: Jwt },
  { title: "Meta Tag Extractor", link: "/tools/meta-extractor", icon: GoogleSearchConsole },
];

const standardLinks = ["About", "Blogs", "Case Studies"];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  
  const [activeMenu, setActiveMenu] = useState(null);
  const timeoutRef = useRef(null);

  // --- NEW: SMART SCROLL LOGIC ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Agar hum top se thora neechay hain (background white dikhane ke liye)
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Hide/Show logic based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling Down & past threshold -> Hide Header
        setIsHidden(true);
      } else {
        // Scrolling Up -> Show Header
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // -------------------------------

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* CORRECTED GRADIENT: Diagonal layout makes colors pop evenly on the icon */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="antigravity-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#4285F4" offset="0%" />
            <stop stopColor="#34A853" offset="33%" />
            <stop stopColor="#FBBC05" offset="66%" />
            <stop stopColor="#EA4335" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      {/* 
        UPDATED HEADER WRAPPER:
        - Added translate-y logic based on `isHidden`
        - Added dynamic background and shadow based on `isScrolled`
        - Maintained absolute transition logic
      */}
      <header
        className={`fixed top-0 inset-x-0 z-[60] h-[54px] flex items-center font-jakarta transition-all duration-300 transform ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          mobileMenuOpen || isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent border-transparent"
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full px-8 md:px-12 lg:px-16 flex items-center justify-between">
          
          <div className="flex items-center">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-1.5 outline-none group shrink-0"
              onClick={() => {
                setActiveMenu(null);
                setMobileMenuOpen(false);
              }}
            >
              <Code2 className="w-[24px] h-[24px]" stroke="url(#antigravity-gradient)" strokeWidth={2.5} />
              <h2 className="text-[16px] font-semibold tracking-tight text-black m-0">
                CodeLume
              </h2>
            </Link>

            <nav className="hidden lg:flex items-center gap-7 ml-12">
              <div
                className="relative h-[54px] flex items-center"
                onMouseEnter={() => handleMouseEnter("services")}
              >
                <Link
                  href="/services"
                  onClick={() => setActiveMenu(null)}
                  className={`flex items-center gap-1.5 outline-none transition-colors duration-200 text-[14px] font-medium ${
                    activeMenu === "services" ? "text-black" : "text-[#45474d] hover:text-black"
                  }`}
                >
                  Products
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "services" ? "rotate-180 text-black" : "text-gray-400"}`} />
                </Link>
              </div>

              <div
                className="relative h-[54px] flex items-center"
                onMouseEnter={() => handleMouseEnter("tools")}
              >
                <Link
                  href="/tools"
                  onClick={() => setActiveMenu(null)}
                  className={`flex items-center gap-1.5 outline-none transition-colors duration-200 text-[14px] font-medium ${
                    activeMenu === "tools" ? "text-black" : "text-[#45474d] hover:text-black"
                  }`}
                >
                  Free Tools
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "tools" ? "rotate-180 text-black" : "text-gray-400"}`} />
                </Link>
              </div>

              {standardLinks.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="outline-none text-[#45474d] hover:text-black text-[14px] font-medium transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/start-project"
              className="hidden md:flex items-center justify-center px-6 py-2 rounded-full bg-[#111827] text-white hover:bg-black transition-colors outline-none text-[13px] font-medium shadow-sm"
            >
              Start Project
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden relative w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors outline-none ${
                mobileMenuOpen ? "bg-[#2b2b2b] text-white" : "bg-transparent text-black"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-6 h-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* --- Mega Menu Dropdowns --- */}
        <div
          className={`hidden lg:block absolute top-[54px] left-0 w-full bg-white border-b border-gray-200 shadow-sm transition-all duration-200 origin-top overflow-hidden font-jakarta ${
            activeMenu === "services" ? "opacity-100 visible scale-y-100" : "opacity-0 invisible scale-y-95 pointer-events-none"
          }`}
          onMouseEnter={() => handleMouseEnter("services")}
        >
          <div className="max-w-[1200px] mx-auto px-10 py-10 flex">
            <div className="w-[35%] pr-10 border-r border-gray-100">
              <h2 className="text-[28px] font-medium tracking-tight text-black mb-5 leading-[1.15]">
                <span className="font-bold">Explore our</span> custom engineered <span className="font-bold">platforms</span>
              </h2>
              <Link
                href="/services"
                onClick={() => setActiveMenu(null)}
                className="inline-block px-6 py-2.5 rounded-full bg-[#f8f9fa] hover:bg-gray-100 text-black text-[14px] font-medium transition-colors"
              >
                View all products
              </Link>
            </div>
            <div className="w-[65%] pl-12">
              <h2 className="text-[13px] text-gray-500 mb-5 font-medium">Web Capabilities</h2>
              <div className="grid grid-cols-2 gap-y-5 gap-x-8">
                {servicesData.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.title}
                      href={service.link}
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center gap-3 group outline-none"
                    >
                      <Icon className="w-4 h-4 text-gray-500 transition-colors group-hover:text-black" />
                      <h2 className="text-[14.5px] text-gray-600 group-hover:text-black transition-colors m-0 font-medium">
                        {service.title}
                      </h2>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`hidden lg:block absolute top-[54px] left-0 w-full bg-white border-b border-gray-200 shadow-sm transition-all duration-200 origin-top overflow-hidden font-jakarta ${
            activeMenu === "tools" ? "opacity-100 visible scale-y-100" : "opacity-0 invisible scale-y-95 pointer-events-none"
          }`}
          onMouseEnter={() => handleMouseEnter("tools")}
        >
          <div className="max-w-[1200px] mx-auto px-10 py-10 flex">
            <div className="w-[35%] pr-10 border-r border-gray-100">
              <h2 className="text-[28px] font-medium tracking-tight text-black mb-5 leading-[1.15]">
                <span className="font-bold">Accelerate with</span> our free developer <span className="font-bold">tools</span>
              </h2>
              <Link
                href="/tools"
                onClick={() => setActiveMenu(null)}
                className="inline-block px-6 py-2.5 rounded-full bg-[#f8f9fa] hover:bg-gray-100 text-black text-[14px] font-medium transition-colors"
              >
                View all tools
              </Link>
            </div>
            <div className="w-[65%] pl-12">
              <h2 className="text-[13px] text-gray-500 mb-5 font-medium">Developer Tools</h2>
              <div className="grid grid-cols-2 gap-y-5 gap-x-8">
                {toolsData.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.title}
                      href={tool.link}
                      onClick={() => setActiveMenu(null)}
                      className="flex items-center gap-3 group outline-none"
                    >
                      <Icon className="w-4 h-4 text-gray-500 transition-colors group-hover:text-black" />
                      <h2 className="text-[14.5px] text-gray-600 group-hover:text-black transition-colors m-0 font-medium">
                        {tool.title}
                      </h2>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu Canvas --- */}
      <div
        className={`lg:hidden fixed inset-0 z-[50] bg-white transition-opacity duration-300 font-jakarta pt-[54px] ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full overflow-y-auto w-full no-scrollbar pb-24">
          <div className="border-b border-gray-100">
            <button 
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-6 py-5 bg-white outline-none"
            >
              <span className="text-[16px] font-medium text-black">Products</span>
              <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? "max-h-[800px]" : "max-h-0"}`}>
              <div className="px-6 pb-6 flex flex-col gap-6 pt-2">
                {servicesData.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.title}
                      href={service.link}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3.5 text-black text-[15px] font-medium hover:text-blue-600 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-slate-800" />
                      {service.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100">
            <button 
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className="w-full flex items-center justify-between px-6 py-5 bg-white outline-none"
            >
              <span className="text-[16px] font-medium text-black">Free Tools</span>
              <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${mobileToolsOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileToolsOpen ? "max-h-[500px]" : "max-h-0"}`}>
              <div className="px-6 pb-6 flex flex-col gap-6 pt-2">
                {toolsData.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.title}
                      href={tool.link}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3.5 text-black text-[15px] font-medium hover:text-blue-600 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-slate-800" />
                      {tool.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {standardLinks.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-6 py-5 border-b border-gray-100 text-[16px] font-medium text-black bg-white"
            >
              {item}
            </Link>
          ))}

          <Link
            href="/start-project"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center px-6 py-5 border-b border-gray-100 text-[16px] font-medium text-black bg-white"
          >
            Start Project
          </Link>
          
        </div>
      </div>
    </>
  );
}