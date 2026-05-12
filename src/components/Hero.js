'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';
import Countdown from './Countdown';
import HeroFruit3D from './HeroFruit3D';

export default function Hero({ loaded }) {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const wordmarkRef = useRef(null);
  const taglineRef = useRef(null);
  const ruleRef = useRef(null);
  const countdownRef = useRef(null);
  const ctaRef = useRef(null);
  const fruitRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!loaded) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(labelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0);

    // Wordmark letters
    const letters = wordmarkRef.current?.querySelectorAll('span');
    if (letters) {
      tl.fromTo(letters, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
      }, 0.2);
    }

    tl.fromTo(fruitRef.current, { opacity: 0, y: -60 }, {
      opacity: 1, y: 0, duration: 1.0, ease: 'back.out(1.2)',
    }, 0.4);

    tl.fromTo(taglineRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 0.9);

    tl.fromTo(ruleRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.inOut' }, 1.1);

    tl.fromTo(countdownRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.3);

    tl.fromTo(ctaRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.5);

    tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.8);

    return () => tl.kill();
  }, [loaded]);

  return (
    <section className={styles.hero} id="home" ref={sectionRef}>
      {/* Top label */}
      <div className={styles.topLabel} ref={labelRef}>
        BENGALURU · 2026 · SEASONAL FRUIT JUICE
      </div>

      {/* 3D Fruit */}
      <div className={styles.fruitContainer} ref={fruitRef}>
        <HeroFruit3D />
      </div>

      {/* Wordmark */}
      <div className={styles.wordmark} ref={wordmarkRef}>
        {'ORYN'.split('').map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>

      {/* Tagline */}
      <p className={styles.tagline} ref={taglineRef}>
        One fruit. One season. One drop.
      </p>

      {/* Amber rule */}
      <div className={styles.rule} ref={ruleRef} />

      {/* Drop info */}
      <div className={styles.dropInfo} ref={countdownRef}>
        <span className={styles.dropLabel}>DROP 01 · GRAPES · OPENS FEB 2026</span>
        <Countdown targetDate="2026-02-01T00:00:00+05:30" />
      </div>

      {/* CTAs */}
      <div className={styles.ctas} ref={ctaRef}>
        <a href="#waitlist" className="btn btn-primary" onClick={(e) => {
          e.preventDefault();
          document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          Join Early Access
        </a>
        <a href="#showcase" className="btn btn-ghost" onClick={(e) => {
          e.preventDefault();
          document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          Explore Drops
        </a>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} ref={scrollRef}>
        <span className={styles.scrollText}>scroll</span>
        <div className={styles.scrollLine} />
        <div className={styles.scrollChevron}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
