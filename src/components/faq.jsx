import React, { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // Pehla sawal by default open hoga

  const faqs = [
    {
      question: "What is your typical payment structure?",
      answer:
        "We usually work on a 50/50 model. A 50% deposit is required to commence the project and block out development time, and the final 50% is billed upon project completion and before the final launch or code handover.",
    },
    {
      question: "Do you provide domain registration and web hosting?",
      answer:
        "While we don't act as a direct hosting provider, we strongly assist our clients in setting up premium, secure cloud hosting (like AWS, Vercel, or Hostinger) and configuring domains under their own ownership for maximum security.",
    },
    {
      question: "How long does a standard web project take?",
      answer:
        "A standard corporate website or e-commerce store typically takes 3 to 4 weeks from concept to launch. More complex bespoke platforms or MERN stack web applications can take 6 to 8 weeks depending on the required logic and features.",
    },
    {
      question: "How many design revisions do I get?",
      answer:
        "We offer up to 3 rounds of design revisions during the UI/UX prototyping phase. We ensure you are 100% satisfied with the visual design before we move into the development and coding phase.",
    },
    {
      question: "Will my website be mobile-friendly and SEO-optimised?",
      answer:
        "Absolutely. Every digital product we engineer is fully responsive across all devices (mobile, tablet, desktop) and built with a strong technical SEO foundation to ensure maximum visibility on search engines.",
    },
  ];

  // FAQ Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="bg-[#030712] text-white font-jakarta py-24 relative overflow-hidden">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] mb-6 backdrop-blur-md">
            <MessageCircleQuestion className="w-4 h-4 text-blue-500" />
            <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0">
              Clear Answers
            </h2>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] m-0 drop-shadow-lg mb-6">
            Frequently Asked <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-blue-500 to-indigo-400">
              Questions
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-blue-500/5 border-blue-500/30"
                    : "bg-[#0a0f1c] border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left outline-none group"
                >
                  <h3
                    className={`text-[16px] font-bold m-0 transition-colors pr-4 ${isOpen ? "text-white" : "text-slate-300 group-hover:text-white"}`}
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-slate-500"}`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 pb-6 opacity-100" : "max-h-0 pb-0 opacity-0"}`}
                >
                  <p className="text-slate-400 text-[14.5px] leading-relaxed m-0">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
