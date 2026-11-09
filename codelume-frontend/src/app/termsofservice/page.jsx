"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Mail } from "lucide-react";

// Scroll-Triggered Typewriter Effect for Heading
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
      { threshold: 0.2 }
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
  }, [hasStarted, text]);

  const lines = displayedText.split("\n");
  const fullLines = text.split("\n");

  const headingClasses =
    "text-5xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05] select-none cursor-default w-full m-0";

  return (
    <div
      ref={headingRef}
      className="min-h-[60px] sm:min-h-[80px] flex items-start justify-start mb-4 w-full relative"
    >
      {/* INVISIBLE PLACEHOLDER: Reserves exact height so content below never shifts */}
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

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white font-jakarta relative overflow-hidden text-gray-600">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Subtle Top Gradient instead of dark blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto px-5 sm:px-10 lg:px-12 pt-24 sm:pt-32 pb-20 relative z-10">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-10 group outline-none"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <h2 className="text-[14px] font-bold m-0 tracking-wide">Back to Home</h2>
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <TypewriterHeading text="Terms of Service" />
          <p className="text-[15px] sm:text-[16px] text-gray-400 font-bold tracking-wide uppercase m-0">
            Last updated: 25 September 2026
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-gray-200 rounded-[32px] p-8 sm:p-12 lg:p-16 shadow-sm relative overflow-hidden">
          
          <div className="space-y-12">
            {/* Intro */}
            <div>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0">
                Welcome to CodeLume. By accessing or using our platform,
                you agree to be bound by these Terms of Service. Please read
                them carefully before using our website or accessing our
                educational materials and services.
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#4285F4]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-black m-0 tracking-tight">
                  1. General Conditions
                </h2>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0 pl-0 sm:pl-14">
                We reserve the right to refuse service to anyone for any reason
                at any time. You understand that your content may be transferred
                unencrypted and involve transmissions over various networks.
                Unauthorised use of this website may give rise to a claim for
                damages and/or be a criminal offence.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#4285F4]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-black m-0 tracking-tight">
                  2. Intellectual Property
                </h2>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0 pl-0 sm:pl-14">
                All content included on this site, such as text, graphics,
                logos, and video tutorials, is the property of CodeLume
                and protected by international copyright laws. We grant you a
                limited licence to access and make personal use of this site for
                your own educational and professional purposes.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#4285F4]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-black m-0 tracking-tight">
                  3. User Conduct
                </h2>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0 pl-0 sm:pl-14">
                You agree not to reproduce, duplicate, copy, sell, resell or
                exploit any portion of the Service, use of the Service, or
                access to the Service without express written permission by us.
                You must not transmit any worms or viruses or any code of a
                destructive nature while using our platform.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#4285F4]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-black m-0 tracking-tight">
                  4. Modifications to the Service
                </h2>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0 pl-0 sm:pl-14">
                Prices for our educational programmes, courses, and tutorials
                are subject to change without notice. We reserve the right at
                any time to modify or discontinue the Service (or any part or
                content thereof) without notice at any time.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#4285F4]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-black m-0 tracking-tight">
                  5. Governing Law
                </h2>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0 pl-0 sm:pl-14">
                These Terms of Service and any separate agreements whereby we
                provide you Services shall be governed by and construed in
                accordance with the laws of Australia.
              </p>
            </div>

            {/* Section 6 - Contact Box */}
            <div className="p-8 sm:p-10 rounded-[24px] bg-gray-50 border border-gray-200 mt-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-[60px] pointer-events-none" />
              <h2 className="text-xl sm:text-2xl font-bold text-black m-0 mb-4 tracking-tight flex items-center gap-3 relative z-10">
                <Mail className="w-5 h-5 text-[#4285F4]" />
                Contact Information
              </h2>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0 relative z-10">
                If you have any questions or concerns about these Terms of
                Service, please send them to us at{" "}
                <a
                  href="mailto:mrafaykh@outlook.com"
                  className="text-[#4285F4] hover:text-blue-600 font-bold transition-colors"
                >
                  mrafaykh@outlook.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}