import React from "react";

export default function PlzaCollectionModal({ data, onClose, pokemon, gameName }) {
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

    const capitalizedName =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-[95%] sm:w-[90%] max-w-2xl max-h-[90vh] flex flex-col items-center overflow-hidden">

                {/* ✅ GLOWS ACHTER WIT VLAK */}
                <div className="absolute -top-14 -right-14 w-56 h-56 bg-purple-400 opacity-40 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-400 opacity-40 blur-3xl pointer-events-none"></div>

                {/* ✅ WITTE MODAL */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 rounded-2xl shadow-xl p-6 sm:p-10 w-full flex flex-col items-center z-10">

                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-white text-xl font-bold shadow-md hover:scale-110 transition"
                    >
                        ✕
                    </button>

                    {/* Titel */}
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center tracking-wide">
                        {capitalizedName} — Capture Info
                    </h2>

                    {/* ✅ INFO VLAK */}
                    <div className="w-full max-w-xl backdrop-blur-md bg-white/90 rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col gap-6">
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
                    </div>
                </div>
            </div>
        </div>
    );
}