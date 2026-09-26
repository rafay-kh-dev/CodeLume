import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Copy, CheckCircle2, Code2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function SvgToReact() {
  const [svgInput, setSvgInput] = useState("");
  const [jsxOutput, setJsxOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // SVG to JSX Conversion Logic
  const handleConvert = (e) => {
    const rawSvg = e.target.value;
    setSvgInput(rawSvg);

    if (!rawSvg.trim()) {
      setJsxOutput("");
      return;
    }

    // Replace HTML/SVG attributes with React camelCase attributes
    let jsx = rawSvg
      .replace(/class=/g, "className=")
      .replace(/stroke-width=/g, "strokeWidth=")
      .replace(/stroke-linecap=/g, "strokeLinecap=")
      .replace(/stroke-linejoin=/g, "strokeLinejoin=")
      .replace(/fill-rule=/g, "fillRule=")
      .replace(/clip-rule=/g, "clipRule=")
      .replace(/fill-opacity=/g, "fillOpacity=")
      .replace(/viewbox=/gi, "viewBox=")
      .replace(/<!--[\s\S]*?-->/g, ""); // Remove HTML comments

    // Optional: Wrap in a simple React component structure
    const finalJsx = `const MyIcon = (props) => (\n  ${jsx.trim()}\n);\n\nexport default MyIcon;`;
    
    setJsxOutput(finalJsx);
    setIsCopied(false);
  };

  const copyToClipboard = () => {
    if (!jsxOutput) return;
    navigator.clipboard.writeText(jsxOutput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="w-full min-h-dvh pt-32 pb-24 bg-[#030712] font-jakarta text-white relative">

      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#3b82f6] transition-colors font-bold text-sm tracking-wide"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-[12px] font-black text-[#3b82f6] uppercase tracking-[0.2em] m-0">
              Developer Tools
            </h2>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white m-0 tracking-tighter mb-4">
            SVG to React Converter
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Paste your raw SVG code on the left, and instantly get a clean, ready-to-use React functional component on the right.
          </p>
        </div>

        {/* Converter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Input Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Raw SVG Code</label>
            </div>
            <textarea
              value={svgInput}
              onChange={handleConvert}
              placeholder='<svg viewBox="0 0 24 24">...</svg>'
              className="w-full h-[500px] bg-[#0a0f1c] border border-white/5 rounded-2xl p-6 text-slate-300 font-mono text-sm leading-relaxed focus:outline-none focus:border-[#3b82f6] transition-colors resize-none shadow-xl"
            />
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-3 relative">
            <div className="flex items-center justify-between px-2">
              <label className="text-xs font-bold text-[#3b82f6] uppercase tracking-wider">React JSX Output</label>
              <button
                onClick={copyToClipboard}
                disabled={!jsxOutput}
                className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full transition-colors disabled:opacity-50"
              >
                {isCopied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {isCopied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <textarea
              value={jsxOutput}
              readOnly
              placeholder="Your React component will appear here..."
              className="w-full h-[500px] bg-[#070b14] border border-[#3b82f6]/20 rounded-2xl p-6 text-blue-300 font-mono text-sm leading-relaxed focus:outline-none resize-none shadow-[0_0_30px_rgba(37,99,235,0.05)]"
            />
            
            {/* Arrow connecting the two boxes (Visible only on desktop) */}
            <div className="hidden lg:flex absolute top-1/2 -left-3 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#3b82f6] rounded-full items-center justify-center shadow-lg border-4 border-[#030712] z-10">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}