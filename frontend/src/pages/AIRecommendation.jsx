import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AIRecommendation() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [isScanning, setIsScanning] = useState(true);

  // Theme-aware Accent Logic
  const getAccent = (therapy) => {
    if (therapy.includes("Physio")) return {
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-700/50",
      bg: "bg-blue-50 dark:bg-blue-900/40",
      shadow: "shadow-blue-200 dark:shadow-blue-900/30",
      glow: "from-blue-400/20 dark:from-blue-500/30"
    };
    if (therapy.includes("Acu")) return {
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-700/50",
      bg: "bg-emerald-50 dark:bg-emerald-900/40",
      shadow: "shadow-emerald-200 dark:shadow-emerald-900/30",
      glow: "from-emerald-400/20 dark:from-emerald-500/30"
    };
    if (therapy.includes("Ayur")) return {
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-700/50",
      bg: "bg-amber-50 dark:bg-amber-900/40",
      shadow: "shadow-amber-200 dark:shadow-amber-900/30",
      glow: "from-amber-400/20 dark:from-amber-500/30"
    };
    if (therapy.includes("Chiro")) return {
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-700/50",
      bg: "bg-purple-50 dark:bg-purple-900/40",
      shadow: "shadow-purple-200 dark:shadow-purple-900/30",
      glow: "from-purple-400/20 dark:from-purple-500/30"
    };
    return {
      text: "text-[#FF004D]",
      border: "border-red-100 dark:border-[#FF004D]/50",
      bg: "bg-red-50 dark:bg-[#FF004D]/20",
      shadow: "shadow-red-100 dark:shadow-[#FF004D]/20",
      glow: "from-red-400/20 dark:from-[#FF004D]/30"
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockData = [
        { _id: "rec-9901", _symptom: "Chronic lower back stiffness after long work hours", _suggestedTherapy: "Physiotherapy & Ergonomic Adjustment", _sourceAPI: "WellnessEngine-v2.1", _confidence: 98, _complexity: 7 },
        { _id: "rec-9902", _symptom: "Difficulty falling asleep and high evening anxiety", _suggestedTherapy: "Acupuncture & Ayurvedic Brahmi Therapy", _sourceAPI: "NeuroCalm-Neural-Net", _confidence: 94, _complexity: 8 },
        { _id: "rec-9903", _symptom: "Sharp radiating pain from neck to shoulder (Tech Neck)", _suggestedTherapy: "Chiropractic Realignment & Cervical Traction", _sourceAPI: "SpineLogic-AI-Pro", _confidence: 91, _complexity: 6 },
        { _id: "rec-9904", _symptom: "Digestive sluggishness and post-meal bloating", _suggestedTherapy: "Ayurvedic Agni-Deepana & Triphala", _sourceAPI: "VedaHealth-Bio-Engine", _confidence: 89, _complexity: 5 }
      ];
      setRecommendations(mockData);
      setIsScanning(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen p-4 md:p-12 transition-colors duration-700 overflow-hidden font-mono
      bg-[#EFECE3] text-[#1B3C53] 
      dark:bg-[#0A1118] dark:text-gray-200">

      {/* Background Mesh - Adjusted for both modes */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] dark:opacity-20">
        <div className="absolute inset-0 bg-repeat animate-mesh-pan" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", backgroundSize: '150px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">

        {/* Adaptive Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-dashed border-[#1B3C53]/10 dark:border-gray-700/50 pb-10 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="w-10 h-1 bg-[#FF004D] shadow-[0_0_15px_#FF004D]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF004D]">BIOMETRIC MATRIX</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase italic text-[#1B3C53] dark:text-gray-50">
              AI <span className="text-blue-500 dark:opacity-80">ADVICE</span>
            </h1>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="group flex items-center gap-4 px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all shadow-xl
              bg-[#1B3C53] text-white hover:bg-[#FF004D]
              dark:bg-gray-800/50 dark:border dark:border-gray-700/50 dark:hover:bg-[#FF004D]/70"
          >
            REFRESH SCAN
          </button>
        </header>

        {isScanning ? (
          <div className="flex flex-col items-center justify-center py-48 space-y-8 animate-glitch">
            <div className="relative w-64 h-1 bg-gray-300 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-[#FF004D] animate-scanner-pulse" />
            </div>
            <p className="text-xl font-bold uppercase tracking-[0.4em] text-blue-500 dark:text-blue-400 animate-pulse">
              SYNCING NEURALS<span className="animate-blink">_</span>
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {recommendations.map((rec, index) => {
              const accent = getAccent(rec._suggestedTherapy);
              return (
                <div
                  key={rec._id}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`relative rounded-[2.5rem] p-8 md:p-12 overflow-hidden border backdrop-blur-3xl transition-all duration-700 transform-gpu group-hover:-translate-y-2
                    bg-white/60 border-[#1B3C53]/10 shadow-lg
                    dark:bg-white/[0.03] dark:border-white/5 dark:shadow-2xl`}>

                    {/* Dynamic Glow - visible in both modes */}
                    <div className={`absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-r ${accent.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                    <div className="relative z-10 grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-center">

                      {/* Left: Symptom */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                          <span className="text-[10px] uppercase opacity-40">Profile Log {rec._id.split('-')[1]}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold leading-tight">"{rec._symptom}"</h2>
                        <div className="flex gap-2">
                          <span className="text-[9px] px-2 py-1 rounded bg-[#1B3C53]/5 dark:bg-white/5 border border-current opacity-50">COMPLEXITY {rec._complexity}</span>
                        </div>
                      </div>

                      {/* Middle Link */}
                      <div className="hidden lg:flex flex-col items-center gap-4">
                        <div className="h-20 w-[1px] bg-[#1B3C53]/10 dark:bg-white/10" />
                        <div className={`p-4 rounded-full border-2 ${accent.border} ${accent.bg}`}>
                          <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        </div>
                        <div className="h-20 w-[1px] bg-[#1B3C53]/10 dark:bg-white/10" />
                      </div>

                      {/* Right: Outcome */}
                      <div className="flex flex-col lg:items-end lg:text-right gap-6">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF004D]">AI SUGGESTION</span>
                          <h3 className={`text-3xl md:text-4xl font-black tracking-tighter italic uppercase ${accent.text}`}>
                            {rec._suggestedTherapy}
                          </h3>
                        </div>

                        <div className="flex items-center gap-6 lg:justify-end">
                          <div className="text-right">
                            <span className="block text-[8px] font-black opacity-30">CONFIDENCE</span>
                            <span className="text-2xl font-bold">{rec._confidence}%</span>
                          </div>
                          <button
                            onClick={() => navigate('/bookTherapy')}
                            className="bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#FF004D] dark:hover:bg-[#FF004D] dark:hover:text-white transition-all shadow-xl active:scale-90"
                          >
                            EXECUTE
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes mesh-pan { from { background-position: 0 0; } to { background-position: 150px 150px; } }
        .animate-mesh-pan { animation: mesh-pan 60s linear infinite; }
        
        @keyframes scanner-pulse { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        .animate-scanner-pulse { animation: scanner-pulse 2s linear infinite; }

        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }

        @keyframes blink { 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s infinite steps(1); }
      `}</style>
    </div>
  );
}