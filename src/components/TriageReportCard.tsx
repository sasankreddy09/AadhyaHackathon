import { AlertTriangle, CheckCircle, AlertCircle, XCircle, Activity, Brain, Stethoscope, ShieldCheck, Info, Clock } from 'lucide-react';
import { useEffect, useState } from "react";
import MapView from "../MapView"
import { fetchHospitals } from "../hospitals";



export interface TriageReport {
    risk_score: number;
    classification: 'Low' | 'Moderate' | 'High' | 'Critical';
    recommendation: string;
    predicted_condition: string;
    confidence: number;
    contributors: string[];
    explanation: string;
    patient_education: string;
    disclaimer: string;
}

interface Props {
    report: TriageReport;
    generatedAt?: string;
    onClose?: () => void;
}

const LEVEL_CONFIG = {
    Low: {
        bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
        border: 'border-green-300',
        accent: 'bg-green-500',
        accentSoft: 'bg-green-100',
        accentText: 'text-green-700',
        badgeBg: 'bg-green-500',
        scoreBg: 'bg-green-500',
        scoreRing: 'ring-green-200',
        barColor: 'bg-green-500',
        cta: null,
        icon: <CheckCircle className="w-6 h-6 text-green-600" />,
        headerGrad: 'from-green-500 to-emerald-400',
    },
    Moderate: {
        bg: 'bg-gradient-to-br from-yellow-50 to-amber-50',
        border: 'border-yellow-300',
        accent: 'bg-yellow-500',
        accentSoft: 'bg-yellow-100',
        accentText: 'text-yellow-700',
        badgeBg: 'bg-yellow-500',
        scoreBg: 'bg-yellow-500',
        scoreRing: 'ring-yellow-200',
        barColor: 'bg-yellow-500',
        cta: null,
        icon: <AlertCircle className="w-6 h-6 text-yellow-600" />,
        headerGrad: 'from-yellow-500 to-amber-400',
    },
    High: {
        bg: 'bg-gradient-to-br from-orange-50 to-red-50',
        border: 'border-orange-400',
        accent: 'bg-orange-500',
        accentSoft: 'bg-orange-100',
        accentText: 'text-orange-700',
        badgeBg: 'bg-orange-500',
        scoreBg: 'bg-orange-500',
        scoreRing: 'ring-orange-200',
        barColor: 'bg-orange-500',
        cta: 'Visit a hospital immediately. Do not delay.',
        icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
        headerGrad: 'from-orange-500 to-red-400',
    },
    Critical: {
        bg: 'bg-gradient-to-br from-red-50 to-rose-50',
        border: 'border-red-500',
        accent: 'bg-red-600',
        accentSoft: 'bg-red-100',
        accentText: 'text-red-700',
        badgeBg: 'bg-red-600',
        scoreBg: 'bg-red-600',
        scoreRing: 'ring-red-200',
        barColor: 'bg-red-600',
        cta: 'Visit a hospital immediately. Do not delay.',
        icon: <XCircle className="w-6 h-6 text-red-600" />,
        headerGrad: 'from-red-600 to-rose-500',
    },
};

