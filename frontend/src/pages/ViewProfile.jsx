import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import practitioners from "../data/practitioners.json";
import feedbacksData from "../data/feedbacks.json";

export default function ViewProfile() {
  const { id } = useParams();
  const practitioner = practitioners.find((p) => p.id === id);
  const [feedbacks, setFeedbacks] = useState(feedbacksData.filter((f) => f.practitionerId === id));
  const [form, setForm] = useState({ patientName: "", rating: 5, comment: "" });

  // Ref for the scrolling container
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);

  if (!practitioner) return <div className="h-screen flex items-center justify-center font-black animate-pulse text-[#FF004D]">NODE_OFFLINE</div>;

  // --- AUTO-SCROLL LOGIC ---
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const startScrolling = () => {
      scrollInterval.current = setInterval(() => {
        if (scrollContainer) {
          // If we reach the bottom, snap back to top for a loop effect
          if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 1) {
            scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            scrollContainer.scrollTop += 1; // Speed of scroll
          }
        }
      }, 30); // Smoothness (lower is faster/smoother)
    };

    startScrolling();

    // Pause on hover
    const handleMouseEnter = () => clearInterval(scrollInterval.current);
    const handleMouseLeave = () => startScrolling();

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(scrollInterval.current);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [feedbacks]);

  const submit = (e) => {
    e.preventDefault();
    setFeedbacks([{ id: Date.now(), practitionerId: id, ...form, rating: Number(form.rating) }, ...feedbacks]);
    setForm({ patientName: "", rating: 5, comment: "" });
  };

  return (
    <div className="min-h-screen lg:h-screen w-full lg:overflow-hidden font-mono transition-colors duration-700
      bg-[#EFECE3] text-[#1B3C53] dark:bg-[#0A1118] dark:text-gray-200 p-4 md:p-6 lg:p-8">

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-10 animate-mesh-float">
        <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", backgroundSize: '100px' }} />
      </div>

      <div className="relative z-10 h-full flex flex-col gap-4 md:gap-6 animate-fade-in">
        <header className="flex justify-between items-end border-b border-[#1B3C53]/10 dark:border-white/10 pb-3 relative">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#FF004D] shadow-[0_0_10px_#FF004D] animate-pulse" />
            <h1 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase">
              Expert <span className="text-blue-500 opacity-80 animate-glow">Node</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] md:text-[10px] font-black opacity-40 uppercase tracking-widest">IDX: {id}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#FF004D] to-transparent animate-scan-horizontal opacity-30" />
        </header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 md:gap-8 min-h-0">

          <div className="flex flex-col gap-4 md:gap-6 min-h-0 animate-slide-right">
            {/* IDENTITY CARD */}
            <div className="relative group flex-none rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-10 bg-white/70 dark:bg-white/[0.03] border border-[#1B3C53]/10 dark:border-white/5 backdrop-blur-3xl shadow-xl flex items-center gap-5 md:gap-10 overflow-hidden transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF004D]/5 to-transparent h-1/2 w-full animate-scan-vertical pointer-events-none" />
              <div className="relative w-16 h-16 md:w-28 md:h-28 rounded-2xl md:rounded-3xl bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] text-3xl md:text-6xl font-black flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:rotate-3">
                {practitioner.name.charAt(0)}
              </div>
              <div className="space-y-1 md:space-y-3">
                <h2 className="text-xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">{practitioner.name}</h2>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                  <p className="text-[10px] md:text-sm font-black text-blue-500 tracking-[0.1em]">{practitioner.specialization}</p>
                  <div className="flex text-yellow-400 text-[10px] md:text-xs">{"★".repeat(Math.round(practitioner.rating))}</div>
                </div>
              </div>
            </div>

            {/* FORM CARD */}
            <div className="flex-1 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 bg-white/30 dark:bg-white/[0.01] border border-[#1B3C53]/5 dark:border-white/5 shadow-inner flex flex-col justify-center">
              <h3 className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 md:mb-8 italic opacity-40">Initialize Review Protocol_</h3>
              <form onSubmit={submit} className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required placeholder="PATIENT_IDENTITY" value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                    className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl bg-white dark:bg-white/5 border border-transparent focus:border-[#FF004D]/50 outline-none font-bold text-[10px] md:text-xs transition-all uppercase" />
                  <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}
                    className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl bg-white dark:bg-white/5 border border-transparent focus:border-[#FF004D]/50 outline-none font-bold text-[10px] md:text-xs uppercase cursor-pointer transition-all">
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} STARS</option>)}
                  </select>
                </div>
                <textarea rows="2" required placeholder="DATA_LOG_CONTENT" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="w-full p-4 rounded-xl md:rounded-2xl bg-white dark:bg-white/5 border border-transparent focus:border-[#FF004D]/50 outline-none font-bold text-[10px] md:text-xs uppercase transition-all resize-none" />
                <button type="submit" className="group relative w-full py-4 md:py-6 rounded-full bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] font-black uppercase tracking-[0.2em] overflow-hidden transition-all active:scale-95 text-[10px] md:text-xs shadow-xl">
                  <span className="relative z-10 group-hover:tracking-[0.4em] transition-all duration-300">Transmit Protocol</span>
                  <div className="absolute inset-0 bg-[#FF004D] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </form>
            </div>
          </div>

          {/* AUTO-SCROLLING NEURAL LEDGER */}
          <div className="relative min-h-[400px] lg:min-h-0 rounded-[1.5rem] md:rounded-[3rem] bg-white/70 dark:bg-white/[0.03] border border-[#1B3C53]/10 dark:border-white/5 shadow-2xl backdrop-blur-3xl overflow-hidden flex flex-col animate-slide-left">
            <div className="p-5 md:p-8 border-b border-[#1B3C53]/5 dark:border-white/5 flex justify-between items-center bg-white/20">
              <h3 className="text-[10px] font-black uppercase italic tracking-[0.2em]">Neural Ledger</h3>
              <div className="text-[8px] font-black text-blue-500 animate-pulse">AUTO_FEED_ACTIVE</div>
            </div>

            {/* The ref is attached here */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar p-5 md:p-8 space-y-4 md:space-y-6 scroll-smooth">
              {feedbacks.map((f, i) => (
                <div key={i} className="p-4 md:p-6 rounded-[1.2rem] md:rounded-[2rem] bg-white dark:bg-white/5 border border-[#1B3C53]/5 dark:border-white/5 transition-all hover:border-[#FF004D]/30 animate-fade-in">
                  <div className="flex justify-between items-start mb-2 md:mb-3">
                    <p className="text-[8px] md:text-[10px] font-black uppercase text-[#FF004D] italic">{f.patientName}</p>
                    <div className="text-yellow-500 text-[8px] flex gap-0.5">{"★".repeat(f.rating)}</div>
                  </div>
                  <p className="text-[10px] md:text-[12px] leading-relaxed text-[#1B3C53]/80 dark:text-gray-300 italic font-sans">"{f.comment}"</p>
                </div>
              ))}
              {/* Extra spacing at bottom to ensure loop visibility */}
              <div className="h-20 w-full" />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/80 dark:from-[#0A1118] to-transparent pointer-events-none" />
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-right { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slide-left { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scan-horizontal { 0% { left: -100%; } 100% { left: 100%; } }
        @keyframes scan-vertical { 0% { top: -100%; } 100% { top: 100%; } }
        @keyframes mesh-float { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }

        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-slide-right { animation: slide-right 0.6s ease-out; }
        .animate-slide-left { animation: slide-left 0.6s ease-out; }
        .animate-scan-horizontal { animation: scan-horizontal 3s linear infinite; }
        .animate-scan-vertical { animation: scan-vertical 5s linear infinite; }
        .animate-mesh-float { animation: mesh-float 60s linear infinite; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}