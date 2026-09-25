import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Zap, Shield, Smartphone } from "lucide-react";
import { Whatsapp } from '@thesvg/react';

export default function MernStackService() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      name: "Basic Prototype",
      price: "$149",
      description: "Perfect for startups needing a quick MVP to test their idea.",
      features: [
        "Single Page Application (SPA)",
        "Up to 3 Core Pages",
        "Basic MongoDB Setup",
        "Responsive Mobile Design",
        "7 Days Delivery"
      ],
      popular: false,
      buttonText: "Start Basic"
    },
    {
      name: "Standard Business",
      price: "$349",
      description: "The ideal package for growing businesses needing a robust platform.",
      features: [
        "Full MERN Stack Setup",
        "Up to 8 Custom Pages",
        "Advanced Database Architecture",
        "Admin Dashboard Setup",
        "Basic On-Page SEO",
        "14 Days Delivery"
      ],
      popular: true,
      buttonText: "Order Standard"
    },
    {
      name: "Premium Enterprise",
      price: "$599",
      description: "A fully bespoke, high-performance web application ready to scale.",
      features: [
        "Complex Custom Functionality",
        "Unlimited Pages",
        "Third-Party API Integrations",
        "Payment Gateway Integration",
        "Advanced Technical SEO",
        "30 Days Support Included",
        "Priority Delivery"
      ],
      popular: false,
      buttonText: "Go Premium"
    }
  ];

  return (
    <div className="min-h-dvh bg-[#030712] text-white font-jakarta pt-28 pb-24 overflow-hidden relative">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="flex flex-col items-center text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 backdrop-blur-md">
            <Zap className="w-4 h-4" />
            <h2 className="text-[12px] font-black uppercase tracking-[0.2em] m-0">
              Full-Stack Engineering
            </h2>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] m-0 mb-6">
            Custom MERN Stack <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              Web Applications
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Fast, secure, and highly scalable JavaScript solutions tailored to your unique business logic. Choose a package below to kickstart your project immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-6xl mx-auto items-center">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col bg-[#0a0f1c] rounded-3xl p-8 transition-all duration-300 ${
                pkg.popular 
                ? "border-2 border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.2)] md:-translate-y-4" 
                : "border border-white/10 hover:border-white/20"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <h2 className="text-xl font-bold text-white m-0 mb-2">{pkg.name}</h2>
              <p className="text-slate-400 text-sm mb-6 min-h-[40px]">{pkg.description}</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-white">{pkg.price}</span>
              </div>

              <a
                href={`https://wa.me/1234567890?text=Hi Rafay! I am interested in the ${pkg.name} MERN Stack package for ${pkg.price}.`}
                target="_blank"
                rel="noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all mb-8 ${
                  pkg.popular 
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg" 
                  : "bg-white/5 hover:bg-white/10 text-white"
                }`}
              >
                {pkg.buttonText} <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex flex-col gap-4">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest m-0 mb-2">
                  What is included
                </h2>
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto bg-[#0a0f1c]/50 border border-white/5 p-8 sm:p-12 rounded-3xl">
          <div>
            <h2 className="text-3xl font-black text-white mb-4 m-0">Still not sure?</h2>
            <p className="text-slate-400 mb-8">
              Let's have a quick chat about your requirements. I am available to provide a custom quote tailored exactly to your business needs.
            </p>
            <a
              href="mailto:your.email@example.com"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10"
            >
              Email Me Directly
            </a>
          </div>
          <div className="flex flex-col justify-center gap-6 p-6 bg-[#030712] rounded-2xl border border-white/5">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-white font-bold m-0">Secure Codebase</h2>
                  <p className="text-slate-500 text-sm m-0">Built with top-tier security standards.</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-white font-bold m-0">Fully Responsive</h2>
                  <p className="text-slate-500 text-sm m-0">Flawless functionality across all devices.</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}