"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Code2,
  Menu,
  X,
  ChevronDown,
  Rocket,
  Target,
  Users,
  Briefcase,
} from "lucide-react";

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

// ==========================================
// CUSTOM ICONS (For New Services)
// ==========================================

// 1. CodeLume Icon (Full Branding)
const CodeLumeIcon = (props) => (
  <Code2 {...props} stroke="url(#antigravity-gradient)" strokeWidth={2.5} />
);

// GitHub Icon - Professional, same style as About / Case Studies pages
const GitHubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
// LinkedIn - clean 24x24, currentColor
const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);
// Facebook - clean 24x24
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
// Instagram - clean 24x24, no gradient IDs
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.789.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.789-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.336 1.384-2.126.296-.766.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.148-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.766-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
  </svg>
);


// 2. Meta Ads Icon - FIXED: viewBox matched to artwork, no translate, no duplicate gradient IDs
const MetaAdsIcon = (props) => (
  <svg viewBox="0 0 256 170" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="#0082FB"
      d="M27.651 112.136c0 9.775 2.146 17.28 4.95 21.82 3.677 5.947 9.16 8.466 14.751 8.466 7.211 0 13.808-1.79 26.52-19.372 10.185-14.092 22.186-33.874 30.26-46.275l13.675-21.01c9.499-14.591 20.493-30.811 33.1-41.806C161.196 4.985 172.298 0 183.47 0c18.758 0 36.625 10.87 50.3 31.257C248.735 53.584 256 81.707 256 110.729c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 19.363-34.818 19.363v-27.616c15.695 0 19.612-14.422 19.612-30.927 0-23.52-5.484-49.623-17.564-68.273-8.574-13.23-19.684-21.313-31.907-21.313-13.22 0-23.859 9.97-35.815 27.75-6.356 9.445-12.882 20.956-20.208 33.944l-8.066 14.289c-16.203 28.728-20.307 35.271-28.408 46.07-14.2 18.91-26.324 26.076-42.287 26.076-18.935 0-30.91-8.2-38.325-20.556C2.973 139.413 0 126.202 0 111.148l27.651.988Z"
    />
    <path
      fill="#0064E1"
      d="M21.802 33.206C34.48 13.666 52.774 0 73.757 0 85.91 0 97.99 3.597 110.605 13.897c13.798 11.261 28.505 29.805 46.853 60.368l6.58 10.967c15.881 26.459 24.917 40.07 30.205 46.49 6.802 8.243 11.565 10.7 17.752 10.7 15.695 0 19.612-14.422 19.612-30.927l24.393-.766c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 19.363-34.818 19.363-11.395 0-21.49-2.475-32.654-13.007-8.582-8.083-18.615-22.443-26.334-35.352l-22.96-38.352C118.528 64.08 107.96 49.73 101.845 43.23c-6.578-6.988-15.036-15.428-28.532-15.428-10.923 0-20.2 7.666-27.963 19.39L21.802 33.206Z"
    />
    <path
      fill="#0082FB"
      d="M73.312 27.802c-10.923 0-20.2 7.666-27.963 19.39-10.976 16.568-17.698 41.245-17.698 64.944 0 9.775 2.146 17.28 4.95 21.82L9.027 149.482C2.973 139.413 0 126.202 0 111.148 0 83.772 7.514 55.24 21.802 33.206 34.48 13.666 52.774 0 73.757 0l-.445 27.802Z"
    />
  </svg>
);

// 3. Google Ads Icon - FIXED: clean Google G, no clipPath / filters / duplicate IDs, viewBox 0 0 24 24 fits fully
const GoogleAdsIcon = (props) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.98 11.98 0 0 0 12 0 11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
    />
  </svg>
);

// 4. LinkedIn Ads Icon
const LinkedInAdsIcon = (props) => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
      fill="#0A66C2"
    />
  </svg>
);

// ==========================================
// DATA ARRAYS (Split into Web & Marketing)
// ==========================================

