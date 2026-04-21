"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

interface MarkerProps {
  position: [number, number, number];
  label: string;
}

const Marker = ({ position, label }: MarkerProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Html position={position} distanceFactor={10}>
      <div 
        className="relative flex items-center group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-3 h-3 bg-white rounded-full border-2 border-[#2B74F0] animate-pulse shadow-[0_0_10px_rgba(43,116,240,0.8)]" />
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.8 }}
              animate={{ opacity: 1, x: 10, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.8 }}
              className="absolute left-full ml-2 whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-blue-100 shadow-xl pointer-events-none"
            >
              <p className="text-xs font-bold text-[#2050A1]">{label}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Html>
  );
};

const Globe = ({ rotating }: { rotating: boolean }) => {
  const globeRef = useRef<THREE.Group>(null);
  
  // High-tech dots for the globe surface
  const dots = useMemo(() => {
    const points = [];
    const radius = 2;
    const count = 1500;
    
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  }, []);

  const markers: MarkerProps[] = useMemo(() => {
    const radius = 2.05; // Slightly outside the globe
    const getPos = (lat: number, lon: number): [number, number, number] => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      
      return [
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      ];
    };

    return [
      { label: "Hiring from India", position: getPos(20.5937, 78.9629) },
      { label: "Hiring from Rwanda", position: getPos(-1.9403, 29.8739) },
      { label: "Hiring from Nigeria", position: getPos(9.0820, 8.6753) },
      { label: "Hiring from USA", position: getPos(37.0902, -95.7129) },
      { label: "Hiring from UK", position: getPos(55.3781, -3.4360) },
      { label: "Hiring from Germany", position: getPos(51.1657, 10.4515) },
      { label: "Hiring from Vietnam", position: getPos(14.0583, 108.2772) },
    ];
  }, []);

  useFrame((state, delta) => {
    if (rotating && globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Main Core */}
      <Sphere args={[1.98, 32, 32]}>
        <meshPhongMaterial 
          color="#2B74F0" 
          transparent 
          opacity={0.05} 
          shininess={100}
        />
      </Sphere>

      {/* Grid Mesh */}
      <Sphere args={[2, 40, 40]}>
        <meshBasicMaterial 
          color="#2B74F0" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Sphere>

      {/* Surface Dots */}
      {dots.map((point, i) => (
        <mesh key={i} position={point}>
          <boxGeometry args={[0.015, 0.015, 0.015]} />
          <meshBasicMaterial color="#2B74F0" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Markers */}
      {markers.map((marker, i) => (
        <Marker key={i} {...marker} />
      ))}
    </group>
  );
};

export default function GlobeAnimation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-[500px] md:h-[650px] cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-radial-gradient from-blue-50/50 to-transparent pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#2B74F0" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#white" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Globe rotating={!isHovered} />
        </Float>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-indigo-200/20 blur-3xl rounded-full pointer-events-none" />
    </div>
  );
}
