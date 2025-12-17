import React from "react";

export default function ShinyDexCards({ displayedPokemon, openModal }) {
    return (
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 z-10">
            {displayedPokemon.length === 0 ? (
                <div className="col-span-full flex flex-col justify-center items-center text-center min-h-[300px]">
                    <span className="text-xl font-black text-[#ff4d29] animate-bounce">ZZZT! LOADING DATA!</span>
                </div>
            ) : (
                displayedPokemon.map((entry) => {
                    const number = String(entry.id).padStart(4, "0");

                    return (
                        <div
                            key={entry.id}
                            onClick={() => openModal(entry)}
                            className="group relative bg-white rounded-3xl p-4 border-2 border-slate-100 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-100 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col items-center"
                        >
                            {/* Rotom ID Tag */}
                            <div className="w-full flex justify-between items-center mb-2">
                                <span className="text-[10px] font-black text-slate-300 tracking-widest italic uppercase">ID: {number}</span>
                                <div className="w-1.5 h-1.5 bg-[#ff4d29] rounded-full group-hover:bg-cyan-500 transition-colors shadow-[0_0_5px_rgba(255,77,41,0.5)]"></div>
                            </div>

                            {/* Sprite Background met gloed */}
                            <div className="relative w-full aspect-square flex items-center justify-center mb-3">
                                <div className="absolute inset-0 bg-slate-50 rounded-2xl group-hover:bg-cyan-50 transition-colors"></div>
                                <div className="absolute w-2/3 h-2/3 bg-white rounded-full blur-2xl group-hover:bg-cyan-200 transition-colors opacity-50"></div>

                                <img
                                    src={entry?.sprites?.other?.home?.front_shiny}
                                    alt={entry.name}
                                    className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-2xl relative z-10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500"
                                />
                            </div>

                            {/* Naam & Type */}
                            <h2 className="text-sm sm:text-base font-black text-slate-800 uppercase italic tracking-tighter transition-colors group-hover:text-cyan-600">
                                {entry.name}
                            </h2>

                            <div className="flex gap-1 mt-2">
                                {entry?.types?.map((t) => (
                                    <span key={t.type.name} className="text-[8px] font-black px-2 py-0.5 rounded-full bg-slate-800 text-white uppercase tracking-widest">
                                        {t.type.name}
                                    </span>
                                ))}
                            </div>

                            {/* Decorative Rotom Line */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-[#ff4d29] group-hover:w-full transition-all duration-700"></div>
                        </div>
                    );
                })
            )}
        </div>
    );
}