import React from "react";

export default function CollectionFilter({filter, setFilter, searchQuery, setSearchQuery, totalCount, plzaCount, svCount, pogoCount}) {
    return (
        <div className="relative z-10 max-w-6xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-center gap-4">

            {/* Filters - Pill stijl */}
            <div className="flex flex-wrap justify-center gap-2">
                {[
                    { id: "all", label: "All Games", count: totalCount, activeClass: "border-slate-500 text-slate-700" },
                    { id: "PLZA", label: "Legends: Z-A", count: plzaCount, activeClass: "border-cyan-500 text-cyan-600" },
                    { id: "SV", label: "Scarlet & Violet", count: svCount, activeClass: "border-orange-500 text-orange-600" },
                    { id: "POGO", label: "Pokémon GO", count: pogoCount, activeClass: "border-emerald-500 text-emerald-600" }
                ].map((tab) => {
                    const isActive = filter === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id)}
                            className={`px-5 py-2 rounded-full font-black italic text-[10px] tracking-widest uppercase transition-all duration-300 border-2
                                ${isActive
                                ? `bg-white shadow-xl scale-105 z-10 ${tab.activeClass}`
                                : "bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/30 hover:text-white"}`}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    );
                })}
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-72 bg-white/5 backdrop-blur-md p-2 rounded-3xl border border-white/10 shadow-2xl">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="SEARCH COLLECTION..."
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-100 rounded-2xl text-[10px] font-bold text-slate-700 focus:border-cyan-400 outline-none transition-all placeholder:text-slate-300 shadow-inner"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}