import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles, Webhook } from "lucide-react";
import {
  SiReact,
  SiLaravel,
  SiAngular,
  SiWordpress,
  SiShopify,
  SiWebflow,
  SiNodedotjs,
} from "react-icons/si";

// 1. ELASTIC SPIDER WEB NETWORK (Physics-Based Net)
const SpiderWebNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let nodesArray = [];

    // Mouse properties
    let mouse = {
      x: null,
      y: null,
      radius: 180, // How far the web stretches towards the mouse
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", handleResize);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Node {
      constructor(x, y) {
        this.baseX = x; // Original anchor point
        this.baseY = y;
        this.x = x; // Current stretching point
        this.y = y;
        this.vx = 0; // Velocity X
        this.vy = 0; // Velocity Y
        this.size = 1.5;
      }

      update() {
        // 1. Spring Physics (Pull back to original position)
        let forceX = (this.baseX - this.x) * 0.05; // Spring constant
        let forceY = (this.baseY - this.y) * 0.05;

        // 2. Mouse Pull (Stretch towards cursor)
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            let pullForce = (mouse.radius - distance) / mouse.radius;
            // The closer the mouse, the stronger the pull
            forceX += (dx / distance) * pullForce * 1.5;
            forceY += (dy / distance) * pullForce * 1.5;
          }
        }

        // Apply forces to velocity
        this.vx += forceX;
        this.vy += forceY;

        // Add friction so it doesn't bounce forever
        this.vx *= 0.85;
        this.vy *= 0.85;

        // Update actual position
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(56, 189, 248, 0.8)"; // Cyan dots
        ctx.fill();
      }
    }

    const init = () => {
      nodesArray = [];
      // Create a uniform grid of nodes to form a structured web/net
      let spacing = 90; // Distance between nodes
      let cols = Math.floor(window.innerWidth / spacing);
      let rows = Math.floor(window.innerHeight / spacing);

      // Calculate offsets to center the grid
      let offsetX = (window.innerWidth - cols * spacing) / 2;
      let offsetY = (window.innerHeight - rows * spacing) / 2;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          // Add a slight random jitter so it looks organic, not perfectly square
          let jitterX = (Math.random() - 0.5) * 40;
          let jitterY = (Math.random() - 0.5) * 40;

          let x = i * spacing + offsetX + jitterX;
          let y = j * spacing + offsetY + jitterY;

          nodesArray.push(new Node(x, y));
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update node positions based on physics
      for (let i = 0; i < nodesArray.length; i++) {
        nodesArray[i].update();
        nodesArray[i].draw();
      }

      // Draw the Web (Connect nearby nodes)
      ctx.lineWidth = 1;
      for (let a = 0; a < nodesArray.length; a++) {
        for (let b = a + 1; b < nodesArray.length; b++) {
          let pA = nodesArray[a];
          let pB = nodesArray[b];

          // Calculate distance between the two stretching nodes
          let dx = pA.x - pB.x;
          let dy = pA.y - pB.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          // If they are close enough, draw a web thread
          if (distance < 130) {
            let opacity = 1 - distance / 130;
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.4})`; // Cyan threads
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        }
      }
    };

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-80"
    />
  );
};

// 2. MAIN HERO SECTION
export default function HeroSection() {
  const techStack = [
    { name: "MERN Stack", Icon: SiReact },
    { name: "PHP / Laravel", Icon: SiLaravel },
    { name: "Angular", Icon: SiAngular },
    { name: "Custom APIs", Icon: Webhook },
    { name: "WordPress", Icon: SiWordpress },
    { name: "Shopify", Icon: SiShopify },
    { name: "Webflow", Icon: SiWebflow },
    { name: "Node.js Architecture", Icon: SiNodedotjs },
  ];

  return (
    <section className="relative w-full h-dvh max-h-dvh flex flex-col justify-between overflow-hidden bg-[#030712] font-jakarta">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #030712; }
          ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
          @keyframes marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
          .animate-marquee { animation: marquee 35s linear infinite; will-change: transform; }
        `}
      </style>

      {/* Physics Elastic Spider Web Network */}
      <SpiderWebNetwork />

      {/* Ambient Static Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-gradient-to-b from-blue-600/15 via-cyan-500/5 to-transparent blur-[110px] pointer-events-none rounded-full transform-gpu" />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 my-auto">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-[2.4rem] sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.12] mb-6 select-none cursor-default">
            <span className="text-white block">Lead Your Industry With</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(37,99,235,0.35)] block py-2">
              Next-Generation
            </span>
            <span className="text-white block">Optimised Web Solutions.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed max-w-3xl font-medium tracking-wide pointer-events-none">
            We engineer lightning-fast digital experiences designed to boost
            conversion rates, scale customer acquisition, and maximise revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto relative z-20">
            <Link
              to="/start-project"
              className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-b from-blue-500 to-cyan-600 text-white shadow-[0_0_35px_-8px_rgba(6,182,212,0.6)] hover:shadow-[0_0_50px_-10px_rgba(6,182,212,0.8)] border border-cyan-400/30 transition-all duration-300 active:scale-[0.98] outline-none overflow-hidden transform-gpu"
            >
              <Sparkles className="w-5 h-5 text-cyan-100 relative z-10" />
              <span className="text-[16px] font-bold relative z-10 tracking-wide text-white">
                Initialise Project
              </span>
            </Link>

            <Link
              to="/services"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-xl bg-[#ffffff08] hover:bg-[#ffffff12] text-slate-300 hover:text-white shadow-lg border border-white/10 transition-all duration-300 active:scale-[0.98] backdrop-blur-xl outline-none transform-gpu"
            >
              <span className="text-[16px] font-semibold tracking-wide">
                View All Services
              </span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-slate-400 group-hover:text-white transform-gpu" />
            </Link>
          </div>
        </div>
      </div>

      <div
        className="w-full h-14 bg-[#030712]/90 backdrop-blur-xl overflow-hidden flex items-center z-30 border-t border-white/[0.04] shrink-0 transform-gpu relative z-30"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <div className="flex whitespace-nowrap animate-marquee items-center h-full">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 sm:gap-16 px-8">
              {techStack.map((tech, index) => {
                const IconComponent = tech.Icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    <IconComponent className="w-4 h-4 fill-current" />
                    <span className="text-[11px] font-bold tracking-[0.18em] uppercase">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
