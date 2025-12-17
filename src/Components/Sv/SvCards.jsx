import React from "react";
import svPokemon from "../../data/SvData.js";

export default function SvCards({ displayedPokemon, pokemonList, openModal}) {
    const isLoading = displayedPokemon.length > 0 && displayedPokemon.some((entry) => {
        const pokemon = pokemonList.find((p) => p.id === entry.id);
        return !pokemon?.sprites?.other?.home?.front_shiny;
    });

    // Statische index opzoeken in de volledige SV lijst (400 stuks)
    const getStaticIndex = (entry) => {
        const index = svPokemon.findIndex(p => p.id === entry.id);
        return index !== -1 ? index + 1 : 1;
    };

    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 z-10">
            {displayedPokemon.length === 0 ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px] sm:min-h-[300px]">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 opacity-50">
                        No Pokémon found
                    </span>
                </div>
            ) : isLoading ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px] sm:min-h-[300px]">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 animate-pulse">
                        Loading...
                    </span>
                </div>
            ) : (
                displayedPokemon.map((entry, index) => {
                    const pokemon = pokemonList.find((p) => p.id === entry.id);
                    const shinyCount = Number(localStorage.getItem(`shiny_${entry.id}`)) || 0;
                    const staticNumber = getStaticIndex(entry);

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(pokemon)}
                            className="relative rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col items-center justify-between cursor-pointer transition-transform duration-300 hover:scale-105 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 shadow-md overflow-hidden"
                        >
                            <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl pointer-events-none
                                ${index % 3 === 0 ? "bg-orange-400 opacity-40" : index % 3 === 1 ? "bg-red-400 opacity-40" : "bg-purple-400 opacity-40"}`}
                            ></div>

                            <div className="w-full flex justify-between items-center mb-3 relative z-10">
                                <h2 className="text-base sm:text-lg md:text-xl font-extrabold capitalize tracking-wide text-gray-900 text-left">
                                    {entry.name}
                                </h2>
                                <span
                                    className="px-2 py-1 text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-md">
                                    {/* Aangepast naar 3 cijfers */}
                                    #{String(staticNumber).padStart(3, "0")}
                                </span>
                            </div>

                            <img
                                src={pokemon?.sprites?.other?.home?.front_shiny}
                                alt={entry.name}
                                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-md relative z-10"
                            />

                            {pokemon?.types && (
                                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 uppercase tracking-wide relative z-10">
                                    {pokemon.types.map((t) => t.type.name).join(" / ")}
                                </p>
                            )}

                            <div className="mt-4 w-full flex justify-center relative z-10">
                                <div
                                    className="px-4 py-1 rounded-full bg-gradient-to-r from-orange-400 to-red-600 text-white text-xs sm:text-sm font-bold shadow-md tracking-wide">
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