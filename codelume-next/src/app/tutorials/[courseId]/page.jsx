"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Code2 } from "lucide-react";

// 1. Import ALL your course data files
import { expressCourseData } from "../data/expresscoursedata";
import { mongodbCourseData } from "../data/mongodbcoursedata";
import { nodeCourseData } from "../data/nodecoursedata";
import { reactCourseData } from "../data/reactCourseData"; // Now fully active!

// 2. Map the URL parameters to the correct data
const courseRegistry = {
  express: { title: "Express.js APIs", data: expressCourseData },
  mongodb: { title: "MongoDB Databases", data: mongodbCourseData },
  node: { title: "Node.js Architecture", data: nodeCourseData },
  react: { title: "React Mastery", data: reactCourseData }, // Now fully active!
};

export default function CourseViewer() {
  const params = useParams();
  const courseId = params.courseId;
  const course = courseRegistry[courseId];

  // If the user types a wrong URL (like /tutorials/python)
  if (!course) {
    return (
      <div className="min-h-dvh bg-[#030712] flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-black mb-4">404 - Course Not Found</h2>
        <Link
          href="/tutorials"
          className="text-blue-500 font-bold hover:text-blue-400"
        >
          &larr; Back to Tutorials
        </Link>
      </div>
    );
  }

  const { data: courseData, title: courseTitle } = course;

  // --- ALL YOUR ORIGINAL STATE LOGIC ---
  const [activeLessonId, setActiveLessonId] = useState(
    courseData[0]?.lessons[0]?.id,
  );
  const [activeHeadingId, setActiveHeadingId] = useState("");

  const allLessonsFlat = courseData.flatMap((category) =>
    category.lessons.map((lesson) => ({
      ...lesson,
      categoryName: category.category,
    })),
  );

  const currentLessonIndex = allLessonsFlat.findIndex(
    (l) => l.id === activeLessonId,
  );
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (currentLesson?.toc?.length > 0) {
      setActiveHeadingId(currentLesson.toc[0].id);
    }
  }, [activeLessonId, currentLesson]);

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
            {courseData.map((category, catIdx) => {
              const Icon = category.icon;
              return (
                <div key={catIdx} className="flex flex-col">
                  <div className="flex items-center gap-2 mb-3 text-white/90">
                    {Icon && <Icon className="w-4 h-4 text-blue-500" />}
                    <h2 className="text-[14px] font-bold m-0 tracking-wide">
                      {category.category}
                    </h2>
                  </div>
                  <div className="flex flex-col space-y-1 border-l border-white/10 ml-2 pl-4">
                    {category.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLessonId(lesson.id)}
                        className={`text-left text-[14px] py-1.5 transition-colors outline-none ${
                          activeLessonId === lesson.id
                            ? "text-blue-400 font-semibold"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {lesson.title}
                      </button>
                    ))}
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
            <div className="mb-10">
              <h2 className="text-[44px] sm:text-[52px] font-black text-white tracking-tight leading-[1.1] m-0 mb-4">
                {currentLesson?.title}
              </h2>
              <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-blue-400">
                  {currentLesson?.categoryName}
                </span>
                <span>{courseTitle}</span>
              </div>
            </div>

            <div className="animate-in fade-in duration-500 min-h-[300px]">
              {currentLesson?.content}
            </div>

            {/* Pagination Controls */}
            <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center">
              {hasPrev ? (
                <button
                  onClick={goToPrev}
                  className="flex items-center gap-2 bg-transparent text-slate-400 hover:text-white px-4 py-2 font-bold transition-all outline-none"
                >
                  <ChevronLeft className="w-5 h-5" /> Previous
                </button>
              ) : (
                <div />
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
