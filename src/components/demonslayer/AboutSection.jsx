import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Section label slides in from left
      gsap.fromTo('.ds-about-label',
        { x: -120, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      );

      // Heading word-by-word reveal
      gsap.fromTo('.ds-about-word',
        { opacity: 0, y: 40, rotateX: -60 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.ds-about-heading', start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );

      // Bio lines — brushstroke wipe reveal
      gsap.utils.toArray('.ds-about-line').forEach((line, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: line,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          }
        });
        // Wipe bar sweeps across
        tl.fromTo(line.querySelector('.ds-wipe'),
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.4, ease: 'power3.inOut' }
        );
        // Text fades in while wipe continues
        tl.to(line.querySelector('.ds-wipe'), {
          scaleX: 0, transformOrigin: 'right center',
          duration: 0.35, ease: 'power2.in'
        }, '+=0.05');
        tl.fromTo(line.querySelector('.ds-line-text'),
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          '-=0.3'
        );
      });

      // Avatar box — 3D rotation on scroll
      if (avatarRef.current) {
        gsap.fromTo(avatarRef.current,
          { rotateY: -15, opacity: 0, x: 60 },
          {
            rotateY: 0, opacity: 1, x: 0,
            duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: avatarRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
          }
        );
        // Subtle 3D tilt on scroll scrub
        gsap.to(avatarRef.current, {
          rotateY: 8,
          scrollTrigger: {
            trigger: section,
            start: 'top 40%',
            end: 'bottom 60%',
            scrub: 1,
          }
        });
      }

      // Stat counters animate
      gsap.utils.toArray('.ds-stat-num').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val); },
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const headingWords = 'The Demon Slayer Corps Recruit'.split(' ');

  return (
    <section className="ds-about" ref={sectionRef} id="about">
      {/* Background glow */}
      <div className="ds-about-bg-glow" aria-hidden="true" />

      {/* Large decorative kanji */}
      <div className="ds-about-kanji-deco" aria-hidden="true">人</div>

      <div className="ds-about-inner">
        {/* Left column: text */}
        <div className="ds-about-left">
          <p className="ds-about-label">[ ABOUT ]</p>

          <h2 className="ds-about-heading" style={{ perspective: '800px' }}>
            {headingWords.map((word, i) => (
              <span key={i} className="ds-about-word">{word} </span>
            ))}
          </h2>

          {/* Bio lines with brushstroke wipe */}
          <div className="ds-about-bio">
            <div className="ds-about-line">
              <div className="ds-wipe" />
              <p className="ds-line-text">
                Passionate about building intelligent systems and experiences.
                Currently diving deep into machine learning, data science, and full-stack development.
              </p>
            </div>
            <div className="ds-about-line">
              <div className="ds-wipe" />
              <p className="ds-line-text">
                On a mission to slay complex problems with elegant solutions.
                Every line of code is a swing of the blade — precise, purposeful, and powerful.
              </p>
            </div>
            <div className="ds-about-line">
              <div className="ds-wipe" />
              <p className="ds-line-text">
                Like a Demon Slayer mastering different breathing techniques,
                I train across multiple domains — from neural networks to responsive interfaces.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="ds-about-stats">
            <div className="ds-stat">
              <span className="ds-stat-num" data-target="4">0</span>
              <span className="ds-stat-label">Semester</span>
              <span className="ds-stat-sub">B.Tech AIML</span>
            </div>
            <div className="ds-stat">
              <span className="ds-stat-num" data-target="10">0</span>
              <span className="ds-stat-label">Technologies</span>
              <span className="ds-stat-sub">Mastered</span>
            </div>
            <div className="ds-stat">
              <span className="ds-stat-num" data-target="4">0</span>
              <span className="ds-stat-label">Projects</span>
              <span className="ds-stat-sub">Completed</span>
            </div>
          </div>
        </div>

        {/* Right column: Avatar / initial */}
        <div className="ds-about-right" ref={avatarRef} style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
          <div className="ds-about-avatar-box">
            <div className="ds-avatar-glow" />
            <div className="ds-avatar-content">
              <span className="ds-avatar-initial">N</span>
              <span className="ds-avatar-name">Nil Lad</span>
              <span className="ds-avatar-title">CHARUSAT · AI & ML</span>
            </div>
            <div className="ds-avatar-border-anim" />
          </div>
        </div>
      </div>
    </section>
  );
}
