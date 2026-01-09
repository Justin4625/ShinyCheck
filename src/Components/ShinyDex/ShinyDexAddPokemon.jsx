import React, { useState } from "react";
// Importeer zonder braces omdat het default exports zijn
import plzaPokemon from "../../data/PlzaData/PlzaData";
import svPokemon from "../../data/SvData/SvData";

export default function ShinyDexAddPokemon({ pokemon, onClose, onSave }) {
    const [counter, setCounter] = useState(0);
    const [hrs, setHrs] = useState(0);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);

    // Datum formatteren voor de datetime-local input
    const [timestamp, setTimestamp] = useState(
        new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16)
    );

    // Check of de pokemon in de specifieke game data zit op basis van ID
    const existsInPLZA = plzaPokemon.some(p => p.id === pokemon.id);
    const existsInSV = svPokemon.some(p => p.id === pokemon.id);

    // Initialiseer op de eerste beschikbare game
    const [selectedGame, setSelectedGame] = useState(existsInPLZA ? "PLZA" : "SV");

    const handleSave = () => {
        const totalSeconds = (Number(hrs) * 3600) + (Number(mins) * 60) + Number(secs);
        const prefix = selectedGame === "PLZA" ? "plza" : "sv";

        // Bepaal de volgende index voor deze specifieke pokemon ID
        const currentCount = Number(localStorage.getItem(`${prefix}_shiny_${pokemon.id}`)) || 0;
        const newIndex = currentCount + 1;

        const newData = {
            pokemonName: pokemon.name,
            counter: Number(counter),
            timer: totalSeconds,
            timestamp: new Date(timestamp).getTime(),
        };

        // Opslaan in localStorage
        localStorage.setItem(`${prefix}_shiny_${pokemon.id}`, newIndex);
        localStorage.setItem(`${prefix}_shinyData_${pokemon.id}_${newIndex}`, JSON.stringify(newData));

        onSave();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4" onClick={onClose}>
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-2xl p-8 w-full max-w-md flex flex-col items-center overflow-hidden"
            >
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]"></div>

                <h2 className="text-2xl font-black uppercase italic text-slate-800 mb-6 relative z-10">
                    Add Shiny {pokemon.name}
                </h2>

                <div className="w-full space-y-4 relative z-10">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Encounters</p>
                            <input
                                type="number"
                                value={counter}
                                onChange={(e) => setCounter(e.target.value)}
                                className="w-full bg-transparent text-xl font-black border-none focus:ring-0 text-slate-900"
                            />
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                            <div className="flex items-center gap-1">
                                <input type="number" value={hrs} onChange={(e) => setHrs(e.target.value)} className="w-8 bg-transparent font-black text-xs text-center" placeholder="H"/>
                                <span className="text-[8px] font-bold text-slate-400">h</span>
                                <input type="number" value={mins} onChange={(e) => setMins(e.target.value)} className="w-8 bg-transparent font-black text-xs text-center" placeholder="M"/>
                                <span className="text-[8px] font-bold text-slate-400">m</span>
                                <input type="number" value={secs} onChange={(e) => setSecs(e.target.value)} className="w-8 bg-transparent font-black text-xs text-center" placeholder="S"/>
                                <span className="text-[8px] font-bold text-slate-400">s</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Captured On</p>
                        <input
                            type="datetime-local"
                            value={timestamp}
                            onChange={(e) => setTimestamp(e.target.value)}
                            className="w-full bg-transparent text-sm font-black border-none focus:ring-0 text-slate-700"
                        />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Game</p>
                        <select
                            value={selectedGame}
                            onChange={(e) => setSelectedGame(e.target.value)}
                            className="w-full bg-transparent font-black italic text-slate-800 border-none focus:ring-0 cursor-pointer"
                        >
                            {existsInPLZA && <option value="PLZA">Pokémon Legends: Z-A</option>}
                            {existsInSV && <option value="SV">Pokémon Scarlet & Violet</option>}
                        </select>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={handleSave}
                            className="flex-1 py-3 bg-slate-900 text-white font-black rounded-2xl uppercase italic text-[11px] tracking-widest hover:bg-slate-800 active:scale-95 transition-all shadow-lg"
                        >
                            Save Entry
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 bg-slate-100 text-slate-400 font-black rounded-2xl uppercase italic text-[11px] tracking-widest hover:bg-slate-200 active:scale-95 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}