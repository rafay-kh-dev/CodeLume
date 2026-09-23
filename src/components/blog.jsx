import React, { useState } from "react";
import { Link } from "react-router-dom"; // 🚀 IMPORT ADDED
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  ChevronRight,
} from "lucide-react";

export default function Blog({ posts }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    "All",
    "Engineering",
    "UI/UX Design",
    "SEO & Growth",
    "Architecture",
  ];

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const featuredPost =
    filteredPosts.find((post) => post.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter(
    (post) => post.id !== featuredPost?.id,
  );

  return (
    <section
      className="relative w-full py-16 lg:py-24 bg-[#030712] font-jakarta overflow-hidden"
      id="insights"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[40rem] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none transform-gpu translate-z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col items-start text-left max-w-2xl">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/3 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0">
                Insights & Thoughts
              </h2>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] m-0 drop-shadow-lg">
              Engineering <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-300 to-cyan-400">
                Perspectives.
              </span>
            </h2>
          </div>

          <div className="relative w-full md:w-72 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-[#0a0f1c]/50 border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/30 focus:bg-[#0a0f1c]/80 transition-all shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar mask-fade-right">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all duration-300 whitespace-nowrap outline-none transform-gpu active:scale-95 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                  : "bg-white/3 text-slate-400 hover:bg-white/8 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* 🚀 FIXED: Replaced button with <Link> for true SEO indexing */}
          {featuredPost && (
            <Link
              to={`/insights/${featuredPost.slug}`}
              className="group relative lg:col-span-2 rounded-4xl bg-[#0a0f1c]/70 backdrop-blur-xl border border-white/5 p-2 shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out hover:-translate-y-2 transform-gpu overflow-hidden flex flex-col sm:flex-row outline-none text-left w-full cursor-pointer"
            >
              <div className="w-full sm:w-1/2 h-60 sm:h-auto rounded-[2rem] bg-[#030712] relative overflow-hidden shrink-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
                {featuredPost.image && (
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                )}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${featuredPost.imageGlow} opacity-60 mix-blend-overlay pointer-events-none`}
                />
                <div
                  className="absolute inset-0 opacity-[0.2] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#0a0f1c]/80 border border-white/10 backdrop-blur-md">
                  <h2 className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest m-0">
                    Featured
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center flex-1 w-full relative z-10">
                <div className="flex items-center gap-3 text-[12px] font-medium text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {featuredPost.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4 group-hover:text-blue-300 transition-colors m-0">
                  {featuredPost.title}
                </h2>
                <h2 className="text-[14px] sm:text-[15px] text-slate-400 leading-relaxed mb-8 m-0 line-clamp-3">
                  {featuredPost.excerpt}
                </h2>
                <div className="mt-auto flex items-center gap-2 text-[14px] font-bold text-white group-hover:text-blue-400 transition-colors">
                  Read Article{" "}
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          )}

          {/* 🚀 FIXED: Regular Posts Links */}
          {regularPosts.map((post) => (
            <Link
              key={post.id}
              to={`/insights/${post.slug}`}
              className="group relative rounded-4xl bg-[#0a0f1c]/70 backdrop-blur-xl border border-white/5 p-2 shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out hover:-translate-y-2 transform-gpu flex flex-col outline-none text-left w-full cursor-pointer"
            >
              <div className="w-full h-48 sm:h-56 rounded-[2rem] bg-[#030712] relative overflow-hidden shrink-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                )}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${post.imageGlow} opacity-60 mix-blend-overlay pointer-events-none`}
                />
                <div
                  className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#0a0f1c]/80 border border-white/10 backdrop-blur-md">
                  <h2 className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest m-0">
                    {post.category}
                  </h2>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 w-full relative z-10">
                <div className="flex items-center gap-3 text-[11px] sm:text-[12px] font-medium text-slate-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-3 group-hover:text-blue-300 transition-colors m-0 line-clamp-2">
                  {post.title}
                </h2>
                <h2 className="text-[13px] sm:text-[14px] text-slate-400 leading-relaxed mb-6 m-0 line-clamp-2">
                  {post.excerpt}
                </h2>
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between w-full">
                  <h2 className="text-[13px] font-bold text-slate-300 group-hover:text-white m-0">
                    Read More
                  </h2>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
