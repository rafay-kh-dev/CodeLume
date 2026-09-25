import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
// Naye premium SVG Icons
import { 
  React as ReactIcon, 
  Laravel, 
  Angular, 
  Wordpress, 
  Shopify, 
  Webflow, 
  GcpCloudMonitoring,
  GcpApiMonetization,
  Flutter,
  Figma,
  Adobe
} from "@thesvg/react";

export default function Service() {
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
      title: "PHP & Laravel",
      description: "Robust, secure, and highly scalable backend architectures.",
      badge: "Most Demanding",
      badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/30",
      icon: <Laravel className="w-7 h-7" />,
      bg: "bg-rose-500/10",
      hoverBorder: "group-hover:border-rose-500/50",
      price: "$139",
      link: "/services/php-laravel"
    },
    {
      id: 3,
      title: "Angular Web Apps",
      description: "Enterprise-grade frontend frameworks for complex web applications.",
      badge: "Enterprise",
      badgeColor: "text-red-400 bg-red-500/10 border-red-500/30",
      icon: <Angular className="w-7 h-7" />,
      bg: "bg-red-500/10",
      hoverBorder: "group-hover:border-red-500/50",
      price: "$135",
      link: "/services/angular-apps"
    },
    {
      id: 4,
      title: "Custom Platforms",
      description: "Bespoke digital solutions tailored exactly to your business logic.",
      badge: "Top Rated",
      badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
      icon: <GcpCloudMonitoring className="w-7 h-7" />,
      bg: "bg-indigo-500/10",
      hoverBorder: "group-hover:border-indigo-500/50",
      price: "$299",
      link: "/services/custom-platforms"
    },
    {
      id: 5,
      title: "WordPress Sites",
      description: "Custom themes, plugins, and powerful e-commerce experiences.",
      badge: "Most Popular",
      badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
      icon: <Wordpress className="w-7 h-7" />,
      bg: "bg-cyan-500/10",
      hoverBorder: "group-hover:border-cyan-500/50",
      price: "$100",
      link: "/services/wordpress"
    },
    {
      id: 6,
      title: "Shopify Development",
      description: "High-converting storefronts and highly customised Shopify apps.",
      badge: "High Converting",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      icon: <Shopify className="w-7 h-7" />,
      bg: "bg-emerald-500/10",
      hoverBorder: "group-hover:border-emerald-500/50",
      price: "$115",
      link: "/services/shopify"
    },
    {
      id: 7,
      title: "Webflow Sites",
      description: "Pixel-perfect, lightning-fast, and visually stunning responsive sites.",
      badge: "Trending",
      badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
      icon: <Webflow className="w-7 h-7" />,
      bg: "bg-purple-500/10",
      hoverBorder: "group-hover:border-purple-500/50",
      price: "$149",
      link: "/services/webflow"
    },
    {
      id: 8,
      title: "API & Integrations",
      description: "Connecting your web apps with third-party services seamlessly.",
      badge: "High Speed",
      badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/30",
      icon: <GcpApiMonetization className="w-7 h-7" />,
      bg: "bg-orange-500/10",
      hoverBorder: "group-hover:border-orange-500/50",
      price: "$99",
      link: "/services/api-integrations"
    },
    {
      id: 9,
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
      id: 10,
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
      id: 11,
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
              My Expertise
            </h2>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] m-0 drop-shadow-lg mb-6">
            Bespoke digital solutions <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3b82f6] via-indigo-400 to-cyan-400">
              to scale your business.
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            As an independent professional, I provide end-to-end digital services. From writing clean code to crafting beautiful designs, find a package that fits your needs perfectly.
          </p>
        </div>

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
      </div>
    </section>
  );
}