import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import practitioners from "../data/practitioners.json";

// ------------------ HELPERS ------------------
const TIME_SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const getSessionCost = (rating) => {
  if (rating >= 5) return 500;
  if (rating >= 4) return 400;
  return 300;
};

export default function BookSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const practitioner = practitioners.find((p) => String(p.id) === String(id));
  const rating = practitioner?.rating ?? 3;
  const cost = useMemo(() => getSessionCost(rating), [rating]);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification((prev) => ({ ...prev, show: false })), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  if (!practitioner) return null;

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) {
      setNotification({ show: true, message: "Select date and time slot", type: "error" });
      return;
    }
    const session = { id: Date.now(), practitionerId: practitioner.id, name: practitioner.name, date: selectedDate, slot: selectedSlot, cost };
    const existing = JSON.parse(localStorage.getItem("bookedSessions") || "[]");
    localStorage.setItem("bookedSessions", JSON.stringify([...existing, session]));
    setShowPopup(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F4F2EE] dark:bg-[#090E14] text-[#1B3C53] dark:text-white font-mono flex items-center justify-center p-6 transition-colors duration-500">

      {/* 1. SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1B3C53]/40 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white dark:bg-[#0A1118] border-2 border-[#1B3C53] dark:border-white/20 p-10 rounded-[3rem] text-center shadow-2xl max-w-sm w-full relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF004D]" />
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-black mb-2 uppercase tracking-tighter">Session_Linked</h2>
            <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl mb-8 text-left space-y-1">
              <p className="text-[10px] font-black opacity-40">TIMESTAMP: {selectedDate} | {selectedSlot}</p>
              <p className="text-[10px] font-black opacity-40">EXPERT: {practitioner.name.toUpperCase()}</p>
            </div>
            <button onClick={() => navigate("/activity")} className="w-full py-4 bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] font-black uppercase tracking-widest rounded-xl hover:bg-[#FF004D] dark:hover:bg-[#FF004D] dark:hover:text-white transition-all active:scale-95">View_Activity</button>
          </div>
        </div>
      )}

      {/* 2. MAIN MODULE */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0A1118] border-2 border-[#1B3C53] dark:border-white/10 rounded-[3rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden">

        {/* LEFT: EXPERT IDENTITY */}
        <div className="lg:w-1/2 p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#1B3C53]/10 flex flex-col justify-between">
          <div>
            <button onClick={() => navigate(-1)} className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 hover:opacity-100 hover:text-[#FF004D] mb-12 block">← Abort_Sync</button>

            <div className="relative w-20 h-20 bg-[#1B3C53] dark:bg-white flex items-center justify-center rounded-[1.5rem] shadow-xl mb-8 transition-transform duration-700 hover:rotate-[360deg]">
              <span className="text-4xl font-black text-white dark:text-[#1B3C53]">{practitioner.name.charAt(0)}</span>
              {practitioner.verified && <div className="absolute -top-2 -right-2 bg-[#FF004D] text-white text-[8px] p-1 px-2 rounded-lg font-black tracking-widest">VERIFIED</div>}
            </div>

            <p className="text-[10px] font-black text-[#FF004D] tracking-[0.4em] mb-2 uppercase">{practitioner.specialization}</p>
            <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.85] mb-6">{practitioner.name}</h1>

            <div className="grid grid-cols-2 border-t border-black/5 dark:border-white/10 py-6 mt-8">
              <div>
                <p className="text-[8px] font-black opacity-30 uppercase tracking-widest mb-1">Session_Fee</p>
                <p className="text-xl font-black">₹{cost}</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-black opacity-30 uppercase tracking-widest mb-1">Expert_Rank</p>
                <p className="text-xl font-black text-[#FF004D]">{rating}.0_SCORE</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: SCHEDULER */}
        <div className="lg:w-1/2 p-10 lg:p-16 bg-[#F8F9FA] dark:bg-white/[0.02]">
          <div className="max-w-sm mx-auto space-y-10">
            <header>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Scheduler_Module</h2>
              <p className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em] mt-1">Status: Ready_to_link</p>
            </header>

            <div className="space-y-8">
              {/* STEP 1: DATE */}
              <div>
                <label className="text-[10px] font-black opacity-40 uppercase tracking-widest block mb-4">01. Select_Date</label>
                <input
                  type="date"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-4 bg-white dark:bg-[#1B3C53] border-2 border-black/5 dark:border-white/10 rounded-xl font-black text-xs uppercase outline-none focus:border-[#FF004D] transition-all"
                />
              </div>

              {/* STEP 2: SLOTS */}
              <div>
                <label className="text-[10px] font-black opacity-40 uppercase tracking-widest block mb-4">02. Choose_Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 text-[9px] font-black rounded-lg border-2 transition-all 
                        ${selectedSlot === slot
                          ? "bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] border-[#1B3C53] dark:border-white"
                          : "bg-transparent border-black/5 dark:border-white/5 opacity-50 hover:opacity-100"}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ACTION: CONFIRM */}
            <button
              onClick={handleBook}
              disabled={!selectedDate || !selectedSlot}
              className="group/btn relative w-full py-6 bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.3em] 
                         shadow-[0_6px_0_0_#0D1D29] dark:shadow-[0_6px_0_0_#CBD5E1] transition-all active:translate-y-1 active:shadow-none overflow-hidden disabled:opacity-30"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">Confirm_Booking →</div>
              <div className="absolute inset-0 bg-[#FF004D] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}