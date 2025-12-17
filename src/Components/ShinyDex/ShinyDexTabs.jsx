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
        <div className="relative w-full overflow-hidden bg-slate-200/50 p-2 rounded-[2rem] border border-white/50 shadow-inner">
            {/* Scrollbare container met verborgen scrollbar */}
            <div className="flex flex-nowrap overflow-x-auto gap-2 pb-1 px-2 scrollbar-hide items-center h-14">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                relative flex-shrink-0 min-w-[95px] h-10 transition-all duration-300
                                font-black italic text-[10px] uppercase tracking-tighter
                                flex items-center justify-center
                                ${isActive ? 'z-10 scale-110' : 'z-0 opacity-70 hover:opacity-100'}
                            `}
                            style={{
                                // Rotom UI gebruikt vaak trapezium-vormen
                                clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                            }}
                        >
                            {/* De knop achtergrond */}
                            <div className={`
                                absolute inset-0 transition-all duration-300
                                ${isActive
                                ? "bg-gradient-to-br from-[#ff6b4a] to-[#ff4d29] shadow-[0_4px_10px_rgba(255,77,41,0.4)]"
                                : "bg-white hover:bg-slate-50"}
                            `}></div>

                            {/* Glans effect voor actieve tab */}
                            {isActive && (
                                <div className="absolute top-0 left-0 w-full h-[50%] bg-white/20 pointer-events-none"></div>
                            )}

                            {/* Tekst */}
                            <span className={`relative z-20 ${isActive ? "text-white" : "text-slate-500"}`}>
                                {tab.label}
                            </span>

                            {/* Elektrische indicator onderaan bij actief */}
                            {isActive && (
                                <div className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-cyan-300 shadow-[0_0_10px_cyan] rounded-full animate-pulse"></div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Subtiele indicatie dat je kunt scrollen */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-1.5 h-6 bg-slate-300 rounded-full opacity-20"></div>
            </div>
        </div>
    );
}