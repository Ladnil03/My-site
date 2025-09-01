import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import nilPhoto from '../assets/nil.jpg';
import childhood from '../assets/childhood.jpg';
import mom from '../assets/mom.jpg';
import momdada from '../assets/momdada.jpg';
import lad_family from '../assets/ladfamily.jpg';
import mountain from '../assets/mountain.jpg';
import river from '../assets/river.jpg';
import bridge from '../assets/bridge.jpg';
import night from '../assets/night.jpg';
import mahirat from '../assets/Mahirat.jpeg';
import rcb from '../assets/RCB .jpeg';
import rohirat from '../assets/ROHIRAT.jpeg';
import t20wc from '../assets/t20wc.jpeg';

export const About = () => {
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

    const [typedText, setTypedText] = useState('');
    const fullText = "Passionate AIML Engineer & Creative Designer";

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < fullText.length) {
                setTypedText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 100);
        return () => clearInterval(timer);
    }, []);

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
                .polaroid {
                    background: linear-gradient(145deg, #f8f9fa, #e9ecef);
                    padding: 15px 15px 60px 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1);
                    position: relative;
                }
                .polaroid::after {
                    content: attr(data-caption);
                    position: absolute;
                    bottom: 15px;
                    left: 15px;
                    right: 15px;
                    text-align: center;
                    color: #333;
                    font-size: 14px;
                    font-weight: 500;
                }
                .red-pin::before {
                    content: '';
                    position: absolute;
                    top: -12px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, #dc2626, #991b1b);
                    border-radius: 50%;
                    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
                    z-index: 10;
                }
                .black-clip::before {
                    content: '';
                    position: absolute;
                    top: -8px;
                    right: 10px;
                    width: 30px;
                    height: 15px;
                    background: linear-gradient(145deg, #1f2937, #111827);
                    border-radius: 2px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
                    z-index: 10;
                }
                .blue-pin::before {
                    content: '';
                    position: absolute;
                    top: -10px;
                    right: 20px;
                    width: 16px;
                    height: 16px;
                    background: radial-gradient(circle, #2563eb, #1d4ed8);
                    border-radius: 50%;
                    box-shadow: 0 3px 10px rgba(37, 99, 235, 0.4);
                    z-index: 10;
                }
                .typewriter {
                    border-right: 2px solid #10b981;
                    animation: blink 1s infinite;
                }
                @keyframes blink {
                    0%, 50% { border-color: #10b981; }
                    51%, 100% { border-color: transparent; }
                }
                .story-card {
                    background: linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(31, 41, 55, 0.6));
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(75, 85, 99, 0.3);
                    transition: all 0.4s ease;
                }
                .story-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    border-color: rgba(16, 185, 129, 0.4);
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
                                to="/" 
                                className="block text-gray-300 hover:text-white transition-colors duration-300 py-3 text-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
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
            )}

            <div className="relative z-10 container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="scroll-animate text-4xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                        About Me
                    </h1>
                    <p className="scroll-animate text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                        Discover my journey, passions, and the moments that inspire my creativity
                    </p>
                </div>

                {/* Section 1: About Myself */}
                <section className="scroll-animate mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            🚀 About Myself
                        </h2>
                        <p className="text-xl text-emerald-400 typewriter font-medium">
                            {typedText}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        {/* Profile Photo */}
                        <div className="relative mx-auto">
                            <div className="relative red-pin w-fit transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="Nil Lad - AIML Engineer">
                                    <div className="w-80 h-80 overflow-hidden">
                                        <img
                                            src={nilPhoto}
                                            alt="Nil Lad"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Content */}
                        <div className="space-y-6">
                            <div className="story-card rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-amber-400">My Journey</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Hello! I'm <span className="text-emerald-400 font-semibold">Nil Lad</span>, and I come from <span className="text-cyan-400 font-semibold">Rumla</span>, a small village that has shaped my <span className="text-blue-400 font-semibold">values and determination</span>. 
                                    I am currently in the <span className="text-purple-400 font-semibold">third semester</span> of my undergraduate studies in <span className="text-emerald-400 font-semibold">Artificial Intelligence and Machine Learning (AIML)</span>.
                                </p>
                                <p className="text-gray-300 leading-relaxed mt-3">
                                    I have always been passionate about <span className="text-orange-400 font-semibold">cricket</span>, and although I could not fully pursue it as a career, the <span className="text-red-400 font-semibold">love for the game</span> continues to inspire me. 
                                    Alongside this, I enjoy <span className="text-green-400 font-semibold">photography</span>, capturing the beauty of moments and the world around me.
                                </p>
                                <p className="text-gray-300 leading-relaxed mt-3">
                                    A major turning point in my life was <span className="text-pink-400 font-semibold">moving away from home to live in a hostel</span>, an experience that taught me <span className="text-cyan-400 font-semibold">independence, adaptability, and discipline</span>. 
                                    Today, I am focused on <span className="text-emerald-400 font-semibold">strengthening my knowledge in AIML</span> while continuing to nurture my passions.
                                </p>
                            </div>

                            <div className="story-card rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-emerald-400">What Drives Me</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    What drives me is the passion to <span className="text-emerald-400 font-semibold">grow beyond limitations</span> and embrace every opportunity to learn. 
                                    Though I couldn't fully pursue my dream of becoming a <span className="text-orange-400 font-semibold">cricketer</span>, the <span className="text-red-400 font-semibold">spirit of the game</span> still inspires me to stay determined.
                                </p>
                                <p className="text-gray-300 leading-relaxed mt-3">
                                    <span className="text-green-400 font-semibold">Photography</span> fuels my creativity by helping me see <span className="text-cyan-400 font-semibold">beauty in everyday moments</span>, while my journey away from home has taught me <span className="text-pink-400 font-semibold">resilience and independence</span>.
                                </p>
                                <p className="text-gray-300 leading-relaxed mt-3">
                                    Today, my focus on <span className="text-purple-400 font-semibold">Artificial Intelligence and Machine Learning</span> motivates me to keep <span className="text-blue-400 font-semibold">learning, adapting, and building a future</span> that blends my passions with my profession.
                                </p>
                            </div>



                        </div>
                    </div>
                </section>

                {/* Section 2: My Family */}
                <section className="scroll-animate mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-rose-500 to-red-600 bg-clip-text text-transparent">
                            👨‍👩‍👧‍👦 My Family
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            The foundation of my strength, love, and inspiration
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                        {/* Family Photo Gallery */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Family Portrait */}
                            <div className="relative red-pin col-span-2 transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="The Lad Family">
                                    <div className="aspect-video overflow-hidden">
                                        <img src={lad_family} alt="The Lad Family" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            {/* Parents Photo */}
                            <div className="relative black-clip transform -rotate-4 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="My Parents">
                                    <div className="aspect-square overflow-hidden">
                                        <img src={momdada} alt="My Parents" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            {/* Siblings/Extended Family */}
                            <div className="relative blue-pin transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="With Mom">
                                    <div className="aspect-square overflow-hidden">
                                        <img src={mom} alt="With Mom" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            {/* Family Gathering */}
                            <div className="relative red-pin col-span-2 transform -rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="Childhood Memories">
                                    <div className="aspect-video overflow-hidden">
                                        <img src={childhood} alt="Childhood Memories" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Family Content */}
                        <div className="space-y-6">
                            <div className="story-card rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-pink-400">My Foundation</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Family is everything to me. They are my <span className="text-rose-400 font-semibold">source of strength, motivation, and unconditional love</span>.
                                    Every achievement in my life is a reflection of the <span className="text-pink-400 font-semibold">values and support</span> they've given me throughout my journey.
                                </p>
                                <p className="text-gray-300 leading-relaxed mt-3">
                                    From <span className="text-rose-400 font-semibold">growing up surrounded by family love</span> to eventually <span className="text-red-400 font-semibold">leaving home to pursue my dreams</span>, 
                                    they have been my constant support system. Even when I'm away, their <span className="text-pink-400 font-semibold">blessings and encouragement</span> guide me every step of the way.
                                </p>
                            </div>

                            <div className="story-card rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-rose-400 to-red-500 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-rose-400">Family Values</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: 'Unconditional Love', icon: '❤️' },
                                        { value: 'Mutual Support', icon: '🤗' },
                                        { value: 'Shared Dreams', icon: '✨' },
                                        { value: 'Strong Bond', icon: '🔗' }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center p-3 bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-lg border border-pink-500/20">
                                            <span className="text-2xl mr-3">{item.icon}</span>
                                            <span className="text-sm font-medium text-gray-300">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="story-card rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-red-400">What They Mean to Me</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    My family has shaped who I am today. Their <span className="text-pink-400 font-semibold">belief in my dreams</span> gave me the confidence to pursue AIML engineering.
                                    They celebrate my successes and support me through challenges, making every milestone more meaningful.
                                </p>
                            </div>

                            <div className="story-card rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-purple-400">Family Traditions</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    We cherish our <span className="text-rose-400 font-semibold">family gatherings, festivals, and simple moments</span> together.
                                    Whether it's sharing meals, celebrating achievements, or just spending quality time, these moments create the memories I treasure most.
                                </p>
                            </div>

                            <div className="story-card rounded-2xl p-6 bg-gradient-to-r from-pink-900/20 to-rose-900/20 border border-pink-500/20">
                                <div className="text-center">
                                    <div className="text-3xl mb-3">💕</div>
                                    <blockquote className="text-lg italic text-pink-200 mb-3">
                                        "Family is not just an important thing, it's everything. They are my anchor in this journey of life."
                                    </blockquote>
                                    <cite className="text-pink-400 font-semibold">- My Heart</cite>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Photography Passion */}
                <section className="scroll-animate mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                            📸 Photography & Nature
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Capturing moments that inspire creativity and bring fresh perspectives to my work
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
                        {/* Photography Content */}
                        <div className="space-y-6">
                            <div className="story-card rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-emerald-400">Through My Lens</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Photography is more than a hobby for me—it's a way to connect with nature and find inspiration.
                                    Every shot tells a story, and every landscape teaches me something new about <span className="text-green-400 font-semibold">beauty, patience, and perspective</span>.
                                </p>
                            </div>

                            <div className="story-card rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-teal-400">Favorite Subjects</h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {['Mountain Landscapes', 'Ocean Sunsets', 'Forest Trails', 'Wildlife', 'Starry Nights', 'Golden Hour'].map((subject) => (
                                        <span key={subject} className="px-3 py-2 bg-gradient-to-r from-green-600/30 to-emerald-600/30 rounded-full text-sm border border-green-500/30 hover:border-green-400/50 transition-colors duration-300">
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="story-card rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-emerald-400">Creative Impact</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    I love taking pictures of nature, and whenever I see a <span className="text-cyan-400 font-semibold">beautiful view</span>, I always capture it.
                                    I collect precious <span className="text-green-400 font-semibold">memories through photography</span>, preserving moments that touch my heart and soul.
                                </p>
                            </div>
                        </div>

                        {/* Photo Gallery */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative black-clip transform -rotate-6 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="Mountain Vista">
                                    <div className="aspect-square overflow-hidden">
                                        <img src={mountain} alt="Mountain Vista" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative blue-pin transform rotate-4 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="River Flow">
                                    <div className="aspect-square overflow-hidden">
                                        <img src={river} alt="River Flow" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative red-pin transform -rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="Bridge View">
                                    <div className="aspect-square overflow-hidden">
                                        <img src={bridge} alt="Bridge View" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative blue-pin transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="Starry Night">
                                    <div className="aspect-square overflow-hidden">
                                        <img src={night} alt="Starry Night" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Cricket Passion */}
                <section className="scroll-animate mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
                            🏏 Cricket - My Favorite Sport
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            The gentleman's game that teaches strategy, patience, and teamwork
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        {/* Cricket Photo Gallery */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="relative red-pin col-span-2 transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="T20 Trohpy">
                                    <div className="aspect-video overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                                        <img src={t20wc} alt="T20 World Cup" className="w-full h-full object-cover object-center" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative black-clip transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="MahiRat">
                                    <div className="aspect-square overflow-hidden">
                                        <img src={mahirat} alt="Mahi & Virat" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative blue-pin transform -rotate-4 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="RO-KO">
                                    <div className="aspect-square overflow-hidden">
                                        <img src={rohirat} alt="Rohit & Virat" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>

                            <div className="relative red-pin col-span-2 transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                                <div className="polaroid" data-caption="Finally after 18 years">
                                    <div className="aspect-video overflow-hidden bg-gradient-to-br from-red-100 to-orange-100">
                                        <img src={rcb} alt="RCB Team" className="w-full h-full object-cover object-center" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cricket Content */}
                        <div className="space-y-6">
                            <div className="story-card rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-orange-400">Why Cricket?</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Cricket isn't just a sport for me—it's a <span className="text-orange-400 font-semibold">masterclass in strategy and patience</span>.
                                    The game teaches you to think several moves ahead, adapt to changing conditions, and work as a cohesive team.
                                </p>
                                <p className="text-gray-300 leading-relaxed mt-3">
                                    My favorite cricketer is <span className="text-red-400 font-semibold">Virat Kohli</span>. I learned the value of <span className="text-orange-400 font-semibold">hard work and dedication</span> from him. 
                                    His passion for the game made me fall in love with cricket. Cricket has been my <span className="text-pink-400 font-semibold">dream</span>, and it's still alive in me—I will strive to achieve it no matter what.
                                </p>
                            </div>

                            <div className="story-card rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-red-400">Favorite Aspects</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { aspect: 'Strategic Thinking', icon: '🧠' },
                                        { aspect: 'Team Coordination', icon: '🤝' },
                                        { aspect: 'Pressure Handling', icon: '💪' },
                                        { aspect: 'Precision & Timing', icon: '🎯' }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center p-3 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg border border-orange-500/20">
                                            <span className="text-2xl mr-3">{item.icon}</span>
                                            <span className="text-sm font-medium text-gray-300">{item.aspect}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="story-card rounded-2xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-pink-400">Life Lessons</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Cricket has taught me that <span className="text-red-400 font-semibold">success comes from preparation, patience, and perseverance</span>.
                                    These principles directly apply to my coding projects—every bug fix is like taking a wicket, every successful deployment like hitting a six!
                                </p>
                            </div>

                            <div className="story-card rounded-2xl p-6 bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/20">
                                <div className="text-center">
                                    <div className="text-3xl mb-3">🏆</div>
                                    <blockquote className="text-lg italic text-orange-200 mb-3">
                                        "Cricket is a game of glorious uncertainties, just like coding—you never know what challenge comes next!"
                                    </blockquote>
                                    <cite className="text-orange-400 font-semibold">- My Cricket Philosophy</cite>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};