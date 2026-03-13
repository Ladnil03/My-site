import React, { useState } from 'react';
import { RevealBlock } from './hooks';

const PROJECTS = [
  {
    title: 'Heart Disease Predictor',
    venue: ['Python', 'FastAPI', 'ML', 'SHAP'],
    desc: 'AI-powered heart disease prediction system with explainable AI using SHAP values and PDF report generation.',
    score: 95,
    github: 'https://github.com/ladnil03',
    live: '#',
    status: 'completed',
  },
  {
    title: 'Portfolio Website',
    venue: ['React', 'Three.js', 'GSAP', 'Tailwind'],
    desc: 'Cinematic cricket-themed portfolio with 3D elements, particle systems, and immersive animations.',
    score: 92,
    github: 'https://github.com/ladnil03',
    live: '#',
    status: 'live',
  },
  {
    title: 'AI Chat Assistant',
    venue: ['Python', 'React', 'Node.js', 'MongoDB'],
    desc: 'Intelligent conversational AI assistant with natural language processing and context awareness.',
    score: 88,
    github: 'https://github.com/ladnil03',
    live: '#',
    status: 'progress',
  },
  {
    title: 'E-Commerce Platform',
    venue: ['React', 'Node.js', 'SQL', 'Stripe'],
    desc: 'Full-stack e-commerce with payment integration, real-time inventory, and admin dashboard.',
    score: 90,
    github: 'https://github.com/ladnil03',
    live: '#',
    status: 'completed',
  },
  {
    title: 'Weather Intelligence',
    venue: ['Python', 'APIs', 'React', 'Charts'],
    desc: 'Real-time weather dashboard with ML-based prediction and beautiful data visualization.',
    score: 85,
    github: 'https://github.com/ladnil03',
    live: '#',
    status: 'live',
  },
  {
    title: 'Code Playground',
    venue: ['React', 'Monaco', 'Node.js', 'Docker'],
    desc: 'Browser-based code editor with live compilation, multi-language support, and collaborative features.',
    score: 87,
    github: 'https://github.com/ladnil03',
    live: '#',
    status: 'progress',
  },
];

const STATUS_MAP = {
  live: { label: '🟢 Live', color: '#10b981' },
  progress: { label: '🔵 In Progress', color: '#3b82f6' },
  completed: { label: '🏆 Completed', color: '#d4af37' },
};

export default function ProjectsSection() {
  const [clickEffect, setClickEffect] = useState(null);

  const handleClick = (e, i) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickEffect({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: i });
    setTimeout(() => setClickEffect(null), 600);
  };

  return (
    <section id="projects" style={{
      minHeight: '100vh', background: '#050d0a', padding: 'clamp(80px,12vh,140px) clamp(24px,6vw,80px)',
      position: 'relative',
    }}>
      <RevealBlock>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontFamily: "'Orbitron'", fontSize: '0.75rem', color: '#d4af37', letterSpacing: '0.3em', marginBottom: '12px' }}>
            INNINGS THAT DEFINED THE SEASON
          </p>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#f5f5dc', marginBottom: '16px' }}>
            MATCH HIGHLIGHTS
          </h2>
          <div style={{ width: '120px', height: '2px', background: 'linear-gradient(90deg, transparent, #0f3d2e, #d4af37, #0f3d2e, transparent)', margin: '0 auto' }} />
        </div>
      </RevealBlock>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '28px', maxWidth: '1400px', margin: '0 auto',
      }}>
        {PROJECTS.map((p, i) => (
          <RevealBlock key={i} delay={i * 100}>
            <div
              onClick={(e) => handleClick(e, i)}
              style={{
                background: 'linear-gradient(145deg, rgba(15,61,46,0.2), rgba(5,13,10,0.8))',
                border: '1px solid rgba(212,175,55,0.15)', borderRadius: '12px',
                padding: '28px', position: 'relative', overflow: 'hidden',
                backdropFilter: 'blur(8px)', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              className="project-card"
            >
              {/* Click shockwave */}
              {clickEffect?.id === i && (
                <div style={{
                  position: 'absolute', left: clickEffect.x, top: clickEffect.y,
                  width: '10px', height: '10px', borderRadius: '50%',
                  border: '2px solid rgba(212,175,55,0.6)',
                  animation: 'shockwave 0.6s ease-out forwards',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }} />
              )}

              {/* Status badge */}
              <div style={{
                position: 'absolute', top: '16px', right: '16px',
                fontSize: '0.65rem', padding: '4px 10px', borderRadius: '20px',
                background: `${STATUS_MAP[p.status].color}15`,
                color: STATUS_MAP[p.status].color,
                border: `1px solid ${STATUS_MAP[p.status].color}30`,
              }}>{STATUS_MAP[p.status].label}</div>

              <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: '1.5rem', color: '#f5f5dc', marginBottom: '12px', letterSpacing: '0.05em' }}>
                {p.title}
              </h3>

              {/* Tech badges */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {p.venue.map((v, j) => (
                  <span key={j} style={{
                    fontSize: '0.65rem', padding: '3px 10px', borderRadius: '20px',
                    background: 'rgba(15,61,46,0.4)', color: '#10b981',
                    border: '1px solid rgba(15,61,46,0.6)',
                  }}>{v}</span>
                ))}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'rgba(245,245,220,0.7)', lineHeight: 1.6, marginBottom: '18px' }}>
                {p.desc}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Orbitron'", color: '#d4af37', fontSize: '1rem', fontWeight: 700 }}>
                  ★ {p.score}/100
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '0.7rem', padding: '6px 14px', borderRadius: '6px', background: 'rgba(245,245,220,0.08)', color: '#f5f5dc', textDecoration: 'none', border: '1px solid rgba(245,245,220,0.1)', transition: 'all 0.2s' }}>
                    ⚡ Code
                  </a>
                  <a href={p.live} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '0.7rem', padding: '6px 14px', borderRadius: '6px', background: 'rgba(177,18,38,0.2)', color: '#f5f5dc', textDecoration: 'none', border: '1px solid rgba(177,18,38,0.3)', transition: 'all 0.2s' }}>
                    🏏 Demo
                  </a>
                </div>
              </div>
            </div>
          </RevealBlock>
        ))}
      </div>

      <style>{`
        @keyframes shockwave { to { width:300px; height:300px; opacity:0; } }
        .project-card:hover { transform:translateY(-8px)!important; box-shadow:0 20px 40px rgba(0,0,0,0.4),0 0 20px rgba(212,175,55,0.1)!important; border-color:rgba(212,175,55,0.3)!important; }
      `}</style>
    </section>
  );
}
