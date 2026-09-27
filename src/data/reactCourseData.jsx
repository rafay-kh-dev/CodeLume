// src/data/reactCourseData.jsx
import React from "react";
import { Globe, Layers, Terminal, Zap, CheckCircle2 } from "lucide-react";

export const reactCourseData = [
  {
    category: "1. The Origins & Setup",
    icon: Globe,
    lessons: [
      {
        id: "history-of-react",
        title: "The History: Why React?",
        toc: [
          { id: "who-created-react", label: "Who Created React?" },
          { id: "the-problem", label: "The Core Problem" },
          { id: "the-solution", label: "The Virtual DOM Solution" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <p className="text-xl text-slate-300">
              To truly master React, you must first understand the environment
              that birthed it...
            </p>
            <h2
              id="who-created-react"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Who Created React?
            </h2>
            <p>
              React was created by <strong>Jordan Walke</strong>...
            </p>
            {/* Aapka baqi saara react ka content yahan aayega jo pehle likha tha */}
          </div>
        ),
      },
      // ... baqi lessons
    ],
  },
  // ... baqi categories
];
