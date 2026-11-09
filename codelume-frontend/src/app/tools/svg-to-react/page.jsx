"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Copy, CheckCircle2, Code2 } from "lucide-react";

// Scroll-Triggered Typewriter Effect for Heading with Custom Alignment Support
const TypewriterHeading = ({ text, align = "text-center" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let typingInterval;
    let i = 0;

    const startTimeout = setTimeout(() => {
      setDisplayedText("");

      typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 45);
    }, 200);

    return () => {
      clearTimeout(startTimeout);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [hasStarted, text]);

  const lines = displayedText.split("\n");
  const fullLines = text.split("\n");

  const alignmentClass =
    align === "text-right"
      ? "justify-end"
      : align === "text-left"
        ? "justify-start"
        : "justify-center";
  const headingClasses = `text-4xl sm:text-5xl lg:text-[4rem] font-medium tracking-tight text-black leading-[1.05] select-none cursor-default w-full m-0 ${align}`;

  return (
    <div
      ref={headingRef}
      className={`min-h-[100px] sm:min-h-[140px] lg:min-h-[150px] flex items-center ${alignmentClass} mb-4 w-full relative`}
    >
      {/* INVISIBLE PLACEHOLDER */}
      <h2 className={`${headingClasses} opacity-0 pointer-events-none`}>
        {fullLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx !== fullLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>

      {/* VISIBLE TYPING TEXT */}
      <h2 className={`${headingClasses} absolute top-0 left-0 h-full`}>
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            <span className={idx === 1 ? "text-gray-400" : "text-black"}>
              {line}
            </span>
            {idx !== lines.length - 1 && <br />}
          </React.Fragment>
        ))}
        <span
          className="inline-block w-[3.5px] sm:w-[4px] h-[0.8em] ml-1.5 sm:ml-2 animate-[pulse_1s_ease-in-out_infinite] align-middle translate-y-[-4px] sm:translate-y-[-6px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, #4285F4, #34A853, #FBBC05, #EA4335)",
          }}
        ></span>
      </h2>
    </div>
  );
};

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
    <section className="w-full min-h-screen pt-24 sm:pt-32 pb-24 bg-white font-jakarta text-black relative overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }`}
      </style>

      {/* Subtle Top Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Split Layout: Left Button, Right Content */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 max-w-full gap-8">
          <div className="flex-shrink-0">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold text-[13px] tracking-wide bg-gray-50 hover:bg-gray-100 px-5 py-2.5 rounded-full border border-gray-200 outline-none active:scale-[0.98]"
            >
              <ArrowLeft size={16} /> Back to Tools
            </Link>
          </div>

          <div className="flex flex-col items-end text-right max-w-xl ml-auto">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 shadow-sm mb-6">
              {/* Using Google Blue (#4285F4) for React SVG Tool */}
              <Code2 className="w-4 h-4 text-[#4285F4]" />
              <h2 className="text-[11px] sm:text-[12px] font-extrabold text-gray-500 uppercase tracking-[0.2em] m-0">
                Developer Tools
              </h2>
            </div>

            <TypewriterHeading
              text={"SVG to React\nConverter"}
              align="text-right"
            />

            <p className="text-gray-500 text-[15px] sm:text-[17px] leading-relaxed max-w-lg font-medium m-0 mt-2">
              Paste your raw SVG code below, and instantly get a clean,
              ready-to-use React functional component.
            </p>
          </div>
        </div>

        {/* Converter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Input Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                Raw SVG Code
              </label>
            </div>
            <textarea
              value={svgInput}
              onChange={handleConvert}
              placeholder='<svg viewBox="0 0 24 24">...</svg>'
              className="w-full h-[500px] bg-white border border-gray-200 focus:border-[#4285F4] focus:ring-4 focus:ring-[#4285F4]/10 rounded-[24px] p-6 sm:p-8 text-black font-mono text-[14px] leading-relaxed outline-none transition-all duration-300 resize-none shadow-sm hover:shadow-md"
            />
          </div>

          {/* Output Section */}
          <div className="flex flex-col gap-4 relative">
            <div className="flex items-center justify-between px-2">
              <label className="text-[13px] font-bold text-[#4285F4] uppercase tracking-widest">
                React JSX Output
              </label>
              <button
                onClick={copyToClipboard}
                disabled={!jsxOutput}
                className="flex items-center gap-2 text-[12px] font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-black border border-gray-200 px-4 py-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none outline-none active:scale-[0.95]"
              >
                {isCopied ? (
                  <CheckCircle2 className="w-4 h-4 text-[#4285F4]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {isCopied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <textarea
              value={jsxOutput}
              readOnly
              placeholder="Your React component will appear here..."
              className="w-full h-[500px] bg-gray-50 border border-gray-200 rounded-[24px] p-6 sm:p-8 text-gray-700 font-mono text-[14px] leading-relaxed focus:outline-none resize-none shadow-inner"
            />

            {/* Connecting Arrow (Visible only on Desktop) */}
            <div className="hidden lg:flex absolute top-[55%] -left-5 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#4285F4] rounded-full items-center justify-center shadow-md border-4 border-white z-10 transition-transform hover:scale-110">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
