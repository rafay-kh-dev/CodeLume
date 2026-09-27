import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Terminal,
  CheckCircle2,
} from "lucide-react";

export default function Tutorials() {
  // Yeh aapka Notes Data hai. Aap yahan direct JSX likh sakte hain (tags ke sath)
  const learningModules = [
    {
      id: "react-intro",
      category: "React.js Mastery",
      title: "1. Introduction to React",
      content: (
        <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
          <p>
            React is a declarative, efficient, and flexible JavaScript library
            for building user interfaces. It lets you compose complex UIs from
            small and isolated pieces of code called "components".
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Why use React?
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Component-Based:</strong> Build encapsulated components
                that manage their own state.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Learn Once, Write Anywhere:</strong> Develop new
                features without rewriting existing code.
              </span>
            </li>
          </ul>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Quick Start
          </h2>
          <p>
            To initialise a new React project, run the following command in your
            terminal:
          </p>
          {/* Code Snippet Box */}
          <div className="bg-[#0a0f1c] border border-white/10 rounded-xl p-6 font-mono text-sm mt-4 shadow-xl">
            <span className="text-pink-400">npx</span>{" "}
            <span className="text-blue-300">create-react-app</span>{" "}
            <span className="text-emerald-300">my-app</span>
          </div>
        </div>
      ),
    },
    {
      id: "react-components",
      category: "React.js Mastery",
      title: "2. Understanding Components",
      content: (
        <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
          <p>
            Components are the building blocks of any React application. A
            component is essentially a JavaScript function that returns markup.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Functional Components
          </h2>
          <p>
            This is how you write a basic functional component in modern React:
          </p>
          <div className="bg-[#0a0f1c] border border-white/10 rounded-xl p-6 font-mono text-sm mt-4 shadow-xl whitespace-pre-wrap text-blue-300">
            {`export default function Welcome() {\n  return (\n    <h2 className="text-white">\n      Hello from CodeLume!\n    </h2>\n  );\n}`}
          </div>
        </div>
      ),
    },
    {
      id: "seo-basics",
      category: "SEO & Growth",
      title: "1. Technical SEO Fundamentals",
      content: (
        <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
          <p>
            Technical SEO ensures that search engines can easily crawl,
            understand, and index your website. Without a solid technical
            foundation, even the best content will struggle to rank.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Key Elements to Optimise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#0a0f1c] border border-white/5 p-5 rounded-xl">
              <h2 className="text-blue-400 font-bold mb-2 m-0 text-base">
                Meta Tags
              </h2>
              <p className="text-sm text-slate-400 m-0">
                Accurate titles and descriptions.
              </p>
            </div>
            <div className="bg-[#0a0f1c] border border-white/5 p-5 rounded-xl">
              <h2 className="text-blue-400 font-bold mb-2 m-0 text-base">
                Site Speed
              </h2>
              <p className="text-sm text-slate-400 m-0">
                Fast load times using optimised assets.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // State to track which note is currently selected
  const [activeNote, setActiveNote] = useState(learningModules[0]);

  // Scroll to top of content when note changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeNote]);

  return (
    <section className="w-full min-h-dvh pt-32 pb-24 bg-[#030712] font-jakarta text-white relative flex flex-col">
      <Helmet>
        <title>Developer Notes & Tutorials | CodeLume</title>
        <meta
          name="description"
          content="Learn web engineering, React, and technical SEO with CodeLume's free developer notes."
        />
      </Helmet>

      {/* Top Header Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
        {/* Left Sidebar (Navigation) */}
        <aside className="w-full lg:w-80 shrink-0 flex flex-col">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors font-bold text-sm tracking-wide mb-8"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-2xl font-black text-white m-0 tracking-tight">
              Learning Hub
            </h2>
          </div>

          {/* Chapters List */}
          <div className="flex flex-col gap-2 sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 custom-scrollbar">
            {learningModules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveNote(module)}
                className={`text-left w-full px-5 py-4 rounded-2xl border transition-all duration-300 outline-none flex flex-col gap-1 ${
                  activeNote.id === module.id
                    ? "bg-blue-600/10 border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                    : "bg-[#0a0f1c] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                }`}
              >
                <span
                  className={`text-[11px] font-extrabold uppercase tracking-widest ${
                    activeNote.id === module.id
                      ? "text-blue-400"
                      : "text-slate-500"
                  }`}
                >
                  {module.category}
                </span>
                <span
                  className={`text-[15px] font-bold ${
                    activeNote.id === module.id
                      ? "text-white"
                      : "text-slate-300"
                  }`}
                >
                  {module.title}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 bg-[#0a0f1c] border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl min-h-[600px]">
          <div className="max-w-3xl mx-auto">
            {/* Note Header */}
            <div className="mb-10 pb-10 border-b border-white/10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 mb-5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[11px] font-extrabold text-slate-300 uppercase tracking-widest">
                  {activeNote.category}
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.2] m-0">
                {activeNote.title}
              </h2>
            </div>

            {/* Note Content (Rendered JSX) */}
            <div className="animate-in fade-in duration-700">
              {activeNote.content}
            </div>

            {/* Footer Navigation (Optional Next Button logic can be added here) */}
            <div className="mt-16 pt-8 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  const currentIndex = learningModules.findIndex(
                    (m) => m.id === activeNote.id,
                  );
                  if (currentIndex < learningModules.length - 1) {
                    setActiveNote(learningModules[currentIndex + 1]);
                  }
                }}
                disabled={
                  learningModules.findIndex((m) => m.id === activeNote.id) ===
                  learningModules.length - 1
                }
                className="flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 px-6 py-3 rounded-xl transition-colors outline-none"
              >
                Next Lesson <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
