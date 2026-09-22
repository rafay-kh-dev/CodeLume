import React, { useState } from "react";
import { Sparkles, Plus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question:
        "What is the typical timeframe for a highly customised project?",
      answer:
        "A bespoke, highly optimised architecture usually requires 6 to 12 weeks from initial discovery to global deployment. We prioritise precision and zero-latency performance over rushed templates.",
    },
    {
      question: "Do you utilise templates for faster delivery?",
      answer:
        "Absolutely not. We engineer every platform from scratch. Pre-built templates introduce bloated code and performance lag. Our philosophy dictates 100% customised logic tailored to your exact business requirements.",
    },
    {
      question: "How do you ensure the final architecture is scalable?",
      answer:
        "We deploy on elite cloud infrastructures using headless architectures and decoupled frontends (like React/Next.js). This ensures your platform handles massive traffic spikes while remaining lightning fast.",
    },
    {
      question: "Do you provide post-deployment support and SEO optimisation?",
      answer:
        "Yes. Every project includes comprehensive technical SEO integrations. Furthermore, we offer specialised retainer packages to keep your infrastructure continually updated and fully optimised.",
    },
  ];

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    // FIXED Spacing py-16 for mobile
    <section className="relative w-full py-16 lg:py-24 bg-[#030712] font-jakarta overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* FIXED w-200 h-150 w-100 h-100 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-blue-900/5 rounded-full blur-[150px] pointer-events-none transform-gpu translate-z-0" />
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-indigo-900/5 rounded-full blur-[120px] pointer-events-none transform-gpu translate-z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          {/* FIXED bg-white/3 */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/3 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] mb-6 backdrop-blur-md transform-gpu">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0">
              Clear Doubts
            </h2>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] m-0 drop-shadow-lg">
            Frequently Asked <br className="hidden sm:block" />
            {/* FIXED bg-linear-to-r */}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-300 to-cyan-400">
              Questions.
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              // FIXED rounded-3xl
              <div
                key={index}
                className={`relative w-full rounded-3xl bg-[#0a0f1c]/70 backdrop-blur-xl transition-all duration-500 ease-out transform-gpu overflow-hidden cursor-pointer outline-none ${
                  isOpen
                    ? "shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(59,130,246,0.1)]"
                    : "shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.04)] hover:-translate-y-1"
                }`}
                onClick={() => toggleFAQ(index)}
              >
                {/* FIXED bg-linear-to-b */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-blue-400 to-indigo-500 transition-opacity duration-500 transform-gpu ${isOpen ? "opacity-100 shadow-[0_0_15px_rgba(59,130,246,0.8)]" : "opacity-0"}`}
                />
                {/* FIXED bg-linear-to-br */}
                <div
                  className={`absolute inset-0 bg-linear-to-br from-blue-600/10 to-transparent transition-opacity duration-700 pointer-events-none transform-gpu ${isOpen ? "opacity-100" : "opacity-0"}`}
                />

                <div className="p-6 sm:p-8 flex items-center justify-between gap-6 relative z-10">
                  <h2
                    className={`text-lg sm:text-xl font-extrabold tracking-tight m-0 transition-colors duration-300 ${isOpen ? "text-white" : "text-slate-200"}`}
                  >
                    {faq.question}
                  </h2>
                  <div
                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 transform-gpu ${isOpen ? "bg-blue-600/20 shadow-[inset_0_0_10px_rgba(59,130,246,0.3)] rotate-135" : "bg-[#030712]/80 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] rotate-0"}`}
                  >
                    <Plus
                      className={`w-5 h-5 transition-colors duration-300 ${isOpen ? "text-blue-400" : "text-slate-400"}`}
                    />
                  </div>
                </div>

                {/* FIXED ease-in-out */}
                <div
                  className="grid transition-all duration-500 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 sm:pb-8 px-6 sm:px-8 pt-0 relative z-10">
                      <h2 className="text-[15px] sm:text-base text-slate-400 font-medium leading-relaxed m-0">
                        {faq.answer}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
