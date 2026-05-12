'use client';

import './globals.css';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}

function PageProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${progress}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <div className="page-progress" ref={barRef} />;
}

function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef(Array.from({ length: 6 }, () => ({ x: 0, y: 0 })));

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e) => {
      const target = e.target.closest('a, button, input, [data-cursor-hover]');
      if (target && cursorRef.current) {
        cursorRef.current.classList.add('hovering');
      }
    };

    const onOut = (e) => {
      const target = e.target.closest('a, button, input, [data-cursor-hover]');
      if (target && cursorRef.current) {
        cursorRef.current.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    let raf;
    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`;
        cursorRef.current.style.top = `${pos.current.y}px`;
      }

      trailPos.current.forEach((tp, i) => {
        const target = i === 0 ? pos.current : trailPos.current[i - 1];
        tp.x += (target.x - tp.x) * 0.15;
        tp.y += (target.y - tp.y) * 0.15;
        if (trailRefs.current[i]) {
          trailRefs.current[i].style.left = `${tp.x}px`;
          trailRefs.current[i].style.top = `${tp.y}px`;
          trailRefs.current[i].style.opacity = `${0.3 - i * 0.05}`;
        }
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" ref={cursorRef} />
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="cursor-trail"
          ref={(el) => (trailRefs.current[i] = el)}
        />
      ))}
    </>
  );
}

function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return children;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="ORYN — India's first seasonal fruit juice drop brand. Limited batch. Fixed window. No restocks." />
        <title>ORYN — Seasonal Fruit Juice Drops</title>
      </head>
      <body>
        <SmoothScroll>
          <GrainOverlay />
          <PageProgress />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
