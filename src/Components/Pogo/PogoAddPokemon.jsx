import React, { useState, useMemo } from "react";
import regionalPokemon from "../../data/ShinyDexData/RegionalData.js";

export default function PogoAddPokemon({ pokemon, onClose, onSave }) {
    const counter = 0;
    const totalSeconds = 0;

    const availableForms = useMemo(() => {
        const baseName = pokemon.name.toLowerCase();

        const variants = regionalPokemon.filter(p => {
            const variantName = p.name.toLowerCase();

            // Standaard check: bevat de naam van de variant de basisnaam? (bijv. "Alolan Raichu" bevat "Raichu")
            const genericMatch = variantName.includes(baseName) && p.id !== pokemon.id;

            // Speciale check voor Basculin / White-Striped / Hisuian
            const isBasculinSearch = baseName.includes("basculin");
            const isBasculinVariant = variantName.includes("basculin");
            const basculinMatch = isBasculinSearch && isBasculinVariant && p.id !== pokemon.id;

            return genericMatch || basculinMatch;
        });

        // Unieke lijst maken op basis van ID (voorkomt dubbelingen als beide checks matchen)
        const combined = [pokemon, ...variants];
        return Array.from(new Map(combined.map(item => [item.id, item])).values());
    }, [pokemon]);

    const [selectedForm, setSelectedForm] = useState(pokemon);
    const [timestamp, setTimestamp] = useState(
        new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16)
    );

    const handleSave = () => {
        const prefix = "pogo";
        const currentCount = Number(localStorage.getItem(`${prefix}_shiny_${selectedForm.id}`)) || 0;
        const newIndex = currentCount + 1;

        const newData = {
            pokemonName: selectedForm.name,
            counter: Number(counter),
            timer: totalSeconds,
            timestamp: new Date(timestamp).getTime(),
            game: "Pokémon GO"
        };

        localStorage.setItem(`${prefix}_shiny_${selectedForm.id}`, newIndex);
        localStorage.setItem(`${prefix}_shinyData_${selectedForm.id}_${newIndex}`, JSON.stringify(newData));

        onSave();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[110] p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white border-2 border-emerald-100 rounded-[2.5rem] shadow-2xl p-8 w-full max-w-md flex flex-col items-center overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"></div>

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-emerald-500 transition-all z-20"
                >
                    <span className="text-xl font-black">✕</span>
                </button>

                <div className="mb-4 flex flex-col items-center">
                    <div className="bg-emerald-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em] mb-3 shadow-md">
                        Transfer to GO
                    </div>
                    <h2 className="text-2xl font-black uppercase italic text-slate-800 tracking-tighter text-center leading-tight">
                        {selectedForm.name}
                    </h2>
                </div>

                {/* Aangepaste Form Selector met Form 1, Form 2, etc. */}
                {availableForms.length > 1 && (
                    <div className="w-full mb-6">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 text-center">Select Form</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {availableForms.map((form, index) => (
                                <button
                                    key={form.id}
                                    onClick={() => setSelectedForm(form)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase italic border-2 transition-all 
                                        ${selectedForm.id === form.id
                                        ? "bg-emerald-500 border-emerald-500 text-white shadow-lg scale-105"
                                        : "bg-white border-slate-100 text-slate-400 hover:border-emerald-200"}`}
                                >
                                    Form {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="w-full space-y-6 relative z-10">
                    <div className="flex justify-center py-2 relative">
                        <div className="absolute inset-0 bg-emerald-100 blur-3xl opacity-30 rounded-full"></div>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${selectedForm.id}.png`}
                            alt={selectedForm.name}
                            className="w-32 h-32 object-contain drop-shadow-xl z-10 transition-all duration-300"
                        />
                    </div>

                    <div className="bg-emerald-50/50 p-4 rounded-3xl border border-emerald-100 shadow-sm">
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 text-center">Captured On</p>
                        <input
                            type="datetime-local"
                            value={timestamp}
                            onChange={(e) => setTimestamp(e.target.value)}
                            className="w-full bg-white p-3 rounded-xl border-2 border-emerald-100 text-sm font-black focus:border-emerald-400 focus:ring-0 text-slate-700 text-center transition-all"
                        />
                    </div>

                    <div className="bg-emerald-800 p-3 rounded-xl border border-emerald-700 flex justify-center items-center shadow-lg shadow-emerald-900/20">
                        <span className="text-xs font-black italic text-white uppercase tracking-widest">Pokémon GO</span>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <button onClick={handleSave} className="w-full py-4 bg-emerald-500 text-white font-black rounded-2xl uppercase italic text-sm tracking-[0.2em] hover:bg-emerald-600 active:scale-95 transition-all shadow-lg shadow-emerald-100">Confirm</button>
                        <button onClick={onClose} className="w-full py-3 bg-slate-100 text-slate-400 font-black rounded-2xl uppercase italic text-[10px] tracking-widest hover:bg-slate-200 transition-colors">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}