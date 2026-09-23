import React from "react";
import { Code2, ArrowRight, Sparkles, Terminal } from "lucide-react";
import {
  Telegram,
  Whatsapp,
  MicrosoftTeams,
  MicrosoftOutlook,
  Facebook,
} from "@thesvg/react";

export default function Footer() {
  const services = [
    "MERN Stack Architecture",
    "PHP & Laravel Systems",
    "Custom Web Platforms",
    "Headless Shopify",
    "WordPress & WooCommerce",
  ];

  const tools = [
    { name: "Lighthouse Auditor", status: "Coming Soon" },
    { name: "CSS Glass Generator", status: "Coming Soon" },
    { name: "Meta Tag Extractor", status: "Coming Soon" },
    { name: "Regex Visualiser", status: "Coming Soon" },
  ];

  const resources = [
    { name: "Insights & Tech Blog", highlight: true },
    { name: "Client Case Studies" },
    { name: "Agency Architecture" },
    { name: "Consultation & Contact" },
  ];

  const contacts = [
    {
      name: "Facebook",
      icon: Facebook,
      link: "https://www.facebook.com/codelume",
      // Official Facebook brand color (#1877F2) integration
      glowColor:
        "group-hover:text-[#1877F2] shadow-[inset_0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[inset_0_0_20px_rgba(24,119,242,0.15),0_10px_20px_rgba(24,119,242,0.3)]",
    },
    {
      name: "Telegram",
      icon: Telegram,
      link: "https://t.me/RafayKH",
      glowColor:
        "group-hover:text-[#0088cc] shadow-[inset_0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[inset_0_0_20px_rgba(0,136,204,0.15),0_10px_20px_rgba(0,136,204,0.3)]",
    },
    {
      name: "WhatsApp",
      icon: Whatsapp,
      link: "https://wa.me/923347835980",
      glowColor:
        "group-hover:text-[#25D366] shadow-[inset_0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[inset_0_0_20px_rgba(37,211,102,0.15),0_10px_20px_rgba(37,211,102,0.3)]",
    },
    {
      name: "MS Teams",
      icon: MicrosoftTeams,
      link: "https://teams.microsoft.com/l/chat/0/0?users=mrafaykh@outlook.com",
      glowColor:
        "group-hover:text-[#6264A7] shadow-[inset_0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[inset_0_0_20px_rgba(98,100,167,0.15),0_10px_20px_rgba(98,100,167,0.3)]",
    },
    {
      name: "Outlook",
      icon: MicrosoftOutlook,
      link: "mailto:mrafaykh@outlook.com",
      glowColor:
        "group-hover:text-[#0078D4] shadow-[inset_0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[inset_0_0_20px_rgba(0,120,212,0.15),0_10px_20px_rgba(0,120,212,0.3)]",
    },
  ];

  return (
    <footer className="relative w-full bg-[#030712] py-16 lg:py-24 font-jakarta overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* 🚀 FIXED: Hardware-accelerated radial gradients to eliminate lag */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.1)_0%,transparent_60%)] pointer-events-none transform-gpu translate-z-0" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.05)_0%,transparent_60%)] pointer-events-none transform-gpu translate-z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#0a0f1c]/80 backdrop-blur-xl p-10 sm:p-16 lg:p-20 shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(255,255,255,0.02)] mb-16 lg:mb-20 flex flex-col lg:flex-row items-center justify-between gap-10 transform-gpu overflow-hidden relative group">
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 via-transparent to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform-gpu" />
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/3 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0 drop-shadow-md">
                Initialise Project
              </h2>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] m-0 drop-shadow-lg">
              Ready to build something <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                extraordinary?
              </span>
            </h2>
          </div>
          <a
            href="start-project"
            className="relative z-10 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white text-[#030712] hover:bg-slate-200 transition-all duration-300 active:scale-[0.98] outline-none group/btn shadow-[0_15px_30px_rgba(255,255,255,0.1)] transform-gpu"
          >
            <h2 className="text-[16px] font-extrabold m-0 text-inherit tracking-wide">
              Start a Conversation
            </h2>
            <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-4 flex flex-col items-start">
            <a
              href="/"
              className="flex items-center gap-3 group outline-none mb-6"
            >
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#0a0f1c] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                <Code2
                  className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform duration-300 transform-gpu"
                  strokeWidth={2.5}
                />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white m-0">
                CodeLume<span className="text-blue-500">.</span>
              </h2>
            </a>
            <h2 className="text-[15px] text-slate-400 font-medium leading-relaxed max-w-sm m-0 mb-8">
              We engineer highly specialised, lightning-fast digital experiences
              and robust server architectures tailored for modern enterprises.
            </h2>
            <div className="flex items-center gap-4 flex-wrap">
              {contacts.map((contact, idx) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={idx}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={contact.name}
                    className={`w-11 h-11 rounded-full bg-[#0a0f1c] flex items-center justify-center group outline-none transition-all duration-300 hover:-translate-y-1 transform-gpu ${contact.glowColor}`}
                  >
                    <Icon className="w-5 h-5 text-slate-400 transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col">
            <h2 className="text-[13px] font-extrabold text-white uppercase tracking-[0.15em] mb-6 m-0">
              Capabilities
            </h2>
            <div className="flex flex-col gap-4">
              {services.map((service, idx) => (
                <a
                  key={idx}
                  href="#service"
                  className="group outline-none w-fit"
                >
                  <h2 className="text-[15px] font-medium text-slate-400 group-hover:text-white transition-all duration-300 transform-gpu group-hover:translate-x-1 m-0">
                    {service}
                  </h2>
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="w-4 h-4 text-blue-500" />
              <h2 className="text-[13px] font-extrabold text-white uppercase tracking-[0.15em] m-0">
                Dev Tools
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 group cursor-default"
                >
                  <h2 className="text-[15px] font-medium text-slate-500 transition-colors duration-300 m-0">
                    {tool.name}
                  </h2>
                  <div className="px-2 py-1 rounded-md bg-blue-500/10 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)] flex items-center justify-center">
                    <h2 className="text-[9px] font-extrabold text-blue-400 uppercase tracking-wider m-0 leading-none">
                      {tool.status}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col">
            <h2 className="text-[13px] font-extrabold text-white uppercase tracking-[0.15em] mb-6 m-0">
              Company
            </h2>
            <div className="flex flex-col gap-4">
              {resources.map((item, idx) => (
                <a
                  key={idx}
                  href="#resource"
                  className="group outline-none w-fit flex items-center gap-2"
                >
                  <h2
                    className={`text-[15px] font-medium transition-all duration-300 transform-gpu group-hover:translate-x-1 m-0 ${
                      item.highlight
                        ? "text-blue-400 group-hover:text-blue-300"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  >
                    {item.name}
                  </h2>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full pt-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] relative z-10">
          <h2 className="text-[13px] font-medium text-slate-500 m-0">
            © 2026 CodeLume. All rights reserved.
          </h2>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="outline-none group">
              <h2 className="text-[13px] font-medium text-slate-500 group-hover:text-slate-300 transition-colors m-0">
                Privacy Policy
              </h2>
            </a>
            <a href="#terms" className="outline-none group">
              <h2 className="text-[13px] font-medium text-slate-500 group-hover:text-slate-300 transition-colors m-0">
                Terms of Service
              </h2>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
