"use client";
import React, { useEffect, useState, useRef } from "react";
import { Check, X, ArrowRight, Smartphone } from "lucide-react";

// Scroll-Triggered Typewriter Effect for Heading (Zero Layout Shift & ESLint Fixed)
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

    return () => {
      clearTimeout(startTimeout);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [hasStarted, text]);

  const lines = displayedText.split("\n");
  const fullLines = text.split("\n");

  const headingClasses =
    "text-4xl sm:text-5xl lg:text-[4rem] font-medium tracking-tight text-black leading-[1.05] select-none cursor-default w-full m-0 text-center";

  return (
    <div
      ref={headingRef}
      className="min-h-[100px] sm:min-h-[140px] lg:min-h-[150px] flex items-center justify-center mb-4 w-full relative"
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

export default function MobileAppsService() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollPosition = sliderRef.current.scrollLeft;
    const slideWidth = sliderRef.current.offsetWidth;
    const currentIndex = Math.round(scrollPosition / slideWidth);
    setActiveSlide(currentIndex);
  };

  const scrollToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.offsetWidth * index,
        behavior: "smooth",
      });
    }
  };

  const packages = [
    {
      name: "MVP App Build",
      price: "$399",
      description:
        "Perfect for startups needing a minimum viable product to test their app idea.",
      popular: false,
      buttonText: "Order MVP",
      features: [
        { name: "Cross-Platform (iOS & Android)", included: true },
        { name: "Up to 5 Core Screens", included: true },
        { name: "Standard UI/UX Design", included: true },
        { name: "Basic API Integration", included: true },
        { name: "Push Notifications", included: false },
        { name: "Complex Animations", included: false },
        { name: "Payment Gateway Setup", included: false },
        { name: "Custom Admin Dashboard", included: false },
        { name: "App Store Deployment", included: false },
        { name: "30 Days Free Support", included: false },
      ],
    },
    {
      name: "Standard Business",
      price: "$699",
      description:
        "The ideal package for growing businesses needing a robust mobile experience.",
      popular: true,
      buttonText: "Order Standard",
      features: [
        { name: "Cross-Platform (iOS & Android)", included: true },
        { name: "Up to 15 Core Screens", included: true },
        { name: "Premium UI/UX Design", included: true },
        { name: "Advanced API Integration", included: true },
        { name: "Push Notifications", included: true },
        { name: "Complex Animations", included: false },
        { name: "Payment Gateway Setup", included: true },
        { name: "Custom Admin Dashboard", included: true },
        { name: "App Store Deployment", included: true },
        { name: "30 Days Free Support", included: false },
      ],
    },
    {
      name: "Enterprise Native",
      price: "$999",
      description:
        "A fully bespoke, high-performance mobile application engineered for scale.",
      popular: false,
      buttonText: "Go Premium",
      features: [
        { name: "Cross-Platform (iOS & Android)", included: true },
        { name: "Unlimited Screens & Logic", included: true },
        { name: "Bespoke UI/UX Design", included: true },
        { name: "Advanced API Integration", included: true },
        { name: "Push Notifications", included: true },
        { name: "Complex Animations", included: true },
        { name: "Payment Gateway Setup", included: true },
        { name: "Custom Admin Dashboard", included: true },
        { name: "App Store Deployment", included: true },
        { name: "60 Days Priority Support", included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-jakarta pt-24 sm:pt-32 pb-20 md:pb-24 overflow-hidden relative">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Subtle Top Gradient - Syncs with rest of site */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 shadow-sm mb-6">
            {/* Using Google Green (#34A853) for Mobile Apps accent to match the Services page icon */}
            <Smartphone className="w-4 h-4 text-[#34A853]" />
            <h2 className="text-[11px] sm:text-[12px] font-extrabold text-gray-500 uppercase tracking-[0.2em] m-0">
              Application Engineering
            </h2>
          </div>

          <TypewriterHeading text={"Custom Mobile\nApp Development"} />

          <p className="text-gray-500 text-[15px] sm:text-[17px] leading-relaxed max-w-2xl mx-auto font-medium m-0">
            High-performance, bespoke iOS and Android applications engineered to
            deliver seamless user experiences and scale your business.
          </p>
        </div>

        {/* Pricing Slider/Grid */}
        <div className="relative max-w-[1100px] mx-auto">
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pt-4 pb-4 md:pb-0 md:overflow-visible items-stretch [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`w-[85vw] sm:w-[70vw] shrink-0 snap-center md:w-auto relative flex flex-col bg-white border border-gray-200 rounded-[32px] p-6 md:p-8 transition-all duration-500 hover:-translate-y-1.5 outline-none h-full overflow-hidden ${
                  pkg.popular
                    ? "shadow-[0_12px_40px_-15px_rgba(0,0,0,0.1)] lg:scale-105 z-10"
                    : "hover:shadow-md hover:border-gray-300"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-[#4285F4]" />
                )}

                {pkg.popular && (
                  <div className="mb-4">
                    <span className="inline-flex px-3 py-1 rounded-full bg-[#4285F4]/10 text-[#4285F4] text-[10px] font-bold uppercase tracking-wider m-0">
                      Most Popular
                    </span>
                  </div>
                )}

                <h2
                  className={`text-xl md:text-2xl font-bold text-black m-0 mb-3 tracking-tight ${!pkg.popular && "mt-4"}`}
                >
                  {pkg.name}
                </h2>
                <p className="text-gray-500 font-medium text-[14px] md:text-[15px] mb-8 min-h-[40px] md:min-h-[48px] leading-relaxed m-0">
                  {pkg.description}
                </p>

                <div className="flex items-end gap-1 mb-8 border-b border-gray-100 pb-8">
                  <span className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-none m-0">
                    {pkg.price}
                  </span>
                  <span className="text-gray-400 font-bold text-[12px] md:text-sm mb-1 m-0">
                    /project
                  </span>
                </div>

                <div className="flex flex-col gap-3 md:gap-4 mb-10 md:mb-12 flex-grow">
                  <h2 className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest m-0 mb-1">
                    Top Features Included
                  </h2>
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3.5 group">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-[#4285F4]/10 flex items-center justify-center shrink-0">
                          <Check
                            className="w-3 h-3 text-[#4285F4]"
                            strokeWidth={3}
                          />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#EA4335]/10 transition-colors">
                          <X
                            className="w-3 h-3 text-gray-300 group-hover:text-[#EA4335] transition-colors"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                      <span
                        className={`text-[14px] md:text-[15px] font-medium transition-colors m-0 ${
                          feature.included
                            ? "text-black"
                            : "text-gray-400 line-through group-hover:text-gray-500"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/923347835980?text=Hi%20Rafay!%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20Mobile%20Apps%20package%20for%20${pkg.price}.`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full mt-auto flex items-center justify-center gap-2 py-4 rounded-xl text-[14.5px] font-bold transition-all duration-300 outline-none active:scale-[0.98] group/btn ${
                    pkg.popular
                      ? "bg-[#4285F4] hover:bg-blue-600 text-white shadow-sm"
                      : "bg-[#111827] hover:bg-black text-white shadow-sm"
                  }`}
                >
                  {pkg.buttonText}
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>

          {/* Mobile Slider Indicators */}
          <div className="flex justify-center items-center gap-2 mt-4 md:hidden">
            {packages.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 outline-none ${
                  activeSlide === index
                    ? "w-6 bg-[#4285F4]"
                    : "w-2 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
