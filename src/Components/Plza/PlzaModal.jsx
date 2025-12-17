import React, { useEffect, useState } from "react";
import HuntTab from "../HuntTab.jsx";
import SettingsTab from "../SettingsTab.jsx";
import PokemonSpriteModal from "../PokemonSpriteModal.jsx";
import GotchaResetPopups from "../GotchaResetPopups.jsx";

export default function PlzaModal({ selectedPokemon, onClose, index = 0 }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [counter, setCounter] = useState(0);
    const [increment, setIncrement] = useState(1);
    const [activeTab, setActiveTab] = useState("hunt");

    const [showConfirm, setShowConfirm] = useState(false);
    const [showGotchaConfirm, setShowGotchaConfirm] = useState(false);

    // Laad hunt data elke keer als selectedPokemon verandert
    useEffect(() => {
        if (!selectedPokemon) return;

        const storedData = localStorage.getItem(`hunt_${selectedPokemon.id}`);
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setTimer(parsed.timer || 0);
                setCounter(parsed.counter || 0);
                setIsPlaying(parsed.isPlaying || false);
            } catch {
                setTimer(0);
                setCounter(0);
                setIsPlaying(false);
            }
        } else {
            setTimer(0);
            setCounter(0);
            setIsPlaying(false);
        }

        setActiveTab("hunt");
    }, [selectedPokemon]);

    // Sla hunt data automatisch op bij veranderingen
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

    const resetHunt = () => {
        setCounter(0);
        setTimer(0);
        setIsPlaying(false);
        if (selectedPokemon) localStorage.removeItem(`hunt_${selectedPokemon.id}`);
        setShowConfirm(false);
        setActiveTab("hunt");
    };

    const gotchaHunt = () => {
        if (!selectedPokemon) return;

        const current = Number(localStorage.getItem(`shiny_${selectedPokemon.id}`)) || 0;
        localStorage.setItem(`shiny_${selectedPokemon.id}`, current + 1);

        const key = `shinyData_${selectedPokemon.id}_${current + 1}`;
        const dataToStore = { timer, counter, timestamp: Date.now() };
        localStorage.setItem(key, JSON.stringify(dataToStore));

        resetHunt();
        setShowGotchaConfirm(false);
        onClose();
    };

    const handleClose = () => {
        setTimer(0);
        setCounter(0);
        setIsPlaying(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900 rounded-2xl shadow-xl p-6 sm:p-10 w-[95%] sm:w-[90%] max-w-3xl max-h-[90vh] flex flex-col items-center overflow-hidden"
            >
                <div className={`absolute -top-6 -right-6 w-36 h-36 sm:w-40 sm:h-40 ${topRightColor} opacity-40 blur-3xl pointer-events-none`} />
                <div className={`absolute -bottom-10 -left-10 w-48 h-48 sm:w-56 sm:h-56 ${bottomLeftColor} opacity-40 blur-3xl pointer-events-none`} />

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-white text-xl font-bold shadow-md shadow-purple-500/40 transition-all duration-200 hover:scale-110 hover:shadow-purple-600/50 active:scale-95"
                >
                    ✕
                </button>

                <h2 className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-4 capitalize tracking-wider z-10 text-center">
                    #{String(selectedPokemon.id).padStart(3, "0")} - {selectedPokemon.name}
                </h2>

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
                                className={`text-center font-bold text-base transition-all duration-300 ${
                                    isActive
                                        ? "bg-gradient-to-r from-purple-400 to-blue-500 text-white shadow-md"
                                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                <PokemonSpriteModal
                    selectedPokemon={selectedPokemon}
                    isPlaying={isPlaying}
                    increment={increment}
                    setCounter={setCounter}
                />

                {activeTab === "hunt" && (
                    <HuntTab
                        timer={timer}
                        counter={counter}
                        increment={increment}
                        isPlaying={isPlaying}
                        setTimer={setTimer}
                        setIsPlaying={setIsPlaying}
                        setCounter={setCounter}
                        selectedPokemon={selectedPokemon}
                        onShowConfirm={() => setShowConfirm(true)}
                        onShowGotcha={() => setShowGotchaConfirm(true)}
                    />
                )}

                {activeTab === "settings" && (
                    <SettingsTab
                        increment={increment}
                        setIncrement={setIncrement}
                        timer={timer}
                        counter={counter}
                        setTimer={setTimer}
                        setCounter={setCounter}
                        selectedPokemon={selectedPokemon}
                        onShowConfirm={() => setShowConfirm(true)}
                        onShowGotcha={() => setShowGotchaConfirm(true)}
                    />
                )}

                {showConfirm && (
                    <GotchaResetPopups
                        message="Are you sure you want to reset the timer and counter?"
                        onCancel={() => setShowConfirm(false)}
                        onConfirm={resetHunt}
                        confirmColor="from-red-400 to-red-600"
                    />
                )}

                {showGotchaConfirm && (
                    <GotchaResetPopups
                        message="Are you sure you want to end this hunt?"
                        onCancel={() => setShowGotchaConfirm(false)}
                        onConfirm={gotchaHunt}
                        confirmColor="from-green-400 to-green-600"
                    />
                )}
            </div>
        </div>
    );
}
