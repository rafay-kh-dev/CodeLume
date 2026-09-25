import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock, FileText } from "lucide-react";

export default function PrivacyPolicy() {
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
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 group outline-none"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <h2 className="text-[14px] font-bold m-0">Back to Home</h2>
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter m-0 mb-4">
            Privacy Policy
          </h2>
          <h2 className="text-[16px] text-slate-400 font-medium m-0">
            Last updated: 25 September 2026
          </h2>
        </div>

        {/* Content Box */}
        <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Top Highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-linear-to-r from-transparent via-white/10 to-transparent" />

          <div className="space-y-10">
            
            {/* Intro */}
            <div>
              <h2 className="text-[16px] text-slate-300 leading-relaxed m-0 font-normal">
                At Story Tutorials, we are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data in accordance with applicable regulations, including the Australian Privacy Principles (APPs).
              </h2>
            </div>

            {/* Section 1 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                <h2 className="text-2xl font-bold text-white m-0 tracking-tight">
                  1. Collection of Personal Information
                </h2>
              </div>
              <h2 className="text-[15px] text-slate-400 leading-relaxed m-0 font-normal">
                We may collect personal information such as your name, email address, contact details, and payment information when you subscribe to our programmes, register for an account, or communicate with us. We only collect personal details that are necessary to provide our educational and digital services to you.
              </h2>
            </div>

            {/* Section 2 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                <h2 className="text-2xl font-bold text-white m-0 tracking-tight">
                  2. How We Use Your Information
                </h2>
              </div>
              <h2 className="text-[15px] text-slate-400 leading-relaxed m-0 font-normal">
                Your personal details are used to deliver educational resources, process transactions, communicate platform updates, and improve user experience. We may also send periodic promotional updates if you have opted in to receive marketing communications from us.
              </h2>
            </div>

            {/* Section 3 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                <h2 className="text-2xl font-bold text-white m-0 tracking-tight">
                  3. Protection and Data Security
                </h2>
              </div>
              <h2 className="text-[15px] text-slate-400 leading-relaxed m-0 font-normal">
                We implement robust security measures to protect your data against unauthorised access, alteration, disclosure, or destruction. However, please note that no transmission method over the internet or electronic storage solution is completely secure.
              </h2>
            </div>

            {/* Section 4 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                <h2 className="text-2xl font-bold text-white m-0 tracking-tight">
                  4. Disclosure to Third Parties
                </h2>
              </div>
              <h2 className="text-[15px] text-slate-400 leading-relaxed m-0 font-normal">
                We do not sell, trade, or rent your personal information to third parties. We may share information with trusted third-party service providers who assist us in operating our website, conducting business, or serving our users, provided those organisations agree to keep this information strictly confidential.
              </h2>
            </div>

            {/* Section 5 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                <h2 className="text-2xl font-bold text-white m-0 tracking-tight">
                  5. Access and Correction Rights
                </h2>
              </div>
              <h2 className="text-[15px] text-slate-400 leading-relaxed m-0 font-normal">
                You have the right to access the personal information we hold about you and to request corrections if any details are inaccurate or out of date. You may also unsubscribe from our mailing list at any time using the link provided in our emails.
              </h2>
            </div>

            {/* Section 6 - Contact Box */}
            <div className="p-6 rounded-2xl bg-[#ffffff05] border border-white/5 mt-8">
              <h2 className="text-xl font-bold text-white m-0 mb-3 tracking-tight">
                Contact Privacy Team
              </h2>
              <h2 className="text-[15px] text-slate-400 leading-relaxed m-0 font-normal">
                If you have any questions or enquiries regarding this Privacy Policy or wish to lodge a privacy complaint, please contact us at{" "}
                <a 
                  href="mailto:privacy@storytutorials.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4"
                >
                  privacy@storytutorials.com
                </a>.
              </h2>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}