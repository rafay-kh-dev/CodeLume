import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

export default function TermsOfService() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] font-jakarta relative overflow-hidden text-slate-300">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative z-10">
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <h2 className="text-[14px] font-bold m-0">Back to Home</h2>
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter m-0 mb-4">
            Terms of Service
          </h2>
          <h2 className="text-[16px] text-slate-400 font-medium m-0">
            Last updated: September 25, 2026
          </h2>
        </div>

        {/* Content Box */}
        <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Top Highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-linear-to-r from-transparent via-white/10 to-transparent" />

          <div className="space-y-10">
            
            {/* Intro */}
            <div>
              <h2 className="text-[16px] text-slate-300 leading-relaxed m-0">
                Welcome to Story Tutorials. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before using our website or accessing our educational materials.
              </h2>
            </div>

            {/* Section 1 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold text-white m-0 tracking-tight">
                  1. General Conditions
                </h2>
              </div>
              <h2 className="text-[15px] text-slate-400 leading-relaxed m-0">
                We reserve the right to refuse service to anyone for any reason at any time. You understand that your content may be transferred unencrypted and involve transmissions over various networks. Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.
              </h2>
            </div>

            {/* Section 2 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold text-white m-0 tracking-tight">
                  2. Intellectual Property
                </h2>
              </div>
              <h2 className="text-[15px] text-slate-400 leading-relaxed m-0">
                All content included on this site, such as text, graphics, logos, and video tutorials, is the property of Story Tutorials and protected by international copyright laws. We grant you a limited licence to access and make personal use of this site for your own educational purposes.
              </h2>
            </div>

            {/* Section 3 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold text-white m-0 tracking-tight">
                  3. User Conduct
                </h2>
              </div>
              <h2 className="text-[15px] text-slate-400 leading-relaxed m-0">
                You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us. You must not transmit any worms or viruses or any code of a destructive nature while using our platform.
              </h2>
            </div>

            {/* Section 4 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold text-white m-0 tracking-tight">
                  4. Modifications to the Service
                </h2>
              </div>
              <h2 className="text-[15px] text-slate-400 leading-relaxed m-0">
                Prices for our educational programmes, courses, and tutorials are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
              </h2>
            </div>

            {/* Section 5 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold text-white m-0 tracking-tight">
                  5. Governing Law
                </h2>
              </div>
              <h2 className="text-[15px] text-slate-400 leading-relaxed m-0">
                These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Australia.
              </h2>
            </div>

            {/* Section 6 */}
            <div className="p-6 rounded-2xl bg-[#ffffff05] border border-white/5 mt-8">
              <h2 className="text-xl font-bold text-white m-0 mb-3 tracking-tight">
                Contact Information
              </h2>
              <h2 className="text-[15px] text-slate-400 leading-relaxed m-0">
                If you have any questions or concerns about these Terms of Service, please send them to us at{" "}
                <a 
                  href="mailto:support@storytutorials.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4"
                >
                  support@storytutorials.com
                </a>.
              </h2>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}