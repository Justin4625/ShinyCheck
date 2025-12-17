import React from "react";
// Importeer de bronbestanden om de originele index te bepalen
import plzaPokemon from "../../data/PlzaData.js";
import plzaMdPokemon from "../../data/PlzaMdData.js";

export default function PlzaCards({ displayedPokemon, pokemonList, openModal, activeTab }) {
    const isLoading = displayedPokemon.length > 0 && displayedPokemon.some((entry) => {
        const pokemon = pokemonList.find((p) => p.id === entry.id);
        return !pokemon?.sprites?.other?.home?.front_shiny;
    });

    // Hulpfunctie om het vaste nummer te bepalen op basis van de tab
    const getStaticIndex = (entry) => {
        if (activeTab === "mega") {
            const index = plzaMdPokemon.findIndex(p => p.id === entry.id);
            return index + 1;
        }
        // Voor base, collection of active gebruiken we de base lijst indexering
        const index = plzaPokemon.findIndex(p => p.id === entry.id);
        // Als hij niet in base staat (bijv. in collection tab), check dan mega
        if (index === -1) {
            const mdIndex = plzaMdPokemon.findIndex(p => p.id === entry.id);
            return mdIndex !== -1 ? mdIndex + 1 : 1;
        }
        return index + 1;
    };

    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 z-10">
            {displayedPokemon.length === 0 ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px] sm:min-h-[300px]">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
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
                    // Gebruik de unieke PLZA prefix voor de data-scheiding
                    const shinyCount = Number(localStorage.getItem(`plza_shiny_${entry.id}`)) || 0;
                    const isGolden = (activeTab === "base" || activeTab === "mega") && shinyCount >= 1;

                    // Bepaal het nummer dat altijd hetzelfde blijft
                    const staticNumber = getStaticIndex(entry);

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(pokemon)}
                            className={`
                                relative rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col items-center justify-between cursor-pointer transition-transform duration-300 overflow-hidden
                                hover:scale-105
                                bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 shadow-md
                                ${isGolden ? "before:absolute before:inset-0 before:bg-gradient-to-br before:from-yellow-200 before:via-yellow-100/100 before:to-transparent before:pointer-events-none before:rounded-2xl" : ""}
                            `}
                        >
                            {/* De gekleurde achtergrond blobs (Hersteld) */}
                            <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl pointer-events-none
                                ${index % 3 === 0 ? "bg-green-400 opacity-60" : index % 3 === 1 ? "bg-pink-400 opacity-60" : "bg-blue-400 opacity-60"}`}
                            ></div>

                            <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full blur-3xl pointer-events-none
                                ${index % 3 === 0 ? "bg-purple-400 opacity-60" : index % 3 === 1 ? "bg-blue-400 opacity-60" : "bg-green-400 opacity-60"}`}
                            ></div>

                            {/* Header met naam en badge */}
                            <div className="w-full flex justify-between items-center mb-3 relative z-10">
                                <h2 className="text-base sm:text-lg md:text-xl font-extrabold capitalize tracking-wide text-gray-900 text-left">
                                    {entry.name}
                                </h2>
                                <span
                                    className="px-2 py-1 text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-full shadow-md relative z-10">
                                    #{String(staticNumber).padStart(3, "0")}
                                </span>
                            </div>

                            {/* Sprite */}
                            <img
                                src={pokemon?.sprites?.other?.home?.front_shiny}
                                alt={entry.name}
                                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-md relative z-10"
                            />

                            {/* Types */}
                            {pokemon?.types && (
                                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 uppercase tracking-wide relative z-10">
                                    {pokemon.types.map((t) => t.type.name).join(" / ")}
                                </p>
                            )}

                            {/* Footer met Collected count */}
                            <div className="mt-4 w-full flex justify-center relative z-10">
                                <div
                                    className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-white text-xs sm:text-sm font-bold shadow-md tracking-wide">
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