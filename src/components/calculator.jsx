import React, { useState, useEffect } from "react";
import { 
  Calculator, 
  Check, 
  ArrowRight, 
  Monitor, 
  Smartphone, 
  PenTool, 
  ShoppingCart, 
  Rocket,
  Search,
  PenBox,
  CreditCard,
  Zap
} from "lucide-react";

export default function ProjectCalculator() {
  const [selectedService, setSelectedService] = useState(0);
  const [selectedScope, setSelectedScope] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const services = [
    { id: 0, name: "WordPress Site", basePrice: 100, icon: <Monitor className="w-6 h-6" /> },
    { id: 1, name: "Shopify / E-Commerce", basePrice: 150, icon: <ShoppingCart className="w-6 h-6" /> },
    { id: 2, name: "MERN Stack Web App", basePrice: 299, icon: <Monitor className="w-6 h-6" /> },
    { id: 3, name: "Mobile App Build", basePrice: 399, icon: <Smartphone className="w-6 h-6" /> },
    { id: 4, name: "UI/UX Prototyping", basePrice: 199, icon: <PenTool className="w-6 h-6" /> },
    { id: 5, name: "0-to-100 Full Branding", basePrice: 1499, icon: <Rocket className="w-6 h-6" /> }
  ];

  const scopes = [
    { id: 0, name: "Basic / MVP", price: 0, desc: "Essential features, up to 5 pages/screens." },
    { id: 1, name: "Standard Business", price: 150, desc: "Advanced logic, up to 10 pages/screens." },
    { id: 2, name: "Enterprise Custom", price: 400, desc: "Complex architecture, unlimited scalability." }
  ];

  const addons = [
    { id: "seo", name: "Advanced SEO Optimisation", price: 50, icon: <Search className="w-4 h-4 text-blue-400" /> },
    { id: "content", name: "Professional Copywriting", price: 80, icon: <PenBox className="w-4 h-4 text-indigo-400" /> },
    { id: "payment", name: "Payment Gateway Setup", price: 50, icon: <CreditCard className="w-4 h-4 text-emerald-400" /> },
    { id: "rush", name: "Fast-Track Delivery", price: 150, icon: <Zap className="w-4 h-4 text-orange-400" /> }
  ];

  useEffect(() => {
    let total = services[selectedService].basePrice + scopes[selectedScope].price;
    selectedAddons.forEach(addonId => {
      const addon = addons.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });
    setTotalPrice(total);
  }, [selectedService, selectedScope, selectedAddons]);

  const handleAddonToggle = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(addonId => addonId !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const buildWhatsAppLink = () => {
    const serviceName = services[selectedService].name;
    const scopeName = scopes[selectedScope].name;
    const addonNames = selectedAddons.map(id => addons.find(a => a.id === id).name).join(", ");
    
    let text = `Hi Rafay! I used your Project Calculator. I am interested in:\n\n*Service:* ${serviceName}\n*Scope:* ${scopeName}`;
    if (addonNames) {
      text += `\n*Add-ons:* ${addonNames}`;
    }
    text += `\n\n*Estimated Total:* $${totalPrice}\n\nCan we discuss the details?`;
    
    return `https://wa.me/923347835980?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="bg-[#030712] text-white font-jakarta py-24 relative overflow-hidden">
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
            Get an instant, no-obligation estimate for your next bespoke digital project. Customised exactly to your business logic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-12">
            
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3 m-0">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm">1</span>
                Core Service Category
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedService(service.id)}
                    className={`flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300 outline-none ${
                      selectedService === service.id
                        ? "bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.15)]"
                        : "bg-[#0a0f1c] border-white/5 hover:border-white/10 hover:bg-[#0f172a]"
                    }`}
                  >
                    <div className={`mb-4 p-3 rounded-xl ${selectedService === service.id ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-slate-400'}`}>
                      {service.icon}
                    </div>
                    <h2 className="text-[15px] font-bold text-white m-0 tracking-tight">{service.name}</h2>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3 m-0">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm">2</span>
                Project Scope & Size
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {scopes.map((scope, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedScope(scope.id)}
                    className={`flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300 outline-none ${
                      selectedScope === scope.id
                        ? "bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.15)]"
                        : "bg-[#0a0f1c] border-white/5 hover:border-white/10 hover:bg-[#0f172a]"
                    }`}
                  >
                    <h2 className="text-[16px] font-bold text-white mb-2 m-0 tracking-tight">{scope.name}</h2>
                    <p className="text-[13px] text-slate-400 m-0 leading-relaxed">{scope.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3 m-0">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm">3</span>
                Premium Enhancements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => handleAddonToggle(addon.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 outline-none ${
                        isSelected
                          ? "bg-blue-500/10 border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                          : "bg-[#0a0f1c] border-white/5 hover:border-white/10 hover:bg-[#0f172a]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-6 h-6 rounded-md border ${isSelected ? 'bg-blue-500 border-blue-500' : 'bg-[#030712] border-white/10'}`}>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <h2 className="text-[14px] font-bold text-white m-0 flex items-center gap-2">
                          {addon.icon} {addon.name}
                        </h2>
                      </div>
                      <span className="text-[13px] font-bold text-slate-400">+${addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="lg:col-span-1">
            <div className="bg-linear-to-b from-[#0a0f1c] to-[#050b14] border border-white/10 rounded-4xl p-8 sticky top-32 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
              <h2 className="text-[12px] font-black text-blue-500 uppercase tracking-widest mb-6 m-0">
                Live Estimate
              </h2>
              
              <div className="flex items-end gap-2 mb-8">
                <span className="text-5xl font-black text-white tracking-tighter leading-none">${totalPrice}</span>
                <span className="text-slate-500 font-bold text-sm mb-1">USD</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-[14px] text-slate-400">Base Service</span>
                  <h2 className="text-[14px] font-bold text-white m-0 text-right">{services[selectedService].name}</h2>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <span className="text-[14px] text-slate-400">Project Size</span>
                  <h2 className="text-[14px] font-bold text-white m-0 text-right">{scopes[selectedScope].name}</h2>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex flex-col gap-2 pt-2">
                    <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1">Included Add-ons</span>
                    {selectedAddons.map(id => {
                      const addon = addons.find(a => a.id === id);
                      return (
                        <div key={id} className="flex justify-between items-center">
                          <h2 className="text-[13px] text-slate-300 flex items-center gap-1.5 m-0">
                            <Check className="w-3 h-3 text-blue-400" /> {addon.name}
                          </h2>
                          <span className="text-[13px] text-slate-400">+${addon.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="relative flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1 outline-none group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
                <h2 className="m-0 text-inherit text-[15px] font-extrabold flex items-center gap-2">
                  Send to WhatsApp <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </h2>
              </a>
              <p className="text-[11px] text-slate-500 text-center mt-4">
                No commitment required. We will review your selections and confirm the final timeline and scope.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}