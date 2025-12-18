import React, { useState } from "react";
import SvDeleteShiny from "./SvDeleteShiny.jsx";

export default function SvCollectionModal({ data, onClose, pokemon, shinyIndex, gameName, originalId }) {
    const [showConfirm, setShowConfirm] = useState(false);

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

    const deleteShiny = () => {
        const shinyCount = Number(localStorage.getItem(`sv_shiny_${originalId}`)) || 0;
        if (shinyCount === 0) return;

        localStorage.removeItem(`sv_shinyData_${originalId}_${shinyIndex}`);

        for (let i = shinyIndex + 1; i <= shinyCount; i++) {
            const entry = localStorage.getItem(`sv_shinyData_${originalId}_${i}`);
            if (entry) {
                localStorage.setItem(`sv_shinyData_${originalId}_${i - 1}`, entry);
                localStorage.removeItem(`sv_shinyData_${originalId}_${i}`);
            }
        }

        const newCount = shinyCount - 1;
        if (newCount > 0) {
            localStorage.setItem(`sv_shiny_${originalId}`, newCount);
        } else {
            localStorage.removeItem(`sv_shiny_${originalId}`);
        }

        onClose();
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
                            Registered Entry #{shinyIndex}
                        </span>
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-800 tracking-tighter">
                        #{String(pokemon.id).padStart(4, "0")} - {pokemon.name}
                    </h2>
                </div>

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
                            <p className="text-2xl font-black italic text-orange-600">{data.counter}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl transform -skew-x-3 shadow-sm flex flex-col items-center">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                            <p className="text-lg font-black italic text-slate-700">{formatTime(data.timer)}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl transform -skew-x-3 shadow-sm flex justify-between items-center px-6">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Database</span>
                        <span className="text-xs font-black italic text-orange-600 uppercase tracking-tighter">
                            {gameName || "Pokémon Scarlet & Violet"}
                        </span>
                    </div>

                    <div className="bg-gray-50/50 border border-gray-100 p-3 rounded-xl transform -skew-x-3 shadow-sm flex justify-between items-center px-6 mb-6">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Captured On</span>
                        <span className="text-[10px] font-black italic text-slate-500 uppercase">
                            {formatDate(data.timestamp)}
                        </span>
                    </div>

                    {/* Verbeterde Delete Knop */}
                    <div className="flex justify-center w-full mt-4">
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="group relative px-8 py-2 bg-white border-2 border-slate-200 rounded-lg transform -skew-x-6 transition-all duration-300 hover:border-red-500 hover:bg-red-50 active:scale-95"
                        >
                            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 italic group-hover:text-red-600">
                                Delete Shiny
                            </span>
                            <div className="absolute inset-0 bg-red-500 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-0"></div>
                        </button>
                    </div>
                </div>

                {showConfirm && (
                    <SvDeleteShiny
                        onCancel={() => setShowConfirm(false)}
                        onConfirm={deleteShiny}
                    />
                )}
            </div>
        </div>
    );
}