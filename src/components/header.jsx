import React, { useState, useEffect } from 'react';
import { Code2, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/30 transition-transform duration-300 group-hover:scale-105">
              <Code2 className="w-6 h-6 relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                CodeLume<span className="text-blue-600">.</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">
                Premium Studio
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {['Services', 'Scope Estimator', 'Selected Work'].map((item) => (
              <a 
                key={item}
                href={`#${item.split(' ')[0].toLowerCase()}`} 
                className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors py-2"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#estimator"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Get an Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200/80 shadow-lg px-4 py-4">
          <div className="space-y-2">
            {['Services', 'Scope Estimator', 'Selected Work'].map((item) => (
              <a
                key={item}
                href={`#${item.split(' ')[0].toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-slate-100">
              <a
                href="#estimator"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}