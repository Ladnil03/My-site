import React from 'react';
import { RevealBlock, CountUpNumber, useInView } from './hooks';

const STATS = [
  { label: 'Batting Average', meaning: 'Problem Solving', value: 95 },
  { label: 'Strike Rate', meaning: 'Dev Speed', value: 142 },
  { label: 'Matches Played', meaning: 'Projects Built', value: 15 },
  { label: 'Centuries', meaning: 'Major Achievements', value: 5 },
  { label: 'Not Outs', meaning: 'Bugs Fixed', value: 200, suffix: '+' },
];

export default function AboutSection() {
  const [cardRef, cardInView] = useInView(0.2);

  return (
    <section id="about" style={{
      minHeight: '100vh', background: '#050d0a', padding: 'clamp(80px,12vh,140px) clamp(24px,6vw,80px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
    }}>
      {/* Section header */}
      <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        <RevealBlock>
          <p style={{
            fontFamily: "'Orbitron'", fontSize: '0.75rem', color: '#d4af37',
            letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px',
          }}>PLAYER PROFILE</p>
          <h2 style={{
            fontFamily: "'Bebas Neue'", fontSize: 'clamp(2.5rem,5vw,4rem)',
            color: '#f5f5dc', marginBottom: '48px',
          }}>ABOUT THE PLAYER</h2>
        </RevealBlock>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px',
          alignItems: 'start',
        }} className="about-grid">
          {/* Player Card */}
          <RevealBlock delay={200}>
            <div ref={cardRef} style={{
              background: 'linear-gradient(145deg, rgba(15,61,46,0.3), rgba(5,13,10,0.8))',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '16px', padding: '32px', position: 'relative',
              backdropFilter: 'blur(10px)', overflow: 'hidden',
              boxShadow: cardInView ? '0 0 40px rgba(212,175,55,0.1)' : 'none',
              transition: 'box-shadow 0.5s',
            }}>
              {/* Gold shimmer overlay */}
              <div style={{
                position: 'absolute', top: 0, left: '-100%', width: '200%', height: '100%',
                background: 'linear-gradient(90deg, transparent 40%, rgba(212,175,55,0.05) 50%, transparent 60%)',
                animation: cardInView ? 'shimmer 3s ease-in-out infinite' : 'none',
                pointerEvents: 'none',
              }} />

              {/* Jersey number */}
              <div style={{
                position: 'absolute', top: '16px', right: '16px',
                fontFamily: "'Bebas Neue'", fontSize: '2rem', color: '#d4af37',
                opacity: 0.8, lineHeight: 1,
              }}>#03</div>

              {/* Profile photo */}
              <div style={{
                width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden',
                border: '3px solid #d4af37', margin: '0 auto 20px',
                boxShadow: '0 0 20px rgba(212,175,55,0.3)',
              }}>
                <img src="/nil.jpg" alt="Nil Lad" style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                }} />
              </div>

              {/* Player info */}
              <h3 style={{
                fontFamily: "'Bebas Neue'", fontSize: '1.8rem', color: '#f5f5dc',
                textAlign: 'center', marginBottom: '4px',
              }}>NIL LAD</h3>
              <p style={{
                textAlign: 'center', fontSize: '0.75rem', color: '#d4af37',
                letterSpacing: '0.2em', marginBottom: '4px',
              }}>🇮🇳 INDIA</p>
              <p style={{
                textAlign: 'center', fontSize: '0.7rem', color: 'rgba(245,245,220,0.5)',
                marginBottom: '24px',
              }}>AIML Engineer • Full Stack Developer</p>

              {/* Stats grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {STATS.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 12px', borderRadius: '8px',
                    background: 'rgba(15,61,46,0.3)', border: '1px solid rgba(212,175,55,0.1)',
                  }}>
                    <div>
                      <p style={{ fontSize: '0.65rem', color: 'rgba(245,245,220,0.5)', letterSpacing: '0.1em' }}>{s.label}</p>
                      <p style={{ fontSize: '0.8rem', color: '#f5f5dc' }}>{s.meaning}</p>
                    </div>
                    <span style={{ fontFamily: "'Orbitron'", fontSize: '1.3rem', color: '#d4af37', fontWeight: 700 }}>
                      <CountUpNumber end={s.value} suffix={s.suffix || ''} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Bio */}
          <div>
            <RevealBlock delay={300}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#f5f5dc', marginBottom: '20px' }}>
                I'm <strong style={{ color: '#d4af37' }}>Nil Lad</strong>, a 3rd semester AIML Engineering student from Rumla, India.
                My journey from a small village to building with artificial intelligence is fueled by the same passion
                that makes me love cricket — discipline, strategy, and the thrill of the chase.
              </p>
            </RevealBlock>
            <RevealBlock delay={400}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'rgba(245,245,220,0.8)', marginBottom: '20px' }}>
                Like a cricketer reading the pitch, I read problems. Whether it's designing stunning UIs with React,
                training ML models, or crafting creative solutions — every innings I play is to build something meaningful.
              </p>
            </RevealBlock>
            <RevealBlock delay={500}>
              <blockquote style={{
                borderLeft: '3px solid #d4af37', paddingLeft: '20px', marginTop: '24px',
                fontStyle: 'italic', color: '#d4af37', fontSize: '1.1rem',
              }}>
                "Cricket taught me that patience and persistence always win the innings."
              </blockquote>
            </RevealBlock>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0%{transform:translateX(-50%)} 100%{transform:translateX(50%)} }
        @media(max-width:768px) { .about-grid{grid-template-columns:1fr!important;} }
      `}</style>
    </section>
  );
}
