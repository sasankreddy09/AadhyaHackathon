import { useNavigate } from 'react-router-dom';
import { FileText, Mic, ArrowRight, ShieldPlus } from 'lucide-react';

const Triage = () => {
    const navigate = useNavigate();

    const options = [
        {
            icon: <FileText className="w-14 h-14 text-[var(--color-primary-blue)]" />,
            title: 'Submit via Form',
            description: 'Fill out a structured health questionnaire with your symptoms, duration, and severity. Best for detailed and accurate reporting.',
            badge: 'Recommended',
            badgeColor: 'bg-blue-100 text-blue-700',
            path: '/triage/form',
            gradient: 'from-blue-50 to-blue-100/40',
            border: 'border-blue-200',
            btnColor: 'bg-[var(--color-primary-blue)] hover:bg-blue-700',
        },
        {
            icon: <Mic className="w-14 h-14 text-[var(--color-teal-accent)]" />,
            title: 'Submit via Speech',
            description: 'Simply speak your symptoms aloud and our AI will transcribe and analyze them automatically. Best for quick and hands-free reporting.',
            badge: 'AI-Powered',
            badgeColor: 'bg-teal-100 text-teal-700',
            path: '/triage/speech',
            gradient: 'from-teal-50 to-teal-100/40',
            border: 'border-teal-200',
            btnColor: 'bg-[var(--color-teal-accent)] hover:bg-teal-600',
        },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-bg-base)] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Page Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
                        <ShieldPlus className="w-5 h-5 text-[var(--color-primary-blue)]" />
                        <span className="text-sm font-semibold text-[var(--color-primary-blue)] tracking-wide">AI-Based Risk Detection</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        How would you like to <span className="text-[var(--color-primary-blue)]">submit</span> your symptoms?
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Choose the method that suits you. Our AI will analyze your input and provide an instant triage report.
                    </p>
                </div>

                {/* Option Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {options.map((option) => (
                        <div
                            key={option.path}
                            className={`group relative bg-gradient-to-br ${option.gradient} border-2 ${option.border} rounded-[2.5rem] p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col`}
                        >
                            {/* Badge */}
                            <span className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${option.badgeColor}`}>
                                {option.badge}
                            </span>

                            {/* Icon */}
                            <div className="bg-white p-5 rounded-3xl shadow-md w-fit mb-8 group-hover:scale-110 transition-transform duration-300">
                                {option.icon}
                            </div>

                            {/* Text */}
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">{option.title}</h2>
                            <p className="text-gray-600 text-lg leading-relaxed flex-1 mb-8">{option.description}</p>

                            {/* CTA Button */}
                            <button
                                onClick={() => navigate(option.path)}
                                className={`w-full ${option.btnColor} text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5`}
                            >
                                Choose This Method
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Info Footer */}
                <p className="text-center text-gray-400 text-sm mt-12">
                    Your data is processed securely and never shared without your consent.
                </p>
            </div>
        </div>
    );
};

export default Triage;
