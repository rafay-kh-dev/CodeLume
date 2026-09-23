import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Loader2, 
  Mail, 
  Share2, 
  Link2,
  Newspaper
} from "lucide-react";

export default function Article() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]); // 🚀 NEW: State for sidebar posts
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Fetch current article
    const fetchSinglePost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${slug}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error("Article not found.");
          throw new Error("Failed to load article.");
        }
        
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching single blog:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // 2. Fetch latest posts for sidebar
    const fetchLatestPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs`);
        if (response.ok) {
          const allPosts = await response.json();
          // Filter out the current post being read, and take the top 3
          const filteredLatest = allPosts.filter(p => p.slug !== slug).slice(0, 3);
          setLatestPosts(filteredLatest);
        }
      } catch (err) {
        console.error("Error fetching latest blogs:", err);
      }
    };

    fetchSinglePost();
    fetchLatestPosts();
  }, [slug]); // When slug changes (user clicks a sidebar link), it refetches

  if (isLoading) {
    return (
      <div className="w-full min-h-dvh bg-[#030712] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#3b82f6] animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="w-full min-h-dvh pt-40 bg-[#030712] flex flex-col items-center text-center px-4 font-jakarta">
        <h2 className="text-4xl font-black text-white mb-6 m-0 tracking-tighter">{error || "Article not found"}</h2>
        <Link to="/blogs" className="flex items-center gap-2 text-[#3b82f6] font-bold hover:text-white transition-colors outline-none cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
          <h2 className="m-0 inline text-inherit">Back to Blogs</h2>
        </Link>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <article className="w-full min-h-dvh pt-28 sm:pt-36 pb-24 bg-[#030712] font-jakarta relative">
      
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          
          .blog-content h2, .blog-content h3 { font-weight: 900; color: white; margin-top: 2.5rem; margin-bottom: 1.25rem; letter-spacing: -0.02em; }
          .blog-content h2 { font-size: 2.25rem; line-height: 1.2; }
          .blog-content h3 { font-size: 1.75rem; line-height: 1.3; }
          .blog-content p { color: #cbd5e1; font-size: 1.15rem; line-height: 1.8; margin-bottom: 1.5rem; font-weight: 500; }
          .blog-content a { color: #3b82f6; text-decoration: underline; text-underline-offset: 4px; font-weight: 600; }
          .blog-content blockquote { border-left: 4px solid #3b82f6; background: rgba(59, 130, 246, 0.05); padding: 1.5rem; border-radius: 0 1rem 1rem 0; color: #e2e8f0; font-style: italic; margin-bottom: 1.5rem; }
          .blog-content ul, .blog-content ol { color: #cbd5e1; margin-bottom: 1.5rem; padding-left: 1.5rem; font-size: 1.15rem; line-height: 1.8; font-weight: 500; }
          .blog-content ul { list-style-type: disc; }
          .blog-content ol { list-style-type: decimal; }
          .blog-content li { margin-bottom: 0.5rem; }
          .blog-content pre, .blog-content code { background: #0a0f1c; color: #3b82f6; padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-size: 0.9em; border: 1px solid rgba(255,255,255,0.05); }
          .blog-content pre { padding: 1.5rem; overflow-x: auto; margin-bottom: 1.5rem; border-radius: 1rem; }
          
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #030712; }
          ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
          ::-webkit-scrollbar-thumb:hover { background: #2563eb; }
        `}
      </style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#3b82f6]/5 rounded-full blur-[150px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Main Article Content */}
          <div className="lg:col-span-8 flex flex-col">
            
            <Link 
              to="/blogs" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 group outline-none font-bold text-[14px] cursor-pointer w-fit"
            >
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              Back to Blogs
            </Link>

            <div className="flex flex-col gap-6 mb-12">
              <div className="flex flex-wrap items-center gap-4">
                <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[12px] font-black text-[#3b82f6] tracking-wider uppercase shadow-sm">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-slate-400 text-[13px] font-semibold">
                  <Calendar className="w-4 h-4 text-[#3b82f6]" />
                  {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5 text-slate-400 text-[13px] font-semibold">
                  <Clock className="w-4 h-4 text-[#3b82f6]" />
                  {post.readTime}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white m-0 tracking-tighter leading-[1.1]">
                {post.title}
              </h1>
            </div>

            <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 bg-[#0a0f1c] border border-white/5 relative shadow-2xl">
              <div className="absolute inset-0 bg-[#3b82f6]/10 mix-blend-overlay pointer-events-none" />
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div 
              className="blog-content w-full max-w-none mb-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-32">
            
            {/* 1. Share Widget */}
            <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 shadow-xl">
              <h2 className="text-[14px] font-black text-white uppercase tracking-wider mb-5 flex items-center gap-2 m-0">
                <Share2 className="w-4 h-4 text-blue-500" /> Share Article
              </h2>
              <div className="flex items-center gap-3">
                <button 
                  className="w-11 h-11 rounded-full bg-[#030712] border border-white/5 flex items-center justify-center text-slate-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-colors cursor-pointer outline-none"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${post.title}&url=${window.location.href}`)}
                  title="Share on Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button 
                  className="w-11 h-11 rounded-full bg-[#030712] border border-white/5 flex items-center justify-center text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-colors cursor-pointer outline-none"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`)}
                  title="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </button>
                <button 
                  className="w-11 h-11 rounded-full bg-[#030712] border border-white/5 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-colors cursor-pointer outline-none"
                  onClick={copyToClipboard}
                  title="Copy Link"
                >
                  <Link2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 🚀 NEW 2. Latest Articles Widget */}
            {latestPosts.length > 0 && (
              <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 shadow-xl">
                <h2 className="text-[14px] font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2 m-0">
                  <Newspaper className="w-4 h-4 text-blue-500" /> Latest Articles
                </h2>
                <div className="flex flex-col gap-5">
                  {latestPosts.map((latestPost) => (
                    <Link
                      key={latestPost._id}
                      to={`/blogs/${latestPost.slug}`}
                      className="group flex gap-4 items-center outline-none cursor-pointer"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-[#030712] overflow-hidden shrink-0 border border-white/5 relative shadow-inner">
                        <div className="absolute inset-0 bg-[#3b82f6]/10 mix-blend-overlay group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                        <img 
                          src={latestPost.coverImage} 
                          alt={latestPost.title} 
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 flex-1">
                        <h3 className="text-[14px] font-bold text-white leading-snug group-hover:text-blue-400 transition-colors m-0 line-clamp-2">
                          {latestPost.title}
                        </h3>
                        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(latestPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Newsletter CTA Widget */}
            <div className="bg-linear-to-br from-[#0a0f1c] to-[#030712] border border-blue-500/20 rounded-[2rem] p-6 shadow-[0_0_30px_rgba(37,99,235,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              <h2 className="text-[14px] font-black text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2 m-0 relative z-10">
                <Mail className="w-4 h-4" /> Enjoying the read?
              </h2>
              <h2 className="text-2xl font-black text-white mb-2 leading-tight m-0 relative z-10">
                Subscribe for more.
              </h2>
              <h2 className="text-[13px] text-slate-400 mb-6 font-medium m-0 relative z-10">
                Get our latest articles and technical insights delivered directly to your inbox.
              </h2>
              <div className="flex flex-col gap-3 relative z-10">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#030712]/80 border border-white/10 rounded-xl py-3.5 px-4 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 outline-none cursor-pointer">
                  Subscribe Now
                </button>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </article>
  );
}