const webServices = [
  { title: "MERN Stack", link: "/services/mern-stack", icon: ReactIcon },
  { title: "PHP & Laravel", link: "/services/php-laravel", icon: Laravel },
  { title: "Angular Apps", link: "/services/angular-apps", icon: Angular },
  {
    title: "Custom Platforms",
    link: "/services/custom-platforms",
    icon: GcpCloudMonitoring,
  },
  { title: "WordPress Sites", link: "/services/wordpress", icon: Wordpress },
  { title: "Shopify Dev", link: "/services/shopify", icon: Shopify },
  { title: "Webflow Sites", link: "/services/webflow", icon: Webflow },
  {
    title: "API & Integrations",
    link: "/services/api-integrations",
    icon: GcpApiMonetization,
  },
  { title: "Mobile Apps", link: "/services/mobile-apps", icon: Flutter },
  { title: "UI/UX Design", link: "/services/ui-ux-design", icon: Figma },
];

const marketingServices = [
  {
    title: "Full Branding",
    link: "/services/full-branding",
    icon: CodeLumeIcon,
  },
  { title: "Google Ads", link: "/services/google-ads", icon: GoogleAdsIcon },
  { title: "Meta Ads", link: "/services/meta-ads", icon: MetaAdsIcon },
  {
    title: "LinkedIn Ads",
    link: "/services/linkedin-ads",
    icon: LinkedInAdsIcon,
  },
];

const toolsData = [
  { title: "SVG to React JSX", link: "/tools/svg-to-react", icon: ReactIcon },
  { title: "JSON to TypeScript", link: "/tools/json-to-ts", icon: Typescript },
  { title: "JWT Decoder", link: "/tools/jwt-decoder", icon: Jwt },
  {
    title: "Meta Tag Extractor",
    link: "/tools/meta-extractor",
    icon: GoogleSearchConsole,
  },
];

