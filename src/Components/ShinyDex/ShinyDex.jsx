import React, { useState, useMemo, useEffect } from "react";
import shinyDexPart1 from "../../data/ShinyDexData/ShinyDexData.js";
import shinyDexPart2 from "../../data/ShinyDexData/ShinyDexData2.js";
import shinyDexPart3 from "../../data/ShinyDexData/ShinyDexData3.js";

import usePokemon from "../FetchPokemon.jsx";
import ShinyDexCards from "./ShinyDexCards.jsx";
import ShinyDexTabs from "./ShinyDexTabs.jsx";

// Modals
import ShinyDexModal from "./ShinyDexModal.jsx";
import PlzaCollectionModal from "../Plza/PlzaCollectionModal.jsx";
import SvCollectionModal from "../Sv/SvCollectionModal.jsx";
import ShinyDexAddPokemon from "./ShinyDexAddPokemon.jsx";

const fullShinyDex = [...shinyDexPart1, ...shinyDexPart2, ...shinyDexPart3];

export default function ShinyDex() {
    const [activeTab, setActiveTab] = useState("kanto");
    const [searchQuery, setSearchQuery] = useState("");
    const [showUnregisteredOnly, setShowUnregisteredOnly] = useState(false);

    // Modal states
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [addingPokemon, setAddingPokemon] = useState(null); // Nieuwe state voor toevoegen
    const [refreshKey, setRefreshKey] = useState(0);

    // --- AUTOMATISCHE THEMA LOGICA ---
    const isNewYearTheme = useMemo(() => {
        const now = new Date();
        // Het thema is actief tot 3 januari 2026, 00:00:00
        const expiryDate = new Date(2026, 0, 3, 0, 0, 0);
        return now < expiryDate;
    }, []);

    // Blokkeer scrollen op de achtergrond als er een modal open is
    useEffect(() => {
        if (selectedPokemon || selectedEntry || addingPokemon) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedPokemon, selectedEntry, addingPokemon]);

    const regionEntries = fullShinyDex.filter((p) => p.region === activeTab);
    const { pokemonList, loading } = usePokemon(regionEntries);

    // Bepaalt of een Pokémon 'goud' is (gevangen) conform de logica in ShinyDexCards
    const isCaught = (baseName) => {
        const lowerBaseName = baseName.toLowerCase();
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("plza_shinyData_") || key.startsWith("sv_shinyData_")) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data?.pokemonName) {
                        const caughtName = data.pokemonName.toLowerCase();

                        // VERBETERDE LOGICA: Woordgrenzen om foutieve matches te voorkomen
                        const matchesName = caughtName === lowerBaseName ||
                            new RegExp(`\\b${lowerBaseName}\\b`).test(caughtName);

                        // Specifieke uitzondering voor Porygon
                        let isException = false;
                        if (lowerBaseName === "porygon") {
                            if (caughtName === "porygon2" || caughtName === "porygon-z") {
                                isException = true;
                            }
                        }

                        if (matchesName && !isException) return true;
                    }
                } catch (e) { /* eslint-disable-line no-unused-vars */ }
            }
        }
        return false;
    };

    const globalStats = useMemo(() => {
        const count = fullShinyDex.filter(p => isCaught(p.name)).length;
        const total = fullShinyDex.length;
        const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
        return { count, total, percentage };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshKey]);

    const regionStats = useMemo(() => {
        const count = regionEntries.filter(p => isCaught(p.name)).length;
        const total = regionEntries.length;
        const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
        return { count, total, percentage };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [regionEntries, refreshKey]);

    const filteredList = pokemonList.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toString().includes(searchQuery);
        const matchesUnregistered = showUnregisteredOnly ? !isCaught(p.name) : true;
        return matchesSearch && matchesUnregistered;
    });

    return (
        <div className={`relative min-h-screen p-4 sm:p-8 font-sans overflow-hidden transition-colors duration-1000 ${
            isNewYearTheme ? "bg-[#0f172a] text-slate-100" : "bg-[#f8fafc] text-slate-900"
        }`}>
            {/* Achtergrond elementen die veranderen op basis van thema */}
            <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${
                isNewYearTheme ? "bg-blue-600/20" : "bg-orange-200/40"
            }`}></div>
            <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${
                isNewYearTheme ? "bg-amber-500/10" : "bg-cyan-200/40"
            }`}></div>

            {isNewYearTheme && (
                <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse"></div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 px-4 gap-6">
                    <div className="flex flex-col w-full md:w-auto">
                        <h1 className={`text-4xl sm:text-6xl font-black tracking-tighter uppercase italic flex items-center transition-colors duration-1000 ${
                            isNewYearTheme ? "text-white" : "text-slate-900"
                        }`}>
                            Shiny<span className={isNewYearTheme ? "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "text-[#ff4d29]"}>Check</span>
                            {isNewYearTheme && <span className="text-2xl not-italic animate-bounce ml-3">🥂</span>}
                        </h1>

                        <div className="mt-4 w-full md:w-96">
                            <div className="flex justify-between items-end mb-1">
                                <div className="flex flex-col">
                                    <span className={`text-[10px] font-black uppercase tracking-widest leading-none ${
                                        isNewYearTheme ? "text-blue-300" : "text-slate-400"
                                    }`}>
                                        {"Global National Dex"}
                                    </span>
                                    <span className={`text-[14px] font-black mt-1 italic ${isNewYearTheme ? "text-white" : "text-slate-600"}`}>
                                        {globalStats.count} <span className="text-slate-500">/</span> {globalStats.total}
                                    </span>
                                </div>
                                <span className={`text-[15px] font-black ${isNewYearTheme ? "text-amber-400" : "text-[#ff4d29]"}`}>
                                    {globalStats.percentage}%
                                </span>
                            </div>
                            <div className={`h-3.5 w-full rounded-full overflow-hidden shadow-inner border transition-colors duration-1000 ${
                                isNewYearTheme ? "bg-slate-800/50 border-slate-700" : "bg-slate-200 border-transparent"
                            }`}>
                                <div
                                    className={`h-full transition-all duration-1000 ${
                                        isNewYearTheme ? "bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-[#ff4d29]"
                                    }`}
                                    style={{ width: `${globalStats.percentage}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`w-full md:w-80 backdrop-blur-xl border p-2 px-4 rounded-2xl flex items-center gap-3 transition-all duration-1000 ${
                        isNewYearTheme ? "bg-slate-800/40 border-slate-700 shadow-2xl" : "bg-white border-slate-200 shadow-sm"
                    }`}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={"SEARCH NAME OR ID..."}
                            className={`w-full bg-transparent border-none outline-none text-[10px] font-black uppercase italic tracking-widest ${
                                isNewYearTheme ? "text-white placeholder:text-slate-500" : "text-slate-700 placeholder:text-slate-300"
                            }`}
                        />
                    </div>
                </div>

                <ShinyDexTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className={`mt-8 backdrop-blur-3xl rounded-[3.5rem] border p-6 sm:p-10 relative overflow-hidden transition-all duration-1000 ${
                    isNewYearTheme ? "bg-slate-900/60 border-slate-700/50 shadow-[0_0_50px_rgba(0,0,0,0.3)]" : "bg-white/40 border-white shadow-xl"
                }`}>
                    <div className={`relative z-10 mb-10 flex flex-col lg:flex-row justify-between items-center gap-6 p-6 rounded-3xl border transition-all duration-1000 ${
                        isNewYearTheme ? "bg-slate-800/30 border-slate-700/50" : "bg-white/50 border-white shadow-sm"
                    }`}>
                        <div className="flex flex-col items-center lg:items-start shrink-0">
                            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isNewYearTheme ? "text-amber-400/80" : "text-slate-400"}`}>
                                {isNewYearTheme ? "Countdown to Mastery" : "Region Completion"}
                            </span>
                            <h2 className={`text-2xl font-black uppercase italic ${isNewYearTheme ? "text-white" : "text-slate-800"}`}>
                                {activeTab} {isNewYearTheme ? "Region" : "Dex"}
                            </h2>
                        </div>

                        <div className="flex flex-col items-center w-full max-w-md">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className={`text-3xl font-black transition-colors ${isNewYearTheme ? "text-white" : "text-slate-900"}`}>
                                    {regionStats.count}
                                </span>
                                <span className="text-slate-500 font-bold text-xl">/</span>
                                <span className={`text-lg font-bold ${isNewYearTheme ? "text-slate-400" : "text-slate-500"}`}>
                                    {regionStats.total}
                                </span>
                                <div className={`ml-3 px-3 py-1 rounded-lg border transition-all ${
                                    isNewYearTheme ? "bg-blue-500/20 border-blue-500/30" : "bg-transparent border-transparent"
                                }`}>
                                    <span className={`font-black italic ${isNewYearTheme ? "text-blue-400" : "text-cyan-600"}`}>
                                        {regionStats.percentage}%
                                    </span>
                                </div>
                            </div>
                            <div className={`h-2.5 w-full rounded-full overflow-hidden border transition-colors ${
                                isNewYearTheme ? "bg-slate-950 border-slate-800 shadow-inner" : "bg-slate-200 border-white"
                            }`}>
                                <div
                                    className={`h-full transition-all duration-1000 ${
                                        isNewYearTheme ? "bg-gradient-to-r from-blue-600 to-cyan-400" : "bg-gradient-to-r from-cyan-500 to-blue-500"
                                    }`}
                                    style={{ width: `${regionStats.percentage}%` }}
                                />
                            </div>
                        </div>

                        <div className={`flex items-center gap-4 p-3 px-5 rounded-2xl border transition-all ${
                            isNewYearTheme ? "bg-slate-950/50 border-slate-800" : "bg-slate-100/50 border-slate-200"
                        }`}>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                {"Unregistered"}
                            </span>
                            <button
                                onClick={() => setShowUnregisteredOnly(!showUnregisteredOnly)}
                                className={`relative w-12 h-6 rounded-full transition-all duration-500 focus:outline-none ${
                                    showUnregisteredOnly
                                        ? (isNewYearTheme ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]' : 'bg-[#ff4d29]')
                                        : 'bg-slate-300'
                                }`}
                            >
                                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-500 shadow-md ${showUnregisteredOnly ? 'translate-x-6' : ''}`}></div>
                            </button>
                        </div>
                    </div>

                    <ShinyDexCards
                        displayedPokemon={filteredList}
                        onCardClick={(p) => setSelectedPokemon(p)}
                        loading={loading}
                        searchQuery={searchQuery}
                    />
                </div>
            </div>

            {selectedPokemon && (
                <ShinyDexModal
                    pokemon={selectedPokemon}
                    onClose={() => setSelectedPokemon(null)}
                    onSelectEntry={(entry) => setSelectedEntry(entry)}
                    onAddPokemon={(p) => {
                        setAddingPokemon(p);
                        setSelectedPokemon(null);
                    }}
                    refreshKey={refreshKey}
                />
            )}

            {addingPokemon && (
                <ShinyDexAddPokemon
                    pokemon={addingPokemon}
                    onClose={() => setAddingPokemon(null)}
                    onSave={() => setRefreshKey(prev => prev + 1)}
                />
            )}

            {selectedEntry?.type === 'PLZA' && (
                <PlzaCollectionModal
                    data={selectedEntry.storedData}
                    pokemon={selectedEntry}
                    originalId={selectedEntry.id}
                    shinyIndex={selectedEntry.shinyIndex}
                    onClose={() => {
                        setSelectedEntry(null);
                        setRefreshKey(prev => prev + 1);
                    }}
                    gameName="Pokémon Legends: Z-A"
                />
            )}
            {selectedEntry?.type === 'SV' && (
                <SvCollectionModal
                    data={selectedEntry.storedData}
                    pokemon={selectedEntry}
                    originalId={selectedEntry.id}
                    shinyIndex={selectedEntry.shinyIndex}
                    onClose={() => {
                        setSelectedEntry(null);
                        setRefreshKey(prev => prev + 1);
                    }}
                    gameName="Pokémon Scarlet & Violet"
                />
            )}
        </div>
    );
}