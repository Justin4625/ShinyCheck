import React, { useEffect, useState } from "react";

export default function PlzaModal({ selectedPokemon, onClose, index = 0 }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [counter, setCounter] = useState(0);
    const [increment, setIncrement] = useState(1);
    const [activeTab, setActiveTab] = useState("hunt");
    const [showConfirm, setShowConfirm] = useState(false);

    // Timer effect
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Reset active tab to Hunt on new Pokémon
    useEffect(() => {
        if (selectedPokemon) {
            const id = setTimeout(() => setActiveTab("hunt"), 0);
            return () => clearTimeout(id);
        }
    }, [selectedPokemon]);

    if (!selectedPokemon) return null;

    const handleClose = () => {
        setIsPlaying(false);
        setTimer(0);
        setCounter(0);
        setIncrement(1);
        setShowConfirm(false);
        onClose();
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

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

                {/* Sluit-knop */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-white text-xl font-bold shadow-md shadow-purple-500/40 transition-all duration-200 hover:scale-110 hover:shadow-purple-600/50 active:scale-95"
                >
                    ✕
                </button>

                {/* Titel */}
                <h2 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4 capitalize tracking-wider z-10 text-center">
                    #{String(selectedPokemon.id).padStart(3, "0")} - {selectedPokemon.name}
                </h2>

                {/* Tabs */}
                <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <button
                        className={`px-4 py-2 rounded-t-lg font-semibold ${
                            activeTab === "hunt"
                                ? "bg-white text-gray-900 shadow-md"
                                : "bg-gray-300 text-gray-600"
                        }`}
                        onClick={() => setActiveTab("hunt")}
                    >
                        Hunt
                    </button>
                    <button
                        className={`px-4 py-2 rounded-t-lg font-semibold ${
                            activeTab === "settings"
                                ? "bg-white text-gray-900 shadow-md"
                                : "bg-gray-300 text-gray-600"
                        }`}
                        onClick={() => setActiveTab("settings")}
                    >
                        Settings
                    </button>
                </div>

                {/* Pokémon image (altijd zichtbaar) */}
                <img
                    src={selectedPokemon.sprites?.other?.home?.front_shiny || "/placeholder.png"}
                    alt={selectedPokemon.name}
                    onClick={() => {
                        if (isPlaying && activeTab === "hunt") setCounter((prev) => prev + Number(increment));
                    }}
                    className="w-40 h-40 sm:w-64 sm:h-64 mx-auto drop-shadow-lg cursor-pointer active:scale-95 transition-transform z-10"
                />

                {/* Hunt Tab content */}
                {activeTab === "hunt" && (
                    <div className="flex flex-col items-center gap-6 w-full mt-4">
                        {/* Timer + Counter */}
                        <div className="flex items-center gap-4 justify-center flex-wrap sm:flex-nowrap w-full">
                            {/* Timer */}
                            <div className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-xl shadow-md text-gray-600 font-bold text-base sm:text-xl text-center min-w-[90px]">
                                {formatTime(timer)}
                            </div>

                            {/* Counter + Decrement */}
                            <div className="flex items-center gap-2 justify-center">
                                <div className="px-6 py-2 sm:py-3 bg-white rounded-xl shadow-md text-xl sm:text-2xl font-bold text-gray-900 min-w-[70px] sm:min-w-[80px] text-center">
                                    {counter}
                                </div>
                                <button
                                    onClick={() =>
                                        setCounter((prev) => Math.max(0, prev - Number(increment)))
                                    }
                                    className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                                >
                                    -{increment}
                                </button>
                            </div>
                        </div>

                        {/* Start / Pause knop */}
                        <button
                            onClick={() => setIsPlaying((p) => !p)}
                            className={`
                                px-6 py-3 sm:px-8 sm:py-4 font-bold rounded-xl text-white shadow-lg transform hover:scale-105 transition-all duration-300
                                bg-gradient-to-r ${isPlaying
                                ? "from-blue-600 via-purple-600 to-blue-700"
                                : "from-green-500 via-lime-600 to-green-600"} 
                                bg-[length:200%_200%] bg-[position:0%_50%] hover:bg-[position:100%_50%]
                            `}
                        >
                            {isPlaying ? "Pause" : "Start"}
                        </button>
                    </div>
                )}

                {/* Settings Tab content */}
                {activeTab === "settings" && (
                    <div className="px-4 py-3 bg-white rounded-xl shadow-md w-full text-center flex flex-col gap-4 items-center mt-4">
                        {/* Increment input */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                            <label className="text-gray-700 font-semibold">Increment</label>
                            <input
                                type="number"
                                min="1"
                                value={increment}
                                onChange={(e) => setIncrement(e.target.value)}
                                className="w-20 px-3 py-1 rounded-lg border border-gray-300 text-center no-arrows"
                            />
                        </div>

                        {/* Reset + Gotcha buttons */}
                        <div className="flex gap-3 w-full justify-center">
                            {/* Reset */}
                            <button
                                onClick={() => setShowConfirm(true)}
                                className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                            >
                                Reset
                            </button>

                            {/* Gotcha */}
                            <button
                                onClick={() => {
                                    setIsPlaying(false);
                                    setCounter(0);
                                    setTimer(0);
                                    alert("Gotcha! 🎉");
                                }}
                                className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                            >
                                Gotcha
                            </button>
                        </div>
                    </div>
                )}

                {/* Custom Reset Confirmation */}
                {showConfirm && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] sm:w-1/2 text-center flex flex-col gap-4">
                            <p className="text-gray-800 font-semibold text-lg">
                                Are you sure you want to reset the timer and counter?
                            </p>
                            <div className="flex justify-center gap-4 mt-4">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setCounter(0);
                                        setTimer(0);
                                        setShowConfirm(false);
                                    }}
                                    className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}