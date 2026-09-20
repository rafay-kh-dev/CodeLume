import React, { useState } from 'react';
import { Calculator, Send, CheckCircle, Sparkles } from 'lucide-react';

export default function Estimator() {
  const [projectType, setProjectType] = useState('landing');
  const [pageCount, setPageCount] = useState(1);
  const [timeline, setTimeline] = useState('standard');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [clientNotes, setClientNotes] = useState('');

  const addonOptions = [
    { id: 'animations', label: 'Custom Micro-Animations', price: 150 },
    { id: 'darkmode', label: 'Light/Dark Theme Toggle', price: 120 },
    { id: 'seo', label: 'Advanced Technical SEO Setup', price: 200 },
    { id: 'forms', label: 'Custom Lead Forms & Integrations', price: 100 }
  ];

  const calculateTotal = () => {
    let base = projectType === 'landing' ? 400 : projectType === 'webapp' ? 800 : 1200;
    let pageCost = (pageCount - 1) * 120;
    let addonsCost = selectedAddons.reduce((acc, currId) => {
      const item = addonOptions.find(a => a.id === currId);
      return acc + (item ? item.price : 0);
    }, 0);
    let total = base + pageCost + addonsCost;
    if (timeline === 'urgent') total *= 1.25;
    return Math.round(total);
  };

  const toggleAddon = (id) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSendEmail = () => {
    const total = calculateTotal();
    const typeLabel = projectType === 'landing' ? 'Single Landing Page' : projectType === 'webapp' ? 'Multi-page Web Application' : 'Custom Enterprise UI System';
    
    const subject = encodeURIComponent(`Project Inquiry: CodeLume Studio ($${total} Estimate)`);
    const body = encodeURIComponent(
      `Hello CodeLume Team,\n\nI would like to initiate a new project with the following requirements:\n\n` +
      `- Project Type: ${typeLabel}\n` +
      `- Estimated Page Count: ${pageCount}\n` +
      `- Timeline Speed: ${timeline === 'urgent' ? 'Fast-Track / Urgent' : 'Standard Delivery'}\n` +
      `- Selected Add-ons: ${selectedAddons.length ? selectedAddons.join(', ') : 'None'}\n` +
      `- Calculated Estimate: ~$${total} USD\n\n` +
      `Additional Notes:\n${clientNotes || 'N/A'}\n\n` +
      `Looking forward to discussing the blueprint.`
    );

    window.location.href = `mailto:hello@codelume.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="estimator" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 mb-3">
            Instant Cost Estimator
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your Project Scope & Send Request
          </p>
          <p className="mt-4 text-slate-600 text-base">
            Select your requirements below to instantly generate a project cost estimate and email blueprint directly to our team.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Selection Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            
            {/* Project Type */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                1. Select Project Type
              </label>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: 'landing', title: 'Landing Page', desc: 'Single conversion page' },
                  { id: 'webapp', title: 'Web App UI', desc: 'Interactive React app' },
                  { id: 'enterprise', title: 'Full UI System', desc: 'Complex multi-page platform' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProjectType(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      projectType === item.id
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Page Count */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-slate-900">
                  2. Number of Unique Views/Pages
                </label>
                <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {pageCount} {pageCount === 1 ? 'Page' : 'Pages'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={pageCount}
                onChange={(e) => setPageCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Addons Selection */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                3. Optional Enhancements
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {addonOptions.map(addon => (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedAddons.includes(addon.id)
                        ? 'border-blue-600 bg-blue-50/40 text-blue-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="text-xs font-semibold">{addon.label}</span>
                    <span className="text-xs font-bold text-slate-500">+${addon.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Project Notes */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                4. Additional Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder="Share any reference sites or specific features you need..."
                className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              />
            </div>

          </div>

          {/* Estimate Summary Panel */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-blue-400 text-sm font-bold">
                <Calculator className="w-5 h-5" />
                <span>Estimate Summary</span>
              </div>
              <span className="text-xs bg-slate-800 px-2.5 py-1 rounded-full text-slate-300 font-medium">
                Instant Calculation
              </span>
            </div>

            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Estimated Total</div>
              <div className="text-4xl font-extrabold text-white mt-1">
                ${calculateTotal()} <span className="text-sm font-normal text-slate-400">USD</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Base Architecture</span>
                <span className="font-semibold text-white">${projectType === 'landing' ? 400 : projectType === 'webapp' ? 800 : 1200}</span>
              </div>
              <div className="flex justify-between">
                <span>Additional Pages ({pageCount - 1})</span>
                <span className="font-semibold text-white">${(pageCount - 1) * 120}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Add-ons ({selectedAddons.length})</span>
                <span className="font-semibold text-white">
                  ${selectedAddons.reduce((acc, currId) => acc + (addonOptions.find(a => a.id === currId)?.price || 0), 0)}
                </span>
              </div>
            </div>

            <button
              onClick={handleSendEmail}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Inquiry via Email</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              Clicking will open your default email app with all pre-filled project options. No login required.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}