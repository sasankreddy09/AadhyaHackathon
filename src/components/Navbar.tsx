import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldPlus, Menu, X } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: 'Home', href: '/#' },
        { label: 'Features', href: '/#features' },
        { label: 'Awareness', href: '/#awareness' },
        { label: 'FAQ', href: '/#faq' },
    ];

    return (
        <nav className="fixed top-4 w-full z-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto backdrop-blur-3xl bg-white/80 border border-white/40 shadow-xl shadow-blue-900/5 rounded-full px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 z-50"
                    onClick={() => {
                        navigate('/');
                        setIsMobileMenuOpen(false);
                    }}
                >
                    <ShieldPlus className="w-8 h-8 text-[var(--color-teal-accent)]" />
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-[var(--color-primary-blue)] drop-shadow-sm">Arogya Raksha</span>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-8 font-semibold text-gray-600">
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href} className="hover:text-[var(--color-primary-blue)] transition-colors">{link.label}</a>
                    ))}
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    {!!localStorage.getItem('token') ? (
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                navigate('/');
                            }}
                            className="bg-orange-50 text-orange-600 border border-orange-200 px-6 py-2.5 rounded-full font-bold hover:bg-orange-500 hover:text-white hover:shadow-lg hover:border-orange-500 hover:-translate-y-0.5 transition-all"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    className="lg:hidden z-50 p-2 text-[var(--color-primary-blue)] hover:bg-blue-50 rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-300 lg:hidden flex flex-col pt-32 px-6 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'}`}>
                <div className="flex flex-col gap-8 text-center text-xl font-bold text-gray-800">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="hover:text-[var(--color-primary-blue)] transition-colors py-2"
                        >
                            {link.label}
                        </a>
                    ))}

                    <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-gray-200 w-full max-w-sm mx-auto">
                        {!!localStorage.getItem('token') ? (
                            <button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    setIsMobileMenuOpen(false);
                                    navigate('/');
                                }}
                                className="w-full bg-orange-50 text-orange-600 border border-orange-200 px-6 py-4 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all text-lg"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                {location.pathname !== '/login' && (
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            navigate('/login');
                                        }}
                                        className="w-full text-[var(--color-primary-blue)] border-2 border-[var(--color-primary-blue)] font-bold px-6 py-4 rounded-full text-lg"
                                    >
                                        Sign In
                                    </button>
                                )}
                                {location.pathname !== '/register' && (
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            navigate('/register');
                                        }}
                                        className="w-full bg-gradient-auth text-white px-6 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-900/20"
                                    >
                                        Get Started
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;