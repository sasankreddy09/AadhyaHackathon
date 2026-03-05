import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, User, Phone, Activity, ChevronRight, ShieldCheck, HeartPulse, BrainCircuit, Stethoscope, X, AlertCircle, Loader2 } from 'lucide-react';
import TriageReportCard from '../components/TriageReportCard';
import type { TriageReport } from '../components/TriageReportCard';

const KNOWN_SYMPTOMS = [
    'fever', 'cough', 'headache', 'chest pain', 'breathing difficulty',
    'vomiting', 'body pain', 'fatigue', 'dizziness', 'runny nose',
    'sore throat', 'nausea', 'chills', 'loss of taste', 'loss of smell',
    'stomach pain', 'diarrhea', 'joint pain', 'muscle pain', 'back pain',
    'blurred vision', 'skin rash', 'swelling', 'rapid heartbeat', 'confusion', 'weakness'
];

const SEVERITIES = ['Low', 'Moderate', 'Severe'];
const DURATIONS = ['Less than 1 day', '1–2 days', '3–5 days', '1 week', 'More than 1 week'];
const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];

/** Parse free text into individual symptom tags */
const parseSymptoms = (text: string): string[] => {
    if (!text.trim()) return [];
    // Split on commas, semicolons, "and", "or", or end-of-sentence periods
    const raw = text
        .replace(/\bI have\b|\bI am\b|\bI feel\b|\bsince\b.*$/gi, '')
        .split(/[,;.]+|\.|\band\b|\bor\b/gi)
        .map(s => s.trim().toLowerCase())
        .filter(s => s.length > 1);
    // Deduplicate
    return [...new Set(raw)].map(s => s.charAt(0).toUpperCase() + s.slice(1));
};

