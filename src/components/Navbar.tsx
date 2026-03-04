import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldPlus, Menu, X } from 'lucide-react';

const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isLoggedIn = !!localStorage.getItem("token");

    const navLinks = isLoggedIn
        ? [{ label: "Triage", href: "/triage" }]
        : [
            { label: "Home", href: "/#" },
            { label: "Features", href: "/#features" },
            { label: "Awareness", href: "/#awareness" },
            { label: "FAQ", href: "/#faq" },
        ];

    return (
        <nav className="fixed top-4 w-full z-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto backdrop-blur-3xl bg-white/80 border border-white/40 shadow-xl shadow-blue-900/5 rounded-full px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                        navigate('/');
                        setIsMobileMenuOpen(false);
                    }}
                >
                    <ShieldPlus className="w-8 h-8 text-[var(--color-teal-accent)]" />
                    <span className="text-xl sm:text-2xl font-black text-[var(--color-primary-blue)]">
                        Arogya Raksha
                    </span>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-8 font-semibold text-gray-600">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => navigate(link.href)}
                            className="hover:text-[var(--color-primary-blue)] transition-colors"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden lg:flex items-center gap-4">

                    {isLoggedIn ? (

                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                navigate('/');
                            }}
                            className="bg-orange-50 text-orange-600 border border-orange-200 px-6 py-2.5 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all"
                        >
                            Logout
                        </button>

                    ) : (

                        <>
                            {location.pathname !== '/login' && (
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-[var(--color-primary-blue)] font-bold"
                                >
                                    Sign In
                                </button>
                            )}

                            {location.pathname !== '/register' && (
                                <button
                                    onClick={() => navigate('/register')}
                                    className="bg-gradient-auth text-white px-6 py-2.5 rounded-full font-bold"
                                >
                                    Get Started
                                </button>
                            )}
                        </>

                    )}

                </div>

                {/* Mobile menu button */}
                <button
                    className="lg:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>

            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white p-6 mt-4 rounded-xl shadow-xl">

                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => {
                                navigate(link.href);
                                setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left py-3 font-semibold"
                        >
                            {link.label}
                        </button>
                    ))}

                </div>
            )}

        </nav>
    );
};

export default Navbar;