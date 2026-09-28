import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "CodeLume OS v2.0.0 initialised." },
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
            text: "Available commands: about, stack, services, tutorials, tools, hire, ls, clear",
          });
          break;
        case "about":
          newHistory.push({
            type: "output",
            text: "Rafay is a bespoke MERN stack engineer & UI/UX designer building highly optimised digital experiences for modern enterprises.",
          });
          break;
        case "stack":
          newHistory.push({
            type: "output",
            text: "Frontend: React, Tailwind CSS | Backend: Node.js, Express | Database: MongoDB",
          });
          break;
        case "services":
          newHistory.push({
            type: "output",
            text: "CodeLume Services: 1. MERN Stack Dev 2. UI/UX Design 3. Mobile Apps 4. Full Branding 5. API Integrations",
          });
          break;
        case "tutorials":
        case "courses":
          newHistory.push({
            type: "output",
            text: "Free MERN Mastery Hub: React Course, Node.js Architecture, Express.js APIs, MongoDB Databases. Navigate to /tutorials to start learning.",
          });
          break;
        case "tools":
        case "free tools":
        case "freetools":
          newHistory.push({
            type: "output",
            text: "Developer Toolkit: SVG to React JSX, JSON to TypeScript, JWT Decoder, Meta Tag Extractor. Check the Dev Tools section!",
          });
          break;
        case "ls":
          newHistory.push({
            type: "output",
            text: "Directories: /services  /tutorials  /tools  /case-studies  /blogs  /about",
          });
          break;
        case "whoami":
          newHistory.push({
            type: "output",
            text: "guest - Welcome to CodeLume OS. You have limited privileges.",
          });
          break;
        case "sudo":
        case "sudo su":
          newHistory.push({
            type: "error",
            text: "Access Denied: Nice try! Only Rafay has root access to this system.",
          });
          break;
        case "hire":
        case "contact":
          newHistory.push({
            type: "output",
            text: "Initialising contact protocol... Navigate to /start-project to build something extraordinary.",
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
