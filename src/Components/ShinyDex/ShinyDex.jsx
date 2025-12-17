import React, { useState } from "react";
import shinyDexPart1 from "../../data/ShinyDexData.js";
import shinyDexPart2 from "../../data/ShinyDexData2.js";
import shinyDexPart3 from "../../data/ShinyDexData3.js";

import usePokemon from "../FetchPokemon.jsx";
import ShinyDexCards from "./ShinyDexCards.jsx";
import ShinyDexTabs from "./ShinyDexTabs.jsx";

// Voeg de delen samen tot één National Dex lijst
const fullShinyDex = [...shinyDexPart1, ...shinyDexPart2, ...shinyDexPart3];

export default function ShinyDex() {
    const [activeTab, setActiveTab] = useState("kanto");

    // STAP 1: Filter EERST de lokale data op regio
    // Dit zorgt ervoor dat de hook 'usePokemon' alleen de entries van de gekozen regio ziet
    const regionEntries = fullShinyDex.filter((p) => p.region === activeTab);

    // STAP 2: Geef alleen de entries van de actieve regio door aan de fetcher
    // De hook zal nu automatisch her-fetchen als 'regionEntries' verandert
    const { pokemonList } = usePokemon(regionEntries);

    return (
        <div className="relative min-h-screen bg-[#f8fafc] p-4 sm:p-8 font-sans overflow-hidden text-slate-900">
            {/* Achtergrond Decoratie */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-200/40 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Area */}
                <div className="flex justify-between items-end mb-8 px-4">
                    <div className="flex flex-col">
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                            Rotom <span className="text-[#ff4d29]">OS</span>
                        </h1>
                        <p className="text-[10px] font-bold tracking-[0.4em] text-slate-400 uppercase mt-2">National Shiny Archive // V.3.0</p>
                    </div>

                    <div className="hidden sm:flex items-center gap-4 bg-white/80 backdrop-blur-md border border-slate-200 p-2 px-4 rounded-2xl shadow-sm">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-black text-cyan-600 uppercase tracking-widest">Connection</span>
                            <span className="text-[10px] font-mono text-slate-500 italic">STABLE_SIGNAL</span>
                        </div>
                        <div className="w-3 h-3 bg-[#ff4d29] rounded-full animate-pulse shadow-[0_0_10px_#ff4d29]"></div>
                    </div>
                </div>

                {/* Region Selection (Tabs) */}
                <ShinyDexTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Main Viewport (Frosted Glass Panel) */}
                <div className="mt-8 bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white shadow-xl p-6 sm:p-10 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                    {/* We geven 'pokemonList' door, die nu alleen de gefetchte data van de huidige regio bevat */}
                    <ShinyDexCards
                        displayedPokemon={pokemonList}
                        openModal={() => {}}
                    />
                </div>
            </div>
        </div>
    );
}