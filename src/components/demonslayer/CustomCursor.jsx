import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const particlesRef = useRef([]);
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);
  const particleId = useRef(0);

  // Smooth ring follow + dot position
  useEffect(() => {
    const animate = () => {
      // Dot follows exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`;
      }
      // Ring follows with lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  // Mouse move handler
  useEffect(() => {
    let spawnTimer = 0;
    const onMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Spawn particle sparks (throttled)
      spawnTimer++;
      if (spawnTimer % 3 === 0) {
        particleId.current++;
        const newP = {
          id: particleId.current,
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 40,
          vy: (Math.random() - 0.5) * 40,
          life: 1,
        };
        setParticles(prev => [...prev.slice(-7), newP]);
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Decay particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, life: p.life - 0.15 }))
          .filter(p => p.life > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ds-cursor-container" ref={containerRef} aria-hidden="true">
      {/* Glowing dot */}
      <div className="ds-cursor-dot" ref={dotRef} />
      {/* Soft ring */}
      <div className="ds-cursor-ring" ref={ringRef} />
      {/* Particle sparks */}
      {particles.map(p => (
        <div
          key={p.id}
          className="ds-cursor-spark"
          style={{
            left: 0,
            top: 0,
            transform: `translate(${p.x + p.vx * (1 - p.life)}px, ${p.y + p.vy * (1 - p.life)}px)`,
            opacity: p.life * 0.8,
            width: `${2 + p.life * 3}px`,
            height: `${2 + p.life * 3}px`,
          }}
        />
      ))}
    </div>
  );
}
