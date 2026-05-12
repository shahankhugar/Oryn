'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import styles from './FruitShowcase.module.css';
import { Mango, Watermelon, Grapes, Pomegranate, Orange, Strawberry, Litchi, Guava } from './FruitModels';

const FRUITS = [
  { id: 'grapes', name: 'Grapes', month: 'February', season: 'PRE-SUMMER', num: '01', status: 'Upcoming', color: '#4a1942', Model: Grapes },
  { id: 'mango', name: 'Mango', month: 'April', season: 'SUMMER PEAK', num: '02', status: 'Opens April', color: '#ffb020', Model: Mango },
  { id: 'watermelon', name: 'Watermelon', month: 'May', season: 'LATE SUMMER', num: '03', status: 'Opens May', color: '#ff4040', Model: Watermelon },
  { id: 'litchi', name: 'Litchi', month: 'June', season: 'MONSOON START', num: '04', status: 'Opens June', color: '#cc5566', Model: Litchi },
  { id: 'guava', name: 'Guava', month: 'August', season: 'MONSOON', num: '05', status: 'Opens August', color: '#88cc44', Model: Guava },
  { id: 'pomegranate', name: 'Pomegranate', month: 'October', season: 'AUTUMN', num: '06', status: 'Opens October', color: '#aa1122', Model: Pomegranate },
  { id: 'orange', name: 'Orange', month: 'December', season: 'WINTER', num: '07', status: 'Opens December', color: '#ff6b2b', Model: Orange },
  { id: 'strawberry', name: 'Strawberry', month: 'January', season: 'LATE WINTER', num: '08', status: 'Opens January', color: '#dd2233', Model: Strawberry },
];

function AmbientParticles({ activeIndex }) {
  const particlesRef = useRef();
  
  // Use particle count of 200
  const particlesData = useRef(
    Array.from({ length: 200 }, () => ({
      pos: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ],
      speed: Math.random() * 0.02 + 0.01,
      opacity: Math.random() * 0.5 + 0.1
    }))
  );

  useFrame(() => {
    if (particlesRef.current) {
      // Particles drift upward
      particlesRef.current.children.forEach((p, i) => {
        p.position.y += particlesData.current[i].speed;
        if (p.position.y > 5) {
          p.position.y = -5;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particlesData.current.map((data, i) => (
        <mesh key={i} position={data.pos}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={data.opacity} />
        </mesh>
      ))}
    </group>
  );
}

function CarouselScene({ activeIndex }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smoothly rotate the entire group to bring active index to front
      const targetRotationY = -activeIndex * (Math.PI * 2 / FRUITS.length);
      // Small lerp for smooth transition
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#ffffff" />

      <AmbientParticles activeIndex={activeIndex} />

      <group ref={groupRef} position={[0, -0.5, 0]}>
        {FRUITS.map((fruit, i) => {
          const angle = (i / FRUITS.length) * Math.PI * 2;
          const radius = 3;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return (
            <group key={fruit.id} position={[x, 0, z]} rotation={[0, angle, 0]}>
              <fruit.Model active={activeIndex === i} />
            </group>
          );
        })}
      </group>
    </>
  );
}

export default function FruitShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isTransitioning = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      // Only capture wheel events when this section is fully visible
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top > 100 || rect.bottom < window.innerHeight - 100) return;
      
      e.preventDefault(); // Prevent page scroll while interacting with carousel
      
      if (isTransitioning.current) return;

      if (e.deltaY > 50) {
        next();
      } else if (e.deltaY < -50) {
        prev();
      }
    };

    const handleKeyDown = (e) => {
      if (isTransitioning.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prev();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex]);

  const next = () => {
    isTransitioning.current = true;
    setActiveIndex((prev) => (prev + 1) % FRUITS.length);
    setTimeout(() => { isTransitioning.current = false; }, 600);
  };

  const prev = () => {
    isTransitioning.current = true;
    setActiveIndex((prev) => (prev - 1 + FRUITS.length) % FRUITS.length);
    setTimeout(() => { isTransitioning.current = false; }, 600);
  };

  const activeFruit = FRUITS[activeIndex];

  return (
    <section className={styles.container} id="showcase" ref={containerRef}>
      {/* Background color bleed */}
      <div 
        className={styles.bgBleed} 
        style={{ 
          background: `radial-gradient(circle at center, ${activeFruit.color} 0%, transparent 70%)` 
        }} 
      />

      <div className={styles.heading}>THE DROPS</div>

      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} gl={{ alpha: true }}>
          <CarouselScene activeIndex={activeIndex} />
        </Canvas>
      </div>

      <div className={styles.infoPanel}>
        <div className={styles.infoContent} key={activeFruit.id}>
          <div className={styles.dropNum}>DROP {activeFruit.num}</div>
          <h2 className={styles.fruitName}>{activeFruit.name}</h2>
          <div className={styles.month}>{activeFruit.month}</div>
          <div className={styles.season}>{activeFruit.season}</div>
          
          <div className={styles.divider} />
          
          <div className={styles.statusRow}>
            {activeFruit.status === 'Upcoming' ? (
              <span className={styles.statusDot} />
            ) : null}
            <span className={styles.statusText}>{activeFruit.status}</span>
          </div>

          <button className={styles.notifyBtn}>Notify Me</button>
        </div>
      </div>
      
      {/* Mobile nav hints */}
      <div className={styles.mobileHints}>
        Swipe or tap arrows to explore
      </div>
    </section>
  );
}
