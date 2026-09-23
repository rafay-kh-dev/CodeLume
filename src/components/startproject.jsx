import React, { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
  Rocket,
  Code2,
  MonitorSmartphone,
  Server,
  ArrowRight,
  Mail,
  User,
  Building,
  Loader2,
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = [
    { id: "MERN Stack", title: "MERN Stack App", icon: Server },
    { id: "PHP Laravel", title: "PHP & Laravel", icon: Code2 },
    { id: "E-Commerce", title: "E-Commerce", icon: MonitorSmartphone },
    { id: "UI/UX Design", title: "UI/UX Design", icon: Rocket },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_fhmjx2e",
        "template_xi7uxae",
        {
          from_name: formData.name,
          client_email: formData.email,
          company: formData.company,
          services: formData.services.join(", "),
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.details,
          reply_to: formData.email,
        },
        "2uB67zF7wZrjpEEyD",
      );

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Email send error details:", error);
      const errorMessage =
        error?.text ||
        error?.message ||
        "Please check your EmailJS dashboard credentials.";
      alert("EmailJS Failed: " + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="w-full min-h-dvh pt-32 sm:pt-40 pb-24 bg-[#030712] font-jakarta flex items-center justify-center relative overflow-hidden">
        <style>
          {`
            ::-webkit-scrollbar { width: 8px; height: 8px; }
            ::-webkit-scrollbar-track { background: #030712; }
            ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
            ::-webkit-scrollbar-thumb:hover { background: #2563eb; }
          `}
        </style>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#3b82f6]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-2xl w-full px-4 flex flex-col items-center text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-[#3b82f6] mb-8 m-0 tracking-tighter leading-tight drop-shadow-sm">
            Thank You!
          </h2>

          <h2 className="text-[16px] sm:text-[18px] text-slate-300 font-medium leading-relaxed mb-12 m-0 px-4 max-w-lg mx-auto">
            Thank you for contacting me. I am Rafay. I will contact you as soon
            as possible from this email{" "}
            <span className="text-[#3b82f6] font-bold tracking-wide">
              mrafaykh@outlook.com
            </span>
            .
          </h2>

          <Link
            to="/"
            className="flex items-center justify-center gap-4 px-10 py-5 rounded-2xl bg-linear-to-r from-[#3b82f6] to-[#2563eb] text-white hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300 outline-none active:scale-[0.98] group shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] border border-blue-400/20"
          >
            <ArrowRight className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform rotate-180" />
            <h2 className="text-[15px] font-black m-0 tracking-wide text-white uppercase">
              Return to Homepage
            </h2>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full pt-32 sm:pt-40 pb-24 lg:pb-32 bg-[#030712] font-jakarta relative overflow-hidden"
      id="start-project"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          
          /* Matched Home Page Scrollbar */
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #030712; }
          ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
          ::-webkit-scrollbar-thumb:hover { background: #2563eb; }
        `}
      </style>

      <div className="absolute top-0 right-0 w-200 h-200 bg-[#3b82f6]/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-start text-left mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
            <h2 className="text-[12px] sm:text-[13px] font-black text-[#3b82f6] uppercase tracking-[0.2em] m-0">
              Initiate Strategy
            </h2>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05] m-0 mb-8">
            Let's engineer <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-slate-500">
              your next project.
            </span>
          </h2>

          <h2 className="text-[16px] sm:text-lg text-slate-400 font-medium leading-relaxed m-0 max-w-2xl">
            Fill out the technical requirements below. The more details you
            provide, the better we can customise our architectural proposal for
            your business.
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-14 sm:gap-20"
        >
          <div className="flex flex-col gap-6 p-6 sm:p-10 rounded-3xl bg-[#070b14] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h2 className="text-xl sm:text-2xl font-black text-white m-0 tracking-tight flex items-center gap-4 relative z-10">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-[#3b82f6] text-sm">
                1
              </span>
              What do you need help with?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {serviceOptions.map((service) => {
                const isSelected = formData.services.includes(service.id);
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 outline-none text-left active:scale-[0.98] ${
                      isSelected
                        ? "bg-[#3b82f6]/10 border-[#3b82f6] shadow-[0_0_20px_rgba(59,130,246,0.15)] transform -translate-y-1"
                        : "bg-[#0a0f1c] border-white/5 hover:border-white/20 hover:bg-[#0d1324]"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isSelected
                          ? "bg-[#3b82f6] text-white shadow-lg"
                          : "bg-[#030712] border border-white/5 text-slate-400 group-hover:text-slate-300"
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <h2
                      className={`text-[15px] font-black m-0 tracking-wide transition-colors ${
                        isSelected ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {service.title}
                    </h2>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6 p-6 sm:p-10 rounded-3xl bg-[#070b14] border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h2 className="text-xl sm:text-2xl font-black text-white m-0 tracking-tight flex items-center gap-4 relative z-10">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-[#3b82f6] text-sm">
                  2
                </span>
                Allocated Budget
              </h2>
              <div className="flex flex-col gap-3 relative z-10">
                {budgetOptions.map((budget, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect("budget", budget)}
                    className={`px-6 py-5 rounded-2xl border text-left font-black tracking-wide text-[14px] transition-all duration-300 outline-none active:scale-[0.98] ${
                      formData.budget === budget
                        ? "bg-[#3b82f6]/10 border-[#3b82f6] text-white shadow-[0_0_15px_rgba(59,130,246,0.1)] pl-8"
                        : "bg-[#0a0f1c] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 p-6 sm:p-10 rounded-3xl bg-[#070b14] border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h2 className="text-xl sm:text-2xl font-black text-white m-0 tracking-tight flex items-center gap-4 relative z-10">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-[#3b82f6] text-sm">
                  3
                </span>
                Estimated Timeline
              </h2>
              <div className="flex flex-col gap-3 relative z-10">
                {timelineOptions.map((time, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect("timeline", time)}
                    className={`px-6 py-5 rounded-2xl border text-left font-black tracking-wide text-[14px] transition-all duration-300 outline-none active:scale-[0.98] ${
                      formData.timeline === time
                        ? "bg-[#3b82f6]/10 border-[#3b82f6] text-white shadow-[0_0_15px_rgba(59,130,246,0.1)] pl-8"
                        : "bg-[#0a0f1c] border-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 p-6 sm:p-10 rounded-3xl bg-[#070b14] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h2 className="text-xl sm:text-2xl font-black text-white m-0 tracking-tight flex items-center gap-4 relative z-10 mb-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-[#3b82f6] text-sm">
                4
              </span>
              Project & Contact Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
              <div className="relative group/input">
                <User className="absolute top-5 left-5 w-5 h-5 text-slate-500 group-focus-within/input:text-[#3b82f6] transition-colors pointer-events-none" />
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => handleSelect("name", e.target.value)}
                  className="w-full bg-[#0a0f1c] border border-white/5 rounded-2xl py-5 pl-14 pr-5 text-[15px] font-medium text-white placeholder-slate-600 focus:outline-none focus:border-[#3b82f6] focus:bg-[#3b82f6]/5 transition-all shadow-inner"
                />
              </div>

              <div className="relative group/input">
                <Mail className="absolute top-5 left-5 w-5 h-5 text-slate-500 group-focus-within/input:text-[#3b82f6] transition-colors pointer-events-none" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => handleSelect("email", e.target.value)}
                  className="w-full bg-[#0a0f1c] border border-white/5 rounded-2xl py-5 pl-14 pr-5 text-[15px] font-medium text-white placeholder-slate-600 focus:outline-none focus:border-[#3b82f6] focus:bg-[#3b82f6]/5 transition-all shadow-inner"
                />
              </div>

              <div className="relative md:col-span-2 group/input">
                <Building className="absolute top-5 left-5 w-5 h-5 text-slate-500 group-focus-within/input:text-[#3b82f6] transition-colors pointer-events-none" />
                <input
                  type="text"
                  placeholder="Company Name (Optional)"
                  value={formData.company}
                  onChange={(e) => handleSelect("company", e.target.value)}
                  className="w-full bg-[#0a0f1c] border border-white/5 rounded-2xl py-5 pl-14 pr-5 text-[15px] font-medium text-white placeholder-slate-600 focus:outline-none focus:border-[#3b82f6] focus:bg-[#3b82f6]/5 transition-all shadow-inner"
                />
              </div>

              <div className="relative md:col-span-2 group/input">
                <textarea
                  placeholder="Tell us about your project requirements..."
                  required
                  rows="6"
                  value={formData.details}
                  onChange={(e) => handleSelect("details", e.target.value)}
                  className="w-full bg-[#0a0f1c] border border-white/5 rounded-2xl p-5 text-[15px] font-medium leading-relaxed text-white placeholder-slate-600 focus:outline-none focus:border-[#3b82f6] focus:bg-[#3b82f6]/5 transition-all resize-none shadow-inner"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-3 w-full px-8 py-6 rounded-2xl bg-linear-to-r from-[#3b82f6] to-[#2563eb] text-white hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300 outline-none group/btn active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 transform-gpu mt-2 shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] border border-blue-400/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <h2 className="text-[17px] font-black m-0 text-inherit tracking-wide uppercase">
                  Processing...
                </h2>
              </>
            ) : (
              <>
                <h2 className="text-[17px] font-black m-0 text-inherit tracking-wide uppercase">
                  Submit Request
                </h2>
                <ArrowRight className="w-6 h-6 transform group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
