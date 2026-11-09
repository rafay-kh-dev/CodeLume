"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  Adobe,
} from "@thesvg/react";

// Scroll-Triggered Typewriter Effect for Heading (Zero Layout Shift)
const TypewriterHeading = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let typingInterval;
    let i = 0;

    const startTimeout = setTimeout(() => {
      // FIX: Moved inside setTimeout to avoid synchronous state update ESLint warning
      setDisplayedText("");

      typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 45);
    }, 200);

    // FIX: Properly clearing both timeout and interval to prevent memory leaks
    return () => {
      clearTimeout(startTimeout);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [hasStarted, text]);

  const lines = displayedText.split("\n");
  const fullLines = text.split("\n");

  const headingClasses =
    "text-4xl sm:text-6xl lg:text-[4rem] font-medium tracking-tight text-black leading-[1.05] select-none cursor-default w-full m-0 text-center";

  return (
    <div
      ref={headingRef}
      className="min-h-[100px] sm:min-h-[140px] lg:min-h-[150px] flex items-center justify-center mb-6 w-full relative"
    >
      {/* INVISIBLE PLACEHOLDER */}
      <h2 className={`${headingClasses} opacity-0 pointer-events-none`}>
        {fullLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx !== fullLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>

      {/* VISIBLE TYPING TEXT */}
      <h2 className={`${headingClasses} absolute top-0 left-0 h-full`}>
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            <span className={idx === 1 ? "text-gray-400" : "text-black"}>
              {line}
            </span>
            {idx !== lines.length - 1 && <br />}
          </React.Fragment>
        ))}
        <span
          className="inline-block w-[3.5px] sm:w-[4px] h-[0.8em] ml-1.5 sm:ml-2 animate-[pulse_1s_ease-in-out_infinite] align-middle translate-y-[-4px] sm:translate-y-[-6px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, #4285F4, #34A853, #FBBC05, #EA4335)",
          }}
        ></span>
      </h2>
    </div>
  );
};

