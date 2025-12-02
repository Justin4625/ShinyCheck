import React, { useState } from "react";
import shinyDexPokemon from "./data/ShinyDexData.js";
import usePokemon from "./Components/FetchPokemon.jsx";
import ShinyDexCards from "./Components/ShinyDexCards.jsx";
import ShinyDexTabs from "./Components/ShinyDexTabs.jsx";

export default function ShinyDex() {
    const { pokemonList } = usePokemon(shinyDexPokemon);
    const [activeTab, setActiveTab] = useState("kanto");

    const displayedPokemon = pokemonList.filter((p) => p.region === activeTab);

    return (
        <div className="relative p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50 overflow-hidden">
            {/* Subtiele neon grid lijnen */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(0,150,255,0.05) 0 1px,transparent 1px 20px),repeating-linear-gradient(rgba(0,200,255,0.05) 0 1px,transparent 1px 20px)] pointer-events-none"></div>

            {/* Holo/blurry blobs */}
            <div className="absolute -top-32 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute -bottom-40 -right-28 w-96 sm:w-[32rem] h-96 sm:h-[32rem] bg-cyan-200/30 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

            <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4 sm:mb-6 tracking-wide z-10">
                ShinyDex (In Development)
            </h1>

            {/* Tabs */}
            <ShinyDexTabs activeTab={activeTab} setActiveTab={setActiveTab} mode="light" />

            {/* Pokémon Cards */}
            <ShinyDexCards
                displayedPokemon={displayedPokemon}
                openModal={() => {}}
                mode="light"
            />
        </div>
    );
}