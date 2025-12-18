import React from "react";

export default function CollectionCards({ allShinies, pokemonList, onSelectEntry, formatTime, formatDate }) {
    if (allShinies.length === 0) return null;

    return (
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allShinies.map((entry, index) => {
                const pokemonData = pokemonList.find((p) => p.name.toLowerCase() === entry.name.toLowerCase());
                const spriteId = pokemonData ? pokemonData.id : entry.id;
                const isPlza = entry.type === 'PLZA';
                const svAccent = index % 2 === 0 ? "#ff4d00" : "#8c00ff";

                return (
                    <div
                        key={`${entry.type}_${entry.id}_${entry.shinyIndex}`}
                        onClick={() => onSelectEntry(entry)}
                        className={`group relative cursor-pointer p-5 flex flex-col items-center transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 shadow-2xl overflow-hidden
                            ${isPlza
                            ? "rounded-[2.2rem] border-2 border-slate-100 bg-gradient-to-br from-slate-50 to-cyan-50 shadow-cyan-500/5"
                            : "bg-white border-b-4 border-r-4 border-gray-200 rounded-tr-[2.8rem] rounded-bl-[2.8rem] rounded-tl-xl rounded-br-xl shadow-black/5"
                        }`}
                    >
                        <div className="w-full flex justify-between items-start mb-3 z-10">
                            <div className={`px-2.5 py-1 ${isPlza ? "bg-cyan-500 rounded-full shadow-md shadow-cyan-200" : "transform -skew-x-12 shadow-sm"}`}
                                 style={{ backgroundColor: !isPlza ? svAccent : undefined }}>
                                <span className="text-[9px] font-black italic text-white tracking-widest uppercase">
                                    No. {String(spriteId).padStart(4, "0")}
                                </span>
                            </div>
                            <div className={`text-base drop-shadow-md group-hover:animate-bounce ${isPlza ? "text-cyan-500" : "text-gray-400"}`}>✨</div>
                        </div>

                        <h3 className="text-xl font-black uppercase italic tracking-tighter mb-3 z-10 text-center w-full truncate px-1 text-slate-800">
                            {entry.name}
                        </h3>

                        <div className="relative flex items-center justify-center w-full aspect-square max-w-[120px] mb-5">
                            {isPlza && <div className="absolute w-20 h-20 bg-cyan-400 blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity"></div>}
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${spriteId}.png`}
                                alt={entry.name}
                                className="w-full h-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)] z-10 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
                            />
                        </div>

                        <div className="w-full space-y-2 z-10 mt-auto">
                            <div className={`flex justify-between items-center px-4 py-2 rounded-xl border ${isPlza ? "bg-white/80 border-cyan-50 shadow-sm" : "bg-gray-50 border-gray-100 transform -skew-x-3"}`}>
                                <span className={`text-[8px] font-black uppercase tracking-widest ${isPlza ? "text-cyan-600/50" : "text-slate-400"}`}>Encounters</span>
                                <span className="text-base font-black italic text-slate-900" style={{ color: !isPlza ? svAccent : undefined }}>
                                    {entry.storedData.counter}
                                </span>
                            </div>

                            <div className={`flex justify-between items-center px-4 py-2 rounded-xl border ${isPlza ? "bg-white/80 border-cyan-50 shadow-sm" : "bg-gray-50 border-gray-100 transform -skew-x-3"}`}>
                                <span className={`text-[8px] font-black uppercase tracking-widest ${isPlza ? "text-cyan-600/50" : "text-slate-400"}`}>Duration</span>
                                <span className="text-xs font-black italic text-slate-700">
                                    {formatTime(entry.storedData.timer)}
                                </span>
                            </div>

                            <div className={`flex justify-between items-center px-4 py-1.5 rounded-lg border-b ${isPlza ? "border-cyan-100" : "bg-gray-50/50 border-gray-100 transform -skew-x-3"}`}>
                                <span className={`text-[7px] font-black uppercase tracking-widest ${isPlza ? "text-cyan-600/40" : "text-slate-400"}`}>Captured on</span>
                                <span className="text-[10px] font-black italic text-slate-500">
                                    {formatDate(entry.storedData.timestamp)}
                                </span>
                            </div>

                            <div className={`w-full py-2 rounded-xl shadow border flex justify-center items-center ${isPlza ? "bg-slate-800 border-slate-700" : "bg-gray-800 border-gray-700 transform skew-x-[-6deg]"}`}>
                                <p className="text-[9px] font-black text-center uppercase tracking-[0.15em] italic text-white">
                                    {isPlza ? "Pokémon Legends: Z-A" : "Pokémon Scarlet & Violet"}
                                </p>
                            </div>
                        </div>
                        {!isPlza && <div className="absolute bottom-0 left-0 w-full h-1.5" style={{ backgroundColor: svAccent }}></div>}
                    </div>
                );
            })}
        </div>
    );
}