const standardLinks = ["About", "Blogs", "Case Studies"];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState(null);
  const timeoutRef = useRef(null);

  // --- SMART SCROLL LOGIC ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* CORRECTED GRADIENT FOR CODELUME ICON */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient
            id="antigravity-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop stopColor="#4285F4" offset="0%" />
            <stop stopColor="#34A853" offset="33%" />
            <stop stopColor="#FBBC05" offset="66%" />
            <stop stopColor="#EA4335" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

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
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
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
              <Code2
                className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
                stroke="url(#antigravity-gradient)"
                strokeWidth={2.5}
              />
              <h2 className="text-[15px] sm:text-[16px] font-semibold tracking-tight text-black m-0">
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
                    activeMenu === "services"
                      ? "text-black"
                      : "text-[#45474d] hover:text-black"
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "services" ? "rotate-180 text-black" : "text-gray-400"}`}
                  />
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
                    activeMenu === "tools"
                      ? "text-black"
                      : "text-[#45474d] hover:text-black"
                  }`}
                >
                  Free Tools
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === "tools" ? "rotate-180 text-black" : "text-gray-400"}`}
                  />
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

          <div className="flex items-center gap-2 sm:gap-3">
            {/* GitHub - Icon only, so it does not compete with Start Project CTA */}
            {/* Socials - compact professional group */}
            <div className="hidden lg:flex items-center gap-2">
              <a href="https://github.com/rafay-kh-dev" target="_blank" rel="noreferrer" aria-label="View GitHub profile" title="GitHub - @rafay-kh-dev" className="w-[32px] h-[32px] xl:w-[34px] xl:h-[34px] rounded-full bg-white/80 backdrop-blur border border-gray-200 flex items-center justify-center text-black hover:border-black hover:shadow-sm hover:-translate-y-0.5 transition-all outline-none shrink-0"><GitHubIcon className="w-[16px] h-[16px]" /></a>
              <a href="https://www.linkedin.com/in/rafay-codelume/" target="_blank" rel="noreferrer" aria-label="View LinkedIn profile" title="LinkedIn - Rafay" className="w-[32px] h-[32px] xl:w-[34px] xl:h-[34px] rounded-full bg-white/80 backdrop-blur border border-gray-200 flex items-center justify-center text-black hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:shadow-sm hover:-translate-y-0.5 transition-all outline-none shrink-0"><LinkedInIcon className="w-[15px] h-[15px]" /></a>
              <a href="https://www.facebook.com/codelume" target="_blank" rel="noreferrer" aria-label="View Facebook page" title="Facebook - CodeLume" className="w-[32px] h-[32px] xl:w-[34px] xl:h-[34px] rounded-full bg-white/80 backdrop-blur border border-gray-200 flex items-center justify-center text-black hover:text-[#1877F2] hover:border-[#1877F2]/30 hover:shadow-sm hover:-translate-y-0.5 transition-all outline-none shrink-0"><FacebookIcon className="w-[16px] h-[16px]" /></a>
              <a href="https://www.instagram.com/rafay-codelume/" target="_blank" rel="noreferrer" aria-label="View Instagram profile" title="Instagram - @rafay-codelume" className="w-[32px] h-[32px] xl:w-[34px] xl:h-[34px] rounded-full bg-white/80 backdrop-blur border border-gray-200 flex items-center justify-center text-black hover:text-[#E1306C] hover:border-[#E1306C]/30 hover:shadow-sm hover:-translate-y-0.5 transition-all outline-none shrink-0"><InstagramIcon className="w-[16px] h-[16px]" /></a>
            </div>
            <Link
              href="/start-project"
              className="hidden md:flex items-center justify-center px-6 py-2 rounded-full bg-[#111827] text-white hover:bg-black transition-colors outline-none text-[13px] font-medium shadow-sm"
            >
              Start Project
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden relative w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors outline-none ${
                mobileMenuOpen
                  ? "bg-[#2b2b2b] text-white"
                  : "bg-transparent text-black"
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* --- Mega Menu Dropdowns --- */}

        {/* Services Dropdown */}
        <div
          className={`hidden lg:block absolute top-[54px] left-0 w-full bg-white border-b border-gray-200 shadow-sm transition-all duration-200 origin-top overflow-hidden font-jakarta ${
            activeMenu === "services"
              ? "opacity-100 visible scale-y-100"
              : "opacity-0 invisible scale-y-95 pointer-events-none"
          }`}
          onMouseEnter={() => handleMouseEnter("services")}
        >
          <div className="max-w-[1200px] mx-auto px-10 py-10 flex">
            {/* Left Promo Section */}
            <div className="w-[30%] pr-10 border-r border-gray-100 shrink-0">
              <h2 className="text-[28px] font-medium tracking-tight text-black mb-5 leading-[1.15]">
                {/* FIX 1: Agency words replaced with Solo concepts */}
                <span className="font-bold">Explore my</span> custom engineered{" "}
                <span className="font-bold">platforms</span>
              </h2>
              <Link
                href="/services"
                onClick={() => setActiveMenu(null)}
                className="inline-block px-6 py-2.5 rounded-full bg-[#f8f9fa] hover:bg-gray-100 text-black text-[14px] font-medium transition-colors"
              >
                View all Services
              </Link>
            </div>

            {/* Right Split Content Area */}
            <div className="w-[70%] pl-12 flex gap-12">
              {/* Web Capabilities Column */}
              <div className="flex-1">
                <h2 className="text-[13px] text-gray-500 mb-5 font-medium">
                  Web Capabilities
                </h2>
                <div className="grid grid-cols-2 gap-y-5 gap-x-8">
                  {webServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.title}
                        href={service.link}
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center gap-3 group outline-none"
                      >
                        <Icon className="w-4 h-4 shrink-0 text-gray-500 transition-colors group-hover:text-black" />
                        <h2 className="text-[14.5px] text-gray-600 group-hover:text-black transition-colors m-0 font-medium">
                          {service.title}
                        </h2>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Marketing & Branding Column */}
              <div className="w-[200px] shrink-0 border-l border-gray-100 pl-12">
                <h2 className="text-[13px] text-gray-500 mb-5 font-medium whitespace-nowrap">
                  Growth & Branding
                </h2>
                <div className="flex flex-col gap-y-5">
                  {marketingServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.title}
                        href={service.link}
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center gap-3 group outline-none"
                      >
                        <Icon className="w-4 h-4 shrink-0 text-gray-500 transition-colors group-hover:text-black" />
                        <h2 className="text-[14.5px] text-gray-600 group-hover:text-black transition-colors m-0 font-medium whitespace-nowrap">
                          {service.title}
                        </h2>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Dropdown */}
        <div
          className={`hidden lg:block absolute top-[54px] left-0 w-full bg-white border-b border-gray-200 shadow-sm transition-all duration-200 origin-top overflow-hidden font-jakarta ${
            activeMenu === "tools"
              ? "opacity-100 visible scale-y-100"
              : "opacity-0 invisible scale-y-95 pointer-events-none"
          }`}
          onMouseEnter={() => handleMouseEnter("tools")}
        >
          <div className="max-w-[1200px] mx-auto px-10 py-10 flex">
            <div className="w-[35%] pr-10 border-r border-gray-100">
              <h2 className="text-[28px] font-medium tracking-tight text-black mb-5 leading-[1.15]">
                {/* FIX 1: Agency words replaced with Solo concepts */}
                <span className="font-bold">Accelerate with</span> my free
                developer <span className="font-bold">tools</span>
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
              <h2 className="text-[13px] text-gray-500 mb-5 font-medium">
                Developer Tools
              </h2>
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
                      <Icon className="w-4 h-4 shrink-0 text-gray-500 transition-colors group-hover:text-black" />
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
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* FIX 3: Ensures perfect touch scrolling without glitching */}
        <div className="h-full w-full overflow-y-auto overflow-x-hidden no-scrollbar pb-[100px]">
          <div className="border-b border-gray-100">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-6 py-5 bg-white outline-none active:bg-gray-50"
            >
              <span className="text-[16px] font-medium text-black">
                Services
              </span>
              <ChevronDown
                className={`w-4 h-4 text-black transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? "max-h-[1200px]" : "max-h-0"}`}
            >
              <div className="px-6 pb-6 flex flex-col pt-2">
                {/* Web Capabilities Section (Mobile) */}
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 mt-2">
                  Web Capabilities
                </h3>
                <div className="flex flex-col gap-6 mb-8">
                  {webServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.title}
                        href={service.link}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3.5 text-black text-[15px] font-medium hover:text-blue-600 transition-colors"
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        {service.title}
                      </Link>
                    );
                  })}
                </div>

                {/* Growth & Branding Section (Mobile) */}
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 border-t border-gray-100 pt-6">
                  Growth & Branding
                </h3>
                <div className="flex flex-col gap-6">
                  {marketingServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.title}
                        href={service.link}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3.5 text-black text-[15px] font-medium hover:text-blue-600 transition-colors"
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        {service.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100">
            <button
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className="w-full flex items-center justify-between px-6 py-5 bg-white outline-none active:bg-gray-50"
            >
              <span className="text-[16px] font-medium text-black">
                Free Tools
              </span>
              <ChevronDown
                className={`w-4 h-4 text-black transition-transform duration-300 ${mobileToolsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileToolsOpen ? "max-h-[500px]" : "max-h-0"}`}
            >
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
                      <Icon className="w-5 h-5 shrink-0" />
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
              className="flex items-center px-6 py-5 border-b border-gray-100 text-[16px] font-medium text-black bg-white active:bg-gray-50"
            >
              {item}
            </Link>
          ))}

          <div className="p-6 mt-4 flex flex-col gap-3">
            <Link
              href="/start-project"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-4 rounded-xl bg-[#111827] text-white text-[15px] font-medium active:scale-[0.98] transition-transform"
            >
              Start Project
            </Link>
            <div className="flex items-center justify-center gap-3 mt-3">
              <a href="https://github.com/rafay-kh-dev" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} aria-label="GitHub" title="GitHub" className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black active:scale-95 transition-transform shrink-0"><GitHubIcon className="w-[18px] h-[18px]" /></a>
              <a href="https://www.linkedin.com/in/rafay-codelume/" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} aria-label="LinkedIn" title="LinkedIn" className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black active:scale-95 transition-transform shrink-0"><LinkedInIcon className="w-[17px] h-[17px]" /></a>
              <a href="https://www.facebook.com/codelume" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} aria-label="Facebook" title="Facebook" className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black active:scale-95 transition-transform shrink-0"><FacebookIcon className="w-[18px] h-[18px]" /></a>
              <a href="https://www.instagram.com/rafay-codelume/" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} aria-label="Instagram" title="Instagram" className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black active:scale-95 transition-transform shrink-0"><InstagramIcon className="w-[18px] h-[18px]" /></a>
            </div>
            <p className="text-center text-[12px] text-gray-400 font-medium mt-2">Follow me on socials</p>
          </div>
        </div>
      </div>
    </>
  );
}
