import motivation from '../assets/motivation.mp4';
import nilPhoto from '../assets/nil.jpg';
import backgroundImg from '../assets/background.jpeg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    }, []);

    return (
        <div className="min-h-screen w-screen text-white relative overflow-x-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black animate-pulse" style={{animationDuration: '8s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-950 via-black to-gray-950 animate-pulse opacity-50" style={{animationDuration: '12s', animationDelay: '4s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-black via-slate-950 to-black animate-pulse opacity-30" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
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
            `}</style>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-stone-600/30 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gray-600/30 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-60 sm:h-60 lg:w-96 lg:h-96 bg-zinc-600/20 rounded-full blur-xl sm:blur-3xl animate-pulse"></div>
            </div>

            {/* Nav bar */}
            <nav className="relative z-10 flex justify-between items-center p-4 sm:p-6 backdrop-blur-sm bg-white/5 border-b border-white/10">
                <div className="ml-4 hover:scale-110 transition-all duration-300 hover:drop-shadow-lg cursor-pointer">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent relative">
                        N<span className="text-white/20 mx-0"></span>L
                    </span>
                </div>
                <div className="hidden sm:flex space-x-4 lg:space-x-8 mr-4">
                    <Link to="/about" className="relative group text-gray-400 hover:text-gray-200 transition-all duration-300 text-sm lg:text-base">
                        <span className="relative z-10">About</span>
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-gray-400 to-stone-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                    <a href="#projects" className="relative group text-gray-400 hover:text-gray-200 transition-all duration-300 text-sm lg:text-base">
                        <span className="relative z-10">Projects</span>
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-stone-400 to-zinc-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </a>
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
                                to="/about" 
                                className="block text-gray-300 hover:text-white transition-colors duration-300 py-3 text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <a 
                                href="#projects" 
                                className="block text-gray-300 hover:text-white transition-colors duration-300 py-3 text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Projects
                            </a>
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
            )
        }
            {/* Hero Section */}
            <section className="relative z-10 h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={backgroundImg} 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-30"
                        style={{objectPosition: '0% center', transform: 'scale(0.8)'}}
                    />
                    <div className="absolute inset-0 bg-black/25"></div>
                </div>
                
                <div className="w-full max-w-full mx-auto flex flex-col lg:flex-row items-center relative z-10 px-4 sm:px-6 lg:px-8">
                    
                    {/* Desktop image - moved to left */}
                    <div className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 hidden lg:block">
                        <div className="w-48 sm:w-56 lg:w-64 h-48 sm:h-56 lg:h-64 rounded-2xl border border-gray-600/20 overflow-hidden backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                            <img 
                                src={nilPhoto} 
                                alt="Nil Lad" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    
                    <div className="flex-1 text-center lg:text-right lg:max-w-3xl lg:ml-auto">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight break-words">
                            Hi, I'm Nil Lad
                        </h1>
                    </div>
                    
                    {/* Mobile image */}
                    <div className="lg:hidden mt-8">
                        <div className="w-48 h-48 rounded-2xl border border-gray-600/20 overflow-hidden backdrop-blur-sm hover:scale-105 transition-transform duration-300 mx-auto opacity-80">
                            <img 
                                src={nilPhoto} 
                                alt="Nil Lad" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/5 border-t border-white/10">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="scroll-animate text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                        Here to know me
                    </h2>
                    <div className="mb-6 sm:mb-8 space-y-3 max-w-4xl mx-auto">
                        <p className="scroll-animate text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed font-medium">
                            I'm a passionate 
                            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-bold"> developer </span>
                            who loves creating
                        </p>
                        <p className="scroll-animate text-sm sm:text-base lg:text-lg text-indigo-200 leading-relaxed font-medium">
                            Myself Nil Lad, an AIML engineer and creative web designer. I bring innovative solutions to life through code.
                            With expertise in modern web technologies, I build responsive and user-friendly applications.
                        </p>
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
                        <a href="#projects" className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-700 to-stone-700 rounded-full font-semibold text-gray-100 shadow-lg hover:shadow-stone-700/50 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                            View My Work
                        </a>
                        
                        <Link to="/contact" className="group relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-transparent bg-gradient-to-r from-zinc-700 to-gray-700 rounded-full font-semibold text-gray-100 hover:shadow-zinc-700/50 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                            <span className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 m-0.5 rounded-full"></span>
                            <span className="relative z-10 bg-gradient-to-r from-stone-400 to-zinc-400 bg-clip-text text-transparent group-hover:from-gray-200 group-hover:to-gray-200">
                                Contact Me
                            </span>
                        </Link>
                    </div>
                    
                    {/* Skills badges */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4">
                        {['React', 'JavaScript', 'Node.js', 'Python', 'CSS'].map((skill) => (
                            <span key={skill} className="px-3 sm:px-4 lg:px-5 py-2 bg-gray-800/30 rounded-full border border-gray-600/30 text-xs sm:text-sm font-medium hover:bg-gray-700/40 hover:scale-110 hover:shadow-lg hover:shadow-stone-700/30 transition-all duration-300">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Motivation Section */}
            <section className="relative z-10 py-16 sm:py-20 lg:py-24 overflow-hidden border-t border-gray-700/20">
                {/* Background Video */}
                <video 
                    className="absolute inset-0 w-full h-full object-cover opacity-30" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                >
                    <source src={motivation} type="video/mp4" />
                </video>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="scroll-animate text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                        Stay Motivated
                    </h2>
                    <p className="scroll-animate text-lg sm:text-xl lg:text-2xl text-purple-100 leading-relaxed font-medium">
                        "The only way to do great work is to love what you do. Keep pushing boundaries, 
                        embrace challenges, and never stop learning. Every line of code is a step towards 
                        building something amazing."
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 text-center py-4 sm:py-6 bg-white/5 border-t border-white/10">
                <p className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300 px-4">
                    &copy; 2025 <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Nil lad</span>. All rights reserved.
                </p>
            </footer>
        </div>
    );
};
