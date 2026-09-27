import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  BookOpen,
  Terminal,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Code2,
} from "lucide-react";

export default function Tutorials() {
  // --- REACT COMPLETE COURSE DATA STRUCTURE ---
  const courseData = [
    {
      category: "Getting started",
      icon: BookOpen,
      lessons: [
        {
          id: "intro",
          title: "Introduction to React",
          toc: [
            { id: "what-is-react", label: "What is React?" },
            { id: "why-react", label: "Why use React?" },
            { id: "prerequisites", label: "Prerequisites" },
          ],
          content: (
            <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
              <p className="text-xl text-slate-300">
                React is a declarative, efficient, and flexible JavaScript
                library for building user interfaces. It lets you compose
                complex UIs from small and isolated pieces of code called
                "components".
              </p>

              <h2
                id="what-is-react"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                What is React?
              </h2>
              <p>
                Created by Facebook, React is a front-end library that handles
                the view layer for web and mobile apps. React allows developers
                to create large web applications that can change data, without
                reloading the page. The main purpose of React is to be fast,
                scalable, and simple.
              </p>

              <h2
                id="why-react"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Why use React?
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Declarative:</strong> React makes it painless to
                    create interactive UIs. Design simple views for each state
                    in your application, and React will efficiently update and
                    render just the right components.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Component-Based:</strong> Build encapsulated
                    components that manage their own state, then compose them to
                    make complex UIs.
                  </span>
                </li>
              </ul>

              <h2
                id="prerequisites"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Prerequisites
              </h2>
              <p>
                Before diving into React, you should have a solid understanding
                of:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-300">
                <li>HTML and CSS fundamentals</li>
                <li>JavaScript fundamentals (variables, arrays, objects)</li>
                <li>ES6 features (arrow functions, destructuring, classes)</li>
              </ul>
            </div>
          ),
        },
        {
          id: "environment-setup",
          title: "Environment Setup (Vite)",
          toc: [
            { id: "installing-nodejs", label: "Installing Node.js" },
            { id: "creating-project", label: "Creating a Vite Project" },
            { id: "folder-structure", label: "Folder Structure" },
          ],
          content: (
            <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
              <p>
                To start building React applications, you need to set up a local
                development environment. We highly recommend using Vite as it is
                incredibly fast and modern compared to the older Create React
                App.
              </p>

              <h2
                id="creating-project"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Creating a Vite Project
              </h2>
              <p>
                Open your terminal and run the following command to initialise a
                new React project using Vite:
              </p>

              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-slate-300">
                <span className="text-pink-400">npm</span> create vite@latest
                my-react-app -- --template react
              </div>

              <p className="mt-4">
                Once the project is generated, navigate into the folder and
                install the dependencies:
              </p>

              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-slate-300 whitespace-pre">
                <span className="text-pink-400">cd</span> my-react-app{"\n"}
                <span className="text-pink-400">npm</span> install{"\n"}
                <span className="text-pink-400">npm</span> run dev
              </div>

              <h2
                id="folder-structure"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Folder Structure
              </h2>
              <p>
                After initialisation, you will see several folders. The most
                important one is the <code>src</code> folder, which contains
                your main <code>App.jsx</code> file where you will write your
                code.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      category: "React Core",
      icon: Terminal,
      lessons: [
        {
          id: "components-props",
          title: "Components & Props",
          toc: [
            { id: "functional-components", label: "Functional Components" },
            { id: "passing-props", label: "Passing Props" },
          ],
          content: (
            <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
              <p>
                Components are the independent and reusable bits of code. They
                serve the same purpose as JavaScript functions, but work in
                isolation and return HTML.
              </p>

              <h2
                id="functional-components"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Functional Components
              </h2>
              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-blue-300 whitespace-pre">
                {`export default function Button() {\n  return (\n    <button className="bg-blue-500 text-white px-4 py-2">\n      Click Me\n    </button>\n  );\n}`}
              </div>

              <h2
                id="passing-props"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Passing Props
              </h2>
              <p>
                React components use props (short for properties) to communicate
                with each other. Every parent component can pass some
                information to its child components by giving them props.
              </p>
            </div>
          ),
        },
      ],
    },
    {
      category: "State & Lifecycle",
      icon: CheckCircle2,
      lessons: [
        {
          id: "usestate",
          title: "The useState Hook",
          toc: [],
          content: (
            <div>
              <h2 className="text-white text-2xl font-bold">Coming Soon</h2>
              <p className="text-slate-400 mt-4">
                This lesson is currently under construction.
              </p>
            </div>
          ),
        },
        {
          id: "useeffect",
          title: "The useEffect Hook",
          toc: [],
          content: (
            <div>
              <h2 className="text-white text-2xl font-bold">Coming Soon</h2>
              <p className="text-slate-400 mt-4">
                This lesson is currently under construction.
              </p>
            </div>
          ),
        },
      ],
    },
  ];

  // Logic to find current lesson based on state
  const [activeLessonId, setActiveLessonId] = useState(
    courseData[0].lessons[0].id,
  );
  const [activeHeadingId, setActiveHeadingId] = useState("");

  // Create a flat array of all lessons for easy Next/Prev navigation
  const allLessonsFlat = courseData.flatMap((category) =>
    category.lessons.map((lesson) => ({
      ...lesson,
      categoryName: category.category,
    })),
  );

  const currentLessonIndex = allLessonsFlat.findIndex(
    (l) => l.id === activeLessonId,
  );

  // Safety Fallback (If lesson not found, pick the first one)
  const currentLesson =
    currentLessonIndex !== -1
      ? allLessonsFlat[currentLessonIndex]
      : allLessonsFlat[0];

  const hasNext = currentLessonIndex < allLessonsFlat.length - 1;
  const hasPrev = currentLessonIndex > 0;

  const goToNext = () => {
    if (hasNext) setActiveLessonId(allLessonsFlat[currentLessonIndex + 1].id);
  };

  const goToPrev = () => {
    if (hasPrev) setActiveLessonId(allLessonsFlat[currentLessonIndex - 1].id);
  };

  // Smooth scroll to top when lesson changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (currentLesson?.toc?.length > 0) {
      setActiveHeadingId(currentLesson.toc[0].id);
    }
  }, [activeLessonId, currentLesson]);

  return (
    <section className="w-full min-h-dvh pt-24 bg-[#030712] font-jakarta relative flex flex-col">
      {/* Helmet SEO */}
      <Helmet>
        <title>
          {currentLesson?.title || "Tutorials"} | CodeLume Tutorials
        </title>
        <meta
          name="description"
          content="Complete React 0 to 100 documentation and tutorials by CodeLume."
        />
      </Helmet>

      {/* Main Layout Container (Bootstrap 3-Column Layout) */}
      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex-grow flex flex-col md:flex-row relative z-10">
        {/* =========================================
            COLUMN 1: LEFT NAVIGATION SIDEBAR 
            ========================================= */}
        <aside className="w-full md:w-[260px] lg:w-[280px] shrink-0 md:sticky md:top-24 h-auto md:h-[calc(100vh-6rem)] overflow-y-auto pt-8 pb-12 pr-6 custom-scrollbar border-r border-white/5 hidden md:block">
          <div className="mb-8">
            <Link
              to="/"
              className="text-slate-400 hover:text-white transition-colors font-bold text-sm tracking-wide flex items-center gap-2"
            >
              &larr; Back to Home
            </Link>
          </div>

          <div className="space-y-8">
            {courseData.map((category, catIdx) => {
              const Icon = category.icon;
              return (
                <div key={catIdx} className="flex flex-col">
                  {/* Category Header */}
                  <div className="flex items-center gap-2 mb-3 text-white/90">
                    <Icon className="w-4 h-4 text-blue-500" />
                    <h2 className="text-[14px] font-bold m-0 tracking-wide">
                      {category.category}
                    </h2>
                  </div>

                  {/* Lesson Links */}
                  <div className="flex flex-col space-y-1 border-l border-white/10 ml-2 pl-4">
                    {category.lessons.map((lesson) => {
                      const isActive = activeLessonId === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLessonId(lesson.id)}
                          className={`text-left text-[14px] py-1.5 transition-colors outline-none ${
                            isActive
                              ? "text-blue-400 font-semibold"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {lesson.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* =========================================
            COLUMN 2: MAIN CONTENT AREA 
            ========================================= */}
        <main className="flex-1 min-w-0 pt-8 pb-24 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Title & Metadata */}
            <div className="mb-10">
              <h2 className="text-[44px] sm:text-[52px] font-black text-white tracking-tight leading-[1.1] m-0 mb-4">
                {currentLesson?.title}
              </h2>
              <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-blue-400">
                  {currentLesson?.categoryName}
                </span>
                <span>Complete Course</span>
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="animate-in fade-in duration-500 min-h-[300px]">
              {currentLesson?.content}
            </div>

            {/* Pagination / Navigation Buttons */}
            <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center">
              {hasPrev ? (
                <button
                  onClick={goToPrev}
                  className="flex items-center gap-2 bg-transparent text-slate-400 hover:text-white px-4 py-2 font-bold transition-all outline-none"
                >
                  <ChevronLeft className="w-5 h-5" /> Previous
                </button>
              ) : (
                <div /> /* Empty div to keep Next button aligned right */
              )}

              {hasNext && (
                <button
                  onClick={goToNext}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-xl font-bold transition-all border border-white/10 hover:border-blue-500/50 outline-none"
                >
                  Next Topic <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </main>

        {/* =========================================
            COLUMN 3: RIGHT SIDEBAR (TOC & PROMO) 
            ========================================= */}
        <aside className="w-64 shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pt-8 pb-12 pl-8 hidden xl:flex flex-col custom-scrollbar">
          {/* On this page (Table of Contents) */}
          {currentLesson?.toc?.length > 0 && (
            <div className="mb-10">
              <h2 className="text-[12px] font-extrabold text-white uppercase tracking-wider mb-4 m-0">
                On this page
              </h2>
              <div className="flex flex-col space-y-2 border-l border-white/10 pl-3">
                {currentLesson.toc.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={() => setActiveHeadingId(heading.id)}
                    className={`text-[13px] leading-tight transition-colors hover:text-white ${
                      activeHeadingId === heading.id
                        ? "text-blue-400 font-semibold"
                        : "text-slate-400"
                    }`}
                  >
                    {heading.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Sponsored/Promo Box (Like Bootstrap's Ads) */}
          <div className="mt-auto bg-[#0a0f1c] border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden group cursor-pointer hover:border-blue-500/30 transition-colors">
            <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-transparent pointer-events-none" />
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
                to="/start-project"
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
