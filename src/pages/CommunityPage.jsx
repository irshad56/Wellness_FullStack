import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const practitioners = [
  { id: "p-1001", name: "Dr. Sarah Smith", specialization: "physiotherapy" },
  { id: "p-1002", name: "Aisha Khan", specialization: "acupuncture" },
  { id: "p-1007", name: "Priya Nair", specialization: "ayurveda" },
  { id: "p-1012", name: "Dr. Chloe Adams", specialization: "chiropractic" },
  { id: "p-1013", name: "David Nguyen", specialization: "physiotherapy" },
  { id: "p-1030", name: "Yumi Sato", specialization: "acupuncture" },
  { id: "p-1044", name: "Dr. Marcus Thorne", specialization: "chiropractic" },
  { id: "p-1055", name: "Ananya Gupta", specialization: "ayurveda" },
  { id: "p-1066", name: "Elena Rodriguez", specialization: "physiotherapy" }
];

const qaData = {
  "discussions": [
    {
      "category": "acupuncture",
      "question": { "_id": "q-101", "_content": "How often should I undergo acupuncture for chronic lower back pain?", "_createdAt": "2023-12-01T10:00:00Z" },
      "answers": [{ "_id": "a-501", "_practitionerId": "p-1002", "_content": "For chronic cases, I usually recommend starting with 2 sessions a week for the first 3 weeks." }]
    },
    {
      "category": "ayurveda",
      "question": { "_id": "q-102", "_content": "Are there any Ayurvedic herbs recommended for improving sleep quality?", "_createdAt": "2023-12-05T09:15:00Z" },
      "answers": [{ "_id": "a-503", "_practitionerId": "p-1007", "_content": "Ashwagandha is excellent for balancing cortisol levels and stabilizing your circadian rhythm." }]
    },
    {
      "category": "chiropractic",
      "question": { "_id": "q-103", "_content": "Is a 'popping' sound during a chiropractic adjustment normal?", "_createdAt": "2023-12-10T18:00:00Z" },
      "answers": [{ "_id": "a-504", "_practitionerId": "p-1012", "_content": "It is completely normal! That sound is just gas being released from the joint." }]
    },
    {
      "category": "physiotherapy",
      "question": { "_id": "q-104", "_content": "What is the best exercise for strengthening the rotator cuff at home?", "_createdAt": "2023-12-12T14:20:00Z" },
      "answers": [{ "_id": "a-505", "_practitionerId": "p-1001", "_content": "External rotations with light resistance bands are the gold standard. Focus on controlled movements rather than speed." }]
    }
  ]
};

export default function CommunityPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [discussions, setDiscussions] = useState([]);
  const categories = ["all", "physiotherapy", "acupuncture", "ayurveda", "chiropractic"];

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("community_questions") || "[]");
    const formattedLocal = local.map(q => ({
      category: q._category || "general",
      question: q,
      answers: []
    }));
    setDiscussions([...formattedLocal, ...qaData.discussions]);
  }, []);

  const getDoc = (id) => practitioners.find(p => p.id === id) || { name: "Specialist", specialization: "Wellness" };
  const filteredDiscussions = activeFilter === "all" ? discussions : discussions.filter(d => d.category === activeFilter);

  return (
    <div className="relative min-h-screen p-6 md:p-12 transition-colors duration-700 font-mono overflow-hidden
      bg-[#EFECE3] text-[#1B3C53] dark:bg-[#0A1118] dark:text-gray-200">

      <div className="fixed inset-0 pointer-events-none opacity-[0.05] dark:opacity-20">
        <div className="absolute inset-0 bg-repeat animate-mesh-pan" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", backgroundSize: '150px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-dashed border-[#1B3C53]/10 dark:border-gray-700/50 pb-12 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-10 h-1 bg-[#FF004D]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF004D]">Open Ledger</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">
              COMM<span className="text-blue-500 dark:opacity-80">UNITY</span>
            </h1>
          </div>

          <button
            onClick={() => navigate('/ask-question')}
            className="px-12 py-6 bg-[#FF004D] text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl hover:shadow-[#FF004D]/30 active:scale-95"
          >
            Ask New Question
          </button>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 py-8 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activeFilter === cat
                ? "bg-[#1B3C53] text-white border-transparent dark:bg-white dark:text-black shadow-lg"
                : "border-[#1B3C53]/10 dark:border-white/10 opacity-60 hover:opacity-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredDiscussions.map((item, index) => (
            <div
              key={item.question._id}
              className="group relative transition-all duration-700 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative rounded-[3rem] p-10 overflow-hidden border backdrop-blur-3xl
                bg-white/60 border-[#1B3C53]/10 shadow-lg
                dark:bg-white/[0.03] dark:border-white/5 dark:shadow-2xl hover:border-[#FF004D]/30 transition-all">

                <div className="flex justify-between items-center mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF004D] bg-[#FF004D]/5 px-4 py-1 rounded-full border border-[#FF004D]/20">
                    {item.category}
                  </span>
                  <span className="text-[9px] font-mono opacity-20">DATA_KEY: {item.question._id.slice(0, 8)}</span>
                </div>

                <h3 className="text-3xl font-bold mb-10 italic leading-tight group-hover:text-blue-500 transition-colors">
                  "{item.question._content}"
                </h3>

                {item.answers.length > 0 ? (
                  item.answers.map((ans) => {
                    const doc = getDoc(ans._practitionerId);
                    return (
                      <div key={ans._id} className="p-8 rounded-[2rem] bg-[#1B3C53]/5 dark:bg-white/5 border border-white/20 dark:border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          <p className="text-[10px] font-black uppercase tracking-widest">
                            {doc.name} <span className="opacity-30 mx-2">|</span> {doc.specialization}
                          </p>
                        </div>
                        <p className="text-sm italic opacity-80 leading-relaxed font-sans">{ans._content}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-10 rounded-[2.5rem] border border-dashed border-[#1B3C53]/20 dark:border-white/10 flex flex-col items-center justify-center space-y-4 opacity-40">
                    <div className="w-8 h-8 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Processing Expert Node</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes mesh-pan { from { background-position: 0 0; } to { background-position: 150px 150px; } }
        .animate-mesh-pan { animation: mesh-pan 60s linear infinite; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}