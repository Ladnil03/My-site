import React, { useState, useEffect } from 'react';

const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_LINKS.map(l => l.toLowerCase());
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(NAV_LINKS[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        background: scrolled ? 'rgba(5,13,10,0.95)' : 'rgba(5,13,10,0.7)',
        backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(212,175,55,0.15)',
        padding: '0 clamp(16px, 4vw, 48px)', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'background 0.3s', fontFamily: "'Inter', sans-serif",
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #d42a3e, #b11226)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Bebas Neue'", fontSize: '1rem', color: '#f5f5dc',
            boxShadow: '0 0 12px rgba(177,18,38,0.4)',
          }}>NL</div>
          <span style={{ fontFamily: "'Bebas Neue'", fontSize: '1.3rem', color: '#f5f5dc', letterSpacing: '0.1em' }}>
            NIL LAD
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} className="nav-desktop">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              onClick={() => setActive(link)}
              style={{
                color: active === link ? '#d4af37' : '#f5f5dc',
                textDecoration: 'none', fontSize: '0.8rem', padding: '8px 14px',
                fontWeight: active === link ? 600 : 400, letterSpacing: '0.1em',
                textTransform: 'uppercase', borderRadius: '4px',
                background: active === link ? 'rgba(212,175,55,0.1)' : 'transparent',
                transition: 'all 0.3s',
              }}>{link}</a>
          ))}
        </div>

        {/* Status indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="nav-status">
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%', background: '#10b981',
            boxShadow: '0 0 8px #10b981', animation: 'pulse 2s infinite',
          }} />
          <span style={{ fontSize: '0.7rem', color: '#10b981', letterSpacing: '0.05em' }}>Available</span>
        </div>

        {/* Mobile hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer',
          flexDirection: 'column', gap: '5px', padding: '8px',
        }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              width: '22px', height: '2px', background: '#f5f5dc',
              transition: 'all 0.3s',
              transform: menuOpen ? (i===0?'rotate(45deg) translateY(7px)':i===2?'rotate(-45deg) translateY(-7px)':'scaleX(0)') : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '60px', left: 0, right: 0, bottom: 0,
          background: 'rgba(5,13,10,0.98)', zIndex: 9998, padding: '40px 24px',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              onClick={() => { setActive(link); setMenuOpen(false); }}
              style={{
                color: active === link ? '#d4af37' : '#f5f5dc',
                textDecoration: 'none', fontSize: '1.2rem', padding: '12px 0',
                fontFamily: "'Bebas Neue'", letterSpacing: '0.2em',
                borderBottom: '1px solid rgba(212,175,55,0.1)',
              }}>{link}</a>
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media(max-width:768px) {
          .nav-desktop,.nav-status { display:none!important; }
          .nav-hamburger { display:flex!important; }
        }
      `}</style>
    </>
  );
}
