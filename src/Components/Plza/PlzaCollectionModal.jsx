import React, { useState } from "react";
import PlzaDeleteShiny from "./PlzaDeleteShiny.jsx";

export default function PlzaCollectionModal({ data, onClose, pokemon, shinyIndex, gameName, originalId }) {
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
        // Gebruik originalId voor de localStorage sleutels om correct te kunnen verwijderen
        const shinyCount = Number(localStorage.getItem(`plza_shiny_${originalId}`)) || 0;
        if (shinyCount === 0) return;

        localStorage.removeItem(`plza_shinyData_${originalId}_${shinyIndex}`);

        for (let i = shinyIndex + 1; i <= shinyCount; i++) {
            const entry = localStorage.getItem(`plza_shinyData_${originalId}_${i}`);
            if (entry) {
                localStorage.setItem(`plza_shinyData_${originalId}_${i - 1}`, entry);
                localStorage.removeItem(`plza_shinyData_${originalId}_${i}`);
            }
        }

        const newCount = shinyCount - 1;
        if (newCount > 0) {
            localStorage.setItem(`plza_shiny_${originalId}`, newCount);
        } else {
            localStorage.removeItem(`plza_shiny_${originalId}`);
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white border-2 border-cyan-100 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 w-full max-w-xl flex flex-col items-center overflow-hidden"
            >
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]"></div>

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-cyan-500 transition-all z-20 group"
                >
                    <span className="text-xl font-black group-hover:scale-110 transition-transform">✕</span>
                </button>

                <div className="flex flex-col items-center mb-4 relative z-10 text-center">
                    <div className="px-3 py-1 bg-cyan-500 rounded-full mb-2 shadow-lg shadow-cyan-100">
                        <span className="text-[10px] font-black italic text-white tracking-widest uppercase">
                            Registered Entry #{shinyIndex}
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase italic text-slate-800 tracking-tighter">
                        #{String(pokemon.id).padStart(3, "0")} - {pokemon.name}
                    </h2>
                </div>

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
                        <div className="flex flex-col items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Encounters</p>
                            <p className="text-2xl font-black italic text-slate-900 tracking-tighter">{data.counter}</p>
                        </div>
                        <div className="flex flex-col items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Duration</p>
                            <p className="text-lg font-black italic text-slate-900 tracking-tight">{formatTime(data.timer)}</p>
                        </div>
                        <div className="flex flex-col items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm col-span-2 sm:col-span-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Sync Date</p>
                            <p className="text-sm font-black italic text-slate-700">{formatDate(data.timestamp)}</p>
                        </div>
                        <div className="flex flex-col items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm col-span-2 sm:col-span-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Database</p>
                            <p className="text-sm font-black italic text-cyan-600 uppercase tracking-tighter">{gameName || "Pokémon Legends: Z-A"}</p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-2">
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="px-10 py-3 bg-white border-2 border-slate-200 text-slate-400 font-black italic rounded-2xl text-[11px] uppercase tracking-[0.2em] hover:text-red-500 hover:border-red-200 transition-all shadow-sm active:scale-95"
                        >
                            Delete Shiny
                        </button>
                    </div>
                </div>

                {showConfirm && (
                    <PlzaDeleteShiny
                        onCancel={() => setShowConfirm(false)}
                        onConfirm={deleteShiny}
                    />
                )}
            </div>
        </div>
    );
}