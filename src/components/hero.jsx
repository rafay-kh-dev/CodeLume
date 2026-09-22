import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Cpu,
  ChevronRight,
  Sparkles,
  Server,
  Layers,
  LayoutTemplate,
  MonitorSmartphone,
  Store,
  Palette,
  Webhook,
  Globe,
  CheckCircle2,
} from "lucide-react";

export default function HeroSection() {
  const fullText = `import { Engine } from '@core';\n\nexport const App = () => (\n  <Engine\n    mode="optimised"\n    latency="12ms"\n    security="enterprise"\n  />\n);`;
  const [typedText, setTypedText] = useState("");
  const spotlightRef = useRef(null);

  const handleMouseMove = (e) => {
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(800px circle at ${e.clientX}px ${e.clientY}px, rgba(37,99,235,0.07), transparent 40%)`;
    }
  };

  useEffect(() => {
    let timeout;
    let i = 0;
    const type = () => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
        timeout = setTimeout(type, 30 + Math.random() * 40);
      } else {
        timeout = setTimeout(() => {
          i = 0;
          setTypedText("");
          type();
        }, 6000);
      }
    };
    type();
    return () => clearTimeout(timeout);
  }, [fullText]);

  const renderHighlightedCode = (text) => {
    const parts = text.split(
      /(\bimport\b|\bfrom\b|\bexport\b|\bconst\b|@core|"optimised"|"12ms"|"enterprise"|Engine|App|=|>|<|\(|\)|\/)/g,
    );
    return parts.map((part, index) => {
      // FIXED CSS CONFLICTS: Removed text-inherit when specific colors are applied
      if (/^(import|from|export|const)$/.test(part))
        return (
          <h2 key={index} className="inline text-[#ff7b72] m-0 font-inherit">
            {part}
          </h2>
        );
      if (/^(@core|"optimised"|"12ms"|"enterprise")$/.test(part))
        return (
          <h2 key={index} className="inline text-[#a5d6ff] m-0 font-inherit">
            {part}
          </h2>
        );
      if (/^(Engine|App)$/.test(part))
        return (
          <h2 key={index} className="inline text-[#d2a8ff] m-0 font-inherit">
            {part}
          </h2>
        );
      if (/^(=|>|<|\(\vert{}\)|\/)$/.test(part))
        return (
          <h2 key={index} className="inline text-[#c9d1d9] m-0 font-inherit">
            {part}
          </h2>
        );
      return (
        <h2 key={index} className="inline text-inherit m-0 font-inherit">
          {part}
        </h2>
      );
    });
  };

  return (
    // FIXED: min-h-[100dvh] -> min-h-dvh
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-dvh flex flex-col overflow-hidden bg-[#030712] font-jakarta"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #030712; }
          ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
          ::-webkit-scrollbar-thumb:hover { background: #2563eb; }
          @keyframes shimmer { 0% { transform: translate3d(-150%,0,0); } 100% { transform: translate3d(150%,0,0); } }
          @keyframes marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
          @keyframes float { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-12px,0); } }
          .animate-shimmer { animation: shimmer 2.5s infinite linear; will-change: transform; }
          .animate-marquee { animation: marquee 35s linear infinite; will-change: transform; }
          .animate-float { animation: float 6s ease-in-out infinite; will-change: transform; }
        `}
      </style>

      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-0 transform-gpu translate-z-0"
        style={{ background: "transparent" }}
      />

      <div
        className="absolute inset-0 z-0 opacity-[0.12] transform-gpu translate-z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #4f4f4f20 1px, transparent 1px), linear-gradient(to bottom, #4f4f4f20 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />

      {/* FIXED Canonical classes for sizes */}
      <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-[pulse_6s_ease-in-out_infinite] transform-gpu translate-z-0 will-change-transform" />
      <div className="absolute bottom-1/3 right-1/4 w-112.5 h-112.5 bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-[pulse_8s_ease-in-out_infinite] transform-gpu translate-z-0 will-change-transform" />

      {/* FIXED Spacing for Mobile (pt-28 pb-16 instead of massive gaps) */}
      <div className="flex-1 flex flex-col justify-center w-full relative z-10 pt-28 pb-16 lg:pt-20 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="flex flex-col items-start text-left w-full">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] font-extrabold tracking-tight text-white leading-[1.05] mb-6 drop-shadow-sm m-0">
                Architecting <br className="hidden sm:block" />
                {/* FIXED: bg-gradient-to-r -> bg-linear-to-r */}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-cyan-400 drop-shadow-[0_0_25px_rgba(37,99,235,0.25)]">
                  Highly Optimised
                </span>
                <br /> Web Solutions.
              </h2>
              <h2 className="text-base sm:text-lg lg:text-[1.1rem] text-slate-400/90 mb-8 leading-relaxed max-w-lg font-medium m-0">
                We engineer robust, scalable, and secure applications utilising
                the MERN stack, PHP/Laravel, and modern frontend frameworks.
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a
                  href="#start"
                  className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 text-white shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] hover:shadow-[0_0_50px_-5px_rgba(37,99,235,0.7)] transition-all duration-300 active:scale-[0.98] outline-none overflow-hidden transform-gpu"
                >
                  {/* FIXED bg-linear-to-r */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
                  <Sparkles className="w-4 h-4 text-blue-200 relative z-10" />
                  <h2 className="m-0 text-[15px] font-bold relative z-10 tracking-wide">
                    Initialise Project
                  </h2>
                </a>
                {/* FIXED bg-white/3 and hover:bg-white/8 */}
                <a
                  href="#services"
                  className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-white/3 hover:bg-white/8 text-slate-300 hover:text-white shadow-[0_15px_30px_rgba(0,0,0,0.2)] transition-all duration-300 active:scale-[0.98] backdrop-blur-md outline-none transform-gpu"
                >
                  <h2 className="m-0 text-[15px] font-bold tracking-wide">
                    View Capabilities
                  </h2>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-slate-500 group-hover:text-white transform-gpu" />
                </a>
              </div>
            </div>

            <div className="relative w-full z-20 animate-float lg:pl-6 transform-gpu mt-8 lg:mt-0">
              <div className="relative rounded-2xl bg-[#0a0f1c]/50 backdrop-blur-2xl p-1 shadow-[0_30px_70px_rgba(0,0,0,0.6)] ring-0">
                {/* FIXED bg-linear-to-br */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none shadow-[inset_0_0_15px_rgba(255,255,255,0.03)]" />
                <div className="relative rounded-xl bg-[#0d1117]/95 overflow-hidden flex flex-col shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center justify-between px-4 sm:px-5 bg-[#161b22]/90 shadow-[0_15px_30px_rgba(0,0,0,0.4)] relative z-10">
                    <div className="flex items-center gap-2 py-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex items-end self-end pt-2">
                      <div className="px-4 sm:px-5 py-2.5 bg-[#0d1117] rounded-t-xl flex items-center gap-2 shadow-[0_-5px_15px_rgba(0,0,0,0.3)]">
                        <Code2 className="w-3.5 h-3.5 text-blue-400" />
                        <h2 className="text-[10px] sm:text-[11px] font-mono font-medium text-slate-300 m-0 tracking-wider">
                          CodeLume_Engine.jsx
                        </h2>
                      </div>
                    </div>
                    <div className="w-16" />
                  </div>
                  {/* FIXED Heights Canonical classes */}
                  <div className="p-4 sm:p-6 lg:p-8 font-mono text-[11px] sm:text-[13px] lg:text-[14px] leading-[1.8] text-[#c9d1d9] overflow-x-auto bg-[#0d1117] h-55 sm:h-65 lg:h-75 relative">
                    <div className="flex">
                      <div className="flex flex-col text-slate-600/70 text-right pr-4 sm:pr-5 mr-4 sm:mr-5 select-none shrink-0 shadow-[1px_0_0_rgba(255,255,255,0.02)]">
                        {[...Array(8)].map((_, i) => (
                          <h2 key={i} className="m-0 font-inherit text-inherit">
                            {i + 1}
                          </h2>
                        ))}
                      </div>
                      <div className="whitespace-pre flex-1 relative">
                        {renderHighlightedCode(typedText)}
                        <h2 className="inline-block w-1.5 h-[1.2em] bg-blue-400 animate-[pulse_1s_ease-in-out_infinite] ml-0.5 align-middle m-0 shadow-[0_0_10px_rgba(59,130,246,0.6)] transform-gpu" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-[#0a0d14] shadow-[0_-15px_30px_rgba(0,0,0,0.5)] relative z-10">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-blue-400" />
                        <h2 className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-widest m-0">
                          System Active
                        </h2>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Cpu className="w-3 h-3 text-indigo-400" />
                        <h2 className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-widest m-0 hidden sm:block">
                          12ms Latency
                        </h2>
                      </div>
                    </div>
                    <h2 className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-widest m-0">
                      UTF-8
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED Heights Canonical classes */}
      <div
        className="absolute bottom-0 w-full h-12.5 sm:h-15 bg-slate-900/40 backdrop-blur-xl overflow-hidden flex items-center z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] transform-gpu translate-z-0"
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
              className="flex items-center gap-10 sm:gap-16 px-6 sm:px-8"
            >
              {[
                { name: "MERN Stack", icon: Layers },
                { name: "PHP / Laravel", icon: Server },
                { name: "Angular", icon: LayoutTemplate },
                { name: "Custom Platforms", icon: MonitorSmartphone },
                { name: "WordPress", icon: Store },
                { name: "Shopify", icon: Palette },
                { name: "Webflow", icon: Globe },
                { name: "API Integrations", icon: Webhook },
              ].map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 text-slate-400/50 hover:text-blue-400 transition-colors duration-300"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <h2 className="text-[11px] sm:text-[13px] font-bold tracking-[0.15em] uppercase m-0">
                      {tech.name}
                    </h2>
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
