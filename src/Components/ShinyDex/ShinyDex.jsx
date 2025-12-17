import React, { useState } from "react";
import shinyDexPokemon from "../../data/ShinyDexData.js";
import usePokemon from "../FetchPokemon.jsx";
import ShinyDexCards from "./ShinyDexCards.jsx";
import ShinyDexTabs from "./ShinyDexTabs.jsx";

export default function ShinyDex() {
    const { pokemonList } = usePokemon(shinyDexPokemon);
    const [activeTab, setActiveTab] = useState("kanto");

    const displayedPokemon = pokemonList.filter((p) => p.region === activeTab);

    return (
        <div className="relative min-h-screen bg-[#ff4d29] p-2 sm:p-6 font-sans overflow-hidden">
            {/* Rotom Decoratie: De "Oren" van de Dex */}
            <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-[#ff4d29] rounded-full border-[10px] border-white/20 pointer-events-none"></div>
            <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <div className="w-8 h-8 bg-cyan-400 rounded-full border-4 border-white"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto pt-12">
                {/* Modern Glass Display */}
                <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl border-4 border-white/50 overflow-hidden">

                    {/* Top Bar met Rotom Eyes */}
                    <div className="bg-[#2d2d2d] p-4 flex justify-between items-center border-b-4 border-[#ff4d29]">
                        <div className="flex gap-4 items-center">
                            <div className="text-[#ff4d29] font-black italic tracking-tighter text-2xl">SHINYDEX</div>
                            <div className="hidden sm:flex gap-1">
                                <div className="w-6 h-1 bg-[#ff4d29] rounded-full"></div>
                                <div className="w-3 h-1 bg-cyan-400 rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-white font-black text-xs">
                            <span className="opacity-50 tracking-widest uppercase">National Mode</span>
                            <div className="w-8 h-4 bg-[#ff4d29] rounded-full relative">
                                <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-slate-50">
                        {/* Region Select */}
                        <ShinyDexTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                        {/* Card Grid Area */}
                        <div className="mt-6 min-h-[65vh]">
                            <ShinyDexCards
                                displayedPokemon={displayedPokemon}
                                openModal={() => {}}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Rotom Sparks */}
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-300/20 rounded-full blur-3xl animate-bounce"></div>
            <div className="absolute top-40 left-10 w-24 h-24 bg-yellow-300/20 rounded-full blur-2xl animate-pulse"></div>
        </div>
    );
}