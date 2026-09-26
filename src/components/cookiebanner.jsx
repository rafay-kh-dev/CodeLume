import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check agar user pehle hi cookies accept/reject kar chuka hai
    const consent = localStorage.getItem("codelume_cookie_consent");
    if (!consent) {
      // Thora delay de kar show karein taake natural feel ho
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("codelume_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("codelume_cookie_consent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    // Fixed at bottom, pointer-events-none taake peeche click block na ho
    <div className="fixed bottom-0 left-0 w-full z-[100] px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none">
      {/* Actual banner with pointer-events-auto */}
      <div className="max-w-6xl mx-auto pointer-events-auto animate-[slideUp_0.5s_ease-out]">
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>

        <div className="bg-[#050b14]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.1)] p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-blue-500/10 to-transparent pointer-events-none" />

          <div className="flex items-start md:items-center gap-4 relative z-10 w-full md:w-auto pr-6 md:pr-0">
            <div className="w-10 h-10 shrink-0 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mt-1 md:mt-0">
              <Cookie className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-white m-0 tracking-tight">
                We value your privacy
              </h2>
              <p className="text-[13px] text-slate-400 m-0 mt-1 leading-relaxed max-w-3xl">
                We use cookies to enhance your browsing experience, serve
                personalised content, and analyse our traffic. By clicking
                "Accept All", you consent to our use of cookies. Read our{" "}
                <Link
                  to="/privacy-policy"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 font-medium outline-none"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto relative z-10 shrink-0 justify-end md:justify-start">
            <button
              onClick={handleDecline}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 text-[13px] font-bold hover:bg-white/5 hover:text-white transition-colors outline-none"
            >
              Reject All
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white text-[13px] font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-0.5 outline-none"
            >
              Accept All
            </button>

            {/* Mobile Close Icon */}
            <button
              onClick={handleDecline}
              className="absolute -top-1 -right-1 md:hidden text-slate-500 hover:text-white p-2 outline-none"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
