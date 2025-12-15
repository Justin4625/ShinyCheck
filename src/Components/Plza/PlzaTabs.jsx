import React from "react";

export default function PlzaTabs({ activeTab, setActiveTab }) {
    return (
        <div className="flex flex-wrap lg:flex-nowrap gap-1 sm:gap-2 flex-1">
            {[
                {id: "active", label: "Active Hunts"},
                {id: "base", label: "Base Game"},
                {id: "mega", label: "Mega Dimension"},
                {id: "collection", label: "Collection"},
            ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)"}}
                        className={`
                    flex-1
                    min-w-[88px] sm:min-w-0 px-2 sm:px-4 py-2 sm:py-3
                    text-center font-bold text-[11px] sm:text-sm md:text-base
                    transition-all duration-300
                    ${isActive
                            ? "bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-white shadow-lg"
                            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                        }
                `}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}