"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronLeft, Code2 } from "lucide-react";

export default function TutorialLayout({ children }) {
  // Using Next.js hook to figure out which page we are currently on
  const pathname = usePathname();
  const [activeHeadingId, setActiveHeadingId] = useState("");

  // Since layout wraps multiple pages, we don't manage the lesson content here anymore.
  // The {children} prop will render the specific lesson page content automatically based on the URL.

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <section className="w-full min-h-dvh pt-24 bg-[#030712] font-jakarta relative flex flex-col">
      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex-grow flex flex-col md:flex-row relative z-10">
        {/* =========================================
            COLUMN 1: LEFT NAVIGATION SIDEBAR 
            ========================================= */}
        <aside className="w-full md:w-[260px] lg:w-[280px] shrink-0 md:sticky md:top-24 h-auto md:h-[calc(100vh-6rem)] overflow-y-auto pt-8 pb-12 pr-6 custom-scrollbar border-r border-white/5 hidden md:block">
          <div className="mb-8 flex items-center gap-2">
            <Link
              href="/tutorials"
              className="text-slate-400 hover:text-white transition-colors font-bold text-sm tracking-wide"
            >
              &larr; All Tutorials
            </Link>
          </div>

          <div className="space-y-8">
            {/* Note: In Next.js, sidebar navigation data should ideally be passed via a shared config 
                or fetched globally, since layout doesn't automatically receive specific page props. 
                For now, we leave a placeholder where your dynamic course links will go. */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-white/90">
                <h2 className="text-[14px] font-bold m-0 tracking-wide">
                  Course Navigation
                </h2>
              </div>
              <div className="flex flex-col space-y-1 border-l border-white/10 ml-2 pl-4">
                <Link
                  href="/tutorials/react"
                  className="text-left text-[14px] py-1.5 transition-colors outline-none text-slate-400 hover:text-slate-200"
                >
                  React Mastery
                </Link>
                <Link
                  href="/tutorials/node"
                  className="text-left text-[14px] py-1.5 transition-colors outline-none text-slate-400 hover:text-slate-200"
                >
                  Node Architecture
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* =========================================
            COLUMN 2: MAIN CONTENT AREA 
            ========================================= */}
        <main className="flex-1 min-w-0 pt-8 pb-24 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto">
            {/* THIS IS WHERE NEXT.JS INJECTS THE INDIVIDUAL LESSON CONTENT */}
            <div className="animate-in fade-in duration-500 min-h-[300px]">
              {children}
            </div>
          </div>
        </main>

        {/* =========================================
            COLUMN 3: RIGHT SIDEBAR (TOC & PROMO) 
            ========================================= */}
        <aside className="w-64 shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pt-8 pb-12 pl-8 hidden xl:flex flex-col custom-scrollbar">
          {/* Table of Contents placeholder for Next.js structure */}
          <div className="mb-10">
            <h2 className="text-[12px] font-extrabold text-white uppercase tracking-wider mb-4 m-0">
              On this page
            </h2>
            <div className="flex flex-col space-y-2 border-l border-white/10 pl-3">
              <span className="text-[13px] leading-tight text-slate-400">
                Content headers will populate here.
              </span>
            </div>
          </div>

          {/* Sponsored/Promo Box */}
          <div className="mt-auto bg-[#0a0f1c] border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden group cursor-pointer hover:border-blue-500/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-full bg-[#030712] rounded-lg p-4 mb-4 flex items-center justify-center border border-white/5">
                <Code2 className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-[14px] font-bold text-white leading-tight mb-2 m-0">
                Need a Custom Web App?
              </h2>
              <p className="text-[12px] text-slate-400 leading-relaxed m-0 mb-4">
                CodeLume engineers high-performance web applications tailored to
                your business needs.
              </p>
              <Link
                href="/start-project"
                className="text-[12px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Start a project &rarr;
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        /* Minimal Custom Scrollbar for sidebars */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
}
