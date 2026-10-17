"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Code, Users, Globe, Zap, CheckCircle2, Rocket } from "lucide-react";
import { Whatsapp, Gmail } from "@thesvg/react"; 

// Scroll-Triggered Typewriter Effect strictly for Heading in a rigid container
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

    let i = 0;
    setDisplayedText("");

    const startTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 45);

      return () => clearInterval(typingInterval);
    }, 200);

    return () => clearTimeout(startTimeout);
  }, [text, hasStarted]);

  const lines = displayedText.split("\n");
  const fullLines = text.split("\n");

  const headingClasses =
    "text-4xl sm:text-6xl md:text-7xl font-medium tracking-tighter text-black leading-[1.05] select-none cursor-default w-full m-0 text-center";

  return (
    <div
      ref={headingRef}
      className="min-h-[100px] sm:min-h-[140px] md:min-h-[160px] flex items-center justify-center mb-6 w-full relative"
    >
      {/* INVISIBLE PLACEHOLDER: Reserves exact height so content below never shifts */}
      <h1 className={`${headingClasses} opacity-0 pointer-events-none`}>
        {fullLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx !== fullLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h1>

      {/* VISIBLE TYPING TEXT: Exact Hero.jsx cursor & persistent behaviour */}
      <h1 className={`${headingClasses} absolute top-0 left-0 h-full`}>
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
      </h1>
    </div>
  );
};

