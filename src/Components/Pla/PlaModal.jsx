import React, { useEffect, useState } from "react";
import PokemonSpriteModal from "../PokemonSpriteModal.jsx";

// --- INTERNE COMPONENT: HuntTab ---
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
                {/* Timer Display - Antieke Veldgids Stijl */}
                <div className="relative transform -skew-x-3">
                    <div className="bg-[#f4f1ea] px-6 py-3 border-b-4 border-amber-900/60 shadow-md">
                        <span className="block transform skew-x-3 text-slate-800 font-black italic text-lg tracking-tight">
                            {formatTime(timer)}
                        </span>
                    </div>
                    <label className="absolute -top-3 left-2 text-[9px] font-black text-amber-900/40 uppercase tracking-widest italic bg-[#f4f1ea] px-1">Duration</label>
                </div>

                {/* Counter Display - Antieke Veldgids Stijl */}
                <div className="flex items-center gap-3">
                    <div className="relative transform -skew-x-3">
                        <div className="bg-[#f4f1ea] px-8 py-3 border-b-4 border-slate-900 shadow-md">
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

// --- INTERNE COMPONENT: SettingsTab ---
function SettingsTab({ increment, setIncrement, timer, setTimer, counter, setCounter, onShowConfirm, onShowGotcha }) {
    const [hours, setHours] = useState(Math.floor(timer / 3600));
    const [minutes, setMinutes] = useState(Math.floor((timer % 3600) / 60));
    const [seconds, setSeconds] = useState(timer % 60);

    useEffect(() => {
        setTimer(hours * 3600 + minutes * 60 + seconds);
    }, [hours, minutes, seconds, setTimer]);

    const labelClass = "text-[9px] font-black text-amber-900/50 uppercase tracking-widest mb-1 italic transform skew-x-3";
    // Breedte aangepast naar w-16/w-18 voor een betere balans tussen 'groot genoeg' en 'past precies'
    const inputClass = "w-16 sm:w-18 px-1.5 py-2 bg-[#f4f1ea] border-2 border-amber-900/10 border-b-amber-900/30 text-center font-black italic text-slate-800 transform -skew-x-6 focus:outline-none focus:border-amber-700 transition-all text-sm shadow-inner";

    return (
        <div className="w-full max-w-2xl mx-auto relative z-10 px-4">
            <div className="bg-[#eaddca]/30 p-6 border-2 border-amber-900/10 shadow-inner flex flex-col gap-8">
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">

                    {/* Logistieke Groep: Inc & Count */}
                    <div className="flex gap-3 sm:gap-5">
                        <div className="flex flex-col items-center">
                            <label className={labelClass}>Inc.</label>
                            <input type="number" min="1" value={increment} onChange={(e) => setIncrement(Math.max(1, Number(e.target.value)))} className={inputClass} />
                        </div>
                        <div className="flex flex-col items-center">
                            <label className={labelClass}>Count</label>
                            <input type="number" min="0" value={counter} onChange={(e) => setCounter(Math.max(0, Number(e.target.value)))} className={`${inputClass} border-amber-600 text-base`} />
                        </div>
                    </div>

                    {/* Chronologische Groep: Hrs, Min, Sec */}
                    <div className="flex gap-2 sm:gap-3">
                        {["Hrs", "Min", "Sec"].map((label, i) => {
                            const val = i === 0 ? hours : i === 1 ? minutes : seconds;
                            const set = i === 0 ? setHours : i === 1 ? setMinutes : setSeconds;
                            return (
                                <div key={label} className="flex flex-col items-center">
                                    <label className={labelClass}>{label}</label>
                                    <input type="number" min="0" max={i === 0 ? undefined : 59} value={val} onChange={(e) => set(Math.max(0, Number(e.target.value)))} className={`${inputClass} border-amber-800 w-14 sm:w-16`} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-center gap-6 mt-2">
                    <button onClick={onShowConfirm} className="px-8 py-3 bg-white border-2 border-amber-900/10 border-b-4 border-b-slate-200 text-slate-400 font-black italic transform -skew-x-12 hover:text-red-800 hover:border-b-red-800 transition-all text-[11px] uppercase tracking-widest shadow-sm">
                        <span className="block transform skew-x-12">Reset Survey</span>
                    </button>
                    <button onClick={onShowGotcha} className="px-10 py-3 bg-amber-700 text-white font-black italic transform -skew-x-12 hover:bg-amber-600 transition-all shadow-lg border-b-4 border-black/30 text-[11px] uppercase tracking-widest">
                        <span className="block transform skew-x-12">Shiny Found</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- INTERNE COMPONENT: ConfirmModal ---
function ConfirmModal({ message, onCancel, onConfirm, confirmColor = "from-amber-600 to-amber-800" }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[60] bg-slate-900/80 backdrop-blur-sm p-4">
            <div className="bg-[#f4f1ea] border-b-8 border-r-8 border-amber-900/20 p-8 w-full max-w-[440px] text-center flex flex-col gap-6 relative overflow-hidden shadow-2xl">
                <p className="relative z-10 text-slate-800 font-black italic text-xl uppercase tracking-tighter leading-tight">{message}</p>
                <div className="relative z-10 flex justify-center gap-4 mt-2">
                    <button onClick={onCancel} className="flex-1 px-6 py-3 bg-white border-b-4 border-slate-200 text-slate-400 font-black italic transform -skew-x-12 text-[10px] uppercase tracking-widest hover:text-slate-600 transition-all shadow-sm">
                        <span className="block transform skew-x-12">Cancel</span>
                    </button>
                    <button onClick={onConfirm} className={`flex-1 px-6 py-3 bg-gradient-to-r ${confirmColor} text-white font-black italic transform -skew-x-12 text-[10px] uppercase tracking-widest shadow-lg border-b-4 border-black/20 transition-all hover:scale-105`}>
                        <span className="block transform skew-x-12">Confirm</span>
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
            `pla_hunt_${selectedPokemon.id}`,
            JSON.stringify({ timer, counter, isPlaying, timestamp: Date.now() })
        );
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

        const shinyData = {
            pokemonName: selectedPokemon.name,
            counter: counter,
            timer: timer,
            timestamp: Date.now(),
            game: "Pokémon Legends: Arceus"
        };
        localStorage.setItem(`pla_shinyData_${selectedPokemon.id}_${newCount}`, JSON.stringify(shinyData));

        resetHunt();
        setShowGotchaConfirm(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            {/* Modal Container met Houten Rand effect */}
            <div onClick={(e) => e.stopPropagation()} className="relative bg-[#f4f1ea] border-b-[12px] border-r-[12px] border-amber-900/10 p-6 sm:p-8 w-full max-w-2xl flex flex-col items-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

                <button onClick={() => { setIsPlaying(false); onClose(); }} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-white/50 text-slate-400 hover:text-amber-800 transition-all z-20 group border border-amber-900/10">
                    <span className="text-xl font-black group-hover:scale-110 transition-transform">✕</span>
                </button>

                <div className="flex flex-col items-center mb-6 relative z-10">
                    <div className="px-4 py-1 bg-amber-700 transform -skew-x-12 mb-2 shadow-md">
                        <span className="text-[10px] font-black italic text-white tracking-widest uppercase block transform skew-x-12">
                            No. {String(selectedPokemon.id).padStart(3, "0")}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-800 tracking-tighter border-b-2 border-amber-900/10 pb-1 px-6">{selectedPokemon.name}</h2>
                </div>

                <div className="flex justify-center mb-8 gap-2 z-10 w-full max-w-md">
                    {["hunt", "settings"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 text-[11px] font-black italic tracking-widest transition-all transform -skew-x-12 border-b-4 ${
                                activeTab === tab
                                    ? 'bg-amber-600 border-amber-900 text-white shadow-lg -translate-y-1'
                                    : 'bg-white border-slate-200 text-slate-400 hover:bg-[#eaddca]'
                            }`}
                        >
                            <span className="block transform skew-x-12">{tab.toUpperCase()}</span>
                        </button>
                    ))}
                </div>

                <div className="transform scale-90 mb-4 transition-transform relative z-10">
                    <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full"></div>
                    <PokemonSpriteModal selectedPokemon={selectedPokemon} isPlaying={isPlaying} increment={increment} setCounter={setCounter} />
                </div>

                {activeTab === "hunt" ? (
                    <HuntTab
                        timer={timer} counter={counter} increment={increment} isPlaying={isPlaying}
                        setTimer={setTimer} setIsPlaying={setIsPlaying} setCounter={setCounter}
                    />
                ) : (
                    <SettingsTab
                        increment={increment} setIncrement={setIncrement} timer={timer} counter={counter}
                        setTimer={setTimer} setCounter={setCounter}
                        onShowConfirm={() => setShowConfirm(true)} onShowGotcha={() => setShowGotchaConfirm(true)}
                    />
                )}

                {showConfirm && <ConfirmModal message="RESET HUNT DATA?" onCancel={() => setShowConfirm(false)} onConfirm={resetHunt} confirmColor="from-red-700 to-red-950" />}
                {showGotchaConfirm && <ConfirmModal message="SHINY CAUGHT?" onCancel={() => setShowGotchaConfirm(false)} onConfirm={gotchaHunt} confirmColor="from-amber-600 to-amber-700" />}
            </div>
        </div>
    );
}