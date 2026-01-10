import React from "react";
import plaPokemon from "../../data/PlaData/PlaData.js";

export default function PlaCards({ displayedPokemon, pokemonList, openModal }) {
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
                    <span className="text-xl font-black text-amber-900/20 uppercase tracking-[0.2em] italic">
                        No Specimen Records
                    </span>
                </div>
            ) : isLoading ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[240px]">
                    <span className="text-xl font-black text-amber-600 animate-pulse uppercase tracking-[0.2em] italic">
                        Consulting Field Notes...
                    </span>
                </div>
            ) : (
                displayedPokemon.map((entry) => {
                    const pokemon = pokemonList.find((p) => p.id === entry.id);
                    const shinyCount = Number(localStorage.getItem(`pla_shiny_${entry.id}`)) || 0;
                    const isCollected = shinyCount >= 1;
                    const staticNumber = getStaticIndex(entry);

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(pokemon)}
                            className={`
                                relative p-5 sm:p-6 flex flex-col items-center transition-all duration-300 group cursor-pointer border-b-4
                                ${isCollected
                                ? "bg-[#eaddca] border-amber-800 shadow-xl shadow-amber-900/20 scale-[1.03]"
                                : "bg-white/50 border-slate-200 hover:border-amber-400 hover:bg-white"
                            }
                            `}
                        >
                            {/* Antieke Papier Textuur */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
                            </div>

                            {/* Nummer Badge (Inktstempel stijl) */}
                            <div className="w-full flex justify-between items-start mb-2 relative z-10">
                                <span className={`text-[10px] font-black tracking-widest transition-colors transform -skew-x-12 ${isCollected ? "text-amber-900" : "text-slate-400"}`}>
                                    № {String(staticNumber).padStart(3, "0")}
                                </span>
                                {isCollected && (
                                    <div className="w-2.5 h-2.5 bg-red-700 rotate-45 shadow-[0_0_8px_red]"></div>
                                )}
                            </div>

                            {/* Naam (Zware inkt-stijl) */}
                            <h2 className="text-sm sm:text-base font-black uppercase italic tracking-tighter text-slate-900 mb-3 relative z-10 text-center">
                                {entry.name}
                            </h2>

                            {/* Sprite met Spirituele Amber Gloed */}
                            <div className="relative mb-4">
                                <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 transition-all ${isCollected ? 'bg-amber-500' : 'bg-slate-200'}`}></div>
                                <img
                                    src={pokemon?.sprites?.other?.home?.front_shiny}
                                    alt={entry.name}
                                    className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)] relative z-10 group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Types (Perkament labels) */}
                            <div className="flex gap-1.5 mb-4 relative z-10">
                                {pokemon?.types?.map((t) => (
                                    <span key={t.type.name} className={`text-[8px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter border ${isCollected ? "bg-amber-900/10 border-amber-900/20 text-amber-900" : "bg-slate-100 border-slate-200 text-slate-500"}`}>
                                        {t.type.name}
                                    </span>
                                ))}
                            </div>

                            {/* Footer: Status (Veldgids stijl) */}
                            <div className="w-full relative z-10 mt-auto">
                                <div className={`
                                    w-full py-1.5 rounded-sm text-[9px] font-black tracking-[0.2em] text-center transition-all transform -skew-x-6 border-b-2
                                    ${isCollected
                                    ? "bg-amber-700 border-amber-900 text-white shadow-md"
                                    : "bg-slate-100 border-slate-300 text-slate-400"
                                }
                                `}>
                                    <span className="inline-block transform skew-x-6">
                                        {isCollected ? `COLLECTED: ${shinyCount}` : "UNIDENTIFIED"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}