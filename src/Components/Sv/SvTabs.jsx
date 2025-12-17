import React from "react";

export default function SvTabs({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "base", label: "Base Game", disabled: false },
        { id: "teal", label: "Teal Mask", disabled: true },
        { id: "indigo", label: "Indigo Disk", disabled: true },
        { id: "collection", label: "Collection", disabled: false },
        { id: "active", label: "Active Hunts", disabled: false },
    ];

    return (
        <div className="flex flex-wrap lg:flex-nowrap w-full gap-1">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        disabled={tab.disabled}
                        onClick={() => !tab.disabled && setActiveTab(tab.id)}
                        style={{
                            clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                        }}
                        className={`
                            relative flex-1 h-10 px-2 font-bold text-[10px] sm:text-xs transition-all duration-300
                            ${tab.disabled
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-70"
                            : isActive
                                ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md z-20"
                                : "bg-white/80 text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                        }
                        `}
                    >
                        <span className="relative block text-center">
                            {tab.label}
                            {tab.disabled && (
                                <span className="absolute -bottom-3 left-0 w-full text-[7px] uppercase tracking-tighter text-red-500 whitespace-nowrap">
                                    Coming Soon
                                </span>
                            )}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}