import React, { useState, useEffect } from "react";
import {
  Code2,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  MonitorSmartphone,
  Layers,
  Server,
  LayoutTemplate,
  Store,
  ShoppingBag,
  Palette,
  Webhook,
  ArrowRight,
} from "lucide-react";

const servicesData = [
  {
    title: "MERN Stack",
    description:
      "Full-stack JavaScript solutions using MongoDB, Express, React, & Node.",
    icon: Layers,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    hoverBg: "group-hover:bg-blue-500/20",
  },
  {
    title: "PHP & Laravel",
    description: "Robust, secure, and highly scalable backend architectures.",
    icon: Server,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    hoverBg: "group-hover:bg-red-500/20",
  },
  {
    title: "Angular Web Apps",
    description:
      "Enterprise-grade frontend frameworks for complex applications.",
    icon: LayoutTemplate,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    hoverBg: "group-hover:bg-rose-500/20",
  },
  {
    title: "Custom Platforms",
    description:
      "Bespoke digital solutions tailored exactly to your business logic.",
    icon: MonitorSmartphone,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    hoverBg: "group-hover:bg-indigo-500/20",
  },
  {
    title: "WordPress & WooCommerce",
    description:
      "Custom themes, plugins, and powerful e-commerce integrations.",
    icon: Store,
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    hoverBg: "group-hover:bg-sky-500/20",
  },
  {
    title: "Shopify Development",
    description:
      "High-converting storefronts and highly customised Shopify apps.",
    icon: ShoppingBag,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    hoverBg: "group-hover:bg-emerald-500/20",
  },
  {
    title: "Webflow Sites",
    description:
      "Pixel-perfect, lightning-fast, and visually stunning responsive websites.",
    icon: Palette,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    hoverBg: "group-hover:bg-purple-500/20",
  },
  {
    title: "API & Integrations",
    description:
      "Connecting your web apps with third-party services seamlessly.",
    icon: Webhook,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    hoverBg: "group-hover:bg-orange-500/20",
  },
];

