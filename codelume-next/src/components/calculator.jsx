"use client";
import React, { useState, useEffect, useRef } from "react";
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
  }, [text, hasStarted]);

  const lines = displayedText.split("\n");

  return (
    <div
      ref={headingRef}
      className="min-h-[100px] sm:min-h-[120px] lg:min-h-[130px] flex items-start justify-center mb-6 w-full"
    >
      <h2 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-medium text-black tracking-tight leading-[1.1] m-0 w-full text-center">
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            <span className={idx === 1 ? "text-gray-400" : ""}>{line}</span>
            {idx !== lines.length - 1 && <br className="hidden sm:block" />}
          </React.Fragment>
        ))}
        <span
          className="inline-block w-[3px] h-[0.8em] ml-1.5 animate-[pulse_1s_ease-in-out_infinite] align-middle translate-y-[-4px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, #4285F4, #34A853, #FBBC05, #EA4335)",
          }}
        ></span>
      </h2>
    </div>
  );
};

export default function ProjectCalculator() {
  const [selectedService, setSelectedService] = useState(0);
  const [selectedScope, setSelectedScope] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const services = [
    {
      id: 0,
      name: "WordPress Site",
      basePrice: 100,
      icon: <Wordpress className="w-8 h-8 text-[#4285F4]" />,
      hex: "#4285F4",
      desc: "Custom themes & premium plugins",
    },
    {
      id: 1,
      name: "Shopify Store",
      basePrice: 150,
      icon: <Shopify className="w-8 h-8 text-[#34A853]" />,
      hex: "#34A853",
      desc: "High-converting e-commerce build",
    },
    {
      id: 2,
      name: "MERN Stack Web App",
      basePrice: 299,
      icon: <ReactIcon className="w-8 h-8 text-[#FBBC05]" />,
      hex: "#FBBC05",
      desc: "React, Node, & MongoDB solutions",
    },
    {
      id: 3,
      name: "Mobile App Build",
      basePrice: 399,
      icon: <Flutter className="w-8 h-8 text-[#EA4335]" />,
      hex: "#EA4335",
      desc: "Cross-platform iOS & Android",
    },
    {
      id: 4,
      name: "UI/UX Prototyping",
      basePrice: 199,
      icon: <Figma className="w-8 h-8 text-[#4285F4]" />,
      hex: "#4285F4",
      desc: "Bespoke Figma design system",
    },
    {
      id: 5,
      name: "Full Branding",
      basePrice: 1499,
      icon: <Adobe className="w-8 h-8 text-[#EA4335]" />,
      hex: "#EA4335",
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
      icon: <Search className="w-4 h-4 text-[#4285F4]" />,
      desc: "Technical & On-page SEO setup",
    },
    {
      id: "content",
      name: "Professional Copywriting",
      price: 80,
      icon: <PenBox className="w-4 h-4 text-[#34A853]" />,
      desc: "Conversion-focused web copy",
    },
    {
      id: "payment",
      name: "Payment Gateway Setup",
      price: 50,
      icon: <CreditCard className="w-4 h-4 text-[#FBBC05]" />,
      desc: "Stripe, PayPal, or custom APIs",
    },
    {
      id: "rush",
      name: "Fast-Track Delivery",
      price: 150,
      icon: <Zap className="w-4 h-4 text-[#EA4335]" />,
      desc: "Jump to the front of the queue",
    },
  ];

  // ✅ FIX: Removed useEffect & useState for totalPrice.
  // Calculating derived state directly during render (Best Practice in React).
  const totalPrice =
    services[selectedService].basePrice +
    scopes[selectedScope].price +
    selectedAddons.reduce((sum, id) => {
      const addon = addons.find((a) => a.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);

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
    <section className="bg-white font-jakarta py-24 sm:py-32 relative border-t border-gray-100 overflow-visible">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <Calculator className="w-3.5 h-3.5 text-gray-500" />
            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] m-0">
              Transparent Pricing
            </h2>
          </div>

          <TypewriterHeading text={"Interactive Cost\nEstimator."} />

          <p className="text-[#4B5563] font-medium text-[15px] sm:text-[16px] leading-relaxed max-w-2xl m-0">
            Get an instant, no-obligation estimate for your next bespoke digital
            project. Customized exactly to your business logic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 relative max-w-[1300px] mx-auto items-start">
          {/* Left Column (Forms) */}
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-white rounded-[32px] border border-gray-200 p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-black text-sm font-bold border border-gray-200">
                  1
                </span>
                <div>
                  <h2 className="text-[20px] font-semibold text-black m-0 tracking-tight">
                    Core Service Category
                  </h2>
                  <p className="text-[14px] text-gray-500 font-medium m-0 mt-1">
                    Select the primary technology or service you need.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {services.map((service, index) => {
                  const isSelected = selectedService === service.id;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedService(service.id)}
                      className={`group flex flex-col items-start p-6 rounded-2xl border text-left transition-all duration-300 outline-none relative overflow-hidden ${
                        isSelected
                          ? "bg-white border-[#4285F4] shadow-[0_8px_20px_rgba(66,133,244,0.12)] -translate-y-1"
                          : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm"
                      }`}
                    >
                      {isSelected && (
                        <div
                          className="absolute inset-0 opacity-10 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at top right, ${service.hex}, transparent 70%)`,
                          }}
                        />
                      )}

                      <div className="mb-6 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        {service.icon}
                      </div>

                      <h2 className="text-[16px] font-semibold text-black tracking-tight mb-1 relative z-10">
                        {service.name}
                      </h2>
                      <p className="text-[13px] text-gray-500 font-medium m-0 leading-relaxed relative z-10 pr-2">
                        {service.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-200 p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-black text-sm font-bold border border-gray-200">
                  2
                </span>
                <div>
                  <h2 className="text-[20px] font-semibold text-black m-0 tracking-tight">
                    Project Scope & Size
                  </h2>
                  <p className="text-[14px] text-gray-500 font-medium m-0 mt-1">
                    How big and complex is your project going to be?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {scopes.map((scope, index) => {
                  const isSelected = selectedScope === scope.id;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedScope(scope.id)}
                      className={`flex flex-col items-start p-6 rounded-2xl border text-left transition-all duration-300 outline-none ${
                        isSelected
                          ? "bg-white border-[#4285F4] shadow-[0_8px_20px_rgba(66,133,244,0.12)] -translate-y-1"
                          : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm"
                      }`}
                    >
                      <h2
                        className={`text-[17px] font-semibold tracking-tight mb-2 ${isSelected ? "text-[#4285F4]" : "text-black"}`}
                      >
                        {scope.name}
                      </h2>
                      <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-6">
                        {scope.desc}
                      </p>
                      <div
                        className={`mt-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-[11px] font-bold transition-colors ${
                          isSelected
                            ? "bg-[#F0F7FF] border-[#4285F4]/30 text-[#4285F4]"
                            : "bg-white border-gray-200 text-gray-500"
                        }`}
                      >
                        <Clock className="w-3 h-3" /> {scope.time}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-[32px] border border-gray-200 p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-black text-sm font-bold border border-gray-200">
                  3
                </span>
                <div>
                  <h2 className="text-[20px] font-semibold text-black m-0 tracking-tight">
                    Premium Enhancements
                  </h2>
                  <p className="text-[14px] text-gray-500 font-medium m-0 mt-1">
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
                      className={`flex flex-col p-5 rounded-2xl border text-left transition-all duration-300 outline-none ${
                        isSelected
                          ? "bg-white border-[#4285F4] shadow-[0_8px_20px_rgba(66,133,244,0.12)] -translate-y-1"
                          : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center justify-center w-5 h-5 rounded-md border transition-colors ${
                              isSelected
                                ? "bg-[#4285F4] border-[#4285F4]"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-white" />
                            )}
                          </div>
                          <h2
                            className={`text-[15px] font-semibold flex items-center gap-2 m-0 ${isSelected ? "text-[#4285F4]" : "text-black"}`}
                          >
                            {addon.icon} {addon.name}
                          </h2>
                        </div>
                        <span className="text-[13px] font-bold text-gray-400">
                          +${addon.price}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 font-medium m-0 pl-8">
                        {addon.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-4 sticky top-[100px] lg:top-[120px] h-fit self-start bg-gray-50 border border-gray-200 rounded-[32px] p-8 shadow-sm z-20">
            <div className="flex items-center gap-2 mb-8">
              <Calculator className="w-4 h-4 text-gray-500" />
              <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] m-0">
                Live Estimate
              </h2>
            </div>

            <div className="flex items-end gap-2 mb-8 pb-8 border-b border-gray-200">
              <span className="text-5xl lg:text-[4rem] font-medium text-black tracking-tighter leading-none">
                ${totalPrice}
              </span>
              <span className="text-gray-400 font-bold text-sm mb-2 uppercase tracking-widest">
                USD
              </span>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-[14px] font-medium text-gray-500">
                  Base Service
                </span>
                <h2 className="text-[14px] font-bold text-black m-0 text-right">
                  {services[selectedService].name}
                </h2>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-[14px] font-medium text-gray-500">
                  Project Size
                </span>
                <h2 className="text-[14px] font-bold text-black m-0 text-right">
                  {scopes[selectedScope].name}
                </h2>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <span className="text-[14px] font-medium text-gray-500">
                  Est. Timeline
                </span>
                <h2 className="text-[14px] font-bold text-[#4285F4] m-0 text-right">
                  {scopes[selectedScope].time}
                </h2>
              </div>

              {selectedAddons.length > 0 && (
                <div className="flex flex-col gap-3 pt-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Included Add-ons
                  </span>
                  {selectedAddons.map((id) => {
                    const addon = addons.find((a) => a.id === id);
                    return (
                      <div
                        key={id}
                        className="flex justify-between items-center bg-white px-3 py-2.5 rounded-lg border border-gray-100 shadow-sm"
                      >
                        <h2 className="text-[12.5px] font-semibold text-black flex items-center gap-2 m-0">
                          <Check className="w-3.5 h-3.5 text-[#4285F4]" />{" "}
                          {addon.name}
                        </h2>
                        <span className="text-[12.5px] font-bold text-gray-400">
                          +${addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="relative flex items-center justify-center w-full px-6 py-4 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-all duration-300 hover:-translate-y-1 outline-none shadow-[0_4px_15px_rgba(37,211,102,0.2)] hover:shadow-[0_8px_20px_rgba(37,211,102,0.3)]"
              >
                <Whatsapp
                  variant="wordmark"
                  className="h-6 w-auto brightness-0 invert"
                />
              </a>

              <a
                href={emailLink}
                target="_blank"
                rel="noreferrer"
                className="relative flex items-center justify-center gap-2.5 w-full px-6 py-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-black font-bold transition-all duration-300 hover:-translate-y-1 outline-none shadow-sm"
              >
                <Gmail className="h-5 w-5" />
                Order via Email
              </a>
            </div>

            <p className="text-[11.5px] font-medium text-gray-500 text-center mt-5 leading-relaxed px-2">
              No commitment required. I will review your selections and confirm
              the final timeline and scope before starting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
