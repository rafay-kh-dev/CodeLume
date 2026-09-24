import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Webhook } from "lucide-react";
import { React as ReactIcon, Laravel, Shopify } from "@thesvg/react";

export default function Capabilities() {
  const services = [
    {
      title: "MERN Stack Solutions",
      description:
        "Full-stack JavaScript applications using MongoDB, Express, React, & Node.js.",
      badge: "Most Demanding",
      badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      hoverBorder: "group-hover:border-blue-500/50",
      accentColor: "text-blue-400",
      icon: <ReactIcon className="w-7 h-7" />,
      bg: "bg-blue-500/10",
      price: "$149",
      link: "/services/mern-stack",
      features: [
        "Single Page Applications (SPA)",
        "Zero-Latency Realtime Data",
        "Custom Admin Dashboards",
      ],
    },
    {
      title: "PHP & Laravel Systems",
      description:
        "Robust, secure, and highly scalable backend architectures.",
      badge: "Most Demanding",
      badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/30",
      hoverBorder: "group-hover:border-rose-500/50",
      accentColor: "text-rose-400",
      icon: <Laravel className="w-7 h-7" />,
      bg: "bg-rose-500/10",
      price: "$120",
      link: "/services/php-laravel",
      features: [
        "Bespoke MVC Architecture",
        "High-Security Data Protocols",
        "Legacy Database Migration",
      ],
    },
    {
      title: "Advanced E-Commerce",
      description:
        "High-converting storefronts and highly customised Shopify stores.",
      badge: "High Converting",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      hoverBorder: "group-hover:border-emerald-500/50",
      accentColor: "text-emerald-400",
      icon: <Shopify className="w-7 h-7" />,
      bg: "bg-emerald-500/10",
      price: "$125",
      link: "/services/shopify",
      features: [
        "Headless Next.js Storefronts",
        "Custom Plugin Development",
        "Frictionless Checkout Flows",
      ],
    },
    {
      title: "API & Integrations",
      description:
        "Connecting your web applications with third-party services seamlessly.",
      badge: "High Speed",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      hoverBorder: "group-hover:border-amber-500/50",
      accentColor: "text-amber-400",
      icon: <Webhook className="w-7 h-7 text-amber-400" />,
      bg: "bg-amber-500/10",
      price: "$110",
      link: "/services/api-integrations",
      features: [
        "REST & GraphQL Architectures",
        "Secure Payment Gateways",
        "CRM & ERP Synchronisation",
      ],
    },
  ];

  return (
    <section
      className="w-full py-16 sm:py-24 lg:py-32 bg-[#030712] font-jakarta relative overflow-hidden"
      id="services"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-20">
          <div className="flex flex-col items-start text-left max-w-2xl">
            <h2 className="text-[12px] sm:text-[13px] font-black text-blue-500 uppercase tracking-[0.25em] mb-4 m-0">
              Exclusive Services
            </h2>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05] m-0 mb-6">
              Engineered for <br className="hidden sm:block" />
              Digital Excellence.
            </h2>
            <h2 className="text-[15px] sm:text-lg text-slate-400 font-medium leading-relaxed m-0 pr-4 sm:pr-0">
              Transparent pricing, strict timelines, and highly customised
              architectures. We engineer platforms that dominate the modern web.
            </h2>
          </div>

          <Link
            to="/services"
            className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 outline-none w-full sm:w-fit shrink-0"
          >
            <h2 className="text-[14px] font-black m-0 text-inherit tracking-wide">
              View All Services
            </h2>
            <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>

        {/* 4 Cards matching exact Services Page Box Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className={`flex flex-col bg-[#0a0f1c] border border-white/5 rounded-3xl p-6 group transition-all duration-500 hover:-translate-y-2 hover:bg-[#0f1629] hover:shadow-2xl relative ${service.hoverBorder}`}
            >
              {/* Technology Icon & Badge Row */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-14 h-14 shrink-0 rounded-2xl ${service.bg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}
                >
                  {service.icon}
                </div>

                {service.badge && (
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-xs ${service.badgeColor}`}
                  >
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="flex flex-col mb-4">
                <h2 className="text-xl font-bold text-white mb-3 m-0 group-hover:text-[#3b82f6] transition-colors">
                  {service.title}
                </h2>
                <p className="text-slate-400 leading-relaxed text-[14px] m-0">
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <div className="flex flex-col gap-2.5 my-6">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle2
                      className={`w-4 h-4 ${service.accentColor} shrink-0`}
                    />
                    <span className="text-[13px] font-semibold text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Price & Action Button */}
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

        {/* Global Delivery CTA Banner */}
        <div className="mt-12 w-full rounded-2xl bg-blue-600 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 active:scale-[0.98] md:active:scale-100 transition-transform duration-200">
          <div className="flex flex-col">
            <h2 className="text-xl sm:text-2xl font-black text-white m-0 mb-2 tracking-tight">
              Ready to engineer your next big project?
            </h2>
            <h2 className="text-[14px] sm:text-[15px] text-blue-100 font-medium m-0 max-w-xl">
              All projects include a dedicated project manager, continuous
              communication, and post-launch technical support.
            </h2>
          </div>
          <Link
            to="/start-project"
            className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-xl bg-white text-blue-900 hover:bg-slate-100 active:bg-slate-200 transition-colors duration-200 outline-none group/btn shrink-0"
          >
            <h2 className="text-[15px] font-black m-0 text-inherit tracking-wide">
              Request a Custom Quote
            </h2>
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}