'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Shared Material Helper ---
const createFruitMaterial = (color, transmission = 0.1, roughness = 0.4) => (
  <meshPhysicalMaterial
    color={color}
    roughness={roughness}
    metalness={0.1}
    transmission={transmission}
    thickness={0.5}
    clearcoat={0.3}
    clearcoatRoughness={0.2}
    ior={1.4}
  />
);

// 1. Grapes (Procedural bunch using spheres)
export function Grapes({ active }) {
  const groupRef = useRef();
  
  const positions = useMemo(() => {
    const pos = [];
    for (let layer = 0; layer < 4; layer++) {
      const y = -layer * 0.3;
      const radius = 0.1 + layer * 0.15;
      const count = layer === 0 ? 1 : layer * 4;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + layer * 0.5;
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.05;
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.05;
        const scale = 1 - layer * 0.1 + (Math.random() - 0.5) * 0.1;
        pos.push({ x, y, z, scale: Math.max(0.6, scale) * 0.8 });
      }
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (active && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={1.8} position={[0, 0.4, 0]}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
      {positions.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]} scale={p.scale}>
          <sphereGeometry args={[0.2, 16, 16]} />
          {createFruitMaterial('#4a1942', 0.2, 0.2)}
        </mesh>
      ))}
    </group>
  );
}

// 2. Mango (Deformed sphere)
export function Mango({ active }) {
  const meshRef = useRef();
  
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // Stretch to oval and curve slightly (mango shape)
      pos.setXYZ(i, x * 0.7, y * 1.2 + (x * 0.2), z * 0.8);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (active && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.z = 0.2;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={1.5}>
      {createFruitMaterial('#ffb020', 0.05, 0.4)}
    </mesh>
  );
}

// 3. Watermelon (Sphere with stripe texture simulation)
export function Watermelon({ active }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (active && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x = 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={1.6}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        {/* Simple material for now, normally would use a noise shader for stripes */}
        <meshStandardMaterial color="#2d5a27" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Slice cut-out approximation */}
      <mesh position={[0.5, 0.2, 0.8]} rotation={[0, -Math.PI / 4, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#ff4040" roughness={0.6} />
      </mesh>
    </group>
  );
}

// 4. Litchi (Bumpy sphere)
export function Litchi({ active }) {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // High frequency bumpiness
      const noise = Math.sin(x * 30) * Math.cos(y * 30) * Math.sin(z * 30) * 0.03;
      pos.setXYZ(i, x + noise, y + noise, z + noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (active && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={1.2}>
      {createFruitMaterial('#cc5566', 0.05, 0.6)}
    </mesh>
  );
}

// 5. Guava
export function Guava({ active }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (active && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={1.4}>
      <mesh position={[-0.4, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        {createFruitMaterial('#88cc44', 0.05, 0.4)}
      </mesh>
      <mesh position={[0.6, -0.2, 0.2]} scale={0.7}>
        <sphereGeometry args={[0.8, 32, 32]} />
        {createFruitMaterial('#88cc44', 0.05, 0.4)}
      </mesh>
    </group>
  );
}

// 6. Pomegranate
export function Pomegranate({ active }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (active && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={1.4}>
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        {createFruitMaterial('#aa1122', 0.1, 0.3)}
      </mesh>
      {/* Crown */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.15, 0.05, 0.2, 6]} />
        <meshStandardMaterial color="#aa1122" roughness={0.6} />
      </mesh>
    </group>
  );
}

// 7. Orange
export function Orange({ active }) {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // Dimpled skin (low amp high freq noise)
      const noise = Math.sin(x * 50) * Math.cos(y * 50) * Math.sin(z * 50) * 0.01;
      pos.setXYZ(i, x + noise, y * 0.95 + noise, z + noise); // Slightly flattened poles
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (active && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x = 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={1.3}>
      {createFruitMaterial('#ff6b2b', 0.05, 0.5)}
    </mesh>
  );
}

// 8. Strawberry
export function Strawberry({ active }) {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // Cone-like shape
      const radiusScale = 1 - (y + 1) * 0.3; 
      pos.setXYZ(i, x * radiusScale, y * 1.2, z * radiusScale);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (active && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={1.2}>
      {createFruitMaterial('#dd2233', 0.1, 0.4)}
    </mesh>
  );
}
