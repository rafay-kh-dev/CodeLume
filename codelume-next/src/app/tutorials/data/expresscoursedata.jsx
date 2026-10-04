import React from "react";
import { Webhook, Shield, Route, ServerCog } from "lucide-react";
// Updated path for Next.js folder structure
import CodeBlock from "../../../components/codeblock";

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
              Express is a minimal, unopinionated, and highly flexible Node.js
              web application framework. It provides a robust set of features to
              engineer complex web and mobile APIs without obscuring Node.js
              features.
            </p>

            <h2
              id="setup"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Server Setup
            </h2>
            <p>
              To create an Express server, you instantiate the app and tell it
              to listen on a specific port. Notice how much cleaner this is
              compared to the raw Node.js HTTP module.
            </p>

            <CodeBlock
              language="javascript"
              code={`import express from 'express';\n\nconst app = express();\nconst PORT = 3000;\n\napp.listen(PORT, () => {\n  console.log(\`Server engineering complete. Listening on port \${PORT}\`);\n});`}
            />

            <h2
              id="basic-routing"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Basic Routing
            </h2>
            <p>
              Routing determines how an application responds to a client request
              to a particular endpoint (URI) and a specific HTTP request method
              (GET, POST, PUT, DELETE).
            </p>

            <CodeBlock
              language="javascript"
              code={`// GET request to the homepage\napp.get('/', (req, res) => {\n  res.send('Welcome to CodeLume API');\n});\n\n// POST request to create a user\napp.post('/api/users', (req, res) => {\n  res.status(201).json({ message: "User created successfully" });\n});`}
            />
          </div>
        ),
      },
      {
        id: "route-parameters",
        title: "Dynamic Route Parameters",
        toc: [
          { id: "params", label: "Extracting Parameters" },
          { id: "query-strings", label: "Query Strings" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="params"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Extracting Parameters (req.params)
            </h2>
            <p>
              Route parameters are named URL segments that are used to capture
              the values specified at their position in the URL. They are
              heavily used in RESTful architecture.
            </p>

            <CodeBlock
              language="javascript"
              code={`app.get('/api/users/:userId', (req, res) => {\n  // If URL is /api/users/89\n  const id = req.params.userId;\n  res.json({ targetUserId: id });\n});`}
            />

            <h2
              id="query-strings"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Query Strings (req.query)
            </h2>
            <p>
              Query strings are often used for sorting, filtering, or pagination
              in GET requests. They appear after a question mark in the URL
              (e.g., <code>?sort=asc&limit=10</code>).
            </p>

            <CodeBlock
              language="javascript"
              code={`app.get('/api/articles', (req, res) => {\n  // If URL is /api/articles?category=tech&limit=5\n  const { category, limit } = req.query;\n  \n  res.json({\n    filteredBy: category,\n    maxResults: limit\n  });\n});`}
            />
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
          { id: "custom-middleware", label: "Writing Custom Middleware" },
          { id: "error-handling", label: "Error Handling" },
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
              Express is essentially a routing and middleware web framework.
              Middleware functions have access to the request object (
              <code>req</code>), the response object (<code>res</code>), and the{" "}
              <code>next</code> middleware function in the application's
              request-response cycle.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-300">
              <li>Execute any code.</li>
              <li>Make changes to the request and the response objects.</li>
              <li>End the request-response cycle.</li>
              <li>
                Call the next middleware in the stack using <code>next()</code>.
              </li>
            </ul>

            <h2
              id="custom-middleware"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Writing Custom Middleware
            </h2>
            <p>
              Here is an example of a custom logging middleware that tracks the
              time of every incoming request.
            </p>

            <CodeBlock
              language="javascript"
              code={`const requestLogger = (req, res, next) => {\n  console.log(\`[\${new Date().toISOString()}] \${req.method} to \${req.url}\`);\n  // CRITICAL: You must call next() to pass control to the next handler\n  next(); \n};\n\n// Apply globally to all routes\napp.use(requestLogger);`}
            />

            <h2
              id="error-handling"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Error Handling Middleware
            </h2>
            <p>
              To optimise application stability, you must implement centralised
              error handling. Error-handling middleware always takes four
              arguments: <code>(err, req, res, next)</code>. Express recognises
              it as an error handler strictly by its 4-arity signature.
            </p>

            <CodeBlock
              language="javascript"
              code={`app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({\n    success: false,\n    message: "A critical server error occurred."\n  });\n});`}
            />
          </div>
        ),
      },
    ],
  },
];
