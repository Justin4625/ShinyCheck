import React from "react";

export default function ShinyDexCards({ displayedPokemon, openModal }) {
    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 z-10">
            {displayedPokemon.length === 0 ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px] sm:min-h-[300px]">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-500 animate-pulse">
                        Loading...
                    </span>
                </div>
            ) : (
                displayedPokemon.map((entry) => {
                    const number = String(entry.id).padStart(4, "0");

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(entry)}
                            className="relative w-full bg-gradient-to-br from-cyan-50 via-blue-50 to-white rounded-3xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center p-5 sm:p-6 border border-cyan-200"
                        >
                            {/* Nummer en naam */}
                            <div className="w-full flex justify-between items-center mb-3">
                                <h2 className="text-base sm:text-lg md:text-xl font-extrabold capitalize tracking-wide text-gray-900 text-left">
                                    {entry.name}
                                </h2>
                                <span className="px-2 py-1 text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-white rounded-full shadow-md">
                                    #{number}
                                </span>
                            </div>

                            {/* Pokémon Sprite */}
                            <div className="relative">
                                <img
                                    src={entry?.sprites?.other?.home?.front_shiny}
                                    alt={entry.name}
                                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
                                />
                            </div>

                            {/* Types onder de sprite */}
                            {entry?.types && (
                                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 uppercase tracking-wide relative z-10">
                                    {entry.types.map((t) => t.type.name).join(" / ")}
                                </p>
                            )}

                            {/* Bottom accent bar */}
                            <div className="w-3/4 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 rounded-full mt-4"></div>
                        </div>
                    );
                })
            )}
        </div>
    );
}