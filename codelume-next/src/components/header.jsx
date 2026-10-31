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

// 2. Meta Ads Icon
const MetaAdsIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
    <defs>
      <linearGradient
        id="meta-a"
        x1="13.878%"
        x2="89.144%"
        y1="55.934%"
        y2="58.694%"
      >
        <stop offset="0%" stopColor="#0064E1" />
        <stop offset="40%" stopColor="#0064E1" />
        <stop offset="83%" stopColor="#0073EE" />
        <stop offset="100%" stopColor="#0082FB" />
      </linearGradient>
      <linearGradient
        id="meta-b"
        x1="54.315%"
        x2="54.315%"
        y1="82.782%"
        y2="39.307%"
      >
        <stop offset="0%" stopColor="#0082FB" />
        <stop offset="100%" stopColor="#0064E0" />
      </linearGradient>
    </defs>
    <g transform="translate(0, 42.5)">
      <path
        fill="#0081FB"
        d="M27.651 112.136c0 9.775 2.146 17.28 4.95 21.82 3.677 5.947 9.16 8.466 14.751 8.466 7.211 0 13.808-1.79 26.52-19.372 10.185-14.092 22.186-33.874 30.26-46.275l13.675-21.01c9.499-14.591 20.493-30.811 33.1-41.806C161.196 4.985 172.298 0 183.47 0c18.758 0 36.625 10.87 50.3 31.257C248.735 53.584 256 81.707 256 110.729c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 19.363-34.818 19.363v-27.616c15.695 0 19.612-14.422 19.612-30.927 0-23.52-5.484-49.623-17.564-68.273-8.574-13.23-19.684-21.313-31.907-21.313-13.22 0-23.859 9.97-35.815 27.75-6.356 9.445-12.882 20.956-20.208 33.944l-8.066 14.289c-16.203 28.728-20.307 35.271-28.408 46.07-14.2 18.91-26.324 26.076-42.287 26.076-18.935 0-30.91-8.2-38.325-20.556C2.973 139.413 0 126.202 0 111.148l27.651.988Z"
      />
      <path
        fill="url(#meta-a)"
        d="M21.802 33.206C34.48 13.666 52.774 0 73.757 0 85.91 0 97.99 3.597 110.605 13.897c13.798 11.261 28.505 29.805 46.853 60.368l6.58 10.967c15.881 26.459 24.917 40.07 30.205 46.49 6.802 8.243 11.565 10.7 17.752 10.7 15.695 0 19.612-14.422 19.612-30.927l24.393-.766c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 19.363-34.818 19.363-11.395 0-21.49-2.475-32.654-13.007-8.582-8.083-18.615-22.443-26.334-35.352l-22.96-38.352C118.528 64.08 107.96 49.73 101.845 43.23c-6.578-6.988-15.036-15.428-28.532-15.428-10.923 0-20.2 7.666-27.963 19.39L21.802 33.206Z"
      />
      <path
        fill="url(#meta-b)"
        d="M73.312 27.802c-10.923 0-20.2 7.666-27.963 19.39-10.976 16.568-17.698 41.245-17.698 64.944 0 9.775 2.146 17.28 4.95 21.82L9.027 149.482C2.973 139.413 0 126.202 0 111.148 0 83.772 7.514 55.24 21.802 33.206 34.48 13.666 52.774 0 73.757 0l-.445 27.802Z"
      />
    </g>
  </svg>
);

