import React, { useEffect, useState } from "react";
import PokemonSpriteModal from "../PokemonSpriteModal.jsx";

// --- INTERNE COMPONENT: HuntTab (Arceus Stijl) ---
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
        <div className="flex flex-col items-center gap-6 w-full relative z-10">
            <div className="flex flex-wrap items-center gap-4 justify-center w-full">
                <div className="relative transform -skew-x-3">
                    <div className="bg-[#f4f1ea] px-6 py-3 border-b-4 border-amber-900/60 shadow-md min-w-[140px] text-center">
                        <span className="block transform skew-x-3 text-slate-800 font-black italic text-lg tracking-tight">
                            {formatTime(timer)}
                        </span>
                    </div>
                    <label className="absolute -top-3 left-2 text-[9px] font-black text-amber-900/40 uppercase tracking-widest italic bg-[#f4f1ea] px-1">Duration</label>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative transform -skew-x-3">
                        <div className="bg-[#f4f1ea] px-8 py-3 border-b-4 border-slate-900 shadow-md min-w-[100px] text-center">
                            <span className="block transform skew-x-3 text-2xl font-black italic text-slate-900 tracking-tighter">
                                {counter}
                            </span>
                        </div>
                        <label className="absolute -top-3 left-2 text-[9px] font-black text-amber-900/40 uppercase tracking-widest italic bg-[#f4f1ea] px-1">Encounters</label>
                    </div>
                    <button
                        onClick={() => setCounter((prev) => Math.max(0, prev - Number(increment)))}
                        className="h-12 w-12 bg-[#eaddca] text-amber-900 font-black transform -skew-x-12 hover:bg-red-800 hover:text-white transition-all border-b-4 border-amber-900/30 shadow-sm flex items-center justify-center"
                    >
                        <span className="block transform skew-x-12">-{increment}</span>
                    </button>
                </div>
            </div>

            <button
                onClick={() => setIsPlaying((p) => !p)}
                className={`px-12 py-3.5 font-black italic tracking-[0.3em] uppercase text-white shadow-xl transform -skew-x-6 transition-all duration-300 hover:scale-105 active:scale-95 text-xs border-b-4 border-black/30 ${
                    isPlaying ? "bg-slate-800" : "bg-amber-700 shadow-amber-900/20"
                }`}
            >
                <span className="block transform skew-x-6">
                    {isPlaying ? "PAUSE" : timer > 0 ? "CONTINUE" : "START HUNT"}
                </span>
            </button>
        </div>
    );
}

