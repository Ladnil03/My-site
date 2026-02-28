import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════
   CUSTOM HOOKS
   ═══════════════════════════════════════ */

function useScrollProgress() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return progress;
}

function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);
    return [ref, isInView];
}

/* ═══════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════ */

const CHAPTERS = [
    { id: 'opening', label: 'The Beginning' },
    { id: 'village', label: 'The Village' },
    { id: 'dream', label: 'The Dream' },
    { id: 'eye', label: 'The Eye' },
    { id: 'root', label: 'The Root' },
    { id: 'builder', label: 'The Builder' },
];

/* ═══════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════ */

function ScrollProgressBar({ progress }) {
    return (
        <div id="scroll-progress" style={{
            position: 'fixed', top: 0, left: 0, width: `${progress * 100}%`,
            height: '2px', background: 'linear-gradient(90deg, #10b981, #6366f1)',
            zIndex: 10000, transition: 'width 0.1s linear',
        }} />
    );
}

function ChapterNav({ activeIndex }) {
    return (
        <nav id="chapter-nav" className="chapter-nav" aria-label="Chapter navigation">
            {CHAPTERS.map((ch, i) => (
                <button
                    key={ch.id}
                    className={`chapter-dot ${i === activeIndex ? 'active' : ''}`}
                    onClick={() => document.getElementById(ch.id)?.scrollIntoView({ behavior: 'smooth' })}
                    aria-label={`Go to ${ch.label}`}
                >
                    <span className="chapter-dot-tooltip">{ch.label}</span>
                </button>
            ))}
        </nav>
    );
}

function ChapterLabel({ number, title }) {
    return (
        <p className="chapter-label">
            <span className="chapter-label-line" />
            Chapter {String(number).padStart(2, '0')} · {title}
        </p>
    );
}

function Polaroid({ src, caption, rotation = 0, delay = 0 }) {
    const [ref, inView] = useInView(0.1);
    return (
        <div
            ref={ref}
            className={`polaroid ${inView ? 'revealed' : ''}`}
            style={{
                '--rotation': `${rotation}deg`,
                transitionDelay: `${delay}ms`,
            }}
        >
            <div className="polaroid-inner">
                <img src={src} alt={caption} loading="lazy" />
                <p className="polaroid-caption">{caption}</p>
            </div>
        </div>
    );
}

