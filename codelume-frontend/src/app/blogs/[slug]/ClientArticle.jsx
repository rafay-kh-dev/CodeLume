"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import DOMPurify from "dompurify";
import { ArrowLeft, Clock } from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://codelume-rb3h.onrender.com";

const cleanPastedHTML = (html) => {
  if (!html) return "";
  let cleaned = html;
  cleaned = cleaned.replace(/<o:p>.*?<\/o:p>/gi, "");
  cleaned = cleaned.replace(/class="Mso[^"]*"/gi, "");
  cleaned = cleaned.replace(/style="([^"]*)"/gi, (match, styles) => {
    const kept = styles
      .split(";")
      .map((s) => s.trim())
      .filter((s) => {
        const lower = s.toLowerCase();
        return (
          lower.startsWith("color:") ||
          lower.startsWith("background") ||
          lower.startsWith("text-align:") ||
          lower.startsWith("font-weight:") ||
          lower.startsWith("font-style:")
        );
      })
      .join("; ");
    return kept ? `style="${kept}"` : "";
  });
  cleaned = cleaned.replace(/<span>\s*<\/span>/gi, "");
  // Word / Docs ka nbsp (\u00A0) - ye normal space nahi hai, browser ispe line-break nahi karta
  // Isliye heading ek hi lambi line ban ke cut ho jati hai. Ise normal space banao.
  cleaned = cleaned.replace(/\u00A0/g, " ");
  // white-space: nowrap / pre bhi wrap rokta hai - ise bhi hatao
  cleaned = cleaned.replace(/white-space\s*:\s*(nowrap|pre)[^;"]*;?/gi, "");
  return cleaned;
};

const autoFormatContent = (html) => {
  if (!html) return "";
  if (/<h[123][\s>]/.test(html)) return html;
  let text = html
    .replace(/\u00A0/g, " ")
    .replace(
      /<a\s+[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi,
      (m, href, txt) =>
        " __LINK_START__" +
        href +
        "__LINK_MID__" +
        txt.replace(/<[^>]+>/g, "").trim() +
        "__LINK_END__ ",
    )
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-4]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return html;
  const esc = (t) =>
    t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // ALL CAPS heading ko Title Case me badlo - professional blogs ALL CAPS nahi use karte
  // "WHY BUSINESSES CHOOSE CODELUME..." -> "Why Businesses Choose CodeLume for Web Development"
  // Lowercase letters patle hote hain, to heading asani se fit hoti hai, aur word toot-ta nahi
  const toTitleCase = (str) => {
    const small = [
      "a",
      "an",
      "and",
      "as",
      "at",
      "but",
      "by",
      "for",
      "in",
      "of",
      "on",
      "or",
      "the",
      "to",
      "with",
    ];
    return str
      .toLowerCase()
      .split(" ")
      .map((w, idx) => {
        if (!w) return w;
        const clean = w.replace(/[^a-z0-9]/g, "");
        if (clean === "codelume") return w.replace(/codelume/i, "CodeLume");
        if (clean === "uk") return w.replace(/uk/i, "UK");
        if (clean === "seo") return w.replace(/seo/i, "SEO");
        if (idx !== 0 && small.includes(clean)) return w;
        return w.charAt(0).toUpperCase() + w.slice(1);
      })
      .join(" ");
  };
  // Links ko wapis <a> me badlo + bare URLs ko bhi blue link banao
  const linkify = (t) => {
    let r = esc(t);
    r = r.replace(
      /__LINK_START__(.*?)__LINK_MID__(.*?)__LINK_END__/g,
      (m, href, txt) =>
        '<a href="' +
        href.replace(/"/g, "") +
        '" target="_blank" rel="noreferrer">' +
        txt +
        "</a>",
    );
    r = r.replace(/(?<!href="|">)(https?:\/\/[^\s<]+)/g, (url) => {
      const clean = url.replace(/[.,)]+$/, "");
      const trail = url.slice(clean.length);
      return (
        '<a href="' +
        clean +
        '" target="_blank" rel="noreferrer">' +
        clean +
        "</a>" +
        trail
      );
    });
    return r;
  };
  let out = "";
  let openCard = false;
  const closeCard = () => {
    if (openCard) {
      out += `</div>`;
      openCard = false;
    }
  };
  lines.forEach((line, i) => {
    const lower = line.toLowerCase();
    const next = lines[i + 1] || "";
    const nextIsPrice = next.toLowerCase().startsWith("price:");
    const isAllCapsHeading =
      line.length >= 10 &&
      line.length <= 90 &&
      line === line.toUpperCase() &&
      !line.includes("£") &&
      !lower.startsWith("price:") &&
      !lower.startsWith("best for:") &&
      !line.endsWith(".") &&
      /[A-Z]/.test(line);
    const numbered = line.match(/^(\d+)\.\s+([A-Z].{5,80})$/);
    const isNumberedHeading =
      numbered && line.length < 85 && !line.slice(3).includes(". ");
    if (isAllCapsHeading) {
      closeCard();
      out += `<h2>${esc(toTitleCase(line))}</h2>`;
      return;
    }
    if (isNumberedHeading) {
      closeCard();
      const isCapsNum = line === line.toUpperCase();
      out += `<h3>${esc(isCapsNum ? toTitleCase(line) : line)}</h3>`;
      return;
    }
    if (nextIsPrice) {
      closeCard();
      const isCapsPrice = line === line.toUpperCase();
      out += `<div class="price-card"><h3>${esc(isCapsPrice ? toTitleCase(line) : line)}</h3>`;
      openCard = true;
      return;
    }
    if (lower.startsWith("price:")) {
      out += `<p class="price-line"><strong>${linkify(line)}</strong></p>`;
      return;
    }
    if (lower.startsWith("best for:")) {
      out += `<p class="best-line">${linkify(line)}</p></div>`;
      openCard = false;
      return;
    }
    closeCard();
    out += `<p>${linkify(line)}</p>`;
  });
  closeCard();
  return out;
};

export default function ClientArticle({ slug, initialBlog = null }) {
  // FIX: initialBlog ko useEffect me setState karke sync mat karo (React 19 error deta hai)
  // Seedha useState ki initial value banao - koi cascading render nahi hoga
  const [fetchedPost, setFetchedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(!initialBlog);
  // post = SSR wala initialBlog ho to wahi, warna fetch wala
  const post = initialBlog || fetchedPost;

  // Sanitized HTML ko render ke waqt derive karo, effect me setState mat karo
  // DOMPurify ko sirf browser me chalao (SSR pe window nahi hota)
  const sanitizedHTML = React.useMemo(() => {
    if (!post) return "";
    if (typeof window === "undefined") return "";
    const cleaned = cleanPastedHTML(post.content || "");
    const formatted = autoFormatContent(cleaned);
    return DOMPurify.sanitize(formatted);
  }, [post]);

  useEffect(() => {
    // Agar SSR data aa gaya hai to fetch ki zaroorat hi nahi
    if (initialBlog) return;
    let cancelled = false;
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/blogs/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (!cancelled) setFetchedPost(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchBlog();
    return () => {
      cancelled = true;
    };
  }, [slug, initialBlog]);

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-white flex items-center justify-center pt-32">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-dvh bg-white flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center">
        <h1 className="text-4xl font-medium text-black m-0">
          Article not found
        </h1>
        <p className="text-gray-500 font-medium m-0 mt-3">
          This article may have been moved or deleted.
        </p>
        <Link
          href="/blogs"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-[14px] font-bold hover:bg-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="w-full max-w-full bg-white font-jakarta pt-28 sm:pt-36 pb-20">
      <style>{`
        .article-content { font-size: 17px; line-height: 1.9; color: #374151; word-wrap: break-word; overflow-wrap: break-word; word-break: normal; white-space: normal; min-width: 0; }
        .article-content * { font-family: inherit !important; max-width: 100%; box-sizing: border-box; }
        .article-content p { white-space: normal !important; text-wrap: pretty; font-size: 17px !important; line-height: 1.9 !important; color: #374151; margin: 0 0 18px; font-weight: 500; overflow-wrap: break-word; word-break: normal; white-space: normal; }
        .article-content h2 { font-size: 26px !important; line-height: 1.35 !important; font-weight: 800 !important; color: #000; margin: 48px 0 18px; letter-spacing: -0.02em; word-break: keep-all !important; overflow-wrap: normal !important; white-space: normal !important; text-wrap: balance; hyphens: none !important; display: block; max-width: 100%; }
        .article-content h3 { font-size: 20px !important; line-height: 1.4 !important; font-weight: 700 !important; color: #000; margin: 32px 0 10px; word-break: keep-all !important; overflow-wrap: normal !important; white-space: normal !important; text-wrap: balance; hyphens: none !important; display: block; max-width: 100%; }
        .article-content h4 { font-size: 18px !important; font-weight: 700 !important; color: #000; margin: 24px 0 10px; }
        .article-content span { font-size: inherit !important; }
        .article-content strong, .article-content b { color: #000; font-weight: 700; }
        .article-content a { color: #4285F4 !important; overflow-wrap: anywhere; word-break: normal; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
        .article-content ul, .article-content ol { margin: 0 0 20px 20px; padding: 0; }
        .article-content li { font-size: 17px !important; line-height: 1.9 !important; color: #374151; margin-bottom: 8px; overflow-wrap: break-word; }
        .article-content li > p { margin: 0; }
        .article-content blockquote { border-left: 4px solid #000; background: #f9fafb; border-radius: 0 12px 12px 0; padding: 16px 20px; margin: 24px 0; color: #6b7280; }
        .article-content blockquote p { margin: 0; color: #6b7280; }
        .article-content img { border-radius: 16px; margin: 24px 0; max-width: 100%; height: auto; display: block; }
        .article-content table { width: 100%; border-collapse: collapse; margin: 24px 0; display: block; overflow-x: auto; }
        .article-content table td, .article-content table th { border: 1px solid #e5e7eb; padding: 12px 14px; font-size: 15px; text-align: left; }
        .article-content table th { background: #f9fafb; font-weight: 700; color: #000; }
        .article-content pre { background: #0f172a; color: #fff; padding: 18px; border-radius: 12px; overflow-x: auto; margin: 24px 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: normal; }
        .article-content code { background: #f3f4f6; padding: 2px 6px; border-radius: 6px; color: #000; font-size: 14px; overflow-wrap: break-word; }
        .article-content pre code { background: transparent; color: #fff; padding: 0; }
        .article-content hr { border: none; border-top: 1px solid #e5e7eb; margin: 32px 0; }
        .price-card { background: #f8f8f8; border: 1px solid #e5e7eb; border-radius: 16px; padding: 18px 20px; margin: 0 0 14px; min-width: 0; }
        .price-card h3 { margin: 0 0 8px !important; }
        .price-card .price-line { margin: 0 0 4px !important; color: #000; }
        .price-card .best-line { margin: 0 !important; color: #6b7280; }
      `}</style>

      <div className="max-w-[1100px] w-full mx-auto px-5 sm:px-10 min-w-0">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-black hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <span className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-[12px] font-bold text-gray-600">
            {post.category}
          </span>
        </div>

        <h1 className="text-[32px] sm:text-[40px] lg:text-[44px] font-medium text-black tracking-tight leading-[1.15] m-0 max-w-[1100px] [word-break:keep-all] [overflow-wrap:normal] [text-wrap:balance]">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-[17px] sm:text-[19px] text-gray-500 font-medium leading-relaxed m-0 mt-5 max-w-[900px]">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 mt-7 pb-7 border-b border-gray-200">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-gray-200">
            <img
              src="/rafay-profile.webp"
              alt="Rafay - CodeLume"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div>
            <p className="text-[14px] font-bold text-black m-0">
              Rafay&apos;s CodeLume
            </p>
            <p className="text-[12px] text-gray-500 font-medium m-0">
              Founder, CodeLume
            </p>
          </div>
          <span className="text-gray-300 mx-1">•</span>
          <span className="text-[13px] font-medium text-gray-500">
            {new Date(post.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-[13px] font-medium text-gray-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
        </div>

        {post.coverImage && (
          <div className="aspect-video bg-gray-100 rounded-[20px] overflow-hidden border border-gray-200 mt-8">
            <img
              src={post.coverImage}
              alt={post.imageAltText || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="max-w-[1100px] mx-auto mt-10 min-w-0 w-full">
          <div
            className="article-content min-w-0 w-full"
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
          />
        </div>
      </div>
    </article>
  );
}
