"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import {
  React as ReactIcon,
  Typescript,
  Jwt,
  GoogleSearchConsole,
} from "@thesvg/react";

// Scroll-Triggered Typewriter Effect for Heading (Zero Layout Shift & ESLint Fixed - Matched with all pages)
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
      { threshold: 0.2 },
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
  }, [hasStarted, text]);

  const lines = displayedText.split("\n");
  const fullLines = text.split("\n");

  const headingClasses =
    "text-4xl sm:text-5xl lg:text-[4rem] font-medium tracking-tight text-black leading-[1.05] select-none cursor-default w-full m-0 text-center";

  return (
    <div
      ref={headingRef}
      className="min-h-[100px] sm:min-h-[140px] lg:min-h-[150px] flex items-center justify-center mb-4 w-full relative"
    >
      {/* INVISIBLE PLACEHOLDER */}
      <h2 className={`${headingClasses} opacity-0 pointer-events-none`}>
        {fullLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx !== fullLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>

      {/* VISIBLE TYPING TEXT */}
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
          className="inline-block w-[3.5px] sm:w-[4px] h-[0.8em] ml-1.5 sm:ml-2 animate-[pulse_1s_ease-in-out_infinite] align-middle translate-y-[-4px] sm:translate-y-[-6px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, #4285F4, #34A853, #FBBC05, #EA4335)",
          }}
        ></span>
      </h2>
    </div>
  );
};

export default function Tools() {
  const tools = [
    {
      title: "SVG to React JSX",
      description:
        "Convert raw SVG code into production-ready functional React components instantly with camelCase formatting.",
      link: "/tools/svg-to-react",
      icon: ReactIcon,
      color: "text-[#4285F4]", // Google Blue for React
      bgColor: "bg-[#4285F4]/10",
      glow: "hover:shadow-[0_12px_40px_-15px_rgba(66,133,244,0.3)]",
      borderColor: "hover:border-[#4285F4]/40",
      hoverIconBg: "group-hover:bg-[#4285F4]",
    },
    {
      title: "JSON to TypeScript",
      description:
        "Automatically generate deeply nested TypeScript interfaces and types from your raw JSON API payloads.",
      link: "/tools/json-to-ts",
      icon: Typescript,
      color: "text-[#34A853]", // Google Green for TS
      bgColor: "bg-[#34A853]/10",
      glow: "hover:shadow-[0_12px_40px_-15px_rgba(52,168,83,0.3)]",
      borderColor: "hover:border-[#34A853]/40",
      hoverIconBg: "group-hover:bg-[#34A853]",
    },
    {
      title: "JWT Decoder",
      description:
        "Securely decode, verify, and inspect JSON Web Tokens locally in your browser. No server interaction required.",
      link: "/tools/jwt-decoder",
      icon: Jwt,
      color: "text-[#FBBC05]", // Google Yellow/Orange for JWT
      bgColor: "bg-[#FBBC05]/10",
      glow: "hover:shadow-[0_12px_40px_-15px_rgba(251,188,5,0.3)]",
      borderColor: "hover:border-[#FBBC05]/40",
      hoverIconBg: "group-hover:bg-[#FBBC05]",
    },
    {
      title: "Meta Tag Extractor",
      description:
        "Extract SEO meta tags and preview Open Graph social media cards from any live URL to optimise sharing.",
      link: "/tools/meta-extractor",
      icon: GoogleSearchConsole,
      color: "text-[#A142F4]", // Purple for SEO/Search
      bgColor: "bg-[#A142F4]/10",
      glow: "hover:shadow-[0_12px_40px_-15px_rgba(161,66,244,0.3)]",
      borderColor: "hover:border-[#A142F4]/40",
      hoverIconBg: "group-hover:bg-[#A142F4]",
    },
  ];

  return (
    <section className="w-full min-h-screen pt-24 sm:pt-32 pb-24 bg-white font-jakarta text-black relative overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Subtle Top Gradient - Syncs with rest of site */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section (Exactly matched with other service pages) */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 shadow-sm mb-6">
            <Terminal className="w-4 h-4 text-black" />
            <h2 className="text-[11px] sm:text-[12px] font-extrabold text-gray-500 uppercase tracking-[0.2em] m-0">
              CodeLume Utilities
            </h2>
          </div>

          <TypewriterHeading text={"Free Developer\nTools"} />

          <p className="text-gray-500 text-[15px] sm:text-[17px] leading-relaxed max-w-2xl mx-auto font-medium m-0">
            A curated collection of free utilities designed to streamline your
            engineering and SEO processes. No sign-ups, no tracking, just pure
            performance.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-[1100px] mx-auto">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <Link
                key={idx}
                href={tool.link}
                className={`group relative flex flex-col p-8 sm:p-10 rounded-[32px] bg-white border border-gray-200 transition-all duration-500 hover:-translate-y-1.5 outline-none transform-gpu overflow-hidden shadow-sm hover:shadow-md ${tool.glow} ${tool.borderColor}`}
              >
                {/* Subtle hover overlay to enhance the white theme */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={`w-16 h-16 rounded-[20px] flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 border border-transparent group-hover:border-current ${tool.bgColor} ${tool.color}`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  <div className="flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold text-black mb-4 m-0 flex items-center justify-between">
                      {tool.title}
                      <div
                        className={`w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center transition-all duration-300 ${tool.hoverIconBg}`}
                      >
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-all duration-300" />
                      </div>
                    </h2>
                    <p className="text-[15px] font-medium text-gray-500 leading-relaxed m-0 group-hover:text-gray-600 transition-colors duration-300">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
