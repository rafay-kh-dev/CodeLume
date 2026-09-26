import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <section className="w-full min-h-dvh flex items-center justify-center bg-[#030712] font-jakarta relative overflow-hidden px-4">
      <Helmet>
        <title>Page Not Found | CodeLume</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
          <Compass className="w-10 h-10 text-blue-400 animate-[spin_10s_linear_infinite]" />
        </div>

        <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-linear-to-b from-white to-slate-800 m-0 tracking-tighter leading-none mb-4">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 m-0 tracking-tight">
          Page not found
        </h2>

        <p className="text-slate-400 text-[15px] sm:text-[16px] leading-relaxed mb-10">
          The digital footprint you're looking for doesn't exist. It might have
          been moved, deleted, or perhaps it never existed in our ecosystem.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1 outline-none group"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          Return to Home
        </Link>
      </div>
    </section>
  );
}
