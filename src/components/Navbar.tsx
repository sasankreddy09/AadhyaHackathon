import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldPlus } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="fixed top-4 w-full z-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto backdrop-blur-3xl bg-white/80 border border-white/40 shadow-xl shadow-blue-900/5 rounded-full px-6 py-4 flex items-center justify-between">
                <div
                    className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                    onClick={() => navigate('/')}
                >
                    <ShieldPlus className="w-8 h-8 text-[var(--color-teal-accent)]" />
                    <span className="text-2xl font-black tracking-tight text-[var(--color-primary-blue)] drop-shadow-sm">Arogya Raksha</span>
                </div>

                <div className="hidden md:flex items-center gap-8 font-semibold text-gray-600">
                    <a href="/#" className="hover:text-[var(--color-primary-blue)] transition-colors">Home</a>
                    <a href="/#features" className="hover:text-[var(--color-primary-blue)] transition-colors">Features</a>
                    <a href="/#awareness" className="hover:text-[var(--color-primary-blue)] transition-colors">Awareness</a>
                    <a href="/#faq" className="hover:text-[var(--color-primary-blue)] transition-colors">FAQ</a>
                </div>

                <div className="flex items-center gap-4">
                    {location.pathname !== '/login' && (
                        <button
                            onClick={() => navigate('/login')}
                            className="text-[var(--color-primary-blue)] font-bold hover:text-blue-700 transition-colors px-2"
                        >
                            Sign In
                        </button>
                    )}
                    {location.pathname !== '/register' && (
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-gradient-auth text-white px-6 py-2.5 rounded-full font-bold hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                            Get Started
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
