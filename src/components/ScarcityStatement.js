'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScarcityStatement.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ScarcityStatement() {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const finalRef = useRef(null);
  const paraRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
      }
    });

    // Fade in text 1
    tl.fromTo(text1Ref.current, 
      { opacity: 0, y: 40, color: 'var(--white-ghost)' },
      { opacity: 1, y: 0, color: 'var(--white-primary)', duration: 1 }
    );

    // Fade in text 2
    tl.fromTo(text2Ref.current,
      { opacity: 0, y: 40, color: 'var(--white-ghost)' },
      { opacity: 1, y: 0, color: 'var(--white-primary)', duration: 1 },
      '+=0.5'
    );

    // Fade in text 3
    tl.fromTo(text3Ref.current,
      { opacity: 0, y: 40, color: 'var(--white-ghost)' },
      { opacity: 1, y: 0, color: 'var(--white-primary)', duration: 1 },
      '+=0.5'
    );

    // Fade in text 4
    tl.fromTo(text4Ref.current,
      { opacity: 0, y: 40, color: 'var(--white-ghost)' },
      { opacity: 1, y: 0, color: 'var(--white-primary)', duration: 1 },
      '+=0.5'
    );

    // Hold
    tl.to({}, { duration: 1 });

    // Dim all previous text
    tl.to([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current], {
      color: 'var(--white-tertiary)',
      opacity: 0.6,
      duration: 1
    });

    // Reveal final statement
    tl.fromTo(finalRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' },
      '<'
    );

    // Reveal paragraph
    tl.fromTo(paraRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      '+=0.5'
    );

  }, { scope: containerRef });

  return (
    <section className={styles.container} ref={containerRef}>
      <div className={styles.content}>
        <div className={styles.statements}>
          <h2 className={`${styles.statement} font-display`} ref={text1Ref}>Limited batch.</h2>
          <h2 className={`${styles.statement} font-display`} ref={text2Ref}>Fixed window.</h2>
          <h2 className={`${styles.statement} font-display`} ref={text3Ref}>
            <span className="text-amber">No</span> restocks.
          </h2>
          <h2 className={`${styles.statement} font-display`} ref={text4Ref}>
            <span className="text-amber">No</span> exceptions.
          </h2>
        </div>

        <div className={styles.finalReveal}>
          <h3 className={`${styles.finalStatement} font-display`} ref={finalRef}>
            When it's gone, it's gone.
          </h3>
          <p className={`${styles.paragraph} font-body`} ref={paraRef}>
            Every ORYN drop is a fixed production batch tied to the fruit's natural season. The sold-out is not a supply failure. It is the entire point.
          </p>
        </div>
      </div>
    </section>
  );
}
