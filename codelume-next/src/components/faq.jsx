"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

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
  }, [text, hasStarted]);

  const lines = displayedText.split('\n');

  return (
    <div ref={headingRef} className="min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] flex items-center justify-center mb-6 w-full">
      <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-medium text-black tracking-tight leading-[1.1] m-0 w-full text-center">
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            <span className={idx === 1 ? "text-gray-400" : ""}>{line}</span>
            {idx !== lines.length - 1 && <br className="hidden sm:block" />}
          </React.Fragment>
        ))}
        <span 
          className="inline-block w-[3px] h-[0.8em] ml-1.5 animate-[pulse_1s_ease-in-out_infinite] align-middle translate-y-[-4px] rounded-full"
          style={{ background: 'linear-gradient(to bottom, #4285F4, #34A853, #FBBC05, #EA4335)' }}
        ></span>
      </h2>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); 

  const faqs = [
    {
      question: "What is your typical payment structure?",
      answer:
        "I usually work on a 50/50 model. A 50% deposit is required to commence the project and block out development time, and the final 50% is billed upon project completion and before the final launch or code handover.",
    },
    {
      question: "Do you provide domain registration and web hosting?",
      answer:
        "While I don't act as a direct hosting provider, we strongly assist our clients in setting up premium, secure cloud hosting (like AWS, Vercel, or Hostinger) and configuring domains under their own ownership for maximum security.",
    },
    {
      question: "How long does a standard web project take?",
      answer:
        "A standard corporate website or e-commerce store typically takes 3 to 4 weeks from concept to launch. More complex bespoke platforms or MERN stack web applications can take 6 to 8 weeks depending on the required logic and features.",
    },
    {
      question: "How many design revisions do I get?",
      answer:
        "I offer up to 3 rounds of design revisions during the UI/UX prototyping phase. I ensure you are 100% satisfied with the visual design before I move into the development and coding phase.",
    },
    {
      question: "Will my website be mobile-friendly and SEO-optimised?",
      answer:
        "Absolutely. Every digital product I engineer is fully responsive across all devices (mobile, tablet, desktop) and built with a strong technical SEO foundation to ensure maximum visibility on search engines.",
    },
  ];

  const brandColors = [
    "border-l-[#4285F4] bg-[#4285F4]/5", 
    "border-l-[#34A853] bg-[#34A853]/5", 
    "border-l-[#FBBC05] bg-[#FBBC05]/5", 
    "border-l-[#EA4335] bg-[#EA4335]/5", 
  ];

  const iconColors = [
    "text-[#4285F4] bg-[#4285F4]/10",
    "text-[#34A853] bg-[#34A853]/10",
    "text-[#FBBC05] bg-[#FBBC05]/10",
    "text-[#EA4335] bg-[#EA4335]/10",
  ];

  return (
    <section className="bg-white font-jakarta py-24 sm:py-32 relative border-t border-gray-100 overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[900px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 w-full">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            {/* FIX 2: Icon color changed to match the text color perfectly */}
            <MessageCircleQuestion className="w-3.5 h-3.5 text-gray-500" />
            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] m-0">
              Clear Answers
            </h2>
          </div>
          
          <TypewriterHeading text={"Frequently Asked\nQuestions."} />
          
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const activeBorderBg = brandColors[index % brandColors.length];
            const activeIconColor = iconColors[index % iconColors.length];

            return (
              <div
                key={index}
                className={`group border-l-[3px] border-t border-r border-b rounded-[20px] transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? `${activeBorderBg} border-t-gray-200 border-r-gray-200 border-b-gray-200 shadow-sm`
                    : "border-transparent border-t-gray-200 border-r-gray-200 border-b-gray-200 border-l-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-6 py-6 sm:px-8 flex items-center justify-between text-left outline-none"
                >
                  <h3
                    className={`text-[16px] sm:text-[17px] font-semibold m-0 transition-colors pr-6 ${
                      isOpen ? "text-black" : "text-gray-700 group-hover:text-black"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? activeIconColor 
                        : "bg-gray-50 border border-gray-200 text-gray-400 group-hover:text-black group-hover:border-gray-300 group-hover:bg-white"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-500 ease-in-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
                
                {/* FIX 1: Modern CSS Grid animation for 0-lag ultra-smooth accordion dropdown */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-6">
                      <p className="text-gray-500 text-[15px] font-medium leading-relaxed m-0 pr-4 sm:pr-12">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}