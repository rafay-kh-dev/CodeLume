import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Layout, Code, TrendingUp, BadgeCheck, Sparkles } from "lucide-react";

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      title: "Next-Gen E-Commerce Platform",
      category: "Full-Stack Development",
      client: "TechGear Pro",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Code className="w-5 h-5 text-blue-400" />,
      challenge: "The client's existing store was crashing during peak traffic and suffered from a 4-second load time, leading to massive cart abandonment.",
      solution: "Developed a custom MERN stack application with server-side rendering for technical SEO, implementing Redis caching and highly optimised MongoDB indexing.",
      results: [
        "Load time reduced to 0.8 seconds",
        "45% increase in online conversion rate",
        "Zero server downtime during major sales"
      ]
    },
    {
      id: 2,
      title: "SaaS Dashboard Redesign",
      category: "UI/UX Design",
      client: "Nova Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Layout className="w-5 h-5 text-purple-400" />,
      challenge: "Their data analytics dashboard was overly complex, causing poor user retention and high customer support ticket volumes.",
      solution: "Conducted extensive user research to build a clean, intuitive, and modern dark-mode interface using Figma and React Tailwind CSS.",
      results: [
        "60% drop in user support tickets",
        "User retention increased by a massive 35%",
        "Streamlined onboarding process"
      ]
    },
    {
      id: 3,
      title: "Local SEO & Traffic Scaling",
      category: "Digital Marketing",
      client: "Urban Estates",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <TrendingUp className="w-5 h-5 text-green-400" />,
      challenge: "A real estate agency was struggling to generate organic leads in a highly competitive local property market.",
      solution: "Executed a comprehensive technical SEO audit, rebuilt their WordPress site structure, and launched a targeted backlink strategy.",
      results: [
        "Ranked #1 on Google for 15 core keywords",
        "Organic search traffic grew by 210%",
        "Monthly inbound client leads tripled"
      ]
    }
  ];

  return (
    <div className="min-h-dvh bg-[#030712] text-white font-jakarta pt-28 sm:pt-36 pb-20 overflow-hidden relative">
      
      {/* Background Glowing Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0">
              Our Success Stories
            </h2>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] m-0 drop-shadow-lg mb-6">
            Proven results for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3b82f6] via-indigo-400 to-cyan-400">
              ambitious brands.
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Explore how we solve complex problems through strategic design, robust development, and data-driven marketing.
          </p>
        </div>

        {/* Case Studies List */}
        <div className="flex flex-col gap-24 lg:gap-32 mb-10">
          {caseStudies.map((study, index) => (
            <div 
              key={study.id} 
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              
              {/* Image Section */}
              <div className="w-full lg:w-1/2 group relative">
                <div className="absolute inset-0 bg-linear-to-tr from-[#3b82f6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-4xl blur-2xl" />
                <div className="relative aspect-[4/3] w-full rounded-4xl overflow-hidden border border-white/10 bg-[#0a0f1c] shadow-2xl">
                  <div className="absolute inset-0 bg-[#3b82f6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Floating Category Badge */}
                  <div className="absolute top-6 left-6 bg-[#030712]/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 z-20 shadow-xl">
                    {study.icon}
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      {study.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="w-8 h-[2px] bg-[#3b82f6] rounded-full"></span>
                  <h2 className="text-sm font-black text-[#3b82f6] uppercase tracking-[0.2em] m-0">
                    {study.client}
                  </h2>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-8 m-0">
                  {study.title}
                </h2>
                
                <div className="space-y-6 mb-10 relative">
                  {/* Subtle Decorative Line */}
                  <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-linear-to-b from-[#3b82f6]/50 to-transparent opacity-50 rounded-full"></div>
                  
                  <div className="pl-6">
                    <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 m-0">The Challenge</h2>
                    <p className="text-slate-300 leading-relaxed text-[15px] sm:text-base">
                      {study.challenge}
                    </p>
                  </div>
                  <div className="pl-6">
                    <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 m-0">Our Solution</h2>
                    <p className="text-slate-300 leading-relaxed text-[15px] sm:text-base">
                      {study.solution}
                    </p>
                  </div>
                </div>

                {/* Key Results Box */}
                <div className="bg-linear-to-br from-[#0a0f1c] to-[#030712] border border-white/5 rounded-2xl p-6 md:p-8 mb-10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <h2 className="text-xs font-black text-white uppercase tracking-widest mb-5 m-0 relative z-10">
                    Key Results
                  </h2>
                  <ul className="space-y-4 relative z-10">
                    {study.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <BadgeCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform" />
                        <span className="text-slate-200 font-medium text-sm sm:text-[15px] leading-snug">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Styled Blue CTA Button */}
                <Link
                  to="/start-project"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-[#3b82f6] to-[#2563eb] text-white font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1 w-full sm:w-max group"
                >
                  Start a similar project 
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}