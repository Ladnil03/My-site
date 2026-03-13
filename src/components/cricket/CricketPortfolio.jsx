import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollProgress } from './hooks';

import LoadingScreen from './LoadingScreen';
import ParticleField from './ParticleField';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from './ContactSection';

/* ═══════════════════════════════════════
   CUSTOM CRICKET BALL CURSOR
   ═══════════════════════════════════════ */

function CricketCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.body.style.cursor = 'none';

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Cricket ball dot */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, width: '12px', height: '12px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #d42a3e, #b11226)',
        pointerEvents: 'none', zIndex: 99999, willChange: 'transform',
        boxShadow: '0 0 6px rgba(177,18,38,0.5)',
      }}>
        {/* Seam line */}
        <div style={{
          position: 'absolute', top: '50%', left: '15%', right: '15%',
          height: '1px', background: '#f5f5dc', transform: 'translateY(-50%) rotate(-20deg)',
          opacity: 0.7,
        }} />
      </div>
      {/* Ring */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, width: '36px', height: '36px',
        borderRadius: '50%', border: '1.5px solid rgba(212,175,55,0.3)',
        pointerEvents: 'none', zIndex: 99998, willChange: 'transform',
      }} />
    </>
  );
}

/* ═══════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════ */

function ScrollProgressBar({ progress }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: `${progress * 100}%`,
      height: '3px',
      background: 'linear-gradient(90deg, #0f3d2e, #10b981, #d4af37)',
      zIndex: 100001, transition: 'width 0.1s linear',
      boxShadow: '0 0 10px rgba(212,175,55,0.4)',
    }} />
  );
}

/* ═══════════════════════════════════════
   KONAMI CODE EASTER EGG
   ═══════════════════════════════════════ */

function useKonamiCode(callback) {
  const seq = useRef([]);
  const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

  useEffect(() => {
    const onKey = (e) => {
      seq.current.push(e.keyCode);
      if (seq.current.length > code.length) seq.current.shift();
      if (JSON.stringify(seq.current) === JSON.stringify(code)) {
        callback();
        seq.current = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [callback]);
}

/* ═══════════════════════════════════════
   WICKET CELEBRATION (Easter Egg)
   ═══════════════════════════════════════ */

function WicketCelebration({ visible, onClose }) {
  if (!visible) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200000,
      background: 'rgba(5,13,10,0.95)', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', animation: 'fadeIn 0.5s ease',
    }}>
      <div style={{ fontSize: '6rem', animation: 'bounce 0.5s ease infinite alternate', marginBottom: '24px' }}>🏏</div>
      <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: '3rem', color: '#d4af37', marginBottom: '12px', textAlign: 'center' }}>
        WICKET! HOWZAT! 🎉
      </h2>
      <p style={{ color: '#f5f5dc', fontSize: '1.1rem', marginBottom: '8px' }}>You found the Easter Egg!</p>
      <p style={{ color: 'rgba(245,245,220,0.5)', fontSize: '0.8rem' }}>Click anywhere to dismiss</p>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes bounce { from{transform:translateY(0) rotate(-10deg)} to{transform:translateY(-20px) rotate(10deg)} }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
   ═══════════════════════════════════════ */

export default function CricketPortfolio() {
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const progress = useScrollProgress();

  const triggerCelebration = useCallback(() => setShowCelebration(true), []);
  useKonamiCode(triggerCelebration);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <CricketCursor />
          <ScrollProgressBar progress={progress} />
          <ParticleField />
          <Navbar />

          <main style={{ position: 'relative', zIndex: 2 }}>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
          </main>

          <WicketCelebration
            visible={showCelebration}
            onClose={() => setShowCelebration(false)}
          />
        </>
      )}

      <style>{`
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media (pointer: coarse) { body { cursor: auto!important; } }

        /* Smooth scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050d0a; }
        ::-webkit-scrollbar-thumb { background: rgba(15,61,46,0.6); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.4); }

        /* Selection color */
        ::selection { background: rgba(177,18,38,0.4); color: #f5f5dc; }
      `}</style>
    </>
  );
}
