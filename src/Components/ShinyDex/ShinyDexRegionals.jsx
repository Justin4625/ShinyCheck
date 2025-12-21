import React from "react";
import regionalPokemon from "../../data/RegionalData.js";

export default function ShinyDexRegionals({ isOpen, onClose, basePokemon, onSelectVariant }) {
    if (!isOpen || !basePokemon) return null;

    // Filter varianten die de naam van de basePokemon bevatten
    const variants = regionalPokemon.filter(p =>
        p.name.toLowerCase().includes(basePokemon.name.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-900 transform transition-all">
                <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black italic uppercase tracking-tighter">Select Form</h2>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Variants detected</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        ✕
                    </button>
                </div>

                <div className="p-6 grid gap-4 bg-slate-50">
                    <button
                        onClick={() => onSelectVariant(basePokemon)}
                        className="flex items-center justify-between p-5 rounded-3xl bg-white border-2 border-slate-200 hover:border-slate-900 transition-all group"
                    >
                        <div className="flex flex-col items-start">
                            <span className="font-black uppercase italic text-slate-800 text-lg">Standard Form</span>
                            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Original Appearance</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-colors">
                            <span className="font-bold">→</span>
                        </div>
                    </button>

                    {variants.map((variant) => (
                        <button
                            key={variant.id}
                            onClick={() => onSelectVariant(variant)}
                            className="flex items-center justify-between p-5 rounded-3xl bg-white border-2 border-cyan-100 hover:border-cyan-500 transition-all group"
                        >
                            <div className="flex flex-col items-start">
                                <span className="font-black uppercase italic text-cyan-900 text-lg">{variant.name}</span>
                                <span className="px-2 py-0.5 rounded-md bg-cyan-100 text-cyan-600 text-[10px] font-black tracking-widest uppercase mt-1">
                                    {variant.region} Region
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-cyan-50 group-hover:bg-cyan-500 group-hover:text-white flex items-center justify-center transition-colors">
                                <span className="font-bold">→</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}