import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Nieuwe import
import PokemonSpriteModal from "../PokemonSpriteModal.jsx";
import SvHuntTab from "./SvHuntTab.jsx";
import SvSettingsTab from "./SvSettingsTab.jsx";
import SvGotchaReset from "./SvGotchaReset.jsx";

export default function SvModal({ selectedPokemon, onClose, index = 0 }) {
    const navigate = useNavigate(); // Hook initialiseren
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
                setTimer(parsed.timer || 0);
                setCounter(parsed.counter || 0);
                setIsPlaying(parsed.isPlaying || false);
            } catch {
                setTimer(0); setCounter(0); setIsPlaying(false);
            }
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
        const currentCount = Number(localStorage.getItem(`sv_shiny_${selectedPokemon.id}`)) || 0;
        const newCount = currentCount + 1;
        localStorage.setItem(`sv_shiny_${selectedPokemon.id}`, newCount);

        const shinyData = {
            counter: counter,
            timer: timer,
            timestamp: Date.now(),
            game: "Pokémon Scarlet & Violet"
        };
        localStorage.setItem(`sv_shinyData_${selectedPokemon.id}_${newCount}`, JSON.stringify(shinyData));

        resetHunt();
        setShowGotchaConfirm(false);
        onClose();
        navigate("/collection"); // Doorsturen na vangst
    };

    const accentColor = index % 2 === 0 ? "#ff4d00" : "#8c00ff";

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-white border-b-4 border-r-4 border-gray-300 rounded-tr-[30px] rounded-bl-[30px] rounded-tl-lg rounded-br-lg w-full max-w-2xl flex flex-col items-center overflow-hidden shadow-2xl">
                <button onClick={() => { setIsPlaying(false); onClose(); }} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-gray-800 transition-all z-20 group">
                    <span className="text-2xl font-black group-hover:scale-110 transition-transform">✕</span>
                </button>
                <div className="w-full pt-8 px-8 flex flex-col items-center">
                    <div className="px-4 py-1 transform -skew-x-12 mb-2 shadow-sm" style={{ backgroundColor: accentColor }}>
                        <span className="text-xs font-black italic text-white tracking-widest uppercase">
                            No. {String(selectedPokemon.id).padStart(3, "0")}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-[#333] tracking-tighter text-center">
                        {selectedPokemon.name}
                    </h2>
                </div>
                <div className="flex justify-center my-6 gap-2 z-10">
                    {[{ id: "hunt", label: "HUNT" }, { id: "settings", label: "SETTINGS" }].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-10 py-2.5 text-xs font-black italic tracking-widest transition-all transform -skew-x-12 border-b-2 ${
                                activeTab === tab.id ? 'text-white border-black/10 shadow-md' : 'text-gray-400 border-gray-100'
                            }`}
                            style={{ backgroundColor: activeTab === tab.id ? accentColor : 'transparent' }}
                        >
                            <span className="inline-block skew-x-[12deg]">{tab.label}</span>
                        </button>
                    ))}
                </div>
                <div className="w-full px-8 pb-8 flex flex-col items-center">
                    <div className="transform scale-75 -my-6 transition-transform">
                        <PokemonSpriteModal selectedPokemon={selectedPokemon} isPlaying={isPlaying} increment={increment} setCounter={setCounter} />
                    </div>
                    {activeTab === "hunt" ? (
                        <SvHuntTab timer={timer} counter={counter} increment={increment} isPlaying={isPlaying} setTimer={setTimer} setIsPlaying={setIsPlaying} setCounter={setCounter} />
                    ) : (
                        <SvSettingsTab increment={increment} setIncrement={setIncrement} timer={timer} counter={counter} setTimer={setTimer} setCounter={setCounter} onShowConfirm={() => setShowConfirm(true)} onShowGotcha={() => setShowGotchaConfirm(true)} />
                    )}
                </div>
                {showConfirm && <SvGotchaReset message="RESET HUNT DATA?" onCancel={() => setShowConfirm(false)} onConfirm={resetHunt} confirmColor="from-red-500 to-red-600" />}
                {showGotchaConfirm && <SvGotchaReset message="SHINY CAUGHT?" onCancel={() => setShowGotchaConfirm(false)} onConfirm={gotchaHunt} confirmColor="from-green-500 to-green-600" />}
            </div>
        </div>
    );
}