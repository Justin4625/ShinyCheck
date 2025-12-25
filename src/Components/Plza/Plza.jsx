import React, { useState, useEffect } from "react";
import plzaPokemon from "../../data/PlzaData/PlzaData.js";
import plzaMdPokemon from "../../data/PlzaData/PlzaMdData.js";
import usePokemon from "../FetchPokemon.jsx";
import PlzaModal from "./PlzaModal.jsx";
import PlzaTabs from "./PlzaTabs.jsx";
import PlzaActiveHunts from "./PlzaActiveHunts.jsx";
import PlzaCards from "./PlzaCards.jsx";

export default function Plza() {
    const { pokemonList } = usePokemon(plzaPokemon.concat(plzaMdPokemon));

    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [activeTab, setActiveTab] = useState("base");
    const [searchQuery, setSearchQuery] = useState("");
    const [showMissingOnly, setShowMissingOnly] = useState(false);

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

    const displayedPokemon =
        activeTab === "base"
            ? plzaPokemon
            : activeTab === "mega"
                ? plzaMdPokemon
                : activeTab === "active"
                    ? plzaPokemon.concat(plzaMdPokemon)
                    : [];

    const filteredPokemon = displayedPokemon.filter((p) => {
        if (showMissingOnly) {
            const count = Number(localStorage.getItem(`plza_shiny_${p.id}`)) || 0;
            if (count > 0) return false;
        }

        const query = searchQuery.toLowerCase();
        if (!query) return true;

        const nameMatch = p.name.toLowerCase().includes(query);
        const apiPokemon = pokemonList.find(api => api.id === p.id);
        const typeMatch = apiPokemon?.types?.some(t =>
            t.type.name.toLowerCase().includes(query)
        );

        return nameMatch || typeMatch;
    });

    const getShinyProgress = () => {
        let uniqueShinyCount = 0;
        plzaPokemon.concat(plzaMdPokemon).forEach(p => {
            const count = Number(localStorage.getItem(`plza_shiny_${p.id}`)) || 0;
            if (count > 0) uniqueShinyCount += 1;
        });
        return { count: uniqueShinyCount, total: 364 };
    };

    const shinyProgress = getShinyProgress();
    const shinyPercentage = ((shinyProgress.count / shinyProgress.total) * 100).toFixed(1);

    const modalIndex = selectedPokemon
        ? pokemonList.findIndex(p => p.id === selectedPokemon.id)
        : -1;

    return (
        <div className="relative p-2 sm:p-4 min-h-screen bg-white text-slate-900 overflow-hidden font-sans">
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:30px_30px]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center mb-6">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase italic flex items-center">
                    <span className="text-slate-800">Legends:</span>
                    <div className="flex ml-2 border-l-2 border-slate-200 pl-2">
                        <span className="text-cyan-500">Z</span>
                        <span className="text-slate-300 mx-0.5">-</span>
                        <span className="text-pink-500">A</span>
                    </div>
                </h1>
                <p className="text-[9px] font-black tracking-[0.3em] text-slate-400 uppercase mt-1">
                    Lumiose City urban redevelopment plan
                </p>
            </div>

            <div className="relative z-10 max-w-lg mx-auto mb-8">
                <div className="bg-white border border-slate-100 p-3 rounded-2xl shadow-lg shadow-slate-200/30">
                    <div className="flex justify-between items-end mb-2 px-1">
                        <span className="text-[9px] font-black text-cyan-600 tracking-widest uppercase flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                            Shiny Progress
                        </span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-black text-slate-900 italic">{shinyProgress.count}</span>
                            <span className="text-slate-300 font-bold text-xs">/</span>
                            <span className="text-slate-400 font-bold text-[10px]">364</span>
                            <span className="ml-1 text-pink-500 font-black italic text-sm">{shinyPercentage}%</span>
                        </div>
                    </div>
                    <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-pink-500 transition-all duration-1000 ease-out"
                            style={{ width: `${shinyPercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto mb-6 flex flex-col lg:flex-row items-center gap-4">
                <div className="flex-1 w-full overflow-x-auto">
                    <PlzaTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                <div className="w-full lg:w-[320px] bg-slate-50/50 backdrop-blur-sm p-3 rounded-2xl border border-white shadow-sm flex flex-col gap-2">
                    <div className="flex items-center justify-between px-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Unregistered</label>
                        <button
                            onClick={() => setShowMissingOnly(!showMissingOnly)}
                            className={`relative h-5 w-9 rounded-full transition-all duration-300 ${showMissingOnly ? 'bg-cyan-500' : 'bg-slate-300'}`}
                        >
                            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${showMissingOnly ? 'left-4.5' : 'left-0.5'}`} />
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH POKÉMON OR TYPE..."
                            className="w-full pl-8 pr-3 py-2 bg-white border border-slate-100 rounded-xl text-[11px] font-bold text-slate-700 focus:border-cyan-400 outline-none transition-all placeholder:text-slate-300"
                        />
                        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-cyan-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto min-h-[300px]">
                {activeTab === "active" ? (
                    <PlzaActiveHunts plzaPokemon={filteredPokemon} pokemonList={pokemonList} formatTime={formatTime} openModal={openModal} />
                ) : (
                    <PlzaCards displayedPokemon={filteredPokemon} pokemonList={pokemonList} openModal={openModal} activeTab={activeTab} />
                )}
            </div>

            <PlzaModal selectedPokemon={selectedPokemon} onClose={closeModal} index={modalIndex} />
        </div>
    );
}