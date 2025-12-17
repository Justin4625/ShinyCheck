import React, { useState, useEffect } from "react";
import plzaPokemon from "../../data/PlzaData.js";
import plzaMdPokemon from "../../data/PlzaMdData.js";
import usePokemon from "../FetchPokemon.jsx";
import PlzaModal from "./PlzaModal.jsx";
import PlzaTabs from "./PlzaTabs.jsx";
import PlzaCollection from "./PlzaCollection.jsx";
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
                : activeTab === "collection" || activeTab === "active"
                    ? plzaPokemon.concat(plzaMdPokemon)
                    : [];

    const filteredPokemon = displayedPokemon.filter((p) => {
        if (showMissingOnly) {
            // Gebruik plza_ prefix voor unieke data opslag
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
        <div className="relative p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(200,200,255,0.05) 0 1px,transparent 1px 20px),repeating-linear-gradient(rgba(200,200,255,0.05) 0 1px,transparent 1px 20px)] pointer-events-none"></div>

            <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4 tracking-wide z-10">
                Pokémon Legends: Z-A
            </h1>

            <div className="relative w-full max-w-xl mx-auto mb-6">
                <p className="text-center text-gray-700 font-bold mb-2">
                    Shiny Progress: {shinyProgress.count}/364 ({shinyPercentage}%)
                </p>
                <div className="w-full h-6 rounded-full bg-gray-300/30 overflow-hidden">
                    <div
                        className="h-6 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 transition-all duration-700 ease-out"
                        style={{width: shinyPercentage + "%"}}
                    />
                </div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end gap-4 mb-8">
                <div className="flex flex-wrap lg:flex-nowrap flex-1 gap-1 sm:gap-2">
                    <PlzaTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                <div className="w-full lg:flex-shrink-0 lg:max-w-[280px] flex flex-col gap-2">
                    <div className="flex items-center justify-between lg:justify-end gap-3 px-1 mb-1">
                        <span className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-tighter">Missing Shinies Only</span>
                        <button
                            onClick={() => setShowMissingOnly(!showMissingOnly)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner ${
                                showMissingOnly ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300'
                            }`}
                        >
                            <span
                                className={`${showMissingOnly ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition duration-300`}
                            />
                        </button>
                    </div>

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or type"
                        className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-purple-200/40 via-pink-200/30 to-blue-200/30 text-gray-900 placeholder-gray-500 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300/40 border border-gray-400 transition-all duration-300"
                    />
                </div>
            </div>

            {activeTab === "collection" ? (
                <PlzaCollection plzaPokemon={filteredPokemon} pokemonList={pokemonList} formatTime={formatTime} />
            ) : activeTab === "active" ? (
                <PlzaActiveHunts plzaPokemon={filteredPokemon} pokemonList={pokemonList} formatTime={formatTime} openModal={openModal} />
            ) : (
                <PlzaCards displayedPokemon={filteredPokemon} pokemonList={pokemonList} openModal={openModal} activeTab={activeTab} />
            )}

            <PlzaModal selectedPokemon={selectedPokemon} onClose={closeModal} index={modalIndex} />
        </div>
    );
}