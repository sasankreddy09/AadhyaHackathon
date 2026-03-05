
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Eye, EyeOff } from "lucide-react";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setLoading(true);
        setError('');

        try {

            const response = await fetch("https://anandanaidu-aadhya-backend.hf.space/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {

                // Save JWT token
                localStorage.setItem("token", data.access_token);

                // Optional user name
                localStorage.setItem("user", data.name);

                navigate("/triage");

            } else {
              setError('Invalid credentials');
            }
            
            setTimeout(() => {
                localStorage.setItem('token', 'mock_token');
                navigate('/triage');
            }, 1000);
        } catch (err) {

            setError("Unable to connect to server");

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="min-h-screen flex">
            {/* Left side (hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-gradient-auth p-12 pt-32 items-center justify-center text-white relative overflow-hidden">
                <div className="relative z-10 max-w-lg w-full">

                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Access Intelligent Health Risk Insights
                    </h1>

                    <p className="text-xl text-white/90">
                        Arogya Raksha's AI-Based Early Risk Detection & Intelligent Triage System.
                    </p>

                    <div className="mt-10 bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl">

                        <div className="flex items-center gap-4 mb-5">

                            <div className="bg-white p-3 rounded-2xl shadow-sm">
                                <Stethoscope className="w-8 h-8 text-[var(--color-primary-blue)]" />
                            </div>

                            <div>
                                <h3 className="font-bold text-xl text-white">
                                    AI Symptom Analysis
                                </h3>

                                <p className="text-teal-100 font-medium">
                                    Instant multi-symptom risk prediction
                                </p>
                            </div>

                        </div>

                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-inner group">

                            <img
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
                                alt="Medical Data Analysis"
                                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-blue)]/80 to-transparent"></div>

                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-sm text-center text-white font-medium drop-shadow-md">
                                    "Empowering rural communities with proactive and accessible health intelligence."
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?q=80&w=2669&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>

            </div>

            {/* Right side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 pt-32 bg-[var(--color-bg-base)]">
                <div className="w-full max-w-md space-y-8 glass-effect p-8 sm:p-10">

                    <div className="text-center">

                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-[var(--color-text-base)]">
                            Welcome back
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Don't have an account?{" "}
                            <a
                                href="/register"
                                className="font-medium text-[var(--color-primary-blue)] hover:text-blue-500"
                            >
                                Sign up
                            </a>
                        </p>

                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
                            {error}
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                        <div className="space-y-4">

                            {/* Email Field */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    required
                                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>

                            {/* Password Field */}
                            <div className="relative">

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="appearance-none relative block w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>

                            </div>

                        </div>

                        <div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-gradient-auth hover:opacity-90 transition-all disabled:opacity-70 shadow-lg"
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default Login;