const standardLinks = ["Case Studies", "About", "Insights"];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes shimmer { 0% { transform: translate3d(-150%,0,0); } 100% { transform: translate3d(150%,0,0); } }
        .animate-shimmer { animation: shimmer 2.5s infinite linear; will-change: transform; }
      `}</style>

      <div className="font-jakarta text-slate-200">
        <div className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none px-4 sm:px-6">
          <header
            className={`pointer-events-auto flex items-center justify-between w-full transition-all duration-500 ease-out transform-gpu will-change-[max-width,transform,background-color] ${
              isScrolled
                ? "max-w-5xl translate-y-4 rounded-full bg-[#030712]/80 backdrop-blur-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] py-3 px-5 sm:px-8"
                : "max-w-7xl translate-y-0 rounded-none bg-transparent shadow-none py-5 px-0"
            }`}
          >
            <a
              href="/"
              className="flex items-center gap-3 group outline-none z-50 relative shrink-0"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl">
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-md opacity-40 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-110 transform-gpu" />
                <div className="absolute inset-0 bg-[#0a0f1c] rounded-xl flex items-center justify-center transition-all duration-300 z-10 overflow-hidden shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Code2
                    className="w-5 h-5 text-blue-500 transition-transform duration-300 ease-out group-hover:scale-110 relative z-20 transform-gpu"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-extrabold tracking-tight text-white leading-none m-0">
                  CodeLume
                  <span className="text-blue-500 animate-[pulse_2s_ease-in-out_infinite]">
                    .
                  </span>
                </h2>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-2">
              <div
                className="relative group/nav h-full flex items-center"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-full outline-none hover:bg-white/5 transition-colors duration-300">
                  <h2 className="m-0 text-[14px] font-bold text-slate-300 group-hover/nav:text-white transition-colors flex items-center gap-1.5">
                    Services
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ease-out text-slate-500 group-hover/nav:text-blue-400 transform-gpu ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </h2>
                </button>

                <div
                  className={`absolute top-[calc(100%+1rem)] left-1/2 -translate-x-1/2 w-[680px] pt-0 transition-all duration-300 ease-out origin-top transform-gpu will-change-transform ${
                    servicesOpen
                      ? "opacity-100 translate-y-0 visible scale-100"
                      : "opacity-0 -translate-y-3 invisible scale-95"
                  }`}
                >
                  <div className="bg-[#050b14]/95 backdrop-blur-3xl rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,1),inset_0_0_20px_rgba(255,255,255,0.02)] p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none rounded-3xl" />
                    <div className="absolute -top-32 right-0 w-64 h-64 bg-indigo-600/15 rounded-full blur-[80px] pointer-events-none transform-gpu" />

                    <div className="grid grid-cols-2 gap-3 relative z-10">
                      {servicesData.map((service) => {
                        const Icon = service.icon;
                        return (
                          <a
                            key={service.title}
                            href={`#${service.title.toLowerCase().replace(/ /g, "-").replace(/&/g, "").replace(/\//g, "-")}`}
                            className="relative flex items-start gap-4 p-4 rounded-2xl group outline-none overflow-hidden transition-all duration-300 hover:bg-white/[0.03] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
                          >
                            <div
                              className={`relative z-10 shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${service.bgColor} ${service.hoverBg}`}
                            >
                              <Icon
                                className={`w-5 h-5 ${service.color} transition-transform duration-300 ease-out group-hover:scale-110 transform-gpu`}
                              />
                            </div>
                            <div className="relative z-10 flex flex-col pt-0.5">
                              <h2 className="text-[15px] font-extrabold text-slate-200 group-hover:text-white transition-colors flex items-center gap-1.5 m-0 leading-tight">
                                {service.title}
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 text-blue-400 transform-gpu" />
                              </h2>
                              <h2 className="text-[13px] font-medium text-slate-400 mt-1.5 leading-relaxed line-clamp-2 transition-colors group-hover:text-slate-300 m-0">
                                {service.description}
                              </h2>
                            </div>
                          </a>
                        );
                      })}
                    </div>

                    <div className="mt-4 bg-black/40 rounded-2xl p-5 flex items-center justify-between relative overflow-hidden shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
                      <h2 className="text-[14px] font-bold text-slate-300 m-0 relative z-10">
                        Need a specialised tech stack?
                      </h2>
                      <a
                        href="#contact"
                        className="text-[14px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 group/link transition-colors relative z-10 outline-none"
                      >
                        <h2 className="m-0 text-inherit text-[14px] font-bold flex items-center gap-1.5">
                          Consult with us{" "}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 transform-gpu" />
                        </h2>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {standardLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="px-4 py-2 rounded-full outline-none hover:bg-white/5 transition-colors duration-300"
                >
                  <h2 className="m-0 text-slate-300 hover:text-white text-[14px] font-bold transition-colors">
                    {item}
                  </h2>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4 relative z-50 shrink-0">
              <a
                href="#start-project"
                className="hidden md:flex relative group items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#0F172A] text-white overflow-hidden outline-none shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-0.5 transform-gpu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer pointer-events-none" />
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <h2 className="m-0 text-inherit text-[14px] font-extrabold tracking-wide">
                    Start a Project
                  </h2>
                </span>
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors duration-300 outline-none"
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <Menu
                    className={`absolute w-5 h-5 transition-all duration-300 ease-out transform-gpu ${mobileMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
                  />
                  <X
                    className={`absolute w-5 h-5 transition-all duration-300 ease-out transform-gpu ${mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}
                  />
                </div>
              </button>
            </div>
          </header>
        </div>

        <div
          className={`lg:hidden fixed inset-0 z-40 bg-[#030712]/95 backdrop-blur-3xl transition-all duration-500 ease-out flex flex-col justify-center transform-gpu will-change-[opacity] ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
          <div className="px-6 py-8 h-full flex flex-col pt-32 overflow-y-auto">
            <div className="mb-10">
              <h2 className="text-[11px] font-extrabold text-blue-500 uppercase tracking-[0.2em] mb-6 m-0 px-2 opacity-80">
                Web Capabilities
              </h2>
              <div className="grid gap-3">
                {servicesData.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <a
                      key={service.title}
                      href={`#${service.title.toLowerCase().replace(/ /g, "-").replace(/&/g, "").replace(/\//g, "-")}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 active:scale-[0.98] outline-none transform-gpu will-change-transform"
                      style={{
                        transitionDelay: mobileMenuOpen
                          ? `${idx * 40}ms`
                          : "0ms",
                        transform: mobileMenuOpen
                          ? "translateY(0)"
                          : "translateY(15px)",
                        opacity: mobileMenuOpen ? 1 : 0,
                      }}
                    >
                      <div
                        className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${service.bgColor}`}
                      >
                        <Icon className={`w-6 h-6 ${service.color}`} />
                      </div>
                      <div>
                        <h2 className="block text-[17px] font-extrabold text-white m-0 tracking-tight">
                          {service.title}
                        </h2>
                        <h2 className="block text-[13px] font-medium text-slate-400 mt-1 line-clamp-1 m-0">
                          {service.description}
                        </h2>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 mb-10 px-2">
              {standardLinks.map((item, idx) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 outline-none group transform-gpu will-change-transform"
                  style={{
                    transitionDelay: mobileMenuOpen
                      ? `${(idx + servicesData.length) * 40}ms`
                      : "0ms",
                    transform: mobileMenuOpen
                      ? "translateY(0)"
                      : "translateY(15px)",
                    opacity: mobileMenuOpen ? 1 : 0,
                    transition: "all 0.4s ease-out",
                  }}
                >
                  <h2 className="m-0 text-[28px] font-extrabold text-slate-300 group-hover:text-white transition-colors tracking-tight">
                    {item}
                  </h2>
                </a>
              ))}
            </div>

            <div
              className="mt-auto pb-10 transform-gpu will-change-transform"
              style={{
                transitionDelay: mobileMenuOpen ? "500ms" : "0ms",
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen
                  ? "translateY(0)"
                  : "translateY(15px)",
                transition: "all 0.4s ease-out",
              }}
            >
              <a
                href="#start-project"
                className="relative flex items-center justify-center gap-2 w-full px-6 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_15px_30px_rgba(37,99,235,0.3)] transition-all active:scale-[0.98] overflow-hidden outline-none transform-gpu"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer pointer-events-none" />
                <Sparkles className="w-5 h-5 text-blue-200 relative z-10" />
                <h2 className="m-0 text-inherit text-[18px] font-extrabold relative z-10 tracking-wide">
                  Start a Project
                </h2>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
