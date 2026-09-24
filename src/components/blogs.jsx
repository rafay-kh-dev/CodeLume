import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Search,
  Tag,
  Mail,
  Loader2,
} from "lucide-react";
import { API_URL } from "../lib/api";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = [
    "All",
    "Development",
    "Design",
    "Engineering",
    "E-Commerce",
  ];

  // Fetch real data from your Custom Backend (MongoDB) using dynamic API URL
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blogs`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts by Search and Category
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section
      className="relative w-full pt-28 sm:pt-36 pb-16 lg:pb-24 bg-[#030712] font-jakarta min-h-dvh"
      id="insights"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #030712; }
          ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
        `}
      </style>

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-160 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08)_0%,transparent_70%)] transform-gpu translate-z-0" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)] mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-[11px] sm:text-[12px] font-extrabold text-slate-300 uppercase tracking-[0.2em] m-0">
              CodeLume Blogs
            </h2>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] m-0 drop-shadow-lg mb-6">
            Explore our latest <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-cyan-400">
              digital articles.
            </span>
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* LEFT COLUMN: Main Blog Feed */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
              {currentPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {currentPosts.map((post) => (
                      <Link
                        key={post._id}
                        to={`/blogs/${post.slug}`}
                        className="group relative rounded-4xl bg-[#0a0f1c]/70 backdrop-blur-xl border border-white/5 p-2 shadow-xl hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)] transition-all duration-500 ease-out hover:-translate-y-2 transform-gpu flex flex-col outline-none text-left cursor-pointer hover:border-blue-500/20"
                      >
                        <div className="w-full h-48 sm:h-56 rounded-3xl bg-[#030712] relative overflow-hidden shrink-0">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                          />
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0a0f1c]/80 border border-white/10 backdrop-blur-md z-10">
                            <h2 className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest m-0">
                              {post.category}
                            </h2>
                          </div>
                        </div>

                        <div className="p-5 flex flex-col flex-1 relative z-10">
                          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-400 mb-3">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" />{" "}
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3" /> {post.readTime}
                            </span>
                          </div>
                          <h2 className="text-xl font-black text-white leading-snug mb-3 group-hover:text-blue-400 transition-colors m-0 line-clamp-2">
                            {post.title}
                          </h2>
                          <h2 className="text-[13px] text-slate-400 leading-relaxed mb-6 m-0 line-clamp-2">
                            {post.excerpt}
                          </h2>
                          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between w-full">
                            <h2 className="text-[12px] font-bold text-slate-300 group-hover:text-white m-0">
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

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8 pt-8 border-t border-white/10">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:hover:bg-white/5 cursor-pointer outline-none"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>

                      <span className="text-[14px] font-bold text-slate-300">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:hover:bg-white/5 cursor-pointer outline-none"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-10 bg-white/5 rounded-3xl border border-white/10 w-full">
                  <h2 className="text-slate-400 font-bold m-0 text-lg">
                    No posts found.
                  </h2>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Sidebar (Sticky) */}
            <aside className="w-full lg:w-1/3 flex flex-col gap-8 self-start lg:sticky lg:top-32">
              {/* 1. Search Widget */}
              <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/5 rounded-4xl p-6 shadow-xl">
                <h2 className="text-[14px] font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2 m-0">
                  <Search className="w-4 h-4 text-blue-500" /> Search
                </h2>
                <div className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search articles..."
                    className="w-full bg-[#030712] border border-white/10 rounded-xl py-3.5 pl-4 pr-10 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 pointer-events-none transition-colors" />
                </div>
              </div>

              {/* 2. Categories Widget */}
              <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/5 rounded-4xl p-6 shadow-xl">
                <h2 className="text-[14px] font-black text-white uppercase tracking-wider mb-5 flex items-center gap-2 m-0">
                  <Tag className="w-4 h-4 text-blue-500" /> Topics
                </h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-lg text-[13px] font-bold tracking-wide transition-all duration-300 outline-none cursor-pointer ${
                        activeCategory === cat
                          ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                          : "bg-[#030712] border border-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Newsletter CTA Widget */}
              <div className="bg-linear-to-br from-[#0a0f1c] to-[#030712] border border-blue-500/20 rounded-4xl p-6 shadow-[0_0_30px_rgba(37,99,235,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                <h2 className="text-[14px] font-black text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2 m-0 relative z-10">
                  <Mail className="w-4 h-4" /> Newsletter
                </h2>
                <h2 className="text-2xl font-black text-white mb-2 leading-tight m-0 relative z-10">
                  Stay updated.
                </h2>
                <h2 className="text-[13px] text-slate-400 mb-6 font-medium m-0 relative z-10">
                  Get exclusive technical tips and design strategies delivered
                  directly to your inbox.
                </h2>
                <div className="flex flex-col gap-3 relative z-10">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-[#030712]/80 border border-white/10 rounded-xl py-3.5 px-4 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                  />
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 outline-none cursor-pointer">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
