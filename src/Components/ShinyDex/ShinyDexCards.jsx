import React from "react";
import regionalPokemon from "../../data/RegionalData.js";

export default function ShinyDexCards({ displayedPokemon, onCardClick, loading, searchQuery }) {

    const getCollectionCount = (baseName) => {
        let count = 0;
        const lowerBaseName = baseName.toLowerCase();

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("plza_shinyData_") || key.startsWith("sv_shinyData_")) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data?.pokemonName) {
                        const caughtName = data.pokemonName.toLowerCase();

                        // Check of de naam matcht
                        const matchesName = caughtName === lowerBaseName || caughtName.includes(lowerBaseName);

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
                <div className="w-12 h-12 border-4 border-slate-200 border-t-[#ff4d29] rounded-full animate-spin mb-4"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 animate-pulse">
                    Loading Pokémon Data...
                </p>
            </div>
        );
    }

    if (displayedPokemon.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 w-full bg-white/20 rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="text-4xl mb-4 opacity-20">🔍</div>
                <p className="text-sm font-black uppercase italic text-slate-400">
                    No Pokémon found {searchQuery && `for "${searchQuery}"`}
                </p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
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
                        className={`relative group p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center
                            ${isOwned
                            ? "bg-gradient-to-b from-amber-50 to-yellow-100 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-[1.02] cursor-pointer"
                            : "bg-white border-slate-100 hover:border-slate-200"}`}
                    >
                        {isOwned && (
                            <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md z-10 border-2 border-white">
                                x{amountOwned}
                            </div>
                        )}

                        {hasVariants && isOwned && (
                            <div className="absolute -top-2 -left-2 bg-cyan-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-sm z-10 border border-white animate-pulse">
                                FORMS
                            </div>
                        )}

                        <div className="text-center mb-2">
                            <p className={`text-[10px] font-black tracking-tighter uppercase ${isOwned ? "text-amber-600" : "text-slate-400"}`}>
                                No. {String(pokemon.id).padStart(4, "0")}
                            </p>
                            <h3 className={`text-xs font-black uppercase italic truncate w-24 ${isOwned ? "text-amber-900" : "text-slate-700"}`}>
                                {pokemon.name}
                            </h3>
                        </div>

                        <div className="relative">
                            {isOwned && (
                                <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full animate-pulse"></div>
                            )}
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`}
                                alt={pokemon.name}
                                className={`w-20 h-20 object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110 z-10 
                                    ${!isOwned ? "grayscale opacity-30" : ""}`}
                                loading="lazy"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}