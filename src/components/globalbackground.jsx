import React from "react";

export default function GlobalBackground() {
  return (
    // covers whole screen and stays behind everything (z-[-1])
    <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden bg-[#030712] pointer-events-none">
      <style>
        {`
          /* Extremely fast, dramatic animation for a definitive test */
          @keyframes dramaticGlow {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(150px, -200px) scale(1.3); }
            66% { transform: translate(-150px, 150px) scale(0.7); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-test-1 { animation: dramaticGlow 8s ease-in-out infinite; }
          .animate-test-2 { animation: dramaticGlow 10s ease-in-out infinite reverse; }
          .animate-test-3 { animation: dramaticGlow 12s ease-in-out infinite 1s; }
        `}
      </style>

      {/* 1. EXTREMELY BRIGHT Blue Glow */}
      <div className="absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] min-w-[550px] min-h-[550px] bg-blue-500/80 blur-[80px] rounded-full animate-test-1 mix-blend-screen" />
      
      {/* 2. EXTREMELY BRIGHT Purple Glow */}
      <div className="absolute bottom-[-5%] right-[-5%] w-[55vw] h-[55vw] min-w-[650px] min-h-[650px] bg-purple-600/80 blur-[100px] rounded-full animate-test-2 mix-blend-screen" />
      
      {/* 3. EXTREMELY BRIGHT Cyan Glow */}
      <div className="absolute top-[25%] left-[35%] w-[35vw] h-[35vw] min-w-[450px] min-h-[450px] bg-cyan-500/50 blur-[110px] rounded-full animate-test-3 mix-blend-screen" />
    </div>
  );
}