import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Code, Cpu, Smartphone, Layers } from 'lucide-react';

export const Projects = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                } else {
                    entry.target.classList.remove('animate-in');
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.scroll-animate');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, [selectedCategory]); // Re-observe when filter changes and DOM updates

    const projectsList = [
        {
            id: 'dayflow',
            title: 'Dayflow',
            subtitle: 'Full-Stack Attendance Management System',
            description: 'Built a full-stack attendance and leave management platform featuring role-based dashboards, real-time check-in/check-out, and CSV reporting workflows.',
            stack: ['React', 'Vite', 'Tailwind CSS', 'FastAPI', 'Pydantic', 'MongoDB', 'JWT', 'Docker', 'nginx'],
            categories: ['Full-Stack'],
            icon: <Layers className="w-6 h-6" />,
            github: 'https://github.com/ladnil03', // Fallback to profile or specific repository if known
            gradient: 'from-cyan-500 via-teal-500 to-emerald-600',
            glowColor: 'rgba(20, 184, 166, 0.15)'
        },
        {
            id: 'heart-disease',
            title: 'Heart Disease Prediction',
            subtitle: 'ML-Powered Risk Assessment Platform',
            description: 'Developed an end-to-end ML web app that predicts heart disease risk using XGBoost and explains outcomes with SHAP, featuring FastAPI endpoints, MongoDB persistence, and automated PDF report generation.',
            stack: ['Python', 'XGBoost', 'scikit-learn', 'SHAP', 'FastAPI', 'MongoDB', 'JavaScript', 'ReportLab'],
            categories: ['AI / ML', 'Full-Stack'],
            icon: <Cpu className="w-6 h-6" />,
            github: 'https://github.com/ladnil03',
            gradient: 'from-rose-500 via-pink-500 to-red-600',
            glowColor: 'rgba(244, 63, 94, 0.15)'
        },
        {
            id: 'portfolio',
            title: 'Personal Portfolio',
            subtitle: 'Story-Driven Interactive Website',
            description: 'Created a story-driven interactive portfolio website with chapter-based scrolling, custom React hooks, animation-rich UI elements, and fully responsive architecture.',
            stack: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Radix UI', 'Lucide Icons'],
            categories: ['Full-Stack'],
            icon: <Code className="w-6 h-6" />,
            github: 'https://github.com/ladnil03',
            gradient: 'from-purple-500 via-fuchsia-500 to-pink-600',
            glowColor: 'rgba(168, 85, 247, 0.15)'
        },
        {
            id: 'vidsnap',
            title: 'Vidsnap AI',
            subtitle: 'AI-Powered Video Reel Generator',
            description: 'Engineered an AI-assisted reel generator that converts text to voice and combines uploaded images into 1080x1920 MP4 videos through an automated background processing pipeline.',
            stack: ['Python', 'Flask', 'ElevenLabs API', 'FFmpeg', 'Jinja2', 'Background Workers'],
            categories: ['AI / ML'],
            icon: <Cpu className="w-6 h-6" />,
            github: 'https://github.com/ladnil03',
            gradient: 'from-amber-500 via-orange-500 to-red-500',
            glowColor: 'rgba(245, 158, 11, 0.15)'
        },
        {
            id: 'metishire',
            title: 'Metis Hire',
            subtitle: 'AI-Powered Recruitment Platform',
            description: 'Built an AI-driven recruitment platform that automates resume parsing, conducts contextual live interviews, and produces weighted candidate rankings to support recruiter shortlisting decisions.',
            stack: ['Next.js', 'TypeScript', 'Flask', 'Socket.IO', 'MongoDB', 'JWT', 'Groq API', 'Docker'],
            categories: ['AI / ML', 'Full-Stack'],
            icon: <Layers className="w-6 h-6" />,
            github: 'https://github.com/ladnil03',
            gradient: 'from-blue-500 via-indigo-500 to-violet-600',
            glowColor: 'rgba(59, 130, 246, 0.15)'
        },
        {
            id: 'vyaparseth',
            title: 'VyaparSeth',
            subtitle: 'Smart Udhaar & Store Manager',
            description: 'Developed a Flutter and FastAPI business management app for Indian retail shops with customer udhaar tracking, billing, low-stock alerts, WhatsApp reminders, and AI-powered shop insights.',
            stack: ['Flutter', 'Dart', 'Provider', 'Dio', 'FastAPI', 'MongoDB', 'Groq API'],
            categories: ['Mobile', 'AI / ML'],
            icon: <Smartphone className="w-6 h-6" />,
            github: 'https://github.com/ladnil03',
            gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
            glowColor: 'rgba(16, 185, 129, 0.15)'
        },
        {
            id: 'interncrawler',
            title: 'Intern Crawler',
            subtitle: 'AI Internship Matching System',
            description: 'Built a resume-to-internship matching system using sentence-transformer embeddings and cosine similarity, with auto-crawl fallback logic, diagnostics, and a streamlined recommendation interface.',
            stack: ['FastAPI', 'Python', 'MongoDB', 'Sentence-Transformers', 'Streamlit', 'Groq API'],
            categories: ['AI / ML', 'Full-Stack'],
            icon: <Cpu className="w-6 h-6" />,
            github: 'https://github.com/ladnil03',
            gradient: 'from-yellow-500 via-amber-500 to-orange-600',
            glowColor: 'rgba(234, 179, 8, 0.15)'
        }
    ];

    const categories = ['All', 'AI / ML', 'Full-Stack', 'Mobile'];

    const filteredProjects = selectedCategory === 'All'
        ? projectsList
        : projectsList.filter(project => project.categories.includes(selectedCategory));

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-black via-gray-950 to-black text-white relative overflow-hidden">
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
                * {
                    font-family: 'Playfair Display', 'Hoefler Text', 'Times New Roman', serif;
                }
                .scroll-animate {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: all 0.8s ease-out;
                }
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }
                .project-card {
                    background: linear-gradient(135deg, rgba(17, 24, 39, 0.85), rgba(31, 41, 55, 0.65));
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(75, 85, 99, 0.25);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .project-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(255, 255, 255, 0.2);
                }
                .filter-btn {
                    transition: all 0.3s ease;
                }
                .filter-btn.active {
                    background: white;
                    color: black;
                    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15);
                }
            `}</style>

            {/* Background Glow Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Nav bar */}
            <nav className="relative z-10 flex justify-between items-center p-4 sm:p-6 backdrop-blur-sm bg-white/5 border-b border-white/10">
                <div className="ml-4 hover:scale-110 transition-all duration-300 hover:drop-shadow-lg cursor-pointer">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent relative">
                        N<span className="text-white/20 mx-0"></span>L
                    </span>
                </div>
                <div className="hidden sm:flex space-x-4 lg:space-x-8 mr-4">
                    <Link to="/" className="relative group text-gray-400 hover:text-gray-200 transition-all duration-300 text-sm lg:text-base">
                        <span className="relative z-10">Home</span>
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-gray-400 to-stone-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                    <Link to="/about" className="relative group text-gray-400 hover:text-gray-200 transition-all duration-300 text-sm lg:text-base">
                        <span className="relative z-10">About</span>
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-stone-400 to-zinc-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                    <Link to="/contact" className="relative group text-gray-400 hover:text-gray-200 transition-all duration-300 text-sm lg:text-base">
                        <span className="relative z-10">Contact</span>
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-zinc-400 to-gray-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                </div>
                {/* Mobile menu button */}
                <button 
                    className="sm:hidden p-2 text-gray-400 hover:text-gray-200"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="sm:hidden fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="absolute right-0 top-0 h-full w-64 bg-gray-900/95 backdrop-blur-sm border-l border-white/10 transform transition-transform duration-300">
                        <div className="p-6 space-y-6">
                            <Link 
                                to="/" 
                                className="block text-gray-300 hover:text-white transition-colors duration-300 py-3 text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/about" 
                                className="block text-gray-300 hover:text-white transition-colors duration-300 py-3 text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link 
                                to="/contact" 
                                className="block text-gray-300 hover:text-white transition-colors duration-300 py-3 text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-24">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="scroll-animate text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                        My Projects
                    </h1>
                    <p className="scroll-animate text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                        A showcase of full-stack products, machine learning systems, and AI applications I've built and shipped.
                    </p>
                </div>

                {/* Filters */}
                <div className="scroll-animate flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`filter-btn px-5 py-2.5 rounded-full border border-white/10 text-sm font-semibold hover:border-white/30 cursor-pointer ${
                                selectedCategory === category ? 'active' : 'bg-white/5 text-gray-300'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="scroll-animate project-card rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
                            style={{ 
                                animationDelay: `${index * 0.1}s`,
                                boxShadow: `0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 40px -10px ${project.glowColor}`
                            }}
                        >
                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    {/* Header (Icon + Title) */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} text-white`}>
                                            {project.icon}
                                        </div>
                                        <div className="flex space-x-1">
                                            {project.categories.map((cat) => (
                                                <span 
                                                    key={cat} 
                                                    className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-gray-400"
                                                >
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Title & Subtitle */}
                                    <h3 className="text-2xl font-bold mb-1 tracking-tight text-white">
                                        {project.title}
                                    </h3>
                                    <p className={`text-xs font-semibold mb-4 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                                        {project.subtitle}
                                    </p>

                                    {/* Description */}
                                    <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium">
                                        {project.description}
                                    </p>
                                </div>

                                <div>
                                    {/* Tech Badges */}
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {project.stack.map((tech) => (
                                            <span 
                                                key={tech} 
                                                className="px-2 py-0.5 bg-gray-800/40 rounded border border-gray-700/30 text-xs font-medium text-gray-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <a 
                                            href={project.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors duration-200"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span>Source Code</span>
                                        </a>
                                        
                                        <a 
                                            href={project.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-1 text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} hover:brightness-125 transition-all duration-200`}
                                        >
                                            <span>View Code</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 bg-white/5 border-t border-white/10 py-8 mt-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center space-y-4">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
                            <a href="mailto:ladnil03@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                                <span className="text-sm sm:text-base">ladnil03@gmail.com</span>
                            </a>
                            <a href="tel:+917359986990" className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors duration-300">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                </svg>
                                <span className="text-sm sm:text-base">+91 7359986990</span>
                            </a>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                        <p className="text-xs sm:text-sm text-gray-400">
                            &copy; 2025 <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">Nil Lad</span>. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
