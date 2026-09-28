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

// 1. PURE BLUE 3D MAGNETIC WAVE (Custom Shaders + Physics)
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0035);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 25, 60);
    camera.rotation.x = -0.25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Wave Grid Configuration
    const amountX = 130;
    const amountY = 130;
    const separation = 2.2;
    const numParticles = amountX * amountY;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let count = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        positions[count * 3] = ix * separation - (amountX * separation) / 2;
        positions[count * 3 + 1] = 0; 
        positions[count * 3 + 2] = iy * separation - (amountY * separation) / 2;
        scales[count] = 1;
        count++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // CUSTOM SHADER: Pure Primary Blue Colors
    const material = new THREE.ShaderMaterial({
      uniforms: {
        colorDeep: { value: new THREE.Color("#0f172a") }, // Very Dark Slate/Blue for valleys
        colorHigh: { value: new THREE.Color("#3b82f6") }, // Primary Blue for peaks
      },
      vertexShader: `
        attribute float scale;
        varying vec3 vColor;
        uniform vec3 colorDeep;
        uniform vec3 colorHigh;
        
        void main() {
          float heightFactor = (position.y + 4.0) / 10.0;
          vColor = mix(colorDeep, colorHigh, clamp(heightFactor, 0.0, 1.0));
          
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = scale * ( 90.0 / - mvPosition.z );
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
          gl_FragColor = vec4(vColor, opacity * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Tracking for Magnetic Lift
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

    let particlePhase = 0;
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Camera Parallax
      targetX = mouseX * 0.03;
      targetY = mouseY * 0.03;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY + 25 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      particlePhase += 0.03;
      const positionsArray = particles.geometry.attributes.position.array;
      const scalesArray = particles.geometry.attributes.scale.array;

      let worldMouseX = (mouseX / windowHalfX) * 100;
      let worldMouseZ = (mouseY / windowHalfY) * 100 - 30;

      let i = 0;
      let j = 0;

      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          let x = positionsArray[i];
          let z = positionsArray[i + 2];

          let y = Math.sin((ix + particlePhase) * 0.3) * 3.5 +
                  Math.sin((iy + particlePhase) * 0.5) * 3.5;

          // MAGNETIC LIFT PHYSICS
          let dx = x - worldMouseX;
          let dz = z - worldMouseZ;
          let distance = Math.sqrt(dx * dx + dz * dz);
          
          if (distance < 40) {
            let lift = (40 - distance) * 0.35; 
            y += lift;
          }

          positionsArray[i + 1] = y;
          scalesArray[j] = (y + 5) * 0.6;

          i += 3;
          j++;
        }
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.scale.needsUpdate = true;
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

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-90" />;
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
          
          /* Clean Premium Blue Glow for the Text */
          @keyframes textBlueGlow {
            0%, 100% { filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.4)); }
            50% { filter: drop-shadow(0 0 28px rgba(59, 130, 246, 0.8)); }
          }
          .animate-text-blue-glow {
            animation: textBlueGlow 3.5s ease-in-out infinite;
          }
        `}
      </style>

      {/* Advanced 3D Magnetic Ocean Wave (Pure Blue Theme) */}
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
            
            {/* CLEAN TEXT REVERTED: Pure Blue gradient with breathing glow */}
            <span className="block py-2 animate-text-blue-glow">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 font-black tracking-wide">
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