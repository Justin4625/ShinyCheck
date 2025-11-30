import React from "react";

export default function PlzaCards({ displayedPokemon, pokemonList, openModal, activeTab }) {
    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 z-10">
            {displayedPokemon.length === 0 ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px] sm:min-h-[300px]">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
                        {activeTab === "mega" && "Coming Soon!"}
                    </span>
                </div>
            ) : (
                displayedPokemon.map((entry, index) => {
                    const number = String(entry.id).padStart(3, "0");
                    const pokemon = pokemonList.find((p) => p.id === entry.id);
                    const shinyCount = Number(localStorage.getItem(`shiny_${entry.id}`)) || 0;

                    const isGolden = (activeTab === "base" || activeTab === "mega") && shinyCount >= 1;

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(pokemon)}
                            className={`
                                relative rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col items-center justify-between cursor-pointer transition-transform duration-300 overflow-hidden
                                hover:scale-105
                                ${isGolden
                                ? "bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-400 text-gray-900 shadow-md"
                                : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 shadow-md"}
                            `}
                        >
                            {/* Blobs */}
                            <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl pointer-events-none
                                ${index % 3 === 0 ? "bg-green-400 opacity-40" : index % 3 === 1 ? "bg-pink-400 opacity-40" : "bg-blue-400 opacity-40"}`}
                            ></div>

                            <div className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full blur-3xl pointer-events-none
                                ${index % 3 === 0 ? "bg-purple-400 opacity-40" : index % 3 === 1 ? "bg-blue-400 opacity-40" : "bg-green-400 opacity-40"}`}
                            ></div>

                            <h2 className="text-sm sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 capitalize tracking-wide text-center">
                                {entry.name} (#{number})
                            </h2>

                            <img
                                src={pokemon?.sprites?.other?.home?.front_shiny}
                                alt={entry.name}
                                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-md"
                            />

                            {pokemon?.types && (
                                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
                                    {pokemon.types.map((t) => t.type.name).join(" / ")}
                                </p>
                            )}

                            <div className="mt-4 w-full flex justify-center">
                                <div className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-white text-xs sm:text-sm font-bold shadow-md tracking-wide">
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