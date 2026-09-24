import React from "react";
import { Star, Quote, Sparkles, BadgeCheck } from "lucide-react";
import {
  Trustpilot,
  Upwork,
  Google,
  G2,
  Yelp,
  Tripadvisor,
} from "@thesvg/react";

export default function PremiumReviewsSlider() {
  const reviews = [
    {
      id: 1,
      platform: "trustpilot",
      name: "Sarah Auburn",
      role: "Chief Technical Officer, Aura Financial",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content:
        "CodeLume engineered a massive, highly optimised data pipeline for our platform. The latency is practically zero, providing a flawless experience for our users.",
      rating: 5,
    },
    {
      id: 2,
      platform: "google",
      name: "Marcus Thorne",
      role: "E-Commerce Director, Luxe Retail",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content:
        "The bespoke storefront exceeded all our expectations. With their specialised frontend architecture, our conversion rates maximised immediately after launch.",
      rating: 5,
    },
    {
      id: 3,
      platform: "g2",
      name: "Elena Rodriguez",
      role: "VP of Operations, Nova Corp",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      content:
        "Migrating our legacy ERP was completely seamless. They delivered fully customised cloud solutions that instantly scaled our global operations.",
      rating: 5,
    },
    {
      id: 4,
      platform: "upwork",
      name: "David Vance",
      role: "Head of Product, Aether Systems",
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
      role: "Marketing Head, Elevate Group",
      avatar: "https://randomuser.me/api/portraits/women/31.jpg",
      content:
        "The technical SEO improvements were outstanding. By implementing server-side rendering, our organic traffic doubled within two months of launch.",
      rating: 5,
    },
    {
      id: 7,
      platform: "tripadvisor",
      name: "Noah Mitchell",
      role: "CEO, Horizon Travel",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      content:
        "Our travel booking platform's performance skyrocketed. The customised search architecture they built handles thousands of concurrent queries without breaking a sweat.",
      rating: 5,
    },
    {
      id: 8,
      platform: "trustpilot",
      name: "Mia Campbell",
      role: "Lead Designer, Creative Studio",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
      content:
        "Finally, developers who understand pixel-perfect execution. The responsive layouts are pristine, and the site performs flawlessly on every device.",
      rating: 5,
    },
    {
      id: 9,
      platform: "g2",
      name: "Oliver Brown",
      role: "Tech Lead, Vertex SaaS",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      content:
        "Decoupling our frontend was the best decision we made. The Next.js implementation is blazing fast and incredibly scalable for our enterprise clients.",
      rating: 5,
    },
    {
      id: 10,
      platform: "upwork",
      name: "Harper Wilson",
      role: "Director, Nexus Logistics",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      content:
        "A brutally efficient development process. They cut out all the fluff and delivered a highly performant application that simply works perfectly.",
      rating: 5,
    },
  ];

  const row2Reviews = [...reviews].reverse();

  const getPlatformLogo = (type) => {
    switch (type) {
      case "trustpilot":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-[#00b67a]/10 border-[#00b67a]/30 shadow-xs">
            <Trustpilot
              variant="mono"
              className="w-3.5 h-3.5 text-[#00b67a] fill-[#00b67a]"
            />
            <h2 className="text-[#00b67a] font-bold text-[11px] tracking-wide m-0">
              Trustpilot
            </h2>
          </div>
        );
      case "google":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-white/5 border-white/15 shadow-xs">
            <Google className="w-3.5 h-3.5" />
            <h2 className="text-white font-bold text-[11px] tracking-wide m-0">
              Google
            </h2>
          </div>
        );
      case "g2":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-red-500/10 border-red-500/30 shadow-xs">
            <G2 className="w-3.5 h-3.5" />
            <h2 className="text-red-500 font-bold text-[11px] tracking-wide m-0">
              G2
            </h2>
          </div>
        );
      case "upwork":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-[#14a800]/10 border-[#14a800]/30 shadow-xs">
            <Upwork className="w-3.5 h-3.5" />
            <h2 className="text-[#14a800] font-bold text-[11px] tracking-wide m-0">
              Upwork
            </h2>
          </div>
        );
      case "yelp":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-red-600/10 border-red-600/30 shadow-xs">
            <Yelp className="w-3.5 h-3.5" />
            <h2 className="text-red-500 font-bold text-[11px] tracking-wide m-0">
              Yelp
            </h2>
          </div>
        );
      case "tripadvisor":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border bg-[#34e0a1]/10 border-[#34e0a1]/30 shadow-xs">
            <Tripadvisor className="w-3.5 h-3.5" />
            <h2 className="text-[#34e0a1] font-bold text-[11px] tracking-wide m-0">
              Tripadvisor
            </h2>
          </div>
        );
      default:
        return null;
    }
  };

  const ReviewCard = ({ review }) => (
    /* FIXED: rounded-2xl (increased radius), border-white/20 (crisper border), and stronger shadow for a sharp look */
    <div className="w-64 sm:w-72 shrink-0 flex flex-col p-4 sm:p-5 bg-[#060913] border border-blue-400/80 rounded-3xl hover:border-blue-400/80 transition-all duration-300 cursor-default relative hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between gap-2.5 mb-3.5">
        {getPlatformLogo(review.platform)}
        <Quote className="w-5 h-5 text-slate-600 transform -scale-x-100 group-hover:text-blue-400/50 transition-colors" />
      </div>

      <div className="flex gap-0.5 mb-2.5">
        {[...Array(review.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_2px_rgba(251,191,36,0.5)]"
          />
        ))}
      </div>

      <h2 className="text-[13px] sm:text-[14px] text-slate-200 font-normal leading-relaxed mb-5 m-0 min-h-20">
        "{review.content}"
      </h2>

      <div className="mt-auto pt-3.5 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-9 h-9 rounded-lg object-cover shrink-0 border border-white/15 shadow-sm"
          />
          <div className="flex flex-col">
            <h2 className="text-[12px] font-bold text-white m-0 tracking-tight">
              {review.name}
            </h2>
            <h2 className="text-[10px] text-slate-400 font-medium m-0 truncate max-w-45">
              {review.role}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="w-full py-16 lg:py-28 bg-[#030712] font-jakarta overflow-hidden"
      id="reviews-section"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          
          @keyframes marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          
          @keyframes marquee-reverse {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          
          .animate-marquee {
            animation: marquee 100s linear infinite;
            will-change: transform;
            backface-visibility: hidden;
          }
          
          .animate-marquee-reverse {
            animation: marquee-reverse 100s linear infinite;
            will-change: transform;
            backface-visibility: hidden;
          }

          .marquee-row:hover .animate-marquee,
          .marquee-row:hover .animate-marquee-reverse {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 lg:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col items-start text-left max-w-2xl">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <h2 className="text-[11px] font-bold text-blue-400 uppercase tracking-widest m-0">
                Verified Global Feedback
              </h2>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[1.05] m-0 mb-4">
              Engineered for Trust. <br className="hidden sm:block" />
              Proven by Results.
            </h2>
            <h2 className="text-[14px] sm:text-base text-slate-400 font-medium leading-relaxed m-0">
              Explore authentic reviews from enterprise clients who have scaled
              their digital architecture with our specialised web solutions.
            </h2>
          </div>

          <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-linear-to-br from-blue-900/40 to-blue-600/10 border border-blue-500/30 backdrop-blur-md shadow-[0_0_40px_rgba(37,99,235,0.15)] relative overflow-hidden group shrink-0 lg:min-w-85">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150 pointer-events-none" />

            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 relative z-10">
              <BadgeCheck
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                strokeWidth={2.5}
              />
            </div>

            <div className="flex flex-col relative z-10">
              <div className="flex items-end gap-2 mb-0.5">
                <h2 className="text-2xl sm:text-3xl font-black text-white m-0 tracking-tight leading-none">
                  4.9
                  <span className="text-blue-400 text-base sm:text-lg font-bold">
                    /5.0
                  </span>
                </h2>
                <div className="flex gap-0.5 pb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
              <h2 className="text-[12px] sm:text-[13px] text-blue-100/80 font-semibold m-0 tracking-wide">
                150+ Verified Global Reviews
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Double Infinite Scroll Marquee Container */}
      <div className="relative w-full flex flex-col gap-5 sm:gap-6">
        <div className="absolute top-0 left-0 h-full w-12 sm:w-28 bg-linear-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-12 sm:w-28 bg-linear-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Forward */}
        <div className="marquee-row overflow-hidden w-full py-3 -my-3 flex">
          <div className="animate-marquee flex w-max">
            {/* Set 1 */}
            <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5">
              {reviews.map((review) => (
                <ReviewCard key={`row1-1-${review.id}`} review={review} />
              ))}
            </div>
            {/* Set 2 - exact duplicate for seamless looping */}
            <div
              className="flex gap-4 sm:gap-5 pr-4 sm:pr-5"
              aria-hidden="true"
            >
              {reviews.map((review) => (
                <ReviewCard key={`row1-2-${review.id}`} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 - Reverse */}
        <div className="marquee-row overflow-hidden w-full py-3 -my-3 flex">
          <div className="animate-marquee-reverse flex w-max">
            {/* Set 1 */}
            <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5">
              {row2Reviews.map((review) => (
                <ReviewCard key={`row2-1-${review.id}`} review={review} />
              ))}
            </div>
            {/* Set 2 - exact duplicate for seamless looping */}
            <div
              className="flex gap-4 sm:gap-5 pr-4 sm:pr-5"
              aria-hidden="true"
            >
              {row2Reviews.map((review) => (
                <ReviewCard key={`row2-2-${review.id}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
