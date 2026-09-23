import React, { useState } from "react";
import {
  Rocket,
  Code2,
  MonitorSmartphone,
  Server,
  ArrowRight,
  CheckCircle2,
  Mail,
  User,
  Building,
} from "lucide-react";

export default function StartProject() {
  const [formData, setFormData] = useState({
    services: [],
    budget: "",
    timeline: "",
    name: "",
    email: "",
    company: "",
    details: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions = [
    { id: "mern", title: "MERN Stack App", icon: Server },
    { id: "laravel", title: "PHP & Laravel", icon: Code2 },
    { id: "ecommerce", title: "E-Commerce", icon: MonitorSmartphone },
    { id: "uiux", title: "UI/UX Design", icon: Rocket },
  ];

  const budgetOptions = ["$1k - $2.5k", "$2.5k - $5k", "$5k - $10k", "$10k+"];

  const timelineOptions = [
    "Less than 1 month",
    "1 - 2 months",
    "3+ months",
    "Not sure yet",
  ];

  const toggleService = (id) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  };

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan aap API call ya Email service (e.g. EmailJS) integrate kar sakte hain
    console.log("Lead Data:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="w-full min-h-dvh py-24 sm:py-32 bg-[#030712] font-jakarta flex items-center justify-center">
        <div className="max-w-md w-full px-4 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500 flex items-center justify-center mb-8">
            <CheckCircle2 className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4 m-0 tracking-tight">
            Request Received.
          </h2>
          <h2 className="text-[15px] text-slate-400 font-medium leading-relaxed mb-10 m-0">
            Thank you for reaching out. Our technical team will review your
            project requirements and get back to you within 24 hours to schedule
            a strategy call.
          </h2>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-8 py-4 rounded-xl bg-white text-blue-900 font-black hover:bg-slate-200 transition-colors w-full outline-none"
          >
            Return to Homepage
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full py-16 sm:py-24 lg:py-32 bg-[#030712] font-jakarta"
      id="start-project"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sharp Header */}
        <div className="flex flex-col items-start text-left mb-12 sm:mb-16">
          <h2 className="text-[12px] sm:text-[13px] font-black text-blue-500 uppercase tracking-[0.25em] mb-4 m-0">
            Initiate Strategy
          </h2>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05] m-0 mb-6">
            Let's engineer <br className="hidden sm:block" />
            your next project.
          </h2>
          <h2 className="text-[15px] sm:text-lg text-slate-400 font-medium leading-relaxed m-0 max-w-2xl">
            Fill out the technical requirements below. The more details you
            provide, the better we can customise our architectural proposal for
            your business.
          </h2>
        </div>

        {/* Lead Capture Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-12 sm:gap-16"
        >
          {/* Section 1: Services */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl sm:text-2xl font-black text-white m-0 tracking-tight">
              1. What do you need help with?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceOptions.map((service) => {
                const isSelected = formData.services.includes(service.id);
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 outline-none text-left active:scale-[0.98] ${
                      isSelected
                        ? "bg-blue-600/10 border-blue-500"
                        : "bg-[#070b14] border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-blue-500 text-white"
                          : "bg-[#030712] border border-white/5 text-slate-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <h2
                      className={`text-[15px] font-black m-0 tracking-wide ${isSelected ? "text-white" : "text-slate-300"}`}
                    >
                      {service.title}
                    </h2>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Budget & Timeline (Grid Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {/* Budget */}
            <div className="flex flex-col gap-6">
              <h2 className="text-xl sm:text-2xl font-black text-white m-0 tracking-tight">
                2. Allocated Budget
              </h2>
              <div className="flex flex-col gap-3">
                {budgetOptions.map((budget, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect("budget", budget)}
                    className={`px-6 py-4 rounded-xl border text-left font-black tracking-wide text-[14px] transition-all duration-200 outline-none active:scale-[0.98] ${
                      formData.budget === budget
                        ? "bg-blue-600/10 border-blue-500 text-white"
                        : "bg-[#070b14] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-300"
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="flex flex-col gap-6">
              <h2 className="text-xl sm:text-2xl font-black text-white m-0 tracking-tight">
                3. Estimated Timeline
              </h2>
              <div className="flex flex-col gap-3">
                {timelineOptions.map((time, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect("timeline", time)}
                    className={`px-6 py-4 rounded-xl border text-left font-black tracking-wide text-[14px] transition-all duration-200 outline-none active:scale-[0.98] ${
                      formData.timeline === time
                        ? "bg-blue-600/10 border-blue-500 text-white"
                        : "bg-[#070b14] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-300"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Details & Contact */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl sm:text-2xl font-black text-white m-0 tracking-tight">
              4. Project & Contact Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="relative">
                <User className="absolute top-4 left-4 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => handleSelect("name", e.target.value)}
                  className="w-full bg-[#070b14] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-[15px] font-medium text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all"
                />
              </div>

              <div className="relative">
                <Mail className="absolute top-4 left-4 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => handleSelect("email", e.target.value)}
                  className="w-full bg-[#070b14] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-[15px] font-medium text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all"
                />
              </div>

              <div className="relative md:col-span-2">
                <Building className="absolute top-4 left-4 w-5 h-5 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Company Name (Optional)"
                  value={formData.company}
                  onChange={(e) => handleSelect("company", e.target.value)}
                  className="w-full bg-[#070b14] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-[15px] font-medium text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all"
                />
              </div>

              <div className="relative md:col-span-2">
                <textarea
                  placeholder="Tell us about your project requirements..."
                  required
                  rows="5"
                  value={formData.details}
                  onChange={(e) => handleSelect("details", e.target.value)}
                  className="w-full bg-[#070b14] border border-white/5 rounded-xl p-4 text-[15px] font-medium text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-3 w-full px-8 py-5 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 outline-none group/btn active:scale-[0.98] transform-gpu mt-4"
          >
            <h2 className="text-[16px] font-black m-0 text-inherit tracking-wide">
              Submit Request
            </h2>
            <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
}
