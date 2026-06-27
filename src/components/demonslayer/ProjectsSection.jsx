import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Project Aqua',
    status: 'COMPLETED',
    desc: 'Water Quality Prediction using ML — a pipeline that analyzes environmental sensor data and predicts pollution levels with 94% accuracy.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
    color: '#00d4ff',
    kanji: '水',
  },
  {
    title: 'Project Thunder',
    status: 'COMPLETED',
    desc: 'Real-time Data Dashboard that streams live data via WebSocket, rendering interactive visualizations with sub-100ms latency.',
    tech: ['React', 'Node.js', 'Chart.js', 'WebSocket'],
    color: '#ffd700',
    kanji: '雷',
  },
  {
    title: 'Project Blaze',
    status: 'IN PROGRESS',
    desc: 'Neural Network from Scratch — building a deep learning framework using only NumPy. Supports forward/backward prop, optimizers, and custom layers.',
    tech: ['Python', 'NumPy', 'Math', 'Calculus'],
    color: '#ff6622',
    kanji: '炎',
  },
  {
    title: 'Project Wisteria',
    status: 'COMPLETED',
    desc: 'Comprehensive Database Management System mini-project with user auth, CRUD operations, and normalized schema design.',
    tech: ['MySQL', 'PHP', 'HTML', 'CSS'],
    color: '#7b5ea7',
    kanji: '藤',
  },
];

function ProjectCard({ project }) {
  const [slashParticles, setSlashParticles] = useState([]);

  const handleHover = () => {
    const particles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 40,
      y: Math.random() * 40,
      vx: 30 + Math.random() * 60,
      vy: 30 + Math.random() * 60,
    }));
    setSlashParticles(particles);
    setTimeout(() => setSlashParticles([]), 700);
  };

  return (
    <div
      className="ds-project-card"
      style={{ '--pc': project.color }}
      onMouseEnter={handleHover}
    >
      {/* Slash particle burst on hover */}
      {slashParticles.map(p => (
        <div key={p.id} className="ds-proj-particle" style={{
          '--px': `${p.vx}px`,
          '--py': `${p.vy}px`,
          left: `${p.x}px`,
          top: `${p.y}px`,
          backgroundColor: '#ff2244',
        }} />
      ))}

      {/* Left colored border */}
      <div className="ds-project-left-border" style={{ backgroundColor: project.color }} />

      {/* Kanji watermark */}
      <div className="ds-project-kanji" style={{ color: project.color }}>{project.kanji}</div>

      <div className="ds-project-body">
        <h3 className="ds-project-name">{project.title}</h3>
        <span className={`ds-project-status ${project.status === 'IN PROGRESS' ? 'ds-status-wip' : ''}`}>
          {project.status}
        </span>
        <p className="ds-project-desc">{project.desc}</p>

        <div className="ds-project-tech-row">
          {project.tech.map(t => (
            <span key={t} className="ds-project-tech-pill" style={{
              borderColor: project.color,
              textShadow: `0 0 6px ${project.color}44`,
            }}>{t}</span>
          ))}
        </div>

        <div className="ds-project-btns">
          <a href="#" className="ds-katana-btn ds-katana-filled" style={{ '--kb': project.color }}>
            View Code
          </a>
          <a href="#" className="ds-katana-btn ds-katana-outline" style={{ '--kb': project.color }}>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  // Video IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  // Horizontal scroll + pin
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Title fade in
      gsap.fromTo('.ds-projects-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );

      // Wait for layout
      ScrollTrigger.refresh();

      const totalScroll = track.scrollWidth - window.innerWidth;

      if (totalScroll > 0) {
        gsap.to(track, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.width = `${self.progress * 100}%`;
              }
            }
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ds-projects" ref={sectionRef} id="projects">
      {/* Video background */}
      <video
        ref={videoRef}
        className="ds-projects-video"
        src="/videos/video2.mp4"
        muted autoPlay loop playsInline preload="auto"
      />
      <div className="ds-projects-overlay" />

      {/* Fixed title during horizontal scroll */}
      <h2 className="ds-projects-title">MISSIONS</h2>

      {/* Horizontal scrolling track */}
      <div className="ds-projects-track" ref={trackRef}>
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>

      {/* Progress bar */}
      <div className="ds-projects-progress">
        <div className="ds-projects-progress-fill" ref={progressRef} />
      </div>
    </section>
  );
}
