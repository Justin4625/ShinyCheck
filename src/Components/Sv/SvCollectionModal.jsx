import React, { useState } from "react";
import SvDeleteShiny from "./SvDeleteShiny.jsx";

export default function SvCollectionModal({ data, onClose, pokemon, shinyIndex, gameName }) {
    const [showConfirm, setShowConfirm] = useState(false);

    if (!data || !pokemon) return null;

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`;
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString("en-GB", {
            day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit",
        });
    };

    const deleteShiny = () => {
        // Belangrijk: Gebruik de sv_ prefix voor consistentie
        const shinyCount = Number(localStorage.getItem(`sv_shiny_${pokemon.id}`)) || 0;
        if (shinyCount === 0) return;

        localStorage.removeItem(`sv_shinyData_${pokemon.id}_${shinyIndex}`);

        // Re-index de overgebleven shinies
        for (let i = shinyIndex + 1; i <= shinyCount; i++) {
            const entry = localStorage.getItem(`sv_shinyData_${pokemon.id}_${i}`);
            if (entry) {
                localStorage.setItem(`sv_shinyData_${pokemon.id}_${i - 1}`, entry);
                localStorage.removeItem(`sv_shinyData_${pokemon.id}_${i}`);
            }
        }

        const newCount = shinyCount - 1;
        if (newCount > 0) {
            localStorage.setItem(`sv_shiny_${pokemon.id}`, newCount);
        } else {
            localStorage.removeItem(`sv_shiny_${pokemon.id}`);
        }

        onClose();
    };

    // Scarlet vs Violet accentkleur
    const accentColor = pokemon.id % 2 === 0 ? "#ff4d00" : "#8c00ff";

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white border-b-[6px] border-r-[6px] border-gray-300 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-lg rounded-br-lg w-full max-w-md flex flex-col items-center overflow-hidden shadow-2xl"
            >
                {/* S&V Decoratie hoek */}
                <div
                    className="absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 rotate-45 opacity-10 pointer-events-none"
                    style={{ backgroundColor: accentColor }}
                />

                {/* Sluitknop */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-800 transition-all z-20 group"
                >
                    <span className="text-xl font-black group-hover:scale-110 transition-transform">✕</span>
                </button>

                {/* Header */}
                <div className="w-full pt-8 px-6 flex flex-col items-center relative z-10">
                    <div
                        className="px-3 py-0.5 transform -skew-x-12 mb-2 shadow-sm"
                        style={{ backgroundColor: accentColor }}
                    >
                        <span className="text-[10px] font-black italic text-white tracking-widest uppercase">
                            No. {String(pokemon.id).padStart(3, "0")} • Entry #{shinyIndex}
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black uppercase italic text-[#333] tracking-tighter text-center leading-none">
                        {pokemon.name}
                    </h2>
                </div>

                {/* Sprite */}
                <div className="relative py-4 z-10">
                    <img
                        /* Gebruik de directe PokeAPI sprite URL op basis van het pokemon.id */
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`}
                        alt={pokemon.name}
                        className="w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-xl transition-transform hover:scale-105 duration-300"
                    />
                </div>

                {/* Data Grid in S&V Strips */}
                <div className="w-full px-6 pb-8 flex flex-col gap-2 z-10">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="px-3 py-2 rounded-lg transform skew-x-[-6deg] bg-gray-50 border-l-4" style={{ borderColor: accentColor }}>
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest skew-x-[6deg]">Encounters</p>
                            <p className="text-xl font-black italic skew-x-[6deg]" style={{ color: accentColor }}>{data.counter}</p>
                        </div>
                        <div className="px-3 py-2 rounded-lg transform skew-x-[-6deg] bg-gray-50 border-l-4" style={{ borderColor: accentColor }}>
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest skew-x-[6deg]">Time</p>
                            <p className="text-xl font-black italic skew-x-[6deg]" style={{ color: accentColor }}>{formatTime(data.timer)}</p>
                        </div>
                    </div>

                    <div className="w-full py-2 px-4 bg-gray-50 border-l-4 rounded transform skew-x-[-4deg] flex justify-between items-center" style={{ borderLeftColor: accentColor }}>
                        <span className="text-[9px] font-black text-gray-400 uppercase skew-x-[4deg]">Caught On</span>
                        <span className="text-xs font-black text-gray-700 italic skew-x-[4deg]">{formatDate(data.timestamp)}</span>
                    </div>

                    <div className="w-full py-2 px-4 bg-gray-800 rounded transform skew-x-[-4deg] flex justify-center items-center">
                        <span className="text-[9px] font-black text-white uppercase tracking-widest skew-x-[4deg] italic">
                            Game: {gameName || "Pokémon Scarlet & Violet"}
                        </span>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="mt-4 w-full py-2 text-[10px] font-black uppercase italic tracking-widest text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors rounded-lg border border-red-100"
                    >
                        Delete Shiny
                    </button>
                </div>

                {/* Accentlijn onderaan */}
                <div className="w-full h-1.5" style={{ backgroundColor: accentColor }} />

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