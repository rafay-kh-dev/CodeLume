import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles, Webhook } from "lucide-react";
import {
  SiReact,
  SiLaravel,
  SiAngular,
  SiWordpress,
  SiShopify,
  SiWebflow,
  SiNodedotjs,
} from "react-icons/si";

// 1. PREMIUM SILICON VALLEY GRID & INTERACTIVE SPOTLIGHT (No Three.js needed)
const PremiumBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#030712]">
      {/* Abstract Aurora Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse pointer-events-none" />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-600/15 blur-[120px] animate-pulse pointer-events-none"
        style={{ animationDelay: "2s" }}
      />

      {/* Architectural Tech Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 15%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 15%, transparent 80%)",
        }}
      />

      {/* Dynamic Mouse Spotlight */}
      <div
        className="absolute pointer-events-none transition-transform duration-75 ease-out will-change-transform"
        style={{
          top: 0,
          left: 0,
          transform: `translate(${mousePosition.x - 400}px, ${mousePosition.y - 400}px)`,
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

// 2. MAIN HERO SECTION
export default function HeroSection() {
  const techStack = [
    { name: "MERN Stack", Icon: SiReact },
    { name: "PHP / Laravel", Icon: SiLaravel },
    { name: "Angular", Icon: SiAngular },
    { name: "Custom APIs", Icon: Webhook },
    { name: "WordPress", Icon: SiWordpress },
    { name: "Shopify", Icon: SiShopify },
    { name: "Webflow", Icon: SiWebflow },
    { name: "Node.js Architecture", Icon: SiNodedotjs },
  ];

  return (
    <section className="relative w-full h-dvh max-h-dvh flex flex-col justify-between overflow-hidden bg-[#030712] font-jakarta">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #030712; }
          ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
          
          @keyframes marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
          .animate-marquee { animation: marquee 35s linear infinite; will-change: transform; }
          
          .text-glow {
            text-shadow: 0 0 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.2);
          }
        `}
      </style>

      {/* New Interactive Background */}
      <PremiumBackground />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-4 my-auto pointer-events-none">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center pointer-events-auto">
          <h1 className="text-[2.8rem] sm:text-6xl lg:text-[5.5rem] font-black tracking-tight leading-[1.05] mb-6 select-none cursor-default">
            <span className="text-white block mb-1">Architecting Bespoke</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 text-glow py-2">
              Digital Ecosystems.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl font-medium tracking-wide">
            Stop settling for templates. We engineer high-performance MERN stack
            platforms and scalable backends designed to dominate your market.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto relative z-20">
            <Link
              to="/start-project"
              className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_0_40px_-8px_rgba(37,99,235,0.7)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.9)] border border-blue-400/40 transition-all duration-300 active:scale-[0.98] outline-none overflow-hidden transform-gpu font-bold tracking-wide"
            >
              <Sparkles className="w-5 h-5 text-blue-100 relative z-10" />
              <span className="text-[16px] relative z-10">
                Deploy Your Vision
              </span>
            </Link>

            <Link
              to="/services"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all duration-300 active:scale-[0.98] backdrop-blur-md outline-none font-semibold tracking-wide"
            >
              <span>Explore Services</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-slate-400 group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Tech Stack Marquee */}
      <div
        className="w-full h-14 bg-black/40 backdrop-blur-xl overflow-hidden flex items-center z-30 border-t border-white/[0.04] shrink-0 relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <div className="flex whitespace-nowrap animate-marquee items-center h-full">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 sm:gap-16 px-8">
              {techStack.map((tech, index) => {
                const IconComponent = tech.Icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 text-slate-500 hover:text-blue-400 transition-colors duration-300"
                  >
                    <IconComponent className="w-4 h-4 fill-current" />
                    <span className="text-[11px] font-bold tracking-[0.18em] uppercase">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
