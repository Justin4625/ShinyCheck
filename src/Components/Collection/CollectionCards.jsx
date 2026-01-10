import React from "react";

export default function CollectionCards({ allShinies, pokemonList, onSelectEntry, formatTime, formatDate }) {
    if (allShinies.length === 0) return null;

    return (
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allShinies.map((entry, index) => {
                const pokemonData = pokemonList.find((p) => p.name.toLowerCase() === entry.name.toLowerCase());
                const spriteId = pokemonData ? pokemonData.id : entry.id;

                // Game types
                const isPlza = entry.type === 'PLZA';
                const isPogo = entry.type === 'POGO';
                const isSv = entry.type === 'SV';
                const isPla = entry.type === 'PLA';

                const svAccent = index % 2 === 0 ? "#ff4d00" : "#8c00ff";

                return (
                    <div
                        key={`${entry.type}_${entry.id}_${entry.shinyIndex}`}
                        onClick={() => onSelectEntry(entry)}
                        className={`group relative cursor-pointer p-5 flex flex-col items-center transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 shadow-2xl overflow-hidden
                            ${isPlza ? "rounded-[2.2rem] border-2 border-slate-100 bg-gradient-to-br from-slate-50 to-cyan-50 shadow-cyan-500/5" : ""}
                            ${isPogo ? "rounded-[2.5rem] border-4 border-emerald-400 bg-white shadow-emerald-500/10" : ""}
                            ${isSv ? "bg-white border-b-4 border-r-4 border-gray-200 rounded-tr-[2.8rem] rounded-bl-[2.8rem] rounded-tl-xl rounded-br-xl shadow-black/5" : ""}
                            ${isPla ? "bg-[#f4f1ea] border-2 border-amber-900/20 shadow-amber-900/5 hover:rotate-0" : ""}
                        `}
                    >
                        {/* Perkament textuur voor PLA */}
                        {isPla && <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>}

                        {/* Top Header Row */}
                        <div className="w-full flex justify-between items-start mb-3 z-10">
                            <div
                                className={`px-2.5 py-1 
                                    ${isPlza ? "bg-cyan-500 rounded-full shadow-md shadow-cyan-200" : ""} 
                                    ${isPogo ? "bg-emerald-500 rounded-lg shadow-emerald-200" : ""} 
                                    ${isPla ? "bg-amber-800 transform -skew-x-12" : ""}
                                    ${isSv || (!isPlza && !isPogo && !isPla) ? "transform -skew-x-12 shadow-sm" : ""}`}
                                style={{ backgroundColor: isSv ? svAccent : undefined }}
                            >
                                <span className="text-[9px] font-black italic text-white tracking-widest uppercase">
                                    No. {String(spriteId).padStart(4, "0")}
                                </span>
                            </div>

                            {isPla ? (
                                <div className="w-5 h-5 bg-red-700 rotate-45 border border-red-900 shadow-sm flex items-center justify-center">
                                    <div className="w-2 h-2 border border-white/30 rounded-full"></div>
                                </div>
                            ) : (
                                <div className={`text-base drop-shadow-md group-hover:animate-bounce 
                                    ${isPlza ? "text-cyan-500" : ""} 
                                    ${isPogo ? "text-emerald-500" : ""} 
                                    ${isSv ? "text-gray-400" : ""}`}
                                >
                                    ✨
                                </div>
                            )}
                        </div>

                        {/* Name */}
                        <h3 className={`text-xl font-black uppercase italic tracking-tighter mb-3 z-10 text-center w-full truncate px-1 
                            ${isPla ? "text-amber-900 border-b border-amber-900/10 pb-1" : "text-slate-800"}`}>
                            {entry.name}
                        </h3>

                        {/* Image Container */}
                        <div className="relative flex items-center justify-center w-full aspect-square max-w-[120px] mb-5">
                            {isPlza && <div className="absolute w-20 h-20 bg-cyan-400 blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity"></div>}
                            {isPogo && <div className="absolute w-24 h-24 bg-emerald-400 blur-[30px] opacity-10 group-hover:opacity-20 transition-opacity"></div>}
                            {isPla && <div className="absolute w-20 h-20 bg-amber-600 blur-[35px] opacity-10"></div>}

                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${spriteId}.png`}
                                alt={entry.name}
                                className="w-full h-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)] z-10 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
                            />
                        </div>

                        {/* Stats Info */}
                        <div className="w-full space-y-2 z-10 mt-auto">
                            {!isPogo && (
                                <>
                                    <div className={`flex justify-between items-center px-4 py-2 border 
                                        ${isPlza ? "rounded-xl bg-white/80 border-cyan-50 shadow-sm" : ""}
                                        ${isPla ? "bg-[#eaddca]/60 border-amber-900/10" : "bg-gray-50 border-gray-100 rounded-xl transform -skew-x-3"}`}>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${isPlza ? "text-cyan-600/50" : isPla ? "text-amber-900/40" : "text-slate-400"}`}>Encounters</span>
                                        <span className="text-base font-black italic text-slate-900" style={{ color: isSv ? svAccent : undefined }}>
                                            {entry.storedData.counter}
                                        </span>
                                    </div>

                                    <div className={`flex justify-between items-center px-4 py-2 border 
                                        ${isPlza ? "rounded-xl bg-white/80 border-cyan-50 shadow-sm" : ""}
                                        ${isPla ? "bg-[#eaddca]/60 border-amber-900/10" : "bg-gray-50 border-gray-100 rounded-xl transform -skew-x-3"}`}>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${isPlza ? "text-cyan-600/50" : isPla ? "text-amber-900/40" : "text-slate-400"}`}>Duration</span>
                                        <span className="text-xs font-black italic text-slate-700">
                                            {formatTime(entry.storedData.timer)}
                                        </span>
                                    </div>
                                </>
                            )}

                            {/* Captured Date */}
                            <div className={`flex justify-between items-center px-4 py-1.5 border-b 
                                ${isPlza ? "border-cyan-100 rounded-lg" : ""} 
                                ${isPogo ? "border-emerald-100 rounded-lg" : ""} 
                                ${isPla ? "border-amber-900/10 bg-amber-900/5" : "bg-gray-50/50 border-gray-100 rounded-lg transform -skew-x-3"}`}>
                                <span className={`text-[7px] font-black uppercase tracking-widest 
                                    ${isPlza ? "text-cyan-600/40" : ""} 
                                    ${isPogo ? "text-emerald-600/40" : ""} 
                                    ${isPla ? "text-amber-900/30" : ""}
                                    ${isSv ? "text-slate-400" : ""}`}
                                >
                                    Captured on
                                </span>
                                <span className="text-[10px] font-black italic text-slate-500">
                                    {formatDate(entry.storedData.timestamp)}
                                </span>
                            </div>

                            {/* Game Label */}
                            <div className={`w-full py-2 shadow border flex justify-center items-center 
                                ${isPlza ? "bg-slate-800 border-slate-700 rounded-xl" : ""} 
                                ${isPogo ? "bg-emerald-500 border-emerald-400 rounded-xl" : ""} 
                                ${isPla ? "bg-amber-800 border-amber-900 transform skew-x-[-6deg]" : ""}
                                ${isSv ? "bg-gray-800 border-gray-700 rounded-xl transform skew-x-[-6deg]" : ""}`}
                            >
                                <p className="text-[9px] font-black text-center uppercase tracking-[0.15em] italic text-white">
                                    {isPlza ? "Pokémon Legends: Z-A" : ""}
                                    {isPogo ? "Pokémon GO" : ""}
                                    {isSv ? "Pokémon Scarlet & Violet" : ""}
                                    {isPla ? "Pokémon Legends: Arceus" : ""}
                                </p>
                            </div>
                        </div>
                        {isSv && <div className="absolute bottom-0 left-0 w-full h-1.5" style={{ backgroundColor: svAccent }}></div>}
                        {isPogo && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>}
                        {isPla && <div className="absolute top-0 right-0 w-8 h-8 bg-amber-900/5 -mr-4 -mt-4 rotate-45"></div>}
                    </div>
                );
            })}
        </div>
    );
}