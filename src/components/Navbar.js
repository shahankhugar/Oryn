'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 100);
      setHidden(y > 200 && y > lastScroll.current);
      lastScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}
      >
        <div className={styles.container}>
          <a href="#home" className={styles.logo} onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
            O R Y N
          </a>

          <ul className={styles.links}>
            {['drops', 'subscribe', 'about', 'contact'].map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={styles.link}
                  onClick={(e) => { e.preventDefault(); scrollTo(id === 'drops' ? 'showcase' : id === 'subscribe' ? 'subscription' : id === 'about' ? 'story' : 'waitlist'); }}
                >
                  {id}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#waitlist"
            className={styles.cta}
            onClick={(e) => { e.preventDefault(); scrollTo('waitlist'); }}
          >
            Join Early Access
          </a>

          <button
            className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.overlayOpen : ''}`}>
        <div className={styles.mobileLinks}>
          {[
            { label: 'Drops', id: 'showcase' },
            { label: 'Subscribe', id: 'subscription' },
            { label: 'About', id: 'story' },
            { label: 'Contact', id: 'waitlist' },
          ].map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={styles.mobileLink}
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
