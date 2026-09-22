import React, { useState, useEffect, useRef } from "react";
import { Quote, ArrowLeft, ArrowRight, Star } from "lucide-react";

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Sarah Auburn",
      role: "Chief Technical Officer",
      company: "Aura Financial",
      content:
        "CodeLume engineered a massive, highly optimised data pipeline. The latency is practically zero. It is an absolute masterclass in modern digital architecture.",
      rating: 5,
      accent: "text-blue-400",
      // 🚀 Replacing heavy 'bg-blue-600/15 blur-[160px]' with Hardware-Accelerated Radial Gradients
      bgGlow: "bg-[radial-gradient(circle,rgba(37,99,235,0.15)_0%,transparent_60%)]",
      avatarGlow: "shadow-[inset_0_0_15px_rgba(59,130,246,0.4)]",
      progressGlow: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]",
    },
    {
      id: 2,
      name: "Marcus Thorne",
      role: "E-Commerce Director",
      company: "Luxe Retail",
      content:
        "The bespoke storefront exceeded all our expectations. With their specialised frontend architecture, our conversion rates maximised immediately after launch.",
      rating: 5,
      accent: "text-indigo-400",
      bgGlow: "bg-[radial-gradient(circle,rgba(79,70,229,0.15)_0%,transparent_60%)]",
      avatarGlow: "shadow-[inset_0_0_15px_rgba(99,102,241,0.4)]",
      progressGlow: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "VP of Operations",
      company: "Nova Corp",
      content:
        "Migrating our legacy ERP was completely seamless. They delivered fully customised cloud solutions that instantly scaled our global operations.",
      rating: 5,
      accent: "text-cyan-400",
      bgGlow: "bg-[radial-gradient(circle,rgba(6,182,212,0.15)_0%,transparent_60%)]",
      avatarGlow: "shadow-[inset_0_0_15px_rgba(6,182,212,0.4)]",
      progressGlow: "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]",
    },
    {
      id: 4,
      name: "David Vance",
      role: "Head of Product",
      company: "Aether Systems",
      content:
        "Remarkable speed and flawless code quality. CodeLume delivered our entire MVP weeks ahead of schedule, fully optimised for global distribution.",
      rating: 5,
      accent: "text-purple-400",
      bgGlow: "bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_60%)]",
      avatarGlow: "shadow-[inset_0_0_15px_rgba(168,85,247,0.4)]",
      progressGlow: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]",
    },
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, reviews.length]);

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;

    cardRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <section className="relative w-full min-h-dvh flex flex-col justify-center items-center py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#030712] font-jakarta overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          @keyframes progress-fill { 0% { width: 0%; opacity: 0.5; } 100% { width: 100%; opacity: 1; } }
          .animate-progress { animation: progress-fill 6s linear forwards; }`}
      </style>

      {/* 🚀 FIXED: Replaced 'blur-[160px]' with radial gradient class. Kept dynamic bgGlow variable. */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full pointer-events-none transition-colors duration-1000 ease-in-out transform-gpu translate-z-0 ${reviews[activeIndex].bgGlow}`}
      />

      <div className="w-full max-w-6xl relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-10 w-full">
          <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-sm m-0">
            Proof of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white/40 to-white/90">
              Satisfaction.
            </span>
          </h2>
        </div>

        <div
          className="relative w-full max-w-5xl"
          style={{ perspective: "1200px" }}
        >
          <div
            ref={cardRef}
            // 🚀 FIXED: Optimized shadows and reduced backdrop-blur-3xl -> xl
            className="relative w-full rounded-4xl sm:rounded-4xl bg-[#0a0f1c]/75 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(255,255,255,0.02)] flex flex-col justify-between transform-gpu transition-transform duration-200 ease-out overflow-hidden will-change-transform"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-white/2 to-transparent pointer-events-none transform-gpu" />

            <Quote className="absolute top-6 left-6 sm:top-10 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 text-white/2 transform -scale-x-100 pointer-events-none" />

            <div className="grid w-full relative z-10 min-h-[14rem] sm:min-h-[11rem] lg:min-h-[10rem] items-center">
              {reviews.map((review, i) => (
                <div
                  key={review.id}
                  className={`col-start-1 row-start-1 transition-all duration-700 ease-out transform-gpu flex flex-col justify-center
                    ${i === activeIndex ? "opacity-100 translate-y-0 scale-100 blur-0 z-10 pointer-events-auto" : "opacity-0 -translate-y-6 scale-95 blur-md z-0 pointer-events-none"}
                  `}
                >
                  <div className="flex gap-1 mb-4 sm:mb-6">
                    {[...Array(review.rating)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                      />
                    ))}
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-white leading-snug sm:leading-tight tracking-tight m-0 drop-shadow-xl">
                    "{review.content}"
                  </h2>
                </div>
              ))}
            </div>

            <div className="relative w-full h-0.5 bg-white/3 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] my-8 sm:my-10 z-10 rounded-full overflow-hidden transform-gpu">
              <div
                key={activeIndex}
                className={`absolute top-0 left-0 h-full rounded-full transform-gpu ${reviews[activeIndex].progressGlow} ${isHovered ? "w-full" : "animate-progress"}`}
                style={{ animationPlayState: isHovered ? "paused" : "running" }}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              <div className="grid w-full sm:w-2/3">
                {reviews.map((review, i) => (
                  <div
                    key={review.id}
                    className={`col-start-1 row-start-1 flex items-center gap-4 transition-all duration-700 ease-out transform-gpu
                      ${i === activeIndex ? "opacity-100 translate-x-0 blur-0 z-10 pointer-events-auto" : "opacity-0 -translate-x-8 blur-sm z-0 pointer-events-none"}
                    `}
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#050811] flex items-center justify-center shrink-0 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform-gpu ${review.avatarGlow}`}
                    >
                      <h2
                        className={`text-xs sm:text-sm font-bold tracking-wider m-0 ${review.accent}`}
                      >
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </h2>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-base sm:text-xl font-bold text-white m-0 tracking-tight">
                        {review.name}
                      </h2>
                      <h2 className="text-[11px] sm:text-[13px] text-slate-400 font-medium m-0 mt-0.5">
                        {review.role}{" "}
                        <span className="text-slate-600 mx-1 hidden sm:inline">
                          /
                        </span>{" "}
                        <br className="sm:hidden" />{" "}
                        <span className="text-slate-300">{review.company}</span>
                      </h2>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#050811]/50 backdrop-blur-md shadow-[inset_0_0_15px_rgba(255,255,255,0.03),0_10px_20px_rgba(0,0,0,0.4)] hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.08),0_15px_30px_rgba(0,0,0,0.6)] hover:-translate-x-1 flex items-center justify-center transition-all duration-300 active:scale-[0.95] outline-none group transform-gpu"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#050811]/50 backdrop-blur-md shadow-[inset_0_0_15px_rgba(255,255,255,0.03),0_10px_20px_rgba(0,0,0,0.4)] hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.08),0_15px_30px_rgba(0,0,0,0.6)] hover:translate-x-1 flex items-center justify-center transition-all duration-300 active:scale-[0.95] outline-none group transform-gpu"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}