import React, { useState, useEffect, useRef } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [lightsOn, setLightsOn] = useState([false, false, false, false]);
  const [ballVisible, setBallVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    // Floodlights flicker on one by one
    const timers = [
      setTimeout(() => setLightsOn(prev => { const n = [...prev]; n[0] = true; return n; }), 300),
      setTimeout(() => setLightsOn(prev => { const n = [...prev]; n[1] = true; return n; }), 600),
      setTimeout(() => setLightsOn(prev => { const n = [...prev]; n[2] = true; return n; }), 900),
      setTimeout(() => setLightsOn(prev => { const n = [...prev]; n[3] = true; return n; }), 1200),
      setTimeout(() => setBallVisible(true), 1400),
      setTimeout(() => setTextVisible(true), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      const p = Math.min((elapsed / 2500) * 100, 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => onComplete?.(), 800);
        }, 300);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100000,
      background: '#050d0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: exiting ? 0 : 1,
      transform: exiting ? 'scale(1.1)' : 'scale(1)',
      overflow: 'hidden',
    }}>
      {/* Floodlight beams */}
      {[
        { top: '-10%', left: '-5%', rotate: '25deg' },
        { top: '-10%', right: '-5%', rotate: '-25deg' },
        { bottom: '-10%', left: '10%', rotate: '155deg' },
        { bottom: '-10%', right: '10%', rotate: '-155deg' },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute',
          ...pos,
          width: '200px',
          height: '600px',
          background: lightsOn[i]
            ? 'linear-gradient(180deg, rgba(26,58,92,0.8) 0%, rgba(245,245,220,0.15) 40%, transparent 100%)'
            : 'transparent',
          transform: `rotate(${pos.rotate})`,
          transition: 'background 0.4s ease',
          filter: lightsOn[i] ? 'blur(30px)' : 'none',
          pointerEvents: 'none',
        }} />
      ))}

      {/* Floodlight sources */}
      {[
        { top: '5%', left: '5%' },
        { top: '5%', right: '5%' },
        { bottom: '5%', left: '15%' },
        { bottom: '5%', right: '15%' },
      ].map((pos, i) => (
        <div key={`source-${i}`} style={{
          position: 'absolute',
          ...pos,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: lightsOn[i] ? '#f5f5dc' : '#1a1a2e',
          boxShadow: lightsOn[i]
            ? '0 0 40px 20px rgba(245,245,220,0.4), 0 0 80px 40px rgba(26,58,92,0.3)'
            : 'none',
          transition: 'all 0.3s ease',
        }} />
      ))}

      {/* Cricket ball */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: ballVisible
          ? 'radial-gradient(circle at 35% 35%, #d42a3e 0%, #b11226 50%, #8a0e1e 100%)'
          : 'transparent',
        boxShadow: ballVisible
          ? '0 0 30px rgba(177,18,38,0.6), 0 0 60px rgba(177,18,38,0.3), inset -8px -8px 15px rgba(0,0,0,0.3)'
          : 'none',
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: ballVisible ? 'translateY(0) scale(1)' : 'translateY(-200px) scale(0.3)',
        position: 'relative',
        marginBottom: '40px',
        animation: ballVisible ? 'ballBounce 0.6s ease-out 0.2s' : 'none',
      }}>
        {/* Seam line */}
        {ballVisible && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            right: '10%',
            height: '2px',
            background: '#f5f5dc',
            transform: 'translateY(-50%) rotate(-15deg)',
            borderRadius: '50%',
            boxShadow: '0 0 4px rgba(245,245,220,0.5)',
          }} />
        )}
      </div>

      {/* Progress bar (crease line) */}
      <div style={{
        width: '280px',
        height: '4px',
        background: 'rgba(15,61,46,0.5)',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '24px',
        border: '1px solid rgba(212,175,55,0.2)',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #0f3d2e, #10b981, #d4af37)',
          borderRadius: '2px',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 10px rgba(16,185,129,0.5)',
        }} />
        {/* Crease marks */}
        <div style={{
          position: 'absolute',
          left: '25%',
          top: '-4px',
          width: '1px',
          height: '12px',
          background: 'rgba(245,245,220,0.3)',
        }} />
        <div style={{
          position: 'absolute',
          left: '75%',
          top: '-4px',
          width: '1px',
          height: '12px',
          background: 'rgba(245,245,220,0.3)',
        }} />
      </div>

      {/* Loading text */}
      <p style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '1.2rem',
        color: '#f5f5dc',
        letterSpacing: '0.3em',
        opacity: textVisible ? 1 : 0,
        transform: textVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease',
      }}>
        Loading the Innings...
      </p>

      <style>{`
        @keyframes ballBounce {
          0% { transform: translateY(-200px) scale(0.3); }
          50% { transform: translateY(10px) scale(1.1); }
          70% { transform: translateY(-5px) scale(0.95); }
          100% { transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
