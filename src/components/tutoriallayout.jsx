// src/components/TutorialLayout.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, ChevronLeft, Code2 } from "lucide-react";

// Yahan humne courseData aur courseTitle as props receive kiye
export default function TutorialLayout({ courseData, courseTitle }) {
  const [activeLessonId, setActiveLessonId] = useState(
    courseData[0].lessons[0].id,
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
    if (currentLesson?.toc?.length > 0)
      setActiveHeadingId(currentLesson.toc[0].id);
  }, [activeLessonId, currentLesson]);

  return (
    <section className="w-full min-h-dvh pt-24 bg-[#030712] font-jakarta relative flex flex-col">
      <Helmet>
        <title>{`${currentLesson?.title} | ${courseTitle} | CodeLume Engineering`}</title>
        <meta
          name="description"
          content={`Complete ${courseTitle} documentation by CodeLume.`}
        />
      </Helmet>

      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex-grow flex flex-col md:flex-row relative z-10">
        {/* Left Sidebar */}
        <aside className="w-full md:w-[260px] lg:w-[280px] shrink-0 md:sticky md:top-24 h-auto md:h-[calc(100vh-6rem)] overflow-y-auto pt-8 pb-12 pr-6 custom-scrollbar border-r border-white/5 hidden md:block">
          <div className="mb-8 flex items-center gap-2">
            <Link
              to="/tutorials"
              className="text-slate-400 hover:text-white transition-colors font-bold text-sm tracking-wide"
            >
              &larr; All Courses
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
                        className={`text-left text-[14px] py-1.5 transition-colors outline-none ${activeLessonId === lesson.id ? "text-blue-400 font-semibold" : "text-slate-400 hover:text-slate-200"}`}
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

        {/* Center Main Content */}
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

        {/* Right Sidebar (TOC) */}
        {/* ... Same Right Sidebar code as before ... */}
      </div>
    </section>
  );
}
