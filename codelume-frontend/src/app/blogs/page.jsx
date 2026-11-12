"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Mail,
  Search,
  TrendingUp,
  Clock,
  Rss,
} from "lucide-react";

// Scroll-Triggered Typewriter Effect for Heading - same as your file
const TypewriterHeading = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let i = 0;
    setDisplayedText("");

    const startTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 45);

      return () => clearInterval(typingInterval);
    }, 200);

    return () => clearTimeout(startTimeout);
  }, [text, hasStarted]);

  const lines = displayedText.split("\n");
  const fullLines = text.split("\n");

  const headingClasses =
    "text-4xl sm:text-5xl lg:text-[3.4rem] font-medium tracking-tight text-black leading-[1.1] m-0 w-full text-center";

  return (
    <div
      ref={headingRef}
      className="min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] flex items-center justify-center mb-6 w-full relative"
    >
      <h2 className={`${headingClasses} opacity-0 pointer-events-none`}>
        {fullLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx !== fullLines.length - 1 && <br className="hidden sm:block" />}
          </React.Fragment>
        ))}
      </h2>
      <h2 className={`${headingClasses} absolute top-0 left-0 h-full`}>
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            <span className={idx === 1 ? "text-gray-400" : ""}>{line}</span>
            {idx !== lines.length - 1 && <br className="hidden sm:block" />}
          </React.Fragment>
        ))}
        <span
          className="inline-block w-[3px] h-[0.8em] ml-1.5 animate-[pulse_1s_ease-in-out_infinite] align-middle translate-y-[-4px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, #4285F4, #34A853, #FBBC05, #EA4335)",
          }}
        ></span>
      </h2>
    </div>
  );
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State - same as your file
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  // FIX: Purana backend URL tha - naya wala
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://Rafay's CodeLume-rb3h.onrender.com";

  useEffect(() => {
    let isCancelled = false;

    // Render free tier sleeps after 15 min of inactivity, first fetch can take 50-60s to wake up
    // Retry + timeout prevents "Failed to fetch"
    const fetchWithRetry = async (url, retries = 3) => {
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(
            () => controller.abort(),
            attempt === 0 ? 70000 : 30000,
          );
          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(timeout);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return await res.json();
        } catch (err) {
          if (attempt === retries) throw err;
          await new Promise((r) => setTimeout(r, 2000 * Math.pow(2, attempt)));
        }
      }
    };

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);

        const [postsResult, catsResult] = await Promise.allSettled([
          fetchWithRetry(`${API_BASE_URL}/api/blogs`),
          fetchWithRetry(`${API_BASE_URL}/api/categories`),
        ]);

        if (isCancelled) return;

        if (postsResult.status === "fulfilled") {
          const postData = Array.isArray(postsResult.value)
            ? postsResult.value
            : [];
          const publishedPosts = postData.filter(
            (post) => post.status === "published",
          );
          setPosts(publishedPosts);

          if (catsResult.status !== "fulfilled") {
            const fromPosts = [
              "All",
              ...new Set(publishedPosts.map((p) => p.category).filter(Boolean)),
            ];
            setCategories(fromPosts);
          }
        } else {
          throw postsResult.reason;
        }

        if (catsResult.status === "fulfilled") {
          const catData = Array.isArray(catsResult.value)
            ? catsResult.value
            : [];
          const dynamicCategories = [
            "All",
            ...catData.map((c) => c.name).filter(Boolean),
          ];
          setCategories(dynamicCategories);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Error fetching data:", err);
          setFetchError(err);
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    };

    fetchDashboardData();
    return () => {
      isCancelled = true;
    };
  }, [API_BASE_URL, retryCount]);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Business Insider: Featured + Trending only on Page 1, All category, no search
  const showFeatured =
    activeCategory === "All" &&
    currentPage === 1 &&
    searchQuery.trim() === "" &&
    filteredPosts.length >= 4;
  const featuredPost = showFeatured ? filteredPosts[0] : null;
  const trendingPosts = showFeatured ? filteredPosts.slice(1, 4) : [];
  // Grid excludes featured + trending on page 1 to avoid duplicate
  const gridPosts = showFeatured ? filteredPosts.slice(4) : filteredPosts;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // For featured page, grid pagination is on gridPosts, not filteredPosts
  const paginatedGrid = showFeatured
    ? gridPosts.slice(0, postsPerPage)
    : filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages =
    Math.ceil(
      (showFeatured ? gridPosts.length : filteredPosts.length) / postsPerPage,
    ) || 1;
  const currentPosts = paginatedGrid;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section
      className="relative w-full py-24 sm:py-32 bg-white font-jakarta min-h-dvh border-t border-gray-100 overflow-hidden"
      id="insights"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div className="max-w-[1300px] mx-auto px-5 sm:px-10 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <TypewriterHeading text={"Explore our latest\ndigital articles."} />
          <p className="text-[15px] text-gray-500 font-medium m-0 mt-2 max-w-xl">
            No fluff. Real lessons from real projects - how websites, stores,
            and brands actually grow.
          </p>
        </div>

        {/* Search + Newsletter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search articles..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 pl-11 pr-4 text-[14px] font-medium text-black placeholder:text-gray-400 outline-none focus:bg-white focus:border-black transition-colors"
            />
          </div>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[13px] font-semibold text-black transition-colors outline-none cursor-pointer shrink-0">
            <Mail className="w-3.5 h-3.5" /> Newsletter
          </button>
        </div>

        {/* NICE WALA SECTION - Antigravity Style Tabs + RSS */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 mb-10">
          <div className="flex overflow-x-auto no-scrollbar gap-6 sm:gap-8 flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`relative pb-3 pt-1 text-[15px] whitespace-nowrap outline-none cursor-pointer transition-colors ${
                  activeCategory === cat
                    ? "text-black font-medium after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-[#4285F4] after:rounded-full"
                    : "text-gray-500 font-normal hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <a
            href="/blogs/rss.xml"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-100 text-[13px] font-medium text-gray-600 transition-colors shrink-0 mb-2"
          >
            <Rss className="w-3.5 h-3.5" /> RSS Feed
          </a>
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#4285F4] animate-spin" />
            <p className="text-gray-500 text-sm font-medium">
              Loading insights...
            </p>
            <p className="text-gray-400 text-xs font-medium">
              Server is waking up, please wait a moment...
            </p>
          </div>
        ) : fetchError ? (
          <div className="text-center py-20 bg-gray-50 rounded-[32px] border border-gray-200 w-full">
            <h2 className="text-black font-semibold m-0 text-[18px] mb-2">
              Server is waking up...
            </h2>
            <p className="text-gray-500 text-[14px] m-0 mb-6 max-w-md mx-auto">
              Our server was sleeping and is waking up. Please try again.
            </p>
            <button
              onClick={() => setRetryCount((c) => c + 1)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-[14px] font-semibold hover:bg-gray-900 transition-colors outline-none cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-10">
            {/* FEATURED + TRENDING - Business Insider layout */}
            {showFeatured && featuredPost && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10 border-b border-gray-200">
                {/* Featured - Large */}
                <Link
                  href={`/blogs/${featuredPost.slug}`}
                  className="lg:col-span-2 group block outline-none"
                >
                  <div className="aspect-[16/9] bg-gray-100 rounded-[20px] overflow-hidden border border-gray-200">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-5">
                    <span className="text-[11px] font-bold text-[#4285F4] uppercase tracking-wider">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-[26px] sm:text-[32px] font-medium text-black tracking-tight leading-[1.15] m-0 mt-2 group-hover:underline decoration-2 underline-offset-4">
                      {featuredPost.title}
                    </h2>
                    {featuredPost.excerpt && (
                      <p className="text-[15px] text-gray-500 font-medium leading-relaxed m-0 mt-3 max-w-2xl line-clamp-2">
                        {featuredPost.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-4 text-[12.5px] font-medium text-gray-500">
                      <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-[13px]">
                        R
                      </span>
                      <span className="font-bold text-black">Rafay</span>
                      <span>•</span>
                      <span>{formatDate(featuredPost.createdAt)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />{" "}
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Trending - Right side */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                    <TrendingUp className="w-4 h-4 text-black" />
                    <h3 className="text-[14px] font-bold text-black uppercase tracking-wider m-0">
                      Trending Now
                    </h3>
                  </div>
                  <div className="flex flex-col divide-y divide-gray-100">
                    {trendingPosts.map((post, idx) => (
                      <Link
                        key={post._id}
                        href={`/blogs/${post.slug}`}
                        className="group py-4 flex gap-4 outline-none"
                      >
                        <span className="text-[28px] font-medium text-gray-200 leading-none shrink-0 w-[32px]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-bold text-[#4285F4] uppercase tracking-wider">
                            {post.category}
                          </span>
                          <h4 className="text-[15px] font-semibold text-black leading-[1.4] m-0 mt-1 group-hover:underline underline-offset-2 line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-[12px] text-gray-500 font-medium m-0 mt-1.5">
                            Rafay • {formatDate(post.createdAt)} •{" "}
                            {post.readTime}
                          </p>
                        </div>
                        <div className="w-[72px] h-[72px] rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="bg-black rounded-[20px] p-5 mt-4">
                    <h4 className="text-[16px] font-semibold text-white m-0">
                      Get growth tips weekly.
                    </h4>
                    <p className="text-[13px] text-gray-400 font-medium m-0 mt-1">
                      One email a week. No spam.
                    </p>
                    <form
                      className="flex gap-2 mt-4"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <input
                        type="email"
                        required
                        placeholder="Your email"
                        className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-[13px] text-white placeholder:text-gray-400 outline-none focus:border-white/40"
                      />
                      <button className="px-4 py-2.5 rounded-full bg-white text-black text-[13px] font-bold shrink-0 cursor-pointer">
                        Join
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* NICE WALA GRID - Antigravity Style - No "Latest Articles" heading, direct grid like screenshot */}
            {currentPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-10">
                  {currentPosts.map((post) => (
                    <article
                      key={post._id}
                      className="group flex gap-5 sm:gap-6 justify-between pb-10 border-b border-gray-100"
                    >
                      {/* Left - Text */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="outline-none"
                        >
                          <h2 className="text-[21px] sm:text-[23px] leading-[1.35] font-medium text-black tracking-[-0.01em] m-0 line-clamp-3 group-hover:underline decoration-[1.5px] underline-offset-4">
                            {post.title}
                          </h2>
                        </Link>

                        {/* Meta - Screenshot style: Date • Read • Pill */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mt-3">
                          <span className="text-[13px] text-gray-600 font-normal whitespace-nowrap">
                            {formatDate(post.createdAt)}
                          </span>
                          <span className="text-gray-300 text-[13px]">•</span>
                          <span className="text-[13px] text-gray-600 font-normal whitespace-nowrap">
                            {post.readTime}
                          </span>
                          {post.category && (
                            <span className="px-2.5 py-1 rounded-full bg-[#f8f8f8] border border-gray-100 text-gray-600 text-[12.5px] font-normal whitespace-nowrap">
                              {post.category}
                            </span>
                          )}
                          {/* Agar tags hain to 2nd pill bhi - screenshot me 2 pills hain jaise Research + Model */}
                          {post.tags &&
                            post.tags[0] &&
                            post.tags[0] !== post.category && (
                              <span className="px-2.5 py-1 rounded-full bg-[#f8f8f8] border border-gray-100 text-gray-600 text-[12.5px] font-normal whitespace-nowrap">
                                {post.tags[0]}
                              </span>
                            )}
                        </div>

                        <Link
                          href={`/blogs/${post.slug}`}
                          className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-white border border-gray-200 text-[14px] font-normal text-black hover:bg-gray-50 hover:border-gray-300 transition-colors self-start outline-none mt-5"
                        >
                          Read blog
                        </Link>
                      </div>

                      {/* Right - Image */}
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="outline-none shrink-0 block self-start"
                      >
                        <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] lg:w-[160px] lg:h-[160px] rounded-[20px] bg-gray-100 relative overflow-hidden border border-gray-100">
                          {post.coverImage ? (
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4] to-[#34A853] flex items-center justify-center text-white font-bold text-xl">
                              C
                            </div>
                          )}
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-6 mt-2 pt-8 border-t border-gray-200">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-3 rounded-full bg-white border border-gray-200 text-black hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:border-gray-200 cursor-pointer outline-none shadow-sm active:scale-95"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <span className="text-[14px] font-semibold text-gray-500">
                      Page <span className="text-black">{currentPage}</span> of{" "}
                      <span className="text-black">{totalPages}</span>
                    </span>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-3 rounded-full bg-white border border-gray-200 text-black hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:border-gray-200 cursor-pointer outline-none shadow-sm active:scale-95"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-[32px] border border-gray-200 w-full">
                <h2 className="text-gray-500 font-semibold m-0 text-[18px]">
                  No articles found in this category.
                </h2>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
