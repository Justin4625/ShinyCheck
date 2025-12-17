import React, { useState } from "react";
import PlzaCollectionModal from "./PlzaCollectionModal.jsx";

export default function PlzaCollection({ plzaPokemon = [], pokemonList = [], formatTime }) {
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const collectionPokemon = plzaPokemon
        .flatMap((p) => {
            const shinyCount = Number(localStorage.getItem(`plza_shiny_${p.id}`)) || 0;
            const hunts = [];
            for (let i = 1; i <= shinyCount; i++) {
                const storedData = JSON.parse(localStorage.getItem(`plza_shinyData_${p.id}_${i}`)) || {
                    timer: 0, counter: 0, timestamp: 0,
                };
                hunts.push({ ...p, storedData, shinyIndex: i });
            }
            return hunts;
        })
        .sort((a, b) => b.storedData.timestamp - a.storedData.timestamp);

    return (
        <>
            <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 z-10 px-1">
                {collectionPokemon.length === 0 ? (
                    <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px]">
                        <span className="text-xl font-black text-slate-300 uppercase tracking-[0.2em]">
                            Collection Empty
                        </span>
                    </div>
                ) : (
                    collectionPokemon.map((entry) => {
                        const number = String(entry.id).padStart(3, "0");
                        const pokemon = pokemonList.find((p) => p.id === entry.id);

                        return (
                            <div
                                key={`${entry.id}_${entry.shinyIndex}`}
                                onClick={() => {
                                    setSelectedEntry(entry);
                                    setSelectedPokemon(pokemon);
                                }}
                                className="relative cursor-pointer rounded-[2rem] p-5 sm:p-6 flex flex-col items-center border-2 border-amber-300 bg-gradient-to-br from-yellow-50 to-amber-100 shadow-xl shadow-amber-200/50 transition-all duration-300 hover:scale-[1.03] group overflow-hidden"
                            >
                                {/* Subtiel Technisch Patroon op achtergrond */}
                                <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden rounded-[2rem]">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                                </div>

                                {/* Header met ID en Goud-Indicator */}
                                <div className="w-full flex justify-between items-start mb-2 relative z-10">
                                    <span className="text-[10px] font-black text-amber-600 tracking-tighter uppercase">
                                        ID: {number}
                                    </span>
                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_#f59e0b]"></div>
                                </div>

                                {/* Naam */}
                                <h2 className="text-sm sm:text-base md:text-lg font-black uppercase italic tracking-tight text-slate-800 mb-3 relative z-10 text-center w-full">
                                    {entry.name}
                                </h2>

                                {/* Sprite met Gouden Gloed */}
                                <div className="relative mb-4">
                                    <div className="absolute inset-0 rounded-full bg-amber-400 blur-3xl opacity-25"></div>
                                    <img
                                        src={pokemon?.sprites?.other?.home?.front_shiny}
                                        alt={entry.name}
                                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Technische Data Stroken - Tekst vergroot */}
                                <div className="w-full flex flex-col gap-2 relative z-10 mt-auto">
                                    <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm border border-amber-200 rounded-xl px-3 py-2 shadow-sm">
                                        <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Encounters</span>
                                        <span className="text-sm font-black italic text-slate-900">{entry.storedData.counter}</span>
                                    </div>

                                    <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm border border-amber-200 rounded-xl px-3 py-2 shadow-sm">
                                        <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Time</span>
                                        <span className="text-[11px] font-black italic text-slate-700">{formatTime(entry.storedData.timer)}</span>
                                    </div>

                                    <div className="flex justify-between items-center bg-white/60 backdrop-blur-sm border border-amber-200 rounded-xl px-3 py-2 shadow-sm">
                                        <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Date</span>
                                        <span className="text-[11px] font-black italic text-slate-700">{new Date(entry.storedData.timestamp).toLocaleDateString()}</span>
                                    </div>

                                    <div className="w-full bg-slate-800 py-2 rounded-xl shadow-md border border-slate-700">
                                        <p className="text-[9px] font-black text-white text-center uppercase tracking-[0.2em] italic">
                                            {entry.game || "Legends: Z-A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {selectedEntry?.storedData && selectedPokemon && (
                <PlzaCollectionModal
                    data={selectedEntry.storedData}
                    pokemon={selectedPokemon}
                    shinyIndex={selectedEntry.shinyIndex}
                    gameName={selectedEntry.game}
                    onClose={() => { setSelectedEntry(null); setSelectedPokemon(null); }}
                />
            )}
        </>
    );
}