function RevealBlock({ children, delay = 0, className = '' }) {
    const [ref, inView] = useInView(0.15);
    return (
        <div
            ref={ref}
            className={`reveal-block ${inView ? 'revealed' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

function TypewriterText({ text, speed = 80 }) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        indexRef.current = 0;
        setDisplayed('');
        setDone(false);
        const interval = setInterval(() => {
            indexRef.current++;
            if (indexRef.current > text.length) {
                setDone(true);
                clearInterval(interval);
                return;
            }
            setDisplayed(text.slice(0, indexRef.current));
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <span className="typewriter-text">
            {displayed}
            <span className={`typewriter-cursor ${done ? 'blink' : ''}`}>|</span>
        </span>
    );
}

function TerminalCard() {
    const [ref, inView] = useInView(0.15);
    const lines = [
        { prompt: '$ whoami', output: 'Nil Lad, AIML Engineer' },
        { prompt: '$ cat origin.txt', output: 'From Rumla | 3rd Sem AIML | Hostel Life' },
        { prompt: '$ echo $DREAM', output: '"Build things that matter with AI"' },
        { prompt: '$ git log --oneline', output: '"First commit: left home, chased a dream"' },
    ];
    return (
        <div ref={ref} className={`terminal-card ${inView ? 'revealed' : ''}`}>
            <div className="terminal-header">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
                <span className="terminal-title">nil@story:~</span>
            </div>
            <div className="terminal-body">
                {lines.map((l, i) => (
                    <div key={i} className="terminal-line" style={{ transitionDelay: `${i * 200}ms` }}>
                        <span className="terminal-prompt">{l.prompt}</span>
                        <span className="terminal-output">{l.output}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════
   CHAPTER SECTIONS
   ═══════════════════════════════════════ */

function ChapterOpening() {
    const [ref, inView] = useInView(0.1);
    return (
        <section id="opening" className="chapter chapter-opening" ref={ref}>
            <div className="blob blob-emerald" />
            <div className="blob blob-indigo" />
            <div className="chapter-opening-inner">
                <div className="hero-left">
                    <Polaroid src="/nil.jpg" caption="Nil Lad" rotation={-3} />
                </div>
                <div className="hero-right">
                    <RevealBlock>
                        <ChapterLabel number={0} title="The Beginning" />
                    </RevealBlock>
                    <RevealBlock delay={100}>
                        <h1 className="hero-headline">
                            <span>Hi, I'm</span>
                            <span className="hero-name">Nil Lad</span>
                            <span className="hero-sub">and this is my story.</span>
                        </h1>
                    </RevealBlock>
                    <RevealBlock delay={200}>
                        <p className="hero-typewriter">
                            <TypewriterText text="Passionate AIML Engineer & Creative Designer" />
                        </p>
                    </RevealBlock>
                    <RevealBlock delay={300}>
                        <div className="hero-buttons">
                            <a href="#village" className="btn btn-primary">Read My Story ↓</a>
                            <a href="#builder" className="btn btn-outlined">View My Work</a>
                        </div>
                    </RevealBlock>
                </div>
            </div>
            <div className={`scroll-hint ${inView ? 'visible' : ''}`}>
                <span>scroll to explore</span>
                <span className="scroll-arrow">↓</span>
            </div>
        </section>
    );
}

function ChapterVillage() {
    return (
        <section id="village" className="chapter chapter-village">
            <div className="ghost-number">01</div>
            <div className="chapter-two-col">
                <div className="col-left">
                    <RevealBlock><ChapterLabel number={1} title="The Village" /></RevealBlock>
                    <RevealBlock delay={100}>
                        <h2 className="section-headline">Every great story starts somewhere small.</h2>
                    </RevealBlock>
                    <RevealBlock delay={200}>
                        <p>I'm Nil Lad, from Rumla — a small village that shaped my values and determination.</p>
                    </RevealBlock>
                    <RevealBlock delay={300}>
                        <p>Moving away from home to live in a hostel changed everything — it gave me independence, discipline, and the hunger to build something real.</p>
                    </RevealBlock>
                    <RevealBlock delay={400}>
                        <p>That village kid is now building with AI.</p>
                    </RevealBlock>
                    <RevealBlock delay={500}>
                        <blockquote className="styled-quote">
                            "Home is not a place. It's the foundation you carry with you."
                        </blockquote>
                    </RevealBlock>
                </div>
                <div className="col-right">
                    <RevealBlock delay={300}>
                        <TerminalCard />
                    </RevealBlock>
                </div>
            </div>
        </section>
    );
}

function ChapterDream() {
    const cricketPhotos = [
        { src: '/t20wc.jpeg', caption: 'T20 Trophy', rotation: -2 },
        { src: '/mahirat.jpeg', caption: 'MahiRat', rotation: 3 },
        { src: '/rohirat.jpeg', caption: 'RO-KO', rotation: -1 },
        { src: '/rcb.jpeg', caption: 'Finally — After 18 Years 🏆', rotation: 2 },
    ];
    return (
        <section id="dream" className="chapter chapter-dream">
            <div className="chapter-two-col">
                <div className="col-left polaroid-gallery">
                    {cricketPhotos.map((p, i) => (
                        <Polaroid key={i} src={p.src} caption={p.caption} rotation={p.rotation} delay={i * 150} />
                    ))}
                </div>
                <div className="col-right">
                    <RevealBlock><ChapterLabel number={2} title="The Dream" /></RevealBlock>
                    <RevealBlock delay={100}>
                        <h2 className="section-headline">I wanted to be a cricketer.</h2>
                    </RevealBlock>
                    <RevealBlock delay={200}>
                        <p>Cricket isn't just a sport for me — it's a masterclass in patience, strategy, and never giving up.</p>
                    </RevealBlock>
                    <RevealBlock delay={300}>
                        <p>My idol is Virat Kohli. His relentless work ethic taught me what real dedication looks like.</p>
                    </RevealBlock>
                    <RevealBlock delay={400}>
                        <p>I couldn't make it to the pitch professionally. But the spirit of the game lives in everything I build.</p>
                    </RevealBlock>
                    <RevealBlock delay={500}>
                        <blockquote className="styled-quote gold-quote">
                            "Cricket is a game of glorious uncertainties — just like coding."
                        </blockquote>
                    </RevealBlock>
                    <RevealBlock delay={600}>
                        <div className="stats-row">
                            <div className="stat-item"><span className="stat-icon">🏏</span><span className="stat-label">Favorite</span><span className="stat-value">Virat Kohli</span></div>
                            <div className="stat-item"><span className="stat-icon">🔴</span><span className="stat-label">Team</span><span className="stat-value">RCB</span></div>
                            <div className="stat-item"><span className="stat-icon">🌍</span><span className="stat-label">Format</span><span className="stat-value">T20</span></div>
                        </div>
                    </RevealBlock>
                </div>
            </div>
        </section>
    );
}

function ChapterEye() {
    const photos = [
        { src: '/mountain.jpg', caption: 'Mountain Vista', rotation: -2 },
        { src: '/river.jpg', caption: 'River Flow', rotation: 3 },
        { src: '/bridge.jpg', caption: 'Bridge View', rotation: 1 },
        { src: '/night.jpg', caption: 'Starry Night', rotation: -3 },
    ];
    const tags = ['Mountain Landscapes', 'Rivers', 'Starry Nights', 'Bridges', 'Golden Hour'];
    return (
        <section id="eye" className="chapter chapter-eye">
            <div className="chapter-two-col">
                <div className="col-left">
                    <RevealBlock><ChapterLabel number={3} title="The Eye" /></RevealBlock>
                    <RevealBlock delay={100}>
                        <h2 className="section-headline">I see the world through a lens.</h2>
                    </RevealBlock>
                    <RevealBlock delay={200}>
                        <p>Photography taught me patience — the same patience you need to debug a model at 2am.</p>
                    </RevealBlock>
                    <RevealBlock delay={300}>
                        <p>Every shot is a decision. Composition, light, timing. It's not unlike designing a good UI.</p>
                    </RevealBlock>
                    <RevealBlock delay={400}>
                        <p>I collect moments. Mountains, rivers, bridges, stars — everything that reminds me the world is bigger than my screen.</p>
                    </RevealBlock>
                    <RevealBlock delay={500}>
                        <div className="tags-row">
                            {tags.map((t, i) => <span key={i} className="tag">{t}</span>)}
                        </div>
                    </RevealBlock>
                </div>
                <div className="col-right polaroid-grid">
                    {photos.map((p, i) => (
                        <Polaroid key={i} src={p.src} caption={p.caption} rotation={p.rotation} delay={i * 150} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ChapterRoot() {
    const familyPhotos = [
        { src: '/ladfamily.jpeg', caption: 'The Lad Family', rotation: 2 },
        { src: '/momdada.jpg', caption: 'My Parents', rotation: -3 },
        { src: '/mom.jpg', caption: 'With Mom', rotation: 1 },
        { src: '/childhood.jpg', caption: 'Childhood Memories', rotation: -2 },
    ];
    const values = [
        { icon: '❤️', label: 'Unconditional Love' },
        { icon: '🤗', label: 'Mutual Support' },
        { icon: '✨', label: 'Shared Dreams' },
        { icon: '🔗', label: 'Unbreakable Bond' },
    ];
    return (
        <section id="root" className="chapter chapter-root">
            <div className="chapter-two-col">
                <div className="col-left">
                    <RevealBlock><ChapterLabel number={4} title="The Root" /></RevealBlock>
                    <RevealBlock delay={100}>
                        <h2 className="section-headline">Everything I do, I do for them.</h2>
                    </RevealBlock>
                    <RevealBlock delay={200}>
                        <p>I come from a family that believed in me before I believed in myself.</p>
                    </RevealBlock>
                    <RevealBlock delay={300}>
                        <p>Leaving home for the hostel was the hardest thing I've ever done. But they made it possible.</p>
                    </RevealBlock>
                    <RevealBlock delay={400}>
                        <p>Every line of code I write carries their sacrifice in it.</p>
                    </RevealBlock>
                    <RevealBlock delay={500}>
                        <div className="values-grid">
                            {values.map((v, i) => (
                                <div key={i} className="value-card">
                                    <span className="value-icon">{v.icon}</span>
                                    <span className="value-label">{v.label}</span>
                                </div>
                            ))}
                        </div>
                    </RevealBlock>
                    <RevealBlock delay={600}>
                        <blockquote className="styled-quote rose-quote">
                            "Family is not just an important thing — it's everything."
                        </blockquote>
                    </RevealBlock>
                </div>
                <div className="col-right polaroid-gallery">
                    {familyPhotos.map((p, i) => (
                        <Polaroid key={i} src={p.src} caption={p.caption} rotation={p.rotation} delay={i * 150} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ChapterBuilder() {
    const skills = [
        { icon: '⚛', title: 'Frontend', tags: 'React, JavaScript, CSS', desc: 'Interfaces that users feel, not just see.' },
        { icon: '🐍', title: 'Backend', tags: 'Python, Node.js', desc: 'The logic that makes the magic work.' },
        { icon: '🧠', title: 'AI/ML', tags: 'Machine Learning, Data Analysis', desc: 'Teaching machines to think. Still learning myself.' },
        { icon: '🎨', title: 'Design', tags: 'UI/UX, Creative Design', desc: 'Code and creativity, always together.' },
    ];
    const socials = [
        { name: 'GitHub', url: 'https://github.com/ladnil03' },
        { name: 'Instagram', url: 'https://www.instagram.com/lad_nil_20/' },
        { name: 'Twitter', url: 'https://x.com/Nil_2006_n3' },
        { name: 'Discord', url: '#', extra: 'Nil_20' },
        { name: 'Facebook', url: 'https://www.facebook.com/neel.lad.31' },
    ];
    return (
        <section id="builder" className="chapter chapter-builder">
            <RevealBlock>
                <ChapterLabel number={5} title="The Builder" />
            </RevealBlock>
            <RevealBlock delay={100}>
                <h2 className="section-headline center-text">
                    Now I build with<br /><span className="emerald">AI & the web.</span>
                </h2>
            </RevealBlock>
            <RevealBlock delay={200}>
                <div className="skills-grid">
                    {skills.map((s, i) => (
                        <div key={i} className="skill-card">
                            <span className="skill-icon">{s.icon}</span>
                            <h3 className="skill-title">{s.title}</h3>
                            <p className="skill-tags">{s.tags}</p>
                            <p className="skill-desc">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </RevealBlock>
            <div className="divider-glow" />
            <RevealBlock delay={300}>
                <div className="contact-finale">
                    <h2 className="contact-headline">Let's build something.</h2>
                    <p className="contact-sub">I'm open to collaborations, projects, and conversations.</p>
                    <div className="contact-row">
                        <div className="contact-item">
                            <span className="contact-icon">📧</span>
                            <span className="contact-label">Email</span>
                            <a href="mailto:ladnil03@gmail.com" className="contact-value">ladnil03@gmail.com</a>
                        </div>
                        <div className="contact-item">
                            <span className="contact-icon">📱</span>
                            <span className="contact-label">Phone</span>
                            <span className="contact-value">+91 7359986990</span>
                        </div>
                    </div>
                    <div className="social-row">
                        {socials.map((s, i) => (
                            <a
                                key={i}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-btn"
                                title={s.extra || s.name}
                            >
                                {s.name}
                            </a>
                        ))}
                    </div>
                    <a href="mailto:ladnil03@gmail.com" className="btn btn-primary btn-cta">
                        Send me an email →
                    </a>
                    <p className="personal-quote">
                        "The only way to do great work is to love what you do."
                    </p>
                </div>
            </RevealBlock>
        </section>
    );
}

/* ═══════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════ */

function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const onMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            }
        };
        window.addEventListener('mousemove', onMove);

        let raf;
        const animate = () => {
            ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
            ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px)`;
            }
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════ */

export default function StoryPortfolio() {
    const progress = useScrollProgress();
    const [activeChapter, setActiveChapter] = useState(0);

    useEffect(() => {
        const ids = CHAPTERS.map(c => c.id);
        const onScroll = () => {
            let current = 0;
            let minDist = Infinity;
            const viewCenter = window.innerHeight * 0.4;
            ids.forEach((id, i) => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    const elCenter = rect.top + rect.height / 2;
                    const dist = Math.abs(elCenter - viewCenter);
                    if (dist < minDist) {
                        minDist = dist;
                        current = i;
                    }
                }
            });
            setActiveChapter(current);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <style>{CSS_CONTENT}</style>
            <div className="story-portfolio">
                <CustomCursor />
                <ScrollProgressBar progress={progress} />
                <ChapterNav activeIndex={activeChapter} />
                <ChapterOpening />
                <ChapterVillage />
                <ChapterDream />
                <ChapterEye />
                <ChapterRoot />
                <ChapterBuilder />
                <footer className="story-footer">
                    <div className="footer-logo">NL</div>
                    <p>Designed & built with ❤️ by Nil Lad</p>
                    <p className="footer-copy">© 2026 Nil Lad. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}

/* ═══════════════════════════════════════
   CSS — full styles as template literal
   ═══════════════════════════════════════ */

const CSS_CONTENT = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

/* ── RESET & VARIABLES ── */
:root {
  --bg: #07070f;
  --surface: #0f0f1a;
  --accent: #10b981;
  --accent2: #6366f1;
  --gold: #f59e0b;
  --rose: #f472b6;
  --text: #e8e8f2;
  --muted: #52526b;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  line-height: 1.7;
  cursor: none;
  overflow-x: hidden;
}

/* Noise overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-repeat: repeat;
}

/* ── CUSTOM CURSOR ── */
.cursor-dot {
  position: fixed; top: 0; left: 0;
  width: 8px; height: 8px;
  background: var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  will-change: transform;
}
.cursor-ring {
  position: fixed; top: 0; left: 0;
  width: 36px; height: 36px;
  border: 1.5px solid rgba(16,185,129,0.4);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99998;
  will-change: transform;
}

@media (pointer: coarse) {
  body { cursor: auto; }
  .cursor-dot, .cursor-ring { display: none; }
}

/* ── DOT GRID BACKGROUND ── */
.chapter-opening,
.chapter-eye {
  background-image:
    radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 30px 30px;
}

/* ── REVEAL ANIMATION ── */
.reveal-block {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.reveal-block.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* ── CHAPTER LAYOUT ── */
.chapter {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px 8vw;
  overflow: hidden;
}

.chapter-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* ── CHAPTER NAV (right dots) ── */
.chapter-nav {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9000;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.chapter-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--muted);
  border: none;
  cursor: none;
  transition: all 0.3s ease;
  position: relative;
}
.chapter-dot.active {
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent), 0 0 24px rgba(16,185,129,0.3);
  transform: scale(1.5);
}
.chapter-dot-tooltip {
  position: absolute;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--surface);
  color: var(--text);
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  border: 1px solid rgba(255,255,255,0.06);
}
.chapter-dot:hover .chapter-dot-tooltip { opacity: 1; }

/* ── CHAPTER LABEL ── */
.chapter-label {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--accent);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-weight: 600;
  margin-bottom: 24px;
  font-family: var(--font-mono);
}
.chapter-label-line {
  display: inline-block;
  width: 40px;
  height: 1px;
  background: var(--accent);
}

