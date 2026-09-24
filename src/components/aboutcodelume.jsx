import React from "react";
import { Link } from "react-router-dom";
import { Code, Users, Globe, Zap, CheckCircle2, Mail, Briefcase } from "lucide-react";
import { Whatsapp } from '@thesvg/react';

export default function AboutCodeLume() {
  return (
    <div className="min-h-dvh bg-[#030712] text-white font-jakarta pt-24 pb-20 overflow-hidden relative">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#3b82f6]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
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

        <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-8 md:p-12 lg:p-16 mb-24 shadow-2xl flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
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
          
          <div className="flex-1 w-full flex justify-center md:justify-end relative z-10">
            <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-3xl p-1 bg-linear-to-br from-[#3b82f6] to-transparent shadow-[0_0_40px_rgba(59,130,246,0.15)] group">
              <div className="w-full h-full rounded-3xl bg-[#030712] overflow-hidden relative border border-white/5">
                <div className="absolute inset-0 bg-[#3b82f6]/0 group-hover:bg-[#3b82f6]/10 transition-colors duration-500 z-10" />
                {/* Yahan aapni real image ka URL daal sakte hain */}
                <img 
                  src="https://ui-avatars.com/api/?name=Rafay&size=512&background=0a0f1c&color=3b82f6&font-size=0.33&bold=true" 
                  alt="Rafay" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-[#0a0f1c] border border-white/10 p-3 px-4 rounded-2xl shadow-xl flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-bold text-white">Available for Work</span>
              </div>
            </div>
          </div>
        </div>

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

        <div className="bg-linear-to-br from-[#0a0f1c] to-[#030712] border border-[#3b82f6]/20 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto shadow-[0_0_50px_rgba(59,130,246,0.1)]">
          <h2 className="text-3xl md:text-4xl font-black text-white m-0 tracking-tight mb-4">
            Ready to start your next project?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            I am currently accepting new clients. Get in touch directly to discuss your requirements, get a custom quote, and let us build something amazing together.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/start-project"
              className="flex items-center gap-2 px-8 h-14 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold transition-all shadow-lg hover:shadow-[#3b82f6]/25 hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              <Briefcase size={18} /> Hire Me Now
            </Link>
            
            <a
              href="mailto:your.email@example.com"
              className="flex items-center gap-2 px-8 h-14 rounded-xl bg-[#1e293b] hover:bg-white/10 text-white font-bold transition-all w-full sm:w-auto justify-center"
            >
              <Mail size={18} /> Email Directly
            </a>

            <a
              href="https://wa.me/1234567890" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center px-6 h-14 rounded-xl bg-green-600/10 hover:bg-green-600/20 text-green-500 border border-green-600/20 transition-all w-full sm:w-auto"
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