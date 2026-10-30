"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Code,
  Search,
  TrendingUp,
  Palette,
  CheckCircle2,
  ArrowUpRight,
  Rocket,
  MousePointerClick,
  ShoppingBag,
  MessageSquare,
  PackageCheck,
  UserCheck,
} from "lucide-react";
import { Whatsapp, Gmail } from "@thesvg/react";

// Custom Brand SVGs to prevent Lucide build errors
const GitHubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
      fill="#0A66C2"
    />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="#1877F2" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// Scroll-Triggered Typewriter Effect (Mobile-Responsive & Zero Layout Shift)
const TypewriterHeading = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let typingInterval;
    let i = 0;

    const startTimeout = setTimeout(() => {
      setDisplayedText("");

      typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 45);
    }, 200);

    return () => {
      clearTimeout(startTimeout);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [text, hasStarted]);

  const lines = displayedText.split("\n");
  const fullLines = text.split("\n");

  const headingClasses =
    "text-[2.1rem] sm:text-6xl md:text-7xl font-medium tracking-tighter text-black leading-[1.08] sm:leading-[1.05] select-none cursor-default w-full m-0 text-center";

  return (
    <div
      ref={headingRef}
      className="min-h-[82px] sm:min-h-[140px] md:min-h-[160px] flex items-center justify-center mb-4 sm:mb-6 w-full relative"
    >
      <h2 className={`${headingClasses} opacity-0 pointer-events-none`}>
        {fullLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx !== fullLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>

      <h2 className={`${headingClasses} absolute top-0 left-0 h-full`}>
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            <span className={idx === 1 ? "text-gray-400" : "text-black"}>
              {line}
            </span>
            {idx !== lines.length - 1 && <br />}
          </React.Fragment>
        ))}
        <span
          className="inline-block w-[3px] sm:w-[4px] h-[0.8em] ml-1 sm:ml-2 animate-[pulse_1s_ease-in-out_infinite] align-middle translate-y-[-3px] sm:translate-y-[-6px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, #4285F4, #34A853, #FBBC05, #EA4335)",
          }}
        ></span>
      </h2>
    </div>
  );
};

