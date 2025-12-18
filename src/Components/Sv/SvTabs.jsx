import React from "react";

export default function SvTabs({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "active", label: "ACTIVE HUNTS", disabled: false },
        { id: "base", label: "BASE GAME", disabled: false },
        { id: "teal", label: "TEAL MASK", disabled: false },
        { id: "indigo", label: "INDIGO DISK", disabled: false },
    ];

    return (
        <div className="flex flex-wrap lg:flex-nowrap w-full gap-1.5 sm:gap-2">
            {tabs.map((tab, index) => {
                const isActive = activeTab === tab.id;
                const accentColor = index % 2 === 0 ? "from-[#ff4d00] to-[#ff6a00]" : "from-[#8c00ff] to-[#a23dff]";

                return (
                    <button
                        key={tab.id}
                        disabled={tab.disabled}
                        onClick={() => !tab.disabled && setActiveTab(tab.id)}
                        className={`
                            relative flex-1 min-w-[100px] h-9 transition-all duration-300 transform skew-x-[-15deg]
                            border-b-4 
                            ${tab.disabled
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                            : isActive
                                ? `bg-gradient-to-r ${accentColor} text-white border-black/20 shadow-lg scale-105 z-20`
                                : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                        }
                        `}
                    >
                        <span className="relative block text-center font-black italic text-[9px] sm:text-[10px] tracking-widest transform skew-x-[15deg]">
                            {tab.label}

                            {tab.disabled && (
                                <span className="absolute -bottom-4 left-0 w-full text-[7px] font-black uppercase tracking-tighter text-red-500 whitespace-nowrap">
                                    Coming Soon
                                </span>
                            )}

                            {isActive && !tab.disabled && (
                                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                            )}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}