// --- INTERNE COMPONENT: SettingsTab (Arceus Stijl) ---
function SettingsTab({ increment, setIncrement, timer, setTimer, counter, setCounter, onShowConfirm, onShowGotcha }) {
    const [hours, setHours] = useState(Math.floor(timer / 3600));
    const [minutes, setMinutes] = useState(Math.floor((timer % 3600) / 60));
    const [seconds, setSeconds] = useState(timer % 60);

    useEffect(() => {
        setTimer(hours * 3600 + minutes * 60 + seconds);
    }, [hours, minutes, seconds, setTimer]);

    const labelClass = "text-[10px] font-black text-amber-900/50 uppercase tracking-widest mb-1.5 transform skew-x-3";
    const inputClass = "w-20 sm:w-24 px-3 py-2 bg-[#f4f1ea] border-b-4 border-amber-900/20 text-center font-black italic text-[#333] transform -skew-x-6 focus:outline-none focus:border-amber-700 transition-all shadow-sm text-base";

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-[#eaddca]/30 p-6 border border-amber-900/10 flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <label className={labelClass}>Increment</label>
                            <input type="number" min="1" value={increment} onChange={(e) => setIncrement(Math.max(1, Number(e.target.value)))} className={inputClass} />
                        </div>
                        <div className="flex flex-col items-center">
                            <label className={labelClass}>Encounters</label>
                            <input type="number" min="0" value={counter} onChange={(e) => setCounter(Math.max(0, Number(e.target.value)))} className={`${inputClass} border-amber-600 text-lg`} />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {["Hrs", "Min", "Sec"].map((label, i) => (
                            <div key={label} className="flex flex-col items-center">
                                <label className={labelClass}>{label}</label>
                                <input type="number" min="0" max={i === 0 ? undefined : 59} value={i === 0 ? hours : i === 1 ? minutes : seconds} onChange={(e) => (i === 0 ? setHours : i === 1 ? setMinutes : setSeconds)(Math.max(0, Number(e.target.value)))} className={`${inputClass} border-amber-800 w-16 sm:w-20`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={onShowConfirm} className="px-8 py-3 bg-white border-b-4 border-red-500 text-red-600 font-black italic transform -skew-x-12 hover:bg-red-50 transition-all text-xs uppercase tracking-widest shadow-md">
                        <span className="block transform skew-x-12">Reset</span>
                    </button>
                    <button onClick={onShowGotcha} className="px-8 py-3 bg-amber-700 text-white font-black italic transform -skew-x-12 hover:scale-105 transition-all shadow-lg border-b-4 border-black/20 text-xs uppercase tracking-widest">
                        <span className="block transform skew-x-12">Gotcha</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- MAIN EXPORT: PlaModal ---
export default function PlaModal({ selectedPokemon, onClose }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [counter, setCounter] = useState(0);
    const [increment, setIncrement] = useState(1);
    const [activeTab, setActiveTab] = useState("hunt");
    const [showConfirm, setShowConfirm] = useState(false);
    const [showGotchaConfirm, setShowGotchaConfirm] = useState(false);

    useEffect(() => {
        if (!selectedPokemon) return;
        const storedData = localStorage.getItem(`pla_hunt_${selectedPokemon.id}`);
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                setTimer(parsed.timer || 0);
                setCounter(parsed.counter || 0);
                setIsPlaying(parsed.isPlaying || false);
            } catch { /* Error handling */ }
        } else {
            setTimer(0); setCounter(0); setIsPlaying(false);
        }
        setActiveTab("hunt");
    }, [selectedPokemon]);

    useEffect(() => {
        if (!selectedPokemon) return;
        localStorage.setItem(`pla_hunt_${selectedPokemon.id}`, JSON.stringify({ timer, counter, isPlaying, lastUpdated: Date.now() }));
    }, [timer, counter, isPlaying, selectedPokemon]);

    if (!selectedPokemon) return null;

    const resetHunt = () => {
        setCounter(0); setTimer(0); setIsPlaying(false);
        localStorage.removeItem(`pla_hunt_${selectedPokemon.id}`);
        setShowConfirm(false);
        setActiveTab("hunt");
    };

    const gotchaHunt = () => {
        const currentCount = Number(localStorage.getItem(`pla_shiny_${selectedPokemon.id}`)) || 0;
        const newCount = currentCount + 1;
        localStorage.setItem(`pla_shiny_${selectedPokemon.id}`, newCount);
        resetHunt();
        setShowGotchaConfirm(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            {/* Modal Container: Zelfde max-w en structuur als SvModal */}
            <div onClick={(e) => e.stopPropagation()} className="relative bg-[#f4f1ea] border-b-[12px] border-r-[12px] border-amber-900/10 w-full max-w-2xl flex flex-col items-center overflow-hidden shadow-2xl">

                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

                {/* Close Button: Zelfde positie als SvModal */}
                <button onClick={() => { setIsPlaying(false); onClose(); }} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/50 text-slate-400 hover:text-amber-800 transition-all z-20 group border border-amber-900/10">
                    <span className="text-2xl font-black group-hover:scale-110 transition-transform">✕</span>
                </button>

                {/* Header: Zelfde padding als SvModal */}
                <div className="w-full pt-8 px-8 flex flex-col items-center">
                    <div className="px-4 py-1 bg-amber-700 transform -skew-x-12 mb-2 shadow-sm">
                        <span className="text-xs font-black italic text-white tracking-widest uppercase">No. {String(selectedPokemon.id).padStart(3, "0")}</span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-800 tracking-tighter text-center">{selectedPokemon.name}</h2>
                </div>

                {/* Tabs: Zelfde gap en margin als SvModal */}
                <div className="flex justify-center my-6 gap-2 z-10">
                    {["HUNT", "SETTINGS"].map((label) => (
                        <button
                            key={label}
                            onClick={() => setActiveTab(label.toLowerCase())}
                            className={`px-10 py-2.5 text-xs font-black italic tracking-widest transition-all transform -skew-x-12 border-b-2 ${
                                activeTab === label.toLowerCase()
                                    ? 'bg-[#3e3b38] text-[#eaddca] border-black/10 shadow-md'
                                    : 'bg-white text-slate-400 border-gray-100'
                            }`}
                        >
                            <span className="inline-block skew-x-[12deg]">{label}</span>
                        </button>
                    ))}
                </div>

                {/* Body: Zelfde padding en sprite-schaling als SvModal */}
                <div className="w-full px-8 pb-8 flex flex-col items-center">
                    <div className="transform scale-75 -my-6 transition-transform relative">
                        <div className="absolute inset-0 bg-amber-400/10 blur-2xl rounded-full"></div>
                        <PokemonSpriteModal selectedPokemon={selectedPokemon} isPlaying={isPlaying} increment={increment} setCounter={setCounter} />
                    </div>

                    {activeTab === "hunt" ? (
                        <HuntTab timer={timer} counter={counter} increment={increment} isPlaying={isPlaying} setTimer={setTimer} setIsPlaying={setIsPlaying} setCounter={setCounter} />
                    ) : (
                        <SettingsTab increment={increment} setIncrement={setIncrement} timer={timer} counter={counter} setTimer={setTimer} setCounter={setCounter} onShowConfirm={() => setShowConfirm(true)} onShowGotcha={() => setShowGotchaConfirm(true)} />
                    )}
                </div>

                {/* Confirm Modals */}
                {showConfirm && <ConfirmModal message="RESET HUNT DATA?" onCancel={() => setShowConfirm(false)} onConfirm={resetHunt} confirmColor="from-red-700 to-red-950" />}
                {showGotchaConfirm && <ConfirmModal message="SHINY FOUND?" onCancel={() => setShowGotchaConfirm(false)} onConfirm={gotchaHunt} confirmColor="from-amber-600 to-amber-700" />}
            </div>
        </div>
    );
}