/* ── GHOST NUMBER ── */
.ghost-number {
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-display);
  font-size: clamp(180px, 22vw, 350px);
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.03);
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

/* ──────────────────────────
   CHAPTER 0: OPENING
   ────────────────────────── */
.chapter-opening {
  background: var(--bg);
  padding-top: 60px;
}
.chapter-opening-inner {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 80px;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
.hero-left {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero-right { position: relative; }

.hero-headline {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
}
.hero-headline span { display: block; }
.hero-name {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub { color: var(--muted); font-size: 0.8em; }

.hero-typewriter {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--muted);
  margin-bottom: 32px;
  min-height: 1.5em;
}
.typewriter-cursor {
  color: var(--accent);
  font-weight: 300;
  animation: none;
}
.typewriter-cursor.blink { animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }

.hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }

.btn {
  display: inline-block;
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  cursor: none;
  transition: all 0.3s ease;
  letter-spacing: 0.02em;
}
.btn-primary {
  background: var(--accent);
  color: #07070f;
}
.btn-primary:hover {
  background: #0ea572;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(16,185,129,0.3);
}
.btn-outlined {
  background: transparent;
  color: var(--text);
  border: 1.5px solid rgba(255,255,255,0.15);
}
.btn-outlined:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

/* Blobs */
.blob {
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.12;
  pointer-events: none;
}
.blob-emerald { background: var(--accent); top: -10%; right: -5%; }
.blob-indigo { background: var(--accent2); bottom: -15%; left: -10%; }

/* Scroll hint */
.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: var(--muted);
  letter-spacing: 0.15em;
  text-transform: lowercase;
  opacity: 0;
  transition: opacity 0.6s ease;
}
.scroll-hint.visible { opacity: 1; }
.scroll-arrow { animation: bob 2s ease-in-out infinite; font-size: 1.1rem; }
@keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }

