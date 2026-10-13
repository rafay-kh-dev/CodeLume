"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Code2 } from "lucide-react";
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

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    
    const startTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 45); 

      return () => clearInterval(typingInterval);
    }, 500);

    return () => clearTimeout(startTimeout);
  }, [text]);

  return (
    <div className="min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] w-full flex justify-center items-start mb-6">
      {/* Font size optimized so it doesn't wrap into 3 lines on laptops */}
      <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.5rem] font-medium tracking-tight text-black leading-[1.15] select-none cursor-default w-full mx-auto m-0 px-4">
        {displayedText.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx !== displayedText.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
        <span 
          className="inline-block w-[3px] h-[0.8em] ml-1.5 animate-[pulse_1s_ease-in-out_infinite] align-middle translate-y-[-4px] rounded-full"
          style={{ background: 'linear-gradient(to bottom, #4285F4, #34A853, #FBBC05, #EA4335)' }}
        ></span>
      </h1>
    </div>
  );
};

export const ThreeBackground = () => {
  const mountRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !mountRef.current) return;
    mountRef.current.innerHTML = "";

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 100, 260); 

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const particleCount = 1200; 

    const geometry = new THREE.CapsuleGeometry(0.2, 1.2, 4, 8);
    geometry.rotateZ(Math.PI / 2);
    geometry.rotateX(Math.PI / 2);

    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.85, 
    });

    const mesh = new THREE.InstancedMesh(geometry, material, particleCount);
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    const colorPalette = [
      "#4285F4", 
      "#34A853", 
      "#FBBC05", 
      "#EA4335", 
    ];

    const originalPositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);

    const radius = 120; 

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const r = radius + (Math.random() * 10 - 5); 

      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;

      dummy.position.set(x, y, z);
      dummy.lookAt(0, 0, 0); 
      dummy.rotateZ((Math.random() - 0.5) * 0.5); 
      
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      mesh.setColorAt(i, color.set(randomColor));
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    scene.add(mesh);

    const mouse = new THREE.Vector2(9999, 9999);
    const targetMouse = new THREE.Vector2(0, 0);
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const onPointerMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      targetMouse.x = (event.clientX - windowHalfX) * 0.04; 
      targetMouse.y = (event.clientY - windowHalfY) * 0.04;
    };

    const onPointerLeave = () => {
      mouse.x = 9999;
      mouse.y = 9999;
    };

    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseleave", onPointerLeave);

    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseIntersection = new THREE.Vector3();

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      camera.position.x += (targetMouse.x - camera.position.x) * 0.05;
      camera.position.y += (-targetMouse.y - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      mesh.rotation.y += 0.0008;
      mesh.rotation.x += 0.0004;

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, mouseIntersection);

      const inverseMatrix = new THREE.Matrix4().copy(mesh.matrixWorld).invert();
      const localMouse = mouseIntersection.clone().applyMatrix4(inverseMatrix);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        let cx = currentPositions[i3];
        let cy = currentPositions[i3 + 1];
        let cz = currentPositions[i3 + 2];

        const dx = localMouse.x - cx;
        const dy = localMouse.y - cy;
        const dz = localMouse.z - cz;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        const interactionRadius = 55;
        const pushForce = 20;

        if (dist < interactionRadius && mouse.x !== 9999) {
          const force = Math.pow((interactionRadius - dist) / interactionRadius, 2);
          cx -= (dx / dist) * force * pushForce;
          cy -= (dy / dist) * force * pushForce;
          cz -= (dz / dist) * force * pushForce;
        }

        cx += (ox - cx) * 0.08;
        cy += (oy - cy) * 0.08;
        cz += (oz - cz) * 0.08;

        currentPositions[i3] = cx;
        currentPositions[i3 + 1] = cy;
        currentPositions[i3 + 2] = cz;

        dummy.position.set(cx, cy, cz);
        dummy.lookAt(0, 0, 0); 
        dummy.rotateZ((Math.random() - 0.5) * 0.5); 
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const onWindowResize = () => {
      if (!mountRef.current) return;
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.innerHTML = "";
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isMounted]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 pointer-events-none" 
      style={{
        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)'
      }}
    />
  );
};

export default function Hero() {
  const techStack = [
    { name: "MERN Stack", Icon: SiReact },
    { name: "PHP / Laravel", Icon: SiLaravel },
    { name: "Angular", Icon: SiAngular },
    { name: "WordPress", Icon: SiWordpress },
    { name: "Shopify", Icon: SiShopify },
    { name: "Webflow", Icon: SiWebflow },
    { name: "Node.js", Icon: SiNodedotjs },
  ];

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-dvh max-h-dvh flex flex-col justify-between overflow-hidden bg-white text-black font-jakarta">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
          .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #ffffff; }
          ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
          
          @keyframes marquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
          .animate-marquee { animation: marquee 40s linear infinite; will-change: transform; }
        `}
      </style>

      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="hero-antigravity-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop stopColor="#4285F4" offset="0%" />
            <stop stopColor="#34A853" offset="35%" />
            <stop stopColor="#FBBC05" offset="70%" />
            <stop stopColor="#EA4335" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      <ThreeBackground />

      <div className="flex-1 flex flex-col justify-center items-center w-full relative z-10 px-6 sm:px-10 lg:px-12 pt-12 pb-4 my-auto">
        
        {/* WIDTH INCREASED TO 1300px TO PREVENT 3-LINE WRAP */}
        <div className="w-full max-w-[1300px] mx-auto text-center flex flex-col items-center">
          
          <div className="flex items-center gap-1.5 mb-8 select-none opacity-0 animate-[fadeIn_1s_ease-out_forwards_0.5s]">
            <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
            
            <Code2 className="w-[24px] h-[24px]" stroke="url(#hero-antigravity-gradient)" strokeWidth={2.5} />
            <span className="font-semibold text-[18px] tracking-tight text-black">
              CodeLume
            </span>
          </div>

          {/* PERFECT 2-LINE TEXT (Long line first, short line second) */}
          <TypewriterText text={"Architecting bespoke digital experiences\nwith the next-gen platform"} />

          <div className={`flex justify-center w-full relative z-20 transition-all duration-1000 mt-2 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link
              href="/start-project"
              className="px-9 py-3.5 rounded-full bg-[#111827] text-white font-medium hover:bg-black transition-all duration-200 active:scale-[0.98] outline-none shadow-sm text-[15px]"
            >
              Start Project
            </Link>
          </div>
        </div>
      </div>

      <div
        className="w-full h-[64px] bg-white border-t border-gray-100 overflow-hidden flex items-center z-30 relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <div className="flex whitespace-nowrap animate-marquee items-center h-full">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {techStack.map((tech, index) => {
                const IconComponent = tech.Icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-slate-500 hover:text-black transition-colors duration-300 group"
                  >
                    <IconComponent className="w-[18px] h-[18px] fill-current transition-colors" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase transition-colors">
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