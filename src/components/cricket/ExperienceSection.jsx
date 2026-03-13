import React from 'react';
import { RevealBlock, CountUpNumber } from './hooks';

const TIMELINE = [
  { year: '2024', innings: '1st Innings', icon: '🏏', role: 'AIML Engineering Student', org: 'University', desc: 'Started 3rd semester in AIML. Diving deep into machine learning, neural networks, and data science.', milestone: '50✦' },
  { year: '2023', innings: '2nd Innings', icon: '🏆', role: 'Web Developer', org: 'Freelance', desc: 'Built production websites using React, designed creative UIs, and delivered client projects.', milestone: '100✦' },
  { year: '2023', innings: '3rd Innings', icon: '⚾', role: 'Python Developer', org: 'Self-Learning', desc: 'Mastered Python, explored Flask/FastAPI backends, and built AI-powered applications.', milestone: '50✦' },
  { year: '2022', innings: '4th Innings', icon: '🏏', role: 'Coding Journey Begins', org: 'Self-Taught', desc: 'First "Hello World" moment. Fell in love with creating things from nothing but logic.', milestone: '' },
];

const SCOREBOARD_STATS = [
  { label: 'Projects Completed', value: 15, suffix: '+' },
  { label: 'Technologies Mastered', value: 12, suffix: '+' },
  { label: 'Years Coding', value: 3, suffix: '+' },
  { label: 'GitHub Contributions', value: 500, suffix: '+' },
  { label: 'Open Source PRs', value: 20, suffix: '+' },
];

export default function ExperienceSection() {
  return (
    <section id="experience" style={{
      minHeight: '100vh', background: '#050d0a', padding: 'clamp(80px,12vh,140px) clamp(24px,6vw,80px)',
      position: 'relative',
    }}>
      {/* Timeline */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <RevealBlock>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ fontFamily: "'Orbitron'", fontSize: '0.75rem', color: '#d4af37', letterSpacing: '0.3em', marginBottom: '12px' }}>CAREER RECORD</p>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#f5f5dc', marginBottom: '16px' }}>CAREER INNINGS</h2>
            <div style={{ width: '120px', height: '2px', background: 'linear-gradient(90deg, transparent, #0f3d2e, #d4af37, #0f3d2e, transparent)', margin: '0 auto' }} />
          </div>
        </RevealBlock>

        <div style={{ position: 'relative', paddingLeft: '40px' }}>
          {/* Timeline line (pitch strip) */}
          <div style={{
            position: 'absolute', left: '16px', top: 0, bottom: 0, width: '4px',
            background: 'linear-gradient(180deg, #0f3d2e, rgba(15,61,46,0.3))',
            borderRadius: '2px',
          }}>
            {/* Crease marks */}
            {[20, 40, 60, 80].map(p => (
              <div key={p} style={{
                position: 'absolute', top: `${p}%`, left: '-4px', width: '12px', height: '1px',
                background: 'rgba(245,245,220,0.2)',
              }} />
            ))}
          </div>

          {TIMELINE.map((entry, i) => (
            <RevealBlock key={i} delay={i * 150}>
              <div style={{
                marginBottom: '40px', position: 'relative', paddingLeft: '30px',
              }}>
                {/* Icon dot */}
                <div style={{
                  position: 'absolute', left: '-26px', top: '8px', width: '28px', height: '28px',
                  borderRadius: '50%', background: 'rgba(15,61,46,0.5)',
                  border: '2px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', boxShadow: '0 0 12px rgba(212,175,55,0.3)',
                }}>{entry.icon}</div>

                {/* Year tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontFamily: "'Orbitron'", fontSize: '0.7rem', color: '#d4af37', fontWeight: 600 }}>{entry.year}</span>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(245,245,220,0.4)', letterSpacing: '0.1em' }}>{entry.innings}</span>
                  {entry.milestone && (
                    <span style={{
                      fontSize: '0.6rem', padding: '2px 8px', borderRadius: '10px',
                      background: 'rgba(212,175,55,0.15)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)',
                    }}>{entry.milestone}</span>
                  )}
                </div>

                {/* Content card */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(15,61,46,0.15), rgba(5,13,10,0.6))',
                  border: '1px solid rgba(212,175,55,0.1)', borderRadius: '10px', padding: '20px',
                  backdropFilter: 'blur(6px)',
                }}>
                  <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: '1.2rem', color: '#f5f5dc', marginBottom: '4px' }}>{entry.role}</h3>
                  <p style={{ fontSize: '0.75rem', color: '#10b981', marginBottom: '8px' }}>{entry.org}</p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(245,245,220,0.7)', lineHeight: 1.6 }}>{entry.desc}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>

      {/* Stats Scoreboard */}
      <RevealBlock delay={300}>
        <div style={{
          maxWidth: '1200px', margin: '80px auto 0',
          background: 'linear-gradient(145deg, rgba(15,61,46,0.15), rgba(5,13,10,0.8))',
          border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px',
          padding: '40px 32px', backdropFilter: 'blur(8px)',
        }}>
          <p style={{ textAlign: 'center', fontFamily: "'Orbitron'", fontSize: '0.7rem', color: '#d4af37', letterSpacing: '0.3em', marginBottom: '28px' }}>
            📊 LIVE SCOREBOARD
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px',
          }}>
            {SCOREBOARD_STATS.map((s, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '20px 12px', borderRadius: '8px',
                background: 'rgba(5,13,10,0.6)', border: '1px solid rgba(212,175,55,0.15)',
              }}>
                <div style={{ fontFamily: "'Orbitron'", fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#d4af37', fontWeight: 700, marginBottom: '8px' }}>
                  <CountUpNumber end={s.value} suffix={s.suffix} />
                </div>
                <p style={{ fontSize: '0.65rem', color: 'rgba(245,245,220,0.5)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealBlock>
    </section>
  );
}
