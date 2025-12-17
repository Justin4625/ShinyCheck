import React from "react";
import svPokemon from "../../data/SvData.js";

export default function SvCards({ displayedPokemon, pokemonList, openModal }) {
    const isLoading = displayedPokemon.length > 0 && displayedPokemon.some((entry) => {
        const pokemon = pokemonList.find((p) => p.id === entry.id);
        return !pokemon?.sprites?.other?.home?.front_shiny;
    });

    const getStaticIndex = (entry) => {
        const index = svPokemon.findIndex(p => p.id === entry.id);
        return index !== -1 ? index + 1 : 1;
    };

    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 z-10">
            {displayedPokemon.length === 0 ? (
                <div className="col-span-full text-center py-10 font-bold text-gray-700 opacity-50">No Pokémon found</div>
            ) : isLoading ? (
                <div className="col-span-full text-center py-10 font-bold text-gray-700 animate-pulse">Loading...</div>
            ) : (
                displayedPokemon.map((entry, index) => {
                    const pokemon = pokemonList.find((p) => p.id === entry.id);
                    // Gebruik de unieke SV prefix
                    const shinyCount = Number(localStorage.getItem(`sv_shiny_${entry.id}`)) || 0;
                    const staticNumber = getStaticIndex(entry);

                    return (
                        <div key={entry.id} onClick={() => openModal(pokemon)} className="relative rounded-2xl p-4 flex flex-col items-center justify-between cursor-pointer transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-gray-100 to-gray-200 shadow-md overflow-hidden">
                            <div className="w-full flex justify-between items-center mb-3 relative z-10">
                                <h2 className="text-base font-extrabold capitalize">{entry.name}</h2>
                                <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-md">
                                    #{String(staticNumber).padStart(3, "0")}
                                </span>
                            </div>
                            <img src={pokemon?.sprites?.other?.home?.front_shiny} alt={entry.name} className="w-20 h-20 sm:w-28 drop-shadow-md z-10" />
                            <div className="mt-4 w-full flex justify-center relative z-10">
                                <div className="px-4 py-1 rounded-full bg-gradient-to-r from-orange-400 to-red-600 text-white text-xs font-bold shadow-md">
                                    Collected: {shinyCount}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}