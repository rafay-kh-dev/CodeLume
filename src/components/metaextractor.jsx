import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Globe, Search, AlertCircle, Loader2, Image as ImageIcon, Type, AlignLeft, LayoutTemplate } from "lucide-react";
import { Helmet } from "react-helmet-async";

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
      // Using AllOrigins CORS proxy to fetch HTML content directly from the browser
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch website data.");
      }

      const data = await response.json();
      const html = data.contents;

      // Parse HTML string into a real DOM object
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Extract tags
      const getMeta = (nameAttr, propertyAttr) => {
        let tag;
        if (nameAttr) tag = doc.querySelector(`meta[name="${nameAttr}"]`);
        if (!tag && propertyAttr) tag = doc.querySelector(`meta[property="${propertyAttr}"]`);
        return tag ? tag.getAttribute("content") : "";
      };

      const extractedData = {
        title: doc.querySelector("title")?.innerText || getMeta("title", "og:title"),
        description: getMeta("description", "og:description"),
        ogTitle: getMeta("", "og:title") || doc.querySelector("title")?.innerText,
        ogDescription: getMeta("", "og:description") || getMeta("description", ""),
        ogImage: getMeta("", "og:image"),
        twitterCard: getMeta("twitter:card", ""),
        canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute("href") || targetUrl,
      };

      setMetaData(extractedData);
    } catch (err) {
      setError("Could not extract data. The website might be blocking requests or the URL is invalid.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full min-h-dvh pt-32 pb-24 bg-[#030712] font-jakarta text-white relative">

      {/* Subtle Background Glow - CodeLume Blue */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors font-bold text-sm tracking-wide"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-[12px] font-black text-blue-500 uppercase tracking-[0.2em] m-0">
              Developer Tools
            </h2>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white m-0 tracking-tighter mb-4">
            Meta Tag Extractor
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Enter any URL to instantly extract and preview its SEO meta titles, descriptions, and Open Graph social media cards.
          </p>

          {/* Search Form */}
          <form onSubmit={extractMetaTags} className="relative flex items-center w-full max-w-2xl mx-auto">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-[#0a0f1c] border border-white/10 rounded-2xl py-5 pl-6 pr-32 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors shadow-2xl"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white px-6 rounded-xl font-bold transition-colors flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              Extract
            </button>
          </form>
          {error && (
            <div className="flex items-center justify-center gap-2 text-red-400 text-sm font-bold mt-4 animate-pulse">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {metaData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
            
            {/* Raw Extracted Data */}
            <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col gap-6">
              <h2 className="text-xl font-black text-white m-0 flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-blue-400" /> SEO Meta Data
              </h2>
              
              <div className="space-y-4">
                <div className="bg-[#030712] p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <Type className="w-4 h-4 text-blue-400" /> Title
                  </div>
                  <p className="text-white font-medium m-0">{metaData.title || "No title found"}</p>
                </div>

                <div className="bg-[#030712] p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <AlignLeft className="w-4 h-4 text-blue-400" /> Description
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed m-0">{metaData.description || "No description found"}</p>
                </div>

                <div className="bg-[#030712] p-4 rounded-xl border border-white/5 overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    <Globe className="w-4 h-4 text-blue-400" /> Canonical URL
                  </div>
                  <a href={metaData.canonical} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline text-sm truncate block m-0">
                    {metaData.canonical}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Preview Card */}
            <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-8 shadow-xl flex flex-col gap-6">
              <h2 className="text-xl font-black text-white m-0 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-400" /> Social Media Preview
              </h2>
              
              <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#030712] shadow-lg">
                {/* Image Section */}
                <div className="w-full h-56 bg-slate-800 flex items-center justify-center overflow-hidden border-b border-white/10">
                  {metaData.ogImage ? (
                    <img src={metaData.ogImage} alt="Open Graph" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-sm font-bold">No OG Image Found</span>
                    </div>
                  )}
                </div>
                
                {/* Text Section (Like LinkedIn/Twitter/Facebook Card) */}
                <div className="p-5 bg-[#0a0f1c]">
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1 truncate m-0">
                    {new URL(metaData.canonical || url).hostname}
                  </p>
                  <h3 className="text-white font-bold text-[17px] mb-1 line-clamp-1 m-0 leading-tight">
                    {metaData.ogTitle || metaData.title || "No Title Provided"}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 m-0 leading-relaxed">
                    {metaData.ogDescription || metaData.description || "No description available for this page."}
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