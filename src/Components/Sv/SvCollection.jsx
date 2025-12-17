import React, { useState } from "react";
import SvCollectionModal from "./SvCollectionModal.jsx";

export default function SvCollection({ svPokemon, pokemonList, formatTime }) {
    const [selectedShiny, setSelectedShiny] = useState(null);

    const getStaticIndex = (entry) => {
        const index = svPokemon.findIndex(p => p.id === entry.id);
        return index !== -1 ? index + 1 : 1;
    };

    const collectedPokemon = svPokemon.filter((p) => {
        const count = Number(localStorage.getItem(`sv_shiny_${p.id}`)) || 0;
        return count > 0;
    });

    return (
        <div className="relative z-10 px-1">
            {collectedPokemon.length === 0 ? (
                <div className="flex flex-col justify-center items-center text-center min-h-[200px]">
                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border-2 border-dashed border-gray-200">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest italic">
                            Your Paldea Collection is empty
                        </span>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {collectedPokemon.map((entry, groupIndex) => {
                        const pokemon = pokemonList.find((p) => p.id === entry.id);
                        const shinyCount = Number(localStorage.getItem(`sv_shiny_${entry.id}`)) || 0;
                        const staticNumber = getStaticIndex(entry);

                        const shinyEntries = [];
                        for (let i = 1; i <= shinyCount; i++) {
                            const data = localStorage.getItem(`sv_shinyData_${entry.id}_${i}`);
                            if (data) shinyEntries.push({ index: i, ...JSON.parse(data) });
                        }

                        return shinyEntries.map((shiny, shinyIdx) => {
                            const isScarlet = (groupIndex + shinyIdx) % 2 === 0;
                            const accentColor = isScarlet ? "#ff4d00" : "#8c00ff";

                            return (
                                <div
                                    key={`${entry.id}_${shiny.index}`}
                                    onClick={() => setSelectedShiny({ pokemon, data: shiny, index: shiny.index })}
                                    className="group relative bg-white border-b-4 border-r-4 border-gray-200 rounded-tr-2xl rounded-bl-2xl rounded-tl-md rounded-br-md p-4 flex flex-col cursor-pointer transition-all duration-200 hover:scale-[1.02] shadow-sm overflow-hidden"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-3 relative z-10">
                                        <div className="flex flex-col">
                                            <div
                                                className="self-start px-2 py-0.5 transform -skew-x-12 mb-1 shadow-sm"
                                                style={{ backgroundColor: accentColor }}
                                            >
                                                <span className="text-[9px] font-black italic text-white tracking-tighter uppercase">
                                                    No. {String(staticNumber).padStart(3, "0")}
                                                </span>
                                            </div>
                                            <h3 className="font-black text-lg text-gray-800 uppercase italic tracking-tighter leading-none">
                                                {entry.name}
                                            </h3>
                                        </div>
                                        <div className="text-xl drop-shadow-sm">✨</div>
                                    </div>

                                    {/* Sprite & Data */}
                                    <div className="flex items-center gap-3 relative z-10 mb-2">
                                        <img
                                            src={pokemon?.sprites?.other?.home?.front_shiny}
                                            alt={entry.name}
                                            className="w-20 h-20 drop-shadow-md group-hover:rotate-3 transition-transform"
                                        />

                                        <div className="flex flex-col gap-1.5 flex-1">
                                            {/* Encounters */}
                                            <div className="px-2 py-1 rounded-md transform skew-x-[-6deg]" style={{ backgroundColor: `${accentColor}08` }}>
                                                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest skew-x-[6deg]">Encounters</div>
                                                <div className="text-lg font-black italic leading-none skew-x-[6deg]" style={{ color: accentColor }}>{shiny.counter}</div>
                                            </div>

                                            {/* Time */}
                                            <div className="px-2 py-1 rounded-md transform skew-x-[-6deg]" style={{ backgroundColor: `${accentColor}08` }}>
                                                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest skew-x-[6deg]">Time</div>
                                                <div className="text-sm font-black italic leading-none skew-x-[6deg] whitespace-nowrap" style={{ color: accentColor }}>{formatTime(shiny.timer)}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Datum & Game Stroken */}
                                    <div className="w-full flex flex-col gap-1 relative z-10 mt-1">
                                        {/* Date Strip */}
                                        <div className="w-full py-1 px-3 bg-gray-50 border-l-2 rounded transform skew-x-[-4deg] flex justify-between items-center" style={{ borderLeftColor: accentColor }}>
                                            <span className="text-[8px] font-black text-gray-400 uppercase skew-x-[4deg]">Date</span>
                                            <span className="text-[10px] font-black text-gray-700 italic skew-x-[4deg]">
                                                {shiny.timestamp ? new Date(shiny.timestamp).toLocaleDateString() : 'Unknown'}
                                            </span>
                                        </div>

                                        {/* Game Strip */}
                                        <div className="w-full py-1 px-3 bg-gray-800 rounded-sm transform skew-x-[-4deg] flex justify-center items-center">
                                            <span className="text-[8px] font-black text-white uppercase tracking-tighter skew-x-[4deg] italic">
                                                {shiny.game || "Pokémon Scarlet & Violet"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: accentColor }} />
                                </div>
                            );
                        });
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