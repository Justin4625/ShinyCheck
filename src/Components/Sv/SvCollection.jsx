import React, { useState } from "react";
import SvCollectionModal from "./SvCollectionModal.jsx";

export default function SvCollection({ svPokemon, pokemonList, formatTime }) {
    const [selectedShiny, setSelectedShiny] = useState(null);

    const getStaticIndex = (entry) => {
        const index = svPokemon.findIndex(p => p.id === entry.id);
        return index !== -1 ? index + 1 : 1;
    };

    const collectedPokemon = svPokemon.filter((p) => {
        // Gebruik de unieke SV prefix
        const count = Number(localStorage.getItem(`sv_shiny_${p.id}`)) || 0;
        return count > 0;
    });

    return (
        <div className="relative z-10">
            {collectedPokemon.length === 0 ? (
                <div className="text-center py-20 font-bold text-gray-700 opacity-50">Your SV Collection is empty</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {collectedPokemon.map((entry) => {
                        const pokemon = pokemonList.find((p) => p.id === entry.id);
                        const shinyCount = Number(localStorage.getItem(`sv_shiny_${entry.id}`)) || 0;
                        const staticNumber = getStaticIndex(entry);

                        const shinyEntries = [];
                        for (let i = 1; i <= shinyCount; i++) {
                            const data = localStorage.getItem(`sv_shinyData_${entry.id}_${i}`);
                            if (data) shinyEntries.push({ index: i, ...JSON.parse(data) });
                        }

                        return shinyEntries.map((shiny) => (
                            <div key={`${entry.id}_${shiny.index}`} onClick={() => setSelectedShiny({ pokemon, data: shiny, index: shiny.index })} className="relative bg-white/80 rounded-2xl p-5 shadow-lg border border-orange-100 cursor-pointer transition-all hover:scale-105">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-extrabold text-lg text-gray-900 capitalize">{entry.name}</h3>
                                    <span className="px-2 py-1 rounded-lg bg-orange-100 text-orange-700 text-xs font-bold">#{String(staticNumber).padStart(3, "0")}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src={pokemon?.sprites?.other?.home?.front_shiny} alt={entry.name} className="w-20 h-20 drop-shadow-md" />
                                    <div className="flex flex-col gap-1 text-[10px] font-bold">
                                        <div>ENCOUNTERS: <span className="text-gray-800 text-sm font-black">{shiny.counter}</span></div>
                                        <div>TIME: <span className="text-gray-800 text-sm font-black">{formatTime(shiny.timer)}</span></div>
                                    </div>
                                </div>
                            </div>
                        ));
                    })}
                </div>
            )}
            {selectedShiny && (
                <SvCollectionModal data={selectedShiny.data} pokemon={selectedShiny.pokemon} shinyIndex={selectedShiny.index} gameName="Pokémon Scarlet & Violet" onClose={() => setSelectedShiny(null)} />
            )}
        </div>
    );
}