import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Contact = () => {

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

    const contactDetails = [
        {
            id: 'email',
            name: 'Email',
            value: 'ladnil03@gmail.com',
            icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
            color: 'from-blue-400 to-cyan-500',
            bgColor: 'from-blue-600/20 to-cyan-600/20',
            borderColor: 'border-blue-500/30',
            link: 'mailto:ladnil03@gmail.com'
        },
        {
            id: 'instagram',
            name: 'Instagram',
            value: 'lad_nil_20',
            icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
            color: 'from-pink-400 to-rose-500',
            bgColor: 'from-pink-600/20 to-rose-600/20',
            borderColor: 'border-pink-500/30',
            link: 'https://www.instagram.com/lad_nil_20/'
        },
        {
            id: 'facebook',
            name: 'Facebook',
            value: 'Nil Lad',
            icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'from-blue-600/20 to-indigo-600/20',
            borderColor: 'border-blue-500/30',
            link: 'https://www.facebook.com/neel.lad.31'
        },
        {
            id: 'twitter',
            name: 'Twitter',
            value: '@nil_2006_n3',
            icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>,
            color: 'from-sky-400 to-blue-500',
            bgColor: 'from-sky-600/20 to-blue-600/20',
            borderColor: 'border-sky-500/30',
            link: 'https://x.com/Nil_2006_n3'
        },
        {
            id: 'discord',
            name: 'Discord',
            value: 'Nil_20',
            icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/></svg>,
            color: 'from-purple-400 to-indigo-500',
            bgColor: 'from-purple-600/20 to-indigo-600/20',
            borderColor: 'border-purple-500/30',
            link: 'https://discord.gg/PrYrb6UN'
        },
        {
            id: 'github',
            name: 'GitHub',
            value: 'ladnil03',
            icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
            color: 'from-gray-400 to-gray-600',
            bgColor: 'from-gray-600/20 to-gray-800/20',
            borderColor: 'border-gray-500/30',
            link: 'https://github.com/ladnil03'
        }
    ];

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
                .contact-card {
                    background: linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(31, 41, 55, 0.6));
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(75, 85, 99, 0.3);
                    transition: all 0.4s ease;
                    transform-style: preserve-3d;
                }
                .contact-card:hover {
                    transform: translateY(-10px) rotateX(5deg);
                    box-shadow: 0 25px 50px rgba(0,0,0,0.4);
                }
                .floating-animation {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .pulse-glow {
                    animation: pulseGlow 2s ease-in-out infinite alternate;
                }
                @keyframes pulseGlow {
                    from { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
                    to { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
                }
            `}</style>

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
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
                    <a href="#projects" className="relative group text-gray-400 hover:text-gray-200 transition-all duration-300 text-sm lg:text-base">
                        <span className="relative z-10">Projects</span>
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-zinc-400 to-gray-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </a>
                </div>
                {/* Mobile menu button */}
                <button className="sm:hidden p-2 text-gray-400 hover:text-gray-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </nav>

            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-160px)] px-4 py-8">
                <div className="max-w-6xl mx-auto w-full">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="scroll-animate text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Get In Touch
                        </h1>
                        <p className="scroll-animate text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                            Let's connect! Reach out to me through any of these platforms
                        </p>
                    </div>

                    {/* Contact Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {contactDetails.map((contact, index) => (
                            <div
                                key={contact.id}
                                className="scroll-animate contact-card rounded-2xl p-6 cursor-pointer floating-animation"
                                style={{ animationDelay: `${index * 0.5}s` }}
                                onClick={() => window.open(contact.link, '_blank')}
                            >
                                <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${contact.bgColor} ${contact.borderColor} border mb-4 mx-auto text-white`}>
                                    {contact.icon}
                                </div>
                                
                                <div className="text-center">
                                    <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${contact.color} bg-clip-text text-transparent`}>
                                        {contact.name}
                                    </h3>
                                    <p className="text-gray-300 font-medium text-lg">
                                        {contact.value}
                                    </p>
                                </div>

                                <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${contact.color} transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-12">
                        <div className="scroll-animate bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                                Ready to Collaborate?
                            </h2>
                            <p className="text-gray-300 text-lg mb-6">
                                I'm always excited to work on new projects and connect with fellow developers and creators.
                            </p>
                            <a
                                href="mailto:ladnil03@gmail.com"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full font-semibold text-white shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300"
                            >
                                Send Me an Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 bg-white/5 border-t border-white/10 py-8">
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