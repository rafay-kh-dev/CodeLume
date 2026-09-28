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

// 1. TRUE INVERSE KINEMATICS (IK) SPIDER & ELASTIC WEB
const SpiderWebNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let nodesArray = [];
    let ikSpider;

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
        this.isGrabbed = false; // Is a spider foot on this node?
      }

      update() {
        // Spring Physics (Pull back to original)
        let forceX = (this.baseX - this.x) * 0.05;
        let forceY = (this.baseY - this.y) * 0.05;

        // If a spider foot is grabbing this node, it pulls the node!
        if (this.isGrabbed && ikSpider) {
          let dx = ikSpider.x - this.x;
          let dy = ikSpider.y - this.y;
          forceX += dx * 0.03; // Drag the web towards the spider body
          forceY += dy * 0.03;
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
        ctx.fillStyle = "rgba(59, 130, 246, 0.6)";
        ctx.fill();
      }
    }

    // --- TRUE IK SPIDER LEG CLASS ---
    class SpiderLeg {
      constructor(offsetX, offsetY, reach, angleOffset) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.reach = reach;
        this.angleOffset = angleOffset;

        this.targetNode = null; // Which web node is this foot grabbing?
        this.oldX = 0;
        this.oldY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.stepProgress = 1; // 1 = fully planted on a node
      }

      update(bodyX, bodyY, bodyAngle) {
        // Calculate where the leg *wants* to be ideally
        let idealAngle = bodyAngle + this.angleOffset;
        let idealX = bodyX + Math.cos(idealAngle) * this.reach;
        let idealY = bodyY + Math.sin(idealAngle) * this.reach;

        // If planted, foot moves with the grabbed web node
        if (this.stepProgress >= 1 && this.targetNode) {
          this.currentX = this.targetNode.x;
          this.currentY = this.targetNode.y;

          // Check if foot is stretched too far from ideal position -> initiate step
          let distToIdeal = Math.hypot(
            this.currentX - idealX,
            this.currentY - idealY,
          );
          if (distToIdeal > this.reach * 0.75) {
            this.stepProgress = 0;
            this.oldX = this.currentX;
            this.oldY = this.currentY;
            if (this.targetNode) this.targetNode.isGrabbed = false;

            // Find the *nearest web node* to the new ideal position
            let nearest = null;
            let minDist = Infinity;
            for (let node of nodesArray) {
              let d = Math.hypot(node.x - idealX, node.y - idealY);
              if (d < minDist) {
                minDist = d;
                nearest = node;
              }
            }
            this.targetNode = nearest;
            if (this.targetNode) this.targetNode.isGrabbed = true;
          }
        }
        // If stepping, animate foot through the air
        else if (this.stepProgress < 1) {
          this.stepProgress += 0.12; // Speed of the step
          if (this.stepProgress >= 1) this.stepProgress = 1;

          if (this.targetNode) {
            // Linear interpolation between old foot position and new web node
            let targetX = this.targetNode.x;
            let targetY = this.targetNode.y;
            this.currentX =
              this.oldX + (targetX - this.oldX) * this.stepProgress;
            this.currentY =
              this.oldY + (targetY - this.oldY) * this.stepProgress;
          }
        }
      }

      draw(bodyX, bodyY, bodyAngle) {
        // Calculate joint/knee position based on IK
        let bodyAttachX =
          bodyX +
          Math.cos(bodyAngle) * this.offsetX -
          Math.sin(bodyAngle) * this.offsetY;
        let bodyAttachY =
          bodyY +
          Math.sin(bodyAngle) * this.offsetX +
          Math.cos(bodyAngle) * this.offsetY;

        let dx = this.currentX - bodyAttachX;
        let dy = this.currentY - bodyAttachY;
        let distance = Math.hypot(dx, dy);

        // Midpoint
        let midX = bodyAttachX + dx * 0.4;
        let midY = bodyAttachY + dy * 0.4;

        // Push knee out to the side
        let perpAngle =
          Math.atan2(dy, dx) - (this.offsetY > 0 ? Math.PI / 2 : -Math.PI / 2);

        // Calculate knee lift (higher when stepping)
        let lift = 0;
        if (this.stepProgress < 1) {
          lift = Math.sin(this.stepProgress * Math.PI) * 20;
        }

        let kneeX =
          midX +
          Math.cos(perpAngle) * (20 - distance * 0.1) -
          Math.cos(bodyAngle) * lift;
        let kneeY =
          midY +
          Math.sin(perpAngle) * (20 - distance * 0.1) -
          Math.sin(bodyAngle) * lift;

        // Shadow for depth
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
        ctx.shadowBlur = 5 + lift;
        ctx.shadowOffsetY = 2 + lift * 0.5;

        // Thigh
        ctx.beginPath();
        ctx.moveTo(bodyAttachX, bodyAttachY);
        ctx.lineTo(kneeX, kneeY);
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";
        ctx.stroke();

        // Shin (down to the web node)
        ctx.beginPath();
        ctx.moveTo(kneeX, kneeY);
        ctx.lineTo(this.currentX, this.currentY);
        ctx.strokeStyle = "#1e3a8a"; // Navy
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.shadowColor = "transparent"; // Reset
      }
    }

    // --- CYBER SPIDER BODY ---
    class TrueSpider {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;

        // Create 8 IK Legs (offsetX, offsetY, reach, angleOffset)
        this.legs = [
          new SpiderLeg(5, 7, 60, Math.PI / 4), // Front Right
          new SpiderLeg(0, 8, 55, Math.PI / 2), // Mid-Front Right
          new SpiderLeg(-5, 8, 55, Math.PI * 0.75), // Mid-Back Right
          new SpiderLeg(-10, 6, 65, Math.PI), // Back Right

          new SpiderLeg(5, -7, 60, -Math.PI / 4), // Front Left
          new SpiderLeg(0, -8, 55, -Math.PI / 2), // Mid-Front Left
          new SpiderLeg(-5, -8, 55, -Math.PI * 0.75), // Mid-Back Left
          new SpiderLeg(-10, -6, 65, -Math.PI), // Back Left
        ];
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 10) {
          let targetAngle = Math.atan2(dy, dx);
          let angleDiff = targetAngle - this.angle;

          // Smooth rotation
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          this.angle += angleDiff * 0.06;

          // Movement towards mouse
          let speed = Math.max(0, Math.cos(angleDiff)) * 3;
          this.vx = Math.cos(this.angle) * speed;
          this.vy = Math.sin(this.angle) * speed;

          this.x += this.vx;
          this.y += this.vy;
        }

        // Initialize feet to initial node positions on first frame
        for (let leg of this.legs) {
          if (!leg.targetNode && nodesArray.length > 0) {
            let idealX =
              this.x + Math.cos(this.angle + leg.angleOffset) * leg.reach;
            let idealY =
              this.y + Math.sin(this.angle + leg.angleOffset) * leg.reach;
            let nearest = nodesArray[0];
            let minDist = Infinity;
            for (let node of nodesArray) {
              let d = Math.hypot(node.x - idealX, node.y - idealY);
              if (d < minDist) {
                minDist = d;
                nearest = node;
              }
            }
            leg.targetNode = nearest;
            leg.currentX = nearest.x;
            leg.currentY = nearest.y;
            nearest.isGrabbed = true;
          }
          // Update leg IK logic
          leg.update(this.x, this.y, this.angle);
        }
      }

      draw() {
        // Draw legs first so they go under the body
        for (let leg of this.legs) {
          leg.draw(this.x, this.y, this.angle);
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 4;

        // Abdomen
        let abGrad = ctx.createRadialGradient(-12, 0, 2, -12, 0, 18);
        abGrad.addColorStop(0, "#3b82f6");
        abGrad.addColorStop(0.7, "#1e3a8a");
        abGrad.addColorStop(1, "#020617");

        ctx.beginPath();
        ctx.ellipse(-12, 0, 18, 13, 0, 0, Math.PI * 2);
        ctx.fillStyle = abGrad;
        ctx.fill();

        // Head/Thorax
        let headGrad = ctx.createRadialGradient(4, 0, 1, 4, 0, 10);
        headGrad.addColorStop(0, "#60a5fa");
        headGrad.addColorStop(1, "#0f172a");

        ctx.beginPath();
        ctx.ellipse(4, 0, 10, 9, 0, 0, Math.PI * 2);
        ctx.fillStyle = headGrad;
        ctx.fill();

        ctx.restore();
      }
    }

    const init = () => {
      nodesArray = [];

      let spacing = 80; // Denser web for better stepping
      let cols = Math.floor(window.innerWidth / spacing) + 2;
      let rows = Math.floor(window.innerHeight / spacing) + 2;

      let offsetX = (window.innerWidth - cols * spacing) / 2;
      let offsetY = (window.innerHeight - rows * spacing) / 2;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          let jitterX = (Math.random() - 0.5) * 45;
          let jitterY = (Math.random() - 0.5) * 45;
          let x = i * spacing + offsetX + jitterX;
          let y = j * spacing + offsetY + jitterY;
          nodesArray.push(new Node(x, y));
        }
      }

      ikSpider = new TrueSpider(window.innerWidth / 2, window.innerHeight / 2);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < nodesArray.length; i++) {
        nodesArray[i].update();
        nodesArray[i].draw();
      }

      // Draw Web Threads connecting the nodes
      ctx.lineWidth = 1.2;
      for (let a = 0; a < nodesArray.length; a++) {
        for (let b = a + 1; b < nodesArray.length; b++) {
          let pA = nodesArray[a];
          let pB = nodesArray[b];
          let dx = pA.x - pB.x;
          let dy = pA.y - pB.y;
          let distanceSq = dx * dx + dy * dy;

          if (distanceSq < 18000) {
            // Math.sqrt(18000) is roughly 134
            let opacity = 1 - distanceSq / 18000;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.35})`; // Navy threads
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw the IK Spider
      if (ikSpider) {
        ikSpider.update();
        ikSpider.draw();
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

      {/* True IK Physics Web and Realistic Spider */}
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
