import React, { useState } from "react";
import shinyDexPokemon from "./data/ShinyDexData.js";
import usePokemon from "./Components/FetchPokemon.jsx";
import ShinyDexCards from "./Components/ShinyDexCards.jsx";
import ShinyDexTabs from "./Components/ShinyDexTabs.jsx";

export default function ShinyDex() {
    const { pokemonList } = usePokemon(shinyDexPokemon);
    const [activeTab, setActiveTab] = useState("kanto"); // default op Kanto

    const displayedPokemon = pokemonList.filter((p) => p.region === activeTab);

    return (
        <div className="relative p-4 sm:p-6 lg:p-8 min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 overflow-hidden">
            {/* Subtiele grid lijnen */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.02) 0 1px,transparent 1px 20px),repeating-linear-gradient(rgba(0,0,0,0.02) 0 1px,transparent 1px 20px)] pointer-events-none"></div>

            {/* Lichte blobs */}
            <div className="absolute -top-32 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute -bottom-40 -right-28 w-96 sm:w-[32rem] h-96 sm:h-[32rem] bg-pink-200/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

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