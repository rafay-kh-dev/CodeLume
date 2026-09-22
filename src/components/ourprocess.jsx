import React from "react";
import { Compass, PenTool, Cpu, Rocket, Sparkles } from "lucide-react";

export default function OurProcess() {
  const steps = [
    {
      num: "01",
      title: "Strategic Discovery",
      desc: "We deeply analyse your business objectives to map out a highly customised and scalable technical blueprint.",
      icon: Compass,
      align: "left",
      glow: "bg-blue-600/10",
      accent: "text-blue-400",
      hoverShadow:
        "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.2),inset_0_0_20px_rgba(59,130,246,0.05)]",
      gradient: "from-blue-600/10 to-transparent",
    },
    {
      num: "02",
      title: "UI/UX Architecture",
      desc: "Crafting bespoke, highly engaging interfaces focused on maximised conversion rates and flawless user journeys.",
      icon: PenTool,
      align: "right",
      glow: "bg-indigo-600/10",
      accent: "text-indigo-400",
      hoverShadow:
        "group-hover:shadow-[0_0_40px_rgba(99,102,241,0.2),inset_0_0_20px_rgba(99,102,241,0.05)]",
      gradient: "from-indigo-600/10 to-transparent",
    },
    {
      num: "03",
      title: "Core Engineering",
      desc: "Writing clean, highly optimised code utilising modern frameworks to ensure zero latency and maximum security.",
      icon: Cpu,
      align: "left",
      glow: "bg-cyan-600/10",
      accent: "text-cyan-400",
      hoverShadow:
        "group-hover:shadow-[0_0_40px_rgba(6,182,212,0.2),inset_0_0_20px_rgba(6,182,212,0.05)]",
      gradient: "from-cyan-600/10 to-transparent",
    },
    {
      num: "04",
      title: "Global Deployment",
      desc: "Rigorous testing and seamless deployment to elite server infrastructures for worldwide accessibility and scale.",
      icon: Rocket,
      align: "right",
      glow: "bg-purple-600/10",
      accent: "text-purple-400",
      hoverShadow:
        "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.2),inset_0_0_20px_rgba(168,85,247,0.05)]",
      gradient: "from-purple-600/10 to-transparent",
    },
  ];

  return (
    // FIXED Spacing py-16 for mobile
    <section className="relative w-full py-16 lg:py-24 bg-[#030712] font-jakarta overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* FIXED Canonical w-200 h-150 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-150 bg-blue-900/10 rounded-full blur-[160px] pointer-events-none transform-gpu translate-z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 sm:mb-28">
          {/* FIXED bg-white/3 */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/3 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0">
              Our Methodology
            </h2>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] m-0 drop-shadow-lg">
            How we engineer <br className="hidden sm:block" />
            {/* FIXED bg-linear-to-r */}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-300 to-cyan-400">
              Digital Perfection.
            </span>
          </h2>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          {/* FIXED Canonical left-8.5 w-0.5 bg-white/5 */}
          <div className="absolute left-8.5 lg:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)] -translate-x-1/2 transform-gpu" />

          <div className="flex flex-col gap-12 sm:gap-20 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = step.align === "left";

              return (
                <div
                  key={index}
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center w-full group outline-none ${isLeft ? "lg:justify-start" : "lg:justify-end"}`}
                >
                  {/* FIXED left-8.5 */}
                  <div className="absolute left-8.5 lg:left-1/2 top-8 lg:top-1/2 w-4 h-4 rounded-full bg-[#0a0f1c] shadow-[inset_0_0_10px_rgba(255,255,255,0.2),0_0_20px_rgba(59,130,246,0.6)] border-none -translate-x-1/2 lg:-translate-y-1/2 z-20 group-hover:scale-150 transition-transform duration-500 transform-gpu flex items-center justify-center">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${step.glow.replace("/10", "")} shadow-[0_0_10px_currentColor]`}
                    />
                  </div>

                  <div
                    className={`w-full lg:w-[45%] pl-20 lg:pl-0 ${isLeft ? "lg:pr-16" : "lg:pl-16"}`}
                  >
                    {/* FIXED rounded-4xl */}
                    <div
                      className={`relative rounded-4xl bg-[#0a0f1c]/60 backdrop-blur-3xl p-8 sm:p-10 flex flex-col overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.02),0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out transform-gpu hover:-translate-y-2 will-change-transform ${step.hoverShadow}`}
                    >
                      {/* FIXED bg-linear-to-b */}
                      <div
                        className={`absolute top-0 ${isLeft ? "right-0" : "left-0"} w-full h-full bg-linear-to-b ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform-gpu`}
                      />

                      <div className="relative z-10 flex items-center justify-between mb-8">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-[#030712]/80 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] flex items-center justify-center transform-gpu transition-transform duration-500 group-hover:scale-110`}
                        >
                          <Icon
                            className={`w-6 h-6 ${step.accent} drop-shadow-md`}
                          />
                        </div>
                        {/* FIXED text-white/3 and group-hover:text-white/6 */}
                        <h2 className="text-5xl font-black text-white/3 select-none tracking-tighter m-0 group-hover:text-white/6 transition-colors duration-500">
                          {step.num}
                        </h2>
                      </div>

                      <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 m-0 tracking-tight">
                          {step.title}
                        </h2>
                        <h2 className="text-[15px] sm:text-base text-slate-400 font-medium leading-relaxed m-0 group-hover:text-slate-300 transition-colors duration-300">
                          {step.desc}
                        </h2>
                      </div>
                    </div>
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
