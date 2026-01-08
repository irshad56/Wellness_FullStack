import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AskQuestion() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const docId = queryParams.get("docId");
  const docName = queryParams.get("docName");

  const [question, setQuestion] = useState("");
  const [service, setService] = useState("general");

  const services = [
    { id: "general", label: "General", icon: "✦" },
    { id: "physiotherapy", label: "Physio", icon: "◈" },
    { id: "acupuncture", label: "Acu", icon: "◓" },
    { id: "ayurveda", label: "Ayur", icon: "❈" },
    { id: "chiropractic", label: "Chiro", icon: "⬡" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      _id: crypto.randomUUID(),
      _patientId: "user-current-123",
      _category: service,
      _content: question,
      _taggedPractitionerId: docId || null,
      _createdAt: new Date().toISOString(),
    };

    const existingQuestions = JSON.parse(localStorage.getItem("community_questions") || "[]");
    localStorage.setItem("community_questions", JSON.stringify([newQuestion, ...existingQuestions]));
    navigate("/community");
  };

  const progress = Math.min((question.length / 1000) * 100, 100);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8 transition-colors duration-700 font-mono overflow-hidden
      bg-[#EFECE3] text-[#1B3C53] dark:bg-[#0A1118] dark:text-gray-200">

      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] dark:opacity-20">
        <div className="absolute inset-0 bg-repeat animate-mesh-pan" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", backgroundSize: '150px' }} />
      </div>

      <div className="relative z-10 w-full max-w-5xl bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl rounded-[3rem] border border-[#1B3C53]/10 dark:border-white/5 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

        {/* Holographic Sidebar */}
        <aside className="w-full md:w-32 bg-[#1B3C53]/5 dark:bg-white/5 border-b md:border-b-0 md:border-r border-[#1B3C53]/10 dark:border-white/10 flex md:flex-col items-center justify-center p-6 gap-6">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => setService(s.id)}
              className={`group relative w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 ${service === s.id
                ? "bg-[#1B3C53] text-white dark:bg-white dark:text-[#1B3C53] shadow-[0_0_20px_rgba(255,0,77,0.3)] scale-110"
                : "opacity-40 hover:opacity-100 hover:bg-white/20"
                }`}
            >
              <span className="text-2xl mb-1">{s.icon}</span>
              <span className="text-[8px] font-black uppercase tracking-tighter">{s.label}</span>
              {service === s.id && <div className="absolute -right-1 w-1 h-8 bg-[#FF004D] rounded-full hidden md:block" />}
            </button>
          ))}
        </aside>

        {/* Main Input Area */}
        <div className="flex-1 p-8 md:p-16 space-y-10">
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-1 bg-[#FF004D]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF004D]">Input Module 01</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic uppercase">
              Seek <span className="text-blue-500 opacity-80">Clarity.</span>
            </h1>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase opacity-40 italic">
              <span>Target: {service}</span>
              <span className="w-1 h-1 rounded-full bg-current" />
              <span>Status: Awaiting Data</span>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              {/* Progress Bar / Scanline */}
              <div className="absolute -top-4 left-0 w-full h-[1px] bg-[#1B3C53]/10 dark:bg-white/10">
                <div className="h-full bg-[#FF004D] shadow-[0_0_10px_#FF004D] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>

              <textarea
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Initialize symptom description sequence..."
                className="w-full min-h-[220px] bg-transparent border-none outline-none text-2xl md:text-3xl font-medium placeholder:opacity-10 resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-[#1B3C53]/10 dark:border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Buffer Capacity</span>
                <span className="text-sm font-bold tracking-widest">{question.length} / 1000</span>
              </div>

              <button
                type="submit"
                className="group relative px-12 py-6 bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] rounded-full font-black uppercase tracking-widest overflow-hidden hover:bg-[#FF004D] dark:hover:bg-[#FF004D] dark:hover:text-white transition-all shadow-xl active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Transmit Question
                  <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes mesh-pan { from { background-position: 0 0; } to { background-position: 150px 150px; } }
        .animate-mesh-pan { animation: mesh-pan 60s linear infinite; }
      `}</style>
    </div>
  );
}