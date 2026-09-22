import React from "react";
import { ArrowRight, Sparkles, Activity, Zap, ShieldCheck } from "lucide-react";

export default function CaseStudies() {
  const projects = [
    {
      num: "01",
      title: "FinTech Analytics Platform",
      category: "Enterprise Dashboard",
      description:
        "A highly optimised financial dashboard engineered for real-time data processing, secure transactions, and predictive analytics.",
      tech: ["React", "TypeScript", "Node.js"],
      gradient: "from-blue-600/20 to-cyan-600/5",
      visualGlow: "bg-[radial-gradient(circle,rgba(59,130,246,0.3)_0%,transparent_70%)]",
      offset: "top-20 sm:top-24 md:top-32",
      zIndex: "z-10",
      metricIcon: Activity,
      metricText: "Zero Latency",
    },
    {
      num: "02",
      title: "Lumina E-Commerce",
      category: "Customised Storefront",
      description:
        "A specialised, headless Shopify architecture designed for maximised conversion rates and lightning-fast load times.",
      tech: ["Next.js", "Shopify API", "Tailwind"],
      gradient: "from-indigo-600/20 to-purple-600/5",
      visualGlow: "bg-[radial-gradient(circle,rgba(99,102,241,0.3)_0%,transparent_70%)]",
      offset: "top-24 sm:top-28 md:top-40",
      zIndex: "z-20",
      metricIcon: Zap,
      metricText: "+240% Speed",
    },
    {
      num: "03",
      title: "Aura SaaS Infrastructure",
      category: "Cloud Architecture",
      description:
        "Robust and secure backend systems tailored precisely for complex business logic and flawless third-party API integrations.",
      tech: ["Laravel", "Vue.js", "AWS"],
      gradient: "from-emerald-600/20 to-teal-600/5",
      visualGlow: "bg-[radial-gradient(circle,rgba(16,185,129,0.3)_0%,transparent_70%)]",
      offset: "top-28 sm:top-32 md:top-48",
      zIndex: "z-30",
      metricIcon: ShieldCheck,
      metricText: "99.9% Uptime",
    },
  ];

  return (
    <section
      className="relative w-full py-16 lg:py-24 bg-[#030712] font-jakarta"
      id="work"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* 🚀 FIXED: Replaced 'blur-[150px]' with pure radial gradient class */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[37.5rem] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.05)_0%,transparent_60%)] pointer-events-none transform-gpu translate-z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="inline-flex items-center justify-center gap-2 p-3 mb-6 rounded-2xl bg-white/2 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(255,255,255,0.02)] backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h2 className="text-[14px] font-bold text-slate-300 uppercase tracking-widest m-0">
              Selected Work
            </h2>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-sm m-0">
            Proof of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              Excellence
            </span>
            .
          </h2>
          <h2 className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed max-w-2xl m-0">
            Explore our most highly specialised and customised digital
            solutions, engineered to dominate the modern web.
          </h2>
        </div>

        <div className="relative flex flex-col gap-8 sm:gap-12 pb-24">
          {projects.map((project, index) => {
            const MetricIcon = project.metricIcon;
            return (
              <div
                key={index}
                // 🚀 FIXED: Optimized shadows and reduced backdrop-blur-xl
                className={`sticky ${project.offset} ${project.zIndex} group w-full rounded-4xl sm:rounded-4xl bg-[#0a0f1c]/80 backdrop-blur-xl p-2 shadow-[0_-5px_20px_rgba(0,0,0,0.3),0_20px_40px_rgba(0,0,0,0.6)] transform-gpu will-change-transform translate-z-0 transition-transform duration-500`}
              >
                <div
                  className={`relative w-full rounded-[1.8rem] sm:rounded-4xl overflow-hidden bg-linear-to-br ${project.gradient} shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
                    <div className="lg:col-span-7 relative h-[17.5rem] sm:h-[25rem] lg:h-[34.375rem] bg-[#050811] overflow-hidden flex items-center justify-center shadow-[inset_0_0_60px_rgba(0,0,0,0.7)]">
                      
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-[#030712]/60 to-[#030712] z-0 transform-gpu" />

                      {/* 🚀 FIXED: Heavy blur glowing balls replaced with pure radial gradients */}
                      <div
                        className={`w-full h-full absolute inset-0 ${project.visualGlow} group-hover:scale-125 transition-transform duration-1000 ease-out z-0 transform-gpu opacity-60`}
                      />

                      <div
                        className="absolute inset-0 opacity-[0.04] z-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                      />

                      <div className="absolute w-[80%] h-[70%] bg-white/1 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_0_2px_rgba(255,255,255,0.05)] backdrop-blur-sm group-hover:-translate-y-4 group-hover:scale-[1.02] transition-all duration-700 ease-out z-10 flex flex-col p-6 overflow-hidden transform-gpu">
                        <div className="w-1/3 h-3 bg-white/5 rounded-full mb-4 shadow-[inset_0_0_2px_rgba(255,255,255,0.02)]" />
                        <div className="w-1/2 h-3 bg-white/3 rounded-full mb-8 shadow-[inset_0_0_2px_rgba(255,255,255,0.02)]" />
                        <div className="flex-1 w-full bg-white/2 rounded-xl shadow-[inset_0_0_2px_rgba(255,255,255,0.02)]" />

                        <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0a0f1c]/80 backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_0_2px_rgba(255,255,255,0.1)] group-hover:-translate-y-3 transition-transform duration-700 delay-100 transform-gpu">
                          <MetricIcon className="w-4 h-4 text-blue-400" />
                          <h2 className="text-[12px] font-bold text-slate-200 uppercase tracking-widest m-0">
                            {project.metricText}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-linear-to-l from-transparent to-[#0a0f1c]/80 relative overflow-hidden">
                      <h2 className="absolute -bottom-10 -right-4 text-[150px] sm:text-[220px] font-black text-white/2 select-none pointer-events-none tracking-tighter leading-none m-0 z-0">
                        {project.num}
                      </h2>

                      <div className="relative z-10">
                        <h2 className="text-[13px] sm:text-[14px] font-bold text-blue-400 uppercase tracking-widest mb-4 m-0 flex items-center gap-2">
                          <span className="w-8 h-px bg-blue-500/50 block shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                          {project.category}
                        </h2>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 m-0 leading-[1.1]">
                          {project.title}
                        </h2>
                        <h2 className="text-[15px] sm:text-base text-slate-400 font-medium leading-relaxed mb-10 m-0 max-w-md">
                          {project.description}
                        </h2>

                        <div className="flex flex-wrap gap-3 mb-12">
                          {project.tech.map((techItem, i) => (
                            <div
                              key={i}
                              className="px-5 py-2.5 rounded-full bg-white/2 shadow-[0_5px_15px_rgba(0,0,0,0.2),inset_0_0_2px_rgba(255,255,255,0.05)] hover:bg-white/6 hover:shadow-[0_0_20px_rgba(255,255,255,0.05),inset_0_0_2px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-default transform-gpu"
                            >
                              <h2 className="text-[13px] font-bold text-slate-300 m-0 tracking-wide">
                                {techItem}
                              </h2>
                            </div>
                          ))}
                        </div>

                        <a
                          href="#project"
                          className="group/btn inline-flex items-center gap-4 w-fit outline-none active:scale-[0.98] transition-transform transform-gpu"
                        >
                          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(37,99,235,0.4)] group-hover/btn:shadow-[0_0_40px_rgba(37,99,235,0.7)] group-hover/btn:scale-110 transition-all duration-400 transform-gpu">
                            <ArrowRight className="w-5 h-5 text-white transform group-hover/btn:translate-x-1 transition-transform duration-300 transform-gpu" />
                          </div>
                          <h2 className="text-[16px] font-extrabold text-white group-hover/btn:text-blue-400 transition-colors m-0 tracking-wide">
                            Explore Architecture
                          </h2>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}