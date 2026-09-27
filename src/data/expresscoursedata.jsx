import React from "react";
import { Webhook, Shield, Route } from "lucide-react";

export const expressCourseData = [
  {
    category: "1. Routing & Setup",
    icon: Route,
    lessons: [
      {
        id: "express-basics",
        title: "Initialising Express",
        toc: [
          { id: "setup", label: "Server Setup" },
          { id: "basic-routing", label: "Basic Routing" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <p className="text-xl text-slate-300">
              Express is a minimal and highly flexible Node.js web application
              framework that provides a robust set of features to engineer
              complex web and mobile APIs.
            </p>

            <h2
              id="setup"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Server Setup
            </h2>
            <p>
              To create an Express server, you instantiate the app and tell it
              to listen on a specific port.
            </p>
            <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-emerald-300 whitespace-pre overflow-x-auto">
              {`import express from 'express';\nconst app = express();\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});`}
            </div>

            <h2
              id="basic-routing"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Basic Routing
            </h2>
            <p>
              Routing determines how an application responds to a client request
              to a particular endpoint (URI) and a specific HTTP request method
              (GET, POST, etc.).
            </p>
          </div>
        ),
      },
    ],
  },
  {
    category: "2. Middleware Architecture",
    icon: Shield,
    lessons: [
      {
        id: "understanding-middleware",
        title: "The Middleware Pipeline",
        toc: [
          { id: "what-is-middleware", label: "What is Middleware?" },
          { id: "error-handling", label: "Error Handling Middleware" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="what-is-middleware"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              What is Middleware?
            </h2>
            <p>
              Middleware functions have access to the request object (req), the
              response object (res), and the next middleware function in the
              application's request-response cycle. They can execute any code,
              make changes to the request/response objects, end the response
              cycle, or call the next middleware.
            </p>

            <h2
              id="error-handling"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Error Handling Middleware
            </h2>
            <p>
              To optimise application stability, you must implement centralized
              error handling. Error-handling middleware always takes four
              arguments: (err, req, res, next).
            </p>
          </div>
        ),
      },
    ],
  },
];
