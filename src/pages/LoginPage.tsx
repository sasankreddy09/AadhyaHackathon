import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, ChevronRight, Stethoscope } from 'lucide-react';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:8000/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to authenticate. Please verify your credentials.');
            }

            const data = await res.json();
            if (data.token) {
                localStorage.setItem('arogya_token', data.token);
                navigate('/');
            } else {
                throw new Error('Authentication resolved but validation token missing.');
            }

        } catch (err: any) {
            setError(err.message || 'An unexpected network issue occurred. Please try again.');
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
                            backgroundImage: 'url("https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2000&auto=format&fit=crop")',
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
                                Accessing Triage Insights
                            </h2>
                            <p className="text-lg text-blue-100/90 leading-relaxed max-w-sm">
                                Securely log in to the Arogya Raksha platform to review triage guidance algorithms and historical patient interactions.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="mt-1 bg-blue-500/20 p-2.5 rounded-xl border border-blue-400/30 backdrop-blur-sm">
                                    <Stethoscope className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-bold text-lg">Historical Assessments</h3>
                                    <p className="text-blue-100/70 text-sm mt-1">Review AI pre-screening symptom classifications mapped to patient histories.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="mt-1 bg-blue-500/20 p-2.5 rounded-xl border border-blue-400/30 backdrop-blur-sm">
                                    <Lock className="w-5 h-5 text-teal-400" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-bold text-lg">Fraud & Awareness Alerts</h3>
                                    <p className="text-blue-100/70 text-sm mt-1">Directly view "High Risk" scam alerts for immediate intervention and education.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-12">
                            <div className="flex items-center space-x-4 opacity-70">
                                <div className="h-px bg-white/20 flex-1"></div>
                                <span className="text-xs tracking-widest uppercase font-semibold">Triage & Security Engine</span>
                                <div className="h-px bg-white/20 flex-1"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Pane - Login Form */}
                <div className="w-full lg:w-7/12 bg-white/95 backdrop-blur-3xl p-8 sm:p-14 lg:p-20 relative flex items-center">
                    {/* Background abstract elements for the light side */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[3rem]">
                        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100/50 rounded-full blur-[80px]"></div>
                        <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-teal-100/50 rounded-full blur-[80px]"></div>
                    </div>

                    <div className="w-full max-w-md mx-auto relative z-10">
                        <div className="mb-10 text-center lg:text-left">
                            <div className="lg:hidden inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-blue-50 border border-blue-100 mb-6 shadow-sm">
                                <Activity className="w-7 h-7 text-blue-600" />
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Provider Portal</h1>
                            <p className="text-slate-500 font-medium text-lg">Connect to your entity workspace.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div className="bg-white lg:bg-transparent p-6 lg:p-0 rounded-[2rem] lg:rounded-none shadow-xl shadow-slate-200/50 lg:shadow-none border border-slate-200/60 lg:border-none">
                            <form onSubmit={handleLogin} className="space-y-6">
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
                                            placeholder="provider@clinic.com"
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

                                <div className="flex items-center justify-between px-1 pt-1">
                                    <label className="flex items-center space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" className="peer sr-only" disabled={isLoading} />
                                            <div className="w-5 h-5 border-2 border-slate-300 rounded bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all peer-focus:ring-4 peer-focus:ring-blue-600/20"></div>
                                            <svg className="absolute w-3.5 h-3.5 inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Remember device</span>
                                    </label>
                                    <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">Recover Access</a>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-slate-900 hover:bg-blue-700 text-white font-bold text-lg py-4 px-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/30 active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center mt-6"
                                    >
                                        {isLoading ? 'Processing...' : 'Authorize Login'}
                                        {!isLoading && <ChevronRight className="ml-1 w-5 h-5" />}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="mt-8 flex items-center justify-center text-slate-600 font-medium">
                            <span className="mr-2">New healthcare entity?</span>
                            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-extrabold transition-colors">
                                Request Verification
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
