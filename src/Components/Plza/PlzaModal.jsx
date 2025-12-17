import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Nieuwe import
import PlzaHuntTab from "./PlzaHuntTab.jsx";
import PlzaSettingsTab from "./PlzaSettingsTab.jsx";
import PokemonSpriteModal from "../PokemonSpriteModal.jsx";
import PlzaGotchaReset from "./PlzaGotchaReset.jsx";

export default function PlzaModal({ selectedPokemon, onClose}) {
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
        const storedData = localStorage.getItem(`plza_hunt_${selectedPokemon.id}`);
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
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
            `plza_hunt_${selectedPokemon.id}`,
            JSON.stringify({ timer, counter, isPlaying, timestamp: Date.now() })
        );
    }, [timer, counter, isPlaying, selectedPokemon]);

    if (!selectedPokemon) return null;

    const resetHunt = () => {
        setCounter(0); setTimer(0); setIsPlaying(false);
        if (selectedPokemon) localStorage.removeItem(`plza_hunt_${selectedPokemon.id}`);
        setShowConfirm(false);
        setActiveTab("hunt");
    };

    const gotchaHunt = () => {
        if (!selectedPokemon) return;
        const current = Number(localStorage.getItem(`plza_shiny_${selectedPokemon.id}`)) || 0;
        localStorage.setItem(`plza_shiny_${selectedPokemon.id}`, current + 1);
        const key = `plza_shinyData_${selectedPokemon.id}_${current + 1}`;
        const dataToStore = { timer, counter, timestamp: Date.now(), game: "Legends: Z-A" };
        localStorage.setItem(key, JSON.stringify(dataToStore));
        resetHunt();
        setShowGotchaConfirm(false);
        onClose();
        navigate("/collection"); // Doorsturen na vangst
    };

    const handleClose = () => {
        setIsPlaying(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 w-full max-w-2xl flex flex-col items-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                <button onClick={handleClose} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-cyan-500 transition-all z-20 group">
                    <span className="text-xl font-black group-hover:scale-110 transition-transform">✕</span>
                </button>
                <div className="flex flex-col items-center mb-6 relative z-10">
                    <div className="px-3 py-1 bg-cyan-500 rounded-full mb-2 shadow-lg shadow-cyan-200">
                        <span className="text-[10px] font-black italic text-white tracking-widest uppercase">
                            No. {String(selectedPokemon.id).padStart(3, "0")}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-800 tracking-tighter">
                        {selectedPokemon.name}
                    </h2>
                </div>
                <div className="flex justify-center mb-8 gap-2 z-10">
                    {[{ id: "hunt", label: "HUNT" }, { id: "settings", label: "SETTINGS" }].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-10 py-2 text-[11px] font-black italic tracking-widest transition-all rounded-xl border-2 ${
                                activeTab === tab.id
                                    ? 'bg-white border-cyan-500 text-cyan-600 shadow-lg shadow-cyan-100'
                                    : 'bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="transform scale-90 mb-4 transition-transform relative z-10">
                    <div className="absolute inset-0 bg-cyan-400/10 blur-3xl rounded-full"></div>
                    <PokemonSpriteModal selectedPokemon={selectedPokemon} isPlaying={isPlaying} increment={increment} setCounter={setCounter} />
                </div>
                {activeTab === "hunt" ? (
                    <PlzaHuntTab timer={timer} counter={counter} increment={increment} isPlaying={isPlaying} setTimer={setTimer} setIsPlaying={setIsPlaying} setCounter={setCounter} onShowConfirm={() => setShowConfirm(true)} onShowGotcha={() => setShowGotchaConfirm(true)} />
                ) : (
                    <PlzaSettingsTab increment={increment} setIncrement={setIncrement} timer={timer} counter={counter} setTimer={setTimer} setCounter={setCounter} onShowConfirm={() => setShowConfirm(true)} onShowGotcha={() => setShowGotchaConfirm(true)} />
                )}
                {showConfirm && <PlzaGotchaReset message="RESET HUNT DATA?" onCancel={() => setShowConfirm(false)} onConfirm={resetHunt} confirmColor="from-pink-500 to-pink-600" />}
                {showGotchaConfirm && <PlzaGotchaReset message="SHINY CAUGHT?" onCancel={() => setShowGotchaConfirm(false)} onConfirm={gotchaHunt} confirmColor="from-cyan-500 to-cyan-600" />}
            </div>
        </div>
    );
}