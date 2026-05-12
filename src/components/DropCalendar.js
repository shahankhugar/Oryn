'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './DropCalendar.module.css';

gsap.registerPlugin(ScrollTrigger);

const DROPS = [
  { id: '01', emoji: '🍇', name: 'Grapes', month: 'February', season: 'PRE-SUMMER' },
  { id: '02', emoji: '🥭', name: 'Mango', month: 'April', season: 'SUMMER PEAK' },
  { id: '03', emoji: '🍉', name: 'Watermelon', month: 'May', season: 'LATE SUMMER' },
  { id: '04', emoji: '🍈', name: 'Litchi', month: 'June', season: 'MONSOON START' },
  { id: '05', emoji: '🍐', name: 'Guava', month: 'August', season: 'MONSOON' },
  { id: '06', emoji: '🍎', name: 'Pomegranate', month: 'October', season: 'AUTUMN' },
  { id: '07', emoji: '🍊', name: 'Orange', month: 'December', season: 'WINTER' },
  { id: '08', emoji: '🍓', name: 'Strawberry', month: 'January', season: 'LATE WINTER' },
];

export default function DropCalendar() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const markersRef = useRef([]);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }
    });

    // Draw main timeline
    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }
    );

    // Pop up markers
    tl.fromTo(markersRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' },
      '-=0.6'
    );

    // Fade in cards from their respective sides
    cardsRef.current.forEach((card, i) => {
      const isTop = i % 2 === 0;
      tl.fromTo(card,
        { opacity: 0, y: isTop ? 20 : -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        `-=${0.5 - (i * 0.05)}`
      );
    });

  }, { scope: containerRef });

  return (
    <section className={styles.container} id="calendar" ref={containerRef}>
      <h2 className={`${styles.heading} font-display`}>8 Drops. 1 Year.</h2>

      <div className={styles.timelineWrapper}>
        
        {/* The main horizontal line */}
        <div className={styles.mainLine} ref={lineRef} />

        <div className={styles.dropsTrack}>
          {DROPS.map((drop, i) => {
            const isTop = i % 2 === 0;
            return (
              <div key={drop.id} className={styles.dropColumn}>
                
                {/* Above line card */}
                {isTop && (
                  <div className={`${styles.card} ${styles.cardTop}`} ref={el => cardsRef.current[i] = el}>
                    <span className={`${styles.dropId} font-mono`}>DROP {drop.id}</span>
                    <span className={styles.emoji}>{drop.emoji}</span>
                    <h3 className={`${styles.name} font-display`}>{drop.name}</h3>
                    <div className={`${styles.month} font-body`}>{drop.month}</div>
                    <div className={`${styles.season} font-body`}>{drop.season}</div>
                    
                    <div className={styles.tooltip}>Opens {drop.month} — Limited Batch</div>
                  </div>
                )}

                {/* Marker */}
                <div className={styles.markerContainer}>
                  <div className={isTop ? styles.connectingLineTop : styles.connectingLineBottom} />
                  <div className={styles.tick} ref={el => markersRef.current[i] = el} />
                </div>

                {/* Below line card */}
                {!isTop && (
                  <div className={`${styles.card} ${styles.cardBottom}`} ref={el => cardsRef.current[i] = el}>
                    <span className={`${styles.dropId} font-mono`}>DROP {drop.id}</span>
                    <span className={styles.emoji}>{drop.emoji}</span>
                    <h3 className={`${styles.name} font-display`}>{drop.name}</h3>
                    <div className={`${styles.month} font-body`}>{drop.month}</div>
                    <div className={`${styles.season} font-body`}>{drop.season}</div>
                    
                    <div className={styles.tooltip}>Opens {drop.month} — Limited Batch</div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
