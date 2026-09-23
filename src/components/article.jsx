import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // 🚀 URL SLUG READER
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ArrowLeft, Calendar, Clock, Share2, Tag, Target } from "lucide-react";

export default function Article({ posts }) {
  // 🚀 BROWSER URL SE SLUG MATCH KARNA
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = post.metaTitle || post.title;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = post.metaDescription || post.excerpt;
    }
    return () => {
      document.title = "CodeLume | Highly Optimised Web Solutions";
    };
  }, [post]);

  // Agar ghalat URL dal jaye tou error page
  if (!post)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-32 text-center">
        <h2 className="text-3xl font-bold text-white mb-4 m-0">
          Article Not Found
        </h2>
        <Link to="/" className="text-blue-400 hover:text-blue-300 underline">
          Return to Homepage
        </Link>
      </div>
    );

  return (
    <section className="relative w-full min-h-dvh py-24 bg-[#030712] font-jakarta overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[30rem] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.1)_0%,transparent_70%)] pointer-events-none transform-gpu translate-z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* 🚀 FIXED: Back button is now an actual Link */}
        <Link
          to="/"
          className="w-fit flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors duration-300 backdrop-blur-md outline-none group mb-12 border border-white/5"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <h2 className="text-[13px] font-bold tracking-wide m-0">
            Back to Insights
          </h2>
        </Link>

        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 text-[12px] font-bold uppercase tracking-widest mb-6">
            <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
              {post.category}
            </span>
            {post.focusKeyword && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                <Target className="w-3.5 h-3.5" /> {post.focusKeyword}
              </span>
            )}
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-8 drop-shadow-lg m-0">
            {post.title}
          </h2>

          <div className="flex items-center justify-between border-y border-white/5 py-4 mb-10">
            <div className="flex items-center gap-4 sm:gap-6 text-[13px] font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors outline-none">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {post.image && (
            <div className="w-full h-64 sm:h-96 lg:h-[30rem] rounded-4xl overflow-hidden relative mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#030712] via-transparent to-transparent pointer-events-none" />
            </div>
          )}
        </div>

        <div className="w-full rounded-4xl bg-[#0a0f1c]/70 backdrop-blur-xl border border-white/5 p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transform-gpu">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl sm:text-3xl font-extrabold text-white mt-12 mb-6 tracking-tight m-0"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h2
                  className="text-xl sm:text-2xl font-bold text-slate-200 mt-10 mb-4 m-0"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-[15px] sm:text-[17px] text-slate-400 leading-relaxed mb-6 m-0"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside text-slate-400 space-y-2 mb-6 ml-4 marker:text-blue-500"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-inside text-slate-400 space-y-2 mb-6 ml-4 marker:text-blue-500"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li
                  className="text-[15px] sm:text-[17px] leading-relaxed"
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-bold text-slate-200" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 underline-offset-4 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-blue-500 bg-blue-500/5 px-6 py-4 rounded-r-2xl my-8 italic text-slate-300"
                  {...props}
                />
              ),
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <div className="rounded-2xl overflow-hidden my-8 border border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
                    <div className="bg-[#0d1117] px-4 py-2 border-b border-white/5 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 text-[11px] font-mono text-slate-500 uppercase">
                        {match[1]}
                      </span>
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        background: "#0a0d14",
                        fontSize: "14px",
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code
                    className="bg-white/10 text-blue-300 px-2 py-0.5 rounded-md text-[14px] font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.markdownContent}
          </ReactMarkdown>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-slate-500" />
                <h2 className="text-[13px] font-bold text-slate-300 uppercase tracking-widest m-0">
                  Related Tags
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-[13px] font-medium text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
