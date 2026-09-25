import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Zap, Shield, Smartphone } from "lucide-react";

export default function MernStackService() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      name: "Basic Prototype",
      price: "$149",
      description: "Perfect for startups needing a quick MVP to test their idea.",
      popular: false,
      buttonText: "Order Basic",
      features: [
        { name: "Up to 3 Custom Pages", included: true },
        { name: "Responsive React UI", included: true },
        { name: "Basic Form Integration", included: true },
        { name: "7 Days Delivery", included: true },
        { name: "Node.js & MongoDB Backend", included: false },
        { name: "User Authentication", included: false },
        { name: "Custom Admin Dashboard", included: false },
        { name: "Payment Gateway Setup", included: false },
        { name: "Advanced Technical SEO", included: false },
        { name: "30 Days Free Support", included: false },
      ]
    },
    {
      name: "Standard Business",
      price: "$349",
      description: "The ideal package for growing businesses needing a robust platform.",
      popular: true,
      buttonText: "Order Standard",
      features: [
        { name: "Up to 8 Custom Pages", included: true },
        { name: "Responsive React UI", included: true },
        { name: "Advanced Form Integration", included: true },
        { name: "14 Days Delivery", included: true },
        { name: "Node.js & MongoDB Backend", included: true },
        { name: "User Authentication", included: true },
        { name: "Custom Admin Dashboard", included: true },
        { name: "Payment Gateway Setup", included: false },
        { name: "Advanced Technical SEO", included: false },
        { name: "30 Days Free Support", included: false },
      ]
    },
    {
      name: "Premium Enterprise",
      price: "$599",
      description: "A fully bespoke, high-performance web application ready to scale.",
      popular: false,
      buttonText: "Go Premium",
      features: [
        { name: "Unlimited Pages", included: true },
        { name: "Responsive React UI", included: true },
        { name: "Complex Custom Logic", included: true },
        { name: "Priority Delivery", included: true },
        { name: "Node.js & MongoDB Backend", included: true },
        { name: "User Authentication & Roles", included: true },
        { name: "Custom Admin Dashboard", included: true },
        { name: "Payment Gateway Setup", included: true },
        { name: "Advanced Technical SEO", included: true },
        { name: "30 Days Free Support", included: true },
      ]
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto items-start">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col bg-[#0a0f1c] rounded-3xl p-8 transition-all duration-300 ${
                pkg.popular 
                ? "border-2 border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.15)] md:-translate-y-4" 
                : "border border-white/5 hover:border-white/10 hover:bg-[#0f1629]"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-blue-600 to-blue-400 text-white text-[11px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-white m-0 mb-3">{pkg.name}</h2>
              <p className="text-slate-400 text-sm mb-6 min-h-[40px] leading-relaxed">{pkg.description}</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-white tracking-tight">{pkg.price}</span>
                <span className="text-slate-500 font-medium">/project</span>
              </div>

              <a
                href={`https://wa.me/923347835980?text=Hi%20Rafay!%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20MERN%20Stack%20package%20for%20${pkg.price}.`}
                target="_blank"
                rel="noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all mb-10 ${
                  pkg.popular 
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]" 
                  : "bg-white/5 hover:bg-white/10 text-white border border-white/5"
                }`}
              >
                {pkg.buttonText} <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex flex-col gap-4">
                <h2 className="text-[11px] font-black text-slate-500 uppercase tracking-widest m-0 mb-2">
                  Top Features Included
                </h2>
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-800/50 flex items-center justify-center shrink-0">
                        <X className="w-3.5 h-3.5 text-slate-600" />
                      </div>
                    )}
                    <span className={`text-[15px] font-medium ${feature.included ? 'text-slate-200' : 'text-slate-600 line-through'}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto bg-linear-to-br from-[#0a0f1c] to-[#030712] border border-[#3b82f6]/20 p-8 sm:p-12 rounded-4xl shadow-[0_0_50px_rgba(59,130,246,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-4 m-0">Need a custom solution?</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              If your project requires specific integrations or falls outside these packages, let's have a chat. I can craft a bespoke proposal engineered exactly to your business logic.
            </p>
            <a
              href="https://wa.me/923347835980?text=Hi%20Rafay!%20I%20need%20a%20custom%20quote%20for%20my%20web%20project."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#1e293b] hover:bg-white/10 text-white font-bold transition-all border border-white/5"
            >
              Chat on WhatsApp
            </a>
          </div>
          <div className="flex flex-col justify-center gap-6 p-8 bg-[#030712]/80 backdrop-blur-md rounded-3xl border border-white/5 relative z-10">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/20">
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg m-0 mb-1">Highly Optimised</h2>
                  <p className="text-slate-400 text-[15px] m-0 leading-snug">Built with top-tier security and performance standards.</p>
                </div>
             </div>
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 border border-purple-500/20">
                  <Smartphone className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg m-0 mb-1">Device Agnostic</h2>
                  <p className="text-slate-400 text-[15px] m-0 leading-snug">Flawless functionality across all browsers and devices.</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}