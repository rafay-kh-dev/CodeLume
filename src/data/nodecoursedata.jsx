import React from "react";
import { Server, Cpu, Activity } from "lucide-react";

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
              Node.js revolutionised web development by allowing JavaScript to
              run outside the browser. It is built for highly scalable,
              data-intensive real-time applications.
            </p>

            <h2
              id="v8-engine"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              The V8 Engine
            </h2>
            <p>
              Node.js is a JavaScript runtime built on Chrome's V8 JavaScript
              engine. The V8 engine compiles JavaScript directly into native
              machine code, which makes it incredibly fast.
            </p>

            <h2
              id="non-blocking"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Non-Blocking I/O
            </h2>
            <p>
              Unlike traditional server languages (like PHP) that create a new
              thread for every request, Node uses a single-threaded,
              event-driven architecture. When it queries a database, it does not
              stop and wait. It continues processing other requests and fires a
              callback once the database responds. This behaviour allows Node to
              handle thousands of concurrent connections effortlessly.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    category: "2. The Event Loop",
    icon: Activity,
    lessons: [
      {
        id: "event-loop-deep-dive",
        title: "Mastering the Event Loop",
        toc: [
          { id: "call-stack", label: "The Call Stack" },
          { id: "task-queue", label: "Task Queues & Microtasks" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="call-stack"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              The Call Stack
            </h2>
            <p>
              Node executes code line by line in the Call Stack. If a function
              takes too long to execute (like a complex mathematical
              computation), it will block the entire server. This is why we must
              offload heavy operations.
            </p>

            <h2
              id="task-queue"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Task Queues & Microtasks
            </h2>
            <p>
              When an asynchronous operation (like a file read or an API call)
              finishes, its callback is pushed to the Task Queue. The Event Loop
              constantly checks if the Call Stack is empty. Once empty, it
              pushes the waiting callbacks from the queue into the stack for
              execution. We can optimise this behaviour using native JavaScript
              Promises.
            </p>
          </div>
        ),
      },
    ],
  },
];
