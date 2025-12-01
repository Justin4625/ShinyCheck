import React from "react";

export default function ShinyDexCards({ displayedPokemon, openModal }) {
    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 z-10">
            {displayedPokemon.length === 0 ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px] sm:min-h-[300px]">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
                        Loading...
                    </span>
                </div>
            ) : (
                displayedPokemon.map((entry, index) => {
                    const number = String(entry.id).padStart(3, "0");

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(entry)}
                            className={`
                                relative rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col items-center justify-between cursor-pointer transition-transform duration-300 overflow-hidden
                                hover:scale-105
                                bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 shadow-md
                            `}
                        >
                            {/* Blobs */}
                            <div
                                className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl pointer-events-none
                                ${index % 3 === 0 ? "bg-green-400 opacity-40" : index % 3 === 1 ? "bg-pink-400 opacity-40" : "bg-blue-400 opacity-40"}`}
                            ></div>

                            <div
                                className={`absolute -bottom-4 -left-4 w-24 h-24 rounded-full blur-3xl pointer-events-none
                                ${index % 3 === 0 ? "bg-purple-400 opacity-40" : index % 3 === 1 ? "bg-blue-400 opacity-40" : "bg-green-400 opacity-40"}`}
                            ></div>

                            <h2 className="text-sm sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 capitalize tracking-wide text-center">
                                {entry.name} (#{number})
                            </h2>

                            {/* Pokémon Sprite */}
                            <img
                                src={entry?.sprites?.other?.home?.front_shiny}
                                alt={entry.name}
                                className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-md"
                            />

                            {/* Types */}
                            {entry?.types && (
                                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 uppercase tracking-wide">
                                    {entry.types.map((t) => t.type.name).join(" / ")}
                                </p>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}