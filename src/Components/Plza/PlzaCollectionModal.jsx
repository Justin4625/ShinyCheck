import React from "react";

export default function PlzaCollectionModal({ data, onClose, pokemon, shinyIndex, gameName }) {
    if (!data || !pokemon) return null;

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString("nl-NL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // 🔹 Random colors voor glow blobs
    const colors = ["bg-green-400", "bg-pink-400", "bg-blue-400", "bg-purple-400", "bg-yellow-400", "bg-orange-400", "bg-teal-400"];
    const topRightColor = colors[Math.floor(Math.random() * colors.length)];
    const bottomLeftColor = colors[Math.floor(Math.random() * colors.length)];

    // Delete shiny entry uit localStorage
    const deleteShiny = () => {
        const shinyCount = Number(localStorage.getItem(`shiny_${pokemon.id}`)) || 0;
        if (shinyCount === 0) return;

        // Verwijder de geselecteerde shiny
        localStorage.removeItem(`shinyData_${pokemon.id}_${shinyIndex}`);

        // Verplaats hogere indices naar beneden
        for (let i = shinyIndex + 1; i <= shinyCount; i++) {
            const data = localStorage.getItem(`shinyData_${pokemon.id}_${i}`);
            if (data) {
                localStorage.setItem(`shinyData_${pokemon.id}_${i - 1}`, data);
                localStorage.removeItem(`shinyData_${pokemon.id}_${i}`);
            }
        }

        // Update shiny count
        const newCount = shinyCount - 1;
        if (newCount > 0) {
            localStorage.setItem(`shiny_${pokemon.id}`, newCount);
        } else {
            localStorage.removeItem(`shiny_${pokemon.id}`);
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 rounded-2xl shadow-xl p-6 sm:p-10 w-[95%] sm:w-[90%] max-w-3xl max-h-[90vh] flex flex-col items-center overflow-hidden"
            >
                {/* 🔹 Random glow blobs */}
                <div
                    className={`absolute -top-6 -right-6 w-36 h-36 sm:w-40 sm:h-40 ${topRightColor} opacity-40 blur-3xl pointer-events-none`}
                />
                <div
                    className={`absolute -bottom-10 -left-10 w-48 h-48 sm:w-56 sm:h-56 ${bottomLeftColor} opacity-40 blur-3xl pointer-events-none`}
                />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-white text-xl font-bold shadow-md shadow-purple-500/40 transition-all duration-200 hover:scale-110 hover:shadow-purple-600/50 active:scale-95"
                >
                    ✕
                </button>

                {/* Dex nummer + naam boven sprite */}
                <h2 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4 capitalize tracking-wider z-10 text-center">
                    #{String(pokemon.id).padStart(3, "0")} - {pokemon.name}
                </h2>

                {/* Shiny index badge */}
                {shinyIndex && (
                    <div className="absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-md">
                        Shiny #{shinyIndex}
                    </div>
                )}

                {/* Shiny sprite */}
                <img
                    src={pokemon?.sprites?.other?.home?.front_shiny}
                    alt={pokemon.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 mb-6 drop-shadow-xl z-10"
                />

                {/* Info box */}
                <div className="w-full max-w-xl backdrop-blur-md bg-white/90 rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col gap-6 z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-sm text-gray-600 font-bold mb-1">Encounters</p>
                            <div className="font-extrabold text-xl bg-white rounded-xl py-2 shadow">
                                {data.counter}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 font-bold mb-1">Timer</p>
                            <div className="font-extrabold text-xl bg-white rounded-xl py-2 shadow">
                                {formatTime(data.timer)}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 font-bold mb-1">Date</p>
                            <div className="font-extrabold text-md bg-white rounded-xl py-2 shadow">
                                {formatDate(data.timestamp)}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 font-bold mb-1">Game</p>
                            <div className="font-extrabold text-md bg-white rounded-xl py-2 shadow">
                                {gameName || "Unknown Game"}
                            </div>
                        </div>
                    </div>

                    {/* Delete button */}
                    <button
                        onClick={deleteShiny}
                        className="mt-4 w-full py-2 bg-red-500 text-white font-bold rounded-xl shadow-md hover:bg-red-600 transition-colors duration-300"
                    >
                        Delete Shiny
                    </button>
                </div>
            </div>
        </div>
    );
}