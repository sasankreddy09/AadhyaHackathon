import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, ChevronRight, Activity, RefreshCw, BrainCircuit, Loader2 } from 'lucide-react';
import TriageReportCard from '../components/TriageReportCard';
import type { TriageReport } from '../components/TriageReportCard';

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

const SYMPTOM_KEYWORDS = [
    'fever', 'cough', 'chest pain', 'headache', 'breathing difficulty',
    'vomiting', 'body pain', 'dizziness', 'fatigue', 'runny nose', 'sore throat', 'cold'
];

const SoundWaves = ({ active }: { active: boolean }) => (
    <div className={`flex items-end gap-1.5 h-16 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-30'}`}>
        {[
            { cls: 'animate-wave-1', w: 'w-2', h: 'h-2', color: 'bg-teal-400' },
            { cls: 'animate-wave-2', w: 'w-2', h: 'h-4', color: 'bg-teal-500' },
            { cls: 'animate-wave-3', w: 'w-2', h: 'h-8', color: 'bg-[var(--color-primary-blue)]' },
            { cls: 'animate-wave-4', w: 'w-2', h: 'h-5', color: 'bg-teal-500' },
            { cls: 'animate-wave-5', w: 'w-2', h: 'h-3', color: 'bg-teal-400' },
            { cls: 'animate-wave-1', w: 'w-2', h: 'h-6', color: 'bg-[var(--color-primary-blue)]' },
            { cls: 'animate-wave-3', w: 'w-2', h: 'h-9', color: 'bg-teal-500' },
            { cls: 'animate-wave-2', w: 'w-2', h: 'h-4', color: 'bg-teal-400' },
            { cls: 'animate-wave-4', w: 'w-2', h: 'h-7', color: 'bg-[var(--color-primary-blue)]' },
            { cls: 'animate-wave-5', w: 'w-2', h: 'h-3', color: 'bg-teal-400' },
            { cls: 'animate-wave-1', w: 'w-2', h: 'h-5', color: 'bg-teal-500' },
            { cls: 'animate-wave-2', w: 'w-2', h: 'h-8', color: 'bg-[var(--color-primary-blue)]' },
        ].map((bar, i) => (
            <div
                key={i}
                className={`${bar.w} ${active ? bar.cls : ''} ${bar.color} rounded-full transition-all duration-150`}
                style={{ height: active ? undefined : '8px' }}
            />
        ))}
    </div>
);

const LANGUAGES = [
    { code: 'en-IN', label: 'English' },
    { code: 'hi-IN', label: 'Hindi' },
    { code: 'te-IN', label: 'Telugu' },
    { code: 'ta-IN', label: 'Tamil' },
];

