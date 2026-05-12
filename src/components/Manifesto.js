'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Manifesto.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef(null);
  const linesRef = useRef([]);
  const statsRef = useRef([]);

  useGSAP(() => {
    // Statement reveal
    gsap.fromTo(linesRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      }
    );

    // Stats counter animation
    statsRef.current.forEach((stat) => {
      const target = Number(stat.dataset.target);
      
      gsap.from(stat, {
        innerText: 0,
        duration: 1.5,
        snap: { innerText: 1 },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        modifiers: {
          innerText: val => stat.dataset.prefix ? `${stat.dataset.prefix}${Math.round(val)}` : Math.round(val)
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section className={styles.container} id="manifesto" ref={containerRef}>
      <div className={styles.bgGradient} />
      
      <div className={styles.content}>
        
        {/* Left: Editorial Statement */}
        <div className={styles.statement}>
          <h2 className={`${styles.line} font-display`} ref={el => linesRef.current[0] = el}>
            Every competitor competes on availability.
          </h2>
          <h2 className={`${styles.line} font-display`} ref={el => linesRef.current[1] = el}>
            We compete on unavailability.
          </h2>
          <h2 className={`${styles.line} font-display`} ref={el => linesRef.current[2] = el}>
            This is not a weakness.
          </h2>
          <h2 className={`${styles.line} font-display text-amber`} ref={el => linesRef.current[3] = el}>
            It is the product.
          </h2>
        </div>

        {/* Right: Stats */}
        <div className={styles.stats}>
          
          <div className={styles.statBlock}>
            <div className={`${styles.statNum} font-display text-amber`} ref={el => statsRef.current[0] = el} data-target="8">0</div>
            <div className={styles.statLabel}>Seasonal drops per year</div>
          </div>
          
          <div className={styles.statBlock}>
            <div className={`${styles.statNum} font-display text-amber`} ref={el => statsRef.current[1] = el} data-target="300" data-prefix="">0</div>
            <span className={styles.suffix}>ml</span>
            <div className={styles.statLabel}>Per bottle. No more. No less.</div>
          </div>
          
          <div className={styles.statBlock}>
            <div className={`${styles.statNum} font-display text-amber`} ref={el => statsRef.current[2] = el} data-target="249" data-prefix="₹">0</div>
            <div className={styles.statLabel}>Standard drop price</div>
          </div>

        </div>

      </div>
    </section>
  );
}
