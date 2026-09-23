import React from "react";
import {
  Layers,
  Server,
  Store,
  MonitorSmartphone,
  Clock,
  CreditCard,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Capabilities() {
  const services = [
    {
      title: "MERN Stack Architecture",
      description:
        "Highly optimised, scalable full-stack applications built for enterprise-level performance.",
      icon: Layers,
      accent: "text-blue-500",
      bg: "bg-blue-500/10",
      price: "From $1,200",
      timeline: "3-5 Weeks",
      features: [
        "React & Node.js Backend",
        "Zero-latency Database",
        "API Integration",
      ],
    },
    {
      title: "PHP & Laravel Systems",
      description:
        "Robust and secure backend systems customised for complex business logic and data security.",
      icon: Server,
      accent: "text-indigo-500",
      bg: "bg-indigo-500/10",
      price: "From $1,500",
      timeline: "4-6 Weeks",
      features: [
        "Custom CMS Development",
        "High-Security Protocols",
        "Legacy Migration",
      ],
    },
    {
      title: "Headless E-Commerce",
      description:
        "Specialised Shopify and WooCommerce storefronts engineered for maximum global conversion.",
      icon: Store,
      accent: "text-cyan-500",
      bg: "bg-cyan-500/10",
      price: "From $2,000",
      timeline: "4-8 Weeks",
      features: [
        "Next.js Storefront",
        "Sub-second Load Times",
        "Custom Cart Flows",
      ],
    },
    {
      title: "Bespoke Web Platforms",
      description:
        "Custom digital platforms and highly specialised Webflow sites tailored with pixel perfection.",
      icon: MonitorSmartphone,
      accent: "text-sky-500",
      bg: "bg-sky-500/10",
      price: "From $800",
      timeline: "2-4 Weeks",
      features: [
        "Figma to Code",
        "Responsive Architecture",
        "Advanced Animations",
      ],
    },
  ];

  return (
    <section
      className="w-full py-16 sm:py-24 lg:py-32 bg-[#030712] font-jakarta"
      id="services"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sharp Header */}
        <div className="flex flex-col items-start text-left max-w-2xl mb-12 sm:mb-20">
          <h2 className="text-[12px] sm:text-[13px] font-black text-blue-500 uppercase tracking-[0.25em] mb-4 m-0">
            Professional Services
          </h2>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05] m-0 mb-6">
            Engineered for <br className="hidden sm:block" />
            Digital Excellence.
          </h2>
          <h2 className="text-[15px] sm:text-lg text-slate-400 font-medium leading-relaxed m-0 pr-4 sm:pr-0">
            Transparent pricing, strict timelines, and highly customised digital
            solutions. We engineer platforms that dominate the modern web.
          </h2>
        </div>

        {/* Sharp Service Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col p-6 sm:p-8 lg:p-10 bg-[#070b14] border border-white/5 rounded-2xl hover:border-white/15 hover:bg-[#0a0f1c] transition-colors duration-200 cursor-default"
              >
                {/* Icon & Title Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 mb-6 sm:mb-8">
                  <div
                    className={`w-14 h-14 rounded-xl ${item.bg} border border-white/5 flex items-center justify-center shrink-0`}
                  >
                    <Icon
                      className={`w-6 h-6 ${item.accent}`}
                      strokeWidth={2.5}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-black text-white m-0 tracking-tight mb-2 group-hover:text-blue-100 transition-colors">
                      {item.title}
                    </h2>
                    <h2 className="text-[14px] sm:text-[15px] text-slate-400 leading-relaxed font-medium m-0 max-w-md">
                      {item.description}
                    </h2>
                  </div>
                </div>

                {/* Features List (No Lines, Pure Spacing) */}
                <div className="flex flex-col gap-3 mb-8 sm:mb-10 pl-2 sm:pl-20">
                  {item.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                      <h2 className="text-[14px] font-bold text-slate-300 m-0 tracking-wide">
                        {feature}
                      </h2>
                    </div>
                  ))}
                </div>

                {/* Price & Timeline Metadata Tags (Replaces Lines) */}
                <div className="mt-auto flex flex-wrap items-center gap-3 sm:gap-4 pl-0 sm:pl-20">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <h2 className="text-[13px] font-black text-blue-100 uppercase tracking-widest m-0">
                      {item.price}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <h2 className="text-[13px] font-black text-slate-300 uppercase tracking-widest m-0">
                      {item.timeline}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Delivery CTA Banner */}
        <div className="mt-4 sm:mt-6 w-full rounded-2xl bg-blue-600 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 active:scale-[0.98] md:active:scale-100 transition-transform duration-200">
          <div className="flex flex-col">
            <h2 className="text-xl sm:text-2xl font-black text-white m-0 mb-2 tracking-tight">
              Ready to engineer your next big project?
            </h2>
            <h2 className="text-[14px] sm:text-[15px] text-blue-100 font-medium m-0 max-w-xl">
              All projects include a dedicated project manager, continuous
              communication, and post-launch technical support.
            </h2>
          </div>
          <a
            href="#contact"
            className="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-xl bg-white text-blue-900 hover:bg-slate-100 active:bg-slate-200 transition-colors duration-200 outline-none group/btn"
          >
            <h2 className="text-[15px] font-black m-0 text-inherit tracking-wide">
              Request a Custom Quote
            </h2>
            <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
