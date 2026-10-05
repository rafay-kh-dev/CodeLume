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
  const skills = [
    {
      title: "UI/UX Architecture",
      desc: "Pixel-perfect visual design with a focus on human-centric interfaces.",
      icon: Palette,
      accent: "text-blue-400",
      bg: "bg-blue-500/10",
      hoverBorder: "hover:border-blue-500/30",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    },
    {
      title: "Custom Engineering",
      desc: "Zero-latency, highly secure MERN & PHP backend infrastructures.",
      icon: Terminal,
      accent: "text-indigo-400",
      bg: "bg-indigo-500/10",
      hoverBorder: "hover:border-indigo-500/30",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
    },
    {
      title: "Growth & SEO",
      desc: "Technically optimised platforms built for maximum search dominance.",
      icon: TrendingUp,
      accent: "text-cyan-400",
      bg: "bg-cyan-500/10",
      hoverBorder: "hover:border-cyan-500/30",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
    },
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Personal Profile */}
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

          {/* Right Side: Interactive Skills Grid */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className={`group w-full flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-[#0a0f1c]/50 backdrop-blur-sm border border-white/5 ${skill.hoverBorder} ${skill.hoverShadow} hover:bg-[#0c1222] hover:-translate-y-1 transition-all duration-300 cursor-default`}
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${skill.bg} border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    <Icon
                      className={`w-6 h-6 sm:w-7 sm:h-7 ${skill.accent}`}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="flex flex-col">
                    <h2 className={`text-xl sm:text-2xl font-black text-white mb-2 sm:mb-1.5 m-0 tracking-tight group-hover:${skill.accent} transition-colors duration-300`}>
                      {skill.title}
                    </h2>
                    <p className="text-[14px] sm:text-[15px] text-slate-400 font-medium leading-relaxed m-0">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}