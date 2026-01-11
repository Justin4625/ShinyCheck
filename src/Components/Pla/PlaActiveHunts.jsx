import React from "react";

export default function PlaActiveHunts({plaPokemon, pokemonList, formatTime, openModal}) {
    const activePokemon = plaPokemon
        .flatMap(p => {
            const storedData = JSON.parse(localStorage.getItem(`pla_hunt_${p.id}`)) || { timer: 0, counter: 0, timestamp: 0 };
            return (storedData.counter >= 1 || storedData.timer >= 1) ? [{ ...p, storedData }] : [];
        })
        .sort((a, b) => b.storedData.timestamp - a.storedData.timestamp);

    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 z-10 px-1">
            {activePokemon.length === 0 ? (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-amber-900/20 bg-[#eaddca]/20">
                    <span className="text-lg font-black text-amber-900/20 uppercase italic tracking-widest">
                        No active field reports
                    </span>
                </div>
            ) : (
                activePokemon.map((entry) => {
                    const pokemon = pokemonList.find(p => p.id === entry.id);

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(pokemon)}
                            className="relative p-5 bg-[#eaddca] border-b-4 border-r-4 border-amber-900/40 shadow-xl cursor-pointer transform hover:-translate-y-1 transition-all group overflow-hidden"
                        >
                            {/* Antieke papier textuur overlay */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

                            {/* Decoratief 'spijkertje' bovenin */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-900/30 rounded-full shadow-inner z-10"></div>

                            {/* Header met Report nummer */}
                            <div className="w-full flex justify-between items-start mb-1 relative z-10">
                                <span className="text-[10px] font-black text-amber-900/60 uppercase tracking-widest transform -skew-x-12">
                                    Report #{entry.id}
                                </span>
                                <div className="w-2 h-2 bg-red-700 rotate-45 animate-pulse shadow-[0_0_5px_red]"></div>
                            </div>

                            {/* Naam in zware inktstijl */}
                            <h2 className="text-base font-black uppercase italic text-slate-900 mb-3 border-b border-amber-900/10 pb-1 text-center w-full relative z-10 tracking-tighter">
                                {entry.name}
                            </h2>

                            {/* Sprite met perkament gloed */}
                            <div className="relative mb-4 flex justify-center">
                                <div className="absolute inset-0 bg-amber-400 blur-2xl opacity-20 rounded-full"></div>
                                <img
                                    src={pokemon?.sprites?.other?.home?.front_shiny}
                                    alt={entry.name}
                                    className="w-24 h-24 drop-shadow-[2px_6px_8px_rgba(0,0,0,0.3)] relative z-10 group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Hunt Statistieken stroken */}
                            <div className="space-y-1.5 relative z-10">
                                <div className="flex justify-between items-center bg-[#f4f1ea]/60 px-2 py-1 rounded-sm border-l-2 border-amber-800">
                                    <span className="text-[9px] font-black uppercase text-amber-900/70 tracking-tighter">Encounters</span>
                                    <span className="text-sm font-black italic text-slate-900">{entry.storedData.counter}</span>
                                </div>

                                <div className="flex justify-between items-center bg-[#f4f1ea]/60 px-2 py-1 rounded-sm border-l-2 border-slate-800">
                                    <span className="text-[9px] font-black uppercase text-amber-900/70 tracking-tighter">Duration</span>
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