/* ──────────────────────────
   CHAPTER 1: VILLAGE
   ────────────────────────── */
.chapter-village {
  background: var(--surface);
}
.chapter-village p {
  color: rgba(232,232,242,0.85);
  font-size: 1.05rem;
  margin-bottom: 16px;
  max-width: 520px;
}
.section-headline {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 28px;
}

/* Blockquote */
.styled-quote {
  border-left: 3px solid var(--accent);
  padding: 20px 24px;
  margin-top: 24px;
  background: rgba(16,185,129,0.04);
  border-radius: 0 8px 8px 0;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.05rem;
  color: rgba(232,232,242,0.9);
  max-width: 520px;
}
.gold-quote {
  border-left-color: var(--gold);
  background: rgba(245,158,11,0.04);
}
.rose-quote {
  border-left-color: var(--rose);
  background: rgba(244,114,182,0.04);
}

/* Terminal */
.terminal-card {
  background: #0a0a14;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.terminal-card.revealed { opacity: 1; transform: translateY(0); }
.terminal-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  background: rgba(255,255,255,0.03);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.terminal-dot { width: 12px; height: 12px; border-radius: 50%; }
.terminal-dot.red { background: #ff5f57; }
.terminal-dot.yellow { background: #ffbd2e; }
.terminal-dot.green { background: #28ca41; }
.terminal-title { margin-left: 10px; color: var(--muted); font-size: 0.75rem; }
.terminal-body { padding: 20px 22px; }
.terminal-line { margin-bottom: 14px; display: flex; flex-direction: column; gap: 4px; }
.terminal-prompt { color: var(--accent); }
.terminal-output { color: var(--muted); padding-left: 16px; }

/* ──────────────────────────
   CHAPTER 2: DREAM
   ────────────────────────── */
.chapter-dream {
  background: var(--bg);
}
.chapter-dream p {
  color: rgba(232,232,242,0.85);
  font-size: 1.05rem;
  margin-bottom: 16px;
  max-width: 520px;
}

.stats-row {
  display: flex;
  gap: 24px;
  margin-top: 20px;
  flex-wrap: wrap;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: rgba(245,158,11,0.06);
  border: 1px solid rgba(245,158,11,0.15);
  border-radius: 12px;
  padding: 16px 24px;
  min-width: 120px;
}
.stat-icon { font-size: 1.4rem; }
.stat-label { font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
.stat-value { font-weight: 600; font-size: 0.95rem; color: var(--gold); }

/* ──────────────────────────
   POLAROIDS
   ────────────────────────── */
.polaroid {
  opacity: 0;
  transform: translateY(40px) rotate(var(--rotation, 0deg));
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}
.polaroid.revealed {
  opacity: 1;
  transform: translateY(0) rotate(var(--rotation, 0deg));
}
.polaroid-inner {
  background: #f5f5f0;
  padding: 10px 10px 38px;
  border-radius: 4px;
  box-shadow: 0 6px 30px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  transform: rotate(var(--rotation, 0deg));
}
.polaroid-inner:hover {
  transform: rotate(0deg) scale(1.03);
  box-shadow: 0 12px 50px rgba(0,0,0,0.45);
}
.polaroid-inner img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  display: block;
  border-radius: 2px;
}
.polaroid-caption {
  text-align: center;
  font-family: var(--font-display);
  font-size: 0.8rem;
  color: #333;
  margin-top: 10px;
  font-style: italic;
}

.polaroid-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.polaroid-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* ──────────────────────────
   CHAPTER 3: THE EYE
   ────────────────────────── */
.chapter-eye {
  background: var(--surface);
}
.chapter-eye p {
  color: rgba(232,232,242,0.85);
  font-size: 1.05rem;
  margin-bottom: 16px;
  max-width: 520px;
}
.tags-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 16px;
}
.tag {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.78rem;
  background: rgba(16,185,129,0.08);
  border: 1px solid rgba(16,185,129,0.2);
  color: var(--accent);
  font-weight: 500;
  letter-spacing: 0.02em;
}

/* ──────────────────────────
   CHAPTER 4: THE ROOT
   ────────────────────────── */
.chapter-root {
  background: var(--bg);
}
.chapter-root p {
  color: rgba(232,232,242,0.85);
  font-size: 1.05rem;
  margin-bottom: 16px;
  max-width: 520px;
}

.values-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  max-width: 380px;
  margin-top: 20px;
}
.value-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 10px;
  background: rgba(244,114,182,0.06);
  border: 1px solid rgba(244,114,182,0.15);
  transition: transform 0.3s ease, border-color 0.3s ease;
}
.value-card:hover {
  transform: translateY(-2px);
  border-color: var(--rose);
}
.value-icon { font-size: 1.2rem; }
.value-label { font-size: 0.85rem; font-weight: 600; }

/* ──────────────────────────
   CHAPTER 5: THE BUILDER
   ────────────────────────── */
.chapter-builder {
  background: var(--bg);
  align-items: center;
  text-align: center;
}
.center-text { text-align: center; }
.emerald {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 900px;
  margin: 40px auto 0;
}
.skill-card {
  background: var(--surface);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 32px 28px;
  text-align: left;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.skill-card:hover {
  transform: translateY(-4px);
  border-color: rgba(16,185,129,0.2);
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
}
.skill-icon { font-size: 2rem; display: block; margin-bottom: 14px; }
.skill-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 6px;
}
.skill-tags {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--accent);
  margin-bottom: 10px;
}
.skill-desc {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.6;
}

