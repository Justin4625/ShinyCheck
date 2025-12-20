import React, { useState, useMemo, useEffect } from "react";
import shinyDexPart1 from "../../data/ShinyDexData.js";
import shinyDexPart2 from "../../data/ShinyDexData2.js";
import shinyDexPart3 from "../../data/ShinyDexData3.js";

import usePokemon from "../FetchPokemon.jsx";
import ShinyDexCards from "./ShinyDexCards.jsx";
import ShinyDexTabs from "./ShinyDexTabs.jsx";

// Modals
import ShinyDexModal from "./ShinyDexModal.jsx";
import PlzaCollectionModal from "../Plza/PlzaCollectionModal.jsx";
import SvCollectionModal from "../Sv/SvCollectionModal.jsx";

const fullShinyDex = [...shinyDexPart1, ...shinyDexPart2, ...shinyDexPart3];

export default function ShinyDex() {
    const [activeTab, setActiveTab] = useState("kanto");
    const [searchQuery, setSearchQuery] = useState("");
    const [showUnregisteredOnly, setShowUnregisteredOnly] = useState(false);

    // Modal states
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [selectedEntry, setSelectedEntry] = useState(null);

    // Blokkeer scrollen op de achtergrond als er een modal open is
    useEffect(() => {
        if (selectedPokemon || selectedEntry) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedPokemon, selectedEntry]);

    const regionEntries = fullShinyDex.filter((p) => p.region === activeTab);
    const { pokemonList } = usePokemon(regionEntries);

    const isCaught = (name) => {
        const lowerName = name.toLowerCase();
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("plza_shinyData_") || key.startsWith("sv_shinyData_")) {
                const data = JSON.parse(localStorage.getItem(key));
                if (data?.pokemonName?.toLowerCase() === lowerName) return true;
            }
        }
        return false;
    };

    const globalStats = useMemo(() => {
        const caughtNames = new Set();
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("plza_shinyData_") || key.startsWith("sv_shinyData_")) {
                const data = JSON.parse(localStorage.getItem(key));
                if (data?.pokemonName) caughtNames.add(data.pokemonName.toLowerCase());
            }
        }
        const count = caughtNames.size;
        const total = fullShinyDex.length;
        const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
        return { count, total, percentage };
    }, []);

    const regionStats = useMemo(() => {
        let count = 0;
        regionEntries.forEach(p => {
            if (isCaught(p.name)) count++;
        });
        const total = regionEntries.length;
        const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
        return { count, total, percentage };
    }, [regionEntries]);

    const filteredList = pokemonList.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toString().includes(searchQuery);
        const matchesUnregistered = showUnregisteredOnly ? !isCaught(p.name) : true;
        return matchesSearch && matchesUnregistered;
    });

    return (
        <div className="relative min-h-screen bg-[#f8fafc] p-4 sm:p-8 font-sans overflow-hidden text-slate-900">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-200/40 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 px-4 gap-6">
                    <div className="flex flex-col w-full md:w-auto">
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                            Shiny<span className="text-[#ff4d29]">Check</span>
                        </h1>

                        <div className="mt-4 w-full md:w-96">
                            <div className="flex justify-between items-end mb-1">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Global National Dex</span>
                                    <span className="text-[12px] font-black text-slate-600 mt-1 italic">
                                        {globalStats.count} <span className="text-slate-400">/</span> {globalStats.total}
                                    </span>
                                </div>
                                <span className="text-[13px] font-black text-[#ff4d29]">{globalStats.percentage}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
                                <div
                                    className="h-full bg-[#ff4d29] transition-all duration-1000 shadow-[0_0_8px_rgba(255,77,41,0.4)]"
                                    style={{ width: `${globalStats.percentage}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        {/* De Reset knop is hier verwijderd */}

                        <div className="w-full md:w-80 bg-white/80 backdrop-blur-md border border-slate-200 p-2 px-4 rounded-2xl shadow-sm flex items-center gap-3 group focus-within:border-[#ff4d29] transition-all">
                            <svg className="w-4 h-4 text-slate-400 group-focus-within:text-[#ff4d29]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="SEARCH NAME OR ID..."
                                className="w-full bg-transparent border-none outline-none text-[10px] font-black uppercase italic tracking-widest text-slate-700 placeholder:text-slate-300"
                            />
                        </div>
                    </div>
                </div>

                <ShinyDexTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="mt-8 bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white shadow-xl p-6 sm:p-10 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                    <div className="relative z-10 mb-8 flex flex-col lg:flex-row justify-between items-center gap-6 bg-white/50 p-5 rounded-3xl border border-white shadow-sm">
                        <div className="flex flex-col items-center lg:items-start shrink-0">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Region Completion</span>
                            <h2 className="text-xl font-black uppercase italic text-slate-800">{activeTab} Dex</h2>
                        </div>

                        <div className="flex flex-col items-center w-full max-w-md">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-2xl font-black text-slate-900">{regionStats.count}</span>
                                <span className="text-slate-400 font-bold">/</span>
                                <span className="text-sm font-bold text-slate-500">{regionStats.total}</span>
                                <span className="ml-2 text-cyan-600 font-black italic">{regionStats.percentage}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden border border-white shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
                                    style={{ width: `${regionStats.percentage}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-slate-100/50 p-2 px-4 rounded-2xl border border-slate-200 shrink-0">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Unregistered</span>
                            <button
                                onClick={() => setShowUnregisteredOnly(!showUnregisteredOnly)}
                                className={`relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none ${showUnregisteredOnly ? 'bg-[#ff4d29]' : 'bg-slate-300'}`}
                            >
                                <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform duration-300 ${showUnregisteredOnly ? 'translate-x-5' : ''}`}></div>
                            </button>
                        </div>
                    </div>

                    <ShinyDexCards
                        displayedPokemon={filteredList}
                        onCardClick={(pokemon) => setSelectedPokemon(pokemon)}
                    />
                </div>
            </div>

            {selectedPokemon && (
                <ShinyDexModal
                    pokemon={selectedPokemon}
                    onClose={() => setSelectedPokemon(null)}
                    onSelectEntry={(entry) => setSelectedEntry(entry)}
                />
            )}

            {selectedEntry?.type === 'PLZA' && (
                <PlzaCollectionModal
                    data={selectedEntry.storedData}
                    pokemon={selectedPokemon}
                    originalId={selectedEntry.id}
                    shinyIndex={selectedEntry.shinyIndex}
                    onClose={() => setSelectedEntry(null)}
                    gameName="Pokémon Legends: Z-A"
                />
            )}
            {selectedEntry?.type === 'SV' && (
                <SvCollectionModal
                    data={selectedEntry.storedData}
                    pokemon={selectedPokemon}
                    originalId={selectedEntry.id}
                    shinyIndex={selectedEntry.shinyIndex}
                    onClose={() => setSelectedEntry(null)}
                    gameName="Pokémon Scarlet & Violet"
                />
            )}
        </div>
    );
}