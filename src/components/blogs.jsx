import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Sparkles, Loader2 } from "lucide-react";

export default function Blogs() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Yahan aapke asli WordPress ki API link aayegi
    // ?_embed lagane se featured image ka data bhi sath aa jata hai
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://api.yourwebsite.com/wp-json/wp/v2/posts?_embed");
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-dvh bg-[#030712] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <section className="w-full min-h-dvh pt-32 sm:pt-40 pb-24 bg-[#030712] font-jakarta relative overflow-hidden">
      {/* ... baki sara same UI code jo humne pehle banaya tha ... */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {blogPosts.map((post) => {
          // WordPress se image aur text nikalne ka tareeqa thora mukhtalif hota hai
          const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || "default-image.jpg";
          
          return (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="flex flex-col group outline-none rounded-3xl bg-[#070b14] border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#3b82f6]/30 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.15)]"
            >
              <div className="relative w-full aspect-video overflow-hidden bg-[#0a0f1c]">
                <img 
                  src={featuredImage} 
                  alt={post.title.rendered}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col p-6 sm:p-8 grow relative">
                {/* WordPress title render karne ke liye dangerouslySetInnerHTML zaroori hota hai */}
                <h2 
                  className="text-xl sm:text-2xl font-black text-white m-0 tracking-tight leading-snug mb-4 relative z-10 group-hover:text-[#3b82f6] transition-colors duration-300 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                <div 
                  className="text-[15px] font-medium text-slate-400 leading-relaxed m-0 mb-8 line-clamp-3 relative z-10"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />

                <div className="mt-auto relative z-10">
                  <div className="flex items-center gap-2 text-[#3b82f6] font-black text-[15px] tracking-wide uppercase group/btn w-fit">
                    <h2 className="m-0 text-inherit inline">Read Article</h2>
                    <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}