import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles,
  Layers,
  Server,
  AppWindow,
  MonitorSmartphone,
  Store,
  ShoppingBag,
  Palette,
  Webhook
} from "lucide-react";

export default function Services() {
  // Updated Services with Starting Prices for attraction
  const services = [
    {
      id: 1,
      title: "MERN Stack",
      description: "Full-stack JavaScript solutions using MongoDB, Express, React, & Node.js.",
      icon: <Layers className="w-6 h-6 text-blue-400" />,
      bg: "bg-blue-400/10",
      hoverBorder: "group-hover:border-blue-500/50",
      price: "$499",
      link: "/services/mern-stack"
    },
    {
      id: 2,
      title: "PHP & Laravel",
      description: "Robust, secure, and highly scalable backend architectures.",
      icon: <Server className="w-6 h-6 text-rose-400" />,
      bg: "bg-rose-400/10",
      hoverBorder: "group-hover:border-rose-500/50",
      price: "$399",
      link: "/services/php-laravel"
    },
    {
      id: 3,
      title: "Angular Web Apps",
      description: "Enterprise-grade frontend frameworks for complex web applications.",
      icon: <AppWindow className="w-6 h-6 text-red-400" />,
      bg: "bg-red-400/10",
      hoverBorder: "group-hover:border-red-500/50",
      price: "$449",
      link: "/services/angular-apps"
    },
    {
      id: 4,
      title: "Custom Platforms",
      description: "Bespoke digital solutions tailored exactly to your business logic.",
      icon: <MonitorSmartphone className="w-6 h-6 text-indigo-400" />,
      bg: "bg-indigo-400/10",
      hoverBorder: "group-hover:border-indigo-500/50",
      price: "$599",
      link: "/services/custom-platforms"
    },
    {
      id: 5,
      title: "WordPress Sites",
      description: "Custom themes, plugins, and powerful e-commerce experiences.",
      icon: <Store className="w-6 h-6 text-cyan-400" />,
      bg: "bg-cyan-400/10",
      hoverBorder: "group-hover:border-cyan-500/50",
      price: "$199",
      link: "/services/wordpress"
    },
    {
      id: 6,
      title: "Shopify Development",
      description: "High-converting storefronts and highly customised Shopify apps.",
      icon: <ShoppingBag className="w-6 h-6 text-emerald-400" />,
      bg: "bg-emerald-400/10",
      hoverBorder: "group-hover:border-emerald-500/50",
      price: "$299",
      link: "/services/shopify"
    },
    {
      id: 7,
      title: "Webflow Sites",
      description: "Pixel-perfect, lightning-fast, and visually stunning responsive sites.",
      icon: <Palette className="w-6 h-6 text-purple-400" />,
      bg: "bg-purple-400/10",
      hoverBorder: "group-hover:border-purple-500/50",
      price: "$249",
      link: "/services/webflow"
    },
    {
      id: 8,
      title: "API & Integrations",
      description: "Connecting your web apps with third-party services seamlessly.",
      icon: <Webhook className="w-6 h-6 text-orange-400" />,
      bg: "bg-orange-400/10",
      hoverBorder: "group-hover:border-orange-500/50",
      price: "$149",
      link: "/services/api-integrations"
    }
  ];

  return (
    <div className="min-h-dvh bg-[#030712] text-white font-jakarta pt-28 sm:pt-36 pb-20 overflow-hidden relative">
      
      {/* Background Glowing Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#3b82f6]" />
            <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0">
              My Expertise
            </h2>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] m-0 drop-shadow-lg mb-6">
            Bespoke digital solutions <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3b82f6] via-indigo-400 to-cyan-400">
              to scale your business.
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            As an independent professional, I provide end-to-end digital services. From writing clean code to crafting beautiful designs, find a package that fits your needs perfectly.
          </p>
        </div>

        {/* 8-Card Grid with Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service) => (
            <Link 
              key={service.id} 
              to={service.link} // Yeh future package pages par le jayega
              className={`flex flex-col bg-[#0a0f1c] border border-white/5 rounded-3xl p-6 group transition-all duration-500 hover:-translate-y-2 hover:bg-[#0f1629] hover:shadow-2xl ${service.hoverBorder}`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 shrink-0 rounded-2xl ${service.bg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 mb-6`}>
                {service.icon}
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col flex-grow mb-8">
                <h2 className="text-xl font-bold text-white mb-3 m-0 group-hover:text-[#3b82f6] transition-colors">
                  {service.title}
                </h2>
                <p className="text-slate-400 leading-relaxed text-[14px] m-0">
                  {service.description}
                </p>
              </div>

              {/* Price & Action Button */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">
                    Starting From
                  </span>
                  <span className="text-2xl font-black text-white m-0 tracking-tight">
                    {service.price}
                  </span>
                </div>
                
                {/* Small Action Button */}
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