export default function AboutCodeLume() {
  return (
    <div className="bg-white text-black font-jakarta pt-24 pb-20 overflow-hidden relative">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Subtle top gradient instead of dark blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-5 sm:px-10 lg:px-12 relative z-10 w-full">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 mt-6 sm:mt-10">
          <TypewriterHeading text={"Crafting Websites\nFor Your Business."} />

          <p className="text-gray-500 font-medium text-[15px] sm:text-[17px] leading-relaxed mb-8">
            CodeLume is a premium digital hub, built and maintained by an
            independent freelancer specialising in bringing your creative ideas
            to life through modern web technologies.
          </p>
        </div>

        {/* Hero Bento Box (About the Creator) */}
        <div className="bg-white border border-gray-200 rounded-[32px] p-6 sm:p-10 lg:p-16 mb-20 shadow-sm flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -z-10" />

          <div className="flex-1 space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-black m-0 tracking-tight">
              Hi, I am Rafay.
            </h2>
            <h2 className="text-[18px] text-[#4285F4] font-semibold m-0 mt-2">
              Freelance Web Developer & UI/UX Designer
            </h2>
            <p className="text-gray-500 font-medium text-[15px] leading-relaxed">
              I am an independent freelancer specialising in crafting custom,
              high-converting websites and digital experiences. Whether you need
              a full-stack MERN application, a scalable custom platform, or an
              advanced SEO strategy to rank higher, I deliver tailored solutions
              that help your business grow.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                "Full-Stack Web Development (React, Node, PHP)",
                "UI/UX Design & Branding Mockups",
                "Advanced Local & Technical SEO",
                "Digital Marketing & Ad Creatives",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-black font-semibold text-[14px] sm:text-[15px]"
                >
                  <CheckCircle2 className="text-[#34A853] w-5 h-5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Light Theme Mac Terminal Mockup */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative z-10">
            <div className="relative w-full max-w-md aspect-square sm:aspect-[4/3] rounded-3xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden shadow-md p-4 group">
              <div className="absolute inset-4 bg-white rounded-2xl border border-gray-200 flex flex-col shadow-sm overflow-hidden z-20 group-hover:scale-[1.02] transition-transform duration-500">
                <div className="h-10 border-b border-gray-100 flex items-center px-4 gap-2 bg-gray-50/50">
                  <div className="w-3 h-3 rounded-full bg-[#EA4335]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FBBC05]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#34A853]"></div>
                  <div className="ml-2 text-[10px] text-gray-400 font-mono tracking-widest uppercase font-bold">
                    developer.js
                  </div>
                </div>
                <div className="p-6 font-mono text-[13px] sm:text-[14px] text-gray-700 flex flex-col gap-2.5 overflow-hidden font-medium">
                  <p>
                    <span className="text-[#a626a4]">const</span>{" "}
                    <span className="text-[#4078f2]">developer</span>{" "}
                    <span className="text-[#0184bc]">=</span>{" "}
                    <span className="text-black">{"{"}</span>
                  </p>
                  <p className="pl-4">
                    name: <span className="text-[#50a14f]">'Rafay'</span>,
                  </p>
                  <p className="pl-4">
                    role:{" "}
                    <span className="text-[#50a14f]">'Full-Stack & UI/UX'</span>
                    ,
                  </p>
                  <p className="pl-4">
                    skills: <span className="text-[#0184bc]">[</span>
                    <span className="text-[#50a14f]">'MERN'</span>,{" "}
                    <span className="text-[#50a14f]">'Next.js'</span>
                    <span className="text-[#0184bc]">]</span>,
                  </p>
                  <p className="pl-4">
                    status:{" "}
                    <span className="text-[#50a14f]">'Available for Work'</span>
                  </p>
                  <p>
                    <span className="text-black">{"}"}</span>;
                  </p>
                  <p className="mt-2 animate-pulse text-[#4078f2] font-bold">
                    _
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid (Antigravity Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-24">
          <FeatureCard
            icon={<Code size={22} />}
            title="Clean Code"
            desc="Best practices, modern syntax, and highly optimised architectures."
            hex="#4285F4"
            bg="bg-[#4285F4]/10"
            color="text-[#4285F4]"
          />
          <FeatureCard
            icon={<Users size={22} />}
            title="Client Focused"
            desc="Direct communication with me. No agencies, no middle-men."
            hex="#34A853"
            bg="bg-[#34A853]/10"
            color="text-[#34A853]"
          />
          <FeatureCard
            icon={<Globe size={22} />}
            title="Global Reach"
            desc="Delivering top-tier digital products to clients worldwide."
            hex="#FBBC05"
            bg="bg-[#FBBC05]/10"
            color="text-[#FBBC05]"
          />
          <FeatureCard
            icon={<Zap size={22} />}
            title="Fast Delivery"
            desc="Strict deadlines met with lightning-fast user experiences."
            hex="#EA4335"
            bg="bg-[#EA4335]/10"
            color="text-[#EA4335]"
          />
        </div>

        {/* Call To Action Block (Clean White / Light Gray Design) */}
        <div className="bg-gray-50 border border-gray-200 rounded-[32px] p-8 sm:p-12 lg:p-16 text-center max-w-5xl mx-auto shadow-sm relative overflow-hidden">
          {/* Decorative Corner Gradients for CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50 rounded-full blur-[80px] -z-10" />

          <h2 className="text-3xl md:text-4xl font-bold text-black m-0 tracking-tight mb-4">
            Ready to start your next project?
          </h2>
          <p className="text-gray-500 font-medium text-[15px] sm:text-[16px] mb-10 max-w-2xl mx-auto leading-relaxed">
            I am currently accepting new clients. Get in touch directly to
            discuss your requirements, get a custom quote, and let us build
            something amazing together.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 w-full">
            <a
              href="mailto:hello@codelume.online"
              className="order-2 md:order-1 flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-black font-bold transition-all duration-300 w-full shadow-sm hover:-translate-y-0.5 outline-none active:scale-[0.98]"
            >
              <Gmail className="h-5 w-5" /> Email Directly
            </a>

            <Link
              href="/start-project"
              className="order-1 md:order-2 flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#111827] text-white hover:bg-black font-bold transition-all duration-300 w-full shadow-sm hover:-translate-y-0.5 outline-none active:scale-[0.98]"
            >
              <Rocket size={18} /> Hire Me Now
            </Link>

            <a
              href="https://wa.me/923347835980"
              target="_blank"
              rel="noreferrer"
              className="order-3 flex-1 flex items-center justify-center w-full px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(37,211,102,0.2)] hover:shadow-[0_8px_20px_rgba(37,211,102,0.3)] hover:-translate-y-0.5 outline-none active:scale-[0.98]"
            >
              <Whatsapp
                variant="wordmark"
                className="h-5 w-auto brightness-0 invert"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, hex, bg, color }) {
  return (
    <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-[24px] hover:border-gray-300 hover:shadow-sm transition-all duration-300 group cursor-default relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none hidden sm:block"
        style={{
          background: `radial-gradient(circle at right bottom, ${hex}, transparent 70%)`,
        }}
      />
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 ${bg} ${color} rounded-[16px] flex items-center justify-center mb-5 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-500`}
      >
        {icon}
      </div>
      <h2
        className="text-[18px] sm:text-[19px] font-semibold text-black m-0 mb-2 transition-colors duration-300 relative z-10"
        style={{ "--hover-color": hex }}
        onMouseEnter={(e) => (e.currentTarget.style.color = hex)}
        onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
      >
        {title}
      </h2>
      <p className="text-[14px] text-gray-500 font-medium leading-relaxed m-0 relative z-10">
        {desc}
      </p>
    </div>
  );
}