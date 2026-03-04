import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, ChevronRight, User, Phone, Stethoscope } from 'lucide-react';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fullName,
                    username,
                    phone_number: phoneNumber,
                    email,
                    address,
                    password
                }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to register account. Please check your details.');
            }

            const data = await res.json();

            // Auto login or save token after signup if backend returns one during signup
            if (data.token) {
                localStorage.setItem('arogya_token', data.token);
                navigate('/');
            } else {
                // Manually redirect to login so they can auth normally
                navigate('/login');
            }

        } catch (err: any) {
            setError(err.message || 'An network error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex text-slate-800"
            style={{ background: 'linear-gradient(135deg, #2563EB, #14B8A6)' }}
        >
            <div className="flex w-full max-w-7xl mx-auto my-4 sm:my-8 lg:my-12 bg-white/10 backdrop-blur-xl sm:rounded-[3rem] shadow-2xl overflow-hidden border border-white/20">

                {/* Left Pane - Feature Highlight (Hidden on mobile) */}
                <div className="hidden lg:flex w-5/12 relative overflow-hidden bg-slate-900 justify-center flex-col p-12">
                    {/* Image Overlay */}
                    <div
                        className="absolute inset-0 opacity-40 mix-blend-overlay"
                        style={{
                            backgroundImage: 'url("https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>

                    {/* Abstract Gradients Over Image */}
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/30 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 mix-blend-screen"></div>
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/40 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 mix-blend-screen"></div>

                    <div className="relative z-10 text-white flex flex-col h-full max-w-sm mx-auto w-full">
                        <div className="mb-auto">
                            <Link to="/" className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10 hover:bg-black/50 transition-colors">
                                <Activity className="w-5 h-5 text-teal-400" />
                                <span className="font-bold tracking-widest text-sm">AROGYA RAKSHA</span>
                            </Link>
                        </div>

                        <div className="mt-12 mb-12">
                            <h2 className="text-4xl xl:text-5xl font-extrabold mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                                Initial Triage Enrollment
                            </h2>
                            <p className="text-lg text-blue-100/90 leading-relaxed max-w-sm">
                                Register to utilize the AI Early Risk Detection Engine. Get actionable insights based on your unique symptoms before scheduling care.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="mt-1 bg-blue-500/20 p-2.5 rounded-xl border border-blue-400/30 backdrop-blur-sm">
                                    <Stethoscope className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-bold text-lg">Intelligent Risk Scoring</h3>
                                    <p className="text-blue-100/70 text-sm mt-1">Symptom metrics dictate precise risk severity ratings enabling Early Disease Detection.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="mt-1 bg-blue-500/20 p-2.5 rounded-xl border border-blue-400/30 backdrop-blur-sm">
                                    <Lock className="w-5 h-5 text-teal-400" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-bold text-lg">Fraud Protection</h3>
                                    <p className="text-blue-100/70 text-sm mt-1">Access powerful AI Digital Awareness Tools screening SMS and messaging for scams.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-12">
                            <div className="flex items-center space-x-4 opacity-70">
                                <div className="h-px bg-white/20 flex-1"></div>
                                <span className="text-xs tracking-widest uppercase font-semibold">Decentralized Registration</span>
                                <div className="h-px bg-white/20 flex-1"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Pane - Registration Form */}
                <div className="w-full lg:w-7/12 bg-white/95 backdrop-blur-3xl p-8 sm:p-14 lg:p-20 relative flex items-center">
                    {/* Background abstract elements for the light side */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[3rem]">
                        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100/50 rounded-full blur-[80px]"></div>
                        <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-teal-100/50 rounded-full blur-[80px]"></div>
                    </div>

                    <div className="w-full max-w-xl">
                        <div className="mb-10 text-center lg:text-left">
                            <div className="lg:hidden inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-teal-50 border border-teal-100 mb-6 shadow-sm">
                                <Activity className="w-7 h-7 text-teal-600" />
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Register Entity</h1>
                            <p className="text-slate-500 font-medium text-lg">Verify your details below to activate your health center.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div className="bg-white lg:bg-transparent p-6 lg:p-0 rounded-[2rem] lg:rounded-none shadow-xl shadow-slate-200/50 lg:shadow-none border border-slate-200/60 lg:border-none">
                            <form onSubmit={handleRegister} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all hover:border-slate-300 text-base"
                                                placeholder="John Doe"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all hover:border-slate-300 text-base"
                                                placeholder="johndoe123"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                                <Phone className="h-5 w-5" />
                                            </div>
                                            <input
                                                type="tel"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all hover:border-slate-300 text-base"
                                                placeholder="+1 (555) 000-0000"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                                <Mail className="h-5 w-5" />
                                            </div>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all hover:border-slate-300 text-base"
                                                placeholder="patient@example.com"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Physical Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-start pt-4 pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                        <textarea
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all hover:border-slate-300 text-base min-h-[100px] resize-y"
                                            placeholder="123 Care Avenue, Suite 100"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Secure Password</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all hover:border-slate-300 text-base"
                                            placeholder="••••••••"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-slate-900 hover:bg-blue-700 text-white font-bold text-lg py-4 px-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/30 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center mt-6"
                                    >
                                        {isLoading ? 'Processing...' : 'Verify & Join Network'}
                                        {!isLoading && <ChevronRight className="ml-1 w-5 h-5" />}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="mt-8 flex items-center justify-center text-slate-600 font-medium">
                            <span className="mr-2">Already have an account?</span>
                            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-extrabold transition-colors">
                                Sign In Here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
