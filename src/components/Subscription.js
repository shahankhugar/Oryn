'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Subscription.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Subscription() {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo(card1Ref.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    tl.fromTo(card2Ref.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );
  }, { scope: sectionRef });

  return (
    <section className={`section ${styles.container}`} id="subscription" ref={sectionRef}>
      <div className="section-container">
        
        <div className={styles.header}>
          <h2 className="font-display">For Those Who Know.</h2>
          <p className="font-body text-secondary">
            Subscribers don't get a discount. They get in first.
          </p>
        </div>

        <div className={styles.grid}>
          
          {/* Card 1 */}
          <div className={styles.card1} ref={card1Ref}>
            <div className={styles.topAccent} />
            <div className={styles.cardHeader}>
              <span className={styles.tag}>SEASONAL SUBSCRIBER</span>
              <div className={styles.priceContainer}>
                <span className="font-mono">₹299</span>
                <span className={styles.monthLabel}>/month</span>
              </div>
            </div>
            
            <div className={styles.divider} />
            
            <ul className={styles.features}>
              <li><span className="text-amber">-</span> Early drop access before public window</li>
              <li><span className="text-amber">-</span> First to know on every drop announcement</li>
              <li><span className="text-amber">-</span> Locked in before general release</li>
            </ul>

            <div className={styles.footer}>
              <button className="btn btn-outline-full">Join Subscriber List</button>
              <p className={styles.cancelText}>Cancel anytime. No commitment.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className={styles.card2} ref={card2Ref}>
            <div className={styles.topAccent} />
            <div className={styles.cornerBadge}>MOST EXCLUSIVE</div>
            
            <div className={styles.cardHeader}>
              <span className={styles.tag}>PREMIUM MEMBER</span>
              <div className={styles.priceContainer}>
                <span className="font-mono">₹599</span>
                <span className={styles.monthLabel}>/month</span>
              </div>
            </div>
            
            <div className={styles.divider} />
            
            <ul className={styles.features}>
              <li><span className="text-amber">-</span> Everything in Seasonal Subscriber</li>
              <li><span className="text-amber">-</span> Reserved quantity — your bottle held regardless of sell-out</li>
              <li><span className="text-amber">-</span> Limited edition packaging on hero drops</li>
              <li><span className="text-amber">-</span> Mystery drop once a year — unknown fruit, unknown date</li>
              <li><span className="text-amber">-</span> Direct line to the ORYN team</li>
            </ul>

            <div className={styles.footer}>
              <button className="btn btn-solid-full">Apply for Premium</button>
            </div>
          </div>

        </div>

        <p className={styles.bottomNote}>
          Subscriptions open with Drop 01. Join the waitlist today.
        </p>

      </div>
    </section>
  );
}
