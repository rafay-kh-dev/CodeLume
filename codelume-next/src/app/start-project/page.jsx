"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { ArrowRight, Mail, User, Building, Loader2 } from "lucide-react";

// @thesvg/react se pori 11 services ke real icons import kiye gaye hain
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
    const startTimeout = setTimeout(() => {
      // ✅ FIX: Moved inside setTimeout to prevent React cascading renders
      setDisplayedText("");
      let i = 0;
      typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 45);
    }, 200);

    return () => {
      clearTimeout(startTimeout);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [hasStarted, text]);

  const lines = displayedText.split("\n");
  const fullLines = text.split("\n");

  const headingClasses =
    "text-5xl sm:text-6xl lg:text-[4.5rem] font-medium tracking-tighter text-black leading-[1.05] select-none cursor-default w-full m-0";

  return (
    <div
      ref={headingRef}
      className="min-h-[110px] sm:min-h-[140px] lg:min-h-[160px] flex items-start justify-start mb-6 sm:mb-8 w-full relative"
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
        {displayedText.length < text.length && (
          <span
            className="inline-block w-[3.5px] sm:w-[4px] h-[0.8em] ml-1.5 sm:ml-2 animate-[pulse_1s_ease-in-out_infinite] align-middle translate-y-[-4px] sm:translate-y-[-6px] rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, #4285F4, #34A853, #FBBC05, #EA4335)",
            }}
          ></span>
        )}
      </h2>
    </div>
  );
};

