import React, { useState, useEffect, useRef } from "react";
import { ArrowUp, X } from "lucide-react";
import {
  Whatsapp,
  Telegram,
  Gmail2026,
  MicrosoftTeams,
  GcpSupport,
} from "@thesvg/react";

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);

  // Scroll visibility check for Back to Top button
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  // Close widget when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const waMessage = encodeURIComponent(
    "Hi Rafay! I was browsing the CodeLume website and have a quick question."
  );

  // Contact channel configurations
  const contactChannels = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/923347835980?text=${waMessage}`,
      icon: <Whatsapp className="h-5 w-5" />,
      hoverBorder: "hover:border-[#25D366]",
      hoverGlow: "hover:shadow-[0_0_15px_rgba(37,211,102,0.35)]",
    },
    {
      id: "telegram",
      label: "Telegram",
      href: "https://t.me/your_telegram", // Replace with your Telegram handle
      icon: <Telegram className="h-5 w-5" />,
      hoverBorder: "hover:border-[#229ED9]",
      hoverGlow: "hover:shadow-[0_0_15px_rgba(34,158,217,0.35)]",
    },
    {
      id: "gmail",
      label: "Email",
      href: "mailto:contact@codelume.com", // Replace with your email address
      icon: <Gmail2026 className="h-5 w-5" />,
      hoverBorder: "hover:border-[#EA4335]",
      hoverGlow: "hover:shadow-[0_0_15px_rgba(234,67,53,0.35)]",
    },
    {
      id: "teams",
      label: "MS Teams",
      href: "https://teams.microsoft.com/l/chat/0/0?users=contact@codelume.com", // Replace with your Teams email
      icon: <MicrosoftTeams className="h-5 w-5" />,
      hoverBorder: "hover:border-[#6264A7]",
      hoverGlow: "hover:shadow-[0_0_15px_rgba(98,100,167,0.35)]",
    },
  ];

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 items-end pointer-events-none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 shadow-lg flex items-center justify-center transition-all duration-300 outline-none transform-gpu ${
          showScroll
            ? "translate-y-0 opacity-100 visible scale-100"
            : "translate-y-4 opacity-0 invisible scale-90"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Floating Support Hub */}
      <div className="relative pointer-events-auto flex flex-col items-end">
        {/* Expanded Contact Channels Menu */}
        <div
          className={`flex flex-col gap-2.5 items-end mb-3 transition-all duration-300 transform-gpu ${
            isOpen
              ? "opacity-100 translate-y-0 visible pointer-events-auto"
              : "opacity-0 translate-y-4 invisible pointer-events-none"
          }`}
        >
          {contactChannels.map((channel, index) => (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              style={{
                transitionDelay: isOpen ? `${index * 40}ms` : "0ms",
              }}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0a0f1c]/95 border border-blue-500/20 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-x-1 ${channel.hoverBorder} ${channel.hoverGlow}`}
            >
              <span className="text-xs sm:text-sm font-medium text-slate-200">
                {channel.label}
              </span>
              <div className="flex items-center justify-center">
                {channel.icon}
              </div>
            </a>
          ))}
        </div>

        {/* Support Trigger Button Row with "Contact me" Badge */}
        <div className="flex items-center gap-3 group">
          {/* Left Text Badge */}
          <div className="px-3.5 py-1.5 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white-400 text-xs sm:text-sm font-medium shadow-[0_0_15px_rgba(37,99,235,0.2)] backdrop-blur-md transition-all duration-300 group-hover:border-blue-400 group-hover:text-blue-300">
            Contact me
          </div>

          {/* Main Support Trigger Button with GcpSupport Icon */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0a0f1c] border border-blue-500/40 text-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:border-blue-400 hover:text-white transition-all duration-300 outline-none transform-gpu active:scale-95 ${
              isOpen ? "bg-blue-950/60 border-blue-400 text-white rotate-90" : ""
            }`}
            aria-label="Contact Options"
          >
            {/* Website Match Blue Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-blue-700/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform duration-300" />
            ) : (
              <GcpSupport className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 transition-transform duration-300 group-hover:scale-110" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}