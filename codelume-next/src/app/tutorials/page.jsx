"use client";
import React from "react";
import Link from "next/link";
// Official SVG Icons (Jese aap ne bheje)
import {
  React as ReactIcon,
  Nodedotjs,
  Expressdotjs,
  Mongodb,
} from "@thesvg/react";

export default function TutorialHub() {
  const courses = [
    {
      title: "React Mastery",
      description:
        "From 0 to 100. Learn modern React, Hooks, and Advanced Patterns.",
      link: "/tutorials/react",
      icon: ReactIcon,
      color: "text-[#61DAFB]", // React Blue
      bgColor: "bg-[#61DAFB]/10",
      status: "Live",
    },
    {
      title: "Node.js Architecture",
      description:
        "Master event-driven programming and build highly scalable backend systems.",
      link: "/tutorials/node", // Yahan node ke route ka link daal diya hai
      icon: Nodedotjs,
      color: "text-[#339933]", // Node Green
      bgColor: "bg-[#339933]/10",
      status: "Live",
    },
    {
      title: "Express.js APIs",
      description:
        "Engineer robust, secure RESTful APIs and handle complex middleware.",
      link: "/tutorials/express",
      icon: Expressdotjs,
      color: "text-white",
      bgColor: "bg-white/10",
      status: "Live",
    },
    {
      title: "MongoDB Databases",
      description:
        "NoSQL document modelling, indexing, and complex data aggregation.",
      link: "/tutorials/mongodb",
      icon: Mongodb,
      color: "text-[#47A248]", // Mongo Green
      bgColor: "bg-[#47A248]/10",
      status: "Live",
    },
  ];

  return (
    <section className="w-full min-h-dvh pt-32 pb-24 bg-[#030712] font-jakarta">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-white mb-4">
            MERN Stack Engineering Path
          </h2>
          <p className="text-slate-400 text-lg">
            Master the full-stack ecosystem from absolute zero to production
            deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, idx) => {
            const Icon = course.icon;

            return (
              <Link
                key={idx}
                href={course.link}
                // Pura box ab ek link ban gaya hai
                className="p-8 rounded-3xl bg-[#0a0f1c] border border-white/5 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 block group outline-none"
              >
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {course.status}
                  </span>
                </div>

                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${course.bgColor}`}
                >
                  <Icon className={`w-7 h-7 ${course.color}`} />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {course.title}
                </h2>
                <p className="text-slate-400 mb-6">{course.description}</p>

                {/* Yahan pe text update ho gaya hai aur ye ab ek simple span hai */}
                <span className="text-sm font-bold text-blue-400 group-hover:text-blue-300 flex items-center gap-1 transition-colors">
                  View all lessons &rarr;
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