export default function StartProject() {
  const [formData, setFormData] = useState({
    services: [],
    budget: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    details: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // All 11 Premium Services added with Real Icons
  const serviceOptions = [
    { id: "MERN Stack", title: "MERN Stack", icon: ReactIcon },
    { id: "PHP Laravel", title: "PHP & Laravel", icon: Laravel },
    { id: "Angular", title: "Angular Web Apps", icon: Angular },
    {
      id: "Custom Platforms",
      title: "Custom Platforms",
      icon: GcpCloudMonitoring,
    },
    { id: "WordPress", title: "WordPress Sites", icon: Wordpress },
    { id: "Shopify", title: "Shopify Dev", icon: Shopify },
    { id: "Webflow", title: "Webflow Sites", icon: Webflow },
    { id: "API", title: "API Integrations", icon: GcpApiMonetization },
    { id: "Mobile Apps", title: "Mobile Apps", icon: Flutter },
    { id: "UI/UX Design", title: "UI/UX Design", icon: Figma },
    { id: "Full Branding", title: "Full Branding", icon: Adobe },
  ];

  const budgetOptions = ["$1k - $2.5k", "$2.5k - $5k", "$5k - $10k", "$10k+"];

  const timelineOptions = [
    "Less than 1 month",
    "1 - 2 months",
    "3+ months",
    "Not sure yet",
  ];

  const toggleService = (id) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_fhmjx2e",
        "template_xi7uxae",
        {
          from_name: formData.name,
          client_email: formData.email,
          company: formData.company,
          services: formData.services.join(", "),
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.details,
          reply_to: formData.email,
        },
        "2uB67zF7wZrjpEEyD",
      );

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Email send error details:", error);
      const errorMessage =
        error?.text ||
        error?.message ||
        "Please check your EmailJS dashboard credentials.";
      alert("EmailJS Failed: " + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="w-full min-h-dvh pt-32 sm:pt-40 pb-24 bg-white font-jakarta flex items-center justify-center relative overflow-hidden">
        <style>
          {`
            ::-webkit-scrollbar { width: 8px; height: 8px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
          `}
        </style>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-2xl w-full px-4 flex flex-col items-center text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-medium text-black mb-6 sm:mb-8 m-0 tracking-tight leading-tight">
            Thank You!
          </h2>

          <h2 className="text-[15px] sm:text-[18px] text-gray-600 font-medium leading-relaxed mb-10 sm:mb-12 m-0 px-4 max-w-lg mx-auto">
            Thank you for contacting me. I am Rafay. I will contact you as soon
            as possible from this email{" "}
            <span className="text-[#4285F4] font-bold tracking-wide">
              mrafaykh@outlook.com
            </span>
            .
          </h2>

          <Link
            href="/"
            className="flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#111827] text-white hover:bg-black transition-all duration-300 outline-none active:scale-[0.98] group shadow-sm"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform rotate-180" />
            <h2 className="text-[14px] sm:text-[15px] font-bold m-0 tracking-wide text-white">
              Return to Homepage
            </h2>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full pt-28 sm:pt-40 pb-20 sm:pb-24 lg:pb-32 bg-white font-jakarta relative overflow-hidden"
      id="start-project"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        `}
      </style>

      {/* Subtle top gradient instead of dark blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-10 relative z-10 w-full">
        <div className="flex flex-col items-start text-left mb-12 sm:mb-20">
          <TypewriterHeading text={"Let's engineer\nyour next project."} />

          {/* ✅ SOLO DEVELOPER COPY APPLIED HERE */}
          <p className="text-[15px] sm:text-[17px] text-gray-500 font-medium leading-relaxed m-0 max-w-2xl px-1 sm:px-0">
            Fill out the technical requirements below. The more details you
            provide, the better I can customise my architectural proposal for
            your business.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:gap-14">
          {/* Section 1: Services */}
          <div className="flex flex-col gap-5 sm:gap-8 p-6 sm:p-10 lg:p-12 rounded-[24px] sm:rounded-[32px] bg-white border border-gray-200 shadow-sm relative overflow-hidden">
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-black m-0 tracking-tight flex items-center gap-3 sm:gap-4">
              <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-50 border border-gray-200 text-black text-[12px] sm:text-[13px] font-bold shrink-0">
                1
              </span>
              What do you need help with?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {serviceOptions.map((service) => {
                const isSelected = formData.services.includes(service.id);
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] border transition-all duration-300 outline-none text-left active:scale-[0.98] ${
                      isSelected
                        ? "bg-white border-[#4285F4] shadow-[0_8px_20px_rgba(66,133,244,0.12)] sm:-translate-y-1"
                        : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-[10px] sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 border ${
                        isSelected
                          ? "bg-[#4285F4] border-[#4285F4] text-white shadow-md"
                          : "bg-white border-gray-200 text-black"
                      }`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                    </div>
                    <h2
                      className={`text-[13.5px] sm:text-[15px] font-semibold m-0 tracking-tight transition-colors ${
                        isSelected ? "text-[#4285F4]" : "text-black"
                      }`}
                    >
                      {service.title}
                    </h2>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Section 2: Budget */}
            <div className="flex flex-col gap-5 sm:gap-8 p-6 sm:p-10 lg:p-12 rounded-[24px] sm:rounded-[32px] bg-white border border-gray-200 shadow-sm relative overflow-hidden">
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-black m-0 tracking-tight flex items-center gap-3 sm:gap-4">
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-50 border border-gray-200 text-black text-[12px] sm:text-[13px] font-bold shrink-0">
                  2
                </span>
                Allocated Budget
              </h2>
              <div className="flex flex-col gap-3">
                {budgetOptions.map((budget, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect("budget", budget)}
                    className={`px-5 sm:px-6 py-4 sm:py-5 rounded-[16px] sm:rounded-[20px] border text-left font-semibold tracking-tight text-[14px] sm:text-[15px] transition-all duration-300 outline-none active:scale-[0.98] ${
                      formData.budget === budget
                        ? "bg-white border-[#4285F4] text-[#4285F4] shadow-[0_8px_20px_rgba(66,133,244,0.12)] sm:-translate-y-1"
                        : "bg-gray-50 border-transparent text-gray-700 hover:bg-white hover:border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 3: Timeline */}
            <div className="flex flex-col gap-5 sm:gap-8 p-6 sm:p-10 lg:p-12 rounded-[24px] sm:rounded-[32px] bg-white border border-gray-200 shadow-sm relative overflow-hidden">
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-black m-0 tracking-tight flex items-center gap-3 sm:gap-4">
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-50 border border-gray-200 text-black text-[12px] sm:text-[13px] font-bold shrink-0">
                  3
                </span>
                Estimated Timeline
              </h2>
              <div className="flex flex-col gap-3">
                {timelineOptions.map((time, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect("timeline", time)}
                    className={`px-5 sm:px-6 py-4 sm:py-5 rounded-[16px] sm:rounded-[20px] border text-left font-semibold tracking-tight text-[14px] sm:text-[15px] transition-all duration-300 outline-none active:scale-[0.98] ${
                      formData.timeline === time
                        ? "bg-white border-[#4285F4] text-[#4285F4] shadow-[0_8px_20px_rgba(66,133,244,0.12)] sm:-translate-y-1"
                        : "bg-gray-50 border-transparent text-gray-700 hover:bg-white hover:border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Details */}
          <div className="flex flex-col gap-5 sm:gap-8 p-6 sm:p-10 lg:p-12 rounded-[24px] sm:rounded-[32px] bg-white border border-gray-200 shadow-sm relative overflow-hidden">
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-black m-0 tracking-tight flex items-center gap-3 sm:gap-4 mb-1 sm:mb-2">
              <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-50 border border-gray-200 text-black text-[12px] sm:text-[13px] font-bold shrink-0">
                4
              </span>
              Project & Contact Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="relative group/input">
                <User className="absolute top-4 sm:top-5 left-4 sm:left-5 w-5 h-5 text-gray-400 group-focus-within/input:text-[#4285F4] transition-colors pointer-events-none" />
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => handleSelect("name", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[16px] sm:rounded-[20px] py-4 sm:py-5 pl-12 sm:pl-14 pr-4 sm:pr-5 text-[14px] sm:text-[15px] font-medium text-black placeholder-gray-400 focus:outline-none focus:border-[#4285F4] focus:bg-[#F0F7FF] transition-all"
                />
              </div>

              <div className="relative group/input">
                <Mail className="absolute top-4 sm:top-5 left-4 sm:left-5 w-5 h-5 text-gray-400 group-focus-within/input:text-[#4285F4] transition-colors pointer-events-none" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => handleSelect("email", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[16px] sm:rounded-[20px] py-4 sm:py-5 pl-12 sm:pl-14 pr-4 sm:pr-5 text-[14px] sm:text-[15px] font-medium text-black placeholder-gray-400 focus:outline-none focus:border-[#4285F4] focus:bg-[#F0F7FF] transition-all"
                />
              </div>

              <div className="relative md:col-span-2 group/input">
                <Building className="absolute top-4 sm:top-5 left-4 sm:left-5 w-5 h-5 text-gray-400 group-focus-within/input:text-[#4285F4] transition-colors pointer-events-none" />
                <input
                  type="text"
                  placeholder="Company Name (Optional)"
                  value={formData.company}
                  onChange={(e) => handleSelect("company", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[16px] sm:rounded-[20px] py-4 sm:py-5 pl-12 sm:pl-14 pr-4 sm:pr-5 text-[14px] sm:text-[15px] font-medium text-black placeholder-gray-400 focus:outline-none focus:border-[#4285F4] focus:bg-[#F0F7FF] transition-all"
                />
              </div>

              <div className="relative md:col-span-2 group/input">
                <textarea
                  placeholder="Tell me about your project requirements..."
                  required
                  rows="5"
                  value={formData.details}
                  onChange={(e) => handleSelect("details", e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 text-[14px] sm:text-[15px] font-medium leading-relaxed text-black placeholder-gray-400 focus:outline-none focus:border-[#4285F4] focus:bg-[#F0F7FF] transition-all resize-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-3 w-full px-6 sm:px-8 py-5 sm:py-6 rounded-[20px] sm:rounded-[24px] bg-[#111827] text-white hover:bg-black transition-all duration-300 outline-none group/btn active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 sm:mt-2 shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                <h2 className="text-[15px] sm:text-[17px] font-bold m-0 text-inherit tracking-wide">
                  Processing...
                </h2>
              </>
            ) : (
              <>
                <h2 className="text-[15px] sm:text-[17px] font-bold m-0 text-inherit tracking-wide">
                  Submit Request
                </h2>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
