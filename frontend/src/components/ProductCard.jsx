import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProductCard({ product, onRemove, isHistory = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActivityPage = location.pathname.includes("activity");

  // DATA RECOVERY
  const d = product?.item || product?.product || product;
  const id = d?._id || d?.id;
  const name = d?._name || d?.name || "Product";
  const initial = name.charAt(0).toUpperCase();

  /**
   * --- PURCHASE HISTORY UI (BIGGER PREMIUM CARD) ---
   */
  if (isHistory) {
    return (
      <div className="group relative bg-white dark:bg-[#1B3C53] rounded-[2.5rem] p-8 border-2 border-emerald-500/20 shadow-xl flex flex-col items-center justify-center text-center transition-all hover:border-emerald-500/40 min-h-[320px]">
        {/* Removable Action - Red Close Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(id); }}
          className="absolute top-6 right-6 w-10 h-10 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white z-10 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Large Initial Circle */}
        <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center font-black text-5xl shadow-lg shadow-emerald-500/20 mb-6 rotate-3">
          {initial}
        </div>

        {/* Item Info */}
        <div className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-2">Verified Purchase</p>
          <h3 className="text-2xl font-black text-[#1B3C53] dark:text-white leading-tight px-4">
            {name}
          </h3>
        </div>

        {/* Non-Clickable Status Button */}
        <div className="w-full max-w-[200px] py-4 bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 cursor-default border-b-4 border-emerald-700">
          Order Completed
        </div>
      </div>
    );
  }

  /**
   * --- REGULAR STORE / CART UI ---
   */
  const description = d?._description || d?.description || d?.bio || "No description available";
  const price = d?._price || d?.price || product?.totalPrice || "0";
  const category = d?._category || d?.category || "Wellness";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    if (!existingCart.some((item) => (item._id || item.id) === id)) {
      localStorage.setItem("cartItems", JSON.stringify([...existingCart, d]));
    }
    navigate("/activity");
  };

  return (
    <div className="group relative rounded-[2rem] bg-white dark:bg-[#234C6A] shadow-xl border border-white/40 dark:border-white/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-6 pt-12 flex flex-col h-full">

      {/* 1. TOP CIRCLE LOGO */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#7E2553] via-[#FF004D] to-[#7E2553] text-white text-3xl font-black shadow-[0_10px_20px_-5px_rgba(255,0,77,0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <div className="absolute inset-[2px] rounded-2xl border border-white/20" />
          <span className={onRemove ? "group-hover:opacity-0 transition-opacity" : ""}>{initial}</span>
          {onRemove && (
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(id); }}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#FF004D] rounded-2xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="text-center mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-[#8FABD4]/10 text-[#456882] dark:text-[#8FABD4] text-[10px] font-bold uppercase tracking-widest mb-2">{category}</span>
        <h3 className="text-xl font-black text-[#1B3C53] dark:text-white tracking-tight line-clamp-1">{name}</h3>
      </div>

      <p className="text-sm text-[#456882] dark:text-[#8FABD4]/80 text-center mb-6 line-clamp-2 leading-relaxed h-[2.5rem]">
        {description}
      </p>

      <div className="mt-auto">
        <div className="grid grid-cols-2 gap-3 p-4 bg-[#EFECE3] dark:bg-[#1B3C53]/50 rounded-2xl border border-white/50 dark:border-white/5 mb-6">
          <div className="text-left border-r border-[#8FABD4]/20">
            <p className="text-[9px] font-bold uppercase text-[#456882]/70 mb-0.5">Price</p>
            <p className="text-lg font-black text-[#1B3C53] dark:text-white truncate">₹{price}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold uppercase text-[#456882]/70 mb-0.5">Status</p>
            <p className="text-xs font-bold text-emerald-500 truncate">In Stock</p>
          </div>
        </div>

        <div className="min-h-[50px]">
          {isActivityPage ? (
            <button
              onClick={() => navigate("/BuyNow", { state: { item: d } })}
              className="group/buy w-full relative flex items-center justify-center gap-2 py-3.5 rounded-xl text-[12px] font-black uppercase tracking-widest overflow-hidden bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] shadow-lg transition-all active:scale-95"
            >
              <div className="absolute inset-0 bg-[#FF004D] translate-y-full group-hover/buy:translate-y-0 transition-transform duration-300" />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 group-hover/buy:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="relative z-10 group-hover/buy:tracking-wider transition-all duration-300">BUY NOW</span>
            </button>
          ) : (
            <div className="flex gap-3">
              <button onClick={handleAddToCart} className="group/btn flex-1 relative flex items-center justify-center py-3.5 rounded-xl bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#8FABD4] border-2 border-[#1B3C53]/10 dark:border-white/10 transition-all hover:border-[#1B3C53] active:scale-95 overflow-hidden">
                <div className="absolute inset-0 bg-[#1B3C53]/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10 flex items-center gap-1.5">
                  <span className="text-xl font-black group-hover/btn:animate-bounce leading-none">+</span>
                  <span className="text-[12px] font-black uppercase tracking-tighter">Cart</span>
                </div>
              </button>

              <button onClick={() => navigate("/BuyNow", { state: { item: d } })} className="group/buy flex-[1.5] relative flex items-center justify-center gap-2 py-3.5 rounded-xl text-[12px] font-black uppercase overflow-hidden bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] shadow-lg transition-all active:scale-95">
                <div className="absolute inset-0 bg-[#FF004D] translate-y-full group-hover/buy:translate-y-0 transition-transform duration-300" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 group-hover/buy:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="relative z-10 group-hover/buy:tracking-widest transition-all duration-300">Buy Now</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
