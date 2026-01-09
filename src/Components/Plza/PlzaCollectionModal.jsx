import React, { useState } from "react";
import PlzaDeleteShiny from "./PlzaDeleteShiny.jsx";

export default function PlzaCollectionModal({ data, onClose, pokemon, shinyIndex, gameName, originalId }) {
    const [showConfirm, setShowConfirm] = useState(false);

    // State voor bewerken
    const [isEditing, setIsEditing] = useState(false);
    const [editCounter, setEditCounter] = useState(data.counter);

    // Datum formatteren voor de datetime-local input (YYYY-MM-DDTHH:MM)
    const formatForInput = (ts) => {
        const d = new Date(ts);
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };
    const [editTimestamp, setEditTimestamp] = useState(formatForInput(data.timestamp));

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

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString("nl-NL", {
            day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
        });
    };

    const handleSave = () => {
        const totalSeconds = (Number(editHrs) * 3600) + (Number(editMins) * 60) + Number(editSecs);

        const updatedData = {
            ...data,
            counter: Number(editCounter),
            timer: totalSeconds,
            timestamp: new Date(editTimestamp).getTime()
        };

        const storageKey = `plza_shinyData_${originalId}_${shinyIndex}`;
        localStorage.setItem(storageKey, JSON.stringify(updatedData));

        // Sluit de modal om "een stap terug" te gaan
        onClose();
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
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[60] p-4">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-white border-2 border-cyan-100 rounded-[2.5rem] shadow-2xl p-8 w-full max-w-xl flex flex-col items-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]"></div>

                <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-cyan-500 transition-all z-20 group">
                    <span className="text-xl font-black">✕</span>
                </button>

                <div className="flex flex-col items-center mb-6 relative z-10 text-center">
                    <div className="px-3 py-1 bg-cyan-500 rounded-full mb-3 shadow-lg shadow-cyan-100">
                        <span className="text-[10px] font-black italic text-white tracking-widest uppercase">
                            {isEditing ? "Editing Entry" : `Registered Entry #${shinyIndex}`}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-800 tracking-tighter">
                        #{String(pokemon.id).padStart(4, "0")} - {pokemon.name}
                    </h2>
                </div>

                <div className="relative mb-8 transform transition-transform hover:scale-105">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`} alt={pokemon.name} className="w-40 h-40 drop-shadow-2xl relative z-10" />
                </div>

                <div className="w-full bg-slate-50/50 rounded-3xl border border-slate-100 p-4 flex flex-col gap-3 z-10 shadow-inner">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Encounters</p>
                            {isEditing ? (
                                <input type="number" value={editCounter} onChange={(e) => setEditCounter(e.target.value)} className="w-full text-center text-xl font-black bg-cyan-50 rounded-lg border-none focus:ring-2 focus:ring-cyan-500" />
                            ) : (
                                <p className="text-2xl font-black italic text-slate-900 tracking-tighter">{data.counter}</p>
                            )}
                        </div>
                        <div className="flex flex-col items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                            {isEditing ? (
                                <div className="flex gap-1 items-center">
                                    <input type="number" value={editHrs} onChange={(e) => setEditHrs(e.target.value)} className="w-9 sm:w-10 text-center font-black bg-cyan-50 rounded text-sm" />
                                    <span className="text-[8px] font-bold text-cyan-600">h</span>
                                    <input type="number" value={editMins} onChange={(e) => setEditMins(e.target.value)} className="w-9 sm:w-10 text-center font-black bg-cyan-50 rounded text-sm" />
                                    <span className="text-[8px] font-bold text-cyan-600">m</span>
                                    <input type="number" value={editSecs} onChange={(e) => setEditSecs(e.target.value)} className="w-9 sm:w-10 text-center font-black bg-cyan-50 rounded text-sm" />
                                    <span className="text-[8px] font-bold text-cyan-600">s</span>
                                </div>
                            ) : (
                                <p className="text-lg font-black italic text-slate-900 tracking-tight">{formatTime(data.timer)}</p>
                            )}
                        </div>

                        <div className="flex flex-col items-center bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm col-span-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Captured On</p>
                            {isEditing ? (
                                <input type="datetime-local" value={editTimestamp} onChange={(e) => setEditTimestamp(e.target.value)} className="w-full text-center text-sm font-black bg-cyan-50 rounded-lg border-none focus:ring-2 focus:ring-cyan-500" />
                            ) : (
                                <p className="text-sm font-black italic text-slate-700">{formatDate(data.timestamp)}</p>
                            )}
                        </div>

                        <div className="flex flex-col items-center bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm col-span-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Game</p>
                            <p className="text-sm font-black italic text-cyan-600 uppercase tracking-tighter">{gameName || "Pokémon Legends: Z-A"}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-3">
                        {isEditing ? (
                            <><button onClick={handleSave} className="flex-1 py-2.5 bg-cyan-500 text-white font-black italic rounded-2xl text-[10px] uppercase tracking-widest hover:bg-cyan-600 shadow-lg active:scale-95 transition-all">Save Changes</button>
                                <button onClick={() => setIsEditing(false)} className="flex-1 py-2.5 bg-slate-200 text-slate-500 font-black italic rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-300 active:scale-95 transition-all">Cancel</button></>
                        ) : (
                            <><button onClick={() => setIsEditing(true)} className="flex-1 py-2.5 bg-white border-2 border-cyan-500 text-cyan-500 font-black italic rounded-2xl text-[10px] uppercase tracking-widest hover:bg-cyan-50 active:scale-95 transition-all">Edit Entry</button>
                                <button onClick={() => setShowConfirm(true)} className="px-8 py-2.5 bg-white border-2 border-slate-200 text-slate-400 font-black italic rounded-2xl text-[10px] uppercase hover:text-red-500 active:scale-95 transition-all">Delete</button></>
                        )}
                    </div>
                </div>

                {showConfirm && <PlzaDeleteShiny onCancel={() => setShowConfirm(false)} onConfirm={() => { deleteShinyLogic(); onClose(); window.location.reload(); }} />}
            </div>
        </div>
    );
}