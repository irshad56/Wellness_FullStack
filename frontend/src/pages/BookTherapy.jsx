import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import practitioners from "../data/practitioners.json";
import PractitionerCard from "../components/PractitionerCard";

export default function BookTherapy() {
  const [search, setSearch] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [filteredPractitioners, setFilteredPractitioners] = useState([]);
  const navigate = useNavigate();

  // Extract unique specialties for the filter tabs
  const specialties = ["All", ...new Set(practitioners.map(p => p.specialization))];

  useEffect(() => {
    const query = search.toLowerCase();
    const results = practitioners.filter((p) => {
      const matchesSearch =
        (p.name ?? "").toLowerCase().includes(query) ||
        (p.specialization ?? "").toLowerCase().includes(query);

      const matchesSpecialty = activeSpecialty === "All" || p.specialization === activeSpecialty;

      return matchesSearch && matchesSpecialty;
    });
    setFilteredPractitioners(results);
  }, [search, activeSpecialty]);

  return (
    <div className="min-h-screen bg-[#EFECE3] dark:bg-[#0A1118] text-[#1B3C53] dark:text-gray-200 transition-colors duration-700 p-4 md:p-8 lg:p-12 relative overflow-hidden font-mono">

      {/* 1. BACKGROUND GRID (Identical to Products) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", backgroundSize: '80px' }} />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">

        {/* 2. HEADER SECTION (HUD Style) */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-[#FF004D] shadow-[0_0_15px_#FF004D]" />
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
                Neural <span className="text-blue-500">Nodes</span>
              </h1>
            </div>
            <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] opacity-40 uppercase pl-5">
              Verified_Specialist_Directory_v2.0
            </p>
          </div>

          {/* SEARCH HUD */}
          <div className="w-full md:w-[400px] group">
            <div className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-white/5 border border-[#1B3C53]/10 dark:border-white/10 backdrop-blur-xl p-4 transition-all focus-within:border-[#FF004D]/50 shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="animate-pulse">🛰️</span>
                <input
                  type="text"
                  placeholder="QUERY_NODE_ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent outline-none text-xs font-black uppercase tracking-widest placeholder-[#1B3C53]/30 dark:placeholder-white/20 text-[#1B3C53] dark:text-white"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-[1px] bg-[#FF004D] w-0 group-focus-within:w-full transition-all duration-700" />
            </div>
          </div>
        </header>

        {/* 3. SPECIALTY SELECTOR (Consistent with Product Categories) */}
        <div className="flex flex-wrap gap-3 mb-16">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setActiveSpecialty(spec)}
              className={`
                px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 border
                ${activeSpecialty === spec
                  ? "bg-[#1B3C53] text-white border-[#1B3C53] dark:bg-white dark:text-[#1B3C53] shadow-[0_10px_20px_rgba(0,0,0,0.2)] scale-105"
                  : "bg-white/20 border-black/5 dark:border-white/10 hover:border-[#FF004D]/40"}
              `}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* 4. PRACTITIONER GRID (4-Column, Staggered) */}
        {filteredPractitioners.length === 0 ? (
          <div className="h-[40vh] flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-[#1B3C53]/20 dark:border-white/10">
            <p className="text-xs font-black uppercase tracking-widest opacity-40 animate-pulse">Connection_Lost: No_Nodes_Match</p>
          </div>
        ) : (
          /* Grid structure identical to Products page */
          <div className="grid gap-x-6 gap-y-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-10">
            {filteredPractitioners.map((practitioner, index) => (
              <div
                key={practitioner.id}
                onClick={() => navigate(`/profile/${practitioner.id}`)}
                className="cursor-pointer h-full animate-slide-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative group">
                  {/* Holographic Border Effect */}
                  <div className="absolute -inset-1.5 bg-gradient-to-b from-blue-500/20 to-[#FF004D]/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* The Card */}
                  <div className="relative">
                    <PractitionerCard practitioner={practitioner} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}