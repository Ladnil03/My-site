import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════
   CUSTOM HOOKS
   ═══════════════════════════════════════ */

export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isInView];
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

/* ═══════════════════════════════════════
   TYPEWRITER
   ═══════════════════════════════════════ */

export function TypewriterCycle({ texts, speed = 80, pauseMs = 2000 }) {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timer;

    if (!deleting && charIndex <= current.length) {
      timer = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex(charIndex + 1);
      }, speed);
    } else if (!deleting && charIndex > current.length) {
      timer = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => {
        setCharIndex(charIndex - 1);
        setDisplayed(current.slice(0, charIndex - 1));
      }, speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, deleting, textIndex, texts, speed, pauseMs]);

  return (
    <span>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '1em',
        background: '#d4af37',
        marginLeft: '2px',
        animation: 'cursorBlink 1s step-end infinite',
        verticalAlign: 'text-bottom',
      }} />
    </span>
  );
}

/* ═══════════════════════════════════════
   COUNTER (CountUp on scroll)
   ═══════════════════════════════════════ */

export function CountUpNumber({ end, duration = 2000, suffix = '' }) {
  const [ref, inView] = useInView(0.3);
  const [value, setValue] = useState(0);
  const counted = useRef(false);

  useEffect(() => {
    if (!inView || counted.current) return;
    counted.current = true;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

/* ═══════════════════════════════════════
   REVEAL BLOCK
   ═══════════════════════════════════════ */

export function RevealBlock({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
