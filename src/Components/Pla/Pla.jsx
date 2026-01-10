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
                            flex-1 px-1 sm:px-4 py-2 sm:py-2.5 
                            rounded-lg sm:rounded-xl font-black italic 
                            text-[8px] min-[380px]:text-[10px] sm:text-xs 
                            tracking-tighter min-[380px]:tracking-widest uppercase 
                            transition-all duration-300 border-2 transform
                            ${isActive
                            ? "bg-amber-600 border-amber-800 text-white shadow-lg scale-[1.02] z-10 skew-x-[-6deg]"
                            : "bg-[#eaddca] border-transparent text-amber-900/50 hover:bg-white hover:border-amber-200"
                        }
                        `}
                    >
                        <span className="relative z-10 block truncate">{tab.label}</span>
                        {isActive && (
                            <div className="h-0.5 sm:h-1 w-4 sm:w-6 bg-white mx-auto mt-0.5 rounded-full animate-pulse" />
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
        if (!query) return true;
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
        <div className="relative p-2 sm:p-4 min-h-screen bg-[#f4f1ea] text-slate-900 overflow-hidden font-sans">
            {/* Achtergrond Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

            <div className="relative z-10 flex flex-col items-center mb-6">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase italic flex items-center">
                    <span className="text-slate-800">Legends:</span>
                    <div className="flex ml-2 border-l-2 border-amber-200 pl-2">
                        <span className="text-amber-600">Arceus</span>
                    </div>
                </h1>
                <p className="text-[9px] font-black tracking-[0.3em] text-amber-800/60 uppercase mt-1">
                    Galaxy Expedition Team Field Survey
                </p>
            </div>

            {/* Progress Bar (Hetzelfde formaat als PLZA) */}
            <div className="relative z-10 max-w-lg mx-auto mb-8">
                <div className="bg-white border-2 border-amber-100 p-3 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-end mb-2 px-1">
                        <span className="text-[9px] font-black text-amber-700 tracking-widest uppercase flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                            Shiny Progress
                        </span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-black text-slate-900 italic">{progress.count}</span>
                            <span className="text-slate-300 font-bold text-xs">/</span>
                            <span className="text-slate-400 font-bold text-[10px]">{progress.total}</span>
                            <span className="ml-1 text-amber-600 font-black italic text-sm">{shinyPercentage}%</span>
                        </div>
                    </div>
                    <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-amber-50">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 transition-all duration-1000 ease-out"
                            style={{ width: `${shinyPercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto mb-6 flex flex-col lg:flex-row items-center gap-4">
                <div className="flex-1 w-full overflow-x-auto">
                    <PlaTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                <div className="w-full lg:w-[320px] bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-amber-100 shadow-sm flex flex-col gap-2">
                    <div className="flex items-center justify-between px-1">
                        <label className="text-[9px] font-black text-amber-800/40 uppercase tracking-widest">Unseen Only</label>
                        <button
                            onClick={() => setShowMissingOnly(!showMissingOnly)}
                            className={`relative h-5 w-9 rounded-full transition-all duration-300 ${showMissingOnly ? 'bg-amber-600' : 'bg-slate-300'}`}
                        >
                            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${showMissingOnly ? 'left-4.5' : 'left-0.5'}`} />
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH NAME OR TYPE..."
                            className="w-full pl-8 pr-3 py-2 bg-white border border-amber-50 rounded-xl text-[11px] font-bold text-slate-700 focus:border-amber-400 outline-none transition-all placeholder:text-amber-700"
                        />
                        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-amber-700">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto min-h-[300px]">
                {activeTab === "active" ? (
                    <PlaActiveHunts plaPokemon={filteredPokemon} pokemonList={pokemonList} formatTime={formatTime} openModal={openModal} />
                ) : (
                    <PlaCards displayedPokemon={filteredPokemon} pokemonList={pokemonList} openModal={openModal} />
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