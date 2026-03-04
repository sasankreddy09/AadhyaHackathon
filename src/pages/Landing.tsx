import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Activity, HeartPulse, ShieldPlus, FileText, AlertTriangle,
    Stethoscope, ChevronRight, CheckCircle2, ChevronDown, Check,
    MessageSquare, Smartphone, Heart, ArrowRight
} from 'lucide-react';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-2xl mb-4 overflow-hidden bg-white hover:border-[var(--color-primary-blue)] transition-colors">
            <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-lg text-gray-800">{question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'pb-5 max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-base)] font-sans">

            {/* 1. Hero Section */}
            <section className="relative pt-28 pb-32 overflow-hidden bg-gradient-soft flex flex-col items-center justify-center min-h-[90vh]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=2600&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md mb-8 border border-white/30">
                        <Activity className="w-5 h-5 text-teal-200" />
                        <span className="text-sm font-medium tracking-wide text-teal-50">Introducing Arogya Raksha v2.0</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 drop-shadow-lg leading-tight">
                        AI-Based Early Health<br className="hidden md:block" /> Risk Detection for Everyone
                    </h1>
                    <p className="mt-4 max-w-2xl text-xl md:text-2xl text-white/90 mx-auto font-light leading-relaxed mb-12 drop-shadow-md">
                        Helping rural communities detect health risks early through intelligent symptom analysis and smart triage.
                    </p>
                    <div className="flex justify-center gap-6 flex-wrap">
                        <button
                            onClick={() => navigate('/register')}
                            className="px-8 py-4 text-lg font-bold rounded-full bg-white text-[var(--color-primary-blue)] hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2"
                        >
                            Get Started <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => navigate('/triage')}
                            className="px-8 py-4 text-lg font-bold rounded-full bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all"
                        >
                            Check Symptoms
                        </button>
                    </div>
                </div>

                {/* Marquee Animation */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-black/20 backdrop-blur-sm border-t border-white/10 py-4">
                    <div className="flex whitespace-nowrap animate-marquee w-[200%] gap-16 px-8 items-center">
                        {[
                            "AI Symptom Analysis", "Early Disease Detection", "Smart Health Triage",
                            "Healthcare Access for Rural Communities", "Preventive Health Monitoring",
                            "AI Symptom Analysis", "Early Disease Detection", "Smart Health Triage"
                        ].map((text, i) => (
                            <span key={i} className="text-white/80 font-medium text-lg flex items-center gap-2">
                                <HeartPulse className="w-5 h-5 text-teal-400" />
                                {text}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. Symptom-Based Risk Detection (Features) */}
            <section id="features" className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-6">
                                Symptom-Based <span className="text-[var(--color-primary-blue)]">Risk Detection</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Our advanced AI understands your symptoms and calculates potential health risks, empowering you to make informed medical decisions before issues escalate.
                            </p>

                            <ul className="space-y-6 mb-10 text-gray-700">
                                {[
                                    "Symptom-based input system via text or voice",
                                    "Multi-symptom prediction logic engine",
                                    "Dynamic Risk scoring system (0–100)",
                                    "Instant classification: Low, Moderate, High, Critical"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle2 className="flex-shrink-0 h-6 w-6 text-[var(--color-health-green)] mr-3" />
                                        <span className="text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mock Triage Report Card UI */}
                        <div className="mt-12 lg:mt-0">
                            <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden transform transition-all hover:-translate-y-2 duration-500">
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white flex justify-between items-center">
                                    <h3 className="font-bold text-xl flex items-center gap-2">
                                        <AlertTriangle className="w-6 h-6" /> Triage Report Card
                                    </h3>
                                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-medium">Generated just now</span>
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-end border-b border-gray-100 pb-6 mb-6">
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium mb-1">Risk Score</p>
                                            <div className="text-5xl font-black text-red-500">78<span className="text-2xl text-gray-400 font-medium">/100</span></div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 font-medium mb-1">Risk Level</p>
                                            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-red-700 bg-red-100 font-bold text-lg">
                                                High Risk
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-sm text-gray-500 font-medium mb-3">Symptoms Detected</p>
                                        <div className="flex gap-2 flex-wrap">
                                            {["Severe Chest Pain", "Shortness of Breath", "Dizziness"].map(sym => (
                                                <span key={sym} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm font-medium">{sym}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
                                        <p className="text-sm text-orange-800 font-medium flex items-center gap-2 mb-2">
                                            <Stethoscope className="w-5 h-5 text-orange-600" /> Recommended Action
                                        </p>
                                        <p className="text-lg font-bold text-orange-900">Visit a hospital immediately. Do not delay.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Intelligent Triage System */}
            <section className="py-24 bg-[var(--color-bg-base)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
                            Intelligent <span className="text-[var(--color-teal-accent)]">Triage System</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Our system helps you understand exactly what to do next based on your unique risk profile.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Practice Self-Care", desc: "For low-risk, common symptoms. Rest, hydrate, and monitor.", icon: <Heart className="w-8 h-8 text-[var(--color-health-green)]" />, color: "border-green-200 bg-green-50" },
                            { title: "Consult Online", desc: "Moderate risk. Connect with a remote doctor for professional advice.", icon: <Smartphone className="w-8 h-8 text-blue-500" />, color: "border-blue-200 bg-blue-50" },
                            { title: "Visit a Hospital", desc: "High risk. Physical examination required. Visit a clinic soon.", icon: <Stethoscope className="w-8 h-8 text-orange-500" />, color: "border-orange-200 bg-orange-50" },
                            { title: "Seek Emergency", desc: "Critical risk. Call for an ambulance or rush to ER immediately.", icon: <AlertTriangle className="w-8 h-8 text-red-500" />, color: "border-red-200 bg-red-50" }
                        ].map((action, i) => (
                            <div key={i} className={`rounded-3xl border-2 ${action.color} p-8 hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center shadow-lg`}>
                                <div className="bg-white p-4 rounded-full shadow-sm mb-6">
                                    {action.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{action.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{action.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. How It Works */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900">How It Works</h2>
                        <p className="mt-4 text-xl text-gray-600">Four simple steps to better health awareness.</p>
                    </div>

                    <div className="relative">
                        {/* Connecting line (hidden on mobile) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
                            {[
                                { step: "Step 1", title: "Enter Symptoms", desc: "User enters symptoms through text or voice interface.", icon: <MessageSquare className="w-6 h-6 text-[var(--color-primary-blue)]" /> },
                                { step: "Step 2", title: "AI Analysis", desc: "Our models analyze complex symptom combinations.", icon: <Activity className="w-6 h-6 text-[var(--color-teal-accent)]" /> },
                                { step: "Step 3", title: "Risk Scoring", desc: "System calculates a detailed risk score (0–100).", icon: <FileText className="w-6 h-6 text-orange-500" /> },
                                { step: "Step 4", title: "Clear Action", desc: "User receives a clear explanation & recommended action.", icon: <Check className="w-6 h-6 text-[var(--color-health-green)]" /> }
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col items-center text-center bg-white">
                                    <div className="w-20 h-20 rounded-full bg-slate-50 border-[6px] border-white shadow-lg flex items-center justify-center mb-6 relative z-10">
                                        {s.icon}
                                    </div>
                                    <h4 className="text-[var(--color-primary-blue)] font-bold mb-2 uppercase tracking-wide text-sm">{s.step}</h4>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{s.title}</h3>
                                    <p className="text-gray-600">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Testimonials */}
            <section className="py-24 bg-[var(--color-bg-base)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16">Trusted by Rural Communities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { quote: "Arogya Raksha helped my family understand when to visit the hospital. It felt like talking to a real doctor.", name: "Ramesh P.", role: "Farmer" },
                            { quote: "The symptom checker helped us detect risks early and safely avoid an unnecessary trip to the far-away clinic.", name: "Sunita M.", role: "Teacher" },
                            { quote: "Very easy to use in our local language. It told me I needed to go to the hospital for chest pains, which saved my life.", name: "Anil K.", role: "Shop Owner" }
                        ].map((t, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-shadow relative">
                                <div className="text-[var(--color-teal-accent)] text-6xl font-serif absolute top-4 left-6 opacity-20">"</div>
                                <p className="text-gray-700 text-lg leading-relaxed relative z-10 mb-8 italic">
                                    "{t.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-xl border-2 border-white shadow-sm overflow-hidden text-center content-center">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                                        <p className="text-gray-500 text-sm">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Health Awareness */}
            <section id="awareness" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Health Awareness</h2>
                            <p className="text-xl text-gray-600">Empowering you with knowledge to prevent illness.</p>
                        </div>
                        <button className="hidden sm:flex text-[var(--color-primary-blue)] font-bold items-center gap-2 hover:text-blue-700 transition-colors">
                            View All Resources <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Importance of Early Diagnosis", img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=600&auto=format&fit=crop" },
                            { title: "Common Symptoms People Ignore", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600&auto=format&fit=crop" },
                            { title: "Preventive Healthcare Tips", img: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=600&auto=format&fit=crop" },
                            { title: "Healthy Lifestyle Awareness", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop" }
                        ].map((card, i) => (
                            <div key={i} className="group cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all relative h-80">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${card.img}')` }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <h3 className="text-white font-bold text-xl leading-tight mb-2 group-hover:text-teal-300 transition-colors">{card.title}</h3>
                                    <div className="flex items-center text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                                        Read article <ChevronRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. FAQ Section */}
            <section id="faq" className="py-24 bg-[var(--color-bg-base)]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-lg text-gray-600">Got questions? We've got answers.</p>
                    </div>

                    <div className="space-y-4">
                        <FAQItem question="What is Arogya Raksha?" answer="Arogya Raksha is a health-tech platform featuring an AI-Based Early Risk Detection & Intelligent Triage System designed to help communities identify potential health risks early based on symptom analysis." />
                        <FAQItem question="How does the symptom analysis work?" answer="You simply input your symptoms using text or voice. Our AI engine cross-references these against a vast medical database to understand potential combinations, outputting a risk score and recommended action." />
                        <FAQItem question="Is this a replacement for doctors?" answer="No. Arogya Raksha is a triage tool designed to help you determine WHEN to see a doctor and how urgently. It does not provide definitive medical diagnoses." />
                        <FAQItem question="How accurate is the risk prediction?" answer="Our models are highly accurate for general triage mapping, prioritizing safety first. If a condition could potentially be critical, the system will always err on the side of caution and recommend immediate medical attention." />
                        <FAQItem question="Does the system store my medical data?" answer="We prioritize your privacy. Temporary symptom data is processed securely, and personal health profiles are encrypted. We comply with all standard medical data privacy regulations." />
                    </div>
                </div>
            </section>

            {/* 8. Footer */}
            <footer className="bg-gray-900 text-white pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <ShieldPlus className="w-8 h-8 text-[var(--color-teal-accent)]" />
                                <span className="text-2xl font-bold tracking-tight">Arogya Raksha</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Intelligent healthcare risk detection for everyone, everywhere. Bridging the gap between symptoms and care.
                            </p>
                            <div className="flex gap-4">
                                {/* Social icons placeholders */}
                                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--color-primary-blue)] transition-colors cursor-pointer flex items-center justify-center">
                                    <span className="text-xl">𝕏</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--color-primary-blue)] transition-colors cursor-pointer flex items-center justify-center">
                                    <span className="text-xl">f</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--color-primary-blue)] transition-colors cursor-pointer flex items-center justify-center">
                                    <span className="text-xl">in</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2">Quick Links</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><a href="#" className="hover:text-[var(--color-teal-accent)] transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-[var(--color-teal-accent)] transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-[var(--color-teal-accent)] transition-colors">Health Resources</a></li>
                                <li><a href="#" className="hover:text-[var(--color-teal-accent)] transition-colors">Partner Clinics</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2">Legal</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li><a href="#" className="hover:text-[var(--color-teal-accent)] transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-[var(--color-teal-accent)] transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-[var(--color-teal-accent)] transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 flex items-center gap-2 text-red-400">
                                <AlertTriangle className="w-5 h-5 border-current" /> Emergency GUIDANCE
                            </h4>
                            <p className="text-gray-400 mb-4">
                                If you are experiencing a medical emergency, do not rely on this application.
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 font-bold rounded-xl border border-red-500/20 w-full justify-center">
                                Call Local Emergency Number
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
                        <p>&copy; {new Date().getFullYear()} Arogya Raksha. All rights reserved.</p>
                        <p className="mt-2 md:mt-0 flex items-center gap-1">
                            Made with <Heart className="w-4 h-4 text-red-500" /> by Panch Pandavlu.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
