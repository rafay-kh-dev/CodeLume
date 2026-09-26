import React from "react";
import { Link } from "react-router-dom";
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
    { name: "MERN Stack", path: "/services/mern-stack" },
    { name: "Mobil Apps", path: "/services/mobile-apps" },
    { name: "UI/UX Design", path: "/services/uiux-design" },
    { name: "Full Branding", path: "/services/full-branding" },
  ];

  const tools = [
    {
      name: "SVG to React / JSX Converter",
      status: "Coming Soon",
    },
    {
      name: "JSON to TypeScript / Zod Schema Generator",
      status: "Coming Soon",
    },
    { name: "JWT (JSON Web Token) Decoder & Inspector", status: "Coming Soon" },
    { name: "Regex Visualiser", status: "Coming Soon" },
  ];

  const resources = [
    { name: "Read My Blogs", path: "/blogs", highlight: true },
    { name: "Case Studies", path: "/case-studies" },
    { name: "About CodeLume", path: "/about-codelume" },
    { name: "Start a Project", path: "/start-project" },
  ];

  const contacts = [
    {
      name: "Facebook",
      icon: Facebook,
      link: "https://www.facebook.com/codelume",
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
    <footer className="relative w-full bg-[#030712] pt-16 lg:pt-20 pb-0 font-jakarta overflow-hidden flex flex-col justify-between">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          
          @keyframes fluid-blue {
            0% { 
              background-position: 0% 50%; 
              text-shadow: 0 0 15px rgba(37,99,235,0.1);
            }
            50% { 
              background-position: 100% 50%; 
              text-shadow: 0 0 35px rgba(59,130,246,0.25);
            }
            100% { 
              background-position: 0% 50%; 
              text-shadow: 0 0 15px rgba(37,99,235,0.1);
            }
          }
          .animate-fluid-blue {
            background: linear-gradient(
              90deg, 
              rgba(30, 41, 59, 0.4) 0%, 
              rgba(29, 78, 216, 0.6) 25%, 
              rgba(59, 130, 246, 0.8) 50%, 
              rgba(29, 78, 216, 0.6) 75%, 
              rgba(30, 41, 59, 0.4) 100%
            );
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: fluid-blue 6s ease-in-out infinite;
          }
        `}
      </style>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.1)_0%,transparent_60%)] pointer-events-none transform-gpu translate-z-0" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.05)_0%,transparent_60%)] pointer-events-none transform-gpu translate-z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grow">
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
          <Link
            to="/start-project"
            className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 outline-none group/btn active:scale-[0.98] transform-gpu"
          >
            <h2 className="text-[16px] font-extrabold m-0 text-inherit tracking-wide">
              Start a Conversation
            </h2>
            <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link
              to="/"
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
            </Link>
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
              Popular Services
            </h2>
            <div className="flex flex-col gap-4">
              {services.map((service, idx) => (
                <Link
                  key={idx}
                  to={service.path}
                  className="group outline-none w-fit"
                >
                  <h2 className="text-[15px] font-medium text-slate-400 group-hover:text-white transition-all duration-300 transform-gpu group-hover:translate-x-1 m-0">
                    {service.name}
                  </h2>
                </Link>
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
                <Link
                  key={idx}
                  to={item.path}
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
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full py-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] relative z-10">
          <h2 className="text-[13px] font-medium text-slate-500 m-0">
            © 2026 CodeLume. All rights reserved.
          </h2>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="outline-none group">
              <h2 className="text-[13px] font-medium text-slate-500 group-hover:text-slate-300 transition-colors m-0">
                Privacy Policy
              </h2>
            </Link>
            <Link to="/terms-of-service" className="outline-none group">
              <h2 className="text-[13px] font-medium text-slate-500 group-hover:text-slate-300 transition-colors m-0">
                Terms of Service
              </h2>
            </Link>
          </div>
        </div>

        {/* Massive Background Text Watermark with Fluid Continuous Colour */}
        <div className="w-full flex justify-center items-end mt-10 pb-8 overflow-hidden pointer-events-none select-none relative z-0">
          <h2 className="text-[15vw] lg:text-[13vw] font-black uppercase tracking-tighter leading-[0.9] m-0 animate-fluid-blue transition-all duration-1000">
            CODE LUME
          </h2>
        </div>
      </div>
    </footer>
  );
}
