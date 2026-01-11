import React, { useState } from "react";

// --- INTERNE COMPONENT: PlaDeleteConfirm (Verwijder-bevestiging) ---
function PlaDeleteConfirm({ onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[70] bg-[#3e3b38]/80 backdrop-blur-sm">
            <div
                className="bg-[#f4f1ea] border-2 border-[#3e3b38] p-8 w-[95%] max-w-[450px] text-center flex flex-col gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
                <p className="relative z-10 text-[#3e3b38] font-black italic text-xl uppercase tracking-tighter leading-tight px-4">
                    Are you sure you want to delete this shiny?
                </p>

                <div className="relative z-10 flex justify-center gap-4 mt-2">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-2.5 bg-white border-2 border-[#3e3b38] text-[#3e3b38] font-black italic transform -skew-x-12 text-[10px] uppercase tracking-widest hover:bg-[#3e3b38] hover:text-[#f4f1ea] transition-all"
                    >
                        <span className="block transform skew-x-12">Cancel</span>
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-6 py-2.5 bg-[#3e3b38] text-[#eaddca] font-black italic transform -skew-x-12 text-[10px] uppercase tracking-widest shadow-lg border-b-4 border-black/20 hover:scale-105 transition-all"
                    >
                        <span className="block transform skew-x-12">Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- MAIN EXPORT: PlaCollectionModal ---
export default function PlaCollectionModal({ data, onClose, pokemon, shinyIndex, gameName, originalId }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editCounter, setEditCounter] = useState(data.counter);

    const formatForInput = (ts) => {
        const d = new Date(ts);
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };
    const [editTimestamp, setEditTimestamp] = useState(formatForInput(data.timestamp));

    const [editHrs, setEditHrs] = useState(Math.floor(data.timer / 3600));
    const [editMins, setEditMins] = useState(Math.floor((data.timer % 3600) / 60));
    const [editSecs, setEditSecs] = useState(data.timer % 60);

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
        setIsEditing(false);
        window.location.reload();
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
        <div className="fixed inset-0 bg-[#3e3b38]/80 backdrop-blur-md flex items-center justify-center z-[60] p-4 font-serif">
            {/* Modal Container: Legends Arceus Stijl (Scherpe hoeken, houten offset) */}
            <div onClick={(e) => e.stopPropagation()} className="relative bg-[#f4f1ea] border-2 border-[#3e3b38] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.15)] p-8 w-full max-w-xl flex flex-col items-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>

                {/* Close Button: Arceus Stijl */}
                <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center border-2 border-[#3e3b38] text-[#3e3b38] hover:bg-[#3e3b38] hover:text-[#eaddca] transition-all z-20 font-bold shadow-sm">
                    <span className="text-xl">✕</span>
                </button>

                <div className="flex flex-col items-center mb-6 text-center relative z-10">
                    <div className="bg-[#3e3b38] px-4 py-1 transform -skew-x-12 mb-3 shadow-md">
                        <span className="text-[10px] font-black italic text-[#bfa16d] tracking-[0.2em] uppercase block transform skew-x-12">
                            {isEditing ? "Editing Report" : `Survey Entry #${shinyIndex}`}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-[#3e3b38] tracking-tighter border-b-2 border-[#3e3b38]/10 pb-1 px-4">
                        #{String(pokemon.id).padStart(4, "0")} - {pokemon.name}
                    </h2>
                </div>

                <div className="relative mb-8 transform transition-transform hover:scale-105">
                    <div className="absolute inset-0 bg-[#bfa16d]/20 blur-[60px] rounded-full scale-125"></div>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`} alt={pokemon.name} className="w-40 h-40 drop-shadow-[0_15px_20px_rgba(0,0,0,0.25)] relative z-10" />
                </div>

                <div className="w-full space-y-4 z-10">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Encounters */}
                        <div className="bg-[#eaddca]/50 border-2 border-[#3e3b38]/10 p-4 transform -skew-x-3 shadow-inner flex flex-col items-center">
                            <p className="text-[8px] font-black text-[#3e3b38]/50 uppercase mb-1 italic">Encounters</p>
                            {isEditing ? (
                                <input type="number" value={editCounter} onChange={(e) => setEditCounter(e.target.value)} className="w-full text-center text-xl font-black bg-[#f4f1ea] border-b-2 border-[#bfa16d] outline-none" />
                            ) : (
                                <p className="text-2xl font-black italic text-[#3e3b38] tracking-widest">{data.counter}</p>
                            )}
                        </div>
                        {/* Duration */}
                        <div className="bg-[#eaddca]/50 border-2 border-[#3e3b38]/10 p-4 transform -skew-x-3 shadow-inner flex flex-col items-center">
                            <p className="text-[8px] font-black text-[#3e3b38]/50 uppercase mb-1 italic">Duration</p>
                            {isEditing ? (
                                <div className="flex gap-1 items-end">
                                    <div className="flex flex-col items-center">
                                        <input type="number" value={editHrs} onChange={(e) => setEditHrs(e.target.value)} className="w-8 text-center font-black bg-transparent border-b border-[#3e3b38] text-xs" />
                                        <span className="text-[7px] font-bold text-[#bfa16d]">h</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <input type="number" value={editMins} onChange={(e) => setEditMins(e.target.value)} className="w-8 text-center font-black bg-transparent border-b border-[#3e3b38] text-xs" />
                                        <span className="text-[7px] font-bold text-[#bfa16d]">m</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <input type="number" value={editSecs} onChange={(e) => setEditSecs(e.target.value)} className="w-8 text-center font-black bg-transparent border-b border-[#3e3b38] text-xs" />
                                        <span className="text-[7px] font-bold text-[#bfa16d]">s</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-lg font-black italic text-[#3e3b38] tracking-tight">{formatTime(data.timer)}</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-[#eaddca]/30 border border-[#3e3b38]/10 p-3 transform -skew-x-3 flex justify-between items-center px-6">
                        <span className="text-[10px] font-black text-[#3e3b38]/50 uppercase tracking-widest italic">Captured On</span>
                        {isEditing ? (
                            <input type="datetime-local" value={editTimestamp} onChange={(e) => setEditTimestamp(e.target.value)} className="text-[10px] font-black bg-[#f4f1ea] border-none p-1 outline-none text-[#3e3b38]" />
                        ) : (
                            <span className="text-[15px] font-black italic text-[#3e3b38]/80 uppercase">{formatDate(data.timestamp)}</span>
                        )}
                    </div>

                    <div className="bg-[#eaddca]/30 border border-[#3e3b38]/10 p-3 transform -skew-x-3 flex justify-between items-center px-6">
                        <span className="text-[10px] font-black text-[#3e3b38]/50 uppercase tracking-widest italic">Game</span>
                        <span className="text-[12px] font-black italic text-[#bfa16d] uppercase tracking-wider">{gameName || "Legends: Arceus"}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center w-full mt-4">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="flex-1 py-2 bg-[#3e3b38] text-[#eaddca] font-black uppercase italic transform -skew-x-12 hover:scale-105 transition-all shadow-md">
                                    <span className="block transform skew-x-12">Confirm</span>
                                </button>
                                <button onClick={() => setIsEditing(false)} className="flex-1 py-2 bg-[#d9ceba] text-[#3e3b38] font-black uppercase italic transform -skew-x-12 hover:bg-[#c5b8a5] transition-all">
                                    <span className="block transform skew-x-12">Cancel</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="flex-1 py-2 border-2 border-[#3e3b38] text-[#3e3b38] font-black uppercase italic transform -skew-x-12 hover:bg-[#3e3b38] hover:text-[#eaddca] transition-all">
                                    <span className="block transform skew-x-12 text-xs">Edit Report</span>
                                </button>
                                <button onClick={() => setShowConfirm(true)} className="flex-1 py-2 border-2 border-[#3e3b38]/20 text-[#3e3b38]/40 font-black uppercase italic transform -skew-x-12 hover:text-red-700 hover:border-red-700 transition-all">
                                    <span className="block transform skew-x-12 text-xs">Delete Entry</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {showConfirm && (
                    <PlaDeleteConfirm
                        onCancel={() => setShowConfirm(false)}
                        onConfirm={deleteShinyLogic}
                    />
                )}
            </div>
        </div>
    );
}