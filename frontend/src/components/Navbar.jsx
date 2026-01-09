import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("app-theme") || "light");
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  useEffect(() => {
    localStorage.setItem("app-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return [theme, toggleTheme];
};

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, toggleTheme] = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/bookTherapy", label: "Therapy", icon: "🩺" },
    { path: "/products", label: "Market", icon: "🛍" },
    { path: "/community", label: "Collective", icon: "👥" },
    { path: "/ai-recommendation", label: "Diagnostics", icon: "🤖" },
    { path: "/activity", label: "Activity", icon: "📟" },

  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 py-4 md:px-10">

      {/* THE FLOATING DOCK */}
      <nav className={`
        relative mx-auto max-w-7xl transition-all duration-700 font-mono
        ${isScrolled ? "rounded-[3rem] py-3 px-8 shadow-[0_0_50px_rgba(255,0,77,0.15)]" : "rounded-[2rem] py-5 px-6"}
        ${theme === 'dark' ? "bg-black/40 border-white/10" : "bg-white/40 border-black/5"}
        backdrop-blur-3xl border group overflow-hidden
      `}>

        {/* HOLOGRAPHIC SCANLINE (Travels across the border) */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF004D] to-transparent animate-laser-move opacity-50" />

        <div className="flex items-center justify-between relative z-10">

          {/* LOGO: THE "VITAL CORE" */}
          <Link to="/home" className="flex items-center gap-4 group/logo">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover/logo:opacity-40 transition-opacity duration-700" />
              <div className="w-12 h-12 bg-[#1B3C53] dark:bg-white rounded-2xl flex items-center justify-center transition-all duration-700 group-hover/logo:scale-110 group-hover/logo:rotate-[15deg] shadow-2xl">
                <span className="text-2xl animate-pulse">🌿</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className={`text-xl font-black tracking-tighter uppercase leading-none ${theme === 'dark' ? "text-white" : "text-[#1B3C53]"}`}>
                WELLNESS<span className="text-[#FF004D] animate-pulse">HUB</span>
              </h1>
              <span className="text-[8px] font-bold opacity-40 uppercase tracking-[0.4em] dark:text-white">Neural_Interface_v2</span>
            </div>
          </Link>

          {/* DESKTOP LINKS: CYBER-PILLS */}
          <div className="hidden lg:flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 
                    ${active ? "text-white" : "text-[#1B3C53]/60 dark:text-gray-400 hover:text-[#FF004D]"}
                  `}
                >
                  <span className="relative z-10 flex items-center gap-2 italic">
                    <span className="text-sm">{item.icon}</span> {item.label}
                  </span>

                  {/* Glowing Active Background */}
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF004D] to-blue-600 rounded-full shadow-[0_5px_15px_rgba(255,0,77,0.4)] transition-all animate-pulse-slow" />
                  )}

                  {/* Hover Underline Effect */}
                  {!active && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF004D] group-hover:w-1/2 transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CONTROL CLUSTER */}
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FF004D]/10 hover:border-[#FF004D]/30 transition-all text-xl shadow-lg">
              {theme === 'dark' ? "🔆" : "🌙"}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="hidden xl:flex flex-col items-end">
                  <span className="text-[9px] font-black opacity-40 uppercase dark:text-white">Authenticated</span>
                  <button onClick={logout} className="text-[10px] font-black text-[#FF004D] uppercase hover:underline">Log_Out</button>
                </div>
                <Link to="/dashboard" className="relative group/avatar">
                  <div className="absolute inset-0 bg-[#FF004D] rounded-2xl blur-lg opacity-0 group-hover/avatar:opacity-40 transition-opacity" />
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1B3C53] to-blue-900 border border-white/20 flex items-center justify-center text-white font-black text-lg transition-transform group-hover/avatar:rotate-12">
                    {currentUser.name.charAt(0)}
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="px-8 py-3 rounded-full bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-[#FF004D] dark:hover:bg-[#FF004D] dark:hover:text-white transition-all transform active:scale-95">
                Link_Node
              </Link>
            )}

            {/* Mobile Toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-11 h-11 flex items-center justify-center text-2xl dark:text-white bg-white/5 rounded-2xl">
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU (Cyber-Overlay) */}
      <div className={`
        lg:hidden fixed inset-0 z-40 transition-all duration-700 ease-in-out
        ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        backdrop-blur-3xl bg-black/80
      `}>
        <div className="flex flex-col items-center justify-center h-full space-y-10 px-10">
          <div className="text-[10px] font-black text-[#FF004D] tracking-[1em] uppercase animate-pulse">Main_Sequence</div>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="group flex flex-col items-center gap-2"
            >
              <span className="text-4xl group-hover:scale-125 transition-transform duration-500">{item.icon}</span>
              <span className="text-2xl font-black uppercase tracking-widest text-white italic group-hover:text-[#FF004D] transition-colors">
                {item.label}
              </span>
            </Link>
          ))}
          <button onClick={() => setMobileOpen(false)} className="mt-10 px-10 py-4 border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em]">
            Close_Link
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes laser-move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-laser-move { animation: laser-move 4s linear infinite; }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.02); }
        }
        .animate-pulse-slow { animation: pulse-slow 3s infinite ease-in-out; }
      `}</style>
    </div>
  );
}