import React, { useEffect, useState } from "react";
import plaPokemon from "../../data/PlaData/PlaData.js";
import usePokemon from "../FetchPokemon.jsx";
import PlaModal from "./PlaModal.jsx";
import PlaActiveHunts from "./PlaActiveHunts.jsx";
import PlaCards from "./PlaCards.jsx";

// --- INTERNE COMPONENT: PlaTabs ---
function PlaTabs({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "active", label: "Active Surveys" },
        { id: "base", label: "Hisui Pokédex" },
    ];

    return (
        <div className="flex flex-nowrap w-full gap-1 sm:gap-2">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            relative flex-1 px-1 sm:px-4 py-2 sm:py-2.5 
                            font-serif font-bold uppercase tracking-widest
                            text-[9px] sm:text-xs transition-all duration-300
                            ${isActive ? "scale-[1.02] z-10" : "opacity-70 hover:opacity-100"}
                        `}
                    >
                        {/* Arceus Tab Shape */}
                        <div
                            className={`absolute inset-0 border-t border-x border-[#3e3b38] transition-colors
                            ${isActive ? "bg-[#3e3b38]" : "bg-[#d9ceba]"}`}
                            style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }}
                        />
                        <span className={`relative z-10 block truncate ${isActive ? "text-[#eaddca]" : "text-[#5d5449]"}`}>
                            {tab.label}
                        </span>
                        {isActive && (
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 flex gap-3 opacity-30">
                                <div className="w-1 h-1 bg-[#bfa16d] rotate-45" />
                                <div className="w-1 h-1 bg-[#bfa16d] rotate-45" />
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export default function Pla() {
    const allAvailablePokemon = plaPokemon;
    const { pokemonList } = usePokemon(allAvailablePokemon);

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

    const filteredPokemon = (activeTab === "base" ? plaPokemon : allAvailablePokemon).filter((p) => {
        if (showMissingOnly) {
            const count = Number(localStorage.getItem(`pla_shiny_${p.id}`)) || 0;
            if (count > 0) return false;
        }
        const query = searchQuery.toLowerCase();
        const nameMatch = p.name.toLowerCase().includes(query);
        const apiPokemon = pokemonList.find(api => api.id === p.id);
        const typeMatch = apiPokemon?.types?.some(t => t.type.name.toLowerCase().includes(query));
        return nameMatch || typeMatch;
    });

    const getShinyProgress = () => {
        const count = plaPokemon.filter(p => (Number(localStorage.getItem(`pla_shiny_${p.id}`)) || 0) > 0).length;
        return { count, total: plaPokemon.length };
    };

    const progress = getShinyProgress();
    const shinyPercentage = progress.total > 0 ? ((progress.count / progress.total) * 100).toFixed(1) : 0;

    return (
        <div className="relative p-2 sm:p-4 min-h-screen bg-[#ece5d5] text-[#3e3b38] overflow-hidden font-serif">
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>

            {/* Title behouden uit voorbeeld */}
            <div className="relative z-10 flex flex-col items-center mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter uppercase flex items-center">
                    <span>Legends:</span>
                    <div className="flex ml-2 border-l-2 border-[#3e3b38]/20 pl-2">
                        <span className="text-[#bfa16d]">Arceus</span>
                    </div>
                </h1>
                <p className="text-[9px] font-bold tracking-[0.3em] text-[#5d5449]/60 uppercase mt-1 text-center">
                    Galaxy Expedition Team Field Survey
                </p>
            </div>

            {/* Progress Bar met originele tekst */}
            <div className="relative z-10 max-w-lg mx-auto mb-8">
                <div className="bg-[#f4ece1] border-2 border-[#3e3b38] p-3 shadow-[4px_4px_0px_0px_rgba(62,59,56,0.1)]">
                    <div className="flex justify-between items-end mb-2 px-1">
                        <span className="text-[9px] font-bold text-[#3e3b38] tracking-widest uppercase flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-[#bfa16d] rotate-45"></div>
                            Shiny Progress
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold italic">{progress.count}</span>
                            <span className="text-[#3e3b38]/30 font-bold text-[10px]">/ {progress.total}</span>
                            <span className="ml-2 text-amber-600 font-bold italic text-sm">{shinyPercentage}%</span>
                        </div>
                    </div>
                    <div className="h-2.5 bg-[#d9ceba] border border-[#3e3b38]/20">
                        <div
                            className="h-full bg-[#3e3b38] transition-all duration-1000 ease-out"
                            style={{ width: `${shinyPercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto mb-6 flex flex-col lg:flex-row items-center gap-4">
                <div className="flex-1 w-full overflow-x-auto no-scrollbar">
                    <PlaTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* Filter & Search Box - Lichte variant met originele tekst */}
                <div className="w-full lg:w-[320px] bg-[#f4ece1] p-3 border-2 border-[#3e3b38]/10 shadow-sm flex flex-col gap-2">
                    <div className="flex items-center justify-between px-1">
                        <label className="text-[9px] font-bold text-[#3e3b38]/40 uppercase tracking-widest">Unrgistered</label>
                        <button
                            onClick={() => setShowMissingOnly(!showMissingOnly)}
                            className={`relative h-5 w-9 border border-[#3e3b38]/20 transition-all ${showMissingOnly ? 'bg-amber-600' : 'bg-[#d9ceba]'}`}
                        >
                            <div className={`absolute top-0.5 bottom-0.5 w-4 bg-white transition-all ${showMissingOnly ? 'right-0.5' : 'left-0.5'}`} />
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH NAME OR TYPE..."
                            className="w-full pl-8 pr-3 py-2 bg-white/50 border-b-2 border-[#3e3b38]/10 text-[11px] font-bold text-[#3e3b38] focus:border-amber-600 outline-none transition-all placeholder:text-[#3e3b38]/30 uppercase tracking-wider italic"
                        />
                        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-amber-700">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative z-10 max-w-7xl mx-auto min-h-[300px]">
                {activeTab === "active" ? (
                    <PlaActiveHunts
                        plaPokemon={filteredPokemon}
                        pokemonList={pokemonList}
                        formatTime={formatTime}
                        openModal={openModal}
                    />
                ) : (
                    <PlaCards
                        displayedPokemon={filteredPokemon}
                        pokemonList={pokemonList}
                        openModal={openModal}
                    />
                )}
            </div>

            <PlaModal
                selectedPokemon={selectedPokemon}
                onClose={closeModal}
                index={selectedPokemon ? allAvailablePokemon.findIndex(p => p.id === selectedPokemon.id) : -1}
            />
        </div>
    );
}