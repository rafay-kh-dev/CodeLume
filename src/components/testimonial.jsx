import React from "react";
import { Quote, Star } from "lucide-react";

export default function Testimonial() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Auburn",
      role: "Chief Technical Officer, Aura Financial",
      content:
        "CodeLume engineered a massive, highly optimised data pipeline. The latency is practically zero. It is an absolute masterclass in modern digital architecture.",
      rating: 5,
    },
    {
      id: 2,
      name: "Marcus Thorne",
      role: "E-Commerce Director, Luxe Retail",
      content:
        "The bespoke storefront exceeded all our expectations. With their specialised frontend architecture, our conversion rates maximised immediately after launch.",
      rating: 5,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "VP of Operations, Nova Corp",
      content:
        "Migrating our legacy ERP was completely seamless. They delivered fully customised cloud solutions that instantly scaled our global operations.",
      rating: 5,
    },
    {
      id: 4,
      name: "David Vance",
      role: "Head of Product, Aether Systems",
      content:
        "Remarkable speed and flawless code quality. CodeLume delivered our entire MVP weeks ahead of schedule, fully optimised for global distribution.",
      rating: 5,
    },
    {
      id: 5,
      name: "Liam Davies",
      role: "Founder, Outback Tech",
      content:
        "Their approach to React and TypeScript is phenomenal. They built a dashboard that processes millions of rows without a single frame drop.",
      rating: 5,
    },
    {
      id: 6,
      name: "Chloe Smith",
      role: "Marketing Head, Elevate Group",
      content:
        "The technical SEO improvements were outstanding. By implementing server-side rendering, our organic traffic doubled in just two months.",
      rating: 5,
    },
    {
      id: 7,
      name: "Noah Mitchell",
      role: "CEO, Peak Analytics",
      content:
        "We needed a robust MERN stack architecture for our enterprise application. The security protocols and routing they implemented are top-tier.",
      rating: 5,
    },
    {
      id: 8,
      name: "Mia Campbell",
      role: "Lead Designer, Creative Studio",
      content:
        "Finally, developers who understand pixel-perfect execution. The Tailwind CSS layouts are pristine, and the site performs flawlessly on every device.",
      rating: 5,
    },
    {
      id: 9,
      name: "Oliver Brown",
      role: "Tech Lead, Horizon SaaS",
      content:
        "Decoupling our frontend was the best decision we made. The Next.js implementation is blazing fast and incredibly scalable.",
      rating: 5,
    },
    {
      id: 10,
      name: "Harper Wilson",
      role: "Director, Nexus Logistics",
      content:
        "A brutally efficient development process. They cut out all the fluff and delivered a highly performant application that just works perfectly.",
      rating: 5,
    },
  ];

  return (
    <section
      className="w-full py-20 lg:py-32 bg-[#030712] font-jakarta overflow-hidden"
      id="testimonials"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          
          /* CSS Infinite Marquee Animation */
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          
          .animate-marquee {
            animation: marquee 50s linear infinite;
            width: max-content;
          }
          
          /* Pause animation on hover */
          .pause-on-hover:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 flex flex-col items-center text-center">
        <h2 className="text-[13px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-4 m-0">
          Client Feedback
        </h2>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight m-0 mb-6">
          Proof of Satisfaction.
        </h2>
        <h2 className="text-base text-slate-400 max-w-2xl leading-relaxed m-0">
          Real feedback from global partners who have scaled their operations
          using our highly specialised digital architectures.
        </h2>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full pause-on-hover group">
        {/* Left & Right Fade Effects (Using solid flat gradients, no blur) */}
        <div className="absolute top-0 left-0 h-full w-12 sm:w-32 bg-linear-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-12 sm:w-32 bg-linear-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="animate-marquee flex gap-6 px-4">
          {/* We map the reviews array TWICE to create a seamless infinite loop */}
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className="w-[300px] sm:w-[400px] shrink-0 flex flex-col bg-[#0a0f1c] border border-slate-800 p-8 rounded-2xl hover:border-slate-500 transition-colors duration-300 cursor-default"
            >
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-8 h-8 text-slate-700 transform -scale-x-100" />
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-blue-500 text-blue-500"
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-[15px] sm:text-[16px] font-medium text-slate-300 leading-relaxed mb-8 m-0 line-clamp-4">
                "{review.content}"
              </h2>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-[#030712] border border-slate-800 flex items-center justify-center shrink-0">
                  <h2 className="text-sm font-extrabold text-white m-0">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[14px] font-extrabold text-white m-0 tracking-tight">
                    {review.name}
                  </h2>
                  <h2 className="text-[12px] text-slate-400 font-medium m-0 mt-1 truncate max-w-[200px]">
                    {review.role}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
