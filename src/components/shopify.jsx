import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight, ShoppingBag } from "lucide-react";

export default function ShopifyService() {
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
      name: "Starter Store",
      price: "$115",
      description: "Perfect for new merchants looking to launch their first e-commerce store quickly.",
      popular: false,
      buttonText: "Order Starter",
      features: [
        { name: "Premium Theme Setup", included: true },
        { name: "Responsive Mobile UI", included: true },
        { name: "Up to 20 Products Added", included: true },
        { name: "Basic App Integrations", included: true },
        { name: "Custom Liquid Coding", included: false },
        { name: "Advanced SEO Optimisation", included: false },
        { name: "Abandoned Cart Setup", included: false },
        { name: "Custom Checkout Styling", included: false },
        { name: "Wholesale/B2B Features", included: false },
        { name: "30 Days Free Support", included: false },
      ]
    },
    {
      name: "Growth Store",
      price: "$135",
      description: "The ideal package for growing brands needing a highly customised shopping experience.",
      popular: true,
      buttonText: "Order Growth",
      features: [
        { name: "Premium Theme Setup", included: true },
        { name: "Responsive Mobile UI", included: true },
        { name: "Up to 50 Products Added", included: true },
        { name: "Advanced App Integrations", included: true },
        { name: "Custom Liquid Coding", included: true },
        { name: "Advanced SEO Optimisation", included: true },
        { name: "Abandoned Cart Setup", included: true },
        { name: "Custom Checkout Styling", included: false },
        { name: "Wholesale/B2B Features", included: false },
        { name: "30 Days Free Support", included: false },
      ]
    },
    {
      name: "Custom Liquid Store",
      price: "$150",
      description: "A fully bespoke, high-converting Shopify storefront engineered for maximum sales.",
      popular: false,
      buttonText: "Go Premium",
      features: [
        { name: "Fully Custom Theme Build", included: true },
        { name: "Responsive Mobile UI", included: true },
        { name: "Unlimited Products Setup", included: true },
        { name: "Advanced App Integrations", included: true },
        { name: "Complex Liquid Coding", included: true },
        { name: "Advanced SEO Optimisation", included: true },
        { name: "Abandoned Cart Setup", included: true },
        { name: "Custom Checkout Styling", included: true },
        { name: "Wholesale/B2B Features", included: true },
        { name: "30 Days Free Support", included: true },
      ]
    }
  ];

  return (
    <div className="min-h-dvh bg-[#030712] text-white font-jakarta pt-24 md:pt-28 pb-20 md:pb-24 overflow-hidden relative">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="flex flex-col items-center text-center mb-12 md:mb-24 max-w-4xl mx-auto">
          
          <h2 className="text-[12px] md:text-[13px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4 m-0 flex items-center justify-center gap-2">
            <ShoppingBag className="w-4 h-4" /> E-Commerce Solutions
          </h2>
          
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05] m-0 mb-4 md:mb-6 drop-shadow-2xl">
            High-Converting <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-emerald-500 to-teal-500">
              Shopify Stores
            </span>
          </h2>
          
          <p className="text-slate-400 text-[15px] sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            Bespoke storefronts, custom Liquid coding, and powerful app integrations designed to scale your e-commerce brand.
          </p>
        </div>

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
                  ? "border border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.15)] bg-linear-to-b from-[#0a0f1c] to-[#0a1711] lg:scale-105 z-10" 
                  : "border border-white/5 hover:border-white/10 hover:shadow-2xl"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 bg-linear-to-r from-emerald-600 to-teal-600 text-white text-[10px] md:text-[12px] font-black uppercase tracking-widest px-5 py-1.5 md:py-2 rounded-full shadow-[0_10px_20px_rgba(16,185,129,0.3)] border border-emerald-400/30 whitespace-nowrap">
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
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-400" />
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
                  href={`https://wa.me/923347835980?text=Hi%20Rafay!%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20Shopify%20package%20for%20${pkg.price}.`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full mt-auto flex items-center justify-center gap-2 py-3.5 md:py-4 rounded-xl text-[14px] md:text-[15px] font-bold transition-all duration-300 ${
                    pkg.popular 
                    ? "bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
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
                  ? "w-6 bg-emerald-500" 
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