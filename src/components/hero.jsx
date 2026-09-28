import React, { useEffect, useRef, useState } from "react";
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

// 1. ULTRA-SMOOTH ELASTIC WEB & REALISTIC SPIDER
const SpiderWebNetwork = () => {
  const canvasRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let nodesArray = [];
    let smoothSpider;

    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleResize = () => {
      const desktopCheck = window.innerWidth > 768;
      setIsDesktop(desktopCheck);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // --- SMOOTH PROCEDURAL SPIDER LEG ---
    class SmoothLeg {
      constructor(offsetX, offsetY, reach, angleOffset, isLeft) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.reach = reach;
        this.angleOffset = angleOffset;
        this.isLeft = isLeft;

        this.footX = 0;
        this.footY = 0;
        this.oldFootX = 0;
        this.oldFootY = 0;
        this.stepProgress = 1; // 1 means foot is on the ground
      }

      update(bodyX, bodyY, bodyAngle, bodySpeed) {
        let idealAngle = bodyAngle + this.angleOffset;
        let idealX = bodyX + Math.cos(idealAngle) * this.reach;
        let idealY = bodyY + Math.sin(idealAngle) * this.reach;

        let distFromIdeal = Math.hypot(
          this.footX - idealX,
          this.footY - idealY,
        );

        // If foot is on ground but stretched too far -> Take a step
        if (this.stepProgress >= 1 && distFromIdeal > this.reach * 0.5) {
          this.stepProgress = 0;
          this.oldFootX = this.footX;
          this.oldFootY = this.footY;

          // Predict where the body will be so the step is natural
          this.targetFootX = idealX + Math.cos(bodyAngle) * (this.reach * 0.3);
          this.targetFootY = idealY + Math.sin(bodyAngle) * (this.reach * 0.3);
        }

        // Animate the step
        if (this.stepProgress < 1) {
          // Adjust step speed based on how fast body is moving
          let stepSpeed = Math.max(0.1, bodySpeed * 0.05);
          this.stepProgress += stepSpeed;

          if (this.stepProgress >= 1) {
            this.stepProgress = 1;
            this.footX = this.targetFootX;
            this.footY = this.targetFootY;
          } else {
            // Smooth easing
            let ease = 1 - Math.pow(1 - this.stepProgress, 3);
            this.footX =
              this.oldFootX + (this.targetFootX - this.oldFootX) * ease;
            this.footY =
              this.oldFootY + (this.targetFootY - this.oldFootY) * ease;
          }
        }
      }

      draw(bodyX, bodyY, bodyAngle) {
        // Joint position on the spider's body
        let jointX =
          bodyX +
          Math.cos(bodyAngle) * this.offsetX -
          Math.sin(bodyAngle) * this.offsetY;
        let jointY =
          bodyY +
          Math.sin(bodyAngle) * this.offsetX +
          Math.cos(bodyAngle) * this.offsetY;

        // Midpoint for the knee
        let midX = (jointX + this.footX) / 2;
        let midY = (jointY + this.footY) / 2;

        let dx = this.footX - jointX;
        let dy = this.footY - jointY;
        let perpAngle =
          Math.atan2(dy, dx) + (this.isLeft ? -Math.PI / 2 : Math.PI / 2);

        // Knee bends outwards and lifts when stepping
        let lift =
          this.stepProgress < 1
            ? Math.sin(this.stepProgress * Math.PI) * 20
            : 0;
        let kneeBend = 20 - Math.hypot(dx, dy) * 0.1;

        let kneeX =
          midX + Math.cos(perpAngle) * kneeBend - Math.cos(bodyAngle) * lift;
        let kneeY =
          midY + Math.sin(perpAngle) * kneeBend - Math.sin(bodyAngle) * lift;

        // Draw shadow only when leg is lifted
        if (lift > 0) {
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.shadowBlur = lift;
          ctx.shadowOffsetY = lift * 0.5;
        }

        // Draw Femur (Thick part)
        ctx.beginPath();
        ctx.moveTo(jointX, jointY);
        ctx.lineTo(kneeX, kneeY);
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw Tibia (Thin part)
        ctx.beginPath();
        ctx.moveTo(kneeX, kneeY);
        ctx.lineTo(this.footX, this.footY);
        ctx.strokeStyle = "#1e3a8a";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.shadowColor = "transparent"; // Reset shadow
      }
    }

    // --- CYBER SPIDER BODY ---
    class SmoothSpider {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.radius = 200; // Web pull radius
        this.speed = 0;

        // offsetX, offsetY, reach, angleOffset, isLeft
        this.legs = [
          new SmoothLeg(6, 6, 50, Math.PI / 4, false),
          new SmoothLeg(0, 7, 45, Math.PI / 2, false),
          new SmoothLeg(-6, 7, 45, Math.PI * 0.75, false),
          new SmoothLeg(-12, 5, 55, Math.PI * 0.9, false),

          new SmoothLeg(6, -6, 50, -Math.PI / 4, true),
          new SmoothLeg(0, -7, 45, -Math.PI / 2, true),
          new SmoothLeg(-6, -7, 45, -Math.PI * 0.75, true),
          new SmoothLeg(-12, -5, 55, -Math.PI * 0.9, true),
        ];

        // Initialize leg positions
        for (let leg of this.legs) {
          leg.footX =
            this.x + Math.cos(this.angle + leg.angleOffset) * leg.reach;
          leg.footY =
            this.y + Math.sin(this.angle + leg.angleOffset) * leg.reach;
        }
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.hypot(dx, dy);

        if (distance > 5) {
          let targetAngle = Math.atan2(dy, dx);
          let angleDiff = targetAngle - this.angle;

          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          this.angle += angleDiff * 0.08;

          let forwardSpeed = Math.max(0, Math.cos(angleDiff)) * 4;
          this.speed += (forwardSpeed - this.speed) * 0.1;

          this.vx = Math.cos(this.angle) * this.speed;
          this.vy = Math.sin(this.angle) * this.speed;

          this.x += this.vx;
          this.y += this.vy;
        } else {
          this.speed *= 0.8; // Smooth stop
        }

        // Stagger leg updates so they don't all step at once
        for (let i = 0; i < this.legs.length; i++) {
          // Allow step if alternating leg is planted
          let oppositeLegIndex = (i + 4) % 8;
          if (
            this.legs[oppositeLegIndex].stepProgress > 0.5 ||
            this.speed < 0.5
          ) {
            this.legs[i].update(this.x, this.y, this.angle, this.speed);
          }
        }
      }

      draw() {
        for (let leg of this.legs) leg.draw(this.x, this.y, this.angle);

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Body Shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 4;

        // Abdomen
        let abGrad = ctx.createRadialGradient(-10, 0, 0, -10, 0, 15);
        abGrad.addColorStop(0, "#60a5fa"); // Shiny top
        abGrad.addColorStop(0.5, "#1e3a8a");
        abGrad.addColorStop(1, "#020617"); // Dark edges

        ctx.beginPath();
        ctx.ellipse(-12, 0, 16, 11, 0, 0, Math.PI * 2);
        ctx.fillStyle = abGrad;
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.ellipse(3, 0, 8, 7, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#0f172a";
        ctx.fill();

        // Glowing Eyes
        ctx.fillStyle = "#22d3ee";
        ctx.shadowColor = "#22d3ee";
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(8, -2, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(8, 2, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // --- ELASTIC WEB NODES CLASS ---
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

        // Desktop: Web stretches towards Spider. Mobile: Web stretches towards Mouse.
        let target =
          window.innerWidth > 768 && smoothSpider ? smoothSpider : mouse;
        let radius = window.innerWidth > 768 ? 220 : 150;

        if (target.x !== null) {
          let dx = target.x - this.x;
          let dy = target.y - this.y;
          // Performance Optimization: Fast skip square root if too far
          if (Math.abs(dx) < radius && Math.abs(dy) < radius) {
            let distance = Math.hypot(dx, dy);
            if (distance < radius) {
              let pullForce = (radius - distance) / radius;
              forceX += (dx / distance) * pullForce * 2.5;
              forceY += (dy / distance) * pullForce * 2.5;
            }
          }
        }

        this.vx += forceX;
        this.vy += forceY;
        this.vx *= 0.8; // Friction
        this.vy *= 0.8;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(59, 130, 246, 0.7)";
        ctx.fill();
      }
    }

    const init = () => {
      nodesArray = [];

      // Optimization: Increase spacing for fewer nodes (prevents lag)
      let spacing = window.innerWidth > 768 ? 95 : 120;
      let cols = Math.floor(window.innerWidth / spacing) + 1;
      let rows = Math.floor(window.innerHeight / spacing) + 1;

      let offsetX = (window.innerWidth - cols * spacing) / 2;
      let offsetY = (window.innerHeight - rows * spacing) / 2;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          let jitterX = (Math.random() - 0.5) * 30;
          let jitterY = (Math.random() - 0.5) * 30;
          nodesArray.push(
            new Node(
              i * spacing + offsetX + jitterX,
              j * spacing + offsetY + jitterY,
            ),
          );
        }
      }

      if (window.innerWidth > 768) {
        smoothSpider = new SmoothSpider(
          window.innerWidth / 2,
          window.innerHeight / 2,
        );
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // 1. Update and Draw Nodes
      for (let i = 0; i < nodesArray.length; i++) {
        nodesArray[i].update();
        nodesArray[i].draw();
      }

      // 2. Draw Web Threads (Highly Optimized Loop)
      ctx.lineWidth = 1;
      let connectionDistance = window.innerWidth > 768 ? 140 : 160;

      for (let a = 0; a < nodesArray.length; a++) {
        for (let b = a + 1; b < nodesArray.length; b++) {
          let dx = nodesArray[a].x - nodesArray[b].x;
          // Fast fail to save math operations (fixes lag)
          if (Math.abs(dx) > connectionDistance) continue;

          let dy = nodesArray[a].y - nodesArray[b].y;
          if (Math.abs(dy) > connectionDistance) continue;

          let distanceSq = dx * dx + dy * dy;
          if (distanceSq < connectionDistance * connectionDistance) {
            let opacity = 1 - Math.sqrt(distanceSq) / connectionDistance;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(nodesArray[a].x, nodesArray[a].y);
            ctx.lineTo(nodesArray[b].x, nodesArray[b].y);
            ctx.stroke();
          }
        }
      }

      // 3. Update & Draw Spider ONLY ON DESKTOP
      if (window.innerWidth > 768 && smoothSpider) {
        smoothSpider.update();
        smoothSpider.draw();
      }
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

      {/* Spider Web (Spider only shows on Desktop) */}
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
