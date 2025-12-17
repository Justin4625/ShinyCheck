import React, { useEffect, useState } from "react";
import HuntTab from "../HuntTab.jsx";
import SettingsTab from "../SettingsTab.jsx";
import PokemonSpriteModal from "../PokemonSpriteModal.jsx";
import GotchaResetPopups from "../GotchaResetPopups.jsx";

export default function SvModal({ selectedPokemon, onClose, index = 0 }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [counter, setCounter] = useState(0);
    const [increment, setIncrement] = useState(1);
    const [activeTab, setActiveTab] = useState("hunt");

    const [showConfirm, setShowConfirm] = useState(false);
    const [showGotchaConfirm, setShowGotchaConfirm] = useState(false);

    // Laad data in bij openen
    useEffect(() => {
        if (!selectedPokemon) return;
        const storedData = localStorage.getItem(`sv_hunt_${selectedPokemon.id}`);
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setTimer(parsed.timer || 0);
                setCounter(parsed.counter || 0);
                setIsPlaying(parsed.isPlaying || false);
            } catch {
                setTimer(0); setCounter(0); setIsPlaying(false);
            }
        } else {
            setTimer(0); setCounter(0); setIsPlaying(false);
        }
        setActiveTab("hunt");
    }, [selectedPokemon]);

    // Sla data op bij wijzigingen
    useEffect(() => {
        if (!selectedPokemon) return;
        localStorage.setItem(
            `sv_hunt_${selectedPokemon.id}`,
            JSON.stringify({ timer, counter, isPlaying, timestamp: Date.now() })
        );
    }, [timer, counter, isPlaying, selectedPokemon]);

    if (!selectedPokemon) return null;

    const resetHunt = () => {
        setCounter(0); setTimer(0); setIsPlaying(false);
        if (selectedPokemon) localStorage.removeItem(`sv_hunt_${selectedPokemon.id}`);
        setShowConfirm(false);
        setActiveTab("hunt");
    };

    const gotchaHunt = () => {
        if (!selectedPokemon) return;
        const current = Number(localStorage.getItem(`sv_shiny_${selectedPokemon.id}`)) || 0;
        localStorage.setItem(`sv_shiny_${selectedPokemon.id}`, current + 1);

        const key = `sv_shinyData_${selectedPokemon.id}_${current + 1}`;
        const dataToStore = { timer, counter, timestamp: Date.now(), game: "Pokémon Scarlet & Violet" };
        localStorage.setItem(key, JSON.stringify(dataToStore));

        resetHunt();
        setShowGotchaConfirm(false);
        onClose();
    };

    const handleClose = () => {
        setIsPlaying(false);
        onClose();
    };

    // SV accentkleuren gebaseerd op index
    const accentColor = index % 2 === 0 ? "#ff4d00" : "#8c00ff";

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white border-b-[6px] border-r-[6px] border-gray-300 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-lg rounded-br-lg w-full max-w-2xl flex flex-col items-center overflow-hidden shadow-2xl"
            >
                {/* S&V Decoratie hoek */}
                <div
                    className="absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 rotate-45 opacity-10 pointer-events-none"
                    style={{ backgroundColor: accentColor }}
                />

                {/* Verbeterde Sluitknop (X) */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-800 transition-all z-20 group"
                >
                    <span className="text-2xl font-black group-hover:scale-125 transition-transform">✕</span>
                </button>

                {/* Header in Dex-stijl */}
                <div className="w-full pt-10 px-8 flex flex-col items-center">
                    <div
                        className="px-4 py-1 transform -skew-x-12 mb-3 shadow-md"
                        style={{ backgroundColor: accentColor }}
                    >
                        <span className="text-xs font-black italic text-white tracking-widest uppercase">
                            No. {String(selectedPokemon.id).padStart(3, "0")}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black uppercase italic text-[#333] tracking-tighter text-center leading-none">
                        {selectedPokemon.name}
                    </h2>
                </div>

                {/* Tab Navigatie met "SETTINGS" */}
                <div className="flex justify-center my-8 gap-2 z-10">
                    {[
                        { id: "hunt", label: "HUNT" },
                        { id: "settings", label: "SETTINGS" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-10 py-2.5 text-xs font-black italic tracking-[0.15em] transition-all transform skew-x-[-15deg] border-b-4 ${
                                activeTab === tab.id
                                    ? 'text-white border-black/20 shadow-lg'
                                    : 'text-gray-400 border-gray-100 hover:bg-gray-50'
                            }`}
                            style={{ backgroundColor: activeTab === tab.id ? accentColor : 'transparent' }}
                        >
                            <span className="inline-block skew-x-[15deg]">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="w-full px-6 pb-12 flex flex-col items-center">
                    <div className="mb-6 transform transition-transform hover:scale-105">
                        <PokemonSpriteModal
                            selectedPokemon={selectedPokemon}
                            isPlaying={isPlaying}
                            increment={increment}
                            setCounter={setCounter}
                        />
                    </div>

                    {activeTab === "hunt" ? (
                        <HuntTab
                            timer={timer} counter={counter} increment={increment} isPlaying={isPlaying}
                            setTimer={setTimer} setIsPlaying={setIsPlaying} setCounter={setCounter}
                            selectedPokemon={selectedPokemon}
                            onShowConfirm={() => setShowConfirm(true)}
                            onShowGotcha={() => setShowGotchaConfirm(true)}
                        />
                    ) : (
                        <SettingsTab
                            increment={increment} setIncrement={setIncrement} timer={timer} counter={counter}
                            setTimer={setTimer} setCounter={setCounter} selectedPokemon={selectedPokemon}
                            onShowConfirm={() => setShowConfirm(true)}
                            onShowGotcha={() => setShowGotchaConfirm(true)}
                        />
                    )}
                </div>

                {/* Popups in SV Thema */}
                {showConfirm && (
                    <GotchaResetPopups
                        message="RESET HUNT DATA?"
                        onCancel={() => setShowConfirm(false)}
                        onConfirm={resetHunt}
                        confirmColor="from-red-500 to-red-600"
                    />
                )}
                {showGotchaConfirm && (
                    <GotchaResetPopups
                        message="SHINY CAUGHT?"
                        onCancel={() => setShowGotchaConfirm(false)}
                        onConfirm={gotchaHunt}
                        confirmColor="from-green-500 to-green-600"
                    />
                )}
            </div>
        </div>
    );
}