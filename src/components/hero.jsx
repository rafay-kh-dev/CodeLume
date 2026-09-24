import React from "react";
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
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #030712; }
          ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
          @keyframes marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
          .animate-marquee { animation: marquee 35s linear infinite; will-change: transform; }
        `}
      </style>

      {/* Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-linear-to-b from-blue-600/20 via-indigo-500/10 to-transparent blur-[110px] pointer-events-none rounded-full transform-gpu" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full transform-gpu" />

      {/* Dot Matrix Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none transform-gpu"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />

      {/* Main Content Container - Offsetting Header Height for Pixel-Perfect Vertical Centring */}
      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 my-auto">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          
          {/* Balanced 3-Line Sales Headline - Increased Size */}
          <h1 className="text-[2.4rem] sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.12] mb-6">
            <span className="text-white block">
              Lead Your Industry With
            </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(37,99,235,0.35)] block py-2">
              Next-Generation
            </span>
            <span className="text-white block">
              Optimised Web Solutions.
            </span>
          </h1>

          {/* Subheading - Increased Size */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed max-w-3xl font-medium tracking-wide">
            We engineer lightning-fast digital experiences designed to boost conversion rates, scale customer acquisition, and maximise revenue.
          </p>

          {/* Action Buttons - Increased Size */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
            <Link
              to="/start-project"
              className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-xl bg-linear-to-b from-blue-500 to-blue-700 text-white shadow-[0_0_35px_-8px_rgba(37,99,235,0.6)] hover:shadow-[0_0_50px_-10px_rgba(37,99,235,0.8)] border border-blue-400/30 transition-all duration-300 active:scale-[0.98] outline-none overflow-hidden transform-gpu"
            >
              <Sparkles className="w-5 h-5 text-blue-100 relative z-10" />
              <span className="text-[16px] font-bold relative z-10 tracking-wide text-white">
                Initialise Project
              </span>
            </Link>
            
            <a
              href="/#services"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-xl bg-[#ffffff08] hover:bg-[#ffffff12] text-slate-300 hover:text-white shadow-lg border border-white/10 transition-all duration-300 active:scale-[0.98] backdrop-blur-xl outline-none transform-gpu"
            >
              <span className="text-[16px] font-semibold tracking-wide">
                View Services
              </span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-slate-400 group-hover:text-white transform-gpu" />
            </a>
          </div>

        </div>
      </div>

      {/* Tech Stack Marquee Footer */}
      <div
        className="w-full h-14 bg-[#030712]/90 backdrop-blur-xl overflow-hidden flex items-center z-30 border-t border-white/[0.04] shrink-0 transform-gpu"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <div className="flex whitespace-nowrap animate-marquee items-center h-full">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-12 sm:gap-16 px-8"
            >
              {techStack.map((tech, index) => {
                const IconComponent = tech.Icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 text-slate-400 hover:text-blue-400 transition-colors duration-300"
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