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
      accent: "text-blue-500",
    },
    {
      title: "Custom Engineering",
      desc: "Zero-latency, highly secure MERN & PHP backend infrastructures.",
      icon: Terminal,
      accent: "text-indigo-500",
    },
    {
      title: "Growth & SEO",
      desc: "Technically optimised platforms built for maximum search dominance.",
      icon: TrendingUp,
      accent: "text-cyan-500",
    },
  ];

  return (
    <section
      className="w-full py-20 lg:py-32 bg-[#030712] font-jakarta"
      id="about"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Left Side: Personal Info */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0f1c] border border-slate-800 mb-8">
              <UserCircle className="w-4 h-4 text-blue-500" />
              <h2 className="text-[12px] font-extrabold text-blue-500 uppercase tracking-[0.2em] m-0">
                The Architect
              </h2>
            </div>

            <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-[1.05] mb-4 m-0">
              Hi, I'm <br className="hidden sm:block lg:hidden" />
              <span className="text-blue-500">Rafay.</span>
            </h2>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-300 mb-8 m-0 tracking-tight">
              Full-Stack Developer & UI/UX Designer.
            </h2>

            <h2 className="text-[15px] sm:text-base text-slate-400 font-medium leading-relaxed max-w-lg mb-10 m-0">
              As the driving force behind CodeLume, I bridge the gap between
              stunning aesthetic design and robust server architectures. I don't
              rely on pre-built templates. Every pixel is optimised, every line
              of code is customised, and every platform is engineered for global
              scale.
            </h2>

            <a
              href="#contact"
              className="group flex items-center gap-4 outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-[#0a0f1c] border border-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-[15px] font-extrabold text-white group-hover:text-blue-400 transition-colors m-0 tracking-wide">
                Let's engineer your vision
              </h2>
            </a>
          </div>

          {/* Right Side: Skills Grid */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  className="w-full flex items-center gap-6 p-6 sm:p-8 rounded-2xl bg-[#0a0f1c] border border-slate-800 hover:border-slate-500 transition-colors duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#030712] border border-slate-800 flex items-center justify-center shrink-0">
                    <Icon className={`w-6 h-6 ${skill.accent}`} />
                  </div>

                  <div className="flex flex-col">
                    <h2 className="text-lg sm:text-xl font-extrabold text-white mb-2 m-0 group-hover:text-blue-400 transition-colors">
                      {skill.title}
                    </h2>
                    <h2 className="text-[14px] text-slate-400 font-medium leading-relaxed m-0">
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
