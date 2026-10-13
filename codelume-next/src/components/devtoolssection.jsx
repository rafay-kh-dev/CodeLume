"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
// Official SVG Icons from @thesvg/react
import {
  React as ReactIcon,
  Typescript,
  Jwt,
  GoogleSearchConsole,
} from "@thesvg/react";

export default function DevToolsSection() {
  const tools = [
    {
      title: "SVG to React JSX",
      description:
        "Convert raw SVG code into production-ready functional React components instantly with camelCase formatting.",
      link: "/tools/svg-to-react",
      icon: <ReactIcon className="w-8 h-8 text-[#4285F4]" />,
      hex: "#4285F4", // Google Blue
      bg: "bg-[#4285F4]/10",
      colSpan: "md:col-span-7",
    },
    {
      title: "JSON to TypeScript",
      description:
        "Automatically generate deeply nested TypeScript interfaces and types from your raw JSON API payloads.",
      link: "/tools/json-to-ts",
      icon: <Typescript className="w-8 h-8 text-[#34A853]" />,
      hex: "#34A853", // Google Green
      bg: "bg-[#34A853]/10",
      colSpan: "md:col-span-5",
    },
    {
      title: "JWT Decoder",
      description:
        "Securely decode, verify, and inspect JSON Web Tokens locally in your browser. No server interaction required.",
      link: "/tools/jwt-decoder",
      icon: <Jwt className="w-8 h-8 text-[#FBBC05]" />,
      hex: "#FBBC05", // Google Yellow
      bg: "bg-[#FBBC05]/10",
      colSpan: "md:col-span-5",
    },
    {
      title: "Meta Tag Extractor",
      description:
        "Extract SEO meta tags and preview Open Graph social media cards from any live URL to optimize sharing.",
      link: "/tools/meta-extractor",
      icon: <GoogleSearchConsole className="w-8 h-8 text-[#EA4335]" />,
      hex: "#EA4335", // Google Red
      bg: "bg-[#EA4335]/10",
      colSpan: "md:col-span-7",
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 bg-gray-50 font-jakarta border-t border-gray-100 overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Subtle background gradient to distinguish this section from others */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#6a7282]" />
            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] m-0">
              Tool-Led Growth
            </h2>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-medium text-black tracking-tight leading-[1.1] m-0 mb-6">
            Free Utilities for <br className="hidden sm:block" />
            <span className="text-gray-400">Modern Developers.</span>
          </h2>
          
          <p className="text-[#4B5563] font-medium text-[15px] sm:text-[16px] leading-relaxed max-w-2xl m-0">
            At CodeLume, we believe in giving back to the community. Speed up
            your workflow with our suite of free, lightning-fast developer tools.
          </p>
        </div>

        {/* Tools Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-[1300px] mx-auto">
          {tools.map((tool, idx) => (
            <Link
              key={idx}
              href={tool.link}
              className={`group flex flex-col p-8 sm:p-10 rounded-[32px] bg-white border border-gray-200 hover:border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] outline-none relative overflow-hidden cursor-default ${tool.colSpan}`}
            >
              {/* Dynamic Hover Glow based on Antigravity Color */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at right bottom, ${tool.hex}, transparent 60%)` }}
              />

              <div className="relative z-10 flex items-start gap-6 sm:gap-8">
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3 ${tool.bg}`}
                >
                  {tool.icon}
                </div>

                <div className="flex flex-col flex-1 pt-1">
                  <h2 className="text-[22px] sm:text-[24px] font-semibold text-black mb-3 m-0 flex items-center justify-between transition-colors duration-300"
                      style={{ '--hover-color': tool.hex }}
                      onMouseEnter={(e) => e.currentTarget.style.color = tool.hex}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                  >
                    {tool.title}
                  </h2>
                  <p className="text-[15px] font-medium text-gray-500 leading-relaxed m-0 pr-8">
                    {tool.description}
                  </p>
                </div>
              </div>

              {/* Arrow Indicator that slides in on hover */}
              <div className="absolute top-10 right-10 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 border border-gray-100 shadow-sm z-10">
                 <ArrowRight className="w-4 h-4 text-black" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-black border border-gray-200 shadow-sm hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200 outline-none active:scale-[0.98] group"
          >
            <span className="text-[14px] font-medium m-0 tracking-wide">
              Explore All Free Tools
            </span>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-black transform group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}