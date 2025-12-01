import React from "react";

export default function ShinyDexTabs({ activeTab, setActiveTab }) {
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
        <div className="flex flex-wrap justify-center gap-3 mb-6 z-10">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            px-5 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-full backdrop-blur-md border border-gray-700/30 transition-all duration-300
                            ${isActive
                            ? "bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-[0_0_15px_rgba(255,0,255,0.7)]"
                            : "bg-white/10 text-gray-200 hover:bg-white/20 hover:shadow-[0_0_10px_rgba(200,100,255,0.4)]"}
                        `}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}