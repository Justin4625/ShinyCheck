import React from "react";

export default function ShinyDexCards({ displayedPokemon, openModal }) {
    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 z-10 px-2">
            {displayedPokemon.length === 0 ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-slate-200 border-t-[#ff4d29] rounded-full animate-spin mb-4"></div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] italic">Accessing Dex...</span>
                </div>
            ) : (
                displayedPokemon.map((entry) => {
                    const number = String(entry.id).padStart(4, "0");

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(entry)}
                            className="group relative flex flex-col transition-all duration-500 cursor-pointer"
                        >
                            {/* De Card Container - Permanente oranje/rode border */}
                            <div className="relative w-full bg-white border-2 border-[#ff4d29] rounded-[2rem] p-3 flex flex-col items-center shadow-[0_4px_12px_rgba(255,77,41,0.08)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(255,77,41,0.18)] group-hover:-translate-y-2 overflow-visible">

                                {/* Top ID & Status LED */}
                                <div className="w-full flex justify-between items-center mb-2 px-1">
                                    <span className="text-[9px] font-black text-[#ff4d29] italic tracking-tighter">
                                        #{number}
                                    </span>
                                    <div className="flex gap-1.5 items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan] animate-pulse"></div>
                                        <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                    </div>
                                </div>

                                {/* Het Vierkantje (Display Module) */}
                                <div className="relative aspect-square w-full bg-slate-50 border border-orange-100 rounded-[1.8rem] flex items-center justify-center overflow-visible transition-all duration-500 group-hover:bg-white group-hover:border-orange-200">

                                    {/* Technische Corner Brackets */}
                                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 group-hover:border-cyan-400 transition-colors"></div>
                                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#ff4d29]/60 group-hover:border-[#ff4d29] transition-colors"></div>

                                    {/* De Sprite - Geen clipping */}
                                    <img
                                        src={entry?.sprites?.other?.home?.front_shiny}
                                        alt={entry.name}
                                        className="w-[80%] h-[80%] object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)] z-10 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2"
                                    />

                                    {/* Achtergrondgloed */}
                                    <div className="absolute w-2/3 h-2/3 bg-orange-100 rounded-full blur-[30px] opacity-30 group-hover:opacity-60 transition-opacity"></div>
                                </div>

                                {/* Info Sectie */}
                                <div className="w-full text-center mt-3 pb-2 px-1">
                                    <h2 className="text-[12px] sm:text-sm font-black text-slate-800 uppercase italic tracking-tighter truncate leading-tight group-hover:text-black transition-colors">
                                        {entry.name}
                                    </h2>

                                    <div className="flex gap-1.5 justify-center mt-2.5">
                                        {entry?.types?.map((t) => (
                                            <span
                                                key={t.type.name}
                                                className="text-[7px] font-black px-2 py-0.5 rounded-md border border-slate-100 bg-slate-50 text-slate-400 uppercase tracking-widest group-hover:border-orange-100 group-hover:text-slate-500 transition-all"
                                            >
                                                {t.type.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Geen kleurenlijn onderaan zoals gevraagd */}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}