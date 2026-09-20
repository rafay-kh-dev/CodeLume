import React from 'react';
import { Layout, Zap, Smartphone, Layers, Check } from 'lucide-react';

const services = [
  {
    icon: Layout,
    title: 'Custom Web Application Frontends',
    description: 'Fully responsive, modern web dashboards and SaaS application user interfaces built with React and Tailwind CSS.',
    features: ['Modular Component Architecture', 'State Management Integration', 'Ultra-fast Load Speeds']
  },
  {
    icon: Zap,
    title: 'High-Converting Landing Pages',
    description: 'Lead-generation focused web pages designed with clear visual hierarchy, compelling CTAs, and performance optimisation.',
    features: ['Conversion-Focused Layouts', 'Interactive Form Workflows', 'Mobile-First Design']
  },
  {
    icon: Smartphone,
    title: 'UI/UX Design Systems',
    description: 'Cohesive visual component libraries, custom typography scale, and color systems engineered for brand authority.',
    features: ['Design System Tokens', 'Accessible UI Guidelines', 'Seamless Responsive Layouts']
  },
  {
    icon: Layers,
    title: 'Performance & Frontend Refactoring',
    description: 'Transforming legacy codebases into sleek, modern Vite + React setups with clean structure and high lighthouse scores.',
    features: ['Lighthouse Score Optimisation', 'Clean Code Refactoring', 'Search Engine Readiness']
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-3">
            Core Expertise
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Specialised Frontend Services Built for Speed & Conversion
          </p>
          <p className="mt-4 text-slate-600 text-base">
            We focus exclusively on frontend mastery to ensure your digital product stands out in visual quality and execution.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-500/50 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-2.5 pt-6 border-t border-slate-200/60">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
