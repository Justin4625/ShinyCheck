import React, { useState, useEffect } from "react";
import shinyDexPokemon from "./data/ShinyDexData.js";
import usePokemon from "./Components/FetchPokemon.jsx";
import ShinyDexCards from "./Components/ShinyDexCards.jsx";
import ShinyDexTabs from "./Components/ShinyDexTabs.jsx";

export default function ShinyDex() {
    const { pokemonList } = usePokemon(shinyDexPokemon);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [activeTab, setActiveTab] = useState("all");

    const openModal = (pokemon) => setSelectedPokemon(pokemon);

    useEffect(() => {
        document.body.style.overflow = selectedPokemon ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedPokemon]);

    // Filter Pokémon op actieve tab
    const displayedPokemon =
        activeTab === "all"
            ? pokemonList
            : pokemonList.filter((p) => p.region === activeTab);

    return (
        <div className="relative p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
            {/* Achtergrond lijnen */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(200,200,255,0.05) 0 1px,transparent 1px 20px),repeating-linear-gradient(rgba(200,200,255,0.05) 0 1px,transparent 1px 20px)] pointer-events-none"></div>

            {/* Achtergrond blobs */}
            <div className="absolute -top-20 -left-10 w-48 sm:w-60 h-48 sm:h-60 bg-blue-400 rounded-full opacity-15 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -right-20 w-64 sm:w-80 h-64 sm:h-80 bg-purple-400 rounded-full opacity-15 blur-3xl pointer-events-none"></div>

            <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4 sm:mb-6 tracking-wide z-10">
                ShinyDex (In Development)
            </h1>

            {/* Tabs */}
            <ShinyDexTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Pokémon Cards */}
            <ShinyDexCards
                pokemonList={pokemonList}
                displayedPokemon={displayedPokemon}
                openModal={openModal}
                activeTab={activeTab}
            />
        </div>
    );
}