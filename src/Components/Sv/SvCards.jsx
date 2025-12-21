import React from "react";
import svPokemon from "../../data/SvData.js";
import svTmPokemon from "../../data/SvTmData.js";
import svIdData from "../../data/SvIdData.js";

export default function SvCards({ displayedPokemon, pokemonList, openModal, activeTab }) {
    // Verbeterde loading check: controleert of de pokemon bestaat EN of de sprite er is.
    // Dit vangt vertragingen op tijdens het tab-switchen en zoeken.
    const isLoading = displayedPokemon.length > 0 && displayedPokemon.some((entry) => {
        const pokemon = pokemonList.find((p) => p.id === entry.id);
        // Als de pokemon nog niet in de lijst staat OF de sprite ontbreekt -> laden
        return !pokemon || !pokemon?.sprites?.other?.home?.front_shiny;
    });

    // Bepaalt het nummer op de badge op basis van de positie in de Dex-lijst
    const getStaticIndex = (entry) => {
        let targetData = svPokemon;

        if (activeTab === "teal") targetData = svTmPokemon;
        if (activeTab === "indigo") targetData = svIdData;

        if (activeTab === "active") {
            targetData = svPokemon.concat(svTmPokemon, svIdData);
        }

        const index = targetData.findIndex(p => p.id === entry.id);
        return index !== -1 ? index + 1 : 1;
    };

    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 z-10">
            {displayedPokemon.length === 0 ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[200px]">
                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
                        No Pokémon Found
                    </span>
                </div>
            ) : isLoading ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[200px]">
                    <span className="text-sm font-black text-[#ff4d00] animate-pulse uppercase tracking-widest">
                        Loading...
                    </span>
                </div>
            ) : (
                displayedPokemon.map((entry, index) => {
                    const pokemon = pokemonList.find((p) => p.id === entry.id);
                    const shinyCount = Number(localStorage.getItem(`sv_shiny_${entry.id}`)) || 0;
                    const staticNumber = getStaticIndex(entry);
                    const isCaught = shinyCount > 0;

                    const isScarlet = index % 2 === 0;
                    const accentColor = isScarlet ? "#ff4d00" : "#8c00ff";

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(pokemon)}
                            className={`group relative border-b-4 border-r-4 rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md p-3 flex flex-col items-center justify-between cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 overflow-hidden shadow-sm hover:shadow-md
                                ${isCaught
                                ? "bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
                                : "bg-white border-gray-200"
                            }`}
                        >
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden rounded-tr-3xl rounded-bl-3xl">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                            </div>

                            {isCaught && (
                                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[45deg] -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] pointer-events-none" />
                            )}

                            <div
                                className={`absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rotate-12 transition-transform group-hover:rotate-45
                                    ${isCaught ? "bg-yellow-400 opacity-20" : "opacity-5"}`}
                                style={{ backgroundColor: isCaught ? undefined : accentColor }}
                            />

                            <div className="w-full flex justify-between items-start mb-2 relative z-10">
                                <div
                                    className="px-2 py-0.5 transform -skew-x-12 shadow-sm"
                                    style={{ backgroundColor: isCaught ? "#eab308" : accentColor }}
                                >
                                    <span className="text-[10px] font-black italic text-white tracking-tighter">
                                        No. {String(staticNumber).padStart(3, "0")}
                                    </span>
                                </div>
                                {isCaught && (
                                    <span className="text-sm drop-shadow-sm">⭐</span>
                                )}
                            </div>

                            <div className="w-full relative z-10 mb-2">
                                <h2 className="text-base font-black uppercase italic text-[#333] tracking-tighter truncate leading-none mb-1">
                                    {entry.name}
                                </h2>

                                <div className="flex gap-1 flex-wrap">
                                    {pokemon?.types?.map((t) => (
                                        <span
                                            key={t.type.name}
                                            className="px-1.5 py-0.5 text-[8px] font-black uppercase tracking-tighter rounded border"
                                            style={{
                                                backgroundColor: isCaught ? "rgba(234, 179, 8, 0.1)" : `${accentColor}05`,
                                                borderColor: isCaught ? "#eab308" : accentColor,
                                                color: isCaught ? "#a16207" : accentColor
                                            }}
                                        >
                                            {t.type.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="relative py-2">
                                <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 transition-all ${isCaught ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                                <img
                                    src={pokemon?.sprites?.other?.home?.front_shiny}
                                    alt={entry.name}
                                    className={`w-24 h-24 sm:w-28 sm:h-28 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110
                                        ${isCaught ? "drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" : "drop-shadow-md"}`}
                                />
                            </div>

                            <div className="w-full mt-3 relative z-10">
                                <div
                                    className="w-full py-1.5 flex items-center justify-between px-3 rounded-md transform skew-x-[-6deg] shadow-inner"
                                    style={{ backgroundColor: isCaught ? "rgba(234, 179, 8, 0.15)" : `${accentColor}10` }}
                                >
                                    <span
                                        className="text-[10px] font-black uppercase tracking-tight italic"
                                        style={{ color: isCaught ? "#a16207" : accentColor }}
                                    >
                                        Collected
                                    </span>
                                    <span
                                        className="text-lg font-black italic"
                                        style={{ color: isCaught ? "#a16207" : accentColor }}
                                    >
                                        {shinyCount}
                                    </span>
                                </div>
                            </div>

                            <div
                                className="absolute bottom-0 left-0 w-full h-1"
                                style={{ backgroundColor: isCaught ? "#eab308" : accentColor }}
                            />
                        </div>
                    );
                })
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes shine {
                    0% { transform: translateX(-150%) skewX(-45deg); }
                    100% { transform: translateX(150%) skewX(-45deg); }
                }
            `}} />
        </div>
    );
}