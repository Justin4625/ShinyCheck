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

    const inputClass = `
        w-24 px-3 py-2 rounded-xl border-2 border-transparent 
        bg-white/90 backdrop-blur-sm text-center font-bold text-gray-900 
        shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 
        focus:ring-offset-1 transition-all duration-300 h-10
    `;

    const buttonClass = `
        px-6 py-2 rounded-xl font-bold shadow-lg text-white
        transition-all duration-300 transform hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-offset-1
    `;

    return (
        <div className="relative w-full max-w-3xl mx-auto">

            {/* Content */}
            <div className="relative z-10 px-6 py-3 backdrop-blur-md rounded-2xl flex flex-col gap-6 border border-gray-200 shadow-lg">

                {/* Increment + Counter | Timer */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-12 overflow-x-auto py-2">

                    {/* Left: Increment + Counter */}
                    <div className="flex gap-6 flex-shrink-0 items-center">
                        <div className="flex flex-col items-center">
                            <label className="text-gray-700 font-bold text-sm mb-1 text-center">Increment</label>
                            <input
                                type="number"
                                min="1"
                                value={increment}
                                onChange={(e) => setIncrement(Math.max(1, Number(e.target.value)))}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col items-center">
                            <label className="text-gray-700 font-bold text-sm mb-1 text-center">Encounters</label>
                            <input
                                type="number"
                                min="0"
                                value={counter}
                                onChange={(e) => setCounter(Math.max(0, Number(e.target.value)))}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Right: Timer */}
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className="flex gap-3 justify-center flex-wrap sm:flex-nowrap">
                            {["Hour", "Min", "Sec"].map((label, i) => {
                                const value = i === 0 ? hours : i === 1 ? minutes : seconds;
                                const setter = i === 0 ? setHours : i === 1 ? setMinutes : setSeconds;
                                const min = 0;
                                const max = i === 0 ? undefined : 59;
                                return (
                                    <div key={label} className="flex flex-col items-center">
                                        <span className="text-sm font-bold text-gray-700 mb-1">{label}</span>
                                        <input
                                            type="number"
                                            min={min}
                                            max={max}
                                            value={value}
                                            onChange={(e) => setter(Math.min(max ?? Infinity, Math.max(min, Number(e.target.value))))}
                                            className={inputClass}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => setShowConfirm(true)}
                        className={`${buttonClass} bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700`}
                    >
                        Reset
                    </button>
                    <button
                        onClick={() => setShowGotchaConfirm(true)}
                        className={`${buttonClass} bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700`}
                    >
                        Gotcha
                    </button>
                </div>

                {/* Confirmation overlays */}
                {showConfirm && (
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 w-[90%] sm:w-1/2 text-center flex flex-col gap-4 border border-gray-200">
                            <p className="text-gray-900 font-semibold text-lg">Are you sure you want to reset the timer and counter?</p>
                            <div className="flex justify-center gap-4 mt-4">
                                <button onClick={() => setShowConfirm(false)}
                                        className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl shadow-md transition-all duration-200">Cancel
                                </button>
                                <button onClick={resetHunt}
                                        className="px-5 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200">Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showGotchaConfirm && (
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 w-[90%] sm:w-1/2 text-center flex flex-col gap-4 border border-gray-200">
                            <p className="text-gray-900 font-semibold text-lg">Are you sure you want to end this hunt?</p>
                            <div className="flex justify-center gap-4 mt-4">
                                <button onClick={() => setShowGotchaConfirm(false)}
                                        className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl shadow-md transition-all duration-200">Cancel
                                </button>
                                <button onClick={gotchaHunt}
                                        className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200">Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}