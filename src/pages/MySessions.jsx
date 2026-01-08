import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import PractitionerCard from "../components/PractitionerCard";

export default function MyActivity() {
  const [sessions, setSessions] = useState([]);
  const [cart, setCart] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    setSessions(JSON.parse(localStorage.getItem("bookedSessions") || "[]"));
    setCart(JSON.parse(localStorage.getItem("cartItems") || "[]"));
    setPurchases(JSON.parse(localStorage.getItem("purchasedItems") || "[]"));
  }, []);

  const cancelSession = (id) => {
    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    localStorage.setItem("bookedSessions", JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const updated = cart.filter(c => c._id !== id);
    setCart(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const removeFromHistory = (id) => {
    const updated = purchases.filter(p => p._id !== id);
    setPurchases(updated);
    localStorage.setItem("purchasedItems", JSON.stringify(updated));
  };

  return (
    <div className="relative min-h-screen p-6 md:p-12 bg-[#EFECE3] dark:bg-[#1B3C53] text-[#1B3C53] dark:text-white transition-colors duration-500 overflow-x-hidden">
      <svg className="fixed inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto space-y-20">
        <header className="border-b border-[#1B3C53]/10 dark:border-white/10 pb-8">
          <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#1B3C53] to-[#FF004D] dark:from-white dark:to-[#8FABD4]">
            My Activity
          </h1>
          <p className="mt-2 text-[#456882] dark:text-[#8FABD4] font-medium uppercase tracking-[0.2em] text-xs">Manage your wellness journey</p>
        </header>

        {/* Sessions Section */}
        <ActivitySection title="Booked Sessions" count={sessions.length}>
          {sessions.map((session, index) => (
            <PractitionerCard
              key={session.id || index}
              practitioner={session}
              isBooked={true}
              onCancel={cancelSession}
            />
          ))}
          {sessions.length === 0 && <EmptyState message="No upcoming sessions." />}
        </ActivitySection>

        {/* Cart Section - SHOWS "CHECKOUT NOW" */}
        <ActivitySection title="My Shopping Cart" count={cart.length} color="from-[#FF004D] to-[#FF7EB3]">
          {cart.map((item, index) => (
            <ProductCard
              key={item._id || index}
              product={item}
              onRemove={removeFromCart}
              isHistory={false} // Default behavior: shows Checkout
            />
          ))}
          {cart.length === 0 && <EmptyState message="Cart is empty." />}
        </ActivitySection>

        {/* Order History Section - SHOWS "SUCCESSFULLY PURCHASED" */}
        <ActivitySection title="Order History" count={purchases.length} color="from-[#8FABD4] to-[#456882]">
          {purchases.map((item, index) => (
            <ProductCard
              key={item._id || index}
              product={item}
              isHistory={true} // <--- CHANGED THIS FROM isPurchased to isHistory
              onRemove={removeFromHistory}
            />
          ))}
          {purchases.length === 0 && <EmptyState message="No orders yet." />}
        </ActivitySection>
      </div>
    </div>
  );
}

// ActivitySection and EmptyState components remain the same...
function ActivitySection({ title, count, children, color = "from-[#1B3C53] to-[#456882]" }) {
  return (
    <section className="space-y-12">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <div className={`h-[2px] flex-grow bg-gradient-to-r ${color} opacity-20 rounded-full`}></div>
        <span className={`px-4 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r ${color} shadow-lg`}>
          {count}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {children}
      </div>
    </section>
  );
}

function EmptyState({ message }) {
  return (
    <div className="col-span-full py-16 text-center rounded-[2.5rem] border-2 border-dashed border-[#456882]/20 dark:border-[#8FABD4]/10 text-[#456882] dark:text-[#8FABD4]/60 font-medium italic">
      {message}
    </div>
  );
}