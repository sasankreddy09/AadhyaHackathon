import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Stethoscope,
  ArrowRight,
  Mic,
  BrainCircuit,
  AlertTriangle,
  Globe,
  ShieldCheck,
  HeartPulse,
  ChevronDown,
  ChevronRight,
  ShieldPlus,
  PhoneCall,
  Smartphone
} from "lucide-react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Custom Hook to manage marquee animation on mount safely
  useEffect(() => {
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    styleSheet.innerText = `
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        display: inline-flex;
        animation: scroll 25s linear infinite;
      }
    `
    document.head.appendChild(styleSheet)
    return () => {
      document.head.removeChild(styleSheet)
    }
  }, []);

  const faqs = [
    {
      q: "What is Arogya Raksha?",
      a: "Arogya Raksha is a dual-purpose AI platform built to deliver Early Health Risk Detection through symptom analysis and Fraud Risk Detection for digital safety, particularly assisting rural communities."
    },
    {
      q: "How accurate is the AI risk detection?",
      a: "Our AI engine correlates inputs against thousands of verified medical and cybersecurity patterns to generate a Risk Probability Score (0-100%). While highly accurate for initial triage, we always recommend verifying high-risk flags with a professional."
    },
    {
      q: "Does the system store my medical data?",
      a: "No. Symptom queries are processed ephemerally. Only anonymous analytical metadata is retained to improve the AI model. Your registration data remains securely encrypted and private."
    },
    {
      q: "How does scam detection work?",
      a: "By feeding SMS or messaging text into the system, our NLP engine scans for suspicious keywords, malicious URLs, urgency-based emotional triggers, and known scam formats (e.g., UPI, Lottery) to determine if a message is a threat."
    },
    {
      q: "What should I do if a message is high risk?",
      a: "Do not click any links or share OTPs. Immediately report the interaction to the Cybercrime Helpline at 1930 and block the sender."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-200">
      {/* 
        ========================================================================
        NAVBAR 
        ========================================================================
      */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-shadow">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">Arogya Raksha</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#triage" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Health Triage</a>
            <a href="#fraud" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Fraud Shield</a>
            <a href="#how" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#faq" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="hidden sm:block text-slate-600 hover:text-blue-600 font-bold transition-colors">
              Log in
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 
        ========================================================================
        HERO SECTION (BLUE -> TEAL GRADIENT)
        ========================================================================
      */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-teal-500">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] mix-blend-overlay opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-300/40 rounded-full blur-[150px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 border-l-4 border-l-teal-300">
            <ShieldPlus className="w-5 h-5 text-teal-300 mr-2" />
            <span className="text-teal-50 font-semibold text-sm">Now with AI Fraud Pattern Recognition</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight max-w-5xl mx-auto drop-shadow-sm">
            AI-Based Early Risk Detection <br className="hidden lg:block" /> for Everyone
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-sm">
            Bridging the gap in rural healthcare access and digital safety. Real-time intelligent triage for symptoms, and instant scam detection for a safer digital life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-blue-700 text-lg font-extrabold rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center border border-transparent"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="#triage"
              className="w-full sm:w-auto px-8 py-4 bg-blue-800/40 hover:bg-blue-800/60 backdrop-blur-md text-white text-lg font-bold rounded-2xl border border-white/20 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center"
            >
              Check Symptoms
            </a>
          </div>
        </div>

        {/* Marquee Animation */}
        <div className="w-full overflow-hidden bg-black/20 backdrop-blur-md border-y border-white/10 py-4 absolute bottom-0 left-0">
          <div className="whitespace-nowrap animate-marquee flex items-center space-x-12 px-4 shadow-inner">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex space-x-12 items-center">
                <span className="text-teal-300 font-extrabold text-lg flex items-center"><HeartPulse className="w-5 h-5 mr-2 opacity-80" /> AI Symptom Analysis</span>
                <span className="text-white/40">✦</span>
                <span className="text-white font-extrabold text-lg flex items-center"><ShieldCheck className="w-5 h-5 mr-2 opacity-80" /> Fraud Risk Detection</span>
                <span className="text-white/40">✦</span>
                <span className="text-blue-200 font-extrabold text-lg flex items-center"><Globe className="w-5 h-5 mr-2 opacity-80" /> Digital Awareness for Rural Communities</span>
                <span className="text-white/40">✦</span>
                <span className="text-teal-300 font-extrabold text-lg flex items-center"><Activity className="w-5 h-5 mr-2 opacity-80" /> Smart Health Triage</span>
                <span className="text-white/40">✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 1: HEALTH RISK DETECTION
        ========================================================================
      */}
      <section id="triage" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Health Risk Detection</h2>
            <p className="text-xl text-slate-600">Instantly translate physical symptoms into actionable medical guidance using our Multi-Symptom Prediction Logic.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Explanation */}
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                  <Mic className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Symptom-based Input</h3>
                  <p className="text-slate-600 leading-relaxed">Enter your symptoms naturally using Text or Voice input. Regional language support ensures nothing is lost in translation.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center border border-teal-100">
                  <BrainCircuit className="w-6 h-6 text-teal-600" />
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Algorithm Risk Scoring</h3>
                  <p className="text-slate-600 leading-relaxed">Our system computes a multi-dimensional risk score from 0-100, checking for intersecting comorbidity indicators automatically.</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm mt-8">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center"><Activity className="w-5 h-5 mr-2 text-blue-600" /> Risk Classifications</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="font-semibold text-slate-700">Low (Self-care)</span></div>
                  <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div><span className="font-semibold text-slate-700">Moderate (Teleconsult)</span></div>
                  <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div><span className="font-semibold text-slate-700">High (Hospital)</span></div>
                  <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-red-600"></div><span className="font-semibold text-slate-700">Critical (Emergency)</span></div>
                </div>
              </div>
            </div>

            {/* Triage Mockup */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/20 rounded-full blur-[80px]"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Stethoscope className="text-blue-400 w-6 h-6" />
                    <span className="text-white font-bold">Patient Triage Report</span>
                  </div>
                  <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wide">CONFIDENTIAL</span>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Reported Symptoms</h4>
                    <div className="flex gap-2">
                      <span className="bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-700">Severe Chest Pain</span>
                      <span className="bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium border border-slate-700">Shortness of Breath</span>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                    <div className="flex items-end justify-between mb-2">
                      <h4 className="text-white font-bold">Severity Index</h4>
                      <span className="text-3xl font-black text-red-500">92<span className="text-sm font-medium text-slate-400 ml-1">/100</span></span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 mb-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Normal</span>
                      <span className="text-red-400">Critical Alert</span>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-red-400 font-bold mb-1">Emergency Intervention Required</span>
                      <span className="text-slate-300 text-sm">Symptom cluster highly correlates with acute cardiac events. Dispatch emergency services or visit ER immediately.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 2: FRAUD DETECTION SYSTEM
        ========================================================================
      */}
      <section id="fraud" className="py-24 bg-slate-900 relative overflow-hidden text-white">
        {/* Fraud Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop')] mix-blend-overlay opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-red-600/10 rounded-full blur-[150px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 mb-6">
              <ShieldCheck className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-red-300 font-semibold text-sm tracking-wide">Digital Awareness System</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">AI-Based Fraud Risk Detection</h2>
            <p className="text-xl text-slate-400">Cybercrime targets rural populations at alarming rates. Our engine analyzes SMS and messages instantly to intercept scams before money is lost.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Visual Model */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-slate-800 rounded-[2rem] p-6 shadow-2xl border border-slate-700 relative z-20 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-slate-700">
                  <Smartphone className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-300">Message Analysis</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-red-500/50 mb-4 text-sm text-slate-300 leading-relaxed font-mono">
                  "Dear customer, your <span className="bg-red-500/30 text-red-300 px-1 rounded">HDFC bank acc</span> will be <span className="bg-red-500/30 text-red-300 px-1 rounded">BLOCKED</span> today. Please update PAN CARD immediately <span className="bg-red-500/30 text-red-300 px-1 rounded">http://hdfc-kyc-verify-update.com</span>"
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-red-400">Scam Probability</span>
                    <span className="font-black text-2xl text-red-500">98%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 mb-3">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                  <div className="flex items-center space-x-2 text-red-300 text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" /> <span>Classification: High Risk Phishing</span>
                  </div>
                </div>
              </div>

              {/* Background decor card */}
              <div className="absolute top-0 left-0 w-full h-full bg-blue-900 rounded-[2rem] opacity-50 backdrop-blur-3xl transform rotate-3 translate-x-4 translate-y-4 z-10 border border-blue-800"></div>
            </div>

            {/* Info Text */}
            <div className="order-1 lg:order-2 space-y-8">
              <h3 className="text-2xl font-bold">Threats Assessed:</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex items-center space-x-3 hover:bg-slate-800 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="font-semibold text-slate-200">UPI Fraud</span>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex items-center space-x-3 hover:bg-slate-800 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="font-semibold text-slate-200">Job Scams</span>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex items-center space-x-3 hover:bg-slate-800 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="font-semibold text-slate-200">Lottery Hoaxes</span>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 flex items-center space-x-3 hover:bg-slate-800 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span className="font-semibold text-slate-200">Phishing Links</span>
                </div>
              </div>

              {/* Cybercrime Helpline Block */}
              <div className="mt-8 bg-gradient-to-r from-red-600 to-red-800 p-8 rounded-2xl shadow-xl border border-red-500 flex items-start space-x-6">
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
                  <PhoneCall className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-white text-xl font-bold mb-2">National Cybercrime Helpline</h4>
                  <p className="text-red-100 text-sm mb-4">If you've been a victim of financial fraud, dial immediately.</p>
                  <span className="text-4xl font-black text-white tracking-widest">1930</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 3: HOW IT WORKS
        ========================================================================
      */}
      <section id="how" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">How It Works</h2>
            <p className="text-xl text-slate-600">A unified, 4-step process to secure your physical and digital health.</p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-teal-200 to-blue-200 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600 font-black text-xl border-4 border-white shadow-md mx-auto lg:mx-0">
                  1
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 text-center lg:text-left">Provide Input</h3>
                <p className="text-slate-600 text-center lg:text-left">Enter your physical symptoms or paste a suspicious SMS message into the platform.</p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600 font-black text-xl border-4 border-white shadow-md mx-auto lg:mx-0">
                  2
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 text-center lg:text-left">AI Analysis</h3>
                <p className="text-slate-600 text-center lg:text-left">Our NLP engines extract keywords, match threat indicators, and evaluate risk patterns instantly.</p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 text-teal-600 font-black text-xl border-4 border-white shadow-md mx-auto lg:mx-0">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 text-center lg:text-left">Risk Scoring</h3>
                <p className="text-slate-600 text-center lg:text-left">The system generates a precise 0-100 score classifying the severity of the threat or medical issue.</p>
              </div>

              {/* Step 4 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 text-teal-600 font-black text-xl border-4 border-white shadow-md mx-auto lg:mx-0">
                  4
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 text-center lg:text-left">Actionable Guidance</h3>
                <p className="text-slate-600 text-center lg:text-left">Receive clear explanations and safety tips—whether that's visiting the ER or blocking a number.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 4: TESTIMONIALS
        ========================================================================
      */}
      <section className="py-24 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Community Impact</h2>
            <p className="text-xl text-slate-600">Real stories from rural users leveraging Arogya Raksha.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-slate-50 p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1544168190-79c15427015f?auto=format&fit=crop&q=80&w=200&h=200" alt="Avatar" className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-white shadow-sm" />
              <p className="text-slate-700 italic mb-6">"Arogya Raksha helped me understand scam messages before losing money. I almost shared my OTP until the app flagged the text as 99% HIGH RISK."</p>
              <div className="mt-auto">
                <h4 className="font-bold text-slate-900">Rajesh K.</h4>
                <span className="text-sm text-teal-600 font-semibold">Fraud Prevention</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-50 p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow translate-y-0 md:-translate-y-4">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200" alt="Avatar" className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-white shadow-sm" />
              <p className="text-slate-700 italic mb-6">"The symptom risk checker helped my family know when to visit the hospital. My father complained of dizziness, and the app instantly said 'Critical—Visit ER'. It saved his life."</p>
              <div className="mt-auto">
                <h4 className="font-bold text-slate-900">Sunita M.</h4>
                <span className="text-sm text-blue-600 font-semibold">Health Triage</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-50 p-8 rounded-3xl shadow-md border border-slate-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" alt="Avatar" className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-white shadow-sm" />
              <p className="text-slate-700 italic mb-6">"Living far from a clinic, we use the health triage for basic checks. Knowing whether we just need self-care or an actual doctor saves us so much time and worry."</p>
              <div className="mt-auto">
                <h4 className="font-bold text-slate-900">Amit P.</h4>
                <span className="text-sm text-blue-600 font-semibold">Remote Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 5: AWARENESS TIPS
        ========================================================================
      */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Digital Awareness Hub</h2>
            <p className="text-xl text-slate-600">Quick tips to protect your identity and finances online.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Common Phishing Tricks</h4>
              <p className="text-sm text-slate-600">Scammers create urgency ("Your account implies blocked!"). Never react to immediate threats.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">UPI Safety</h4>
              <p className="text-sm text-slate-600">You ONLY enter your PIN to send money, NEVER to receive money. If asked for a PIN to receive, it's a scam.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <PhoneCall className="w-5 h-5 text-orange-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Avoiding Scam Calls</h4>
              <p className="text-sm text-slate-600">Do not trust caller ID. Scammers spoof numbers to look like official bank reps or police officers.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-5 h-5 text-teal-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Digital Literacy</h4>
              <p className="text-sm text-slate-600">Always check the URL of the website. If the link looks slightly misspelled (e.g., hdfc-bank-verify), close it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 6: FAQ
        ========================================================================
      */}
      <section id="faq" className="py-24 bg-white border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'bg-slate-50 shadow-md ring-1 ring-blue-500/20' : 'bg-white hover:bg-slate-50'}`}
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'transform rotate-180 text-blue-600' : ''}`} />
                </button>

                <div
                  className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? 'pb-6 opacity-100 max-h-48' : 'max-h-0 opacity-0 pb-0'}`}
                >
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 7: FOOTER
        ========================================================================
      */}
      <footer className="bg-slate-950 text-slate-400 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-6 cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-400 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <span className="font-extrabold tracking-tight text-white text-xl">Arogya Raksha</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Protecting communities with AI-driven Health Risk Detection and Digital Awareness security protocols.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Platform</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Health Triage</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Fraud Detection</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> How it Works</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> User Testimonials</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> About Us</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Contact</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Terms of Service</a></li>
              </ul>
            </div>

            {/* Emergency Helplines */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Emergency Helplines</h4>
              <div className="space-y-4">
                <div className="bg-red-900/40 border border-red-500/20 rounded-xl p-4 flex items-center">
                  <PhoneCall className="w-8 h-8 text-red-400 mr-3" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-red-200">Cybercrime</span>
                    <span className="font-bold text-white text-xl">1930</span>
                  </div>
                </div>
                <div className="bg-blue-900/40 border border-blue-500/20 rounded-xl p-4 flex items-center">
                  <Activity className="w-8 h-8 text-blue-400 mr-3" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-blue-200">Medical</span>
                    <span className="font-bold text-white text-xl">108</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Arogya Raksha. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
