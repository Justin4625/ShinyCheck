import React from "react";

export default function ShinyDexCards({ displayedPokemon, onCardClick }) {

    const getCollectionCount = (name) => {
        let count = 0;
        const lowerName = name.toLowerCase();

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("plza_shinyData_") || key.startsWith("sv_shinyData_")) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    if (data && data.pokemonName && data.pokemonName.toLowerCase() === lowerName) {
                        count++;
                    }
                } catch (e) {}
            }
        }
        return count;
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pb-20">
            {displayedPokemon.map((pokemon) => {
                const amountOwned = getCollectionCount(pokemon.name);
                const isOwned = amountOwned > 0;

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

                        <div className="text-center mb-2">
                            <p className={`text-[10px] font-black tracking-tighter uppercase ${isOwned ? "text-amber-600" : "text-slate-400"}`}>
                                No. {String(pokemon.id).padStart(3, "0")}
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

                        {isOwned && (
                            <div className="absolute bottom-2 right-2 text-amber-500 text-xs animate-bounce">
                                ✨
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}