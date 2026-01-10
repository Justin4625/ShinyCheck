import React, { useEffect, useState } from "react";
import PlzaHuntTab from "./PlzaHuntTab.jsx";
import PokemonSpriteModal from "../PokemonSpriteModal.jsx";

// Interne Component: PlzaSettingsTab
function SettingsTab({ increment, setIncrement, timer, setTimer, counter, setCounter, onShowConfirm, onShowGotcha }) {
    const [hours, setHours] = useState(Math.floor(timer / 3600));
    const [minutes, setMinutes] = useState(Math.floor((timer % 3600) / 60));
    const [seconds, setSeconds] = useState(timer % 60);

    useEffect(() => {
        setTimer(hours * 3600 + minutes * 60 + seconds);
    }, [hours, minutes, seconds, setTimer]);

    const inputContainerClass = "relative flex flex-col items-center group";
    const labelClass = "text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5";
    const inputClass = "w-20 sm:w-24 px-3 py-2 bg-slate-50 border-b-2 border-slate-200 text-center font-black italic text-slate-800 rounded-xl focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-300 shadow-sm text-sm";

    return (
        <div className="w-full max-w-2xl mx-auto relative z-10 px-4">
            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex flex-col gap-8 shadow-inner">
                <div className="flex flex-col sm:flex-row items-center justify-around gap-8">
                    <div className="flex gap-4">
                        <div className={inputContainerClass}>
                            <label className={labelClass}>Increment</label>
                            <input type="number" min="1" value={increment} onChange={(e) => setIncrement(Math.max(1, Number(e.target.value)))} className={inputClass} />
                        </div>
                        <div className={inputContainerClass}>
                            <label className={labelClass}>Encounters</label>
                            <input type="number" min="0" value={counter} onChange={(e) => setCounter(Math.max(0, Number(e.target.value)))} className={`${inputClass} border-cyan-500 text-lg`} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {["Hrs", "Min", "Sec"].map((label, i) => {
                            const value = i === 0 ? hours : i === 1 ? minutes : seconds;
                            const setter = i === 0 ? setHours : i === 1 ? setMinutes : setSeconds;
                            return (
                                <div key={label} className={inputContainerClass}>
                                    <label className={labelClass}>{label}</label>
                                    <input type="number" min="0" max={i === 0 ? undefined : 59} value={value} onChange={(e) => setter(Math.max(0, Number(e.target.value)))} className={`${inputClass} border-pink-500 w-16 sm:w-20`} />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={onShowConfirm} className="px-10 py-3 bg-white border border-slate-200 text-slate-400 font-black italic rounded-2xl hover:text-pink-500 hover:border-pink-200 transition-all text-[10px] uppercase tracking-widest shadow-sm">Reset</button>
                    <button onClick={onShowGotcha} className="px-10 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-black italic rounded-2xl hover:scale-105 transition-all shadow-lg shadow-cyan-200 text-[10px] uppercase tracking-widest">Gotcha</button>
                </div>
            </div>
        </div>
    );
}

// Interne Component: PlzaGotchaReset (Bevestigingsmodal)
function ConfirmModal({ message, onCancel, onConfirm, confirmColor = "from-cyan-500 to-indigo-600" }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[60] bg-slate-900/60 backdrop-blur-md p-4">
            <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-2xl p-8 w-full max-w-[440px] text-center flex flex-col gap-6 transform transition-all overflow-hidden relative">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                <p className="relative z-10 text-slate-800 font-black italic text-xl uppercase tracking-tighter leading-tight">{message}</p>
                <div className="relative z-10 flex justify-center gap-4 mt-2">
                    <button onClick={onCancel} className="flex-1 px-6 py-3 bg-slate-50 border border-slate-200 text-slate-400 font-black italic rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white hover:text-slate-600 transition-all active:scale-95 shadow-sm">Cancel</button>
                    <button onClick={onConfirm} className={`flex-1 px-6 py-3 bg-gradient-to-r ${confirmColor} text-white font-black italic rounded-2xl text-[10px] uppercase tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95`}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default function PlzaModal({ selectedPokemon, onClose }) {
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
            `plza_hunt_${selectedPokemon.id}`,
            JSON.stringify({ timer, counter, isPlaying, timestamp: Date.now() })
        );
    }, [timer, counter, isPlaying, selectedPokemon]);

    if (!selectedPokemon) return null;

    const resetHunt = () => {
        setCounter(0); setTimer(0); setIsPlaying(false);
        localStorage.removeItem(`plza_hunt_${selectedPokemon.id}`);
        setShowConfirm(false);
        setActiveTab("hunt");
    };

    const gotchaHunt = () => {
        const currentCount = Number(localStorage.getItem(`plza_shiny_${selectedPokemon.id}`)) || 0;
        const newCount = currentCount + 1;
        localStorage.setItem(`plza_shiny_${selectedPokemon.id}`, newCount);

        const shinyData = {
            pokemonName: selectedPokemon.name,
            counter: counter,
            timer: timer,
            timestamp: Date.now(),
            game: "Pokémon Legends: Z-A"
        };
        localStorage.setItem(`plza_shinyData_${selectedPokemon.id}_${newCount}`, JSON.stringify(shinyData));

        resetHunt();
        setShowGotchaConfirm(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 w-full max-w-2xl flex flex-col items-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]"></div>

                <button onClick={() => { setIsPlaying(false); onClose(); }} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-cyan-500 transition-all z-20 group">
                    <span className="text-xl font-black group-hover:scale-110 transition-transform">✕</span>
                </button>

                <div className="flex flex-col items-center mb-6 relative z-10">
                    <div className="px-3 py-1 bg-cyan-500 rounded-full mb-2 shadow-lg shadow-cyan-200">
                        <span className="text-[10px] font-black italic text-white tracking-widest uppercase">
                            No. {String(selectedPokemon.id).padStart(3, "0")}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-800 tracking-tighter">{selectedPokemon.name}</h2>
                </div>

                <div className="flex justify-center mb-8 gap-2 z-10">
                    {["hunt", "settings"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-10 py-2 text-[11px] font-black italic tracking-widest transition-all rounded-xl border-2 ${
                                activeTab === tab ? 'bg-white border-cyan-500 text-cyan-600 shadow-lg shadow-cyan-100' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-200'
                            }`}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="transform scale-90 mb-4 transition-transform relative z-10">
                    <div className="absolute inset-0 bg-cyan-400/10 blur-3xl rounded-full"></div>
                    <PokemonSpriteModal selectedPokemon={selectedPokemon} isPlaying={isPlaying} increment={increment} setCounter={setCounter} />
                </div>

                {activeTab === "hunt" ? (
                    <PlzaHuntTab
                        timer={timer} counter={counter} increment={increment} isPlaying={isPlaying}
                        setTimer={setTimer} setIsPlaying={setIsPlaying} setCounter={setCounter}
                        onShowConfirm={() => setShowConfirm(true)} onShowGotcha={() => setShowGotchaConfirm(true)}
                    />
                ) : (
                    <SettingsTab
                        increment={increment} setIncrement={setIncrement} timer={timer} counter={counter}
                        setTimer={setTimer} setCounter={setCounter}
                        onShowConfirm={() => setShowConfirm(true)} onShowGotcha={() => setShowGotchaConfirm(true)}
                    />
                )}

                {showConfirm && <ConfirmModal message="RESET HUNT DATA?" onCancel={() => setShowConfirm(false)} onConfirm={resetHunt} confirmColor="from-pink-500 to-pink-600" />}
                {showGotchaConfirm && <ConfirmModal message="SHINY CAUGHT?" onCancel={() => setShowGotchaConfirm(false)} onConfirm={gotchaHunt} confirmColor="from-cyan-500 to-cyan-600" />}
            </div>
        </div>
    );
}