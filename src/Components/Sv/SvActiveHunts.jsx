import React from "react";

export default function SvActiveHunts({ svPokemon, pokemonList, formatTime, openModal }) {
    const activeHunts = svPokemon.filter((p) => {
        const storedData = localStorage.getItem(`hunt_${p.id}`);
        if (!storedData) return false;
        try {
            const parsed = JSON.parse(storedData);
            return parsed.counter > 0 || parsed.timer > 0;
        } catch {
            return false;
        }
    });

    const getStaticIndex = (entry) => {
        const index = svPokemon.findIndex(p => p.id === entry.id);
        return index !== -1 ? index + 1 : 1;
    };

    return (
        <div className="relative z-10">
            {activeHunts.length === 0 ? (
                <div className="flex flex-col justify-center items-center text-center min-h-[300px]">
                    <span className="text-2xl font-bold text-gray-700 opacity-50">
                        No active hunts for SV
                    </span>
                    <p className="text-gray-500 mt-2">Select a Pokémon to start a new hunt!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activeHunts.map((entry) => {
                        const pokemon = pokemonList.find((p) => p.id === entry.id);
                        const storedData = JSON.parse(localStorage.getItem(`hunt_${entry.id}`));
                        const staticNumber = getStaticIndex(entry);

                        return (
                            <div
                                key={entry.id}
                                onClick={() => openModal(pokemon)}
                                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-red-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-red-200 group overflow-hidden"
                            >
                                <div className="absolute -right-4 -top-4 w-20 h-20 bg-red-400/10 rounded-full blur-2xl group-hover:bg-red-400/20 transition-colors" />

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-extrabold text-lg text-gray-900 capitalize">
                                            {entry.name}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                            </span>
                                            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">
                                                Live Hunt
                                            </span>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-bold">
                                        #{String(staticNumber).padStart(3, "0")}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <img
                                        src={pokemon?.sprites?.other?.home?.front_shiny}
                                        alt={entry.name}
                                        className="w-20 h-20 drop-shadow-md"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[10px] text-gray-500 font-bold uppercase">Current</div>
                                        <div className="text-sm font-black text-gray-800">{storedData.counter} Encounters</div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">Time</div>
                                        <div className="text-sm font-black text-gray-800">{formatTime(storedData.timer)}</div>
                                    </div>
                                </div>

                                <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-orange-400 to-red-600 animate-pulse" style={{width: '100%'}}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}