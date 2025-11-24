import React, { useState, useEffect } from "react";

export default function PlzaModal({ selectedPokemon, onClose }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [counter, setCounter] = useState(0);

    // Timer logic
    useEffect(() => {
        let interval;

        if (isPlaying) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isPlaying]);

    // Reset bij sluiten
    const handleClose = () => {
        setIsPlaying(false);
        setTimer(0);
        setCounter(0);
        onClose();
    };

    if (!selectedPokemon) return null;

    const togglePlay = () => {
        setIsPlaying((prev) => !prev);
    };

    const formatTime = (seconds) => {
        const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${mins}:${secs}`;
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl p-10 shadow-2xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto text-center relative"
            >
                {/* Sluitknop */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    ✕
                </button>

                <h2 className="text-3xl font-bold mb-6 capitalize tracking-wide">
                    {selectedPokemon.name}
                </h2>

                {/* Pokémon image (click → +1 counter) */}
                <img
                    src={selectedPokemon.sprites?.other?.home?.front_shiny || "/placeholder.png"}
                    alt={selectedPokemon.name}
                    onClick={() => setCounter((prev) => prev + 1)}
                    className="w-56 h-56 mx-auto drop-shadow-lg cursor-pointer active:scale-95 transition-transform"
                />

                {/* Counter */}
                <div className="mt-6 text-xl font-semibold text-gray-800">
                    Counter: <span className="font-bold">{counter}</span>
                </div>

                {/* Timer */}
                <div className="mt-3 text-2xl font-mono text-gray-800">
                    ⏱️ {formatTime(timer)}
                </div>

                {/* Play / Pause knop */}
                <button
                    onClick={togglePlay}
                    className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all"
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>
            </div>
        </div>
    );
}