import React from "react";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";

export default function CaseStudies() {
  const projects = [
    {
      id: 1,
      title: "FinTech Analytics Dashboard",
      client: "Aura Financial",
      description: "We architected a highly secure, specialised financial dashboard engineered for real-time market data processing. The platform is completely customised to handle thousands of concurrent users with zero latency.",
      tags: ["React", "Node.js", "WebSockets", "MongoDB"],
      color: "from-blue-600/40 via-blue-900/20 to-[#030712]",
      accent: "text-blue-400",
      topOffset: "top-16 sm:top-24", // Sticks highest on the screen
      zIndex: "z-10",
    },
    {
      id: 2,
      title: "Global E-Commerce Platform",
      client: "Luxe Retail",
      description: "A fully customised storefront engineered for massive scale and highly optimised for maximum conversions. Features synchronised inventory management and dynamic 3D product previews.",
      tags: ["Next.js", "Shopify Plus", "Tailwind CSS", "GraphQL"],
      color: "from-indigo-600/40 via-purple-900/20 to-[#030712]",
      accent: "text-indigo-400",
      topOffset: "top-24 sm:top-32", // Stacks over Card 1
      zIndex: "z-20",
    },
    {
      id: 3,
      title: "Enterprise ERP System",
      client: "Nova Corp",
      description: "An advanced, deeply specialised enterprise resource planning system. We streamlined their fragmented legacy software into a centralised, highly optimised cloud architecture.",
      tags: ["Laravel", "Vue.js", "PostgreSQL", "AWS"],
      color: "from-cyan-600/40 via-teal-900/20 to-[#030712]",
      accent: "text-cyan-400",
      topOffset: "top-32 sm:top-40", // Stacks over Card 2
      zIndex: "z-30",
    }
  ];

  return (
    <section className="relative w-full bg-[#030712] pt-8 pb-8 sm:pt-18 sm:pb-14 font-jakarta">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        `}
      </style>

      {/* Global Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 sm:mb-32">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-8 leading-[1.1] drop-shadow-lg m-0">
            Proof of <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
              Excellence.
            </span>
          </h2>
          <h2 className="text-base sm:text-lg md:text-xl text-slate-400/90 font-medium leading-relaxed max-w-2xl m-0">
            Explore a curated selection of our highly specialised, bespoke digital solutions engineered for industry leaders.
          </h2>
        </div>

        {}
        <div className="relative w-full pb-20">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`sticky ${project.topOffset} ${project.zIndex} w-full mb-12 sm:mb-24 transition-all duration-700 ease-out`}
            >
              {/* Premium Card Container - 100% Borderless, pure shadow and blur */}
              <div className="relative w-full rounded-[2rem] sm:rounded-[3rem] bg-[#0a0f1c]/80 backdrop-blur-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[450px] lg:min-h-[500px]">
                
                {/* Simulated Glass Reflection (No borders) */}
                <div className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] shadow-[inset_0_0_40px_rgba(255,255,255,0.03)] pointer-events-none z-20" />
                
                {/* Left Side: Abstract CSS Art representing the project image */}
                <div className={`relative w-full lg:w-5/12 shrink-0 bg-gradient-to-br ${project.color} overflow-hidden flex items-center justify-center p-8 sm:p-12 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.2)]`}>
                  {/* Abstract floating shapes */}
                  <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 h-32 sm:w-48 rounded-full bg-white/5 blur-[30px] animate-[pulse_6s_ease-in-out_infinite]" />
                  <div className="absolute bottom-1/4 right-1/4 w-40 sm:w-56 h-40 sm:w-56 rounded-full bg-black/40 blur-[40px] animate-[pulse_8s_ease-in-out_infinite]" />
                  
                  <div className="relative z-10 w-full aspect-video rounded-2xl bg-[#030712]/50 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] rounded-2xl pointer-events-none" />
                     <ExternalLink className={`w-10 h-10 sm:w-12 sm:h-12 ${project.accent} opacity-50`} strokeWidth={1} />
                  </div>
                </div>

                {/* Right Side: Content Area */}
                <div className="relative w-full lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center z-10 bg-[#050812]/40">
                  <div className="flex flex-col h-full justify-between">
                    
                    <div>
                      <h2 className={`text-[12px] sm:text-[13px] font-extrabold ${project.accent} uppercase tracking-[0.2em] mb-4 m-0`}>
                        {project.client}
                      </h2>
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-[1.1] m-0 drop-shadow-md">
                        {project.title}
                      </h2>
                      <h2 className="text-base sm:text-lg text-slate-400/90 leading-relaxed font-medium mb-10 max-w-2xl m-0">
                        {project.description}
                      </h2>
                    </div>

                    {}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-auto">
                      <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag, tagIndex) => (
                          <div 
                            key={tagIndex} 
                            className="px-4 py-2 rounded-full bg-white/[0.03] shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]"
                          >
                            <h2 className="m-0 text-[12px] sm:text-[13px] font-bold text-slate-300 tracking-wide">
                              {tag}
                            </h2>
                          </div>
                        ))}
                      </div>

                      <a 
                        href={`#case-study-${project.id}`}
                        className="group flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl bg-white text-slate-950 hover:bg-slate-200 shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all duration-300 active:scale-[0.98] outline-none shrink-0"
                      >
                        <h2 className="m-0 text-[14px] sm:text-[15px] font-bold text-inherit">
                          View Case Study
                        </h2>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}