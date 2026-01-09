import React, { useState } from "react";
import SvDeleteShiny from "./SvDeleteShiny.jsx";

export default function SvCollectionModal({ data, onClose, pokemon, shinyIndex, gameName, originalId }) {
    const [showConfirm, setShowConfirm] = useState(false);

    // State voor bewerken
    const [isEditing, setIsEditing] = useState(false);
    const [editCounter, setEditCounter] = useState(data.counter);
    const [editGame, setEditGame] = useState(gameName === "Pokémon Scarlet & Violet" ? "SV" : "PLZA");

    // Tijd opsplitsen voor specifieke H, M, S inputs
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
        const oldGameType = gameName === "Pokémon Scarlet & Violet" ? "SV" : "PLZA";
        const newGameType = editGame;

        // Totaal seconden herberekenen op basis van de 3 velden
        const totalSeconds = (Number(editHrs) * 3600) + (Number(editMins) * 60) + Number(editSecs);

        const updatedData = {
            ...data,
            counter: Number(editCounter),
            timer: totalSeconds,
            timestamp: data.timestamp
        };

        if (oldGameType === newGameType) {
            // Zelfde game: update de bestaande entry
            const storageKey = `sv_shinyData_${originalId}_${shinyIndex}`;
            localStorage.setItem(storageKey, JSON.stringify(updatedData));
        } else {
            // Andere game: Verwijder uit SV en voeg toe aan PLZA
            deleteShinyLogic();
            const targetPrefix = newGameType === "SV" ? "sv" : "plza";
            const newCount = (Number(localStorage.getItem(`${targetPrefix}_shiny_${originalId}`)) || 0) + 1;
            localStorage.setItem(`${targetPrefix}_shiny_${originalId}`, newCount);
            localStorage.setItem(`${targetPrefix}_shinyData_${originalId}_${newCount}`, JSON.stringify(updatedData));
        }

        window.location.reload(); // Ververs de pagina om wijzigingen te tonen
    };

    const deleteShinyLogic = () => {
        const prefix = "sv";
        const shinyCount = Number(localStorage.getItem(`${prefix}_shiny_${originalId}`)) || 0;
        if (shinyCount === 0) return;

        localStorage.removeItem(`${prefix}_shinyData_${originalId}_${shinyIndex}`);

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
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[70] p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white border-b-4 border-r-4 border-gray-200 rounded-tr-[2.8rem] rounded-bl-[2.8rem] rounded-tl-xl rounded-br-xl shadow-2xl p-8 w-full max-w-xl flex flex-col items-center overflow-hidden"
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-orange-500 transition-all z-20"
                >
                    <span className="text-xl font-black">✕</span>
                </button>

                <div className="flex flex-col items-center mb-6 text-center">
                    <div className="bg-orange-600 px-4 py-1 transform -skew-x-12 mb-3 shadow-md">
                        <span className="text-[10px] font-black italic text-white tracking-widest uppercase">
                            {isEditing ? "Editing Entry" : `Registered Entry #${shinyIndex}`}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-800 tracking-tighter">
                        #{String(pokemon.id).padStart(4, "0")} - {pokemon.name}
                    </h2>
                </div>

                {/* Afbeelding behouden */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-orange-100 blur-3xl opacity-40 rounded-full"></div>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`}
                        alt={pokemon.name}
                        className="w-40 h-40 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] relative z-10"
                    />
                </div>

                <div className="w-full space-y-4 z-10">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl transform -skew-x-3 shadow-sm flex flex-col items-center">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Encounters</p>
                            {isEditing ? (
                                <input
                                    type="number"
                                    value={editCounter}
                                    onChange={(e) => setEditCounter(e.target.value)}
                                    className="w-full text-center text-xl font-black bg-orange-50 rounded-lg border-none focus:ring-2 focus:ring-orange-500"
                                />
                            ) : (
                                <p className="text-2xl font-black italic text-orange-600">{data.counter}</p>
                            )}
                        </div>
                        {/* Duration Edit per H, M, S in SvCollectionModal */}
                        <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl transform -skew-x-3 shadow-sm flex flex-col items-center">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                            {isEditing ? (
                                <div className="flex gap-1 items-center">
                                    <input type="number" value={editHrs} onChange={(e) => setEditHrs(e.target.value)} className="w-9 sm:w-10 text-center font-black bg-orange-50 rounded text-sm" placeholder="H"/>
                                    <span className="text-[8px] font-bold text-orange-600">H</span>
                                    <input type="number" value={editMins} onChange={(e) => setEditMins(e.target.value)} className="w-9 sm:w-10 text-center font-black bg-orange-50 rounded text-sm" placeholder="M"/>
                                    <span className="text-[8px] font-bold text-orange-600">M</span>
                                    <input type="number" value={editSecs} onChange={(e) => setEditSecs(e.target.value)} className="w-9 sm:w-10 text-center font-black bg-orange-50 rounded text-sm" placeholder="S"/>
                                    <span className="text-[8px] font-bold text-orange-600">S</span>
                                </div>
                            ) : (
                                <p className="text-lg font-black italic text-slate-700">{formatTime(data.timer)}</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl transform -skew-x-3 shadow-sm flex justify-between items-center px-6">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Game</span>
                        {isEditing ? (
                            <select
                                value={editGame}
                                onChange={(e) => setEditGame(e.target.value)}
                                className="text-xs font-black italic text-orange-600 bg-orange-50 rounded-lg border-none p-1"
                            >
                                <option value="SV">Pokémon Scarlet & Violet</option>
                                <option value="PLZA">Pokémon Legends: Z-A</option>
                            </select>
                        ) : (
                            <span className="text-xs font-black italic text-orange-600 uppercase tracking-tighter">
                                {gameName}
                            </span>
                        )}
                    </div>

                    {!isEditing && (
                        <div className="bg-gray-50/50 border border-gray-100 p-3 rounded-xl transform -skew-x-3 shadow-sm flex justify-between items-center px-6 mb-2">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Captured On</span>
                            <span className="text-[10px] font-black italic text-slate-500 uppercase">
                                {formatDate(data.timestamp)}
                            </span>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 justify-center w-full mt-4">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="px-8 py-2 bg-orange-600 text-white font-black uppercase italic rounded-lg transform -skew-x-6 hover:bg-orange-700 shadow-md">
                                    Save Changes
                                </button>
                                <button onClick={() => setIsEditing(false)} className="px-8 py-2 bg-gray-200 text-gray-600 font-black uppercase italic rounded-lg transform -skew-x-6 hover:bg-gray-300">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="px-8 py-2 bg-white border-2 border-orange-500 text-orange-600 font-black uppercase italic rounded-lg transform -skew-x-6 hover:bg-orange-50 transition-all">
                                    Edit Entry
                                </button>
                                <button onClick={() => setShowConfirm(true)} className="px-8 py-2 bg-white border-2 border-slate-200 text-slate-400 font-black uppercase italic rounded-lg transform -skew-x-6 hover:text-red-500 hover:border-red-500 transition-all">
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {showConfirm && (
                    <SvDeleteShiny
                        onCancel={() => setShowConfirm(false)}
                        onConfirm={() => { deleteShinyLogic(); onClose(); window.location.reload(); }}
                    />
                )}
            </div>
        </div>
    );
}