const TriageReportCard = ({ report, generatedAt, onClose }: Props) => {
    const cfg = LEVEL_CONFIG[report.classification] ?? LEVEL_CONFIG['High'];
    const [location, setLocation] = useState<any>(null);
    const [hospitals, setHospitals] = useState<any[]>([]);
    const [selectedHospital, setSelectedHospital] = useState<any>(null);
    const scorePercent = Math.min(100, Math.max(0, report.risk_score));

    useEffect(() => {

        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(async (pos) => {

            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            setLocation({ lat, lon });

            const data = await fetchHospitals(lat, lon);

            // Limit hospitals for faster map rendering
            setHospitals(data.slice(0, 10));

        });

    }, []);

    const downloadPDF = async () => {
        try {

            const response = await fetch("https://anandanaidu-aadhya-backend.hf.space/analyze/download", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: report.contributors.join(", ")
                })
            });

            if (!response.ok) {
                throw new Error("Failed to generate PDF");
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "arogya_raksha_report.pdf";

            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (err) {
            console.error("PDF download error:", err);
            alert("Failed to download report.");
        }
    };

    return (
        <div className={`rounded-[2rem] border-2 ${cfg.border} ${cfg.bg} shadow-2xl overflow-hidden w-[80vw] h-[80vh] flex flex-col transition-all duration-500 animate-slide-up-modal`}>

            {/* ── Gradient Header ── */}
            <div className={`bg-gradient-to-r ${cfg.headerGrad} px-8 py-6 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <div className="bg-white/25 p-2 rounded-xl">
                        <Stethoscope className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-white font-extrabold text-xl leading-tight">Triage Report Card</h2>
                        <div className="flex items-center gap-1.5 text-white/80 text-xs mt-0.5">
                            <Clock className="w-3 h-3" />
                            {generatedAt ?? 'Generated just now'}
                        </div>
                    </div>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-white/70 hover:text-white transition-colors text-2xl font-light leading-none">
                        ×
                    </button>
                )}
            </div>

            <div className="p-8 space-y-7 overflow-y-auto flex-1 custom-scrollbar">

                {/* ── Risk Score + Level ── */}
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                    {/* Circular score */}
                    <div className={`relative flex flex-col items-center justify-center w-36 h-36 rounded-full ${cfg.scoreBg} ring-8 ${cfg.scoreRing} shadow-xl shrink-0`}>
                        <p className="text-white text-4xl font-black leading-none">{report.risk_score}</p>
                        <p className="text-white/80 text-sm font-semibold">/100</p>
                        <p className="text-white/70 text-xs mt-0.5 tracking-wide">Risk Score</p>
                    </div>

                    <div className="flex-1 space-y-3">
                        {/* Risk Level badge */}
                        <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-extrabold text-base ${cfg.badgeBg} shadow-md`}>
                                {cfg.icon}
                                {report.classification} Risk
                            </span>
                        </div>

                        {/* Score bar */}
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-3 rounded-full transition-all duration-1000 ${cfg.barColor}`}
                                style={{ width: `${scorePercent}%` }}
                            />
                        </div>
                        <p className="text-gray-500 text-sm">{scorePercent}% risk intensity detected</p>

                        {/* Predicted condition */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${cfg.accentSoft} border ${cfg.border}`}>
                            <Brain className={`w-4 h-4 ${cfg.accentText}`} />
                            <span className={`text-sm font-bold ${cfg.accentText}`}>{report.predicted_condition}</span>
                        </div>
                    </div>
                </div>

                {/* ── Recommendation ── */}
                <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl ${cfg.accentSoft} border ${cfg.border}`}>
                    <Activity className={`w-5 h-5 shrink-0 ${cfg.accentText}`} />
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-0.5">Recommendation</p>
                        <p className={`font-extrabold text-base ${cfg.accentText}`}>{report.recommendation}</p>
                    </div>
                    <div className="ml-auto text-right shrink-0">
                        <p className="text-xs text-gray-500">Confidence</p>
                        <p className={`font-extrabold text-lg ${cfg.accentText}`}>{report.confidence}%</p>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={downloadPDF}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition"
                    >
                        Download PDF Report
                    </button>
                </div>

                {/* ── Symptoms Detected ── */}
                {report.contributors.length > 0 && (
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Symptoms Detected</p>
                        <div className="flex flex-wrap gap-2">
                            {report.contributors.map(s => (
                                <span key={s} className={`px-3 py-1.5 rounded-full text-sm font-bold ${cfg.badgeBg} text-white shadow-sm`}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Explanation ── */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" /> AI Explanation
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm">{report.explanation}</p>
                </div>

                {/* ── Patient Education ── */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> Patient Guidance
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">{report.patient_education}</p>
                </div>
                {/* {hospitals.length > 0 && ( */}

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Nearby Hospitals
                    </p>

                    {hospitals.map((h, i) => (
                        <div key={i} className="flex items-center justify-between mb-2">

                            <span className="font-semibold text-gray-700">{h.name}</span>

                            <button
                                onClick={() => setSelectedHospital(h)}
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs"
                            >
                                Show on Map
                            </button>

                        </div>
                    ))}

                    <MapView
                        userLocation={location}
                        hospital={selectedHospital}
                    />

                </div>

                {/* )} */}
                {/* ── CTA for High/Critical ── */}
                {cfg.cta && (
                    <div className={`flex items-center gap-4 px-6 py-5 rounded-2xl ${cfg.accent} shadow-xl`}>
                        <AlertTriangle className="w-8 h-8 text-white shrink-0 animate-pulse" />
                        <div>
                            <p className="text-white font-extrabold text-lg">Emergency Action Required</p>
                            <p className="text-white/90 text-sm font-semibold">{cfg.cta}</p>
                        </div>
                    </div>
                )}

                {/* ── Disclaimer ── */}
                <div className="border-t border-gray-200 pt-5">
                    <p className="text-xs text-gray-400 leading-relaxed">
                        ⚕️ <strong>Disclaimer:</strong> {report.disclaimer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TriageReportCard;
