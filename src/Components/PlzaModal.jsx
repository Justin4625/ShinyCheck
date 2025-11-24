import React, { useState, useEffect } from "react";

export default function PlzaModal({ selectedPokemon, onClose, index = 0 }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [counter, setCounter] = useState(0);
    const [increment, setIncrement] = useState(1);

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
        setIncrement(1);
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
        index % 3 === 0 ? "bg-green-400" : index % 3 === 1 ? "bg-pink-400" : "bg-blue-400";
    const bottomLeftColor =
        index % 3 === 0 ? "bg-purple-400" : index % 3 === 1 ? "bg-blue-400" : "bg-green-400";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 rounded-2xl shadow-xl p-6 sm:p-10 w-[95%] sm:w-[90%] max-w-3xl max-h-[90vh] flex flex-col items-center overflow-hidden"
            >
                {/* Blobs */}
                <div
                    className={`absolute -top-6 -right-6 w-36 h-36 sm:w-40 sm:h-40 ${topRightColor} opacity-40 blur-3xl pointer-events-none`}
                />
                <div
                    className={`absolute -bottom-10 -left-10 w-48 h-48 sm:w-56 sm:h-56 ${bottomLeftColor} opacity-40 blur-3xl pointer-events-none`}
                />

                {/* Reset knop */}
                <button
                    onClick={() => {
                        setCounter(0);
                        setTimer(0);
                    }}
                    className="absolute top-4 left-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-md z-10 text-sm sm:text-base"
                >
                    Reset
                </button>

                {/* Sluit-knop */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl sm:text-3xl z-10"
                >
                    ✕
                </button>

                {/* Titel */}
                <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6 capitalize tracking-wider z-10 text-center">
                    {selectedPokemon.name}
                </h2>

                {/* Pokémon image */}
                <img
                    src={selectedPokemon.sprites?.other?.home?.front_shiny || "/placeholder.png"}
                    alt={selectedPokemon.name}
                    onClick={() => {
                        if (isPlaying) setCounter((prev) => prev + Number(increment));
                    }}
                    className="w-40 h-40 sm:w-64 sm:h-64 mx-auto drop-shadow-lg cursor-pointer active:scale-95 transition-transform z-10"
                />

                {/* Timer, Counter & Decrement */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 z-10 w-full">
                    {/* Timer */}
                    <div className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-xl shadow-md text-base sm:text-xl font-bold text-gray-600 min-w-[90px] text-center">
                        {formatTime(timer)}
                    </div>

                    {/* Counter + Decrement */}
                    <div className="flex items-center gap-2">
                        <div className="px-6 py-2 sm:py-3 bg-white rounded-xl shadow-md text-xl sm:text-2xl font-bold text-gray-900 min-w-[70px] sm:min-w-[80px] text-center">
                            {counter}
                        </div>
                        <button
                            onClick={() => setCounter((prev) => Math.max(0, prev - Number(increment)))}
                            className="px-3 py-1 sm:px-3 sm:py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-md"
                        >
                            -{increment}
                        </button>
                    </div>
                </div>

                {/* Increment input */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 z-10">
                    <label className="text-gray-700 font-semibold">Increment</label>
                    <input
                        type="number"
                        min="1"
                        value={increment}
                        onChange={(e) => setIncrement(e.target.value)}
                        className="w-20 px-3 py-1 rounded-lg border border-gray-300 text-center no-arrows"
                    />
                </div>

                {/* Play / Pause knop */}
                <div className="mt-6 flex justify-center w-full">
                    <button
                        onClick={() => setIsPlaying((p) => !p)}
                        className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition-transform transform hover:scale-105 active:scale-95"
                    >
                        {isPlaying ? "Pause" : "Start"}
                    </button>
                </div>
            </div>
        </div>
    );
}