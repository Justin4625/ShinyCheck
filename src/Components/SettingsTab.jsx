import React, { useState, useEffect } from "react";

export default function SettingsTab({ increment, setIncrement, timer, setTimer, counter, setCounter, selectedPokemon, onClose }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showGotchaConfirm, setShowGotchaConfirm] = useState(false);

    const [hours, setHours] = useState(Math.floor(timer / 3600));
    const [minutes, setMinutes] = useState(Math.floor((timer % 3600) / 60));
    const [seconds, setSeconds] = useState(timer % 60);

    useEffect(() => {
        setTimer(hours * 3600 + minutes * 60 + seconds);
    }, [hours, minutes, seconds, setTimer]);

    const resetHunt = () => {
        setCounter(0);
        setTimer(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        localStorage.removeItem(`hunt_${selectedPokemon.id}`);
        setShowConfirm(false);
    };

    const gotchaHunt = () => {
        const current = Number(localStorage.getItem(`shiny_${selectedPokemon.id}`)) || 0;
        localStorage.setItem(`shiny_${selectedPokemon.id}`, current + 1);
        const key = `shinyData_${selectedPokemon.id}_${current + 1}`;
        const dataToStore = { timer, counter, timestamp: Date.now() };
        localStorage.setItem(key, JSON.stringify(dataToStore));
        resetHunt();
        setShowGotchaConfirm(false);
        onClose();
    };

    const inputClass = "w-24 px-3 py-2 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-center font-semibold transition-all duration-200 h-12";

    return (
        <div className="px-4 py-6 bg-white rounded-2xl shadow-lg w-full max-w-3xl mx-auto flex flex-col gap-6">

            {/* Increment, Counter, Timer */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">

                {/* Increment */}
                <div className="flex flex-col items-center">
                    <label className="text-gray-600 font-bold text-sm mb-1 text-center">Increment</label>
                    <input
                        type="number"
                        min="1"
                        value={increment}
                        onChange={(e) => setIncrement(Math.max(1, Number(e.target.value)))}
                        className={inputClass}
                    />
                </div>

                {/* Counter */}
                <div className="flex flex-col items-center">
                    <label className="text-gray-600 font-bold text-sm mb-1 text-center">Counter</label>
                    <input
                        type="number"
                        min="0"
                        value={counter}
                        onChange={(e) => setCounter(Math.max(0, Number(e.target.value)))}
                        className={inputClass}
                    />
                </div>

                {/* Timer */}
                <div className="flex flex-col items-center mt-1">
                    <div className="flex gap-3 justify-center">
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-bold text-gray-600 mb-1">Hours</span>
                            <input
                                type="number"
                                min="0"
                                value={hours}
                                onChange={(e) => setHours(Math.max(0, Number(e.target.value)))}
                                className="w-16 px-2 py-1 rounded-lg border border-gray-300 text-center text-gray-800 font-medium"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-bold text-gray-600 mb-1">Mins</span>
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={minutes}
                                onChange={(e) => setMinutes(Math.min(59, Math.max(0, Number(e.target.value))))}
                                className="w-16 px-2 py-1 rounded-lg border border-gray-300 text-center text-gray-800 font-medium"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-bold text-gray-600 mb-1">Secs</span>
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={seconds}
                                onChange={(e) => setSeconds(Math.min(59, Math.max(0, Number(e.target.value))))}
                                className="w-16 px-2 py-1 rounded-lg border border-gray-300 text-center text-gray-800 font-medium"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                    onClick={() => setShowConfirm(true)}
                    className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                    Reset
                </button>
                <button
                    onClick={() => setShowGotchaConfirm(true)}
                    className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
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
                                    className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl shadow-md transition-all duration-200">Cancel
                            </button>
                            <button onClick={resetHunt}
                                    className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold rounded-xl shadow-md transition-all duration-200">Confirm
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
                                    className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl shadow-md transition-all duration-200">Cancel
                            </button>
                            <button onClick={gotchaHunt}
                                    className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200">Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}