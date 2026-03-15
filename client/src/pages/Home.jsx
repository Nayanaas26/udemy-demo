import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Hero Section */}
            <header className="relative max-w-[1400px] mx-auto xl:px-6 xl:py-8">
                <div className="relative overflow-hidden xl:rounded-lg shadow-sm">
                    {/* Hero Image replacement: using a subtle gradient/pattern block to simulate image for now */}
                    <div className="w-full h-[400px] bg-gray-100 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')" }}></div>
                    
                    {/* Hero Card overlay */}
                    <div className="absolute top-10 left-10 md:top-16 md:left-16 bg-white p-8 max-w-md shadow-lg hidden md:block border border-gray-100 rounded-sm">
                        <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4 font-serif">
                            Learning that gets you
                        </h1>
                        <p className="text-base text-gray-800 mb-6 leading-relaxed">
                            Skills for your present (and your future). Get started with us.
                        </p>
                        <Link to="/courses" className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded transition-colors whitespace-nowrap">
                            Explore courses
                        </Link>
                    </div>
                </div>
                
                {/* Mobile hero content */}
                <div className="px-6 py-8 md:hidden bg-white">
                    <h1 className="text-3xl font-black text-gray-900 leading-tight mb-4 font-serif">
                        Learning that gets you
                    </h1>
                    <p className="text-base text-gray-800 mb-6">
                        Skills for your present (and your future). Get started with us.
                    </p>
                    <Link to="/courses" className="block text-center bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded transition-colors">
                        Explore courses
                    </Link>
                </div>
            </header>

            <section className="py-12 bg-white">
                <div className="max-w-[1400px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-gray-900">What to learn next</h2>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">A broad selection of courses</h3>
                    <p className="text-gray-700 text-base mb-8 max-w-3xl">
                        Choose from over 210,000 online video courses with new additions published every month.
                    </p>
                    <Link to="/courses" className="inline-block border border-gray-900 text-gray-900 hover:bg-gray-100 font-bold py-2 px-4 rounded transition-colors">
                        Explore Python
                    </Link>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="py-16 bg-gray-50 border-t border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-6 text-center">
                    <h3 className="text-xl font-bold text-gray-600 mb-8">Trusted by over 14,400 companies and millions of learners around the world</h3>
                    <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16 opacity-60 grayscale">
                        <div className="text-2xl font-black font-serif">Volkswagen</div>
                        <div className="text-2xl font-black font-mono">SAMSUNG</div>
                        <div className="text-2xl font-black font-sans">Cisco</div>
                        <div className="text-2xl font-black font-serif italic">Vimeo</div>
                        <div className="text-2xl font-black">ERICSSON</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
