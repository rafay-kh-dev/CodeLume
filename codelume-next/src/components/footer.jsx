"use client";
import React from "react";
import Link from "next/link";
import { Code2 } from "lucide-react";
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
    { name: "Mobile Apps", path: "/services/mobile-apps" },
    { name: "UI/UX Design", path: "/services/uiux-design" },
    { name: "Full Branding", path: "/services/full-branding" },
  ];

  const tools = [
    { name: "SVG to React JSX", path: "/tools/svg-to-react" },
    { name: "JSON to TypeScript", path: "/tools/json-to-ts" },
    { name: "JWT Decoder", path: "/tools/jwt-decoder" },
    { name: "Meta Tag Extractor", path: "/tools/meta-extractor" },
  ];

  const resources = [
    { name: "Read My Blogs", path: "/blogs" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "About CodeLume", path: "/about-codelume" },
    { name: "Start a Project", path: "/start-project" },
  ];

  const contacts = [
    { name: "Facebook", icon: Facebook, link: "https://www.facebook.com/codelume" },
    { name: "Telegram", icon: Telegram, link: "https://t.me/RafayKH" },
    { name: "WhatsApp", icon: Whatsapp, link: "https://wa.me/923347835980" },
    { name: "MS Teams", icon: MicrosoftTeams, link: "https://teams.microsoft.com/l/chat/0/0?users=mrafaykh@outlook.com" },
    { name: "Outlook", icon: MicrosoftOutlook, link: "mailto:mrafaykh@outlook.com" },
  ];

  return (
    <footer className="w-full bg-white font-jakarta pt-20 flex flex-col overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        `}
      </style>

      {/* Top Section */}
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12 w-full flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 mb-20 relative z-10">
        
        {/* Left Side */}
        <div className="flex flex-col items-start max-w-sm">
          <h2 className="text-3xl sm:text-4xl font-medium text-black tracking-tight leading-tight m-0 mb-8">
            Experience liftoff <br /> with CodeLume.
          </h2>
          
          <div className="flex items-center gap-5">
            {contacts.map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <a
                  key={idx}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={contact.name}
                  className="group outline-none transition-transform hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-300 grayscale group-hover:grayscale-0" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Side Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16 lg:gap-24">
          
          <div className="flex flex-col">
            <h3 className="text-[14px] font-semibold text-black mb-6 m-0">Services</h3>
            <ul className="flex flex-col gap-4 p-0 m-0 list-none">
              {services.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.path} className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors outline-none">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-[14px] font-semibold text-black mb-6 m-0">Dev Tools</h3>
            <ul className="flex flex-col gap-4 p-0 m-0 list-none">
              {tools.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.path} className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors outline-none">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-[14px] font-semibold text-black mb-6 m-0">Resources</h3>
            <ul className="flex flex-col gap-4 p-0 m-0 list-none">
              {resources.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.path} className="text-[14px] font-medium text-gray-500 hover:text-black transition-colors outline-none">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Massive Background Text Watermark - FIXED: font-bold instead of font-black, leading-[1] to prevent cutting */}
      <div className="w-full overflow-hidden flex justify-center pointer-events-none select-none px-4 mb-10">
        <h1 className="text-[17vw] md:text-[15vw] font-bold tracking-tighter text-[#111827] m-0 leading-[1] text-center w-full pb-2">
          CodeLume
        </h1>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
            <span className="text-[16px] font-bold text-gray-700 tracking-tight">CodeLume</span>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 flex-wrap justify-center">
            <span className="text-[13px] font-medium text-gray-500 hidden sm:block">
              © 2026 CodeLume
            </span>
            <Link href="/about" className="text-[13px] font-medium text-gray-500 hover:text-black transition-colors outline-none">
              About CodeLume
            </Link>
            <Link href="/privacy-policy" className="text-[13px] font-medium text-gray-500 hover:text-black transition-colors outline-none">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="text-[13px] font-medium text-gray-500 hover:text-black transition-colors outline-none">
              Terms
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}