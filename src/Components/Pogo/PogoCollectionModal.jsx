import React, { useState } from "react";

export default function PogoCollectionModal({ data, onClose, pokemon, shinyIndex, originalId }) {
    const [showConfirm, setShowConfirm] = useState(false);

    // State voor bewerken
    const [isEditing, setIsEditing] = useState(false);

    // Datum formatteren voor de datetime-local input (YYYY-MM-DDTHH:MM)
    const formatForInput = (ts) => {
        const d = new Date(ts);
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    };
    const [editTimestamp, setEditTimestamp] = useState(formatForInput(data.timestamp));

    if (!data || !pokemon) return null;

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString("nl-NL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleSave = () => {
        const updatedData = {
            ...data,
            timestamp: new Date(editTimestamp).getTime() // Nieuwe timestamp opslaan
        };

        const storageKey = `pogo_shinyData_${originalId}_${shinyIndex}`;
        localStorage.setItem(storageKey, JSON.stringify(updatedData));

        // Sluit de modal en ververs de pagina
        onClose();
    };

    const deleteShinyLogic = () => {
        const prefix = "pogo";
        const shinyCount = Number(localStorage.getItem(`${prefix}_shiny_${originalId}`)) || 0;

        // Verwijder de specifieke entry
        localStorage.removeItem(`${prefix}_shinyData_${originalId}_${shinyIndex}`);

        // Verschuif de overige indexen om gaten in de lijst te voorkomen
        for (let i = shinyIndex + 1; i <= shinyCount; i++) {
            const entry = localStorage.getItem(`${prefix}_shinyData_${originalId}_${i}`);
            if (entry) {
                localStorage.setItem(`${prefix}_shinyData_${originalId}_${i - 1}`, entry);
                localStorage.removeItem(`${prefix}_shinyData_${originalId}_${i}`);
            }
        }

        const newCount = shinyCount - 1;
        if (newCount > 0) {
            localStorage.setItem(`${prefix}_shiny_${originalId}`, newCount);
        } else {
            localStorage.removeItem(`${prefix}_shiny_${originalId}`);
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[120] p-4" onClick={onClose}>
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white border-4 border-emerald-400 rounded-[3rem] shadow-2xl p-8 w-full max-w-md flex flex-col items-center overflow-hidden"
            >
                {/* Emerald Decoratie balk */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-emerald-500 transition-all z-20"
                >
                    <span className="text-xl font-black">✕</span>
                </button>

                <div className="flex flex-col items-center mb-6 text-center">
                    <div className="bg-emerald-500 px-4 py-1 rounded-full mb-3 shadow-md">
                        <span className="text-[10px] font-black italic text-white tracking-widest uppercase">
                            {isEditing ? "Editing Entry" : `Pokémon GO Entry #${shinyIndex}`}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-800 tracking-tighter">
                        {pokemon.name}
                    </h2>
                </div>

                {/* Sprite Display */}
                <div className="relative mb-8 transform transition-transform hover:scale-105">
                    <div className="absolute inset-0 bg-emerald-100 blur-3xl opacity-40 rounded-full"></div>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`}
                        alt={pokemon.name}
                        className="w-40 h-40 drop-shadow-2xl relative z-10"
                    />
                </div>

                <div className="w-full space-y-4 z-10">
                    {/* Captured On (Bewerken of Weergeven) */}
                    <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-3xl shadow-sm flex flex-col items-center">
                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">Captured On</p>
                        {isEditing ? (
                            <input
                                type="datetime-local"
                                value={editTimestamp}
                                onChange={(e) => setEditTimestamp(e.target.value)}
                                className="w-full text-center text-sm font-black bg-white rounded-xl border-2 border-emerald-100 focus:border-emerald-400 focus:ring-0 text-slate-700"
                            />
                        ) : (
                            <p className="text-lg font-black italic text-slate-800 tracking-tight">
                                {formatDate(data.timestamp)}
                            </p>
                        )}
                    </div>

                    {/* Game (Altijd Pokémon GO) */}
                    <div className="bg-emerald-500/10 p-3 rounded-2xl border-2 border-emerald-500/20 flex justify-center items-center gap-3">
                        <span className="text-xs font-black italic text-emerald-700 uppercase tracking-widest">Pokémon GO</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 py-3 bg-emerald-500 text-white font-black italic rounded-2xl text-[11px] uppercase tracking-widest hover:bg-emerald-600 shadow-lg active:scale-95 transition-all"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 py-3 bg-slate-200 text-slate-500 font-black italic rounded-2xl text-[11px] uppercase tracking-widest hover:bg-slate-300 active:scale-95 transition-all"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex-1 py-3 bg-white border-2 border-emerald-500 text-emerald-500 font-black italic rounded-2xl text-[11px] uppercase tracking-widest hover:bg-emerald-50 shadow-sm active:scale-95 transition-all"
                                >
                                    Edit Entry
                                </button>
                                <button
                                    onClick={() => setShowConfirm(true)}
                                    className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-400 font-black italic rounded-2xl text-[11px] uppercase hover:text-red-500 hover:border-red-200 transition-all active:scale-95"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Bevestigingsvenster voor verwijderen */}
                {showConfirm && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-200">
                        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Are you sure?</p>
                        <h3 className="text-xl font-black text-slate-800 uppercase italic leading-tight mb-8">
                            This entry will be <span className="text-red-500">removed</span> from your collection.
                        </h3>
                        <div className="flex flex-col w-full gap-3">
                            <button
                                onClick={deleteShinyLogic}
                                className="w-full py-4 bg-red-500 text-white font-black uppercase italic text-xs tracking-widest rounded-2xl shadow-lg shadow-red-100 active:scale-95 transition-all"
                            >
                                Yes, Delete Entry
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="w-full py-3 text-slate-400 font-black uppercase italic text-[10px] tracking-widest hover:text-slate-600 transition-colors"
                            >
                                No, Keep it
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}