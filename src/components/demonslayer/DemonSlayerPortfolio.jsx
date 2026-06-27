import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import LoadingScreen from './LoadingScreen';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import CustomCursor from './CustomCursor';
import './DemonSlayer.css';

gsap.registerPlugin(ScrollTrigger);

export default function DemonSlayerPortfolio() {
  const [loading, setLoading] = useState(true);
  const [siteVisible, setSiteVisible] = useState(false);
  const mainRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll AFTER loading completes
  useEffect(() => {
    if (!siteVisible) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });
    lenisRef.current = lenis;

    // Hook Lenis into GSAP ticker
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after mount
    setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [siteVisible]);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
    // Small delay before showing site (for the split animation to finish)
    setTimeout(() => setSiteVisible(true), 100);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      <div
        className={`ds-portfolio ${siteVisible ? 'ds-portfolio--visible' : ''}`}
        ref={mainRef}
      >
        <CustomCursor />

        {/* Film grain noise overlay */}
        <div className="ds-noise" aria-hidden="true" />

        {/* Kanji watermarks */}
        <div className="ds-watermarks" aria-hidden="true">
          <span className="ds-wm ds-wm-1">水</span>
          <span className="ds-wm ds-wm-2">炎</span>
          <span className="ds-wm ds-wm-3">雷</span>
          <span className="ds-wm ds-wm-4">鬼</span>
        </div>

        <HeroSection />

        <div className="ds-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 24" preserveAspectRatio="none">
            <path d="M0,12 C120,4 240,20 360,12 C480,4 600,20 720,12 C840,4 960,20 1080,12 C1200,4 1320,20 1440,12"
              stroke="var(--ds-cyan)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.35" />
          </svg>
        </div>

        <AboutSection />

        <div className="ds-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 24" preserveAspectRatio="none">
            <path d="M0,12 C180,2 360,22 540,12 C720,2 900,22 1080,12 C1260,2 1440,22 1440,12"
              stroke="var(--ds-red)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
          </svg>
        </div>

        <SkillsSection />

        <div className="ds-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 24" preserveAspectRatio="none">
            <path d="M0,14 C200,6 400,18 600,10 C800,2 1000,18 1200,10 C1300,6 1400,16 1440,12"
              stroke="var(--ds-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
          </svg>
        </div>

        <ProjectsSection />

        <div className="ds-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 24" preserveAspectRatio="none">
            <path d="M0,10 C240,20 480,4 720,14 C960,24 1200,6 1440,12"
              stroke="var(--ds-purple)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
          </svg>
        </div>

        <ContactSection />
      </div>
    </>
  );
}
