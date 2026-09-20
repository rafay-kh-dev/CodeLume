import React from 'react';
import { Code2, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                CodeLume<span className="text-blue-500">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Specialized frontend development studio focused on React, Tailwind CSS, and high-converting lead architecture.
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">Direct Contact</div>
            <a
              href="mailto:hello@codelume.com"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-semibold"
            >
              <Mail className="w-4 h-4" />
              <span>hello@codelume.com</span>
            </a>
            <p className="text-xs text-slate-500">
              Inquiries processed within 24 hours.
            </p>
          </div>

          <div className="md:col-span-3 flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-2 text-xs font-bold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} CodeLume Studio. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#services" className="hover:text-slate-300 transition-colors">Services</a>
            <a href="#estimator" className="hover:text-slate-300 transition-colors">Estimator</a>
            <a href="#portfolio" className="hover:text-slate-300 transition-colors">Portfolio</a>
          </div>
        </div>

      </div>
    </footer>
  );
}