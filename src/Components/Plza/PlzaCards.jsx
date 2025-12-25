import React from "react";
// Importeer de bronbestanden om de originele index te bepalen
import plzaPokemon from "../../data/PlzaData/PlzaData.js";
import plzaMdPokemon from "../../data/PlzaData/PlzaMdData.js";
import plzaRegionalPokemon from "../../data/PlzaData/PlzaRegionalData.jsx";

export default function PlzaCards({ displayedPokemon, pokemonList, openModal, activeTab }) {
    // Controleer of de sprites geladen zijn om een loading state te tonen
    const isLoading = displayedPokemon.length > 0 && displayedPokemon.some((entry) => {
        const pokemon = pokemonList.find((p) => p.id === entry.id);
        return !pokemon?.sprites?.other?.home?.front_shiny;
    });

    // Nieuwe logica: Toon het volgnummer in de lijst in plaats van de National Dex ID
    const getStaticIndex = (entry) => {
        if (activeTab === "mega") {
            const index = plzaMdPokemon.findIndex(p => p.id === entry.id);
            return index + 1;
        }
        // Voeg logica toe voor de regional tab
        if (activeTab === "regional") {
            const index = plzaRegionalPokemon.findIndex(p => p.id === entry.id);
            return index + 1;
        }
        const index = plzaPokemon.findIndex(p => p.id === entry.id);
        return index !== -1 ? index + 1 : 1;
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
                    <span className="text-xl font-black text-cyan-500 animate-pulse uppercase tracking-[0.2em]">
                        Loading...
                    </span>
                </div>
            ) : (
                displayedPokemon.map((entry) => {
                    const pokemon = pokemonList.find((p) => p.id === entry.id);
                    // Gebruik de ID voor localStorage om consistentie met de ShinyDex te behouden
                    const shinyCount = Number(localStorage.getItem(`plza_shiny_${entry.id}`)) || 0;
                    const isCollected = shinyCount >= 1;
                    const staticNumber = getStaticIndex(entry);

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(pokemon)}
                            className={`
                                relative rounded-[2rem] p-5 sm:p-6 flex flex-col items-center border-2 transition-all duration-300 group
                                ${isCollected
                                ? "bg-gradient-to-br from-yellow-50 to-amber-100 border-amber-300 shadow-xl shadow-amber-200/50 scale-[1.03]"
                                : "bg-white border-cyan-100 shadow-lg shadow-cyan-100/30 hover:border-cyan-300"
                            }
                            `}
                        >
                            {/* Subtiel Technisch Patroon op achtergrond */}
                            <div className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden rounded-[2rem]">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                            </div>

                            {/* Nummer Badge (Volgnummer) */}
                            <div className="w-full flex justify-between items-start mb-2 relative z-10">
                                <span className={`text-[10px] font-black tracking-tighter transition-colors ${isCollected ? "text-amber-600" : "text-cyan-600"}`}>
                                    ID: {String(staticNumber).padStart(3, "0")}
                                </span>
                                {isCollected && (
                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_#f59e0b]"></div>
                                )}
                            </div>

                            {/* Naam */}
                            <h2 className="text-sm sm:text-base md:text-lg font-black uppercase italic tracking-tight text-slate-800 mb-3 relative z-10">
                                {entry.name}
                            </h2>

                            {/* Sprite met gloed-effect */}
                            <div className="relative mb-4">
                                <div className={`absolute inset-0 rounded-full blur-3xl opacity-25 transition-all ${isCollected ? 'bg-amber-400' : 'bg-cyan-300'}`}></div>
                                <img
                                    src={pokemon?.sprites?.other?.home?.front_shiny}
                                    alt={entry.name}
                                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 drop-shadow-2xl relative z-10 group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Types */}
                            <div className="flex gap-1.5 mb-4 relative z-10">
                                {pokemon?.types?.map((t) => (
                                    <span key={t.type.name} className={`text-[8px] sm:text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${isCollected ? "bg-amber-200/50 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                                        {t.type.name}
                                    </span>
                                ))}
                            </div>

                            {/* Footer: Status indicator */}
                            <div className="w-full relative z-10 mt-auto">
                                <div className={`
                                    w-full py-2 rounded-2xl text-[10px] font-black tracking-[0.15em] text-center transition-all border
                                    ${isCollected
                                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 border-amber-500 text-white shadow-lg shadow-amber-200"
                                    : "bg-white border-cyan-200 text-cyan-600"
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