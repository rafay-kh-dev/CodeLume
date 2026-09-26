import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Copy, CheckCircle2, Key, AlertCircle, ShieldCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function JwtDecoder() {
  const [jwtInput, setJwtInput] = useState("");
  const [decodedHeader, setDecodedHeader] = useState("");
  const [decodedPayload, setDecodedPayload] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  // Secure Client-Side JWT Decoding Logic
  const decodeJWT = (token) => {
    if (!token.trim()) {
      setDecodedHeader("");
      setDecodedPayload("");
      setError(null);
      return;
    }

    try {
      const parts = token.split('.');
      
      if (parts.length !== 3) {
        throw new Error("A valid JWT must have 3 parts separated by dots.");
      }

      // Helper function to decode Base64Url safely
      const decodeBase64Url = (str) => {
        // Convert Base64Url to Base64
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        // Pad with '=' to make it a multiple of 4
        while (base64.length % 4) {
          base64 += '=';
        }
        // Decode Base64 to string, safely handling URI components
        const jsonPayload = decodeURIComponent(
          window.atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        return JSON.stringify(JSON.parse(jsonPayload), null, 2);
      };

      setDecodedHeader(decodeBase64Url(parts[0]));
      setDecodedPayload(decodeBase64Url(parts[1]));
      setError(null);
    } catch (err) {
      setError("Invalid JWT format or signature. Please check your token.");
      setDecodedHeader("");
      setDecodedPayload("");
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setJwtInput(val);
    decodeJWT(val);
    setIsCopied(false);
  };

  const copyToClipboard = () => {
    if (!decodedPayload) return;
    navigator.clipboard.writeText(decodedPayload);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="w-full min-h-dvh pt-32 pb-24 bg-[#030712] font-jakarta text-white relative">
      <Helmet>
        <title>JWT Decoder | Inspect JSON Web Tokens | CodeLume</title>
        <meta name="description" content="Securely decode, verify, and inspect JSON Web Tokens (JWT) directly in your browser. A free developer tool by CodeLume." />
      </Helmet>

      {/* Subtle Background Glow - CodeLume Blue */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors font-bold text-sm tracking-wide"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Key className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-[12px] font-black text-blue-500 uppercase tracking-[0.2em] m-0">
              Developer Tools
            </h2>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white m-0 tracking-tighter mb-4">
            JWT Decoder
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg mb-4">
            Paste your JSON Web Token below to decode its header and payload.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <ShieldCheck size={16} />
            Decoded locally in your browser. No tokens are sent to our servers.
          </div>
        </div>

        {/* Converter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Input Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Encoded JWT String</label>
              {error && (
                <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error}
                </div>
              )}
            </div>
            <textarea
              value={jwtInput}
              onChange={handleInputChange}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI..."
              className={`w-full h-[500px] bg-[#0a0f1c] border rounded-2xl p-6 text-slate-300 font-mono text-sm leading-relaxed outline-none transition-colors resize-none shadow-xl break-all ${
                error ? "border-red-500/50 focus:border-red-500" : "border-white/5 focus:border-blue-500"
              }`}
            />
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-3 relative">
            <div className="flex items-center justify-between px-2">
              <label className="text-xs font-bold text-blue-400 uppercase tracking-wider">Decoded Output</label>
              <button
                onClick={copyToClipboard}
                disabled={!decodedPayload}
                className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full transition-colors disabled:opacity-50 outline-none"
              >
                {isCopied ? <CheckCircle2 className="w-4 h-4 text-blue-400" /> : <Copy className="w-4 h-4" />}
                {isCopied ? "Copied!" : "Copy Payload"}
              </button>
            </div>
            
            <div className="flex flex-col gap-4 h-[500px]">
              {/* Header Box */}
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">Header (Algorithm & Token Type)</label>
                <textarea
                  value={decodedHeader}
                  readOnly
                  placeholder="Decoded header will appear here..."
                  className="w-full h-full bg-[#070b14] border border-blue-500/20 rounded-2xl p-4 text-blue-200 font-mono text-sm leading-relaxed focus:outline-none resize-none shadow-[0_0_30px_rgba(37,99,235,0.02)]"
                />
              </div>
              
              {/* Payload Box */}
              <div className="flex-[2] flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">Payload (Data & Claims)</label>
                <textarea
                  value={decodedPayload}
                  readOnly
                  placeholder="Decoded payload will appear here..."
                  className="w-full h-full bg-[#070b14] border border-blue-500/20 rounded-2xl p-4 text-blue-300 font-mono text-sm leading-relaxed focus:outline-none resize-none shadow-[0_0_30px_rgba(37,99,235,0.05)]"
                />
              </div>
            </div>
            
            {/* Connecting Arrow */}
            <div className="hidden lg:flex absolute top-1/2 -left-3 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-full items-center justify-center shadow-lg border-4 border-[#030712] z-10">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}