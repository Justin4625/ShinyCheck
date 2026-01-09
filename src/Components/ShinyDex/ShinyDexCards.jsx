import React, { useMemo } from "react";
import regionalPokemon from "../../data/ShinyDexData/RegionalData.js";

export default function ShinyDexCards({ displayedPokemon, onCardClick, loading, searchQuery }) {

    // --- AUTOMATISCHE THEMA LOGICA ---
    const isNewYearTheme = useMemo(() => {
        const now = new Date();
        // Thema is actief tot 3 januari 2026, 00:00:00
        const expiryDate = new Date(2026, 0, 3, 0, 0, 0);
        return now < expiryDate;
    }, []);

    const getCollectionCount = (baseName) => {
        let count = 0;
        const lowerBaseName = baseName.toLowerCase();

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            // UPDATE: Check nu op alle drie de prefixes: plza, sv én pogo
            if (key.startsWith("plza_shinyData_") || key.startsWith("sv_shinyData_") || key.startsWith("pogo_shinyData_")) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data?.pokemonName) {
                        const caughtName = data.pokemonName.toLowerCase();

                        // VERBETERDE LOGICA: Gebruik woordgrenzen (\b) om te voorkomen dat 'Abra' matcht in 'Crabrawler'
                        const matchesName = caughtName === lowerBaseName ||
                            new RegExp(`\\b${lowerBaseName}\\b`).test(caughtName);

                        // SPECIFIEKE UITZONDERING VOOR PORYGON:
                        let isException = false;
                        if (lowerBaseName === "porygon") {
                            if (caughtName === "porygon2" || caughtName === "porygon-z") {
                                isException = true;
                            }
                        }

                        if (matchesName && !isException) {
                            count++;
                        }
                    }
                } catch (e) { /* eslint-disable-line no-unused-vars */ }
            }
        }
        return count;
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 w-full">
                <div className={`w-12 h-12 border-4 rounded-full animate-spin mb-4 transition-colors ${
                    isNewYearTheme ? "border-slate-700 border-t-amber-400" : "border-slate-200 border-t-[#ff4d29]"
                }`}></div>
                <p className={`text-[10px] font-black uppercase tracking-widest animate-pulse ${
                    isNewYearTheme ? "text-blue-300" : "text-slate-400"
                }`}>
                    Loading Pokémon Data...
                </p>
            </div>
        );
    }

    if (displayedPokemon.length === 0) {
        return (
            <div className={`flex flex-col items-center justify-center py-20 w-full rounded-[3rem] border-2 border-dashed transition-all ${
                isNewYearTheme ? "bg-slate-900/40 border-slate-700 text-slate-500" : "bg-white/20 border-slate-200 text-slate-400"
            }`}>
                <div className="text-4xl mb-4 opacity-20">{isNewYearTheme ? "✨" : "🔍"}</div>
                <p className="text-sm font-black uppercase italic">
                    No Pokémon found {searchQuery && `for "${searchQuery}"`}
                </p>
                <p className="text-[9px] font-bold uppercase tracking-widest mt-1">
                    Try another name, ID or clear your filters
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pb-20">
            {displayedPokemon.map((pokemon) => {
                const amountOwned = getCollectionCount(pokemon.name);
                const isOwned = amountOwned > 0;

                const hasVariants = regionalPokemon.some(p =>
                    p.name.toLowerCase().includes(pokemon.name.toLowerCase())
                );

                return (
                    <div
                        key={pokemon.id}
                        onClick={() => isOwned && onCardClick(pokemon)}
                        className={`relative group p-4 rounded-2xl border-2 transition-all duration-500 flex flex-col items-center justify-center
                            ${isOwned
                            ? isNewYearTheme
                                ? "bg-gradient-to-b from-slate-800 to-slate-900 border-amber-500/50 shadow-[0_0_20px_rgba(251,191,36,0.2)] scale-[1.02] cursor-pointer"
                                : "bg-gradient-to-b from-amber-50 to-yellow-100 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-[1.02] cursor-pointer"
                            : isNewYearTheme
                                ? "bg-slate-950/40 border-slate-800 hover:border-slate-700"
                                : "bg-white border-slate-100 hover:border-slate-200"
                        }
                        `}
                    >
                        {isOwned && (
                            <div className={`absolute -top-2 -right-2 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md z-10 border-2 transition-colors ${
                                isNewYearTheme ? "bg-amber-500 text-slate-900 border-slate-900" : "bg-amber-500 text-white border-white"
                            }`}>
                                x{amountOwned}
                            </div>
                        )}

                        {hasVariants && isOwned && (
                            <div className={`absolute -top-2 -left-2 text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-sm z-10 border animate-pulse transition-colors ${
                                isNewYearTheme ? "bg-blue-500 text-white border-blue-400" : "bg-cyan-500 text-white border-white"
                            }`}>
                                FORMS
                            </div>
                        )}

                        <div className="text-center mb-2">
                            <p className={`text-[10px] font-black tracking-tighter uppercase transition-colors ${
                                isOwned
                                    ? (isNewYearTheme ? "text-amber-400/80" : "text-amber-600")
                                    : "text-slate-500"
                            }`}>
                                No. {String(pokemon.id).padStart(4, "0")}
                            </p>
                            <h3 className={`text-xs font-black uppercase italic truncate w-24 transition-colors ${
                                isOwned
                                    ? (isNewYearTheme ? "text-white" : "text-amber-900")
                                    : (isNewYearTheme ? "text-slate-600" : "text-slate-700")
                            }`}>
                                {pokemon.name}
                            </h3>
                        </div>

                        <div className="relative">
                            {isOwned && (
                                <div className={`absolute inset-0 blur-2xl opacity-20 rounded-full animate-pulse transition-colors ${
                                    isNewYearTheme ? "bg-blue-400" : "bg-yellow-400"
                                }`}></div>
                            )}
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`}
                                alt={pokemon.name}
                                className={`w-20 h-20 object-contain drop-shadow-md transition-all duration-500 group-hover:scale-110 z-10 
                                    ${!isOwned ? "grayscale opacity-30" : ""}`}
                                loading="lazy"
                            />
                        </div>

                        {/* Subtiele extra gloed voor de feestdagen op gevangen kaarten */}
                        {isNewYearTheme && isOwned && (
                            <div className="absolute inset-0 rounded-2xl pointer-events-none border border-amber-400/20 shadow-[inset_0_0_15px_rgba(251,191,36,0.05)]"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}