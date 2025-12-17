import React, { useState, useEffect } from "react";
import svPokemon from "../../data/SvData.js";
import usePokemon from "../FetchPokemon.jsx";
import SvModal from "./SvModal.jsx";
import SvTabs from "./SvTabs.jsx";
import SvCollection from "./SvCollection.jsx";
import SvCards from "./SvCards.jsx";
import SvActiveHunts from "./SvActiveHunts.jsx";

export default function Sv() {
    const { pokemonList } = usePokemon(svPokemon);

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

    const filteredPokemon = svPokemon.filter((p) => {
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
        let uniqueShinyCount = 0;
        svPokemon.forEach(p => {
            const count = Number(localStorage.getItem(`sv_shiny_${p.id}`)) || 0;
            if (count > 0) uniqueShinyCount += 1;
        });
        return { count: uniqueShinyCount, total: 400 };
    };

    const shinyProgress = getShinyProgress();
    const shinyPercentage = ((shinyProgress.count / shinyProgress.total) * 100).toFixed(1);

    return (
        <div className="relative p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,100,100,0.03) 0 1px,transparent 1px 20px),repeating-linear-gradient(rgba(255,100,100,0.03) 0 1px,transparent 1px 20px)] pointer-events-none"></div>

            <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4 z-10">
                Pokémon Scarlet & Violet
            </h1>

            <div className="relative w-full max-w-xl mx-auto mb-6">
                <p className="text-center text-gray-700 font-bold mb-2">
                    Shiny Progress: {shinyProgress.count}/400 ({shinyPercentage}%)
                </p>
                <div className="w-full h-6 rounded-full bg-gray-300/30 overflow-hidden">
                    <div className="h-6 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 transition-all duration-700 ease-out" style={{width: shinyPercentage + "%"}} />
                </div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end gap-4 mb-8">
                <div className="flex-1"><SvTabs activeTab={activeTab} setActiveTab={setActiveTab} /></div>
                <div className="w-full lg:max-w-[280px] flex flex-col gap-2">
                    <div className="flex items-center justify-between lg:justify-end gap-3 px-1 mb-1">
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">Missing Only</span>
                        <button onClick={() => setShowMissingOnly(!showMissingOnly)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showMissingOnly ? 'bg-orange-600' : 'bg-gray-300'}`}>
                            <span className={`${showMissingOnly ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition duration-300`} />
                        </button>
                    </div>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Pokémon..." className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-white/50 focus:ring-2 focus:ring-orange-300 transition-all" />
                </div>
            </div>

            {activeTab === "collection" ? (
                <SvCollection svPokemon={filteredPokemon} pokemonList={pokemonList} formatTime={formatTime} />
            ) : activeTab === "active" ? (
                <SvActiveHunts svPokemon={filteredPokemon} pokemonList={pokemonList} formatTime={formatTime} openModal={openModal} />
            ) : (
                <SvCards displayedPokemon={filteredPokemon} pokemonList={pokemonList} openModal={openModal} activeTab={activeTab} />
            )}

            <SvModal selectedPokemon={selectedPokemon} onClose={closeModal} index={selectedPokemon ? svPokemon.findIndex(p => p.id === selectedPokemon.id) : -1} />
        </div>
    );
}