// 3. Google Ads Icon
const GoogleAdsIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 268.152 273.883"
    {...props}
  >
    <defs>
      <linearGradient id="google-a">
        <stop offset="0" stopColor="#0fbc5c" />
        <stop offset="1" stopColor="#0cba65" />
      </linearGradient>
      <linearGradient id="google-g">
        <stop offset=".231" stopColor="#0fbc5f" />
        <stop offset=".312" stopColor="#0fbc5f" />
        <stop offset=".366" stopColor="#0fbc5e" />
        <stop offset=".458" stopColor="#0fbc5d" />
        <stop offset=".54" stopColor="#12bc58" />
        <stop offset=".699" stopColor="#28bf3c" />
        <stop offset=".771" stopColor="#38c02b" />
        <stop offset=".861" stopColor="#52c218" />
        <stop offset=".915" stopColor="#67c30f" />
        <stop offset="1" stopColor="#86c504" />
      </linearGradient>
      <linearGradient id="google-h">
        <stop offset=".142" stopColor="#1abd4d" />
        <stop offset=".248" stopColor="#6ec30d" />
        <stop offset=".312" stopColor="#8ac502" />
        <stop offset=".366" stopColor="#a2c600" />
        <stop offset=".446" stopColor="#c8c903" />
        <stop offset=".54" stopColor="#ebcb03" />
        <stop offset=".616" stopColor="#f7cd07" />
        <stop offset=".699" stopColor="#fdcd04" />
        <stop offset=".771" stopColor="#fdce05" />
        <stop offset=".861" stopColor="#ffce0a" />
      </linearGradient>
      <linearGradient id="google-f">
        <stop offset=".316" stopColor="#ff4c3c" />
        <stop offset=".604" stopColor="#ff692c" />
        <stop offset=".727" stopColor="#ff7825" />
        <stop offset=".885" stopColor="#ff8d1b" />
        <stop offset="1" stopColor="#ff9f13" />
      </linearGradient>
      <linearGradient id="google-b">
        <stop offset=".231" stopColor="#ff4541" />
        <stop offset=".312" stopColor="#ff4540" />
        <stop offset=".458" stopColor="#ff4640" />
        <stop offset=".54" stopColor="#ff473f" />
        <stop offset=".699" stopColor="#ff5138" />
        <stop offset=".771" stopColor="#ff5b33" />
        <stop offset=".861" stopColor="#ff6c29" />
        <stop offset="1" stopColor="#ff8c18" />
      </linearGradient>
      <linearGradient id="google-d">
        <stop offset=".408" stopColor="#fb4e5a" />
        <stop offset="1" stopColor="#ff4540" />
      </linearGradient>
      <linearGradient id="google-c">
        <stop offset=".132" stopColor="#0cba65" />
        <stop offset=".21" stopColor="#0bb86d" />
        <stop offset=".297" stopColor="#09b479" />
        <stop offset=".396" stopColor="#08ad93" />
        <stop offset=".477" stopColor="#0aa6a9" />
        <stop offset=".568" stopColor="#0d9cc6" />
        <stop offset=".667" stopColor="#1893dd" />
        <stop offset=".769" stopColor="#258bf1" />
        <stop offset=".859" stopColor="#3086ff" />
      </linearGradient>
      <linearGradient id="google-e">
        <stop offset=".366" stopColor="#ff4e3a" />
        <stop offset=".458" stopColor="#ff8a1b" />
        <stop offset=".54" stopColor="#ffa312" />
        <stop offset=".616" stopColor="#ffb60c" />
        <stop offset=".771" stopColor="#ffcd0a" />
        <stop offset=".861" stopColor="#fecf0a" />
        <stop offset=".915" stopColor="#fecf08" />
        <stop offset="1" stopColor="#fdcd01" />
      </linearGradient>
      <linearGradient
        xlinkHref="#google-a"
        id="google-s"
        x1="219.7"
        x2="254.467"
        y1="329.535"
        y2="329.535"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google-b"
        id="google-m"
        cx="109.627"
        cy="135.862"
        r="71.46"
        fx="109.627"
        fy="135.862"
        gradientTransform="matrix(-1.93688 1.043 1.45573 2.55542 290.525 -400.634)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google-c"
        id="google-n"
        cx="45.259"
        cy="279.274"
        r="71.46"
        fx="45.259"
        fy="279.274"
        gradientTransform="matrix(-3.5126 -4.45809 -1.69255 1.26062 870.8 191.554)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google-d"
        id="google-l"
        cx="304.017"
        cy="118.009"
        r="47.854"
        fx="304.017"
        fy="118.009"
        gradientTransform="matrix(2.06435 0 0 2.59204 -297.679 -151.747)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google-e"
        id="google-o"
        cx="181.001"
        cy="177.201"
        r="71.46"
        fx="181.001"
        fy="177.201"
        gradientTransform="matrix(-.24858 2.08314 2.96249 .33417 -255.146 -331.164)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google-f"
        id="google-p"
        cx="207.673"
        cy="108.097"
        r="41.102"
        fx="207.673"
        fy="108.097"
        gradientTransform="matrix(-1.2492 1.34326 -3.89684 -3.4257 880.501 194.905)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google-g"
        id="google-r"
        cx="109.627"
        cy="135.862"
        r="71.46"
        fx="109.627"
        fy="135.862"
        gradientTransform="matrix(-1.93688 -1.043 1.45573 -2.55542 290.525 838.683)"
        gradientUnits="userSpaceOnUse"
      />
      <radialGradient
        xlinkHref="#google-h"
        id="google-j"
        cx="154.87"
        cy="145.969"
        r="71.46"
        fx="154.87"
        fy="145.969"
        gradientTransform="matrix(-.0814 -1.93722 2.92674 -.11625 -215.135 632.86)"
        gradientUnits="userSpaceOnUse"
      />
      <filter
        id="google-q"
        width="1.097"
        height="1.116"
        x="-.048"
        y="-.058"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation="1.701" />
      </filter>
      <filter
        id="google-k"
        width="1.033"
        height="1.02"
        x="-.017"
        y="-.01"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation=".242" />
      </filter>
      <clipPath id="google-i" clipPathUnits="userSpaceOnUse">
        <path d="M371.378 193.24H237.083v53.438h77.167c-1.241 7.563-4.026 15.003-8.105 21.786-4.674 7.773-10.451 13.69-16.373 18.196-17.74 13.498-38.42 16.258-52.783 16.258-36.283 0-67.283-23.286-79.285-54.928-.484-1.149-.805-2.335-1.197-3.507a81.115 81.115 0 0 1-4.101-25.448c0-9.226 1.569-18.057 4.43-26.398 11.285-32.897 42.985-57.467 80.179-57.467 7.481 0 14.685.884 21.517 2.648a77.668 77.668 0 0 1 33.425 18.25l40.834-39.712c-24.839-22.616-57.219-36.32-95.844-36.32-30.878 0-59.386 9.553-82.748 25.7-18.945 13.093-34.483 30.625-44.97 50.985-9.753 18.879-15.094 39.8-15.094 62.294 0 22.495 5.35 43.633 15.103 62.337v.126c10.302 19.857 25.368 36.954 43.678 49.988 15.997 11.386 44.68 26.551 84.031 26.551 22.63 0 42.687-4.051 60.375-11.644 12.76-5.478 24.065-12.622 34.301-21.804 13.525-12.132 24.117-27.139 31.347-44.404 7.23-17.265 11.097-36.79 11.097-57.957 0-9.858-.998-19.87-2.689-28.968Z" />
      </clipPath>
    </defs>
    <g
      clipPath="url(#google-i)"
      transform="matrix(.95792 0 0 .98525 -90.174 -78.856)"
    >
      <path
        fill="url(#google-j)"
        d="M92.076 219.958c.148 22.14 6.501 44.983 16.117 63.424v.127c6.949 13.392 16.445 23.97 27.26 34.452l65.327-23.67c-12.36-6.235-14.246-10.055-23.105-17.026-9.054-9.066-15.802-19.473-20.004-31.677h-.17l.17-.127c-2.765-8.058-3.037-16.613-3.14-25.503Z"
        filter="url(#google-k)"
      />
      <path
        fill="url(#google-l)"
        d="M237.083 79.025c-6.456 22.526-3.988 44.421 0 57.161 7.457.006 14.64.888 21.45 2.647a77.662 77.662 0 0 1 33.424 18.25l41.88-40.726c-24.81-22.59-54.667-37.297-96.754-37.332Z"
        filter="url(#google-k)"
      />
      <path
        fill="url(#google-m)"
        d="M236.943 78.847c-31.67 0-60.91 9.798-84.871 26.359a145.533 145.533 0 0 0-24.332 21.15c-1.904 17.744 14.257 39.551 46.262 39.37 15.528-17.936 38.495-29.542 64.056-29.542l.07.002-1.044-57.335c-.048 0-.093-.004-.14-.004Z"
        filter="url(#google-k)"
      />
      <path
        fill="url(#google-n)"
        d="m341.475 226.379-28.268 19.285c-1.24 7.562-4.028 15.002-8.107 21.786-4.674 7.772-10.45 13.69-16.373 18.196-17.702 13.47-38.328 16.244-52.687 16.255-14.842 25.102-17.444 37.675 1.043 57.934 22.877-.016 43.157-4.117 61.046-11.796 12.931-5.551 24.388-12.792 34.761-22.097 13.706-12.295 24.442-27.503 31.769-45 7.327-17.497 11.245-37.282 11.245-58.734Z"
        filter="url(#google-k)"
      />
      <path
        fill="#3086ff"
        d="M234.996 191.21v57.498h136.006c1.196-7.874 5.152-18.064 5.152-26.5 0-9.858-.996-21.899-2.687-30.998Z"
        filter="url(#google-k)"
      />
      <path
        fill="url(#google-o)"
        d="M128.39 124.327c-8.394 9.119-15.564 19.326-21.249 30.364-9.753 18.879-15.094 41.83-15.094 64.324 0 .317.026.627.029.944 4.32 8.224 59.666 6.649 62.456 0-.004-.31-.039-.613-.039-.924 0-9.226 1.57-16.026 4.43-24.367 3.53-10.289 9.056-19.763 16.123-27.926 1.602-2.031 5.875-6.397 7.121-9.016.475-.997-.862-1.557-.937-1.908-.083-.393-1.876-.077-2.277-.37-1.275-.929-3.8-1.414-5.334-1.845-3.277-.921-8.708-2.953-11.725-5.06-9.536-6.658-24.417-14.612-33.505-24.216Z"
        filter="url(#google-k)"
      />
      <path
        fill="url(#google-p)"
        d="M162.099 155.857c22.112 13.301 28.471-6.714 43.173-12.977l-25.574-52.664a144.74 144.74 0 0 0-26.543 14.504c-12.316 8.512-23.192 18.9-32.176 30.72Z"
        filter="url(#google-q)"
      />
      <path
        fill="url(#google-r)"
        d="M171.099 290.222c-29.683 10.641-34.33 11.023-37.062 29.29a144.806 144.806 0 0 0 16.792 13.984c15.996 11.386 46.766 26.551 86.118 26.551.046 0 .09-.004.137-.004v-59.157l-.094.002c-14.736 0-26.512-3.843-38.585-10.527-2.977-1.648-8.378 2.777-11.123.799-3.786-2.729-12.9 2.35-16.183-.938Z"
        filter="url(#google-k)"
      />
      <path
        fill="url(#google-s)"
        d="M219.7 299.023v59.996c5.506.64 11.236 1.028 17.247 1.028 6.026 0 11.855-.307 17.52-.872v-59.748a105.119 105.119 0 0 1-17.477 1.461c-5.932 0-11.7-.686-17.29-1.865Z"
        filter="url(#google-k)"
        opacity=".5"
      />
    </g>
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
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
                        <Icon className="w-4 h-4 text-gray-500 transition-colors group-hover:text-black" />
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
                        <Icon className="w-4 h-4 text-gray-500 transition-colors group-hover:text-black" />
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
                        <Icon className="w-5 h-5 text-slate-800" />
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
                        <Icon className="w-5 h-5 text-slate-800" />
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
              className="flex items-center px-6 py-5 border-b border-gray-100 text-[16px] font-medium text-black bg-white active:bg-gray-50"
            >
              {item}
            </Link>
          ))}

          <div className="p-6 mt-4">
            <Link
              href="/start-project"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-4 rounded-xl bg-[#111827] text-white text-[15px] font-medium active:scale-[0.98] transition-transform"
            >
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
