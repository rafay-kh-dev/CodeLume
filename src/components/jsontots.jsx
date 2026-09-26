import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Copy, CheckCircle2, Braces, AlertCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function JsonToTs() {
  const [jsonInput, setJsonInput] = useState("");
  const [tsOutput, setTsOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  // Custom Recursive JSON to TypeScript Converter Logic
  const convertToTS = (jsonStr) => {
    if (!jsonStr.trim()) {
      setTsOutput("");
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(jsonStr);
      
      const parseType = (val, indent = "  ") => {
        if (val === null) return "any";
        if (Array.isArray(val)) {
          if (val.length === 0) return "any[]";
          return `${parseType(val[0], indent)}[]`;
        }
        if (typeof val === "object") {
          let str = "{\n";
          for (let key in val) {
            // Agar object key mein space ya special character ho toh usay quotes mein wrap karein
            const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
            str += `${indent}  ${safeKey}: ${parseType(val[key], indent + "  ")};\n`;
          }
          str += `${indent}}`;
          return str;
        }
        return typeof val;
      };

      let result = "";
      if (Array.isArray(parsed)) {
        result = `export type RootObject = ${parseType(parsed, "")};\n`;
      } else {
        result = `export interface RootObject {\n`;
        for (let key in parsed) {
          const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
          result += `  ${safeKey}: ${parseType(parsed[key], "")};\n`;
        }
        result += `}\n`;
      }

      setTsOutput(result);
      setError(null);
    } catch (err) {
      setError("Invalid JSON format. Please check your syntax.");
      setTsOutput("");
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setJsonInput(val);
    convertToTS(val);
    setIsCopied(false);
  };

  const copyToClipboard = () => {
    if (!tsOutput) return;
    navigator.clipboard.writeText(tsOutput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="w-full min-h-dvh pt-32 pb-24 bg-[#030712] font-jakarta text-white relative">
      <Helmet>
        <title>JSON to TypeScript Interface Generator | CodeLume</title>
        <meta name="description" content="Instantly generate TypeScript interfaces and types from JSON data. A free developer tool by CodeLume." />
      </Helmet>

      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors font-bold text-sm tracking-wide"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Braces className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="text-[12px] font-black text-emerald-500 uppercase tracking-[0.2em] m-0">
              Developer Tools
            </h2>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white m-0 tracking-tighter mb-4">
            JSON to TypeScript
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Paste your raw JSON payload below and instantly generate clean, perfectly nested TypeScript interfaces.
          </p>
        </div>

        {/* Converter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Input Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">JSON Data</label>
              {error && (
                <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error}
                </div>
              )}
            </div>
            <textarea
              value={jsonInput}
              onChange={handleInputChange}
              placeholder='{\n  "id": 1,\n  "name": "CodeLume",\n  "isActive": true\n}'
              className={`w-full h-[500px] bg-[#0a0f1c] border rounded-2xl p-6 text-slate-300 font-mono text-sm leading-relaxed outline-none transition-colors resize-none shadow-xl ${
                error ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-emerald-500"
              }`}
            />
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-3 relative">
            <div className="flex items-center justify-between px-2">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider">TypeScript Interfaces</label>
              <button
                onClick={copyToClipboard}
                disabled={!tsOutput}
                className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full transition-colors disabled:opacity-50 outline-none"
              >
                {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {isCopied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <textarea
              value={tsOutput}
              readOnly
              placeholder="Your TypeScript definitions will appear here..."
              className="w-full h-[500px] bg-[#070b14] border border-emerald-500/20 rounded-2xl p-6 text-emerald-300 font-mono text-sm leading-relaxed focus:outline-none resize-none shadow-[0_0_30px_rgba(16,185,129,0.05)]"
            />
            
            {/* Connecting Arrow */}
            <div className="hidden lg:flex absolute top-1/2 -left-3 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-500 rounded-full items-center justify-center shadow-lg border-4 border-[#030712] z-10">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}