export default function AboutCodeLume() {
  const whatIDo = [
    {
      icon: <Code size={22} />,
      title: "Web Development",
      desc: "MERN stack development.",
      hex: "#4285F4",
      bg: "bg-[#4285F4]/10",
      color: "text-[#4285F4]",
    },
    {
      icon: <Search size={22} />,
      title: "SEO",
      desc: "Technical SEO and On-page SEO to improve search visibility.",
      hex: "#34A853",
      bg: "bg-[#34A853]/10",
      color: "text-[#34A853]",
    },
    {
      icon: <TrendingUp size={22} />,
      title: "Marketing",
      desc: "Direct digital marketing campaigns focused on real business results.",
      hex: "#FBBC05",
      bg: "bg-[#FBBC05]/10",
      color: "text-[#FBBC05]",
    },
    {
      icon: <Palette size={22} />,
      title: "Graphics & UX Design",
      desc: "Clean Graphics Design and intuitive UX Design for web products.",
      hex: "#EA4335",
      bg: "bg-[#EA4335]/10",
      color: "text-[#EA4335]",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Select a Service",
      desc: "Browse codelume.online and select the exact service you need.",
      icon: <MousePointerClick className="w-5 h-5 text-[#4285F4]" />,
    },
    {
      step: "02",
      title: "Place an Order",
      desc: "Place your order directly on the website without middlemen.",
      icon: <ShoppingBag className="w-5 h-5 text-[#34A853]" />,
    },
    {
      step: "03",
      title: "Direct Contact",
      desc: "I contact you directly to gather your project details and requirements.",
      icon: <MessageSquare className="w-5 h-5 text-[#FBBC05]" />,
    },
    {
      step: "04",
      title: "Build & Deliver",
      desc: "I personally build, test, and deliver your completed project.",
      icon: <PackageCheck className="w-5 h-5 text-[#EA4335]" />,
    },
  ];

  return (
    <div className="bg-white text-black font-jakarta pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden relative">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Subtle Top Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] sm:h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-10 lg:px-12 relative z-10 w-full">
        
        {/* 1 & 2. Header: What is CodeLume */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20 mt-4 sm:mt-10">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-50 border border-gray-200 shadow-sm mb-4 sm:mb-6">
            <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4285F4]" />
            <h2 className="text-[10px] sm:text-[12px] font-extrabold text-gray-500 uppercase tracking-[0.2em] m-0">
              Personal Service Website
            </h2>
          </div>

          <TypewriterHeading text={"Hi, I am Rafay.\nSolo Web Developer."} />

          <p className="text-gray-500 font-medium text-[14px] sm:text-[17px] leading-relaxed mb-4 px-1 sm:px-0">
            <strong>codelume.online</strong> is my personal website where clients can directly buy my services. It is not a company, not an agency, and not a portfolio. There is no agency team—you work directly with me from start to finish.
          </p>
        </div>

        {/* 1. Who I Am & What is CodeLume Bento Box */}
        <div className="bg-white border border-gray-200 rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 lg:p-16 mb-14 sm:mb-20 shadow-sm flex flex-col lg:flex-row gap-8 sm:gap-12 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-50 rounded-full blur-[80px] -z-10" />

          <div className="flex-1 space-y-4 sm:space-y-6 relative z-10 w-full">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-black m-0 tracking-tight">
                Who I Am
              </h2>
              <h2 className="text-[15px] sm:text-[18px] text-[#4285F4] font-semibold m-0 mt-1.5 sm:mt-2">
                Solo Web Developer
              </h2>
            </div>

            <p className="text-gray-500 font-medium text-[14px] sm:text-[16px] leading-relaxed m-0">
              My name is Rafay. I work solo as a Web Developer. My strong skill is Web Development, and I also have experience in SEO, Marketing, and Graphics Design.
            </p>
            <p className="text-gray-500 font-medium text-[14px] sm:text-[16px] leading-relaxed m-0">
              When you buy a service on CodeLume, there is no manager or agency team in between. You communicate directly with me, and I handle your work personally.
            </p>

            <ul className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
              {[
                "Web Development (HTML, Tailwind CSS, Next.js, MERN Stack)",
                "SEO (Technical and On-page)",
                "Marketing",
                "Graphics Design and UX Design",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 sm:gap-3 text-black font-semibold text-[13.5px] sm:text-[15px] leading-snug"
                >
                  <CheckCircle2 className="text-[#34A853] w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Light Theme Mac Terminal Mockup - Responsive Height on Mobile */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative z-10">
            <div className="relative w-full max-w-md sm:aspect-[4/3] rounded-[20px] sm:rounded-3xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden shadow-md p-2.5 sm:p-4 group">
              <div className="w-full sm:absolute sm:inset-4 bg-white rounded-[14px] sm:rounded-2xl border border-gray-200 flex flex-col shadow-sm overflow-hidden z-20 group-hover:scale-[1.02] transition-transform duration-500">
                <div className="h-9 sm:h-10 border-b border-gray-100 flex items-center px-3.5 sm:px-4 gap-2 bg-gray-50/50 shrink-0">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EA4335]"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FBBC05]"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#34A853]"></div>
                  <div className="ml-1.5 sm:ml-2 text-[9px] sm:text-[10px] text-gray-400 font-mono tracking-widest uppercase font-bold">
                    rafay.js
                  </div>
                </div>
                <div className="p-4 sm:p-6 font-mono text-[11.5px] xs:text-[12.5px] sm:text-[14px] text-gray-700 flex flex-col gap-2 sm:gap-2.5 overflow-x-auto font-medium leading-relaxed">
                  <p className="m-0">
                    <span className="text-[#a626a4]">const</span>{" "}
                    <span className="text-[#4078f2]">rafay</span>{" "}
                    <span className="text-[#0184bc]">=</span>{" "}
                    <span className="text-black">{"{"}</span>
                  </p>
                  <p className="pl-3 sm:pl-4 m-0">
                    mode: <span className="text-[#50a14f]">&apos;Solo Web Developer&apos;</span>,
                  </p>
                  <p className="pl-3 sm:pl-4 m-0">
                    website: <span className="text-[#50a14f]">&apos;codelume.online&apos;</span>,
                  </p>
                  <p className="pl-3 sm:pl-4 m-0">
                    stack: <span className="text-[#0184bc]">[</span>
                    <span className="text-[#50a14f]">&apos;HTML&apos;</span>,{" "}
                    <span className="text-[#50a14f]">&apos;Tailwind&apos;</span>,{" "}
                    <span className="text-[#50a14f]">&apos;Next.js&apos;</span>,{" "}
                    <span className="text-[#50a14f]">&apos;MERN&apos;</span>
                    <span className="text-[#0184bc]">]</span>,
                  </p>
                  <p className="pl-3 sm:pl-4 m-0">
                    alsoDoes: <span className="text-[#0184bc]">[</span>
                    <span className="text-[#50a14f]">&apos;SEO&apos;</span>,{" "}
                    <span className="text-[#50a14f]">&apos;Marketing&apos;</span>,{" "}
                    <span className="text-[#50a14f]">&apos;Graphics & UX&apos;</span>
                    <span className="text-[#0184bc]">]</span>,
                  </p>
                  <p className="pl-3 sm:pl-4 m-0">
                    agencyTeam: <span className="text-[#EA4335]">false</span>
                  </p>
                  <p className="m-0">
                    <span className="text-black">{"}"}</span>;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. What I Do Section */}
        <div className="mb-14 sm:mb-24">
          <div className="mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-black m-0 tracking-tight mb-1.5 sm:mb-2">
              What I Do
            </h2>
            <p className="text-gray-500 font-medium text-[14px] sm:text-[15px] m-0">
              Services you can buy directly from me on CodeLume.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {whatIDo.map((item, idx) => (
              <FeatureCard key={idx} {...item} />
            ))}
          </div>
        </div>

        {/* 4. How It Works Section */}
        <div className="mb-14 sm:mb-24">
          <div className="mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-black m-0 tracking-tight mb-1.5 sm:mb-2">
              How It Works
            </h2>
            <p className="text-gray-500 font-medium text-[14px] sm:text-[15px] m-0">
              A simple, direct process with no agency layers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {howItWorks.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 p-5 sm:p-8 rounded-[20px] sm:rounded-[24px] flex flex-col justify-between hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span className="text-[11px] sm:text-xs font-extrabold text-gray-400 uppercase tracking-widest">
                      Step {item.step}
                    </span>
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm shrink-0">
                      {item.icon}
                    </div>
                  </div>
                  <h2 className="text-[16px] sm:text-[18px] font-bold text-black m-0 mb-1.5 sm:mb-2">
                    {item.title}
                  </h2>
                  <p className="text-[13.5px] sm:text-[14px] text-gray-500 font-medium leading-relaxed m-0">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 & 6. Real Work Proof & Social Proof */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 mb-14 sm:mb-24">
          
          {/* 5. Real Work Proof */}
          <div className="bg-white border border-gray-200 rounded-[24px] sm:rounded-[28px] p-5 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-black m-0 tracking-tight mb-2 sm:mb-3">
                Real Work Proof
              </h2>
              <p className="text-gray-500 font-medium text-[14px] sm:text-[15px] leading-relaxed mb-5 sm:mb-6">
                Check my real code repositories on GitHub and live client projects I have built, such as <strong>jasabacklinks.net</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <a
                href="https://github.com/rafay-kh-dev"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-black font-bold text-[13.5px] sm:text-[14px] transition-all outline-none active:scale-[0.98]"
              >
                <span className="flex items-center gap-2.5 sm:gap-3">
                  <GitHubIcon className="w-5 h-5 text-black shrink-0" />
                  GitHub Repositories
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 shrink-0" />
              </a>

              <a
                href="https://jasabacklinks.net"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-black font-bold text-[13.5px] sm:text-[14px] transition-all outline-none active:scale-[0.98]"
              >
                <span>jasabacklinks.net</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 shrink-0" />
              </a>
            </div>
          </div>

          {/* 6. Social Proof */}
          <div className="bg-white border border-gray-200 rounded-[24px] sm:rounded-[28px] p-5 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-black m-0 tracking-tight mb-2 sm:mb-3">
                Connect on Socials
              </h2>
              <p className="text-gray-500 font-medium text-[14px] sm:text-[15px] leading-relaxed mb-5 sm:mb-6">
                Verify my profile and connect with me directly on LinkedIn and Facebook.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <a
                href="https://www.linkedin.com/in/rafay-codelume/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-black font-bold text-[13.5px] sm:text-[14px] transition-all outline-none active:scale-[0.98]"
              >
                <span className="flex items-center gap-2.5 sm:gap-3">
                  <LinkedInIcon className="w-5 h-5 shrink-0" />
                  LinkedIn Profile
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 shrink-0" />
              </a>

              <a
                href="https://www.facebook.com/codelume"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-black font-bold text-[13.5px] sm:text-[14px] transition-all outline-none active:scale-[0.98]"
              >
                <span className="flex items-center gap-2.5 sm:gap-3">
                  <FacebookIcon className="w-5 h-5 shrink-0" />
                  Facebook Profile
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-400 shrink-0" />
              </a>
            </div>
          </div>

        </div>

        {/* 7. Direct Contact Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-[24px] sm:rounded-[32px] p-6 sm:p-12 lg:p-16 text-center max-w-5xl mx-auto shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-50 rounded-full blur-[80px] -z-10" />
          <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-green-50 rounded-full blur-[80px] -z-10" />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black m-0 tracking-tight mb-3 sm:mb-4">
            Direct Contact. No Manager in Between.
          </h2>
          <p className="text-gray-500 font-medium text-[14px] sm:text-[16px] mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Select a service to place your order, or message me directly on WhatsApp or Email to discuss your project details with me personally.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-3 sm:gap-4 w-full">
            <a
              href="mailto:hello@codelume.online"
              className="order-2 md:order-1 flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-black font-bold text-[14px] sm:text-[15px] transition-all duration-300 w-full shadow-sm hover:-translate-y-0.5 outline-none active:scale-[0.98]"
            >
              <Gmail className="h-5 w-5 shrink-0" /> Email Directly
            </a>

            <Link
              href="/services"
              className="order-1 md:order-2 flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-[#111827] text-white hover:bg-black font-bold text-[14px] sm:text-[15px] transition-all duration-300 w-full shadow-sm hover:-translate-y-0.5 outline-none active:scale-[0.98]"
            >
              <Rocket size={18} className="shrink-0" /> Select a Service
            </Link>

            <a
              href="https://wa.me/923347835980"
              target="_blank"
              rel="noreferrer"
              className="order-3 flex-1 flex items-center justify-center w-full px-6 py-3.5 sm:py-4 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(37,211,102,0.2)] hover:shadow-[0_8px_20px_rgba(37,211,102,0.3)] hover:-translate-y-0.5 outline-none active:scale-[0.98]"
            >
              <Whatsapp
                variant="wordmark"
                className="h-5 w-auto brightness-0 invert"
              />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, hex, bg, color }) {
  return (
    <div className="bg-white border border-gray-200 p-5 sm:p-8 rounded-[20px] sm:rounded-[24px] hover:border-gray-300 hover:shadow-sm transition-all duration-300 group cursor-default relative overflow-hidden flex flex-row sm:flex-col items-start gap-4 sm:gap-0">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none hidden sm:block"
        style={{
          background: `radial-gradient(circle at right bottom, ${hex}, transparent 70%)`,
        }}
      />
      <div
        className={`w-11 h-11 sm:w-14 sm:h-14 ${bg} ${color} rounded-[14px] sm:rounded-[16px] flex items-center justify-center shrink-0 sm:mb-5 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h2
          className="text-[16px] sm:text-[19px] font-semibold text-black m-0 mb-1 sm:mb-2 transition-colors duration-300 relative z-10"
          style={{ "--hover-color": hex }}
          onMouseEnter={(e) => (e.currentTarget.style.color = hex)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
        >
          {title}
        </h2>
        <p className="text-[13.5px] sm:text-[14px] text-gray-500 font-medium leading-relaxed m-0 relative z-10">
          {desc}
        </p>
      </div>
    </div>
  );
}