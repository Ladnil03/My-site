import React, { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════════
   Three.js — Interactive Starfield (1500pts)
   Mouse repulsion + ambient drift
   ════════════════════════════════════════════ */
function InteractiveStarfield() {
  const pointsRef = useRef();
  const mouseRef = useRef({ x: 9999, y: 9999 });
  const count = 1500;

  const [originalPositions, initialPositions] = useMemo(() => {
    const orig = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 10 - 2;
      orig[i * 3] = init[i * 3] = x;
      orig[i * 3 + 1] = init[i * 3 + 1] = y;
      orig[i * 3 + 2] = init[i * 3 + 2] = z;
    }
    return [orig, init];
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array;
    const mx = mouseRef.current.x * 11;
    const my = mouseRef.current.y * 7;
    const repelR = 2.8;
    const repelF = 0.35;
    const returnF = 0.018;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const dx = positions[i3] - mx;
      const dy = positions[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repel
      if (dist < repelR && dist > 0.01) {
        const f = ((repelR - dist) / repelR) * repelF;
        positions[i3] += (dx / dist) * f;
        positions[i3 + 1] += (dy / dist) * f;
      }

      // Return to origin
      positions[i3] += (originalPositions[i3] - positions[i3]) * returnF;
      positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * returnF;
      positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * returnF;

      // Ambient drift
      positions[i3 + 1] += Math.sin(t * 0.2 + i * 0.37) * 0.0012;
      positions[i3] += Math.cos(t * 0.15 + i * 0.5) * 0.0008;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.012;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={initialPositions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#00d4ff"
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* Cherry blossom petals */
function CherryPetals() {
  const ref = useRef();
  const count = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= 0.007;
      arr[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i * 2) * 0.004;
      if (arr[i * 3 + 1] < -8) {
        arr[i * 3 + 1] = 14;
        arr[i * 3] = (Math.random() - 0.5) * 20;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#ffb7c5"
        transparent opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ════════════════════════════════════════════
   HERO SECTION
   ════════════════════════════════════════════ */
export default function HeroSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const nameTopRef = useRef(null);
  const nameBotRef = useRef(null);

  // IntersectionObserver for video play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  // GSAP Animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Portfolio label fade
      gsap.fromTo('.ds-hero-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
      );

      // KATANA SLASH REVEAL — name clip-path animation
      gsap.fromTo('.ds-hero-name',
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 1 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 0.9,
          delay: 0.6,
          ease: 'power4.out',
        }
      );

      // Motion blur flash on name during slash
      gsap.fromTo('.ds-hero-name-blur',
        { opacity: 0.6, scaleX: 1.3, x: -20 },
        { opacity: 0, scaleX: 1, x: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' }
      );

      // Subtitle fade up
      gsap.fromTo('.ds-hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.3, ease: 'power3.out' }
      );

      // Scroll indicator pulse
      gsap.to('.ds-hero-scroll', {
        y: 12,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.ds-hero-scroll-glow', {
        boxShadow: '0 0 15px #00d4ff, 0 0 30px #00d4ff44',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // SCROLL-AWAY: Name splits into two halves, top flies up, bottom flies down
      const splitTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        }
      });

      splitTl.to(nameTopRef.current, {
        clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
        y: -120,
        opacity: 0,
        ease: 'none',
      }, 0);
      splitTl.to(nameBotRef.current, {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        y: 120,
        opacity: 0,
        ease: 'none',
      }, 0);
      splitTl.to('.ds-hero-label', { opacity: 0, y: -50, ease: 'none' }, 0);
      splitTl.to('.ds-hero-subtitle', { opacity: 0, y: 50, ease: 'none' }, 0);
      splitTl.to('.ds-hero-scroll', { opacity: 0, ease: 'none' }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ds-hero" ref={sectionRef} id="hero">
      {/* Video background */}
      <video
        ref={videoRef}
        className="ds-hero-video"
        src="/videos/video1.mp4"
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
      />
      <div className="ds-hero-overlay" />

      {/* Three.js canvas */}
      <div className="ds-hero-canvas">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        >
          <InteractiveStarfield />
          <CherryPetals />
        </Canvas>
      </div>

      {/* Content */}
      <div className="ds-hero-content">
        <p className="ds-hero-label">Portfolio · 2025</p>

        {/* Name with katana slash reveal */}
        <div className="ds-hero-name-container">
          {/* Motion blur ghost */}
          <h1 className="ds-hero-name ds-hero-name-blur" aria-hidden="true">
            NIL LAD
          </h1>
          {/* Top half for scroll split */}
          <h1
            className="ds-hero-name ds-hero-name-top"
            ref={nameTopRef}
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}
            aria-hidden="true"
          >
            NIL LAD
          </h1>
          {/* Bottom half for scroll split */}
          <h1
            className="ds-hero-name ds-hero-name-bot"
            ref={nameBotRef}
            style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}
          >
            NIL LAD
          </h1>
        </div>

        <p className="ds-hero-subtitle">
          AI <span className="ds-hero-dot">·</span> ML Engineer <span className="ds-hero-dot">·</span> Developer
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="ds-hero-scroll">
        <span className="ds-hero-scroll-text">SCROLL</span>
        <div className="ds-hero-scroll-glow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <polyline points="4,6 10,14 16,6" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
