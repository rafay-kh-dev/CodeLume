import React from "react";
import { Link } from "react-router-dom";
import { Code, Users, Globe, Zap, CheckCircle2, Rocket } from "lucide-react";
import { Whatsapp, Gmail2026 } from '@thesvg/react';

export default function AboutCodeLume() {
  return (
    <div className="min-h-dvh bg-[#030712] text-white font-jakarta pt-24 pb-20 overflow-hidden relative">
      {/* Background Glowing Effects */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#3b82f6]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 mt-10">
          <h2 className="text-[#3b82f6] text-sm font-black uppercase tracking-[0.2em] mb-4 m-0">
            About CodeLume & The Creator
          </h2>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white m-0 tracking-tighter leading-tight mb-6">
            Crafting Websites <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3b82f6] to-[#60a5fa]">
              For Your Business
            </span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            CodeLume is a premium digital hub, built and maintained by an independent freelancer specialising in bringing your creative ideas to life through modern web technologies.
          </p>
        </div>

        {/* Story / About Rafay Section with Code Visual */}
        <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-8 md:p-12 lg:p-16 mb-24 shadow-2xl flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b82f6]/5 rounded-full blur-[80px]" />
          
          <div className="flex-1 space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white m-0 tracking-tight">
              Hi, I am Rafay
            </h2>
            <h2 className="text-xl text-[#3b82f6] font-bold m-0 mt-2">
              Freelance Web Developer & UI/UX Designer
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              I am an independent freelancer specialising in crafting custom, high-converting websites and digital experiences. Whether you need a full-stack MERN application, a dynamic WordPress site, or an advanced SEO strategy to rank higher, I deliver tailored solutions that help your business grow.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Full-Stack Web Development (React, Node, PHP)",
                "UI/UX Design & Branding Mockups",
                "Advanced Local & Technical SEO",
                "Digital Marketing & Ad Creatives"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-300 font-medium">
                  <CheckCircle2 className="text-[#3b82f6] w-5 h-5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Code Editor Visual Mockup */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative z-10">
            <div className="relative w-full max-w-md aspect-square sm:aspect-[4/3] rounded-3xl bg-linear-to-br from-[#1e293b]/50 to-[#0f172a]/50 border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 group">
              
              <div className="absolute inset-4 bg-[#030712] rounded-2xl border border-white/5 flex flex-col shadow-2xl overflow-hidden z-20 group-hover:scale-[1.02] transition-transform duration-500">
                {/* Mac OS Style Window Controls */}
                <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-white/[0.02]">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <div className="ml-2 text-[10px] text-slate-500 font-mono tracking-widest uppercase">developer.js</div>
                </div>
                {/* Code Content */}
                <div className="p-6 font-mono text-sm md:text-base text-slate-400 flex flex-col gap-2 overflow-hidden">
                  <p><span className="text-[#c678dd]">const</span> <span className="text-[#e5c07b]">developer</span> <span className="text-[#56b6c2]">=</span> <span className="text-[#e06c75]">{"{"}</span></p>
                  <p className="pl-4">name: <span className="text-[#98c379]">'Rafay'</span>,</p>
                  <p className="pl-4">role: <span className="text-[#98c379]">'Full-Stack & UI/UX'</span>,</p>
                  <p className="pl-4">skills: <span className="text-[#e5c07b]">[</span><span className="text-[#98c379]">'MERN'</span>, <span className="text-[#98c379]">'WordPress'</span><span className="text-[#e5c07b]">]</span>,</p>
                  <p className="pl-4">status: <span className="text-[#98c379]">'Available for Work'</span></p>
                  <p><span className="text-[#e06c75]">{"}"}</span>;</p>
                  <p className="mt-2 animate-pulse text-[#61afef]">_</p>
                </div>
              </div>
              {/* Blue Glow Behind Code Box */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#3b82f6]/20 rounded-full blur-[60px] z-10" />
            
            </div>
          </div>
        </div>

        {/* Features / Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <FeatureCard 
            icon={<Code size={24} />} 
            title="Clean Code" 
            desc="Best practices, modern syntax, and highly optimised architectures." 
          />
          <FeatureCard 
            icon={<Users size={24} />} 
            title="Client Focused" 
            desc="Direct communication with me. No agencies, no middle-men." 
          />
          <FeatureCard 
            icon={<Globe size={24} />} 
            title="Global Reach" 
            desc="Delivering top-tier digital products to clients worldwide." 
          />
          <FeatureCard 
            icon={<Zap size={24} />} 
            title="Fast Delivery" 
            desc="Strict deadlines met with lightning-fast user experiences." 
          />
        </div>

        {/* Heavy CTA / Contact Section */}
        <div className="bg-linear-to-br from-[#0a0f1c] to-[#030712] border border-[#3b82f6]/20 rounded-3xl p-10 md:p-12 lg:p-16 text-center max-w-5xl mx-auto shadow-[0_0_50px_rgba(59,130,246,0.15)]">
          <h2 className="text-3xl md:text-4xl font-black text-white m-0 tracking-tight mb-4">
            Ready to start your next project?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            I am currently accepting new clients. Get in touch directly to discuss your requirements, get a custom quote, and let us build something amazing together.
          </p>
          
          {/* 3 Buttons in a Single Equal Row */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 w-full">
            
            <Link
              to="/start-project"
              className="flex-1 flex items-center justify-center gap-2 px-6 h-14 rounded-xl bg-linear-to-r from-[#3b82f6] to-[#2563eb] text-white font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1 w-full"
            >
              <Rocket size={20} /> Hire Me Now
            </Link>
            
            <a
              href="mailto:your.email@example.com"
              className="flex-1 flex items-center justify-center gap-2 px-6 h-14 rounded-xl bg-[#1e293b] hover:bg-white/10 text-white font-bold transition-all w-full"
            >
              <Gmail2026 className="h-6 w-6" /> Email Directly
            </a>

            <a
              href="https://wa.me/1234567890" 
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center px-6 h-14 rounded-xl bg-green-600/10 hover:bg-green-600/20 text-green-500 border border-green-600/20 transition-all w-full"
            >
              <Whatsapp variant="wordmark" className="h-[22px] w-auto" />
            </a>
            
          </div>
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
      <h2 className="text-lg font-bold text-white m-0 mb-2">{title}</h2>
      <p className="text-sm text-slate-400 leading-relaxed m-0">
        {desc}
      </p>
    </div>
  );
}