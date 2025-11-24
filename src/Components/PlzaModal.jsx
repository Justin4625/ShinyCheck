import React, { useState, useEffect } from "react";

export default function PlzaModal({ selectedPokemon, onClose, index = 0 }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleClose = () => {
        setIsPlaying(false);
        setTimer(0);
        setCounter(0);
        onClose();
    };

    if (!selectedPokemon) return null;

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    // Blob kleuren afwisselen
    const topRightColor =
        index % 3 === 0 ? "bg-green-400" :
            index % 3 === 1 ? "bg-pink-400" :
                "bg-blue-400";

    const bottomLeftColor =
        index % 3 === 0 ? "bg-purple-400" :
            index % 3 === 1 ? "bg-blue-400" :
                "bg-green-400";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 rounded-2xl shadow-xl p-10 w-[90%] max-w-3xl max-h-[90vh] flex flex-col items-center"
            >
                {/* Blobs */}
                <div
                    className={`absolute -top-6 -right-6 w-40 h-40 ${topRightColor} opacity-40 blur-3xl pointer-events-none`}></div>
                <div
                    className={`absolute -bottom-10 -left-10 w-56 h-56 ${bottomLeftColor} opacity-40 blur-3xl pointer-events-none`}></div>

                {/* Sluit-knop */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-3xl z-10"
                >
                    ✕
                </button>

                {/* Titel */}
                <h2 className="text-4xl font-extrabold mb-6 capitalize tracking-wider z-10">
                    {selectedPokemon.name}
                </h2>

                {/* Pokémon image */}
                <img
                    src={selectedPokemon.sprites?.other?.home?.front_shiny || "/placeholder.png"}
                    alt={selectedPokemon.name}
                    onClick={() => setCounter((prev) => prev + 1)}
                    className="w-64 h-64 mx-auto drop-shadow-lg cursor-pointer active:scale-95 transition-transform z-10"
                />

                {/* Counter en Timer */}
                <div className="mt-6 flex gap-4 z-10">
                    {/* Counter */}
                    <div
                        className="px-4 py-2 bg-white rounded-xl shadow-md text-xl font-bold text-gray-900 min-w-[60px] text-center">
                        {counter}
                    </div>

                    {/* Timer */}
                    <div
                        className="px-4 py-2 bg-white rounded-xl shadow-md text-xl font-bold text-gray-800 min-w-[90px] text-center"
                    >
                        {formatTime(timer)}
                    </div>
                </div>

                {/* Play / Pause knop met alleen icon */}
                <button
                    onClick={() => setIsPlaying((p) => !p)}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 z-10"
                >
                    {isPlaying ? "Pause" : "Start"}
                </button>
            </div>
        </div>
    );
}