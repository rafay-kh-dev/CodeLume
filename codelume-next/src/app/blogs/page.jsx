"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  const [activeCategory, setActiveCategory] = useState("All");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8; 

  // Next.js Environment Variable
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://codelume-backend.onrender.com";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        const [postsResponse, catResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/blogs`),
          fetch(`${API_BASE_URL}/api/categories`),
        ]);

        if (postsResponse.ok) {
          const postData = await postsResponse.json();
          const publishedPosts = postData.filter(
            (post) => post.status === "published"
          );
          setPosts(publishedPosts);
        }

        if (catResponse.ok) {
          const catData = await catResponse.json();
          const dynamicCategories = ["All", ...catData.map((c) => c.name)];
          setCategories(dynamicCategories);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_BASE_URL]);

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

      <div className="max-w-[1300px] mx-auto px-5 sm:px-10 lg:px-12 relative z-10 w-full">
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
                className={`pb-4 text-[15px] transition-all duration-300 outline-none cursor-pointer whitespace-nowrap border-b-[3px] -mb-[1.5px] ${
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
                      className="group flex gap-5 sm:gap-6 pb-12 sm:pb-16 border-b border-gray-100 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0 justify-between h-full"
                    >
                      {/* Left Side: Content - flex-col with h-full */}
                      <div className="flex flex-col flex-1 pr-2 sm:pr-4 h-full">
                        <Link href={`/blogs/${post.slug}`} className="outline-none">
                          <h2 className="text-[20px] sm:text-[24px] lg:text-[26px] font-semibold text-black leading-[1.25] mb-3 group-hover:text-[#4285F4] transition-colors m-0 line-clamp-3">
                            {post.title}
                          </h2>
                        </Link>
                        
                        {/* Meta Info row - flex-wrap ensures safe wrapping on small screens without breaking layout */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[12.5px] sm:text-[13px] font-medium text-gray-500 mb-6">
                          <span className="whitespace-nowrap">
                            {new Date(post.createdAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })}
                          </span>
                          <span className="text-gray-300">•</span>
                          {/* Fixed "read read" issue by removing the hardcoded text */}
                          <span className="whitespace-nowrap">{post.readTime}</span>
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
                      <Link href={`/blogs/${post.slug}`} className="outline-none shrink-0 block self-start">
                        <div className="w-24 h-24 sm:w-36 sm:h-36 lg:w-[160px] lg:h-[160px] rounded-[20px] sm:rounded-[24px] bg-gray-100 relative overflow-hidden border border-gray-200">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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