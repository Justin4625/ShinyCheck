import React, { useState } from "react";
import shinyDexPokemon from "./data/ShinyDexData.js";
import usePokemon from "./Components/FetchPokemon.jsx";
import ShinyDexCards from "./Components/ShinyDexCards.jsx";
import ShinyDexTabs from "./Components/ShinyDexTabs.jsx";

export default function ShinyDex() {
    const { pokemonList } = usePokemon(shinyDexPokemon);
    const [activeTab, setActiveTab] = useState("kanto"); // default op Kanto

    // Filter Pokémon op actieve tab
    const displayedPokemon = pokemonList.filter((p) => p.region === activeTab);

    return (
        <div className="relative p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
            {/* Neon grid lijnen */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(0,255,255,0.05) 0 1px,transparent 1px 20px),repeating-linear-gradient(rgba(255,0,255,0.05) 0 1px,transparent 1px 20px)] pointer-events-none"></div>

            {/* Futuristic blobs */}
            <div className="absolute -top-32 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute -bottom-40 -right-28 w-96 sm:w-[32rem] h-96 sm:h-[32rem] bg-pink-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

            {/* Overlay grid lines (vertical + horizontal) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-[repeating-linear-gradient(0deg,rgba(0,255,255,0.05) 0 1px,transparent 1px 30px),repeating-linear-gradient(90deg,rgba(255,0,255,0.05) 0 1px,transparent 1px 30px)]"></div>
            </div>

            <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-white mb-4 sm:mb-6 tracking-wide z-10">
                ShinyDex (In Development)
            </h1>

            {/* Tabs */}
            <ShinyDexTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Pokémon Cards */}
            <ShinyDexCards
                pokemonList={pokemonList}
                displayedPokemon={displayedPokemon}
                activeTab={activeTab}
            />
        </div>
    );
}