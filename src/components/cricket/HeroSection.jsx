import React, { Suspense } from 'react';
import { RevealBlock, TypewriterCycle } from './hooks';
import CricketBall3D from './CricketBall3D';

function FallbackBall() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 'clamp(150px, 30vw, 280px)', height: 'clamp(150px, 30vw, 280px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #d42a3e 0%, #b11226 50%, #8a0e1e 100%)',
        boxShadow: '0 0 60px rgba(177,18,38,0.5), 0 0 120px rgba(177,18,38,0.2), inset -15px -15px 30px rgba(0,0,0,0.3)',
        position: 'relative',
        animation: 'cssBallFloat 4s ease-in-out infinite',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '8%', right: '8%',
          height: '3px', background: '#f5f5dc', transform: 'translateY(-50%) rotate(-15deg)',
          borderRadius: '50%', boxShadow: '0 0 8px rgba(245,245,220,0.4)',
        }} />
      </div>
      <style>{`@keyframes cssBallFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }`}</style>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="home" style={{
      minHeight: '100vh', position: 'relative', display: 'flex',
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      background: '#050d0a', paddingTop: '60px',
    }}>
      {/* Pitch texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect fill='%230f3d2e' width='80' height='600' x='160'/%3E%3Cline x1='160' y1='100' x2='240' y2='100' stroke='%23f5f5dc' stroke-width='2'/%3E%3Cline x1='160' y1='500' x2='240' y2='500' stroke='%23f5f5dc' stroke-width='2'/%3E%3C/svg%3E")`,
        backgroundSize: '400px 600px', backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }} />

      {/* Floodlight cones */}
      {[
        { top: '-20%', left: '-10%', bg: 'radial-gradient(ellipse at center, rgba(26,58,92,0.15) 0%, transparent 70%)' },
        { top: '-20%', right: '-10%', bg: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)' },
      ].map((s, i) => (
        <div key={i} style={{
          position: 'absolute', ...s, width: '800px', height: '800px',
          background: s.bg, pointerEvents: 'none',
        }} />
      ))}

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '40px', maxWidth: '1400px', width: '100%',
        padding: '0 clamp(24px, 6vw, 80px)', alignItems: 'center',
        position: 'relative', zIndex: 2,
      }} className="hero-grid">
        {/* 3D Ball */}
        <div style={{ height: 'clamp(300px, 50vh, 500px)' }}>
          <Suspense fallback={<FallbackBall />}>
            <CricketBall3D />
          </Suspense>
        </div>

        {/* Text content */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          <RevealBlock>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif", color: '#f5f5dc',
              fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1,
              letterSpacing: '0.05em', marginBottom: '8px',
            }}>NIL LAD</h1>
          </RevealBlock>

          <RevealBlock delay={200}>
            <div style={{
              fontFamily: "'Inter'", fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              color: '#f5f5dc', marginBottom: '16px', minHeight: '1.8em',
            }}>
              <TypewriterCycle
                texts={['Full Stack Developer', 'AI Builder', 'Problem Solver', 'Cricket Enthusiast']}
                speed={70}
              />
            </div>
          </RevealBlock>

          <RevealBlock delay={400}>
            <p style={{
              fontFamily: "'Poppins'", fontStyle: 'italic', color: '#d4af37',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', marginBottom: '32px',
              textShadow: '0 0 20px rgba(212,175,55,0.3)',
            }}>
              Building Winning Digital Innings
            </p>
          </RevealBlock>

          <RevealBlock delay={600}>
            <a href="#about" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #b11226, #d42a3e)',
              color: '#f5f5dc', padding: '14px 32px', borderRadius: '6px',
              textDecoration: 'none', fontFamily: "'Bebas Neue'",
              fontSize: '1.2rem', letterSpacing: '0.15em',
              boxShadow: '0 0 20px rgba(177,18,38,0.4), 0 4px 15px rgba(0,0,0,0.3)',
              transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
            }} className="cta-btn">
              Play My Innings ▶
            </a>
          </RevealBlock>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '30px', left: '50%',
        transform: 'translateX(-50%)', textAlign: 'center',
        animation: 'floatY 2s ease-in-out infinite',
      }}>
        <p style={{ fontSize: '0.7rem', color: 'rgba(245,245,220,0.4)', letterSpacing: '0.2em', marginBottom: '8px' }}>
          SCROLL TO EXPLORE
        </p>
        <span style={{ fontSize: '1.2rem', color: 'rgba(212,175,55,0.5)' }}>↓</span>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes floatY { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-10px)} }
        .cta-btn:hover { transform:translateY(-2px); box-shadow:0 0 30px rgba(177,18,38,0.6),0 8px 25px rgba(0,0,0,0.4)!important; }
        @media(max-width:768px) { .hero-grid { grid-template-columns:1fr!important; text-align:center; } }
      `}</style>
    </section>
  );
}
