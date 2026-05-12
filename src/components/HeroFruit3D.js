'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Grape({ position, scale = 1 }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.18 * scale, 32, 32);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const noise = Math.sin(x * 12) * Math.cos(y * 12) * 0.003;
      pos.setXYZ(i, x + noise, y + noise, z + noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, [scale]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      geometry={geometry}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshPhysicalMaterial
        color="#4a1942"
        roughness={0.3}
        metalness={0.05}
        transmission={0.15}
        thickness={0.5}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        ior={1.4}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

function GrapeBunch() {
  const groupRef = useRef();
  const { mouse } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  // Generate grape positions in a bunch-like formation
  const grapePositions = useMemo(() => {
    const positions = [];
    // Main cluster
    for (let layer = 0; layer < 5; layer++) {
      const y = -layer * 0.28;
      const radius = 0.08 + layer * 0.12;
      const count = layer === 0 ? 1 : Math.min(layer * 3, 8);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + layer * 0.5;
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.04;
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.04;
        const scale = 1 - layer * 0.05 + (Math.random() - 0.5) * 0.1;
        positions.push({ pos: [x, y, z], scale: Math.max(0.7, scale) });
      }
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow Y rotation
    groupRef.current.rotation.y += delta * (Math.PI / 10); // ~20s full rotation

    // Mouse parallax (max 8 degrees = ~0.14 radians)
    targetRotation.current.x = mouse.y * 0.14;
    targetRotation.current.y = mouse.x * 0.14;

    groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      {/* Stem */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.015, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.8} />
      </mesh>

      {/* Grapes */}
      {grapePositions.map((grape, i) => (
        <Grape key={i} position={grape.pos} scale={grape.scale} />
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[-2, 3, 1]} intensity={1.5} color="#c8952a" /> {/* amber key */}
      <pointLight position={[2, 1, -2]} intensity={0.6} color="#4488cc" /> {/* blue rim */}
      <pointLight position={[0, -2, 1]} intensity={0.2} color="#f0ede6" /> {/* subtle fill */}

      <Float
        speed={1}
        rotationIntensity={0}
        floatIntensity={0.3}
        floatingRange={[-0.1, 0.1]}
      >
        <GrapeBunch />
      </Float>
    </>
  );
}

export default function HeroFruit3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 35 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  );
}
