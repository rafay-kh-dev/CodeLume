import React from "react";
import {
  Layers,
  Server,
  MonitorSmartphone,
  Store,
  ArrowRight,
  Globe2,
} from "lucide-react";

export default function Capabilities() {
  const capabilities = [
    {
      title: "MERN Stack Architecture",
      description:
        "We engineer highly optimised, scalable full-stack applications utilising MongoDB, Express, React, and Node.js for enterprise-level performance.",
      icon: Layers,
      colSpan: "md:col-span-2 lg:col-span-2",
      gradient: "from-blue-600/15 via-blue-900/5 to-transparent",
      iconColor: "text-blue-400",
      glowColor: "shadow-blue-500/20",
    },
    {
      title: "PHP & Laravel",
      description:
        "Robust and secure backend systems customised for complex business logic and flawless API integrations.",
      icon: Server,
      colSpan: "md:col-span-1 lg:col-span-1",
      gradient: "from-indigo-600/15 via-indigo-900/5 to-transparent",
      iconColor: "text-indigo-400",
      glowColor: "shadow-indigo-500/20",
    },
    {
      title: "E-Commerce Solutions",
      description:
        "Specialised WordPress, WooCommerce, and Shopify storefronts engineered for maximum conversion, speed, and reliability.",
      icon: Store,
      colSpan: "md:col-span-1 lg:col-span-1",
      gradient: "from-cyan-600/15 via-cyan-900/5 to-transparent",
      iconColor: "text-cyan-400",
      glowColor: "shadow-cyan-500/20",
    },
    {
      title: "Custom Platforms",
      description:
        "Bespoke digital platforms and highly specialised Webflow sites tailored precisely to your operational requirements with absolute pixel perfection.",
      icon: MonitorSmartphone,
      colSpan: "md:col-span-2 lg:col-span-2",
      gradient: "from-sky-600/15 via-sky-900/5 to-transparent",
      iconColor: "text-sky-400",
      glowColor: "shadow-sky-500/20",
    },
  ];

  return (
    <section
      id="capabilities"
      className="relative w-full py-20 sm:py-32 bg-[#030712] overflow-hidden flex flex-col items-center"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}
      </style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] sm:h-[500px] bg-blue-600/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none mix-blend-screen transform-gpu translate-z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-indigo-600/5 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none mix-blend-screen transform-gpu translate-z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-start text-left max-w-3xl mb-16 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 sm:mb-8 leading-[1.1] sm:leading-[1.05] drop-shadow-lg m-0">
            Engineered for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
              Digital Excellence.
            </span>
          </h2>
          <h2 className="text-base sm:text-lg md:text-xl text-slate-400/90 font-medium leading-relaxed max-w-2xl m-0">
            We deliver highly specialised and fully customised digital
            solutions, ensuring your infrastructure is securely optimised for
            the modern web.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[280px] sm:auto-rows-[320px]">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group relative rounded-3xl sm:rounded-[2rem] bg-[#0a0f1c]/50 backdrop-blur-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out hover:-translate-y-1 sm:hover:-translate-y-2 active:scale-[0.98] sm:active:scale-100 overflow-hidden flex flex-col justify-between cursor-pointer outline-none transform-gpu will-change-transform ${item.colSpan}`}
              >
                <div className="absolute inset-0 rounded-3xl sm:rounded-[2rem] shadow-[inset_0_0_30px_rgba(255,255,255,0.02)] pointer-events-none" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none transform-gpu`}
                />
                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#050810]/80 shadow-[inset_0_0_20px_rgba(255,255,255,0.03)] flex items-center justify-center backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:${item.glowColor} group-hover:shadow-lg transform-gpu`}
                  >
                    <Icon
                      className={`w-7 h-7 sm:w-8 sm:h-8 ${item.iconColor}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-100 sm:opacity-0 sm:-translate-x-4 transition-all duration-500 ease-out sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transform-gpu">
                    <ArrowRight className="w-4 h-4 text-slate-300 sm:text-white" />
                  </div>
                </div>
                <div className="relative z-10 mt-auto pt-6 sm:pt-8">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-3 sm:mb-4 group-hover:text-white transition-colors duration-300 tracking-tight m-0">
                    {item.title}
                  </h2>
                  <h2 className="text-[14px] sm:text-[16px] text-slate-400/90 leading-relaxed font-medium m-0 transition-colors duration-300 group-hover:text-slate-300">
                    {item.description}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 sm:mt-6 w-full rounded-3xl sm:rounded-[2rem] bg-[#0a0f1c]/40 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.02)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group active:scale-[0.98] sm:active:scale-100 transition-transform duration-300 transform-gpu">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform-gpu" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
              <Globe2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white m-0">
                Global Deployment Ready
              </h2>
              <h2 className="text-xs sm:text-sm text-slate-400 font-medium m-0 mt-1 sm:mt-1.5">
                Our architectures are strictly optimised for worldwide scale.
              </h2>
            </div>
          </div>
          <a
            href="#contact"
            className="relative z-10 flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 sm:py-4 rounded-xl bg-white text-slate-950 hover:bg-slate-200 transition-colors duration-300 outline-none group/btn shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
          >
            <h2 className="text-[14px] sm:text-[15px] font-bold m-0 text-inherit">
              Initiate Strategy
            </h2>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 transform-gpu" />
          </a>
        </div>
      </div>
    </section>
  );
}
