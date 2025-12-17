import React from "react";

export default function PlzaTabs({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "active", label: "Active Hunts" },
        { id: "base", label: "Base Game" },
        { id: "mega", label: "Mega Dimension" },
        { id: "collection", label: "Collection" },
    ];

    return (
        <div className="flex flex-wrap lg:flex-nowrap w-full gap-1.5 sm:gap-2">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex-1 min-w-[100px] sm:min-w-0 px-2 sm:px-4 py-2 sm:py-2.5 
                            rounded-xl font-black italic text-[10px] sm:text-xs 
                            tracking-widest uppercase transition-all duration-300 border-2
                            ${isActive
                            ? "bg-white border-cyan-500 text-cyan-600 shadow-md shadow-cyan-100 scale-105 z-10"
                            : "bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-200"
                        }
                        `}
                    >
                        <span className="relative z-10">{tab.label}</span>

                        {/* Subtiele indicator onder de actieve tekst */}
                        {isActive && (
                            <div className="h-1 w-6 bg-pink-500 mx-auto mt-0.5 rounded-full animate-pulse" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}