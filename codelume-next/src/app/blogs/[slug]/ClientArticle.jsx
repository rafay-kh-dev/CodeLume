"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import DOMPurify from "dompurify";
import { ArrowLeft, Clock, Share2, Code2 } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://codelume-backend.onrender.com";

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
);
const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
);
const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
);

export default function ClientArticle({ slug }) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sanitizedHTML, setSanitizedHTML] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/blogs/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPost(data);
        setSanitizedHTML(DOMPurify.sanitize(data.content || ""));
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

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
        <h1 className="text-4xl font-medium text-black m-0">Article not found</h1>
        <p className="text-gray-500 font-medium m-0 mt-3">This article may have been moved or deleted.</p>
        <Link href="/blogs" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-[14px] font-bold hover:bg-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    );
  }

  const shareUrl = `https://www.codelume.online/blogs/${slug}`;

  return (
    <article className="w-full bg-white font-jakarta pt-28 sm:pt-36 pb-20">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10">
        {/* Back + Category */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-[13px] font-bold text-black hover:text-gray-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <span className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-[12px] font-bold text-gray-600">{post.category}</span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-medium text-black tracking-tight leading-[1.1] m-0 max-w-4xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-[17px] sm:text-[19px] text-gray-500 font-medium leading-relaxed m-0 mt-5 max-w-3xl">{post.excerpt}</p>
        )}

        {/* Meta - Author, Date, ReadTime */}
        <div className="flex flex-wrap items-center gap-3 mt-7 pb-7 border-b border-gray-200">
          <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-[15px]">R</span>
          <div>
            <p className="text-[14px] font-bold text-black m-0">Rafay</p>
            <p className="text-[12px] text-gray-500 font-medium m-0">Founder, CodeLume</p>
          </div>
          <span className="text-gray-300 mx-1">•</span>
          <span className="text-[13px] font-medium text-gray-500">
            {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-[13px] font-medium text-gray-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="aspect-[16/9] bg-gray-100 rounded-[20px] overflow-hidden border border-gray-200 mt-8">
            <img src={post.coverImage} alt={post.imageAltText || post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content + Sidebar - Light theme, same structure as before */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 mt-10">
          {/* Article Content - Light */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:font-medium prose-a:text-[#4285F4] prose-a:font-semibold prose-strong:text-black prose-img:rounded-[16px] prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-gray-50 prose-blockquote:rounded-r-xl prose-blockquote:px-6 prose-blockquote:py-4 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-black prose-pre:bg-gray-900 prose-pre:text-white"
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
          />

          {/* Sidebar - Light, same 3 boxes as before */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-28 self-start">
            <div className="bg-gray-50 border border-gray-200 rounded-[20px] p-6">
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-4"><Code2 className="w-6 h-6 text-white" /></div>
              <h2 className="text-[18px] font-bold text-black mb-2 m-0">About the Author</h2>
              <p className="text-gray-500 text-[13.5px] leading-relaxed m-0 mb-4">Hi, I&apos;m Rafay. A bespoke freelance web developer and UI/UX designer. I help ambitious brands scale by engineering high-performance digital platforms and driving targeted SEO traffic.</p>
              <Link href="/about" className="inline-flex items-center gap-2 text-[13.5px] font-bold text-black hover:text-gray-600 transition-colors">Read full bio <ArrowLeft className="w-4 h-4 rotate-180" /></Link>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-[20px] p-6">
              <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-4 m-0 flex items-center gap-2"><Share2 className="w-4 h-4" /> Share this article</h2>
              <div className="flex gap-3">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white text-black transition-colors"><TwitterIcon className="w-4 h-4" /></a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white text-black transition-colors"><LinkedinIcon className="w-4 h-4" /></a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#1877F2] hover:text-white text-black transition-colors"><FacebookIcon className="w-4 h-4" /></a>
              </div>
            </div>
            <div className="bg-black rounded-[20px] p-6">
              <h2 className="text-[18px] font-bold text-white mb-2 m-0">Need a Website?</h2>
              <p className="text-gray-400 text-[13.5px] leading-relaxed m-0 mb-5">Stop losing clients to slow, outdated websites. Let&apos;s build a bespoke digital solution tailored exactly to your business logic.</p>
              <Link href="/start-project" className="flex items-center justify-center w-full py-3 rounded-full bg-white hover:bg-gray-100 text-black font-bold transition-colors text-[14px]">Start a Project</Link>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
