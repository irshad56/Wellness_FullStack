import React from "react";
import { useNavigate } from "react-router-dom";

const PractitionerCard = ({ practitioner, isBooked, onCancel, onViewProfile }) => {
  const navigate = useNavigate();

  // 1. DEFENSIVE DESTRUCTURING
  const {
    id = "0",
    name = "Expert",
    specialization = "Therapist",
    verified = false,
    rating = 5.0,
    date = "TBD",
    slot = "N/A",
    bio = ""
  } = practitioner || {};

  const initial = (name || "E").charAt(0).toUpperCase();
  const formattedSpecialization = specialization
    ? specialization.charAt(0).toUpperCase() + specialization.slice(1)
    : "Specialist";

  // Navigation for the new button
  const handleAskQuestion = (e) => {
    e.stopPropagation();
    // Navigate to a chat page or open a modal
    // navigate(`/chat/${id}`); 
    console.log(`Initiating inquiry with: ${name}`);
  };

  return (
    <div className="group relative rounded-[2rem] bg-white dark:bg-[#0A1118]
                    shadow-xl border-2 border-[#1B3C53]/10 dark:border-white/10
                    hover:border-[#FF004D] transition-all duration-500 p-6 pt-12 flex flex-col h-full font-mono">

      {/* 1. FLOATING INITIAL LOGO */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl 
                        bg-[#1B3C53] dark:bg-white
                        text-white dark:text-[#1B3C53] text-3xl font-black shadow-xl
                        group-hover:bg-[#FF004D] group-hover:text-white group-hover:rotate-[360deg] group-hover:rounded-full transition-all duration-700">

          <span className={isBooked ? "group-hover:opacity-0 transition-opacity" : ""}>
            {initial}
          </span>

          {isBooked && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel && onCancel(id);
              }}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#FF004D] rounded-full"
            >
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 2. IDENTITY */}
      <div className="text-center mb-4 mt-2">
        <span className="inline-block text-[#FF004D] text-[9px] font-black uppercase tracking-[0.3em] mb-2">
          {formattedSpecialization}
        </span>
        <h3 className="text-xl font-black text-[#1B3C53] dark:text-white tracking-tighter flex items-center justify-center gap-2 uppercase">
          {name}
          {verified && <span className="text-[#FF004D] text-sm">✦</span>}
        </h3>
      </div>

      {/* 3. BIO */}
      <p className="text-[11px] text-[#456882] dark:text-gray-400 text-center mb-6 italic line-clamp-2 leading-relaxed opacity-80">
        "{bio || "Expert practitioner ready for system synchronization and personalized care."}"
      </p>

      {/* 4. STATS GRID */}
      <div className="mt-auto">
        <div className="grid grid-cols-2 border-t border-b border-[#1B3C53]/10 dark:border-white/10 py-4 mb-6">
          <div className="text-left border-r border-[#1B3C53]/10 dark:border-white/10 pr-2">
            <p className="text-[8px] font-black uppercase opacity-40 mb-1">
              {isBooked ? "SYNC_DATE" : "RANK_SCORE"}
            </p>
            <p className="text-[11px] font-black text-[#1B3C53] dark:text-white truncate">
              {isBooked ? date : `${Number(rating).toFixed(1)} ⭐`}
            </p>
          </div>
          <div className="pl-2 text-right">
            <p className="text-[8px] font-black uppercase opacity-40 mb-1">
              {isBooked ? "SYNC_TIME" : "STATUS"}
            </p>
            <p className={`text-[11px] font-black truncate ${isBooked ? "text-[#1B3C53] dark:text-white" : "text-emerald-500"}`}>
              {isBooked ? slot : "AVAILABLE"}
            </p>
          </div>
        </div>

        {/* 5. ACTION BUTTONS */}
        {isBooked ? (
          <div className="flex flex-col gap-2">
            {/* Main Action */}
            <button className="w-full py-3.5 bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#FF004D] dark:hover:bg-[#FF004D] dark:hover:text-white transition-all shadow-lg active:scale-95">
              Join_Session
            </button>

            {/* New: Ask a Question Button */}
            <button
              onClick={handleAskQuestion}
              className="w-full py-2.5 border-2 border-[#1B3C53]/20 dark:border-white/20 text-[#1B3C53] dark:text-white/60 rounded-xl font-black text-[9px] uppercase tracking-widest hover:border-[#FF004D] hover:text-[#FF004D] transition-all"
            >
              Ask_a_Question
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (typeof onViewProfile === "function") onViewProfile(id);
                else navigate(`/profile/${id}`);
              }}
              className="flex-1 py-3 border-2 border-[#1B3C53] dark:border-white text-[#1B3C53] dark:text-white text-[9px] font-black uppercase rounded-xl transition-all active:scale-90"
            >
              Profile
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/book-session/${id}`);
              }}
              className="flex-[2] py-3 bg-[#FF004D] text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-[0_4px_0_0_#A30031] active:translate-y-1 active:shadow-none transition-all"
            >
              Book_Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PractitionerCard;