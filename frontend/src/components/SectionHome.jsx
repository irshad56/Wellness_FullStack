import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function SectionHome({
  title,
  description,
  buttonText,
  redirectTo,
  image,
  bgColor = "",
  reverse = false,
  isFirst = false,
}) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`
        ${bgColor} relative overflow-hidden font-mono
        ${isFirst ? "pt-24 pb-20" : "py-24"}
        transition-all duration-1000
      `}
    >
      {/* Background Decorative Element */}
      <div className={`absolute top-0 ${reverse ? 'right-0' : 'left-0'} w-64 h-64 bg-[#FF004D]/5 blur-[120px] pointer-events-none`} />

      <div
        className={`max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16 
        ${reverse ? "md:flex-row-reverse" : ""} 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
        transition-all duration-[1200ms] ease-out`}
      >
        {/* IMAGE CONTAINER (40%) */}
        <div className="md:w-2/5 w-full group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF004D] to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative">
            <img
              src={image}
              alt={title}
              className="w-full h-[400px] object-cover rounded-[2.5rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1"
            />
            {/* Animated Scanline Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-1/2 w-full animate-scan-vertical pointer-events-none opacity-30" />
          </div>
        </div>

        {/* CONTENT (60%) */}
        <div className="md:w-3/5 w-full space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-12 bg-[#FF004D]" />
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[#FF004D]">System Module</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1B3C53] dark:text-white italic tracking-tighter uppercase leading-none">
              {title}
            </h2>
          </div>

          <p className="text-[#1B3C53]/70 dark:text-gray-400 text-lg leading-relaxed font-sans font-medium">
            {description}
          </p>

          <button
            onClick={() => navigate(redirectTo)}
            className="group relative px-10 py-5 overflow-hidden rounded-full bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] font-black uppercase tracking-[0.2em] text-xs transition-all hover:shadow-[0_0_30px_rgba(255,0,77,0.3)] active:scale-95"
          >
            <span className="relative z-10">{buttonText}</span>
            <div className="absolute inset-0 bg-[#FF004D] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-vertical {
          0% { top: -100%; }
          100% { top: 100%; }
        }
        .animate-scan-vertical {
          animation: scan-vertical 4s linear infinite;
        }
      `}</style>
    </section>
  );
}