import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.item || location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  if (!product) return null;

  const { _id, _name, _description, _price, _category, _stock } = product;
  const totalAmount = _price * quantity;

  const handleConfirmPurchase = () => {
    setLoading(true);
    setTimeout(() => {
      const purchases = JSON.parse(localStorage.getItem("purchasedItems") || "[]");
      const finalOrder = {
        _id: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        _userId: "USER-01",
        _productId: _id,
        _quantity: quantity,
        _totalAmount: totalAmount,
        _orderDate: new Date().toLocaleDateString(),
        _status: "COMPLETED"
      };
      localStorage.setItem("purchasedItems", JSON.stringify([...purchases, finalOrder]));
      setLoading(false);
      setShowPopup(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F4F2EE] dark:bg-[#090E14] font-mono flex items-center justify-center p-6 transition-colors duration-500">

      {/* 1. SUCCESS POPUP (The Elite Finish) */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1B3C53]/40 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white dark:bg-[#0A1118] border-2 border-[#1B3C53] dark:border-white/20 p-10 rounded-[3rem] text-center shadow-2xl max-w-sm w-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF004D]" />
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-black text-[#1B3C53] dark:text-white mb-2 uppercase tracking-tighter">Order_Confirmed</h2>
            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-8">Transaction Securely Synced</p>
            <button onClick={() => navigate("/products")} className="w-full py-4 bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] font-black uppercase tracking-widest rounded-xl hover:bg-[#FF004D] dark:hover:bg-[#FF004D] dark:hover:text-white transition-all active:scale-95">Return_to_Store</button>
          </div>
        </div>
      )}

      {/* 2. MAIN CHECKOUT MODULE */}
      <div className="relative w-full max-w-5xl h-fit lg:h-[600px] bg-white dark:bg-[#0A1118] border-2 border-[#1B3C53] dark:border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row transition-all group/card">

        {/* LEFT: PRODUCT IDENTITY */}
        <div className="lg:w-1/2 p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#1B3C53]/10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <button onClick={() => navigate(-1)} className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 hover:opacity-100 hover:text-[#FF004D] transition-all mb-16 block">
              ← Abort_Purchase
            </button>

            {/* Center-Aligned Logo from Product Card */}
            <div className="relative w-20 h-20 bg-[#1B3C53] dark:bg-white flex items-center justify-center rounded-[1.5rem] shadow-xl mb-8 group-hover/card:rotate-[360deg] transition-all duration-700 ease-in-out">
              <span className="text-4xl font-black text-white dark:text-[#1B3C53]">{_name.charAt(0)}</span>
            </div>

            <p className="text-[10px] font-black text-[#FF004D] tracking-[0.4em] mb-2 uppercase">{_category}</p>
            <h1 className="text-4xl lg:text-5xl font-black text-[#1B3C53] dark:text-white uppercase tracking-tighter leading-[0.85] mb-6">
              {_name}
            </h1>
            <p className="text-[11px] leading-relaxed text-[#456882] dark:text-gray-400 italic opacity-70 border-l-2 border-[#FF004D] pl-4">
              "{_description}"
            </p>
          </div>

          <div className="relative z-10 mt-12 flex items-center gap-4">
            <div className="px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">● Units_In_Stock: {_stock}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: TRANSACTION PORTAL */}
        <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-[#F8F9FA] dark:bg-white/[0.02]">
          <div className="max-w-sm mx-auto w-full space-y-10">

            <header>
              <h2 className="text-2xl font-black text-[#1B3C53] dark:text-white uppercase tracking-tighter">Secure_Checkout</h2>
              <p className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em] mt-1">Order_Ref: #{_id.substring(0, 8)}</p>
            </header>

            {/* DATA GRID */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1B3C53]/10 pb-6">
                <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">Adjust_Quantity</span>
                <div className="flex items-center bg-white dark:bg-[#1B3C53] border-2 border-[#1B3C53]/10 rounded-xl p-1">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center font-black hover:text-[#FF004D] transition-colors">-</button>
                  <span className="w-12 text-center font-black text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(_stock, quantity + 1))} className="w-10 h-10 flex items-center justify-center font-black hover:text-[#FF004D] transition-colors">+</button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">Grand_Total</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-[#FF004D] tracking-tighter">₹{totalAmount}</span>
                  <span className="text-[10px] font-black opacity-40 uppercase">INR</span>
                </div>
              </div>
            </div>

            {/* THE TACTILE BUTTON */}
            <button
              onClick={handleConfirmPurchase}
              disabled={loading}
              className="group/btn relative w-full py-6 bg-[#1B3C53] dark:bg-white text-white dark:text-[#1B3C53] rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.3em] 
                         shadow-[0_6px_0_0_#0D1D29] dark:shadow-[0_6px_0_0_#CBD5E1] transition-all active:translate-y-1 active:shadow-none overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {loading ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : "Confirm_Payment →"}
              </div>
              <div className="absolute inset-0 bg-[#FF004D] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </button>

            <p className="text-[8px] font-black opacity-20 text-center uppercase tracking-widest">
              Verified_User: USR_ALPH_99 | Status: Online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}