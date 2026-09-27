import React from "react";
import { Server, Activity, HardDrive, Network } from "lucide-react";
import CodeBlock from "../components/codeblock";

export const nodeCourseData = [
  {
    category: "1. Core Architecture",
    icon: Server,
    lessons: [
      {
        id: "what-is-nodejs",
        title: "Understanding Node.js",
        toc: [
          { id: "v8-engine", label: "The V8 Engine" },
          { id: "non-blocking", label: "Non-Blocking I/O" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <p className="text-xl text-slate-300">
              Node.js revolutionised web engineering by allowing JavaScript to run outside the browser. It is built for highly scalable, data-intensive real-time applications.
            </p>

            <h2 id="v8-engine" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              The V8 Engine
            </h2>
            <p>
              Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. The V8 engine compiles JavaScript directly into native machine code rather than interpreting it in real-time, which makes execution incredibly fast.
            </p>

            <h2 id="non-blocking" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Non-Blocking I/O
            </h2>
            <p>
              Unlike traditional server languages (like PHP or Ruby) that create a new thread for every request, Node uses a single-threaded, event-driven architecture. When it queries a database, it does not stop and wait. It continues processing other requests and fires a callback once the database responds. This behaviour allows Node to handle thousands of concurrent connections effortlessly.
            </p>
          </div>
        ),
      },
      {
        id: "event-loop",
        title: "Mastering the Event Loop",
        toc: [
          { id: "call-stack", label: "The Call Stack" },
          { id: "task-queue", label: "Task Queues & Microtasks" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2 id="call-stack" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              The Call Stack
            </h2>
            <p>
              Node executes code line by line in the Call Stack. If a function takes too long to execute (like a complex mathematical computation or video processing), it will block the entire server. This is why we must offload heavy operations.
            </p>

            <h2 id="task-queue" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Task Queues & Microtasks
            </h2>
            <p>
              When an asynchronous operation (like a file read or an API call) finishes, its callback is pushed to the Task Queue. The Event Loop constantly checks if the Call Stack is empty. Once empty, it pushes the waiting callbacks from the queue into the stack for execution.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`console.log("1. Script starts");\n\nsetTimeout(() => {\n  console.log("3. Timeout callback (Task Queue)");\n}, 0);\n\nPromise.resolve().then(() => {\n  console.log("2. Promise resolved (Microtask Queue)");\n});\n\nconsole.log("4. Script ends");`} 
            />
            
            <p className="mt-4 text-sm text-slate-400">
              *Note: Microtasks (like Promises) always have priority over standard Tasks (like setTimeout).*
            </p>
          </div>
        ),
      },
    ],
  },
  {
    category: "2. Modules & File System",
    icon: HardDrive,
    lessons: [
      {
        id: "module-system",
        title: "The Module System",
        toc: [
          { id: "commonjs", label: "CommonJS (Legacy)" },
          { id: "es-modules", label: "ES Modules (Modern)" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2 id="commonjs" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              CommonJS (Legacy)
            </h2>
            <p>
              Historically, Node.js used the CommonJS module system. You will still see this in many enterprise codebases. It uses <code>require()</code> and <code>module.exports</code>.
            </p>
            
            <CodeBlock 
              language="javascript" 
              code={`// logger.js\nfunction logMessage(msg) {\n  console.log(msg);\n}\nmodule.exports = logMessage;\n\n// app.js\nconst logMessage = require('./logger');\nlogMessage('Server started');`} 
            />

            <h2 id="es-modules" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              ES Modules (Modern)
            </h2>
            <p>
              Modern Node.js supports standard ES Modules (just like React). To use this, you must add <code>"type": "module"</code> to your <code>package.json</code>.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`// logger.js\nexport function logMessage(msg) {\n  console.log(msg);\n}\n\n// app.js\nimport { logMessage } from './logger.js';\nlogMessage('Server started');`} 
            />
          </div>
        ),
      },
      {
        id: "file-system",
        title: "Working with the File System",
        toc: [
          { id: "fs-module", label: "The fs Module" },
          { id: "fs-promises", label: "Async File Operations" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2 id="fs-module" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              The fs Module
            </h2>
            <p>
              Node.js provides a built-in <code>fs</code> (File System) module that allows you to interact with files on the server. Never use the synchronous versions (like <code>readFileSync</code>) in a production environment as they block the event loop.
            </p>

            <h2 id="fs-promises" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Async File Operations
            </h2>
            <p>
              The modern way to handle files is using the Promise-based API provided by <code>fs/promises</code>.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`import fs from 'fs/promises';\n\nasync function writeAndReadFile() {\n  try {\n    // Writing to a file\n    await fs.writeFile('database.json', '{"status": "active"}');\n    \n    // Reading from a file\n    const data = await fs.readFile('database.json', 'utf-8');\n    console.log("File content:", JSON.parse(data));\n  } catch (error) {\n    console.error("File system error:", error);\n  }\n}\n\nwriteAndReadFile();`} 
            />
          </div>
        ),
      }
    ],
  },
  {
    category: "3. Networking",
    icon: Network,
    lessons: [
      {
        id: "http-server",
        title: "Building a Raw HTTP Server",
        toc: [
          { id: "creating-server", label: "Creating the Server" },
          { id: "basic-routing", label: "Basic Routing without Express" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <p className="text-xl text-slate-300">
              Before jumping into frameworks like Express, it is crucial to understand how Node handles HTTP requests natively.
            </p>

            <h2 id="creating-server" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Creating the Server
            </h2>
            <p>
              We can use the built-in <code>http</code> module to create a web server that listens on a specific port.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`import http from 'http';\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Welcome to CodeLume Engineering');\n});\n\nserver.listen(3000, () => {\n  console.log('Server is running on port 3000');\n});`} 
            />

            <h2 id="basic-routing" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Basic Routing without Express
            </h2>
            <p>
              To return different data based on the URL, we must manually inspect the <code>req.url</code> property and write complex conditional logic. This illustrates exactly why frameworks like Express were invented to streamline this process!
            </p>

            <CodeBlock 
              language="javascript" 
              code={`import http from 'http';\n\nconst server = http.createServer((req, res) => {\n  // Handle API Route\n  if (req.url === '/api/users' && req.method === 'GET') {\n    res.writeHead(200, { 'Content-Type': 'application/json' });\n    res.end(JSON.stringify([{ id: 1, name: 'Rafay' }]));\n  } \n  // Handle 404 Not Found\n  else {\n    res.writeHead(404, { 'Content-Type': 'application/json' });\n    res.end(JSON.stringify({ error: 'Route not found' }));\n  }\n});\n\nserver.listen(3000);`} 
            />
          </div>
        ),
      }
    ]
  }
];