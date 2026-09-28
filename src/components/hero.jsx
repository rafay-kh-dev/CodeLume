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

// 1. THREE.JS 3D PARTICLE WAVE BACKGROUND
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    
    // Camera Setup (Wide angle, looking slightly down at the wave)
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.y = 15;
    camera.position.z = 45;
    camera.rotation.x = -0.2;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Wave Configuration
    const amountX = 100;
    const amountY = 100;
    const separation = 2;
    const numParticles = amountX * amountY;

    // Particle Geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let count = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        positions[count * 3] = ix * separation - (amountX * separation) / 2; // x
        positions[count * 3 + 1] = 0; // y (will be animated)
        positions[count * 3 + 2] = iy * separation - (amountY * separation) / 2; // z
        scales[count] = 1;
        count++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // Custom Shader Material for glowing dots that fade in the distance
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x3b82f6) }, // Premium Navy Blue
      },
      vertexShader: `
        attribute float scale;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          // Dots get smaller further away to enhance 3D depth
          gl_PointSize = scale * ( 70.0 / - mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          // Make dots circular with a soft glowing edge
          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.47 ) discard;
          gl_FragColor = vec4( color, 0.8 );
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction Math
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onPointerMove = (event) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    };

    window.addEventListener("mousemove", onPointerMove);

    // Animation Loop
    let particlePhase = 0;
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth Camera Pan based on mouse (Parallax)
      targetX = mouseX * 0.05;
      targetY = mouseY * 0.05;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      
      // Animate the Wave
      particlePhase += 0.04; // Speed of the ocean wave
      const positions = particles.geometry.attributes.position.array;
      const scales = particles.geometry.attributes.scale.array;

      let i = 0;
      let j = 0;

      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          // Complex Sine Wave Math for fluid 3D motion
          positions[i + 1] =
            Math.sin((ix + particlePhase) * 0.3) * 3 +
            Math.sin((iy + particlePhase) * 0.5) * 3;
            
          // Scale pulses based on height
          scales[j] = (Math.sin((ix + particlePhase) * 0.3) + 1) * 1.5 +
                      (Math.sin((iy + particlePhase) * 0.5) + 1) * 1.5;

          i += 3;
          j++;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.scale.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);

    // Cleanup to prevent memory leaks
    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onPointerMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />;
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
          
          /* The 'Khatarnak' Liquid Navy Text Animation */
          @keyframes liquidSweep {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .text-liquid-navy {
            background: linear-gradient(
              to right,
              #1e3a8a 10%,   /* Deep Navy */
              #3b82f6 30%,   /* Bright Blue */
              #22d3ee 50%,   /* Hot Cyan Core */
              #3b82f6 70%,   /* Bright Blue */
              #1e3a8a 90%    /* Deep Navy */
            );
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: liquidSweep 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            position: relative;
          }

          /* Optional secondary outer glow for the text */
          .text-glow-wrapper {
            filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.4));
          }
        `}
      </style>

      {/* The 3D Three.js Ocean Wave Background */}
      <ThreeBackground />

      {/* Ambient Lighting to blend the 3D scene with the background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent blur-[110px] pointer-events-none rounded-full transform-gpu" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full transform-gpu" />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 my-auto">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          
          <h2 className="text-[2.4rem] sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.12] mb-6 select-none cursor-default">
            <span className="text-white block mb-2">
              Lead Your Industry With
            </span>
            
            {/* The Animated Liquid Navy Text */}
            <span className="block py-2 text-glow-wrapper">
              <span className="text-liquid-navy font-black tracking-tight">
                Next-Generation
              </span>
            </span>
            
            <span className="text-white block mt-2">
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