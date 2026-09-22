import React from "react";
import { Sparkles } from "lucide-react";
import { 
  React as ReactLogo, 
  Laravel, 
  Tailwindcss, 
  Wordpress, 
  Shopify 
} from '@thesvg/react';

export default function TechStack() {
  const stack = [
    {
      name: "React & Next.js",
      category: "Frontend Engineering",
      desc: "Optimised state management and GPU-accelerated interfaces for zero-latency user experiences.",
      icon: ReactLogo,
      colSpan: "lg:col-span-8",
      accent: "text-[#61DAFB]",
      glow: "group-hover:shadow-[0_0_40px_rgba(97,218,251,0.2),inset_0_0_20px_rgba(97,218,251,0.05)]",
      gradient: "from-[#61DAFB]/10 to-transparent",
    },
    {
      name: "PHP & Laravel",
      category: "Backend Architecture",
      desc: "Robust, deeply customised server logic and secure API integrations.",
      icon: Laravel,
      colSpan: "lg:col-span-4",
      accent: "text-[#FF2D20]",
      glow: "group-hover:shadow-[0_0_40px_rgba(255,45,32,0.2),inset_0_0_20px_rgba(255,45,32,0.05)]",
      gradient: "from-[#FF2D20]/10 to-transparent",
    },
    {
      name: "Tailwind CSS",
      category: "Design Systems",
      desc: "Pixel-perfect, utility-first styling for flawless responsive design.",
      icon: Tailwindcss,
      colSpan: "lg:col-span-4",
      accent: "text-[#38B2AC]",
      glow: "group-hover:shadow-[0_0_40px_rgba(56,178,172,0.2),inset_0_0_20px_rgba(56,178,172,0.05)]",
      gradient: "from-[#38B2AC]/10 to-transparent",
    },
    {
      name: "WordPress Engine",
      category: "Content Management",
      desc: "Highly specialised bespoke themes and plugin architecture for content scale.",
      icon: Wordpress,
      colSpan: "lg:col-span-4",
      accent: "text-[#21759B]",
      glow: "group-hover:shadow-[0_0_40px_rgba(33,117,155,0.2),inset_0_0_20px_rgba(33,117,155,0.05)]",
      gradient: "from-[#21759B]/10 to-transparent",
    },
    {
      name: "Shopify Headless",
      category: "E-Commerce",
      desc: "Maximised conversion rates through decoupled commerce experiences.",
      icon: Shopify,
      colSpan: "lg:col-span-4",
      accent: "text-[#95BF47]",
      glow: "group-hover:shadow-[0_0_40px_rgba(149,191,71,0.2),inset_0_0_20px_rgba(149,191,71,0.05)]",
      gradient: "from-[#95BF47]/10 to-transparent",
    },
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 bg-[#030712] font-jakarta overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* 🚀 FIXED: Replaced 'blur-[150px]' with GPU-friendly radial gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-150 h-150 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-600/10 via-blue-600/5 to-transparent pointer-events-none transform-gpu translate-z-0" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-indigo-600/10 via-indigo-600/5 to-transparent pointer-events-none transform-gpu translate-z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-24">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/3 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0">
              Arsenal & Ecosystem
            </h2>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] m-0 drop-shadow-lg">
            Built with modern <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-300 to-cyan-400">
              Tech Architecture.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {stack.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                // 🚀 FIXED: Reduced backdrop-blur-3xl to backdrop-blur-xl and softened default shadow
                className={`group relative rounded-4xl bg-[#0a0f1c]/70 backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden outline-none cursor-default shadow-[inset_0_0_15px_rgba(255,255,255,0.02),0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-500 ease-out transform-gpu ${item.colSpan} ${item.glow}`}
              >
                <div
                  className={`absolute top-0 right-0 w-full h-full bg-linear-to-bl ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform-gpu`}
                />

                <div className="relative z-10 flex items-start justify-between mb-16">
                  <div className="w-14 h-14 rounded-2xl bg-[#030712]/80 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] flex items-center justify-center transform-gpu transition-transform duration-500 group-hover:scale-110">
                    <Icon className={`w-7 h-7 ${item.accent} drop-shadow-md`} />
                  </div>
                  <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-500 uppercase tracking-widest m-0 px-3 py-1.5 rounded-full bg-white/2 shadow-[inset_0_0_5px_rgba(255,255,255,0.02)] group-hover:text-slate-300 transition-colors">
                    {item.category}
                  </h2>
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 m-0 tracking-tight">
                    {item.name}
                  </h2>
                  <h2 className="text-sm sm:text-[15px] text-slate-400 font-medium leading-relaxed m-0 max-w-sm group-hover:text-slate-300 transition-colors">
                    {item.desc}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}