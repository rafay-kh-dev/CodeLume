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
  Globe,
  Zap,
  Layers,
} from "lucide-react";

export default function Tutorials() {
  // --- REACT COMPLETE 0-100 COURSE DATA STRUCTURE ---
  const courseData = [
    {
      category: "1. The Origins & Setup",
      icon: Globe,
      lessons: [
        {
          id: "history-of-react",
          title: "The History: Why React?",
          toc: [
            { id: "who-created-react", label: "Who Created React?" },
            { id: "the-problem", label: "The Core Problem" },
            { id: "the-solution", label: "The Virtual DOM Solution" },
          ],
          content: (
            <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
              <p className="text-xl text-slate-300">
                To truly master React, you must first understand the environment
                that birthed it. React was not created just to be another
                framework; it was engineered to solve a massive, specific
                scaling problem at one of the world's largest tech companies.
              </p>

              <h2
                id="who-created-react"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Who Created React?
              </h2>
              <p>
                React was created by <strong>Jordan Walke</strong>, a software
                engineer at Facebook. He released an early prototype called
                "FaxJS" in 2011. It was first deployed on Facebook's News Feed
                in 2011 and later on Instagram in 2012. Facebook officially
                open-sourced React at JSConf US in May 2013.
              </p>

              <h2
                id="the-problem"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                The Core Problem: Cascading DOM Updates
              </h2>
              <p>
                Before React, developers used libraries like jQuery or
                frameworks like AngularJS. Facebook's application was growing
                incredibly complex, specifically the Ads system and the chat
                notifications.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>The UI State Nightmare:</strong> Whenever new data
                    arrived (like a new chat message), tracking which exact HTML
                    element needed updating became a tangled mess of spaghetti
                    code.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Slow DOM Manipulation:</strong> Traditional browsers
                    are highly inefficient when you constantly tell them to
                    rebuild the actual DOM tree. It caused massive performance
                    bottlenecks.
                  </span>
                </li>
              </ul>

              <h2
                id="the-solution"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                The Virtual DOM Solution
              </h2>
              <p>
                Jordan Walke realised that instead of manually manipulating the
                browser's DOM, developers should just declare what the UI{" "}
                <em>should</em> look like. React introduced the{" "}
                <strong>Virtual DOM</strong>. It keeps a lightweight copy of the
                UI in memory. When data changes, React compares the new Virtual
                DOM with the old one (a process called <em>Reconciliation</em>),
                calculates the absolute minimum number of changes required, and
                updates the real browser DOM in one rapid batch.
              </p>
            </div>
          ),
        },
        {
          id: "environment-setup",
          title: "Environment Setup (Vite)",
          toc: [
            { id: "installing-nodejs", label: "Installing Node.js" },
            { id: "creating-project", label: "Creating a Vite Project" },
          ],
          content: (
            <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
              <p>
                Modern React development has moved away from{" "}
                <code>create-react-app</code>. To engineer high-performance
                applications, we now standardise on <strong>Vite</strong>, a
                lightning-fast build tool.
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

              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-slate-300 overflow-x-auto">
                <span className="text-pink-400">npm</span> create vite@latest
                my-react-app -- --template react
              </div>

              <p className="mt-4">
                Once the project is generated, navigate into the folder and
                install the dependencies:
              </p>

              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-slate-300 whitespace-pre overflow-x-auto">
                <span className="text-pink-400">cd</span> my-react-app{"\n"}
                <span className="text-pink-400">npm</span> install{"\n"}
                <span className="text-pink-400">npm</span> run dev
              </div>
            </div>
          ),
        },
      ],
    },
    {
      category: "2. React Core Architecture",
      icon: Layers,
      lessons: [
        {
          id: "jsx-deep-dive",
          title: "JSX Under the Hood",
          toc: [
            { id: "what-is-jsx", label: "What is JSX?" },
            { id: "jsx-rules", label: "The Strict Rules of JSX" },
          ],
          content: (
            <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
              <h2
                id="what-is-jsx"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                What is JSX?
              </h2>
              <p>
                JSX stands for JavaScript XML. It is a syntax extension for
                JavaScript that allows you to write HTML-like markup inside a
                JavaScript file. Behind the scenes, tools like Babel compile JSX
                down to standard <code>React.createElement()</code> function
                calls.
              </p>

              <h2
                id="jsx-rules"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                The Strict Rules of JSX
              </h2>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Return a single root element:</strong> To return
                    multiple elements from a component, wrap them with a single
                    parent tag or a Fragment <code>&lt;&gt;...&lt;/&gt;</code>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Close all the tags:</strong> JSX requires tags to be
                    explicitly closed, e.g., <code>&lt;img /&gt;</code> instead
                    of just <code>&lt;img&gt;</code>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>camelCase all properties:</strong> Since JSX turns
                    into JavaScript, attributes like <code>class</code> become{" "}
                    <code>className</code>, and <code>onclick</code> becomes{" "}
                    <code>onClick</code>.
                  </span>
                </li>
              </ul>
            </div>
          ),
        },
        {
          id: "components-props",
          title: "Components & Props",
          toc: [
            { id: "functional-components", label: "Functional Components" },
            { id: "passing-props", label: "Passing & Destructuring Props" },
          ],
          content: (
            <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
              <h2
                id="functional-components"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Functional Components
              </h2>
              <p>
                Modern React exclusively uses functional components rather than
                legacy class components. A component is merely a JavaScript
                function that returns JSX.
              </p>
              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-blue-300 whitespace-pre overflow-x-auto">
                {`export default function Button() {\n  return (\n    <button className="bg-blue-600 text-white px-4 py-2 rounded">\n      Execute Process\n    </button>\n  );\n}`}
              </div>

              <h2
                id="passing-props"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Passing & Destructuring Props
              </h2>
              <p>
                Props (properties) allow components to receive external data. To
                optimise readability, we always destructure props directly in
                the function signature.
              </p>
              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-emerald-300 whitespace-pre overflow-x-auto">
                {`// Parent Component\n<ProfileCard name="Rafay" role="Lead Engineer" />\n\n// Child Component\nexport default function ProfileCard({ name, role }) {\n  return (\n    <div>\n      <h2>{name}</h2>\n      <p>{role}</p>\n    </div>\n  );\n}`}
              </div>
            </div>
          ),
        },
      ],
    },
    {
      category: "3. State & Reactivity",
      icon: Terminal,
      lessons: [
        {
          id: "usestate-hook",
          title: "Mastering useState",
          toc: [
            { id: "what-is-state", label: "What is State?" },
            { id: "declaring-state", label: "Declaring State Variables" },
          ],
          content: (
            <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
              <h2
                id="what-is-state"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                What is State?
              </h2>
              <p>
                Standard JavaScript variables do not trigger a UI update when
                they change. State is a special React memory reserved for
                variables that must re-render the component immediately upon
                changing.
              </p>

              <h2
                id="declaring-state"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Declaring State Variables
              </h2>
              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-blue-300 whitespace-pre overflow-x-auto">
                {`import { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count is: {count}\n    </button>\n  );\n}`}
              </div>
              <p className="mt-4">
                The <code>useState</code> hook returns an array with two values:
                the current state, and a function to update it. We use array
                destructuring to assign them names.
              </p>
            </div>
          ),
        },
        {
          id: "useeffect-hook",
          title: "Side Effects with useEffect",
          toc: [
            { id: "managing-effects", label: "Managing External Systems" },
            { id: "dependency-array", label: "The Dependency Array" },
          ],
          content: (
            <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
              <h2
                id="managing-effects"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Managing External Systems
              </h2>
              <p>
                Components need to connect to external systems: fetching API
                data, establishing WebSocket connections, or manipulating the
                DOM directly. The <code>useEffect</code> hook lets you run code
                after rendering so you can synchronise your component with these
                outside systems.
              </p>

              <h2
                id="dependency-array"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                The Dependency Array
              </h2>
              <p>
                The second argument to <code>useEffect</code> controls when the
                effect executes to optimise performance.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-300">
                <li>
                  <code>{`useEffect(() => {...})`}</code> — Runs on every render
                  (Danger!).
                </li>
                <li>
                  <code>{`useEffect(() => {...}, [])`}</code> — Runs exactly
                  once on mount.
                </li>
                <li>
                  <code>{`useEffect(() => {...}, [data])`}</code> — Runs only
                  when <code>data</code> changes.
                </li>
              </ul>
              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-amber-300 whitespace-pre overflow-x-auto">
                {`useEffect(() => {\n  fetchData(userId).then(setData);\n\n  // Cleanup function\n  return () => {\n    abortController.abort();\n  };\n}, [userId]);`}
              </div>
            </div>
          ),
        },
      ],
    },
    {
      category: "4. Advanced Patterns",
      icon: Zap,
      lessons: [
        {
          id: "context-api",
          title: "Global State (Context API)",
          toc: [
            { id: "prop-drilling", label: "The Prop Drilling Problem" },
            { id: "use-context", label: "Implementing useContext" },
          ],
          content: (
            <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
              <h2
                id="prop-drilling"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                The Prop Drilling Problem
              </h2>
              <p>
                Passing props deeply through multiple intermediate components
                that don't need the data themselves is called "prop drilling".
                It creates brittle architecture. The Context API solves this by
                teleporting data directly to the components that need it.
              </p>

              <h2
                id="use-context"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Implementing useContext
              </h2>
              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-emerald-300 whitespace-pre overflow-x-auto">
                {`import { createContext, useContext } from 'react';\n\n// 1. Create Context\nconst ThemeContext = createContext('dark');\n\n// 2. Consume in Deep Child\nexport default function DeepComponent() {\n  const theme = useContext(ThemeContext);\n  return <div className={\`bg-\${theme}\`}>...</div>;\n}`}
              </div>
            </div>
          ),
        },
        {
          id: "performance-hooks",
          title: "useMemo & useCallback",
          toc: [
            { id: "usememo", label: "Caching Values with useMemo" },
            { id: "usecallback", label: "Caching Functions with useCallback" },
          ],
          content: (
            <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
              <h2
                id="usememo"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Caching Values with useMemo
              </h2>
              <p>
                If your component performs complex mathematical operations or
                filters massive arrays, you should cache the result using{" "}
                <code>useMemo</code> so it doesn't recalculate on every
                unrelated render.
              </p>
              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-purple-300 whitespace-pre overflow-x-auto">
                {`const filteredData = useMemo(() => {\n  return massiveArray.filter(item => item.id === targetId);\n}, [targetId, massiveArray]);`}
              </div>

              <h2
                id="usecallback"
                className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
              >
                Caching Functions with useCallback
              </h2>
              <p>
                Whenever a component re-renders, all inline functions are
                recreated. If you pass these functions down to child components,
                it forces the children to re-render. Wrap the function in{" "}
                <code>useCallback</code> to retain the exact same function
                reference between renders.
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
        {/* YAHAN FIX KIYA HAI: Direct string interpolation use ki hai taake react array child crash na kare */}
        <title>{`${currentLesson?.title || "Tutorials"} | CodeLume Engineering`}</title>
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
                <span>CodeLume Engineering Course</span>
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
