'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Philosophy.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const panelsRef = useRef([]);
  const progressRef = useRef(null);
  
  // Panel 1 refs
  const p1WordsRef = useRef([]);
  // Panel 2 refs
  const p2TextRef = useRef(null);
  const p2CounterRef = useRef(null);
  // Panel 3 refs
  const p3TextRef = useRef(null);
  const p3SubRef = useRef(null);
  // Panel 4 refs
  const p4LinesRef = useRef([]);
  // Panel 5 refs
  const p5WordmarkRef = useRef(null);
  const p5TaglineRef = useRef(null);
  const p5RuleRef = useRef(null);

  useGSAP(() => {
    const panels = panelsRef.current;
    
    // Main horizontal scroll animation
    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => '+=' + trackRef.current.offsetWidth,
      }
    });

    // Progress bar
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => '+=' + trackRef.current.offsetWidth,
        scrub: 1,
      }
    });

    // Breathing background gradient
    gsap.to(`.${styles.bgGradient}`, {
      scale: 1.15,
      opacity: 0.6,
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    // Panel 1: Staggered words
    gsap.from(p1WordsRef.current, {
      y: 40,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: panels[0],
        containerAnimation: scrollTween,
        start: 'left center',
        toggleActions: 'play none none reverse'
      }
    });

    // Panel 2: Fading opacity + Counter
    gsap.to(p2TextRef.current, {
      backgroundPosition: '100% 0',
      ease: 'none',
      scrollTrigger: {
        trigger: panels[1],
        containerAnimation: scrollTween,
        start: 'left center',
        end: 'right center',
        scrub: true
      }
    });

    gsap.from(p2CounterRef.current, {
      innerText: 0,
      duration: 2,
      snap: { innerText: 1 },
      ease: 'power1.out',
      scrollTrigger: {
        trigger: panels[1],
        containerAnimation: scrollTween,
        start: 'left 70%',
        toggleActions: 'play none none reverse'
      },
      modifiers: {
        innerText: val => `₹${Number(val).toLocaleString()} Crore`
      }
    });

    // Panel 3: Color transition + Sub text
    gsap.fromTo(p3TextRef.current,
      { color: 'var(--white-tertiary)' },
      {
        color: 'var(--amber-primary)',
        scrollTrigger: {
          trigger: panels[2],
          containerAnimation: scrollTween,
          start: 'center center',
          end: 'right center',
          scrub: true
        }
      }
    );

    gsap.fromTo(p3SubRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: panels[2],
          containerAnimation: scrollTween,
          start: 'center center',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Panel 4: Line by line stagger
    gsap.from(p4LinesRef.current, {
      x: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: panels[3],
        containerAnimation: scrollTween,
        start: 'left center',
        toggleActions: 'play none none reverse'
      }
    });

    // Panel 5: Entrance
    gsap.from([p5WordmarkRef.current, p5TaglineRef.current], {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: panels[4],
        containerAnimation: scrollTween,
        start: 'left center',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from(p5RuleRef.current, {
      scaleX: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: panels[4],
        containerAnimation: scrollTween,
        start: 'center center',
        toggleActions: 'play none none reverse'
      }
    });

  }, { scope: containerRef });

  return (
    <section className={styles.container} ref={containerRef}>
      <div className={styles.bgGradient} />
      
      <div className={styles.track} ref={trackRef}>
        
        {/* Panel 1 */}
        <div className={styles.panel} ref={el => panelsRef.current[0] = el}>
          <div className={styles.panelContentCentered}>
            <h2 className={`${styles.h2} font-display`}>
              {"India grows over 50 seasonal fruits.".split(' ').map((word, i) => (
                <span key={i} className={styles.word} ref={el => p1WordsRef.current[i] = el}>
                  {word}&nbsp;
                </span>
              ))}
            </h2>
            <p className={styles.p1Sub}>
              {"Each one alive for a few weeks. At their absolute peak. Then gone.".split(' ').map((word, i) => (
                <span key={i} className={styles.word} ref={el => p1WordsRef.current[i + 10] = el}>
                  {word}&nbsp;
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Panel 2 */}
        <div className={styles.panel} ref={el => panelsRef.current[1] = el}>
          <div className={styles.panelSplit}>
            <div className={styles.splitLeft}>
              <h2 className={`${styles.h2Fade} font-display`} ref={p2TextRef}>
                The industry ignored the season.
              </h2>
            </div>
            <div className={styles.splitRight}>
              <div className={styles.counterBlock}>
                <span className={`${styles.counter} font-mono`} ref={p2CounterRef}>11000</span>
                <p className={styles.counterSub}>India's packaged juice market. Same shelf. Same bottle. Every month.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3 */}
        <div className={styles.panel} ref={el => panelsRef.current[2] = el}>
          <div className={styles.panelContentCentered}>
            <h2 className={`${styles.h2Huge} font-display`} ref={p3TextRef}>
              Nobody made you feel like missing it.
            </h2>
            <p className={`${styles.p3Sub} text-amber`} ref={p3SubRef}>
              Until now.
            </p>
          </div>
        </div>

        {/* Panel 4 */}
        <div className={styles.panel} ref={el => panelsRef.current[3] = el}>
          <div className={styles.panelContentLeft}>
            <span className={styles.amberLabel}>THE SOLUTION</span>
            <div className={styles.linesStack}>
              <h2 className={`${styles.h2Stack} font-display`} ref={el => p4LinesRef.current[0] = el}>A drop.</h2>
              <h2 className={`${styles.h2Stack} font-display`} ref={el => p4LinesRef.current[1] = el}>A window.</h2>
              <h2 className={`${styles.h2Stack} font-display`} ref={el => p4LinesRef.current[2] = el}>A sold-out.</h2>
              <h2 className={`${styles.h2StackAmber} font-display text-amber`} ref={el => p4LinesRef.current[3] = el}>A year's wait.</h2>
            </div>
          </div>
        </div>

        {/* Panel 5 */}
        <div className={styles.panel} ref={el => panelsRef.current[4] = el}>
          <div className={styles.panelContentCentered}>
            <h1 className={`${styles.p5Wordmark} font-display`} ref={p5WordmarkRef}>ORYN</h1>
            <p className={styles.p5Tagline} ref={p5TaglineRef}>One fruit. One season. One drop.</p>
            <div className={styles.p5Rule} ref={p5RuleRef} />
          </div>
        </div>

      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} ref={progressRef} />
      </div>
    </section>
  );
}
