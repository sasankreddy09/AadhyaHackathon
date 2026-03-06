
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, HeartPulse, ShieldPlus, FileText, Eye, EyeOff } from 'lucide-react';

const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setLoading(true);
        setError('');

        try {

            const response = await fetch('https://anandanaidu-aadhya-backend.hf.space/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem('token', data.access_token);
                localStorage.setItem('user', formData.name);
                localStorage.setItem('user_email', formData.email);
                localStorage.setItem('email', formData.email);
                if (data.user_id) {
                    localStorage.setItem('user_id', data.user_id);
                }

                navigate('/login');

            } else {

                setError(data.detail || 'Registration failed');

            }

        } catch (err) {

            setError('An error occurred. Please try again.');

        } finally {

            setLoading(false);

        }

    };

    const benefits = [
        {
            icon: <Activity className="w-6 h-6 text-[var(--color-teal-accent)]" />,
            title: "Early Health Risk Detection",
            desc: "Identify potential issues before they become serious."
        },
        {
            icon: <HeartPulse className="w-6 h-6 text-[var(--color-teal-accent)]" />,
            title: "Symptom-Based Risk Scoring",
            desc: "Advanced AI analysis of your reported symptoms."
        },
        {
            icon: <ShieldPlus className="w-6 h-6 text-[var(--color-teal-accent)]" />,
            title: "Smart Triage Recommendations",
            desc: "Know exactly when and where to seek medical help."
        },
        {
            icon: <FileText className="w-6 h-6 text-[var(--color-teal-accent)]" />,
            title: "Preventive Health Awareness",
            desc: "Access targeted health tips and lifestyle advice."
        }
    ];

    return (
        <div className="min-h-screen flex">

            {/* Left side */}
            <div className="hidden lg:flex w-5/12 bg-gradient-auth p-12 pt-32 flex-col justify-center text-white relative overflow-hidden">
                <div className="relative z-10 w-full max-w-lg mx-auto">

                    <h2 className="text-4xl font-extrabold mb-4">
                        Join Arogya Raksha
                    </h2>

                    <p className="text-lg text-teal-100 mb-8">
                        Step into the future of predictive healthcare.
                    </p>

                    <div className="space-y-6 mb-8">

                        {benefits.map((benefit, i) => (

                            <div
                                key={i}
                                className="flex gap-4 items-start bg-white/10 p-5 rounded-3xl backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/15 transition-colors"
                            >

                                <div className="bg-white p-3 rounded-2xl shadow-sm">
                                    {benefit.icon}
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">{benefit.title}</h3>
                                    <p className="text-white/80 mt-1 text-sm">{benefit.desc}</p>
                                </div>

                            </div>

                        ))}

                    </div>

                    <div className="mt-4 rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative group">

                        <img
                            src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1200&auto=format&fit=crop"
                            alt="Medical care illustration"
                            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/40 to-transparent flex flex-col justify-end p-6">

                            <p className="text-white font-bold text-xl leading-snug drop-shadow-md">
                                Join thousands taking control of their health with predictive AI triage.
                            </p>

                        </div>

                    </div>

                </div>

                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532938911079-1b06ac7cebf7?q=80&w=2670&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>

            </div>


            {/* Right side */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 pt-32 overflow-y-auto bg-[var(--color-bg-base)]">
                <div className="w-full max-w-2xl space-y-8 glass-effect p-8 sm:p-12 my-8">
                    <div className="text-center">

                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-base)]">
                            Create an Account
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="font-medium text-[var(--color-primary-blue)] hover:text-blue-500"
                            >
                                Sign in
                            </a>
                        </p>

                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <form className="mt-8" onSubmit={handleSubmit}>

                        <div className="space-y-5">

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>

                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]"
                                    placeholder="John Doe"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>

                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]"
                                    placeholder="john@example.com"
                                />

                            </div>

                            <div className="relative">

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>

                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]"
                                    placeholder="••••••••"
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

                        <div className="mt-8">

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white bg-gradient-auth hover:opacity-90 transition-all disabled:opacity-70 shadow-lg"
                            >
                                {loading ? 'Creating account...' : 'Create Account'}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default Register;

