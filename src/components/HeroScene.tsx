import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const WireframeIcosahedron = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.0003;
    meshRef.current.rotation.y += 0.0002;

    mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.03;
    mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.03;

    meshRef.current.rotation.y += mouseCurrent.current.x * 0.01;
    meshRef.current.rotation.x += mouseCurrent.current.y * 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.8, 1]} />
      <meshBasicMaterial wireframe color="#c9a96e" opacity={0.055} transparent />
    </mesh>
  );
};

const FloatingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [isMobile] = useState(() => window.innerWidth < 768);
  const count = isMobile ? 40 : 280;

  const { positions, sizes, opacities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const opacities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = Math.random() * -4;
      sizes[i] = 0.8 + Math.random() * 0.6;
      opacities[i] = 0.15 + Math.random() * 0.2;
    }
    return { positions, sizes, opacities };
  }, [count]);

  const velocities = useMemo(() => {
    const v = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      v[i * 3] = (Math.random() - 0.5) * 0.001;
      v[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
      v[i * 3 + 2] = 0;
    }
    return v;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      // Wrap around
      if (pos[i * 3] > 10) pos[i * 3] = -10;
      if (pos[i * 3] < -10) pos[i * 3] = 10;
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
      if (pos[i * 3 + 1] < -10) pos[i * 3 + 1] = 10;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={1.2} color="#c9a96e" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
};

const HeroScene = () => {
  const [webGLAvailable, setWebGLAvailable] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebGLAvailable(false);
    } catch {
      setWebGLAvailable(false);
    }
  }, []);

  // Respect reduced motion
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!webGLAvailable || prefersReducedMotion) {
    // Static SVG fallback
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06]">
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke="hsl(40 46% 61%)" strokeWidth="0.5">
          <polygon points="200,20 380,300 20,300" opacity="0.3" />
          <polygon points="200,80 340,280 60,280" opacity="0.2" />
          <polygon points="200,140 300,260 100,260" opacity="0.1" />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ willChange: "transform" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <WireframeIcosahedron />
        <FloatingParticles />
      </Canvas>
    </div>
  );
};

export default HeroScene;
