"use client";
import React from "react";
import Link from "next/link";
import {
  UserCircle,
  ArrowRight,
  Palette,
  Terminal,
  TrendingUp,
} from "lucide-react";

export default function About() {
  return (
    <section
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-transparent font-jakarta overflow-hidden"
      id="about"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Subtle Ambient Glow for Depth */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Personal Profile (Kept clean as before) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#070b14]/80 backdrop-blur-md border border-blue-500/20 mb-8 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <UserCircle className="w-4 h-4 text-blue-400" />
              <h2 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] m-0">
                The Architect
              </h2>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05] mb-6 m-0">
              Hi, I'm <br className="hidden sm:block lg:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Rafay.
              </span>
            </h2>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-300 mb-6 m-0 tracking-tight">
              Full-Stack Developer & UI/UX Designer.
            </h2>

            <p className="text-[15px] sm:text-base text-slate-400 font-medium leading-relaxed max-w-lg mb-10 m-0">
              As the driving force behind CodeLume, I bridge the gap between
              stunning aesthetic design and robust server architectures. I don't
              rely on pre-built templates. Every pixel is optimised, every line
              of code is customised, and every platform is engineered for global
              scale.
            </p>

            <Link
              href="/start-project"
              className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 text-white overflow-hidden outline-none active:scale-[0.98] transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h2 className="relative z-10 text-[15px] font-black m-0 text-inherit tracking-wide">
                Let's engineer your vision
              </h2>
              <ArrowRight className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Right Side: Enhanced Premium Bento Box Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Card 1: Featured Skill (Spans Full Width) */}
            <div className="sm:col-span-2 group relative p-8 sm:p-10 rounded-[2rem] bg-gradient-to-br from-[#0a0f1c] to-[#050812] border border-white/5 hover:border-blue-500/30 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.2)] cursor-default">
              {/* Animated Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all duration-700" />
              
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
                  <Palette className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 m-0 tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                    UI/UX Architecture
                  </h2>
                  <p className="text-[15px] sm:text-base text-slate-400 font-medium leading-relaxed m-0 max-w-md">
                    Pixel-perfect visual design with a focus on human-centric interfaces. Creating experiences that are not just beautiful, but intuitively functional.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Secondary Skill (Half Width) */}
            <div className="group relative p-8 rounded-[2rem] bg-gradient-to-b from-[#0a0f1c] to-[#030712] border border-white/5 hover:border-indigo-500/30 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.2)] cursor-default">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[50px] group-hover:bg-indigo-500/20 transition-all duration-700" />
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <Terminal className="w-7 h-7 text-indigo-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white mb-3 m-0 tracking-tight group-hover:text-indigo-400 transition-colors duration-300">
                    Custom Engineering
                  </h2>
                  <p className="text-[14px] text-slate-400 font-medium leading-relaxed m-0">
                    Zero-latency, highly secure MERN & PHP backend infrastructures built for scale.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Secondary Skill (Half Width) */}
            <div className="group relative p-8 rounded-[2rem] bg-gradient-to-b from-[#0a0f1c] to-[#030712] border border-white/5 hover:border-cyan-500/30 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.2)] cursor-default">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[50px] group-hover:bg-cyan-500/20 transition-all duration-700" />
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <TrendingUp className="w-7 h-7 text-cyan-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white mb-3 m-0 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                    Growth & SEO
                  </h2>
                  <p className="text-[14px] text-slate-400 font-medium leading-relaxed m-0">
                    Technically optimised platforms built from the ground up for maximum search dominance.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}