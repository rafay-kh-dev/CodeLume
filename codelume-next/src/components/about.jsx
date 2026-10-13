"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Code2,
  ArrowRight,
  Layers,
  Cpu,
  TrendingUp,
} from "lucide-react";

// Scroll-Triggered Typewriter Effect strictly for Heading in a rigid container
const TypewriterHeading = () => {
  const [displayedHeading, setDisplayedHeading] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const headingRef = useRef(null);

  const headingText = "Engineered for scale.\nDesigned for impact.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let hIndex = 0;
    setDisplayedHeading("");

    const startTimeout = setTimeout(() => {
      const headingInterval = setInterval(() => {
        if (hIndex < headingText.length) {
          setDisplayedHeading(headingText.substring(0, hIndex + 1));
          hIndex++;
        } else {
          clearInterval(headingInterval);
        }
      }, 35);

      return () => clearInterval(headingInterval);
    }, 150);

    return () => clearTimeout(startTimeout);
  }, [hasStarted]);

  const lines = displayedHeading.split('\n');

  return (
    <div ref={headingRef} className="w-full mb-6">
      {/* Strict Fixed Min-Height Container so heading space is reserved, preventing any push down */}
      <div className="min-h-[110px] sm:min-h-[130px] lg:min-h-[150px] w-full flex items-start">
        <h2 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-medium text-black tracking-tight leading-[1.1] m-0 w-full">
          {lines.map((line, idx) => (
            <React.Fragment key={idx}>
              <span className={idx === 1 ? "text-gray-400" : ""}>{line}</span>
              {idx !== lines.length - 1 && <br className="hidden sm:block" />}
            </React.Fragment>
          ))}
          {displayedHeading.length < headingText.length && (
            <span 
              className="inline-block w-[3px] h-[0.8em] ml-1.5 animate-[pulse_1s_ease-in-out_infinite] align-middle translate-y-[-4px] rounded-full"
              style={{ background: 'linear-gradient(to bottom, #4285F4, #34A853, #FBBC05, #EA4335)' }}
            ></span>
          )}
        </h2>
      </div>
    </div>
  );
};

export default function About() {
  return (
    <section
      className="relative w-full py-24 sm:py-32 bg-white font-jakarta overflow-hidden border-t border-gray-100"
      id="about"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* GLOBAL SVG GRADIENT FOR ICONS */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="about-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#4285F4" offset="0%" />
            <stop stopColor="#34A853" offset="33%" />
            <stop stopColor="#FBBC05" offset="66%" />
            <stop stopColor="#EA4335" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* LEFT SIDE: Profile */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 mb-8">
              <Code2 className="w-3.5 h-3.5 text-gray-500" />
              <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] m-0">
                The Architecture
              </h2>
            </div>

            {/* Typewriter Heading (In its own reserved space) */}
            <TypewriterHeading />

            {/* Static Paragraph - Absolutely locked in place */}
            <p className="text-[15px] sm:text-[16px] text-[#4B5563] font-medium leading-[1.7] max-w-lg mb-8 m-0">
              Hi, I'm <strong className="text-black font-semibold">Rafay</strong>, the lead architect behind CodeLume. We bridge the gap between stunning aesthetic design and robust server architectures. From custom WordPress themes to complex React applications, every pixel is optimized and every platform is engineered for global performance.
            </p>

            {/* Static Button - Absolutely locked in place */}
            <Link
              href="/start-project"
              className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#111827] text-white hover:bg-black transition-all duration-200 outline-none active:scale-[0.98] shadow-sm"
            >
              <span className="text-[14px] font-medium m-0 tracking-wide">
                Start your project
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* RIGHT SIDE: Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            
            <div className="sm:col-span-2 group relative p-8 sm:p-10 rounded-[24px] bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden cursor-default">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-50 rounded-full blur-[80px] group-hover:bg-blue-100 transition-all duration-700 opacity-0 group-hover:opacity-100" />
              
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-500">
                  <Layers className="w-8 h-8" stroke="url(#about-gradient)" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-[22px] font-semibold text-black mb-2 m-0 tracking-tight">
                    UI/UX & Frontend Design
                  </h2>
                  <p className="text-[14.5px] text-gray-500 font-medium leading-relaxed m-0 max-w-md">
                    Crafting clean, responsive interface components and admin dashboards. We focus on modern React structures and Tailwind CSS setups to deliver human-centric experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative p-8 rounded-[24px] bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-500 cursor-default">
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <Cpu className="w-6 h-6" stroke="url(#about-gradient)" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-[18px] font-semibold text-black mb-2 m-0 tracking-tight">
                    Backend Systems
                  </h2>
                  <p className="text-[14px] text-gray-500 font-medium leading-relaxed m-0">
                    Secure, scalable PHP scripts and custom architectures that handle complex logic with zero latency.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative p-8 rounded-[24px] bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-500 cursor-default">
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <TrendingUp className="w-6 h-6" stroke="url(#about-gradient)" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-[18px] font-semibold text-black mb-2 m-0 tracking-tight">
                    SEO & Indexing
                  </h2>
                  <p className="text-[14px] text-gray-500 font-medium leading-relaxed m-0">
                    Data-driven keyword research and technical optimization campaigns that dominate search engines.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}