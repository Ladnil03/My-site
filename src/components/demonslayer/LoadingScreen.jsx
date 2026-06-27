import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const topHalfRef = useRef(null);
  const botHalfRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Corps symbol fade in + rotate
    tl.fromTo('.ds-load-symbol', 
      { scale: 0, opacity: 0, rotate: -90 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.7)' }
    );

    // Title letters stagger in
    tl.fromTo('.ds-load-letter',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.05, stagger: 0.04, ease: 'power2.out' },
      '-=0.3'
    );

    // Sword stroke animation (SVG line draws from left to right)
    tl.fromTo('.ds-load-sword-line',
      { strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' },
      '-=0.2'
    );

    // Progress bar fills
    const progressObj = { val: 0 };
    tl.to(progressObj, {
      val: 100,
      duration: 1.5,
      ease: 'power1.inOut',
      onUpdate: () => setProgress(Math.round(progressObj.val)),
    }, '-=0.8');

    // Pulsing glow on symbol
    tl.to('.ds-load-symbol', {
      filter: 'drop-shadow(0 0 30px #00d4ff) drop-shadow(0 0 60px #00d4ff44)',
      duration: 0.4,
      yoyo: true,
      repeat: 1,
    }, '-=0.5');

    // Delay before split
    tl.to({}, { duration: 0.3 });

    // VERTICAL SPLIT REVEAL: top half slides up, bottom slides down
    tl.to(topHalfRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
    });
    tl.to(botHalfRef.current, {
      yPercent: 100,
      duration: 0.8,
      ease: 'power3.inOut',
    }, '<');

    // After split → callback
    tl.call(() => onComplete());

    return () => tl.kill();
  }, [onComplete]);

  const title = 'DEMON SLAYER CORPS';

  return (
    <div className="ds-loading" ref={containerRef}>
      {/* Top half (will slide up) */}
      <div className="ds-load-half ds-load-half--top" ref={topHalfRef} />
      {/* Bottom half (will slide down) */}
      <div className="ds-load-half ds-load-half--bot" ref={botHalfRef} />

      {/* Center content */}
      <div className="ds-load-center">
        {/* Corps symbol — diamond/rhombus */}
        <div className="ds-load-symbol">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <defs>
              <linearGradient id="symbolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#cc8800" />
              </linearGradient>
            </defs>
            <polygon points="40,4 76,40 40,76 4,40" fill="none" stroke="url(#symbolGrad)" strokeWidth="2.5" />
            <polygon points="40,16 64,40 40,64 16,40" fill="none" stroke="#ffd70066" strokeWidth="1" />
            <circle cx="40" cy="40" r="6" fill="none" stroke="#ffd700" strokeWidth="1.5" />
            <circle cx="40" cy="40" r="2" fill="#ffd700" />
          </svg>
        </div>

        {/* Title */}
        <div className="ds-load-title">
          {title.split('').map((char, i) => (
            <span key={i} className="ds-load-letter">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Sword line SVG */}
        <svg className="ds-load-sword-svg" width="240" height="6" viewBox="0 0 240 6">
          <line className="ds-load-sword-line"
            x1="0" y1="3" x2="240" y2="3"
            stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"
            strokeDasharray="300" strokeDashoffset="300"
          />
        </svg>

        {/* Progress bar */}
        <div className="ds-load-bar">
          <div className="ds-load-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="ds-load-pct">{progress}%</span>
      </div>
    </div>
  );
}
