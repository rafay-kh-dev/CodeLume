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

// 1. THE REAL POWER OF THREE.JS - QUANTUM GALAXY VORTEX
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Setup Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.007); // Smoothly hides distant particles
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 35, 75);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimized for high refresh rate
    mountRef.current.appendChild(renderer.domElement);

    // 2. Galaxy Math Generation
    const parameters = {
      count: 15000, // Massive amount of particles
      radius: 65,   // Size of the galaxy
      branches: 4,  // Number of spiral arms
      spin: 1.2,    // How tightly it spirals
      randomness: 6,
      randomnessPower: 3
    };

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const scales = new Float32Array(parameters.count);

    // Strict Corporate Blue Palette
    const colorInside = new THREE.Color("#ffffff"); // Bright glowing core
    const colorPrimary = new THREE.Color("#3b82f6"); // CodeLume Blue
    const colorOutside = new THREE.Color("#0f172a"); // Deep space background blue

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      
      // Spiral Math
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin * 0.1;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      // Clustering randomness (more particles in the center of the arm)
      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness;
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * (parameters.randomness * 1.5);
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness;

      // Positioning
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY * (1.2 - (radius / parameters.radius)); // Flattens out at the edges
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color Gradient Logic
      let mixedColor = new THREE.Color();
      if (radius < 15) {
        // Core to Primary Blue
        mixedColor = colorPrimary.clone().lerp(colorInside, 1 - (radius / 15));
      } else {
        // Primary Blue to Deep Dark Edge
        mixedColor = colorOutside.clone().lerp(colorPrimary, 1 - (radius / parameters.radius));
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // Base random scale for variety
      scales[i] = Math.random() * 1.5 + 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Custom Shader for Twinkling & Glowing Dots
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float scale;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (120.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 xy = gl_PointCoord.xy - vec2(0.5);
          float ll = length(xy);
          if (ll > 0.5) discard;
          
          float opacity = (0.5 - ll) * 2.0;
          gl_FragColor = vec4(vColor, opacity * 0.95);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const galaxy = new THREE.Points(geometry, material);
    // Tilt the entire galaxy for a better 3D cinematic view
    galaxy.rotation.x = 0.2; 
    galaxy.rotation.z = -0.1;
    scene.add(galaxy);

    // 3. Mouse Interaction & Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onPointerMove = (event) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    };
    window.addEventListener("mousemove", onPointerMove);

    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous Galaxy Rotation
      galaxy.rotation.y += 0.0015;

      // Mouse Parallax (Dynamic 3D Camera Shift)
      camera.position.x += (mouseX * 0.02 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.02 + 35 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Particle Twinkling Effect (Breathing via sine wave)
      const scalesArray = galaxy.geometry.attributes.scale.array;
      for (let i = 0; i < parameters.count; i++) {
         scalesArray[i] = (Math.sin(elapsedTime * 2.5 + i) + 1.0) * 0.6 + 0.4;
      }
      galaxy.geometry.attributes.scale.needsUpdate = true;

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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-85 mix-blend-screen" />;
};


// 2. MAIN HERO SECTION (Heading exactly as you wanted)
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
          
          /* HIGH CONTRAST FOCUS EFFECT */
          @keyframes extremeFocus {
            0%, 100% { 
              filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 20px rgba(59, 130, 246, 0.2)); 
            }
            50% { 
              filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.9)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.7)); 
            }
          }
          .animate-extreme-focus {
            display: inline-block;
            animation: extremeFocus 3s ease-in-out infinite;
          }

          /* BRILLIANT METALLIC SHIMMER (Creates contrast against blue background) */
          @keyframes textShimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          .text-focus-shimmer {
            background: linear-gradient(
              to right, 
              #ffffff 0%,       /* Pure White */
              #dbeafe 25%,      /* Very Light Ice Blue */
              #ffffff 50%,      /* Pure White */
              #bfdbfe 75%,      /* Light Blue */
              #ffffff 100%      /* Pure White */
            );
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: textShimmer 4s linear infinite;
          }
        `}
      </style>

      {/* NEW THE REAL POWER OF THREE.JS (GALAXY VORTEX) */}
      <ThreeBackground />

      {/* Ambient Blue Glow Overlays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-blue-600/15 blur-[120px] pointer-events-none rounded-full transform-gpu" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-500/10 blur-[150px] pointer-events-none rounded-full transform-gpu" />

      {/* Technical Grid Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none transform-gpu"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%)",
        }}
      />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 my-auto">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          
          <h2 className="text-[2.4rem] sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.12] mb-6 select-none cursor-default flex flex-col items-center">
            
            <span className="text-white block mb-2 sm:mb-4">
              Lead Your Industry With
            </span>
            
            {/* FOCUS ELEMENT: Brilliant White/Silver Text with Heavy Blue Pulsing Glow */}
            <span className="block py-2 animate-extreme-focus">
              <span className="text-focus-shimmer font-black tracking-wide">
                Next-Generation
              </span>
            </span>
            
            <span className="text-white block mt-2 sm:mt-4">
              Optimised Web Solutions.
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed max-w-3xl font-medium tracking-wide pointer-events-none">
            We engineer lightning-fast digital experiences designed to boost conversion rates, scale customer acquisition, and maximise revenue.
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
            <div
              key={i}
              className="flex items-center gap-12 sm:gap-16 px-8"
            >
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