.divider-glow {
  width: 120px;
  height: 1px;
  margin: 60px auto;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  box-shadow: 0 0 20px rgba(16,185,129,0.3);
}

.contact-finale {
  max-width: 700px;
  margin: 0 auto;
}
.contact-headline {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 12px;
}
.contact-sub {
  color: var(--muted);
  font-size: 1.05rem;
  margin-bottom: 36px;
}
.contact-row {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.contact-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.contact-icon { font-size: 1.5rem; }
.contact-label { font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
.contact-value {
  font-size: 0.95rem;
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s ease;
}
a.contact-value:hover { color: var(--accent); }

.social-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.social-btn {
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--text);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  transition: all 0.3s ease;
  cursor: none;
}
.social-btn:hover {
  background: rgba(16,185,129,0.1);
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

.btn-cta {
  display: inline-block;
  margin-bottom: 40px;
  font-size: 1rem;
}

.personal-quote {
  font-family: var(--font-display);
  font-style: italic;
  color: var(--muted);
  font-size: 1rem;
  margin-top: 10px;
}

/* ── FOOTER ── */
.story-footer {
  text-align: center;
  padding: 60px 20px 40px;
  background: var(--surface);
  border-top: 1px solid rgba(255,255,255,0.04);
}
.footer-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px; height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  color: #fff;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 16px;
}
.story-footer p {
  color: var(--muted);
  font-size: 0.85rem;
  margin-bottom: 6px;
}
.footer-copy { font-size: 0.75rem !important; }

/* ──────────────────────────
   RESPONSIVE
   ────────────────────────── */
@media (max-width: 960px) {
  .chapter { padding: 80px 6vw; }
  .chapter-two-col,
  .chapter-opening-inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .hero-left { order: -1; }
  .polaroid-gallery,
  .polaroid-grid {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .skills-grid { grid-template-columns: 1fr 1fr; }
  .ghost-number { font-size: 120px; opacity: 0.02; }
  .chapter-nav { right: 12px; gap: 14px; }
  .chapter-dot-tooltip { display: none; }
}

@media (max-width: 600px) {
  .chapter { padding: 60px 5vw; min-height: auto; }
  .polaroid-gallery,
  .polaroid-grid {
    grid-template-columns: 1fr;
    max-width: 280px;
    margin: 0 auto;
  }
  .skills-grid { grid-template-columns: 1fr; }
  .stats-row { flex-direction: column; align-items: stretch; }
  .hero-headline { font-size: 2rem; }
  .section-headline { font-size: 1.6rem; }
  .contact-row { flex-direction: column; gap: 24px; }
  .values-grid { grid-template-columns: 1fr; }
  .hero-buttons { flex-direction: column; }
  .btn { text-align: center; }
}
`;