export default function Service() {
  const services = [
    {
      id: 1,
      title: "MERN Stack",
      description:
        "Full-stack JavaScript solutions using MongoDB, Express, React, & Node.js.",
      badge: "Most Demanding",
      badgeColor: "text-[#4285F4] bg-[#4285F4]/10 border-[#4285F4]/20",
      icon: <ReactIcon className="w-7 h-7 text-[#4285F4]" />,
      bg: "bg-[#4285F4]/5 border-[#4285F4]/20",
      hoverBorder:
        "hover:border-[#4285F4]/40 hover:shadow-[0_12px_30px_rgba(66,133,244,0.1)]",
      price: "$149",
      link: "/start-project",
    },
    {
      id: 2,
      title: "PHP & Laravel",
      description: "Robust, secure, and highly scalable backend architectures.",
      badge: "Most Demanding",
      badgeColor: "text-[#EA4335] bg-[#EA4335]/10 border-[#EA4335]/20",
      icon: <Laravel className="w-7 h-7 text-[#EA4335]" />,
      bg: "bg-[#EA4335]/5 border-[#EA4335]/20",
      hoverBorder:
        "hover:border-[#EA4335]/40 hover:shadow-[0_12px_30px_rgba(234,67,53,0.1)]",
      price: "$139",
      link: "/start-project",
    },
    {
      id: 3,
      title: "Angular Web Apps",
      description:
        "Enterprise-grade frontend frameworks for complex web applications.",
      badge: "Enterprise",
      badgeColor: "text-[#FBBC05] bg-[#FBBC05]/10 border-[#FBBC05]/20",
      icon: <Angular className="w-7 h-7 text-[#FBBC05]" />,
      bg: "bg-[#FBBC05]/5 border-[#FBBC05]/20",
      hoverBorder:
        "hover:border-[#FBBC05]/40 hover:shadow-[0_12px_30px_rgba(251,188,5,0.1)]",
      price: "$135",
      link: "/start-project",
    },
    {
      id: 4,
      title: "Custom Platforms",
      description:
        "Bespoke digital solutions tailored exactly to your business logic.",
      badge: "Top Rated",
      badgeColor: "text-[#34A853] bg-[#34A853]/10 border-[#34A853]/20",
      icon: <GcpCloudMonitoring className="w-7 h-7 text-[#34A853]" />,
      bg: "bg-[#34A853]/5 border-[#34A853]/20",
      hoverBorder:
        "hover:border-[#34A853]/40 hover:shadow-[0_12px_30px_rgba(52,168,83,0.1)]",
      price: "$299",
      link: "/start-project",
    },
    {
      id: 5,
      title: "WordPress Sites",
      description:
        "Custom themes, plugins, and powerful e-commerce experiences.",
      badge: "Most Popular",
      badgeColor: "text-[#4285F4] bg-[#4285F4]/10 border-[#4285F4]/20",
      icon: <Wordpress className="w-7 h-7 text-[#4285F4]" />,
      bg: "bg-[#4285F4]/5 border-[#4285F4]/20",
      hoverBorder:
        "hover:border-[#4285F4]/40 hover:shadow-[0_12px_30px_rgba(66,133,244,0.1)]",
      price: "$100",
      link: "/start-project",
    },
    {
      id: 6,
      title: "Shopify Development",
      description:
        "High-converting storefronts and highly customised Shopify apps.",
      badge: "High Converting",
      badgeColor: "text-[#34A853] bg-[#34A853]/10 border-[#34A853]/20",
      icon: <Shopify className="w-7 h-7 text-[#34A853]" />,
      bg: "bg-[#34A853]/5 border-[#34A853]/20",
      hoverBorder:
        "hover:border-[#34A853]/40 hover:shadow-[0_12px_30px_rgba(52,168,83,0.1)]",
      price: "$115",
      link: "/start-project",
    },
    {
      id: 7,
      title: "Webflow Sites",
      description:
        "Pixel-perfect, lightning-fast, and visually stunning responsive sites.",
      badge: "Trending",
      badgeColor: "text-[#EA4335] bg-[#EA4335]/10 border-[#EA4335]/20",
      icon: <Webflow className="w-7 h-7 text-[#EA4335]" />,
      bg: "bg-[#EA4335]/5 border-[#EA4335]/20",
      hoverBorder:
        "hover:border-[#EA4335]/40 hover:shadow-[0_12px_30px_rgba(234,67,53,0.1)]",
      price: "$149",
      link: "/start-project",
    },
    {
      id: 8,
      title: "API & Integrations",
      description:
        "Connecting your web apps with third-party services seamlessly.",
      badge: "High Speed",
      badgeColor: "text-[#FBBC05] bg-[#FBBC05]/10 border-[#FBBC05]/20",
      icon: <GcpApiMonetization className="w-7 h-7 text-[#FBBC05]" />,
      bg: "bg-[#FBBC05]/5 border-[#FBBC05]/20",
      hoverBorder:
        "hover:border-[#FBBC05]/40 hover:shadow-[0_12px_30px_rgba(251,188,5,0.1)]",
      price: "$99",
      link: "/start-project",
    },
    {
      id: 9,
      title: "Mobile Apps",
      description:
        "High-performance iOS and Android applications engineered for scale.",
      badge: "Native Build",
      badgeColor: "text-[#34A853] bg-[#34A853]/10 border-[#34A853]/20",
      icon: <Flutter className="w-7 h-7 text-[#34A853]" />,
      bg: "bg-[#34A853]/5 border-[#34A853]/20",
      hoverBorder:
        "hover:border-[#34A853]/40 hover:shadow-[0_12px_30px_rgba(52,168,83,0.1)]",
      price: "$399",
      link: "/start-project",
    },
    {
      id: 10,
      title: "UI/UX Design",
      description:
        "User-centric interfaces crafted in Figma for maximum conversion.",
      badge: "Creative",
      badgeColor: "text-[#4285F4] bg-[#4285F4]/10 border-[#4285F4]/20",
      icon: <Figma className="w-7 h-7 text-[#4285F4]" />,
      bg: "bg-[#4285F4]/5 border-[#4285F4]/20",
      hoverBorder:
        "hover:border-[#4285F4]/40 hover:shadow-[0_12px_30px_rgba(66,133,244,0.1)]",
      price: "$199",
      link: "/start-project",
    },
    {
      id: 11,
      title: "Full Branding",
      description:
        "From 0 to 100. Complete brand identity, web engineering, and marketing.",
      badge: "Agency Premium",
      badgeColor: "text-[#EA4335] bg-[#EA4335]/10 border-[#EA4335]/20",
      icon: <Adobe className="w-7 h-7 text-[#EA4335]" />,
      bg: "bg-[#EA4335]/5 border-[#EA4335]/20",
      hoverBorder:
        "hover:border-[#EA4335]/40 hover:shadow-[0_12px_30px_rgba(234,67,53,0.1)]",
      price: "$1,499",
      link: "/start-project",
    },
  ];

  return (
    <section className="bg-white text-black font-jakarta py-24 sm:py-32 overflow-hidden relative">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Subtle Top Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-5 sm:px-10 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col items-center text-center mb-16 sm:mb-24 max-w-3xl mx-auto">
          <TypewriterHeading
            text={"Bespoke digital solutions\nto scale your business."}
          />

          <p className="text-gray-500 text-[15px] sm:text-[17px] font-medium leading-relaxed max-w-2xl m-0">
            As an independent professional, I provide end-to-end digital
            services. From writing clean architecture to crafting beautiful
            designs, find a package that fits your needs perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1300px] mx-auto">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.link}
              className={`flex flex-col bg-white border border-gray-200 rounded-[32px] p-7 sm:p-8 group transition-all duration-500 hover:-translate-y-1.5 relative outline-none active:scale-[0.98] ${service.hoverBorder}`}
            >
              <div className="flex items-center justify-between mb-8">
                <div
                  className={`w-14 h-14 shrink-0 rounded-[20px] border flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${service.bg}`}
                >
                  {service.icon}
                </div>

                {service.badge && (
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${service.badgeColor}`}
                  >
                    {service.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-col flex-grow mb-8">
                <h2 className="text-[20px] font-bold text-black mb-3 m-0 transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-500 font-medium leading-relaxed text-[14px] m-0 line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-1">
                    Starting From
                  </span>
                  <span className="text-[22px] font-black text-black m-0 tracking-tight">
                    {service.price}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-[14px] bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-gray-100 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-black transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
