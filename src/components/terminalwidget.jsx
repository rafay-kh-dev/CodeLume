import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, ChevronRight } from "lucide-react";

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "CodeLume OS v3.0.0 initialised." },
    { type: "system", text: 'Type "help" to see available commands.' },
  ]);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, history]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      const newHistory = [
        ...history,
        { type: "user", text: `guest@codelume:~$ ${cmd}` },
      ];

      switch (cmd) {
        case "help":
          newHistory.push({
            type: "output",
            text: "Available commands: about, services, mern stack, ui ux, blogs, case studies, tools, tutorials, hire, admin, clear",
          });
          break;
        case "about":
          newHistory.push({
            type: "output",
            text: "CodeLume: Engineered for high-performance digital experiences. Specialising in MERN stack and bespoke UI/UX design.",
          });
          break;
        case "services":
          newHistory.push({
            type: "output",
            text: "Our Expertise: MERN Stack, PHP/Laravel, Angular, WordPress, Shopify, Webflow, Custom Platforms, UI/UX Design, Full Branding, API Integrations. Type specific service for details.",
          });
          break;
        case "mern stack":
        case "mern":
        case "react":
        case "node":
          newHistory.push({
            type: "output",
            text: "Enterprise-grade MERN Stack Development. MongoDB, Express.js, React, Node.js. Navigate to /services/mern-stack",
          });
          break;
        case "ui ux":
        case "design":
        case "branding":
          newHistory.push({
            type: "output",
            text: "Pixel-perfect, high-conversion UI/UX & Full Branding. Navigate to /services/ui-ux-design",
          });
          break;
        case "wordpress":
        case "shopify":
        case "webflow":
          newHistory.push({
            type: "output",
            text: `Yes, we build highly optimised ${cmd} platforms. Navigate to /services/${cmd.replace(" ", "-")}`,
          });
          break;
        case "blogs":
        case "blog":
          newHistory.push({
            type: "output",
            text: "Read our latest engineering insights and tech articles. Navigate to /blogs",
          });
          break;
        case "case studies":
        case "portfolio":
        case "work":
          newHistory.push({
            type: "output",
            text: "View our successful client projects and technical case studies. Navigate to /case-studies",
          });
          break;
        case "tutorials":
        case "courses":
          newHistory.push({
            type: "output",
            text: "Free Mastery Hub: React, Node.js, Express.js, MongoDB. Navigate to /tutorials",
          });
          break;
        case "tools":
        case "free tools":
          newHistory.push({
            type: "output",
            text: "Dev Tools: SVG to React, JSON to TS, JWT Decoder, Meta Extractor. Navigate to /tools",
          });
          break;
        case "admin":
        case "login":
        case "dashboard":
          newHistory.push({
            type: "error",
            text: "Security Alert: Restricted area. Admin privileges required. Redirecting to /admin/login...",
          });
          break;
        case "privacy":
        case "terms":
          newHistory.push({
            type: "output",
            text: "Legal documentation available at /privacy-policy and /terms-of-service",
          });
          break;
        case "hire":
        case "contact":
        case "start project":
          newHistory.push({
            type: "output",
            text: "Initialising contact protocol... Navigate to /start-project to access the Live Estimator.",
          });
          break;
        case "ls":
          newHistory.push({
            type: "output",
            text: "Directories: /services  /tutorials  /tools  /case-studies  /blogs  /about  /admin",
          });
          break;
        case "sudo":
        case "sudo su":
          newHistory.push({
            type: "error",
            text: "Access Denied: Nice try! Only Rafay has root access to this system.",
          });
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "":
          break;
        default:
          newHistory.push({ type: "error", text: `Command not found: ${cmd}` });
      }

      setHistory(newHistory);
      setInput("");
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-[#0a0f1c] border border-blue-500/30 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] z-[999] transform-gpu hover:scale-110"
      >
        <TerminalIcon className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 w-[350px] sm:w-[450px] h-[300px] bg-[#050505] border border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden z-[999] font-mono">
      <div className="bg-[#111] px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400">
            bash - CodeLume Engineer
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-500 hover:text-red-400"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div
        className="flex-1 p-4 overflow-y-auto text-[13px]"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={`mb-1 ${
              line.type === "user"
                ? "text-white"
                : line.type === "error"
                  ? "text-red-400"
                  : line.type === "system"
                    ? "text-slate-500"
                    : "text-blue-400"
            }`}
          >
            {line.text}
          </div>
        ))}

        <div className="flex items-center mt-2">
          <span className="text-blue-400 mr-2">guest@codelume:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-white caret-blue-400"
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
