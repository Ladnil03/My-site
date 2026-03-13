import React, { useState, useRef } from 'react';
import { RevealBlock } from './hooks';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const confettiRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnimating(true);
    // Confetti burst
    if (confettiRef.current) {
      const canvas = confettiRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = 400; canvas.height = 400;
      const particles = Array.from({ length: 60 }, () => ({
        x: 200, y: 200,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12 - 4,
        color: ['#d4af37', '#b11226', '#10b981', '#f5f5dc'][Math.floor(Math.random() * 4)],
        size: Math.random() * 5 + 2,
        life: 1,
      }));
      const anim = () => {
        ctx.clearRect(0, 0, 400, 400);
        let alive = false;
        particles.forEach(p => {
          if (p.life <= 0) return;
          alive = true;
          p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.life -= 0.015;
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        });
        ctx.globalAlpha = 1;
        if (alive) requestAnimationFrame(anim);
        else { setAnimating(false); setSubmitted(true); }
      };
      requestAnimationFrame(anim);
    } else {
      setTimeout(() => { setAnimating(false); setSubmitted(true); }, 1000);
    }
  };

  return (
    <section id="contact" style={{
      minHeight: '100vh', background: '#050d0a', padding: 'clamp(80px,12vh,140px) clamp(24px,6vw,80px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <RevealBlock>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontFamily: "'Orbitron'", fontSize: '0.75rem', color: '#d4af37', letterSpacing: '0.3em', marginBottom: '12px' }}>THE DRESSING ROOM</p>
          <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#f5f5dc', marginBottom: '12px' }}>MESSAGE THE DRESSING ROOM</h2>
          <p style={{ color: 'rgba(245,245,220,0.6)', fontStyle: 'italic' }}>Drop your strategy note before the next innings</p>
        </div>
      </RevealBlock>

      <RevealBlock delay={200}>
        <div style={{
          position: 'relative', width: 'min(560px, 90vw)',
          background: 'linear-gradient(145deg, rgba(15,61,46,0.2), rgba(5,13,10,0.8))',
          border: '1px solid rgba(212,175,55,0.2)', borderRadius: '16px',
          padding: '40px', backdropFilter: 'blur(10px)',
        }}>
          {/* Cricket field lines overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03, borderRadius: '16px', overflow: 'hidden', pointerEvents: 'none',
          }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <ellipse cx="50" cy="50" rx="45" ry="45" fill="none" stroke="#f5f5dc" strokeWidth="0.3" />
              <rect x="45" y="10" width="10" height="80" fill="none" stroke="#f5f5dc" strokeWidth="0.2" />
            </svg>
          </div>

          {/* Confetti canvas */}
          <canvas ref={confettiRef} style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: '400px', height: '400px', pointerEvents: 'none', zIndex: 10,
          }} />

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏏</div>
              <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: '1.5rem', color: '#d4af37', marginBottom: '8px' }}>
                Message Delivered!
              </h3>
              <p style={{ color: 'rgba(245,245,220,0.7)', fontSize: '0.9rem' }}>
                Message delivered to the dressing room. The captain will respond soon!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 2 }}>
              {[
                { key: 'name', label: 'Your Name / Team', type: 'text', tag: 'input' },
                { key: 'email', label: 'Your Communication Channel', type: 'email', tag: 'input' },
                { key: 'message', label: 'Your Game Plan', type: 'text', tag: 'textarea' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#d4af37', letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase' }}>{f.label}</label>
                  {f.tag === 'textarea' ? (
                    <textarea
                      required rows={4}
                      value={form[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      style={{
                        width: '100%', background: 'rgba(5,13,10,0.6)', border: '1px solid rgba(212,175,55,0.2)',
                        borderRadius: '8px', padding: '12px 14px', color: '#f5f5dc', fontSize: '0.9rem',
                        fontFamily: "'Inter'", resize: 'vertical', outline: 'none',
                        transition: 'border-color 0.3s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.2)'}
                    />
                  ) : (
                    <input
                      type={f.type} required
                      value={form[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      style={{
                        width: '100%', background: 'rgba(5,13,10,0.6)', border: '1px solid rgba(212,175,55,0.2)',
                        borderRadius: '8px', padding: '12px 14px', color: '#f5f5dc', fontSize: '0.9rem',
                        fontFamily: "'Inter'", outline: 'none', transition: 'border-color 0.3s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.2)'}
                    />
                  )}
                </div>
              ))}
              <button type="submit" disabled={animating} style={{
                background: animating ? 'rgba(177,18,38,0.5)' : 'linear-gradient(135deg, #b11226, #d42a3e)',
                color: '#f5f5dc', padding: '14px 32px', borderRadius: '8px', border: 'none',
                fontFamily: "'Bebas Neue'", fontSize: '1.1rem', letterSpacing: '0.15em',
                cursor: animating ? 'wait' : 'pointer',
                boxShadow: '0 0 20px rgba(177,18,38,0.3)', transition: 'all 0.3s',
              }}>
                {animating ? 'Delivering...' : 'Send to Pavilion 🏏'}
              </button>
            </form>
          )}
        </div>
      </RevealBlock>

      {/* Footer */}
      <footer style={{
        marginTop: '80px', textAlign: 'center', padding: '32px 0',
        borderTop: '1px solid rgba(15,61,46,0.3)', width: '100%', maxWidth: '1200px',
      }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%', margin: '0 auto 16px',
          background: 'radial-gradient(circle at 35% 35%, #d42a3e, #b11226)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Bebas Neue'", color: '#f5f5dc', fontSize: '1rem',
          boxShadow: '0 0 15px rgba(177,18,38,0.3)',
        }}>NL</div>
        <p style={{ color: 'rgba(245,245,220,0.6)', fontSize: '0.85rem', marginBottom: '8px' }}>
          Designed & built with ❤️ by Nil Lad
        </p>
        <p style={{ color: 'rgba(245,245,220,0.3)', fontSize: '0.7rem' }}>© 2026 Nil Lad. All rights reserved.</p>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
          {[
            { name: 'GitHub', url: 'https://github.com/ladnil03' },
            { name: 'Instagram', url: 'https://www.instagram.com/lad_nil_20/' },
            { name: 'Twitter', url: 'https://x.com/Nil_2006_n3' },
            { name: 'Facebook', url: 'https://www.facebook.com/neel.lad.31' },
          ].map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{
              fontSize: '0.7rem', color: 'rgba(245,245,220,0.5)', textDecoration: 'none',
              padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(245,245,220,0.1)',
              transition: 'all 0.3s',
            }} className="social-link">{s.name}</a>
          ))}
        </div>
      </footer>

      <style>{`
        .social-link:hover { color:#d4af37!important; border-color:rgba(212,175,55,0.3)!important; }
      `}</style>
    </section>
  );
}
