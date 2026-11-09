"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Star,
  GitFork,
  GitBranch,
  Terminal,
  Copy,
  Check,
  Search,
  Globe,
  Clock,
  Sparkles,
  Code2,
  FolderGit2,
} from "lucide-react";

// Scroll-Triggered Typewriter Effect for Heading (Zero Layout Shift)
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
      { threshold: 0.2 }
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
  }, [hasStarted, text]);

  const lines = displayedText.split("\n");
  const fullLines = text.split("\n");

  const headingClasses =
    "text-[34px] sm:text-6xl lg:text-[4rem] font-medium tracking-tight text-black leading-[1.08] select-none cursor-default w-full m-0 text-left";

  return (
    <div ref={headingRef} className="w-full mb-5 sm:mb-6 relative">
      {/* INVISIBLE PLACEHOLDER */}
      <h2 className={`${headingClasses} opacity-0 pointer-events-none`}>
        {fullLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx !== fullLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>

      {/* VISIBLE TYPING TEXT */}
      <h2 className={`${headingClasses} absolute top-0 left-0 h-full`}>
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            <span className={idx === 1 ? "text-gray-400" : "text-black"}>
              {line}
            </span>
            {idx !== lines.length - 1 && <br />}
          </React.Fragment>
        ))}
        <span
          className="inline-block w-[3.5px] sm:w-[4px] h-[0.8em] ml-1.5 sm:ml-2 animate-[pulse_1s_ease-in-out_infinite] align-middle translate-y-[-4px] sm:translate-y-[-6px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, #4285F4, #34A853, #FBBC05, #EA4335)",
          }}
        ></span>
      </h2>
    </div>
  );
};

