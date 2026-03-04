import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, HeartPulse, ShieldPlus, FileText } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        phoneNumber: '',
        email: '',
        address: '',
        password: ''
    });
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

        // Mock API call
        try {
            /*
            const response = await fetch('http://localhost:8000/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            });
            if (response.ok) {
              const data = await response.json();
              localStorage.setItem('token', data.token);
              navigate('/login');
            } else {
              setError('Registration failed');
            }
            */
            setTimeout(() => {
                localStorage.setItem('token', 'mock_token');
                navigate('/login');
            }, 1000);
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            if (!window.location.pathname.includes('/login')) setLoading(false);
        }
    };

    const benefits = [
        { icon: <Activity className="w-6 h-6 text-[var(--color-teal-accent)]" />, title: "Early Health Risk Detection", desc: "Identify potential issues before they become serious." },
        { icon: <HeartPulse className="w-6 h-6 text-[var(--color-teal-accent)]" />, title: "Symptom-Based Risk Scoring", desc: "Advanced AI analysis of your reported symptoms." },
        { icon: <ShieldPlus className="w-6 h-6 text-[var(--color-teal-accent)]" />, title: "Smart Triage Recommendations", desc: "Know exactly when and where to seek medical help." },
        { icon: <FileText className="w-6 h-6 text-[var(--color-teal-accent)]" />, title: "Preventive Health Awareness", desc: "Access targeted health tips and lifestyle advice." },
    ];

    return (
        <div className="min-h-screen flex">
            {/* Left side */}
            <div className="hidden lg:flex w-5/12 bg-gradient-auth p-12 pt-28 flex-col justify-center text-white relative overflow-hidden">
                <div className="relative z-10 w-full max-w-lg mx-auto">
                    <h2 className="text-4xl font-extrabold mb-4">Join Arogya Raksha</h2>
                    <p className="text-lg text-teal-100 mb-8">Step into the future of predictive healthcare.</p>

                    <div className="space-y-6 mb-8">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="flex gap-4 items-start bg-white/10 p-5 rounded-3xl backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/15 transition-colors">
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
            <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 pt-28 overflow-y-auto bg-[var(--color-bg-base)]">
                <div className="w-full max-w-2xl space-y-8 glass-effect p-8 sm:p-12 my-8">
                    <div className="text-center">
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text-base)]">
                            Create an Account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="font-medium text-[var(--color-primary-blue)] hover:text-blue-500">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 gap-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input name="fullName" type="text" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input name="username" type="text" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]" placeholder="johndoe123" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input name="phoneNumber" type="tel" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]" placeholder="+1 234 567 8900" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input name="email" type="email" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]" placeholder="john@example.com" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input name="address" type="text" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]" placeholder="123 Main St, City, Country" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input name="password" type="password" required onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]" placeholder="••••••••" />
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-auth hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary-blue)] transition-all disabled:opacity-70 shadow-lg"
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
