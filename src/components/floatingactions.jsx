import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
// Official Whatsapp wordmark from @thesvg/react
import { Whatsapp } from "@thesvg/react";

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const waMessage = encodeURIComponent(
    "Hi Rafay! I was browsing the CodeLume website and have a quick question.",
  );

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 items-end pointer-events-none">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`pointer-events-auto w-12 h-12 rounded-full bg-[#0a0f1c] border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/20 shadow-lg flex items-center justify-center transition-all duration-300 outline-none transform-gpu ${
          showScroll
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-4 opacity-0 invisible"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Floating WhatsApp Wordmark Button with "Focusing" Glow */}
      <div className="relative pointer-events-auto">
        {/* Yeh background glow button ko focus aur highlight karega (Pulse Animation) */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-20 animate-pulse" />

        <a
          href={`https://wa.me/923347835980?text=${waMessage}`}
          target="_blank"
          rel="noreferrer"
          className="relative flex items-center justify-center px-6 py-4 rounded-full bg-[#0a0f1c] border border-[#25D366]/40 shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] hover:-translate-y-1 transition-all duration-300 outline-none focus:ring-4 focus:ring-[#25D366]/50 group"
          aria-label="Chat on WhatsApp"
        >
          {/* Size h-8 w-auto rakha hai taake logo bara aur clear nazar aaye */}
          <Whatsapp
            variant="wordmark"
            className="h-8 w-auto transition-transform group-hover:scale-105"
          />
        </a>
      </div>
    </div>
  );
}
