import React, { useState, useEffect } from "react";
import {
  Calculator,
  Check,
  Search,
  PenBox,
  CreditCard,
  Zap,
  Clock,
  Sparkles,
} from "lucide-react";
// Official Real Icons for Services & Buttons
import {
  Wordpress,
  Shopify,
  React as ReactIcon,
  Flutter,
  Figma,
  Adobe,
  Whatsapp,
  Gmail,
} from "@thesvg/react";

export default function ProjectCalculator() {
  const [selectedService, setSelectedService] = useState(0);
  const [selectedScope, setSelectedScope] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const services = [
    {
      id: 0,
      name: "WordPress Site",
      basePrice: 100,
      icon: <Wordpress className="w-8 h-8" />,
      desc: "Custom themes & premium plugins",
    },
    {
      id: 1,
      name: "Shopify Store",
      basePrice: 150,
      icon: <Shopify className="w-8 h-8" />,
      desc: "High-converting e-commerce build",
    },
    {
      id: 2,
      name: "MERN Stack Web App",
      basePrice: 299,
      icon: <ReactIcon className="w-8 h-8" />,
      desc: "React, Node, & MongoDB solutions",
    },
    {
      id: 3,
      name: "Mobile App Build",
      basePrice: 399,
      icon: <Flutter className="w-8 h-8 text-cyan-400" />,
      desc: "Cross-platform iOS & Android",
    },
    {
      id: 4,
      name: "UI/UX Prototyping",
      basePrice: 199,
      icon: <Figma className="w-8 h-8" />,
      desc: "Bespoke Figma design system",
    },
    {
      id: 5,
      name: "Full Branding",
      basePrice: 1499,
      icon: <Adobe className="w-8 h-8 text-red-500" />,
      desc: "0-to-100 brand identity & web",
    },
  ];

  const scopes = [
    {
      id: 0,
      name: "Basic / MVP",
      price: 0,
      desc: "Essential core features, up to 5 custom pages/screens.",
      time: "1 - 2 Weeks",
    },
    {
      id: 1,
      name: "Standard Business",
      price: 150,
      desc: "Advanced logic, API integrations, up to 10 pages/screens.",
      time: "3 - 4 Weeks",
    },
    {
      id: 2,
      name: "Enterprise Custom",
      price: 400,
      desc: "Complex architecture, unlimited scalability & custom admin.",
      time: "6+ Weeks",
    },
  ];

  const addons = [
    {
      id: "seo",
      name: "Advanced SEO Optimisation",
      price: 50,
      icon: <Search className="w-4 h-4 text-blue-400" />,
      desc: "Technical & On-page SEO setup",
    },
    {
      id: "content",
      name: "Professional Copywriting",
      price: 80,
      icon: <PenBox className="w-4 h-4 text-indigo-400" />,
      desc: "Conversion-focused web copy",
    },
    {
      id: "payment",
      name: "Payment Gateway Setup",
      price: 50,
      icon: <CreditCard className="w-4 h-4 text-emerald-400" />,
      desc: "Stripe, PayPal, or custom APIs",
    },
    {
      id: "rush",
      name: "Fast-Track Delivery",
      price: 150,
      icon: <Zap className="w-4 h-4 text-orange-400" />,
      desc: "Jump to the front of the queue",
    },
  ];

  useEffect(() => {
    let total =
      services[selectedService].basePrice + scopes[selectedScope].price;
    selectedAddons.forEach((addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      if (addon) total += addon.price;
    });
    setTotalPrice(total);
  }, [selectedService, selectedScope, selectedAddons]);

  const handleAddonToggle = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((addonId) => addonId !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const generateMessage = () => {
    const serviceName = services[selectedService].name;
    const scopeName = scopes[selectedScope].name;
    const estimatedTime = scopes[selectedScope].time;
    const addonNames =
      selectedAddons.length > 0
        ? selectedAddons
            .map((id) => addons.find((a) => a.id === id).name)
            .join(", ")
        : "None selected";

    return `Hello Rafay! 👋\n\nI just used the CodeLume Project Calculator and would like to discuss my project details:\n\n*📌 Core Service:* ${serviceName}\n*📐 Project Scope:* ${scopeName}\n*⏱ Estimated Timeline:* ${estimatedTime}\n*✨ Selected Add-ons:* ${addonNames}\n\n*💰 Estimated Total:* $${totalPrice} USD\n\nPlease let me know when we can schedule a quick consultation. Thanks!`;
  };

  const waLink = `https://wa.me/923347835980?text=${encodeURIComponent(generateMessage())}`;
  const emailLink = `mailto:hello@codelume.online?subject=${encodeURIComponent("New Project Inquiry via CodeLume Calculator")}&body=${encodeURIComponent(generateMessage())}`;

  return (
    <section className="bg-[#030712] text-white font-jakarta py-24 relative">
      {/* Background glow isolated */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] mb-6 backdrop-blur-md">
            <Calculator className="w-4 h-4 text-blue-500" />
            <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0">
              Transparent Pricing
            </h2>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] m-0 drop-shadow-lg mb-6">
            Interactive Cost <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-blue-500 to-indigo-400">
              Estimator
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Get an instant, no-obligation estimate for your next bespoke digital
            project. Customised exactly to your business logic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start relative">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  1
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white m-0">
                    Core Service Category
                  </h2>
                  <p className="text-[13px] text-slate-400 m-0 mt-1">
                    Select the primary technology or service you need.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedService(service.id)}
                    className={`flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300 outline-none relative overflow-hidden group ${
                      selectedService === service.id
                        ? "bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.15)] -translate-y-1"
                        : "bg-[#0a0f1c] border-white/5 hover:border-white/10 hover:bg-[#0f172a]"
                    }`}
                  >
                    {selectedService === service.id && (
                      <div className="absolute top-0 right-0 p-2">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                      </div>
                    )}
                    <div
                      className={`mb-4 p-3 rounded-xl transition-colors duration-300 ${selectedService === service.id ? "bg-blue-500/20" : "bg-white/5 group-hover:bg-white/10"}`}
                    >
                      {service.icon}
                    </div>
                    <h2 className="text-[16px] font-extrabold text-white m-0 tracking-tight mb-1">
                      {service.name}
                    </h2>
                    <p className="text-[12.5px] text-slate-400 m-0 leading-snug">
                      {service.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  2
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white m-0">
                    Project Scope & Size
                  </h2>
                  <p className="text-[13px] text-slate-400 m-0 mt-1">
                    How big and complex is your project going to be?
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {scopes.map((scope, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedScope(scope.id)}
                    className={`flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300 outline-none ${
                      selectedScope === scope.id
                        ? "bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.15)] -translate-y-1"
                        : "bg-[#0a0f1c] border-white/5 hover:border-white/10 hover:bg-[#0f172a]"
                    }`}
                  >
                    <h2 className="text-[17px] font-extrabold text-white mb-2 m-0 tracking-tight">
                      {scope.name}
                    </h2>
                    <p className="text-[13px] text-slate-400 m-0 leading-relaxed mb-4">
                      {scope.desc}
                    </p>
                    <div className="mt-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-bold text-slate-300">
                      <Clock className="w-3 h-3 text-blue-400" /> {scope.time}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  3
                </span>
                <div>
                  <h2 className="text-xl font-bold text-white m-0">
                    Premium Enhancements
                  </h2>
                  <p className="text-[13px] text-slate-400 m-0 mt-1">
                    Optional add-ons to boost your digital presence.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => handleAddonToggle(addon.id)}
                      className={`flex flex-col p-4 rounded-2xl border text-left transition-all duration-300 outline-none ${
                        isSelected
                          ? "bg-blue-500/10 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.1)] -translate-y-1"
                          : "bg-[#0a0f1c] border-white/5 hover:border-white/10 hover:bg-[#0f172a]"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center justify-center w-5 h-5 rounded-md border ${isSelected ? "bg-blue-500 border-blue-500" : "bg-[#030712] border-white/20"}`}
                          >
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-white" />
                            )}
                          </div>
                          <h2 className="text-[15px] font-bold text-white m-0 flex items-center gap-2">
                            {addon.icon} {addon.name}
                          </h2>
                        </div>
                        <span className="text-[13px] font-extrabold text-blue-400">
                          +${addon.price}
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-400 m-0 pl-8">
                        {addon.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 h-full">
            <div className="sticky top-32 bg-linear-to-b from-[#0a0f1c] to-[#050b14] border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(59,130,246,0.05)] transition-all duration-500 z-20">
              <h2 className="text-[12px] font-black text-blue-500 uppercase tracking-[0.2em] mb-6 m-0 flex items-center gap-2">
                <Calculator className="w-4 h-4" /> Live Estimate
              </h2>

              <div className="flex items-end gap-2 mb-8">
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter leading-none">
                  ${totalPrice}
                </span>
                <span className="text-slate-500 font-extrabold text-sm mb-1.5 uppercase tracking-widest">
                  USD
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-[14px] text-slate-400">
                    Base Service
                  </span>
                  <h2 className="text-[14px] font-bold text-white m-0 text-right">
                    {services[selectedService].name}
                  </h2>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-[14px] text-slate-400">
                    Project Size
                  </span>
                  <h2 className="text-[14px] font-bold text-white m-0 text-right">
                    {scopes[selectedScope].name}
                  </h2>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-[14px] text-slate-400">
                    Est. Timeline
                  </span>
                  <h2 className="text-[14px] font-bold text-blue-400 m-0 text-right">
                    {scopes[selectedScope].time}
                  </h2>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="flex flex-col gap-3 pt-2">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">
                      Included Add-ons
                    </span>
                    {selectedAddons.map((id) => {
                      const addon = addons.find((a) => a.id === id);
                      return (
                        <div
                          key={id}
                          className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg border border-white/5"
                        >
                          <h2 className="text-[12.5px] font-bold text-slate-200 flex items-center gap-2 m-0">
                            <Check className="w-3.5 h-3.5 text-blue-400" />{" "}
                            {addon.name}
                          </h2>
                          <span className="text-[12.5px] font-bold text-slate-400">
                            +${addon.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Order Buttons */}
              <div className="flex flex-col gap-3">
                {/* Official WhatsApp Wordmark Button with Original Colors on Dark BG */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="relative flex items-center justify-center w-full px-6 py-4 rounded-xl bg-[#0a0f1c] border border-white/10 hover:border-[#25D366]/50 transition-all duration-300 hover:-translate-y-1 outline-none"
                >
                  <Whatsapp variant="wordmark" className="h-6 w-auto" />
                </a>

                {/* Official Gmail Logo Button */}
                <a
                  href={emailLink}
                  target="_blank"
                  rel="noreferrer"
                  className="relative flex items-center justify-center gap-2.5 w-full px-6 py-4 rounded-xl bg-[#0a0f1c] border border-white/10 hover:border-red-500/50 text-slate-300 hover:text-white font-bold transition-all duration-300 hover:-translate-y-1 outline-none"
                >
                  <Gmail className="h-5 w-5" />
                  Order via Email
                </a>
              </div>

              <p className="text-[11px] text-slate-500 text-center mt-5 leading-relaxed px-2">
                No commitment required. We will review your selections and
                confirm the final timeline and scope before starting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
