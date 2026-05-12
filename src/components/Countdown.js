'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './Countdown.module.css';

function FlipCard({ value, label }) {
  const [current, setCurrent] = useState(value);
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== current) {
      setPrev(current);
      setCurrent(value);
      setFlipping(true);
      const timeout = setTimeout(() => setFlipping(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [value, current]);

  const display = String(value).padStart(2, '0');
  const prevDisplay = String(prev).padStart(2, '0');

  return (
    <div className={styles.block}>
      <div className={`${styles.flipContainer} ${flipping ? styles.flipping : ''}`}>
        <div className={styles.flipFront}>{display}</div>
        <div className={styles.flipBack}>{prevDisplay}</div>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState({ days: 0, hrs: 0, min: 0, sec: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((diff / (1000 * 60 * 60)) % 24),
        min: Math.floor((diff / (1000 * 60)) % 60),
        sec: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={styles.countdown}>
      <FlipCard value={time.days} label="DAYS" />
      <span className={styles.colon}>:</span>
      <FlipCard value={time.hrs} label="HRS" />
      <span className={styles.colon}>:</span>
      <FlipCard value={time.min} label="MIN" />
      <span className={styles.colon}>:</span>
      <FlipCard value={time.sec} label="SEC" />
    </div>
  );
}
