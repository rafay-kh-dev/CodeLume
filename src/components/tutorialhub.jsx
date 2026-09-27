// src/components/TutorialHub.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Code2, Server } from "lucide-react";

export default function TutorialHub() {
  const courses = [
    {
      title: "React Mastery",
      description:
        "From 0 to 100. Learn modern React, Hooks, and Advanced Patterns.",
      link: "/tutorials/react",
      icon: Code2,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Node.js Fundamentals",
      description:
        "Build robust APIs and backends with Node, Express, and MongoDB.",
      link: "/tutorials/node",
      icon: Server,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <section className="w-full min-h-dvh pt-32 pb-24 bg-[#030712] font-jakarta">
      <Helmet>
        <title>Developer Courses | CodeLume</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-black text-white mb-12">
          Select a Course
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, idx) => {
            const Icon = course.icon;
            return (
              <Link
                key={idx}
                to={course.link}
                className="p-8 rounded-3xl bg-[#0a0f1c] border border-white/5 hover:-translate-y-2 transition-transform"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${course.bgColor}`}
                >
                  <Icon className={`w-7 h-7 ${course.color}`} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {course.title}
                </h2>
                <p className="text-slate-400">{course.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
