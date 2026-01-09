import React, { useState } from "react";

export default function PogoAddPokemon({ pokemon, onClose, onSave }) {
    const counter = 0;
    const totalSeconds = 0;

    const [timestamp, setTimestamp] = useState(
        new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16)
    );

    const handleSave = () => {
        const prefix = "pogo";
        const currentCount = Number(localStorage.getItem(`${prefix}_shiny_${pokemon.id}`)) || 0;
        const newIndex = currentCount + 1;
        const newData = {
            pokemonName: pokemon.name,
            counter: Number(counter),
            timer: totalSeconds,
            timestamp: new Date(timestamp).getTime(),
            game: "Pokémon GO"
        };
        localStorage.setItem(`${prefix}_shiny_${pokemon.id}`, newIndex);
        localStorage.setItem(`${prefix}_shinyData_${pokemon.id}_${newIndex}`, JSON.stringify(newData));
        onSave();
        onClose();
    };

    return (
        /* onClick={onClose} verwijderd */
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[110] p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white border-4 border-emerald-400 rounded-[3rem] shadow-[0_0_50px_rgba(52,211,153,0.3)] p-8 w-full max-w-md flex flex-col items-center overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"></div>

                {/* X-button toegevoegd voor consistentie als men klik-buiten-modal uitzet */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-emerald-500 transition-all z-20"
                >
                    <span className="text-lg font-black">✕</span>
                </button>

                <div className="mb-6 flex flex-col items-center">
                    <div className="bg-emerald-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em] mb-3 shadow-md shadow-emerald-200">
                        Transfer to GO
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-slate-800 tracking-tighter">
                        {pokemon.name}
                    </h2>
                </div>

                <div className="w-full space-y-6 relative z-10">
                    <div className="flex justify-center py-2">
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemon.id}.png`}
                            alt={pokemon.name}
                            className="w-32 h-32 object-contain drop-shadow-xl"
                        />
                    </div>

                    <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 text-center">Captured On</p>
                        <input
                            type="datetime-local"
                            value={timestamp}
                            onChange={(e) => setTimestamp(e.target.value)}
                            className="w-full bg-white p-3 rounded-xl border-2 border-emerald-100 text-sm font-black focus:border-emerald-400 focus:ring-0 text-slate-700 text-center transition-all"
                        />
                    </div>

                    <div className="bg-emerald-500/10 p-4 rounded-2xl border-2 border-emerald-500/20 flex justify-center items-center gap-3">
                        <span className="text-base font-black italic text-emerald-700 uppercase tracking-widest">Pokémon GO</span>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <button onClick={handleSave} className="w-full py-4 bg-emerald-500 text-white font-black rounded-2xl uppercase italic text-sm tracking-[0.2em] hover:bg-emerald-600 active:scale-95 transition-all shadow-lg shadow-emerald-200">Confirm</button>
                        <button onClick={onClose} className="w-full py-3 bg-slate-50 text-slate-400 font-black rounded-2xl uppercase italic text-[10px] tracking-widest hover:bg-slate-100 transition-colors">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}