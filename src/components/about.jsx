import React from "react";
import { Link } from "react-router-dom";
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
    },
    {
      title: "Custom Engineering",
      desc: "Zero-latency, highly secure MERN & PHP backend infrastructures.",
      icon: Terminal,
      accent: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      title: "Growth & SEO",
      desc: "Technically optimised platforms built for maximum search dominance.",
      icon: TrendingUp,
      accent: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  return (
    <section
      className="w-full py-16 sm:py-24 lg:py-32 bg-[#030712] font-jakarta"
      id="about"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Mobile-Optimised Personal Info */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#070b14] border border-white/5 mb-6 sm:mb-8">
              <UserCircle className="w-4 h-4 text-blue-500" />
              <h2 className="text-[12px] font-black text-blue-500 uppercase tracking-[0.2em] m-0">
                The Architect
              </h2>
            </div>

            <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tighter leading-[1.05] mb-4 m-0">
              Hi, I'm <br className="hidden sm:block lg:hidden" />
              <span className="text-blue-500">Rafay.</span>
            </h2>

            <h2 className="text-xl sm:text-2xl font-black text-slate-300 mb-6 sm:mb-8 m-0 tracking-tight">
              Full-Stack Developer & UI/UX Designer.
            </h2>

            <h2 className="text-[15px] sm:text-base text-slate-400 font-medium leading-relaxed max-w-lg mb-8 sm:mb-10 m-0">
              As the driving force behind CodeLume, I bridge the gap between
              stunning aesthetic design and robust server architectures. I don't
              rely on pre-built templates. Every pixel is optimised, every line
              of code is customised, and every platform is engineered for global
              scale.
            </h2>

            {/* Mobile-First Sharp CTA Button */}
            <Link
              to="/start-project"
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 outline-none group/btn active:scale-[0.98] transform-gpu"
            >
              <h2 className="text-[15px] font-black m-0 text-inherit tracking-wide">
                Let's engineer your vision
              </h2>
              <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Side: Sharp Mobile-First Skills Grid */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="group w-full flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 p-6 sm:p-8 rounded-2xl bg-[#070b14] border border-white/5 hover:border-white/10 hover:bg-[#0a0f1c] active:bg-[#05080f] active:scale-[0.98] sm:active:scale-100 transition-all duration-200 cursor-pointer outline-none"
                >
                  {/* Crisp Icon Box */}
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${skill.bg} border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${skill.accent}`}
                      strokeWidth={2}
                    />
                  </div>

                  {/* Punchy Content */}
                  <div className="flex flex-col">
                    <h2 className="text-xl sm:text-2xl font-black text-white mb-2 sm:mb-1.5 m-0 tracking-tight group-hover:text-blue-100 transition-colors">
                      {skill.title}
                    </h2>
                    <h2 className="text-[14px] sm:text-[15px] text-slate-400 font-medium leading-relaxed m-0">
                      {skill.desc}
                    </h2>
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
