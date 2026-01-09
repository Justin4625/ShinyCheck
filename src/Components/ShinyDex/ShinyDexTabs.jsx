import React, { useMemo } from "react";

export default function ShinyDexTabs({ activeTab, setActiveTab }) {
    // --- POKÉMON GO THEME LOGICA ---
    const isPogoTheme = useMemo(() => {
        const now = new Date();
        const expiryDate = new Date(2026, 1, 1, 0, 0, 0);
        return now < expiryDate;
    }, []);

    const tabs = [
        { id: "kanto", label: "Kanto" },
        { id: "johto", label: "Johto" },
        { id: "hoenn", label: "Hoenn" },
        { id: "sinnoh", label: "Sinnoh" },
        { id: "unova", label: "Unova" },
        { id: "kalos", label: "Kalos" },
        { id: "alola", label: "Alola" },
        { id: "galar", label: "Galar" },
        { id: "hisui", label: "Hisui" },
        { id: "paldea", label: "Paldea" },
    ];

    return (
        <div className="relative w-full">
            <div className="flex flex-nowrap overflow-x-auto gap-2 pb-4 scrollbar-hide px-2 items-center">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                relative flex-shrink-0 transition-all duration-500
                                px-6 py-2 rounded-2xl font-black italic text-[11px] uppercase tracking-widest
                                ${isActive
                                ? isPogoTheme
                                    ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-105 z-10'
                                    : 'bg-[#ff4d29] text-white shadow-lg shadow-orange-200 scale-105 z-10'
                                : isPogoTheme
                                    ? 'bg-white border border-emerald-100 text-emerald-400 hover:border-emerald-500 hover:text-emerald-500'
                                    : 'bg-white border border-slate-200 text-slate-400 hover:border-[#ff4d29] hover:text-[#ff4d29]'
                            }
                            `}
                        >
                            {isActive && (
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                        isPogoTheme ? 'bg-emerald-400' : 'bg-cyan-400'
                                    }`}></span>
                                    <span className={`relative inline-flex rounded-full h-3 w-3 border border-white ${
                                        isPogoTheme ? 'bg-emerald-600' : 'bg-cyan-500'
                                    }`}></span>
                                </span>
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
            {isPogoTheme && (
                <div className="flex justify-center mt-2">
                    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
                </div>
            )}
        </div>
    );
}