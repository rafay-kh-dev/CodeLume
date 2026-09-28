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

// 1. ELASTIC SPIDER WEB + CYBER SPIDER PHYSICS
const SpiderWebNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let nodesArray = [];
    let cyberSpider;

    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // --- CYBER SPIDER CLASS ---
    class CyberSpider {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.legPhase = 0;
        this.radius = 160; // Kitni door tak jaala iski taraf khinchega
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 2) {
          this.angle = Math.atan2(dy, dx);

          // Smooth chasing physics
          this.vx = dx * 0.05;
          this.vy = dy * 0.05;

          this.x += this.vx;
          this.y += this.vy;

          // Walking animation speed based on movement velocity
          this.legPhase +=
            Math.sqrt(this.vx * this.vx + this.vy * this.vy) * 0.25;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = "#3b82f6"; // Navy Blue Theme
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 1.5;

        // Spider Abdomen (Peeche wala hissa)
        ctx.beginPath();
        ctx.ellipse(-4, 0, 7, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Spider Head
        ctx.beginPath();
        ctx.arc(4, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        // Spider Legs Physics
        const legBases = [
          { x: 3, y: 2 },
          { x: 1, y: 3 },
          { x: -1, y: 3 },
          { x: -3, y: 2 },
        ];

        for (let i = 0; i < 4; i++) {
          let base = legBases[i];
          let phaseOffset = i * (Math.PI / 2);

          // Right legs
          let swingR = Math.sin(this.legPhase + phaseOffset);
          ctx.beginPath();
          ctx.moveTo(base.x, base.y);
          ctx.lineTo(base.x + 3 + swingR * 3, base.y + 7); // Knee
          ctx.lineTo(base.x - 2 + swingR * 5, base.y + 14); // Foot
          ctx.stroke();

          // Left legs
          let swingL = Math.sin(this.legPhase + phaseOffset + Math.PI);
          ctx.beginPath();
          ctx.moveTo(base.x, -base.y);
          ctx.lineTo(base.x + 3 + swingL * 3, -base.y - 7);
          ctx.lineTo(base.x - 2 + swingL * 5, -base.y - 14);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    // --- WEB NODES CLASS ---
    class Node {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.size = 1.5;
      }

      update() {
        // 1. Spring Physics (Pull back to original)
        let forceX = (this.baseX - this.x) * 0.05;
        let forceY = (this.baseY - this.y) * 0.05;

        // 2. Spider Pull (Jaala Spider ki taraf khinchega, cursor ki taraf nahi)
        if (cyberSpider) {
          let dx = cyberSpider.x - this.x;
          let dy = cyberSpider.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < cyberSpider.radius) {
            let pullForce =
              (cyberSpider.radius - distance) / cyberSpider.radius;
            forceX += (dx / distance) * pullForce * 2.2;
            forceY += (dy / distance) * pullForce * 2.2;
          }
        }

        this.vx += forceX;
        this.vy += forceY;

        this.vx *= 0.82; // Friction
        this.vy *= 0.82;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(59, 130, 246, 0.8)"; // Original Blue theme
        ctx.fill();
      }
    }

    const init = () => {
      nodesArray = [];
      cyberSpider = new CyberSpider(
        window.innerWidth / 2,
        window.innerHeight / 2,
      );

      let spacing = 90;
      let cols = Math.floor(window.innerWidth / spacing);
      let rows = Math.floor(window.innerHeight / spacing);

      let offsetX = (window.innerWidth - cols * spacing) / 2;
      let offsetY = (window.innerHeight - rows * spacing) / 2;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
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

      // Update & Draw Spider First
      cyberSpider.update();

      // Update Nodes
      for (let i = 0; i < nodesArray.length; i++) {
        nodesArray[i].update();
        nodesArray[i].draw();
      }

      // Draw Web Threads (Original Navy Blue Theme)
      ctx.lineWidth = 1.2;
      for (let a = 0; a < nodesArray.length; a++) {
        for (let b = a + 1; b < nodesArray.length; b++) {
          let pA = nodesArray[a];
          let pB = nodesArray[b];

          let dx = pA.x - pB.x;
          let dy = pA.y - pB.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            let opacity = 1 - distance / 130;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.4})`; // Navy blue color
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        }
      }

      // Draw Spider on top of the web
      cyberSpider.draw();
    };

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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

// 2. MAIN HERO SECTION (Colors reverted to original Luxury MERN style)
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

      {/* Spider Web Network with Cyber Spider */}
      <SpiderWebNetwork />

      {/* Ambient Static Glow Effects (Back to original colors) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-gradient-to-b from-blue-600/20 via-indigo-500/10 to-transparent blur-[110px] pointer-events-none rounded-full transform-gpu" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full transform-gpu" />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 my-auto">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-[2.4rem] sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.12] mb-6 select-none cursor-default">
            <span className="text-white block">Lead Your Industry With</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(37,99,235,0.35)] block py-2">
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
              className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_0_35px_-8px_rgba(37,99,235,0.6)] hover:shadow-[0_0_50px_-10px_rgba(37,99,235,0.8)] border border-blue-400/30 transition-all duration-300 active:scale-[0.98] outline-none overflow-hidden transform-gpu"
            >
              <Sparkles className="w-5 h-5 text-blue-100 relative z-10" />
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
                    className="flex items-center gap-2.5 text-slate-400 hover:text-blue-400 transition-colors duration-300"
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