const translateJsonValues = async (obj: any, targetLangCode: string): Promise<any> => {
    if (typeof obj === 'string') {
        try {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLangCode}&dt=t&q=${encodeURIComponent(obj)}`;
            const res = await fetch(url);
            const data = await res.json();
            return data[0].map((item: any) => item[0]).join('');
        } catch (e) {
            console.error("Translation error", e);
            return obj;
        }
    } else if (Array.isArray(obj)) {
        const promises = obj.map(item => translateJsonValues(item, targetLangCode));
        return Promise.all(promises);
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj: any = {};
        const keys = Object.keys(obj);
        const promises = keys.map(async (key) => {
            if (key === 'classification' || key === 'risk_score' || key === 'confidence') {
                newObj[key] = obj[key];
            } else {
                newObj[key] = await translateJsonValues(obj[key], targetLangCode);
            }
        });
        await Promise.all(promises);
        return newObj;
    }
    return obj;
};

const TriageSpeech = () => {
    const navigate = useNavigate();
    const [isListening, setIsListening] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);
    const [language, setLanguage] = useState('en-IN');
    const [transcript, setTranscript] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [translationError, setTranslationError] = useState(false);
    const [report, setReport] = useState<TriageReport | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const transcriptRef = useRef('');

    // Mock speech recognition setup
    const [detectedSymptoms, setDetectedSymptoms] = useState<string[]>([]);
    const recognitionRef = useRef<{
        start: () => void; stop: () => void;
        onresult: ((e: SpeechRecognitionEvent) => void) | null;
    } | null>(null);

    useEffect(() => {
        const SpeechRecognition =
            (window as unknown as { webkitSpeechRecognition?: new () => unknown }).webkitSpeechRecognition ||
            (window as unknown as { SpeechRecognition?: new () => unknown }).SpeechRecognition;
        if (SpeechRecognition) {
            const r = new SpeechRecognition() as {
                continuous: boolean;
                interimResults: boolean;
                lang: string;
                start: () => void;
                stop: () => void;
                onresult: ((e: SpeechRecognitionEvent) => void) | null;
                onend: (() => void) | null;
            };

            r.continuous = true;
            r.interimResults = true;
            r.lang = language;

            /* IMPORTANT: trigger translation after speech recognition fully stops */
            r.onend = () => {
                const finalText = transcriptRef.current;

                if (finalText.trim()) {
                    translateToEnglish(finalText);
                }
            };

            recognitionRef.current = r;
        }
        return () => recognitionRef.current?.stop();
    }, [language]);

    // Translate text to English using LibreTranslate API
    const translateToEnglish = async (text: string) => {
        if (!text.trim() || language.startsWith('en')) {
            setTranslatedText(text);
            detectSymptoms(text);
            return;
        }

        setIsTranslating(true);
        setTranslationError(false);

        try {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${language.split('-')[0]}&tl=en&dt=t&q=${encodeURIComponent(text)}`;

            const res = await fetch(url);
            const data = await res.json();

            const translated = data[0].map((item: any) => item[0]).join('');

            setTranslatedText(translated);
            detectSymptoms(translated);

        } catch (err) {
            console.error(err);

            setTranslationError(true);
            setTranslatedText(text);
            detectSymptoms(text);
        } finally {
            setIsTranslating(false);
        }
    };

    const detectSymptoms = (text: string) => {
        const lower = text.toLowerCase();
        const found = SYMPTOM_KEYWORDS.filter(k => lower.includes(k));
        setDetectedSymptoms([...new Set(found.map(s => s.charAt(0).toUpperCase() + s.slice(1)))]);
    };

    const startListening = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition requires Google Chrome.');
            return;
        }
        setIsListening(true);
        recognitionRef.current.onresult = (e: SpeechRecognitionEvent) => {
            let final = '';
            for (let i = e.resultIndex; i < e.results.length; i++) {
                if (e.results[i].isFinal) {
                    final += e.results[i][0].transcript;
                }
            }
            const combined = final.trim();
            if (combined) {
                setTranscript(prev => {
                    const updated = (prev + ' ' + combined).trim();
                    transcriptRef.current = updated;   // IMPORTANT
                    return updated;
                });
            }
        };
        recognitionRef.current.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognitionRef.current?.stop();
    };

    const toggleListening = () => {
        if (isListening) stopListening();
        else startListening();
    };

    const handleAnalyze = async () => {
        const textToUse = translatedText || transcript;
        if (!textToUse.trim()) return;

        setIsAnalyzing(true);
        try {
            const response = await fetch("https://anandanaidu-aadhya-backend.hf.space/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: textToUse
                })
            });

            if (!response.ok) {
                throw new Error("API request failed");
            }

            const data = await response.json();

            let finalReport = data;

            if (language !== "en-IN") {
                const targetLangCode = language.split('-')[0];
                finalReport = await translateJsonValues(data, targetLangCode);
            }

            setReport(finalReport);
        } catch (err) {
            console.error("Error analyzing symptoms:", err);
            alert("Unable to analyze symptoms right now.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const reset = () => {
        stopListening();
        setTranscript('');
        setTranslatedText('');
        setTranslationError(false);
        setDetectedSymptoms([]);
        setReport(null); // Also reset report when resetting
    };

    return (
        <div className="relative min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Soft Gradient Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-soft" />

            {/* Background Healthcare Image */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=2560&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover opacity-10 blur-sm"
                />
            </div>

            {/* Decorative blobs */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl -z-10" />
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-5">
                        <Mic className="w-5 h-5 text-teal-200" />
                        <span className="text-sm font-semibold text-teal-100 tracking-wide">AI Voice Analysis</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-white mb-3 drop-shadow-lg">Speak your symptoms</h1>
                    <p className="text-lg text-white/80">Tap the mic and speak naturally. Our AI listens and detects your symptoms in real time.</p>
                </div>

                {/* Glassmorphism wrapper for content */}
                <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 p-6 sm:p-8">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left: Mic + Visualization */}
                        <div className="flex flex-col gap-6">
                            {/* Mic Card */}
                            <div className={`bg-blue-50/80 backdrop-blur-xl border-2 rounded-[2rem] shadow-xl p-8 flex flex-col items-center transition-all duration-500 ${isListening ? 'border-teal-400 shadow-teal-300/30 shadow-2xl' : 'border-blue-100'}`}>
                                {/* Status label & Language Select */}
                                <div className="flex flex-col items-center gap-3 mb-6 w-full">
                                    <div className={`text-sm font-bold px-4 py-1.5 rounded-full transition-all ${isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                                        {isListening ? '🔴 Recording — speak now' : 'Ready to listen'}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Language:</label>
                                        <select
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            disabled={isListening}
                                            className="bg-white border border-gray-200 text-sm font-bold text-gray-700 py-1.5 px-3 rounded-lg focus:ring-2 focus:ring-teal-200 focus:border-teal-400 outline-none disabled:opacity-50"
                                        >
                                            {LANGUAGES.map(l => (
                                                <option key={l.code} value={l.code}>{l.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Mic button with pulsing rings and glow */}
                                <div className="relative flex items-center justify-center mb-6">
                                    {isListening && (
                                        <>
                                            <span className="absolute inline-flex h-40 w-40 rounded-full bg-teal-300/20 animate-ping" />
                                            <span className="absolute inline-flex h-32 w-32 rounded-full bg-teal-400/20 animate-ping [animation-delay:0.3s]" />
                                        </>
                                    )}
                                    <button
                                        onClick={toggleListening}
                                        className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isListening
                                            ? 'bg-red-500 scale-110 animate-mic-glow'
                                            : 'bg-gradient-auth hover:scale-105 hover:shadow-teal-300/50'
                                            }`}
                                    >
                                        {isListening
                                            ? <MicOff className="w-12 h-12 text-white" />
                                            : <Mic className="w-12 h-12 text-white" />
                                        }
                                    </button>
                                </div>

                                {/* Sound wave bars */}
                                <SoundWaves active={isListening} />

                                <p className="text-sm text-gray-400 mt-4 text-center">
                                    {isListening
                                        ? 'Listening… tap mic to stop'
                                        : 'Example: "I have fever and headache since two days"'
                                    }
                                </p>
                            </div>

                            {/* Original Transcript */}
                            <div className="bg-teal-50/80 backdrop-blur-xl border border-teal-100 rounded-[2rem] shadow-lg p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <Mic className="w-4 h-4 text-[var(--color-primary-blue)]" />
                                        Your Speech {language !== 'en-IN' && `(${LANGUAGES.find(l => l.code === language)?.label})`}
                                    </label>
                                    {(transcript || translatedText) && (
                                        <button onClick={reset} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 font-medium transition-colors">
                                            <RefreshCw className="w-3 h-3" /> Reset
                                        </button>
                                    )}
                                </div>
                                <textarea
                                    value={transcript}
                                    onChange={(e) => setTranscript(e.target.value)}
                                    rows={3}
                                    placeholder="Your speech will appear here…"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--color-teal-accent)] focus:ring-2 focus:ring-teal-100 outline-none transition-all bg-gray-50 text-gray-900 font-medium resize-none text-base"
                                />
                            </div>

                            {/* Translated English Transcript */}
                            <div className="bg-blue-50/80 backdrop-blur-xl border border-blue-100 rounded-[2rem] shadow-lg p-6 relative">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <BrainCircuit className="w-4 h-4 text-[var(--color-primary-blue)]" />
                                        Translated to English
                                    </label>
                                    {isTranslating && (
                                        <span className="text-xs font-bold text-teal-600 animate-pulse flex items-center gap-1">
                                            <RefreshCw className="w-3 h-3 animate-spin mx-1" /> Translating...
                                        </span>
                                    )}
                                </div>
                                <textarea
                                    value={translatedText || (isTranslating ? 'Translating...' : '')}
                                    onChange={(e) => {
                                        setTranslatedText(e.target.value);
                                        detectSymptoms(e.target.value);
                                    }}
                                    readOnly={isTranslating}
                                    rows={3}
                                    placeholder="English translation will appear here…"
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-medium resize-none text-base ${translationError
                                        ? 'border-orange-300 bg-orange-50 text-orange-900 focus:border-orange-400 focus:ring-orange-200'
                                        : 'border-blue-200 bg-white text-gray-900 focus:border-[var(--color-primary-blue)] focus:ring-2 focus:ring-blue-100 outline-none'
                                        }`}
                                />
                                {translationError && (
                                    <p className="text-xs font-bold text-orange-600 mt-2">
                                        ⚠️ Translation unavailable — using original speech.
                                    </p>
                                )}
                            </div>

                            {/* Detected Symptoms */}
                            {detectedSymptoms.length > 0 && (
                                <div className="bg-teal-500/20 backdrop-blur-md border-2 border-teal-300/50 rounded-[2rem] p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Activity className="w-5 h-5 text-teal-200" />
                                        <h3 className="font-bold text-white">Detected Symptoms</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {detectedSymptoms.map(s => (
                                            <span key={s} className="bg-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                                                ✓ {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Analyze Button */}
                            <button
                                onClick={handleAnalyze}
                                disabled={(!translatedText.trim() && !transcript.trim() && detectedSymptoms.length === 0) || isListening || isTranslating || isAnalyzing}
                                className="w-full py-4 bg-gradient-auth text-white text-lg font-extrabold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 relative overflow-hidden"
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
                                        <ChevronRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <button onClick={() => navigate('/triage')} className="text-white/70 hover:text-white text-sm font-medium flex items-center gap-1 mx-auto transition-colors">
                                ← Back to options
                            </button>
                        </div>

                        {/* Right: Healthcare Illustration Panel */}
                        <div className="hidden lg:flex flex-col gap-6">
                            {/* Doctor Illustration */}
                            <div className="bg-blue-50/80 backdrop-blur-xl border border-blue-100 rounded-[2.5rem] p-8 shadow-xl flex flex-col items-center text-center">
                                {/* Doctor Illustration - changes based on mic state */}
                                <div className="animate-float mb-6">
                                    <div className="relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                        <img
                                            src={isListening
                                                ? "https://cdn-flnkc.nitrocdn.com/KFlCDdxHmXxwfeAbWXbVTSQOtYohfXjT/assets/images/optimized/rev-f9a4404/static.voices.com/wp-content/uploads/2023/03/ai-voice-projects-header.jpg"
                                                : "https://www.informationdifference.com/wp-content/uploads/the-ai-doctor-will-see-you-now.jpg"
                                            }
                                            alt={isListening ? "AI health assistant analyzing voice input" : "Doctor with headset listening to patient"}
                                            className="w-full h-full object-cover transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
                                        {isListening && (
                                            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                                <div className="bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse shadow-lg">
                                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                                    AI is listening…
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-xl font-extrabold text-gray-800 mb-2">AI Health Assistant</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Our AI listens to your symptoms and provides an instant analysis — like having a doctor available anytime.
                                </p>
                            </div>

                            {/* Steps Card */}
                            <div className="bg-teal-50/80 backdrop-blur-xl border border-teal-100 rounded-[2rem] shadow-xl p-6">
                                <h4 className="font-bold text-gray-800 mb-4 text-lg">How Voice Analysis Works</h4>
                                <div className="space-y-4">
                                    {[
                                        { step: '1', title: 'Tap the Mic', desc: 'Start recording your symptoms verbally.', color: 'bg-blue-100 text-blue-700' },
                                        { step: '2', title: 'Speak Naturally', desc: 'Describe how you feel in your own words.', color: 'bg-teal-100 text-teal-700' },
                                        { step: '3', title: 'AI Transcribes', desc: 'We convert your speech to text and detect symptoms.', color: 'bg-green-100 text-green-700' },
                                        { step: '4', title: 'Analyze Risk', desc: 'Get your personalized triage report instantly.', color: 'bg-orange-100 text-orange-700' },
                                    ].map(item => (
                                        <div key={item.step} className="flex items-center gap-4">
                                            <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${item.color}`}>
                                                {item.step}
                                            </span>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                                                <p className="text-gray-500 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p className="text-center text-xs text-white/60">
                                🔒 Voice is processed on your device. Works best in Google Chrome.
                            </p>
                        </div>
                    </div>
                </div> {/* close glassmorphism wrapper */}
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

export default TriageSpeech;