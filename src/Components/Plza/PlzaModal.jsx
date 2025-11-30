import React, { useEffect, useState } from "react";
import PlzaHuntTab from "./PlzaHuntTab.jsx";
import PlzaSettingsTab from "./PlzaSettingsTab.jsx";

export default function PlzaModal({ selectedPokemon, onClose, index = 0 }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [counter, setCounter] = useState(0);
    const [increment, setIncrement] = useState(1);
    const [activeTab, setActiveTab] = useState("hunt");

    // Load previous hunt data
    useEffect(() => {
        if (!selectedPokemon) return;
        const storedData = localStorage.getItem(`hunt_${selectedPokemon.id}`);
        if (!storedData) return;
        const { timer: storedTimer = 0, counter: storedCounter = 0 } = JSON.parse(storedData);
        setTimeout(() => {
            setTimer(storedTimer);
            setCounter(storedCounter);
        }, 0);
    }, [selectedPokemon]);

    // Save hunt data
    useEffect(() => {
        if (!selectedPokemon) return;
        localStorage.setItem(
            `hunt_${selectedPokemon.id}`,
            JSON.stringify({ timer, counter, isPlaying, timestamp: Date.now() })
        );
    }, [timer, counter, isPlaying, selectedPokemon]);

    if (!selectedPokemon) return null;

    const topRightColor = index % 3 === 0 ? "bg-green-400" : index % 3 === 1 ? "bg-pink-400" : "bg-blue-400";
    const bottomLeftColor = index % 3 === 0 ? "bg-purple-400" : index % 3 === 1 ? "bg-blue-400" : "bg-green-400";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 rounded-2xl shadow-xl p-6 sm:p-10 w-[95%] sm:w-[90%] max-w-3xl max-h-[90vh] flex flex-col items-center overflow-hidden"
            >
                {/* Background blur circles */}
                <div className={`absolute -top-6 -right-6 w-36 h-36 sm:w-40 sm:h-40 ${topRightColor} opacity-40 blur-3xl pointer-events-none`} />
                <div className={`absolute -bottom-10 -left-10 w-48 h-48 sm:w-56 sm:h-56 ${bottomLeftColor} opacity-40 blur-3xl pointer-events-none`} />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-white text-xl font-bold shadow-md shadow-purple-500/40 transition-all duration-200 hover:scale-110 hover:shadow-purple-600/50 active:scale-95"
                >
                    ✕
                </button>

                {/* Pokémon title */}
                <h2 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4 capitalize tracking-wider z-10 text-center">
                    #{String(selectedPokemon.id).padStart(3, "0")} - {selectedPokemon.name}
                </h2>

                {/* Tabs */}
                <div className="flex justify-center mb-6 gap-[2px] z-10">
                    {[
                        { id: "hunt", label: "Hunt" },
                        { id: "settings", label: "Settings" },
                    ].map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)", width: "160px", height: "42px" }}
                                className={`text-center font-bold text-base transition-all duration-300 ${isActive
                                    ? "bg-gradient-to-r from-purple-400 to-blue-500 text-white shadow-md"
                                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Pokémon sprite */}
                <img
                    src={selectedPokemon.sprites?.other?.home?.front_shiny}
                    alt={selectedPokemon.name}
                    onClick={() => { if (isPlaying && activeTab === "hunt") setCounter((prev) => prev + Number(increment)); }}
                    className="w-40 h-40 sm:w-64 sm:h-64 mx-auto drop-shadow-lg cursor-pointer active:scale-95 transition-transform z-10"
                />

                {/* Hunt tab */}
                {activeTab === "hunt" && (
                    <PlzaHuntTab
                        timer={timer}
                        counter={counter}
                        increment={increment}
                        isPlaying={isPlaying}
                        setTimer={setTimer}
                        setIsPlaying={setIsPlaying}
                        setCounter={setCounter}
                    />
                )}

                {/* Settings tab */}
                {activeTab === "settings" && (
                    <PlzaSettingsTab
                        increment={increment}
                        setIncrement={setIncrement}
                        timer={timer}
                        counter={counter}
                        setTimer={setTimer}
                        setCounter={setCounter}
                        selectedPokemon={selectedPokemon}
                    />
                )}
            </div>
        </div>
    );
}