'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BrandStory.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const sectionRef = useRef(null);
  
  // Subsection A
  const probNumRef = useRef(null);
  const probTextRef = useRef(null);
  
  // Subsection B
  const consImgRef = useRef(null);
  const consTextRef = useRef(null);

  // Subsection C
  const discTextRef = useRef(null);
  const discSubRef = useRef(null);

  useGSAP(() => {
    // Problem
    gsap.fromTo(probNumRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: probNumRef.current, start: 'top 80%' } }
    );
    gsap.fromTo(probTextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, scrollTrigger: { trigger: probTextRef.current, start: 'top 80%' } }
    );

    // Consumer
    gsap.fromTo(consImgRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, scrollTrigger: { trigger: consImgRef.current, start: 'top 80%' } }
    );
    // Parallax on image inside container
    gsap.to(`.${styles.imageParallax}`, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: consImgRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.fromTo(consTextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, scrollTrigger: { trigger: consTextRef.current, start: 'top 80%' } }
    );

    // Discipline
    gsap.fromTo(discTextRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: discTextRef.current, start: 'top 80%' } }
    );
    gsap.fromTo(discSubRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.4, scrollTrigger: { trigger: discSubRef.current, start: 'top 80%' } }
    );

  }, { scope: sectionRef });

  return (
    <section className={styles.container} id="story" ref={sectionRef}>
      <div className="section-container">
        
        {/* Subsection A: The Problem */}
        <div className={styles.subsectionRow}>
          <div className={styles.leftCol}>
            <div className={`${styles.giantNumber} font-display`} ref={probNumRef}>50+</div>
          </div>
          <div className={styles.rightCol}>
            <p className={`${styles.bodyText} font-body`} ref={probTextRef}>
              India grows over 50 seasonal fruits. Each one available for 3 to 8 weeks a year at their absolute best. 
              The beverage industry responded by making concentrate. By making mango juice available in December. 
              By making seasonal fruit feel like a flavour, not a moment.
            </p>
          </div>
        </div>

        {/* Subsection B: The Consumer */}
        <div className={`${styles.subsectionRow} ${styles.reverseMobile}`}>
          <div className={styles.leftCol}>
            <p className={`${styles.bodyText} font-body`} ref={consTextRef}>
              India's 14 to 29 year old urban consumer already sets alarms for sneaker drops. 
              Already sells out concerts in minutes. Already understands that the best things don't wait for you. 
              ORYN was built for them. For the people who know the difference between a product and a moment.
            </p>
          </div>
          <div className={styles.rightCol}>
            <div className={styles.imageWrapper} ref={consImgRef}>
              {/* Fallback box for now, standard img in prod */}
              <div className={styles.imageParallax} />
            </div>
          </div>
        </div>

        {/* Subsection C: The Discipline */}
        <div className={styles.subsectionCentered}>
          <h2 className={`${styles.disciplineTitle} font-display`} ref={discTextRef}>
            We will never restock.
          </h2>
          <p className={`${styles.disciplineSub} font-body`} ref={discSubRef}>
            This is the hardest rule we follow and the most important signal we send. A brand that restocks is a brand that blinked. ORYN does not blink.
          </p>
        </div>

      </div>
    </section>
  );
}
