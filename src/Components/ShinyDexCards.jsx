import React from "react";

export default function ShinyDexCards({ displayedPokemon, openModal }) {
    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 z-10">
            {displayedPokemon.length === 0 ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px] sm:min-h-[300px]">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-400 animate-pulse">
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
                            className="relative w-full bg-gradient-to-br from-gray-900/20 to-gray-800/30 backdrop-blur-lg border border-gray-700/40 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_50px_rgba(0,0,0,0.5)] hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center p-5 sm:p-6"
                        >
                            {/* Nummer en naam */}
                            <div className="w-full flex justify-between items-center mb-3">
                                <h2 className="text-base sm:text-lg md:text-xl font-extrabold capitalize tracking-wide text-white text-left">
                                    {entry.name}
                                </h2>
                                <span className="px-2 py-1 text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white rounded-full shadow-[0_2px_10px_rgba(0,255,255,0.5)]">
                                    #{number}
                                </span>
                            </div>

                            {/* Pokémon Sprite */}
                            <div className="relative">
                                <img
                                    src={entry?.sprites?.other?.home?.front_shiny}
                                    alt={entry.name}
                                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                                />
                                {/* Neon glow overlay */}
                                <div className="absolute inset-0 rounded-3xl ring-1 ring-cyan-400/50 pointer-events-none animate-pulse"></div>
                            </div>

                            {/* Bottom accent bar */}
                            <div className="w-3/4 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full mt-4 animate-pulse"></div>
                        </div>
                    );
                })
            )}
        </div>
    );
}