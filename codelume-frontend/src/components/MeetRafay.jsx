"use client";
import React, { useState, useEffect, useRef } from "react";
import { Play, Volume2, ArrowRight } from "lucide-react";
import Link from "next/link";

// 1. EXACT Calculator Logic & Styling: font-medium, exact cursor sizing (w-[3px] h-[0.8em])
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
      className="min-h-[100px] sm:min-h-[120px] lg:min-h-[130px] flex items-center lg:items-start justify-center lg:justify-start mb-4 sm:mb-6 w-full relative"
    >
      {/* EXACT Calculator Classes: font-medium, specific text sizes */}
      <h2 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-medium text-black tracking-tight leading-[1.1] m-0 w-full text-center lg:text-left">
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            <span className={idx === 1 ? "text-gray-400" : "text-black"}>
              {line}
            </span>
            {idx !== lines.length - 1 && <br />}
          </React.Fragment>
        ))}
        {/* EXACT Calculator Cursor: patla aur lamba (w-[3px] h-[0.8em]) */}
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

// ==========================================
// INLINE VOICE PROFILE COMPONENT
// ==========================================
const InlineVoiceProfile = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10 py-6 sm:py-0">
      <audio ref={audioRef} src="/rafay-intro.mp3" preload="auto" />
      
      <div className="relative group/btn cursor-pointer" onClick={toggleAudio}>
        {/* Pulsing rings when playing */}
        {isPlaying && (
          <>
            <div className="absolute inset-0 rounded-full bg-[#4285F4] animate-ping opacity-20 scale-125 sm:scale-150"></div>
            <div className="absolute inset-[-6px] sm:inset-[-8px] rounded-full border-[3px] border-[#4285F4] animate-[spin_3s_linear_infinite] border-t-transparent z-20"></div>
          </>
        )}
        
        {/* The Image */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-50 flex items-center justify-center z-10 transition-transform duration-300 group-hover/btn:scale-[1.02] active:scale-95">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 z-0"></div>
          
          <img 
             src="/rafay-profile.webp" 
             alt="Rafay Profile" 
             className="w-full h-full object-cover relative z-10"
             onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          
          {/* Play/Pause Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center z-30 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover/btn:opacity-100'}`}>
            {isPlaying ? (
              <div className="flex items-center gap-1.5 h-6">
                <span className="w-1.5 h-full bg-white rounded-full animate-[bounce_1s_infinite_0ms]"></span>
                <span className="w-1.5 h-3/4 bg-white rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                <span className="w-1.5 h-full bg-white rounded-full animate-[bounce_1s_infinite_400ms]"></span>
              </div>
            ) : (
              <Play className="w-10 h-10 text-white fill-white ml-2" />
            )}
          </div>
        </div>
      </div>
      
      <div className={`mt-8 sm:mt-10 flex items-center justify-center gap-2.5 text-[12.5px] sm:text-[13.5px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full border shadow-sm transition-colors duration-300 whitespace-nowrap z-30 ${isPlaying ? 'bg-blue-50 text-[#4285F4] border-blue-100' : 'bg-white text-gray-500 border-gray-200'}`}>
        <Volume2 className="w-3.5 h-3.5" />
        {isPlaying ? "Playing Intro..." : "Listen"}
      </div>
    </div>
  );
};

export default function MeetRafay() {
  return (
    <section className="bg-white font-jakarta py-16 sm:py-24 overflow-hidden border-t border-gray-100 relative">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-10 lg:px-12 relative z-10">
        <div className="bg-gray-50 border border-gray-200 rounded-[24px] sm:rounded-[32px] p-6 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-10 sm:gap-16 shadow-sm overflow-hidden relative">
          
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50 rounded-full blur-[80px] -z-10" />

          {/* Left: Voice Profile Image */}
          <InlineVoiceProfile />

          {/* Right: Intro Text */}
          <div className="flex-1 text-center lg:text-left mt-4 lg:mt-0">
            <h2 className="text-[12px] sm:text-[13px] font-bold text-[#4285F4] uppercase tracking-widest mb-3 sm:mb-4">
              Independent Full-Stack Developer
            </h2>
            
            {/* EXACT CALCULATOR TYPEWRITER APPLIED HERE */}
            <TypewriterHeading text={"Hi, I'm Rafay.\nLet's build something great."} />
            
            <p className="text-[15px] sm:text-[17px] text-gray-500 font-medium leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              When you hire me, you aren't dealing with managers or agency red-tape. I personally engineer your web applications, optimize your SEO, and design your digital presence from start to finish.
            </p>
            <Link 
              href="/about"
              className="inline-flex items-center justify-center gap-2 text-[14px] sm:text-[15px] font-bold text-black hover:text-[#4285F4] transition-colors group"
            >
              More about me
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}