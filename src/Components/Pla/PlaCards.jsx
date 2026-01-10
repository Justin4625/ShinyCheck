import React from "react";
import plaPokemon from "../../data/PlaData/PlaData.js";

export default function PlaCards({ displayedPokemon, pokemonList, openModal, activeTab }) {
    // Controleer of de sprites geladen zijn om een loading state te tonen
    const isLoading = displayedPokemon.length > 0 && displayedPokemon.some((entry) => {
        const pokemon = pokemonList.find((p) => p.id === entry.id);
        return !pokemon?.sprites?.other?.home?.front_shiny;
    });

    const getStaticIndex = (entry) => {
        // Gebruik het ID uit de dataset als weergave-index voor de Hisui Dex
        const index = plaPokemon.findIndex(p => p.id === entry.id);
        return index !== -1 ? index + 1 : entry.id;
    };

    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 z-10 px-1">
            {displayedPokemon.length === 0 ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px]">
                    <span className="text-xl font-black text-slate-300 uppercase tracking-[0.2em]">
                        No Records Found
                    </span>
                </div>
            ) : isLoading ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px]">
                    <span className="text-xl font-black text-amber-500 animate-pulse uppercase tracking-[0.2em]">
                        Loading Hisui Dex...
                    </span>
                </div>
            ) : (
                displayedPokemon.map((entry) => {
                    const pokemon = pokemonList.find((p) => p.id === entry.id);
                    // Gebruik de 'pla_' prefix voor localStorage consistentie
                    const shinyCount = Number(localStorage.getItem(`pla_shiny_${entry.id}`)) || 0;
                    const isCollected = shinyCount >= 1;
                    const staticNumber = getStaticIndex(entry);

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(pokemon)}
                            className={`
                                relative rounded-[2rem] p-5 sm:p-6 flex flex-col items-center border-2 transition-all duration-300 group cursor-pointer
                                ${isCollected
                                ? "bg-gradient-to-br from-amber-50 to-orange-100 border-amber-300 shadow-xl shadow-amber-200/50 scale-[1.03]"
                                : "bg-white border-slate-100 shadow-lg hover:border-amber-200"
                            }
                            `}
                        >
                            {/* Subtiel Patroon op achtergrond */}
                            <div className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden rounded-[2rem]">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                            </div>

                            {/* Nummer Badge */}
                            <div className="w-full flex justify-between items-start mb-2 relative z-10">
                                <span className={`text-[10px] font-black tracking-tighter transition-colors ${isCollected ? "text-amber-700" : "text-slate-400"}`}>
                                    No. {String(staticNumber).padStart(3, "0")}
                                </span>
                                {isCollected && (
                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_#f59e0b]"></div>
                                )}
                            </div>

                            {/* Naam */}
                            <h2 className="text-sm sm:text-base md:text-lg font-black uppercase italic tracking-tight text-slate-800 mb-3 relative z-10">
                                {entry.name}
                            </h2>

                            {/* Sprite met amber gloed-effect voor PLA */}
                            <div className="relative mb-4">
                                <div className={`absolute inset-0 rounded-full blur-3xl opacity-25 transition-all ${isCollected ? 'bg-amber-400' : 'bg-slate-200'}`}></div>
                                <img
                                    src={pokemon?.sprites?.other?.home?.front_shiny}
                                    alt={entry.name}
                                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Types */}
                            <div className="flex gap-1.5 mb-4 relative z-10">
                                {pokemon?.types?.map((t) => (
                                    <span key={t.type.name} className={`text-[8px] sm:text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${isCollected ? "bg-amber-200/50 text-amber-800" : "bg-slate-100 text-slate-500"}`}>
                                        {t.type.name}
                                    </span>
                                ))}
                            </div>

                            {/* Footer: Status indicator aangepast naar Amber thema */}
                            <div className="w-full relative z-10 mt-auto">
                                <div className={`
                                    w-full py-2 rounded-2xl text-[10px] font-black tracking-[0.15em] text-center transition-all border
                                    ${isCollected
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 border-amber-600 text-white shadow-lg shadow-amber-200"
                                    : "bg-white border-slate-200 text-slate-400"
                                }
                                `}>
                                    {isCollected ? `REGISTERED: ${shinyCount}` : "UNREGISTERED"}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}