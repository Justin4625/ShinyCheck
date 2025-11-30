import React, { useState } from "react";

export default function PlzaSettingsTab({ increment, setIncrement, timer, counter, setTimer, setCounter, selectedPokemon }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showGotchaConfirm, setShowGotchaConfirm] = useState(false);

    const resetHunt = () => {
        setCounter(0);
        setTimer(0);
        localStorage.removeItem(`hunt_${selectedPokemon.id}`);
        setShowConfirm(false);
    };

    const gotchaHunt = () => {
        const current = Number(localStorage.getItem(`shiny_${selectedPokemon.id}`)) || 0;
        localStorage.setItem(`shiny_${selectedPokemon.id}`, current + 1);
        const key = `shinyData_${selectedPokemon.id}_${current + 1}`;
        const dataToStore = { timer, counter, timestamp: Date.now() };
        localStorage.setItem(key, JSON.stringify(dataToStore));
        setCounter(0);
        setTimer(0);
        localStorage.removeItem(`hunt_${selectedPokemon.id}`);
        setShowGotchaConfirm(false);
        alert("Gotcha! 🎉");
    };

    return (
        <div className="px-4 py-3 bg-white rounded-xl shadow-md w-full text-center flex flex-col gap-4 items-center mt-4">

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

            <div className="flex gap-3 w-full justify-center">
                <button
                    onClick={() => setShowConfirm(true)}
                    className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                    Reset
                </button>

                <button
                    onClick={() => setShowGotchaConfirm(true)}
                    className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                    Gotcha
                </button>
            </div>

            {/* Confirmation overlays */}
            {showConfirm && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] sm:w-1/2 text-center flex flex-col gap-4">
                        <p className="text-gray-800 font-semibold text-lg">Are you sure you want to reset the timer and counter?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button onClick={() => setShowConfirm(false)}
                                    className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95">Cancel
                            </button>
                            <button onClick={resetHunt}
                                    className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95">Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showGotchaConfirm && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] sm:w-1/2 text-center flex flex-col gap-4">
                        <p className="text-gray-800 font-semibold text-lg">Are you sure you want to end this hunt?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button onClick={() => setShowGotchaConfirm(false)}
                                    className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95">Cancel
                            </button>
                            <button onClick={gotchaHunt}
                                    className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95">Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}