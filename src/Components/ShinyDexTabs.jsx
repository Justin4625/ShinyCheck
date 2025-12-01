import React from "react";

export default function ShinyDexTabs({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "all", label: "All" },
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
        <div className="flex justify-center gap-2 sm:gap-4 mb-6 z-10">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 font-semibold rounded-full transition-all duration-300 ${
                            isActive
                                ? "bg-gradient-to-r from-purple-400 to-blue-500 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}