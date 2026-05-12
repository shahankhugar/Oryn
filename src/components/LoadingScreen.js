'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const lineRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Letters fade in one by one
    tl.fromTo(
      lettersRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.12, ease: 'power2.out' },
      0.3
    );

    // Hold
    tl.to({}, { duration: 0.6 });

    // Amber underline draws
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.4, ease: 'power2.inOut' }
    );

    // Typewriter text
    tl.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );

    // Progress bar fills
    tl.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.0, ease: 'power1.inOut' }
    );

    // Fade out everything except wordmark
    tl.to([lineRef.current, textRef.current, progressRef.current], {
      opacity: 0,
      duration: 0.3,
    });

    // Wordmark scales up
    tl.to(`.${styles.wordmark}`, {
      scale: 1.08,
      duration: 0.4,
      ease: 'power2.out',
    });

    // Split wipe exit
    tl.to(containerRef.current, {
      clipPath: 'inset(0 50% 0 50%)',
      duration: 0.6,
      ease: 'power3.inOut',
    });

    tl.set(containerRef.current, { display: 'none' });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.content}>
        <div className={styles.wordmark}>
          {'ORYN'.split('').map((letter, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              className={styles.letter}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className={styles.underline} ref={lineRef} />

        <div className={styles.loadingText} ref={textRef}>
          LOADING DROP CALENDAR
        </div>

        <div className={styles.progressTrack}>
          <div className={styles.progressBar} ref={progressRef} />
        </div>
      </div>
    </div>
  );
}
