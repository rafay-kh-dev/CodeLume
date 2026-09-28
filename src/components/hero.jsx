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

// 1. ELASTIC SPIDER WEB + HIGHLY REALISTIC SPIDER PHYSICS
const SpiderWebNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let nodesArray = [];
    let realisticSpider;

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

    // --- HIGHLY REALISTIC PROCEDURAL SPIDER ---
    class RealisticSpider {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.legPhase = 0;
        this.speed = 0;
        this.radius = 220; // How far the web stretches under its weight
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
          let targetAngle = Math.atan2(dy, dx);
          let angleDiff = targetAngle - this.angle;

          // Smooth rotation logic
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          this.angle += angleDiff * 0.08;

          // Forward movement (slows down when turning sharply)
          let forwardThrust = Math.max(0, Math.cos(angleDiff));
          let maxSpeed = 3.5 * forwardThrust;

          this.speed += (maxSpeed - this.speed) * 0.1;
          this.vx = Math.cos(this.angle) * this.speed;
          this.vy = Math.sin(this.angle) * this.speed;

          this.x += this.vx;
          this.y += this.vy;

          // Link leg movement speed directly to body speed
          this.legPhase += this.speed * 0.15;
        } else {
          this.speed *= 0.8; // Decelerate smoothly
          this.legPhase += this.speed * 0.15;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Realistic Drop Shadow for Depth
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;

        // --- 1. DRAW ARTICULATED LEGS (Under the body) ---
        // Angles are relative to the body facing Right (0 radians)
        const legConfig = [
          { baseX: 4, baseY: 4, len: 45, ang: Math.PI / 4, bend: 1 }, // Front Right
          { baseX: 2, baseY: 6, len: 40, ang: Math.PI / 2 - 0.2, bend: 1 }, // Mid-Front Right
          { baseX: -2, baseY: 6, len: 40, ang: Math.PI / 2 + 0.4, bend: 1 }, // Mid-Back Right
          { baseX: -6, baseY: 4, len: 50, ang: (Math.PI * 3) / 4, bend: 1 }, // Back Right

          { baseX: 4, baseY: -4, len: 45, ang: -Math.PI / 4, bend: -1 }, // Front Left
          { baseX: 2, baseY: -6, len: 40, ang: -Math.PI / 2 + 0.2, bend: -1 }, // Mid-Front Left
          { baseX: -2, baseY: -6, len: 40, ang: -Math.PI / 2 - 0.4, bend: -1 }, // Mid-Back Left
          { baseX: -6, baseY: -4, len: 50, ang: (-Math.PI * 3) / 4, bend: -1 }, // Back Left
        ];

        for (let i = 0; i < 8; i++) {
          let leg = legConfig[i];
          // Tetrapod gait: Alternating legs move together
          let isGroup1 = i === 0 || i === 2 || i === 5 || i === 7;
          let phase = this.legPhase + (isGroup1 ? 0 : Math.PI);

          let swing = Math.sin(phase) * 0.45; // Back and forth movement
          let lift = Math.cos(phase); // Up and down movement

          // Calculate where the foot lands
          let currentAng = leg.ang + swing;
          let footX = leg.baseX + Math.cos(currentAng) * leg.len;
          let footY = leg.baseY + Math.sin(currentAng) * leg.len;

          // Calculate the Knee Joint (bends outwards and lifts up)
          let kneeBendAmount = 15 + (lift > 0 ? lift * 12 : 0);
          let midX = (leg.baseX + footX) / 2;
          let midY = (leg.baseY + footY) / 2;
          let kneeX =
            midX +
            Math.cos(currentAng - (Math.PI / 2) * leg.bend) * kneeBendAmount;
          let kneeY =
            midY +
            Math.sin(currentAng - (Math.PI / 2) * leg.bend) * kneeBendAmount;

          // Draw Femur (Thick upper leg)
          ctx.beginPath();
          ctx.moveTo(leg.baseX, leg.baseY);
          ctx.lineTo(kneeX, kneeY);
          ctx.strokeStyle = "#0f172a";
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.stroke();

          // Draw Tibia/Tarsus (Thinner lower leg)
          ctx.beginPath();
          ctx.moveTo(kneeX, kneeY);
          ctx.lineTo(footX, footY);
          ctx.strokeStyle = "#1e3a8a";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // --- 2. DRAW THE REALISTIC BODY ---
        // Abdomen (Large back section) with 3D Radial Gradient
        let abGrad = ctx.createRadialGradient(-15, 0, 2, -15, 0, 16);
        abGrad.addColorStop(0, "#3b82f6"); // Premium Navy highlight
        abGrad.addColorStop(0.6, "#1e3a8a");
        abGrad.addColorStop(1, "#020617"); // Dark shadow edge

        ctx.beginPath();
        ctx.ellipse(-15, 0, 17, 12, 0, 0, Math.PI * 2);
        ctx.fillStyle = abGrad;
        ctx.fill();

        // Cephalothorax (Head/Chest) with 3D Gradient
        let headGrad = ctx.createRadialGradient(2, 0, 1, 2, 0, 9);
        headGrad.addColorStop(0, "#60a5fa");
        headGrad.addColorStop(1, "#0f172a");

        ctx.beginPath();
        ctx.ellipse(3, 0, 9, 8, 0, 0, Math.PI * 2);
        ctx.fillStyle = headGrad;
        ctx.fill();

        // Pedipalps (Front feelers/fangs)
        ctx.beginPath();
        ctx.moveTo(10, -2);
        ctx.lineTo(16, -5);
        ctx.moveTo(10, 2);
        ctx.lineTo(16, 5);
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // --- 3. GLOWING CYBER EYES ---
        ctx.fillStyle = "#22d3ee"; // Cyan
        ctx.shadowColor = "#22d3ee";
        ctx.shadowBlur = 6;

        // Main front eyes
        ctx.beginPath();
        ctx.arc(9, -2, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(9, 2, 1.5, 0, Math.PI * 2);
        ctx.fill();
        // Side secondary eyes
        ctx.beginPath();
        ctx.arc(7, -4.5, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(7, 4.5, 1, 0, Math.PI * 2);
        ctx.fill();

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
        let forceX = (this.baseX - this.x) * 0.05;
        let forceY = (this.baseY - this.y) * 0.05;

        // Spider pulls the web under its weight
        if (realisticSpider) {
          let dx = realisticSpider.x - this.x;
          let dy = realisticSpider.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < realisticSpider.radius) {
            let pullForce =
              (realisticSpider.radius - distance) / realisticSpider.radius;
            // Web stretches towards the spider's center of mass
            forceX += (dx / distance) * pullForce * 2.5;
            forceY += (dy / distance) * pullForce * 2.5;
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
        ctx.fillStyle = "rgba(59, 130, 246, 0.8)";
        ctx.fill();
      }
    }

    const init = () => {
      nodesArray = [];
      realisticSpider = new RealisticSpider(
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

      realisticSpider.update();

      for (let i = 0; i < nodesArray.length; i++) {
        nodesArray[i].update();
        nodesArray[i].draw();
      }

      // Draw Web Threads
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
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        }
      }

      // Draw Spider on top
      realisticSpider.draw();
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

      {/* Physics Web and Realistic Spider */}
      <SpiderWebNetwork />

      {/* Ambient Static Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-gradient-to-b from-blue-600/20 via-indigo-500/10 to-transparent blur-[110px] pointer-events-none rounded-full transform-gpu" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full transform-gpu" />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 my-auto">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-[2.4rem] sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.12] mb-6 select-none cursor-default">
            <span className="text-white block">Lead Your Industry With</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(37,99,235,0.35)] block py-2">
              Next-Generation
            </span>
            <span className="text-white block">Optimised Web Solutions.</span>
          </h2>

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
