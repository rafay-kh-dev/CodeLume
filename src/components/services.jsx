import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "MERN Stack",
      description: "Full-stack JavaScript solutions using MongoDB, Express, React, & Node.js.",
      badge: "Most Demanding",
      badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      // React Official SVG Icon
      icon: (
        <svg className="w-7 h-7 text-[#61DAFB] fill-current" viewBox="-11.5 -10.23174 23 20.46348">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      ),
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
      // Laravel Official SVG Icon
      icon: (
        <svg className="w-7 h-7 fill-current text-[#FF2D20]" viewBox="0 0 24 24">
          <path d="M12 21.35l-9-5.2V5.85l9 5.2 9-5.2v10.3l-9 5.2zM3 4.5l9-5.2 9 5.2-9 5.2-9-5.2z"/>
        </svg>
      ),
      bg: "bg-rose-500/10",
      hoverBorder: "group-hover:border-rose-500/50",
      price: "$120",
      link: "/services/php-laravel"
    },
    {
      id: 3,
      title: "Angular Web Apps",
      description: "Enterprise-grade frontend frameworks for complex web applications.",
      badge: "Enterprise",
      badgeColor: "text-red-400 bg-red-500/10 border-red-500/30",
      // Angular Official SVG Icon
      icon: (
        <svg className="w-7 h-7 fill-current text-[#DD0031]" viewBox="0 0 250 250">
          <polygon points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 203.9,186.3 218.1,63.2"/>
          <polygon points="125,30 125,52.2 125,52.1 175.6,165.1 153.5,165.1 141.2,134.8 108.8,134.8 96.5,165.1 74.4,165.1"/>
          <polygon points="125,94.8 115.1,119.2 134.9,119.2"/>
        </svg>
      ),
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
      // Full Stack Code Architecture Icon
      icon: (
        <svg className="w-7 h-7 text-indigo-400 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      bg: "bg-indigo-500/10",
      hoverBorder: "group-hover:border-indigo-500/50",
      price: "$150",
      link: "/services/custom-platforms"
    },
    {
      id: 5,
      title: "WordPress Sites",
      description: "Custom themes, plugins, and powerful e-commerce experiences.",
      badge: "Most Popular",
      badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
      // WordPress Official SVG Icon
      icon: (
        <svg className="w-7 h-7 fill-current text-[#21759B]" viewBox="0 0 24 24">
          <path d="M12.158 0C5.457 0 0 5.457 0 12.158c0 6.701 5.457 12.158 12.158 12.158 6.701 0 12.158-5.457 12.158-12.158C24.316 5.457 18.859 0 12.158 0zm0 22.585c-5.748 0-10.427-4.679-10.427-10.427 0-2.289.742-4.408 2.001-6.136l5.058 13.856c-.035.124-.055.253-.055.388 0 .762.618 1.38 1.38 1.38.307 0 .589-.101.817-.272l1.226-3.363 1.226 3.363c.228.171.51.272.817.272.762 0 1.38-.618 1.38-1.38 0-.135-.02-.264-.055-.388l5.058-13.856c1.259 1.728 2.001 3.847 2.001 6.136 0 5.748-4.679 10.427-10.427 10.427z"/>
        </svg>
      ),
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
      // Shopify Official SVG Icon
      icon: (
        <svg className="w-7 h-7 fill-current text-[#95BF47]" viewBox="0 0 24 24">
          <path d="M19.333 5.333L15.333 1.333H8.667L4.667 5.333V18.667L8.667 22.667H15.333L19.333 18.667V5.333Z"/>
        </svg>
      ),
      bg: "bg-emerald-500/10",
      hoverBorder: "group-hover:border-emerald-500/50",
      price: "$125",
      link: "/services/shopify"
    },
    {
      id: 7,
      title: "Webflow Sites",
      description: "Pixel-perfect, lightning-fast, and visually stunning responsive sites.",
      badge: "Trending",
      badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
      // Webflow Official SVG Icon
      icon: (
        <svg className="w-7 h-7 fill-current text-[#4353FF]" viewBox="0 0 24 24">
          <path d="M18.805 0l-5.6 12.012L8.8 0H3.2l7.2 15.228L6.4 24h5.6l4.005-8.772L20.01 24H25.6l-6.795-15.228L24.8 0h-5.995z"/>
        </svg>
      ),
      bg: "bg-purple-500/10",
      hoverBorder: "group-hover:border-purple-500/50",
      price: "$115",
      link: "/services/webflow"
    },
    {
      id: 8,
      title: "API & Integrations",
      description: "Connecting your web apps with third-party services seamlessly.",
      badge: "High Speed",
      badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/30",
      // API / Webhook Integration Icon
      icon: (
        <svg className="w-7 h-7 text-orange-400 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round"/>
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round"/>
        </svg>
      ),
      bg: "bg-orange-500/10",
      hoverBorder: "group-hover:border-orange-500/50",
      price: "$110",
      link: "/services/api-integrations"
    }
  ];

  return (
    <div className="min-h-dvh bg-[#030712] text-white font-jakarta pt-28 sm:pt-36 pb-24 overflow-hidden relative">
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
              {/* Technology Icon & Badge Row */}
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
    </div>
  );
}