import React from "react";
import { Link } from "react-router-dom";
import { Code, Users, Globe, Zap, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutCodeLume() {
  return (
    <div className="min-h-dvh bg-[#030712] text-white font-jakarta pt-24 pb-20 overflow-hidden relative">
      {/* Background Glowing Effects */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#3b82f6]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 mt-10">
          <h2 className="text-[#3b82f6] text-sm font-black uppercase tracking-[0.2em] mb-4 m-0">
            About CodeLume
          </h2>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white m-0 tracking-tighter leading-tight mb-6">
            Illuminating the Web <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3b82f6] to-[#60a5fa]">
              One Line at a Time
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            CodeLume is a modern hub for web developers, designers, and tech enthusiasts. 
            We break down complex programming concepts into beautifully crafted, easy-to-understand articles.
          </p>
        </div>

        {/* Features / Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <FeatureCard 
            icon={<Code size={24} />} 
            title="Clean Code" 
            desc="Best practices and modern syntax for scalable applications." 
          />
          <FeatureCard 
            icon={<Users size={24} />} 
            title="Community First" 
            desc="Built for developers, by developers. Sharing knowledge openly." 
          />
          <FeatureCard 
            icon={<Globe size={24} />} 
            title="Global Reach" 
            desc="Connecting tech enthusiasts from Australia to the world." 
          />
          <FeatureCard 
            icon={<Zap size={24} />} 
            title="Fast Performance" 
            desc="Optimised architectures and lightning-fast user experiences." 
          />
        </div>

        {/* Story Section */}
        <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-12 items-center mb-24 shadow-2xl">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white m-0 tracking-tight">
              Our Mission
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              The digital landscape is evolving faster than ever. We started CodeLume with a simple goal: 
              to cut through the noise and provide high-quality, actionable insights for full-stack development, 
              UI/UX design, and modern web deployment.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "In-depth technical tutorials",
                "UI/UX design principles and trends",
                "Frontend and Backend architecture guides",
                "SEO and digital marketing strategies"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-300 font-medium">
                  <CheckCircle2 className="text-[#3b82f6] w-5 h-5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-square md:aspect-[4/3] rounded-2xl bg-linear-to-br from-[#1e293b] to-[#0f172a] border border-white/10 relative overflow-hidden flex items-center justify-center shadow-inner">
               <Code className="w-32 h-32 text-white/5" />
               <div className="absolute inset-0 bg-linear-to-t from-[#030712] via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white m-0 tracking-tight mb-4">
            Ready to explore?
          </h2>
          <p className="text-slate-400 mb-8">
            Dive into our latest articles and start building better digital experiences today.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold transition-all shadow-lg hover:shadow-[#3b82f6]/25 hover:-translate-y-1"
          >
            Read Our Blog <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-[#0a0f1c] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.02] transition-colors group">
      <div className="w-12 h-12 bg-[#3b82f6]/10 text-[#3b82f6] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}