const TriageForm = () => {
    const navigate = useNavigate();
    const [symptomText, setSymptomText] = useState('');
    const [symptomTags, setSymptomTags] = useState<string[]>([]);
    const [symptomError, setSymptomError] = useState('');
    const [report, setReport] = useState<TriageReport | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [form, setForm] = useState({
        fullName: '', age: '', gender: '', phone: '',
        existingConditions: '', duration: '', severity: '',
    });

    const handleSymptomInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setSymptomText(val);
        setSymptomError('');

        // Live tag parsing only when there's a comma/period/semicolon (user is separating items)
        if (/[,;.]/.test(val)) {
            const parsed = parseSymptoms(val);
            if (parsed.length > 0) setSymptomTags(parsed);
        }
    };

    const handleSymptomBlur = () => {
        if (symptomText.trim()) {
            const parsed = parseSymptoms(symptomText);
            setSymptomTags(parsed.length > 0 ? parsed : [symptomText.trim()]);
        }
    };

    const removeTag = (tag: string) => {
        const updated = symptomTags.filter(t => t !== tag);
        setSymptomTags(updated);
        if (updated.length === 0) setSymptomError('Please enter at least one symptom.');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (symptomTags.length === 0 && !symptomText.trim()) {
            setSymptomError('Please enter at least one symptom.');
            return;
        }

        const finalSymptoms = symptomTags.length > 0 ? symptomTags : [symptomText.trim()];
        const symptomString = finalSymptoms.join(", ");

        setIsAnalyzing(true);
        try {
            const response = await fetch("https://anandanaidu-aadhya-backend.hf.space/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: symptomString
                }),
            });

            const data = await response.json();
            console.log("API Response:", data);
            setReport(data);
        } catch (error) {
            console.error("Error calling API:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const canSubmit = (symptomTags.length > 0 || symptomText.trim().length > 0) && form.severity && form.duration;

    return (
        <div className="min-h-screen relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
            {/* Background Healthcare Image with Overlay */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2560&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[var(--color-bg-base)]/90 backdrop-blur-sm" />
            </div>

            {/* Hero banner area */}
            <div className="max-w-6xl mx-auto mb-10">
                <div className="relative bg-gradient-soft rounded-[2.5rem] overflow-hidden shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 text-white">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md mb-4 border border-white/30">
                            <FileText className="w-5 h-5 text-teal-200" />
                            <span className="text-sm font-semibold text-teal-100 tracking-wide">AI-Powered Symptom Form</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">Tell us how you're feeling</h1>
                        <p className="text-white/80 text-lg mb-6">
                            Fill in your details below. Our AI will analyze your health profile and provide an early risk assessment instantly.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { icon: <ShieldCheck className="w-4 h-4" />, text: 'Secure & Private' },
                                { icon: <BrainCircuit className="w-4 h-4" />, text: 'AI Analyzed' },
                                { icon: <HeartPulse className="w-4 h-4" />, text: 'Instant Results' },
                            ].map(item => (
                                <div key={item.text} className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm font-semibold text-white border border-white/20">
                                    {item.icon} {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-shrink-0 animate-float">
                        <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop" alt="Doctor" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                <div className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">🩺 Expert AI Analysis</div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
                    <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-teal-300/10 rounded-full blur-xl" />
                </div>
            </div>

            {/* Main content: 2-column on desktop */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Sidebar */}
                <div className="hidden lg:flex flex-col gap-5">
                    <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden group">
                        <div className="relative h-44">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNOJvGQI1ee8TYGtMS0JF7kQK9nEvOtS2YBw&ssition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-blue)]/80 to-transparent" />
                            <p className="absolute bottom-3 left-4 right-4 text-white text-sm font-bold">AI-Based Risk Analysis</p>
                        </div>
                        <div className="p-5"><p className="text-gray-500 text-sm leading-relaxed">Our AI cross-references your symptoms against thousands of medical patterns to assign a precise risk score.</p></div>
                    </div>
                    <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden group">
                        <div className="relative h-40">
                            <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&auto=format&fit=crop" alt="Healthcare consultation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-teal-700/80 to-transparent" />
                            <p className="absolute bottom-3 left-4 right-4 text-white text-sm font-bold">Trusted Triage Support</p>
                        </div>
                        <div className="p-5"><p className="text-gray-500 text-sm leading-relaxed">Get professional-grade guidance from the comfort of your home or village.</p></div>
                    </div>
                    <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-5">
                        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Stethoscope className="w-5 h-5 text-[var(--color-teal-accent)]" /> Platform Stats
                        </h4>
                        {[
                            { label: 'Symptoms Analyzed', value: '1.2M+' },
                            { label: 'Risk Reports Generated', value: '340K+' },
                            { label: 'Accuracy Rate', value: '94.7%' },
                        ].map(stat => (
                            <div key={stat.label} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                                <span className="text-gray-500 text-sm">{stat.label}</span>
                                <span className="font-extrabold text-[var(--color-primary-blue)] text-lg">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-7">
                        {/* Personal Information */}
                        <div className="bg-white border border-gray-100 rounded-[2rem] shadow-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-blue-50 p-3 rounded-2xl"><User className="w-6 h-6 text-[var(--color-primary-blue)]" /></div>
                                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
                                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="e.g. Ramesh Kumar"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary-blue)] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-gray-50 text-gray-900 font-medium" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Age</label>
                                    <input type="number" name="age" value={form.age} onChange={handleChange} required min="1" max="120" placeholder="e.g. 35"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary-blue)] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-gray-50 text-gray-900 font-medium" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Gender</label>
                                    <select name="gender" value={form.gender} onChange={handleChange} required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary-blue)] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-gray-50 text-gray-900 font-medium">
                                        <option value="">Select gender</option>
                                        {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Phone Number</label>
                                    <div className="flex">
                                        <div className="flex items-center px-4 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl"><Phone className="w-4 h-4 text-gray-400" /></div>
                                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 9876543210"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-r-xl focus:border-[var(--color-primary-blue)] focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-gray-50 text-gray-900 font-medium" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Health Information */}
                        <div className="bg-white border border-gray-100 rounded-[2rem] shadow-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-teal-50 p-3 rounded-2xl"><Activity className="w-6 h-6 text-[var(--color-teal-accent)]" /></div>
                                <h2 className="text-xl font-bold text-gray-800">Health Information</h2>
                            </div>
                            <div className="space-y-6">
                                {/* Existing Conditions */}
                                

                                {/* ── FREE-TEXT SYMPTOM INPUT ── */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                                        Current Symptoms <span className="text-red-400">*</span>
                                    </label>

                                    {/* Textarea */}
                                    <div className={`relative rounded-2xl border-2 transition-all ${symptomError ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus-within:border-[var(--color-primary-blue)] focus-within:ring-2 focus-within:ring-blue-100'}`}>
                                        <textarea
                                            value={symptomText}
                                            onChange={handleSymptomInput}
                                            onBlur={handleSymptomBlur}
                                            rows={4}
                                            placeholder="Describe your symptoms (e.g., fever, cough, headache, dizziness)&#10;&#10;You can also type naturally: &quot;I have had fever and body pain for two days.&quot;"
                                            className="w-full px-5 py-4 bg-transparent outline-none text-gray-900 font-medium resize-none text-base leading-relaxed rounded-2xl"
                                            style={{ minHeight: '120px' }}
                                        />
                                        <div className="absolute bottom-3 right-4 text-xs text-gray-400">
                                            Comma-separated or natural language
                                        </div>
                                    </div>

                                    {/* Error */}
                                    {symptomError && (
                                        <div className="flex items-center gap-2 mt-2 text-red-500 text-sm font-medium">
                                            <AlertCircle className="w-4 h-4" /> {symptomError}
                                        </div>
                                    )}

                                    {/* Live Tag Display */}
                                    {symptomTags.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Detected Symptoms</p>
                                            <div className="flex flex-wrap gap-2">
                                                {symptomTags.map(tag => {
                                                    const isKnown = KNOWN_SYMPTOMS.includes(tag.toLowerCase());
                                                    return (
                                                        <span key={tag}
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${isKnown
                                                                ? 'bg-[var(--color-primary-blue)] text-white shadow-md'
                                                                : 'bg-blue-100 text-blue-700 border border-blue-200'
                                                                }`}>
                                                            {tag}
                                                            <button type="button" onClick={() => removeTag(tag)}
                                                                className="ml-0.5 hover:opacity-70 transition-opacity">
                                                                <X className="w-3.5 h-3.5" />
                                                            </button>
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">
                                                ✓ {symptomTags.length} symptom{symptomTags.length !== 1 ? 's' : ''} detected — click × to remove any
                                            </p>
                                        </div>
                                    )}

                                    {/* Helper hint */}
                                    <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                                        <p className="text-xs text-blue-600 font-medium">
                                            💡 <strong>Tip:</strong> Separate symptoms with commas for best results, or describe them naturally. Tags appear automatically as you type.
                                        </p>
                                    </div>
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                                        Duration of Symptoms <span className="text-red-400">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {DURATIONS.map(d => (
                                            <button key={d} type="button" onClick={() => setForm(prev => ({ ...prev, duration: d }))}
                                                className={`px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${form.duration === d
                                                    ? 'bg-teal-500 text-white border-teal-500 shadow-md'
                                                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-teal-300 hover:bg-teal-50'
                                                    }`}>
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Severity */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                                        Severity Level <span className="text-red-400">*</span>
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {SEVERITIES.map((s, i) => {
                                            const active = form.severity === s;
                                            return (
                                                <button key={s} type="button" onClick={() => setForm(prev => ({ ...prev, severity: s }))}
                                                    className={`py-3 rounded-2xl font-bold text-sm border-2 transition-all ${active
                                                        ? i === 0 ? 'bg-green-500 text-white border-green-500 shadow-lg scale-105'
                                                            : i === 1 ? 'bg-yellow-400 text-white border-yellow-400 shadow-lg scale-105'
                                                                : 'bg-red-500 text-white border-red-500 shadow-lg scale-105'
                                                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                                        }`}>
                                                    {s}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!canSubmit || isAnalyzing}
                            className="w-full py-5 bg-gradient-soft text-white text-xl font-extrabold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 relative overflow-hidden"
                        >
                            {isAnalyzing ? (
                                <>
                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Analyzing Risk...
                                </>
                            ) : (
                                <>
                                    Analyze Risk
                                    <ChevronRight className="w-6 h-6" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <button onClick={() => navigate('/triage')} className="text-gray-400 hover:text-gray-600 text-sm font-medium flex items-center gap-1 mx-auto transition-colors">
                            ← Back to options
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Triage Report Card Modal ── */}
            {report && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/40 backdrop-blur-sm">
                    <TriageReportCard
                        report={report}
                        generatedAt={new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        onClose={() => setReport(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default TriageForm;
