import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Webhook } from "lucide-react";

export default function ApiIntegrationsService() {
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
      name: "Basic Integration",
      price: "$99",
      description: "Perfect for connecting simple third-party tools like mailing lists or basic maps.",
      popular: false,
      buttonText: "Order Basic",
      features: [
        { name: "1 Third-party API Integration", included: true },
        { name: "Frontend Data Display", included: true },
        { name: "Secure API Key Storage", included: true },
        { name: "Basic Error Handling", included: true },
        { name: "Two-way Data Synchronisation", included: false },
        { name: "Complex Authentication (OAuth)", included: false },
        { name: "Payment Gateway Integration", included: false },
        { name: "Custom API Endpoint Creation", included: false },
        { name: "Comprehensive Documentation", included: false },
        { name: "30 Days Free Support", included: false },
      ]
    },
    {
      name: "Advanced Sync",
      price: "$249",
      description: "The ideal package for two-way data syncs, CRMs, and payment gateways.",
      popular: true,
      buttonText: "Order Advanced",
      features: [
        { name: "Up to 3 API Integrations", included: true },
        { name: "Frontend Data Display", included: true },
        { name: "Secure API Key Storage", included: true },
        { name: "Advanced Error Handling", included: true },
        { name: "Two-way Data Synchronisation", included: true },
        { name: "Complex Authentication (OAuth)", included: true },
        { name: "Payment Gateway Integration", included: true },
        { name: "Custom API Endpoint Creation", included: false },
        { name: "Comprehensive Documentation", included: false },
        { name: "30 Days Free Support", included: false },
      ]
    },
    {
      name: "Custom API Build",
      price: "$499",
      description: "A fully bespoke REST or GraphQL API engineered from scratch for your ecosystem.",
      popular: false,
      buttonText: "Go Premium",
      features: [
        { name: "Unlimited API Integrations", included: true },
        { name: "Frontend Data Display", included: true },
        { name: "Bank-grade Security Protocols", included: true },
        { name: "Advanced Error Handling", included: true },
        { name: "Real-time Data Synchronisation", included: true },
        { name: "Complex Authentication (OAuth)", included: true },
        { name: "Payment Gateway Integration", included: true },
        { name: "Custom REST/GraphQL Endpoints", included: true },
        { name: "Comprehensive Documentation", included: true },
        { name: "60 Days Priority Support", included: true },
      ]
    }
  ];

  return (
    <div className="min-h-dvh bg-[#030712] text-white font-jakarta pt-24 md:pt-28 pb-20 md:pb-24 overflow-hidden relative">
      
      {/* Deep Glow Background (Orange) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Enhanced Hero Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-24 max-w-4xl mx-auto">
          
          <h2 className="text-[12px] md:text-[13px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4 m-0 flex items-center justify-center gap-2">
            <Webhook className="w-4 h-4" /> Connectivity & Data
          </h2>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05] m-0 mb-4 md:mb-6 drop-shadow-2xl">
            Seamless API <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-orange-500 to-amber-500">
              Integrations
            </span>
          </h1>
          
          <p className="text-slate-400 text-[15px] sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            Connect your digital ecosystem effortlessly. We engineer secure, high-performance data bridges between your web apps and third-party services.
          </p>
        </div>

        {/* Pricing Slider (Mobile) & Grid (Desktop) */}
        <div className="relative max-w-7xl mx-auto">
          
          <div 
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pt-8 pb-4 md:pb-0 md:overflow-visible items-stretch [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            {packages.map((pkg, index) => (
              <div 
                key={index} 
                className={`w-[85vw] sm:w-[70vw] shrink-0 snap-center md:w-auto relative flex flex-col bg-[#0a0f1c] rounded-3xl md:rounded-4xl p-6 md:p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 h-full ${
                  pkg.popular 
                  ? "border border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.15)] bg-linear-to-b from-[#0a0f1c] to-[#1a1005] lg:scale-105 z-10" 
                  : "border border-white/5 hover:border-white/10 hover:shadow-2xl"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 bg-linear-to-r from-orange-600 to-amber-600 text-white text-[10px] md:text-[12px] font-black uppercase tracking-widest px-5 py-1.5 md:py-2 rounded-full shadow-[0_10px_20px_rgba(249,115,22,0.3)] border border-orange-400/30 whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                
                <h2 className="text-xl md:text-2xl font-black text-white m-0 mb-2 md:mb-3 tracking-tight">{pkg.name}</h2>
                <p className="text-slate-400 text-[14px] md:text-[15px] mb-6 md:mb-8 min-h-[40px] md:min-h-[48px] leading-relaxed">{pkg.description}</p>
                
                <div className="flex items-end gap-1 mb-6 md:mb-8">
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">{pkg.price}</span>
                  <span className="text-slate-500 font-bold text-[12px] md:text-sm mb-1">/project</span>
                </div>

                <div className="flex flex-col gap-3 md:gap-4 mb-8 md:mb-10 flex-grow">
                  <h2 className="text-[10px] md:text-[11px] font-black text-slate-500 uppercase tracking-widest m-0 mb-1 md:mb-2">
                    Top Features Included
                  </h2>
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                      {feature.included ? (
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-orange-400" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-red-500/10 transition-colors">
                          <X className="w-2.5 h-2.5 md:w-3 md:h-3 text-slate-600 group-hover:text-red-400 transition-colors" />
                        </div>
                      )}
                      <span className={`text-[13.5px] md:text-[15px] font-medium transition-colors ${feature.included ? 'text-slate-200 group-hover:text-white' : 'text-slate-600 line-through group-hover:text-slate-500'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/923347835980?text=Hi%20Rafay!%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20API%20Integrations%20package%20for%20${pkg.price}.`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full mt-auto flex items-center justify-center gap-2 py-3.5 md:py-4 rounded-xl text-[14px] md:text-[15px] font-bold transition-all duration-300 ${
                    pkg.popular 
                    ? "bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]" 
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/5"
                  }`}
                >
                  {pkg.buttonText} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-2 md:hidden">
            {packages.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 outline-none ${
                  activeSlide === index 
                  ? "w-6 bg-orange-500" 
                  : "w-2 bg-white/20 hover:bg-white/40"
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