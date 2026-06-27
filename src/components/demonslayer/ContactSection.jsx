import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Video IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  // Animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Label + heading
      gsap.fromTo('.ds-contact-label',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      );
      gsap.fromTo('.ds-contact-heading',
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      );
      gsap.fromTo('.ds-contact-jp',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8, delay: 0.3, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none reverse' }
        }
      );

      // Torii gate draw-in
      gsap.fromTo('.ds-torii-svg',
        { opacity: 0, scale: 0.85 },
        {
          opacity: 0.12, scale: 1,
          duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      );

      // Parchment scroll UNROLL: scaleY from 0.15→1
      gsap.fromTo('.ds-contact-form',
        { scaleY: 0.15, opacity: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, opacity: 1,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.ds-contact-form', start: 'top 88%', toggleActions: 'play none none reverse' }
        }
      );

      // Social links stagger
      gsap.fromTo('.ds-social-btn',
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.5, stagger: 0.12, ease: 'back.out(2)',
          scrollTrigger: { trigger: '.ds-social-row', start: 'top 90%', toggleActions: 'play none none reverse' }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mission report sent! (Placeholder)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="ds-contact" ref={sectionRef} id="contact">
      {/* Video background */}
      <video
        ref={videoRef}
        className="ds-contact-video"
        src="/videos/video3.mp4"
        muted autoPlay loop playsInline preload="auto"
      />
      <div className="ds-contact-overlay" />

      {/* Torii gate SVG silhouette */}
      <div className="ds-torii-container" aria-hidden="true">
        <svg className="ds-torii-svg" viewBox="0 0 400 280" width="400" height="280">
          <defs>
            <linearGradient id="tGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cc0000" />
              <stop offset="100%" stopColor="#550000" />
            </linearGradient>
          </defs>
          {/* Top beam */}
          <rect x="15" y="25" width="370" height="15" rx="4" fill="url(#tGrad)" />
          <rect x="5" y="18" width="390" height="8" rx="4" fill="#aa0000" />
          {/* Second beam */}
          <rect x="55" y="58" width="290" height="10" rx="3" fill="url(#tGrad)" />
          {/* Left pillar */}
          <rect x="70" y="40" width="16" height="240" fill="url(#tGrad)" />
          {/* Right pillar */}
          <rect x="314" y="40" width="16" height="240" fill="url(#tGrad)" />
          {/* Pillar bases */}
          <rect x="58" y="270" width="40" height="10" rx="3" fill="#440000" />
          <rect x="302" y="270" width="40" height="10" rx="3" fill="#440000" />
          {/* Center plaque */}
          <rect x="160" y="48" width="80" height="24" rx="3" fill="#0a0a0f" stroke="#cc0000" strokeWidth="1.5" />
          <text x="200" y="66" textAnchor="middle" fill="#cc0000" fontSize="14" fontWeight="bold"
            fontFamily="'Shippori Mincho', serif">鳥居</text>
        </svg>
      </div>

      <div className="ds-contact-inner">
        <p className="ds-contact-label">[ REACH OUT ]</p>
        <h2 className="ds-contact-heading">Begin Your Mission</h2>
        <p className="ds-contact-jp">連絡を取る</p>

        {/* Parchment scroll form */}
        <form className="ds-contact-form" onSubmit={handleSubmit}>
          <div className="ds-form-field">
            <label htmlFor="c-name" className="ds-form-label">NAME</label>
            <input
              id="c-name" type="text" className="ds-form-input"
              placeholder="Your name"
              value={formData.name}
              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              required
            />
          </div>
          <div className="ds-form-field">
            <label htmlFor="c-email" className="ds-form-label">EMAIL</label>
            <input
              id="c-email" type="email" className="ds-form-input"
              placeholder="your@mail.com"
              value={formData.email}
              onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
              required
            />
          </div>
          <div className="ds-form-field">
            <label htmlFor="c-msg" className="ds-form-label">MESSAGE</label>
            <textarea
              id="c-msg" className="ds-form-input ds-form-textarea"
              placeholder="Write your mission report..."
              rows="4"
              value={formData.message}
              onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
              required
            />
          </div>
          <button type="submit" className="ds-form-submit">
            SEND MISSION REPORT
          </button>
        </form>

        {/* Social links */}
        <div className="ds-social-row">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="ds-social-btn" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="ds-social-btn" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="mailto:nil@example.com" className="ds-social-btn" aria-label="Email">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>

        {/* Footer */}
        <p className="ds-footer-text">Crafted with Water Breathing · 2025</p>
      </div>
    </section>
  );
}
