import React, { useState } from "react";

// Interne Component voor de verwijder-bevestiging
function DeleteConfirmModal({ onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
            <div
                className="bg-[#f4f1ea] border-2 border-amber-900/20 border-b-8 border-r-8 p-8 w-full max-w-[420px] text-center shadow-2xl flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
                <p className="relative z-10 text-slate-800 font-black italic text-xl uppercase tracking-tighter leading-tight">
                    Are you sure you want to delete this shiny?
                </p>

                <div className="relative z-10 flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-2.5 bg-white border-b-4 border-slate-200 text-slate-400 font-black italic transform -skew-x-12 text-[10px] uppercase tracking-widest hover:text-slate-600 transition-all active:scale-95 shadow-sm"
                    >
                        <span className="block transform skew-x-12">Cancel</span>
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-800 text-white font-black italic transform -skew-x-12 text-[10px] uppercase tracking-widest shadow-lg border-b-4 border-black/20 transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="block transform skew-x-12">Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function PlaCollectionModal({ data, onClose, pokemon, shinyIndex, gameName, originalId }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // State voor bewerken (Exacte logica zoals PLZA/SV)
    const [editCounter, setEditCounter] = useState(data.counter);
    const initialHrs = Math.floor(data.timer / 3600);
    const initialMins = Math.floor((data.timer % 3600) / 60);
    const initialSecs = data.timer % 60;

    const [editHrs, setEditHrs] = useState(initialHrs);
    const [editMins, setEditMins] = useState(initialMins);
    const [editSecs, setEditSecs] = useState(initialSecs);

    const formatForInput = (ts) => {
        const d = new Date(ts);
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };
    const [editTimestamp, setEditTimestamp] = useState(formatForInput(data.timestamp));

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

        localStorage.setItem(`pla_shinyData_${originalId}_${shinyIndex}`, JSON.stringify(updatedData));
        onClose();
        // Eventueel window.location.reload() als de parent niet automatisch update
    };

    const deleteShinyLogic = () => {
        const prefix = "pla";
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

        onClose();
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4 font-sans">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-[#f4f1ea] border-2 border-amber-900/30 border-b-[12px] border-r-[12px] p-6 sm:p-10 w-full max-w-xl flex flex-col items-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 pointer-events-none opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

                <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white border-2 border-amber-900/10 text-slate-400 hover:text-red-800 transition-all z-20 group">
                    <span className="text-xl font-black group-hover:rotate-90 transition-transform">✕</span>
                </button>

                <div className="flex flex-col items-center mb-6 relative z-10 text-center">
                    <div className="px-6 py-1.5 bg-amber-800 transform -skew-x-12 mb-3 shadow-lg">
                        <span className="text-[10px] font-black italic text-white tracking-[0.2em] uppercase block transform skew-x-12">
                            {isEditing ? "Editing Specimen" : `Survey Entry #${shinyIndex}`}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-900 tracking-tighter">
                        #{String(pokemon.id).padStart(4, "0")} - {pokemon.name}
                    </h2>
                </div>

                <div className="relative mb-8 transform transition-transform hover:scale-105">
                    <div className="absolute inset-0 bg-amber-500/10 blur-[60px] rounded-full"></div>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`}
                        alt={pokemon.name}
                        className="w-40 h-40 drop-shadow-[2px_10px_15px_rgba(0,0,0,0.3)] relative z-10"
                    />
                </div>

                <div className="w-full bg-[#eaddca]/30 border-2 border-amber-900/10 p-4 sm:p-6 flex flex-col gap-4 z-10 shadow-inner">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Encounters */}
                        <div className="flex flex-col items-center bg-[#f4f1ea] p-3 border-2 border-amber-900/10 border-b-4 border-b-slate-900 shadow-sm">
                            <p className="text-[9px] font-black text-amber-900/50 uppercase tracking-widest mb-1 italic">Encounters</p>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editCounter}
                                    onChange={(e) => setEditCounter(e.target.value)}
                                    className="w-full text-center text-xl font-black bg-white/50 border-b-2 border-amber-600 focus:outline-none"
                                />
                            ) : (
                                <p className="text-2xl font-black italic text-slate-900 tracking-tighter">{data.counter}</p>
                            )}
                        </div>

                        {/* Duration (Met herstelde setEditSecs logica) */}
                        <div className="flex flex-col items-center bg-[#f4f1ea] p-3 border-2 border-amber-900/10 border-b-4 border-b-amber-800 shadow-sm">
                            <p className="text-[9px] font-black text-amber-900/50 uppercase tracking-widest mb-1 italic">Duration</p>
                            {isEditing ? (
                                <div className="flex gap-1 items-center">
                                    <input type="number" value={editHrs} onChange={(e) => setEditHrs(e.target.value)} className="w-8 text-center font-black bg-white/50 border-b border-amber-600 text-xs" />
                                    <span className="text-[8px] font-bold text-amber-800">h</span>
                                    <input type="number" value={editMins} onChange={(e) => setEditMins(e.target.value)} className="w-8 text-center font-black bg-white/50 border-b border-amber-600 text-xs" />
                                    <span className="text-[8px] font-bold text-amber-800">m</span>
                                    <input type="number" value={editSecs} onChange={(e) => setEditSecs(e.target.value)} className="w-8 text-center font-black bg-white/50 border-b border-amber-600 text-xs" />
                                    <span className="text-[8px] font-bold text-amber-800">s</span>
                                </div>
                            ) : (
                                <p className="text-lg font-black italic text-slate-900 tracking-tight">{formatTime(data.timer)}</p>
                            )}
                        </div>

                        {/* Date Input */}
                        <div className="flex flex-col items-center bg-[#f4f1ea] p-2.5 border-2 border-amber-900/10 shadow-sm col-span-2">
                            <p className="text-[9px] font-black text-amber-900/50 uppercase tracking-widest mb-1 italic">Captured On</p>
                            {isEditing ? (
                                <input
                                    type="datetime-local"
                                    value={editTimestamp}
                                    onChange={(e) => setEditTimestamp(e.target.value)}
                                    className="w-full text-center text-sm font-black bg-white/50 border-b-2 border-amber-600 focus:outline-none"
                                />
                            ) : (
                                <p className="text-sm font-black italic text-slate-700">{formatDate(data.timestamp)}</p>
                            )}
                        </div>

                        {/* Game Label */}
                        <div className="flex flex-col items-center bg-[#f4f1ea] p-2.5 border-2 border-amber-900/10 shadow-sm col-span-2">
                            <p className="text-[9px] font-black text-amber-900/50 uppercase tracking-widest mb-1 italic">Region Authority</p>
                            <p className="text-sm font-black italic text-amber-700 uppercase tracking-tighter">{gameName || "Pokémon Legends: Arceus"}</p>
                        </div>
                    </div>

                    {/* Actions (Consistent met SV/PLZA) */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="flex-1 py-3 bg-amber-700 text-white font-black italic transform -skew-x-12 text-[11px] uppercase tracking-widest hover:bg-amber-600 shadow-lg border-b-4 border-black/20 transition-all">
                                    <span className="block transform skew-x-12">Commit Changes</span>
                                </button>
                                <button onClick={() => setIsEditing(false)} className="flex-1 py-3 bg-slate-200 text-slate-500 font-black italic transform -skew-x-12 text-[11px] uppercase tracking-widest hover:bg-slate-300 transition-all">
                                    <span className="block transform skew-x-12">Cancel</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="flex-1 py-3 bg-white border-2 border-amber-900/10 border-b-4 border-slate-200 text-amber-800 font-black italic transform -skew-x-12 text-[11px] uppercase tracking-widest hover:bg-[#f4f1ea] transition-all">
                                    <span className="block transform skew-x-12">Edit Entry</span>
                                </button>
                                <button onClick={() => setShowConfirm(true)} className="px-10 py-3 bg-white border-2 border-amber-900/10 border-b-4 border-slate-200 text-slate-400 font-black italic transform -skew-x-12 text-[11px] uppercase hover:text-red-700 transition-all">
                                    <span className="block transform skew-x-12">Delete</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {showConfirm && (
                    <DeleteConfirmModal
                        onCancel={() => setShowConfirm(false)}
                        onConfirm={deleteShinyLogic}
                    />
                )}
            </div>
        </div>
    );
}