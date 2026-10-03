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
import * as THREE from "three";

// 1. HOLOGRAPHIC DATA CORE (Infinity Knot)
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.015);

    // Camera positioned to make the core look massive
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Glowing Dot Texture for premium look
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(14, 165, 233, 0.8)"); // Cyan glow
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);
    const dotTexture = new THREE.CanvasTexture(canvas);

    // Layer 1: The Outer Cyan Infinity Mesh
    const outerGeometry = new THREE.TorusKnotGeometry(14, 4, 300, 40);
    const outerMaterial = new THREE.PointsMaterial({
      size: 0.6,
      map: dotTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: "#0ea5e9",
    });
    const outerKnot = new THREE.Points(outerGeometry, outerMaterial);
    coreGroup.add(outerKnot);

    // Layer 2: The Inner Blue Core Mesh
    const innerGeometry = new THREE.TorusKnotGeometry(14, 4, 150, 20);
    const innerMaterial = new THREE.PointsMaterial({
      size: 0.9,
      map: dotTexture,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: "#3b82f6",
    });
    const innerKnot = new THREE.Points(innerGeometry, innerMaterial);
    innerKnot.scale.set(0.98, 0.98, 0.98); // Slightly smaller to sit inside
    coreGroup.add(innerKnot);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onPointerMove = (event) => {
      targetX = (event.clientX - windowHalfX) * 0.02;
      targetY = (event.clientY - windowHalfY) * 0.02;
    };
    window.addEventListener("mousemove", onPointerMove);

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth Parallax Camera
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Complex Core Rotation
      outerKnot.rotation.x += 0.001;
      outerKnot.rotation.y += 0.002;

      innerKnot.rotation.x -= 0.0015;
      innerKnot.rotation.y -= 0.0025;

      // Gentle floating effect
      coreGroup.position.y = Math.sin(Date.now() * 0.001) * 2;

      renderer.render(scene, camera);
    };

    animate();

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onPointerMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      outerGeometry.dispose();
      innerGeometry.dispose();
      outerMaterial.dispose();
      innerMaterial.dispose();
      dotTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
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
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #030712; }
          ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
          
          @keyframes marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
          .animate-marquee { animation: marquee 35s linear infinite; will-change: transform; }
          
          .text-glow {
            text-shadow: 0 0 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.2);
          }
        `}
      </style>

      {/* Holographic Data Core Background */}
      <ThreeBackground />

      {/* Heavy Vignette to make text ultra readable */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#030712_85%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#030712]/60 blur-[60px] pointer-events-none z-[1]" />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-4 my-auto">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-[2.8rem] sm:text-6xl lg:text-[5.5rem] font-black tracking-tight leading-[1.05] mb-6 select-none cursor-default">
            <span className="text-white block mb-1">Architecting Bespoke</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 text-glow py-2">
              Digital Ecosystems.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl font-medium tracking-wide pointer-events-none">
            Stop settling for templates. We engineer high-performance MERN stack
            platforms and scalable backends designed to dominate your market.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto relative z-20">
            <Link
              to="/start-project"
              className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_0_40px_-8px_rgba(37,99,235,0.7)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.9)] border border-blue-400/40 transition-all duration-300 active:scale-[0.98] outline-none overflow-hidden transform-gpu font-bold tracking-wide"
            >
              <Sparkles className="w-5 h-5 text-blue-100 relative z-10" />
              <span className="text-[16px] relative z-10">
                Deploy Your Vision
              </span>
            </Link>

            <Link
              to="/services"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all duration-300 active:scale-[0.98] backdrop-blur-md outline-none font-semibold tracking-wide"
            >
              <span>Explore Services</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-slate-400 group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      <div
        className="w-full h-14 bg-black/40 backdrop-blur-xl overflow-hidden flex items-center z-30 border-t border-white/[0.04] shrink-0 relative z-30"
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
                    className="flex items-center gap-2.5 text-slate-500 hover:text-blue-400 transition-colors duration-300"
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
