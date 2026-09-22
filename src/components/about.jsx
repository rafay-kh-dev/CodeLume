import React from "react";
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
      glow: "bg-blue-500/10",
      alignment: "mr-auto", // Aligned to left
    },
    {
      title: "Custom Engineering",
      desc: "Zero-latency, highly secure MERN & PHP backend infrastructures.",
      icon: Terminal,
      accent: "text-indigo-400",
      glow: "bg-indigo-500/10",
      alignment: "ml-auto lg:ml-12", // Offset to right
    },
    {
      title: "Growth & SEO",
      desc: "Technically optimised platforms built for maximum search dominance.",
      icon: TrendingUp,
      accent: "text-cyan-400",
      glow: "bg-cyan-500/10",
      alignment: "mr-auto lg:ml-6", // Slightly offset
    },
  ];

  return (
    <section
      className="relative w-full py-20 lg:py-32 bg-[#030712] font-jakarta overflow-hidden"
      id="about"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Abstract Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-150 h-150 bg-blue-900/10 rounded-full blur-[150px] pointer-events-none transform-gpu translate-z-0" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none transform-gpu translate-z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left Column: The Persona & Philosophy */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/2 shadow-[inset_0_0_15px_rgba(255,255,255,0.03),0_10px_20px_rgba(0,0,0,0.5)] mb-8 backdrop-blur-md transform-gpu">
              <UserCircle className="w-4 h-4 text-blue-400" />
              <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0">
                The Architect
              </h2>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black text-white tracking-tight leading-[1.05] mb-4 m-0 drop-shadow-lg">
              Hi, I'm <br className="hidden sm:block lg:hidden" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-300 to-cyan-400">
                Rafay.
              </span>
            </h2>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-300 mb-8 m-0 tracking-tight">
              Full-Stack Developer & UI/UX Designer.
            </h2>

            <h2 className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed max-w-lg mb-10 m-0">
              As the driving force behind CodeLume, I bridge the gap between
              stunning aesthetic design and robust server architectures. I don't
              rely on pre-built templates. Every pixel is optimised, every line
              of code is customised, and every platform is engineered for global
              scale.
            </h2>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-4 w-fit outline-none group/link transform-gpu"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] group-hover/link:bg-blue-600 group-hover/link:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 transform-gpu group-active/link:scale-95">
                <ArrowRight className="w-5 h-5 text-blue-400 group-hover/link:text-white transition-colors" />
              </div>
              <h2 className="text-[15px] sm:text-base font-extrabold text-white m-0 tracking-wide group-hover/link:text-blue-400 transition-colors">
                Let's engineer your vision
              </h2>
            </a>
          </div>

          {/* Right Column: Staggered Skill Ladder */}
          <div className="relative w-full flex flex-col gap-5 sm:gap-6 pt-8 lg:pt-0">
            {/* FIXED: left-10 and w-px used for canonical spacing/sizing */}
            <div className="absolute top-10 bottom-10 left-10 w-px bg-linear-to-b from-transparent via-blue-500/20 to-transparent hidden sm:block" />

            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className={`relative z-10 w-full sm:w-[85%] rounded-3xl bg-[#0a0f1c]/70 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_0_20px_rgba(255,255,255,0.05)] hover:-translate-y-1 transition-all duration-500 ease-out transform-gpu flex items-center gap-5 group outline-none ${skill.alignment}`}
                >
                  {/* Subtle inner gradient */}
                  <div className="absolute inset-0 bg-linear-to-r from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none transform-gpu" />

                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${skill.glow} flex items-center justify-center shrink-0 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500 transform-gpu relative z-10`}
                  >
                    <Icon className={`w-6 h-6 ${skill.accent}`} />
                  </div>

                  <div className="flex flex-col relative z-10">
                    <h2 className="text-lg sm:text-xl font-extrabold text-white m-0 mb-1.5 tracking-tight group-hover:text-blue-200 transition-colors">
                      {skill.title}
                    </h2>
                    <h2 className="text-[13px] sm:text-[14px] text-slate-400 font-medium leading-relaxed m-0 group-hover:text-slate-300 transition-colors">
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
