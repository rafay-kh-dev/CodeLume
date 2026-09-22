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
      visualGlow: "bg-blue-500/20",
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
      visualGlow: "bg-indigo-500/20",
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
      visualGlow: "bg-emerald-500/20",
      offset: "top-28 sm:top-32 md:top-48",
      zIndex: "z-30",
      metricIcon: ShieldCheck,
      metricText: "99.9% Uptime",
    },
  ];

  return (
    <section
      className="relative w-full py-24 sm:py-32 bg-[#030712] font-jakarta"
      id="work"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        `}
      </style>

      {/* Global Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center justify-center gap-2 p-3 mb-6 rounded-2xl bg-white/[0.02] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(255,255,255,0.02)] backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h2 className="text-[14px] font-bold text-slate-300 uppercase tracking-widest m-0">
              Selected Work
            </h2>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-sm m-0">
            Proof of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Excellence
            </span>
            .
          </h2>
          <h2 className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed max-w-2xl m-0">
            Explore our most highly specialised and customised digital
            solutions, engineered to dominate the modern web.
          </h2>
        </div>

        {/* VIP Parallax Stacking Container */}
        <div className="relative flex flex-col gap-8 sm:gap-12 pb-32">
          {projects.map((project, index) => {
            const MetricIcon = project.metricIcon;
            return (
              <div
                key={index}
                className={`sticky ${project.offset} ${project.zIndex} group w-full rounded-[2rem] sm:rounded-[3rem] bg-[#0a0f1c]/90 backdrop-blur-xl p-2 shadow-[0_-10px_40px_rgba(0,0,0,0.4),0_30px_60px_rgba(0,0,0,0.7)] transform-gpu will-change-transform translate-z-0 transition-transform duration-500`}
              >
                {/* Inner Gradient Container */}
                <div
                  className={`relative w-full rounded-[1.8rem] sm:rounded-[2.8rem] overflow-hidden bg-gradient-to-br ${project.gradient} shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
                    {/* Left/Top: Holographic Blueprint Visuals */}
                    <div className="lg:col-span-7 relative h-[280px] sm:h-[400px] lg:h-[550px] bg-[#050811] overflow-hidden flex items-center justify-center shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]">
                      {/* Ambient Glowing Background */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#030712]/60 to-[#030712] z-0" />
                      <div
                        className={`w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full ${project.visualGlow} blur-[60px] sm:blur-[90px] group-hover:scale-125 transition-transform duration-1000 ease-out z-0`}
                      />
                      <div
                        className="absolute inset-0 opacity-[0.04] z-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                      />

                      {/* Floating Holographic Glass Panels */}
                      <div className="absolute w-[80%] h-[70%] bg-white/[0.01] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_2px_rgba(255,255,255,0.05)] backdrop-blur-sm group-hover:-translate-y-4 group-hover:scale-[1.02] transition-all duration-700 ease-out z-10 flex flex-col p-6 overflow-hidden">
                        {/* Mock Skeleton UI Code Lines */}
                        <div className="w-1/3 h-3 bg-white/[0.05] rounded-full mb-4 shadow-[inset_0_0_2px_rgba(255,255,255,0.02)]" />
                        <div className="w-1/2 h-3 bg-white/[0.03] rounded-full mb-8 shadow-[inset_0_0_2px_rgba(255,255,255,0.02)]" />
                        <div className="flex-1 w-full bg-white/[0.02] rounded-xl shadow-[inset_0_0_2px_rgba(255,255,255,0.02)]" />

                        {/* Floating Metric Badge */}
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0a0f1c]/80 backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_0_2px_rgba(255,255,255,0.1)] group-hover:-translate-y-3 transition-transform duration-700 delay-100">
                          <MetricIcon className="w-4 h-4 text-blue-400" />
                          <h2 className="text-[12px] font-bold text-slate-200 uppercase tracking-widest m-0">
                            {project.metricText}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Right/Bottom: Project Details with Editorial Watermark */}
                    <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-gradient-to-l from-transparent to-[#0a0f1c]/80 relative overflow-hidden">
                      {/* Massive Editorial Watermark Number */}
                      <h2 className="absolute -bottom-10 -right-4 text-[150px] sm:text-[220px] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter leading-none m-0 z-0">
                        {project.num}
                      </h2>

                      <div className="relative z-10">
                        <h2 className="text-[13px] sm:text-[14px] font-bold text-blue-400 uppercase tracking-widest mb-4 m-0 flex items-center gap-2">
                          <span className="w-8 h-[1px] bg-blue-500/50 block shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                          {project.category}
                        </h2>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 m-0 leading-[1.1]">
                          {project.title}
                        </h2>

                        <h2 className="text-[15px] sm:text-base text-slate-400 font-medium leading-relaxed mb-10 m-0 max-w-md">
                          {project.description}
                        </h2>

                        {/* Interactive Tech Stack Pills */}
                        <div className="flex flex-wrap gap-3 mb-12">
                          {project.tech.map((techItem, i) => (
                            <div
                              key={i}
                              className="px-5 py-2.5 rounded-full bg-white/[0.02] shadow-[0_5px_15px_rgba(0,0,0,0.2),inset_0_0_2px_rgba(255,255,255,0.05)] hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(255,255,255,0.05),inset_0_0_2px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-default"
                            >
                              <h2 className="text-[13px] font-bold text-slate-300 m-0 tracking-wide">
                                {techItem}
                              </h2>
                            </div>
                          ))}
                        </div>

                        {/* Magnetic View Button */}
                        <a
                          href="#project"
                          className="group/btn inline-flex items-center gap-4 w-fit outline-none active:scale-[0.98] transition-transform"
                        >
                          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(37,99,235,0.4)] group-hover/btn:shadow-[0_0_40px_rgba(37,99,235,0.7)] group-hover/btn:scale-110 transition-all duration-400">
                            <ArrowRight className="w-5 h-5 text-white transform group-hover/btn:translate-x-1 transition-transform duration-300" />
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