// Pure SVG GitHub Icon (Zero Build Errors)
const GitHubIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={`${className} fill-current`}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export default function CaseStudies() {
  const [repos, setRepos] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  // Google Antigravity Palette
  const palette = [
    {
      hex: "#4285F4",
      bg: "bg-[#4285F4]/10",
      text: "text-[#4285F4]",
      border: "group-hover:border-[#4285F4]/40",
    },
    {
      hex: "#34A853",
      bg: "bg-[#34A853]/10",
      text: "text-[#34A853]",
      border: "group-hover:border-[#34A853]/40",
    },
    {
      hex: "#FBBC05",
      bg: "bg-[#FBBC05]/10",
      text: "text-[#FBBC05]",
      border: "group-hover:border-[#FBBC05]/40",
    },
    {
      hex: "#EA4335",
      bg: "bg-[#EA4335]/10",
      text: "text-[#EA4335]",
      border: "group-hover:border-[#EA4335]/40",
    },
  ];

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/rafay-kh-dev/repos?sort=updated&per_page=15"
        );

        if (!response.ok) throw new Error("GitHub API Error");

        const data = await response.json();

        const nonForks = data.filter((repo) => !repo.fork);

        // Extract unique languages for filter tabs
        const langs = [
          "All",
          ...new Set(
            nonForks.map((r) => r.language).filter((l) => Boolean(l))
          ),
        ];
        setCategories(langs);

        const formatted = nonForks.slice(0, 8).map((repo, index) => {
          const theme = palette[index % palette.length];
          const cleanName = repo.name.replace(/-/g, " ").replace(/_/g, " ");

          return {
            id: repo.id,
            rawName: repo.name,
            title: cleanName,
            language: repo.language || "Full-Stack",
            description:
              repo.description ||
              `Production-ready ${cleanName} architecture engineered for high performance, clean modularity, and modern web standards.`,
            url: repo.html_url,
            homepage: repo.homepage,
            cloneUrl: `git clone ${repo.clone_url}`,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            branch: repo.default_branch || "main",
            sizeKb: repo.size,
            updatedAt: new Date(repo.updated_at).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            topics:
              repo.topics && repo.topics.length > 0
                ? repo.topics.slice(0, 4)
                : [
                    repo.language ? repo.language.toLowerCase() : "web-app",
                    "architecture",
                    "production",
                  ],
            theme,
          };
        });

        setRepos(formatted);
      } catch (error) {
        console.error("Failed to fetch repos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  const handleCopyClone = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredRepos = repos.filter((repo) => {
    const matchesCategory =
      activeCategory === "All" || repo.language === activeCategory;
    const matchesSearch =
      repo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-black font-jakarta pt-24 sm:pt-32 pb-24 overflow-x-clip relative">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      <div className="max-w-[1300px] mx-auto px-5 sm:px-10 lg:px-12 relative z-10 w-full">
        {/* TOP HERO SPLIT: Heading + Live GitHub Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-14 sm:mb-20">
          <div className="lg:col-span-7">
            <TypewriterHeading
              text={"Open-source systems &\nproduction builds."}
            />
            <p className="text-gray-500 font-medium text-[15px] sm:text-[17px] leading-relaxed m-0 max-w-2xl">
              Explore live repositories, full-stack web applications, and custom
              architectures pulled directly in real-time from my GitHub
              engineering workspace.
            </p>
          </div>

          {/* Right Side: Live GitHub Telemetry Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-gray-50 border border-gray-200 rounded-[28px] p-6 sm:p-7 shadow-sm flex flex-col justify-between gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                    <GitHubIcon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-[16px] font-bold text-black m-0">
                        @rafay-kh-dev
                      </h2>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#34A853]/10 text-[#34A853] text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                        Live Sync
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-500 font-medium m-0 mt-0.5">
                      Lead Full-Stack Architect
                    </p>
                  </div>
                </div>

                <a
                  href="https://github.com/rafay-kh-dev"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:border-gray-300 transition-all shadow-sm"
                  title="Visit GitHub Profile"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white border border-gray-200/80 rounded-2xl p-3.5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Repositories
                  </span>
                  <h2 className="text-[20px] sm:text-[22px] font-bold text-black m-0">
                    {repos.length > 0 ? `${repos.length}+` : "10+"}
                  </h2>
                </div>
                <div className="bg-white border border-gray-200/80 rounded-2xl p-3.5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Core Stack
                  </span>
                  <h2 className="text-[20px] sm:text-[22px] font-bold text-[#4285F4] m-0">
                    MERN
                  </h2>
                </div>
                <div className="bg-white border border-gray-200/80 rounded-2xl p-3.5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Status
                  </span>
                  <h2 className="text-[15px] sm:text-[16px] font-bold text-[#34A853] m-0 pt-1">
                    Active
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FILTER & SEARCH CONTROL BAR */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 sm:mb-12 bg-gray-50 border border-gray-200 p-3 sm:p-4 rounded-[24px]">
          {/* Language Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all duration-200 whitespace-nowrap outline-none cursor-pointer ${
                    isActive
                      ? "bg-[#111827] text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200/80 hover:text-black hover:border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Instant Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter repositories..."
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-[13.5px] font-medium text-black placeholder-gray-400 focus:outline-none focus:border-[#4285F4] transition-colors"
            />
          </div>
        </div>

        {/* LOADING SKELETON GRID */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {[1, 2, 3, 4].map((n, idx) => {
              const colSpan =
                idx % 3 === 0 ? "lg:col-span-7" : "lg:col-span-5";
              return (
                <div
                  key={n}
                  className={`${colSpan} bg-gray-50 border border-gray-200 rounded-[32px] p-6 sm:p-8 h-[380px] animate-pulse flex flex-col justify-between`}
                >
                  <div className="h-32 bg-gray-200/70 rounded-2xl w-full" />
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded-lg w-2/3" />
                    <div className="h-4 bg-gray-200 rounded-lg w-full" />
                    <div className="h-4 bg-gray-200 rounded-lg w-4/5" />
                  </div>
                  <div className="h-12 bg-gray-200 rounded-xl w-full" />
                </div>
              );
            })}
          </div>
        ) : filteredRepos.length > 0 ? (
          /* ASYMMETRIC BENTO GRID SHOWCASE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 mb-20">
            {filteredRepos.map((repo, index) => {
              // Alternating 7 / 5 Bento spans like Service & DevTools sections
              const rowPattern = index % 4;
              const colSpan =
                rowPattern === 0 || rowPattern === 3
                  ? "lg:col-span-7"
                  : "lg:col-span-5";

              return (
                <div
                  key={repo.id}
                  className={`${colSpan} group relative bg-white border border-gray-200 ${repo.theme.border} rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden`}
                >
                  {/* Subtle Antigravity Hover Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none hidden sm:block"
                    style={{
                      background: `radial-gradient(circle at right bottom, ${repo.theme.hex}, transparent 65%)`,
                    }}
                  />

                  <div>
                    {/* TOP IDE / BROWSER MOCKUP HEADER */}
                    <div className="bg-gray-50 border border-gray-200/90 rounded-[20px] p-4 sm:p-5 mb-6 sm:mb-7 relative overflow-hidden">
                      {/* Browser Top Bar */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
                          <span className="ml-2 text-[11px] font-mono font-semibold text-gray-500 truncate max-w-[150px] sm:max-w-[240px]">
                            rafay-kh-dev/{repo.rawName}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white border border-gray-200 text-[10.5px] font-mono font-bold text-gray-600">
                            <GitBranch className="w-3 h-3 text-[#4285F4]" />
                            {repo.branch}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[10.5px] font-bold uppercase tracking-wider ${repo.theme.bg} ${repo.theme.text}`}
                          >
                            {repo.language}
                          </span>
                        </div>
                      </div>

                      {/* Interactive CLI Clone Bar */}
                      <div className="bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Terminal
                            className="w-4 h-4 shrink-0"
                            style={{ color: repo.theme.hex }}
                          />
                          <code className="text-[12px] font-mono text-gray-600 truncate">
                            {repo.cloneUrl}
                          </code>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleCopyClone(repo.id, repo.cloneUrl)
                          }
                          className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[11px] font-bold text-gray-700 transition-colors cursor-pointer outline-none"
                          title="Copy git clone command"
                        >
                          {copiedId === repo.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#34A853]" />
                              <span className="text-[#34A853]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-gray-400" />
                              <span className="hidden sm:inline">Clone</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* PROJECT TITLE & DESCRIPTION */}
                    <div className="mb-6 relative z-10">
                      <div className="flex items-start justify-between gap-4 mb-2.5">
                        <h2
                          className="text-[22px] sm:text-[26px] font-bold text-black m-0 tracking-tight capitalize transition-colors duration-300"
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = repo.theme.hex)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "black")
                          }
                        >
                          {repo.title}
                        </h2>

                        <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-gray-400 shrink-0 mt-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {repo.updatedAt}
                        </span>
                      </div>

                      <p className="text-gray-500 font-medium text-[14.5px] sm:text-[15.5px] leading-relaxed m-0 line-clamp-2">
                        {repo.description}
                      </p>
                    </div>

                    {/* TOPIC TAGS */}
                    <div className="flex flex-wrap items-center gap-2 mb-7 relative z-10">
                      {repo.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200/80 text-[11.5px] font-semibold text-gray-600"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CARD FOOTER: Stats + Action Buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 mt-auto">
                    {/* GitHub Metrics */}
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/80 text-[12.5px] font-bold text-gray-700">
                        <Star className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                        {repo.stars}
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/80 text-[12.5px] font-bold text-gray-700">
                        <GitFork className="w-3.5 h-3.5 text-[#4285F4]" />
                        {repo.forks}
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/80 text-[12px] font-semibold text-gray-500">
                        <Code2 className="w-3.5 h-3.5 text-[#34A853]" />
                        {repo.sizeKb > 1024
                          ? `${(repo.sizeKb / 1024).toFixed(1)} MB`
                          : `${repo.sizeKb} KB`}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      {repo.homepage && (
                        <a
                          href={
                            repo.homepage.startsWith("http")
                              ? repo.homepage
                              : `https://${repo.homepage}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-gray-300 text-black text-[13px] font-bold transition-all shadow-sm hover:-translate-y-0.5 outline-none"
                        >
                          <Globe className="w-3.5 h-3.5 text-[#34A853]" />
                          Live Demo
                        </a>
                      )}

                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#111827] hover:bg-black text-white text-[13px] font-bold transition-all shadow-sm hover:-translate-y-0.5 outline-none group/btn"
                      >
                        <GitHubIcon className="w-4 h-4" />
                        <span>Source Code</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[32px] border border-gray-200 w-full mb-20">
            <FolderGit2 className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h2 className="text-black font-bold m-0 text-[18px] mb-1">
              No matching repositories found
            </h2>
            <p className="text-gray-500 text-[14px] m-0">
              Try clearing your search filter or selecting a different language
              tab.
            </p>
          </div>
        )}

        {/* BOTTOM ENTERPRISE CTA BANNER */}
        <div className="bg-gray-50 border border-gray-200 rounded-[32px] p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-[11px] font-bold uppercase tracking-widest text-gray-600 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#4285F4]" />
              Custom Engineering
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-black tracking-tight m-0 mb-3">
              Want a custom architecture built for your brand?
            </h2>
            <p className="text-gray-500 font-medium text-[15px] sm:text-[16px] leading-relaxed m-0">
              From high-converting Next.js platforms to scalable full-stack
              MERN applications, let us engineer your next flagship product.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0 relative z-10">
            <a
              href="https://github.com/rafay-kh-dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white border border-gray-200 hover:border-gray-300 text-black font-bold text-[14px] transition-all shadow-sm hover:-translate-y-0.5 outline-none"
            >
              <GitHubIcon className="w-4 h-4" />
              All Repositories
            </a>
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#111827] hover:bg-black text-white font-bold text-[14px] transition-all shadow-sm hover:-translate-y-0.5 outline-none"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}