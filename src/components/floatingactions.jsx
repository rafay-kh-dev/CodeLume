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
    // items-end use kiya hai taake dono buttons right side par properly align rahein
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-12 h-12 rounded-full bg-[#0a0f1c] border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/20 shadow-lg flex items-center justify-center transition-all duration-300 outline-none transform-gpu ${
          showScroll
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-4 opacity-0 invisible"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Floating WhatsApp Wordmark Button (Pill Shape) */}
      <a
        href={`https://wa.me/923347835980?text=${waMessage}`}
        target="_blank"
        rel="noreferrer"
        className="px-5 py-3.5 rounded-full bg-[#0a0f1c] border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:border-[#25D366]/50 hover:shadow-[0_15px_35px_rgba(37,211,102,0.15)] hover:-translate-y-1 flex items-center justify-center transition-all duration-300 outline-none group"
        aria-label="Chat on WhatsApp"
      >
        {/* Exact code as requested, w-auto used to prevent squishing */}
        <Whatsapp variant="wordmark" className="h-6 w-auto" />
      </a>
    </div>
  );
}
