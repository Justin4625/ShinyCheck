import React from "react";
import regionalPokemon from "../../data/RegionalData.js";

export default function SvRegionalsModal({ pokemon, onClose, onSelect }) {
    if (!pokemon) return null;

    // Zoek de regionale vormen op basis van de naam (trim en lowercase voor veiligheid)
    const regionalData = regionalPokemon.find(p =>
        p.name.trim().toLowerCase() === pokemon.name.trim().toLowerCase()
    );

    const forms = regionalData ? regionalData.forms : [];

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop met blur effect */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content container met animatie */}
            <div className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden border border-white animate-in fade-in zoom-in duration-300">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ff4d00] to-[#8c00ff]"></div>

                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Form Selection</span>
                            <h2 className="text-2xl font-black uppercase italic text-slate-800 tracking-tighter">
                                Choose {pokemon.name}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 p-2 rounded-xl transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {forms.map((variant) => (
                            <button
                                key={variant.id}
                                onClick={() => onSelect(variant.id, variant.name)}
                                className="group relative flex items-center gap-4 p-4 bg-slate-50 hover:bg-white border border-slate-100 hover:border-[#ff4d00] rounded-2xl transition-all text-left hover:shadow-md active:scale-95"
                            >
                                <div className="relative w-16 h-16 shrink-0 bg-white rounded-xl border border-slate-100 group-hover:border-orange-100 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${variant.id}.png`}
                                        alt={variant.name}
                                        className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                        Form ID #{variant.id}
                                    </span>
                                    <span className="text-sm font-black uppercase italic text-slate-700 group-hover:text-[#ff4d00] transition-colors tracking-tight">
                                        {variant.name}
                                    </span>
                                </div>

                                <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-5 h-5 text-[#ff4d00]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>

                    <p className="mt-6 text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest">
                        Select a form to manage active hunts or your collection
                    </p>
                </div>
            </div>
        </div>
    );
}