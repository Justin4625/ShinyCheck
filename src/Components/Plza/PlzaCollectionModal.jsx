import React, { useState } from "react";
import PlzaDeleteShiny from "./PlzaDeleteShiny.jsx";

export default function PlzaCollectionModal({ data, onClose, pokemon, shinyIndex, gameName, originalId }) {
    const [showConfirm, setShowConfirm] = useState(false);

    // State voor bewerken
    const [isEditing, setIsEditing] = useState(false);
    const [editCounter, setEditCounter] = useState(data.counter);
    const [editGame, setEditGame] = useState(gameName === "Pokémon Legends: Z-A" ? "PLZA" : "SV");

    // Tijd opsplitsen voor specifieke inputs
    const initialHrs = Math.floor(data.timer / 3600);
    const initialMins = Math.floor((data.timer % 3600) / 60);
    const initialSecs = data.timer % 60;

    const [editHrs, setEditHrs] = useState(initialHrs);
    const [editMins, setEditMins] = useState(initialMins);
    const [editSecs, setEditSecs] = useState(initialSecs);

    if (!data || !pokemon) return null;

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    const handleSave = () => {
        const oldGameType = gameName === "Pokémon Legends: Z-A" ? "PLZA" : "SV";
        const newGameType = editGame;

        // Totaal seconden herberekenen
        const totalSeconds = (Number(editHrs) * 3600) + (Number(editMins) * 60) + Number(editSecs);

        const updatedData = {
            ...data,
            counter: Number(editCounter),
            timer: totalSeconds,
            timestamp: data.timestamp
        };

        if (oldGameType === newGameType) {
            const storageKey = `plza_shinyData_${originalId}_${shinyIndex}`;
            localStorage.setItem(storageKey, JSON.stringify(updatedData));
        } else {
            // Logica voor verplaatsen naar andere game
            deleteShinyLogic();
            const targetPrefix = newGameType === "PLZA" ? "plza" : "sv";
            const newCount = (Number(localStorage.getItem(`${targetPrefix}_shiny_${originalId}`)) || 0) + 1;
            localStorage.setItem(`${targetPrefix}_shiny_${originalId}`, newCount);
            localStorage.setItem(`${targetPrefix}_shinyData_${originalId}_${newCount}`, JSON.stringify(updatedData));
        }

        window.location.reload();
    };

    const deleteShinyLogic = () => {
        const prefix = "plza";
        const shinyCount = Number(localStorage.getItem(`${prefix}_shiny_${originalId}`)) || 0;
        localStorage.removeItem(`${prefix}_shinyData_${originalId}_${shinyIndex}`);
        for (let i = shinyIndex + 1; i <= shinyCount; i++) {
            const entry = localStorage.getItem(`${prefix}_shinyData_${originalId}_${i}`);
            if (entry) {
                localStorage.setItem(`${prefix}_shinyData_${originalId}_${i - 1}`, entry);
                localStorage.removeItem(`${prefix}_shinyData_${originalId}_${i}`);
            }
        }
        const newCount = shinyCount - 1;
        if (newCount > 0) localStorage.setItem(`${prefix}_shiny_${originalId}`, newCount);
        else localStorage.removeItem(`${prefix}_shiny_${originalId}`);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[60] p-2 sm:p-4">
            <div className="relative bg-white border-2 border-cyan-100 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 w-full max-w-xl flex flex-col items-center overflow-hidden">
                <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-cyan-500 transition-all z-20 group">
                    <span className="text-xl font-black group-hover:scale-110">✕</span>
                </button>

                <div className="flex flex-col items-center mb-4 relative z-10 text-center">
                    <div className="px-3 py-1 bg-cyan-500 rounded-full mb-2 shadow-lg shadow-cyan-100">
                        <span className="text-[10px] font-black italic text-white tracking-widest uppercase">
                            {isEditing ? "Editing Entry" : `Registered Entry #${shinyIndex}`}
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase italic text-slate-800 tracking-tighter">
                        #{String(pokemon.id).padStart(4, "0")} - {pokemon.name}
                    </h2>
                </div>

                {/* Afbeelding behouden */}
                <div className="relative mb-6 transform transition-transform hover:scale-105">
                    <div className="absolute inset-0 bg-cyan-300 blur-3xl opacity-20 rounded-full"></div>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`}
                        alt={pokemon.name}
                        className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl relative z-10"
                    />
                </div>

                <div className="w-full bg-slate-50/50 rounded-3xl border border-slate-100 p-5 flex flex-col gap-4 z-10 shadow-inner">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Encounters */}
                        <div className="flex flex-col items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Encounters</p>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editCounter}
                                    onChange={(e) => setEditCounter(e.target.value)}
                                    className="w-full text-center text-xl font-black bg-cyan-50 rounded-lg border-none focus:ring-2 focus:ring-cyan-500"
                                />
                            ) : (
                                <p className="text-2xl font-black italic text-slate-900 tracking-tighter">{data.counter}</p>
                            )}
                        </div>

                        {/* Duration Edit per H, M, S */}
                        <div className="flex flex-col items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Duration</p>
                            {isEditing ? (
                                <div className="flex gap-1 items-center">
                                    <input type="number" value={editHrs} onChange={(e) => setEditHrs(e.target.value)} className="w-12 text-center font-black bg-cyan-50 rounded" placeholder="H"/>
                                    <span className="text-[10px] font-bold">h</span>
                                    <input type="number" value={editMins} onChange={(e) => setEditMins(e.target.value)} className="w-12 text-center font-black bg-cyan-50 rounded" placeholder="M"/>
                                    <span className="text-[10px] font-bold">m</span>
                                    <input type="number" value={editSecs} onChange={(e) => setEditSecs(e.target.value)} className="w-12 text-center font-black bg-cyan-50 rounded" placeholder="S"/>
                                </div>
                            ) : (
                                <p className="text-lg font-black italic text-slate-900 tracking-tight">{formatTime(data.timer)}</p>
                            )}
                        </div>

                        {/* Game Switcher */}
                        <div className="flex flex-col items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm col-span-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Game</p>
                            {isEditing ? (
                                <select
                                    value={editGame}
                                    onChange={(e) => setEditGame(e.target.value)}
                                    className="w-full text-center font-black italic text-cyan-600 bg-cyan-50 rounded-lg border-none p-1"
                                >
                                    <option value="PLZA">Pokémon Legends: Z-A</option>
                                    <option value="SV">Pokémon Scarlet & Violet</option>
                                </select>
                            ) : (
                                <p className="text-sm font-black italic text-cyan-600 uppercase tracking-tighter">{gameName}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 mt-2">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="flex-1 py-3 bg-cyan-500 text-white font-black italic rounded-2xl text-[11px] uppercase tracking-widest hover:bg-cyan-600 shadow-lg shadow-cyan-100">Save Changes</button>
                                <button onClick={() => setIsEditing(false)} className="flex-1 py-3 bg-slate-200 text-slate-500 font-black italic rounded-2xl text-[11px] uppercase tracking-widest hover:bg-slate-300">Cancel</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="flex-1 py-3 bg-white border-2 border-cyan-500 text-cyan-500 font-black italic rounded-2xl text-[11px] uppercase tracking-widest hover:bg-cyan-50">Edit Data</button>
                                <button onClick={() => setShowConfirm(true)} className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-400 font-black italic rounded-2xl text-[11px] uppercase hover:text-red-500 hover:border-red-200">Delete</button>
                            </>
                        )}
                    </div>
                </div>

                {showConfirm && (
                    <PlzaDeleteShiny onCancel={() => setShowConfirm(false)} onConfirm={deleteShinyLogic} />
                )}
            </div>
        </div>
    );
}