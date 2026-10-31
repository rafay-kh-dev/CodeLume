"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { React as ReactIcon, Flutter, Figma, Adobe } from "@thesvg/react";

export default function Service() {
  // BENTO GRID SERVICES - Solo Developer Copy
  const services = [
    {
      id: 1,
      title: "MERN Stack Architecture",
      description:
        "Full-stack JavaScript solutions engineered for global scale using MongoDB, Express, React, & Node.js. Zero-latency backends paired with highly responsive frontends.",
      badge: "Core Expertise",
      hex: "#4285F4", // Google Blue
      colSpan: "lg:col-span-7",
      icon: <ReactIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#4285F4]" />,
      bg: "bg-[#4285F4]/10",
      price: "$149",
      link: "/services/mern-stack",
    },
    {
      id: 2,
      title: "Native Mobile Apps",
      description:
        "High-performance iOS and Android applications built natively for a seamless modern user experience.",
      badge: "Mobile Build",
      hex: "#34A853", // Google Green
      colSpan: "lg:col-span-5",
      icon: <Flutter className="w-6 h-6 sm:w-8 sm:h-8 text-[#34A853]" />,
      bg: "bg-[#34A853]/10",
      price: "$399",
      link: "/services/mobile-apps",
    },
    {
      id: 3,
      title: "UI/UX & Product Design",
      description:
        "User-centric interfaces crafted in Figma. I focus on human-computer interaction to maximize your digital conversion rates.",
      badge: "Creative",
      hex: "#FBBC05", // Google Yellow
      colSpan: "lg:col-span-5",
      icon: <Figma className="w-6 h-6 sm:w-8 sm:h-8 text-[#FBBC05]" />,
      bg: "bg-[#FBBC05]/10",
      price: "$199",
      link: "/services/ui-ux-design",
    },
    {
      id: 4,
      title: "Full Brand Engineering",
      description:
        "From 0 to 100. Complete brand identity, web engineering, and technical marketing setups directly handled by me.",
      badge: "Premium Build",
      hex: "#EA4335", // Google Red
      colSpan: "lg:col-span-7",
      icon: <Adobe className="w-6 h-6 sm:w-8 sm:h-8 text-[#EA4335]" />,
      bg: "bg-[#EA4335]/10",
      price: "$1,499",
      link: "/services/full-branding",
    },
  ];

  return (
    <section className="bg-white font-jakarta py-16 sm:py-24 lg:py-32 overflow-hidden relative border-t border-gray-100">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        `}
      </style>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-10 lg:px-12 relative z-10 w-full">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#6a7282]" />
            <h2 className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] m-0">
              Featured Expertise
            </h2>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-[3.2rem] font-medium text-black tracking-tight leading-[1.1] m-0 mb-4 sm:mb-6 px-2 sm:px-0">
            Bespoke digital solutions <br className="hidden sm:block" />
            <span className="text-gray-400">to scale your business.</span>
          </h2>

          {/* Rewritten for Solo Developer */}
          <p className="text-[#4B5563] font-medium text-[14.5px] sm:text-[16px] leading-relaxed max-w-2xl m-0 px-2 sm:px-0">
            As an independent web developer, I provide end-to-end digital
            services. From writing clean code to crafting beautiful designs,
            here are my top-tier capabilities.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 max-w-[1300px] mx-auto">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className={`group flex flex-col bg-white border border-gray-200 rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 relative overflow-hidden transition-all duration-500 hover:border-transparent hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] ${service.colSpan} cursor-default active:scale-[0.99] sm:active:scale-100`}
            >
              {/* Dynamic Hover Glow based on Antigravity Color */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none hidden sm:block"
                style={{
                  background: `radial-gradient(circle at right bottom, ${service.hex}, transparent 60%)`,
                }}
              />

              <div className="flex items-center justify-between mb-6 sm:mb-10 relative z-10">
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-[14px] sm:rounded-2xl ${service.bg} flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3`}
                >
                  {service.icon}
                </div>

                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-500">
                  {service.badge}
                </span>
              </div>

              <div className="flex flex-col flex-grow mb-8 sm:mb-12 relative z-10">
                <h2
                  className="text-[18px] sm:text-[22px] lg:text-[26px] font-semibold text-black mb-2 sm:mb-3 m-0 transition-colors"
                  style={{ "--hover-color": service.hex }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = service.hex)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
                >
                  {service.title}
                </h2>
                <p className="text-gray-500 font-medium leading-relaxed text-[13.5px] sm:text-[15px] lg:text-[16px] m-0 max-w-md">
                  {service.description}
                </p>
              </div>

              <div className="pt-5 sm:pt-6 border-t border-gray-100 flex items-center justify-between mt-auto relative z-10">
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-[0.15em] font-bold mb-1">
                    Starting From
                  </span>
                  <span className="text-[18px] sm:text-[22px] font-semibold text-black m-0 tracking-tight">
                    {service.price}
                  </span>
                </div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-[#111827] group-hover:border-[#111827] transition-all duration-300">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-white text-black border border-gray-200 shadow-sm hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200 outline-none active:scale-[0.98] group w-full sm:w-auto justify-center"
          >
            <span className="text-[14px] font-medium m-0 tracking-wide">
              Explore All 11 Services
            </span>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-black transform group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
