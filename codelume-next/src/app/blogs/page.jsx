"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Loader2, Mail } from "lucide-react";

// Scroll-Triggered Typewriter Effect for Heading
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
    let typingInterval = null;

    const startTimeout = setTimeout(() => {
      // setState ab setTimeout ke andar hai, sync nahi - eslint set-state-in-effect fix
      setDisplayedText("");
      typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 45);
    }, 200);

    return () => {
      clearTimeout(startTimeout);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [text, hasStarted]);

  const lines = displayedText.split("\n");
  const fullLines = text.split("\n");

  const headingClasses =
    "text-4xl sm:text-5xl lg:text-[3.4rem] font-medium tracking-tight text-black leading-[1.1] m-0 w-full text-center";

  return (
    <div
      ref={headingRef}
      className="min-h-25 sm:min-h-30 lg:min-h-35 flex items-center justify-center mb-6 w-full relative"
    >
      {/* INVISIBLE PLACEHOLDER */}
      <h2 className={`${headingClasses} opacity-0 pointer-events-none`}>
        {fullLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx !== fullLines.length - 1 && <br className="hidden sm:block" />}
          </React.Fragment>
        ))}
      </h2>

      {/* VISIBLE TYPING TEXT */}
      <h2 className={`${headingClasses} absolute top-0 left-0 h-full`}>
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            <span className={idx === 1 ? "text-gray-400" : ""}>{line}</span>
            {idx !== lines.length - 1 && <br className="hidden sm:block" />}
          </React.Fragment>
        ))}
        <span
          className="inline-block w-0.75 h-[0.8em] ml-1.5 animate-[pulse_1s_ease-in-out_infinite] align-middle -translate-y-1 rounded-full"
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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  // Next.js Environment Variable
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://codelume-backend.onrender.com";

  useEffect(() => {
    let isCancelled = false;

    // Render free tier 15 min baad sleep ho jata hai, pehla fetch 50-60s me wake hota hai
    // Is liye retry + timeout lagaya hai, warna "Failed to fetch" aata hai
    const fetchWithRetry = async (url, retries = 3) => {
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 20000); // 20s timeout
          const res = await fetch(url, { signal: controller.signal });
          clearTimeout(timeout);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return await res.json();
        } catch (err) {
          if (attempt === retries) throw err;
          // Cold start ke liye wait: 2s, 4s, 8s
          await new Promise((r) => setTimeout(r, 2000 * Math.pow(2, attempt)));
        }
      }
    };

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);

        // allSettled - agar categories fail bhi ho to blogs phir bhi dikhenge
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

          // Categories fail ho to posts se hi categories bana lo - page khali nahi rahega
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
    return matchesCategory;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        `}
      </style>

      <div className="max-w-325 mx-auto px-5 sm:px-10 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
          <TypewriterHeading text={"Explore our latest\ndigital articles."} />
        </div>

        {/* Antigravity Style Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 sm:mb-16 border-b border-gray-200">
          <div className="flex overflow-x-auto no-scrollbar gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`pb-4 text-[15px] transition-all duration-300 outline-none cursor-pointer whitespace-nowrap border-b-[3px] mb-[-1.5px] ${
                  activeCategory === cat
                    ? "text-black border-[#4285F4] font-semibold"
                    : "text-gray-500 border-transparent hover:text-black font-medium"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pb-4 shrink-0 hidden sm:block">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[13px] font-semibold text-black transition-colors outline-none cursor-pointer">
              <Mail className="w-3.5 h-3.5" /> Newsletter
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#4285F4] animate-spin" />
            <p className="text-gray-500 text-sm font-medium">
              Loading insights...
            </p>
            <p className="text-gray-400 text-xs font-medium">
              Server waking up, thora wait karein...
            </p>
          </div>
        ) : fetchError ? (
          <div className="text-center py-20 bg-gray-50 rounded-4xl border border-gray-200 w-full">
            <h2 className="text-black font-semibold m-0 text-[18px] mb-2">
              Server is waking up...
            </h2>
            <p className="text-gray-500 text-[14px] m-0 mb-6 max-w-md mx-auto">
              Backend (Render free tier) sleep pe tha, please dobara try karein.
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
            {currentPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  {currentPosts.map((post) => (
                    // h-full added to ensure all cards in the grid row are the same height
                    <div
                      key={post._id}
                      className="group flex gap-5 sm:gap-6 pb-12 sm:pb-16 border-b border-gray-100 last:border-b-0 md:nth-last-[-n+2]:border-b-0 justify-between h-full"
                    >
                      {/* Left Side: Content - flex-col with h-full */}
                      <div className="flex flex-col flex-1 pr-2 sm:pr-4 h-full">
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="outline-none"
                        >
                          <h2 className="text-[20px] sm:text-[24px] lg:text-[26px] font-semibold text-black leading-tight mb-3 group-hover:text-[#4285F4] transition-colors m-0 line-clamp-3">
                            {post.title}
                          </h2>
                        </Link>

                        {/* Meta Info row - flex-wrap ensures safe wrapping on small screens without breaking layout */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[12.5px] sm:text-[13px] font-medium text-gray-500 mb-6">
                          <span className="whitespace-nowrap">
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                          <span className="text-gray-300">•</span>
                          {/* Fixed "read read" issue by removing the hardcoded text */}
                          <span className="whitespace-nowrap">
                            {post.readTime}
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 whitespace-nowrap">
                            {post.category}
                          </span>
                        </div>

                        {/* mt-auto pushes the button to the absolute bottom of the container! */}
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-[13.5px] font-semibold text-black hover:bg-gray-100 transition-colors self-start outline-none mt-auto"
                        >
                          Read blog
                        </Link>
                      </div>

                      {/* Right Side: Image - self-start ensures image doesn't stretch vertically */}
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="outline-none shrink-0 block self-start"
                      >
                        <div className="w-24 h-24 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-[20px] sm:rounded-3xl bg-gray-100 relative overflow-hidden border border-gray-200">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 96px, (max-width: 1024px) 144px, 160px"
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            unoptimized
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-6 mt-4 pt-10 border-t border-gray-200">
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
              <div className="text-center py-20 bg-gray-50 rounded-4xl border border-gray-200 w-full">
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
