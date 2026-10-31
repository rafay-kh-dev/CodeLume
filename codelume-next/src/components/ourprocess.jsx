"use client";
import React from "react";
import { Compass, PenTool, Cpu, Rocket, Sparkles } from "lucide-react";

export default function OurProcess() {
  // Process steps with corresponding Antigravity brand colors & Solo Copy
  const steps = [
    {
      num: "01",
      title: "Strategic Discovery",
      desc: "I deeply analyze your business objectives to map out a highly customized and scalable technical blueprint for your project.",
      icon: Compass,
      colorClass:
        "hover:border-[#4285F4] hover:shadow-[0_10px_40px_-10px_rgba(66,133,244,0.15)]",
      textHover: "group-hover:text-[#4285F4]",
      bgHover: "group-hover:bg-[#4285F4]",
      iconColor: "text-[#4285F4]",
      hex: "#4285F4",
    },
    {
      num: "02",
      title: "UI/UX Architecture",
      desc: "Crafting bespoke, highly engaging interfaces focused entirely on maximized conversion rates and flawless user journeys.",
      icon: PenTool,
      colorClass:
        "hover:border-[#34A853] hover:shadow-[0_10px_40px_-10px_rgba(52,168,83,0.15)]",
      textHover: "group-hover:text-[#34A853]",
      bgHover: "group-hover:bg-[#34A853]",
      iconColor: "text-[#34A853]",
      hex: "#34A853",
    },
    {
      num: "03",
      title: "Core Engineering",
      desc: "Writing clean, highly optimized code utilizing modern frameworks to ensure zero latency and maximum security for your web app.",
      icon: Cpu,
      colorClass:
        "hover:border-[#FBBC05] hover:shadow-[0_10px_40px_-10px_rgba(251,188,5,0.15)]",
      textHover: "group-hover:text-[#FBBC05]",
      bgHover: "group-hover:bg-[#FBBC05]",
      iconColor: "text-[#FBBC05]",
      hex: "#FBBC05",
    },
    {
      num: "04",
      title: "Global Deployment",
      desc: "Rigorous testing and seamless deployment to elite server infrastructures for worldwide accessibility and uninterrupted scale.",
      icon: Rocket,
      colorClass:
        "hover:border-[#EA4335] hover:shadow-[0_10px_40px_-10px_rgba(234,67,53,0.15)]",
      textHover: "group-hover:text-[#EA4335]",
      bgHover: "group-hover:bg-[#EA4335]",
      iconColor: "text-[#EA4335]",
      hex: "#EA4335",
    },
  ];

  return (
    <section
      className="w-full py-16 sm:py-24 lg:py-32 bg-white font-jakarta border-t border-gray-100 overflow-hidden"
      id="process"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Global Gradient Definition for Icons if needed */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient
            id="process-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop stopColor="#4285F4" offset="0%" />
            <stop stopColor="#34A853" offset="33%" />
            <stop stopColor="#FBBC05" offset="66%" />
            <stop stopColor="#EA4335" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-10 lg:px-12">
        {/* Header Section */}
        <div className="mb-12 sm:mb-20 flex flex-col items-start max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 shadow-sm mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#6a7282]" />
            <h2 className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] m-0">
              My Methodology
            </h2>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-[3.2rem] font-medium text-black tracking-tight leading-[1.1] m-0 mb-4 sm:mb-6">
            How I build perfection.
          </h2>

          <p className="text-[#4B5563] font-medium text-[14.5px] sm:text-[16px] leading-relaxed m-0 max-w-2xl">
            A streamlined, brutally efficient approach to building digital
            products. No fluff, just scalable architecture and precise execution
            from concept to deployment.
          </p>
        </div>

        {/* Desktop Connected Grid Layout */}
        <div className="relative">
          {/* Background Connecting Line (Visible only on Desktop) */}
          <div className="hidden lg:block absolute top-[28px] left-0 w-full h-[2px] bg-gray-100 -z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`group relative flex flex-col bg-white border border-gray-200 rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 cursor-default ${step.colorClass}`}
                >
                  {/* Top Line Indicator that fills on hover (Desktop Only) */}
                  <div className="hidden lg:block absolute -top-[1px] left-8 right-8 h-[2px] bg-transparent overflow-hidden">
                    <div
                      className={`w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out ${step.bgHover}`}
                    />
                  </div>

                  {/* Big Number & Icon Header */}
                  <div className="flex items-center justify-between mb-8 sm:mb-10">
                    <h2 className="text-[3rem] sm:text-[4rem] font-bold text-gray-100 group-hover:text-gray-100 transition-colors duration-300 m-0 select-none leading-none tracking-tighter">
                      {step.num}
                    </h2>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 relative overflow-hidden shrink-0">
                      {/* Subtle hover background matching step color */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${step.bgHover}`}
                      />
                      <Icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-colors duration-300 ${step.iconColor}`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Typography Content */}
                  <div className="flex flex-col flex-grow">
                    <h2
                      className={`text-[18px] sm:text-[20px] font-semibold text-black mb-2 sm:mb-3 m-0 transition-colors duration-300 ${step.textHover}`}
                    >
                      {step.title}
                    </h2>
                    <p className="text-[13.5px] sm:text-[14.5px] text-gray-500 font-medium leading-relaxed m-0">
                      {step.desc}
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
