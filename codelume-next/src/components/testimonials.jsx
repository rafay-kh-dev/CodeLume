"use client";
import React, { useState, useEffect, useRef } from "react";
import { Star, Quote, ShieldCheck, Globe2, Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import {
  Trustpilot,
  Upwork,
  Google,
  G2,
  Yelp,
  Tripadvisor,
} from "@thesvg/react";

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
  }, [text, hasStarted]);

  const lines = displayedText.split('\n');

  return (
    <div ref={headingRef} className="min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] flex items-start justify-start mb-6 w-full">
      <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-medium text-black tracking-tight leading-[1.1] m-0 w-full text-left">
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            <span className={idx === 1 ? "text-gray-400" : ""}>{line}</span>
            {idx !== lines.length - 1 && <br className="hidden sm:block" />}
          </React.Fragment>
        ))}
        <span 
          className="inline-block w-[3px] h-[0.8em] ml-1.5 animate-[pulse_1s_ease-in-out_infinite] align-middle translate-y-[-4px] rounded-full"
          style={{ background: 'linear-gradient(to bottom, #4285F4, #34A853, #FBBC05, #EA4335)' }}
        ></span>
      </h2>
    </div>
  );
};

export default function EnterpriseReviews() {
  const reviews = [
    {
      id: 1,
      platform: "trustpilot",
      name: "Sarah Auburn",
      role: "CTO, Aura Financial",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content:
        "CodeLume engineered a massive, highly optimised data pipeline for our platform. The latency is practically zero, providing a flawless experience for our users. Their architectural decisions were brilliant.",
      rating: 5,
    },
    {
      id: 2,
      platform: "google",
      name: "Marcus Thorne",
      role: "E-Commerce Director",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content:
        "The bespoke storefront exceeded all our expectations. With their specialised frontend architecture, our conversion rates maximised immediately after launch.",
      rating: 5,
    },
    {
      id: 3,
      platform: "g2",
      name: "Elena Rodriguez",
      role: "VP of Operations",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      content:
        "Migrating our legacy ERP was completely seamless. They delivered fully customised cloud solutions that instantly scaled our global operations without a single minute of downtime.",
      rating: 5,
    },
    {
      id: 4,
      platform: "upwork",
      name: "David Vance",
      role: "Head of Product",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      content:
        "Remarkable speed and flawless code quality. CodeLume delivered our entire MVP weeks ahead of schedule, fully optimised for global distribution.",
      rating: 5,
    },
    {
      id: 5,
      platform: "yelp",
      name: "Liam Davies",
      role: "Founder, Outback Tech",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      content:
        "We needed a highly specialised local partner to revamp our digital presence. Their attention to detail and robust architecture completely revitalised our business.",
      rating: 5,
    },
    {
      id: 6,
      platform: "google",
      name: "Chloe Smith",
      role: "Marketing Head",
      avatar: "https://randomuser.me/api/portraits/women/31.jpg",
      content:
        "The technical SEO improvements were outstanding. By implementing server-side rendering and fixing our core web vitals, our organic traffic doubled within two months of launch.",
      rating: 5,
    },
    {
      id: 7,
      platform: "tripadvisor",
      name: "Noah Mitchell",
      role: "CEO, Horizon Travel",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      content:
        "Our travel booking platform's performance skyrocketed. The customised search architecture they built handles thousands of concurrent queries without breaking a sweat. Truly enterprise-grade work.",
      rating: 5,
    },
    {
      id: 8,
      platform: "trustpilot",
      name: "Mia Campbell",
      role: "Lead Designer",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
      content:
        "Finally, engineers who understand pixel-perfect execution. The responsive layouts are pristine, and the site performs flawlessly on every device.",
      rating: 5,
    },
    {
      id: 9,
      platform: "g2",
      name: "Oliver Brown",
      role: "Tech Lead, Vertex SaaS",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      content:
        "Decoupling our frontend was the best decision we made. The React implementation is blazing fast and incredibly scalable for our enterprise clients.",
      rating: 5,
    },
  ];

  const [isExpanded, setIsExpanded] = useState(false);

  const getPlatformIcon = (type) => {
    switch (type) {
      case "trustpilot":
        return <Trustpilot variant="mono" className="w-5 h-5 text-[#00b67a] fill-[#00b67a]" />;
      case "google":
        return <Google className="w-5 h-5" />;
      case "g2":
        return <G2 className="w-5 h-5" />;
      case "upwork":
        return <Upwork className="w-5 h-5" />;
      case "yelp":
        return <Yelp className="w-5 h-5" />;
      case "tripadvisor":
        return <Tripadvisor className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const brandColors = [
    "group-hover:border-t-[#4285F4]", 
    "group-hover:border-t-[#34A853]", 
    "group-hover:border-t-[#FBBC05]", 
    "group-hover:border-t-[#EA4335]", 
  ];

  return (
    <section
      className="w-full py-24 sm:py-32 bg-gray-50 font-jakarta border-t border-gray-200 overflow-x-clip"
      id="reviews-section"
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          
          .masonry-grid {
            column-count: 1;
            column-gap: 1.5rem;
          }
          @media (min-width: 768px) { .masonry-grid { column-count: 2; } }
          @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
          
          .masonry-item {
            break-inside: avoid;
            margin-bottom: 1.5rem;
          }
        `}
      </style>

      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header Section with Metrics */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-end justify-between mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              {/* LOKISO: Mmala wa aekhone o fetotswe ho tshwana le wa mongolo (text-gray-500) */}
              <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
              <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] m-0">
                Client Reputation
              </h2>
            </div>
            
            <TypewriterHeading text={"Engineered for Trust.\nProven by Results."} />
            
            <p className="text-[15px] sm:text-[16px] text-gray-500 font-medium leading-relaxed m-0">
              We don't just write code; we build scalable partnerships. Read authentic feedback from global tech leaders, CTOs, and founders who trust our architecture.
            </p>
          </div>

          {/* Quick Stats Blocks - LOKISO: Sebopeho sa mabokose se entswe hore se lekane hantle */}
          <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-5 shrink-0 w-full lg:w-auto">
            
            <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm flex-1 sm:flex-none sm:w-[155px] flex flex-col justify-center">
              <div className="h-6 flex items-center mb-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <h2 className="text-[32px] font-bold text-black tracking-tight leading-none m-0 mb-1.5">4.9</h2>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide m-0">Average Rating</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm flex-1 sm:flex-none sm:w-[155px] flex flex-col justify-center">
              <div className="h-6 flex items-center mb-3">
                <Globe2 className="w-6 h-6 text-[#34A853]" />
              </div>
              <h2 className="text-[32px] font-bold text-black tracking-tight leading-none m-0 mb-1.5">12+</h2>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide m-0">Countries Served</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm flex-1 sm:flex-none sm:w-[155px] hidden sm:flex flex-col justify-center">
              <div className="h-6 flex items-center mb-3">
                <Briefcase className="w-6 h-6 text-[#FBBC05]" />
              </div>
              <h2 className="text-[32px] font-bold text-black tracking-tight leading-none m-0 mb-1.5">150+</h2>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide m-0">Projects Shipped</p>
            </div>

          </div>
        </div>

        {/* CSS Height Animation Wrapper */}
        <div className="relative">
          <div 
            className={`overflow-hidden transition-[max-height] duration-1000 ease-in-out ${
              isExpanded ? "max-h-[5000px]" : "max-h-[850px] md:max-h-[750px] lg:max-h-[800px]"
            }`}
          >
            <div className="masonry-grid relative z-10">
              {reviews.map((review, index) => {
                const topBorderHover = brandColors[index % brandColors.length];
                return (
                  <div
                    key={review.id}
                    className={`masonry-item group relative bg-white border-t-4 border-transparent border-l border-r border-b border-l-gray-200 border-r-gray-200 border-b-gray-200 rounded-[24px] p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] overflow-hidden cursor-default ${topBorderHover}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-100"
                        />
                        <div>
                          <h2 className="text-[15px] font-bold text-black m-0 tracking-tight">
                            {review.name}
                          </h2>
                          <h2 className="text-[13px] text-gray-500 font-medium m-0 mt-0.5">
                            {review.role}
                          </h2>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        {getPlatformIcon(review.platform)}
                      </div>
                    </div>

                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-100 transform -scale-x-100 -z-10 group-hover:text-blue-50 transition-colors duration-300" />
                      <p className="text-[15px] text-gray-700 font-medium leading-relaxed m-0 relative z-10">
                        "{review.content}"
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest m-0">
                        Verified Client
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div 
            className={`absolute bottom-0 left-0 w-full h-[250px] bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent pointer-events-none z-20 flex items-end justify-center pb-4 transition-opacity duration-700 ease-in-out ${
              isExpanded ? "opacity-0" : "opacity-100"
            }`} 
          />
        </div>

        <div className="w-full flex justify-center mt-4 relative z-30">
           <button 
             onClick={() => setIsExpanded(!isExpanded)}
             className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white border border-gray-200 text-[14px] font-bold text-black shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 outline-none active:scale-[0.98]"
           >
             {isExpanded ? 'View Less' : 'Load More Reviews'}
             <ChevronDown 
               className={`w-4 h-4 text-gray-500 transition-transform duration-500 ease-in-out ${
                 isExpanded ? "rotate-180" : "rotate-0"
               }`} 
             />
           </button>
        </div>

      </div>
    </section>
  );
}