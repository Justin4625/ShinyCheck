import React, { useState } from "react";
import SvCollectionModal from "./SvCollectionModal.jsx";

export default function SvCollection({ svPokemon, pokemonList, formatTime }) {
    const [selectedShiny, setSelectedShiny] = useState(null);

    // Hulpfunctie om het vaste nummer te bepalen op basis van de volledige SV-lijst
    const getStaticIndex = (entry) => {
        const index = svPokemon.findIndex(p => p.id === entry.id);
        return index !== -1 ? index + 1 : 1;
    };

    const collectedPokemon = svPokemon.filter((p) => {
        const count = Number(localStorage.getItem(`shiny_${p.id}`)) || 0;
        return count > 0;
    });

    const openShinyModal = (pokemon, data, index) => {
        setSelectedShiny({ pokemon, data, index });
    };

    return (
        <div className="relative z-10">
            {collectedPokemon.length === 0 ? (
                <div className="flex flex-col justify-center items-center text-center min-h-[300px]">
                    <span className="text-2xl font-bold text-gray-700 opacity-50">
                        Your SV Collection is empty
                    </span>
                    <p className="text-gray-500 mt-2">Start hunting to fill your collection!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {collectedPokemon.map((entry) => {
                        const pokemon = pokemonList.find((p) => p.id === entry.id);
                        const shinyCount = Number(localStorage.getItem(`shiny_${entry.id}`)) || 0;
                        const staticNumber = getStaticIndex(entry);

                        const shinyEntries = [];
                        for (let i = 1; i <= shinyCount; i++) {
                            const data = localStorage.getItem(`shinyData_${entry.id}_${i}`);
                            if (data) shinyEntries.push({ index: i, ...JSON.parse(data) });
                        }

                        return shinyEntries.map((shiny) => (
                            <div
                                key={`${entry.id}_${shiny.index}`}
                                onClick={() => openShinyModal(pokemon, shiny, shiny.index)}
                                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-orange-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-orange-200 group overflow-hidden"
                            >
                                <div className="absolute -right-4 -top-4 w-20 h-20 bg-orange-400/10 rounded-full blur-2xl group-hover:bg-orange-400/20 transition-colors" />

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-extrabold text-lg text-gray-900 capitalize">
                                            {entry.name}
                                        </h3>
                                        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
                                            Shiny #{shiny.index}
                                        </span>
                                    </div>
                                    <span className="px-2 py-1 rounded-lg bg-orange-100 text-orange-700 text-xs font-bold">
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
                                        <div className="text-[10px] text-gray-500 font-bold uppercase">Encounters</div>
                                        <div className="text-sm font-black text-gray-800">{shiny.counter}</div>
                                        <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">Time</div>
                                        <div className="text-sm font-black text-gray-800">{formatTime(shiny.timer)}</div>
                                    </div>
                                </div>
                            </div>
                        ));
                    })}
                </div>
            )}

            {selectedShiny && (
                <SvCollectionModal
                    data={selectedShiny.data}
                    pokemon={selectedShiny.pokemon}
                    shinyIndex={selectedShiny.index}
                    gameName="Pokémon Scarlet & Violet"
                    onClose={() => setSelectedShiny(null)}
                />
            )}
        </div>
    );
}