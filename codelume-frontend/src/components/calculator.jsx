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
  Code2,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

// Icons header se liye hain - khud se change nahi kiye
// Header me yahi icons hain: Wordpress, Shopify, React, Flutter, Figma
import {
  React as ReactIcon,
  Wordpress,
  Shopify,
  Flutter,
  Figma,
  Gmail,
} from "@thesvg/react";

// WhatsApp ka real logo - @thesvg me Whatsapp nahi hai, is liye header ke style me custom SVG
// Green button pe white dikhega, is liye fill white hai
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Header wala CodeLumeIcon - Full Branding ke liye header me yahi hai
const CodeLumeIcon = (props) => (
  <Code2 {...props} stroke="url(#antigravity-gradient)" strokeWidth={2.5} />
);

export default function ProjectCalculator() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedScope, setSelectedScope] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isCapsuleOpen, setIsCapsuleOpen] = useState(false);
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  // Toggle logic: dobara click pe deselect. Capsule sirf tab jab kuch selected ho.
  const calculatorRef = useRef(null);

  // Services ke icons header se - webServices / marketingServices me yahi mapping hai
  const services = [
    {
      id: 0,
      name: "WordPress Site",
      basePrice: 100,
      icon: Wordpress,
      hex: "#4285F4",
      desc: "Custom themes & premium plugins",
      chooseIf:
        "You want a fast, affordable business website, blog, or company site. Easy to manage yourself.",
      popular: true,
    },
    {
      id: 1,
      name: "Shopify Store",
      basePrice: 150,
      icon: Shopify,
      hex: "#34A853",
      desc: "High-converting e-commerce build",
      chooseIf:
        "You want to sell products online with payment, cart, and orders. Best for an e-commerce store.",
    },
    {
      id: 2,
      name: "MERN Stack Web App",
      basePrice: 299,
      icon: ReactIcon,
      hex: "#FBBC05",
      desc: "React, Node, & MongoDB solutions",
      chooseIf:
        "You need a custom web app with login, dashboard, or complex features. Not a simple website.",
    },
    {
      id: 3,
      name: "Mobile App Build",
      basePrice: 399,
      icon: Flutter,
      hex: "#EA4335",
      desc: "Cross-platform iOS & Android",
      chooseIf:
        "You need an iOS & Android app for your customers, not just a website.",
    },
    {
      id: 4,
      name: "UI/UX Prototyping",
      basePrice: 199,
      icon: Figma,
      hex: "#4285F4",
      desc: "Bespoke Figma design system",
      chooseIf:
        "You only need design in Figma, not development. You will build it later.",
    },
    {
      id: 5,
      name: "Full Branding",
      basePrice: 1499,
      icon: CodeLumeIcon,
      hex: "#EA4335",
      desc: "0-to-100 brand identity & web",
      chooseIf:
        "You are starting a new brand and need logo, identity, and website together.",
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
      popular: true,
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
      icon: Search,
      desc: "Technical & On-page SEO setup",
    },
    {
      id: "content",
      name: "Professional Copywriting",
      price: 80,
      icon: PenBox,
      desc: "Conversion-focused web copy",
    },
    {
      id: "payment",
      name: "Payment Gateway Setup",
      price: 50,
      icon: CreditCard,
      desc: "Stripe, PayPal, or custom APIs",
    },
    {
      id: "rush",
      name: "Fast-Track Delivery",
      price: 150,
      icon: Zap,
      desc: "Jump to the front of the queue",
    },
  ];

  const totalPrice =
    (selectedService !== null ? services[selectedService].basePrice : 0) +
    (selectedScope !== null ? scopes[selectedScope].price : 0) +
    selectedAddons.reduce((sum, id) => {
      const addon = addons.find((a) => a.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);

  const handleServiceSelect = (index) => {
    // Agar wahi dobara click kiya to deselect
    setSelectedService(selectedService === index ? null : index);
  };

  const handleScopeSelect = (index) => {
    // Agar wahi dobara click kiya to deselect
    setSelectedScope(selectedScope === index ? null : index);
  };

  const handleAddonToggle = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((addonId) => addonId !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Capsule sirf tab jab kuch selected ho - sab deselect pe khud gayab
  const hasSelection =
    selectedService !== null ||
    selectedScope !== null ||
    selectedAddons.length > 0;

  const generateMessage = () => {
    const serviceName =
      selectedService !== null
        ? services[selectedService].name
        : "Not selected";
    const scopeName =
      selectedScope !== null ? scopes[selectedScope].name : "Not selected";
    const estimatedTime =
      selectedScope !== null ? scopes[selectedScope].time : "Not selected";
    const addonNames =
      selectedAddons.length > 0
        ? selectedAddons
            .map((id) => addons.find((a) => a.id === id).name)
            .join(", ")
        : "None selected";
    return `Hello Rafay! I just used the CodeLume Project Calculator:\n\nService: ${serviceName}\nScope: ${scopeName}\nTimeline: ${estimatedTime}\nAdd-ons: ${addonNames}\n\nEstimated Total: $${totalPrice} USD\n\nPlease let me know when we can schedule a quick consultation. Thanks!`;
  };

  const waLink = `https://wa.me/923347835980?text=${encodeURIComponent(generateMessage())}`;
  const emailLink = `mailto:hello@codelume.online?subject=${encodeURIComponent("New Project Inquiry via CodeLume Calculator")}&body=${encodeURIComponent(generateMessage())}`;

  const CurrentServiceIcon =
    selectedService !== null ? services[selectedService].icon : Calculator;
  const CurrentScope =
    selectedScope !== null
      ? scopes[selectedScope]
      : { name: "No scope selected", time: "-", price: 0 };

  // View Services button sirf tab dikhega jab user calculator section me NAHI hai
  // Price Calculator button: sirf tab dikhega jab user kisi aur section pe hai
  // Estimator section me aate hi gayab - threshold 0 matlab 1px bhi dikha to gayab
  useEffect(() => {
    const el = document.getElementById("calculator");
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => setIsCalculatorVisible(entries[0].isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToCalculator = () => {
    document
      .getElementById("calculator")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Header wala gradient - CodeLumeIcon ke liye, header me bhi yahi id hai */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient
            id="antigravity-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop stopColor="#4285F4" offset="0%" />
            <stop stopColor="#34A853" offset="33%" />
            <stop stopColor="#FBBC05" offset="66%" />
            <stop stopColor="#EA4335" offset="100%" />
          </linearGradient>
        </defs>
      </svg>
      <section
        id="calculator"
        className="bg-white py-24 sm:py-32 pb-44 relative border-t border-gray-100 scroll-mt-20"
      >
        <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 w-full">
          <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <Calculator className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">
                Transparent Pricing
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-medium text-black tracking-tight leading-[1.1] m-0">
              Interactive Cost
              <br />
              <span className="text-gray-400">Estimator.</span>
            </h2>
            <p className="text-[#4B5563] font-medium text-[15px] sm:text-[16px] leading-relaxed max-w-2xl m-0 mt-4">
              Get an instant, no-obligation estimate for your next bespoke
              digital project.
            </p>
          </div>

          <div className="w-full max-w-[1100px] mx-auto">
            <div className="w-full space-y-12">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service, index) => {
                    const Icon = service.icon;
                    const isSelected = selectedService === index;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleServiceSelect(index)}
                        className={`group flex flex-col items-start p-6 sm:p-7 rounded-2xl border text-left transition-all duration-200 outline-none cursor-pointer relative overflow-hidden ${
                          isSelected
                            ? "bg-white border-[#4285F4] shadow-[0_8px_20px_rgba(66,133,244,0.12)]"
                            : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-start justify-between w-full mb-4 relative z-10">
                          <div
                            className={`p-3 rounded-xl border shadow-sm flex items-center justify-center ${isSelected ? "bg-[#F0F7FF] border-[#4285F4]/30" : "bg-white border-gray-100"}`}
                          >
                            <Icon
                              className={`w-6 h-6 ${isSelected ? "text-[#4285F4]" : "text-gray-700"}`}
                            />
                          </div>
                          <span className="text-[12px] font-bold text-black bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full shrink-0">
                            From ${service.basePrice}
                          </span>
                        </div>
                        {service.popular && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#4285F4] px-2.5 py-1 rounded-full mb-2 relative z-10">
                            ★ Most Popular
                          </span>
                        )}
                        <h2 className="text-[16px] font-semibold text-black tracking-tight mb-1 relative z-10 flex items-center gap-2">
                          {service.name}
                          {isSelected && (
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#4285F4] text-white shrink-0">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </h2>
                        <p className="text-[13px] text-gray-500 font-medium m-0 leading-relaxed relative z-10">
                          {service.desc}
                        </p>
                        <div className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 mt-4 relative z-10">
                          <p className="text-[11px] font-bold text-black uppercase tracking-widest m-0 mb-1.5">
                            Who should choose this?
                          </p>
                          <p className="text-[13px] text-gray-600 font-medium leading-[1.6] m-0">
                            {service.chooseIf}
                          </p>
                        </div>
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
                    const isSelected = selectedScope === index;
                    return (
                      <button
                        key={scope.id}
                        type="button"
                        onClick={() => handleScopeSelect(index)}
                        className={`flex flex-col items-start p-6 rounded-2xl border text-left transition-all duration-200 outline-none cursor-pointer ${
                          isSelected
                            ? "bg-white border-[#4285F4] shadow-[0_8px_20px_rgba(66,133,244,0.12)]"
                            : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[12px] font-bold text-black bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                            {scope.price === 0
                              ? "Included"
                              : `+$${scope.price}`}
                          </span>
                          {scope.popular && (
                            <span className="text-[11px] font-bold text-white bg-[#34A853] px-2.5 py-1 rounded-full">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <h2
                          className={`text-[17px] font-semibold tracking-tight mb-2 flex items-center gap-2 ${isSelected ? "text-[#4285F4]" : "text-black"}`}
                        >
                          {scope.name}
                          {isSelected && (
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#4285F4] text-white shrink-0">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </h2>
                        <p className="text-[13px] text-gray-500 font-medium leading-relaxed mb-6">
                          {scope.desc}
                        </p>
                        <div
                          className={`mt-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-[11px] font-bold ${isSelected ? "bg-[#F0F7FF] border-[#4285F4]/30 text-[#4285F4]" : "bg-white border-gray-200 text-gray-500"}`}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {addons.map((addon) => {
                    const AddonIcon = addon.icon;
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => handleAddonToggle(addon.id)}
                        className={`flex flex-col p-5 rounded-2xl border text-left transition-all duration-200 outline-none cursor-pointer ${
                          isSelected
                            ? "bg-white border-[#4285F4] shadow-[0_8px_20px_rgba(66,133,244,0.12)]"
                            : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex items-center justify-center w-5 h-5 rounded-md border transition-colors ${isSelected ? "bg-[#4285F4] border-[#4285F4]" : "bg-white border-gray-300"}`}
                            >
                              {isSelected && (
                                <Check className="w-3.5 h-3.5 text-white" />
                              )}
                            </div>
                            <h2
                              className={`text-[15px] font-semibold flex items-center gap-2 m-0 ${isSelected ? "text-[#4285F4]" : "text-black"}`}
                            >
                              <AddonIcon className="w-4 h-4" /> {addon.name}
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
          </div>
        </div>
      </section>

      {/* CAPSULE - Same file, same design, only added a signal on normal state */}
      {hasSelection && (
        <div className="fixed bottom-3 sm:bottom-5 left-0 right-0 z-[60] px-3 sm:px-6 flex justify-center pointer-events-none">
          <div className="pointer-events-auto w-full max-w-[340px] sm:max-w-[820px]">
            {/* View Services - sirf jab user calculator section me NAHI hai, section me aate hi gayab */}
            {!isCalculatorVisible && (
              <button
                type="button"
                onClick={scrollToCalculator}
                className="w-full flex items-center justify-between px-4 py-2 mb-1.5 rounded-full bg-[#4285F4] text-white text-[12px] sm:text-[13px] font-bold shadow-md hover:bg-gray-900 transition-colors outline-none cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Calculator className="w-3.5 h-3.5" /> Price Calculator
                </span>
                <span className="flex items-center gap-1">
                  View Services <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            )}
            <div className="bg-white border border-gray-200 rounded-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.14)] overflow-hidden">
              <button
                type="button"
                onClick={() => setIsCapsuleOpen(!isCapsuleOpen)}
                className="w-full flex items-center gap-3 p-3 pl-3 pr-3 cursor-pointer outline-none text-left bg-white hover:bg-gray-50/50 transition-colors"
              >
                <span className="w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                  <CurrentServiceIcon className="w-5 h-5 text-gray-800" />
                </span>
                <span className="flex-1 min-w-0 text-left">
                  <span className="flex items-center gap-2">
                    <span className="text-[15px] font-bold text-black truncate">
                      {selectedService !== null
                        ? services[selectedService].name
                        : "Select a service"}
                    </span>
                  </span>
                  <span className="block text-[12px] text-gray-500 font-medium truncate mt-0.5">
                    {CurrentScope.name} • {CurrentScope.time} •{" "}
                    {selectedAddons.length > 0
                      ? `${selectedAddons.length} add-on${selectedAddons.length > 1 ? "s" : ""}`
                      : "No add-ons"}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block text-[20px] font-bold text-black leading-none">
                    ${totalPrice}{" "}
                    <span className="text-[11px] text-gray-400 font-bold">
                      USD
                    </span>
                  </span>
                  <span className="block text-[11px] font-bold text-[#137333] mt-1">
                    Now ${Math.round(totalPrice / 2)} • Later $
                    {totalPrice - Math.round(totalPrice / 2)}
                  </span>
                </span>
                <span
                  className={`w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 transition-transform duration-300 ${isCapsuleOpen ? "rotate-180" : ""}`}
                >
                  <ChevronDown className="w-4 h-4 text-black" />
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${isCapsuleOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="border-t border-gray-100 bg-gray-50/60 px-4 sm:px-5 py-4">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest m-0">
                        Service
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <CurrentServiceIcon className="w-4 h-4 text-gray-700 shrink-0" />
                        <p className="text-[14px] font-bold text-black m-0 leading-tight">
                          {selectedService !== null
                            ? services[selectedService].name
                            : "Not selected"}
                        </p>
                      </div>
                      <p className="text-[12px] font-bold text-gray-400 m-0 mt-1">
                        {selectedService !== null
                          ? `$${services[selectedService].basePrice}`
                          : "-"}
                      </p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest m-0">
                        Project Size
                      </p>
                      <p className="text-[14px] font-bold text-black m-0 mt-1.5">
                        {CurrentScope.name}
                      </p>
                      <p className="text-[12px] font-bold text-gray-400 m-0 mt-1">
                        {CurrentScope.price === 0
                          ? "Included"
                          : `+$${CurrentScope.price}`}
                      </p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest m-0">
                        Timeline
                      </p>
                      <p className="text-[14px] font-bold text-[#4285F4] m-0 mt-1.5">
                        {CurrentScope.time}
                      </p>
                      <p className="text-[12px] text-gray-500 font-medium m-0 mt-1">
                        50/50 payment
                      </p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest m-0">
                        Add-ons
                      </p>
                      {selectedAddons.length === 0 ? (
                        <p className="text-[13px] font-medium text-gray-500 m-0 mt-1.5">
                          None selected
                        </p>
                      ) : (
                        <div className="mt-1.5 space-y-1">
                          {selectedAddons.map((id) => {
                            const ad = addons.find((a) => a.id === id);
                            if (!ad) return null;
                            return (
                              <p
                                key={id}
                                className="text-[12px] font-medium text-black m-0 truncate"
                              >
                                ✓ {ad.name} • +${ad.price}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="flex flex-col sm:flex-row items-stretch gap-2.5 mt-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1eb85a] text-white font-bold text-[13.5px] transition-colors whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-[18px] h-[18px] shrink-0 text-white" />{" "}
                      WhatsApp
                    </a>
                    <a
                      href={emailLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[black] hover:bg-[#1a1a1a] text-white font-bold text-[13.5px] transition-colors whitespace-nowrap"
                    >
                      <Gmail className="w-[20px] h-[20px] shrink-0" /> Email
                    </a>
                  </div>
                  <p className="text-center text-[11.5px] text-gray-500 font-medium m-0 mt-3">
                    This is only an inquiry, not a payment. • ⭐ 4.9 Rating •
                    40+ Projects • 24h Reply
                  </p>
                </div>
              </div>
            </div>
            <p className="text-center text-[11px] text-gray-400 font-medium m-0 mt-2 hidden sm:block">
              {isCapsuleOpen
                ? "Click capsule to close"
                : "Click capsule to expand"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
