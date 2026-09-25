import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Clock, Loader2, User } from "lucide-react";

export default function Article() {
  const { slug } = useParams(); // Grabs the exact slug from the URL
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Use your live Render backend URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://codelume-backend.onrender.com";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(false);
        
        // Fetch the specific article by its slug
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
    // Scroll to top when the article loads
    window.scrollTo(0, 0);
  }, [slug, API_BASE_URL]);

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-dvh bg-[#030712] flex flex-col items-center justify-center gap-4 pt-28">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <h2 className="text-slate-400 font-jakarta text-lg">Loading article data...</h2>
      </div>
    );
  }

  // 2. Error / Not Found State
  if (error || !post) {
    return (
      <div className="min-h-dvh bg-[#030712] flex flex-col items-center justify-center pt-28 font-jakarta">
        <div className="bg-[#0a0f1c] border border-white/10 rounded-3xl p-12 text-center max-w-lg shadow-2xl">
          <h2 className="text-3xl font-black text-white mb-4">Article Not Found</h2>
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

  // 3. Success State (Render the Article)
  return (
    <article className="min-h-dvh bg-[#030712] text-white font-jakarta pt-28 sm:pt-36 pb-24 overflow-hidden relative">
      
      {/* Dynamic SEO Tags for this specific article */}
      <Helmet>
        <title>{`${post.title} | CodeLume`}</title>
        <meta name="description" content={post.excerpt || "Read this insightful article on CodeLume."} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
      </Helmet>

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        
        {/* Back Button */}
        <Link 
          to="/blogs"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 font-bold mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" /> 
          Back to all articles
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
            {post.category || "Uncategorized"}
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-8">
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

        {/* Cover Image */}
        {post.coverImage && (
          <div className="w-full aspect-video sm:aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl bg-[#0a0f1c]">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Bottom CTA / Share Section */}
        <div className="mt-20 pt-10 border-t border-white/10 text-center">
          <h2 className="text-2xl font-black text-white mb-6">Did you find this helpful?</h2>
          <Link
            to="/start-project"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            Start your own project today
          </Link>
        </div>

      </div>
    </article>
  );
}