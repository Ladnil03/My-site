import React, { useState } from 'react';
import { RevealBlock, useInView } from './hooks';

const POSITIONS = [
  { id: 'bowler', label: 'Python / Backend', x: 50, y: 82, prof: 85, years: 3 },
  { id: 'batsman', label: 'React / Frontend', x: 50, y: 18, prof: 90, years: 2 },
  { id: 'cover', label: 'Tailwind / CSS', x: 25, y: 35, prof: 88, years: 2 },
  { id: 'midoff', label: 'Node.js', x: 30, y: 55, prof: 75, years: 2 },
  { id: 'midwicket', label: 'Machine Learning', x: 70, y: 55, prof: 80, years: 2 },
  { id: 'thirdman', label: 'Git / DevOps', x: 85, y: 25, prof: 78, years: 2 },
  { id: 'fineleg', label: 'Databases', x: 15, y: 75, prof: 72, years: 2 },
  { id: 'slip', label: 'DSA / Problem Solving', x: 75, y: 35, prof: 82, years: 3 },
  { id: 'keeper', label: 'System Design', x: 50, y: 50, prof: 70, years: 1 },
];

export default function SkillsSection() {
  const [hovered, setHovered] = useState(null);
  const [ref, inView] = useInView(0.1);

  return (
    <section id="skills" style={{
      minHeight: '100vh', background: '#050d0a', padding: 'clamp(80px,12vh,140px) clamp(24px,6vw,80px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative',
    }}>
      <RevealBlock>
        <p style={{ fontFamily: "'Orbitron'", fontSize: '0.75rem', color: '#d4af37', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>
          FIELDING POSITIONS
        </p>
        <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#f5f5dc', marginBottom: '48px', textAlign: 'center' }}>
          SKILLS ARENA
        </h2>
      </RevealBlock>

      <RevealBlock delay={200}>
        <div ref={ref} style={{
          position: 'relative', width: 'min(700px, 90vw)', height: 'min(700px, 90vw)',
          margin: '0 auto',
        }}>
          {/* Cricket oval */}
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            {/* Field */}
            <ellipse cx="50" cy="50" rx="48" ry="48" fill="url(#fieldGrad)" stroke="rgba(245,245,220,0.15)" strokeWidth="0.3" />
            {/* Pitch */}
            <rect x="46" y="20" width="8" height="60" rx="1" fill="rgba(212,175,55,0.08)" stroke="rgba(212,175,55,0.2)" strokeWidth="0.2" />
            {/* Crease lines */}
            <line x1="44" y1="30" x2="56" y2="30" stroke="rgba(245,245,220,0.3)" strokeWidth="0.2" />
            <line x1="44" y1="70" x2="56" y2="70" stroke="rgba(245,245,220,0.3)" strokeWidth="0.2" />
            {/* 30 yard circle */}
            <ellipse cx="50" cy="50" rx="30" ry="30" fill="none" stroke="rgba(245,245,220,0.08)" strokeWidth="0.2" strokeDasharray="2 2" />
            <defs>
              <radialGradient id="fieldGrad"><stop offset="0%" stopColor="#0f3d2e" stopOpacity="0.4" /><stop offset="100%" stopColor="#050d0a" stopOpacity="0.8" /></radialGradient>
            </defs>
          </svg>

          {/* Skill positions */}
          {POSITIONS.map(pos => (
            <div key={pos.id}
              onMouseEnter={() => setHovered(pos.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)', textAlign: 'center',
                cursor: 'pointer', zIndex: hovered === pos.id ? 10 : 2,
              }}>
              {/* Glowing dot */}
              <div style={{
                width: '14px', height: '14px', borderRadius: '50%', margin: '0 auto 6px',
                background: hovered === pos.id ? '#d4af37' : '#10b981',
                boxShadow: `0 0 ${hovered === pos.id ? '20px' : '10px'} ${hovered === pos.id ? '#d4af37' : '#10b981'}`,
                animation: inView ? 'dotPulse 2s ease-in-out infinite' : 'none',
                animationDelay: `${Math.random() * 2}s`,
                transition: 'all 0.3s',
              }} />
              {/* Label */}
              <span style={{
                fontSize: 'clamp(0.55rem, 1.2vw, 0.75rem)', color: '#f5f5dc',
                whiteSpace: 'nowrap', fontWeight: 500,
                textShadow: '0 0 10px rgba(0,0,0,0.8)',
              }}>{pos.label}</span>

              {/* Tooltip */}
              {hovered === pos.id && (
                <div style={{
                  position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                  marginBottom: '12px', padding: '12px 16px', borderRadius: '10px',
                  background: 'rgba(5,13,10,0.95)', border: '1px solid rgba(212,175,55,0.3)',
                  backdropFilter: 'blur(10px)', minWidth: '160px', textAlign: 'left',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}>
                  <p style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 600, marginBottom: '8px' }}>{pos.label}</p>
                  <div style={{ marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.65rem', color: 'rgba(245,245,220,0.6)' }}>Proficiency</span>
                      <span style={{ fontSize: '0.65rem', color: '#d4af37' }}>{pos.prof}%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(15,61,46,0.5)', borderRadius: '2px' }}>
                      <div style={{ width: `${pos.prof}%`, height: '100%', background: 'linear-gradient(90deg, #0f3d2e, #d4af37)', borderRadius: '2px', transition: 'width 0.5s' }} />
                    </div>
                  </div>
                  <p style={{ fontSize: '0.65rem', color: 'rgba(245,245,220,0.5)' }}>{pos.years} years experience</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </RevealBlock>

      <style>{`
        @keyframes dotPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.7} }
      `}</style>
    </section>
  );
}
