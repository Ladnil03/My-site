import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const breathingStyles = [
  {
    style: '💧 Water Breathing',
    kanji: '水',
    color: '#00d4ff',
    colorDim: '#00d4ff33',
    skills: ['Python', 'Data Analysis'],
  },
  {
    style: '⚡ Thunder Breathing',
    kanji: '雷',
    color: '#ffd700',
    colorDim: '#ffd70033',
    skills: ['JavaScript', 'React'],
  },
  {
    style: '🔥 Flame Breathing',
    kanji: '炎',
    color: '#ff6622',
    colorDim: '#ff662233',
    skills: ['Machine Learning', 'Deep Learning'],
  },
  {
    style: '🌸 Flower Breathing',
    kanji: '花',
    color: '#e06090',
    colorDim: '#e0609033',
    skills: ['R Programming', 'Statistics'],
  },
  {
    style: '🌙 Moon Breathing',
    kanji: '月',
    color: '#8899cc',
    colorDim: '#8899cc33',
    skills: ['DBMS', 'SQL'],
  },
  {
    style: '💨 Wind Breathing',
    kanji: '風',
    color: '#44cc88',
    colorDim: '#44cc8833',
    skills: ['C++', 'Algorithms'],
  },
];

function SkillCard({ data, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      const fromX = index % 2 === 0 ? -160 : 160;
      const fromRotate = index % 2 === 0 ? -8 : 8;

      gsap.fromTo(card,
        { x: fromX, opacity: 0, rotateZ: fromRotate, scale: 0.9 },
        {
          x: 0, opacity: 1, rotateZ: 0, scale: 1,
          duration: 1, ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, card);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      className={`ds-skill-card ${hovered ? 'ds-skill-card--hovered' : ''}`}
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        '--sc': data.color,
        '--sc-dim': data.colorDim,
      }}
    >
      {/* Colored top border */}
      <div className="ds-skill-card-border" style={{ background: data.color }} />

      {/* Kanji symbol top-right */}
      <div className="ds-skill-card-symbol" style={{ color: data.color }}>{data.kanji}</div>

      {/* Breathing style name */}
      <p className="ds-skill-card-style">{data.style}</p>

      {/* Skill pill badges */}
      <div className="ds-skill-pills">
        {data.skills.map(skill => (
          <span key={skill} className="ds-skill-pill" style={{
            borderColor: data.color,
            color: data.color,
            textShadow: `0 0 8px ${data.colorDim}`,
          }}>
            {skill}
          </span>
        ))}
      </div>

      {/* Hover pulsing aura */}
      {hovered && <div className="ds-skill-aura" style={{
        boxShadow: `0 0 20px ${data.colorDim}, 0 0 40px ${data.colorDim}, 0 0 80px ${data.colorDim}`,
      }} />}
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.ds-skills-title',
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      );

      // Underline glow draw
      gsap.fromTo('.ds-skills-underline',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.ds-skills-title', start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ds-skills" ref={sectionRef} id="skills">
      <div className="ds-skills-inner">
        <div className="ds-skills-header">
          <h2 className="ds-skills-title">BREATHING STYLES</h2>
          <div className="ds-skills-underline" />
        </div>

        <div className="ds-skills-grid">
          {breathingStyles.map((data, i) => (
            <SkillCard key={data.style} data={data} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
