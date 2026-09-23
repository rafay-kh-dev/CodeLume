import React from "react";
import { Compass, PenTool, Cpu, Rocket } from "lucide-react";

export default function OurProcess() {
  const steps = [
    {
      num: "01",
      title: "Strategic Discovery",
      desc: "We deeply analyse your business objectives to map out a highly customised and scalable technical blueprint.",
      icon: Compass,
    },
    {
      num: "02",
      title: "UI/UX Architecture",
      desc: "Crafting bespoke, highly engaging interfaces focused on maximised conversion rates and flawless user journeys.",
      icon: PenTool,
    },
    {
      num: "03",
      title: "Core Engineering",
      desc: "Writing clean, highly optimised code utilising modern frameworks to ensure zero latency and maximum security.",
      icon: Cpu,
    },
    {
      num: "04",
      title: "Global Deployment",
      desc: "Rigorous testing and seamless deployment to elite server infrastructures for worldwide accessibility and scale.",
      icon: Rocket,
    },
  ];

  return (
    <section
      className="w-full py-20 lg:py-32 bg-[#030712] font-jakarta"
      id="process"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flat Minimalist Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-start">
          <h2 className="text-[13px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-4 m-0">
            Our Methodology
          </h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight m-0 mb-6">
            How we engineer perfection.
          </h2>
          <h2 className="text-base text-slate-400 max-w-2xl leading-relaxed m-0">
            A streamlined, brutally efficient approach to building digital
            products. No fluff, just scalable architecture and precise
            execution.
          </h2>
        </div>

        {/* 4-Column Flat Grid (No lines, no shadows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col group cursor-default">
                {/* Big Number & Flat Icon */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-6xl lg:text-7xl font-black text-[#0a0f1c] group-hover:text-blue-900/40 transition-colors duration-300 m-0 select-none">
                    {step.num}
                  </h2>
                  <div className="w-12 h-12 bg-[#0a0f1c] rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Typography Content */}
                <h2 className="text-2xl font-extrabold text-white mb-4 m-0 group-hover:text-blue-400 transition-colors duration-300">
                  {step.title}
                </h2>
                <h2 className="text-[15px] text-slate-400 leading-relaxed m-0">
                  {step.desc}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
