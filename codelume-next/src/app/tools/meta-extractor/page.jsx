"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Globe,
  Search,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Type,
  AlignLeft,
  LayoutTemplate,
} from "lucide-react";

// Scroll-Triggered Typewriter Effect for Heading with Custom Alignment Support
const TypewriterHeading = ({ text, align = "text-center" }) => {
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

    let typingInterval;
    let i = 0;

    const startTimeout = setTimeout(() => {
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
  }, [hasStarted, text]);

  const lines = displayedText.split("\n");
  const fullLines = text.split("\n");

  const alignmentClass =
    align === "text-right"
      ? "justify-end"
      : align === "text-left"
        ? "justify-start"
        : "justify-center";
  const headingClasses = `text-4xl sm:text-5xl lg:text-[4rem] font-medium tracking-tight text-black leading-[1.05] select-none cursor-default w-full m-0 ${align}`;

  return (
    <div
      ref={headingRef}
      className={`min-h-[100px] sm:min-h-[140px] lg:min-h-[150px] flex items-center ${alignmentClass} w-full relative`}
    >
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

export default function MetaExtractor() {
  const [url, setUrl] = useState("");
  const [metaData, setMetaData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const extractMetaTags = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    setIsLoading(true);
    setError(null);
    setMetaData(null);

    try {
      // PRO LEVEL: Using Microlink API to bypass Cloudflare & bot protections
      const response = await fetch(
        `https://api.microlink.io?url=${encodeURIComponent(targetUrl)}`,
      );

      if (!response.ok) {
        throw new Error("API request failed.");
      }

      const json = await response.json();

      if (json.status !== "success") {
        throw new Error("Could not extract data from this URL.");
      }

      // Map the clean JSON response to our state
      const extractedData = {
        title: json.data.title || "",
        description: json.data.description || "",
        ogTitle: json.data.title || "",
        ogDescription: json.data.description || "",
        ogImage: json.data.image?.url || json.data.logo?.url || "",
        canonical: json.data.url || targetUrl,
      };

      setMetaData(extractedData);
    } catch (err) {
      setError(
        "Data extraction failed! The website might have strict protection or the URL is invalid.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen pt-24 sm:pt-32 pb-24 bg-white font-jakarta text-black relative overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Subtle Top Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Split Layout: Left Button, Right Content */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 max-w-full gap-8">
          <div className="flex-shrink-0">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold text-[13px] tracking-wide bg-gray-50 hover:bg-gray-100 px-5 py-2.5 rounded-full border border-gray-200 outline-none active:scale-[0.98]"
            >
              <ArrowLeft size={16} /> Back to Tools
            </Link>
          </div>

          <div className="flex flex-col items-end text-right max-w-xl ml-auto">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 shadow-sm mb-6">
              {/* Using Google Purple (#A142F4) for Meta Extractor Tool */}
              <Globe className="w-4 h-4 text-[#A142F4]" />
              <h2 className="text-[11px] sm:text-[12px] font-extrabold text-gray-500 uppercase tracking-[0.2em] m-0">
                Developer Tools
              </h2>
            </div>

            <TypewriterHeading
              text={"Meta Tag\nExtractor"}
              align="text-right"
            />

            <p className="text-gray-500 text-[15px] sm:text-[17px] leading-relaxed max-w-lg font-medium m-0 mt-2">
              Enter any URL to instantly extract and preview its SEO meta
              titles, descriptions, and Open Graph social media cards.
            </p>
          </div>
        </div>

        {/* Main Search Section */}
        <div className="w-full max-w-3xl mx-auto mb-16">
          <form
            onSubmit={extractMetaTags}
            className="relative flex items-center w-full"
          >
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. apple.com or medium.com"
              className={`w-full bg-white border rounded-full py-5 sm:py-6 pl-8 pr-36 sm:pr-40 text-black text-[15px] sm:text-[16px] font-medium placeholder-gray-400 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg ${
                error
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  : "border-gray-200 focus:border-[#A142F4] focus:ring-4 focus:ring-[#A142F4]/10"
              }`}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2.5 top-2.5 bottom-2.5 bg-[#A142F4] hover:bg-[#8e36d9] disabled:bg-[#A142F4]/60 text-white px-6 sm:px-8 rounded-full font-bold transition-all flex items-center gap-2 outline-none active:scale-[0.96]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span className="hidden sm:inline">Extract</span>
            </button>
          </form>
          {error && (
            <div className="flex items-center justify-center gap-2 text-red-500 text-[13px] font-bold mt-5 animate-pulse bg-red-50 px-4 py-2 rounded-full border border-red-100 max-w-max mx-auto">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {metaData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
            {/* Meta Data Card */}
            <div className="bg-white border border-gray-200 rounded-[32px] p-8 sm:p-10 shadow-sm flex flex-col gap-6">
              <h2 className="text-xl font-bold text-black m-0 flex items-center gap-2 border-b border-gray-100 pb-4">
                <LayoutTemplate className="w-5 h-5 text-[#A142F4]" /> SEO Meta
                Data
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-50 p-5 rounded-[20px] border border-gray-100">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <Type className="w-4 h-4 text-[#A142F4]" /> Title
                  </div>
                  <p className="text-black font-semibold m-0 leading-relaxed text-[15px]">
                    {metaData.title || "No title found"}
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-[20px] border border-gray-100">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <AlignLeft className="w-4 h-4 text-[#A142F4]" /> Description
                  </div>
                  <p className="text-gray-600 text-[14px] leading-relaxed m-0 font-medium">
                    {metaData.description || "No description found"}
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-[20px] border border-gray-100 overflow-hidden">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    <Globe className="w-4 h-4 text-[#A142F4]" /> Canonical URL
                  </div>
                  <a
                    href={metaData.canonical}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#A142F4] hover:text-[#8e36d9] hover:underline text-[14px] font-medium truncate block m-0"
                  >
                    {metaData.canonical}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Preview Card */}
            <div className="bg-white border border-gray-200 rounded-[32px] p-8 sm:p-10 shadow-sm flex flex-col gap-6">
              <h2 className="text-xl font-bold text-black m-0 flex items-center gap-2 border-b border-gray-100 pb-4">
                <ImageIcon className="w-5 h-5 text-[#A142F4]" /> Social Media
                Preview
              </h2>

              <div className="w-full rounded-[24px] overflow-hidden border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-full h-48 sm:h-56 bg-gray-100 flex items-center justify-center overflow-hidden border-b border-gray-200 relative">
                  {metaData.ogImage ? (
                    <img
                      src={metaData.ogImage}
                      alt="Open Graph"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <ImageIcon className="w-10 h-10" strokeWidth={1.5} />
                      <span className="text-sm font-semibold tracking-wide">
                        No Image Found
                      </span>
                    </div>
                  )}
                  {/* Subtle inner shadow for image */}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none" />
                </div>

                <div className="p-6 bg-white">
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-2 truncate m-0">
                    {new URL(metaData.canonical || url).hostname}
                  </p>
                  <h3 className="text-black font-bold text-[18px] mb-2 line-clamp-1 m-0 leading-tight">
                    {metaData.ogTitle || metaData.title || "No Title Provided"}
                  </h3>
                  <p className="text-gray-500 text-[14px] font-medium line-clamp-2 m-0 leading-relaxed">
                    {metaData.ogDescription ||
                      metaData.description ||
                      "No description available for this page."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
