import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
// Sirf in 4 services ke official premium icons import kiye hain
import { 
  React as ReactIcon, 
  Flutter,
  Figma,
  Adobe
} from "@thesvg/react";

export default function Service() {
  // Homepage ke liye Top 4 Best/Premium Services
  const services = [
    {
      id: 1,
      title: "MERN Stack",
      description: "Full-stack JavaScript solutions using MongoDB, Express, React, & Node.js.",
      badge: "Most Demanding",
      badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      icon: <ReactIcon className="w-7 h-7" />,
      bg: "bg-blue-500/10",
      hoverBorder: "group-hover:border-blue-500/50",
      price: "$149",
      link: "/services/mern-stack"
    },
    {
      id: 2,
      title: "Mobile Apps",
      description: "High-performance iOS and Android applications engineered for scale.",
      badge: "Native Build",
      badgeColor: "text-teal-400 bg-teal-500/10 border-teal-500/30",
      icon: <Flutter className="w-7 h-7 text-teal-400" />,
      bg: "bg-teal-500/10",
      hoverBorder: "group-hover:border-teal-500/50",
      price: "$399",
      link: "/services/mobile-apps"
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "User-centric interfaces crafted in Figma for maximum conversion.",
      badge: "Creative",
      badgeColor: "text-pink-400 bg-pink-500/10 border-pink-500/30",
      icon: <Figma className="w-7 h-7 text-pink-400" />,
      bg: "bg-pink-500/10",
      hoverBorder: "group-hover:border-pink-500/50",
      price: "$199",
      link: "/services/ui-ux-design"
    },
    {
      id: 4,
      title: "Full Branding",
      description: "From 0 to 100. Complete brand identity, web engineering, and marketing.",
      badge: "Agency Premium",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      icon: <Adobe className="w-7 h-7 text-amber-400" />,
      bg: "bg-amber-500/10",
      hoverBorder: "group-hover:border-amber-500/50",
      price: "$1,499",
      link: "/services/full-branding"
    }
  ];

  return (
    <section className="bg-[#030712] text-white font-jakarta py-24 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#3b82f6]" />
            <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0">
              Featured Expertise
            </h2>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] m-0 drop-shadow-lg mb-6">
            Bespoke digital solutions <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3b82f6] via-indigo-400 to-cyan-400">
              to scale your business.
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            As an independent professional, I provide end-to-end digital services. From writing clean code to crafting beautiful designs, here are my top-tier offerings.
          </p>
        </div>

        {/* Top 4 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service) => (
            <Link 
              key={service.id} 
              to={service.link}
              className={`flex flex-col bg-[#0a0f1c] border border-white/5 rounded-3xl p-6 group transition-all duration-500 hover:-translate-y-2 hover:bg-[#0f1629] hover:shadow-2xl relative ${service.hoverBorder}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 shrink-0 rounded-2xl ${service.bg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                  {service.icon}
                </div>
                
                {service.badge && (
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-xs ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                )}
              </div>
              
              <div className="flex flex-col flex-grow mb-8">
                <h2 className="text-xl font-bold text-white mb-3 m-0 group-hover:text-[#3b82f6] transition-colors">
                  {service.title}
                </h2>
                <p className="text-slate-400 leading-relaxed text-[14px] m-0">
                  {service.description}
                </p>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">
                    Starting From
                  </span>
                  <span className="text-2xl font-black text-white m-0 tracking-tight">
                    {service.price}
                  </span>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#3b82f6] group-hover:border-[#3b82f6] transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg"
          >
            Explore All 11 Services
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}