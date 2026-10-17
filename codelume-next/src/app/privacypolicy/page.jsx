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

export default function PrivacyPolicy() {
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
          <TypewriterHeading text="Privacy Policy" />
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
                At CodeLume, we are committed to protecting your privacy
                and ensuring your personal information is handled in a safe and
                responsible manner. This Privacy Policy outlines how we collect,
                use, disclose, and safeguard your data in accordance with
                applicable regulations, including the Australian Privacy
                Principles (APPs).
              </p>
            </div>

            {/* Section 1 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#4285F4]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-black m-0 tracking-tight">
                  1. Collection of Personal Information
                </h2>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0 pl-0 sm:pl-14">
                We may collect personal information such as your name, email
                address, contact details, and payment information when you
                subscribe to our programmes, register for an account, or
                communicate with us. We only collect personal details that are
                necessary to provide our educational and digital services to
                you.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#4285F4]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-black m-0 tracking-tight">
                  2. How We Use Your Information
                </h2>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0 pl-0 sm:pl-14">
                Your personal details are used to deliver educational resources,
                process transactions, communicate platform updates, and improve
                user experience. We may also send periodic promotional updates
                if you have opted in to receive marketing communications from
                us.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#4285F4]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-black m-0 tracking-tight">
                  3. Protection and Data Security
                </h2>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0 pl-0 sm:pl-14">
                We implement robust security measures to protect your data
                against unauthorised access, alteration, disclosure, or
                destruction. However, please note that no transmission method
                over the internet or electronic storage solution is completely
                secure.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#4285F4]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-black m-0 tracking-tight">
                  4. Disclosure to Third Parties
                </h2>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0 pl-0 sm:pl-14">
                We do not sell, trade, or rent your personal information to
                third parties. We may share information with trusted third-party
                service providers who assist us in operating our website,
                conducting business, or serving our users, provided those
                organisations agree to keep this information strictly
                confidential.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#4285F4]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-black m-0 tracking-tight">
                  5. Access and Correction Rights
                </h2>
              </div>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0 pl-0 sm:pl-14">
                You have the right to access the personal information we hold
                about you and to request corrections if any details are
                inaccurate or out of date. You may also unsubscribe from our
                mailing list at any time using the link provided in our emails.
              </p>
            </div>

            {/* Section 6 - Contact Box */}
            <div className="p-8 sm:p-10 rounded-[24px] bg-gray-50 border border-gray-200 mt-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-[60px] pointer-events-none" />
              <h2 className="text-xl sm:text-2xl font-bold text-black m-0 mb-4 tracking-tight flex items-center gap-3 relative z-10">
                <Mail className="w-5 h-5 text-[#4285F4]" />
                Contact Privacy Team
              </h2>
              <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0 relative z-10">
                If you have any questions or enquiries regarding this Privacy
                Policy or wish to lodge a privacy complaint, please contact us
                at{" "}
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