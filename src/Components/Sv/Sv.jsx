import React, { useState, useEffect } from "react";
import svPokemon from "../../data/SvData.js";
import svTmPokemon from "../../data/SvTmData.js";
import usePokemon from "../FetchPokemon.jsx";
import SvModal from "./SvModal.jsx";
import SvTabs from "./SvTabs.jsx";
import SvCards from "./SvCards.jsx";
import SvActiveHunts from "./SvActiveHunts.jsx";

export default function Sv() {
    const [activeTab, setActiveTab] = useState("base");
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showMissingOnly, setShowMissingOnly] = useState(false);

    const currentDataSet = activeTab === "teal" ? svTmPokemon : svPokemon;
    const { pokemonList } = usePokemon(currentDataSet);

    const openModal = (pokemon) => setSelectedPokemon(pokemon);
    const closeModal = () => setSelectedPokemon(null);

    useEffect(() => {
        document.body.style.overflow = selectedPokemon ? "hidden" : "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [selectedPokemon]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    const filteredPokemon = currentDataSet.map((p, index) => ({
        ...p,
        displayId: (index + 1).toString()
    })).filter((p) => {
        if (showMissingOnly) {
            const count = Number(localStorage.getItem(`sv_shiny_${p.id}`)) || 0;
            if (count > 0) return false;
        }
        const query = searchQuery.toLowerCase();
        if (!query) return true;
        const nameMatch = p.name.toLowerCase().includes(query);
        const apiPokemon = pokemonList.find(api => api.id === p.id);
        const typeMatch = apiPokemon?.types?.some(t => t.type.name.toLowerCase().includes(query));
        return nameMatch || typeMatch;
    });

    const getShinyProgress = () => {
        const caughtUniqueNames = new Set();
        svPokemon.forEach(p => {
            if (Number(localStorage.getItem(`sv_shiny_${p.id}`)) > 0) caughtUniqueNames.add(p.name);
        });
        svTmPokemon.forEach(p => {
            if (Number(localStorage.getItem(`sv_shiny_${p.id}`)) > 0) caughtUniqueNames.add(p.name);
        });
        return { count: caughtUniqueNames.size, total: 400 };
    };

    const shinyProgress = getShinyProgress();
    const shinyPercentage = ((shinyProgress.count / shinyProgress.total) * 100).toFixed(1);

    return (
        <div className="relative p-3 sm:p-6 min-h-screen bg-[#f8f9fa] overflow-hidden font-sans">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[100%] bg-[#ff4d00] opacity-[0.03] rotate-12"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[100%] bg-[#8c00ff] opacity-[0.03] rotate-12"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center mb-6">
                <div className="bg-white py-1.5 px-8 shadow-sm border-y-2 border-[#ff4d00] transform -rotate-1 mb-4">
                    <h1 className="text-2xl sm:text-3xl font-black italic tracking-tighter text-[#333] uppercase">
                        <span className="text-[#ff4d00]">Scarlet</span> <span className="text-gray-300 mx-1">&</span> <span className="text-[#8c00ff]">Violet</span>
                    </h1>
                </div>

                <div className="w-full max-w-lg bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-end mb-1.5 px-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Shiny Progress</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xs font-bold text-[#ff4d00] tabular-nums">{shinyPercentage}%</span>
                            <span className="text-xl font-black text-[#333] italic">
                                {shinyProgress.count}
                                <span className="text-gray-300 mx-0.5 text-lg">/</span>
                                400
                            </span>
                        </div>
                    </div>
                    <div className="relative h-2.5 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff4d00] via-[#ffcc00] to-[#8c00ff] transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min(shinyPercentage, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto mb-8 flex flex-col lg:flex-row items-center gap-4">
                <div className="flex-1 w-full overflow-x-auto">
                    <SvTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                <div className="w-full lg:w-[300px] bg-white p-3 rounded-lg shadow-sm border-b-2 border-gray-200 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Unregistered</label>
                        <button
                            onClick={() => setShowMissingOnly(!showMissingOnly)}
                            className={`relative h-5 w-10 rounded-full transition-all duration-300 border ${showMissingOnly ? 'bg-[#ff4d00] border-[#ff4d00]' : 'bg-gray-100 border-gray-200'}`}
                        >
                            <span className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transition-all duration-300 ${showMissingOnly ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH POKÉMON OR TYPE..."
                            className="w-full pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded text-xs font-bold focus:border-[#ff4d00] outline-none transition-colors placeholder:text-gray-300 tracking-tight"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto min-h-[400px]">
                {activeTab === "active" ? (
                    <SvActiveHunts svPokemon={filteredPokemon} pokemonList={pokemonList} formatTime={formatTime} openModal={openModal} />
                ) : (
                    <SvCards displayedPokemon={filteredPokemon} pokemonList={pokemonList} openModal={openModal} activeTab={activeTab} />
                )}
            </div>

            <SvModal
                selectedPokemon={selectedPokemon}
                onClose={closeModal}
                index={selectedPokemon ? currentDataSet.findIndex(p => p.id === selectedPokemon.id) : -1}
                activeTab={activeTab}
            />
        </div>
    );
}