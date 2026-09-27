import React from "react";
import { Server, Activity, HardDrive, Network, Cpu, DatabaseZap, Archive } from "lucide-react";
import CodeBlock from "../components/codeblock";

export const nodeCourseData = [
  {
    category: "1. The Origins & The C10K Problem",
    icon: Server,
    lessons: [
      {
        id: "history-of-nodejs",
        title: "History: Why Node.js?",
        toc: [
          { id: "the-creator", label: "Ryan Dahl & The Birth of Node" },
          { id: "c10k-problem", label: "The C10K Problem" },
          { id: "apache-vs-node", label: "Apache vs Node.js" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <p className="text-xl text-slate-300">
              To engineer high-performance backend systems, you must first understand the severe limitations of early web servers that forced Node.js into existence.
            </p>

            <h2 id="the-creator" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Ryan Dahl & The Birth of Node
            </h2>
            <p>
              In 2009, software engineer <strong>Ryan Dahl</strong> was analysing a file upload progress bar on Flickr. He realised that the browser did not know how much of the file had been uploaded, requiring the server to be constantly queried. Dahl wanted a system where the server could push data to the client seamlessly. He took Google Chrome's incredibly fast V8 JavaScript engine, embedded it inside a C++ programme, and Node.js was born.
            </p>

            <h2 id="c10k-problem" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              The C10K Problem
            </h2>
            <p>
              In the early 2000s, handling 10,000 concurrent connections (the C10K problem) was a massive engineering hurdle. Traditional servers like Apache spawned a new thread for every single connection. Threads consume RAM (often 2MB per thread). 10,000 connections meant 20GB of RAM just to keep connections open, causing servers to crash under heavy load.
            </p>

            <h2 id="apache-vs-node" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Apache vs Node.js Architecture
            </h2>
            <ul className="space-y-3 mt-4">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">&times;</span>
                <span>
                  <strong>Thread-Per-Request (Apache/PHP):</strong> Blocks the thread while waiting for database queries. Highly inefficient for I/O heavy operations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 font-bold shrink-0 mt-0.5">&#10003;</span>
                <span>
                  <strong>Single-Threaded Event Loop (Node.js):</strong> Uses a single thread to handle all incoming requests. When a database query occurs, Node delegates it to the system kernel and continues processing other requests. It is highly optimised for concurrent connections.
                </span>
              </li>
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    category: "2. The Event Loop (Deep Dive)",
    icon: Activity,
    lessons: [
      {
        id: "event-loop-phases",
        title: "Phases of the Event Loop",
        toc: [
          { id: "libuv", label: "Libuv & Thread Pool" },
          { id: "loop-phases", label: "The 6 Phases" },
          { id: "microtasks", label: "Microtasks Priority" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2 id="libuv" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Libuv & The Secret Thread Pool
            </h2>
            <p>
              Node.js is described as single-threaded, but this is only half true. Your JavaScript code runs on a single thread (the V8 main thread). However, Node uses a C library called <strong>libuv</strong> to handle asynchronous I/O. Libuv maintains a hidden thread pool (default 4 threads) to offload heavy tasks like File System operations or cryptographic hashing.
            </p>

            <h2 id="loop-phases" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              The 6 Phases of the Event Loop
            </h2>
            <p>
              The Event Loop is not a magical entity; it is a C programme that runs in a continuous loop, processing queues in a specific order:
            </p>
            <ul className="list-decimal pl-6 space-y-2 mt-4 text-slate-300 font-mono text-sm">
              <li><strong>Timers:</strong> Executes callbacks scheduled by <code>setTimeout()</code> and <code>setInterval()</code>.</li>
              <li><strong>Pending Callbacks:</strong> Executes I/O callbacks deferred to the next loop iteration.</li>
              <li><strong>Idle, Prepare:</strong> Internal Node.js usage only.</li>
              <li><strong>Poll:</strong> Retrieves new I/O events; executes I/O related callbacks (almost everything except timers and close callbacks).</li>
              <li><strong>Check:</strong> Executes <code>setImmediate()</code> callbacks.</li>
              <li><strong>Close Callbacks:</strong> Executes close events, e.g., <code>socket.on('close', ...)</code>.</li>
            </ul>

            <h2 id="microtasks" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Microtasks Priority (Promises & nextTick)
            </h2>
            <p>
              Between every single phase of the Event Loop, Node checks the Microtask Queue. Microtasks have the absolute highest priority. <code>process.nextTick()</code> runs before Promises.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`console.log("1. Script starts");\n\nsetTimeout(() => console.log("5. Timer Phase"), 0);\nsetImmediate(() => console.log("6. Check Phase"));\n\nPromise.resolve().then(() => console.log("4. Promise Microtask"));\n\nprocess.nextTick(() => console.log("3. nextTick Microtask"));\n\nconsole.log("2. Script ends");`} 
            />
          </div>
        ),
      },
    ],
  },
  {
    category: "3. Buffers & Streams",
    icon: DatabaseZap,
    lessons: [
      {
        id: "binary-data",
        title: "Handling Binary Data (Buffers)",
        toc: [
          { id: "what-is-buffer", label: "What is a Buffer?" },
          { id: "buffer-methods", label: "Buffer Methods" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <p className="text-xl text-slate-300">
              JavaScript was originally designed for strings and numbers. Node.js introduced the Buffer class to handle raw binary data streams, crucial for reading images, videos, and network packets.
            </p>

            <h2 id="what-is-buffer" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              What is a Buffer?
            </h2>
            <p>
              A Buffer is a fixed-size chunk of memory allocated outside the V8 JavaScript engine. Once created, its size cannot be changed. It stores raw binary data as a sequence of integers from 0 to 255.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`// Allocate 4 bytes of memory\nconst buf1 = Buffer.alloc(4);\n\n// Create a buffer from a string\nconst buf2 = Buffer.from('CodeLume', 'utf-8');\n\nconsole.log(buf2); // <Buffer 43 6f 64 65 4c 75 6d 65>\nconsole.log(buf2.toString()); // CodeLume`} 
            />
          </div>
        ),
      },
      {
        id: "nodejs-streams",
        title: "Data Streams Architecture",
        toc: [
          { id: "why-streams", label: "Why Use Streams?" },
          { id: "stream-types", label: "The 4 Types of Streams" },
          { id: "piping", label: "Piping Data" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2 id="why-streams" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Why Use Streams?
            </h2>
            <p>
              If you try to read a 10GB video file into memory using <code>fs.readFile()</code>, your Node server will instantly crash because it will exceed the available RAM. Streams solve this by processing data in small, continuous chunks.
            </p>

            <h2 id="stream-types" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              The 4 Types of Streams
            </h2>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-300">
              <li><strong>Readable:</strong> Streams from which data can be read (e.g., <code>fs.createReadStream</code>).</li>
              <li><strong>Writable:</strong> Streams to which data can be written (e.g., <code>fs.createWriteStream</code>).</li>
              <li><strong>Duplex:</strong> Streams that are both Readable and Writable (e.g., Network TCP sockets).</li>
              <li><strong>Transform:</strong> Duplex streams that can modify data as it is written and read (e.g., <code>zlib.createGzip</code>).</li>
            </ul>

            <h2 id="piping" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Piping Data
            </h2>
            <p>
              Piping is an elegant mechanism to attach the output of a Readable stream directly to the input of a Writable stream.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`import fs from 'fs';\nimport zlib from 'zlib';\n\n// Read massive file, compress it, and write it to a new file without blowing up RAM\nconst readStream = fs.createReadStream('massive_database.txt');\nconst writeStream = fs.createWriteStream('massive_database.txt.gz');\nconst gzip = zlib.createGzip();\n\n// Source -> Transform -> Destination\nreadStream.pipe(gzip).pipe(writeStream);\n\nconsole.log("Streaming compression started...");`} 
            />
          </div>
        ),
      },
    ],
  },
  {
    category: "4. The File System (Advanced)",
    icon: HardDrive,
    lessons: [
      {
        id: "fs-module-deepdive",
        title: "File Operations & Permissions",
        toc: [
          { id: "sync-vs-async", label: "Sync vs Async vs Promises" },
          { id: "file-stats", label: "Checking File Stats" },
          { id: "directory-ops", label: "Directory Operations" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2 id="sync-vs-async" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Sync vs Async vs Promises
            </h2>
            <p>
              The <code>fs</code> module provides three different APIs. Always prefer the Promise-based API for modern, non-blocking code.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`import fs from 'fs';\nimport fsPromises from 'fs/promises';\n\n// 1. Synchronous (BLOCKS THE EVENT LOOP - NEVER USE IN SERVERS)\nconst data = fs.readFileSync('config.json', 'utf8');\n\n// 2. Asynchronous Callbacks (Callback Hell)\nfs.readFile('config.json', 'utf8', (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});\n\n// 3. Promises (Modern Standard)\nasync function readConfig() {\n  try {\n    const data = await fsPromises.readFile('config.json', 'utf8');\n    console.log(data);\n  } catch (err) {\n    console.error(err);\n  }\n}`} 
            />

            <h2 id="directory-ops" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Directory Operations
            </h2>
            <p>
              Node allows you to create directories recursively, read directory contents, and manipulate file paths using the <code>path</code> module.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`import fs from 'fs/promises';\nimport path from 'path';\n\nasync function setupProject() {\n  const targetPath = path.join(process.cwd(), 'build', 'assets');\n  \n  // Create folders recursively (like mkdir -p)\n  await fs.mkdir(targetPath, { recursive: true });\n  console.log(\`Successfully created \${targetPath}\`);\n  \n  // Read contents of a directory\n  const files = await fs.readdir(process.cwd());\n  console.log("Root files:", files);\n}`} 
            />
          </div>
        ),
      },
    ],
  },
  {
    category: "5. Raw HTTP & Networking",
    icon: Network,
    lessons: [
      {
        id: "raw-http-server",
        title: "Engineering a Server from Scratch",
        toc: [
          { id: "creating-server", label: "Instantiating the Server" },
          { id: "handling-post", label: "Handling POST Data Streams" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <p className="text-xl text-slate-300">
              Frameworks like Express abstract away the complexity of networking. To become a senior engineer, you must understand how to parse raw HTTP requests manually.
            </p>

            <h2 id="creating-server" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Instantiating the Server
            </h2>
            <CodeBlock 
              language="javascript" 
              code={`import http from 'http';\n\nconst server = http.createServer((req, res) => {\n  // Set global headers\n  res.setHeader('X-Powered-By', 'CodeLume Engine');\n  res.setHeader('Content-Type', 'application/json');\n\n  // Basic GET Route\n  if (req.method === 'GET' && req.url === '/health') {\n    res.statusCode = 200;\n    return res.end(JSON.stringify({ status: 'Operational' }));\n  }\n});\n\nserver.listen(8080, () => console.log('Listening on port 8080'));`} 
            />

            <h2 id="handling-post" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Handling POST Data Streams
            </h2>
            <p>
              When a client sends a POST request with a JSON payload, Node does not give you a neat <code>req.body</code> object. The data arrives in chunks via streams. You must manually assemble these chunks.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`if (req.method === 'POST' && req.url === '/users') {\n  let body = '';\n\n  // Listen for data chunks stream\n  req.on('data', (chunk) => {\n    body += chunk.toString();\n  });\n\n  // When the stream ends, parse the assembled JSON\n  req.on('end', () => {\n    try {\n      const parsedData = JSON.parse(body);\n      res.statusCode = 201;\n      res.end(JSON.stringify({ message: "User created", data: parsedData }));\n    } catch (e) {\n      res.statusCode = 400;\n      res.end(JSON.stringify({ error: "Invalid JSON format" }));\n    }\n  });\n}`} 
            />
          </div>
        ),
      },
    ],
  },
  {
    category: "6. CPU Clustering & Scaling",
    icon: Cpu,
    lessons: [
      {
        id: "cluster-module",
        title: "Scaling Node.js App Performance",
        toc: [
          { id: "cpu-limits", label: "The Single-Thread Limitation" },
          { id: "cluster-implementation", label: "Implementing Clusters" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2 id="cpu-limits" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              The Single-Thread Limitation
            </h2>
            <p>
              By default, Node.js runs on a single CPU core. If you deploy your app to an 8-core AWS EC2 instance, you are wasting 7 cores. To maximise hardware utilisation, we use the built-in <code>cluster</code> module to fork the process.
            </p>

            <h2 id="cluster-implementation" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Implementing Clusters
            </h2>
            <p>
              The Master process manages the Workers. The Workers are the actual Node.js instances that handle the HTTP requests. They share the same server port.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`import cluster from 'cluster';\nimport os from 'os';\nimport express from 'express';\n\nconst numCPUs = os.cpus().length;\n\nif (cluster.isPrimary) {\n  console.log(\`Primary Master Process \${process.pid} is running\`);\n  console.log(\`Forking Server across \${numCPUs} CPUs...\\n\`);\n\n  // Fork a worker for every CPU core\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n\n  // Restart workers if they die\n  cluster.on('exit', (worker, code, signal) => {\n    console.log(\`Worker \${worker.process.pid} died. Booting a new one...\`);\n    cluster.fork();\n  });\n\n} else {\n  // This code runs inside the worker processes\n  const app = express();\n  \n  app.get('/', (req, res) => {\n    res.send(\`Response handled by Worker \${process.pid}\`);\n  });\n\n  app.listen(3000, () => {\n    console.log(\`Worker \${process.pid} started\`);\n  });\n}`} 
            />
            <p className="mt-4">
              In modern production environments, this clustering is often handled automatically by process managers like <strong>PM2</strong> or orchestrators like <strong>Kubernetes</strong>.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    category: "7. Modules & NPM Engineering",
    icon: Archive,
    lessons: [
      {
        id: "npm-architecture",
        title: "NPM & Package Management",
        toc: [
          { id: "package-json", label: "Anatomy of package.json" },
          { id: "semantic-versioning", label: "Semantic Versioning" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2 id="package-json" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Anatomy of package.json
            </h2>
            <p>
              Every Node project relies on a <code>package.json</code> file. It acts as the blueprint for your application, handling dependencies, scripts, and engine requirements.
            </p>

            <CodeBlock 
              language="json" 
              code={`{\n  "name": "codelume-api",\n  "version": "1.0.0",\n  "type": "module", // Enables ES6 import/export\n  "scripts": {\n    "start": "node server.js",\n    "dev": "nodemon server.js",\n    "build": "tsc"\n  },\n  "dependencies": {\n    "express": "^4.18.2",\n    "mongoose": "^8.0.0"\n  },\n  "devDependencies": {\n    "nodemon": "^3.0.1"\n  }\n}`} 
            />

            <h2 id="semantic-versioning" className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
              Semantic Versioning (SemVer)
            </h2>
            <p>
              Node packages use a 3-digit versioning system (e.g., <code>4.18.2</code>) representing <strong>MAJOR.MINOR.PATCH</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-300">
              <li><strong>MAJOR:</strong> Breaking changes. API compatibility is broken.</li>
              <li><strong>MINOR:</strong> New features added in a backward-compatible manner.</li>
              <li><strong>PATCH:</strong> Backward-compatible bug fixes.</li>
            </ul>
            <p className="mt-2 text-sm text-slate-400">
              *The caret symbol (^) in <code>^4.18.2</code> means NPM will automatically update minor and patch versions, but will never update to a major version (e.g., 5.0.0) which could break your app.*
            </p>
          </div>
        ),
      },
    ],
  },
];