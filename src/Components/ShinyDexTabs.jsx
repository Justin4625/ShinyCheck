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
                            px-5 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-full backdrop-blur-md border border-gray-300 transition-all duration-300
                            ${isActive
                            ? "bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 text-gray-900 shadow-md"
                            : "bg-white text-gray-800 hover:bg-gray-100 hover:shadow-sm"}
                        `}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}