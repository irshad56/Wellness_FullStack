import React, { useEffect, useState } from "react";
import products from "../utils/products";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Get unique categories for the filter tabs
  const categories = ["All", ...new Set(products.map(p => p._category))];

  useEffect(() => {
    const query = search.toLowerCase();
    const results = products.filter((product) => {
      const matchesSearch =
        (product._name ?? "").toLowerCase().includes(query) ||
        (product._description ?? "").toLowerCase().includes(query);

      const matchesCategory = activeCategory === "All" || product._category === activeCategory;

      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(results);
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-[#EFECE3] dark:bg-[#0A1118] text-[#1B3C53] dark:text-gray-200 transition-colors duration-700 p-4 md:p-8 lg:p-12 relative overflow-hidden font-mono">

      {/* 1. CYBERNETIC BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", backgroundSize: '80px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF004D]/5 to-transparent animate-scan-vertical" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">

        {/* 2. HEADER SECTION */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-[#FF004D] shadow-[0_0_15px_#FF004D]" />
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
                Bio <span className="text-blue-500">Market</span>
              </h1>
            </div>
            <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] opacity-40 uppercase pl-5">
              Secure_Transaction_Protocol_v4.0
            </p>
          </div>

          {/* SEARCH HUD */}
          <div className="w-full md:w-[400px] group">
            <div className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-white/5 border border-[#1B3C53]/10 dark:border-white/10 backdrop-blur-xl p-4 transition-all focus-within:border-[#FF004D]/50 shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="animate-pulse">🛰️</span>
                <input
                  type="text"
                  placeholder="QUERY_PRODUCT_ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent outline-none text-xs font-black uppercase tracking-widest placeholder-[#1B3C53]/30 dark:placeholder-white/20"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-[1px] bg-[#FF004D] w-0 group-focus-within:w-full transition-all duration-700" />
            </div>
          </div>
        </header>

        {/* 3. CATEGORY SELECTOR (Neural Tabs) */}
        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 border
                ${activeCategory === cat
                  ? "bg-[#1B3C53] text-white border-[#1B3C53] dark:bg-white dark:text-[#1B3C53] shadow-[0_10px_20px_rgba(0,0,0,0.2)] scale-105"
                  : "bg-white/20 border-black/5 dark:border-white/10 hover:border-[#FF004D]/40"}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 4. PRODUCT GRID WITH ENTRANCE ANIMATION */}
        {filteredProducts.length === 0 ? (
          <div className="h-[40vh] flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-[#1B3C53]/20 dark:border-white/10 animate-pulse">
            <span className="text-4xl mb-4">🚫</span>
            <p className="text-xs font-black uppercase tracking-widest opacity-40">Zero_Results_Found</p>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-24 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="h-full animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative group">
                  {/* Holographic frame effect around the card */}
                  <div className="absolute -inset-2 bg-gradient-to-b from-[#FF004D]/20 to-blue-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <ProductCard product={product} />

                  {/* Subtle ID overlay */}
                  <div className="absolute top-4 right-4 text-[7px] font-black opacity-0 group-hover:opacity-30 transition-opacity uppercase tracking-widest">
                    IDX_{product._id.substring(0, 6)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scan-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-scan-vertical {
          animation: scan-vertical 10s linear infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}