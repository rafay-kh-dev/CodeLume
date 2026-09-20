import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'SaaS Analytics Dashboard UI',
    category: 'React & Tailwind App',
    description: 'High-density data visualization interface engineered with clean responsive layout and glassmorphism cards.',
    metrics: '+42% User Engagement',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Fintech Mobile Web Platform',
    category: 'Landing & Onboarding',
    description: 'Ultra-clean financial services landing page with embedded loan calculator and direct lead routing.',
    metrics: '3.2x Conversion Rate',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Digital Marketing Studio Site',
    category: 'Agency Frontend',
    description: 'Modern light-themed portfolio showcase with interactive case studies and smooth section transitions.',
    metrics: '<0.8s Page Load',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-3">
            Selected Work
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Recent Work Built with Precision
          </p>
          <p className="mt-4 text-slate-600 text-base">
            Take a look at how we convert complex requirements into elegant, high-performing frontend solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-emerald-700 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
                  {project.metrics}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-extrabold text-blue-600 uppercase tracking-wider mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {project.description}
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