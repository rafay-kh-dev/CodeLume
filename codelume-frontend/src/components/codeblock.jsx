"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ code, language = "javascript" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden mt-4 mb-6 border border-white/10 shadow-lg">
      {/* Code Header with Language & Copy Button */}
      <div className="flex justify-between items-center bg-[#1e1e1e] px-4 py-2 border-b border-white/5">
        <span className="text-xs text-slate-400 font-mono lowercase">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold outline-none"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Actual Highlighted Code */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.25rem",
          background: "#0a0f1c", // CodeLume dark background
          fontSize: "14px",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
