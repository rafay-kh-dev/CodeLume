import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, ChevronRight } from "lucide-react";

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "CodeLume OS v1.0.0 initialised." },
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
            text: "Available commands: about, stack, hire, clear",
          });
          break;
        case "about":
          newHistory.push({
            type: "output",
            text: "Rafay is a bespoke MERN stack engineer building highly optimised digital experiences.",
          });
          break;
        case "stack":
          newHistory.push({
            type: "output",
            text: "MongoDB, Express.js, React, Node.js, Tailwind CSS, TypeScript",
          });
          break;
        case "hire":
          newHistory.push({
            type: "output",
            text: "Initialising contact protocol... Navigate to /start-project to proceed.",
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
        className="fixed bottom-6 left-6 w-14 h-14 bg-[#071d16] border border-[#2fe43b]/30 rounded-full flex items-center justify-center text-[#2fe43b] hover:bg-[#2fe43b] hover:text-black transition-all shadow-[0_0_15px_rgba(47,228,59,0.3)] z-[999] transform-gpu hover:scale-110"
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
                    : "text-[#2fe43b]"
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
            className="flex-1 bg-transparent border-none outline-none text-white caret-[#2fe43b]"
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
