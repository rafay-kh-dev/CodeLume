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

// 1. THE GLASS SHATTER TYPOGRAPHY (Idea 4)
const ShatterText = ({ text, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [transforms, setTransforms] = useState([]);
  const letters = text.split("");

  useEffect(() => {
    // Generate unique physics-based explosive angles for each letter
    const newTransforms = letters.map(() => {
      const x = (Math.random() - 0.5) * 250; // Random X scatter
      const y = (Math.random() - 0.5) * 250; // Random Y scatter
      const rot = (Math.random() - 0.5) * 180; // Random rotation
      const scale = 1 + (Math.random() - 0.5) * 0.8; // Random scale
      return `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
    });
    setTransforms(newTransforms);
  }, [text]);

  return (
    <span
      className={`relative inline-flex cursor-crosshair z-50 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {letters.map((char, i) => (
        <span
          key={i}
          className={`inline-block transition-all duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
            char === " " ? "w-4" : ""
          }`}
          style={{
            transform: isHovered
              ? transforms[i]
              : "translate(0px, 0px) rotate(0deg) scale(1)",
            opacity: isHovered ? 0.5 : 1,
            filter: isHovered ? "blur(2px)" : "blur(0px)",
            textShadow: isHovered ? "0 0 25px rgba(59,130,246,0.9)" : "none",
            color: isHovered ? "#60a5fa" : "inherit",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

// 2. MAIN HERO SECTION WITH LIQUID DISTORTION (Idea 3)
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
          
          /* Marquee Animation */
          @keyframes marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
          .animate-marquee { animation: marquee 35s linear infinite; will-change: transform; }
          
          /* Fluid Glow Animations */
          @keyframes fluidFloat1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(50px, -30px) scale(1.1); }
          }
          @keyframes fluidFloat2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-60px, 40px) scale(0.9); }
          }
          .animate-fluid-1 { animation: fluidFloat1 8s ease-in-out infinite; }
          .animate-fluid-2 { animation: fluidFloat2 10s ease-in-out infinite; }
        `}
      </style>

      {/* --- ADDED: SVG Liquid Distortion Filter --- */}
      <svg className="absolute w-0 h-0">
        <filter id="liquid-distortion">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* --- ADDED: Liquid Fluid Background Orbs --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-80"
        style={{ filter: "url(#liquid-distortion)" }}
      >
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-600/40 via-indigo-500/20 to-transparent blur-[80px] rounded-[100%] animate-fluid-1" />
        <div className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-[100px] rounded-full animate-fluid-2" />
        <div
          className="absolute top-[30%] right-[30%] -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full animate-fluid-1"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      {/* Dot Matrix Grid Pattern (Overlay for extra depth) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 my-auto">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-[2.4rem] sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.12] mb-6 select-none">
            <span className="text-white block mb-2">
              Lead Your Industry With
            </span>

            {/* --- ADDED: Glass Shatter Effect on Text --- */}
            <ShatterText
              text="Next-Generation"
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 drop-shadow-[0_0_25px_rgba(37,99,235,0.3)] block py-2"
            />

            <span className="text-white block mt-2">
              Optimised Web Solutions.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed max-w-3xl font-medium tracking-wide pointer-events-none">
            We engineer lightning-fast digital experiences designed to boost
            conversion rates, scale customer acquisition, and maximise revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
            <Link
              to="/start-project"
              className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_0_35px_-8px_rgba(37,99,235,0.6)] hover:shadow-[0_0_50px_-10px_rgba(37,99,235,0.8)] border border-blue-400/30 transition-all duration-300 active:scale-[0.98] outline-none overflow-hidden"
            >
              <Sparkles className="w-5 h-5 text-blue-100 relative z-10" />
              <span className="text-[16px] font-bold relative z-10 tracking-wide text-white">
                Initialise Project
              </span>
            </Link>

            <Link
              to="/services"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-xl bg-[#ffffff08] hover:bg-[#ffffff12] text-slate-300 hover:text-white shadow-lg border border-white/10 transition-all duration-300 active:scale-[0.98] backdrop-blur-xl outline-none"
            >
              <span className="text-[16px] font-semibold tracking-wide">
                View All Services
              </span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-slate-400 group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      <div
        className="w-full h-14 bg-[#030712]/90 backdrop-blur-xl overflow-hidden flex items-center z-30 border-t border-white/[0.04] shrink-0"
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
