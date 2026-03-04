import { useNavigate } from 'react-router-dom';
import { FileText, Mic, ArrowRight, ShieldPlus, LayoutDashboard, Activity, BrainCircuit, HeartPulse } from 'lucide-react';

const Triage = () => {
    const navigate = useNavigate();

    const options = [
        {
            icon: <FileText className="w-12 h-12 text-[var(--color-primary-blue)]" />,
            title: 'Submit via Form',
            description: 'Fill out a structured health questionnaire with your symptoms, duration, and severity. Best for detailed and accurate reporting.',
            badge: 'Recommended',
            badgeColor: 'bg-blue-100 text-blue-700',
            path: '/triage/form',
            iconBg: 'bg-blue-50 border border-blue-100',
            btnColor: 'bg-[var(--color-primary-blue)] hover:bg-blue-700',
            accentBar: 'bg-[var(--color-primary-blue)]',
            cardBg: 'bg-white hover:bg-blue-50/50',
        },
        {
            icon: <Mic className="w-12 h-12 text-[var(--color-teal-accent)]" />,
            title: 'Submit via Speech',
            description: 'Simply speak your symptoms aloud and our AI will transcribe and analyze them automatically. Best for quick and hands-free reporting.',
            badge: 'AI-Powered',
            badgeColor: 'bg-teal-100 text-teal-700',
            path: '/triage/speech',
            iconBg: 'bg-teal-50 border border-teal-100',
            btnColor: 'bg-[var(--color-teal-accent)] hover:bg-teal-600',
            accentBar: 'bg-[var(--color-teal-accent)]',
            cardBg: 'bg-white hover:bg-teal-50/50',
        },
    ];

    const stats = [
        { icon: <Activity className="w-6 h-6 text-[var(--color-primary-blue)]" />, label: 'Symptoms Analyzed', val: '1.2M+', bg: 'bg-blue-50' },
        { icon: <BrainCircuit className="w-6 h-6 text-[var(--color-teal-accent)]" />, label: 'AI Reports Today', val: '4,800+', bg: 'bg-teal-50' },
        { icon: <HeartPulse className="w-6 h-6 text-green-500" />, label: 'Accuracy Rate', val: '94.7%', bg: 'bg-green-50' },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-bg-base)] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
            {/* Subtle background gradient overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-teal-50" />

            <div className="max-w-5xl mx-auto">
                {/* Dashboard header */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white p-2.5 rounded-xl shadow border border-blue-100">
                        <LayoutDashboard className="w-6 h-6 text-[var(--color-primary-blue)]" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Health Triage • AI System</p>
                        <p className="text-xs text-gray-400">Arogya Raksha Platform — Real-time Risk Analysis</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-green-700">System Online</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-b border-gray-200 mb-8" />

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    {stats.map(s => (
                        <div key={s.label} className={`${s.bg} border border-gray-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm`}>
                            <div className="bg-white p-2 rounded-xl shadow-sm">{s.icon}</div>
                            <div>
                                <p className="text-xl font-extrabold text-gray-900 leading-none">{s.val}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section label */}
                <div className="flex items-center gap-3 mb-2">
                    <ShieldPlus className="w-5 h-5 text-[var(--color-primary-blue)]" />
                    <h1 className="text-2xl font-extrabold text-gray-900">Select Input Method</h1>
                </div>
                <p className="text-gray-500 mb-8">
                    Choose how you'd like to submit your symptoms. Our AI will analyze your input and provide an instant risk report.
                </p>

                {/* Option Cards — clean medical dashboard style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {options.map((option) => (
                        <div
                            key={option.path}
                            className={`group relative ${option.cardBg} border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer`}
                            onClick={() => navigate(option.path)}
                        >
                            {/* Top accent bar */}
                            <div className={`h-1.5 w-full ${option.accentBar}`} />

                            <div className="p-8 flex flex-col flex-1">
                                {/* Badge */}
                                <span className={`self-start px-3 py-1 rounded-full text-xs font-bold tracking-wide mb-5 ${option.badgeColor}`}>
                                    {option.badge}
                                </span>

                                {/* Icon + Title row */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`${option.iconBg} p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                        {option.icon}
                                    </div>
                                    <h2 className="text-xl font-extrabold text-gray-900">{option.title}</h2>
                                </div>

                                <p className="text-gray-500 leading-relaxed flex-1 mb-6 text-sm">{option.description}</p>

                                <button
                                    onClick={(e) => { e.stopPropagation(); navigate(option.path); }}
                                    className={`w-full ${option.btnColor} text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-base transition-all shadow-lg hover:shadow-xl`}
                                >
                                    Start Assessment
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer note */}
                <p className="text-center text-gray-400 text-sm mt-10">
                    🔒 Your health data is processed securely and never shared without your consent.
                </p>
            </div>
        </div>
    );
};

export default Triage;
