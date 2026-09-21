import React from "react";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Auburn",
      role: "Chief Technical Officer",
      company: "Aura Financial",
      content: "CodeLume completely transformed our data processing capabilities. The custom dashboard they built is visually stunning and handles thousands of concurrent users with zero latency. Truly elite engineering.",
      rating: 5,
      gradient: "from-blue-600/20 via-blue-900/10 to-transparent",
      accent: "text-blue-400",
      glow: "shadow-[0_0_30px_rgba(37,99,235,0.2)]"
    },
    {
      id: 2,
      name: "Marcus Thorne",
      role: "E-Commerce Director",
      company: "Luxe Retail",
      content: "The bespoke storefront exceeded all our expectations. Our conversion rates jumped by 40% immediately after launch. Their attention to UI/UX detail and technical architecture is unmatched.",
      rating: 5,
      gradient: "from-indigo-600/20 via-indigo-900/10 to-transparent",
      accent: "text-indigo-400",
      glow: "shadow-[0_0_30px_rgba(99,102,241,0.2)]"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "VP of Operations",
      company: "Nova Corp",
      content: "Migrating our legacy ERP was a daunting task, but CodeLume made it completely seamless. They understood our complex business structure and delivered a highly optimised cloud solution.",
      rating: 5,
      gradient: "from-cyan-600/20 via-teal-900/10 to-transparent",
      accent: "text-cyan-400",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.2)]"
    },
    {
      id: 4,
      name: "David Vance",
      role: "Head of Product",
      company: "Aether Systems",
      content: "Remarkable speed, flawless code quality, and exceptional communication. CodeLume delivered our entire MVP weeks ahead of schedule without sacrificing a single detail.",
      rating: 5,
      gradient: "from-purple-600/20 via-purple-900/10 to-transparent",
      accent: "text-purple-400",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.2)]"
    }
  ];

  // Doubling array for seamless 360-degree marquee loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="relative w-full bg-[#030712] pt-0 pb-16 sm:pt-0 sm:pb-28 font-jakarta overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }

          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee-smooth {
            display: flex;
            width: max-content;
            animation: marquee 35s linear infinite;
          }

          .animate-marquee-smooth:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Global Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[350px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 leading-[1.15] drop-shadow-lg m-0">
            Proof of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">Satisfaction.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400/90 font-medium leading-relaxed m-0 max-w-xl">
            See what industry founders and enterprise partners say about building digital products with CodeLume.
          </p>
        </div>

      </div>

      {/* Animated Marquee Container with Subtle Side Fades */}
      <div className="relative w-full overflow-hidden py-4">
        
        {/* Left & Right Glass Gradients to soften edges */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-[#030712] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-[#030712] to-transparent z-20 pointer-events-none" />

        <div className="animate-marquee-smooth flex gap-5 sm:gap-6 px-4">
          {duplicatedReviews.map((review, index) => (
            <div 
              key={`${review.id}-${index}`}
              className="group relative w-[300px] sm:w-[420px] shrink-0 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0a0f1c]/90 backdrop-blur-2xl border border-white/[0.05] hover:border-white/20 transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing"
            >
              {/* Card Ambient Glow on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${review.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              <div className="relative z-10">
                {/* Header Row: Quote & Rating */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700/60 group-hover:text-blue-400/40 transition-colors duration-300" />
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed mb-6">
                  "{review.content}"
                </p>
              </div>

              {/* Client Profile Info */}
              <div className="relative z-10 flex items-center gap-3.5 pt-5 border-t border-white/[0.06]">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                  <span className={`text-xs sm:text-sm font-bold ${review.accent} tracking-wider`}>
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold m-0 tracking-wide group-hover:text-blue-300 transition-colors">
                    {review.name}
                  </h4>
                  <p className="text-slate-400 text-[11px] sm:text-[12px] font-medium tracking-wide mt-0.5 m-0">
                    {review.role} · <span className="text-slate-300 font-semibold">{review.company}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}