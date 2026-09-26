import React from "react";
import { Link } from "react-router-dom";
import { Code2, Braces, Key, Globe, ArrowRight, Terminal } from "lucide-react";

export default function DevToolsSection() {
  const tools = [
    {
      title: "SVG to React JSX",
      description: "Convert raw SVG code into production-ready functional React components instantly with camelCase formatting.",
      link: "/tools/svg-to-react",
      icon: Code2,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      borderColor: "group-hover:border-blue-500/50",
    },
    {
      title: "JSON to TypeScript",
      description: "Automatically generate deeply nested TypeScript interfaces and types from your raw JSON API payloads.",
      link: "/tools/json-to-ts",
      icon: Braces,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      borderColor: "group-hover:border-emerald-500/50",
    },
    {
      title: "JWT Decoder",
      description: "Securely decode, verify, and inspect JSON Web Tokens locally in your browser. No server interaction required.",
      link: "/tools/jwt-decoder",
      icon: Key,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
      borderColor: "group-hover:border-amber-500/50",
    },
    {
      title: "Meta Tag Extractor",
      description: "Extract SEO meta tags and preview Open Graph social media cards from any live URL to optimise sharing.",
      link: "/tools/meta-extractor",
      icon: Globe,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      borderColor: "group-hover:border-purple-500/50",
    },
  ];

  return (
    <section className="relative w-full py-24 bg-[#030712] font-jakarta overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 shadow-sm">
            <Terminal className="w-4 h-4 text-blue-400" />
            <h2 className="text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0">
              Tool-Led Growth
            </h2>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] m-0 mb-6">
            Free Utilities for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              Modern Developers
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl m-0 leading-relaxed">
            At CodeLume, we believe in giving back to the community. Speed up your workflow with our suite of free, lightning-fast developer tools.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <Link
                key={idx}
                to={tool.link}
                className={`group relative flex flex-col p-8 rounded-3xl bg-[#0a0f1c] border border-white/5 transition-all duration-500 hover:-translate-y-2 outline-none transform-gpu overflow-hidden ${tool.glow} ${tool.borderColor}`}
              >
                {/* Card Hover Gradient Background */}
                <div className="absolute inset-0 bg-linear-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex items-start gap-5">
                  <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${tool.bgColor}`}>
                    <Icon className={`w-7 h-7 ${tool.color}`} />
                  </div>
                  
                  <div className="flex flex-col flex-1">
                    <h2 className="text-[22px] font-extrabold text-white mb-3 m-0 flex items-center justify-between">
                      {tool.title}
                      <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out transform-gpu" />
                    </h2>
                    <p className="text-[15px] font-medium text-slate-400 leading-relaxed m-0 group-hover:text-slate-300 transition-colors duration-300">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Bottom Call to Action */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/tools"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 text-white transition-all duration-300 outline-none"
          >
            <h2 className="text-[15px] font-bold m-0">View All Developer Tools</h2>
            <ArrowRight className="w-4 h-4 text-blue-400 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}