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
        setTimer(0); setCounter(0); setIsPlaying(false);
        onClose();
    };

    const topRightColor = index % 3 === 0 ? "bg-orange-400" : index % 3 === 1 ? "bg-red-400" : "bg-yellow-400";
    const bottomLeftColor = index % 3 === 0 ? "bg-red-500" : index % 3 === 1 ? "bg-orange-500" : "bg-red-400";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-xl p-6 sm:p-10 w-[95%] max-w-3xl flex flex-col items-center overflow-hidden">
                <div className={`absolute -top-6 -right-6 w-36 h-36 ${topRightColor} opacity-40 blur-3xl pointer-events-none`} />
                <div className={`absolute -bottom-10 -left-10 w-48 h-48 ${bottomLeftColor} opacity-40 blur-3xl pointer-events-none`} />

                <button onClick={handleClose} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white font-bold transition-transform hover:scale-110">✕</button>

                <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 capitalize">#{String(selectedPokemon.id).padStart(3, "0")} - {selectedPokemon.name}</h2>

                <div className="flex justify-center mb-6 gap-[2px] z-10">
                    {[{ id: "hunt", label: "Hunt" }, { id: "settings", label: "Settings" }].map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)", width: "160px", height: "42px" }} className={`text-center font-bold text-base transition-all ${activeTab === tab.id ? "bg-gradient-to-r from-orange-400 to-red-600 text-white" : "bg-gray-300 text-gray-700"}`}>{tab.label}</button>
                    ))}
                </div>

                <PokemonSpriteModal selectedPokemon={selectedPokemon} isPlaying={isPlaying} increment={increment} setCounter={setCounter} />
                {activeTab === "hunt" ? (
                    <HuntTab timer={timer} counter={counter} increment={increment} isPlaying={isPlaying} setTimer={setTimer} setIsPlaying={setIsPlaying} setCounter={setCounter} selectedPokemon={selectedPokemon} onShowConfirm={() => setShowConfirm(true)} onShowGotcha={() => setShowGotchaConfirm(true)} />
                ) : (
                    <SettingsTab increment={increment} setIncrement={setIncrement} timer={timer} counter={counter} setTimer={setTimer} setCounter={setCounter} selectedPokemon={selectedPokemon} onShowConfirm={() => setShowConfirm(true)} onShowGotcha={() => setShowGotchaConfirm(true)} />
                )}

                {showConfirm && <GotchaResetPopups message="Are you sure you want to reset?" onCancel={() => setShowConfirm(false)} onConfirm={resetHunt} confirmColor="from-red-400 to-red-600" />}
                {showGotchaConfirm && <GotchaResetPopups message="End this hunt?" onCancel={() => setShowGotchaConfirm(false)} onConfirm={gotchaHunt} confirmColor="from-green-400 to-green-600" />}
            </div>
        </div>
    );
}