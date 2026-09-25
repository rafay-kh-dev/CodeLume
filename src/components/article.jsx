import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Loader2, 
  User, 
  Share2, 
  Code2
} from "lucide-react";

// Custom SVG Icons
const TwitterIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const LinkedinIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>);
const FacebookIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);

export default function Article() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://codelume-backend.onrender.com";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(false);
        
        const response = await fetch(`${API_BASE_URL}/api/blogs/${slug}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }
        
        const data = await response.json();
        setPost(data);
        
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [slug, API_BASE_URL]);

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-[#030712] flex flex-col items-center justify-center gap-4 pt-28">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <h2 className="text-slate-400 font-jakarta text-lg m-0">Loading article data...</h2>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-dvh bg-[#030712] flex flex-col items-center justify-center pt-28 font-jakarta">
        <div className="bg-[#0a0f1c] border border-white/10 rounded-3xl p-12 text-center max-w-lg shadow-2xl">
          <h2 className="text-3xl font-black text-white mb-4 m-0">Article Not Found</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            We couldn't find the article you're looking for. It may have been moved, deleted, or the URL might be incorrect.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <article className="min-h-dvh bg-[#030712] text-white font-jakarta pt-28 sm:pt-36 pb-24 relative">
      
      <Helmet>
        <title>{`${post.title} | CodeLume`}</title>
        <meta name="description" content={post.excerpt || "Read this insightful article on CodeLume."} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
      </Helmet>

      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <Link 
          to="/blogs"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" /> 
          Back to all articles
        </Link>

        {/* Flex Container for Article & Sidebar */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Main Article */}
          <div className="w-full lg:w-2/3">
            
            <header className="mb-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
                {post.category || "Uncategorized"}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-8 m-0">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm font-medium border-y border-white/10 py-5">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-500" />
                  <span>{post.author || "Rafay"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>{new Date(post.createdAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{post.readTime || "5 min read"}</span>
                </div>
              </div>
            </header>

            {post.coverImage && (
              <div className="w-full rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl bg-[#0a0f1c]">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-auto max-h-[600px] object-cover"
                />
              </div>
            )}

            <div 
              className="text-lg text-slate-300 leading-[1.8] tracking-wide
                [&>p]:mb-8 
                [&>h1]:text-4xl [&>h1]:font-black [&>h1]:text-white [&>h1]:mt-14 [&>h1]:mb-6
                [&>h2]:text-3xl [&>h2]:font-black [&>h2]:text-white [&>h2]:mt-12 [&>h2]:mb-6
                [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-10 [&>h3]:mb-4
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul>li]:mb-3
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol>li]:mb-3
                [&>a]:text-blue-400 [&>a:hover]:text-blue-300 [&>a]:underline
                [&_strong]:text-white [&_strong]:font-black
                [&_b]:text-white [&_b]:font-black
                [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:my-8 [&>blockquote]:text-slate-400
                [&>img]:rounded-3xl [&>img]:my-10 [&>img]:shadow-2xl [&>img]:w-full [&>img]:object-cover"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar 
              FIX: Applied 'sticky', 'top-32', and 'self-start' directly to the aside tag. */}
          <aside className="w-full lg:w-1/3 lg:sticky lg:top-32 self-start space-y-8">
              
              <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                  <Code2 className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-xl font-black text-white mb-2 m-0">About the Author</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Hi, I'm Rafay. A bespoke freelance web developer and UI/UX designer. I help ambitious brands scale by engineering high-performance digital platforms and driving targeted SEO traffic.
                </p>
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-2 text-[14px] font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Read full bio <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>

              <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-8 shadow-xl">
                <h2 className="text-[13px] font-black text-slate-500 uppercase tracking-widest mb-6 m-0 flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Share this article
                </h2>
                <div className="flex gap-4">
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank" rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white text-slate-400 transition-all duration-300"
                  >
                    <TwitterIcon className="w-5 h-5" />
                  </a>
                  <a 
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank" rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white text-slate-400 transition-all duration-300"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank" rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white text-slate-400 transition-all duration-300"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="bg-linear-to-br from-blue-900/40 to-[#0a0f1c] border border-blue-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                <h2 className="text-xl font-black text-white mb-3 m-0">Need a Website?</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Stop losing clients to slow, outdated websites. Let's build a bespoke digital solution tailored exactly to your business logic.
                </p>
                <Link
                  to="/start-project"
                  className="flex items-center justify-center w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors shadow-lg text-[15px]"
                >
                  Start a Project
                </Link>
              </div>

          </aside>

        </div>
      </div>
    </article>
  );
}