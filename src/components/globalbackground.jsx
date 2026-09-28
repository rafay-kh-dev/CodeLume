import React from "react";

export default function GlobalBackground() {
  return (
    // Fixed inset-0 ensures it covers the whole screen and stays behind everything (z-[-1])
    <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden bg-[#030712] pointer-events-none">
      <style>
        {`
          /* Very slow and smooth drifting animation */
          @keyframes floatGlow {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.05); }
            66% { transform: translate(-30px, 30px) scale(0.95); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-float-1 { animation: floatGlow 18s ease-in-out infinite; }
          .animate-float-2 { animation: floatGlow 22s ease-in-out infinite reverse; }
          .animate-float-3 { animation: floatGlow 25s ease-in-out infinite 2s; }
        `}
      </style>

      {/* 1. Top Left Blue Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] min-w-[500px] min-h-[500px] bg-blue-700/10 blur-[120px] rounded-full animate-float-1 mix-blend-screen" />
      
      {/* 2. Bottom Right Indigo Glow */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] min-w-[600px] min-h-[600px] bg-indigo-700/10 blur-[140px] rounded-full animate-float-2 mix-blend-screen" />
      
      {/* 3. Center Subtle Cyan Glow */}
      <div className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] min-w-[400px] min-h-[400px] bg-cyan-700/5 blur-[150px] rounded-full animate-float-3 mix-blend-screen" />

      {/* Faint Tech Grid Texture (makes it look like a web engineering agency) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}