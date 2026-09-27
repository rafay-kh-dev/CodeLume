import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, Terminal } from "lucide-react";
import {
  React as ReactIcon,
  Typescript,
  Jwt,
  GoogleSearchConsole,
} from "@thesvg/react";

export default function Tools() {
  const tools = [
    {
      title: "SVG to React JSX",
      description:
        "Convert raw SVG code into production-ready functional React components instantly with camelCase formatting.",
      link: "/tools/svg-to-react",
      icon: ReactIcon,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      borderColor: "group-hover:border-blue-500/50",
    },
    {
      title: "JSON to TypeScript",
      description:
        "Automatically generate deeply nested TypeScript interfaces and types from your raw JSON API payloads.",
      link: "/tools/json-to-ts",
      icon: Typescript,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      borderColor: "group-hover:border-emerald-500/50",
    },
    {
      title: "JWT Decoder",
      description:
        "Securely decode, verify, and inspect JSON Web Tokens locally in your browser. No server interaction required.",
      link: "/tools/jwt-decoder",
      icon: Jwt,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
      borderColor: "group-hover:border-amber-500/50",
    },
    {
      title: "Meta Tag Extractor",
      description:
        "Extract SEO meta tags and preview Open Graph social media cards from any live URL to optimise sharing.",
      link: "/tools/meta-extractor",
      icon: GoogleSearchConsole,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      borderColor: "group-hover:border-purple-500/50",
    },
  ];

  return (
    <section className="w-full min-h-dvh pt-32 pb-24 bg-[#030712] font-jakarta text-white relative overflow-hidden">
      <Helmet>
        <title>Developer Tools | CodeLume</title>
        <meta
          name="description"
          content="Free, lightning-fast developer utilities to optimise your workflow. Built by CodeLume."
        />
      </Helmet>

      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation & Header */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors font-bold text-sm tracking-wide mb-8"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Terminal className="w-4 h-4 text-blue-400" />
              <h2 className="text-[12px] font-extrabold text-blue-400 uppercase tracking-[0.2em] m-0">
                CodeLume Utilities
              </h2>
            </div>
            {/* Using H2 for the main heading per your styling preference */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] m-0 mb-6">
              Free Developer{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                Tools
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl m-0 leading-relaxed">
              A curated collection of free utilities designed to streamline your
              engineering and SEO processes. No sign-ups, no tracking, just pure
              performance.
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <Link
                key={idx}
                to={tool.link}
                className={`group relative flex flex-col p-8 sm:p-10 rounded-[2rem] bg-[#0a0f1c] border border-white/5 transition-all duration-500 hover:-translate-y-2 outline-none transform-gpu overflow-hidden ${tool.glow} ${tool.borderColor}`}
              >
                <div className="absolute inset-0 bg-linear-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${tool.bgColor}`}
                  >
                    <Icon className={`w-8 h-8 ${tool.color}`} />
                  </div>

                  <div className="flex flex-col flex-grow">
                    <h2 className="text-2xl font-extrabold text-white mb-4 m-0 flex items-center justify-between">
                      {tool.title}
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </h2>
                    <p className="text-[16px] font-medium text-slate-400 leading-relaxed m-0 group-hover:text-slate-300 transition-colors duration-300">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
