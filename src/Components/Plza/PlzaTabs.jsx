import React from "react";

export default function PlzaTabs({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "active", label: "Active Hunts" },
        { id: "base", label: "Base Game" },
        { id: "mega", label: "Mega Dimension" },
    ];

    return (
        <div className="flex flex-nowrap w-full gap-1 sm:gap-2">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex-1 px-1 sm:px-4 py-2 sm:py-2.5 
                            rounded-lg sm:rounded-xl font-black italic 
                            text-[8px] min-[380px]:text-[10px] sm:text-xs 
                            tracking-tighter min-[380px]:tracking-widest uppercase 
                            transition-all duration-300 border-[1.5px] sm:border-2
                            ${isActive
                            ? "bg-white border-cyan-500 text-cyan-600 shadow-sm z-10 scale-[1.02]"
                            : "bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-200"
                        }
                        `}
                    >
                        <span className="relative z-10 block truncate">{tab.label}</span>

                        {isActive && (
                            <div className="h-0.5 sm:h-1 w-4 sm:w-6 bg-pink-500 mx-auto mt-0.5 rounded-full animate-pulse" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}