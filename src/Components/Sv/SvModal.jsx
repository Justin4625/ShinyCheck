import React, { useEffect, useState } from "react";
import PokemonSpriteModal from "../PokemonSpriteModal.jsx";

// --- INTERNE COMPONENT: SvGotchaReset (Bevestigingsdialoog) ---
function SvConfirmModal({ message, onCancel, onConfirm, confirmColor = "from-blue-400 to-blue-600" }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[60] bg-black/60 backdrop-blur-md">
            <div className="bg-white border-b-4 border-r-4 border-gray-300 rounded-tr-[30px] rounded-bl-[30px] rounded-tl-lg rounded-br-lg p-8 w-[95%] max-w-[450px] text-center flex flex-col gap-6 shadow-2xl transform transition-all">
                <p className="text-[#333] font-black italic text-xl uppercase tracking-tighter leading-tight px-4">
                    {message}
                </p>
                <div className="flex justify-center gap-4 mt-2">
                    <button
                        onClick={onCancel}
                        className="px-8 py-2.5 bg-white border-b-4 border-gray-200 text-gray-400 font-black italic text-xs uppercase tracking-widest transform -skew-x-12 hover:bg-gray-50 hover:text-gray-600 transition-all active:scale-95 shadow-sm"
                    >
                        <span className="block transform skew-x-12">Cancel</span>
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-8 py-2.5 bg-gradient-to-r ${confirmColor} text-white font-black italic text-xs uppercase tracking-widest transform -skew-x-12 shadow-lg border-b-4 border-black/20 hover:scale-105 active:scale-95 transition-all`}
                    >
                        <span className="block transform skew-x-12">Confirm</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- INTERNE COMPONENT: SvHuntTab ---
function HuntTab({ timer, counter, increment, isPlaying, setTimer, setIsPlaying, setCounter }) {
    useEffect(() => {
        let interval;
        if (isPlaying) interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
        return () => clearInterval(interval);
    }, [isPlaying, setTimer]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex flex-wrap items-center gap-4 justify-center w-full">
                <div className="relative">
                    <div className="bg-white px-6 py-3 border-b-4 border-[#8c00ff] transform -skew-x-12 min-w-[140px] text-center shadow-md">
                        <span className="block transform skew-x-12 text-gray-700 font-black italic text-lg">{formatTime(timer)}</span>
                    </div>
                    <label className="absolute -top-3 left-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">Duration</label>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="bg-white px-8 py-3 border-b-4 border-[#ff4d00] transform -skew-x-12 min-w-[100px] text-center shadow-md">
                            <span className="block transform skew-x-12 text-2xl font-black italic text-[#333]">{counter}</span>
                        </div>
                        <label className="absolute -top-3 left-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">Encounters</label>
                    </div>
                    <button
                        onClick={() => setCounter((prev) => Math.max(0, prev - Number(increment)))}
                        className="h-12 w-12 bg-gray-100 text-gray-500 font-black rounded-lg transform -skew-x-12 hover:bg-red-50 hover:text-red-500 transition-all border-b-4 border-transparent shadow-sm"
                    >
                        <span className="block transform skew-x-12 text-sm">-{increment}</span>
                    </button>
                </div>
            </div>
            <button
                onClick={() => setIsPlaying((p) => !p)}
                className={`px-10 py-3 font-black italic tracking-[0.2em] uppercase text-white shadow-lg transform -skew-x-12 transition-all duration-300 hover:scale-105 active:scale-95 border-b-4 border-black/20 text-xs ${isPlaying ? "bg-gray-700" : "bg-gradient-to-r from-[#ff4d00] to-[#ffcc00]"}`}
            >
                <span className="block transform skew-x-12">{isPlaying ? "PAUSE" : timer > 0 ? "CONTINUE" : "START HUNT"}</span>
            </button>
        </div>
    );
}

// --- INTERNE COMPONENT: SvSettingsTab ---
function SettingsTab({ increment, setIncrement, timer, setTimer, counter, setCounter, onShowConfirm, onShowGotcha }) {
    const [hours, setHours] = useState(Math.floor(timer / 3600));
    const [minutes, setMinutes] = useState(Math.floor((timer % 3600) / 60));
    const [seconds, setSeconds] = useState(timer % 60);

    useEffect(() => {
        setTimer(hours * 3600 + minutes * 60 + seconds);
    }, [hours, minutes, seconds, setTimer]);

    const labelClass = "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 transform skew-x-12";
    const inputClass = "w-20 sm:w-24 px-3 py-2 bg-white border-b-4 border-gray-300 text-center font-black italic text-[#333] transform -skew-x-12 focus:outline-none focus:border-[#ff4d00] transition-all shadow-sm text-base";

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center group">
                            <label className={labelClass}>Increment</label>
                            <input type="number" min="1" value={increment} onChange={(e) => setIncrement(Math.max(1, Number(e.target.value)))} className={inputClass} />
                        </div>
                        <div className="flex flex-col items-center group">
                            <label className={labelClass}>Encounters</label>
                            <input type="number" min="0" value={counter} onChange={(e) => setCounter(Math.max(0, Number(e.target.value)))} className={`${inputClass} border-[#ff4d00] text-lg`} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {["Hrs", "Min", "Sec"].map((label, i) => (
                            <div key={label} className="flex flex-col items-center group">
                                <label className={labelClass}>{label}</label>
                                <input type="number" min="0" max={i === 0 ? undefined : 59} value={i === 0 ? hours : i === 1 ? minutes : seconds} onChange={(e) => (i === 0 ? setHours : i === 1 ? setMinutes : setSeconds)(Math.max(0, Number(e.target.value)))} className={`${inputClass} border-[#8c00ff] w-16 sm:w-20`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={onShowConfirm} className="px-8 py-3 bg-white border-b-4 border-red-500 text-red-600 font-black italic transform -skew-x-12 hover:bg-red-50 transition-all text-xs uppercase tracking-widest shadow-md">
                        <span className="block transform skew-x-12">Reset</span>
                    </button>
                    <button onClick={onShowGotcha} className="px-8 py-3 bg-gradient-to-r from-[#ff4d00] to-[#ffcc00] text-white font-black italic transform -skew-x-12 hover:scale-105 transition-all shadow-lg border-b-4 border-black/20 text-xs uppercase tracking-widest">
                        <span className="block transform skew-x-12">Gotcha</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- MAIN COMPONENT: SvModal ---
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTimer(0); setCounter(0); setIsPlaying(false);
        const storedData = localStorage.getItem(`sv_hunt_${selectedPokemon.id}`);
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                setTimer(parsed.timer || 0);
                setCounter(parsed.counter || 0);
                setIsPlaying(parsed.isPlaying || false);
            } catch { /* Foutafhandeling */ }
        }
        setActiveTab("hunt");
    }, [selectedPokemon]);

    useEffect(() => {
        if (!selectedPokemon) return;
        localStorage.setItem(`sv_hunt_${selectedPokemon.id}`, JSON.stringify({ timer, counter, isPlaying, lastUpdated: Date.now() }));
    }, [timer, counter, isPlaying, selectedPokemon]);

    if (!selectedPokemon) return null;

    const resetHunt = () => {
        setCounter(0); setTimer(0); setIsPlaying(false);
        localStorage.removeItem(`sv_hunt_${selectedPokemon.id}`);
        setShowConfirm(false);
        setActiveTab("hunt");
    };

    const gotchaHunt = () => {
        const currentCount = Number(localStorage.getItem(`sv_shiny_${selectedPokemon.id}`)) || 0;
        const newCount = currentCount + 1;
        localStorage.setItem(`sv_shiny_${selectedPokemon.id}`, newCount);
        const shinyData = { pokemonName: selectedPokemon.name, counter, timer, timestamp: Date.now(), game: "Pokémon Scarlet & Violet" };
        localStorage.setItem(`sv_shinyData_${selectedPokemon.id}_${newCount}`, JSON.stringify(shinyData));
        resetHunt();
        setShowGotchaConfirm(false);
        onClose();
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
                        <span className="text-xs font-black italic text-white tracking-widest uppercase">No. {String(selectedPokemon.id).padStart(3, "0")}</span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-[#333] tracking-tighter text-center">{selectedPokemon.name}</h2>
                </div>
                <div className="flex justify-center my-6 gap-2 z-10">
                    {["HUNT", "SETTINGS"].map((label) => (
                        <button
                            key={label}
                            onClick={() => setActiveTab(label.toLowerCase())}
                            className={`px-10 py-2.5 text-xs font-black italic tracking-widest transition-all transform -skew-x-12 border-b-2 ${activeTab === label.toLowerCase() ? 'text-white border-black/10 shadow-md' : 'text-gray-400 border-gray-100'}`}
                            style={{ backgroundColor: activeTab === label.toLowerCase() ? accentColor : 'transparent' }}
                        >
                            <span className="inline-block skew-x-[12deg]">{label}</span>
                        </button>
                    ))}
                </div>
                <div className="w-full px-8 pb-8 flex flex-col items-center">
                    <div className="transform scale-75 -my-6 transition-transform">
                        <PokemonSpriteModal selectedPokemon={selectedPokemon} isPlaying={isPlaying} increment={increment} setCounter={setCounter} />
                    </div>
                    {activeTab === "hunt" ? (
                        <HuntTab timer={timer} counter={counter} increment={increment} isPlaying={isPlaying} setTimer={setTimer} setIsPlaying={setIsPlaying} setCounter={setCounter} />
                    ) : (
                        <SettingsTab increment={increment} setIncrement={setIncrement} timer={timer} counter={counter} setTimer={setTimer} setCounter={setCounter} onShowConfirm={() => setShowConfirm(true)} onShowGotcha={() => setShowGotchaConfirm(true)} />
                    )}
                </div>
                {showConfirm && <SvConfirmModal message="RESET HUNT DATA?" onCancel={() => setShowConfirm(false)} onConfirm={resetHunt} confirmColor="from-red-500 to-red-600" />}
                {showGotchaConfirm && <SvConfirmModal message="SHINY CAUGHT?" onCancel={() => setShowGotchaConfirm(false)} onConfirm={gotchaHunt} confirmColor="from-green-500 to-green-600" />}
            </div>
        </div>
    );
}