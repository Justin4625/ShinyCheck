import React, { useState, useMemo } from "react";

export default function PlzaCollectionModal({ data, onClose, pokemon, shinyIndex, gameName }) {
    const [showConfirm, setShowConfirm] = useState(false);

    // Gebruik useMemo om de kleuren alleen bij de eerste render te bepalen
    const { topRightColor, bottomLeftColor } = useMemo(() => {
        const colors = [
            "bg-green-400",
            "bg-pink-400",
            "bg-blue-400",
            "bg-purple-400",
            "bg-yellow-400",
            "bg-orange-400",
            "bg-teal-400"
        ];
        // eslint-disable-next-line react-hooks/purity
        const randomTop = colors[Math.floor(Math.random() * colors.length)];
        // eslint-disable-next-line react-hooks/purity
        const randomBottom = colors[Math.floor(Math.random() * colors.length)];
        return { topRightColor: randomTop, bottomLeftColor: randomBottom };
    }, []); // De lege array [] zorgt ervoor dat dit nooit opnieuw wordt berekend

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

    const deleteShiny = () => {
        const shinyCount = Number(localStorage.getItem(`shiny_${pokemon.id}`)) || 0;
        if (shinyCount === 0) return;

        localStorage.removeItem(`shinyData_${pokemon.id}_${shinyIndex}`);

        for (let i = shinyIndex + 1; i <= shinyCount; i++) {
            const entry = localStorage.getItem(`shinyData_${pokemon.id}_${i}`);
            if (entry) {
                localStorage.setItem(`shinyData_${pokemon.id}_${i - 1}`, entry);
                localStorage.removeItem(`shinyData_${pokemon.id}_${i}`);
            }
        }

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
                {/* Glow blobs - Deze kleuren blijven nu stabiel */}
                <div className={`absolute -top-6 -right-6 w-36 h-36 sm:w-40 sm:h-40 ${topRightColor} opacity-40 blur-3xl pointer-events-none`} />
                <div className={`absolute -bottom-10 -left-10 w-48 h-48 sm:w-56 sm:h-56 ${bottomLeftColor} opacity-40 blur-3xl pointer-events-none`} />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-white text-xl font-bold shadow-md shadow-purple-500/40 transition-all duration-200 hover:scale-110 hover:shadow-purple-600/50 active:scale-95"
                >
                    ✕
                </button>

                {/* Dex + naam */}
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
                <div className="w-full max-w-xl backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col gap-6 z-10">
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

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="px-6 py-2 rounded-xl font-bold shadow-lg text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700"
                        >
                            Delete Shiny
                        </button>
                    </div>
                </div>

                {showConfirm && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 w-96 text-center shadow-xl flex flex-col gap-4">
                            <p className="font-bold text-gray-800">Are you sure you want to delete this shiny?</p>
                            <div className="flex justify-center gap-4 mt-2">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 font-bold rounded-xl hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={deleteShiny}
                                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}