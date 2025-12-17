import React from "react";

export default function PlzaActiveHunts({plzaPokemon, pokemonList, formatTime, openModal}) {
    const activePokemon = plzaPokemon
        .flatMap(p => {
            const storedData = JSON.parse(localStorage.getItem(`plza_hunt_${p.id}`)) || {
                timer: 0,
                counter: 0,
                isPlaying: false,
                timestamp: 0
            };
            if (storedData.counter >= 1 || storedData.timer >= 1) {
                return [{ ...p, storedData }];
            }
            return [];
        })
        .sort((a, b) => b.storedData.timestamp - a.storedData.timestamp);

    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 z-10 px-1">
            {activePokemon.length === 0 ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px]">
                    <span className="text-xl font-black text-slate-300 uppercase tracking-[0.2em]">
                        No Active Syncs
                    </span>
                </div>
            ) : (
                activePokemon.map((entry) => {
                    const number = String(entry.id).padStart(3, "0");
                    const pokemon = pokemonList.find((p) => p.id === entry.id);

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(pokemon)}
                            className="relative rounded-[2rem] p-5 sm:p-6 flex flex-col items-center border-2 border-cyan-100 bg-white shadow-xl shadow-cyan-100/30 cursor-pointer transition-all duration-300 hover:scale-[1.03] group overflow-hidden"
                        >
                            {/* Subtiel Technisch Patroon op achtergrond */}
                            <div className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden rounded-[2rem]">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                            </div>

                            {/* Header met ID en Pulsing Indicator */}
                            <div className="w-full flex justify-between items-start mb-2 relative z-10">
                                <span className="text-[10px] font-black text-cyan-600 tracking-tighter uppercase">
                                    ID: {number}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[8px] font-black text-cyan-500 uppercase tracking-widest">Active</span>
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_cyan]"></div>
                                </div>
                            </div>

                            {/* Naam */}
                            <h2 className="text-sm sm:text-base md:text-lg font-black uppercase italic tracking-tight text-slate-800 mb-3 relative z-10 text-center w-full">
                                {entry.name}
                            </h2>

                            {/* Sprite met Lumiose Gloed */}
                            <div className="relative mb-4">
                                <div className="absolute inset-0 rounded-full bg-cyan-300 blur-3xl opacity-20"></div>
                                <img
                                    src={pokemon?.sprites?.other?.home?.front_shiny}
                                    alt={entry.name}
                                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Technische Data Stroken */}
                            <div className="w-full flex flex-col gap-2 relative z-10 mt-auto">
                                <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 shadow-sm">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Encounters</span>
                                    <span className="text-sm font-black italic text-slate-900">{entry.storedData.counter}</span>
                                </div>

                                <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 shadow-sm">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Time</span>
                                    <span className="text-[11px] font-black italic text-slate-700">{formatTime(entry.storedData.timer)}</span>
                                </div>

                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}