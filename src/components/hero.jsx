import React, { useState, useEffect, useRef } from "react";
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

// 1. CYBERPUNK TEXT SCRAMBLER
const CyberpunkText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()<>-_\\/[]{}";

  const handleMouseEnter = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join(""),
      );
      if (iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className={`${className} cursor-crosshair transition-all duration-300`}
    >
      {displayText}
    </span>
  );
};

// 2. BACKGROUND PARTICLE NETWORK
const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particlesArray = [];

    let mouse = { x: null, y: null, radius: 120 };

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

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0)
          this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0)
          this.directionY = -this.directionY;

        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 5;
            this.y -= forceDirectionY * force * 5;
          }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x =
          Math.random() * (window.innerWidth - size * 2 - size * 2) + size * 2;
        let y =
          Math.random() * (window.innerHeight - size * 2 - size * 2) + size * 2;
        let directionX = Math.random() * 1.5 - 0.75;
        let directionY = Math.random() * 1.5 - 0.75;
        particlesArray.push(
          new Particle(x, y, directionX, directionY, size, "#3b82f6"),
        );
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particlesArray.length; i++)
        particlesArray[i].update();

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distanceSq = dx * dx + dy * dy;
          if (distanceSq < 12000) {
            let opacityValue = 1 - distanceSq / 12000;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
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
      className="absolute inset-0 z-0 pointer-events-none opacity-60"
    />
  );
};

// 3. THE HANGING SCROLL-LINKED SPIDER (The Masterpiece)
const HangingScrollSpider = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable on Mobile
    if (window.innerWidth <= 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Physics Variables
    let scrollY = window.scrollY;

    // Spider position config
    const spiderX = window.innerWidth * 0.12; // 12% from the left edge
    let currentY = -100; // Starts off-screen (top)
    let velocityY = 0;
    let time = 0; // For leg wiggling

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    const drawSpider = (x, y, velocity) => {
      ctx.save();
      ctx.translate(x, y);

      // The spider is pointing downwards (Math.PI / 2)
      ctx.rotate(Math.PI / 2);

      // Draw the silk thread straight up
      ctx.beginPath();
      // Undo rotation math for the line to always go straight up the screen
      ctx.moveTo(-15, 0);
      // Line goes all the way to the top of the viewport
      ctx.lineTo(-y - 20, 0);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 2]); // Silky dashed look
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 15;
      ctx.shadowOffsetY = 5;

      // Air Drag Physics on Legs
      // If falling fast, legs point UP (negative drag). If still, legs wiggle gently.
      let dragOffset = Math.max(-1.2, Math.min(1.2, velocity * 0.05));
      let wiggle = Math.sin(time) * 0.15;

      // Draw 8 Dangling Legs
      const legAngles = [
        Math.PI * 0.2,
        Math.PI * 0.4,
        Math.PI * 0.6,
        Math.PI * 0.8,
        -Math.PI * 0.2,
        -Math.PI * 0.4,
        -Math.PI * 0.6,
        -Math.PI * 0.8,
      ];

      for (let i = 0; i < 8; i++) {
        let baseAngle = legAngles[i];
        let isLeft = i >= 4;

        // Add wiggle and aerodynamic drag
        let currentAngle =
          baseAngle +
          (isLeft ? -wiggle : wiggle) +
          (isLeft ? dragOffset : -dragOffset);

        // Leg joints
        let jointX = Math.cos(currentAngle) * 6;
        let jointY = Math.sin(currentAngle) * 6;

        let kneeX = jointX + Math.cos(currentAngle) * 20;
        let kneeY = jointY + Math.sin(currentAngle) * 20;

        // Feet tuck inwards slightly
        let footAngle = currentAngle + (isLeft ? 0.5 : -0.5);
        let footX = kneeX + Math.cos(footAngle) * 22;
        let footY = kneeY + Math.sin(footAngle) * 22;

        ctx.beginPath();
        ctx.moveTo(jointX, jointY);
        ctx.lineTo(kneeX, kneeY);
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(kneeX, kneeY);
        ctx.lineTo(footX, footY);
        ctx.strokeStyle = "#1e3a8a";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.shadowColor = "transparent";

      // Abdomen (Rear, connected to thread)
      let abGrad = ctx.createRadialGradient(-10, 0, 0, -10, 0, 15);
      abGrad.addColorStop(0, "#3b82f6");
      abGrad.addColorStop(0.7, "#1e3a8a");
      abGrad.addColorStop(1, "#020617");

      ctx.beginPath();
      ctx.ellipse(-12, 0, 15, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = abGrad;
      ctx.fill();

      // Head (Pointing down)
      ctx.beginPath();
      ctx.ellipse(2, 0, 7, 6, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#0f172a";
      ctx.fill();

      // Glowing Cyan Eyes
      ctx.fillStyle = "#22d3ee";
      ctx.shadowColor = "#22d3ee";
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(6, -2, 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(6, 2, 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Spring Physics for Scroll
      // Base resting position is 150px from top. Scrolling adds to it.
      let targetY = 150 + scrollY * 0.7;

      // Calculate spring force
      let force = (targetY - currentY) * 0.08; // Spring stiffness
      velocityY += force;
      velocityY *= 0.85; // Friction/Damping - lower means more bouncy!
      currentY += velocityY;

      time += 0.05; // Advance time for leg wiggling

      drawSpider(spiderX, currentY, velocityY);
    };

    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 hidden md:block"
    />
  );
};

// 4. MAIN HERO SECTION
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

      {/* 1. Base Particles (Background) */}
      <ParticleNetwork />

      {/* 2. The Hanging Parallax Spider (Foreground Overlay, Desktop Only) */}
      <HangingScrollSpider />

      {/* Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-gradient-to-b from-blue-600/20 via-indigo-500/10 to-transparent blur-[110px] pointer-events-none rounded-full transform-gpu" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full transform-gpu" />

      {/* Dot Matrix Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none transform-gpu"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 my-auto">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-[2.4rem] sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.12] mb-6 select-none cursor-default">
            <span className="text-white block">Lead Your Industry With</span>
            {/* Cyberpunk Text Scrambler on Hover */}
            <CyberpunkText
              text="Next-Generation"
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(37,99,235,0.35)] block py-2"
            />
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
