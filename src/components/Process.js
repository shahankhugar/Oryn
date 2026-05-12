'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Process.module.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'The season begins.',
    desc: "ORYN tracks India's fruit calendar. When a fruit hits its peak window, the drop is scheduled. Not before. Not after.",
  },
  {
    num: '02',
    title: 'The batch is pressed.',
    desc: 'A fixed number of 300ml bottles. Cold pressed. Pulp only. No concentrates. No additions. The fruit and nothing else.',
  },
  {
    num: '03',
    title: 'The countdown begins.',
    desc: 'The ORYN app goes live with the countdown. Subscribers unlock early access. The public window opens when the timer hits zero.',
  },
  {
    num: '04',
    title: 'The drop closes.',
    desc: 'Sold out or season ended — the drop closes. No restocks. The next drop is announced. The cycle begins again.',
  }
];

export default function Process() {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const pathRef = useRef(null);

  useGSAP(() => {
    const panels = stepsRef.current;
    
    // Pin section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
      }
    });

    // Animate path draw
    tl.fromTo(pathRef.current,
      { strokeDashoffset: 1000 },
      { strokeDashoffset: 0, ease: 'none', duration: 1 },
      0
    );

    // Fade between panels
    panels.forEach((panel, i) => {
      if (i > 0) {
        tl.fromTo(panel,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.2 },
          (i - 0.5) * (1 / (panels.length - 1))
        );
      }
      
      if (i < panels.length - 1) {
        tl.to(panel,
          { opacity: 0, y: -50, duration: 0.2 },
          i * (1 / (panels.length - 1)) + 0.1
        );
      }
    });

  }, { scope: sectionRef });

  return (
    <section className={styles.container} id="process" ref={sectionRef}>
      <div className={styles.content}>
        
        {/* Left: Animated Circuit Path */}
        <div className={styles.visualSide}>
          <svg className={styles.circuitSvg} viewBox="0 0 100 800" preserveAspectRatio="none">
            <path 
              ref={pathRef}
              d="M50,0 L50,800" 
              fill="none" 
              stroke="var(--amber-primary)" 
              strokeWidth="2" 
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
          </svg>
        </div>

        {/* Right: Steps */}
        <div className={styles.textSide}>
          {STEPS.map((step, i) => (
            <div 
              key={step.num} 
              className={styles.stepPanel} 
              ref={el => stepsRef.current[i] = el}
              style={{ opacity: i === 0 ? 1 : 0, transform: i === 0 ? 'translateY(0)' : 'translateY(50px)' }}
            >
              <div className={`${styles.stepNum} font-mono`}>STEP {step.num}</div>
              <h2 className={`${styles.stepTitle} font-display`}>{step.title}</h2>
              <p className={`${styles.stepDesc} font-body`}>{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
